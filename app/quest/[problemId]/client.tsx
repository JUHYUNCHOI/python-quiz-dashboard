"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react"
import { ALL_PROBLEMS, PROBLEM_MAP, PROBLEM_INDEX, type ProblemMeta } from "./data"
import { PROBLEM_LOADERS } from "./loaders"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { ALL_TOPICS } from "@/data/algorithm/topics"

const ALGO_UNLOCK_THRESHOLD = 8

const STORAGE_KEY = "quest-solved"

function useQuestSolved(problemId: string) {
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    // 1단계: localStorage 즉시 확인
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
      if (stored.includes(problemId)) setSolved(true)
    } catch {}

    // 2단계: DB 확인 (비로그인 시 빈 배열 반환)
    fetch("/api/quest/progress")
      .then(r => r.ok ? r.json() : { solved: [] })
      .then(({ solved: dbSolved }: { solved: string[] }) => {
        if (dbSolved.includes(problemId)) setSolved(true)
        // localStorage에만 있는 항목 → DB 마이그레이션
        const lsSolved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
        const toMigrate = lsSolved.filter((id: string) => !dbSolved.includes(id))
        if (toMigrate.length > 0) {
          for (const id of toMigrate) {
            fetch("/api/quest/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ problemId: id }),
            }).catch(() => {})
          }
        }
        // localStorage 최신화
        const merged = [...new Set([...dbSolved, ...lsSolved])]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      })
      .catch(() => {})
  }, [problemId])

  const markSolved = () => {
    // 즉시 UI 반영
    setSolved(true)
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
      if (!stored.includes(problemId)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, problemId]))
      }
    } catch {}
    // DB 저장
    fetch("/api/quest/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId }),
    }).catch(() => {})
  }

  return { solved, markSolved }
}

function ProblemLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <Loader2 size={36} className="animate-spin text-purple-500" />
      <div className="text-sm font-semibold text-gray-500">튜토리얼 로딩 중...</div>
    </div>
  )
}

// Cache of lazily-created components so we don't recreate them on every render
const LAZY_CACHE = new Map<string, React.LazyExoticComponent<React.ComponentType<{ lang?: string }>>>()

function getLazyComponent(problemId: string) {
  if (LAZY_CACHE.has(problemId)) return LAZY_CACHE.get(problemId)!
  const loader = PROBLEM_LOADERS[problemId]
  if (!loader) return null
  const LazyComp = lazy(loader)
  LAZY_CACHE.set(problemId, LazyComp)
  return LazyComp
}

declare global { interface Window { _questLang?: string } }

export default function QuestProblemClient({ problemId }: { problemId: string }) {
  const router = useRouter()
  const { lang, t } = useLanguage()
  const { profile } = useAuth()
  const meta = PROBLEM_MAP.get(problemId)

  // ── 잠금 체크: 알고 토픽 8개 미만이면 /quest로 리다이렉트 ──
  const [lockChecked, setLockChecked] = useState(false)
  useEffect(() => {
    const isTeacher = profile?.role === "teacher"
    if (isTeacher) { setLockChecked(true); return }
    try {
      const algoCompleted = JSON.parse(localStorage.getItem("algo-completed") || "[]") as string[]
      const algoCompletedSet = new Set(algoCompleted)
      const topicsDone = ALL_TOPICS.filter(topic =>
        topic.problems.some((p: { id: string }) => algoCompletedSet.has(p.id))
      ).length
      if (topicsDone < ALGO_UNLOCK_THRESHOLD) {
        router.replace("/quest")
        return
      }
    } catch { /* ignore */ }
    setLockChecked(true)
  }, [profile, router])

  if (!lockChecked) return null

  // Sync synchronously so lazy-loaded App components initialize with correct lang
  if (typeof window !== "undefined") {
    window._questLang = lang
  }

  const idx = PROBLEM_INDEX.get(problemId) ?? -1
  const prevProblem = idx > 0 ? ALL_PROBLEMS[idx - 1] : null
  const nextProblem = idx < ALL_PROBLEMS.length - 1 ? ALL_PROBLEMS[idx + 1] : null
  const { solved, markSolved } = useQuestSolved(problemId)

  if (!meta) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center flex-col gap-4 p-6">
          <div className="text-4xl">🔍</div>
          <div className="text-lg font-bold text-gray-700">{t("문제를 찾을 수 없어요", "Problem not found")}</div>
          <Link href="/quest" className="text-sm text-blue-600 font-semibold underline">
            {t("문제 목록으로 돌아가기", "Back to problem list")}
          </Link>
        </main>
      </div>
    )
  }

  const LazyComp = getLazyComponent(meta.id)

  return (
    <div className="min-h-screen bg-[#f3f0ff] flex flex-col">
      <Header />

      {/* Breadcrumb: USACO · Dec 2024 Bronze #2 + done button */}
      <div className="bg-white border-b-2 border-black px-3 py-2 sticky top-[57px] z-30 flex items-center gap-2">
        <Link href="/quest" className="text-gray-400 hover:text-gray-700 flex-shrink-0">
          <ChevronLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{meta.section}</span>
          <span className="text-gray-300 mx-1.5">·</span>
          <span className="text-xs font-semibold text-gray-700 truncate">{meta.sub}</span>
        </div>
        {solved ? (
          <div className="flex items-center gap-1 bg-green-50 border border-green-300 rounded-full px-2 py-0.5 flex-shrink-0">
            <CheckCircle size={12} className="text-green-600" />
            <span className="text-xs font-bold text-green-700">{t("완료", "Done")}</span>
          </div>
        ) : (
          <button
            onClick={markSolved}
            className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border-2 border-black bg-green-400 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            ✅ {t("완료", "Done")}
          </button>
        )}
      </div>

      {/* Problem App — key=lang forces remount so useState initializer re-runs with new lang */}
      <main className="flex-1">
        {LazyComp ? (
          <Suspense fallback={<ProblemLoadingSpinner />}>
            <LazyComp key={lang} />
          </Suspense>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
            <div className="text-5xl">🚧</div>
            <div className="text-base font-bold text-gray-700">{t("튜토리얼 준비 중입니다", "Tutorial coming soon")}</div>
          </div>
        )}

        {/* Prev / Next problem — below App's own step nav */}
        <div className="flex gap-3 px-4 pt-3 pb-6 bg-white border-t-2 border-black" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
          {prevProblem ? (
            <button
              onClick={() => router.push(`/quest/${prevProblem.id}`)}
              className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-black bg-white text-sm font-bold text-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
            >
              <ChevronLeft size={16} className="flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-[10px] text-gray-400 font-medium">{t("이전 문제", "Prev problem")}</div>
                <div className="truncate text-xs font-bold">{prevProblem.title}</div>
              </div>
            </button>
          ) : <div className="flex-1" />}

          {nextProblem ? (
            <button
              onClick={() => router.push(`/quest/${nextProblem.id}`)}
              className="flex-1 flex items-center justify-end gap-2 px-3 py-2.5 rounded-xl border-2 border-black bg-white text-sm font-bold text-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
            >
              <div className="text-right min-w-0">
                <div className="text-[10px] text-gray-400 font-medium">{t("다음 문제", "Next problem")}</div>
                <div className="truncate text-xs font-bold">{nextProblem.title}</div>
              </div>
              <ChevronRight size={16} className="flex-shrink-0" />
            </button>
          ) : <div className="flex-1" />}
        </div>
      </main>
    </div>
  )
}
