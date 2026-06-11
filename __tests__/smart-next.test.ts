import { describe, it, expect } from "vitest"
import { getSmartNext } from "@/lib/smart-next"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { pythonParts } from "@/lib/curriculum-data"

const wave1Lessons = ALGO_TOPICS.filter(t => t.wave === 1).map(t => t.lessonId)
const allPython = pythonParts.flatMap(p => p.lessonIds)

// node 환경 → window 없음 → getCodingBankSolvedCount()는 항상 0 (코딩뱅크 미풀이로 간주)
// 모델: 수업 → 연습 → 코딩뱅크(알고리즘 전, 브루트포스) → 알고리즘 → 대회
describe("getSmartNext — 코딩뱅크 = 알고리즘 *앞* (양 트랙 공통)", () => {
  it("cpp 진도 0 → 다음 레슨", () => {
    expect(getSmartNext(new Set(), "cpp").type).toBe("lesson")
  })

  it("cpp 메인(cpp-16) 완료 → 코딩뱅크 (알고리즘 배우기 전 첫 관문)", () => {
    const r = getSmartNext(new Set(["cpp-16"]), "cpp")
    expect(r.type).toBe("coding-bank")
    expect(r.href).toBe("/coding-bank")
  })

  it("Python 모든 레슨 완료 → 코딩뱅크 (Python 학생도 알고리즘 전에 코딩뱅크)", () => {
    const r = getSmartNext(new Set([...allPython]), "python")
    expect(r.type).toBe("coding-bank")
  })

  it("코딩뱅크가 알고리즘보다 먼저 — wave1 일부 했어도 코딩뱅크 미완이면 코딩뱅크", () => {
    // 알고리즘 토픽을 일부 했더라도(비정상 경로) 코딩뱅크(bank=0)가 우선
    const r = getSmartNext(new Set(["cpp-16", ...wave1Lessons]), "cpp")
    expect(r.type).toBe("coding-bank")
  })

  it("Python 레슨 미완 → 레슨 먼저 (코딩뱅크로 점프 X)", () => {
    const r = getSmartNext(new Set([...wave1Lessons]), "python")
    expect(r.type).toBe("lesson")
  })
})
