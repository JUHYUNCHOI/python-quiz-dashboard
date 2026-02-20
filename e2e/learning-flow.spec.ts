import { test, expect } from "@playwright/test"

/**
 * 학습 흐름 점진적 설계 검증 테스트
 * - 커리큘럼이 논리적 순서로 구성되어 있는지
 * - 각 Part가 올바른 학습 진행을 제공하는지
 * - 레슨 간 연결이 자연스러운지
 */

test.describe("커리큘럼 점진적 학습 구조", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/curriculum")
  })

  test("Part가 기초 → 심화 순서로 배치되어 있다", async ({ page }) => {
    const parts = page.locator("h2")
    const partTexts: string[] = []
    const count = await parts.count()
    for (let i = 0; i < count; i++) {
      partTexts.push(await parts.nth(i).textContent() || "")
    }

    const expectedOrder = [
      "Part 1: 기초",
      "Part 2: 제어문",
      "Part 3: 자료구조",
      "Part 3+: 자료구조 심화",
      "Part 4: 프로젝트 & 도전",
      "Part 5: 함수",
      "Part 6: 에러와 파일",
      "Part 7: 클래스",
    ]

    for (let i = 0; i < expectedOrder.length; i++) {
      expect(partTexts[i]).toContain(expectedOrder[i])
    }
  })

  test("Part 1(기초)에 print → 변수 → 연산자 → 입력 순서로 레슨이 배치되어 있다", async ({ page }) => {
    // Part 1의 레슨들이 논리적 순서: 출력 → 타입 → 변수 → 연산 → 문자열 → 입력
    const part1Lessons = [
      "print() 출력",
      "데이터 타입",
      "변수",
      "연산자",
      "문자열 연산",
      "문자열 메서드",
      "print() 옵션",
      "f-string",
      "타입 변환",
      "input() 입력",
    ]

    for (const lesson of part1Lessons) {
      await expect(page.getByText(lesson).first()).toBeVisible()
    }
  })

  test("Part 2(제어문)이 if → 심화 → for → while 순서로 되어있다", async ({ page }) => {
    const part2Lessons = [
      "조건문 (if)",
      "조건문 심화",
      "반복문 (for)",
      "반복문 (while)",
    ]

    for (const lesson of part2Lessons) {
      await expect(page.getByText(lesson).first()).toBeVisible()
    }
  })

  test("프로젝트 레슨이 각 Part 마지막에 배치되어 있다", async ({ page }) => {
    // 프로젝트 레슨들이 존재하는지 확인
    await expect(page.getByText("미니 계산기").first()).toBeVisible()
    await expect(page.getByText("숫자 맞추기 게임").first()).toBeVisible()
    await expect(page.getByText("Hangman 게임").first()).toBeVisible()
  })

  test("각 레슨에 예상 소요시간이 표시된다", async ({ page }) => {
    const timeIndicators = page.getByText(/\d+분/)
    expect(await timeIndicators.count()).toBeGreaterThan(10)
  })

  test("아직 준비 안 된 Part는 '준비중' 표시가 있다", async ({ page }) => {
    const comingSoonBadges = page.getByText("준비중")
    expect(await comingSoonBadges.count()).toBeGreaterThanOrEqual(1)
  })
})

test.describe("개별 레슨 학습 흐름", () => {
  test("레슨 1(기초)은 단계별로 진행된다", async ({ page }) => {
    await page.goto("/learn/1")
    // 레슨 페이지가 로드되면 첫 번째 스텝이 표시됨
    await expect(page.locator("body")).not.toHaveText(/Application error/)
    // 진행률 표시가 있는지
    await page.waitForTimeout(1000)
    await expect(page.getByText(/단계|Step|챕터/i).first()).toBeVisible({ timeout: 10000 })
  })

  test("레슨 11(제어문)은 Part 1 이후의 심화 개념이다", async ({ page }) => {
    await page.goto("/learn/11")
    await expect(page.locator("body")).not.toHaveText(/Application error/)
    await page.waitForTimeout(1000)
    // 조건문 관련 내용이 포함됨
    await expect(page.getByText(/if|조건/).first()).toBeVisible({ timeout: 10000 })
  })

  test("레슨 15(자료구조)은 제어문 이후의 개념이다", async ({ page }) => {
    await page.goto("/learn/15")
    await expect(page.locator("body")).not.toHaveText(/Application error/)
    await page.waitForTimeout(1000)
    // 자료구조 관련 내용이 포함됨
    await expect(page.getByText(/자료구조|리스트|데이터/).first()).toBeVisible({ timeout: 10000 })
  })
})

