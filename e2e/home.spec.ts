import { test, expect } from "@playwright/test"

test.describe("홈 대시보드", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("대시보드가 정상 렌더링된다", async ({ page }) => {
    await expect(page).toHaveTitle(/파이린/)
    await expect(page.getByText("수업하기")).toBeVisible()
    await expect(page.getByText("퀴즈 풀기")).toBeVisible()
  })

  test("모든 메뉴 카드가 보인다", async ({ page }) => {
    const cards = ["수업하기", "퀴즈 풀기"]
    for (const title of cards) {
      await expect(page.getByText(title)).toBeVisible()
    }
  })

  test("퀴즈 카드 클릭 시 setup 페이지로 이동", async ({ page }) => {
    await page.getByText("퀴즈 풀기").click()
    await expect(page).toHaveURL(/\/quiz\/setup/)
  })

  test("수업하기 카드 클릭 시 커리큘럼 페이지로 이동", async ({ page }) => {
    await page.getByText("수업하기").click()
    await expect(page).toHaveURL(/\/curriculum/)
  })
})
