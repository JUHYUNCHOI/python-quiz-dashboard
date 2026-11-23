/**
 * 승급 시험 — 3단계 승급의 ②·③ 단계.
 *
 *   ① 집에서 연습   자기 티어 문제 10개 통과 → "승급 자격"  (`lib/tier-store.ts`)
 *   ② 학교에서 시험  선생님이 교실에서 열어 줌 → 랜덤 3문제 / 40분   (여기)
 *   ③ 승급          2문제 이상 통과하면 티어 업, 아니면 다음 시험 재도전 (여기)
 *
 * ── 왜 "선생님이 열어 줘야" 하는가 ────────────────────────────────────────
 * 요구사항은 "인터넷 검색 및 AI 사용 없이 진행"이다. 웹앱은 그걸 막을 수
 * 없다 — 탭을 하나 더 여는 걸 코드로 감지할 방법이 없고, 감지한다고 해도
 * 숨기면 끝이다. 실제로 그 규칙을 지키게 하는 건 **교실에 선생님이 있는
 * 상태**뿐이다. 그래서 시험은 학생이 아무 때나 시작할 수 없고, 선생님이
 * 반 단위로 "시험 창"을 열어 준 동안에만 시작된다.
 *
 * ── 왜 진행 상태를 localStorage 에 두는가 ─────────────────────────────────
 * 시험 중에 학생은 문제 화면(`/algo/*`)으로 떠난다. 서버 왕복만 믿으면
 * 로그인 안 한 학생·네트워크가 끊긴 교실에서 시험이 통째로 날아간다.
 * `lib/tier-store.ts` 와 같은 규칙 — localStorage 가 1차, 서버는 사본이다.
 *
 * ── 통과 판정은 어디서 오는가 ─────────────────────────────────────────────
 * 따로 만들지 않는다. PracticeRunner 의 "테스트케이스 전부 통과" 분기가
 * 쓰는 `tier-verified` 기록을 그대로 읽는다. 시험 시작 시각 이후에 찍힌
 * 기록만 센다 — 시험 전에 풀어 둔 문제가 시험 점수가 되면 안 된다.
 */

import { createClient } from "@/lib/supabase/client"
import { promotionPool, type TierId } from "@/lib/tier-system"
import { loadVerifiedSolves } from "@/lib/tier-store"

/** 시험 문제 수 — 요구사항 "랜덤 문제 2~3개". */
export const EXAM_PROBLEM_COUNT = 3
/** 제한 시간(분) — 요구사항 "30~45분". 선생님이 이 중에서 고른다. */
export const EXAM_MINUTE_CHOICES = [30, 40, 45]
export const EXAM_MINUTES_DEFAULT = 40
/** 합격선. 3문제 중 2문제. */
export const EXAM_PASS_COUNT = 2

const ATTEMPT_KEY = "tier-exam-attempt"

/** 선생님이 열어 둔 시험 창. */
export interface ExamWindow {
  id: string
  classId: string
  className: string
  closesAt: string
}

/** 학생 한 명의 응시 1회. */
export interface ExamAttempt {
  tier: TierId
  /** 이 시험에 뽑힌 문제 id. 뽑고 나면 고정 — 새로고침으로 다시 뽑을 수 없다. */
  problemIds: string[]
  startedAt: string
  deadline: string
  /** 어느 시험 창에서 시작했나. 선생님이 창을 닫으면 더 못 쓴다. */
  windowId: string | null
  /** 채점 완료 시각. null 이면 진행 중. */
  finishedAt: string | null
  passed: boolean
  /** 통과한 문제 수 (채점 시점에 확정) */
  score: number
}

function canUseStorage(): boolean {
  return typeof window !== "undefined"
}

// ── 문제 뽑기 ──────────────────────────────────────────────────────────────

/**
 * 자기 티어의 자체채점 문제에서 무작위로 뽑는다.
 *
 * **이미 통과한 문제는 뒤로 미룬다.** ① 단계에서 10문제를 푼 학생에게 그
 * 10개 중 하나를 다시 내면 시험이 아니라 복습이다. 티어당 자체채점 문제가
 * 55~86개라 안 푼 문제가 바닥날 일은 없지만, 바닥나면 푼 문제로 채운다 —
 * 문제가 없어서 승급을 못 하는 막다른 길은 만들지 않는다.
 */
