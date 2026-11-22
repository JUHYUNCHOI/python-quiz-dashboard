"use client"

/**
 * 티어 홈 — 내 티어, 승급 진행도, 문제 목록.
 *
 * 학생에게 **숫자 레벨을 보여주지 않는다.** `LadderItem.level` 은 티어를 계산하는
 * 내부 정렬 키일 뿐이고, 화면에는 티어 하나만 나온다.
 *
 * ── 왜 LeetCode 식 표로 바꿨나 ──────────────────────────────────────────────
 * 처음 버전은 제목만 적힌 흰 알약 40개가 세로로 쌓인 벽이었다. 한 줄만 보고는
 * (1) 내가 푼 문제인지, (2) 승급에 세지는 문제인지, (3) C++ 문제인지 Python
 * 문제인지 알 수 없었다. 특히 (3) 은 티어 풀에 두 언어가 섞여 있어서(실측
 * 브론즈II: cpp 42 / py 34) 열어 보고 나서야 "내가 못 쓰는 언어였네" 를 알게 된다.
 *
 * 그래서 한 줄에 네 가지를 동시에 박았다 — 상태 아이콘 / 번호 / 제목+배지 / 난이도.
 * 색과 위치는 LeetCode 를 그대로 따랐다(초록 Easy·주황 Medium·빨강 Hard, 왼쪽 체크).
 * 학생이 이미 아는 신호를 새로 가르칠 이유가 없다.
 *
 * ── 왜 언어를 걸러내지 않고 보여주는가 ────────────────────────────────────
 * C++ 문제를 풀에서 빼면 마스터·그랜드마스터의 승급용 문제가 0개가 되어 승급이
 * **수학적으로 불가능**해진다. 그래서 빼는 대신 배지 + 필터로 보이게 했다.
 */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TierMark } from "@/components/tier-mark"
import { useLanguage } from "@/contexts/language-context"
import {
  TIER_IDS, PROMOTION_TARGET, tierInfo, tierLabel, tierRank, tierProblemTitle,
  problemsInTier, promotionPool, type TierId, type TierProblem,
} from "@/lib/tier-system"
import {
  loadTierState, loadVerifiedSolves, syncTierFromServer, tierProgress, promoteTier,
  type TierState, type VerifiedSolves,
} from "@/lib/tier-store"
import {
  TOPIC_COLOR, textOn, topicLabel, diffLabel, diffColor, langLabel, langColor,
} from "@/lib/problem-tags"

/**
 *   "counted" — 지금 티어에 들어온 뒤 통과 → 승급 카운트에 들어갔다.
 *   "solved"  — 통과했지만 카운트 밖이다(티어 진입 전 통과거나, 아래 티어 연습).
 *   "none"    — 아직 안 풀었다.
 *
 * "solved" 를 "counted" 와 같은 초록 체크로 그리면 안 된다. 예전에 풀어 둔
 * 문제가 10개 있는 학생은 체크 10개를 보고 "승급 버튼이 왜 안 나오냐" 고 한다.
 */
type SolveStatus = "counted" | "solved" | "none"

type StatusFilter = "all" | "todo" | "done"

