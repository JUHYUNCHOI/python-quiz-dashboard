import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/questions
 *
 * 쿼리 파라미터:
 *   language    : 'python' | 'cpp' (필수)
 *   lessonIds   : 콤마 구분 lesson_id 목록 (선택, 없으면 전체)
 *   difficulty  : '쉬움' | '보통' | '어려움' (선택, 콤마 구분 복수 가능)
 *   lang        : 'ko' | 'en' (선택, default: 'ko')
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
  const lang = searchParams.get("lang") ?? "ko"

  if (!language) {
    return NextResponse.json({ error: "language is required" }, { status: 400 })
  }

  // correctAnswer 제외하고 선택 (EN 번역 컬럼 포함)
  let query = supabase
    .from("questions")
    .select(
      "id, language, lesson_id, difficulty, question, code, options, explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison, question_en, explanation_en, key_concept_title_en, key_concept_desc_en, options_en"
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

  const useEn = lang === "en"

  // lesson_id를 camelCase로 변환, lang에 따라 EN 컬럼 우선 사용 (fallback: Korean)
  const questions = (data ?? []).map((q) => ({
    id: q.id,
    lessonId: isNaN(Number(q.lesson_id)) ? q.lesson_id : Number(q.lesson_id),
    language: q.language,
    difficulty: q.difficulty,
    question: (useEn && q.question_en) ? q.question_en : q.question,
    code: q.code,
    options: (useEn && q.options_en && q.options_en.length > 0) ? q.options_en : q.options,
    explanation: (useEn && q.explanation_en) ? q.explanation_en : q.explanation,
    keyConceptTitle: (useEn && q.key_concept_title_en) ? q.key_concept_title_en : q.key_concept_title,
    keyConceptDescription: (useEn && q.key_concept_desc_en) ? q.key_concept_desc_en : q.key_concept_description,
    relatedTopics: q.related_topics,
    animationKey: q.animation_key,
    codeComparison: q.code_comparison,
    // correctAnswer 없음 ✅
  }))

  return NextResponse.json({ questions })
}
