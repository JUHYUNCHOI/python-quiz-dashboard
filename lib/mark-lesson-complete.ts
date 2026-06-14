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
  stepIndex: number           // review-source 인 경우: review 의 flat step index. learn-source 면 -1 (의미 없음)
  stepId?: string             // learn-source 인 경우: lesson step.id (예: "ch1-quiz1")
  source?: "review" | "learn" // 기본 "review" (생략 시 review 로 간주)
  addedAt: number             // 마지막으로 틀린/단계 변경된 시각 (다음 복습 due 계산 기준)
  mastered?: boolean          // 마스터 (자동 또는 수동) 시 true
  correctStreak?: number      // 연속 정답 수 (오답 시 0 리셋)
  lastCorrectAt?: number      // 마지막 정답 시각 (24h gap 체크용)
  box?: number                // learn-source 간격반복 단계 (1→1일,2→3일,3→7일,4→14일, 통과시 졸업). 기본 1
}

// 마스터 기준 — spaced repetition
const MASTERY_STREAK_REQUIRED = 2
const MASTERY_GAP_MS = 24 * 60 * 60 * 1000  // 24 시간

/**
 * 정답 시 호출. streak 증가 + 시간 경과 충족 시 자동 마스터.
 * 반환: { mastered: 이번에 마스터됐는지, streak: 현재 streak, needsGap: 시간 부족 여부 }
 */
export function recordCorrectAttempt(lessonId: string | number, stepIndex: number): {
  mastered: boolean
  streak: number
  needsGap: boolean
} {
  const normalizedId = String(lessonId)
  const now = Date.now()
  let resultMastered = false
  let resultStreak = 1
  let resultNeedsGap = false

  // localStorage 업데이트
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const idx = bank.findIndex(e => e.lessonId === normalizedId && e.stepIndex === stepIndex)
    if (idx >= 0) {
      const ex = bank[idx]
      const prevStreak = ex.correctStreak ?? 0
      const prevLast = ex.lastCorrectAt
      const newStreak = prevStreak + 1
      const gapOk = prevLast ? (now - prevLast) >= MASTERY_GAP_MS : false
      const shouldMaster = newStreak >= MASTERY_STREAK_REQUIRED && gapOk
      bank[idx] = {
        ...ex,
        correctStreak: shouldMaster ? newStreak : newStreak,
        lastCorrectAt: now,
        mastered: shouldMaster || ex.mastered,
      }
      resultMastered = shouldMaster
      resultStreak = newStreak
      resultNeedsGap = newStreak >= MASTERY_STREAK_REQUIRED && !gapOk
      localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
    }
  } catch {}

  // Supabase 동기화
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      // 먼저 현재 streak/last_correct_at 읽기 (race condition 회피 위해 RPC 가 이상적이지만 간소화)
      supabase
        .from("wrong_question_bank")
        .select("correct_streak, last_correct_at, mastered")
        .eq("user_id", user.id)
        .eq("lesson_id", normalizedId)
        .eq("step_index", stepIndex)
        .single()
        .then(({ data: row }) => {
          const prevStreak = row?.correct_streak ?? 0
          const prevLastIso = row?.last_correct_at
          const prevLast = prevLastIso ? new Date(prevLastIso).getTime() : null
          const newStreak = prevStreak + 1
          const gapOk = prevLast ? (now - prevLast) >= MASTERY_GAP_MS : false
          const shouldMaster = newStreak >= MASTERY_STREAK_REQUIRED && gapOk
          supabase
            .from("wrong_question_bank")
            .upsert({
              user_id: user.id,
              lesson_id: normalizedId,
              step_index: stepIndex,
              added_at: new Date(now).toISOString(),
              mastered: shouldMaster || row?.mastered || false,
              correct_streak: newStreak,
              last_correct_at: new Date(now).toISOString(),
            }, { onConflict: "user_id,lesson_id,step_index" })
            .then(({ error }) => {
              if (error) console.error("[recordCorrectAttempt] supabase upsert failed:", error.message)
            })
        })
    })
  }).catch(() => {})

  return { mastered: resultMastered, streak: resultStreak, needsGap: resultNeedsGap }
}

