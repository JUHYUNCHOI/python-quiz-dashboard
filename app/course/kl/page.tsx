"use client"

// ─────────────────────────────────────────────────────────────────────
//  KL 사다리 — "다음 1개" flow
//
//  기획의도: 목록을 다 던지지 말고 "⭐ 지금 할 것 1개"만. 끝내면 다음 1개.
//  ▸ 척추 = 손으로 고른 40문제 사다리(LADDER) — 위에서 아래로 점점 어려워짐.
//  ▸ 새 문제 없음. data/practice/contest-prep-external.ts 를 보여주기만.
//  ▸ 진행 체크는 학생 수동(외부 링크라 자동 채점 불가) — localStorage "kl-prep-done".
//  ▸ 전체 사다리 / 앱 자체채점 문제 / 외부 545 는 모두 "접기"로 보조.
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"
import { RequireAuth } from "@/components/require-auth"
import { useLanguage } from "@/contexts/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import {
  EXTERNAL_PROBLEMS, SOURCE_META,
  type ExtProblem, type ExtTopic, type ExtDifficulty,
} from "@/data/practice/contest-prep-external"
import { ALL_CLUSTERS } from "@/data/practice"

const DIFF_ORDER: ExtDifficulty[] = ["쉬움", "보통", "어려움"]
const TOPIC_ORDER: ExtTopic[] = ["시뮬레이션", "완전탐색", "배열", "문자열", "map/빈도", "정렬", "투포인터", "그리드", "수학", "그리디"]

const DIFF_COLOR: Record<ExtDifficulty, string> = {
  쉬움: "bg-emerald-100 text-emerald-700 border-emerald-200",
  보통: "bg-amber-100 text-amber-700 border-amber-200",
  어려움: "bg-rose-100 text-rose-700 border-rose-200",
}
const DIFF_DOT: Record<ExtDifficulty, string> = {
  쉬움: "bg-emerald-500", 보통: "bg-amber-500", 어려움: "bg-rose-500",
}

// ── 맵(차례대로) — 손으로 고른 40문제 사다리. 위에서 아래로 조금씩 어려워짐. ──
const LADDER: string[] = [
  // 1단계 손풀기 (쉬움)
  "cf-4a", "hr-simple-array-sum", "lc-412", "lc-1", "cses-1068", "lc-344", "lc-217", "hr-diagonal-difference", "lc-121", "cses-1083",
  // 2단계 기초 도구 (쉬움→경계)
  "lc-242", "lc-169", "hr-sock-merchant", "lc-1480", "cses-1094", "lc-283", "lc-977", "cf-339a", "usaco-855", "lc-66", "cf-520a",
  // 3단계 한 번 생각 (보통 — 정렬/투포인터/완탐, Apartments 여기)
  "lc-53", "cses-1621", "cses-1629", "cses-1619", "cses-1084", "cses-1090", "cses-1640", "cses-1074", "cses-1623", "lc-167", "cf-279b", "cses-1091",
  // 4단계 기법 입문 (어려움 — 윈도우/이분/누적합/그리디)
  "cses-1141", "lc-209", "lc-424", "cf-701c", "usaco-595", "lc-15", "cf-371c", "cf-812c", "cf-1338a", "lc-56",
]
const PHASES: { at: number; ko: string; en: string; dot: string }[] = [
  { at: 0,  ko: "1단계 · 손풀기", en: "Stage 1 · Warm-up", dot: "bg-emerald-500" },
  { at: 10, ko: "2단계 · 기초 도구", en: "Stage 2 · Basic tools", dot: "bg-emerald-500" },
  { at: 21, ko: "3단계 · 한 번 생각 (정렬·투포인터)", en: "Stage 3 · One idea", dot: "bg-amber-500" },
  { at: 33, ko: "4단계 · 기법 입문 (윈도우·이분·누적합)", en: "Stage 4 · Techniques", dot: "bg-rose-500" },
]
const PROB_BY_ID = new Map(EXTERNAL_PROBLEMS.map(p => [p.id, p]))

