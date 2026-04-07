import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/practice/progress
 * 현재 사용자의 풀이 진도 반환
 * 응답: { solved: string[], starred: string[] }
 *
 * POST /api/practice/progress
 * 풀이 진도 저장 (upsert)
 * body: { problemId: string, solved?: boolean, starred?: boolean }
 */

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("practice_progress")
    .select("problem_id, solved, starred")
    .eq("user_id", user.id)

  if (error) {
    console.error("[/api/practice/progress GET]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  const solved = (data ?? []).filter(r => r.solved).map(r => r.problem_id)
  const starred = (data ?? []).filter(r => r.starred).map(r => r.problem_id)

  return NextResponse.json({ solved, starred })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { problemId, solved, starred } = body as {
    problemId: string
    solved?: boolean
    starred?: boolean
  }

  if (!problemId) {
    return NextResponse.json({ error: "problemId is required" }, { status: 400 })
  }

  // 현재 값 조회
  const { data: existing } = await supabase
    .from("practice_progress")
    .select("solved, starred, attempts")
    .eq("user_id", user.id)
    .eq("problem_id", problemId)
    .single()

  const now = new Date().toISOString()
  const newSolved = solved !== undefined ? solved : (existing?.solved ?? false)
  const newStarred = starred !== undefined ? starred : (existing?.starred ?? false)
  const attempts = (existing?.attempts ?? 0) + 1

  const { error } = await supabase
    .from("practice_progress")
    .upsert({
      user_id: user.id,
      problem_id: problemId,
      solved: newSolved,
      starred: newStarred,
      attempts,
      solved_at: newSolved ? (existing?.solved ? undefined : now) : undefined,
      last_attempt_at: now,
    }, {
      onConflict: "user_id,problem_id",
    })

  if (error) {
    console.error("[/api/practice/progress POST]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
