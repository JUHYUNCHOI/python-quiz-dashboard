"use client"

import { useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { getAllMastery, type QuestionMastery } from "@/lib/spaced-repetition"

/**
 * question-mastery 데이터를 Supabase에 동기화하는 훅
 *
 * Supabase 테이블 DDL:
 * CREATE TABLE question_mastery (
 *   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 *   question_id INTEGER NOT NULL,
 *   box SMALLINT NOT NULL DEFAULT 1,
 *   correct_streak INTEGER NOT NULL DEFAULT 0,
 *   total_attempts INTEGER NOT NULL DEFAULT 0,
 *   total_correct INTEGER NOT NULL DEFAULT 0,
 *   last_review_date TEXT NOT NULL DEFAULT '',
 *   next_review_date TEXT NOT NULL DEFAULT '',
 *   last_grade TEXT,
 *   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   PRIMARY KEY (user_id, question_id)
 * );
 */
export function useMasterySync() {
  const { user } = useAuth()

  /**
   * 퀴즈 세션에서 답변한 문제들의 mastery를 Supabase에 upsert
   * questionIds: 이번 세션에서 답변한 question_id 목록
   */
  const syncMastery = useCallback(
    async (questionIds: number[]) => {
      if (!user || questionIds.length === 0) return

      const allMastery = getAllMastery()
      // 중복 question_id 제거 (재출제 문제가 여러 번 답변될 수 있음)
      const uniqueIds = [...new Set(questionIds)]
      const rows = uniqueIds
        .filter(id => allMastery[id])
        .map((id) => {
          const m: QuestionMastery = allMastery[id]
          return {
            user_id: user.id,
            question_id: m.questionId,
            box: m.box,
            correct_streak: m.correctStreak,
            total_attempts: m.totalAttempts,
            total_correct: m.totalCorrect,
            last_review_date: m.lastReviewDate,
            next_review_date: m.nextReviewDate,
            last_grade: m.lastGrade,
            updated_at: new Date().toISOString(),
          }
        })

      if (rows.length === 0) return

      try {
        const supabase = createClient()
        const { error } = await supabase
          .from("question_mastery")
          .upsert(rows, { onConflict: "user_id,question_id" })
        if (error) {
          console.error("[MasterySync] upsert failed:", error.message, error.code)
        }
      } catch (e) {
        console.error("[MasterySync] network error:", e)
      }
    },
    [user]
  )

  /**
   * 전체 mastery 데이터 bulk sync (첫 로그인/마이그레이션용)
   */
  const syncAllMastery = useCallback(
    async () => {
      if (!user) return

      const allMastery = getAllMastery()
      const entries = Object.values(allMastery)
      if (entries.length === 0) return

      const rows = entries.map((m: QuestionMastery) => ({
        user_id: user.id,
        question_id: m.questionId,
        box: m.box,
        correct_streak: m.correctStreak,
        total_attempts: m.totalAttempts,
        total_correct: m.totalCorrect,
        last_review_date: m.lastReviewDate,
        next_review_date: m.nextReviewDate,
        last_grade: m.lastGrade,
        updated_at: new Date().toISOString(),
      }))

      try {
        const supabase = createClient()
        // 100개씩 배치 처리
        for (let i = 0; i < rows.length; i += 100) {
          const batch = rows.slice(i, i + 100)
          const { error } = await supabase
            .from("question_mastery")
            .upsert(batch, { onConflict: "user_id,question_id" })
          if (error) {
            console.error("[MasterySync] bulk upsert failed:", error.message, error.code)
          }
        }
      } catch (e) {
        console.error("[MasterySync] bulk network error:", e)
      }
    },
    [user]
  )

  return { syncMastery, syncAllMastery }
}
