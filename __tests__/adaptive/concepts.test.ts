import { describe, it, expect } from "vitest"
import { problemConcept } from "@/lib/adaptive/concepts"

describe("problemConcept", () => {
  it("문제의 cluster 를 개념으로 반환", () => {
    expect(problemConcept({ cluster: "algo-array-contest" })).toBe("algo-array-contest")
  })
  it("cluster 없으면 null (적응 풀 제외)", () => {
    expect(problemConcept({})).toBeNull()
    expect(problemConcept({ cluster: "" })).toBeNull()
  })
})
