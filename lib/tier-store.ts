/**
 * 티어 상태 저장소 — 배치 결과와 "채점으로 통과한 문제"를 보관한다.
 *
 * ── 왜 기존 `practice-solved` 를 그대로 쓰지 않는가 ───────────────────────
 * `practice-solved` 와 `algo-*-contest-solved` 에는 **수동 체크박스**가 쓴 id 가
 * 섞여 있다. 승급 조건으로 쓰면 체크 10번에 티어가 오른다. 그래서 승급 카운트는
 * 여기 `tier-verified` 에 따로 적는다 — 적는 곳은 PracticeRunner 의 "모든
 * 테스트케이스 통과" 분기 하나뿐이다.
 *
 * ── 왜 통과 시각을 함께 적는가 ────────────────────────────────────────────
 * 승급은 "지금 티어에서 10문제"다. 시각이 없으면 (1) 이미 이 앱을 오래 쓴 학생은
 * 배치 직후 바로 승급 조건을 채우고, (2) 상위 티어 문제를 미리 풀어두면 승급
 * 즉시 또 승급하는 연쇄가 생긴다. 티어에 들어온 시각 이후의 통과만 센다.
 */

import { isValidTier, nextTier, PROMOTION_TARGET, promotionPool, type TierId } from "@/lib/tier-system"

const STATE_KEY = "tier-state"
const SOLVE_KEY = "tier-verified"

export interface TierState {
  tier: TierId
  /** 지금 티어에 들어온 시각(ISO). 승급 카운트의 기준점. */
  since: string
  /** 배치고사를 본 시각. null 이면 아직 미응시. */
  placedAt: string | null
  /** 승급 이력 — 결과 화면과 리더보드 설명에 쓴다. */
  history: { tier: TierId; at: string }[]
}

/** id → 테스트케이스를 모두 통과한 시각(ISO). */
export type VerifiedSolves = Record<string, string>

function canUseStorage(): boolean {
  return typeof window !== "undefined"
}

/**
 * 서버 반영은 **실패해도 조용히 넘긴다.**
 * 로그인 안 한 학생도 티어 시스템을 쓸 수 있어야 하고, 네트워크가 끊겼다고
 * 승급 버튼이 막히면 안 된다. localStorage 가 1차 저장소, 서버는 기기 간
 * 이전용 사본이다.
 */
function push(path: string, method: "PUT" | "POST", body: unknown): void {
  if (!canUseStorage()) return
  void fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {})
}

export function loadTierState(): TierState | null {
  if (!canUseStorage()) return null
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) return null
    const v = JSON.parse(raw) as Partial<TierState>
    // 저장된 값을 믿지 않는다 — 손으로 고친 localStorage 로 그랜드마스터가 되면 안 된다.
    if (!isValidTier(v.tier) || typeof v.since !== "string") return null
    return {
      tier: v.tier,
      since: v.since,
      placedAt: typeof v.placedAt === "string" ? v.placedAt : null,
      history: Array.isArray(v.history)
        ? v.history.filter(h => isValidTier(h?.tier) && typeof h?.at === "string")
        : [],
    }
  } catch {
    return null
  }
}

function writeState(s: TierState): TierState {
  if (canUseStorage()) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(s)) } catch {}
  }
  push("/api/tier", "PUT", s)
  return s
}

/** 배치고사 결과 반영. 재응시하면 결과로 덮어쓰고 카운트도 0부터 다시 센다. */
export function placeTier(tier: TierId): TierState {
  const at = new Date().toISOString()
  const prev = loadTierState()
  return writeState({
    tier,
    since: at,
    placedAt: at,
    history: [...(prev?.history ?? []), { tier, at }],
  })
}

export function loadVerifiedSolves(): VerifiedSolves {
  if (!canUseStorage()) return {}
  try {
    const raw = localStorage.getItem(SOLVE_KEY)
    if (!raw) return {}
    const v = JSON.parse(raw) as unknown
    if (!v || typeof v !== "object" || Array.isArray(v)) return {}
    const out: VerifiedSolves = {}
    for (const [id, at] of Object.entries(v as Record<string, unknown>)) {
      if (typeof at === "string") out[id] = at
    }
    return out
  } catch {
    return {}
  }
}

