import { describe, it, expect } from "vitest"
import { getSmartNext } from "@/lib/smart-next"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { pythonParts } from "@/lib/curriculum-data"

const wave1Lessons = ALGO_TOPICS.filter(t => t.wave === 1).map(t => t.lessonId)
const allPython = pythonParts.flatMap(p => p.lessonIds)

// node 환경 → window 없음 → getCodingBankSolvedCount()는 항상 0 (코딩뱅크 미풀이로 간주)
describe("getSmartNext — 코딩뱅크 = 알고리즘 뒤·대회 직전 (양 트랙 공통)", () => {
  it("cpp 진도 0 → 다음 레슨 추천", () => {
    expect(getSmartNext(new Set(), "cpp").type).toBe("lesson")
  })

  it("cpp 메인(cpp-16) 완료 + 알고리즘 미완 → 알고리즘 토픽 (참고레슨/코딩뱅크 아님)", () => {
    const r = getSmartNext(new Set(["cpp-16"]), "cpp")
    expect(r.type).toBe("algo-topic")
  })

  it("cpp + 알고리즘 Wave1 완료 + 코딩뱅크 미풀이 → 코딩뱅크 (대회 직전)", () => {
    const r = getSmartNext(new Set(["cpp-16", ...wave1Lessons]), "cpp")
    expect(r.type).toBe("coding-bank")
    expect(r.href).toBe("/coding-bank")
  })

  it("Python-only + 모든 레슨 + 알고리즘 Wave1 완료 → 코딩뱅크 (Python 학생도 대회 직전 준비)", () => {
    const r = getSmartNext(new Set([...allPython, ...wave1Lessons]), "python")
    expect(r.type).toBe("coding-bank")
  })

  it("Python 레슨 미완 → 코딩뱅크로 점프하지 않고 레슨 먼저", () => {
    const r = getSmartNext(new Set([...wave1Lessons]), "python")
    expect(r.type).toBe("lesson")
  })
})
