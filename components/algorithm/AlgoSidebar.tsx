"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { AlgoTopic } from "@/data/algorithm/types"
import { useAlgoProgress } from "@/hooks/use-algo-progress"

interface Props {
  topics: AlgoTopic[]
  currentTopicId: string
  currentProblemId: string
  userTrack: 'python' | 'cpp'
  onSelectTopic: (topicId: string) => void
  onSelectProblem: (topicId: string, problemId: string) => void
}

const CATEGORY_ORDER = [
  '기초 (Bronze~Silver)',
  '자료구조 (Silver~Gold)',
  '문제 해결 기법 (Silver~Gold)',
  '고급 알고리즘 (Gold~Platinum)',
]

const DIFFICULTY_COLOR: Record<string, string> = {
  bronze:   'bg-amber-700',
  silver:   'bg-gray-400',
  gold:     'bg-yellow-400',
  platinum: 'bg-cyan-400',
  easy:     'bg-green-400',
  medium:   'bg-yellow-400',
  hard:     'bg-red-400',
}

export function AlgoSidebar({
  topics, currentTopicId, currentProblemId, userTrack,
  onSelectTopic, onSelectProblem,
}: Props) {
  const [expandedTopic, setExpandedTopic] = useState<string>(currentTopicId)
  const { isComplete, getTopicProgress } = useAlgoProgress()

  const totalProblems = topics.reduce((s, t) => s + t.problems.length, 0)
  const totalCompleted = topics.reduce((s, t) => s + getTopicProgress(t.problems.map(p => p.id)), 0)

  const grouped = CATEGORY_ORDER.reduce<Record<string, AlgoTopic[]>>((acc, cat) => {
    acc[cat] = topics.filter(t => t.category === cat)
    return acc
  }, {})

  return (
    <div className="flex flex-col h-full">
      {/* 트랙 뱃지 + 전체 진행률 */}
      <div className="px-3 py-2.5 border-b border-gray-100 space-y-2">
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          userTrack === 'cpp'
            ? "bg-blue-100 text-blue-700"
            : "bg-orange-100 text-orange-700"
        )}>
          {userTrack === 'cpp' ? '⚡ C++ 트랙 — 21개 토픽' : '🐍 Python 트랙 — 10개 토픽'}
        </span>
        {totalCompleted > 0 && (
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
              <span>전체 진행</span>
              <span>{totalCompleted}/{totalProblems}</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400 rounded-full transition-all"
                style={{ width: `${Math.round((totalCompleted / totalProblems) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 토픽 목록 */}
      <div className="flex-1 overflow-y-auto py-2">
        {CATEGORY_ORDER.map(cat => {
          const catTopics = grouped[cat]
          if (!catTopics?.length) return null
          return (
            <div key={cat}>
              <p className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                {cat}
              </p>
              {catTopics.map(topic => {
                const isActive = topic.id === currentTopicId
                const isExpanded = expandedTopic === topic.id
                const completedCount = getTopicProgress(topic.problems.map(p => p.id))
                const allDone = completedCount === topic.problems.length && topic.problems.length > 0

                return (
                  <div key={topic.id}>
                    {/* 토픽 버튼 */}
                    <button
                      onClick={() => {
                        setExpandedTopic(isExpanded ? "" : topic.id)
                        onSelectTopic(topic.id)
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-left transition-colors",
                        isActive
                          ? "bg-orange-50 text-orange-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <span className="text-base">{topic.icon}</span>
                      <span className="flex-1 text-sm font-semibold truncate">{topic.title}</span>
                      {allDone ? (
                        <span className="text-[10px] text-green-600 font-bold">✓</span>
                      ) : completedCount > 0 ? (
                        <span className="text-[10px] text-orange-500 font-bold">{completedCount}/{topic.problems.length}</span>
                      ) : (
                        <span className="text-[10px] text-gray-400">{topic.problems.length}</span>
                      )}
                      <span className={cn(
                        "text-gray-400 text-xs transition-transform duration-200",
                        isExpanded ? "rotate-90" : ""
                      )}>›</span>
                    </button>

                    {/* 문제 목록 (펼쳐지면) */}
                    {isExpanded && (
                      <div className="ml-8 border-l border-gray-100">
                        {topic.stages.map(stage => (
                          <div key={stage.num}>
                            <p className="px-2 py-1 text-[10px] text-gray-400 font-bold">
                              {stage.num}단계 · {stage.title}
                            </p>
                            {stage.problemIds.map(pid => {
                              const problem = topic.problems.find(p => p.id === pid)
                              if (!problem) return null
                              const isActiveProblem = pid === currentProblemId
                              const done = isComplete(pid)
                              return (
                                <button
                                  key={pid}
                                  onClick={() => onSelectProblem(topic.id, pid)}
                                  className={cn(
                                    "w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors",
                                    isActiveProblem
                                      ? "bg-orange-100 text-orange-700 font-semibold"
                                      : done
                                        ? "text-green-600 hover:bg-green-50"
                                        : "text-gray-600 hover:bg-gray-50"
                                  )}
                                >
                                  <span className={cn(
                                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                    done ? 'bg-green-400' : DIFFICULTY_COLOR[problem.difficulty] ?? 'bg-gray-300'
                                  )} />
                                  <span className="truncate flex-1">
                                    {done && '✓ '}
                                    {problem.title.replace(/^BOJ \d+ - |^LC \d+ - |^LeetCode \d+ - /, '')}
                                  </span>
                                  {problem.sim && (
                                    <span className="text-[9px] text-purple-500 flex-shrink-0">▶</span>
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
