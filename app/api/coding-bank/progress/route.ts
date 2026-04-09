import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/coding-bank/progress
 * 현재 사용자의 코딩 뱅크 문제 완료 목록 반환
 * 응답: { solved: string[] }
 *
 * POST /api/coding-bank/progress
 * 코딩 뱅크 문제 완료 저장
 * body: { problemId: string }
 */

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ solved: [] })

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("progress_type", "coding-bank")
    .eq("completed", true)

  if (error) {
    console.error("[/api/coding-bank/progress GET]", error)
    return NextResponse.json({ solved: [] })
  }

  const solved = (data ?? []).map(r => r.lesson_id as string)
  return NextResponse.json({ solved })
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
      progress_type: "coding-bank",
      completed: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,lesson_id,variant,progress_type" })

  if (error) {
    console.error("[/api/coding-bank/progress POST]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
