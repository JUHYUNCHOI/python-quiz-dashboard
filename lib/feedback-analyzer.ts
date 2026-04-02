/**
 * 학생 자동 피드백 분석 엔진
 * — 퀴즈/레슨 데이터를 분석하여 성장 마인드셋 기반 피드백 생성
 */

import { getQuizHistory, getTopicStats, type QuizHistoryEntry } from "./quiz-history"
import { getCompletedLessons, pythonParts, cppParts, pseudoParts, getLessonName, type PartMeta } from "./curriculum-data"

// ──── Types ────

export interface QuizFeedback {
  /** 성장 마인드셋 헤드라인 메시지 */
  headline: { ko: string; en: string }
  /** 세부 피드백 메시지 */
  details: { ko: string; en: string }
  /** 이모지 */
  emoji: string
  /** 피드백 톤 */
  tone: "celebrate" | "encourage" | "guide"
  /** 약한 토픽들 (복습 추천) */
  weakTopics: { topic: string; accuracy: number }[]
  /** 강한 토픽들 */
  strongTopics: { topic: string; accuracy: number }[]
  /** 성장 지표 (이전 퀴즈 대비) */
  growth: GrowthIndicator | null
  /** 추천 다음 행동 */
  nextAction: { ko: string; en: string; type: "review" | "advance" | "practice" }
}

export interface GrowthIndicator {
  /** 정답률 변화 (+/-) */
  accuracyDelta: number
  /** 메시지 */
  message: { ko: string; en: string }
  /** 추세 방향 */
  trend: "up" | "same" | "down"
}

export interface LessonFeedback {
  /** 축하/격려 메시지 */
  headline: { ko: string; en: string }
  emoji: string
  /** 복습 추천 레슨 (오래 전에 완료한 것) */
  reviewSuggestions: { lessonId: string; name: string; daysSince: number }[]
  /** 다음 추천 레슨 */
  nextLesson: { lessonId: string; name: string } | null
  /** 전체 진도 요약 */
  progressSummary: { completed: number; total: number; percentage: number }
}

export interface StreakInfo {
  currentStreak: number
  message: { ko: string; en: string }
  emoji: string
  milestone: number | null // 다음 마일스톤 (3, 7, 14, 30일)
  daysToMilestone: number
}

// ──── Quiz Feedback ────

export function analyzeQuizResult(
  correctAnswers: number,
  totalQuestions: number,
  maxCombo: number,
  questionDetails: { is_correct: boolean; related_topics?: string[] }[],
  difficulty: string,
): QuizFeedback {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  const history = getQuizHistory()

  // 토픽별 이번 세션 분석
  const sessionTopics = new Map<string, { correct: number; total: number }>()
  for (const q of questionDetails) {
    const topics = q.related_topics?.length ? q.related_topics : ["일반"]
    for (const t of topics) {
      const prev = sessionTopics.get(t) || { correct: 0, total: 0 }
      sessionTopics.set(t, {
        correct: prev.correct + (q.is_correct ? 1 : 0),
        total: prev.total + 1,
      })
    }
  }

  // 약한/강한 토픽 분류
  const weakTopics: { topic: string; accuracy: number }[] = []
  const strongTopics: { topic: string; accuracy: number }[] = []

  for (const [topic, { correct, total }] of sessionTopics) {
    if (topic === "일반") continue
    const topicAcc = Math.round((correct / total) * 100)
    if (topicAcc < 60) weakTopics.push({ topic, accuracy: topicAcc })
    else if (topicAcc >= 80) strongTopics.push({ topic, accuracy: topicAcc })
  }
  weakTopics.sort((a, b) => a.accuracy - b.accuracy)
  strongTopics.sort((a, b) => b.accuracy - a.accuracy)

  // 성장 지표 (최근 3개 퀴즈 평균 vs 이번)
  const growth = calculateGrowth(accuracy, history)

  // 성장 마인드셋 기반 메시지 선택
  const { headline, details, emoji, tone } = selectGrowthMessage(accuracy, growth, maxCombo, weakTopics.length)

  // 다음 행동 추천
  const nextAction = recommendNextAction(accuracy, weakTopics, growth)

  return {
    headline,
    details,
    emoji,
    tone,
    weakTopics: weakTopics.slice(0, 3),
    strongTopics: strongTopics.slice(0, 3),
    growth,
    nextAction,
  }
}

