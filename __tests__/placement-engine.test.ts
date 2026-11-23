import { describe, it, expect } from "vitest"
import {
  startPlacement, currentTask, submitResult, resultTier, placementBankGaps,
  problemIndex, passedCount, placementProgress,
  PLACEMENT_MAX_PROBLEMS, PLACEMENT_CAP_STEP, START_STEP,
} from "@/lib/placement-engine"
import { PLACEMENT_CODE_TASKS, codeTaskAtStep, codeTaskSamples } from "@/data/placement-code"
import { TIER_IDS, tierOfLevel, promotionPool, problemRole, TIERS, type TierId } from "@/lib/tier-system"

/**
 * 배치로 받을 수 있는 가장 높은 단계. 마스터 이상은 승급 전용이라
 * ability 9·10 학생도 여기서 멈춘다 — 기대값을 `ability` 로 쓰면 안 된다.
 */
const cap = (ability: number) => Math.min(ability, PLACEMENT_CAP_STEP)

/**
 * 가짜 응시자. `ability` 단계까지의 문제는 풀고 그 위는 못 푼다.
 * 실력이 계단처럼 깔끔한 이상적인 학생 — 엔진이 이 학생을 못 맞히면
 * 실제 학생은 더 못 맞힌다.
 */
function simulate(ability: number) {
  let s = startPlacement()
  let guard = 0
  while (currentTask(s) && guard++ < 20) {
    s = submitResult(s, currentTask(s)!.step <= ability)
  }
  return s
}

