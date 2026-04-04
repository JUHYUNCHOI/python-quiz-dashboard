"use client"

import { useState, useEffect, useRef } from "react"
import { HelpCircle, Check, X, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { CodeBlock } from "@/components/ui/code-block"
import { renderContent } from "./render-content"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

interface QuizStepProps {
  step: LessonStep
  isCompleted: boolean
  selectedAnswer: number | null
  showExplanation: boolean
  quizAttempts: number
  onAnswer: (idx: number) => void
  onAcknowledge: () => void
  showNextOnCorrect?: boolean  // 복습 페이지: 정답 후 설명 안에 "다음 문제 →" 버튼 표시
}

export function QuizStep({ step, isCompleted, selectedAnswer, showExplanation, quizAttempts, onAnswer, onAcknowledge, showNextOnCorrect }: QuizStepProps) {
  const { t } = useLanguage()
  const [showAckButton, setShowAckButton] = useState(false)
  const [showCorrectNext, setShowCorrectNext] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const ackButtonRef = useRef<HTMLButtonElement>(null)

  // 오답: 1.5초 후 "확인했어요 →" 버튼
  useEffect(() => {
    if (showExplanation && selectedAnswer !== null && selectedAnswer !== step.answer) {
      setShowAckButton(false)
      const timer = setTimeout(() => setShowAckButton(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [showExplanation, selectedAnswer, step.answer])

  // 정답 + showNextOnCorrect: 0.6초 후 "다음 문제 →" 버튼
  useEffect(() => {
    if (showNextOnCorrect && showExplanation && selectedAnswer !== null && selectedAnswer === step.answer) {
      setShowCorrectNext(false)
      const timer = setTimeout(() => setShowCorrectNext(true), 600)
      return () => clearTimeout(timer)
    }
  }, [showNextOnCorrect, showExplanation, selectedAnswer, step.answer])

  // 스텝 바뀌면 힌트 닫기
  useEffect(() => { setShowHint(false) }, [step.id])

  // 버튼 나타나면 자동 스크롤
  useEffect(() => {
    if (showAckButton || showCorrectNext) {
      setTimeout(() => ackButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
    }
  }, [showAckButton, showCorrectNext])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-700"><HelpCircle className="w-4 h-4 inline mr-1" />{t("퀴즈", "Quiz")}</span>
          {isCompleted && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">{t("✅ 정답!", "✅ Correct!")}</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {step.title === "정리 퀴즈" ? t("마무리 체크! 🎯", "Wrap-up Check! 🎯") : step.title}
        </h1>
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
            <div className="mt-2 rounded-2xl overflow-x-auto border-2 border-gray-200">
              <CodeBlock code={step.code} language="pseudo" />
            </div>
          )}
        </div>
      )}

      {/* 힌트 버튼 — 아직 답 안 선택했을 때만 */}
      {selectedAnswer === null && step.explanation && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? t("힌트 숨기기", "Hide hint") : t("힌트 보기", "Show hint")}
        </button>
      )}
      {showHint && selectedAnswer === null && (
        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-800">
          {step.explanation}
        </div>
      )}

      <div className="space-y-3">
        {step.options?.map((option, idx) => {
          const isSelected = selectedAnswer === idx
          const isCorrect = idx === step.answer
          const showResult = selectedAnswer !== null
          return (
            <button key={`${idx}-${selectedAnswer}`} onClick={() => onAnswer(idx)} disabled={selectedAnswer !== null}
              className={cn("w-full p-4 rounded-xl text-left font-medium text-sm md:text-base transition-all border-2 flex items-center min-h-[48px] active:scale-[0.98]",
                !showResult && "bg-white hover:bg-indigo-50 active:bg-indigo-100 border-gray-200 hover:border-indigo-400",
                showResult && isCorrect && "bg-green-100 border-green-500 text-green-800",
                showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800",
                showResult && !isSelected && !isCorrect && "bg-gray-100 border-gray-200 text-gray-400",
              )}>
              <span className="flex-1">{option.split(/\\n|\n/).map((line, i, arr) => (<span key={i}>{line}{i < arr.length - 1 && <br />}</span>))}</span>
              {showResult && isCorrect && <Check className="w-5 h-5 shrink-0 ml-2 text-green-600" />}
              {showResult && isSelected && !isCorrect && <X className="w-5 h-5 shrink-0 ml-2 text-red-600" />}
            </button>
          )
        })}
        {showExplanation && step.explanation && (
          <div className="mt-2 space-y-2">
            {/* 오답일 때: 정답 강조 카드 */}
            {selectedAnswer !== step.answer && step.options && (
              <div className="p-3 bg-green-50 border-2 border-green-300 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <div>
                  <p className="text-[10px] text-green-600 font-bold">{t("정답", "Correct Answer")}</p>
                  <p className="text-sm text-green-800 font-medium">{step.options[step.answer ?? 0]}</p>
                </div>
              </div>
            )}
            {/* 설명 박스 */}
            <div className={cn("p-3 md:p-4 rounded-lg md:rounded-xl border-2", selectedAnswer === step.answer ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300")}>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className={cn("w-4 h-4", selectedAnswer === step.answer ? "text-green-600" : "text-amber-600")} />
              <span className={cn("font-bold text-sm", selectedAnswer === step.answer ? "text-green-700" : "text-amber-700")}>
                {selectedAnswer === step.answer ? t("정답! 🎉", "Correct! 🎉") : t("🤔 왜 틀렸을까요?", "Why was it wrong?")}
              </span>
            </div>
            <p className={cn("text-sm whitespace-pre-line leading-relaxed", selectedAnswer === step.answer ? "text-green-800" : "text-amber-800")}>{step.explanation}</p>
            {/* 정답: showNextOnCorrect일 때 "다음 문제 →" 버튼 */}
            {selectedAnswer === step.answer && showCorrectNext && (
              <button ref={ackButtonRef} onClick={onAcknowledge} className="mt-2 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 shadow-md transition-all flex items-center justify-center gap-2 animate-fade-in">
                {t("다음 문제 →", "Next →")}
              </button>
            )}
            {selectedAnswer !== step.answer && (
              showAckButton ? (
                <button ref={ackButtonRef} onClick={onAcknowledge} className="mt-2 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-md transition-all flex items-center justify-center gap-2 animate-fade-in">
                  {t("확인했어요 →", "Got it →")}
                </button>
              ) : (
                <div className="mt-3 space-y-1.5">
                  <div className="h-1 bg-amber-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.4, ease: "linear" }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <p className="text-center text-xs text-amber-500">{t("설명을 읽어보세요...", "Read the explanation...")}</p>
                </div>
              )
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