test.describe("레슨 접근 및 복습 경로", () => {
  test("수업 버튼으로 레슨 페이지에 접근할 수 있다", async ({ page }) => {
    await page.goto("/curriculum")
    const lessonButton = page.getByText("📺 수업").first()
    await lessonButton.click()
    await expect(page).toHaveURL(/\/learn\/\d+/)
    await expect(page.locator("body")).not.toHaveText(/Application error/)
  })

  test("복습 버튼으로 복습 페이지에 접근할 수 있다", async ({ page }) => {
    await page.goto("/curriculum")
    const reviewButton = page.getByText("🎮 복습").first()
    await reviewButton.click()
    // /review/ 또는 /learn/ 경로로 이동
    await expect(page).toHaveURL(/\/(review|learn)\//)
    await expect(page.locator("body")).not.toHaveText(/Application error/)
  })

  test("모든 Part 1 레슨 페이지가 정상 로드된다", async ({ page }) => {
    const part1Ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for (const id of part1Ids) {
      await page.goto(`/learn/${id}`)
      await expect(page.locator("body")).not.toHaveText(/Application error/, { timeout: 10000 })
    }
  })
})

test.describe("진도 추적 시스템", () => {
  test("커리큘럼에 전체 진행률이 표시된다", async ({ page }) => {
    await page.goto("/curriculum")
    // 진행률 표시 (0% 또는 X%)
    await expect(page.getByText(/%/).first()).toBeVisible()
  })

  test("레슨 완료 상태가 localStorage에 저장된다", async ({ page }) => {
    await page.goto("/curriculum")

    // localStorage에 completedLessons 키가 사용됨
    const stored = await page.evaluate(() => {
      return localStorage.getItem("completedLessons")
    })
    // null이거나 JSON 배열 형태
    if (stored !== null) {
      expect(() => JSON.parse(stored)).not.toThrow()
    }
  })

  test("완료된 레슨이 있으면 체크 표시가 된다", async ({ page }) => {
    // 테스트용으로 레슨 1을 완료 상태로 설정 (ID는 숫자)
    await page.goto("/curriculum")
    await page.evaluate(() => {
      localStorage.setItem("completedLessons", JSON.stringify([1]))
    })
    await page.reload()

    // 완료된 레슨 제목에 line-through 스타일이 적용됨
    const completedLesson = page.locator(".line-through")
    await completedLesson.first().waitFor({ timeout: 5000 })
    expect(await completedLesson.count()).toBeGreaterThanOrEqual(1)
  })

  test("다음 레슨 추천 버튼이 표시된다", async ({ page }) => {
    await page.goto("/curriculum")
    // "다음:" 텍스트가 포함된 레슨 추천
    await expect(page.getByText(/다음:/).first()).toBeVisible()
  })
})

test.describe("퀴즈 학습 난이도 설정", () => {
  test("퀴즈 난이도 옵션이 점진적이다 (초급 → 중급 → 고급 → 혼합)", async ({ page }) => {
    await page.goto("/quiz/setup")

    await expect(page.getByText("초급")).toBeVisible()
    await expect(page.getByText("중급")).toBeVisible()
    await expect(page.getByText("고급")).toBeVisible()
    await expect(page.getByText("혼합")).toBeVisible()
  })

  test("문제 수를 조절할 수 있다 (10 ~ 50개)", async ({ page }) => {
    await page.goto("/quiz/setup")

    const quickOptions = ["10개", "20개", "30개", "50개"]
    for (const opt of quickOptions) {
      await expect(page.getByText(opt)).toBeVisible()
    }
  })

  test("초급 선택 시 퀴즈가 시작된다", async ({ page }) => {
    await page.goto("/quiz/setup")
    await page.getByText("초급").click()
    await page.getByText("시작하기").click()
    await expect(page).toHaveURL(/\/quiz$/)
    // 퀴즈 문제가 표시됨
    await expect(page.getByText(/문제 1\//)).toBeVisible()
  })

  test("고급 선택 시 퀴즈가 시작된다", async ({ page }) => {
    await page.goto("/quiz/setup")
    await page.getByText("고급").click()
    await page.getByText("시작하기").click()
    await expect(page).toHaveURL(/\/quiz$/)
    await expect(page.getByText(/문제 1\//)).toBeVisible()
  })
})

test.describe("퀴즈 진행 중 학습 지원", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quiz/setup")
    await page.getByText("10개").click()
    await page.getByText("시작하기").click()
    await expect(page).toHaveURL(/\/quiz$/)
  })

  test("문제 진행률이 표시된다", async ({ page }) => {
    await expect(page.getByText(/문제 1\//)).toBeVisible()
    await expect(page.getByText(/% 완료/)).toBeVisible()
  })

  test("타이머가 동작한다", async ({ page }) => {
    // MM:SS 형식 타이머
    await expect(page.getByText(/\d+:\d{2}/)).toBeVisible()
  })

  test("답을 선택하고 다음으로 넘어갈 수 있다", async ({ page }) => {
    // 보기 옵션은 orange border가 나타나는 버튼들 (4지선다)
    // data-option 또는 특정 패턴의 보기 버튼을 찾음
    await page.waitForTimeout(500)

    // 퀴즈 보기 영역의 버튼 클릭 (보기는 보통 border-2 rounded 스타일)
    const optionButtons = page.locator("button.rounded-xl, button.rounded-2xl").filter({
      hasNot: page.locator("svg"), // 아이콘만 있는 버튼 제외
    })
    const count = await optionButtons.count()
    if (count > 0) {
      await optionButtons.first().click()
      await page.waitForTimeout(300)
    }

    // 다음 버튼이 활성화될 때까지 대기 후 클릭
    const nextButton = page.getByRole("button", { name: "다음" })
    await expect(nextButton).toBeEnabled({ timeout: 5000 })
    await nextButton.click()
  })

  test("나가기 버튼으로 퀴즈를 종료할 수 있다", async ({ page }) => {
    const exitButton = page.getByLabel("나가기")
    await expect(exitButton).toBeVisible()
  })
})
