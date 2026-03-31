"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { AlgoTopic } from "@/data/algorithm/types"

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

  const grouped = CATEGORY_ORDER.reduce<Record<string, AlgoTopic[]>>((acc, cat) => {
    acc[cat] = topics.filter(t => t.category === cat)
    return acc
  }, {})

  return (
    <div className="flex flex-col h-full">
      {/* 트랙 뱃지 */}
      <div className="px-3 py-2.5 border-b border-gray-100">
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-full",
          userTrack === 'cpp'
            ? "bg-blue-100 text-blue-700"
            : "bg-orange-100 text-orange-700"
        )}>
          {userTrack === 'cpp' ? '⚡ C++ 트랙 — 21개 토픽' : '🐍 Python 트랙 — 10개 토픽'}
        </span>
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
                      <span className="text-[10px] text-gray-400">{topic.problems.length}</span>
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
                              return (
                                <button
                                  key={pid}
                                  onClick={() => onSelectProblem(topic.id, pid)}
                                  className={cn(
                                    "w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors",
                                    isActiveProblem
                                      ? "bg-orange-100 text-orange-700 font-semibold"
                                      : "text-gray-600 hover:bg-gray-50"
                                  )}
                                >
                                  <span className={cn(
                                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                    DIFFICULTY_COLOR[problem.difficulty] ?? 'bg-gray-300'
                                  )} />
                                  <span className="truncate">{problem.title.replace(/^BOJ \d+ - |^LC \d+ - /, '')}</span>
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
