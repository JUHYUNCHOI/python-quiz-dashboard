"use client"

/**
 * 정렬문제 풀이 — /algo/graph/practice
 *
 * URL ?p=<problemId> 가 있으면 해당 문제의 PracticeRunner 표시.
 * 없으면 12 문제 리스트 표시.
 */

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { PracticeRunner } from "@/components/practice/practice-runner"
import { JourneyBreadcrumb } from "@/components/journey-breadcrumb"
import { graphContestCluster } from "@/data/practice/algo-graph-contest"
import React from "react"

const SOLVED_KEY = "algo-graph-contest-solved"

function getSolvedSet(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(SOLVED_KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

const DIFFICULTY_COLORS: Record<string, string> = {
  쉬움: "bg-emerald-100 text-emerald-700 border-emerald-200",
  보통: "bg-amber-100 text-amber-700 border-amber-200",
  어려움: "bg-red-100 text-red-700 border-red-200",
}

// 인라인 마크다운: **bold**, `code` 파싱
function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g).map((seg, j) => {
    if (seg.startsWith("**") && seg.endsWith("**"))
      return <strong key={j} className="font-semibold text-gray-900">{seg.slice(2, -2)}</strong>
    if (seg.startsWith("`") && seg.endsWith("`"))
      return <code key={j} className="bg-gray-100 text-purple-600 rounded px-1 py-0.5 font-mono text-[13px]">{seg.slice(1, -1)}</code>
    return <span key={j}>{seg}</span>
  })
}

function DescriptionBlock({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  return (
    <div className="flex flex-col gap-2">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const code = part.replace(/^```[^\n]*\n?/, "").replace(/```$/, "").trim()
          return (
            <pre key={i} className="rounded-lg bg-[#1a1b2e] px-4 py-3 font-mono text-sm text-[#cdd6f4] overflow-x-auto whitespace-pre">
              {code}
            </pre>
          )
        }
        return (
          <p key={i} className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {renderInline(part)}
          </p>
        )
      })}
    </div>
  )
}

