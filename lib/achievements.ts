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
    id: "quiz_100",
    emoji: "⚡",
    title: "100문제 돌파",
    titleEn: "100 Questions",
    desc: "총 100문제 풀기",
    descEn: "Answer 100 questions total",
  },
  {
    id: "quiz_200",
    emoji: "🧠",
    title: "200문제 돌파",
    titleEn: "200 Questions",
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
    desc: "한 세션 10문제 이상, 100% 정답",
    descEn: "100% accuracy in a session (10+ questions)",
  },
  // 연속 관련
  {
    id: "streak_7",
    emoji: "🔥",
    title: "7일 연속 학습",
    titleEn: "7-Day Streak",
    desc: "7일 연속 공부하기",
    descEn: "Study 7 days in a row",
  },
  {
    id: "streak_30",
    emoji: "🌟",
    title: "한 달 개근",
    titleEn: "30-Day Streak",
    desc: "30일 연속 공부하기",
    descEn: "Study 30 days in a row",
    secret: true,
  },
  // 레슨 관련
  {
    id: "lesson_10",
    emoji: "📖",
    title: "레슨 10개 완료",
    titleEn: "10 Lessons Done",
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
    id: "level_10",
    emoji: "🏆",
    title: "레벨 10 달성",
    titleEn: "Level 10",
    desc: "레벨 10 달성",
    descEn: "Reach Level 10",
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
    const hasPerfect = history.some(
      (e) => (e.accuracy || 0) >= 100 && (e.totalQuestions || 0) >= 10,
    )

    if (totalAnswered >= 100) earned.add("quiz_100")
    if (totalAnswered >= 200) earned.add("quiz_200")
    if (totalAnswered >= 500) earned.add("quiz_500")
    if (hasPerfect) earned.add("perfect")
  } catch {}

  try {
    const streak = parseInt(
      localStorage.getItem("gamification-daily-streak") || "0",
      10,
    )
    if (streak >= 7) earned.add("streak_7")
    if (streak >= 30) earned.add("streak_30")
  } catch {}

  try {
    const completedRaw = localStorage.getItem("completedLessons")
    const completed: string[] = completedRaw ? JSON.parse(completedRaw) : []
    if (completed.length >= 10) earned.add("lesson_10")
    if (completed.length >= 30) earned.add("lesson_30")
  } catch {}

  try {
    const totalXp = parseInt(
      localStorage.getItem("gamification-total-xp") || "0",
      10,
    )
    const level = Math.floor(totalXp / 100) + 1
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
