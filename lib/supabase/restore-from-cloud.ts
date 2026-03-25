import { createClient } from "./client"
import type { QuizHistoryEntry } from "@/lib/quiz-history"

/**
 * 로그인 시 Supabase 데이터를 localStorage에 복원
 * — 다른 기기/브라우저 데이터 삭제 후에도 클라우드 데이터 복구
 * — 이미 localStorage에 데이터가 있으면 skip (기존 데이터 보존)
 * — auth-context.tsx에서 SIGNED_IN 이벤트 시 호출
 */
export async function restoreFromCloud(userId: string) {
  const supabase = createClient()

  try {
    // 병렬로 모든 데이터 로드
    const [quizResult, lessonResult, prefResult, masteryResult] = await Promise.allSettled([
      supabase
        .from("quiz_sessions")
        .select("*")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false })
        .limit(100),
      supabase
        .from("lesson_progress")
        .select("lesson_id, completed, progress_type, updated_at")
        .eq("user_id", userId)
        .eq("completed", true)
        .or("progress_type.eq.learn,progress_type.eq.quiz,progress_type.is.null"),
      supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", userId)
        .single(),
      supabase
        .from("question_mastery")
        .select("question_id,box,correct_streak,total_attempts,total_correct,last_review_date,next_review_date,last_grade")
        .eq("user_id", userId),
    ])

    // 1. 퀴즈 이력 복원 (quiz_sessions → quiz-history localStorage)
    if (quizResult.status === "fulfilled" && quizResult.value.data?.length) {
      restoreQuizHistory(quizResult.value.data)
    }

    // 2. 완료 수업 + 퀴즈 복습 복원
    if (lessonResult.status === "fulfilled" && lessonResult.value.data?.length) {
      const allLessons = lessonResult.value.data
      const learnLessons = allLessons.filter(l => l.progress_type === "learn" || !l.progress_type)
      const quizLessons = allLessons.filter(l => l.progress_type === "quiz")
      if (learnLessons.length) restoreCompletedLessons(learnLessons)
      if (quizLessons.length) restoreCompletedQuizzes(quizLessons)
    }

    // 3. 활동 로그 복원 (quiz + lesson 날짜 → activity-log localStorage)
    restoreActivityLog(
      quizResult.status === "fulfilled" ? quizResult.value.data || [] : [],
      lessonResult.status === "fulfilled" ? lessonResult.value.data || [] : []
    )

    // 4. 설정 복원
    if (prefResult.status === "fulfilled" && prefResult.value.data) {
      restorePreferences(prefResult.value.data)
    }

    // 5. question-mastery 복원
    if (masteryResult.status === "fulfilled" && masteryResult.value.data?.length) {
      restoreQuestionMastery(masteryResult.value.data)
    }

    // 복원 완료 알림 → 커리큘럼 등 UI 갱신 트리거
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cloud-data-restored"))
    }
  } catch (error) {
    console.error("[RestoreFromCloud] error:", error)
  }
}

/** quiz_sessions → QuizHistoryEntry[] → localStorage */
function restoreQuizHistory(sessions: Record<string, unknown>[]) {
  const existingRaw = localStorage.getItem("quiz-history")
  const existing: QuizHistoryEntry[] = existingRaw ? JSON.parse(existingRaw) : []

  // 이미 로컬에 데이터가 있으면 merge
  const existingTimestamps = new Set(existing.map(e => e.timestamp))

  const cloudEntries: QuizHistoryEntry[] = sessions
    .map(session => {
      const completedAt = new Date(session.completed_at as string)
      const timestamp = completedAt.getTime()

      // 중복 skip
      if (existingTimestamps.has(timestamp)) return null

      // question_details에서 topicResults 집계
      const details = (session.question_details as Array<Record<string, unknown>>) || []
      const topicMap = new Map<string, { correct: number; total: number }>()
      for (const q of details) {
        const topics = (q.related_topics as string[])?.length ? (q.related_topics as string[]) : ["일반"]
        for (const topic of topics) {
          const prev = topicMap.get(topic) || { correct: 0, total: 0 }
          topicMap.set(topic, {
            correct: prev.correct + (q.is_correct ? 1 : 0),
            total: prev.total + 1,
          })
        }
      }
      const topicResults = Array.from(topicMap.entries()).map(([topic, { correct, total }]) => ({ topic, correct, total }))

      const totalQ = session.total_questions as number
      const correctA = session.correct_answers as number

      return {
        id: (session.id as string) || `${timestamp}-cloud`,
        date: completedAt.toISOString().slice(0, 10),
        timestamp,
        totalQuestions: totalQ,
        correctAnswers: correctA,
        accuracy: totalQ > 0 ? Math.round((correctA / totalQ) * 100) : 0,
        maxCombo: (session.max_combo as number) || 0,
        timeElapsedMs: (session.time_elapsed_ms as number) || 0,
        difficulty: (session.difficulty as string) || "mixed",
        endReason: (session.end_reason as "completed" | "hearts") || "completed",
        xpEarned: (session.xp_earned as number) || 0,
        topicResults,
      } satisfies QuizHistoryEntry
    })
    .filter((e): e is QuizHistoryEntry => e !== null)

  // 기존 + 클라우드 합치고 최신순 정렬, 100건 제한
  const merged = [...existing, ...cloudEntries]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 100)

  try {
    localStorage.setItem("quiz-history", JSON.stringify(merged))
  } catch {}
}

