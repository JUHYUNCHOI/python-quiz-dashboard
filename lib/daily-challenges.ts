/**
 * 일일 도전 과제 시스템 (P5 현우 — 경쟁심/성취욕)
 * - 매일 3개 도전 과제 (요일별 난이도 변화)
 * - quiz-history localStorage에서 오늘의 진행도 계산 (별도 저장 불필요)
 */

export interface DailyChallenge {
  id: string
  emoji: string
  title: string
  titleEn: string
  desc: string
  descEn: string
  current: number
  target: number
  done: boolean
  /** progress bar 표시용 (0–100) */
  percent: number
}

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

// 요일별 도전 목표 (0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토)
const QUESTION_GOALS = [5, 10, 10, 15, 10, 20, 15]
const ACCURACY_GOALS = [70, 75, 80, 80, 75, 85, 75]

interface QuizEntry {
  date: string
  totalQuestions: number
  correctAnswers: number
  accuracy: number
}

export function getTodayChallenges(): DailyChallenge[] {
  const today = todayStr()
  const dayOfWeek = new Date().getDay()

  const questionGoal = QUESTION_GOALS[dayOfWeek]
  const accuracyGoal = ACCURACY_GOALS[dayOfWeek]

  let todayQuizzes: QuizEntry[] = []
  try {
    const raw = localStorage.getItem("quiz-history")
    const history: QuizEntry[] = raw ? JSON.parse(raw) : []
    todayQuizzes = history.filter((e) => e.date === today)
  } catch {}

  const todaySessions = todayQuizzes.length
  const totalQuestionsToday = todayQuizzes.reduce((s, e) => s + (e.totalQuestions || 0), 0)
  const bestAccuracyToday =
    todayQuizzes.length > 0 ? Math.max(...todayQuizzes.map((e) => e.accuracy || 0)) : 0

  return [
    {
      id: "session",
      emoji: "🎮",
      title: "오늘의 퀴즈",
      titleEn: "Daily Quiz",
      desc: "퀴즈 1세션 완료",
      descEn: "Complete 1 quiz session",
      current: Math.min(todaySessions, 1),
      target: 1,
      done: todaySessions >= 1,
      percent: todaySessions >= 1 ? 100 : 0,
    },
    {
      id: "questions",
      emoji: "📝",
      title: "문제 도전",
      titleEn: "Question Challenge",
      desc: `${questionGoal}문제 풀기`,
      descEn: `Answer ${questionGoal} questions`,
      current: Math.min(totalQuestionsToday, questionGoal),
      target: questionGoal,
      done: totalQuestionsToday >= questionGoal,
      percent: Math.min(Math.round((totalQuestionsToday / questionGoal) * 100), 100),
    },
    {
      id: "accuracy",
      emoji: "🎯",
      title: "정확도 도전",
      titleEn: "Accuracy Challenge",
      desc: `정답률 ${accuracyGoal}% 이상`,
      descEn: `${accuracyGoal}%+ accuracy`,
      current: Math.round(bestAccuracyToday),
      target: accuracyGoal,
      done: bestAccuracyToday >= accuracyGoal,
      percent: Math.min(Math.round((bestAccuracyToday / accuracyGoal) * 100), 100),
    },
  ]
}

export function getCompletedChallengeCount(): number {
  return getTodayChallenges().filter((c) => c.done).length
}
