import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

async function requireTeacher(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "teacher") return null
  return user
}

/**
 * GET /api/admin/questions
 * 쿼리: language, lessonId, difficulty, search, page(1-based), pageSize(기본 50)
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = request.nextUrl
  const language = searchParams.get("language")
  const lessonId = searchParams.get("lessonId")
  const difficulty = searchParams.get("difficulty")
  const search = searchParams.get("search")
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
  const pageSize = Math.min(100, parseInt(searchParams.get("pageSize") || "50"))
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("questions")
    .select("*", { count: "exact" })
    .order("language")
    .order("id")
    .range(from, to)

  if (language) query = query.eq("language", language)
  if (lessonId) query = query.eq("lesson_id", lessonId)
  if (difficulty) query = query.eq("difficulty", difficulty)
  if (search) query = query.ilike("question", `%${search}%`)

  const { data, error, count } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ questions: data, total: count, page, pageSize })
}

/**
 * POST /api/admin/questions
 * 새 문제 생성
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json()
  const { id, language, lesson_id, difficulty, question, code, options, correct_answer,
    explanation, key_concept_title, key_concept_description, related_topics, animation_key, code_comparison } = body

  if (!language || !lesson_id || !difficulty || !question || !options || correct_answer === undefined) {
    return NextResponse.json({ error: "필수 필드 누락" }, { status: 400 })
  }

  const row: any = {
    language, lesson_id: String(lesson_id), difficulty, question,
    code: code || null, options, correct_answer,
    explanation: explanation || null,
    key_concept_title: key_concept_title || null,
    key_concept_description: key_concept_description || null,
    related_topics: related_topics || null,
    animation_key: animation_key || null,
    code_comparison: code_comparison || null,
  }
  if (id) row.id = id

  const { data, error } = await supabase.from("questions").insert(row).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ question: data }, { status: 201 })
}
