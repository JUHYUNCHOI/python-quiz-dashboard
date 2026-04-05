"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { lessonsData, bilingualLessons, lessonVariants } from "@/components/learn/lesson-registry"
import { Check, X, Loader2, HelpCircle, PenLine, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepAnswerRow {
  step_id: string
  is_correct: boolean
  user_answer: Record<string, unknown>
  correct_answer: Record<string, unknown>
  updated_at: string
}

interface StepInfo {
  title: string
  type?: string
  options?: string[]
  fillBlanks?: Array<{ id: number; answer: string }>
}

interface Props {
  studentId: string
  lessonId: string
  progressType: "learn" | "review"
  lang?: "ko" | "en"
}

function formatDate(iso: string) {
  if (!iso) return ""
  try {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  } catch { return "" }
}

function StepTypeIcon({ type }: { type: string }) {
  if (type === "fillblank") return <PenLine className="w-3.5 h-3.5 text-violet-500" />
  if (type === "predict") return <Terminal className="w-3.5 h-3.5 text-emerald-500" />
  return <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
}

function StepTypeLabel({ type }: { type: string }) {
  if (type === "fillblank") return <span className="text-[9px] text-violet-500 font-bold">빈칸</span>
  if (type === "predict") return <span className="text-[9px] text-emerald-500 font-bold">예측</span>
  return <span className="text-[9px] text-amber-500 font-bold">퀴즈</span>
}

export function LessonStepAnswersView({ studentId, lessonId, progressType, lang = "ko" }: Props) {
  const [answers, setAnswers] = useState<StepAnswerRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const supabase = createClient()
    supabase
      .from("lesson_step_answers")
      .select("step_id, is_correct, user_answer, correct_answer, updated_at")
      .eq("user_id", studentId)
      .eq("lesson_id", lessonId)
      .eq("progress_type", progressType)
      .order("updated_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error("[LessonStepAnswersView]", error.message)
        setAnswers((data as StepAnswerRow[]) || [])
        setIsLoading(false)
      })
  }, [studentId, lessonId, progressType])

  // 레슨 데이터에서 스텝 정보 조회
  const lesson =
    lessonId in lessonVariants
      ? lessonVariants[lessonId]?.["turtle"]?.[lang]   // variant 레슨은 기본 variant 사용
      : lessonId in bilingualLessons
        ? bilingualLessons[lessonId][lang]
        : lessonsData[lessonId]

  const stepMap = new Map<string, StepInfo>()
  if (lesson) {
    for (const chapter of lesson.chapters) {
      for (const step of chapter.steps) {
        stepMap.set(step.id, {
          title: step.title,
          type: step.type,
          options: step.options,
          fillBlanks: step.fillBlanks,
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-5 gap-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400" />
        <span className="text-xs text-gray-400">불러오는 중...</span>
      </div>
    )
  }

  if (answers.length === 0) {
    return (
      <div className="py-4 px-3 text-center space-y-1.5 bg-gray-50 rounded-lg">
        <p className="text-xs font-medium text-gray-500">저장된 답변이 없어요</p>
        <p className="text-[11px] text-gray-400 leading-snug">
          이 레슨은 답변 저장 기능 추가 전에<br/>완료되어 기록이 없습니다
        </p>
      </div>
    )
  }

  const correctCount = answers.filter(a => a.is_correct).length

  return (
    <div className="space-y-2 mt-2">
      {/* 요약 */}
      <div className="flex items-center gap-3 px-2 py-2 bg-gray-50 rounded-lg">
        <span className="text-xs font-bold text-gray-600">{answers.length}개 스텝 기록</span>
        <span className="text-xs text-green-600 font-bold">✓ {correctCount}개 정답</span>
        {answers.length - correctCount > 0 && (
          <span className="text-xs text-red-500 font-bold">✗ {answers.length - correctCount}개 오답</span>
        )}
        <span className="ml-auto text-[10px] text-gray-400">
          {Math.round((correctCount / answers.length) * 100)}% 정확도
        </span>
      </div>

      {/* 스텝별 답변 */}
      {answers.map(answer => {
        const stepInfo = stepMap.get(answer.step_id)
        const stepType = stepInfo?.type || "quiz"
        const isQuizOrPredict = stepType === "quiz" || stepType === "predict"
        const isFillblank = stepType === "fillblank"
        const userIdx = (answer.user_answer as { selectedIdx?: number })?.selectedIdx
        const correctIdx = (answer.correct_answer as { selectedIdx?: number })?.selectedIdx

        return (
          <div
            key={answer.step_id}
            className={cn(
              "p-3 rounded-lg border-l-2",
              answer.is_correct
                ? "bg-green-50 border-l-green-400"
                : "bg-red-50 border-l-red-400"
            )}
          >
            {/* 헤더 */}
            <div className="flex items-center gap-1.5 mb-2">
              {answer.is_correct
                ? <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                : <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              }
              <StepTypeIcon type={stepType} />
              <span className="text-xs font-semibold text-gray-700 truncate flex-1">
                {stepInfo?.title || answer.step_id}
              </span>
              <StepTypeLabel type={stepType} />
              <span className="text-[9px] text-gray-400 flex-shrink-0">{formatDate(answer.updated_at)}</span>
            </div>

            {/* Quiz / Predict: 선택지 표시 */}
            {isQuizOrPredict && stepInfo?.options && (
              <div className="space-y-1 pl-5">
                {stepInfo.options.map((option, idx) => {
                  const isUserSelected = userIdx === idx
                  const isCorrectOption = correctIdx === idx
                  if (!isUserSelected && !isCorrectOption) return null
                  return (
                    <div key={idx} className={cn(
                      "text-[11px] px-2 py-1 rounded flex items-center gap-1.5",
                      isUserSelected && isCorrectOption ? "bg-green-200 text-green-800" :
                      isUserSelected && !isCorrectOption ? "bg-red-200 text-red-800" :
                      "bg-green-100 text-green-700 border border-green-300"
                    )}>
                      {isUserSelected && !isCorrectOption && <X className="w-3 h-3 flex-shrink-0" />}
                      {isCorrectOption && <Check className="w-3 h-3 flex-shrink-0" />}
                      <span className="truncate">{option}</span>
                      <span className="ml-auto text-[9px] flex-shrink-0 font-bold">
                        {isUserSelected && isCorrectOption ? "✓ 정답" :
                         isUserSelected ? "학생 선택" : "정답"}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Fillblank: 빈칸 답변 표시 */}
            {isFillblank && stepInfo?.fillBlanks && (
              <div className="flex flex-wrap gap-1 pl-5">
                {stepInfo.fillBlanks.map(blank => {
                  const userVal = String((answer.user_answer as Record<string | number, unknown>)[blank.id] ?? "?")
                  const correct = blank.answer
                  const isRight = userVal === correct
                  return (
                    <div key={blank.id} className={cn(
                      "text-[11px] px-2 py-0.5 rounded font-mono flex items-center gap-1",
                      isRight ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    )}>
                      <span className="text-[9px] text-gray-500">{blank.id + 1}:</span>
                      <span className="font-bold">{userVal}</span>
                      {!isRight && (
                        <span className="text-green-700 font-bold">→ {correct}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
