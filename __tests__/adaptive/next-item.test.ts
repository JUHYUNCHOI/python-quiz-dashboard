import { describe, it, expect } from "vitest"
import { pickNext } from "@/lib/adaptive/next-item"
import type { ProgressEvent } from "@/lib/adaptive/types"

const P = (id: string, cluster: string, difficulty: "쉬움" | "보통" | "어려움") => ({ id, cluster, difficulty })

describe("pickNext", () => {
  const pool = [
    P("a1", "arr", "쉬움"),
    P("a2", "arr", "보통"),
    P("a3", "arr", "어려움"),
    P("s1", "sort", "쉬움"),
  ]

  it("콜드스타트(이벤트 0) → 첫 개념 가장 쉬운 미풀이", () => {
    expect(pickNext([], pool, new Set())?.problemId).toBe("a1")
  })
  it("arr 쉬움 풀음 → arr 미풀이 중 추천(a2)", () => {
    const evs: ProgressEvent[] = [
      { problemId: "a1", concept: "arr", difficulty: "쉬움", solved: true, starred: true },
    ]
    expect(pickNext(evs, pool, new Set(["a1"]))?.problemId).toBe("a2")
  })
  it("arr 전부 풀음 → 다음 개념 sort", () => {
    expect(pickNext([], pool, new Set(["a1", "a2", "a3"]))?.problemId).toBe("s1")
  })
  it("전부 풀음 → null (폴백 신호)", () => {
    expect(pickNext([], pool, new Set(["a1", "a2", "a3", "s1"]))).toBeNull()
  })
})
