import { describe, it, expect } from "vitest"
import { getAllLessonIds, loadLesson, isBilingual, getBilingualLessonIds } from "@/data/index"
import type { LessonData, LessonStep, Chapter } from "@/data/types"

describe("Lesson Registry", () => {
  it("should have lesson IDs registered", () => {
    const ids = getAllLessonIds()
    expect(ids.length).toBeGreaterThan(0)
  })

  it("should include expected lesson ranges", () => {
    const ids = getAllLessonIds()
    // Part 1: 1-10
    for (let i = 1; i <= 10; i++) {
      expect(ids).toContain(String(i))
    }
    // Part 2: 11-14
    for (let i = 11; i <= 14; i++) {
      expect(ids).toContain(String(i))
    }
  })

  it("should have bilingual lessons for 29-33", () => {
    const bilingualIds = getBilingualLessonIds()
    for (let i = 29; i <= 33; i++) {
      expect(bilingualIds).toContain(String(i))
      expect(isBilingual(String(i))).toBe(true)
    }
  })

  it("should not mark non-bilingual lessons as bilingual", () => {
    expect(isBilingual("1")).toBe(false)
    expect(isBilingual("10")).toBe(false)
  })

  it("should include project lessons", () => {
    const ids = getAllLessonIds()
    expect(ids).toContain("p1")
    expect(ids).toContain("p2")
    expect(ids).toContain("p3")
  })
})

describe("Lesson Data Validation", () => {
  const allIds = getAllLessonIds()

  it.each(allIds)("lesson %s should load successfully", async (id) => {
    const lesson = await loadLesson(id)
    expect(lesson).not.toBeNull()
  })

  it.each(allIds)("lesson %s should have required fields", async (id) => {
    const lesson = await loadLesson(id)
    if (!lesson) return

    expect(lesson.id).toBeDefined()
    expect(lesson.title).toBeTruthy()
    expect(lesson.emoji).toBeTruthy()
    expect(lesson.description).toBeTruthy()
    expect(Array.isArray(lesson.chapters)).toBe(true)
    expect(lesson.chapters.length).toBeGreaterThan(0)
  })

  it.each(allIds)("lesson %s chapters should have valid steps", async (id) => {
    const lesson = await loadLesson(id)
    if (!lesson) return

    for (const chapter of lesson.chapters) {
      expect(chapter.id).toBeTruthy()
      expect(chapter.title).toBeTruthy()
      expect(Array.isArray(chapter.steps)).toBe(true)
      expect(chapter.steps.length).toBeGreaterThan(0)

      for (const step of chapter.steps) {
        expect(step.id).toBeTruthy()
        expect(step.title).toBeTruthy()
        expect(["explain", "tryit", "mission", "quiz", "interactive", "coding"]).toContain(step.type)
      }
    }
  })

  it.each(allIds)("lesson %s quiz steps should have valid answers", async (id) => {
    const lesson = await loadLesson(id)
    if (!lesson) return

    for (const chapter of lesson.chapters) {
      for (const step of chapter.steps) {
        if (step.type === "quiz") {
          expect(step.options).toBeDefined()
          expect(Array.isArray(step.options)).toBe(true)
          if (step.options) {
            expect(step.options.length).toBeGreaterThanOrEqual(2)
          }
          expect(step.answer).toBeDefined()
          if (step.answer !== undefined && step.options) {
            expect(step.answer).toBeGreaterThanOrEqual(0)
            expect(step.answer).toBeLessThan(step.options.length)
          }
        }
      }
    }
  })

  // Test bilingual versions
  const bilingualIds = getBilingualLessonIds()
  if (bilingualIds.length > 0) {
    it.each(bilingualIds)("bilingual lesson %s should load English version", async (id) => {
      const lesson = await loadLesson(id, "en")
      expect(lesson).not.toBeNull()
      if (lesson) {
        expect(lesson.title).toBeTruthy()
        expect(lesson.chapters.length).toBeGreaterThan(0)
      }
    })
  }
})
