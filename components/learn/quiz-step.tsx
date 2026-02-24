"use client"

import { HelpCircle, Check, X, Lightbulb, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { renderContent } from "./render-content"

interface QuizStepProps {
  step: LessonStep
  isCompleted: boolean
  selectedAnswer: number | null
  showExplanation: boolean
  quizAttempts: number
  onAnswer: (idx: number) => void
  onRetry: () => void
}

export function QuizStep({ step, isCompleted, selectedAnswer, showExplanation, quizAttempts, onAnswer, onRetry }: QuizStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-700"><HelpCircle className="w-4 h-4 inline mr-1" />퀴즈</span>
          {isCompleted && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">✅ 정답!</span>}
          {quizAttempts > 0 && !isCompleted && <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 font-medium">{quizAttempts}번 시도</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
        {step.content && <div className="text-base md:text-lg text-gray-800">{renderContent(step.content)}</div>}
      </div>
      <div className="space-y-3">
        {step.options?.map((option, idx) => {
          const isSelected = selectedAnswer === idx
          const isCorrect = idx === step.answer
          const showResult = selectedAnswer !== null
          return (
            <button key={idx} onClick={() => onAnswer(idx)} disabled={selectedAnswer !== null}
              className={cn("w-full p-3 md:p-4 rounded-lg md:rounded-xl text-left font-medium text-sm md:text-base transition-all border-2",
                !showResult && "bg-white hover:bg-indigo-50 border-gray-200 hover:border-indigo-400",
                showResult && isCorrect && "bg-green-100 border-green-500 text-green-800",
                showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800",
                showResult && !isSelected && !isCorrect && "bg-gray-100 border-gray-200 text-gray-400"
              )}>
              {option.split(/\\n|\n/).map((line, i, arr) => (<span key={i}>{line}{i < arr.length - 1 && <br />}</span>))}
              {showResult && isCorrect && <Check className="w-5 h-5 inline ml-2 text-green-600" />}
              {showResult && isSelected && !isCorrect && <X className="w-5 h-5 inline ml-2 text-red-600" />}
            </button>
          )
        })}
        {showExplanation && step.explanation && (
          <div className={cn("p-3 md:p-4 rounded-lg md:rounded-xl border-2 mt-2", selectedAnswer === step.answer ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300")}>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className={cn("w-4 h-4", selectedAnswer === step.answer ? "text-green-600" : "text-amber-600")} />
              <span className={cn("font-bold text-sm", selectedAnswer === step.answer ? "text-green-700" : "text-amber-700")}>
                {selectedAnswer === step.answer ? "정답! 🎉" : "틀렸어요!"}
              </span>
            </div>
            <p className={cn("text-sm", selectedAnswer === step.answer ? "text-green-800" : "text-amber-800")}>{step.explanation}</p>
            {selectedAnswer !== step.answer && (
              <>
                <p className="text-xs text-amber-600 mt-2">정답을 맞춰야 다음으로 넘어갈 수 있어요!</p>
                <button onClick={onRetry} className="mt-3 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" /> 다시 도전하기! 💪
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
