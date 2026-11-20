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
 * ── 남는 예산의 처리 ──────────────────────────────────────────────────────
 * 탐색이 3번에 끝나면 9문항만 쓴다. 남은 3문항은 **확정된 단계를 한 번 더
 * 확인**하는 데 쓴다. 여기서 떨어지면 한 칸 내린다 — 운으로 올라간 티어를
 * 되돌리는 안전장치다.
 */

import {
  PLACEMENT_ITEMS, PLACEMENT_MIN_STEP, PLACEMENT_MAX_STEP,
  itemsAtStep, isPlacementCorrect, type PlacementItem,
} from "@/data/placement-test"
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
  phase: "bracket" | "confirm" | "done"
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

/** 다음 probe 로 넘어간다 (또는 확인 단계 / 종료). */
function advance(s: PlacementState): PlacementState {
  const passed = s.probeCorrect >= probePass(s.probeSize)

  if (s.phase === "confirm") {
    // 확인 probe 에서 떨어지면 한 칸 내린다. 0 아래로는 안 내려간다.
    const best = passed ? s.best : Math.max(0, s.best - 1)
    return { ...s, best, phase: "done", queue: [] }
  }

  let { lo, hi, best } = s
  if (passed) { best = s.probeStep; lo = s.probeStep + 1 }
  else { hi = s.probeStep - 1 }

  const asked = s.usedIds.length

  // 구간이 남아 있고 예산도 남았으면 계속 탐색한다.
  if (lo <= hi && asked + PROBE_SIZE <= PLACEMENT_LENGTH) {
    const mid = Math.floor((lo + hi) / 2)
    const queue = buildQueue(mid, s.usedIds, s.seed)
    // 문항이 바닥나면 더 쪼개도 의미가 없다 — 지금까지의 best 로 끝낸다.
    if (queue.length === 0) return { ...s, lo, hi, best, phase: "done", queue: [] }
    return { ...s, lo, hi, best, probeStep: mid, probeCorrect: 0, probeSize: queue.length, queue }
  }

  // 탐색은 끝났다. 예산이 남고 확인할 단계가 있으면 한 번 더 확인한다.
  // 확인 probe 는 **온전한 3문항일 때만** 돌린다. 1~2문항으로 티어를 깎는 것은
  // 운에 가까워서, 안전장치가 오히려 오판의 원인이 된다.
  if (best >= PLACEMENT_MIN_STEP && asked + PROBE_SIZE <= PLACEMENT_LENGTH) {
    const queue = buildQueue(best, s.usedIds, s.seed + 1)
    if (queue.length === PROBE_SIZE) {
      return { ...s, lo, hi, best, phase: "confirm", probeStep: best, probeCorrect: 0, probeSize: queue.length, queue }
    }
  }

  return { ...s, lo, hi, best, phase: "done", queue: [] }
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

/** 진행률 — 실제 길이는 9 또는 12라서 끝나면 100% 로 고정한다. */
export function placementProgress(s: PlacementState): number {
  if (s.phase === "done") return 1
  return Math.min(0.95, s.usedIds.length / PLACEMENT_LENGTH)
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
