import { createClient } from "@/lib/supabase/client"

interface TrackStepVisitParams {
  userId: string
  lessonId: string | number
  stepId: string
  stepType?: string
  stepIndex: number
  totalSteps: number
}

/**
 * 학생이 레슨 스텝을 방문할 때 Supabase에 기록.
 * upsert로 중복 방지 — first_visited_at은 최초 1회만 기록되고
 * last_visited_at은 매번 갱신됨.
 * 선생님 모드에서는 호출하지 말 것 (호출부에서 isTeacher 체크).
 * 에러가 나도 학습 흐름에 영향 없도록 fire-and-forget.
 */
export async function trackStepVisit({
  userId,
  lessonId,
  stepId,
  stepType,
  stepIndex,
  totalSteps,
}: TrackStepVisitParams): Promise<void> {
  try {
    const supabase = createClient()
    const now = new Date().toISOString()

    await supabase.from("lesson_step_visits").upsert(
      {
        user_id: userId,
        lesson_id: String(lessonId),
        step_id: stepId,
        step_type: stepType ?? null,
        step_index: stepIndex,
        total_steps: totalSteps,
        // first_visited_at은 DB default(now())로 최초만 기록
        last_visited_at: now,
      },
      {
        onConflict: "user_id,lesson_id,step_id",
        ignoreDuplicates: false, // last_visited_at 업데이트
      }
    )
  } catch {
    // 방문 로그 실패는 학습에 영향 없음 — 조용히 무시
  }
}
