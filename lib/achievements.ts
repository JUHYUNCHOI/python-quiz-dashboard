/**
 * 업적(Achievement) 시스템 (P5 현우 — 경쟁심/성취욕)
 * - 달성 조건: quiz-history, gamification, completedLessons 기반
 * - 잠금 해제 기록: localStorage "achievements-unlocked"
 */

export interface AchievementDef {
  id: string
  emoji: string
  title: string
  titleEn: string
  desc: string
  descEn: string
  /** 숨겨진 업적 (달성 전 ? ? ? 표시) */
  secret?: boolean
}

export interface UnlockedAchievement {
  id: string
  unlockedAt: number
}

const STORAGE_KEY = "achievements-unlocked"

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  // 퀴즈 관련
  {
    id: "first_quiz",
    emoji: "🎯",
    title: "퀴즈 시작",
    titleEn: "Quiz Starter",
    desc: "첫 번째 퀴즈 완료",
    descEn: "Complete your first quiz",
  },
  {
    id: "quiz_50",
    emoji: "⚡",
    title: "퀴즈 마스터",
    titleEn: "Quiz Master",
    desc: "총 50문제 풀기",
    descEn: "Answer 50 questions total",
  },
  {
    id: "quiz_200",
    emoji: "🧠",
    title: "퀴즈 고수",
    titleEn: "Quiz Expert",
    desc: "총 200문제 풀기",
    descEn: "Answer 200 questions total",
  },
  {
    id: "quiz_500",
    emoji: "👑",
    title: "퀴즈 전설",
    titleEn: "Quiz Legend",
    desc: "총 500문제 풀기",
    descEn: "Answer 500 questions total",
    secret: true,
  },
  // 정확도 관련
  {
    id: "perfect",
    emoji: "💯",
    title: "만점왕",
    titleEn: "Perfect Score",
    desc: "한 세션 100% 정답 (5문제+)",
    descEn: "100% accuracy in a session (5+ questions)",
  },
  {
    id: "accuracy_80",
    emoji: "🎖️",
    title: "정확도 마스터",
    titleEn: "Accuracy Master",
    desc: "총 정답률 80% 이상 (50문제+)",
    descEn: "80%+ accuracy over 50+ questions",
  },
  // 연속 관련
  {
    id: "streak_3",
    emoji: "🔥",
    title: "3일 연속",
    titleEn: "3-Day Streak",
    desc: "3일 연속 공부하기",
    descEn: "Study 3 days in a row",
  },
  {
    id: "streak_7",
    emoji: "🔥🔥",
    title: "7일 연속",
    titleEn: "7-Day Streak",
    desc: "7일 연속 공부하기",
    descEn: "Study 7 days in a row",
  },
  {
    id: "streak_30",
    emoji: "🌟",
    title: "30일 연속",
    titleEn: "30-Day Streak",
    desc: "30일 연속 공부하기",
    descEn: "Study 30 days in a row",
    secret: true,
  },
  // 레슨 관련
  {
    id: "lesson_1",
    emoji: "📚",
    title: "첫 레슨",
    titleEn: "First Lesson",
    desc: "첫 번째 레슨 완료",
    descEn: "Complete your first lesson",
  },
  {
    id: "lesson_10",
    emoji: "📖",
    title: "레슨 10개",
    titleEn: "10 Lessons",
    desc: "레슨 10개 완료",
    descEn: "Complete 10 lessons",
  },
  {
    id: "lesson_30",
    emoji: "🎓",
    title: "학습 전문가",
    titleEn: "Learning Pro",
    desc: "레슨 30개 완료",
    descEn: "Complete 30 lessons",
    secret: true,
  },
  // 레벨 관련
  {
    id: "level_5",
    emoji: "🚀",
    title: "레벨 5",
    titleEn: "Level 5",
    desc: "레벨 5 달성",
    descEn: "Reach Level 5",
  },
  {
    id: "level_10",
    emoji: "🏆",
    title: "레벨 10",
    titleEn: "Level 10",
    desc: "레벨 10 달성",
    descEn: "Reach Level 10",
  },
  // 일일 챌린지
  {
    id: "daily_3",
    emoji: "✅",
    title: "챌린지 3회",
    titleEn: "Challenge x3",
    desc: "일일 챌린지 3개 모두 완료",
    descEn: "Complete all 3 daily challenges",
  },
]

