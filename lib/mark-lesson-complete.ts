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
  const now = Date.now()
  // localStorage 즉시 업데이트
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const existingKeys = new Set(bank.map(e => `${e.lessonId}|${e.stepIndex}`))
    for (const idx of stepIndices) {
      const key = `${normalizedId}|${idx}`
      if (!existingKeys.has(key)) {
        bank.push({ lessonId: normalizedId, stepIndex: idx, addedAt: now })
        existingKeys.add(key)
      }
    }
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
  } catch {}
  // Supabase 동기화 — 백그라운드 (실패해도 학습 흐름 안 끊김)
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      const rows = stepIndices.map(idx => ({
        user_id: user.id,
        lesson_id: normalizedId,
        step_index: idx,
        added_at: new Date(now).toISOString(),
        mastered: false,
      }))
      supabase
        .from("wrong_question_bank")
        .upsert(rows, { onConflict: "user_id,lesson_id,step_index", ignoreDuplicates: true })
        .then(({ error }) => {
          if (error) console.error("[addToWrongBank] supabase upsert failed:", error.message)
        })
    })
  }).catch(() => {})
}

export function getWrongBank(): WrongQuestionEntry[] {
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

/**
 * Supabase 에서 창고 동기화 — 로그인 시 호출.
 * DB 와 localStorage merge: 양쪽 합집합, mastered 는 OR (한 쪽이라도 마스터면 마스터)
 */
export async function syncWrongBankFromSupabase(): Promise<WrongQuestionEntry[]> {
  if (typeof window === "undefined") return []
  try {
    const { createClient } = await import("./supabase/client")
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return getWrongBank()
    const { data: dbRows, error } = await supabase
      .from("wrong_question_bank")
      .select("lesson_id, step_index, added_at, mastered")
      .eq("user_id", user.id)
    if (error || !dbRows) return getWrongBank()
    // localStorage 와 merge
    const localBank = getWrongBank()
    const merged = new Map<string, WrongQuestionEntry>()
    for (const e of localBank) {
      merged.set(`${e.lessonId}|${e.stepIndex}`, { ...e })
    }
    for (const row of dbRows) {
      const key = `${row.lesson_id}|${row.step_index}`
      const ex = merged.get(key)
      if (!ex) {
        merged.set(key, {
          lessonId: row.lesson_id,
          stepIndex: row.step_index,
          addedAt: new Date(row.added_at).getTime(),
          mastered: row.mastered,
        })
      } else {
        // mastered = OR (한 쪽이라도 마스터면 마스터)
        ex.mastered = ex.mastered || row.mastered
      }
    }
    const result = [...merged.values()]
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(result))
    return result
  } catch {
    return getWrongBank()
  }
}

export function markWrongQuestionMastered(lessonId: string | number, stepIndex: number) {
  const normalizedId = String(lessonId)
  // localStorage 즉시 업데이트
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const idx = bank.findIndex(e => e.lessonId === normalizedId && e.stepIndex === stepIndex)
    if (idx >= 0) {
      bank[idx].mastered = true
      localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
    }
  } catch {}
  // Supabase 동기화 — 백그라운드
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      // upsert (없으면 mastered=true 로 새로 추가, 있으면 update)
      supabase
        .from("wrong_question_bank")
        .upsert({
          user_id: user.id,
          lesson_id: normalizedId,
          step_index: stepIndex,
          added_at: new Date().toISOString(),
          mastered: true,
        }, { onConflict: "user_id,lesson_id,step_index" })
        .then(({ error }) => {
          if (error) console.error("[markWrongQuestionMastered] supabase upsert failed:", error.message)
        })
    })
  }).catch(() => {})
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