export function pickExamProblems(tier: TierId, solvedIds: Set<string>): string[] {
  const pool = promotionPool(tier).map(p => p.id)
  const fresh = shuffle(pool.filter(id => !solvedIds.has(id)))
  const used = shuffle(pool.filter(id => solvedIds.has(id)))
  return [...fresh, ...used].slice(0, EXAM_PROBLEM_COUNT)
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── 응시 상태 ──────────────────────────────────────────────────────────────

export function loadAttempt(): ExamAttempt | null {
  if (!canUseStorage()) return null
  try {
    const raw = localStorage.getItem(ATTEMPT_KEY)
    if (!raw) return null
    const v = JSON.parse(raw) as Partial<ExamAttempt>
    if (!Array.isArray(v.problemIds) || typeof v.startedAt !== "string" || typeof v.deadline !== "string") {
      return null
    }
    return {
      tier: v.tier as TierId,
      problemIds: v.problemIds.filter((x): x is string => typeof x === "string"),
      startedAt: v.startedAt,
      deadline: v.deadline,
      windowId: typeof v.windowId === "string" ? v.windowId : null,
      finishedAt: typeof v.finishedAt === "string" ? v.finishedAt : null,
      passed: v.passed === true,
      score: typeof v.score === "number" ? v.score : 0,
    }
  } catch {
    return null
  }
}

function writeAttempt(a: ExamAttempt): ExamAttempt {
  if (canUseStorage()) {
    try { localStorage.setItem(ATTEMPT_KEY, JSON.stringify(a)) } catch {}
  }
  return a
}

export function clearAttempt(): void {
  if (!canUseStorage()) return
  try { localStorage.removeItem(ATTEMPT_KEY) } catch {}
}

export function startAttempt(tier: TierId, win: ExamWindow | null, minutes: number): ExamAttempt {
  const now = Date.now()
  const solved = new Set(Object.keys(loadVerifiedSolves()))
  // 시험 창이 먼저 닫히면 그때까지만. 제한 시간이 남았어도 수업이 끝나면 끝이다.
  const byClock = now + minutes * 60_000
  const byWindow = win ? new Date(win.closesAt).getTime() : byClock
  const attempt: ExamAttempt = {
    tier,
    problemIds: pickExamProblems(tier, solved),
    startedAt: new Date(now).toISOString(),
    deadline: new Date(Math.min(byClock, byWindow)).toISOString(),
    windowId: win?.id ?? null,
    finishedAt: null,
    passed: false,
    score: 0,
  }
  void pushAttempt(attempt)
  return writeAttempt(attempt)
}

/** 남은 시간(ms). 0 이면 끝났다. */
export function remainingMs(a: ExamAttempt, now = Date.now()): number {
  return Math.max(0, new Date(a.deadline).getTime() - now)
}

/**
 * 지금까지 통과한 시험 문제 수.
 * **시험 시작 이후에 찍힌 기록만** 센다 — 미리 풀어 둔 건 점수가 아니다.
 */
export function examScore(a: ExamAttempt): number {
  const solves = loadVerifiedSolves()
  let n = 0
  for (const id of a.problemIds) {
    const at = solves[id]
    if (at && at >= a.startedAt) n++
  }
  return n
}

export function isSolvedInExam(a: ExamAttempt, problemId: string): boolean {
  const at = loadVerifiedSolves()[problemId]
  return !!at && at >= a.startedAt
}

/** 채점 확정. 시간이 다 됐거나 학생이 제출을 눌렀을 때 한 번만 부른다. */
export function finishAttempt(a: ExamAttempt): ExamAttempt {
  if (a.finishedAt) return a
  const score = examScore(a)
  const done: ExamAttempt = {
    ...a,
    finishedAt: new Date().toISOString(),
    score,
    passed: score >= EXAM_PASS_COUNT,
  }
  void pushAttempt(done)
  return writeAttempt(done)
}

// ── 서버 사본 ──────────────────────────────────────────────────────────────

/**
 * 응시 기록을 서버에 남긴다. **실패해도 조용히 넘긴다** — 시험 중에
 * 네트워크가 끊겼다고 학생 화면이 멈추면 안 된다. 선생님 화면이 응시
 * 현황을 보려면 이 기록이 필요하지만, 없으면 "아직 시작 안 함"으로
 * 보일 뿐 시험 자체는 굴러간다.
 */
async function pushAttempt(a: ExamAttempt): Promise<void> {
  if (!canUseStorage() || !a.windowId) return
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("tier_exam_attempts").upsert({
      window_id: a.windowId,
      user_id: user.id,
      tier: a.tier,
      problem_ids: a.problemIds,
      started_at: a.startedAt,
      deadline: a.deadline,
      score: a.score,
      finished_at: a.finishedAt,
      passed: a.finishedAt ? a.passed : null,
    }, { onConflict: "window_id,user_id" })
  } catch {
    /* 무음 */
  }
}

