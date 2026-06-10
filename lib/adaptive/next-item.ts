// 다음문제 선택 (순수). 커리큘럼 순서(pool 등장 순) 내 미마스터 개념 → ZPD 난이도 미풀이.
import type { AdaptiveNext, ProgressEvent, Difficulty, Level } from "./types"
import { computeMastery } from "./skill-model"

const DIFF_ORDER: Difficulty[] = ["쉬움", "보통", "어려움"]
const TARGET: Record<Level, Difficulty> = {
  struggling: "쉬움",
  learning: "쉬움",
  proficient: "보통",
  mastered: "어려움",
}

type Cand = { id: string; cluster: string; difficulty: Difficulty }

export function pickNext(events: ProgressEvent[], pool: Cand[], solved: Set<string>): AdaptiveNext | null {
  const mastery = computeMastery(events)

  // 개념 순서 = pool 첫 등장 순
  const order: string[] = []
  for (const p of pool) if (!order.includes(p.cluster)) order.push(p.cluster)

  for (const concept of order) {
    const unsolved = pool.filter(p => p.cluster === concept && !solved.has(p.id))
    if (unsolved.length === 0) continue // 이 개념 다 품 → 다음

    const level: Level = mastery[concept]?.level ?? "struggling"
    const target = TARGET[level]
    const ti = DIFF_ORDER.indexOf(target)
    const ranked = [...unsolved].sort(
      (a, b) =>
        Math.abs(DIFF_ORDER.indexOf(a.difficulty) - ti) - Math.abs(DIFF_ORDER.indexOf(b.difficulty) - ti),
    )
    const pick = ranked[0]
    const reason =
      level === "struggling" ? "쉬운 것부터 차근차근"
      : level === "mastered" ? "잘하니 한 단계 어려운 걸로"
      : "딱 맞는 난이도로 한 칸 위"
    const reasonEn =
      level === "struggling" ? "Start easy"
      : level === "mastered" ? "You're strong — a harder one"
      : "Just-right next step"
    return { problemId: pick.id, concept, reason, reasonEn }
  }
  return null
}
