"use client"

// ─────────────────────────────────────────────────────────────────────
//  KL 대비 문제 모음 — 단순 뷰 (DRAFT)
//
//  목적: 545개 외부 저지 문제를 "난이도별(기본) ↔ 유형별" 로 골라 풀기.
//  ▸ 새 문제 없음. data/practice/contest-prep-external.ts 를 보여주기만.
//  ▸ flow/지도 아님 — 그냥 문제 목록 뷰. 외부 링크는 새 탭.
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react"
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
  const [mode, setMode] = useState<"map" | "diff" | "topic">("map")  // 기본: 맵(차례대로)
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

  return (
    <main className="max-w-xl mx-auto px-4 pt-4 pb-28">
      <JourneyBreadcrumb items={[
        { label: "실전", labelEn: "Contest", emoji: "🏆" },
        { label: "KL 대비 문제", labelEn: "KL Prep Problems", emoji: "🎯" },
      ]} />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">{t("KL 대비 문제", "KL Prep Problems")}</h1>
          <p className="text-gray-600 text-sm font-medium mt-0.5">
            {t(`공개 저지 ${EXTERNAL_PROBLEMS.length}문제 · 누르면 새 탭으로 열려요`, `${EXTERNAL_PROBLEMS.length} public-judge problems · opens in a new tab`)}
          </p>
        </div>
        <LanguageToggle className="shrink-0 mt-1" />
      </div>

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
            📍 <span className="font-bold">{t("KL Coding Cup ≈ 쉬움~보통", "KL Coding Cup ≈ Easy~Medium")}</span> {t("(입문 구현). '어려움'은 그 이상 = 욕심/심화.", "(intro implementation). 'Hard' is above KL — reach/extra.")}
          </div>
        </div>
      </details>

      {/* 보기 전환: 난이도별 / 유형별 */}
      <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden mb-4">
        <button onClick={() => setMode("map")}
          className={"px-4 py-2 text-sm font-bold " + (mode === "map" ? "bg-gray-900 text-white" : "bg-white text-gray-500")}>
          {t("맵 (차례대로)", "Map (in order)")}
        </button>
        <button onClick={() => setMode("diff")}
          className={"px-4 py-2 text-sm font-bold " + (mode === "diff" ? "bg-gray-900 text-white" : "bg-white text-gray-500")}>
          {t("난이도별", "By difficulty")}
        </button>
        <button onClick={() => setMode("topic")}
          className={"px-4 py-2 text-sm font-bold " + (mode === "topic" ? "bg-gray-900 text-white" : "bg-white text-gray-500")}>
          {t("유형별", "By type")}
        </button>
      </div>

      {/* ── 맵 모드 (차례대로) ── */}
      {mode === "map" && (
        <div>
          <p className="text-xs text-gray-500 mb-4">
            {t("위에서부터 한 문제씩. 순서가 곧 난이도예요 — '쉬움이야 보통이야' 고민 없이 그냥 다음 1개.", "Top to bottom, one at a time. Order = difficulty — just do the next one.")}
          </p>
          <ol className="relative border-l-2 border-gray-200 ml-3 flex flex-col gap-1">
            {LADDER.map((id, i) => {
              const p = PROB_BY_ID.get(id)
              if (!p) return null
              const phase = PHASES.find(ph => ph.at === i)
              const defer = DEFER_AFTER_ALGO[id]
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
                        : defer ? "border-amber-300 border-dashed bg-amber-50/50"
                        : "border-gray-200 bg-white")}>
                    <span className="w-6 h-6 shrink-0 rounded-full bg-gray-900 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                    <CheckDot done={doneSet.has(p.id)} onToggle={() => toggleDone(p.id)} />
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border shrink-0 ${SOURCE_META[p.source].color}`}>{SOURCE_META[p.source].label}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.title}</p>
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
          {/* 끝 → 알고리즘 */}
          <a href="/algo" className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-purple-300 bg-purple-50 px-4 py-3 hover:border-purple-500 transition-all">
            <span className="text-2xl shrink-0">🧩</span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-purple-900 leading-tight">{t("여기까지 풀었다면 → 알고리즘", "Done all 40? → Algorithms")}</p>
              <p className="text-xs text-purple-700/80 mt-0.5">{t("이제 BFS·DP 같은 이름 있는 기법을 배울 차례예요.", "Time for named techniques: BFS, DP, etc.")}</p>
            </div>
            <span className="text-purple-400 shrink-0" aria-hidden>→</span>
          </a>
        </div>
      )}

      {/* ── 난이도별 모드 ── */}
      {mode === "diff" && (
        <>
          {/* 난이도 탭 */}
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
          {/* 선택된 난이도 → 유형별로 묶어 보여주기 */}
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
      <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 flex items-center gap-3">
        <span className="text-2xl shrink-0">🚧</span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-gray-700 leading-tight">{t("백준 (BOJ)", "Baekjoon (BOJ)")} <span className="ml-1 text-[10px] align-middle px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 font-bold">{t("공사중", "Coming soon")}</span></p>
          <p className="text-xs text-gray-500 mt-0.5">{t("백준 문제도 곧 여기에 추가할 예정이에요.", "Baekjoon problems will be added here soon.")}</p>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        {t("외부 공개 저지 문제 모음 — 누르면 새 탭에서 풀어요. 커리큘럼 '2. 연습' 단계의 일부예요.", "Public-judge problems — open in a new tab. Part of the curriculum's 'Practice' stage.")}
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
