"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { ChevronLeft, ChevronRight, CheckCircle, ExternalLink } from "lucide-react"
import { ALL_PROBLEMS, PROBLEM_MAP, PROBLEM_INDEX, type ProblemMeta } from "./data"

const STORAGE_KEY = "quest-solved"

function useQuestSolved(problemId: string) {
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
      setSolved(stored.includes(problemId))
    } catch { /* ignore */ }
  }, [problemId])

  const markSolved = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[]
      if (!stored.includes(problemId)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, problemId]))
      }
      setSolved(true)
    } catch { /* ignore */ }
  }

  return { solved, markSolved }
}

function ComingSoonPlaceholder({ meta }: { meta: ProblemMeta }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 text-center">
      <div className="text-6xl">{meta.emoji}</div>
      <div>
        <div className="text-xl font-black text-gray-800 mb-1">{meta.title}</div>
        <div className="text-sm font-semibold text-gray-500">{meta.sub}</div>
      </div>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-6 py-4 max-w-sm">
        <div className="text-sm font-bold text-blue-600 mb-2">튜토리얼 준비 중 🚧</div>
        <div className="text-xs text-blue-500 leading-relaxed">
          이 문제의 인터랙티브 풀이 튜토리얼을 준비하고 있어요.
          지금 바로 풀어보고 싶다면 CodeQuest를 방문하세요!
        </div>
      </div>
      <a
        href="https://codequest.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-black bg-blue-600 text-white text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
      >
        <ExternalLink size={16} />
        CodeQuest에서 풀기
      </a>
    </div>
  )
}

export default function QuestProblemClient({ problemId }: { problemId: string }) {
  const router = useRouter()
  const meta = PROBLEM_MAP.get(problemId)
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
          <div className="text-lg font-bold text-gray-700">문제를 찾을 수 없어요</div>
          <Link href="/quest" className="text-sm text-blue-600 font-semibold underline">
            문제 목록으로 돌아가기
          </Link>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-lg mx-auto w-full pb-24">

        {/* Sticky header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-[57px] z-30">
          <div className="flex items-center gap-2">
            <Link href="/quest" className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <ChevronLeft size={20} />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-800 text-sm truncate">{meta.title}</div>
              <div className="text-xs text-gray-500">{meta.sub}</div>
            </div>
            {solved && (
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold flex-shrink-0">
                <CheckCircle size={14} />
                완료
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          <ComingSoonPlaceholder meta={meta} />
        </div>

        {/* Mark complete */}
        {!solved && (
          <div className="px-4 pb-4">
            <button
              onClick={markSolved}
              className="w-full py-3 rounded-xl border-2 border-black bg-green-500 text-white font-bold text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              ✅ 완료 표시
            </button>
          </div>
        )}

        {/* Prev / Next */}
        <div className="flex gap-3 px-4 pb-4">
          {prevProblem ? (
            <button
              onClick={() => router.push(`/quest/${prevProblem.id}`)}
              className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-black bg-white text-sm font-bold text-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
            >
              <ChevronLeft size={16} />
              <div className="text-left min-w-0">
                <div className="text-xs text-gray-400">이전</div>
                <div className="truncate text-xs">{prevProblem.title}</div>
              </div>
            </button>
          ) : <div className="flex-1" />}

          {nextProblem ? (
            <button
              onClick={() => router.push(`/quest/${nextProblem.id}`)}
              className="flex-1 flex items-center justify-end gap-2 px-3 py-2.5 rounded-xl border-2 border-black bg-white text-sm font-bold text-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
            >
              <div className="text-right min-w-0">
                <div className="text-xs text-gray-400">다음</div>
                <div className="truncate text-xs">{nextProblem.title}</div>
              </div>
              <ChevronRight size={16} />
            </button>
          ) : <div className="flex-1" />}
        </div>

      </main>
      <BottomNav />
    </div>
  )
}
