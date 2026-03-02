"use client"

import { useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"

/**
 * 이벤트 기반 Supabase 학습 진도 저장 훅
 * - localStorage는 그대로 유지 (오프라인/빠른 응답)
 * - Supabase는 영속 백업 (fire-and-forget)
 * - 비로그인 시 아무 동작 안 함
 */
export function useLessonSync(
  lessonId: string,
  variant: string | null,
  progressType: "learn" | "review"
) {
  const { user } = useAuth()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * 진행 상황을 Supabase에 upsert (debounced, fire-and-forget)
   */
  const syncProgress = useCallback(
    (progressData: Record<string, unknown>) => {
      if (!user) return

      if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(async () => {
        try {
          const supabase = createClient()
          const payload = {
            user_id: user.id,
            lesson_id: lessonId,
            variant: variant || null,
            progress_type: progressType,
            progress_data: progressData,
            updated_at: new Date().toISOString(),
          }
          const { error } = await supabase.from("lesson_progress").upsert(
            payload,
            { onConflict: "user_id,lesson_id,variant,progress_type" }
          )
          if (error) {
            console.error("[LessonSync] progress upsert failed:", error.message, error.code, { lessonId, progressType })
            // 1회 재시도
            const { error: retryError } = await supabase.from("lesson_progress").upsert(payload, { onConflict: "user_id,lesson_id,variant,progress_type" })
            if (retryError) console.error("[LessonSync] retry failed:", retryError.message)
          }
        } catch (e) {
          console.error("[LessonSync] network error:", e)
        }
      }, 1500)
    },
    [user, lessonId, variant, progressType]
  )

  /**
   * 레슨 완료를 Supabase에 기록 (즉시, debounce 없음)
   */
  const syncCompletion = useCallback(
    async (score: number) => {
      if (!user) return

      // 대기 중인 debounce 취소
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }

      try {
        const supabase = createClient()
        const payload = {
          user_id: user.id,
          lesson_id: lessonId,
          variant: variant || null,
          progress_type: progressType,
          progress_data: {},
          completed: true,
          score,
          updated_at: new Date().toISOString(),
        }
        const { error } = await supabase.from("lesson_progress").upsert(
          payload,
          { onConflict: "user_id,lesson_id,variant,progress_type" }
        )
        if (error) {
          console.error("[LessonSync] completion upsert failed:", error.message, error.code, { lessonId, score })
          const { error: retryError } = await supabase.from("lesson_progress").upsert(payload, { onConflict: "user_id,lesson_id,variant,progress_type" })
          if (retryError) console.error("[LessonSync] completion retry failed:", retryError.message)
        }
      } catch (e) {
        console.error("[LessonSync] completion network error:", e)
      }
    },
    [user, lessonId, variant, progressType]
  )

  /**
   * Supabase에서 진행 상황 로드 (localStorage가 비어있을 때 호출)
   * 반환: progress_data 또는 null
   */
  const loadFromCloud = useCallback(async (): Promise<Record<string, unknown> | null> => {
    if (!user) return null

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("progress_data, completed, score")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .eq("progress_type", progressType)
        .is("variant", variant || null)
        .single()

      if (error || !data) return null

      // 이미 완료된 레슨이면 null (다시 시작하도록)
      if (data.completed) return null

      return data.progress_data as Record<string, unknown>
    } catch {
      return null
    }
  }, [user, lessonId, variant, progressType])

  return { syncProgress, syncCompletion, loadFromCloud }
}
