/**
 * 스마트 문제 선택기
 * - 간격 반복 기반 복습 문제 선택
 * - 적응형 난이도 (85% 정답률 타겟)
 * - 세션 내 오답 재출제 큐
 * - 인터리빙 (다양한 토픽 섞기)
 */

import type { QuizQuestion } from "@/hooks/use-quiz-state"
import { getDueQuestions, getMastery, getAllMastery } from "./spaced-repetition"

export interface SmartSession {
  questions: QuizQuestion[]         // 선택된 문제 배열
  reviewCount: number               // 복습 문제 수
  newCount: number                  // 새 문제 수
  retryQueue: Map<number, number>   // questionId → 몇 문제 뒤에 재출제할지
}

/**
 * 학생의 완료된 레슨 ID 목록 가져오기
 */
function getCompletedLessons(): Set<string> {
  try {
    const saved = localStorage.getItem("completedLessons")
    if (!saved) return new Set()
    const arr: (string | number)[] = JSON.parse(saved)
    return new Set(arr.map(id => String(id)))
  } catch {
    return new Set()
  }
}

/**
 * 난이도 필터 매핑
 */
function getDifficultyFilter(setting: string): string[] {
  switch (setting) {
    case "beginner": return ["쉬움"]
    case "intermediate": return ["쉬움", "보통"]
    case "advanced": return ["쉬움", "보통", "어려움"]
    case "mixed":
    default: return ["쉬움", "보통", "어려움"]
  }
}

export interface SmartSessionOptions {
  difficulty?: string       // "beginner" | "intermediate" | "advanced" | "mixed"
  filterByProgress?: boolean // true면 학생이 완료한 레슨 범위만 출제
}

/**
 * 스마트 세션 생성
 * 구성: 복습 30% + 새 문제 50% + 인터리빙 20%
 * 난이도 필터 + 진도 기반 출제 지원
 */
export function createSmartSession(
  allQuestions: QuizQuestion[],
  totalCount: number,
  options: SmartSessionOptions = {},
): SmartSession {
  const { difficulty = "mixed", filterByProgress = true } = options
  const dueIds = getDueQuestions()
  const allMastery = getAllMastery()

  // 1. 진도 기반 필터: 학생이 완료한 레슨의 문제만 출제
  const completedLessons = filterByProgress ? getCompletedLessons() : null
  let pool = allQuestions

  if (completedLessons && completedLessons.size > 0) {
    pool = allQuestions.filter(q => {
      const lid = String(q.lessonId)
      return completedLessons.has(lid)
    })
    // 문제가 아예 없을 때만 전체 풀 fallback (미학습 토픽 출제 방지)
    if (pool.length === 0) {
      pool = allQuestions
    }
  }

  // 2. 난이도 필터
  const allowedDifficulties = getDifficultyFilter(difficulty)
  const filteredPool = pool.filter(q => allowedDifficulties.includes(q.difficulty))

  // 필터 후 문제가 부족하면 전체 풀 사용
  const effectivePool = filteredPool.length >= totalCount ? filteredPool : pool

  // 문제 풀이 완전히 비어있으면 빈 세션 반환
  if (effectivePool.length === 0) {
    return { questions: [], reviewCount: 0, newCount: 0, retryQueue: new Map() }
  }

  // 복습 문제 (오늘 복습 해야 하는 것)
  const reviewQuestions: QuizQuestion[] = []
  const reviewTarget = Math.ceil(totalCount * 0.3)  // 30%

  for (const id of dueIds) {
    if (reviewQuestions.length >= reviewTarget) break
    const q = effectivePool.find(q => q.id === id)
    if (q) reviewQuestions.push(q)
  }

  // 이미 선택된 ID 세트
  const selectedIds = new Set(reviewQuestions.map(q => q.id))

  // 새 문제: 아직 한 번도 안 풀어본 문제 (lessonId 순서대로)
  const newQuestions: QuizQuestion[] = []
  const newTarget = Math.ceil(totalCount * 0.5)  // 50%

  // lessonId 순서 → 난이도 순서로 정렬하여 커리큘럼 순서 유지
  const sortedPool = [...effectivePool].sort((a, b) => {
    // lessonId 순서 비교
    const aLesson = String(a.lessonId)
    const bLesson = String(b.lessonId)
    const lessonCompare = aLesson.localeCompare(bLesson, undefined, { numeric: true })
    if (lessonCompare !== 0) return lessonCompare
    // 같은 레슨 내에서는 쉬움 → 보통 → 어려움
    const diffOrder = { "쉬움": 0, "보통": 1, "어려움": 2 }
    return (diffOrder[a.difficulty as keyof typeof diffOrder] ?? 1) - (diffOrder[b.difficulty as keyof typeof diffOrder] ?? 1)
  })

  for (const q of sortedPool) {
    if (newQuestions.length >= newTarget) break
    if (selectedIds.has(q.id)) continue
    if (allMastery[q.id]) continue  // 이미 풀어본 문제는 건너뛰기
    newQuestions.push(q)
    selectedIds.add(q.id)
  }

  // 새 문제가 부족하면 오래 전에 풀었지만 아직 복습 안 온 문제로 채우기
  if (newQuestions.length < newTarget) {
    const remaining = effectivePool
      .filter(q => !selectedIds.has(q.id))
      .sort((a, b) => {
        const mA = allMastery[a.id]
        const mB = allMastery[b.id]
        if (!mA) return -1
        if (!mB) return 1
        return mA.lastReviewDate.localeCompare(mB.lastReviewDate)
      })
    for (const q of remaining) {
      if (newQuestions.length >= newTarget) break
      newQuestions.push(q)
      selectedIds.add(q.id)
    }
  }

  // 인터리빙 문제 (다양한 토픽에서 랜덤)
  const interleaveQuestions: QuizQuestion[] = []
  const interleaveTarget = totalCount - reviewQuestions.length - newQuestions.length

  const remaining = effectivePool
    .filter(q => !selectedIds.has(q.id))
  shuffleInPlace(remaining)

  for (const q of remaining) {
    if (interleaveQuestions.length >= interleaveTarget) break
    interleaveQuestions.push(q)
  }

  // 전체 문제를 조합 + 인터리빙 셔플
  const combined = interleaveShuffle(reviewQuestions, newQuestions, interleaveQuestions)

  return {
    questions: combined.slice(0, totalCount),
    reviewCount: reviewQuestions.length,
    newCount: newQuestions.length,
    retryQueue: new Map(),
  }
}

