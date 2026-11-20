import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import {
  isValidTier, promotionPool, tierRank, PROMOTION_TARGET, type TierId,
} from "@/lib/tier-system"

/**
 * GET /api/tier/leaderboard[?classId=…]
 *
 * 반별 리더보드. 요구사항이 "반별만"이라 전체 순위는 만들지 않는다.
 *
 * ── 왜 집계를 여기서 하는가 ───────────────────────────────────────────────
 * 어떤 문제가 어떤 티어인지는 `lib/tier-system` 만 안다. SQL 함수는 "티어에
 * 들어온 뒤 통과한 문제 id" 까지만 주고, 그 중 몇 개가 승급 대상인지는 여기서
 * 센다. DB 에 티어 구간을 복제하면 두 정의가 갈라진다.
 *
 * 순위 기준은 티어 → 승급 진행도 → 이름이다. 통과 **총개수**로 매기면
 * 아래 티어 문제를 잔뜩 푼 학생이 위로 올라가는데, 그건 "just for practice"
 * 라고 분명히 해 둔 문제들이다.
 */

interface LbRow {
  class_id: string
  class_name: string
  student_id: string
  display_name: string
  tier: string
  since: string
  recent_solves: string[] | null
}

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const classId = req.nextUrl.searchParams.get("classId")

  const [{ data: memberships }, { data: taught }, { data: rows, error }] = await Promise.all([
    supabase
      .from("class_members")
      .select("class_id, classes!inner(id, name)")
      .eq("student_id", user.id),
    supabase
      .from("classes")
      .select("id, name")
      .eq("teacher_id", user.id),
    supabase.rpc("get_class_tier_leaderboard", { p_class_id: classId ?? null }),
  ])

  if (error) {
    console.error("[/api/tier/leaderboard]", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }

  // 반이 없는 학생도 화면에 들어온다 — 빈 목록 대신 "반에 들어가세요"를 보여줘야 한다.
  const classes = new Map<string, string>()
  for (const m of memberships ?? []) {
    const c = m.classes as unknown as { id: string; name: string } | null
    if (c) classes.set(c.id, c.name)
  }
  for (const c of taught ?? []) classes.set(c.id, c.name)

  const poolCache = new Map<TierId, Set<string>>()
  function poolFor(tier: TierId): Set<string> {
    let s = poolCache.get(tier)
    if (!s) {
      s = new Set(promotionPool(tier).map(p => p.id))
      poolCache.set(tier, s)
    }
    return s
  }

  const entries = ((rows ?? []) as LbRow[])
    .flatMap(r => {
      // 손으로 넣은 티어 문자열은 버린다. 모르는 티어가 끼면 정렬이 깨진다.
      if (!isValidTier(r.tier)) return []
      const tier: TierId = r.tier
      const pool = poolFor(tier)
      const solved = (r.recent_solves ?? []).filter(id => pool.has(id)).length
      return [{
        classId: r.class_id,
        className: r.class_name,
        studentId: r.student_id,
        name: r.display_name,
        tier,
        solved: Math.min(solved, PROMOTION_TARGET),
        isMe: r.student_id === user.id,
      }]
    })
    .sort((a, b) =>
      tierRank(b.tier) - tierRank(a.tier) ||
      b.solved - a.solved ||
      a.name.localeCompare(b.name),
    )

  return NextResponse.json({
    classes: [...classes].map(([id, name]) => ({ id, name })),
    target: PROMOTION_TARGET,
    entries,
  })
}