/**
 * 내가 속한 반에 지금 열려 있는 시험 창. 없으면 null — 학생 화면은
 * "시험 대기"로 남는다.
 *
 * 테이블이 아직 없는 환경(마이그레이션 008 미적용)에서도 null 을 돌려줘야
 * 한다. 예외를 던지면 `/tier/exam` 이 통째로 빈 화면이 된다.
 */
export async function fetchOpenWindow(): Promise<ExamWindow | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("tier_exam_windows")
      .select("id, class_id, closes_at, classes(name)")
      .gt("closes_at", new Date().toISOString())
      .order("closes_at", { ascending: false })
      .limit(1)
    if (error || !data?.length) return null
    const row = data[0] as unknown as {
      id: string; class_id: string; closes_at: string; classes: { name: string } | null
    }
    return {
      id: row.id,
      classId: row.class_id,
      className: row.classes?.name ?? "",
      closesAt: row.closes_at,
    }
  } catch {
    return null
  }
}

// ── 선생님 쪽 ──────────────────────────────────────────────────────────────

export async function openExamWindow(classId: string, minutes: number): Promise<ExamWindow | null> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const closesAt = new Date(Date.now() + minutes * 60_000).toISOString()
    const { data, error } = await supabase
      .from("tier_exam_windows")
      .insert({ class_id: classId, opened_by: user.id, closes_at: closesAt, minutes })
      .select("id, class_id, closes_at")
      .single()
    if (error || !data) return null
    return { id: data.id, classId: data.class_id, className: "", closesAt: data.closes_at }
  } catch {
    return null
  }
}

/** 창 닫기 — `closes_at` 을 지금으로 당긴다. 지운 기록은 남겨 둔다. */
export async function closeExamWindow(windowId: string): Promise<void> {
  try {
    const supabase = createClient()
    await supabase
      .from("tier_exam_windows")
      .update({ closes_at: new Date().toISOString() })
      .eq("id", windowId)
  } catch {
    /* 무음 */
  }
}

export interface ExamRoster {
  userId: string
  name: string
  tier: string
  score: number
  finished: boolean
  passed: boolean | null
}

/** 한 시험 창의 응시 현황. 선생님 화면에서 10초마다 다시 읽는다. */
export async function fetchRoster(windowId: string): Promise<ExamRoster[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("tier_exam_attempts")
      .select("user_id, tier, score, finished_at, passed, profiles(display_name)")
      .eq("window_id", windowId)
    if (error || !data) return []
    return (data as unknown as {
      user_id: string; tier: string; score: number
      finished_at: string | null; passed: boolean | null
      profiles: { display_name: string | null } | null
    }[]).map(r => ({
      userId: r.user_id,
      name: r.profiles?.display_name ?? "",
      tier: r.tier,
      score: r.score ?? 0,
      finished: !!r.finished_at,
      passed: r.passed,
    }))
  } catch {
    return []
  }
}
