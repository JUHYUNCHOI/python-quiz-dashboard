"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"
import { sortingContestCluster } from "@/data/practice/algo-sorting-contest"

const SOLVED_KEY = "algo-sorting-contest-solved"

// 🧪 프로토타입: 알고리즘 토픽 = '문제가 메인'. 설명은 문제별(풀이 화면 힌트/해설)이 진짜.
// 토픽 단위 수업은 '처음이면' 보는 가벼운 온보딩 링크로만.
export default function SortingTopicPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SOLVED_KEY)
      if (raw) setSolvedSet(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  const problems = sortingContestCluster.problems
  const total = problems.length
  const solvedCount = problems.filter(p => solvedSet.has(p.id)).length
  const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0
  const isFresh = solvedCount === 0

  const groups = [
    { key: "쉬움", ko: "🟢 쉬움", en: "🟢 Easy" },
    { key: "보통", ko: "🟡 보통", en: "🟡 Medium" },
    { key: "어려움", ko: "🔴 어려움", en: "🔴 Hard" },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-4">
        <JourneyBreadcrumb items={[
          { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
          { label: "정렬", labelEn: "Sorting" },
        ]} />

        {/* 헤더 + '처음이면 수업' 가벼운 링크 (우측) */}
        <div className="flex items-start gap-3 mb-3">
          <button onClick={() => router.push("/algo")} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span>📊</span> {t("정렬", "Sorting")}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{t("문제를 풀면서 익혀요 · 막히면 문제마다 힌트가 있어요", "Learn by solving · each problem has hints")}</p>
          </div>
          <Link
            href="/algo/sorting/learn"
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-bold hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" /> {t("수업", "Lesson")}
          </Link>
        </div>

        {/* 진행 — 얼마만큼 풀었나 */}
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 mb-4">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-gray-600">{t("문제 진행", "Problems solved")}</span>
            <span className={solvedCount > 0 ? "text-green-600" : "text-gray-400"}>✓ {solvedCount} / {total} ({pct}%)</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* 처음이면 수업부터 권유 */}
        {isFresh && (
          <Link href="/algo/sorting/learn" className="block w-full mb-4 rounded-xl border-2 border-dashed border-violet-200 bg-violet-50/50 px-4 py-3 text-sm text-violet-700 font-bold hover:bg-violet-50 transition-colors">
            👋 {t("정렬이 처음이면 — 먼저 📖 수업을 보고 오세요 →", "New to sorting? Read the 📖 lesson first →")}
          </Link>
        )}

        {/* 문제 목록 (난이도별) — 푼 건 ✓, 안 푼 건 → */}
        <div className="flex flex-col gap-4">
          {groups.map(g => {
            const items = problems.filter(p => p.difficulty === g.key)
            if (items.length === 0) return null
            const gSolved = items.filter(p => solvedSet.has(p.id)).length
            return (
              <section key={g.key}>
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                  {t(g.ko, g.en)}
                  <span className={cn("text-xs", gSolved > 0 ? "text-green-600 font-bold" : "text-gray-400")}>{gSolved}/{items.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {items.map((p, i) => {
                    const solved = solvedSet.has(p.id)
                    return (
                      <Link
                        key={p.id}
                        href={`/algo/sorting/practice?p=${p.id}`}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-all",
                          solved ? "border-green-200 bg-green-50/60" : "border-gray-200 bg-white hover:border-violet-400 hover:shadow-sm"
                        )}
                      >
                        <span className={cn("w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-black",
                          solved ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500")}>
                          {solved ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </span>
                        <span className={cn("text-sm flex-1 truncate", solved ? "text-gray-500 line-through" : "font-semibold text-gray-900")}>
                          {t(p.title, p.en?.title ?? p.title)}
                        </span>
                        {!solved && <span className="text-gray-300 shrink-0" aria-hidden>→</span>}
                      </Link>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        {/* 다 풀면 다음 토픽 */}
        {solvedCount === total && total > 0 && (
          <Link href="/algo" className="mt-5 block rounded-xl bg-amber-50 border-2 border-amber-200 px-4 py-3 text-center text-sm font-bold text-amber-800 hover:bg-amber-100 transition-colors">
            🎉 {t("정렬 문제 다 풀었어요! 다음 토픽 →", "All sorting problems done! Next topic →")}
          </Link>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
