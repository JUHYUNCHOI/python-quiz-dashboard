"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Solution } from "@/data/algorithm/types"

interface Props {
  solution: Solution
  lang: 'python' | 'cpp'
}

export function CodeStepper({ solution, lang }: Props) {
  const steps = solution.codeSteps?.[lang] ?? []
  const [stepIdx, setStepIdx] = useState(0)
  const [showFull, setShowFull] = useState(false)

  const fullCode = solution.templates[lang] ?? ""
  const currentStep = steps[stepIdx]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* 헤더 */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-800 text-sm">{solution.approach}</p>
          <div className="flex gap-3 mt-0.5">
            <span className="text-[11px] text-gray-400">시간: {solution.timeComplexity}</span>
            <span className="text-[11px] text-gray-400">공간: {solution.spaceComplexity}</span>
          </div>
        </div>
        <button
          onClick={() => setShowFull(f => !f)}
          className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 transition-colors"
        >
          {showFull ? '단계별 보기' : '전체 보기'}
        </button>
      </div>

      {showFull ? (
        /* 전체 코드 */
        <div className="bg-gray-900 p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
            {fullCode}
          </pre>
        </div>
      ) : steps.length > 0 ? (
        /* 단계별 코드 */
        <div>
          {/* 단계 설명 */}
          <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-black text-orange-700">
                {currentStep?.title}
              </p>
              <span className="text-xs text-orange-400 font-bold">
                {stepIdx + 1} / {steps.length}
              </span>
            </div>
            <p className="text-xs text-orange-600">{currentStep?.desc}</p>
          </div>

          {/* 코드 */}
          <div className="bg-gray-900 p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
              {currentStep?.code}
            </pre>
          </div>

          {/* 설명 */}
          {currentStep?.explanation && (
            <div
              className="px-4 py-3 text-xs text-gray-600 border-t border-gray-100 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: currentStep.explanation }}
            />
          )}

          {/* 네비게이션 */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2">
            {/* 스텝 인디케이터 */}
            <div className="flex gap-1 flex-1">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStepIdx(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === stepIdx ? "bg-orange-500 flex-[2]" : "bg-gray-200 flex-1"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setStepIdx(i => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-500 disabled:opacity-30 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              ← 이전
            </button>
            <button
              onClick={() => setStepIdx(i => Math.min(steps.length - 1, i + 1))}
              disabled={stepIdx === steps.length - 1}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-500 text-white disabled:opacity-30 hover:bg-orange-600 transition-colors"
            >
              다음 →
            </button>
          </div>
        </div>
      ) : (
        /* 스텝 없으면 전체 코드 */
        <div className="bg-gray-900 p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
            {fullCode}
          </pre>
        </div>
      )}
    </div>
  )
}
