/**
 * 수업/복습 완료 시 completedLessons localStorage에 추가
 * — 커리큘럼 페이지의 진도 추적에 사용
 */
export function markLessonComplete(lessonId: string | number) {
  try {
    const saved = localStorage.getItem("completedLessons")
    const completed: (string | number)[] = saved ? JSON.parse(saved) : []
    const set = new Set(completed)
    set.add(lessonId)
    localStorage.setItem("completedLessons", JSON.stringify([...set]))
  } catch {
    // localStorage 접근 불가 시 무시
  }
}
