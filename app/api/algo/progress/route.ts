import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/algo/progress
 * 현재 사용자의 알고리즘 문제 완료 목록 반환
 * 응답: { completed: string[] }
 *
 * POST /api/algo/progress
 * 알고리즘 문제 완료 저장
 * body: { problemId: string }
 */

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ completed: [] })

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("progress_type", "algo")
    .eq("completed", true)

  if (error) {
    console.error("[/api/algo/progress GET]", error)
    return NextResponse.json({ completed: [] })
  }

  const completed = (data ?? []).map(r => r.lesson_id as string)
  return NextResponse.json({ completed })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { problemId } = await request.json() as { problemId: string }
  if (!problemId) return NextResponse.json({ error: "problemId required" }, { status: 400 })

  const { error } = await supabase
    .from("lesson_progress")
    .upsert({
      user_id: user.id,
      lesson_id: problemId,
      variant: "",
      progress_type: "algo",
      completed: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,lesson_id,variant,progress_type" })

  if (error) {
    console.error("[/api/algo/progress POST]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
