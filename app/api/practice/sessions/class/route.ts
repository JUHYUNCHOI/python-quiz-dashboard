import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { ALL_CLUSTERS } from "@/data/practice"

// GET /api/practice/sessions/class?classId=xxx&clusterId=yyy
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

  // 클러스터 문제 목록 (번호 계산용)
  const cluster = ALL_CLUSTERS.find(c => c.id === clusterId)
  const clusterProblems = cluster?.problems ?? []
  const problemIndexMap = new Map(clusterProblems.map((p, i) => [p.id, i + 1]))

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
    const lastSet = completed[completed.length - 1]
    const optedOut = lastSet?.opted_out ?? false

    // 문제별 틀린 횟수 집계 — 전체 세션에서 출제됐지만 통과 못 한 문제
    const wrongCount = new Map<string, number>()
    for (const s of completed) {
      const problemIds: string[] = s.problem_ids ?? []
      const passedIds = new Set<string>(s.passed_problem_ids ?? [])
      for (const pid of problemIds) {
        if (!passedIds.has(pid)) {
          wrongCount.set(pid, (wrongCount.get(pid) ?? 0) + 1)
        }
      }
    }

    // 2번 이상 틀린 문제 번호 (클러스터 전체 1-based)
    const persistentWrong = [...wrongCount.entries()]
      .filter(([, cnt]) => cnt >= 2)
      .map(([pid]) => problemIndexMap.get(pid) ?? 0)
      .filter(n => n > 0)
      .sort((a, b) => a - b)

    // 마지막 세트에서 틀린 문제 번호
    const lastWrongNums = lastSet
      ? (lastSet.problem_ids as string[] ?? [])
          .filter(pid => !(lastSet.passed_problem_ids as string[] ?? []).includes(pid))
          .map(pid => problemIndexMap.get(pid) ?? 0)
          .filter(n => n > 0)
          .sort((a, b) => a - b)
      : []

    return {
      studentId: m.student_id,
      name,
      setsDone: completed.length,          // 완료한 세트 수
      currentSet: completed.length + 1,    // 다음에 할 세트
      totalPassed,
      totalAttempted,
      optedOut,
      hasPendingAssignment: !!pending,
      pendingAssignmentId: pending?.id ?? null,
      lastWrongNums,       // 마지막 세트에서 틀린 문제 번호들
      persistentWrong,     // 2번 이상 계속 틀린 문제 번호들 🚨
      sessions: completed.map(s => ({
        round: s.round,
        passed: s.problems_passed,
        attempted: s.problems_attempted,
        optedOut: s.opted_out,
        wrongNums: (s.problem_ids as string[] ?? [])
          .filter(pid => !(s.passed_problem_ids as string[] ?? []).includes(pid))
          .map(pid => problemIndexMap.get(pid) ?? 0)
          .filter(n => n > 0)
          .sort((a, b) => a - b),
      })),
    }
  })

  return NextResponse.json({ students: result })
}
