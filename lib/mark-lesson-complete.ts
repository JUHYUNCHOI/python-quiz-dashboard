/**
 * 수업/복습 완료 시 completedLessons localStorage에 추가 + Supabase 즉시 동기화
 * — 커리큘럼 페이지의 진도 추적에 사용
 */
export function markLessonComplete(lessonId: string | number) {
  const normalizedId = String(lessonId)

  try {
    const saved = localStorage.getItem("completedLessons")
    const completed: (string | number)[] = saved ? JSON.parse(saved) : []
    const set = new Set(completed.map(id => String(id)))
    set.add(normalizedId)
    localStorage.setItem("completedLessons", JSON.stringify([...set]))
  } catch {
    // localStorage 접근 불가 시 무시
  }

  // 로그인 상태이면 Supabase에도 즉시 저장
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: normalizedId,
        variant: "",
        progress_type: "learn",
        progress_data: {},
        completed: true,
        score: 0,
      }, { onConflict: "user_id,lesson_id,variant,progress_type" }).then(({ error }) => {
        if (error) console.error("[markLessonComplete] supabase upsert failed:", error.message)
      })
    })
  }).catch(() => {})
}

/**
 * 퀴즈(복습) 완료 시 completedQuizzes localStorage에 추가 + Supabase 즉시 동기화
 * — 커리큘럼 페이지에서 수업 완료와 별도로 퀴즈 완료 표시에 사용
 */
export function markQuizComplete(lessonId: string | number, score: number = 0) {
  const normalizedId = String(lessonId)
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)))

  try {
    const saved = localStorage.getItem("completedQuizzes")
    const completed: (string | number)[] = saved ? JSON.parse(saved) : []
    const set = new Set(completed.map(id => String(id)))
    set.add(normalizedId)
    localStorage.setItem("completedQuizzes", JSON.stringify([...set]))
    // 점수도 별도 localStorage 에 저장 (Supabase 동기화 실패 시 fallback / 빠른 read 용)
    const scoresRaw = localStorage.getItem("quiz-scores")
    const scores: Record<string, number> = scoresRaw ? JSON.parse(scoresRaw) : {}
    scores[normalizedId] = clampedScore
    localStorage.setItem("quiz-scores", JSON.stringify(scores))
  } catch {}

  // 로그인 상태이면 Supabase에도 즉시 저장 (점수 포함)
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: normalizedId,
        variant: "",
        progress_type: "quiz",
        progress_data: {},
        completed: true,
        score: clampedScore,
      }, { onConflict: "user_id,lesson_id,variant,progress_type" }).then(({ error }) => {
        if (error) console.error("[markQuizComplete] supabase upsert failed:", error.message)
      })
    })
  }).catch(() => {})
}

/** 저장된 quiz 점수 읽기 (localStorage 만 — 동기 read) */
export function getQuizScores(): Record<string, number> {
  try {
    const raw = localStorage.getItem("quiz-scores")
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

// ── 틀린 문제 창고 (wrong question bank) ──────────────────────
// 학생이 복습에서 틀린 문제 저장 → 나중에 따로 풀어볼 수 있음.
// 복습 자체는 *한 번만* (재시도 X). 틀린 건 창고에서 따로 마스터.

export interface WrongQuestionEntry {
  lessonId: string
  stepIndex: number
  addedAt: number
  mastered?: boolean   // 창고에서 다시 풀어 맞히면 true
}

const WRONG_BANK_KEY = "wrong-question-bank-v1"

export function addToWrongBank(lessonId: string | number, stepIndices: number[]) {
  if (stepIndices.length === 0) return
  const normalizedId = String(lessonId)
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const existingKeys = new Set(bank.map(e => `${e.lessonId}|${e.stepIndex}`))
    const now = Date.now()
    for (const idx of stepIndices) {
      const key = `${normalizedId}|${idx}`
      if (!existingKeys.has(key)) {
        bank.push({ lessonId: normalizedId, stepIndex: idx, addedAt: now })
        existingKeys.add(key)
      }
    }
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
  } catch {}
}

export function getWrongBank(): WrongQuestionEntry[] {
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function markWrongQuestionMastered(lessonId: string | number, stepIndex: number) {
  const normalizedId = String(lessonId)
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const idx = bank.findIndex(e => e.lessonId === normalizedId && e.stepIndex === stepIndex)
    if (idx >= 0) {
      bank[idx].mastered = true
      localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
    }
  } catch {}
}

/** completedQuizzes 읽기 */
export function getCompletedQuizzes(): Set<string | number> {
  try {
    const saved = localStorage.getItem("completedQuizzes")
    if (!saved) return new Set()
    const arr: (string | number)[] = JSON.parse(saved)
    return new Set(arr.map(id => {
      const s = String(id)
      return /^\d+$/.test(s) ? Number(s) : s
    }))
  } catch {
    return new Set()
  }
}
