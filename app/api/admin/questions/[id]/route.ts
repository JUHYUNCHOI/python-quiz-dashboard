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
 * GET /api/admin/questions/[id]
 * 문제 단건 조회 (선생님 전용)
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const dbId = parseInt(id)
  if (isNaN(dbId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", dbId)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ question: data })
}

/**
 * PATCH /api/admin/questions/[id]
 * 문제 수정
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const dbId = parseInt(id)
  if (isNaN(dbId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

  const body = await request.json()

  // 허용된 필드만 업데이트
  const allowed = [
    "lesson_id", "difficulty", "question", "code", "options", "correct_answer",
    "explanation", "key_concept_title", "key_concept_description",
    "related_topics", "animation_key", "code_comparison",
  ]
  const updates: Record<string, any> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "수정할 필드 없음" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("questions")
    .update(updates)
    .eq("id", dbId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ question: data })
}

/**
 * DELETE /api/admin/questions/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const dbId = parseInt(id)
  if (isNaN(dbId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })

  const { error } = await supabase.from("questions").delete().eq("id", dbId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
