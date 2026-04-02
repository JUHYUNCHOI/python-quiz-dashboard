"use client"

import { createClient } from "@/lib/supabase/client"

export type FlagReason = "wrong_answer" | "wrong_lesson" | "not_taught" | "duplicate" | "unclear" | "other"

export async function flagQuestion(params: {
  questionId: number
  lessonId: string | number
  reason: FlagReason
  comment?: string
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single()

  const { error } = await supabase.from("flagged_questions").insert({
    question_id: params.questionId,
    lesson_id: String(params.lessonId),
    reported_by: user.id,
    reported_by_name: profile?.display_name || user.email || "Unknown",
    reason: params.reason,
    comment: params.comment || null,
    status: "pending",
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updateFlagStatus(
  flagId: string,
  status: "reviewed" | "fixed" | "dismissed"
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("flagged_questions")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
    })
    .eq("id", flagId)

  if (error) return { error: error.message }
  return { success: true }
}