/**
 * 오답 시 호출. streak 0 리셋.
 */
export function recordWrongAttempt(lessonId: string | number, stepIndex: number) {
  const normalizedId = String(lessonId)
  // localStorage
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const idx = bank.findIndex(e => e.lessonId === normalizedId && e.stepIndex === stepIndex)
    if (idx >= 0) {
      bank[idx] = { ...bank[idx], correctStreak: 0 }
      localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
    }
  } catch {}
  // Supabase
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from("wrong_question_bank")
        .update({ correct_streak: 0 })
        .eq("user_id", user.id)
        .eq("lesson_id", normalizedId)
        .eq("step_index", stepIndex)
        .then(({ error }) => {
          if (error) console.error("[recordWrongAttempt] update failed:", error.message)
        })
    })
  }).catch(() => {})
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

/**
 * 수업 (/learn) 안에서 quiz/predict/fillblank 등 오답 시 호출.
 * source="learn" 로 마킹. stepId (lesson step.id) 로 식별.
 * Phase 1 MVP: localStorage 만 (Supabase 동기화는 schema 마이그레이션 후 Phase 2).
 */
// 간격 반복 (Leitner) — 틀린 문제는 단계가 오를수록 복습 간격이 늘어남.
// box 1→1일, 2→3일, 3→7일, 4→14일. box 4 에서 또 맞히면 졸업(마스터).
// 재도전에서 틀리면 box 1(1일)로 리셋.
const BOX_INTERVAL_DAYS: Record<number, number> = { 1: 1, 2: 3, 3: 7, 4: 14 }
export const WRONG_MAX_BOX = 4
const DAY_MS = 24 * 60 * 60 * 1000

function boxIntervalMs(box: number): number {
  return (BOX_INTERVAL_DAYS[box] ?? 1) * DAY_MS
}

/** 이 항목을 지금 다시 풀 수 있나 (마지막 변경 + 현재 단계 간격 경과) */
export function isWrongDue(entry: WrongQuestionEntry, now: number = Date.now()): boolean {
  return now >= entry.addedAt + boxIntervalMs(entry.box ?? 1)
}

/** 다시 풀 수 있을 때까지 남은 일수 (올림, 최소 0) */
export function wrongDaysUntilDue(entry: WrongQuestionEntry, now: number = Date.now()): number {
  return Math.max(0, Math.ceil((entry.addedAt + boxIntervalMs(entry.box ?? 1) - now) / DAY_MS))
}

export function addLearnWrongQuestion(lessonId: string | number, stepId: string) {
  if (!stepId) return
  const normalizedId = String(lessonId)
  const now = Date.now()
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    // 이미 있으면 addedAt 을 now 로 갱신 → 7일 복습 타이머 리셋 (재도전에서 또 틀리면 7일 뒤로 미룸)
    const existing = bank.find(e => e.source === "learn" && e.lessonId === normalizedId && e.stepId === stepId)
    if (existing) {
      existing.addedAt = now
      existing.mastered = false
      existing.box = 1   // 재도전에서 또 틀림 → 1단계(1일)로 리셋
    } else {
      bank.push({
        lessonId: normalizedId,
        stepIndex: -1, // sentinel (learn-source 에서는 의미 없음)
        stepId,
        source: "learn",
        addedAt: now,
        box: 1,
      })
    }
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
  } catch {}
}

/**
 * learn-source 항목을 마스터 처리 (✕ 또는 다시 풀어서 정답).
 * Phase 1 MVP: localStorage 만.
 */
export function markLearnWrongMastered(lessonId: string | number, stepId: string) {
  if (!stepId) return
  const normalizedId = String(lessonId)
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const idx = bank.findIndex(e => e.source === "learn" && e.lessonId === normalizedId && e.stepId === stepId)
    if (idx >= 0) {
      bank[idx] = { ...bank[idx], mastered: true }
      localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
    }
  } catch {}
}

