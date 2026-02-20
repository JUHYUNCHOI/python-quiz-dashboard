import { test, expect } from "@playwright/test"

test.describe("커리큘럼", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/curriculum")
  })

  test("커리큘럼 페이지가 렌더링된다", async ({ page }) => {
    await expect(page.getByText("파이썬 기초 마스터")).toBeVisible()
  })

  test("Part 섹션들이 표시된다", async ({ page }) => {
    await expect(page.getByText("Part 1: 기초")).toBeVisible()
  })

  test("레슨 항목에 수업 버튼이 있다", async ({ page }) => {
    const lessonButtons = page.getByText("📺 수업")
    await expect(lessonButtons.first()).toBeVisible()
  })
})
