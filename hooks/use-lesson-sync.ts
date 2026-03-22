"use client"

import { useCallback, useRef, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { flushToSupabase } from "@/lib/supabase/keepalive-flush"

/**
 * 이벤트 기반 Supabase 학습 진도 저장 훅
 * - localStorage는 그대로 유지 (오프라인/빠른 응답)
 * - Supabase는 영속 백업 (fire-and-forget)
 * - 비로그인 시 아무 동작 안 함
 * - visibilitychange 시 keepalive fetch로 즉시 flush
 */
export function useLessonSync(
  lessonId: string,
  variant: string | null,
  progressType: "learn" | "review"
) {
  const { user } = useAuth()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const pendingPayloadRef = useRef<Record<string, unknown> | null>(null)

  // 즉시 전송 헬퍼
  const doSync = useCallback(async (payload: Record<string, unknown>) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("lesson_progress").upsert(
        payload,
        { onConflict: "user_id,lesson_id,variant,progress_type" }
      )
      if (error) {
        console.error("[LessonSync] progress upsert failed:", error.message, error.code, { lessonId, progressType })
        const { error: retryError } = await supabase.from("lesson_progress").upsert(payload, { onConflict: "user_id,lesson_id,variant,progress_type" })
        if (retryError) console.error("[LessonSync] retry failed:", retryError.message)
      }
      pendingPayloadRef.current = null
    } catch (e) {
      console.error("[LessonSync] network error:", e)
    }
  }, [lessonId, progressType])

  // 페이지 숨김/닫기 시 keepalive fetch로 즉시 flush
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && pendingPayloadRef.current) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
          debounceRef.current = null
        }
        flushToSupabase(
          "lesson_progress",
          pendingPayloadRef.current as Record<string, unknown>,
          "user_id,lesson_id,variant,progress_type"
        )
        pendingPayloadRef.current = null
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  /**
   * 진행 상황을 Supabase에 upsert (debounced, fire-and-forget)
   */
  const syncProgress = useCallback(
    (progressData: Record<string, unknown>) => {
      if (!user) return

      if (debounceRef.current) clearTimeout(debounceRef.current)

      const payload = {
        user_id: user.id,
        lesson_id: lessonId,
        variant: variant || "",
        progress_type: progressType,
        progress_data: progressData,
        updated_at: new Date().toISOString(),
      }
      pendingPayloadRef.current = payload

      debounceRef.current = setTimeout(() => { doSync(payload) }, 1500)
    },
    [user, lessonId, variant, progressType, doSync]
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
      pendingPayloadRef.current = null

      try {
        const supabase = createClient()
        const payload = {
          user_id: user.id,
          lesson_id: lessonId,
          variant: variant || "",
          progress_type: progressType,
          progress_data: {},
          completed: true,
          score,
          updated_at: new Date().toISOString(),
        }
        // keepalive fetch로 먼저 전송 — 페이지 이동/닫기 시에도 취소되지 않음
        flushToSupabase("lesson_progress", payload, "user_id,lesson_id,variant,progress_type")
        // 일반 upsert도 병행 (에러 로깅용)
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
      // variant가 null/''인 경우: 기존 null 데이터와 새 '' 데이터 모두 매칭
      let query = supabase
        .from("lesson_progress")
        .select("progress_data, completed, score")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .eq("progress_type", progressType)

      if (variant) {
        query = query.eq("variant", variant)
      } else {
        query = query.or("variant.is.null,variant.eq.")
      }

      const { data, error } = await query
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error || !data) return null

      // 완료된 레슨이면 완료 마커를 반환 (client-page에서 isAlreadyDone 처리)
      if (data.completed) return { _cloudCompleted: true }

      return data.progress_data as Record<string, unknown>
    } catch {
      return null
    }
  }, [user, lessonId, variant, progressType])

  return { syncProgress, syncCompletion, loadFromCloud }
}
