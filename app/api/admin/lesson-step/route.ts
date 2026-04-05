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
 * GET /api/admin/lesson-step?lessonId=cpp-12
 * 해당 레슨의 모든 스텝 오버라이드 반환
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const lessonId = request.nextUrl.searchParams.get("lessonId")
  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 })

  const { data, error } = await supabase
    .from("lesson_step_overrides")
    .select("step_id, overrides")
    .eq("lesson_id", lessonId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // step_id → overrides 맵으로 변환
  const map: Record<string, any> = {}
  for (const row of data ?? []) {
    map[row.step_id] = row.overrides
  }

  return NextResponse.json({ overrides: map })
}

/**
 * PATCH /api/admin/lesson-step
 * 스텝 오버라이드 저장 (upsert)
 * body: { lessonId, stepId, overrides: { title?, content?, initialCode?, expectedOutput?, hint?, hint2?, task? } }
 */
export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  if (!await requireTeacher(supabase)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { lessonId, stepId, lang, overrides } = await request.json()
  if (!lessonId || !stepId) return NextResponse.json({ error: "lessonId, stepId required" }, { status: 400 })

  // null/빈 값은 오버라이드에서 제거 (TS 기본값 사용)
  const cleaned: Record<string, any> = {}
  for (const [k, v] of Object.entries(overrides ?? {})) {
    if (v !== null && v !== undefined && v !== "") cleaned[k] = v
  }

  // 기존 row 가져와서 언어별로 머지
  const { data: existing } = await supabase
    .from("lesson_step_overrides")
    .select("overrides")
    .eq("lesson_id", lessonId)
    .eq("step_id", stepId)
    .single()

  const currentOverrides = (existing?.overrides ?? {}) as Record<string, any>
  const langKey = lang ?? "ko"
  const merged = { ...currentOverrides, [langKey]: cleaned }

  const { error } = await supabase
    .from("lesson_step_overrides")
    .upsert({ lesson_id: lessonId, step_id: stepId, overrides: merged, updated_at: new Date().toISOString() })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
