/**
 * 티어 시스템 — 배치고사로 들어오고, 자기 티어 문제 10개를 맞히면 승급한다.
 *
 * ── 왜 `lib/curriculum-ranks.ts` 와 별개인가 ─────────────────────────────
 * curriculum-ranks 는 "레슨을 몇 % 들었나"(진도율) 기반이다. 여기는
 * "문제를 실제로 풀 수 있나"(실력) 기반이다. 둘은 일부러 섞지 않는다 —
 * 강의를 다 들어도 문제를 못 풀면 티어가 오르면 안 되고, 그 반대도 같다.
 * 이름이 겹치면 import 가 충돌하므로 여기서는 Tier* / TIERS 를 쓴다.
 *
 * ── 왜 학생에게 레벨(숫자)을 보여주지 않는가 ──────────────────────────────
 * `LadderItem.level`(8~99) 은 **내부 정렬 키**다. 학생 화면에는 티어만 뜬다.
 * 숫자를 노출하면 "레벨 올리기"가 목표가 되는데, 요구사항은 티어 하나다.
 */

import { LADDER, type LadderItem } from "@/app/course/ladder/ladder-data"
import { ALL_CLUSTERS } from "@/data/practice"

export type TierId =
  | "bronze2" | "bronze1"
  | "silver2" | "silver1"
  | "gold2"   | "gold1"
  | "plat2"   | "plat1"
  | "master"  | "grandmaster"

export interface TierInfo {
  id: TierId
  label: string      // 한국어 표시명
  labelEn: string
  /* 티어 그림은 여기 두지 않는다 — `components/tier-mark.tsx` 의 `TierMark` 가
     방패 하나를 아래 `color` 로 칠한다. 등급마다 다른 이모지를 쓰면 OS 마다
     생김새가 달라지고 제품 팔레트 밖의 색이 화면에 섞인다. */
  color: string      // 배지 배경 / 티어 마크 색
  ink: string        // 배지 글자색
  tint: string       // 카드 배경(연한)
  /** 내부 전용 — 이 티어가 담는 LadderItem.level 범위 (양끝 포함) */
  minLevel: number
  maxLevel: number
}

/**
 * 구간은 전체 1430문제를 티어당 117~168개로 균등 분할해 뽑았다.
 * (측정: level 8~99 분포, 2026-11-19)
 * 문제 수가 비슷해야 "10개 풀기"가 티어마다 같은 난이도의 숙제가 된다.
 */
export const TIERS: TierInfo[] = [
  { id: "bronze2",     label: "브론즈 II",     labelEn: "Bronze II",     color: "#9a6b3f", ink: "#fff", tint: "#fdf6ee", minLevel:  8, maxLevel: 12 },
  { id: "bronze1",     label: "브론즈 I",      labelEn: "Bronze I",      color: "#b07a44", ink: "#fff", tint: "#fdf6ee", minLevel: 13, maxLevel: 15 },
  { id: "silver2",     label: "실버 II",       labelEn: "Silver II",     color: "#6b7480", ink: "#fff", tint: "#f4f6f8", minLevel: 16, maxLevel: 18 },
  { id: "silver1",     label: "실버 I",        labelEn: "Silver I",      color: "#808a96", ink: "#fff", tint: "#f4f6f8", minLevel: 19, maxLevel: 22 },
  { id: "gold2",       label: "골드 II",       labelEn: "Gold II",       color: "#b4860b", ink: "#fff", tint: "#fffaeb", minLevel: 23, maxLevel: 26 },
  { id: "gold1",       label: "골드 I",        labelEn: "Gold I",        color: "#c99700", ink: "#fff", tint: "#fffaeb", minLevel: 27, maxLevel: 30 },
  { id: "plat2",       label: "플래티넘 II",   labelEn: "Platinum II",   color: "#0e8f8f", ink: "#fff", tint: "#effbfa", minLevel: 31, maxLevel: 36 },
  { id: "plat1",       label: "플래티넘 I",    labelEn: "Platinum I",    color: "#10a3a3", ink: "#fff", tint: "#effbfa", minLevel: 37, maxLevel: 44 },
  { id: "master",      label: "마스터",        labelEn: "Master",        color: "#7c3aed", ink: "#fff", tint: "#f7f2ff", minLevel: 45, maxLevel: 54 },
  { id: "grandmaster", label: "그랜드마스터",  labelEn: "Grandmaster",   color: "#b91c1c", ink: "#fff", tint: "#fef4f3", minLevel: 55, maxLevel: 999 },
]

export const TIER_IDS: TierId[] = TIERS.map(t => t.id)
export const LOWEST_TIER: TierId = TIER_IDS[0]
export const HIGHEST_TIER: TierId = TIER_IDS[TIER_IDS.length - 1]

/** 승급에 필요한 "자기 티어" 정답 수. */
export const PROMOTION_TARGET = 10

const BY_ID = new Map<TierId, TierInfo>(TIERS.map(t => [t.id, t]))

export function tierInfo(id: TierId): TierInfo {
  return BY_ID.get(id) ?? TIERS[0]
}

export function tierLabel(id: TierId, lang: string): string {
  const t = tierInfo(id)
  return lang === "ko" ? t.label : t.labelEn
}

/** 티어 순서 인덱스. 비교·정렬·상하위 판정의 단일 기준. */
export function tierRank(id: TierId): number {
  const i = TIER_IDS.indexOf(id)
  return i < 0 ? 0 : i
}

export function nextTier(id: TierId): TierId | null {
  const i = tierRank(id)
  return i + 1 < TIER_IDS.length ? TIER_IDS[i + 1] : null
}

