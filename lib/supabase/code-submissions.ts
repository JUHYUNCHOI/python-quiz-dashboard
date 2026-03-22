import { createClient } from "./client"

/**
 * 특정 레슨의 모든 제출 코드 로드
 * { stepId → code } 형태로 반환
 */
export async function fetchCodeSubmissions(
  userId: string,
  lessonId: string
): Promise<Record<string, string>> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("code_submissions")
    .select("step_id, code")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
  if (error || !data) return {}
  return Object.fromEntries(data.map(r => [r.step_id as string, r.code as string]))
}

/**
 * 정답 코드 저장 (upsert — 같은 step은 덮어씀)
 */
export async function upsertCodeSubmission(
  userId: string,
  lessonId: string,
  stepId: string,
  code: string
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from("code_submissions").upsert(
    { user_id: userId, lesson_id: lessonId, step_id: stepId, code, submitted_at: new Date().toISOString() },
    { onConflict: "user_id,lesson_id,step_id" }
  )
  if (error) console.error("[CodeSubmissions] upsert failed:", error.message)
}
