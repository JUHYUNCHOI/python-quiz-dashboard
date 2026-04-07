import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// POST /api/practice/sessions/assign
// 선생님이 특정 학생에게 추가 라운드 배정
// body: { studentId, clusterId }
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 선생님 권한 확인
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "teacher") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { studentId, clusterId } = await req.json()
  if (!studentId || !clusterId) {
    return NextResponse.json({ error: "studentId and clusterId required" }, { status: 400 })
  }

  // 학생의 현재 라운드 수 확인
  const { data: existing } = await supabase
    .from("practice_sessions")
    .select("round")
    .eq("user_id", studentId)
    .eq("cluster_id", clusterId)
    .order("round", { ascending: false })
    .limit(1)

  const nextRound = (existing?.[0]?.round ?? 0) + 1

  // 이미 미완료된 teacher_assigned 세션이 있으면 중복 배정 방지
  const { data: pending } = await supabase
    .from("practice_sessions")
    .select("id")
    .eq("user_id", studentId)
    .eq("cluster_id", clusterId)
    .eq("teacher_assigned", true)
    .is("completed_at", null)
    .limit(1)

  if (pending && pending.length > 0) {
    return NextResponse.json({ error: "이미 대기 중인 추가 라운드가 있습니다" }, { status: 409 })
  }

  const { data, error } = await supabase
    .from("practice_sessions")
    .insert({
      user_id: studentId,
      cluster_id: clusterId,
      round: nextRound,
      teacher_assigned: true,
      problems_attempted: 0,
      problems_passed: 0,
      opted_out: false,
      completed_at: null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ session: data })
}
