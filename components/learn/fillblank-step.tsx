"use client"

import { useState, useEffect } from "react"
import { PenLine, Lightbulb, ArrowRight, Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { highlightCppInline } from "@/components/ui/code-block"
import { motion, AnimatePresence } from "framer-motion"

interface FillBlankStepProps {
  step: LessonStep
  isCompleted: boolean
  onComplete: (correct: boolean) => void
  onAcknowledge: () => void
  isReview?: boolean
}

export function FillBlankStep({ step, isCompleted, onComplete, onAcknowledge, isReview }: FillBlankStepProps) {
  const blanks: { id: number; answer: string; options: string[] }[] = step.fillBlanks || []
  const [filledValues, setFilledValues] = useState<Record<number, string>>({})
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [wrongBlankIds, setWrongBlankIds] = useState<Set<number>>(new Set())
  const [showAckButton, setShowAckButton] = useState(false)

  // 1.5초 후 확인 버튼 표시
  useEffect(() => {
    if (isSubmitted && !isCorrect) {
      setShowAckButton(false)
      const timer = setTimeout(() => setShowAckButton(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted, isCorrect])

  const handleOptionClick = (value: string) => {
    if (isSubmitted) return
    const blankId = blanks[currentBlankIndex].id
    const newFilled = { ...filledValues, [blankId]: value }
    setFilledValues(newFilled)

    // 다음 빈칸으로 자동 이동
    const nextEmpty = blanks.findIndex((b, i) => i > currentBlankIndex && !(b.id in newFilled))
    if (nextEmpty !== -1) {
      setCurrentBlankIndex(nextEmpty)
    } else {
      // 모든 빈칸 채워짐 → 자동 채점
      const allFilled = blanks.every(b => b.id in newFilled)
      if (allFilled) {
        checkAnswers(newFilled)
      }
    }
  }

  const checkAnswers = (values: Record<number, string>) => {
    const wrong = new Set<number>()
    blanks.forEach(b => {
      if (values[b.id] !== b.answer) wrong.add(b.id)
    })
    setWrongBlankIds(wrong)
    setIsSubmitted(true)

    if (wrong.size === 0) {
      setIsCorrect(true)
      onComplete(true)
    } else {
      setIsCorrect(false)
      onComplete(false)
    }
  }

  const handleReset = () => {
    setFilledValues({})
    setCurrentBlankIndex(0)
    setIsSubmitted(false)
    setIsCorrect(false)
    setWrongBlankIds(new Set())
    setShowAckButton(false)
  }

  const handleAcknowledge = () => {
    handleReset()
    onAcknowledge()
  }

  // 코드를 빈칸 포함해서 렌더링
  const renderCodeWithBlanks = () => {
    if (!step.code) return null
    const lines = step.code.split("\n")
    let blankCounter = 0

    return lines.map((line, lineIdx) => {
      const parts: React.ReactNode[] = []
      let remaining = line
      let partKey = 0

      while (remaining.includes("___")) {
        const idx = remaining.indexOf("___")
        // 빈칸 앞 코드 부분
        if (idx > 0) {
          const before = remaining.substring(0, idx)
          const highlighted = highlightCppInline(before)
          parts.push(<span key={`${lineIdx}-${partKey++}`}>{highlighted}</span>)
        }

        // 빈칸 슬롯
        const blank = blanks[blankCounter]
        if (blank) {
          const isFilled = blank.id in filledValues
          const isActive = !isSubmitted && currentBlankIndex === blankCounter
          const isWrong = isSubmitted && wrongBlankIds.has(blank.id)
          const isRight = isSubmitted && !wrongBlankIds.has(blank.id) && isFilled

          parts.push(
            <motion.span
              key={`blank-${blank.id}`}
              layout
              className={cn(
                "inline-block min-w-[3.5rem] px-2 py-0.5 mx-0.5 rounded text-center font-mono text-sm transition-all",
                !isFilled && !isSubmitted && "border-2 border-dashed border-slate-400 text-slate-400",
                !isFilled && isActive && "border-amber-400 bg-amber-50 animate-pulse",
                isFilled && !isSubmitted && "bg-violet-100 border-2 border-violet-400 text-violet-700 font-semibold",
                isRight && "bg-green-100 border-2 border-green-400 text-green-700",
                isWrong && "bg-red-100 border-2 border-red-400 text-red-700 line-through"
              )}
            >
              {isFilled ? filledValues[blank.id] : `${blankCounter + 1}`}
              {isRight && <Check className="w-3 h-3 inline ml-1 text-green-400" />}
              {isWrong && <X className="w-3 h-3 inline ml-1 text-red-400" />}
            </motion.span>
          )
        }
        blankCounter++
        remaining = remaining.substring(idx + 3)
      }

      // 나머지 코드
      if (remaining) {
        const highlighted = highlightCppInline(remaining)
        parts.push(<span key={`${lineIdx}-${partKey++}`}>{highlighted}</span>)
      }

      return (
        <div key={lineIdx} className="leading-7">
          {parts.length > 0 ? parts : <span>&nbsp;</span>}
        </div>
      )
    })
  }

  const currentBlank = blanks[currentBlankIndex]

  return (
    <div className="space-y-6">
      {/* 배지 + 제목 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-violet-100 text-violet-700">
            <PenLine className="w-4 h-4 inline mr-1" />빈칸 채우기
          </span>
          {isReview && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600 animate-pulse">
              🔄 아까 틀린 문제
            </span>
          )}
          {isCompleted && !isReview && (
            <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">✅ 완료</span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
        {step.content && (
          <p className="text-base text-gray-600 leading-relaxed">{step.content}</p>
        )}
      </div>

      {/* 코드 블록 */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 font-mono text-sm md:text-base overflow-x-auto">
        {renderCodeWithBlanks()}
      </div>

      {/* 옵션 버튼 */}
      {!isSubmitted && currentBlank && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 font-medium">
            빈칸 {currentBlankIndex + 1}/{blanks.length} 선택:
          </p>
          <div className="flex flex-wrap gap-2">
            {currentBlank.options.map((option, idx) => {
              // Count how many OTHER blanks already use this option
              const usedCount = Object.entries(filledValues).filter(
                ([blankId, val]) => val === option && Number(blankId) !== currentBlank.id
              ).length
              // Count how many blanks (including current) offer this option
              const availableCount = blanks.filter(b => b.options.includes(option)).length
              // Only disable if all available slots for this option are taken by other blanks
              const isUsed = usedCount >= availableCount && filledValues[currentBlank.id] !== option
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={isUsed}
                  className={cn(
                    "px-4 py-2.5 rounded-xl font-mono text-sm md:text-base font-semibold transition-all border-2",
                    !isUsed && "bg-white hover:bg-violet-50 border-gray-200 hover:border-violet-400 text-gray-800",
                    isUsed && "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed"
                  )}
                >
                  {option}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* 리셋 버튼 (채점 전) */}
      {!isSubmitted && Object.keys(filledValues).length > 0 && (
        <button onClick={handleReset} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
          <RotateCcw className="w-3.5 h-3.5" /> 다시 하기
        </button>
      )}

      {/* 결과 + 설명 */}
      <AnimatePresence>
        {isSubmitted && step.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-3 md:p-4 rounded-lg md:rounded-xl border-2 mt-2",
              isCorrect ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className={cn("w-4 h-4", isCorrect ? "text-green-600" : "text-amber-600")} />
              <span className={cn("font-bold text-sm", isCorrect ? "text-green-700" : "text-amber-700")}>
                {isCorrect ? "정답! 🎉" : "틀렸어요!"}
              </span>
            </div>
            <p className={cn("text-sm", isCorrect ? "text-green-800" : "text-amber-800")}>
              {step.explanation}
            </p>

            {/* 오답 시 정답 표시 */}
            {!isCorrect && (
              <div className="mt-2 p-2 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-700 font-medium mb-1">정답:</p>
                <div className="flex flex-wrap gap-1">
                  {blanks.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 bg-amber-200/50 rounded text-xs font-mono font-semibold text-amber-800">
                      {i + 1}: {b.answer}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!isCorrect && (
              showAckButton ? (
                <>
                  {!isReview && <p className="mt-2 text-xs text-amber-600 font-medium text-center">🔄 이 문제는 나중에 다시 나와요!</p>}
                  <button
                    onClick={handleAcknowledge}
                    className="mt-2 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 animate-fade-in"
                  >
                    확인했어요 <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <p className="mt-3 text-center text-xs text-amber-500 animate-pulse">설명을 읽어보세요...</p>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