/** 내부 level → 티어. 학생에게 level 을 보여주지 않으므로 이 함수가 유일한 통로다. */
export function tierOfLevel(level: number): TierId {
  for (const t of TIERS) if (level >= t.minLevel && level <= t.maxLevel) return t.id
  return level < TIERS[0].minLevel ? LOWEST_TIER : HIGHEST_TIER
}

export function isValidTier(v: unknown): v is TierId {
  return typeof v === "string" && (TIER_IDS as string[]).includes(v)
}

// ── 문제 풀 ────────────────────────────────────────────────────────────────

export interface TierProblem extends LadderItem {
  tier: TierId
  /** 앱 안에서 테스트케이스로 채점되는 문제인가. 승급 카운트는 이것만 센다. */
  graded: boolean
  /**
   * 영어 제목. `LadderItem.title` 은 한국어뿐이라 영어로 보면 목록 전체가
   * 한국어로 남는다 (실측: 영어 모드에서 40개 전부 한국어). 문제 은행 쪽
   * `PracticeProblem.en.title` 에는 채점 가능한 716개 전부 영어 제목이 있다.
   */
  titleEn?: string
}

/** 화면에 쓸 제목. 영어 제목이 없으면 한국어로 떨어진다. */
export function tierProblemTitle(p: TierProblem, lang: string): string {
  return lang === "en" ? (p.titleEn ?? p.title) : p.title
}

/**
 * 승급에 쓸 수 있는 문제 = **테스트케이스로 자동 채점되는 문제**.
 *
 * `!p.external` 로 판정하면 안 된다. 실제로 확인한 구멍이 셋이다:
 *   1. 외부 사이트(LeetCode·AtCoder…) 문제는 체크박스가 전부다 → 클릭 10번에 승급.
 *   2. `/algo/*` 목록 화면에도 수동 체크박스가 있어서 같은 저장 키가 오염된다.
 *   3. 4지선다(mcq)는 틀린 답을 눌러보다 맞히면 통과로 기록된다 → 찍기로 승급.
 *
 * 그래서 "우리 문제 은행에 테스트케이스를 가진 코드 문제로 실재하는가"만 본다.
 * (측정 2026-11-19: 티어당 55~86개 — 10개 승급 조건에 막다른 티어가 없다.)
 */
const GRADABLE_IDS: Set<string> = new Set()
const EN_TITLES = new Map<string, string>()
for (const c of ALL_CLUSTERS) {
  for (const p of c.problems) {
    if (p.en?.title) EN_TITLES.set(p.id, p.en.title)
    if (p.type === "mcq") continue
    if (p.testCases && p.testCases.length > 0) GRADABLE_IDS.add(p.id)
  }
}

function isGraded(p: LadderItem): boolean {
  return !p.external && GRADABLE_IDS.has(p.id)
}

const ALL: TierProblem[] = LADDER.map(p => ({
  ...p,
  tier: tierOfLevel(p.level),
  graded: isGraded(p),
  titleEn: EN_TITLES.get(p.id),
}))

const BY_TIER = new Map<TierId, TierProblem[]>(TIER_IDS.map(id => [id, []]))
for (const p of ALL) BY_TIER.get(p.tier)!.push(p)

export function problemsInTier(id: TierId): TierProblem[] {
  return BY_TIER.get(id) ?? []
}

/** 승급에 쓸 수 있는 문제만 — 자체채점 + 해당 티어. */
export function promotionPool(id: TierId): TierProblem[] {
  return problemsInTier(id).filter(p => p.graded)
}

export function findTierProblem(problemId: string): TierProblem | undefined {
  return ALL.find(p => p.id === problemId)
}

// ── 승급 판정 ──────────────────────────────────────────────────────────────

export interface PromotionState {
  tier: TierId
  /** 자기 티어에서 채점으로 맞힌 개수 (상한 없이 실제 개수) */
  solved: number
  target: number
  canPromote: boolean
  next: TierId | null
  /** 자기 티어 자체채점 문제가 몇 개 남았는지 — 10개를 채울 수 있는지 확인용 */
  remaining: number
}

/**
 * 승급 진행도.
 *
 * `solvedIds` 는 "자체채점으로 통과한 문제 id" 집합이어야 한다. 체크박스로
 * 수동 완료 처리한 id(`ladder-done`)를 섞으면 승급이 무의미해진다 —
 * 호출하는 쪽에서 걸러서 넘긴다.
 */
export function promotionState(tier: TierId, solvedIds: Set<string>): PromotionState {
  const pool = promotionPool(tier)
  let solved = 0
  for (const p of pool) if (solvedIds.has(p.id)) solved++
  const next = nextTier(tier)
  return {
    tier,
    solved,
    target: PROMOTION_TARGET,
    canPromote: solved >= PROMOTION_TARGET && next !== null,
    next,
    remaining: pool.length - solved,
  }
}

/**
 * 한 문제가 지금 티어 기준으로 어떤 의미인가.
 *
 *   "promotion" — 자기 티어 + 자체채점. 승급 카운트에 들어간다.
 *   "practice"  — 자기 티어보다 낮음. 풀 수 있지만 카운트 안 된다 (just for practice).
 *   "locked"    — 자기 티어보다 높음. 아직 안내만 한다.
 *   "ungraded"  — 자기 티어지만 외부 링크라 채점 불가 → 카운트 안 된다.
 */
export type ProblemRole = "promotion" | "practice" | "locked" | "ungraded"

export function problemRole(p: TierProblem, myTier: TierId): ProblemRole {
  const d = tierRank(p.tier) - tierRank(myTier)
  if (d > 0) return "locked"
  if (d < 0) return "practice"
  return p.graded ? "promotion" : "ungraded"
}
