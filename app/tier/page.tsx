"use client"

/**
 * 티어 홈 — 내 티어, 승급 진행도, 자기 티어 문제, 아래 티어 연습.
 *
 * 학생에게 **숫자 레벨을 보여주지 않는다.** `LadderItem.level` 은 티어를 계산하는
 * 내부 정렬 키일 뿐이고, 화면에는 티어 하나만 나온다.
 *
 * 아래 티어 문제는 열어서 풀 수 있지만 승급에는 세지 않는다. 그래서 목록에
 * "연습 전용" 을 붙여 둔다 — 안 붙이면 10개 풀고 왜 승급이 안 되냐는 말이 나온다.
 */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import {
  TIER_IDS, PROMOTION_TARGET, tierInfo, tierLabel, tierRank, tierProblemTitle,
  problemsInTier, promotionPool, type TierId, type TierProblem,
} from "@/lib/tier-system"
import {
  loadTierState, loadVerifiedSolves, syncTierFromServer, tierProgress, promoteTier,
  type TierState, type VerifiedSolves,
} from "@/lib/tier-store"

export default function TierPage() {
  const { lang, t } = useLanguage()

  const [loaded, setLoaded] = useState(false)
  const [state, setState] = useState<TierState | null>(null)
  const [solves, setSolves] = useState<VerifiedSolves>({})
  const [practiceTier, setPracticeTier] = useState<TierId | null>(null)

  useEffect(() => {
    // localStorage 를 먼저 그린다 — 서버 왕복을 기다리면 이미 배치고사를 본
    // 학생에게도 "배치고사를 보세요" 화면이 한 번 번쩍인다.
    setState(loadTierState())
    setSolves(loadVerifiedSolves())
    setLoaded(true)

    let alive = true
    syncTierFromServer().then(merged => {
      if (!alive) return
      setState(merged.state)
      setSolves(merged.solves)
    })
    return () => { alive = false }
  }, [])

  const progress = useMemo(
    () => (state ? tierProgress(state, solves) : null),
    [state, solves],
  )

  function doPromote() {
    if (!state) return
    const next = promoteTier(state, solves)
    if (next) setState(next)
  }

  if (!loaded) return <Shell><div className="h-40" /></Shell>

  // ── 배치고사 미응시 ──────────────────────────────────────────────────────
  if (!state) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-gray-900">{t("티어", "Tier")}</h1>
        <p className="mt-2 text-gray-600">
          {t(
            "먼저 배치고사를 보세요. 12문항으로 내 수준에 맞는 티어를 정합니다.",
            "Take the placement test first. 12 questions set the tier that matches your level.",
          )}
        </p>
        <Link
          href="/tier/placement"
          className="mt-6 block rounded-xl bg-orange-600 px-6 py-4 text-center text-base font-bold text-white hover:bg-orange-700"
        >
          {t("배치고사 시작", "Start placement test")}
        </Link>
      </Shell>
    )
  }

  const info = tierInfo(state.tier)
  const myRank = tierRank(state.tier)
  const lowerTiers = TIER_IDS.filter(id => tierRank(id) < myRank)

  const mine = promotionPool(state.tier)
  const minePending = mine.filter(p => !isCounted(p, state, solves))
  const mineDone = mine.filter(p => isCounted(p, state, solves))

  const practiceList = practiceTier
    ? problemsInTier(practiceTier).filter(p => p.graded)
    : []

  return (
    <Shell>
      {/* ── 내 티어 ── */}
      <div className="rounded-2xl p-5" style={{ background: info.tint }}>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{info.emoji}</span>
          <div>
            <div className="text-xs font-semibold text-gray-600">
              {t("내 티어", "My tier")}
            </div>
            <div
              className="mt-1 inline-block rounded-full px-3 py-1 text-base font-extrabold"
              style={{ background: info.color, color: info.ink }}
            >
              {tierLabel(state.tier, lang)}
            </div>
          </div>
        </div>

        {progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>{t("승급까지", "To rank up")}</span>
              <span>
                {progress.solved} / {PROMOTION_TARGET}
              </span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/70">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (progress.solved / PROMOTION_TARGET) * 100)}%`,
                  background: info.color,
                }}
              />
            </div>

            {progress.canPromote && progress.next ? (
              <button
                onClick={doPromote}
                className="mt-3 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-800"
              >
                {t(
                  `${tierLabel(progress.next, "ko")}(으)로 승급하기`,
                  `Rank up to ${tierLabel(progress.next, "en")}`,
                )}
              </button>
            ) : progress.next ? (
              <p className="mt-2 text-xs text-gray-600">
                {t(
                  `이 티어 문제를 ${PROMOTION_TARGET - progress.solved}개 더 맞히면 승급합니다.`,
                  `Solve ${PROMOTION_TARGET - progress.solved} more problems at this tier to rank up.`,
                )}
              </p>
            ) : (
              <p className="mt-2 text-xs font-semibold text-gray-700">
                {t("최상위 티어입니다.", "This is the highest tier.")}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <Link
          href="/tier/leaderboard"
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-bold text-gray-800 hover:border-orange-400"
        >
          {t("우리 반 리더보드", "Class leaderboard")}
        </Link>
        <Link
          href="/tier/placement"
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-bold text-gray-800 hover:border-orange-400"
        >
          {t("배치고사 다시 보기", "Retake placement")}
        </Link>
      </div>

      {/* ── 자기 티어 문제 ── */}
      <h2 className="mt-8 text-lg font-bold text-gray-900">
        {t("내 티어 문제", "Problems at my tier")}
      </h2>
      <p className="mt-1 text-xs text-gray-600">
        {t(
          "테스트케이스를 모두 통과하면 승급 카운트가 올라갑니다.",
          "Passing every test case counts toward your promotion.",
        )}
      </p>
      <ProblemList items={minePending.slice(0, 40)} role="promotion" />

      {mineDone.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-semibold text-gray-600">
            {t(`통과한 문제 ${mineDone.length}개`, `${mineDone.length} solved`)}
          </summary>
          <ProblemList items={mineDone} role="promotion" solved />
        </details>
      )}

      {/* ── 아래 티어 연습 ── */}
      {lowerTiers.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-bold text-gray-900">
            {t("아래 티어 연습", "Lower-tier practice")}
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            {t(
              "자유롭게 풀 수 있지만 승급에는 세지 않습니다 — just for practice.",
              "Play these freely, but they do not count toward promotion — just for practice.",
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lowerTiers.map(id => {
              const ti = tierInfo(id)
              const on = practiceTier === id
              return (
                <button
                  key={id}
                  onClick={() => setPracticeTier(on ? null : id)}
                  aria-pressed={on}
                  className="rounded-full border px-3 py-1.5 text-xs font-bold"
                  style={{
                    borderColor: on ? ti.color : "#cbd5e1",
                    background: on ? ti.color : "#fff",
                    color: on ? ti.ink : "#475569",
                  }}
                >
                  {ti.emoji} {tierLabel(id, lang)}
                </button>
              )
            })}
          </div>
          {practiceTier && (
            <ProblemList items={practiceList.slice(0, 40)} role="practice" />
          )}
        </>
      )}
    </Shell>
  )
}

