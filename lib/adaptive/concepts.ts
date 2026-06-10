// 문제 → 개념 매핑. v1: 개념 = cluster id. 무클러스터 → null(적응 풀 제외).
import type { Concept } from "./types"

export function problemConcept(p: { cluster?: string }): Concept | null {
  return p.cluster && p.cluster.length > 0 ? p.cluster : null
}