/**
 * 채점 통과 기록. **PracticeRunner 의 전체 통과 분기에서만 부른다.**
 * 이미 있으면 첫 통과 시각을 유지한다 — 다시 풀어서 시각을 갱신하면
 * 승급 기준점을 우회할 수 있다.
 */
export function recordVerifiedSolve(problemId: string): void {
  if (!canUseStorage() || !problemId) return
  try {
    const cur = loadVerifiedSolves()
    if (cur[problemId]) return
    const at = new Date().toISOString()
    cur[problemId] = at
    localStorage.setItem(SOLVE_KEY, JSON.stringify(cur))
    push("/api/tier", "POST", { problemId, solvedAt: at })
  } catch {}
}

/**
 * 서버 사본을 내려받아 localStorage 와 합친다. `/tier` 진입 때 한 번 부른다.
 *
 * 상태는 `since` 가 더 최신인 쪽을 택한다. 배치고사와 승급 둘 다 `since` 를
 * 지금으로 쓰므로, 늦은 `since` = 마지막 행동이다. 기기 두 대를 쓰다 한쪽이
 * 승급했으면 그 결과가 남는다.
 *
 * 통과 기록은 합집합이되 **더 이른 시각**을 남긴다. 늦은 시각을 택하면 승급
 * 기준점(`since`) 뒤로 기록이 밀려 이미 센 문제가 다시 세어진다.
 */
export async function syncTierFromServer(): Promise<{
  state: TierState | null
  solves: VerifiedSolves
}> {
  const local = { state: loadTierState(), solves: loadVerifiedSolves() }
  if (!canUseStorage()) return local

  try {
    const res = await fetch("/api/tier")
    if (!res.ok) return local
    const remote = await res.json() as { state: unknown; solves: unknown }

    let state = local.state
    const rs = remote.state as Partial<TierState> | null
    if (rs && isValidTier(rs.tier) && typeof rs.since === "string") {
      if (!state || rs.since > state.since) {
        state = {
          tier: rs.tier,
          since: rs.since,
          placedAt: typeof rs.placedAt === "string" ? rs.placedAt : null,
          history: Array.isArray(rs.history) ? rs.history : [],
        }
        try { localStorage.setItem(STATE_KEY, JSON.stringify(state)) } catch {}
      }
    }

    const solves = { ...local.solves }
    let changed = false
    const rsv = remote.solves
    if (rsv && typeof rsv === "object" && !Array.isArray(rsv)) {
      for (const [id, at] of Object.entries(rsv as Record<string, unknown>)) {
        if (typeof at !== "string") continue
        if (!solves[id] || at < solves[id]) { solves[id] = at; changed = true }
      }
    }
    if (changed) {
      try { localStorage.setItem(SOLVE_KEY, JSON.stringify(solves)) } catch {}
    }

    return { state, solves }
  } catch {
    return local
  }
}

export interface TierProgress {
  tier: TierId
  solved: number
  target: number
  canPromote: boolean
  next: TierId | null
  /** 이 티어에서 아직 안 푼 승급용 문제 수 */
  remaining: number
}

/** 지금 티어 기준 승급 진행도. `since` 이후의 통과만 센다. */
export function tierProgress(state: TierState, solves: VerifiedSolves): TierProgress {
  const pool = promotionPool(state.tier)
  let solved = 0
  for (const p of pool) {
    const at = solves[p.id]
    if (at && at >= state.since) solved++
  }
  const next = nextTier(state.tier)
  return {
    tier: state.tier,
    solved,
    target: PROMOTION_TARGET,
    canPromote: solved >= PROMOTION_TARGET && next !== null,
    next,
    remaining: Math.max(0, pool.length - solved),
  }
}

/**
 * 승급. 조건을 못 채웠거나 최상위면 `null` — 호출하는 쪽에서 버튼을 숨기더라도
 * 여기서 한 번 더 막는다. 버튼만 숨기면 콘솔에서 부를 수 있다.
 */
export function promoteTier(state: TierState, solves: VerifiedSolves): TierState | null {
  const prog = tierProgress(state, solves)
  if (!prog.canPromote || !prog.next) return null
  const at = new Date().toISOString()
  return writeState({
    tier: prog.next,
    since: at,
    placedAt: state.placedAt,
    history: [...state.history, { tier: prog.next, at }],
  })
}