function calculateGrowth(currentAccuracy: number, history: QuizHistoryEntry[]): GrowthIndicator | null {
  if (history.length < 2) return null // 이전 데이터가 최소 2개 필요 (현재 세션은 아직 저장 전)

  // 최근 3개 퀴즈의 평균 (현재 세션 제외)
  const recent = history.slice(0, 3)
  const avgAccuracy = Math.round(recent.reduce((sum, e) => sum + e.accuracy, 0) / recent.length)
  const delta = currentAccuracy - avgAccuracy

  if (delta > 10) {
    return {
      accuracyDelta: delta,
      trend: "up",
      message: {
        ko: `이전보다 ${delta}%p 올랐어요!`,
        en: `${delta}%p improvement!`,
      },
    }
  } else if (delta < -10) {
    return {
      accuracyDelta: delta,
      trend: "down",
      message: {
        ko: "실수가 좀 있었지만, 다음엔 더 잘할 수 있어요",
        en: "Some mistakes, but you'll do better next time",
      },
    }
  } else {
    return {
      accuracyDelta: delta,
      trend: "same",
      message: {
        ko: "꾸준한 실력을 유지하고 있어요",
        en: "Maintaining steady performance",
      },
    }
  }
}

function selectGrowthMessage(
  accuracy: number,
  growth: GrowthIndicator | null,
  maxCombo: number,
  weakCount: number,
): { headline: { ko: string; en: string }; details: { ko: string; en: string }; emoji: string; tone: "celebrate" | "encourage" | "guide" } {
  // 퍼펙트
  if (accuracy === 100) {
    return {
      emoji: "🏆",
      tone: "celebrate",
      headline: { ko: "완벽해요!", en: "Perfect!" },
      details: { ko: "모든 문제를 맞혔어요. 정말 대단해요!", en: "You got everything right. Amazing!" },
    }
  }

  // 높은 점수 + 성장
  if (accuracy >= 80) {
    if (growth?.trend === "up") {
      return {
        emoji: "📈",
        tone: "celebrate",
        headline: { ko: "실력이 늘고 있어요!", en: "You're improving!" },
        details: { ko: "계속 이렇게 하면 곧 마스터할 수 있어요", en: "Keep it up and you'll master this soon" },
      }
    }
    if (maxCombo >= 5) {
      return {
        emoji: "⚡",
        tone: "celebrate",
        headline: { ko: "집중력 최고!", en: "Great focus!" },
        details: { ko: `${maxCombo}연속 정답! 집중력이 대단해요`, en: `${maxCombo} in a row! Impressive concentration` },
      }
    }
    return {
      emoji: "💪",
      tone: "celebrate",
      headline: { ko: "잘하고 있어요!", en: "Doing great!" },
      details: { ko: "높은 정답률이에요. 계속 도전해봐요!", en: "High accuracy! Keep challenging yourself!" },
    }
  }

  // 중간 점수
  if (accuracy >= 50) {
    if (growth?.trend === "up") {
      return {
        emoji: "🌱",
        tone: "encourage",
        headline: { ko: "성장하고 있어요!", en: "You're growing!" },
        details: { ko: "조금씩 나아지고 있어요. 포기하지 마세요!", en: "Getting better step by step. Don't give up!" },
      }
    }
    if (weakCount > 0) {
      return {
        emoji: "🎯",
        tone: "guide",
        headline: { ko: "연습이 답이에요", en: "Practice makes progress" },
        details: { ko: "어려운 부분을 복습하면 금방 올라갈 거예요", en: "Review the tricky parts and you'll improve quickly" },
      }
    }
    return {
      emoji: "💡",
      tone: "encourage",
      headline: { ko: "좋은 출발이에요!", en: "Good start!" },
      details: { ko: "반 이상 맞혔어요! 복습하면 더 올라갈 거예요", en: "More than half right! Review and you'll go higher" },
    }
  }

  // 낮은 점수 — 절대 비판하지 않음
  if (growth?.trend === "up") {
    return {
      emoji: "🌟",
      tone: "encourage",
      headline: { ko: "발전하고 있어요!", en: "Making progress!" },
      details: { ko: "이전보다 나아졌어요. 계속 가봐요!", en: "Better than before. Keep going!" },
    }
  }
  return {
    emoji: "📚",
    tone: "guide",
    headline: { ko: "천천히 가도 괜찮아요", en: "It's okay to go slowly" },
    details: { ko: "어려운 부분을 먼저 복습해봐요. 누구나 처음은 어려워요!", en: "Review the basics first. Everyone finds it hard at first!" },
  }
}

