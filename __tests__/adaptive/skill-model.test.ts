import { describe, it, expect } from "vitest"
import { computeMastery } from "@/lib/adaptive/skill-model"
import type { ProgressEvent } from "@/lib/adaptive/types"

const ev = (over: Partial<ProgressEvent>): ProgressEvent => ({
  problemId: "p",
  concept: "c",
  difficulty: "쉬움",
  solved: true,
  starred: true,
  ...over,
})

describe("computeMastery", () => {
  it("깔끔히 3개 → mastered (점수 6)", () => {
    const m = computeMastery([ev({}), ev({ problemId: "p2" }), ev({ problemId: "p3" })])
    expect(m["c"].score).toBe(6)
    expect(m["c"].level).toBe("mastered")
  })
  it("힌트풀이 1개 → learning (점수 1)", () => {
    const m = computeMastery([ev({ starred: false })])
    expect(m["c"].score).toBe(1)
    expect(m["c"].level).toBe("learning")
  })
  it("미풀이 → struggling (점수 음수)", () => {
    const m = computeMastery([ev({ solved: false, starred: false })])
    expect(m["c"].level).toBe("struggling")
  })
  it("이벤트 0 → 빈 객체", () => {
    expect(computeMastery([])).toEqual({})
  })
})