/** 승급 카운트에 들어간 문제인가 — 티어에 들어온 뒤의 채점 통과만 센다. */
function isCounted(p: TierProblem, state: TierState, solves: VerifiedSolves): boolean {
  const at = solves[p.id]
  return !!at && at >= state.since
}

function ProblemList({
  items, role, solved = false,
}: {
  items: TierProblem[]
  role: "promotion" | "practice"
  solved?: boolean
}) {
  const { lang, t } = useLanguage()

  if (items.length === 0) {
    return (
      <p className="mt-3 rounded-xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
        {t("문제가 없습니다.", "No problems here.")}
      </p>
    )
  }

  return (
    <ul role="list" className="mt-3 space-y-2">
      {items.map(p => (
        <li key={p.id}>
          <Link
            href={p.url || `/algo/${p.topic}`}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 hover:border-orange-400 ${
              solved ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white"
            }`}
          >
            <span className="flex-1 truncate text-sm font-semibold text-gray-800">
              {tierProblemTitle(p, lang)}
            </span>
            {role === "practice" && (
              <span className="flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-600">
                {t("연습 전용", "Practice only")}
              </span>
            )}
            {solved && <span className="flex-shrink-0 text-emerald-600">✓</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />
      <main className="mx-auto max-w-2xl px-4 pt-6">{children}</main>
      <BottomNav />
    </div>
  )
}
