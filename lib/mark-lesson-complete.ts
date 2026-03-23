/**
 * 수업/복습 완료 시 completedLessons localStorage에 추가 + Supabase 즉시 동기화
 * — 커리큘럼 페이지의 진도 추적에 사용
 */
export function markLessonComplete(lessonId: string | number) {
  const normalizedId = String(lessonId)

  try {
    const saved = localStorage.getItem("completedLessons")
    const completed: (string | number)[] = saved ? JSON.parse(saved) : []
    const set = new Set(completed.map(id => String(id)))
    set.add(normalizedId)
    localStorage.setItem("completedLessons", JSON.stringify([...set]))
  } catch {
    // localStorage 접근 불가 시 무시
  }

  // 로그인 상태이면 Supabase에도 즉시 저장
  import("./supabase/client").then(({ createClient }) => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: normalizedId,
        variant: "",
        progress_type: "learn",
        progress_data: {},
        completed: true,
        score: 0,
      }, { onConflict: "user_id,lesson_id,variant,progress_type" }).then(({ error }) => {
        if (error) console.error("[markLessonComplete] supabase upsert failed:", error.message)
      })
    })
  }).catch(() => {})
}

/**
 * 퀴즈(복습) 완료 시 completedQuizzes localStorage에 추가
 * — 커리큘럼 페이지에서 수업 완료와 별도로 퀴즈 완료 표시에 사용
 */
export function markQuizComplete(lessonId: string | number) {
  try {
    const saved = localStorage.getItem("completedQuizzes")
    const completed: (string | number)[] = saved ? JSON.parse(saved) : []
    const normalizedId = String(lessonId)
    const set = new Set(completed.map(id => String(id)))
    set.add(normalizedId)
    localStorage.setItem("completedQuizzes", JSON.stringify([...set]))
  } catch {}
}

/** completedQuizzes 읽기 */
export function getCompletedQuizzes(): Set<string | number> {
  try {
    const saved = localStorage.getItem("completedQuizzes")
    if (!saved) return new Set()
    const arr: (string | number)[] = JSON.parse(saved)
    return new Set(arr.map(id => {
      const s = String(id)
      return /^\d+$/.test(s) ? Number(s) : s
    }))
  } catch {
    return new Set()
  }
}
