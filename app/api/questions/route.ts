import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/questions
 *
 * 쿼리 파라미터:
 *   language    : 'python' | 'cpp' (필수)
 *   lessonIds   : 콤마 구분 lesson_id 목록 (선택, 없으면 전체)
 *   difficulty  : '쉬움' | '보통' | '어려움' (선택, 콤마 구분 복수 가능)
 *
 * 응답: correctAnswer 제외한 문제 배열
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  // 인증 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const language = searchParams.get("language")
  const lessonIds = searchParams.get("lessonIds")
  const difficulty = searchParams.get("difficulty")

  if (!language) {
    return NextResponse.json({ error: "language is required" }, { status: 400 })
  }

  // correctAnswer 제외하고 선택
  let query = supabase
    .from("questions")
    .select(
      "id, language, lesson_id, difficulty, question, code, options, explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison"
    )
    .eq("language", language)

  if (lessonIds) {
    const ids = lessonIds.split(",").map((id) => id.trim())
    query = query.in("lesson_id", ids)
  }

  if (difficulty) {
    const diffs = difficulty.split(",").map((d) => d.trim())
    query = query.in("difficulty", diffs)
  }

  const { data, error } = await query

  if (error) {
    console.error("[/api/questions]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  // lesson_id를 camelCase로 변환하여 기존 코드와 호환
  const questions = (data ?? []).map((q) => ({
    id: q.id,
    lessonId: isNaN(Number(q.lesson_id)) ? q.lesson_id : Number(q.lesson_id),
    language: q.language,
    difficulty: q.difficulty,
    question: q.question,
    code: q.code,
    options: q.options,
    explanation: q.explanation,
    keyConceptTitle: q.key_concept_title,
    keyConceptDescription: q.key_concept_description,
    relatedTopics: q.related_topics,
    animationKey: q.animation_key,
    codeComparison: q.code_comparison,
    // correctAnswer 없음 ✅
  }))

  return NextResponse.json({ questions })
}
