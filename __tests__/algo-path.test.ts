/**
 * lib/algo-path.ts 가드 테스트.
 *
 * 이 저장소엔 알고리즘 토픽 id 를 하드코딩한 사본이 여러 곳 있고, 그중 하나
 * (app/parent/page.tsx) 는 이미 존재하지 않는 "algo-linkedlist" 를 들고 있다.
 * 같은 부패가 본길 목록에 생기면 학생이 빈 경로를 보게 되므로 여기서 막는다.
 */
import { describe, it, expect } from "vitest"
import { ALGO_TOPICS, ALGO_TOPIC_MAP } from "@/data/algo/topics"
import { TRUNK_IDS, SIDE_NOTES, getAlgoPath, isTrunk } from "@/lib/algo-path"

describe("algo-path — 본길/옆길 무결성", () => {
  it("본길 id 는 전부 실재하는 토픽이다", () => {
    for (const id of TRUNK_IDS) {
      expect(ALGO_TOPIC_MAP[id], `본길 "${id}" 가 ALGO_TOPICS 에 없음`).toBeDefined()
    }
  })

  it("본길 + 옆길 = 전체 토픽 (빠짐/중복 없음)", () => {
    const { trunk, side } = getAlgoPath(new Set())
    expect(trunk.length + side.length).toBe(ALGO_TOPICS.length)
    const ids = [...trunk, ...side].map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length) // 중복 없음
  })

  it("본길은 8 개 — USACO Silver 입구까지", () => {
    expect(TRUNK_IDS.size).toBe(8)
  })

  it("본길 순서는 ALGO_TOPICS 선언 순서를 따른다 (순서를 두 곳에 두지 않기)", () => {
    const { trunk } = getAlgoPath(new Set())
    const declOrder = ALGO_TOPICS.filter(t => TRUNK_IDS.has(t.id)).map(t => t.id)
    expect(trunk.map(t => t.id)).toEqual(declOrder)
    // 의도한 경로 (문자열은 옆길이라 건너뜀)
    expect(trunk.map(t => t.id)).toEqual([
      "array", "sorting", "stackqueue", "hashtable",
      "prefixsum", "binarysearch", "greedy", "graph",
    ])
  })

  it("재귀는 옆길이다 — 알고리즘 트랙을 막지 않도록", () => {
    expect(isTrunk("recursion")).toBe(false)
    expect(SIDE_NOTES.recursion).toBeDefined()
  })

  it("모든 옆길에 '언제 필요한지' 안내가 있다", () => {
    const { side } = getAlgoPath(new Set())
    for (const tp of side) {
      expect(SIDE_NOTES[tp.id], `옆길 "${tp.id}" 안내 문구 없음`).toBeDefined()
    }
  })
})

describe("algo-path — 진도 계산", () => {
  it("아무것도 안 했으면 첫 본길이 current", () => {
    const s = getAlgoPath(new Set())
    expect(s.current?.id).toBe("array")
    expect(s.done).toBe(0)
    expect(s.total).toBe(8)
    expect(s.isTrunkDone).toBe(false)
  })

  it("앞 2 개를 끝내면 3 번째가 current", () => {
    const s = getAlgoPath(new Set(["algo-array", "algo-sorting"]))
    expect(s.current?.id).toBe("stackqueue")
    expect(s.done).toBe(2)
  })

  it("옆길을 끝내도 본길 진도는 안 오른다", () => {
    const s = getAlgoPath(new Set(["algo-recursion", "algo-dp"]))
    expect(s.done).toBe(0)
    expect(s.current?.id).toBe("array")
  })

  it("본길을 다 하면 isTrunkDone", () => {
    const all = new Set([...TRUNK_IDS].map(id => ALGO_TOPIC_MAP[id].lessonId))
    const s = getAlgoPath(all)
    expect(s.isTrunkDone).toBe(true)
    expect(s.current).toBeNull()
    expect(s.done).toBe(8)
  })
})
