import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * GET /api/practice/clusters
 *
 * 쿼리 파라미터:
 *   language : 'cpp' | 'python' (선택, 없으면 전체)
 *
 * 응답: 클러스터 목록 + 각 클러스터의 문제 목록
 * (solution_code 제외 — 클라이언트에 정답 노출 방지)
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const language = searchParams.get("language")

  // 클러스터 조회
  let clusterQuery = supabase
    .from("practice_clusters")
    .select("*")
    .order("sort_order")

  if (language) {
    clusterQuery = clusterQuery.eq("language", language)
  }

  const { data: clusters, error: clusterError } = await clusterQuery

  if (clusterError) {
    console.error("[/api/practice/clusters] cluster error", clusterError)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  // 문제 조회 (solution_code 제외)
  let problemQuery = supabase
    .from("practice_problems")
    .select(
      "id, cluster_id, unlock_after, difficulty, title, description, constraints, initial_code, test_cases, hints, solution_explanation, language, sort_order"
    )
    .order("sort_order")

  if (language) {
    problemQuery = problemQuery.eq("language", language)
  }

  const { data: problems, error: problemError } = await problemQuery

  if (problemError) {
    console.error("[/api/practice/clusters] problem error", problemError)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  // 클러스터에 문제 조립 (PracticeCluster 형태로 변환)
  const result = (clusters ?? []).map(c => ({
    id: c.id,
    title: c.title,
    emoji: c.emoji,
    description: c.description,
    unlockAfter: c.unlock_after,
    language: c.language,
    problems: (problems ?? [])
      .filter(p => p.cluster_id === c.id)
      .map(p => ({
        id: p.id,
        cluster: p.cluster_id,
        unlockAfter: p.unlock_after,
        difficulty: p.difficulty,
        title: p.title,
        description: p.description,
        constraints: p.constraints,
        initialCode: p.initial_code,
        testCases: p.test_cases,
        hints: p.hints,
        solutionCode: "",          // 클라이언트에 노출 안 함
        solutionExplanation: p.solution_explanation,
        language: p.language ?? "cpp",
      })),
  }))

  return NextResponse.json({ clusters: result })
}
