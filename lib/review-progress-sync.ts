/**
 * 복습 진도를 Supabase + localStorage에 동기화
 *
 * 왜 필요한가:
 *   localStorage는 브라우저/디바이스별 저장소 → 아이패드에서 저장한 진도가
 *   노트북에서 안 보임. Supabase에 저장하면 어느 디바이스에서 열어도 이어서 풀 수 있음.
 *
 * 구현 방식:
 *   - localStorage: 즉시 저장 (빠른 복원 + 오프라인 폴백)
 *   - Supabase: lesson_progress.progress_data JSONB에 저장
 *               progress_type = "review_progress" 로 기존 learn/quiz 행과 분리
 */

export interface ReviewProgressData {
  currentIndex: number
  score: number
  totalAttempted: number
  correctCount: number
  completedSteps: number[]
  wrongSteps: number[]
  updatedAt: number   // Date.now() — 디바이스 간 최신 판별용
}

const REVIEW_PROGRESS_TYPE = "review_progress"

/**
 * 복습 진도를 Supabase에 저장 (fire-and-forget)
 * 비로그인 상태면 조용히 스킵.
 */
export function saveReviewProgressToSupabase(
  lessonId: string,
  data: ReviewProgressData
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
              lesson_id: String(lessonId),
              variant: "",
              progress_type: REVIEW_PROGRESS_TYPE,
              progress_data: data,
              completed: false,
              score: data.score,
            },
            { onConflict: "user_id,lesson_id,variant,progress_type" }
          )
          .then(({ error }) => {
            if (error) console.error("[saveReviewProgress] upsert failed:", error.message)
          })
      })
    })
    .catch(() => {})
}

/**
 * Supabase에서 복습 진도 로드.
 * 비로그인이거나 저장된 데이터가 없으면 null 반환.
 */
export async function loadReviewProgressFromSupabase(
  lessonId: string
): Promise<ReviewProgressData | null> {
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
      .eq("lesson_id", String(lessonId))
      .eq("variant", "")
      .eq("progress_type", REVIEW_PROGRESS_TYPE)
      .single()

    return (data?.progress_data as ReviewProgressData) ?? null
  } catch {
    return null
  }
}
