import { test, expect } from "@playwright/test"

test.describe("네비게이션 플로우", () => {
  test("대시보드 → 퀴즈 설정 → 퀴즈 흐름", async ({ page }) => {
    await page.goto("/")
    await page.getByText("퀴즈 시작").click()
    await expect(page).toHaveURL(/\/quiz\/setup/)

    await page.getByText("시작하기").click()
    await expect(page).toHaveURL(/\/quiz$/)

    // 퀴즈 페이지에서 문제가 표시되는지 확인
    await expect(page.getByText(/문제 1\//)).toBeVisible()
  })

  test("대시보드 → 커리큘럼 → 레슨 흐름", async ({ page }) => {
    await page.goto("/")
    await page.getByText("강의 커리큘럼").click()
    await expect(page).toHaveURL(/\/curriculum/)
    await expect(page.getByText("파이썬 기초 마스터")).toBeVisible()
  })

  test("모든 주요 페이지에 접근 가능하다", async ({ page }) => {
    const routes = [
      { path: "/", text: "강의 커리큘럼" },
      { path: "/quiz/setup", text: "오늘 풀 문제 개수" },
      { path: "/curriculum", text: "파이썬 기초 마스터" },
      { path: "/progress", text: /.+/ },
      { path: "/analytics", text: /.+/ },
    ]

    for (const route of routes) {
      await page.goto(route.path)
      // 페이지가 에러 없이 로드되는지 확인
      await expect(page.locator("body")).not.toHaveText(/Application error/)
    }
  })
})
