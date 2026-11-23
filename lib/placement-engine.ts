/**
 * 배치고사 적응형 엔진 — 12문항으로 10개 티어 중 하나를 고른다.
 *
 * ── 왜 "틀리면 쉬워지는 계단"이 아니라 이분 탐색인가 ──────────────────────
 * 계단(up-down)식은 한 단계를 여러 번 방문하므로 단계당 문항이 10개쯤 필요하다.
 * 문항 은행은 단계당 3~4개뿐이라 계단을 돌리면 금방 바닥난다.
 * 이분 탐색은 **각 단계를 최대 한 번만** 방문하므로 3~4개로 충분하다.
 *
 * ── 왜 한 단계에 3문항을 묻는가 ───────────────────────────────────────────
 * 1문항으로 단계를 판정하면 운 한 번에 티어가 두 칸 틀린다. 3문항 중 2개 이상
 * 맞히면 통과로 본다. 10단계를 이분 탐색하면 probe 가 3~4번이므로
 * 3 × 4 = 12 — 요구된 12문항과 정확히 맞는다.
 *
 * ── 마지막은 직접 짜게 한다 ───────────────────────────────────────────────
 * 출력 예측은 **읽기 능력**만 잰다. "읽을 줄 아는데 못 짜는" 학생이 실재하고,
 * 그런 학생이 골드로 배치되면 승급 문제를 한 개도 못 푼다. 그래서 탐색이
 * 끝나면 확정된 단계에서 **코드 1문항을 실제로 작성**하게 하고, 떨어지면
 * 한 칸 내린다 (`data/placement-code.ts`).
 *
 * 예전엔 이 자리에 "확인 probe"(출력 예측 3문항)가 있었다. 같은 능력을 세 번
 * 더 재는 것이라 "읽기만 잘하는" 학생을 전혀 걸러내지 못했다 — 코드 작성
 * 1문항이 그 일을 대신한다.
 */

import {
  PLACEMENT_ITEMS, PLACEMENT_MIN_STEP, PLACEMENT_MAX_STEP,
  itemsAtStep, isPlacementCorrect, type PlacementItem,
} from "@/data/placement-test"
import { codeTaskForStep, type PlacementCodeTask } from "@/data/placement-code"
import { TIER_IDS, LOWEST_TIER, type TierId } from "@/lib/tier-system"

export const PROBE_SIZE = 3
/** 3문항 중 몇 개를 맞혀야 그 단계를 "할 수 있다"고 보는가 */
export const PROBE_PASS = 2
export const PLACEMENT_LENGTH = 12
const START_STEP = 5

/**
 * probe 통과 기준. **고정값을 쓰면 안 된다** — 문항이 모자라 2문항짜리 probe 가
 * 나왔을 때 "3개 중 2개" 기준을 그대로 적용하면 사실상 만점을 요구하게 되고,
 * 1문항짜리 probe 는 통과가 수학적으로 불가능해져 티어가 한 칸 떨어진다.
 * (실제로 이 버그로 ability=2 학생이 브론즈 I 대신 브론즈 II 로 갔다.)
 */
function probePass(n: number): number {
  return n <= 1 ? 1 : Math.ceil((n * PROBE_PASS) / PROBE_SIZE)
}

export interface PlacementAnswer {
  itemId: string
  step: number
  input: string
  correct: boolean
}

export interface PlacementState {
  seed: number
  /** 아직 가능성이 남은 단계 구간 */
  lo: number
  hi: number
  /** 지금까지 "통과"가 확인된 가장 높은 단계. 0 = 1단계도 통과 못 함 */
  best: number
  /**
   * "code" = 출력 예측은 끝났고 코드 작성 1문항이 남았다.
   * 이 단계에서는 `currentItem()` 이 null 이지만 **시험이 끝난 게 아니다** —
   * 화면은 `phase === "done"` 으로만 결과를 띄워야 한다.
   */
  phase: "bracket" | "code" | "done"
  /** phase === "code" 일 때 낼 코드 문항 */
  codeTask: PlacementCodeTask | null
  /** 코드 문항을 통과했는가. 아직 안 냈으면 null. */
  codePassed: boolean | null
  probeStep: number
  probeCorrect: number
  /** 현재 probe 의 전체 문항 수. 통과 기준을 이 값에 맞춰 계산한다. */
  probeSize: number
  /** 현재 probe 에서 아직 안 낸 문항들 */
  queue: PlacementItem[]
  usedIds: string[]
  answers: PlacementAnswer[]
}

