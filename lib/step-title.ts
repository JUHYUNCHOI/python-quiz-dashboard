/**
 * 제출된 숙제의 step 제목을 영어로 바꾼다.
 *
 * ── 왜 필요한가 ───────────────────────────────────────────────────────────────
 * `homework_submissions.step_title` 은 **제출 당시의 한국어 제목을 박제한 값**이다.
 * DB 에 박힌 문자열이라 언어를 바꿔도 안 따라온다 — 선생님이 영어로 화면을 봐도
 * 숙제 목록만 한국어로 남는 이유가 이거다.
 *
 * 번역 자체는 이미 있다. `data/*-en.ts` 의 step 은 한국어판과 **같은 `id`** 를
 * 쓰므로(예: `s23-ch2-practice1`), `(lesson_id, step_id)` 로 찾아오면 된다.
 * DB 를 고치거나 제출마다 영어 제목을 같이 저장할 필요가 없다.
 *
 * ── 왜 동적 import 인가 ───────────────────────────────────────────────────────
 * 레슨 데이터는 한 파일이 수천 줄이다. 전부 정적으로 당기면 선생님 화면 번들에
 * 교재 전체가 들어온다. `loadLesson` 의 동적 import 를 그대로 쓰고, 화면에 실제로
 * 뜬 레슨만 불러온다.
 */

import { loadLesson } from "@/data"

/** lessonId → (stepId → 영어 제목). 모듈 수명 동안 유지한다. */
const CACHE = new Map<string, Map<string, string>>()

async function titlesFor(lessonId: string): Promise<Map<string, string>> {
  const hit = CACHE.get(lessonId)
  if (hit) return hit

  const map = new Map<string, string>()
  try {
    const lesson = await loadLesson(lessonId, "en")
    for (const chapter of lesson?.chapters ?? []) {
      for (const step of chapter.steps) map.set(step.id, step.title)
    }
  } catch {
    // 영어판이 없는 레슨이 있다. 빈 map 을 캐시해서 매번 다시 시도하지 않는다.
  }
  CACHE.set(lessonId, map)
  return map
}

export function stepTitleKey(lessonId: string, stepId: string) {
  return `${lessonId}__${stepId}`
}

/**
 * 주어진 레슨들의 영어 step 제목을 `lessonId__stepId` 키로 모아 준다.
 * 영어판이 없는 step 은 키 자체가 빠지므로, 호출 측에서 한국어 원본으로 떨어진다.
 */
export async function loadEnglishStepTitles(lessonIds: string[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {}
  await Promise.all(
    [...new Set(lessonIds)].map(async id => {
      for (const [stepId, title] of await titlesFor(id)) {
        out[stepTitleKey(id, stepId)] = title
      }
    }),
  )
  return out
}
