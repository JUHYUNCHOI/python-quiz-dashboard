/**
 * 배치고사 적응형 엔진 — **코딩 문제 3~4개로** 10개 티어 중 하나를 고른다.
 *
 * ── 왜 전부 코딩 문제인가 ─────────────────────────────────────────────────
 * 예전엔 "이 코드의 출력은?" 12문항으로 단계를 좁히고 마지막에 코드를 2개
 * 짜게 했다. 출력 예측이 빠르다는 건 맞지만 그건 **읽기 능력**이다. 배치된
 * 티어에서 학생이 실제로 할 일은 "문제를 읽고 코드를 짜는 것" 하나뿐이다.
 * 재는 능력과 쓸 능력이 다르면 배치가 틀린다 — 읽을 줄만 아는 학생이 골드로
 * 배치되면 승급 문제를 한 개도 못 푼다.
 *
 * 그래서 배치고사는 백준식 코딩 문제만 낸다 (`data/placement-code.ts`).
 *
 * ── 왜 이분 탐색인가 (그리고 왜 문제 수가 3~4개인가) ──────────────────────
 * 계단(up-down)식은 한 단계를 여러 번 방문하므로 단계당 문제가 여럿 필요하다.
 * 이분 탐색은 **각 단계를 최대 한 번만** 방문하므로 단계당 1개로 충분하고,
 * 1..8 구간을 좁히는 데 probe 가 최대 4번이다.
 *
 * 코딩 문제는 한 개에 5~15분이다. 4개면 20~60분 — 배치고사가 감당할 수 있는
 * 상한이다. 여기서 "단계당 3문제씩 물어 운을 없애자"로 가면 12개짜리 시험이
 * 되어 아무도 끝까지 안 본다. 운을 없애는 일은 다른 방식으로 한다:
 * 코딩 문제는 **통과할 때까지 다시 제출할 수 있다.** 찍어서 맞을 수 없고,
 * 한 번 실수했다고 떨어지지도 않는다. 그래서 1문제 판정으로도 충분하다.
 *
 * ── 배치 상한은 플래티넘 I ────────────────────────────────────────────────
 * 마스터·그랜드마스터는 **배치고사로 못 받는다**. 승급(자기 티어 문제 10개 +
 * 교실 시험)으로만 올라간다 — 시험 한 번으로 최상위 두 칸을 주면 그 위에
 * 남는 목표가 없다. `hi` 를 상한에서 시작하므로 탐색이 9·10단계를 애초에
 * 방문하지 않는다. 9·10단계 문제는 은행에 남겨 둔다 (승급 시험에서 쓴다).
 * 요구 기준: "학교에서 좀 잘하는 학생 → 플래티넘 I, 못하는 학생 → 브론즈 II".
 */

import {
  PLACEMENT_CODE_TASKS, codeTaskAtStep, codeTaskForStep,
  type PlacementCodeTask,
} from "@/data/placement-code"
import { TIER_IDS, LOWEST_TIER, type TierId, tierRank } from "@/lib/tier-system"

export const PLACEMENT_MIN_STEP = 1
export const PLACEMENT_MAX_STEP = 10

/** 배치고사로 받을 수 있는 가장 높은 단계 = 플래티넘 I. */
export const PLACEMENT_CAP_STEP = tierRank("plat1") + 1

/**
 * 첫 문제의 단계 = 탐색 구간의 중앙.
 *
 * 상수로 박아 두면 상한이 바뀔 때 첫 문제가 구간 중앙에서 벗어나고,
 * 그러면 최악의 문제 수가 아래 `PLACEMENT_MAX_PROBLEMS` 보다 많아진다.
 */
export const START_STEP = Math.floor((PLACEMENT_MIN_STEP + PLACEMENT_CAP_STEP) / 2)

/**
 * 최악의 경우 나오는 문제 수.
 *
 * 구간의 후보는 `best` 가 될 수 있는 값 — 0(1단계도 못 풂)부터 상한까지
 * 총 `CAP - MIN + 2` 개다. 이분 탐색은 그걸 매번 반으로 줄이므로
 * log2 의 천장이 곧 probe 횟수다. 화면의 "2 / 4" 표기에 쓴다.
 */
export const PLACEMENT_MAX_PROBLEMS =
  Math.ceil(Math.log2(PLACEMENT_CAP_STEP - PLACEMENT_MIN_STEP + 2))