describe("배치고사 문제 은행", () => {
  it("단계 1..10 에 문제가 하나씩 다 있다", () => {
    // 한 단계라도 비면 그 단계에서 탐색이 끊겨 티어가 잘못 나온다.
    expect(placementBankGaps()).toEqual([])
  })

  it("문제 id 가 중복되지 않는다", () => {
    const ids = PLACEMENT_CODE_TASKS.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("한 단계에 문제가 둘 이상 있지 않다", () => {
    // 이분 탐색은 단계를 한 번만 방문한다 — 둘째 문제는 영원히 안 나온다.
    // 은행에 넣어 두면 "낸 적 없는 문제"가 쌓여서 난이도 보정이 안 보인다.
    const steps = PLACEMENT_CODE_TASKS.map(t => t.step)
    expect(new Set(steps).size).toBe(steps.length)
  })

  it("문제문의 모든 칸이 한국어·영어 둘 다 채워져 있다", () => {
    // 한 칸이라도 비면 영어 화면에 한국어가 섞여 나오거나 빈 섹션이 뜬다.
    for (const q of PLACEMENT_CODE_TASKS) {
      for (const k of ["title", "titleEn", "skill", "skillEn", "desc", "descEn",
                       "input", "inputEn", "output", "outputEn",
                       "limits", "limitsEn"] as const) {
        expect(q[k].trim().length, `${q.id}.${k}`).toBeGreaterThan(0)
      }
    }
  })

  it("영어 문제문에 한글이 섞여 있지 않다", () => {
    const hangul = /[\uAC00-\uD7A3]/
    for (const q of PLACEMENT_CODE_TASKS) {
      for (const k of ["titleEn", "skillEn", "descEn", "inputEn", "outputEn", "limitsEn"] as const) {
        expect(hangul.test(q[k]), `${q.id}.${k}`).toBe(false)
      }
    }
  })

  it("테스트케이스가 있고 기대 출력이 비어 있지 않다", () => {
    for (const q of PLACEMENT_CODE_TASKS) {
      expect(q.tests.length, q.id).toBeGreaterThanOrEqual(3)
      for (const tc of q.tests) {
        // stdin 은 줄바꿈으로 끝나야 한다 — 마지막 줄에 \n 이 없으면
        // `input()` 이 EOF 로 터지는 제출이 "정답인데 실패"로 찍힌다.
        expect(tc.stdin.endsWith("\n"), `${q.id} stdin`).toBe(true)
        expect(tc.expected.trim().length, `${q.id} expected`).toBeGreaterThan(0)
        // 기대 출력에 끝 줄바꿈을 넣으면 trim 비교와 어긋나 혼란만 생긴다.
        expect(tc.expected, `${q.id} expected`).toBe(tc.expected.trim())
      }
    }
  })

  it("공개 예제가 1개 이상이고 테스트 수를 넘지 않는다", () => {
    // 예제가 0개면 출력 형식을 추측해야 한다. 전부 공개하면 숨은 검증이 없어진다.
    for (const q of PLACEMENT_CODE_TASKS) {
      expect(q.sampleCount, q.id).toBeGreaterThanOrEqual(1)
      expect(q.sampleCount, q.id).toBeLessThan(q.tests.length)
      expect(codeTaskSamples(q).length, q.id).toBe(q.sampleCount)
    }
  })
})

describe("적응형 엔진", () => {
  it("첫 문제는 탐색 구간의 중앙이다", () => {
    expect(currentTask(startPlacement())?.step).toBe(START_STEP)
  })

  it("최악의 경우에도 문제 수가 상한을 넘지 않는다", () => {
    for (let ability = 0; ability <= 10; ability++) {
      const s = simulate(ability)
      expect(s.phase, `ability=${ability}`).toBe("done")
      expect(s.attempts.length, `ability=${ability}`).toBeLessThanOrEqual(PLACEMENT_MAX_PROBLEMS)
      expect(s.attempts.length, `ability=${ability}`).toBeGreaterThanOrEqual(3)
    }
  })

  it("같은 문제를 두 번 내지 않는다", () => {
    for (let ability = 0; ability <= 10; ability++) {
      const ids = simulate(ability).attempts.map(a => a.taskId)
      expect(new Set(ids).size, `ability=${ability}`).toBe(ids.length)
    }
  })

  it("실력 단계와 같은 티어에 배치한다", () => {
    // ability N → N번째 티어 (상한까지). ability 0 은 더 내릴 곳이 없어 최하위.
    for (let ability = 1; ability <= 10; ability++) {
      expect(resultTier(simulate(ability)), `ability=${ability}`).toBe(TIER_IDS[cap(ability) - 1])
    }
    expect(resultTier(simulate(0))).toBe(TIER_IDS[0])
  })

  it("마스터 이상은 배치고사로 받을 수 없다", () => {
    // 9·10단계 문제를 다 풀 수 있는 학생도 상한에서 멈춘다.
    for (const ability of [9, 10]) {
      expect(resultTier(simulate(ability))).toBe(TIER_IDS[PLACEMENT_CAP_STEP - 1])
    }
    // 탐색이 상한 위 단계를 애초에 방문하지 않는다.
    for (let ability = 0; ability <= 10; ability++) {
      for (const a of simulate(ability).attempts) {
        expect(a.step, `ability=${ability}`).toBeLessThanOrEqual(PLACEMENT_CAP_STEP)
      }
    }
  })

  it("전부 포기하면 최하위 티어다", () => {
    let s = startPlacement()
    let guard = 0
    while (currentTask(s) && guard++ < 20) s = submitResult(s, false)
    expect(s.best).toBe(0)
    expect(resultTier(s)).toBe(TIER_IDS[0])
  })

  it("문제를 풀면 더 어려운 문제가, 못 풀면 더 쉬운 문제가 나온다", () => {
    const up = submitResult(startPlacement(), true)
    expect(currentTask(up)!.step).toBeGreaterThan(START_STEP)

    const down = submitResult(startPlacement(), false)
    expect(currentTask(down)!.step).toBeLessThan(START_STEP)
  })

  it("1단계도 못 풀면 더 내리지 않고 끝낸다", () => {
    // 아래로 더 갈 곳이 없는데 계속 문제를 내면 시험이 끝나지 않는다.
    let s = startPlacement()
    let guard = 0
    while (currentTask(s) && guard++ < 20) s = submitResult(s, false)
    expect(s.phase).toBe("done")
    expect(s.attempts.map(a => a.step)).toContain(1)
  })

  it("진행률은 뒤로 가지 않고 끝나면 100% 다", () => {
    let s = startPlacement()
    let prev = placementProgress(s)
    let guard = 0
    while (currentTask(s) && guard++ < 20) {
      s = submitResult(s, true)
      const now = placementProgress(s)
      expect(now).toBeGreaterThanOrEqual(prev)
      prev = now
    }
    expect(placementProgress(s)).toBe(1)
  })

  it("진행 표시와 통과 수가 실제 기록과 맞는다", () => {
    let s = startPlacement()
    expect(problemIndex(s)).toBe(1)
    s = submitResult(s, true)
    expect(problemIndex(s)).toBe(2)
    expect(passedCount(s)).toBe(1)
    s = submitResult(s, false)
    expect(passedCount(s)).toBe(1)
    expect(s.attempts.length).toBe(2)
  })

  it("끝난 뒤에 또 제출해도 상태가 바뀌지 않는다", () => {
    // 화면이 두 번 제출하는 경우(더블 클릭, 느린 채점)에 티어가 움직이면 안 된다.
    const s = simulate(5)
    expect(submitResult(s, true)).toBe(s)
  })

  it("상한 단계의 문제가 은행에 있다", () => {
    // 없으면 탐색의 마지막 칸이 영원히 확인되지 않아 최고 배치가 불가능해진다.
    expect(codeTaskAtStep(PLACEMENT_CAP_STEP)).not.toBeNull()
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
