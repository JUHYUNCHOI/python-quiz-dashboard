import { test, expect } from "@playwright/test"

test.describe("퀴즈 설정", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quiz/setup")
  })

  test("퀴즈 설정 페이지가 렌더링된다", async ({ page }) => {
    await expect(page.getByText("오늘도 함께 공부해볼까요?")).toBeVisible()
    await expect(page.getByText("오늘 풀 문제 개수")).toBeVisible()
    await expect(page.getByText("시작하기")).toBeVisible()
  })

  test("문제 개수를 빠른 선택으로 변경할 수 있다", async ({ page }) => {
    await page.getByText("10개").click()
    await expect(page.getByText("약")).toBeVisible()
  })

  test("난이도를 선택할 수 있다", async ({ page }) => {
    await expect(page.getByText("난이도 선택")).toBeVisible()
    await page.getByText("초급").click()
    // 초급 선택 후에도 시작 버튼이 활성화 상태
    await expect(page.getByText("시작하기")).toBeEnabled()
  })

  test("시작 버튼 클릭 시 퀴즈 페이지로 이동", async ({ page }) => {
    await page.getByText("시작하기").click()
    await expect(page).toHaveURL(/\/quiz$/)
  })
})
