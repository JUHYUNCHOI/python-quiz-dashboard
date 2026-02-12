/**
 * 레슨 데이터 검증 스크립트
 * 실행: npm run validate-lessons
 */

import { getAllLessonIds, loadLesson, getBilingualLessonIds } from "../data/index"

interface ValidationError {
  lessonId: string
  path: string
  message: string
}

async function validateLessons() {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []
  const allIds = getAllLessonIds()
  const bilingualIds = getBilingualLessonIds()

  console.log(`\n🦒 레슨 데이터 검증 시작...\n`)
  console.log(`총 ${allIds.length}개 레슨 (${bilingualIds.length}개 양언어)\n`)

  for (const id of allIds) {
    const lesson = await loadLesson(id)

    if (!lesson) {
      errors.push({ lessonId: id, path: "root", message: "레슨을 로드할 수 없습니다" })
      continue
    }

    // 기본 필드 검증
    if (!lesson.id) errors.push({ lessonId: id, path: "id", message: "id 필드가 없습니다" })
    if (!lesson.title) errors.push({ lessonId: id, path: "title", message: "title이 비어있습니다" })
    if (!lesson.emoji) warnings.push({ lessonId: id, path: "emoji", message: "emoji가 없습니다" })
    if (!lesson.description) warnings.push({ lessonId: id, path: "description", message: "description이 비어있습니다" })

    // 챕터 검증
    if (!lesson.chapters || lesson.chapters.length === 0) {
      errors.push({ lessonId: id, path: "chapters", message: "챕터가 없습니다" })
      continue
    }

    const stepIds = new Set<string>()

    for (let ci = 0; ci < lesson.chapters.length; ci++) {
      const chapter = lesson.chapters[ci]

      if (!chapter.id) errors.push({ lessonId: id, path: `chapters[${ci}].id`, message: "챕터 id가 없습니다" })
      if (!chapter.title) errors.push({ lessonId: id, path: `chapters[${ci}].title`, message: "챕터 title이 비어있습니다" })

      if (!chapter.steps || chapter.steps.length === 0) {
        errors.push({ lessonId: id, path: `chapters[${ci}].steps`, message: "step이 없습니다" })
        continue
      }

      for (let si = 0; si < chapter.steps.length; si++) {
        const step = chapter.steps[si]
        const stepPath = `chapters[${ci}].steps[${si}]`

        if (!step.id) {
          errors.push({ lessonId: id, path: `${stepPath}.id`, message: "step id가 없습니다" })
        } else if (stepIds.has(step.id)) {
          warnings.push({ lessonId: id, path: `${stepPath}.id`, message: `중복 step id: "${step.id}"` })
        } else {
          stepIds.add(step.id)
        }

        if (!step.title) warnings.push({ lessonId: id, path: `${stepPath}.title`, message: "step title이 비어있습니다" })

        const validTypes = ["explain", "tryit", "mission", "quiz", "interactive", "coding"]
        if (!validTypes.includes(step.type)) {
          errors.push({ lessonId: id, path: `${stepPath}.type`, message: `알 수 없는 step type: "${step.type}"` })
        }

        // 퀴즈 step 검증
        if (step.type === "quiz") {
          if (!step.options || step.options.length < 2) {
            errors.push({ lessonId: id, path: `${stepPath}.options`, message: "퀴즈 선택지가 2개 미만입니다" })
          }
          if (step.answer === undefined || step.answer === null) {
            errors.push({ lessonId: id, path: `${stepPath}.answer`, message: "퀴즈 정답이 설정되지 않았습니다" })
          } else if (step.options && (step.answer < 0 || step.answer >= step.options.length)) {
            errors.push({ lessonId: id, path: `${stepPath}.answer`, message: `정답 인덱스(${step.answer})가 선택지 범위를 벗어납니다` })
          }
        }

        // tryit/mission step 검증
        if (step.type === "tryit" || step.type === "mission") {
          if (!step.code && !step.initialCode) {
            warnings.push({ lessonId: id, path: `${stepPath}`, message: `${step.type} step에 code/initialCode가 없습니다` })
          }
        }
      }
    }

    // 양언어 검증
    if (bilingualIds.includes(id)) {
      const enLesson = await loadLesson(id, "en")
      if (!enLesson) {
        errors.push({ lessonId: id, path: "en", message: "영어 버전을 로드할 수 없습니다" })
      } else {
        if (enLesson.chapters.length !== lesson.chapters.length) {
          warnings.push({
            lessonId: id,
            path: "en.chapters",
            message: `영어 버전 챕터 수(${enLesson.chapters.length})가 한국어(${lesson.chapters.length})와 다릅니다`,
          })
        }
      }
    }
  }

  // 결과 출력
  console.log("=".repeat(50))

  if (errors.length === 0 && warnings.length === 0) {
    console.log("\n모든 레슨 데이터가 유효합니다!\n")
    process.exit(0)
  }

  if (errors.length > 0) {
    console.log(`\n[ERROR] ${errors.length}개 에러:\n`)
    for (const e of errors) {
      console.log(`  레슨 ${e.lessonId} > ${e.path}: ${e.message}`)
    }
  }

  if (warnings.length > 0) {
    console.log(`\n[WARN] ${warnings.length}개 경고:\n`)
    for (const w of warnings) {
      console.log(`  레슨 ${w.lessonId} > ${w.path}: ${w.message}`)
    }
  }

  console.log("")
  process.exit(errors.length > 0 ? 1 : 0)
}

validateLessons().catch((err) => {
  console.error("검증 스크립트 실행 중 오류:", err)
  process.exit(1)
})