/**
 * 세션 내 오답 재출제 관리
 * 틀린 문제를 2-3개 뒤에 다시 삽입
 */
export function scheduleRetry(
  retryQueue: Map<number, number>,
  questionId: number,
): Map<number, number> {
  const delay = 2 + Math.floor(Math.random() * 2) // 2-3 문제 뒤
  const newQueue = new Map(retryQueue)
  newQueue.set(questionId, delay)
  return newQueue
}

/**
 * 현재 인덱스에서 재출제할 문제가 있는지 확인
 * 큐에서 카운트다운하고, 0이 되면 해당 문제 반환
 */
export function getRetryQuestion(
  retryQueue: Map<number, number>,
  allQuestions: QuizQuestion[],
): { question: QuizQuestion | null; updatedQueue: Map<number, number> } {
  const newQueue = new Map<number, number>()
  let retryQuestion: QuizQuestion | null = null

  for (const [id, countdown] of retryQueue) {
    if (countdown <= 0 && !retryQuestion) {
      // 이 문제를 재출제
      const q = allQuestions.find(q => q.id === id)
      if (q) retryQuestion = q
      // 재출제했으므로 큐에서 제거 (newQueue에 안 넣음)
    } else {
      newQueue.set(id, countdown - 1)
    }
  }

  return { question: retryQuestion, updatedQueue: newQueue }
}

/**
 * 적응형 난이도 계산
 * 최근 N문제의 정답률로 난이도 추천
 *
 * @todo 현재 UI에서 호출하지 않음. 향후 퀴즈 설정 화면에서 추천 배지로 연결 예정.
 *       연결 전까지 export만 유지.
 */
export function calculateAdaptiveDifficulty(
  recentResults: boolean[],  // 최근 정답/오답 기록 (true=정답)
): "easier" | "optimal" | "harder" {
  if (recentResults.length < 5) return "optimal"

  const last10 = recentResults.slice(-10)
  const accuracy = last10.filter(Boolean).length / last10.length

  if (accuracy > 0.9) return "harder"    // 90% 이상 → 난이도 올리기
  if (accuracy < 0.7) return "easier"    // 70% 미만 → 난이도 내리기
  return "optimal"                        // 70-90% → 최적 (85% 근처)
}

// ========== 유틸리티 ==========

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

/**
 * 세 그룹의 문제를 인터리빙으로 섞기
 * 복습 → 새 → 인터리빙 순서가 아니라 골고루 섞음
 */
function interleaveShuffle(
  review: QuizQuestion[],
  newQ: QuizQuestion[],
  interleave: QuizQuestion[],
): QuizQuestion[] {
  // 태그 달아서 합치기
  const tagged: { q: QuizQuestion; type: "review" | "new" | "interleave" }[] = [
    ...review.map(q => ({ q, type: "review" as const })),
    ...newQ.map(q => ({ q, type: "new" as const })),
    ...interleave.map(q => ({ q, type: "interleave" as const })),
  ]

  // 단순 랜덤 셔플하되, 같은 토픽이 연속으로 안 나오게
  shuffleInPlace(tagged)

  // 같은 relatedTopics가 연속 2개 이상이면 위치 교체 시도
  for (let i = 1; i < tagged.length; i++) {
    const prevTopics = tagged[i - 1].q.relatedTopics || []
    const currTopics = tagged[i].q.relatedTopics || []
    const overlap = prevTopics.some(t => currTopics.includes(t))

    if (overlap) {
      // 2칸 뒤랑 교체
      const swapIdx = Math.min(i + 2, tagged.length - 1)
      if (swapIdx !== i) {
        [tagged[i], tagged[swapIdx]] = [tagged[swapIdx], tagged[i]]
      }
    }
  }

  return tagged.map(t => t.q)
}
