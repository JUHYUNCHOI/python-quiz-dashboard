"use client"

import { useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import type { SessionData } from "@/hooks/use-quiz-state"

/**
 * 퀴즈 세션 결과를 Supabase에 저장하는 훅
 * - 퀴즈 완료 시 1회 호출
 * - fire-and-forget (실패 시 무시)
 */
export function useQuizSessionSync() {
  const { user } = useAuth()

  const saveQuizSession = useCallback(
    async (sessionData: SessionData, xpEarned: number) => {
      if (!user) return

      const details = sessionData.questionDetails || []
      const quickCount = details.filter(q => q.time_taken_ms < 3000).length
      const slowCount = details.filter(q => q.time_taken_ms > 120000).length

      try {
        const supabase = createClient()
        await supabase.from("quiz_sessions").insert({
          user_id: user.id,
          difficulty: sessionData.difficulty || "mixed",
          total_questions: sessionData.totalQuestions,
          correct_answers: sessionData.correctAnswers,
          max_combo: sessionData.maxCombo,
          hearts_remaining: sessionData.heartsRemaining,
          time_elapsed_ms: sessionData.timeElapsedMs,
          end_reason: sessionData.endReason,
          xp_earned: xpEarned,
          question_details: details,
          quick_answer_count: quickCount,
          slow_answer_count: slowCount,
          started_at: new Date(sessionData.startedAt).toISOString(),
          completed_at: new Date().toISOString(),
        })
      } catch {
        // fire-and-forget: 실패 시 무시
      }
    },
    [user]
  )

  return { saveQuizSession }
}
