/**
 * 커리큘럼 랭크 시스템 — Bronze / Silver / Gold / Master
 *
 * 학생이 "내가 무슨 레벨인지" 한 눈에 보기 위함. /algo 의 Wave 1/2/3
 * 시스템과 같은 톤. 메인 커리큘럼(Python/C++/Pseudo) 의 각 Part 에
 * 랭크를 부여하고, 학생의 현재 랭크는 가장 높은 완료 Part 의 랭크.
 */

export type RankTier = "bronze" | "silver" | "gold" | "master"

export interface RankInfo {
  tier: RankTier
  label: string
  labelEn: string
  emoji: string
  color: string        // Tailwind text color
  bg: string           // Tailwind bg (light tint)
  border: string       // Tailwind border
}

export const RANKS: Record<RankTier, RankInfo> = {
  bronze:  { tier: "bronze",  label: "Bronze",  labelEn: "Bronze",  emoji: "🥉", color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-300" },
  silver:  { tier: "silver",  label: "Silver",  labelEn: "Silver",  emoji: "🥈", color: "text-slate-600",   bg: "bg-slate-50",   border: "border-slate-300" },
  gold:    { tier: "gold",    label: "Gold",    labelEn: "Gold",    emoji: "🥇", color: "text-yellow-700",  bg: "bg-yellow-50",  border: "border-yellow-300" },
  master:  { tier: "master",  label: "Master",  labelEn: "Master",  emoji: "👑", color: "text-purple-700",  bg: "bg-purple-50",  border: "border-purple-300" },
}

const TIER_ORDER: RankTier[] = ["bronze", "silver", "gold", "master"]

/**
 * Part ID → Rank 매핑.
 *
 * Python (9 Part):
 *   Bronze: Part 1-4 (기초 → 자료구조 기본 → 첫 프로젝트)
 *   Silver: Part 5-7 (함수 → 에러/파일 → 클래스)
 *   Gold:   Part 8-9 (모듈 → 종합 프로젝트 RPG)
 *
 * C++ (3 Part):
 *   Bronze: Part 1 (Python → C++ 전환)
 *   Silver: Part 2 (STL, 자료구조)
 *   Gold:   Part 3 (USACO 준비)
 *
 * Pseudocode (5+ Part):
 *   Bronze: Part 1-2 (기초 → 중급)
 *   Silver: Part 3 (알고리즘)
 *   Gold:   Part 4-5, 기출 (시험 대비)
 */
export const PART_RANKS: Record<string, RankTier> = {
  // Python
  "part1":           "bronze",
  "part2":           "bronze",
  "part3":           "bronze",
  "part3-advanced":  "bronze",
  "part4":           "bronze",
  "part5":           "silver",
  "part6":           "silver",
  "part7":           "silver",
  "part8":           "gold",
  "part9":           "gold",
  // C++
  "cpp-part1":       "bronze",
  "cpp-part2":       "silver",
  "cpp-part3":       "gold",
  // Pseudocode
  "pseudo-part1":    "bronze",
  "pseudo-part2":    "bronze",
  "pseudo-part3":    "silver",
  "pseudo-part4":    "gold",
  "pseudo-part5":    "gold",
  "igcse-sql":       "gold",
  "igcse-logic":     "gold",
}

export function getRankForPart(partId: string): RankInfo | null {
  const tier = PART_RANKS[partId]
  if (!tier) return null
  return RANKS[tier]
}

/**
 * 학생의 현재 트랙 랭크 계산.
 *
 * 규칙:
 *   - tier 안의 모든 Part 가 80%+ 완료 → 그 tier 달성
 *   - 가장 높은 달성 tier 가 학생의 현재 랭크
 *   - 아무것도 달성 못 했으면 null (랭크 표시 안 함 — 입문 단계)
 *   - master = bronze + silver + gold 다 달성
 */
export function getStudentTrackRank(
  completedIds: Set<string | number>,
  trackParts: { id: string; lessonIds: (string | number)[] }[]
): RankInfo | null {
  const tierProgress: Record<RankTier, { done: number; total: number }> = {
    bronze: { done: 0, total: 0 },
    silver: { done: 0, total: 0 },
    gold:   { done: 0, total: 0 },
    master: { done: 0, total: 0 },
  }

  for (const part of trackParts) {
    const tier = PART_RANKS[part.id]
    if (!tier) continue
    for (const id of part.lessonIds) {
      tierProgress[tier].total += 1
      if (completedIds.has(id) || completedIds.has(String(id))) {
        tierProgress[tier].done += 1
      }
    }
  }

  // 가장 높은 달성 tier 찾기 (gold → silver → bronze 순으로 체크)
  let achieved: RankTier | null = null
  for (const tier of TIER_ORDER) {
    const p = tierProgress[tier]
    if (p.total === 0) continue
    if (p.done / p.total >= 0.8) {
      achieved = tier
    } else {
      break
    }
  }

  // bronze + silver + gold 다 80%+ 면 master
  const allGolds = (["bronze", "silver", "gold"] as RankTier[]).every(t => {
    const p = tierProgress[t]
    return p.total > 0 && p.done / p.total >= 0.8
  })
  if (allGolds) achieved = "master"

  return achieved ? RANKS[achieved] : null
}
