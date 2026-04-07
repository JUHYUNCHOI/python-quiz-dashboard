import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET /api/practice/sessions?clusterId=xxx
// 현재 유저의 특정 클러스터 세션 목록 반환
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const clusterId = req.nextUrl.searchParams.get("clusterId")
  if (!clusterId) return NextResponse.json({ error: "clusterId required" }, { status: 400 })

  const { data, error } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("cluster_id", clusterId)
    .order("round", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessions: data })
}

// POST /api/practice/sessions
// 세션 저장 (라운드 완료 or 포기)
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { clusterId, round, problemsAttempted, problemsPassed, optedOut, teacherAssignedId, problemIds, passedProblemIds } = body

  if (!clusterId || round == null) {
    return NextResponse.json({ error: "clusterId and round required" }, { status: 400 })
  }

  // 선생님이 배정한 세션이 있으면 그걸 업데이트, 없으면 새로 생성
  if (teacherAssignedId) {
    const { data, error } = await supabase
      .from("practice_sessions")
      .update({
        problems_attempted: problemsAttempted,
        problems_passed: problemsPassed,
        opted_out: optedOut ?? false,
        problem_ids: problemIds ?? [],
        passed_problem_ids: passedProblemIds ?? [],
        completed_at: new Date().toISOString(),
      })
      .eq("id", teacherAssignedId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ session: data })
  }

  const { data, error } = await supabase
    .from("practice_sessions")
    .insert({
      user_id: user.id,
      cluster_id: clusterId,
      round,
      problems_attempted: problemsAttempted,
      problems_passed: problemsPassed,
      opted_out: optedOut ?? false,
      problem_ids: problemIds ?? [],
      passed_problem_ids: passedProblemIds ?? [],
      completed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data })
}