// ---- Storage helpers ----

function loadUnlocked(): UnlockedAchievement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveUnlocked(unlocked: UnlockedAchievement[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked))
  } catch {}
}

// ---- Condition checks ----

function computeEarned(): Set<string> {
  const earned = new Set<string>()
  try {
    const raw = localStorage.getItem("quiz-history")
    const history: Array<{
      totalQuestions: number
      correctAnswers: number
      accuracy: number
    }> = raw ? JSON.parse(raw) : []

    const totalAnswered = history.reduce((s, e) => s + (e.totalQuestions || 0), 0)
    const totalCorrect = history.reduce((s, e) => s + (e.correctAnswers || 0), 0)
    const hasPerfect = history.some(
      (e) => (e.accuracy || 0) >= 100 && (e.totalQuestions || 0) >= 5,
    )
    const overallAccuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0

    if (history.length >= 1) earned.add("first_quiz")
    if (totalAnswered >= 50) earned.add("quiz_50")
    if (totalAnswered >= 200) earned.add("quiz_200")
    if (totalAnswered >= 500) earned.add("quiz_500")
    if (hasPerfect) earned.add("perfect")
    if (totalAnswered >= 50 && overallAccuracy >= 0.8) earned.add("accuracy_80")

    // 일일 챌린지 3개 완료 (동적 import 피해 여기선 quiz-history로 근사)
    // quiz-history가 오늘 3개 이상이고 세션당 정답률/문제수 충족 여부는
    // daily-challenges에서 체크하므로, 여기선 DailyChallenges 완료 카운트를 저장된 값으로 판단
    const dailyAllDone = localStorage.getItem("daily-challenges-all-done")
    if (dailyAllDone === "1") earned.add("daily_3")
  } catch {}

  try {
    const streak = parseInt(
      localStorage.getItem("gamification-daily-streak") || "0",
      10,
    )
    if (streak >= 3) earned.add("streak_3")
    if (streak >= 7) earned.add("streak_7")
    if (streak >= 30) earned.add("streak_30")
  } catch {}

  try {
    const completedRaw = localStorage.getItem("completedLessons")
    const completed: string[] = completedRaw ? JSON.parse(completedRaw) : []
    if (completed.length >= 1) earned.add("lesson_1")
    if (completed.length >= 10) earned.add("lesson_10")
    if (completed.length >= 30) earned.add("lesson_30")
  } catch {}

  try {
    const totalXp = parseInt(
      localStorage.getItem("gamification-total-xp") || "0",
      10,
    )
    const level = Math.floor(totalXp / 100) + 1
    if (level >= 5) earned.add("level_5")
    if (level >= 10) earned.add("level_10")
  } catch {}

  return earned
}

// ---- Public API ----

/**
 * 현재 상태 기반으로 업적을 체크하고 새로 잠금 해제된 것을 저장.
 * @returns { unlocked, newlyUnlocked } — 새로 따낸 업적 ID 목록
 */
export function syncAchievements(): {
  unlocked: UnlockedAchievement[]
  newlyUnlocked: string[]
} {
  const existing = loadUnlocked()
  const existingIds = new Set(existing.map((u) => u.id))
  const earned = computeEarned()

  const newlyUnlocked: string[] = []
  const now = Date.now()

  for (const id of earned) {
    if (!existingIds.has(id)) {
      existing.push({ id, unlockedAt: now })
      newlyUnlocked.push(id)
    }
  }

  if (newlyUnlocked.length > 0) {
    saveUnlocked(existing)
  }

  return { unlocked: existing, newlyUnlocked }
}

export function getUnlockedAchievements(): UnlockedAchievement[] {
  return loadUnlocked()
}

/** 업적 ID → 정의 찾기 */
export function getAchievementDef(id: string): AchievementDef | undefined {
  return ACHIEVEMENT_DEFS.find((a) => a.id === id)
}