function recommendNextAction(
  accuracy: number,
  weakTopics: { topic: string; accuracy: number }[],
  growth: GrowthIndicator | null,
): { ko: string; en: string; type: "review" | "advance" | "practice" } {
  if (accuracy >= 90) {
    return {
      ko: "다음 레슨으로 넘어가봐요!",
      en: "Try the next lesson!",
      type: "advance",
    }
  }
  if (weakTopics.length > 0) {
    const topicName = weakTopics[0].topic
    return {
      ko: `"${topicName}" 부분을 복습해보면 좋겠어요`,
      en: `Try reviewing "${topicName}"`,
      type: "review",
    }
  }
  return {
    ko: "한 번 더 풀어보면 더 잘할 수 있어요!",
    en: "Try again and you'll do even better!",
    type: "practice",
  }
}

// ──── Lesson Feedback ────

export function analyzeLessonComplete(lessonId: string, lang: "ko" | "en" = "ko"): LessonFeedback {
  const completed = getCompletedLessons()

  // 전체 진도 계산
  const allParts = [...pythonParts, ...cppParts, ...pseudoParts]
  const allLessonIds = allParts.flatMap(p => p.lessonIds)
  const totalLessons = allLessonIds.length
  const completedCount = allLessonIds.filter(id => completed.has(id) || String(id) === String(lessonId)).length
  const percentage = Math.round((completedCount / totalLessons) * 100)

  // 적절한 축하 메시지
  const { headline, emoji } = selectLessonCompleteMessage(completedCount, percentage)

  // 다음 레슨 추천
  const nextLesson = findNextLesson(lessonId, allParts, completed, lang)

  // 복습 추천 (이전에 완료한 레슨 중 오래된 것) — 나중에 lesson_progress 날짜 데이터로 개선 가능
  const reviewSuggestions = getReviewSuggestions(lessonId, completed, lang)

  return {
    headline,
    emoji,
    reviewSuggestions,
    nextLesson,
    progressSummary: { completed: completedCount, total: totalLessons, percentage },
  }
}

function selectLessonCompleteMessage(completedCount: number, percentage: number): { headline: { ko: string; en: string }; emoji: string } {
  if (completedCount === 1) {
    return {
      emoji: "🎉",
      headline: { ko: "첫 레슨 완료! 시작이 반이에요!", en: "First lesson done! Great start!" },
    }
  }
  if (completedCount === 5) {
    return {
      emoji: "🌟",
      headline: { ko: "벌써 5개 완료! 대단해요!", en: "5 lessons done! Awesome!" },
    }
  }
  if (completedCount === 10) {
    return {
      emoji: "🏅",
      headline: { ko: "10개 돌파! 진짜 열심히 하고 있네요!", en: "10 lessons! You're really dedicated!" },
    }
  }
  if (percentage >= 50) {
    return {
      emoji: "🚀",
      headline: { ko: "절반 이상 완료! 거의 다 왔어요!", en: "Over halfway! Almost there!" },
    }
  }
  if (completedCount % 5 === 0) {
    return {
      emoji: "💪",
      headline: { ko: `${completedCount}개 완료! 꾸준함이 최고예요!`, en: `${completedCount} done! Consistency is key!` },
    }
  }
  return {
    emoji: "✨",
    headline: { ko: "또 하나 완료! 잘하고 있어요!", en: "Another one done! Keep going!" },
  }
}

function findNextLesson(currentId: string, allParts: PartMeta[], completed: Set<number | string>, lang: "ko" | "en" = "ko"): { lessonId: string; name: string } | null {
  // 현재 레슨이 속한 트랙 찾기
  const isCpp = currentId.startsWith("cpp-")
  const isPseudo = currentId.startsWith("pseudo-") || currentId.startsWith("igcse-")
  const trackParts = isCpp ? cppParts : isPseudo ? pseudoParts : pythonParts
  const trackIds = trackParts.flatMap(p => p.lessonIds)

  const currentNorm = /^\d+$/.test(currentId) ? Number(currentId) : currentId
  const idx = trackIds.indexOf(currentNorm)

  if (idx >= 0 && idx < trackIds.length - 1) {
    const nextId = trackIds[idx + 1]
    return { lessonId: String(nextId), name: getLessonName(nextId, lang) }
  }
  return null
}

