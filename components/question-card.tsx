"use client"

import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Question {
  id: number
  difficulty: string
  question: string
  code: string
  options: string[]
  correctAnswer: number
}

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  showResult: boolean
  isCorrect: boolean
  onAnswerSelect: (index: number) => void
}

export function QuestionCard({ question, selectedAnswer, showResult, isCorrect, onAnswerSelect }: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "bg-green-100 text-green-700"
      case "보통":
        return "bg-yellow-100 text-yellow-700"
      case "어려움":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border-2 transition-all duration-500",
        showResult && (isCorrect ? "animate-bounce-in border-green-300" : "animate-shake border-red-300"),
      )}
    >
      <div className="p-4 md:p-6 lg:p-8">
        {/* Question Header */}
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs md:text-sm font-semibold",
              getDifficultyColor(question.difficulty),
            )}
          >
            {question.difficulty}
          </span>
          <span className="text-xs md:text-sm text-gray-500">문제 #{question.id}</span>
        </div>

        {/* Question Text */}
        <h3 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h3>

        {/* Code Block */}
        <div className="mb-6 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-900">
          <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-3 md:px-4 py-2">
            <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-400">Python</span>
          </div>
          <pre className="overflow-x-auto p-3 md:p-4">
            <code className="font-mono text-xs md:text-sm leading-relaxed text-gray-100">{question.code}</code>
          </pre>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectAnswer = index === question.correctAnswer
            const showCorrect = showResult && isCorrectAnswer
            const showWrong = showResult && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
                disabled={showResult}
                className={cn(
                  "group relative w-full rounded-xl border-2 p-4 md:p-5 text-left transition-all duration-300 min-h-[56px]",
                  "hover:shadow-md active:scale-[0.98]",
                  !showResult && !isSelected && "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50",
                  !showResult && isSelected && "border-orange-400 bg-orange-50 shadow-md",
                  showCorrect && "border-green-400 bg-green-50",
                  showWrong && "border-red-400 bg-red-50",
                  showResult && "cursor-not-allowed",
                )}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Radio Button */}
                  <div
                    className={cn(
                      "flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                      !showResult && !isSelected && "border-gray-300 bg-white",
                      !showResult && isSelected && "border-orange-500 bg-orange-500",
                      showCorrect && "border-green-500 bg-green-500",
                      showWrong && "border-red-500 bg-red-500",
                    )}
                  >
                    {isSelected && !showResult && <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-white" />}
                    {showCorrect && <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                    {showWrong && <X className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                  </div>

                  {/* Option Text */}
                  <span
                    className={cn(
                      "flex-1 font-mono text-sm md:text-base lg:text-lg font-medium transition-colors",
                      !showResult && "text-gray-700",
                      showCorrect && "text-green-700",
                      showWrong && "text-red-700",
                    )}
                  >
                    {option}
                  </span>
                </div>

                {/* Confetti Effect for Correct Answer */}
                {showCorrect && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="animate-confetti absolute left-1/4 top-0 text-xl md:text-2xl">🎉</div>
                    <div className="animate-confetti animation-delay-100 absolute right-1/4 top-0 text-xl md:text-2xl">
                      ✨
                    </div>
                    <div className="animate-confetti animation-delay-200 absolute left-1/2 top-0 text-xl md:text-2xl">
                      🌟
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Result Message */}
        {showResult && (
          <div
            className={cn(
              "mt-6 animate-fade-in rounded-lg p-4 text-center text-sm md:text-base font-semibold",
              isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
            )}
          >
            {isCorrect ? "정답입니다! 🎉" : `아쉬워요! 정답은 "${question.options[question.correctAnswer]}" 입니다.`}
          </div>
        )}
      </div>
    </Card>
  )
}