// ── 시드 셔플 ──────────────────────────────────────────────────────────────
// 같은 단계를 두 학생이 같은 순서로 받지 않게, 또 재시험 때 순서가 바뀌게 한다.
// 암호학적 품질은 필요 없다 — 재현 가능한 섞기면 된다.
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffled<T>(arr: T[], seed: number): T[] {
  const rnd = mulberry32(seed)
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** 한 probe 에 쓸 문항 — 이미 낸 것은 제외하고 시드 순서로 최대 3개. */
function buildQueue(step: number, usedIds: string[], seed: number): PlacementItem[] {
  const used = new Set(usedIds)
  const pool = itemsAtStep(step).filter(it => !used.has(it.id))
  return shuffled(pool, seed + step * 7919).slice(0, PROBE_SIZE)
}

export function startPlacement(seed: number = Date.now()): PlacementState {
  const queue = buildQueue(START_STEP, [], seed)
  return {
    seed,
    lo: PLACEMENT_MIN_STEP,
    hi: PLACEMENT_MAX_STEP,
    best: 0,
    phase: "bracket",
    codeTask: null,
    codePassed: null,
    probeStep: START_STEP,
    probeCorrect: 0,
    probeSize: queue.length,
    queue,
    usedIds: [],
    answers: [],
  }
}

export function currentItem(s: PlacementState): PlacementItem | null {
  if (s.phase === "done") return null
  return s.queue[0] ?? null
}

/**
 * 탐색이 끝났다 — 코드 작성 문항으로 넘기거나, 낼 문항이 없으면 끝낸다.
 *
 * 1단계조차 통과 못 한 학생(best = 0)에게는 코드 문항을 내지 않는다.
 * 최하위 티어에서 더 내릴 곳이 없으니 결과가 바뀌지 않고, 못 푸는 걸
 * 이미 아는 학생에게 5분을 더 쓰게 할 뿐이다.
 */
function toCodePhase(s: PlacementState, lo: number, hi: number, best: number): PlacementState {
  const codeTask = best >= PLACEMENT_MIN_STEP ? codeTaskForStep(best) : null
  if (!codeTask) return { ...s, lo, hi, best, phase: "done", queue: [] }
  return { ...s, lo, hi, best, phase: "code", codeTask, queue: [] }
}

/** 다음 probe 로 넘어간다 (또는 코드 작성 단계 / 종료). */
function advance(s: PlacementState): PlacementState {
  const passed = s.probeCorrect >= probePass(s.probeSize)

  let { lo, hi, best } = s
  if (passed) { best = s.probeStep; lo = s.probeStep + 1 }
  else { hi = s.probeStep - 1 }

  const asked = s.usedIds.length

  // 구간이 남아 있고 예산도 남았으면 계속 탐색한다.
  if (lo <= hi && asked + PROBE_SIZE <= PLACEMENT_LENGTH) {
    const mid = Math.floor((lo + hi) / 2)
    const queue = buildQueue(mid, s.usedIds, s.seed)
    // 문항이 바닥나면 더 쪼개도 의미가 없다 — 지금까지의 best 로 끝낸다.
    if (queue.length === 0) return toCodePhase(s, lo, hi, best)
    return { ...s, lo, hi, best, probeStep: mid, probeCorrect: 0, probeSize: queue.length, queue }
  }

  return toCodePhase(s, lo, hi, best)
}

/**
 * 코드 작성 문항 채점 결과를 반영하고 시험을 끝낸다.
 *
 * 떨어지면 한 칸 내린다 — 읽기만으로 올라간 티어를 되돌리는 안전장치다.
 * 통과 판정(`passed`)은 화면이 Piston 으로 **모든 테스트케이스를 돌려서**
 * 넘긴다. 여기서 코드를 보지 않는 이유는 채점기가 앱에 하나뿐이어야 하기
 * 때문이다 — 연습·승급 시험과 같은 "stdout 바이트 비교"를 그대로 쓴다.
 */
export function submitCodeResult(s: PlacementState, passed: boolean): PlacementState {
  if (s.phase !== "code") return s
  return {
    ...s,
    codePassed: passed,
    best: passed ? s.best : Math.max(0, s.best - 1),
    phase: "done",
  }
}

export function submitAnswer(s: PlacementState, input: string): PlacementState {
  const item = currentItem(s)
  if (!item) return s

  const correct = isPlacementCorrect(input, item.answer)
  const next: PlacementState = {
    ...s,
    probeCorrect: s.probeCorrect + (correct ? 1 : 0),
    queue: s.queue.slice(1),
    usedIds: [...s.usedIds, item.id],
    answers: [...s.answers, { itemId: item.id, step: item.step, input, correct }],
  }

  // probe 의 문항을 다 냈으면 판정하고 넘어간다.
  return next.queue.length === 0 ? advance(next) : next
}

/**
 * 최종 티어.
 *
 * best = N → N번째 티어. best = 0 (1단계조차 통과 못 함) → 최하위 티어.
 * 더 내릴 곳이 없으므로 최하위에 배치하고 연습을 시작하게 한다.
 */
export function resultTier(s: PlacementState): TierId {
  if (s.best < PLACEMENT_MIN_STEP) return LOWEST_TIER
  return TIER_IDS[Math.min(s.best, TIER_IDS.length) - 1]
}

export function correctCount(s: PlacementState): number {
  return s.answers.filter(a => a.correct).length
}

/**
 * 진행률 — 출력 예측 길이는 6~12로 들쭉날쭉하다. 그래서 끝나면 100% 로 고정하고,
 * 코드 작성 단계는 "거의 다 왔다"는 뜻으로 95% 에 세운다. 마지막 한 문항이
 * 제일 오래 걸리므로 여기서 0% 로 보이면 학생이 시험이 다시 시작된 줄 안다.
 */
export function placementProgress(s: PlacementState): number {
  if (s.phase === "done") return 1
  if (s.phase === "code") return 0.95
  return Math.min(0.9, s.usedIds.length / PLACEMENT_LENGTH)
}

/** 은행 무결성 — 모든 단계에 probe 를 채울 문항이 있는지. 테스트용. */
export function placementBankGaps(): number[] {
  const gaps: number[] = []
  for (let st = PLACEMENT_MIN_STEP; st <= PLACEMENT_MAX_STEP; st++) {
    if (itemsAtStep(st).length < PROBE_SIZE) gaps.push(st)
  }
  return gaps
}

export const PLACEMENT_ITEM_COUNT = PLACEMENT_ITEMS.length
