"use client"

import { useState, useEffect } from "react"
import { HelpCircle, Check, X, Lightbulb, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { CodeBlock } from "@/components/ui/code-block"
import { renderContent } from "./render-content"
import { useLanguage } from "@/contexts/language-context"

interface QuizStepProps {
  step: LessonStep
  isCompleted: boolean
  selectedAnswer: number | null
  showExplanation: boolean
  quizAttempts: number
  onAnswer: (idx: number) => void
  onAcknowledge: () => void
  isReview?: boolean
}

export function QuizStep({ step, isCompleted, selectedAnswer, showExplanation, quizAttempts, onAnswer, onAcknowledge, isReview }: QuizStepProps) {
  const { t } = useLanguage()
  // 오답 시 "확인" 버튼을 1.5초 후에 보여줌 (설명을 읽게 유도)
  const [showAckButton, setShowAckButton] = useState(false)
  const [showCode, setShowCode] = useState(false)

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
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-700"><HelpCircle className="w-4 h-4 inline mr-1" />{t("퀴즈", "Quiz")}</span>
          {isReview && <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600 animate-pulse">{t("🔄 아까 틀린 문제", "🔄 Review")}</span>}
          {isCompleted && !isReview && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">{t("✅ 정답!", "✅ Correct!")}</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
        {step.content && <div className="text-base md:text-lg text-gray-800">{renderContent(step.content)}</div>}
      </div>
      {step.code && (
        <div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            {showCode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showCode ? t("코드 숨기기", "Hide Code") : t("📋 코드 보기", "📋 View Code")}
          </button>
          {showCode && (
            <div className="mt-2 rounded-2xl overflow-hidden border-2 border-gray-200">
              <CodeBlock code={step.code} language="pseudo" />
            </div>
          )}
        </div>
      )}
      <div className="space-y-3">
        {step.options?.map((option, idx) => {
          const isSelected = selectedAnswer === idx
          const isCorrect = idx === step.answer
          const showResult = selectedAnswer !== null
          return (
            <button key={`${idx}-${selectedAnswer}`} onClick={() => onAnswer(idx)} disabled={selectedAnswer !== null}
              className={cn("w-full p-3 md:p-4 rounded-lg md:rounded-xl text-left font-medium text-sm md:text-base transition-all border-2 flex items-center",
                !showResult && "bg-white hover:bg-indigo-50 border-gray-200 hover:border-indigo-400",
                showResult && isCorrect && "bg-green-100 border-green-500 text-green-800",
                showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800",
                showResult && !isSelected && !isCorrect && "bg-gray-100 border-gray-200 text-gray-400"
              )}>
              <span className="flex-1">{option.split(/\\n|\n/).map((line, i, arr) => (<span key={i}>{line}{i < arr.length - 1 && <br />}</span>))}</span>
              {showResult && isCorrect && <Check className="w-5 h-5 shrink-0 ml-2 text-green-600" />}
              {showResult && isSelected && !isCorrect && <X className="w-5 h-5 shrink-0 ml-2 text-red-600" />}
            </button>
          )
        })}
        {showExplanation && step.explanation && (
          <div className={cn("p-3 md:p-4 rounded-lg md:rounded-xl border-2 mt-2", selectedAnswer === step.answer ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300")}>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className={cn("w-4 h-4", selectedAnswer === step.answer ? "text-green-600" : "text-amber-600")} />
              <span className={cn("font-bold text-sm", selectedAnswer === step.answer ? "text-green-700" : "text-amber-700")}>
                {selectedAnswer === step.answer ? t("정답! 🎉", "Correct! 🎉") : t("틀렸어요!", "Wrong!")}
              </span>
            </div>
            <p className={cn("text-sm", selectedAnswer === step.answer ? "text-green-800" : "text-amber-800")}>{step.explanation}</p>
            {selectedAnswer !== step.answer && (
              showAckButton ? (
                <>
                  {!isReview && <p className="mt-2 text-xs text-amber-600 font-medium text-center">{t("🔄 이 문제는 나중에 다시 나와요!", "🔄 This question will come up again later!")}</p>}
                  <button onClick={onAcknowledge} className="mt-2 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 animate-fade-in">
                    {t("확인했어요", "Got it")} <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <p className="mt-3 text-center text-xs text-amber-500 animate-pulse">{t("설명을 읽어보세요...", "Read the explanation...")}</p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
