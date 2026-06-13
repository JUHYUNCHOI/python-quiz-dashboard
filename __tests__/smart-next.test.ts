import { describe, it, expect } from "vitest"
import { getSmartNext } from "@/lib/smart-next"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { pythonParts } from "@/lib/curriculum-data"

const wave1Lessons = ALGO_TOPICS.filter(t => t.wave === 1).map(t => t.lessonId)
const allPython = pythonParts.flatMap(p => p.lessonIds)

// 모델(코딩뱅크 별도 단계 없음): 수업 → 연습 → 알고리즘 → 대회
describe("getSmartNext — 레슨 → 알고리즘 → 대회", () => {
  it("cpp 진도 0 → 다음 레슨", () => {
    expect(getSmartNext(new Set(), "cpp").type).toBe("lesson")
  })

  it("cpp 메인(cpp-16) 완료 + 알고리즘 미완 → 알고리즘 토픽 (코딩뱅크 거치지 않음)", () => {
    const r = getSmartNext(new Set(["cpp-16"]), "cpp")
    expect(r.type).toBe("algo-topic")
  })

  it("Python 모든 레슨 완료 + 알고리즘 미완 → 알고리즘 토픽", () => {
    const r = getSmartNext(new Set([...allPython]), "python")
    expect(r.type).toBe("algo-topic")
  })

  it("cpp + 알고리즘 Wave1 완료 → 대회", () => {
    const r = getSmartNext(new Set(["cpp-16", ...wave1Lessons]), "cpp")
    expect(r.type).toBe("quest")
  })

  it("Python 레슨 미완 → 레슨 먼저", () => {
    const r = getSmartNext(new Set([...wave1Lessons]), "python")
    expect(r.type).toBe("lesson")
  })

  it("코딩뱅크 추천은 더 이상 나오지 않음", () => {
    const cases = [getSmartNext(new Set(["cpp-16"]), "cpp"), getSmartNext(new Set([...allPython]), "python")]
    for (const r of cases) expect(r.type).not.toBe("coding-bank")
  })
})
