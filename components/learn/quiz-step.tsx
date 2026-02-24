"use client"

import { useState, useEffect } from "react"
import { HelpCircle, Check, X, Lightbulb, ArrowRight } from "lucide-react"
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
  onAcknowledge: () => void
}

export function QuizStep({ step, isCompleted, selectedAnswer, showExplanation, quizAttempts, onAnswer, onAcknowledge }: QuizStepProps) {
  // 오답 시 "확인" 버튼을 1.5초 후에 보여줌 (설명을 읽게 유도)
  const [showAckButton, setShowAckButton] = useState(false)

  useEffect(() => {
    if (showExplanation && selectedAnswer !== null && selectedAnswer !== step.answer) {
      setShowAckButton(false)
      const timer = setTimeout(() => setShowAckButton(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [showExplanation, selectedAnswer, step.answer])

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
              showAckButton ? (
                <button onClick={onAcknowledge} className="mt-3 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 animate-fade-in">
                  확인했어요 <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <p className="mt-3 text-center text-xs text-amber-500 animate-pulse">설명을 읽어보세요...</p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
