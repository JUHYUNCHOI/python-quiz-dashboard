/**
 * 배치고사 적응형 엔진 — **코딩 문제 2~4개로** 10개 티어 중 하나를 고른다.
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
 * ── 왜 이분 탐색인가 (그리고 왜 문제 수가 2~4개인가) ──────────────────────
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
 * 같은 이유로 **결과를 못 바꾸는 문제는 내지 않는다** (`tierIsDecided`).
 * 남은 후보 단계가 전부 한 티어를 가리키면 그 자리에서 끝낸다 — 15분을 더
 * 쓰게 하고 같은 티어를 주는 건 시험이 아니라 벌이다.
 *
 * ── 배치 상한은 은행이 정한다 ─────────────────────────────────────────────
 * 마스터·그랜드마스터는 **배치고사로 못 받는다**. 승급(자기 티어 문제 10개 +
 * 교실 시험)으로만 올라간다 — 시험 한 번으로 최상위 두 칸을 주면 그 위에
 * 남는 목표가 없다.
 *
 * 그 상한을 여기에 숫자로 박지 않는다. 은행에 마스터 이상 문제를 **넣지 않는
 * 것**이 곧 상한이다 (`data/placement-code.ts`). 숫자를 따로 두면 은행과
 * 어긋날 수 있고, 어긋나면 "풀었는데 티어를 안 주는" 문제가 생긴다.
 * 요구 기준: "학교에서 좀 잘하는 학생 → 플래티넘 I, 못하는 학생 → 브론즈 II".
 */

import {
  PLACEMENT_CODE_TASKS, CODE_TASK_MAX_STEP, codeTaskAtStep, codeTaskForStep,
  type PlacementCodeTask,
} from "@/data/placement-code"
import { LOWEST_TIER, type TierId } from "@/lib/tier-system"

export const PLACEMENT_MIN_STEP = 1
export const PLACEMENT_MAX_STEP = CODE_TASK_MAX_STEP

/**
 * 배치고사로 받을 수 있는 가장 높은 티어 = 은행의 가장 높은 단계의 티어.
 * 안내 문구("마스터 이상은 승급으로만")가 이 값을 읽는다.
 */
export const PLACEMENT_CAP_TIER: TierId =
  codeTaskAtStep(CODE_TASK_MAX_STEP)!.tier

/**
 * 첫 문제의 단계 = 탐색 구간의 중앙.
 *
 * 상수로 박아 두면 은행이 늘거나 줄 때 첫 문제가 구간 중앙에서 벗어나고,
 * 그러면 최악의 문제 수가 아래 `PLACEMENT_MAX_PROBLEMS` 보다 많아진다.
 */
export const START_STEP = Math.floor((PLACEMENT_MIN_STEP + PLACEMENT_MAX_STEP) / 2)

/**
 * 최악의 경우 나오는 문제 수. 화면의 "2 / 4" 표기와 진행률 분모에 쓴다.
 *
 * 구간의 후보는 `best` 가 될 수 있는 값 — 0(1단계도 못 풂)부터 최고 단계까지
 * 총 `MAX - MIN + 2` 개다. 이분 탐색은 그걸 매번 반으로 줄이므로
 * log2 의 천장이 곧 probe 횟수다.
 *
 * **상한이다.** 같은 티어로 좁혀지면 2~3문제에 끝난다 (`tierIsDecided`).
 * 그래서 화면은 "4문제"가 아니라 "최대 4문제"로 써야 한다.
 */
export const PLACEMENT_MAX_PROBLEMS =
  Math.ceil(Math.log2(PLACEMENT_MAX_STEP - PLACEMENT_MIN_STEP + 2))

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
    hi: PLACEMENT_MAX_STEP,
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
 * 남은 후보가 **모두 같은 티어**인가 = 더 물어도 결과가 안 바뀌는가.
 *
 * 난이도 배분이 브론즈 2 · 실버 3 · 골드 3 · 플래티넘 2 라서 단계 두 개가 같은
 * 티어를 가리키는 구간이 있다 (3·4 = 실버 II, 6·7 = 골드 II). 구간이 그 둘로
 * 좁혀지면 이분 탐색은 둘을 가르려고 한 문제를 더 내는데, 어느 쪽이 나와도
 * 티어가 같다. 코딩 문제 하나는 5~15분이다 — 결과를 못 바꾸는 문제는 안 낸다.
 *
 * 최종 `best` 가 될 수 있는 값은 지금의 `best`(이 뒤를 다 틀리는 경우) 와
 * 남은 구간 `lo..hi` 뿐이다. 그 전부가 한 티어를 가리키면 결과는 이미 정해졌다.
 */
function tierIsDecided(lo: number, hi: number, best: number): boolean {
  const decided = tierOfBest(best)
  for (let st = lo; st <= hi; st++) {
    if (codeTaskAtStep(st)?.tier !== decided) return false
  }
  return true
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
  if (tierIsDecided(lo, hi, best)) return finish()

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
 * 최종 티어 = **통과한 가장 높은 문제가 들고 있는 티어**.
 *
 * 단계 숫자로 티어를 계산하지 않는다. 난이도 배분이 브론즈 2 · 실버 3 ·
 * 골드 3 · 플래티넘 2 라서 단계와 티어가 1:1이 아니다 — 계산식을 쓰면
 * 배분을 바꿀 때마다 식도 같이 고쳐야 하고, 한 쪽만 고치면 엉킨다.
 *
 * best = 0 (1단계조차 못 풂) → 최하위 티어. 더 내릴 곳이 없으므로 최하위에
 * 배치하고 연습을 시작하게 한다.
 */
export function resultTier(s: PlacementState): TierId {
  return tierOfBest(s.best)
}

function tierOfBest(best: number): TierId {
  return codeTaskAtStep(best)?.tier ?? LOWEST_TIER
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
