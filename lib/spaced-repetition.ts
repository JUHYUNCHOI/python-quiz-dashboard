/**
 * 간격 반복 (Spaced Repetition) 엔진
 * - 라이트너 상자 시스템 (5단계)
 * - 에빙하우스 망각 곡선 기반 복습 스케줄링
 * - localStorage에 저장
 */

export interface QuestionMastery {
  questionId: number
  box: 1 | 2 | 3 | 4 | 5          // 라이트너 상자 (1=매일, 5=완전 숙달)
  correctStreak: number             // 연속 정답 횟수
  totalAttempts: number             // 총 시도 횟수
  totalCorrect: number              // 총 정답 횟수
  lastReviewDate: string            // "2026-03-15"
  nextReviewDate: string            // 다음 복습 예정일
  lastGrade: "perfect" | "great" | "good" | "fail" | null
}

// 상자별 복습 간격 (일)
const BOX_INTERVALS: Record<number, number> = {
  1: 1,    // 매일
  2: 3,    // 3일 후
  3: 7,    // 7일 후
  4: 14,   // 14일 후
  5: 30,   // 30일 후
}

const STORAGE_KEY = "question-mastery"

// ========== 유틸리티 ==========

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA)
  const b = new Date(dateB)
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

// ========== 저장/로드 ==========

function loadAll(): Record<number, QuestionMastery> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveAll(data: Record<number, QuestionMastery>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

// ========== 핵심 함수 ==========

/** 문제의 현재 숙련도 가져오기 (없으면 새로 생성) */
export function getMastery(questionId: number): QuestionMastery {
  const all = loadAll()
  if (all[questionId]) return all[questionId]
  return {
    questionId,
    box: 1,
    correctStreak: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    lastReviewDate: "",
    nextReviewDate: today(),  // 바로 복습 가능
    lastGrade: null,
  }
}

/** 답변 결과 기록 + 상자 이동 */
export function recordAnswer(
  questionId: number,
  isCorrect: boolean,
  attempts: number = 1,  // 해당 세션에서 몇 번째 시도인지
): QuestionMastery {
  const all = loadAll()
  const mastery = all[questionId] || getMastery(questionId)

  mastery.totalAttempts += 1
  mastery.lastReviewDate = today()

  if (isCorrect) {
    mastery.totalCorrect += 1
    mastery.correctStreak += 1

    // 등급 결정 (말해보카 스타일)
    if (attempts === 1) {
      mastery.lastGrade = "perfect"   // 첫 시도에 정답
    } else if (attempts === 2) {
      mastery.lastGrade = "great"     // 두 번째에 정답
    } else {
      mastery.lastGrade = "good"      // 세 번째 이상에 정답
    }

    // 상자 올리기 (최대 5)
    if (mastery.box < 5) {
      mastery.box = (mastery.box + 1) as 1 | 2 | 3 | 4 | 5
    }
  } else {
    mastery.correctStreak = 0
    mastery.lastGrade = "fail"

    // 틀리면 Box 1로 (라이트너 규칙)
    mastery.box = 1
  }

  // 다음 복습일 계산
  mastery.nextReviewDate = addDays(today(), BOX_INTERVALS[mastery.box])

  all[questionId] = mastery
  saveAll(all)
  return mastery
}

/** 오늘 복습해야 할 문제 ID 목록 */
export function getDueQuestions(): number[] {
  const all = loadAll()
  const todayStr = today()

  return Object.values(all)
    .filter(m => m.nextReviewDate <= todayStr && m.box < 5)
    .sort((a, b) => {
      // Box 1이 가장 먼저 (가장 약한 것)
      if (a.box !== b.box) return a.box - b.box
      // 같은 박스면 오래된 것 먼저
      return a.lastReviewDate.localeCompare(b.lastReviewDate)
    })
    .map(m => m.questionId)
}

/** 숙련도별 문제 분류 */
export function getMasteryStats(totalQuestions = 0): {
  newCount: number    // 한 번도 풀지 않은 문제 수 (totalQuestions 전달 시 계산)
  seenCount: number   // 지금까지 한 번이라도 풀어본 문제 수
  learningCount: number
  reviewingCount: number
  masteredCount: number
  totalDue: number
} {
  const all = loadAll()
  const allValues = Object.values(all)
  const todayStr = today()

  const dueCount = allValues.filter(m => m.nextReviewDate <= todayStr && m.box < 5).length
  const box1 = allValues.filter(m => m.box === 1).length
  const box23 = allValues.filter(m => m.box === 2 || m.box === 3).length
  const box45 = allValues.filter(m => m.box >= 4).length
  const seenCount = allValues.length

  return {
    newCount: totalQuestions > 0 ? Math.max(0, totalQuestions - seenCount) : 0,
    seenCount,
    learningCount: box1,
    reviewingCount: box23,
    masteredCount: box45,
    totalDue: dueCount,
  }
}

/** 숙련도 레벨 라벨 반환 (말해보카 스타일) */
export function getMasteryLabel(box: number): {
  label: string
  emoji: string
  color: string
} {
  switch (box) {
    case 1: return { label: "갓 배운", emoji: "🌱", color: "text-red-500" }
    case 2: return { label: "아직 서툰", emoji: "🌿", color: "text-orange-500" }
    case 3: return { label: "알아가는", emoji: "🌳", color: "text-yellow-600" }
    case 4: return { label: "숙달된", emoji: "⭐", color: "text-blue-500" }
    case 5: return { label: "완전 숙달", emoji: "👑", color: "text-green-500" }
    default: return { label: "새로운", emoji: "✨", color: "text-gray-500" }
  }
}

/** 등급 라벨 반환 */
export function getGradeInfo(grade: string | null): {
  label: string
  emoji: string
  color: string
  bgColor: string
} {
  switch (grade) {
    case "perfect":
      return { label: "Perfect!", emoji: "🌟", color: "text-yellow-600", bgColor: "bg-yellow-50 border-yellow-300" }
    case "great":
      return { label: "Great!", emoji: "👏", color: "text-blue-600", bgColor: "bg-blue-50 border-blue-300" }
    case "good":
      return { label: "Good!", emoji: "👍", color: "text-green-600", bgColor: "bg-green-50 border-green-300" }
    case "fail":
      return { label: "다시 도전!", emoji: "💪", color: "text-orange-600", bgColor: "bg-orange-50 border-orange-300" }
    default:
      return { label: "", emoji: "", color: "", bgColor: "" }
  }
}

/** 전체 데이터 반환 (디버깅/통계용) */
export function getAllMastery(): Record<number, QuestionMastery> {
  return loadAll()
}

/** 전체 초기화 */
export function resetAllMastery(): void {
  localStorage.removeItem(STORAGE_KEY)
}
