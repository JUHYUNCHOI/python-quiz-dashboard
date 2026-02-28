"use client"

import { useState, useEffect } from "react"
import { Terminal, Lightbulb, ArrowRight, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { CodeBlock } from "@/components/ui/code-block"
import { motion, AnimatePresence } from "framer-motion"

interface PredictStepProps {
  step: LessonStep
  isCompleted: boolean
  selectedAnswer: number | null
  showExplanation: boolean
  quizAttempts: number
  onAnswer: (idx: number) => void
  onAcknowledge: () => void
  isReview?: boolean
}

// 터미널 타자기 애니메이션
function TerminalOutput({ output, show }: { output: string; show: boolean }) {
  const [displayedChars, setDisplayedChars] = useState(0)

  useEffect(() => {
    if (!show) { setDisplayedChars(0); return }
    setDisplayedChars(0)
    const interval = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev >= output.length) { clearInterval(interval); return prev }
        return prev + 1
      })
    }, 30)
    return () => clearInterval(interval)
  }, [show, output])

  if (!show) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 rounded-xl p-4 mt-3 font-mono text-sm border border-slate-300 overflow-hidden"
    >
      <div className="text-slate-400 text-xs mb-2">$ ./program</div>
      <div className="text-green-400 min-h-[1.5em]">
        {output.slice(0, displayedChars)}
        {displayedChars < output.length && (
          <span className="inline-block w-1.5 h-4 bg-green-400 animate-pulse ml-0.5 align-middle" />
        )}
      </div>
    </motion.div>
  )
}

export function PredictStep({ step, isCompleted, selectedAnswer, showExplanation, quizAttempts, onAnswer, onAcknowledge, isReview }: PredictStepProps) {
  const [showAckButton, setShowAckButton] = useState(false)

  useEffect(() => {
    if (showExplanation && selectedAnswer !== null && selectedAnswer !== step.answer) {
      setShowAckButton(false)
      const timer = setTimeout(() => setShowAckButton(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [showExplanation, selectedAnswer, step.answer])

  // 정답 출력 텍스트 (predict의 정답 옵션)
  const correctOutput = step.options?.[step.answer ?? 0] ?? ""

  return (
    <div className="space-y-6">
      {/* 배지 + 제목 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-700">
            <Terminal className="w-4 h-4 inline mr-1" />출력 예측
          </span>
          {isReview && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600 animate-pulse">
              🔄 아까 틀린 문제
            </span>
          )}
          {isCompleted && !isReview && (
            <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">✅ 정답!</span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{step.title}</h1>
      </div>

      {/* 큰 코드 블록 */}
      {step.code && (
        <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
          <CodeBlock code={step.code} language="cpp" />
        </div>
      )}

      {/* 프롬프트 */}
      <p className="text-base md:text-lg font-semibold text-gray-700 text-center">
        {step.content || "이 코드를 실행하면 어떤 결과가 나올까요?"}
      </p>

      {/* 선택지 */}
      <div className="space-y-3">
        {step.options?.map((option, idx) => {
          const isSelected = selectedAnswer === idx
          const isCorrect = idx === step.answer
          const showResult = selectedAnswer !== null
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAnswer(idx)}
              disabled={selectedAnswer !== null}
              className={cn(
                "w-full p-3 md:p-4 rounded-lg md:rounded-xl text-left font-mono text-sm md:text-base transition-all border-2 whitespace-pre-line",
                !showResult && "bg-white hover:bg-emerald-50 border-gray-200 hover:border-emerald-400",
                showResult && isCorrect && "bg-green-100 border-green-500 text-green-800",
                showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800",
                showResult && !isSelected && !isCorrect && "bg-gray-100 border-gray-200 text-gray-400"
              )}
            >
              {option}
              {showResult && isCorrect && <Check className="w-5 h-5 inline ml-2 text-green-600" />}
              {showResult && isSelected && !isCorrect && <X className="w-5 h-5 inline ml-2 text-red-600" />}
            </motion.button>
          )
        })}
      </div>

      {/* 터미널 애니메이션 */}
      <AnimatePresence>
        <TerminalOutput output={correctOutput} show={selectedAnswer !== null} />
      </AnimatePresence>

      {/* 설명 */}
      {showExplanation && step.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-3 md:p-4 rounded-lg md:rounded-xl border-2 mt-2",
            selectedAnswer === step.answer ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300"
          )}
        >
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className={cn("w-4 h-4", selectedAnswer === step.answer ? "text-green-600" : "text-amber-600")} />
            <span className={cn("font-bold text-sm", selectedAnswer === step.answer ? "text-green-700" : "text-amber-700")}>
              {selectedAnswer === step.answer ? "정답! 🎉" : "틀렸어요!"}
            </span>
          </div>
          <p className={cn("text-sm", selectedAnswer === step.answer ? "text-green-800" : "text-amber-800")}>
            {step.explanation}
          </p>
          {selectedAnswer !== step.answer && (
            showAckButton ? (
              <>
                {!isReview && <p className="mt-2 text-xs text-amber-600 font-medium text-center">🔄 이 문제는 나중에 다시 나와요!</p>}
                <button
                  onClick={onAcknowledge}
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
    </div>
  )
}
