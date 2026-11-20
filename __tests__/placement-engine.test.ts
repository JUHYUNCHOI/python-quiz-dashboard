import { describe, it, expect } from "vitest"
import {
  startPlacement, currentItem, submitAnswer, resultTier,
  placementBankGaps, PLACEMENT_LENGTH, PROBE_SIZE,
} from "@/lib/placement-engine"
import { PLACEMENT_ITEMS, isPlacementCorrect, normalizeOutput } from "@/data/placement-test"
import { TIER_IDS, tierOfLevel, promotionPool, problemRole, tierRank, TIERS, type TierId } from "@/lib/tier-system"

/**
 * 가짜 응시자. `ability` 단계까지는 전부 맞히고 그 위는 전부 틀린다.
 * 실력이 계단처럼 깔끔한 이상적인 학생 — 엔진이 이 학생을 못 맞히면
 * 실제 학생은 더 못 맞힌다.
 */
function simulate(ability: number, seed = 42) {
  let s = startPlacement(seed)
  let guard = 0
  while (currentItem(s) && guard++ < 50) {
    const item = currentItem(s)!
    s = submitAnswer(s, item.step <= ability ? item.answer : "WRONG_ON_PURPOSE")
  }
  return s
}

describe("배치고사 문항 은행", () => {
  it("모든 단계에 probe 를 채울 문항이 있다", () => {
    // 한 단계라도 3문항 미만이면 그 단계에서 탐색이 끊겨 티어가 잘못 나온다.
    expect(placementBankGaps()).toEqual([])
  })

  it("문항 id 가 중복되지 않는다", () => {
    const ids = PLACEMENT_ITEMS.map(i => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("각 단계에 최소 2개 probe 분량이 있다", () => {
    // 3개뿐이면 재시험 때 토씨 하나 안 틀리고 같은 시험이 나오고,
    // 확인 probe 를 돌릴 문항도 남지 않는다.
    for (let st = 1; st <= 10; st++) {
      expect(PLACEMENT_ITEMS.filter(i => i.step === st).length, `step=${st}`)
        .toBeGreaterThanOrEqual(PROBE_SIZE * 2)
    }
  })

  it("정답이 비어 있지 않다", () => {
    for (const it of PLACEMENT_ITEMS) {
      expect(it.answer.trim().length, it.id).toBeGreaterThan(0)
      expect(it.code.trim().length, it.id).toBeGreaterThan(0)
    }
  })
})

describe("출력 채점", () => {
  it("공백·따옴표 차이는 흘려준다", () => {
    expect(isPlacementCorrect(" 11 ", "11")).toBe(true)
    expect(isPlacementCorrect("[1,2,3]", "[1, 2, 3]")).toBe(true)
    expect(isPlacementCorrect(`{"b": 1}`, "{'b': 1}")).toBe(true)
    expect(isPlacementCorrect("0\n1\n4\n", "0\n1\n4")).toBe(true)
  })

  it("값이 다르면 틀린 것이다", () => {
    // `3 1` 을 `31` 로 받아주면 시험이 무너진다 — 공백 제거를 과하게 하면 생기는 일.
    expect(isPlacementCorrect("31", "3 1")).toBe(false)
    expect(isPlacementCorrect("12", "11")).toBe(false)
    expect(isPlacementCorrect("true false", "True False")).toBe(false)
    expect(isPlacementCorrect("", "11")).toBe(false)
  })

  it("정규화는 줄 끝 공백과 CRLF 를 없앤다", () => {
    expect(normalizeOutput("a \r\nb  c\n\n")).toBe("a\nb c")
  })
})

describe("적응형 엔진", () => {
  it("12문항을 넘기지 않는다", () => {
    for (let ability = 0; ability <= 10; ability++) {
      const s = simulate(ability)
      expect(s.answers.length, `ability=${ability}`).toBeLessThanOrEqual(PLACEMENT_LENGTH)
      expect(s.phase).toBe("done")
    }
  })

  it("같은 문항을 두 번 내지 않는다", () => {
    for (let ability = 0; ability <= 10; ability++) {
      const s = simulate(ability)
      expect(new Set(s.usedIds).size, `ability=${ability}`).toBe(s.usedIds.length)
    }
  })

  it("실력 단계와 같은 티어에 배치한다", () => {
    // ability N → N번째 티어. ability 0 은 더 내릴 곳이 없어 최하위.
    for (let ability = 1; ability <= 10; ability++) {
      expect(resultTier(simulate(ability)), `ability=${ability}`).toBe(TIER_IDS[ability - 1])
    }
    expect(resultTier(simulate(0))).toBe(TIER_IDS[0])
  })

  it("시드가 달라도 같은 실력은 같은 티어로 간다", () => {
    for (const seed of [1, 7, 12345, 999999]) {
      for (let ability = 1; ability <= 10; ability++) {
        expect(resultTier(simulate(ability, seed)), `seed=${seed} ability=${ability}`)
          .toBe(TIER_IDS[ability - 1])
      }
    }
  })

  it("재시험이면 다른 문항이 나온다", () => {
    // 같은 시험이 또 나오면 답을 외워서 티어를 올릴 수 있다.
    const a = simulate(7, 1).usedIds
    const b = simulate(7, 2).usedIds
    expect(a.filter(id => b.includes(id)).length).toBeLessThan(a.length)
  })

  it("12문항을 다 쓴다 — 예산이 남으면 확인 probe 를 돌린다", () => {
    // 9문항에서 끝나면 요구된 12문항이 아니고, 운으로 올라간 티어를
    // 되돌릴 기회도 없어진다.
    for (let ability = 1; ability <= 10; ability++) {
      expect(simulate(ability).answers.length, `ability=${ability}`).toBe(PLACEMENT_LENGTH)
    }
  })

  it("전부 찍어서 틀리면 최하위 티어다", () => {
    let s = startPlacement(5)
    let guard = 0
    while (currentItem(s) && guard++ < 50) s = submitAnswer(s, "zzz")
    expect(resultTier(s)).toBe(TIER_IDS[0])
    expect(s.best).toBe(0)
  })

  it("probe 단위로 판정한다 — 3문항 중 1개만 맞히면 통과가 아니다", () => {
    // 첫 probe(5단계) 에서 1개만 맞히고 나머지는 전부 틀리면 5단계는 통과 못 한다.
    let s = startPlacement(42)
    let answered = 0
    let guard = 0
    while (currentItem(s) && guard++ < 50) {
      const item = currentItem(s)!
      const firstProbe = answered < PROBE_SIZE
      s = submitAnswer(s, firstProbe && answered === 0 ? item.answer : "nope")
      answered++
    }
    expect(tierRank(resultTier(s))).toBeLessThan(5)
  })

  it("한 문항 실수로 티어가 무너지지 않는다", () => {
    // 7단계 학생이 자기 수준 probe 에서 1개를 실수해도 2/3 이면 통과한다.
    let s = startPlacement(42)
    const slipped = new Set<number>()
    let guard = 0
    while (currentItem(s) && guard++ < 50) {
      const item = currentItem(s)!
      const ok = item.step <= 7
      // 각 단계에서 첫 문항만 일부러 틀린다
      const slip = ok && !slipped.has(item.step)
      if (slip) slipped.add(item.step)
      s = submitAnswer(s, ok && !slip ? item.answer : "nope")
    }
    expect(resultTier(s)).toBe(TIER_IDS[6])
  })
})

describe("티어 시스템", () => {
  it("티어 구간이 빈틈 없이 이어진다", () => {
    for (let i = 1; i < TIERS.length; i++) {
      expect(TIERS[i].minLevel, TIERS[i].id).toBe(TIERS[i - 1].maxLevel + 1)
    }
  })

  it("모든 티어에 승급용 자체채점 문제가 10개 이상 있다", () => {
    // 10개를 못 채우면 그 티어에서 승급이 영구 불가 — 막다른 길이 된다.
    for (const id of TIER_IDS) {
      expect(promotionPool(id).length, id).toBeGreaterThanOrEqual(10)
    }
  })

  it("level 은 항상 어떤 티어에 들어간다", () => {
    for (const lv of [0, 1, 8, 12, 13, 54, 55, 99, 500]) {
      expect(TIER_IDS).toContain(tierOfLevel(lv))
    }
  })

  it("아래 티어 문제는 연습, 자기 티어 자체채점만 승급", () => {
    const my: TierId = "gold2"
    const mine = promotionPool(my)[0]
    expect(problemRole(mine, my)).toBe("promotion")

    const lower = promotionPool("bronze2")[0]
    expect(problemRole(lower, my)).toBe("practice")

    const higher = promotionPool("master")[0]
    expect(problemRole(higher, my)).toBe("locked")
  })

  it("외부 문제는 자기 티어여도 승급에 안 쓰인다", () => {
    // 외부 사이트는 우리가 채점할 수 없다 — 체크박스 10번으로 승급되면 안 된다.
    for (const id of TIER_IDS) {
      for (const p of promotionPool(id)) expect(p.graded, p.id).toBe(true)
    }
  })
})
