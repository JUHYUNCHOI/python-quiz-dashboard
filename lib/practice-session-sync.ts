/**
 * 도전하기(PracticeSession) 세트 내 진행 위치를 Supabase + localStorage에 동기화
 *
 * 왜 필요한가:
 *   세트 완료 기록(practice_sessions)은 이미 Supabase에 저장되지만,
 *   세트 진행 중 현재 문제 위치(index)는 localStorage에만 있었음.
 *   아이패드 → 다른 기기로 이동하면 같은 세트를 처음부터 다시 풀어야 했음.
 *
 * 구현:
 *   lesson_progress 테이블, progress_type = "practice_session" 로 저장.
 *   세트 완료 후에는 다음 세트 시작 시 덮어씌워지므로 별도 삭제 불필요.
 */

export interface PracticeSessionProgressData {
  setNum: number
  index: number
  passedIds: string[]
  isRetry: boolean
  problemIds: string[]
  updatedAt: number   // Date.now()
}

const PRACTICE_SESSION_PROGRESS_TYPE = "practice_session"

/**
 * 도전하기 세트 내 진행 위치를 Supabase에 저장 (fire-and-forget)
 */
export function savePracticeSessionToSupabase(
  clusterId: string,
  data: PracticeSessionProgressData
): void {
  import("@/lib/supabase/client")
    .then(({ createClient }) => {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data: authData }) => {
        const user = authData.user
        if (!user) return
        supabase
          .from("lesson_progress")
          .upsert(
            {
              user_id: user.id,
              lesson_id: clusterId,
              variant: "",
              progress_type: PRACTICE_SESSION_PROGRESS_TYPE,
              progress_data: data,
              completed: false,
              score: 0,
            },
            { onConflict: "user_id,lesson_id,variant,progress_type" }
          )
          .then(({ error }) => {
            if (error) console.error("[savePracticeSession] upsert failed:", error.message)
          })
      })
    })
    .catch(() => {})
}

/**
 * Supabase에서 도전하기 세트 내 진행 위치 로드.
 * 비로그인이거나 저장된 데이터가 없으면 null 반환.
 */
export async function loadPracticeSessionFromSupabase(
  clusterId: string
): Promise<PracticeSessionProgressData | null> {
  try {
    const { createClient } = await import("@/lib/supabase/client")
    const supabase = createClient()
    const { data: authData } = await supabase.auth.getUser()
    const user = authData.user
    if (!user) return null

    const { data } = await supabase
      .from("lesson_progress")
      .select("progress_data")
      .eq("user_id", user.id)
      .eq("lesson_id", clusterId)
      .eq("variant", "")
      .eq("progress_type", PRACTICE_SESSION_PROGRESS_TYPE)
      .single()

    return (data?.progress_data as PracticeSessionProgressData) ?? null
  } catch {
    return null
  }
}
