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
  it("깔끔히 풀면 level/solved 반영", () => {
    const r = summarizeConcepts(pool, new Set(["a1"]), new Set(["a1"]))
    const arr = r.find(c => c.concept === "arr")!
    expect(arr.started).toBe(true)
    expect(arr.solved).toBe(1)
    expect(arr.level).toBe("learning") // score 2
  })
  it("pool 등장 순서 유지 (arr → sort)", () => {
    const r = summarizeConcepts(pool, new Set(), new Set())
    expect(r.map(c => c.concept)).toEqual(["arr", "sort"])
  })
})