export default function TierPage() {
  const { lang, t } = useLanguage()

  const [loaded, setLoaded] = useState(false)
  const [state, setState] = useState<TierState | null>(null)
  const [solves, setSolves] = useState<VerifiedSolves>({})

  // 목록 범위 — 내 티어(승급) / 아래 티어(연습)
  const [practiceTier, setPracticeTier] = useState<TierId | null>(null)

  // 필터
  const [q, setQ] = useState("")
  const [topic, setTopic] = useState("")
  const [plang, setPlang] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")

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

  const inPractice = practiceTier !== null
  // 승급용은 자체채점 문제만, 연습도 같은 기준으로 맞춘다 — 외부 링크 문제를
  // 섞으면 "통과" 표시를 찍을 방법이 없어서 전부 미해결로 보인다.
  const pool = practiceTier
    ? problemsInTier(practiceTier).filter(p => p.graded)
    : promotionPool(state.tier)

  const rows = pool.map(p => ({ p, st: solveStatus(p, state, solves, inPractice) }))

  const topics = Array.from(new Set(pool.map(p => p.topic))).sort(
    (a, b) => topicLabel(a, lang).localeCompare(topicLabel(b, lang)),
  )
  const langs = Array.from(new Set(pool.map(p => p.lang).filter((v): v is string => !!v)))

  const needle = q.trim().toLowerCase()
  const shown = rows.filter(({ p, st }) => {
    if (topic && p.topic !== topic) return false
    if (plang && p.lang !== plang) return false
    if (status === "todo" && st !== "none") return false
    if (status === "done" && st === "none") return false
    if (needle && !tierProblemTitle(p, lang).toLowerCase().includes(needle)) return false
    return true
  })

  const doneCount = rows.filter(r => r.st !== "none").length

  return (
    <Shell>
      {/* ── 내 티어 ── */}
      <div className="rounded-2xl p-5" style={{ background: info.tint }}>
        <div className="flex items-center gap-3">
          <TierMark tier={state.tier} size={40} />
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
              <span className="tabular-nums">
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

      {/* ── 범위 탭 ── */}
      <div role="tablist" aria-label={t("문제 목록 범위", "Problem list scope")} className="mt-8 flex gap-1 border-b border-gray-200">
        <ScopeTab
          on={!inPractice}
          onClick={() => setPracticeTier(null)}
          title={t("내 티어", "My tier")}
          hint={t("승급 카운트", "Counts for rank up")}
        />
        {lowerTiers.length > 0 && (
          <ScopeTab
            on={inPractice}
            onClick={() => setPracticeTier(practiceTier ?? lowerTiers[lowerTiers.length - 1])}
            title={t("아래 티어", "Lower tiers")}
            hint={t("연습 전용", "Practice only")}
          />
        )}
      </div>

      {inPractice && (
        <div className="mt-3 flex flex-wrap gap-2">
          {lowerTiers.map(id => {
            const ti = tierInfo(id)
            const on = practiceTier === id
            return (
              <button
                key={id}
                onClick={() => setPracticeTier(id)}
                aria-pressed={on}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold"
                style={{
                  borderColor: on ? ti.color : "#cbd5e1",
                  background: on ? ti.color : "#fff",
                  color: on ? ti.ink : "#475569",
                }}
              >
                <TierMark tier={id} size={13} color={on ? ti.ink : ti.color} />
                {tierLabel(id, lang)}
              </button>
            )
          })}
        </div>
      )}

      {/* ── 이 목록이 승급에 세지는지 한 줄로 못 박는다 ── */}
      <p className={`mt-3 rounded-lg px-3 py-2 text-xs font-semibold ${
        inPractice ? "bg-gray-100 text-gray-600" : "bg-emerald-50 text-emerald-800"
      }`}>
        {inPractice
          ? t(
              "연습 전용입니다 — 통과해도 승급 카운트에 들어가지 않습니다.",
              "Practice only — passing these does not count toward promotion.",
            )
          : t(
              "테스트케이스를 모두 통과하면 승급 카운트가 올라갑니다.",
              "Passing every test case counts toward your promotion.",
            )}
      </p>

      {/* ── 필터 ── */}
      {/* 셀렉트는 좁은 화면에서도 가로로 — 세로로 쌓으면 필터가 화면 한 판을
          다 먹어서 정작 문제 목록이 스크롤 아래로 밀려난다. */}
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={t("제목 검색", "Search title")}
          aria-label={t("제목 검색", "Search title")}
          className="col-span-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none sm:col-span-1"
        />
        <Select value={status} onChange={v => setStatus(v as StatusFilter)} label={t("상태", "Status")}>
          <option value="all">{t("상태 전체", "All status")}</option>
          <option value="todo">{t("안 푼 문제", "Todo")}</option>
          <option value="done">{t("통과한 문제", "Solved")}</option>
        </Select>
        <Select value={topic} onChange={setTopic} label={t("주제", "Topic")}>
          <option value="">{t("주제 전체", "All topics")}</option>
          {topics.map(tp => (
            <option key={tp} value={tp}>{topicLabel(tp, lang)}</option>
          ))}
        </Select>
        {langs.length > 1 && (
          <Select value={plang} onChange={setPlang} label={t("언어", "Language")}>
            <option value="">{t("언어 전체", "All languages")}</option>
            {langs.map(l => (
              <option key={l} value={l}>{langLabel(l) ?? l}</option>
            ))}
          </Select>
        )}
      </div>

      {/* ── 집계 + 범례 ── */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
        <span className="font-semibold tabular-nums">
          {t(
            `${pool.length}문제 중 ${doneCount}문제 통과`,
            `${doneCount} of ${pool.length} solved`,
          )}
          {shown.length !== pool.length && (
            <span className="ml-2 font-normal text-gray-500">
              {t(`(${shown.length}개 표시)`, `(${shown.length} shown)`)}
            </span>
          )}
        </span>
        {/* 연습 목록에는 "카운트됨" 이 존재할 수 없다 — 범례에 띄우면 초록 체크를
            기다리게 된다. */}
        <span className="flex items-center gap-3">
          {!inPractice && <Legend st="counted">{t("카운트됨", "Counted")}</Legend>}
          <Legend st="solved">
            {inPractice ? t("통과", "Solved") : t("카운트 밖", "Not counted")}
          </Legend>
          <Legend st="none">{t("안 푼 문제", "Todo")}</Legend>
        </span>
      </div>

      {/* ── 표 ── */}
      <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
          <span className="w-5 text-center" aria-hidden>✓</span>
          <span className="w-7 text-right">#</span>
          <span className="flex-1">{t("문제", "Problem")}</span>
          <span>{t("난이도", "Difficulty")}</span>
        </div>

        {shown.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-gray-500">
            {t("조건에 맞는 문제가 없습니다.", "No problems match these filters.")}
          </p>
        ) : (
          <ul role="list">
            {shown.map(({ p, st }, i) => (
              <li key={p.id}>
                <Link
                  href={p.url || `/algo/${p.topic}`}
                  className={`group flex items-start gap-3 border-b border-gray-100 px-3 py-2.5 last:border-b-0 hover:bg-orange-50/70 ${
                    st === "none" ? "" : "bg-gray-50/60"
                  }`}
                >
                  <StatusIcon st={st} lang={lang} />
                  <span className="w-7 shrink-0 pt-0.5 text-right text-xs font-semibold tabular-nums text-gray-400">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-gray-900 group-hover:text-orange-700">
                      {tierProblemTitle(p, lang)}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Tag color={TOPIC_COLOR[p.topic] ?? "#64748b"}>
                        {topicLabel(p.topic, lang)}
                      </Tag>
                      {langLabel(p.lang) && (
                        <Tag color={langColor(p.lang)}>{langLabel(p.lang)}</Tag>
                      )}
                    </span>
                  </span>
                  <span
                    className="shrink-0 pt-0.5 text-xs font-bold"
                    style={{ color: diffColor(p.diff) }}
                  >
                    {diffLabel(p.diff, lang) ?? "—"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  )
}

/**
 * 한 문제의 상태. 연습 목록에서는 카운트가 아예 없으므로 통과했어도
 * "counted" 가 되지 않는다 — 초록 체크를 보고 승급을 기대하면 안 된다.
 */
function solveStatus(
  p: TierProblem, state: TierState, solves: VerifiedSolves, practice: boolean,
): SolveStatus {
  const at = solves[p.id]
  if (!at) return "none"
  if (practice) return "solved"
  return at >= state.since ? "counted" : "solved"
}

function StatusIcon({ st, lang }: { st: SolveStatus; lang: string }) {
  const label =
    st === "counted" ? (lang === "en" ? "Counted" : "승급 카운트에 들어감")
    : st === "solved" ? (lang === "en" ? "Solved, not counted" : "통과했지만 카운트 밖")
    : (lang === "en" ? "Todo" : "안 푼 문제")

  return (
    <span
      title={label}
      aria-label={label}
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
        st === "counted" ? "bg-emerald-600 text-white"
        : st === "solved" ? "bg-gray-300 text-white"
        : "border border-dashed border-gray-300 text-transparent"
      }`}
    >
      ✓
    </span>
  )
}

function Legend({ st, children }: { st: SolveStatus; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`inline-block h-3 w-3 rounded-full ${
          st === "counted" ? "bg-emerald-600"
          : st === "solved" ? "bg-gray-300"
          : "border border-dashed border-gray-400"
        }`}
        aria-hidden
      />
      {children}
    </span>
  )
}

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="rounded px-1.5 py-0.5 text-[10px] font-bold leading-4"
      style={{ background: color, color: textOn(color) }}
    >
      {children}
    </span>
  )
}

function ScopeTab({
  on, onClick, title, hint,
}: {
  on: boolean
  onClick: () => void
  title: string
  hint: string
}) {
  return (
    <button
      role="tab"
      aria-selected={on}
      onClick={onClick}
      className={`-mb-px border-b-2 px-3 pb-2 pt-1 text-left ${
        on ? "border-orange-500" : "border-transparent"
      }`}
    >
      <span className={`block text-sm font-bold ${on ? "text-gray-900" : "text-gray-500"}`}>
        {title}
      </span>
      <span className={`block text-[11px] ${on ? "text-orange-700" : "text-gray-400"}`}>
        {hint}
      </span>
    </button>
  )
}

function Select({
  value, onChange, label, children,
}: {
  value: string
  onChange: (v: string) => void
  label: string
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label={label}
      className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-semibold text-gray-700 focus:border-orange-500 focus:outline-none"
    >
      {children}
    </select>
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
