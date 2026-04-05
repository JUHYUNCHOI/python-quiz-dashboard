import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * POST /api/check-answer
 *
 * Body:
 *   { questionId: number, selectedAnswer: number }
 *
 * 응답:
 *   { correct: boolean, correctAnswer: number, explanation: string, ... }
 *
 * correctAnswer는 여기서만 반환됨 (브라우저 번들에 포함 안 됨)
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // 인증 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { questionId, selectedAnswer } = body

  if (typeof questionId !== "number" || typeof selectedAnswer !== "number") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  // correctAnswer 포함해서 조회 (서버에서만)
  const { data, error } = await supabase
    .from("questions")
    .select("correct_answer, explanation, key_concept_title, key_concept_description, code_comparison, animation_key")
    .eq("id", questionId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 })
  }

  const correct = selectedAnswer === data.correct_answer

  return NextResponse.json({
    correct,
    correctAnswer: data.correct_answer,
    explanation: data.explanation,
    keyConceptTitle: data.key_concept_title,
    keyConceptDescription: data.key_concept_description,
    codeComparison: data.code_comparison,
    animationKey: data.animation_key,
  })
}