export default function SortingPracticePage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    setSolvedSet(getSolvedSet())
  }, [])

  const problemId = searchParams.get("p")
  const problem = problemId ? graphContestCluster.problems.find(p => p.id === problemId) : null

  const toggleSolved = (id: string) => {
    const next = new Set(solvedSet)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSolvedSet(next)
    try { localStorage.setItem(SOLVED_KEY, JSON.stringify([...next])) } catch {}
  }

  const handleSolved = () => {
    const next = new Set(solvedSet)
    if (problemId) next.add(problemId)
    setSolvedSet(next)
    try {
      localStorage.setItem(SOLVED_KEY, JSON.stringify([...next]))
    } catch {}
  }

  // 단일 문제 풀이 화면
  if (problem) {
    const problemIdx = graphContestCluster.problems.findIndex(p => p.id === problem.id) + 1
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <Header />
        <main className="max-w-5xl mx-auto px-4 pt-4">
          <div className="mb-3 flex items-center gap-2">
            <button
              onClick={() => router.push("/algo/graph/practice")}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" /> {t("문제 목록", "Problem list")}
            </button>
          </div>

          {/* 문제 번호 + 난이도 + 제목 */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-bold text-gray-400">#{problemIdx}</span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium border",
              DIFFICULTY_COLORS[problem.difficulty] ?? DIFFICULTY_COLORS["보통"]
            )}>
              {problem.difficulty}
            </span>
            <h2 className="text-base font-bold text-gray-900">
              {t(problem.title, problem.en?.title ?? problem.title)}
            </h2>
          </div>

          {/* 문제 설명 + 제약 + 예시 I/O */}
          {problem.description && (
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-5 py-4 mb-3">
              <DescriptionBlock text={problem.description} />
              {problem.constraints && (
                <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-gray-100">
                  {problem.constraints}
                </p>
              )}
              {problem.testCases && problem.testCases.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                    {t("예시 입출력", "Sample I/O")}
                  </p>
                  <div className="flex flex-col gap-2">
                    {problem.testCases.slice(0, 2).map((tc, i) => (
                      <div key={i} className="flex gap-2 font-mono text-xs">
                        <div className="flex-1 min-w-0 bg-gray-50 rounded-lg px-3 py-2">
                          <div className="text-gray-400 mb-1">{t("입력", "Input")}</div>
                          <pre className="whitespace-pre-wrap break-all text-gray-700">{tc.stdin || t("(없음)", "(none)")}</pre>
                        </div>
                        <div className="flex-1 min-w-0 bg-gray-50 rounded-lg px-3 py-2">
                          <div className="text-gray-400 mb-1">{t("출력", "Output")}</div>
                          <pre className="whitespace-pre-wrap break-all text-emerald-600 font-semibold">{tc.expectedOutput}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <PracticeRunner problem={problem} onSuccess={handleSolved} />
        </main>
        <BottomNav />
      </div>
    )
  }

  // 리스트 화면
  const totalSolved = graphContestCluster.problems.filter(p => solvedSet.has(p.id)).length
  const total = graphContestCluster.problems.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 pb-24">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-4">
        <div className="mb-4">
          <JourneyBreadcrumb items={[
            { label: "알고리즘", labelEn: "Algorithms", href: "/algo", emoji: "🧩" },
            { label: "그래프", labelEn: "Graph", href: "/algo/graph", emoji: "📊" },
            { label: "문제 풀이", labelEn: "Practice" },
          ]} />
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{graphContestCluster.emoji}</span>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {t(graphContestCluster.title, graphContestCluster.en?.title ?? graphContestCluster.title)}
            </h1>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {t(graphContestCluster.description, graphContestCluster.en?.description ?? graphContestCluster.description)}
          </p>

          {/* 진도바 */}
          <div className="bg-white rounded-xl border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-600">
                {t("진도", "Progress")}
              </span>
              <span className="text-xs font-bold text-emerald-700 tabular-nums">
                {totalSolved} / {total}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500"
                style={{ width: `${(totalSolved / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 🌱 패턴 적용 (보통) + 🏆 응용 도전 (어려움) — 2 섹션 */}
        {(() => {
          const warmup = graphContestCluster.problems.filter(p => p.difficulty === "쉬움")
          const easy = graphContestCluster.problems.filter(p => p.difficulty === "보통")
          const hard = graphContestCluster.problems.filter(p => p.difficulty === "어려움")
          const renderItem = (p: any) => {
            const isSolved = solvedSet.has(p.id)
            const globalIdx = graphContestCluster.problems.findIndex(pp => pp.id === p.id) + 1
            return (
              <Link
                key={p.id}
                href={`/algo/graph/practice?p=${p.id}`}
                className={cn(
                  "block bg-white rounded-xl border-2 p-3 transition-all hover:shadow-md hover:border-orange-300 active:scale-[0.99]",
                  isSolved ? "border-emerald-200 bg-emerald-50/30" : "border-gray-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0",
                    isSolved ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    {isSolved ? <CheckCircle2 className="w-5 h-5" /> : globalIdx}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">
                      {t(p.title, p.en?.title ?? p.title)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded font-bold border",
                        DIFFICULTY_COLORS[p.difficulty] ?? DIFFICULTY_COLORS["보통"]
                      )}>
                        {p.difficulty}
                      </span>
                    </div>
                  </div>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={isSolved ? "완료 해제" : "완료 체크"}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSolved(p.id) }}
                    className={cn(
                      "shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-black transition-colors cursor-pointer",
                      isSolved ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300 text-transparent hover:border-emerald-400 hover:text-emerald-400"
                    )}
                  >✓</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                </div>
              </Link>
            )
          }
          return (
            <>
              {warmup.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-sm font-black text-green-700">🟢 {t("워밍업", "Warm-up")}</span>
                    <span className="text-[11px] text-gray-500">{t("— 가볍게 시작 (쉬움)", "— gentle start (easy)")}</span>
                  </div>
                  <div className="space-y-2">
                    {warmup.map(renderItem)}
                  </div>
                </div>
              )}
              {easy.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-sm font-black text-emerald-700">🌱 {t("패턴 적용", "Pattern Application")}</span>
                    <span className="text-[11px] text-gray-500">{t("— 방금 배운 거 따라 한 번 더 (보통)", "— apply what you learned (medium)")}</span>
                  </div>
                  <div className="space-y-2">
                    {easy.map(renderItem)}
                  </div>
                </div>
              )}
              {hard.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-sm font-black text-amber-700">🏆 {t("응용 도전", "Challenge")}</span>
                    <span className="text-[11px] text-gray-500">{t("— Bronze/Silver 급 응용 (어려움)", "— Bronze/Silver level (hard)")}</span>
                  </div>
                  <div className="space-y-2">
                    {hard.map(renderItem)}
                  </div>
                </div>
              )}
            </>
          )
        })()}

        <p className="text-[11px] text-gray-400 text-center mt-6">
          {t(
            "문제 출처: BOJ / LeetCode / Codeforces / 원본 — paraphrased",
            "Sources: BOJ / LeetCode / Codeforces / Original — paraphrased"
          )}
        </p>
      </main>
      <BottomNav />
    </div>
  )
}
