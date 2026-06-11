"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"
import { RequireAuth } from "@/components/require-auth"
import { PracticeRunner } from "@/components/practice/practice-runner"
import { McqRunner } from "@/components/practice/mcq-runner"
import { PracticeSession } from "@/components/practice/practice-session"
import { ALL_CLUSTERS, BANK_CLUSTERS, ALGO_CONTEST_IDS } from "@/data/practice"
import { getAdaptiveNext, summarizeConcepts } from "@/lib/adaptive"
import { LearningMap, type MapNode } from "@/components/learning-map"
import { getNextLessonId, getLessonName, getCompletedLessons, pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"
import { getSmartNext } from "@/lib/smart-next"
import type { PracticeCluster, PracticeProblem } from "@/data/practice/types"
import { localizeCluster, localizeProblem } from "@/data/practice/types"
import { getContestLinks, codeQuestUrl, type ContestProblem } from "@/data/practice/contest-links"
import { usePracticeProgress } from "@/hooks/use-practice-progress"
import { useAuth } from "@/contexts/auth-context"
import { useEffectiveIsTeacher } from "@/lib/effective-role"
import { ArrowLeft, Lock, CheckCircle2, Star, FileText, Code2, HelpCircle, ExternalLink, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

type Lang = "cpp" | "python"

function getClusterLang(cluster: PracticeCluster): Lang {
  return String(cluster.unlockAfter).startsWith("cpp") ? "cpp" : "python"
}

const BANK_CLUSTER_IDS = new Set(BANK_CLUSTERS.map(c => c.id))
const CPP_CLUSTERS = ALL_CLUSTERS.filter(c => getClusterLang(c) === "cpp" && !BANK_CLUSTER_IDS.has(c.id) && !ALGO_CONTEST_IDS.has(c.id))
const PYTHON_CLUSTERS = ALL_CLUSTERS.filter(c => getClusterLang(c) === "python" && !BANK_CLUSTER_IDS.has(c.id) && !ALGO_CONTEST_IDS.has(c.id))

const DIFFICULTY_COLOR: Record<string, string> = {
  "쉬움": "text-emerald-700 bg-emerald-100",
  "보통": "text-amber-700 bg-amber-100",
  "어려움": "text-red-700 bg-red-100",
}

// ── 🎯 KL 필터 데이터 — kl:true 태그 문제 (별도 페이지 X, /practice 안 한 모드) ──
const _KL_DIFF_ORDER = ["쉬움", "보통", "어려움"]
// 토픽 그룹 X — 쉬움→어려움 한 줄(사다리). "어느 토픽 풀까" 고르는 단계 제거. 토픽은 작은 태그로만.
const KL_FLAT = ALL_CLUSTERS
  .flatMap(c => c.problems
    .filter(p => p.kl)
    .map(p => ({ ...p, _clusterId: c.id, _topic: c.title.replace(/ ?문제 ?풀이$/, "").replace(/ ?문제$/, "") })))
  .sort((a, b) => _KL_DIFF_ORDER.indexOf(a.difficulty) - _KL_DIFF_ORDER.indexOf(b.difficulty))
const KL_TOTAL = KL_FLAT.length

// KL 필터 뷰 — 연습 안에서 KL 태그 문제만. 각 문제는 /practice 딥링크(페이지 이동 없이 runner).
function KLView({ solvedSet, starredSet, compact = false }: { solvedSet: Set<string>; starredSet: Set<string>; compact?: boolean }) {
  const { t } = useLanguage()
  // 적응형: 학생 진행으로 "지금 추천" 1개. 실패/없음 → null → 카드 숨김(=목록 그대로, 폴백)
  const rec = getAdaptiveNext({
    pool: KL_FLAT.map(p => ({ id: p.id, cluster: p._clusterId, difficulty: p.difficulty })),
    solvedSet,
    starredSet,
  })
  const recProb = rec ? KL_FLAT.find(p => p.id === rec.problemId) : null
  return (
    <div className="flex flex-col gap-1.5">
      {!compact && recProb && rec && (
        <Link
          href={`/practice?cluster=${recProb._clusterId}&problem=${recProb.id}&from=kl`}
          className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 flex items-center gap-3 hover:shadow-md transition-all mb-1"
        >
          <span className="text-2xl shrink-0">⭐</span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-amber-600">{t(`지금 추천 — ${rec.reason}`, `Recommended — ${rec.reasonEn}`)}</p>
            <p className="font-bold text-gray-900 truncate">{recProb.title}</p>
          </div>
          <span className="text-amber-500 shrink-0" aria-hidden>→</span>
        </Link>
      )}

      {/* 📊 내 실력 (개념별) — 풀수록 채워짐. 학생이 자기 실력을 봄 */}
      {!compact && (() => {
        const summary = summarizeConcepts(
          KL_FLAT.map(p => ({ id: p.id, cluster: p._clusterId, difficulty: p.difficulty })),
          solvedSet,
          starredSet,
        )
        const topicName = new Map(KL_FLAT.map(p => [p._clusterId, p._topic]))
        const LABEL: Record<string, [string, string, string]> = {
          struggling: ["막힘", "Stuck", "bg-rose-100 text-rose-600"],
          learning: ["배우는 중", "Learning", "bg-amber-100 text-amber-700"],
          proficient: ["능숙", "Proficient", "bg-sky-100 text-sky-700"],
          mastered: ["마스터", "Mastered", "bg-emerald-100 text-emerald-700"],
        }
        return (
          <details className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 mb-1">
            <summary className="text-xs font-bold text-gray-600 cursor-pointer">📊 {t("내 실력 (개념별) — 풀수록 채워져요", "My skill (by concept) — fills as you solve")}</summary>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {summary.map(c => {
                const [ko, en, cls] = c.started ? LABEL[c.level] : ["아직", "—", "bg-gray-100 text-gray-400"]
                return (
                  <span key={c.concept} className="text-[11px] inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1">
                    <span className="font-semibold text-gray-700">{topicName.get(c.concept)}</span>
                    <span className={"px-1.5 py-0.5 rounded font-bold " + cls}>{t(ko, en)}</span>
                    <span className="text-gray-400">{c.solved}/{c.total}</span>
                  </span>
                )
              })}
            </div>
          </details>
        )
      })()}

      {!compact && (
        <p className="text-xs text-gray-500 mb-1">
          {t("또는 위에서부터 한 문제씩 — 쉬움→어려움 순서. 누르면 바로 풀고 자동 채점돼요.", "Or top to bottom, easy→hard. Tap to solve in place, auto-graded.")}
        </p>
      )}
      {KL_FLAT.map((p, i) => {
        const solved = solvedSet.has(p.id)
        const prev = KL_FLAT[i - 1]
        const showDivider = !prev || prev.difficulty !== p.difficulty
        return (
          <div key={p.id}>
            {showDivider && (
              <p className="mt-3 mb-1 text-[11px] font-bold text-gray-400">
                {p.difficulty === "쉬움" ? t("쉬움부터 — 손풀기", "Easy — warm-up")
                  : p.difficulty === "보통" ? t("보통 — 한 번 생각", "Medium — think once")
                  : t("어려움 — 기법 입문", "Hard — techniques")}
              </p>
            )}
            <Link
              href={`/practice?cluster=${p._clusterId}&problem=${p.id}&from=kl`}
              className={"flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-all hover:border-amber-400 hover:shadow-sm " + (solved ? "border-green-200 bg-green-50/60" : "border-gray-200 bg-white")}
            >
              <span className="w-6 h-6 shrink-0 rounded-full bg-gray-900 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
              <span className="text-sm font-semibold text-gray-900 flex-1 truncate">{p.title}</span>
              <span className="text-[10px] text-gray-400 shrink-0">{p._topic}</span>
              {solved ? <span className="text-green-500 shrink-0 text-xs">✓</span> : <span className="text-gray-300 shrink-0" aria-hidden>→</span>}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

const _MASTERY_LABEL: Record<string, [string, string, string]> = {
  struggling: ["막힘", "Stuck", "bg-rose-100 text-rose-600"],
  learning: ["배우는 중", "Learning", "bg-amber-100 text-amber-700"],
  proficient: ["능숙", "Proficient", "bg-sky-100 text-sky-700"],
  mastered: ["마스터", "Mastered", "bg-emerald-100 text-emerald-700"],
}
function clusterName(id: string): string {
  const c = ALL_CLUSTERS.find(x => x.id === id)
  if (!c) return id
  return c.title.replace(/ ?문제 ?풀이$/, "").replace(/ ?문제$/, "")
}

// ⭐ 적응형 패널 — 수업별(해금) + KL 합친 풀에서 "다음 1개" + 📊 내 실력. 탭 고르기 없음.
// 연습 맵 순서 (커리큘럼 순) — 조사 보고 기반 단일 줄기
const CPP_PRACTICE_ORDER = ["io", "conditionals", "loops", "functions", "part1-combo", "arrays", "strings", "refs-ptrs", "structs", "pair-tuple", "constructs", "map-set", "simulation", "stackqueue", "grid", "sorting", "search"]
const PY_PRACTICE_ORDER = ["py-basics", "py-output", "py-typeconv", "py-io", "py-conditionals", "py-logic", "py-loops", "py-lists", "py-strings", "py-dicts", "py-functions", "py-oop"]

// 연습 = 난이도 단계(쉬움→보통→어려움, 토픽 섞임). 한 토픽 안에도 난이도가 다양하므로
// "토픽 일렬"이 아니라 "난이도 사다리"로. 추천(다음 1개)은 적응형이 내 수준 맞춰 고름.
const TIERS: { d: "쉬움" | "보통" | "어려움"; dot: string; ko: string; en: string }[] = [
  { d: "쉬움", dot: "bg-emerald-500", ko: "쉬움 — 손풀기", en: "Easy — warm-up" },
  { d: "보통", dot: "bg-amber-500", ko: "보통 — 한 번 생각", en: "Medium — think once" },
  { d: "어려움", dot: "bg-rose-500", ko: "어려움 — 기법", en: "Hard — technique" },
]

function AdaptivePanel({ lang, solvedSet, starredSet }: { lang: Lang; solvedSet: Set<string>; starredSet: Set<string> }) {
  const { t, lang: locale } = useLanguage()
  const [lastId, setLastId] = useState<string | null>(null)
  useEffect(() => { try { setLastId(localStorage.getItem("practice-last-problem")) } catch {} }, [])
  const [topicFilter, setTopicFilter] = useState("all") // "all" | 토픽명
  const [diffFilter, setDiffFilter] = useState<"all" | "쉬움" | "보통" | "어려움">("all")
  const clusters = lang === "cpp" ? CPP_CLUSTERS : PYTHON_CLUSTERS
  // 연습 = 수업 병행 클러스터만 (배운 개념 굳히기). 대회대비/알고리즘 문제는 알고리즘 단계 소속.
  const all = clusters.flatMap(c => c.problems.map(p => ({ p, cluster: c.id, topic: clusterName(c.id), kl: false })))
  const topics = Array.from(new Set(all.map(x => x.topic)))
  const filtered = topicFilter === "all" ? all
    : all.filter(x => x.topic === topicFilter)

  // 추천 다음 1개 — 적응형(내 수준에 맞는 난이도, 토픽 무관)
  const pool = all.map(x => ({ id: x.p.id, cluster: x.cluster, difficulty: x.p.difficulty }))
  const rec = getAdaptiveNext({ pool, solvedSet, starredSet })
  const recX = rec ? all.find(x => x.p.id === rec.problemId) : null
  const lastX = lastId ? all.find(x => x.p.id === lastId) : null
  const solvedInView = filtered.filter(x => solvedSet.has(x.p.id)).length // 현재 보기(주제 필터) 기준 진행
  const viewLabel = topicFilter === "all" ? t("전체 진행", "Overall") : topicFilter
  const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0)

  return (
    <div className="flex flex-col gap-3">
      {/* 👉 지금 추천 — 적응형이 내 수준 맞춰 고른 1개 */}
      {recX && rec ? (
        <Link
          href={`/practice?cluster=${recX.cluster}&problem=${recX.p.id}&from=practice`}
          className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50 to-sky-50 p-5 hover:shadow-md transition-all"
        >
          <p className="text-[11px] font-bold text-violet-500 mb-0.5">👉 {t(`지금 추천 — ${rec.reason}`, `Recommended — ${rec.reasonEn}`)}</p>
          <p className="text-lg font-black text-gray-900 leading-tight">{localizeProblem(recX.p, locale).title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{recX.kl ? "🎯 " : ""}{recX.topic} · {recX.p.difficulty} <span className="ml-1 text-violet-400 font-bold">→</span></p>
        </Link>
      ) : (
        <Link href="/coding-bank" className="block rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition-colors">
          {t("이 언어 연습을 다 풀었어요! 🎉 🧰 코딩 뱅크에서 직접 문제 풀어보기 →", "All practice cleared! 🎉 On to Coding Bank →")}
        </Link>
      )}

      {/* 📍 마지막에 풀던 곳 — 이어가기 쉽게 */}
      {lastX && (!recX || lastX.p.id !== recX.p.id) && (
        <Link
          href={`/practice?cluster=${lastX.cluster}&problem=${lastX.p.id}&from=practice`}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 flex items-center gap-2 hover:border-violet-300 transition-all"
        >
          <span className="text-base shrink-0">📍</span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-gray-400">{t("마지막에 푼 문제", "Last solved")}</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{localizeProblem(lastX.p, locale).title}{solvedSet.has(lastX.p.id) ? " ✓" : ""}</p>
          </div>
          <span className="text-gray-300 shrink-0" aria-hidden>→</span>
        </Link>
      )}
      {/* 🔎 필터 — 주제(드롭다운) + 난이도(칩). 평소 전체, 골라보고 싶을 때만 */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <select
          value={topicFilter}
          onChange={e => setTopicFilter(e.target.value)}
          className="font-bold border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700"
        >
          <option value="all">📚 {t("주제: 전체", "Topic: All")}</option>
          {topics.map(tp => <option key={tp} value={tp}>{tp}</option>)}
        </select>
        <span className="text-gray-200">|</span>
        {([["all", t("전체", "All")], ["쉬움", "🟢 " + t("쉬움", "Easy")], ["보통", "🟡 " + t("보통", "Med")], ["어려움", "🔴 " + t("어려움", "Hard")]] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setDiffFilter(k as typeof diffFilter)}
            className={"font-bold px-2.5 py-1 rounded-full border transition-colors " + (diffFilter === k ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 📊 전체 진행 — 현재 보기(주제 필터) 기준 한눈에 */}
      {filtered.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-gray-600">{viewLabel}</span>
            <span className={solvedInView > 0 ? "text-green-600" : "text-gray-400"}>✓ {solvedInView} / {filtered.length} ({pct(solvedInView, filtered.length)}%)</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 transition-all" style={{ width: `${pct(solvedInView, filtered.length)}%` }} />
          </div>
        </div>
      )}

      {/* 난이도 단계 사다리 — 안 푼 건 위(할 것), 푼 건 '완료' 접개식으로 분리 */}
      {TIERS.filter(tier => diffFilter === "all" || tier.d === diffFilter).map(tier => {
        const items = filtered.filter(x => x.p.difficulty === tier.d)
        if (items.length === 0) return null
        const unsolved = items.filter(x => !solvedSet.has(x.p.id))
        const solvedItems = items.filter(x => solvedSet.has(x.p.id))
        const solvedCnt = solvedItems.length
        const SHOWN = 12
        return (
          <details key={tier.d} open={tier.d === "쉬움" || topicFilter !== "all" || diffFilter !== "all"} className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <span className={"w-2.5 h-2.5 rounded-full " + tier.dot} />
                {t(tier.ko, tier.en)}
                <span className={"ml-auto text-xs " + (solvedCnt > 0 ? "font-bold text-green-600" : "font-normal text-gray-400")}>
                  {solvedCnt > 0 ? `✓ ${solvedCnt} / ${items.length}` : `0 / ${items.length}`}
                </span>
              </div>
              {/* 단계별 진행 바 — 접혀 있어도 얼마나 했는지 보임 */}
              <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 transition-all" style={{ width: `${pct(solvedCnt, items.length)}%` }} />
              </div>
            </summary>
            <div className="mt-3 flex flex-col gap-1.5">
              {/* 할 것 — 아직 안 푼 문제 */}
              {unsolved.slice(0, SHOWN).map(x => (
                <Link
                  key={x.p.id}
                  href={`/practice?cluster=${x.cluster}&problem=${x.p.id}&from=practice`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 transition-all hover:border-violet-400"
                >
                  <span className="text-sm font-semibold text-gray-900 flex-1 truncate">{localizeProblem(x.p, locale).title}</span>
                  <span className="text-[10px] text-gray-400 shrink-0">{x.kl ? "🎯 " : ""}{x.topic}</span>
                  <span className="text-gray-300 shrink-0" aria-hidden>→</span>
                </Link>
              ))}
              {unsolved.length > SHOWN && (
                <p className="text-[11px] text-gray-400 text-center pt-1">+{unsolved.length - SHOWN}{t("개 더 (위 추천 따라가면 자동으로)", " more (the recommendation walks you through)")}</p>
              )}
              {unsolved.length === 0 && (
                <p className="text-[11px] text-green-600 font-bold text-center py-1">🎉 {t("이 난이도 다 풀었어요!", "All done in this tier!")}</p>
              )}

              {/* ✓ 완료한 문제 — 접개식으로 확인 (끝낸 것 vs 안 끝낸 것 구분) */}
              {solvedCnt > 0 && (
                <details className="mt-1 rounded-lg bg-green-50/60 border border-green-100 px-3 py-1.5">
                  <summary className="text-xs font-bold text-green-700 cursor-pointer">
                    ✓ {t(`완료한 ${solvedCnt}개 보기`, `View ${solvedCnt} completed`)}
                  </summary>
                  <div className="mt-2 flex flex-col gap-1">
                    {solvedItems.map(x => (
                      <Link
                        key={x.p.id}
                        href={`/practice?cluster=${x.cluster}&problem=${x.p.id}&from=practice`}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-green-100/60 transition-colors"
                      >
                        <span className="text-green-500 shrink-0 text-xs">✓</span>
                        <span className="text-sm text-gray-500 line-through flex-1 truncate">{localizeProblem(x.p, locale).title}</span>
                        <span className="text-[10px] text-gray-400 shrink-0">{x.kl ? "🎯 " : ""}{x.topic}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </details>
        )
      })}

      {/* 🧰 종합 도전 (코딩뱅크) — 연습의 마지막 칸: 여러 도구 섞어서 스스로 */}
      <Link
        href="/coding-bank"
        className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center gap-3 hover:shadow-md transition-all"
      >
        <span className="text-2xl shrink-0">🧰</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-amber-900">{t("종합 도전 — 코딩 뱅크", "Coding Bank — challenge")}</p>
          <p className="text-xs text-amber-700 mt-0.5">{t("개념을 다 익혔으면, 여러 도구 섞어서 스스로 풀어보기 (알고리즘 전 마지막)", "Mix everything you've learned — last step before algorithms")}</p>
        </div>
        <span className="text-amber-400 shrink-0">→</span>
      </Link>

    </div>
  )
}

function isClusterUnlocked(cluster: PracticeCluster): boolean {
  if (typeof window === "undefined") return false
  try {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[]
    return completed.includes(cluster.unlockAfter)
  } catch { return false }
}

// 전체 레슨 순서 (커리큘럼) — "방금 배운 레슨" 판단용
const LESSON_ORDER: string[] = [...pythonParts, ...cppParts, ...pseudoParts].flatMap(p => p.lessonIds.map(String))
function lessonPos(id: string): number {
  const i = LESSON_ORDER.indexOf(String(id))
  return i === -1 ? 9999 : i
}

// SET 1 기준(7문제) 이상 풀었으면 "충분히 완료"
const SET1_SIZE = 7
function isClusterDone(cluster: PracticeCluster, solvedSet: Set<string>): boolean {
  const solved = cluster.problems.filter(p => solvedSet.has(p.id)).length
  return solved >= Math.min(SET1_SIZE, cluster.problems.length)
}

// ── 클러스터 목록 ──────────────────────────────────────────────────
function ClusterList({
  onSelect,
  solvedSet,
  starredSet,
  lang,
  onLangChange,
  isTeacher = false,
  onBack,
  initialKl = false,
}: {
  onSelect: (cluster: PracticeCluster) => void
  solvedSet: Set<string>
  starredSet: Set<string>
  lang: Lang
  onLangChange: (lang: Lang) => void
  isTeacher?: boolean
  onBack?: () => void
  initialKl?: boolean
}) {
  const { t, lang: locale } = useLanguage()
  const [showCompleted, setShowCompleted] = useState(false)
  const clusters = lang === "cpp" ? CPP_CLUSTERS : PYTHON_CLUSTERS

  // 전체 풀린 문제 수 (알고리즘 해금 목표)
  const GOAL = 40
  const totalSolved = ALL_CLUSTERS.reduce((acc, c) => acc + c.problems.filter(p => solvedSet.has(p.id)).length, 0)
  const goalReached = totalSolved >= GOAL

  // 소프트 진행 — 모든 클러스터 클릭 가능. unlockAfter 는 권장 순서만.
  // 학생이 왔다갔다 자유롭게 가능 (이전엔 학생 isClusterUnlocked() = false 면 못 풀게 막았음).
  const activeClusters = clusters.filter(c => !isClusterDone(c, solvedSet))
  // 충분히 완료한 클러스터
  const doneClusters = clusters.filter(c => isClusterDone(c, solvedSet))
  // '다음 예고' 섹션은 더 이상 필요 X — 모두 노출
  const nextLockedCluster = null

  // 다음 클러스터 선택 — 수업 진도 기반 (2026-06 개선):
  //  1) 수업을 들은(해금된) 클러스터 우선 — "방금 배운 거 연습"
  //  2) 해금된 것끼리: 가장 최근에 배운 레슨의 연습 우선 (커리큘럼 뒤쪽)
  //  3) 이미 풀던 것(많이 푼) 우선 — 마무리 가까운 거
  //  4) 커리큘럼 순서
  // 이전엔 "푼 개수"만 봐서, 수업과 무관한 클러스터(예: struct)가 다음으로 떠 헷갈렸음.
  const withProgress = activeClusters
    .map(c => ({
      c,
      solved: c.problems.filter(p => solvedSet.has(p.id)).length,
      unlocked: isClusterUnlocked(c),
      pos: lessonPos(c.unlockAfter),
    }))
    .sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1          // 1) 들은 수업 우선
      if (a.unlocked && b.unlocked && a.pos !== b.pos) return b.pos - a.pos // 2) 가장 최근 배운 레슨
      if (a.solved !== b.solved) return b.solved - a.solved              // 3) 마무리 가까운 거
      return a.pos - b.pos                                               // 4) 커리큘럼 순서
    })
  const nextCluster = withProgress[0]?.c
  const otherActive = activeClusters.filter(c => c !== nextCluster)

  const renderSmallCard = (cluster: PracticeCluster, accent = false) => {
    const solved = cluster.problems.filter(p => solvedSet.has(p.id)).length
    const locCluster = localizeCluster(cluster, locale)
    return (
      <button
        key={cluster.id}
        onClick={() => onSelect(cluster)}
        className={cn(
          "w-full rounded-2xl border p-3 text-left transition-all flex items-center gap-3",
          accent
            ? "bg-white border-amber-200 hover:border-amber-400 shadow-sm"
            : "bg-white border-gray-200 hover:border-purple-300 shadow-sm"
        )}
      >
        <span className="text-xl shrink-0">{cluster.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{locCluster.title}</p>
          {solved > 0 && (
            <p className="text-xs text-gray-400">{solved}{t("문제 완료", " done")}</p>
          )}
        </div>
        <span className="text-gray-300 text-sm shrink-0">→</span>
      </button>
    )
  }

  // 모드 토글 — 수업별 연습 ↔ 🎯 KL 문제 (필터, 페이지 이동 X)
  return (
    <div className="flex flex-col gap-4 pb-24">

      {/* 헤더 — 제목(좌) + 언어 토글(우측 상단, 위치 통일) */}
      <div className="flex items-start gap-3">
        <button onClick={onBack} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{t("코딩 연습", "Practice")}</h1>
          <p className="text-sm text-gray-400 mt-0.5">{t("문제를 풀면 알고리즘 학습이 열려요", "Solve problems to unlock algorithm study")}</p>
        </div>
        {/* 언어 토글 — 우측 상단 */}
        <div className="flex gap-1 shrink-0">
          {(["python", "cpp"] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-bold transition-all",
                lang === l
                  ? (l === "cpp" ? "bg-blue-600 text-white shadow-sm" : "bg-orange-500 text-white shadow-sm")
                  : "bg-white text-gray-500 hover:bg-gray-50"
              )}
            >
              {l === "cpp" ? "⚡ C++" : "🐍 Python"}
            </button>
          ))}
        </div>
      </div>

      {/* ⭐ 적응형: 수업별+KL 합친 "다음 1개" + 📊 내 실력 (탭 고르기 없음) */}
      <AdaptivePanel lang={lang} solvedSet={solvedSet} starredSet={starredSet} />

    </div>
  )
}

// ── 문제 목록 ──────────────────────────────────────────────────────
function ProblemList({
  cluster,
  onBack,
  onSelect,
  onStartSession,
  solvedSet,
  starredSet,
}: {
  cluster: PracticeCluster
  onBack: () => void
  onSelect: (problem: PracticeProblem) => void
  onStartSession: () => void
  solvedSet: Set<string>
  starredSet: Set<string>
}) {
  const { t, lang: locale } = useLanguage()
  const diffLabel = (d: string) =>
    d === "쉬움" ? t("쉬움", "Easy") :
    d === "보통" ? t("보통", "Medium") :
    t("어려움", "Hard")
  const solvedCount = cluster.problems.filter(p => solvedSet.has(p.id)).length
  const isAllMcq = cluster.problems.every(p => p.type === "mcq")
  const locCluster = localizeCluster(cluster, locale)

  // 난이도 필터 — 잘하는 학생이 바로 어려움으로 점프 (쉬운 것만 보이는 문제 해소)
  const [diffFilter, setDiffFilter] = useState<"전체" | "쉬움" | "보통" | "어려움">("전체")
  const diffCounts: Record<string, number> = { 쉬움: 0, 보통: 0, 어려움: 0 }
  cluster.problems.forEach(p => { diffCounts[p.difficulty] = (diffCounts[p.difficulty] ?? 0) + 1 })
  const passDiff = (p: PracticeProblem) => diffFilter === "전체" || p.difficulty === diffFilter

  return (
    <div className="flex flex-col gap-4 pb-24">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900">{cluster.emoji} {locCluster.title}</h1>
          <p className="text-gray-400 text-xs">{solvedCount}/{cluster.problems.length} {t("문제 완료", "solved")}</p>
        </div>
      </div>

      {/* 연속 풀기 버튼 */}
      <button
        onClick={onStartSession}
        className="w-full py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
      >
        ▶ {isAllMcq ? t("연속으로 풀기", "Play all") : t("순서대로 풀기", "Start in order")}
        <span className="text-purple-200 font-normal text-xs">({cluster.problems.length} {t("문제 고정 순서", "problems · fixed order")})</span>
      </button>

      {/* 난이도 필터 칩 — 2개 이상 난이도가 있을 때만 */}
      {(() => {
        const diffs = (["쉬움", "보통", "어려움"] as const).filter(d => diffCounts[d] > 0)
        if (diffs.length < 2) return null
        const chip = (key: typeof diffFilter, label: string) => (
          <button
            key={key}
            onClick={() => setDiffFilter(key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
              diffFilter === key
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            )}
          >
            {label}
          </button>
        )
        return (
          <div className="flex flex-wrap gap-2 -mt-1">
            {chip("전체", `${t("전체", "All")} ${cluster.problems.length}`)}
            {diffs.map(d => chip(d, `${diffLabel(d)} ${diffCounts[d]}`))}
          </div>
        )
      })()}

      {(() => {
        const mcqProblems = cluster.problems.filter(p => p.type === "mcq" && passDiff(p))
        const codeProblems = cluster.problems.filter(p => p.type !== "mcq" && passDiff(p))
        const hasBoth = mcqProblems.length > 0 && codeProblems.length > 0

        const renderProblem = (problem: PracticeProblem, globalIdx: number) => {
          const solved = solvedSet.has(problem.id)
          const starred = starredSet.has(problem.id)
          const locP = localizeProblem(problem, locale)
          return (
            <button
              key={problem.id}
              onClick={() => onSelect(problem)}
              className="rounded-2xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md shadow-sm p-4 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300 text-sm w-5 shrink-0">{globalIdx + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{locP.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{locP.description.split("\n")[0].replace(/\*\*/g, "")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", DIFFICULTY_COLOR[problem.difficulty])}>
                    {diffLabel(problem.difficulty)}
                  </span>
                  {starred
                    ? <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    : solved && <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  }
                </div>
              </div>
            </button>
          )
        }

        if (!hasBoth) {
          const list = cluster.problems.filter(passDiff)
          if (list.length === 0) {
            return <p className="text-gray-400 text-sm text-center py-6">{t("해당 난이도 문제가 없어요.", "No problems at this level.")}</p>
          }
          return list.map((p, i) => renderProblem(p, i))
        }

        return (
          <>
            {/* MCQ 섹션 */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                {t("🎯 이해 확인", "🎯 Concept Check")}
              </span>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300">{mcqProblems.length}{t("문제", " problems")}</span>
            </div>
            {mcqProblems.map((p, i) => renderProblem(p, i))}

            {/* 코드 섹션 구분선 */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-purple-500 uppercase tracking-wide">
                {t("💪 직접 구현하기", "💪 Write the Code")}
              </span>
              <div className="flex-1 h-px bg-purple-100" />
              <span className="text-xs text-purple-300">{codeProblems.length}{t("문제", " problems")}</span>
            </div>
            <div className="rounded-xl bg-purple-50 border border-purple-100 px-3 py-2 text-xs text-purple-600">
              {t(
                "위에서 눈으로 익힌 개념을 이제 직접 코드로 써보세요!",
                "You've seen how it works — now write the code yourself!"
              )}
            </div>
            {codeProblems.map((p, i) => renderProblem(p, mcqProblems.length + i))}
          </>
        )
      })()}

      {/* 코딩 뱅크 클러스터일 때 실전 문제 추천 */}
      {BANK_CLUSTERS.some(b => b.id === cluster.id) && (
        <ContestProblemsSection
          clusterId={cluster.id}
          solvedCount={solvedCount}
          totalCount={cluster.problems.length}
        />
      )}
    </div>
  )
}

// ── 실전 대회 문제 추천 섹션 ───────────────────────────────────────
function ContestProblemsSection({
  clusterId,
  solvedCount,
  totalCount,
}: {
  clusterId: string
  solvedCount: number
  totalCount: number
}) {
  const { t } = useLanguage()
  const links = getContestLinks(clusterId)
  if (!links) return null

  // Show after solving at least 30% of the cluster
  const THRESHOLD = Math.max(1, Math.floor(totalCount * 0.3))
  if (solvedCount < THRESHOLD) return null

  const DIFF_LABEL: Record<ContestProblem["difficulty"], string> = {
    easy: t("쉬움", "Easy"),
    medium: t("보통", "Medium"),
  }
  const DIFF_COLOR: Record<ContestProblem["difficulty"], string> = {
    easy: "text-emerald-700 bg-emerald-100",
    medium: "text-amber-700 bg-amber-100",
  }

  return (
    <div className="mt-6">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-bold text-gray-700">
          {t("실전 대회 문제 도전", "Try Competition Problems")}
        </span>
        <div className="flex-1 h-px bg-amber-100" />
      </div>
      <p className="text-xs text-gray-400 mb-3">
        {t(
          "이 클러스터를 충분히 연습했어요! 배운 스킬로 도전해볼 수 있는 USACO/MCC 문제예요.",
          "Great practice! Here are USACO/MCC problems you can tackle with what you've learned."
        )}
      </p>

      <div className="flex flex-col gap-2">
        {links.problems.map(p => (
          <a
            key={p.id}
            href={codeQuestUrl(p.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-all p-3 text-left flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", DIFF_COLOR[p.difficulty])}>
                  {DIFF_LABEL[p.difficulty]}
                </span>
                <span className="text-xs text-gray-400">{p.source}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{p.why}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          </a>
        ))}
      </div>
    </div>
  )
}

// ── 문제 패널 (설명 + 예제) — receives already-localized problem ──
function ProblemPanel({ problem }: { problem: PracticeProblem }) {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {problem.description.replace(/\*\*/g, "")}
        </p>
        {problem.constraints && (
          <p className="text-gray-400 text-xs mt-4 pt-4 border-t border-gray-100">
            {t("제약: ", "Constraints: ")}{problem.constraints}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{t("예제", "Examples")}</p>
        {(problem.testCases ?? []).slice(0, 2).map((tc, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-200 shadow-sm p-3 text-xs font-mono">
            {tc.label && <p className="text-gray-400 mb-2">{tc.label}</p>}
            <div className="flex flex-col gap-1">
              <div>
                <span className="text-gray-400">{t("입력", "Input")}</span>
                <span className="ml-2 text-gray-700 whitespace-pre">{tc.stdin}</span>
              </div>
              <div>
                <span className="text-gray-400">{t("출력", "Output")}</span>
                <span className="ml-2 text-emerald-600 font-semibold whitespace-pre">{tc.expectedOutput}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 문제 상세 ──────────────────────────────────────────────────────
function ProblemDetail({
  problem,
  onBack,
  onMarkSolved,
  onMarkStarred,
}: {
  problem: PracticeProblem
  onBack: () => void
  onMarkSolved: (problemId: string) => Promise<void>
  onMarkStarred: (problemId: string) => Promise<void>
}) {
  const { t, lang: locale } = useLanguage()
  const [tab, setTab] = useState<"problem" | "code">("problem")
  const locProblem = localizeProblem(problem, locale)
  const isMcq = problem.type === "mcq"
  const diffLabel = (d: string) =>
    d === "쉬움" ? t("쉬움", "Easy") :
    d === "보통" ? t("보통", "Medium") :
    t("어려움", "Hard")

  const handleSuccess = async (starred: boolean) => {
    await onMarkSolved(problem.id)
    if (starred) await onMarkStarred(problem.id)
    try { localStorage.setItem("practice-last-problem", problem.id) } catch {} // 마지막에 푼 문제 기록
  }

  // ── MCQ: 단일 컬럼 레이아웃 ──
  if (isMcq) {
    return (
      <div className="pb-24 md:pb-6">
        {/* 헤더 행 */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <h1 className="text-base font-bold text-gray-900 truncate">{locProblem.title}</h1>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", DIFFICULTY_COLOR[problem.difficulty])}>
              {diffLabel(problem.difficulty)}
            </span>
          </div>
        </div>
        <div className="max-w-xl">
          <McqRunner problem={locProblem} onSuccess={handleSuccess} />
        </div>
      </div>
    )
  }

  // ── 코드 문제: 기존 2열 레이아웃 ──
  return (
    <div className="pb-24 md:pb-6">
      {/* 헤더 행 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base font-bold text-gray-900 truncate">{locProblem.title}</h1>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", DIFFICULTY_COLOR[problem.difficulty])}>
            {diffLabel(problem.difficulty)}
          </span>
        </div>
      </div>

      {/* 모바일 탭 */}
      <div className="flex md:hidden bg-gray-100 rounded-xl p-1 mb-4">
        <button
          onClick={() => setTab("problem")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all",
            tab === "problem"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          {t("문제", "Problem")}
        </button>
        <button
          onClick={() => setTab("code")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all",
            tab === "code"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          <Code2 className="w-3.5 h-3.5" />
          {t("코드", "Code")}
        </button>
      </div>

      {/* 콘텐츠 영역 — 모바일: 탭 / 데스크탑: 2열 */}
      <div className="md:grid md:grid-cols-[1fr_1.15fr] md:gap-6 md:h-[calc(100vh-140px)]">

        {/* 좌측: 문제 패널 */}
        <div className={cn(
          "md:overflow-y-auto md:pr-1",
          tab === "code" ? "hidden md:block" : "block"
        )}>
          <ProblemPanel problem={locProblem} />
        </div>

        {/* 우측: 코드 패널 */}
        <div className={cn(
          "md:overflow-y-auto",
          tab === "problem" ? "hidden md:block" : "block"
        )}>
          {/* key 에 locale 포함 — 언어 전환 시 re-mount 강제 (useState 초기값 재계산) */}
          <PracticeRunner key={`${problem.id}-${locale}`} problem={locProblem} onSuccess={handleSuccess} />
        </div>

      </div>
    </div>
  )
}

// ── 메인 컨텐츠 ───────────────────────────────────────────────────
function PracticeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { solvedSet, starredSet, markSolved, markStarred } = usePracticeProgress()
  const { user, profile } = useAuth()
  const isTeacher = useEffectiveIsTeacher()
  const { lang: uiLang } = useLanguage()
  const [lang, setLang] = useState<Lang>((searchParams.get("lang") as Lang) || "cpp")

  const clusterId = searchParams.get("cluster") || ""
  const problemId = searchParams.get("problem") || ""
  const fromParam = searchParams.get("from") || ""

  const setParam = (key: string, value: string | null) => {
    const p = new URLSearchParams(searchParams.toString())
    if (value) p.set(key, value); else p.delete(key)
    router.push(`/practice?${p.toString()}`)
  }

  const handleLangChange = (l: Lang) => {
    setLang(l)
    const p = new URLSearchParams(searchParams.toString())
    p.set("lang", l)
    p.delete("cluster")
    p.delete("problem")
    router.push(`/practice?${p.toString()}`)
  }

  const cluster = ALL_CLUSTERS.find(c => c.id === clusterId)
  const problem = cluster?.problems.find(p => p.id === problemId)
  const sessionMode = searchParams.get("session") === "1"

  // cluster 없이 직접 /practice 접근하면 ClusterList 표시 (아래 fallback return).
  // 이전엔 /curriculum 으로 redirect 했었음 — 하단 메뉴 '도전' 탭이 작동 안 함.

  const handleClusterBack = () => {
    if (fromParam === "lesson" || fromParam === "curriculum") {
      router.back()
    } else {
      router.push("/curriculum")
    }
  }

  // cluster가 URL에 있지만 session 없으면 → 자동으로 세션 모드 진입 (useEffect로 이동 — render 중 router 호출 금지)
  const needsSessionRedirect = !!(cluster && !sessionMode && !problem)
  useEffect(() => {
    if (!needsSessionRedirect) return
    const p = new URLSearchParams(searchParams.toString())
    p.set("session", "1")
    router.replace(`/practice?${p.toString()}`)
  }, [needsSessionRedirect, router]) // eslint-disable-line react-hooks/exhaustive-deps
  if (needsSessionRedirect) return null

  // 세션 모드: 클러스터 내 문제를 연속으로 풀기
  if (sessionMode && cluster) {
    // Smart-Next 기반 다음 활동 — 단순히 "다음 레슨" 보다 풍부 (Part / 이모지 / 트랙 졸업)
    const completedNow = getCompletedLessons()
    // 이 클러스터를 푼 직후 추천이라고 가정 → unlockAfter 레슨까지는 완료 처리
    completedNow.add(cluster.unlockAfter)
    const clusterLang: "python" | "cpp" | "pseudo" =
      String(cluster.unlockAfter).startsWith("cpp") ? "cpp"
      : String(cluster.unlockAfter).startsWith("pseudo") || String(cluster.unlockAfter).startsWith("igcse") ? "pseudo"
      : "python"
    const smart = getSmartNext(completedNow, clusterLang)
    // 레슨 추천일 때만 풍부 라벨 사용 (algo / complete 는 폴백)
    const isLessonRec = smart.type === "lesson"
    const nextLessonHref = isLessonRec
      ? smart.href
      : (getNextLessonId(cluster.unlockAfter) ? `/learn/${getNextLessonId(cluster.unlockAfter)}` : undefined)
    const nextLessonLabel = isLessonRec
      ? `${smart.emoji ?? "▶"} ${uiLang === "en" ? smart.titleEn : smart.title}`
      : undefined
    const nextLessonSubtitle = isLessonRec ? smart.subtitle : undefined

    return (
      <PracticeSession
        cluster={cluster}
        solvedSet={solvedSet}
        onExit={handleClusterBack}
        onMarkSolved={markSolved}
        onMarkStarred={markStarred}
        userId={user?.id}
        isTeacher={isTeacher}
        nextLessonHref={nextLessonHref}
        nextLessonLabel={nextLessonLabel}
        nextLessonSubtitle={nextLessonSubtitle}
      />
    )
  }

  if (problem && cluster) {
    return (
      <main className="max-w-5xl mx-auto px-4 pt-4">
        <ProblemDetail
          problem={problem}
          onBack={() => {
            // 사다리/대회대비에서 연 단일 문제 → 끝내면 목록으로 (cluster만 남기면 세션 인트로로 튕김)
            if (fromParam === "practice" || fromParam === "kl") {
              const p = new URLSearchParams()
              const l = searchParams.get("lang"); if (l) p.set("lang", l)
              router.push(p.toString() ? `/practice?${p.toString()}` : "/practice")
            } else {
              setParam("problem", null)
            }
          }}
          onMarkSolved={markSolved}
          onMarkStarred={markStarred}
        />
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-4">
      <JourneyBreadcrumb items={[
        { label: "연습 (수업별 클러스터)", labelEn: "Practice (per-lesson clusters)", emoji: "💪" },
      ]} />
      <ClusterList
        onSelect={c => {
          // 클러스터 클릭 → 바로 세션 모드 진입
          const p = new URLSearchParams(searchParams.toString())
          p.set("cluster", c.id)
          p.set("session", "1")
          router.push(`/practice?${p.toString()}`)
        }}
        solvedSet={solvedSet}
        starredSet={starredSet}
        lang={lang}
        onLangChange={handleLangChange}
        isTeacher={isTeacher}
        initialKl={searchParams.get("view") === "kl"}
        onBack={() => {
          if (fromParam === "lesson" || fromParam === "curriculum") {
            router.back()
          } else {
            router.push("/curriculum")
          }
        }}
      />
    </main>
  )
}

export default function PracticePage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <Suspense fallback={<div className="text-gray-400 text-sm p-4">Loading...</div>}>
          <PracticeContent />
        </Suspense>
        <BottomNav />
      </div>
    </RequireAuth>
  )
}