/** lesson_progress (completed, learn) → completedLessons localStorage */
function restoreCompletedLessons(lessons: Record<string, unknown>[]) {
  const existingRaw = localStorage.getItem("completedLessons")
  const existing: string[] = existingRaw ? JSON.parse(existingRaw) : []

  const cloudIds = lessons.map(l => l.lesson_id as string)
  const merged = Array.from(new Set([...existing, ...cloudIds]))

  try {
    localStorage.setItem("completedLessons", JSON.stringify(merged))
  } catch {}
}

/** lesson_progress (completed, quiz) → completedQuizzes localStorage */
function restoreCompletedQuizzes(lessons: Record<string, unknown>[]) {
  const existingRaw = localStorage.getItem("completedQuizzes")
  const existing: string[] = existingRaw ? JSON.parse(existingRaw) : []

  const cloudIds = lessons.map(l => l.lesson_id as string)
  const merged = Array.from(new Set([...existing, ...cloudIds]))

  try {
    localStorage.setItem("completedQuizzes", JSON.stringify(merged))
  } catch {}
}

/** quiz + lesson 날짜 → activity-log localStorage */
function restoreActivityLog(
  sessions: Record<string, unknown>[],
  lessons: Record<string, unknown>[]
) {
  const existingRaw = localStorage.getItem("activity-log")
  const existing: Record<string, number> = existingRaw ? JSON.parse(existingRaw) : {}

  const cloudMap: Record<string, number> = {}

  // 퀴즈 세션 날짜 카운트
  for (const s of sessions) {
    const date = new Date(s.completed_at as string).toISOString().slice(0, 10)
    cloudMap[date] = (cloudMap[date] || 0) + 1
  }

  // 완료 수업 날짜 카운트
  for (const l of lessons) {
    const date = new Date(l.updated_at as string).toISOString().slice(0, 10)
    cloudMap[date] = (cloudMap[date] || 0) + 1
  }

  // merge: 날짜별 max 값
  const merged: Record<string, number> = { ...existing }
  for (const [date, count] of Object.entries(cloudMap)) {
    merged[date] = Math.max(merged[date] || 0, count)
  }

  try {
    localStorage.setItem("activity-log", JSON.stringify(merged))
  } catch {}
}

/** question_mastery rows → localStorage (클라우드 데이터 우선, 더 높은 totalAttempts 사용) */
function restoreQuestionMastery(rows: Record<string, unknown>[]) {
  const existingRaw = localStorage.getItem("question-mastery")
  const existing: Record<number, unknown> = existingRaw ? JSON.parse(existingRaw) : {}

  for (const row of rows) {
    const qId = row.question_id as number
    const local = existing[qId] as Record<string, unknown> | undefined

    // 로컬에 더 많은 시도 기록이 있으면 로컬 우선 (더 최신)
    const localAttempts = (local?.totalAttempts as number) || 0
    const cloudAttempts = row.total_attempts as number
    if (localAttempts >= cloudAttempts) continue

    existing[qId] = {
      questionId: qId,
      box: row.box,
      correctStreak: row.correct_streak,
      totalAttempts: cloudAttempts,
      totalCorrect: row.total_correct,
      lastReviewDate: row.last_review_date,
      nextReviewDate: row.next_review_date,
      lastGrade: row.last_grade,
    }
  }

  try {
    localStorage.setItem("question-mastery", JSON.stringify(existing))
  } catch {}
}

/** user_preferences → localStorage */
function restorePreferences(prefs: Record<string, unknown>) {
  try {
    if (prefs.language) {
      localStorage.setItem("language", prefs.language as string)
    }
    if (prefs.sound_muted !== undefined) {
      localStorage.setItem("sound-muted", String(prefs.sound_muted))
    }
    if (prefs.library_variants && typeof prefs.library_variants === "object") {
      const variants = prefs.library_variants as Record<string, string>
      for (const [lessonId, variant] of Object.entries(variants)) {
        localStorage.setItem(`library-variant-${lessonId}`, variant)
      }
    }
  } catch {}
}
