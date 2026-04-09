"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { ALL_TOPICS } from "@/data/algorithm/topics"
import type { AlgoTopic, AlgoProblem, Track } from "@/data/algorithm/types"
import { AlgoSidebar } from "@/components/algorithm/AlgoSidebar"
import { TopicPage } from "@/components/algorithm/TopicPage"
import { ProblemPage } from "@/components/algorithm/ProblemPage"
import { LanguageToggle } from "@/components/language-toggle"

// Python 트랙에서 보여줄 토픽
const PYTHON_TOPIC_IDS = new Set([
  'sorting','string','array','prefixsum','recursion',
  'stackqueue','hashtable','binarysearch','greedy','dp'
])

function AlgorithmContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [userTrack, setUserTrack] = useState<'python' | 'cpp'>('cpp')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const topicId = searchParams.get("topic") || ""
  const problemId = searchParams.get("problem") || ""

  // 트랙 감지 (localStorage completedLessons 기반)
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]") as string[]
    const hasCpp = completed.some(id => String(id).startsWith("cpp-"))
    setUserTrack(hasCpp ? 'cpp' : 'python')
  }, [])

  const visibleTopics = ALL_TOPICS
    .filter(t => userTrack === 'cpp' || PYTHON_TOPIC_IDS.has(t.id))
    .sort((a, b) => a.order - b.order)

  const currentTopic = visibleTopics.find(t => t.id === topicId) ?? visibleTopics[0]
  const currentProblem = problemId
    ? currentTopic?.problems.find(p => p.id === problemId)
    : null

  function navigate(params: { topic?: string; problem?: string }) {
    const p = new URLSearchParams()
    if (params.topic) p.set("topic", params.topic)
    if (params.problem) p.set("problem", params.problem)
    router.push(`/algorithm?${p.toString()}`)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 56px - 64px)' }}>
        {/* 사이드바 오버레이 (모바일) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 사이드바 */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col overflow-hidden
          top-14
        `}>
          <AlgoSidebar
            topics={visibleTopics}
            currentTopicId={currentTopic?.id ?? ""}
            currentProblemId={problemId}
            userTrack={userTrack}
            onSelectTopic={id => navigate({ topic: id })}
            onSelectProblem={(topicId, problemId) => navigate({ topic: topicId, problem: problemId })}
          />
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          {/* 모바일 토픽 헤더 */}
          <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              ☰
            </button>
            <span className="font-bold text-sm text-gray-800 truncate flex-1">
              {currentTopic?.icon} {currentTopic?.title}
            </span>
            <LanguageToggle />
          </div>

          {currentProblem && currentTopic ? (
            <ProblemPage
              topic={currentTopic}
              problem={currentProblem}
              onBack={() => navigate({ topic: currentTopic.id })}
            />
          ) : currentTopic ? (
            <TopicPage
              topic={currentTopic}
              onSelectProblem={problemId => navigate({ topic: currentTopic.id, problem: problemId })}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              토픽을 선택하세요
            </div>
          )}
        </main>
      </div>

      <BottomNav />
    </div>
  )
}

export default function AlgorithmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-bounce">🧩</div>
      </div>
    }>
      <AlgorithmContent />
    </Suspense>
  )
}