// ──── localStorage helpers (safe for SSR/SSG) ────

function safeLocalStorageGet(key: string): string | null {
  try {
    if (typeof window === "undefined") return null
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

interface RawMastery {
  questionId: number
  box: number
  lastReviewDate?: string
}

/** question-mastery localStorage → lessonId별 box 1/2 문제 수 집계
 *
 * question-mastery에는 lessonId가 없으므로, 레슨 범위를 직접 저장된 question_id 기반으로
 * 추론하는 대신 quiz-history의 lessonFilter 기반 데이터를 우선 사용하고,
 * 이 함수는 전체 "저숙련 문제 비율"을 레슨별로 추정하는 보조 역할을 한다.
 * 실제 lessonId 매핑은 quiz-history에서 가져온 questionDetails를 사용하면 더 정확하나,
 * quiz-history 에는 questionId→lessonId 매핑이 직접 없으므로 여기서는
 * question-mastery 전체의 저숙련 문제 비율로 복습 필요 여부를 보조 판단한다.
 */
function getLowMasteryCount(): { lowMasteryCount: number; totalSeen: number } {
  const raw = safeLocalStorageGet("question-mastery")
  if (!raw) return { lowMasteryCount: 0, totalSeen: 0 }
  try {
    const data: Record<string, RawMastery> = JSON.parse(raw)
    const entries = Object.values(data)
    const lowMasteryCount = entries.filter(e => e.box === 1 || e.box === 2).length
    return { lowMasteryCount, totalSeen: entries.length }
  } catch {
    return { lowMasteryCount: 0, totalSeen: 0 }
  }
}

interface LessonAccuracyEntry {
  lessonId: string
  correct: number
  total: number
  lastDate: string
}

/** quiz-history에서 lessonFilter가 있는 세션들의 레슨별 정답률 집계 */
function getLessonAccuracyFromHistory(
  trackIds: (number | string)[],
  completed: Set<number | string>,
): Map<string, LessonAccuracyEntry> {
  const raw = safeLocalStorageGet("quiz-history")
  if (!raw) return new Map()

  try {
    const history: Array<{
      date?: string
      accuracy?: number
      correctAnswers?: number
      totalQuestions?: number
      isReview?: boolean
      lessonFilter?: number | string
    }> = JSON.parse(raw)
    if (!Array.isArray(history)) return new Map()

    const map = new Map<string, LessonAccuracyEntry>()

    for (const entry of history) {
      // lessonFilter가 있는 세션 (레슨별 복습 또는 레슨 집중 퀴즈)만 사용
      if (entry.lessonFilter == null) continue

      const lessonKey = String(entry.lessonFilter)
      const normId: number | string = /^\d+$/.test(lessonKey) ? Number(lessonKey) : lessonKey

      // 현재 트랙의 레슨이고 완료된 것만
      if (!trackIds.includes(normId) || !completed.has(normId)) continue

      const correct = entry.correctAnswers ?? 0
      const total = entry.totalQuestions ?? 0
      if (total === 0) continue

      const prev = map.get(lessonKey) ?? { lessonId: lessonKey, correct: 0, total: 0, lastDate: "" }
      const entryDate = entry.date ?? ""
      map.set(lessonKey, {
        lessonId: lessonKey,
        correct: prev.correct + correct,
        total: prev.total + total,
        lastDate: entryDate > prev.lastDate ? entryDate : prev.lastDate,
      })
    }

    return map
  } catch {
    return new Map()
  }
}

/** 마지막 복습일로부터 경과 일수 계산 */
function daysSinceDate(dateStr: string): number {
  if (!dateStr) return 7
  try {
    const then = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, diff)
  } catch {
    return 7
  }
}

function getReviewSuggestions(currentId: string, completed: Set<number | string>, lang: "ko" | "en" = "ko"): { lessonId: string; name: string; daysSince: number }[] {
  const isCpp = currentId.startsWith("cpp-")
  const isPseudo = currentId.startsWith("pseudo-") || currentId.startsWith("igcse-")
  const trackParts = isCpp ? cppParts : isPseudo ? pseudoParts : pythonParts
  const trackIds = trackParts.flatMap(p => p.lessonIds)

  const currentNorm = /^\d+$/.test(currentId) ? Number(currentId) : currentId
  const currentIdx = trackIds.indexOf(currentNorm)

  // 완료된 레슨 중 현재 레슨 이전 것들만 후보로
  const candidateIds = currentIdx > 0
    ? trackIds.slice(0, currentIdx).filter(id => completed.has(id))
    : []

  if (candidateIds.length === 0) return []

  // ── Step 1: quiz-history에서 레슨별 정답률 집계 ──
  const lessonAccuracy = getLessonAccuracyFromHistory(trackIds, completed)

  // 낮은 정답률(< 70%) 레슨 우선순위 목록
  const weakByHistory: { lessonId: string; accuracy: number; daysSince: number }[] = []
  for (const [lessonKey, data] of lessonAccuracy.entries()) {
    const normId: number | string = /^\d+$/.test(lessonKey) ? Number(lessonKey) : lessonKey
    if (!candidateIds.includes(normId)) continue
    const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 100
    if (accuracy < 70) {
      weakByHistory.push({
        lessonId: lessonKey,
        accuracy,
        daysSince: daysSinceDate(data.lastDate),
      })
    }
  }
  // 정답률 낮은 순으로 정렬
  weakByHistory.sort((a, b) => a.accuracy - b.accuracy)

  // ── Step 2: question-mastery에서 전체 저숙련 비율 확인 (보조 신호) ──
  const { lowMasteryCount, totalSeen } = getLowMasteryCount()
  const hasSignificantLowMastery = totalSeen > 10 && lowMasteryCount / totalSeen > 0.3

  // ── Step 3: 결과 조합 ──
  const suggestions: { lessonId: string; name: string; daysSince: number }[] = []

  // quiz-history 기반 약한 레슨 먼저 추가
  for (const item of weakByHistory) {
    if (suggestions.length >= 3) break
    const normId: number | string = /^\d+$/.test(item.lessonId) ? Number(item.lessonId) : item.lessonId
    suggestions.push({
      lessonId: item.lessonId,
      name: getLessonName(normId, lang),
      daysSince: item.daysSince,
    })
  }

  // ── Step 4: 아직 2개 미만이면 위치 기반 fallback으로 보충 ──
  if (suggestions.length < 2 && currentIdx >= 8) {
    // 저숙련 비율이 높으면 좀 더 최근 레슨(4~8개 전)도 후보로
    const lookbackFar = hasSignificantLowMastery ? currentIdx - 4 : currentIdx - 8
    const lookbackNear = hasSignificantLowMastery ? currentIdx - 1 : currentIdx - 4

    const alreadySuggested = new Set(suggestions.map(s => s.lessonId))

    for (let i = Math.max(0, lookbackFar); i < lookbackNear && i >= 0; i++) {
      if (suggestions.length >= 2) break
      const id = trackIds[i]
      const idStr = String(id)
      if (completed.has(id) && !alreadySuggested.has(idStr)) {
        // 이미 history에서 높은 정확도(≥70%)로 확인된 레슨은 건너뜀
        const histEntry = lessonAccuracy.get(idStr)
        if (histEntry) {
          const acc = histEntry.total > 0 ? Math.round((histEntry.correct / histEntry.total) * 100) : 100
          if (acc >= 70) continue
        }
        suggestions.push({
          lessonId: idStr,
          name: getLessonName(id, lang),
          daysSince: histEntry ? daysSinceDate(histEntry.lastDate) : 7,
        })
      }
    }

    // 그래도 부족하면 8~12개 전 위치 기반 원래 로직으로 채움
    if (suggestions.length < 2) {
      const alreadySuggested2 = new Set(suggestions.map(s => s.lessonId))
      for (let i = Math.max(0, currentIdx - 12); i <= currentIdx - 8 && i >= 0; i++) {
        if (suggestions.length >= 2) break
        const id = trackIds[i]
        const idStr = String(id)
        if (completed.has(id) && !alreadySuggested2.has(idStr)) {
          const histEntry = lessonAccuracy.get(idStr)
          suggestions.push({
            lessonId: idStr,
            name: getLessonName(id, lang),
            daysSince: histEntry ? daysSinceDate(histEntry.lastDate) : 7,
          })
        }
      }
    }
  }

  return suggestions.slice(0, 3)
}

// ──── Streak Analysis ────

export function analyzeStreak(dailyStreak: number): StreakInfo {
  const milestones = [3, 7, 14, 30, 60, 100]
  const nextMilestone = milestones.find(m => m > dailyStreak) || null
  const daysToMilestone = nextMilestone ? nextMilestone - dailyStreak : 0

  if (dailyStreak === 0) {
    return {
      currentStreak: 0,
      emoji: "🌱",
      message: { ko: "오늘 시작해봐요!", en: "Start today!" },
      milestone: 3,
      daysToMilestone: 3,
    }
  }
  if (dailyStreak >= 30) {
    return {
      currentStreak: dailyStreak,
      emoji: "👑",
      message: { ko: `${dailyStreak}일 연속! 전설이에요!`, en: `${dailyStreak}-day streak! Legendary!` },
      milestone: nextMilestone,
      daysToMilestone,
    }
  }
  if (dailyStreak >= 14) {
    return {
      currentStreak: dailyStreak,
      emoji: "💎",
      message: { ko: `${dailyStreak}일 연속! 습관이 됐어요!`, en: `${dailyStreak}-day streak! It's a habit!` },
      milestone: nextMilestone,
      daysToMilestone,
    }
  }
  if (dailyStreak >= 7) {
    return {
      currentStreak: dailyStreak,
      emoji: "🔥",
      message: { ko: `${dailyStreak}일 연속! 일주일 넘었어요!`, en: `${dailyStreak}-day streak! Over a week!` },
      milestone: nextMilestone,
      daysToMilestone,
    }
  }
  if (dailyStreak >= 3) {
    return {
      currentStreak: dailyStreak,
      emoji: "⚡",
      message: { ko: `${dailyStreak}일 연속! 좋은 흐름이에요!`, en: `${dailyStreak}-day streak! Good momentum!` },
      milestone: nextMilestone,
      daysToMilestone,
    }
  }
  return {
    currentStreak: dailyStreak,
    emoji: "🌟",
    message: { ko: `${dailyStreak}일 연속 학습 중!`, en: `${dailyStreak}-day streak!` },
    milestone: nextMilestone,
    daysToMilestone,
  }
}

// ──── Weak Area Analysis (Cross-session) ────

export interface WeakAreaReport {
  areas: { topic: string; accuracy: number; totalAttempts: number; suggestion: { ko: string; en: string } }[]
  overallTrend: "improving" | "steady" | "declining" | "new"
}

export function analyzeWeakAreas(): WeakAreaReport {
  const topicStats = getTopicStats()
  const history = getQuizHistory()

  if (history.length < 2) {
    return { areas: [], overallTrend: "new" }
  }

  // 토픽별 약점 (정답률 70% 미만 + 최소 3문제 이상 풀어본 토픽)
  const weakAreas = topicStats
    .filter(t => t.accuracy < 70 && t.total >= 3 && t.topic !== "일반")
    .slice(0, 5)
    .map(t => ({
      topic: t.topic,
      accuracy: t.accuracy,
      totalAttempts: t.total,
      suggestion: getTopicSuggestion(t.topic, t.accuracy),
    }))

  // 전체 추세
  const recentAccuracy = history.slice(0, 3).reduce((s, e) => s + e.accuracy, 0) / Math.min(history.length, 3)
  const olderAccuracy = history.length > 3
    ? history.slice(3, 6).reduce((s, e) => s + e.accuracy, 0) / Math.min(history.length - 3, 3)
    : recentAccuracy

  const overallTrend = recentAccuracy - olderAccuracy > 5 ? "improving"
    : recentAccuracy - olderAccuracy < -5 ? "declining"
    : "steady"

  return { areas: weakAreas, overallTrend }
}

function getTopicSuggestion(topic: string, accuracy: number): { ko: string; en: string } {
  if (accuracy < 30) {
    return {
      ko: `"${topic}" 레슨을 다시 한번 살펴보세요`,
      en: `Review the "${topic}" lesson again`,
    }
  }
  if (accuracy < 50) {
    return {
      ko: `"${topic}" 연습문제를 더 풀어보세요`,
      en: `Practice more "${topic}" problems`,
    }
  }
  return {
    ko: `"${topic}" 거의 다 왔어요! 조금만 더!`,
    en: `Almost mastering "${topic}"! Just a bit more!`,
  }
}