export interface PlacementAttempt {
  taskId: string
  step: number
  passed: boolean
}

export interface PlacementState {
  /** 아직 가능성이 남은 단계 구간 */
  lo: number
  hi: number
  /** 지금까지 통과가 확인된 가장 높은 단계. 0 = 1단계도 못 풀었다. */
  best: number
  phase: "solving" | "done"
  /** 지금 내고 있는 문제. `phase` 가 "done" 이면 null. */
  task: PlacementCodeTask | null
  attempts: PlacementAttempt[]
}

export function startPlacement(): PlacementState {
  return {
    lo: PLACEMENT_MIN_STEP,
    hi: PLACEMENT_CAP_STEP,
    best: 0,
    phase: "solving",
    task: codeTaskForStep(START_STEP),
    attempts: [],
  }
}

export function currentTask(s: PlacementState): PlacementCodeTask | null {
  return s.phase === "done" ? null : s.task
}

/**
 * 한 문제의 채점 결과를 반영하고 다음 문제를 고른다.
 *
 * 통과 판정(`passed`)은 화면이 **모든 테스트케이스를 실제로 돌려서** 넘긴다.
 * 여기서 코드를 보지 않는 이유는 채점기가 앱에 하나뿐이어야 하기 때문이다 —
 * 연습·승급 시험과 같은 "stdout 바이트 비교"를 그대로 쓴다.
 */
export function submitResult(s: PlacementState, passed: boolean): PlacementState {
  const task = currentTask(s)
  if (!task) return s

  const attempts = [...s.attempts, { taskId: task.id, step: task.step, passed }]

  let { lo, hi, best } = s
  if (passed) { best = Math.max(best, task.step); lo = task.step + 1 }
  else { hi = task.step - 1 }

  const finish = (): PlacementState => ({ ...s, lo, hi, best, phase: "done", task: null, attempts })

  if (lo > hi) return finish()

  const mid = Math.floor((lo + hi) / 2)
  const next = codeTaskAtStep(mid) ?? codeTaskForStep(mid)
  /* 은행에 빈 단계가 있어 아래로 떨어지면 **이미 낸 문제가 다시 나온다.**
     같은 문제를 또 내고 그 결과로 티어를 움직이면 배치가 엉킨다 — 끝낸다. */
  if (!next || attempts.some(a => a.taskId === next.id)) return finish()

  return { ...s, lo, hi, best, task: next, attempts }
}

/** 지금 몇 번째 문제인가 (1부터). */
export function problemIndex(s: PlacementState): number {
  return s.attempts.length + 1
}

export function passedCount(s: PlacementState): number {
  return s.attempts.filter(a => a.passed).length
}

/**
 * 최종 티어.
 *
 * best = N → N번째 티어. best = 0 (1단계조차 못 풂) → 최하위 티어.
 * 더 내릴 곳이 없으므로 최하위에 배치하고 연습을 시작하게 한다.
 *
 * 상한을 **여기서 한 번 더** 막는다. 탐색이 이미 막고 있지만, 티어 규칙
 * ("마스터 이상은 승급으로만")이 깨지면 피해가 크다.
 */
export function resultTier(s: PlacementState): TierId {
  if (s.best < PLACEMENT_MIN_STEP) return LOWEST_TIER
  return TIER_IDS[Math.min(s.best, PLACEMENT_CAP_STEP) - 1]
}

/**
 * 진행률.
 *
 * 분모를 최악의 문제 수로 고정한다. 이분 탐색은 3문제에 끝날 수도 있으므로
 * 끝나면 1 로 올려 붙인다 — 75% 에서 결과가 뜨면 학생이 시험이 끊긴 줄 안다.
 */
export function placementProgress(s: PlacementState): number {
  if (s.phase === "done") return 1
  return Math.min(0.9, s.attempts.length / PLACEMENT_MAX_PROBLEMS)
}

/** 은행 무결성 — 탐색이 방문할 수 있는 모든 단계에 문제가 있는지. 테스트용. */
export function placementBankGaps(): number[] {
  const gaps: number[] = []
  for (let st = PLACEMENT_MIN_STEP; st <= PLACEMENT_MAX_STEP; st++) {
    if (!codeTaskAtStep(st)) gaps.push(st)
  }
  return gaps
}

export const PLACEMENT_TASK_COUNT = PLACEMENT_CODE_TASKS.length
