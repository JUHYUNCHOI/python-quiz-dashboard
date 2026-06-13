import { describe, it, expect } from "vitest"
import { summarizeConcepts } from "@/lib/adaptive/summary"

const P = (id: string, cluster: string, difficulty: "쉬움" | "보통" | "어려움") => ({ id, cluster, difficulty })
const pool = [P("a1", "arr", "쉬움"), P("a2", "arr", "보통"), P("s1", "sort", "쉬움")]

describe("summarizeConcepts", () => {
  it("안 푼 개념 → started:false, total 집계", () => {
    const r = summarizeConcepts(pool, new Set(), new Set())
    const arr = r.find(c => c.concept === "arr")!
    expect(arr.started).toBe(false)
    expect(arr.total).toBe(2)
    expect(arr.solved).toBe(0)
  })
  it("비율 기준 level — arr 2개 중 1개 풀면 능숙(50%), 마스터 아님", () => {
    const r = summarizeConcepts(pool, new Set(["a1"]), new Set(["a1"]))
    const arr = r.find(c => c.concept === "arr")!
    expect(arr.started).toBe(true)
    expect(arr.solved).toBe(1)
    expect(arr.level).toBe("proficient") // 1/2 = 50% → 능숙 (마스터는 75%+)
  })
  it("일부만 풀면 마스터 아님 (3/21 = 배우는 중)", () => {
    const big = Array.from({ length: 21 }, (_, i) => ({ id: `b${i}`, cluster: "big", difficulty: "쉬움" as const }))
    const r = summarizeConcepts(big, new Set(["b0", "b1", "b2"]), new Set())
    expect(r.find(c => c.concept === "big")!.level).toBe("learning") // 3/21 ≈ 14%
  })
  it("pool 등장 순서 유지 (arr → sort)", () => {
    const r = summarizeConcepts(pool, new Set(), new Set())
    expect(r.map(c => c.concept)).toEqual(["arr", "sort"])
  })
})
