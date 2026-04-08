"use client"

import { useState } from "react"
import { Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PracticeProblem } from "@/data/practice/types"
import { useLanguage } from "@/contexts/language-context"

interface McqRunnerProps {
  problem: PracticeProblem
  onSuccess?: (starred: boolean) => void
}

const LABELS = ["①", "②", "③", "④", "⑤"]

export function McqRunner({ problem, onSuccess }: McqRunnerProps) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const correct = problem.correctOption ?? 0
  const options = problem.options ?? []

  const handleSelect = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === correct) onSuccess?.(true)
  }

  const reset = () => setSelected(null)
  const answered = selected !== null
  const isRight = selected === correct

  return (
    <div className="flex flex-col gap-3">
      {/* 문제 카드: 설명 + 코드 함께 */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {problem.description && (
          <p className="px-5 pt-4 pb-3 text-gray-700 text-sm leading-relaxed border-b border-gray-100">
            {problem.description}
          </p>
        )}

        {problem.codeSnippet && (
          <div className="relative bg-[#1a1b2e] px-5 py-4">
            <span className="absolute top-2.5 right-3 text-[10px] text-white/25 font-mono select-none">
              {problem.language === "python" ? "Python" : "C++"}
            </span>
            <pre className="font-mono text-sm text-[#cdd6f4] overflow-x-auto leading-6 whitespace-pre-wrap">
              {problem.codeSnippet}
            </pre>
          </div>
        )}

        {/* 문제만 있고 코드 없을 때 여백 보정 */}
        {!problem.codeSnippet && !problem.description && null}
      </div>

      {/* 선택지 */}
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === correct

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-all flex items-center gap-3",
                // 미선택 상태
                !answered && "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/60 cursor-pointer shadow-sm active:scale-[0.99]",
                // 정답 강조
                answered && isCorrect && "border-emerald-400 bg-emerald-50",
                // 틀린 선택
                answered && isSelected && !isCorrect && "border-red-400 bg-red-50",
                // 나머지 흐리게
                answered && !isSelected && !isCorrect && "border-gray-100 bg-gray-50/80 opacity-40 cursor-not-allowed",
              )}
            >
              {/* 번호 레이블 */}
              <span className={cn(
                "text-base shrink-0 w-5 text-center",
                !answered ? "text-gray-300" :
                isCorrect ? "text-emerald-500" :
                isSelected ? "text-red-400" : "text-gray-300"
              )}>
                {LABELS[i]}
              </span>

              {/* 선택지 텍스트 */}
              <span className={cn(
                "flex-1 font-mono text-sm",
                !answered ? "text-gray-800" :
                isCorrect ? "text-emerald-700 font-semibold" :
                isSelected ? "text-red-700" : "text-gray-500"
              )}>
                {opt}
              </span>

              {/* 정오 아이콘 */}
              {answered && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400 shrink-0" />}
            </button>
          )
        })}
      </div>

      {/* 해설 */}
      {answered && (
        <div className={cn(
          "rounded-2xl border px-5 py-4",
          isRight ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
        )}>
          <div className="flex items-center justify-between mb-2">
            <span className={cn(
              "text-sm font-bold",
              isRight ? "text-emerald-700" : "text-red-600"
            )}>
              {isRight ? t("✅ 정답!", "✅ Correct!") : t("❌ 오답!", "❌ Wrong!")}
            </span>
            {!isRight && (
              <button
                onClick={reset}
                className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium"
              >
                <RotateCcw className="w-3 h-3" /> {t("다시 풀기", "Try again")}
              </button>
            )}
          </div>
          {problem.explanation && (
            <p className="text-gray-600 text-sm leading-relaxed">{problem.explanation}</p>
          )}
        </div>
      )}
    </div>
  )
}
