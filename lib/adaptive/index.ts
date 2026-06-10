// 적응형 진입점 — 진행(solved/starred) + 후보 풀 → 다음 1개. 예외/빈 결과 → null(폴백).
import { pickNext } from "./next-item"
import type { AdaptiveNext, ProgressEvent, Difficulty } from "./types"
export * from "./types"
export { summarizeConcepts, type ConceptSummary } from "./summary"

interface Args {
  pool: { id: string; cluster: string; difficulty: Difficulty }[]
  solvedSet: Set<string>
  starredSet: Set<string>
}

export function getAdaptiveNext({ pool, solvedSet, starredSet }: Args): AdaptiveNext | null {
  try {
    const events: ProgressEvent[] = pool
      .filter(p => solvedSet.has(p.id)) // 풀이 기록 있는 것만 이벤트화
      .map(p => ({
        problemId: p.id,
        concept: p.cluster,
        difficulty: p.difficulty,
        solved: true,
        starred: starredSet.has(p.id),
      }))
    return pickNext(events, pool, solvedSet)
  } catch {
    return null
  }
}