// ── 앱 안 자체채점 KL 문제 (kl:true 태그) — 클러스터별 그룹, 쉬움→어려움 ──
const KL_GROUPS = ALL_CLUSTERS
  .map(c => ({
    id: c.id,
    title: c.title,
    emoji: c.emoji,
    problems: c.problems
      .filter(p => p.kl)
      .sort((a, b) => DIFF_ORDER.indexOf(a.difficulty) - DIFF_ORDER.indexOf(b.difficulty)),
  }))
  .filter(g => g.problems.length > 0)
const KL_TOTAL = KL_GROUPS.reduce((s, g) => s + g.problems.length, 0)

// 이 단계엔 선수지식(이분탐색 등)이 아직 부족한 문제 → "알고리즘 배운 뒤"로 안내.
// 막진 않음 — 표시만 해서 지금 여기서 안 막히게.
const DEFER_AFTER_ALGO: Record<string, { ko: string; en: string }> = {
  "cses-1091": { ko: "⏳ 알고리즘(이분탐색) 배운 뒤에", en: "⏳ After binary search (algorithm stage)" },
}

// 학생이 직접 누르는 "했음" 체크 — 외부 링크라 자동 채점 불가
function CheckDot({ done, onToggle }: { done: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle() }}
      aria-label={done ? "완료 해제" : "완료 체크"}
      className={"shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-black transition-colors " +
        (done ? "bg-green-500 border-green-500 text-white" : "border-gray-300 text-transparent hover:border-green-400 hover:text-green-400")}
    >✓</button>
  )
}

function ProblemRow({ p, showDiff, done, onToggle }: { p: ExtProblem; showDiff?: boolean; done?: boolean; onToggle?: (id: string) => void }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer"
       className={"flex items-center gap-2 rounded-lg border px-3 py-2 hover:border-gray-400 hover:shadow-sm transition-all " +
         (done ? "border-green-200 bg-green-50/60" : "border-gray-200 bg-white")}>
      <CheckDot done={!!done} onToggle={() => onToggle?.(p.id)} />
      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${SOURCE_META[p.source].color}`}>{SOURCE_META[p.source].label}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
        <p className="text-xs text-gray-500 truncate">{p.blurb}</p>
      </div>
      {showDiff && <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${DIFF_COLOR[p.difficulty]}`}>{p.difficulty}</span>}
      <span className="text-gray-300 shrink-0" aria-hidden>↗</span>
    </a>
  )
}

