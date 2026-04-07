import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET /api/practice/sessions/class?classId=xxx&clusterId=yyy
// 선생님이 반 전체 학생의 특정 클러스터 세션 현황 조회
export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const classId = req.nextUrl.searchParams.get("classId")
  const clusterId = req.nextUrl.searchParams.get("clusterId")
  if (!classId || !clusterId) {
    return NextResponse.json({ error: "classId and clusterId required" }, { status: 400 })
  }

  // 반 소유 확인
  const { data: cls } = await supabase
    .from("classes")
    .select("id")
    .eq("id", classId)
    .eq("teacher_id", user.id)
    .single()

  if (!cls) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  // 반 학생 목록
  const { data: members } = await supabase
    .from("class_members")
    .select("student_id, profiles!inner(display_name)")
    .eq("class_id", classId)

  if (!members?.length) return NextResponse.json({ students: [] })

  const studentIds = members.map(m => m.student_id)

  // 세션 데이터
  const { data: sessions } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("cluster_id", clusterId)
    .in("user_id", studentIds)
    .order("round", { ascending: true })

  // 학생별로 묶기
  const sessionsByStudent = new Map<string, typeof sessions>()
  for (const s of sessions ?? []) {
    if (!sessionsByStudent.has(s.user_id)) sessionsByStudent.set(s.user_id, [])
    sessionsByStudent.get(s.user_id)!.push(s)
  }

  const result = members.map(m => {
    const name = (m.profiles as unknown as { display_name: string } | null)?.display_name ?? "학생"
    const studentSessions = sessionsByStudent.get(m.student_id) ?? []
    const completed = studentSessions.filter(s => s.completed_at && !s.teacher_assigned)
    const pending = studentSessions.find(s => s.teacher_assigned && !s.completed_at)
    const totalPassed = completed.reduce((sum, s) => sum + s.problems_passed, 0)
    const totalAttempted = completed.reduce((sum, s) => sum + s.problems_attempted, 0)
    const lastRound = completed[completed.length - 1]
    const optedOut = lastRound?.opted_out ?? false

    return {
      studentId: m.student_id,
      name,
      roundsDone: completed.length,
      totalPassed,
      totalAttempted,
      optedOut,
      hasPendingAssignment: !!pending,
      pendingAssignmentId: pending?.id ?? null,
      sessions: studentSessions,
    }
  })

  return NextResponse.json({ students: result })
}
