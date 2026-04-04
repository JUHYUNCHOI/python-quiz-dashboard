"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { AlgoTopic, AlgoProblem } from "@/data/algorithm/types"
import { CodeStepper } from "./CodeStepper"
import { HintSystem } from "./HintSystem"
import { AlgoTopicViz } from "./AlgoTopicViz"
import { useAlgoProgress } from "@/hooks/use-algo-progress"

function injectAlgoStyle() {
  if (typeof document === 'undefined') return
  const id = 'algo-style-link'
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = '/algo-style.css'
  document.head.appendChild(link)
}

type Tab = 'problem' | 'sim' | 'think' | 'code'

interface Props {
  topic: AlgoTopic
  problem: AlgoProblem
  onBack: () => void
}

export function ProblemPage({ topic, problem, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('problem')
  const [lang, setLang] = useState<'python' | 'cpp'>('python')
  const { isComplete, markComplete } = useAlgoProgress()

  useEffect(() => { injectAlgoStyle() }, [])

  const hasSim = !!problem.sim
  const done = isComplete(problem.id)

  const tabs: { id: Tab; label: string; emoji: string; hidden?: boolean }[] = [
    { id: 'problem', label: '문제',   emoji: '📋' },
    { id: 'sim',     label: '시뮬',   emoji: '▶️', hidden: !hasSim },
    { id: 'think',   label: '힌트',   emoji: '💡' },
    { id: 'code',    label: '코드',   emoji: '💻' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
      {/* 뒤로가기 + 제목 */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-2 transition-colors"
        >
          ← {topic.icon} {topic.title}
        </button>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-black text-gray-900 leading-tight">
            {problem.title.replace(/^(BOJ|LC) \d+ - /, '')}
          </h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => markComplete(problem.id)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-lg border font-bold transition-all",
                done
                  ? "border-green-300 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-600"
              )}
            >
              {done ? '✓ 완료' : '완료 표시'}
            </button>
            <a
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              원문 →
            </a>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.filter(t => !t.hidden).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
              tab === t.id
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="pb-8">
        {tab === 'problem' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            {problem.simIntro && (
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-4 text-sm text-orange-700">
                💡 {problem.simIntro}
                {hasSim && (
                  <button
                    onClick={() => setTab('sim')}
                    className="ml-2 underline font-medium hover:text-orange-900"
                  >
                    시뮬레이션 보기 →
                  </button>
                )}
              </div>
            )}
            <div
              className="algo-scope algo-prose"
              dangerouslySetInnerHTML={{ __html: problem.descriptionHTML }}
            />
          </div>
        )}

        {tab === 'sim' && hasSim && (
          <AlgoTopicViz topicId={topic.id} problemId={problem.id} />
        )}

        {tab === 'think' && (
          <HintSystem hints={problem.hints} />
        )}

        {tab === 'code' && (
          <div className="space-y-4">
            {/* 언어 선택 */}
            <div className="flex gap-2">
              {(['python', 'cpp'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all",
                    lang === l
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  )}
                >
                  {l === 'python' ? '🐍 Python' : '⚡ C++'}
                </button>
              ))}
            </div>

            {problem.solutions.map((sol, i) => (
              <CodeStepper key={i} solution={sol} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
