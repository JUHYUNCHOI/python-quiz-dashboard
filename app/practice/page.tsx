"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { RequireAuth } from "@/components/require-auth"
import { PracticeRunner } from "@/components/practice/practice-runner"
import { ALL_CLUSTERS } from "@/data/practice"
import type { PracticeCluster, PracticeProblem } from "@/data/practice/types"
import { usePracticeProgress } from "@/hooks/use-practice-progress"
import { ArrowLeft, Lock, CheckCircle2, Star, FileText, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Lang = "cpp" | "python"

function getClusterLang(cluster: PracticeCluster): Lang {
  return String(cluster.unlockAfter).startsWith("cpp") ? "cpp" : "python"
}

const CPP_CLUSTERS = ALL_CLUSTERS.filter(c => getClusterLang(c) === "cpp")
const PYTHON_CLUSTERS = ALL_CLUSTERS.filter(c => getClusterLang(c) === "python")

const DIFFICULTY_COLOR: Record<string, string> = {
  "쉬움": "text-emerald-700 bg-emerald-100",
  "보통": "text-amber-700 bg-amber-100",
  "어려움": "text-red-700 bg-red-100",
}

function isClusterUnlocked(cluster: PracticeCluster): boolean {
  if (typeof window === "undefined") return false
  try {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[]
    return completed.includes(cluster.unlockAfter)
  } catch { return false }
}

// ── 클러스터 목록 ──────────────────────────────────────────────────
function ClusterList({
  onSelect,
  solvedSet,
  starredSet,
  lang,
  onLangChange,
}: {
  onSelect: (cluster: PracticeCluster) => void
  solvedSet: Set<string>
  starredSet: Set<string>
  lang: Lang
  onLangChange: (lang: Lang) => void
}) {
  const clusters = lang === "cpp" ? CPP_CLUSTERS : PYTHON_CLUSTERS
  const langLabel = lang === "cpp" ? "C++ 레슨" : "Python 레슨"

  return (
    <div className="flex flex-col gap-4 pb-24">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">코딩 연습</h1>
        <p className="text-gray-500 text-sm mt-1">{langLabel}을 완료하면 연습 문제가 열립니다</p>
      </div>

      {/* 언어 탭 */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => onLangChange("cpp")}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
            lang === "cpp" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
          )}
        >
          C++
        </button>
        <button
          onClick={() => onLangChange("python")}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
            lang === "python" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
          )}
        >
          Python
        </button>
      </div>

      {clusters.map(cluster => {
        const unlocked = isClusterUnlocked(cluster)
        const total = cluster.problems.length
        const solved = cluster.problems.filter(p => solvedSet.has(p.id)).length
        const starred = cluster.problems.filter(p => starredSet.has(p.id)).length
        return (
          <button
            key={cluster.id}
            onClick={() => unlocked && onSelect(cluster)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-all",
              unlocked
                ? "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md shadow-sm"
                : "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cluster.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-900">{cluster.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cluster.description}</p>
                </div>
              </div>
              {unlocked
                ? (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {starred > 0 && (
                      <span className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />{starred}
                      </span>
                    )}
                    <span>{solved}/{total}</span>
                  </div>
                )
                : <Lock className="w-4 h-4 text-gray-300" />}
            </div>
            {unlocked && solved > 0 && (
              <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${(solved / total) * 100}%` }}
                />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ── 문제 목록 ──────────────────────────────────────────────────────
function ProblemList({
  cluster,
  onBack,
  onSelect,
  solvedSet,
  starredSet,
}: {
  cluster: PracticeCluster
  onBack: () => void
  onSelect: (problem: PracticeProblem) => void
  solvedSet: Set<string>
  starredSet: Set<string>
}) {
  return (
    <div className="flex flex-col gap-4 pb-24">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{cluster.emoji} {cluster.title}</h1>
          <p className="text-gray-400 text-xs">{cluster.problems.length}문제</p>
        </div>
      </div>
      {cluster.problems.map((problem, i) => {
        const solved = solvedSet.has(problem.id)
        const starred = starredSet.has(problem.id)
        return (
          <button
            key={problem.id}
            onClick={() => onSelect(problem)}
            className="rounded-2xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md shadow-sm p-4 text-left transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-300 text-sm w-5 shrink-0">{i + 1}</span>
                <div>
                  <p className="font-medium text-gray-900">{problem.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{problem.description.split("\n")[0].replace(/\*\*/g, "")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", DIFFICULTY_COLOR[problem.difficulty])}>
                  {problem.difficulty}
                </span>
                {starred
                  ? <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  : solved && <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                }
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── 문제 패널 (설명 + 예제) ────────────────────────────────────────
function ProblemPanel({ problem }: { problem: PracticeProblem }) {
  return (
    <div className="flex flex-col gap-4">
      {/* 문제 설명 */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {problem.description.replace(/\*\*/g, "")}
        </p>
        <p className="text-gray-400 text-xs mt-4 pt-4 border-t border-gray-100">
          제약: {problem.constraints}
        </p>
      </div>

      {/* 예제 */}
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">예제</p>
        {problem.testCases.slice(0, 2).map((tc, i) => (
          <div key={i} className="rounded-xl bg-white border border-gray-200 shadow-sm p-3 text-xs font-mono">
            {tc.label && <p className="text-gray-400 mb-2">{tc.label}</p>}
            <div className="flex flex-col gap-1">
              <div>
                <span className="text-gray-400">입력</span>
                <span className="ml-2 text-gray-700 whitespace-pre">{tc.stdin}</span>
              </div>
              <div>
                <span className="text-gray-400">출력</span>
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
  const [tab, setTab] = useState<"problem" | "code">("problem")

  const handleSuccess = async (starred: boolean) => {
    await onMarkSolved(problem.id)
    if (starred) await onMarkStarred(problem.id)
  }

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
          <h1 className="text-base font-bold text-gray-900 truncate">{problem.title}</h1>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium shrink-0", DIFFICULTY_COLOR[problem.difficulty])}>
            {problem.difficulty}
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
          문제
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
          코드
        </button>
      </div>

      {/* 콘텐츠 영역 — 모바일: 탭 / 데스크탑: 2열 */}
      <div className="md:grid md:grid-cols-[1fr_1.15fr] md:gap-6 md:h-[calc(100vh-140px)]">

        {/* 좌측: 문제 패널 */}
        <div className={cn(
          "md:overflow-y-auto md:pr-1",
          tab === "code" ? "hidden md:block" : "block"
        )}>
          <ProblemPanel problem={problem} />
        </div>

        {/* 우측: 코드 패널 */}
        <div className={cn(
          "md:overflow-y-auto",
          tab === "problem" ? "hidden md:block" : "block"
        )}>
          <PracticeRunner problem={problem} onSuccess={handleSuccess} />
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

  if (problem && cluster) {
    return (
      <main className="max-w-5xl mx-auto px-4 pt-4">
        <ProblemDetail
          problem={problem}
          onBack={() => setParam("problem", null)}
          onMarkSolved={markSolved}
          onMarkStarred={markStarred}
        />
      </main>
    )
  }

  // 클러스터 목록에서 뒤로 가기: lesson에서 왔으면 커리큘럼으로, 아니면 클러스터 목록으로
  const handleClusterBack = () => {
    if (fromParam === "lesson" || fromParam === "curriculum") {
      router.push("/curriculum")
    } else {
      setParam("cluster", null)
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6">
      {cluster
        ? <ProblemList
            cluster={cluster}
            onBack={handleClusterBack}
            onSelect={p => setParam("problem", p.id)}
            solvedSet={solvedSet}
            starredSet={starredSet}
          />
        : <ClusterList
            onSelect={c => setParam("cluster", c.id)}
            solvedSet={solvedSet}
            starredSet={starredSet}
            lang={lang}
            onLangChange={handleLangChange}
          />
      }
    </main>
  )
}

export default function PracticePage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <Header />
        <Suspense fallback={<div className="text-gray-400 text-sm p-4">로딩 중...</div>}>
          <PracticeContent />
        </Suspense>
        <BottomNav />
      </div>
    </RequireAuth>
  )
}
