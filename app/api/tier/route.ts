import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * 티어 상태 동기화.
 *
 * GET  → { state: { tier, since, placedAt, history } | null, solves: { [id]: iso } }
 * PUT  → 티어 상태 저장 (배치·승급 직후)
 * POST → 채점 통과 기록 (`{ problemId }`)
 *
 * ── 왜 통과 시각을 서버가 정하지 않는가 ───────────────────────────────────
 * 기기를 옮기면 localStorage 가 비어 있고, 그 기기에서 푼 문제의 통과 시각은
 * 클라이언트에만 있다. 그래서 시각을 같이 받되, **이미 있으면 덮어쓰지 않는다**.
 * 다시 풀어서 시각을 미래로 밀면 승급 기준점(`since`)을 우회할 수 있다.
 */

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [{ data: state }, { data: solves }] = await Promise.all([
    supabase
      .from("tier_state")
      .select("tier, since, placed_at, history")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("tier_verified_solves")
      .select("problem_id, solved_at")
      .eq("user_id", user.id),
  ])

  const solveMap: Record<string, string> = {}
  for (const r of solves ?? []) solveMap[r.problem_id] = r.solved_at

  return NextResponse.json({
    state: state
      ? {
          tier: state.tier,
          since: state.since,
          placedAt: state.placed_at,
          history: state.history ?? [],
        }
      : null,
    solves: solveMap,
  })
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json() as {
    tier?: string
    since?: string
    placedAt?: string | null
    history?: unknown
  }

  if (!body.tier || !body.since) {
    return NextResponse.json({ error: "tier and since are required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("tier_state")
    .upsert({
      user_id: user.id,
      tier: body.tier,
      since: body.since,
      placed_at: body.placedAt ?? null,
      history: Array.isArray(body.history) ? body.history : [],
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" })

  if (error) {
    console.error("[/api/tier PUT]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { problemId, solvedAt } = await request.json() as {
    problemId?: string
    solvedAt?: string
  }
  if (!problemId) {
    return NextResponse.json({ error: "problemId is required" }, { status: 400 })
  }

  // 첫 통과 시각을 유지한다 — upsert 로 덮어쓰면 다시 풀 때마다 시각이 밀린다.
  const { error } = await supabase
    .from("tier_verified_solves")
    .insert({
      user_id: user.id,
      problem_id: problemId,
      solved_at: solvedAt ?? new Date().toISOString(),
    })

  // 23505 = unique_violation. 이미 통과한 문제라 할 일이 없다.
  if (error && error.code !== "23505") {
    console.error("[/api/tier POST]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