function Content() {
  const { t, lang } = useLanguage()
  const [mode, setMode] = useState<"diff" | "topic">("diff")        // 외부 더풀기 보기: 난이도별 기본
  const [diff, setDiff] = useState<ExtDifficulty>("쉬움")           // 난이도별 모드에서 선택된 난이도
  const [openTopic, setOpenTopic] = useState<ExtTopic | null>(null) // 유형별 모드에서 펼친 유형

  // 학생이 직접 체크한 "했음" 문제들 (외부 링크라 자동 못 잡음)
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set())
  useEffect(() => {
    try { setDoneSet(new Set(JSON.parse(localStorage.getItem("kl-prep-done") || "[]") as string[])) } catch {}
  }, [])
  const toggleDone = (id: string) => {
    setDoneSet(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      try { localStorage.setItem("kl-prep-done", JSON.stringify([...next])) } catch {}
      return next
    })
  }

  const diffCount = (d: ExtDifficulty) => EXTERNAL_PROBLEMS.filter(p => p.difficulty === d).length
  const topicCount = (tp: ExtTopic) => EXTERNAL_PROBLEMS.filter(p => p.topic === tp).length

  // ⭐ "다음 1개" — 사다리에서 아직 안 끝낸 첫 문제
  const ladderIds = LADDER.filter(id => PROB_BY_ID.has(id))
  const doneCount = ladderIds.filter(id => doneSet.has(id)).length
  const nextIdx = LADDER.findIndex(id => PROB_BY_ID.has(id) && !doneSet.has(id))
  const nextProblem = nextIdx >= 0 ? PROB_BY_ID.get(LADDER[nextIdx]) ?? null : null
  const nextPhase = nextIdx >= 0 ? ([...PHASES].reverse().find(ph => ph.at <= nextIdx) ?? null) : null
  const nextDefer = nextProblem ? DEFER_AFTER_ALGO[nextProblem.id] : undefined

  return (
    <main className="max-w-xl mx-auto px-4 pt-4 pb-28">
      <JourneyBreadcrumb items={[
        { label: "연습", labelEn: "Practice", emoji: "🎯" },
        { label: "도전 문제", labelEn: "Challenge", emoji: "🪜" },
      ]} />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{t("도전 문제 사다리", "Challenge Ladder")}</h1>
          <p className="text-gray-600 text-sm font-medium mt-0.5">
            {t("위에서부터 한 문제씩. '쉬움이야 어려움이야' 고민 말고 — 지금 할 1개만 풀어요.", "One at a time, top to bottom. Don't overthink levels — just do the next one.")}
          </p>
        </div>
        <LanguageToggle className="shrink-0 mt-1" />
      </div>

      {/* 🗺️ 전체 흐름에서 여기 — 다른 문제 세트와 난이도 관계 한눈에 */}
      <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50/50 px-3 py-3">
        <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 text-center">
          {t("전체 학습에서 여기쯤", "Where this sits")}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold flex-wrap">
          <span className="text-gray-400">📘 {t("수업", "Lessons")}</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">🎯 {t("연습", "Practice")}</span>
          <span className="text-gray-300">›</span>
          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-sm">🪜 {t("도전", "Challenge")}</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">🧩 {t("알고리즘", "Algorithms")}</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">🏆 {t("대회", "Contest")}</span>
        </div>
        <p className="text-[11px] text-gray-600 text-center mt-2 break-keep leading-relaxed">
          {t("연습(개념 1개씩) 다음 단계 · 쉬움→어려움 순. 앞쪽은 아는 도구로, 뒤로 갈수록 알고리즘(이분탐색·누적합 등)과 슬슬 겹쳐요.",
             "Next step after Practice · Easy→Hard. Early ones use tools you know; later ones start touching algorithms (binary search, prefix sums).")}
        </p>
      </div>

      {/* 진행 바 */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
          <span>{t("사다리 진행", "Ladder progress")}</span>
          <span>{doneCount} / {ladderIds.length}</span>
        </div>
        <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${ladderIds.length ? (doneCount / ladderIds.length) * 100 : 0}%` }} />
        </div>
      </div>

      {/* ⭐ 지금 할 것 — next-1 hero */}
      {nextProblem ? (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-black text-gray-900">⭐ {t("지금 할 것", "Do this now")}</h2>
            {nextPhase && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold border border-gray-200">
                {lang === "ko" ? nextPhase.ko : nextPhase.en}
              </span>
            )}
          </div>
          <div className="rounded-2xl border-2 border-gray-900 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 shrink-0 rounded-full bg-gray-900 text-white text-sm font-black flex items-center justify-center">{nextIdx + 1}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${SOURCE_META[nextProblem.source].color}`}>{SOURCE_META[nextProblem.source].label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${DIFF_COLOR[nextProblem.difficulty]}`}>{nextProblem.difficulty}</span>
            </div>
            <p className="text-lg font-black text-gray-900 leading-snug">{nextProblem.title}</p>
            <p className="text-sm text-gray-500 mt-1">{nextProblem.topic} · {nextProblem.blurb}</p>
            {nextDefer && (
              <p className="text-xs font-bold text-amber-600 mt-2">{lang === "ko" ? nextDefer.ko : nextDefer.en}</p>
            )}
            <div className="flex items-center gap-2 mt-4">
              <a href={nextProblem.url} target="_blank" rel="noopener noreferrer"
                 className="flex-1 text-center rounded-xl bg-gray-900 text-white font-bold py-2.5 hover:bg-gray-800 transition-colors">
                {t("문제 열기 ↗", "Open problem ↗")}
              </a>
              <button onClick={() => toggleDone(nextProblem.id)}
                className="rounded-xl border-2 border-emerald-500 text-emerald-600 font-bold px-4 py-2.5 hover:bg-emerald-50 transition-colors">
                {t("다 했어요 ✓", "Done ✓")}
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            {t("새 탭에서 풀고 → 돌아와 '다 했어요'. 너무 쉬우면 그냥 '다 했어요'로 넘겨도 돼요.", "Solve in a new tab → come back and tap Done. Too easy? Just tap Done to skip ahead.")}
          </p>
        </section>
      ) : (
        <a href="/algo" className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-purple-300 bg-purple-50 px-4 py-4 hover:border-purple-500 transition-all">
          <span className="text-3xl shrink-0">🎉</span>
          <div className="min-w-0 flex-1">
            <p className="font-black text-purple-900 leading-tight">{t("사다리 40문제 끝! → 알고리즘", "All 40 done! → Algorithms")}</p>
            <p className="text-xs text-purple-700/80 mt-0.5">{t("이제 BFS·DP 같은 이름 있는 기법을 배울 차례예요.", "Time for named techniques: BFS, DP, etc.")}</p>
          </div>
          <span className="text-purple-400 shrink-0" aria-hidden>→</span>
        </a>
      )}

      {/* 📋 전체 사다리 (접기) — 골라 풀거나 진행 한눈에 */}
      <details className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <summary className="cursor-pointer px-4 py-3 font-bold text-gray-800 flex items-center justify-between hover:bg-gray-50">
          <span>📋 {t("전체 사다리 (40문제)", "Full ladder (40)")}</span>
          <span className="text-xs text-gray-400">{doneCount}/{ladderIds.length}</span>
        </summary>
        <div className="px-3 pb-4 pt-1">
          <ol className="relative border-l-2 border-gray-200 ml-3 flex flex-col gap-1">
            {LADDER.map((id, i) => {
              const p = PROB_BY_ID.get(id)
              if (!p) return null
              const phase = PHASES.find(ph => ph.at === i)
              const defer = DEFER_AFTER_ALGO[id]
              const isNext = i === nextIdx
              return (
                <li key={id}>
                  {phase && (
                    <div className="flex items-center gap-2 mt-4 mb-2 -ml-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${phase.dot} ring-4 ring-white`} />
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{lang === "ko" ? phase.ko : phase.en}</span>
                    </div>
                  )}
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                     className={"flex items-center gap-2.5 rounded-lg border px-3 py-2 ml-3 hover:border-gray-400 hover:shadow-sm transition-all " +
                       (doneSet.has(p.id) ? "border-green-200 bg-green-50/60"
                        : isNext ? "border-gray-900 bg-white ring-1 ring-gray-900"
                        : defer ? "border-amber-300 border-dashed bg-amber-50/50"
                        : "border-gray-200 bg-white")}>
                    <span className="w-6 h-6 shrink-0 rounded-full bg-gray-900 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                    <CheckDot done={doneSet.has(p.id)} onToggle={() => toggleDone(p.id)} />
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${SOURCE_META[p.source].color}`}>{SOURCE_META[p.source].label}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.title}{isNext && <span className="ml-1 text-[10px] text-gray-500 font-bold">← {t("지금", "now")}</span>}</p>
                      {defer
                        ? <p className="text-xs font-bold text-amber-600 truncate">{lang === "ko" ? defer.ko : defer.en}</p>
                        : <p className="text-xs text-gray-500 truncate">{p.topic} · {p.blurb}</p>}
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${DIFF_COLOR[p.difficulty]}`}>{p.difficulty}</span>
                    <span className="text-gray-300 shrink-0" aria-hidden>↗</span>
                  </a>
                </li>
              )
            })}
          </ol>
        </div>
      </details>

      {/* 🎯 앱에서 바로 풀기 (자동채점) — 보조, 접기 */}
      {KL_TOTAL > 0 && (
        <details className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 overflow-hidden">
          <summary className="cursor-pointer px-4 py-3 font-bold text-gray-800 flex items-center gap-2 hover:bg-emerald-50/70">
            🎯 {t("앱에서 바로 풀기", "Solve in-app")}
            <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">{t("자동채점", "Auto-graded")} {KL_TOTAL}</span>
          </summary>
          <div className="px-3 pb-4 pt-1">
            <p className="text-xs text-gray-500 mb-3">
              {t("앱 안에서 풀고 바로 채점돼요. 선생님은 정답도 볼 수 있어요.", "Opens in-app, auto-graded. Teachers can view the solution.")}
            </p>

            {/* 🏦 코딩뱅크 — 앱 내 자동채점 문제 100여 개로 연결 (별도 문제, 풀 거리 최대화) */}
            <Link
              href="/coding-bank"
              className="flex items-center gap-3 rounded-xl border-2 border-emerald-300 bg-white px-4 py-3 mb-4 hover:border-emerald-500 hover:shadow-sm transition-all"
            >
              <span className="text-2xl shrink-0">🏦</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-emerald-800">{t("코딩뱅크 — 문제 더 풀기", "Coding Bank — more problems")}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 break-keep">
                  {t("앱에서 자동채점되는 복합문제 100여 개 (여기 사다리와 겹치지 않는 별도 문제). 도구 골라 풀기.",
                     "100+ more auto-graded problems (separate from this ladder). Pick your own tools.")}
                </p>
              </div>
              <span className="text-emerald-400 shrink-0" aria-hidden>→</span>
            </Link>

            <div className="flex flex-col gap-4">
              {KL_GROUPS.map(g => (
                <div key={g.id}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">{g.emoji}</span>
                    <h3 className="text-sm font-bold text-gray-700">{g.title}</h3>
                    <span className="text-xs text-gray-400">{g.problems.length}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {g.problems.map((p, i) => (
                      <Link
                        key={p.id}
                        href={`/practice?cluster=${g.id}&problem=${p.id}&from=kl&lang=cpp`}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:border-emerald-400 hover:shadow-sm transition-all"
                      >
                        <span className="w-5 h-5 shrink-0 rounded-full bg-gray-900 text-white text-[10px] font-black flex items-center justify-center">{i + 1}</span>
                        <span className="text-sm font-semibold text-gray-900 flex-1 truncate">{p.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${DIFF_COLOR[p.difficulty]}`}>{p.difficulty}</span>
                        <span className="text-gray-300 shrink-0" aria-hidden>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>
      )}

      {/* 📚 더 풀기 — 외부 공개 저지 545 (접기) */}
      <details className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <summary className="cursor-pointer px-4 py-3 font-bold text-gray-800 flex items-center gap-2 hover:bg-gray-50">
          📚 {t("더 풀기 — 외부 문제", "More — external problems")}
          <span className="text-xs text-gray-400">{EXTERNAL_PROBLEMS.length}</span>
        </summary>
        <div className="px-4 pb-4 pt-1">
          <p className="text-xs text-gray-500 mb-3">{t("공개 저지 문제 · 새 탭으로 열려요 (자체 채점 아님).", "Public-judge problems · open in a new tab (not auto-graded).")}</p>

          {/* 난이도 기준 — "얼만큼 어려운지" 절대 감 */}
          <details className="mb-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <summary className="text-sm font-bold text-gray-700 cursor-pointer">
              📏 {t("난이도 기준이 뭐예요? (실제 저지 등급)", "What do the levels mean? (real judge ratings)")}
            </summary>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded font-bold border bg-emerald-100 text-emerald-700 border-emerald-200 shrink-0">쉬움</span>
                <span className="text-gray-600">{t("CF 800 · LeetCode Easy · AtCoder A·B · USACO Bronze #1 · CSES 입문 — 막 배운 학생도 풀 수 있음", "CF 800 · LC Easy · ABC A·B · Bronze #1 · CSES intro — solvable right after lessons")}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded font-bold border bg-amber-100 text-amber-700 border-amber-200 shrink-0">보통</span>
                <span className="text-gray-600">{t("CF 900~1100 · AtCoder C · USACO Bronze #2~3 — 조금 생각·도구 조합 필요", "CF 900~1100 · ABC C · Bronze #2~3 — needs some thought / combining tools")}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 rounded font-bold border bg-rose-100 text-rose-700 border-rose-200 shrink-0">어려움</span>
                <span className="text-gray-600">{t("CF 1300~1600 · LeetCode Medium · AtCoder D · USACO Silver 입문 — 기법·통찰 필요", "CF 1300~1600 · LC Medium · ABC D · Silver intro — needs technique / insight")}</span>
              </div>
              <div className="mt-1 rounded-lg bg-white border border-gray-200 px-3 py-2 text-gray-700">
                📍 <span className="font-bold">{t("이 사다리 ≈ 쉬움~보통", "This ladder ≈ Easy~Medium")}</span> {t("(입문 구현). '어려움'은 그 이상 = 욕심/심화.", "(intro implementation). 'Hard' is above — reach/extra.")}
              </div>
            </div>
          </details>

          {/* 보기 전환: 난이도별 / 유형별 */}
          <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden mb-4">
            <button onClick={() => setMode("diff")}
              className={"px-4 py-2 text-sm font-bold " + (mode === "diff" ? "bg-gray-900 text-white" : "bg-white text-gray-500")}>
              {t("난이도별", "By difficulty")}
            </button>
            <button onClick={() => setMode("topic")}
              className={"px-4 py-2 text-sm font-bold " + (mode === "topic" ? "bg-gray-900 text-white" : "bg-white text-gray-500")}>
              {t("유형별", "By type")}
            </button>
          </div>

          {/* ── 난이도별 모드 ── */}
          {mode === "diff" && (
            <>
              <div className="flex gap-2 mb-4">
                {DIFF_ORDER.map(d => (
                  <button key={d} onClick={() => setDiff(d)}
                    className={"flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border transition-all " +
                      (diff === d ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400")}>
                    <span className={`w-2 h-2 rounded-full ${DIFF_DOT[d]}`} />
                    {d} <span className="opacity-60">{diffCount(d)}</span>
                  </button>
                ))}
              </div>
              {TOPIC_ORDER.map(tp => {
                const items = EXTERNAL_PROBLEMS.filter(p => p.difficulty === diff && p.topic === tp)
                if (items.length === 0) return null
                return (
                  <div key={tp} className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-bold text-gray-700">{tp}</h3>
                      <span className="text-xs text-gray-400">{items.length}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {items.map(p => <ProblemRow key={p.id} p={p} done={doneSet.has(p.id)} onToggle={toggleDone} />)}
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {/* ── 유형별 모드 ── */}
          {mode === "topic" && (
            <div className="flex flex-col gap-2">
              {TOPIC_ORDER.map(tp => {
                const open = openTopic === tp
                const items = EXTERNAL_PROBLEMS
                  .filter(p => p.topic === tp)
                  .sort((a, b) => DIFF_ORDER.indexOf(a.difficulty) - DIFF_ORDER.indexOf(b.difficulty))
                if (items.length === 0) return null
                return (
                  <div key={tp} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <button onClick={() => setOpenTopic(open ? null : tp)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                      <span className="font-bold text-gray-900">{tp}</span>
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">{topicCount(tp)}</span>
                        <span className="text-gray-400">{open ? "▲" : "▼"}</span>
                      </span>
                    </button>
                    {open && (
                      <div className="px-3 pb-3 flex flex-col gap-1.5">
                        {items.map(p => <ProblemRow key={p.id} p={p} showDiff done={doneSet.has(p.id)} onToggle={toggleDone} />)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* 준비 중인 출처 — 백준 공사중 */}
          <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 flex items-center gap-3">
            <span className="text-2xl shrink-0">🚧</span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-700 leading-tight">{t("백준 (BOJ)", "Baekjoon (BOJ)")} <span className="ml-1 text-[10px] align-middle px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 font-bold">{t("공사중", "Coming soon")}</span></p>
              <p className="text-xs text-gray-500 mt-0.5">{t("백준 문제도 곧 여기에 추가할 예정이에요.", "Baekjoon problems will be added here soon.")}</p>
            </div>
          </div>
        </div>
      </details>

      <p className="text-center text-xs text-gray-400 mt-6">
        {t("커리큘럼 '2. 연습' 단계 — 문법을 배운 뒤 실제 문제로 손 풀기.", "Curriculum 'Practice' stage — flex your syntax on real problems.")}
      </p>
    </main>
  )
}

export default function KLPrepProblemsPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Content />
        <BottomNav />
      </div>
    </RequireAuth>
  )
}
