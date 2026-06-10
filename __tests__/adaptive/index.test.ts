import { describe, it, expect } from "vitest"
import { getAdaptiveNext } from "@/lib/adaptive"

const P = (id: string, cluster: string, difficulty: "쉬움" | "보통" | "어려움") => ({ id, cluster, difficulty })

describe("getAdaptiveNext", () => {
  it("solved/starred 로 이벤트 구성 후 추천", () => {
    const pool = [P("a1", "arr", "쉬움"), P("a2", "arr", "보통")]
    const r = getAdaptiveNext({ pool, solvedSet: new Set(["a1"]), starredSet: new Set(["a1"]) })
    expect(r?.problemId).toBe("a2")
  })
  it("후보 없음 → null", () => {
    expect(getAdaptiveNext({ pool: [], solvedSet: new Set(), starredSet: new Set() })).toBeNull()
  })
})
