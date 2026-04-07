import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/practice/solution?problemId=xxx
 * 문제 정답 코드 반환 (풀이 완료 후 공개)
 *
 * 보안: 로그인 필요. 향후 solved 여부 확인 추가 가능.
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