/**
 * learn-source 항목을 재도전에서 맞힘 → 다음 단계로 승급 (간격 늘림).
 * box 4 에서 맞히면 졸업(mastered=true, 창고에서 사라짐). 창고에 없으면 무시(첫 정답 등).
 */
export function promoteLearnWrong(lessonId: string | number, stepId: string) {
  if (!stepId) return
  const normalizedId = String(lessonId)
  const now = Date.now()
  try {
    const raw = localStorage.getItem(WRONG_BANK_KEY)
    const bank: WrongQuestionEntry[] = raw ? JSON.parse(raw) : []
    const e = bank.find(x => x.source === "learn" && x.lessonId === normalizedId && x.stepId === stepId && !x.mastered)
    if (!e) return // 창고에 없으면(첫 정답 등) 아무것도 안 함
    const nextBox = (e.box ?? 1) + 1
    if (nextBox > WRONG_MAX_BOX) {
      e.mastered = true        // 마지막 단계 통과 → 졸업
    } else {
      e.box = nextBox
      e.addedAt = now          // 다음 단계 간격 타이머 시작
    }
    localStorage.setItem(WRONG_BANK_KEY, JSON.stringify(bank))
  } catch {}
}

/**
 * 나중에 다시 풀 문제 목록 (lesson-resolve-later).
 * 학생이 tryit/mission/quiz 를 못 맞히고 넘어가면 여기에 "<lessonId>:<stepId>" 로 기록.
 * 나중에 맞히면 제거. 별도 UI 가 이 목록을 surfacing 할 수 있음 (follow-up).
 * 기존 키(WRONG_BANK 등)와 독립 — 새 키만 추가.
 */
const RESOLVE_LATER_KEY = "lesson-resolve-later"

function resolveLaterKey(lessonId: string | number, stepId: string): string {
  return `${String(lessonId)}:${stepId}`
}

export function addResolveLater(lessonId: string | number, stepId: string) {
  if (!stepId) return
  const key = resolveLaterKey(lessonId, stepId)
  try {
    const raw = localStorage.getItem(RESOLVE_LATER_KEY)
    const list: string[] = raw ? JSON.parse(raw) : []
    if (!list.includes(key)) {
      list.push(key)
      localStorage.setItem(RESOLVE_LATER_KEY, JSON.stringify(list))
    }
  } catch {}
}

export function removeResolveLater(lessonId: string | number, stepId: string) {
  if (!stepId) return
  const key = resolveLaterKey(lessonId, stepId)
  try {
    const raw = localStorage.getItem(RESOLVE_LATER_KEY)
    if (!raw) return
    const list: string[] = JSON.parse(raw)
    const next = list.filter(k => k !== key)
    if (next.length !== list.length) {
      localStorage.setItem(RESOLVE_LATER_KEY, JSON.stringify(next))
    }
  } catch {}
}

export function getResolveLater(): string[] {
  try {
    const raw = localStorage.getItem(RESOLVE_LATER_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
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
      .select("lesson_id, step_index, added_at, mastered, correct_streak, last_correct_at")
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
      const dbStreak = row.correct_streak ?? 0
      const dbLastCorrect = row.last_correct_at ? new Date(row.last_correct_at).getTime() : undefined
      if (!ex) {
        merged.set(key, {
          lessonId: row.lesson_id,
          stepIndex: row.step_index,
          addedAt: new Date(row.added_at).getTime(),
          mastered: row.mastered,
          correctStreak: dbStreak,
          lastCorrectAt: dbLastCorrect,
        })
      } else {
        // mastered = OR (한 쪽이라도 마스터면 마스터)
        ex.mastered = ex.mastered || row.mastered
        // streak/lastCorrect = 더 큰/최신 값
        ex.correctStreak = Math.max(ex.correctStreak ?? 0, dbStreak)
        const localLast = ex.lastCorrectAt ?? 0
        if (dbLastCorrect && dbLastCorrect > localLast) ex.lastCorrectAt = dbLastCorrect
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
