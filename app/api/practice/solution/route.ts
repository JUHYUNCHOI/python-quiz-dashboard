import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/practice/solution?problemId=xxx
 * 문제 정답 코드 반환 — **선생님 전용.**
 *
 * 예전에는 「로그인만 하면」 통과였다. 학생 계정도 전부 로그인 상태이므로
 * 사실상 누구나 정답을 받아갈 수 있었다 — 화면에서 정답 버튼을 가려도
 * 주소창에 이 경로만 치면 끝이었다. 역할을 여기서 확인한다.
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "teacher") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const problemId = request.nextUrl.searchParams.get("problemId")
  if (!problemId) {
    return NextResponse.json({ error: "problemId is required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("practice_problems")
    .select("solution_code, solution_explanation")
    .eq("id", problemId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    solutionCode: data.solution_code,
    solutionExplanation: data.solution_explanation,
  })
}
