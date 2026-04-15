"use client"

import { useState, useEffect, useRef } from "react"
import { PenLine, Lightbulb, ArrowRight, Check, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { LessonStep } from "./types"
import { highlightCppInline } from "@/components/ui/code-block"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { renderContent } from "./render-content"

interface FillBlankStepProps {
  step: LessonStep
  isCompleted: boolean
  onComplete: (correct: boolean, filledValues?: Record<number, string>) => void
  onAcknowledge: () => void
  isReview?: boolean
}

// 배열을 Fisher-Yates 알고리즘으로 셔플 (step.id 기반 seed로 매번 같은 순서 유지)
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const result = [...arr]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  for (let i = result.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) | 0
    const j = Math.abs(h) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function FillBlankStep({ step, isCompleted, onComplete, onAcknowledge, isReview }: FillBlankStepProps) {
  const blanks: { id: number; answer: string; options: string[] }[] = step.fillBlanks || []
  const { t } = useLanguage()
  // 보기 순서 shuffle (step.id + blank.id 기반으로 매번 동일하게 섞음)
  const shuffledBlanks = blanks.map(b => ({
    ...b,
    options: seededShuffle(b.options, `${step.id}-${b.id}`)
  }))
  const [filledValues, setFilledValues] = useState<Record<number, string>>({})
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [wrongBlankIds, setWrongBlankIds] = useState<Set<number>>(new Set())
  const [showAckButton, setShowAckButton] = useState(false)
  const [lastFilledId, setLastFilledId] = useState<number | null>(null) // 방금 채운 빈칸 flash용
  const optionsRef = useRef<HTMLDivElement>(null)

  // localStorage에서 진행 중인 답변 복원 (마운트 시)
  useEffect(() => {
    if (isCompleted) return
    try {
      const saved = localStorage.getItem(`fillblank-progress-${step.id}`)
      if (saved) {
        const parsed = JSON.parse(saved) as Record<number, string>
        setFilledValues(parsed)
        // 다음 빈 빈칸으로 커서 이동
        const nextEmpty = blanks.findIndex(b => !(b.id in parsed))
        setCurrentBlankIndex(nextEmpty === -1 ? 0 : nextEmpty)
      }
    } catch { /* ignore */ }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // step이 바뀌면 상태 초기화
  useEffect(() => {
    setFilledValues({})
    setCurrentBlankIndex(0)
    setIsSubmitted(false)
    setIsCorrect(false)
    setWrongBlankIds(new Set())
    setShowAckButton(false)
    localStorage.removeItem(`fillblank-progress-${step.id}`)
  }, [step.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // 이미 완료된 스텝으로 돌아왔을 때 정답 자동 표시
  useEffect(() => {
    if (isCompleted && !isReview && !isSubmitted && Object.keys(filledValues).length === 0) {
      const correctValues: Record<number, string> = {}
      blanks.forEach(b => {
        correctValues[b.id] = b.answer
      })
      setFilledValues(correctValues)
      setIsSubmitted(true)
      setIsCorrect(true)
    }
  }, [isCompleted, isReview]) // eslint-disable-line react-hooks/exhaustive-deps

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
    try { localStorage.setItem(`fillblank-progress-${step.id}`, JSON.stringify(newFilled)) } catch { /* ignore */ }

    // 방금 채운 빈칸 flash 애니메이션
    setLastFilledId(blankId)
    setTimeout(() => setLastFilledId(null), 500)

    // 다음 빈칸으로 자동 이동
    const nextEmpty = blanks.findIndex((b, i) => i > currentBlankIndex && !(b.id in newFilled))
    if (nextEmpty !== -1) {
      setCurrentBlankIndex(nextEmpty)
      // 다음 빈칸이 화면 밖이면 옵션 영역으로 스크롤
      setTimeout(() => {
        optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 100)
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
    try { localStorage.removeItem(`fillblank-progress-${step.id}`) } catch { /* ignore */ }

    if (wrong.size === 0) {
      setIsCorrect(true)
      onComplete(true, values)
    } else {
      setIsCorrect(false)
      onComplete(false, values)
    }
  }

  const handleReset = () => {
    setFilledValues({})
    setCurrentBlankIndex(0)
    setIsSubmitted(false)
    setIsCorrect(false)
    setWrongBlankIds(new Set())
    setShowAckButton(false)
    try { localStorage.removeItem(`fillblank-progress-${step.id}`) } catch { /* ignore */ }
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

          const isJustFilled = lastFilledId === blank.id
          parts.push(
            <motion.span
              key={`blank-${blank.id}-${isSubmitted}`}
              layout
              animate={isJustFilled ? { scale: [1, 1.2, 1], backgroundColor: ["#ede9fe", "#a78bfa", "#ede9fe"] } : {}}
              transition={{ duration: 0.4 }}
              className={cn(
                "inline-flex items-center min-w-[3.5rem] px-2 py-0.5 mx-0.5 rounded text-center font-mono text-sm transition-all",
                !isFilled && !isSubmitted && "border-2 border-dashed border-slate-400 text-slate-400",
                !isFilled && isActive && "border-amber-400 bg-amber-50 animate-pulse",
                isFilled && !isSubmitted && "bg-violet-100 border-2 border-violet-400 text-violet-700 font-semibold",
                isRight && "bg-green-100 border-2 border-green-400 text-green-700",
                isWrong && "bg-red-100 border-2 border-red-400 text-red-700 line-through"
              )}
            >
              <span>{isFilled ? filledValues[blank.id] : `${blankCounter + 1}`}</span>
              {isRight && <Check className="w-3 h-3 ml-1 text-green-400" />}
              {isWrong && <X className="w-3 h-3 ml-1 text-red-400" />}
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

  const currentBlank = shuffledBlanks[currentBlankIndex]

  return (
    <div className="space-y-6">
      {/* 배지 + 제목 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-bold bg-violet-100 text-violet-700">
            <PenLine className="w-4 h-4 inline mr-1" />{t("빈칸 채우기", "Fill in the Blanks")}
          </span>
          {isReview && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600 animate-pulse">
              {t("🔄 아까 틀린 문제", "🔄 Review")}
            </span>
          )}
          {isCompleted && !isReview && (
            <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-medium">{t("✅ 완료", "✅ Done")}</span>
          )}
        </div>
        {step.content && (
          <div className="text-base text-gray-600 leading-relaxed space-y-2">{renderContent(step.content)}</div>
        )}
      </div>

      {/* 코드 블록 */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 font-mono text-sm md:text-base overflow-x-auto whitespace-pre">
        {renderCodeWithBlanks()}
      </div>

      {/* 옵션 버튼 */}
      {!isSubmitted && currentBlank && (
        <div className="space-y-3" ref={optionsRef}>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 font-medium">
              {t(`빈칸 ${currentBlankIndex + 1}/${blanks.length} 선택:`, `Blank ${currentBlankIndex + 1}/${blanks.length}:`)}
            </p>
            {/* 진행 도트 */}
            <div className="flex gap-1">
              {blanks.map((b, i) => (
                <div key={b.id} className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  b.id in filledValues ? "bg-violet-400" : i === currentBlankIndex ? "bg-amber-400 animate-pulse" : "bg-gray-200"
                )} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentBlank.options.map((option, idx) => {
              const usedCount = Object.entries(filledValues).filter(
                ([blankId, val]) => val === option && Number(blankId) !== currentBlank.id
              ).length
              const availableCount = shuffledBlanks.filter(b => b.options.includes(option)).length
              const isUsed = usedCount >= availableCount && filledValues[currentBlank.id] !== option
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(option)}
                  disabled={isUsed}
                  title={isUsed ? t("이미 다른 칸에서 사용했어요", "Already used in another blank") : undefined}
                  className={cn(
                    "px-4 py-3 rounded-xl font-mono text-sm md:text-base font-semibold transition-all border-2 min-h-[44px]",
                    !isUsed && "bg-white hover:bg-violet-50 active:bg-violet-100 border-gray-200 hover:border-violet-400 text-gray-800",
                    isUsed && "bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                  )}
                >
                  {option}
                  {isUsed && <span className="ml-1 text-xs">✗</span>}
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* 리셋 버튼 (채점 전) */}
      {!isSubmitted && Object.keys(filledValues).length > 0 && (
        <button onClick={handleReset} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
          <RotateCcw className="w-3.5 h-3.5" /> {t("다시 하기", "Reset")}
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
                {isCorrect ? t("정답! 🎉", "Correct! 🎉") : t("틀렸어요!", "Wrong!")}
              </span>
            </div>
            <p className={cn("text-sm whitespace-pre-line", isCorrect ? "text-green-800" : "text-amber-800")}>
              {step.explanation}
            </p>

            {/* 오답 시 정답 표시 — 복습 모드에서는 숨김 */}
            {!isCorrect && !isReview && (
              <div className="mt-2 p-2 bg-white/60 rounded-lg">
                <p className="text-xs text-amber-700 font-medium mb-1">{t("정답:", "Answer:")}</p>
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
                isReview ? (
                  <button
                    onClick={() => {
                      setFilledValues({})
                      setCurrentBlankIndex(0)
                      setIsSubmitted(false)
                      setIsCorrect(false)
                      setShowAckButton(false)
                    }}
                    className="mt-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors animate-fade-in"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t("다시 풀기", "Try Again")}
                  </button>
                ) : (
                  <>
                    <p className="mt-2 text-xs text-amber-600 font-medium text-center">{t("🔄 이 문제는 나중에 다시 나와요!", "🔄 This question will come up again later!")}</p>
                    <button
                      onClick={handleAcknowledge}
                      className="mt-2 w-full py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 animate-fade-in"
                    >
                      {t("확인했어요", "Got it")} <ArrowRight className="w-5 h-5" />
                    </button>
                  </>
                )
              ) : (
                <p className="mt-3 text-center text-xs text-amber-500 animate-pulse">{t("설명을 읽어보세요...", "Read the explanation...")}</p>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
