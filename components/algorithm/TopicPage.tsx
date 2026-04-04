"use client"

import { cn } from "@/lib/utils"
import type { AlgoTopic } from "@/data/algorithm/types"
import { useAlgoProgress } from "@/hooks/use-algo-progress"
import { AlgoConceptViz } from "./AlgoConceptViz"

interface Props {
  topic: AlgoTopic
  onSelectProblem: (problemId: string) => void
}

const DIFFICULTY_LABEL: Record<string, { label: string; color: string }> = {
  bronze:   { label: 'Bronze', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  silver:   { label: 'Silver', color: 'text-gray-600 bg-gray-50 border-gray-200' },
  gold:     { label: 'Gold',   color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  platinum: { label: 'Plat',   color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
  easy:     { label: 'Easy',   color: 'text-green-700 bg-green-50 border-green-200' },
  medium:   { label: 'Medium', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  hard:     { label: 'Hard',   color: 'text-red-700 bg-red-50 border-red-200' },
}

export function TopicPage({ topic, onSelectProblem }: Props) {
  const { isComplete, getTopicProgress } = useAlgoProgress()
  const totalProblems = topic.problems.length
  const completedCount = getTopicProgress(topic.problems.map(p => p.id))
  const progressPct = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* 토픽 헤더 */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{topic.icon}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900">{topic.title}</h1>
            <p className="text-sm text-gray-500">{topic.category}</p>
          </div>
          {completedCount > 0 && (
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400">{completedCount}/{totalProblems} 완료</p>
              <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm">{topic.description}</p>
      </div>

      {/* 개념 시각화 (Algorithm Lab JS 래퍼) */}
      <AlgoConceptViz topicId={topic.id} />

      {/* 학습 로드맵 */}
      <div>
        <h2 className="text-base font-black text-gray-800 mb-3">📍 학습 순서</h2>
        <div className="space-y-3">
          {topic.stages.map(stage => {
            const stageCompleted = stage.problemIds.filter(id => isComplete(id)).length
            return (
              <div key={stage.num} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn(
                    "w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center flex-shrink-0",
                    stageCompleted === stage.problemIds.length && stage.problemIds.length > 0
                      ? "bg-green-500"
                      : "bg-orange-500"
                  )}>
                    {stageCompleted === stage.problemIds.length && stage.problemIds.length > 0 ? '✓' : stage.num}
                  </span>
                  <p className="font-bold text-gray-800 text-sm">{stage.title}</p>
                  {stage.desc && (
                    <p className="text-xs text-gray-400 ml-1">· {stage.desc}</p>
                  )}
                </div>

                <div className="space-y-2">
                  {stage.problemIds.map(pid => {
                    const problem = topic.problems.find(p => p.id === pid)
                    if (!problem) return null
                    const diff = DIFFICULTY_LABEL[problem.difficulty]
                    const displayTitle = problem.title.replace(/^(BOJ|LC) \d+ - /, '')
                    const done = isComplete(pid)

                    return (
                      <button
                        key={pid}
                        onClick={() => onSelectProblem(pid)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left group",
                          done
                            ? "border-green-200 bg-green-50 hover:bg-green-100"
                            : "border-gray-100 hover:border-orange-200 hover:bg-orange-50"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-semibold truncate",
                            done ? "text-green-700" : "text-gray-800 group-hover:text-orange-700"
                          )}>
                            {done && <span className="mr-1">✓</span>}
                            {displayTitle}
                          </p>
                          {problem.simIntro && !done && (
                            <p className="text-xs text-gray-400 truncate mt-0.5">{problem.simIntro}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {diff && (
                            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full border", diff.color)}>
                              {diff.label}
                            </span>
                          )}
                          {problem.sim && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
                              시뮬
                            </span>
                          )}
                          <span className={cn(
                            "transition-transform group-hover:translate-x-0.5",
                            done ? "text-green-400" : "text-orange-400"
                          )}>→</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
