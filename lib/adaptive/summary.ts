// 학생 본인에게 보여줄 개념별 실력 요약 (순수). computeMastery 재사용.
import { computeMastery } from "./skill-model"
import type { Difficulty, Level, ProgressEvent } from "./types"

export interface ConceptSummary {
  concept: string
  level: Level
  score: number
  solved: number
  total: number
  started: boolean // 한 문제라도 풀었나 (아니면 '아직')
}

export function summarizeConcepts(
  pool: { id: string; cluster: string; difficulty: Difficulty }[],
  solvedSet: Set<string>,
  starredSet: Set<string>,
): ConceptSummary[] {
  const events: ProgressEvent[] = pool
    .filter(p => solvedSet.has(p.id))
    .map(p => ({ problemId: p.id, concept: p.cluster, difficulty: p.difficulty, solved: true, starred: starredSet.has(p.id) }))
  const mastery = computeMastery(events)

  const order: string[] = []
  for (const p of pool) if (!order.includes(p.cluster)) order.push(p.cluster)

  return order.map(concept => {
    const probs = pool.filter(p => p.cluster === concept)
    const solved = probs.filter(p => solvedSet.has(p.id)).length
    const m = mastery[concept]
    return {
      concept,
      level: m?.level ?? "struggling",
      score: m?.score ?? 0,
      solved,
      total: probs.length,
      started: solved > 0,
    }
  })
}
