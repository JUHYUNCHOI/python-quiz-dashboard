// 개념별 숙련도 추정 (순수). 가중치/임계값은 상수(튜닝 가능).
import type { ProgressEvent, ConceptMastery, Level } from "./types"

function levelOf(score: number): Level {
  if (score <= 0) return "struggling"
  if (score <= 2) return "learning"
  if (score <= 5) return "proficient"
  return "mastered"
}

export function computeMastery(events: ProgressEvent[]): Record<string, ConceptMastery> {
  const byConcept: Record<string, ProgressEvent[]> = {}
  for (const e of events) (byConcept[e.concept] ??= []).push(e)

  const out: Record<string, ConceptMastery> = {}
  for (const [concept, evs] of Object.entries(byConcept)) {
    let score = 0
    for (const e of evs) {
      if (e.solved && e.starred) score += 2
      else if (e.solved) score += 1
      else score -= 1
    }
    const recent = evs.slice(-3).map(e => e.solved)
    out[concept] = { score, level: levelOf(score), recent }
  }
  return out
}
