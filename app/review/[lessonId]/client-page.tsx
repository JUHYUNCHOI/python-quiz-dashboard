"use client"

import { useState, useEffect, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, X, BookOpen, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { markQuizComplete } from "@/lib/mark-lesson-complete"
import { saveStepAnswer } from "@/lib/save-step-answer"
import { ReviewStepRenderer } from "./ReviewStepRenderer"
import { lessonsData } from "./data/lessons"
import type { StepContent, LessonData } from "./data/types"
import { LanguageToggle } from "@/components/language-toggle"

// ============================================================
// 유틸 함수들
// ============================================================

interface ReviewStep {
  step: StepContent
  originalIndex: number   // lesson.steps 내 원래 인덱스
  chapterTitle?: string   // 직전 chapter 스텝의 제목
}

// 복습용 스텝 추출 (quiz, errorQuiz, practice, interleaving, explain+predict)
function extractReviewSteps(lesson: LessonData): ReviewStep[] {
  const result: ReviewStep[] = []
  let currentChapterTitle: string | undefined

  for (let i = 0; i < lesson.steps.length; i++) {
    const step = lesson.steps[i]
    if (step.type === "chapter") {
      currentChapterTitle = step.content.title
    } else if (
      step.type === "quiz" ||
      step.type === "errorQuiz" ||
      step.type === "practice" ||
      step.type === "interleaving" ||
      (step.type === "explain" && step.content.predict)
    ) {
      result.push({ step, originalIndex: i, chapterTitle: currentChapterTitle })
    }
  }
  return result
}

// 힌트용: 직전에 나오는 explain 스텝들의 핵심 내용
function getNearbyExplains(lesson: LessonData, beforeIndex: number): string[][] {
  const hints: string[][] = []
  for (let i = beforeIndex - 1; i >= 0 && hints.length < 2; i--) {
    const s = lesson.steps[i]
    if (s.type === "chapter") break
    if (s.type === "explain" && s.content.lines?.length > 0) {
      hints.unshift(s.content.lines)
    }
  }
  return hints
}

// 스텝 문제 미리보기 텍스트
function getStepPreview(step: StepContent): string {
  switch (step.type) {
    case "quiz":
    case "errorQuiz":
      return step.content.question
    case "practice":
    case "interleaving":
      return step.content.task
    case "explain":
      return step.content.predict?.question ?? "예측 퀴즈"
    default:
      return ""
  }
}

// ============================================================
// 메인 컴포넌트
// ============================================================
export default function ReviewPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const lessonId = resolvedParams.lessonId
  const router = useRouter()
  const { t } = useLanguage()
  const { user, profile, isLoading: authLoading } = useAuth()
  const isTeacher = profile?.role === "teacher"

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login")
  }, [user, authLoading, router])

  const teacherAsStudent = typeof window !== "undefined" && localStorage.getItem("teacher-as-student") === "true"
  const effectiveTeacher = isTeacher && !teacherAsStudent
  const { play } = useSoundEffect()

  // 복습 레슨 데이터 로드
  const lesson = lessonsData[lessonId]
  const reviewSteps = lesson ? extractReviewSteps(lesson) : []

  // localStorage 진도 복원
  const storageKey = `review-progress-${lessonId}`
  const loadSaved = () => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) return JSON.parse(raw)
    } catch {}
    return null
  }
  const saved = loadSaved()

  const [currentIndex, setCurrentIndex] = useState<number>(saved?.currentIndex ?? 0)
  const [score, setScore] = useState<number>(saved?.score ?? 0)
  const [totalAttempted, setTotalAttempted] = useState<number>(saved?.totalAttempted ?? 0)
  const [correctCount, setCorrectCount] = useState<number>(saved?.correctCount ?? 0)
  const [sessionAttempts, setSessionAttempts] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set(saved?.completedSteps ?? []))
  const [wrongSteps, setWrongSteps] = useState<number[]>(saved?.wrongSteps ?? [])
  const [showResults, setShowResults] = useState(false)
  const [showLesson, setShowLesson] = useState(false)
  // 리셋 카운터 — StepRenderer key 변경용
  const [resetCount, setResetCount] = useState(0)

  const isCurrentStepCompleted = completedSteps.has(currentIndex)

  // 진도 저장
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        currentIndex, score, totalAttempted, correctCount,
        completedSteps: Array.from(completedSteps),
        wrongSteps,
      }))
    } catch {}
  }, [currentIndex, score, totalAttempted, correctCount, completedSteps, wrongSteps, storageKey])

  const currentReview = reviewSteps[currentIndex]

  // ──────────────────────────────────────────────
  // 정답 처리
  // ──────────────────────────────────────────────
  const handleCorrect = useCallback(() => {
    if (completedSteps.has(currentIndex)) return
    play("correct")
    setCorrectCount(prev => prev + 1)
    setTotalAttempted(prev => prev + 1)
    setSessionAttempts(prev => prev + 1)
    setScore(prev => prev + 10)
    setCompletedSteps(prev => new Set([...prev, currentIndex]))

    if (!effectiveTeacher && currentReview) {
      saveStepAnswer({
        lessonId,
        progressType: "review",
        stepId: String(currentReview.originalIndex),
        stepType: currentReview.step.type,
        isCorrect: true,
        userAnswer: {},
        correctAnswer: {},
      })
    }
  }, [currentIndex, completedSteps, play, effectiveTeacher, currentReview, lessonId])

  const handleWrong = useCallback(() => {
    if (completedSteps.has(currentIndex)) return
    play("wrong")
    setTotalAttempted(prev => prev + 1)
    setSessionAttempts(prev => prev + 1)
    setWrongSteps(prev => [...prev, currentIndex])
    setCompletedSteps(prev => new Set([...prev, currentIndex]))

    if (!effectiveTeacher && currentReview) {
      saveStepAnswer({
        lessonId,
        progressType: "review",
        stepId: String(currentReview.originalIndex),
        stepType: currentReview.step.type,
        isCorrect: false,
        userAnswer: {},
        correctAnswer: {},
      })
    }
  }, [currentIndex, completedSteps, play, effectiveTeacher, currentReview, lessonId])

  // ──────────────────────────────────────────────
  // 스텝 이동
  // ──────────────────────────────────────────────
  const goToStep = (idx: number) => {
    setCurrentIndex(idx)
    setShowLesson(false)
    setResetCount(prev => prev + 1)
  }

  const goPrev = () => { if (currentIndex > 0) goToStep(currentIndex - 1) }
  const goNext = () => {
    if (currentIndex < reviewSteps.length - 1) {
      goToStep(currentIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  // 키보드
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/curriculum")
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [router])

  // 결과 화면 표시 시 완료 저장 (세션에서 실제로 답변한 경우에만)
  useEffect(() => {
    if (showResults && sessionAttempts > 0) {
      const pct = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0
      if (pct >= 70) markQuizComplete(lessonId)
    }
  }, [showResults, totalAttempted, correctCount, lessonId, sessionAttempts])

  if (authLoading || !user) return null

  // ──────────────────────────────────────────────
  // 레슨 없음 or 복습 스텝 없음
  // ──────────────────────────────────────────────
  if (!lesson || reviewSteps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-gray-900">{t("복습할 문제가 없어요", "No review questions found")}</p>
          <p className="text-gray-500">{t("먼저 수업을 완료해주세요!", "Complete the lesson first!")}</p>
          <button
            onClick={() => router.push(`/learn/${lessonId}`)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500"
          >
            {t("수업으로 가기", "Go to Lesson")}
          </button>
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────────────
  // 결과 화면
  // ──────────────────────────────────────────────
  if (showResults) {
    const percentage = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0
    const isPerfect = wrongSteps.length === 0

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b border-orange-100 bg-white/95 backdrop-blur-lg sticky top-0 z-10">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3 flex items-center gap-3">
            <button onClick={() => router.push("/curriculum")} className="rounded-full p-2 hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 flex-1">
              {lesson.title} — {t("복습 결과", "Review Results")}
            </h1>
          </div>
        </div>

        <div className="max-w-[600px] mx-auto px-4 py-8 md:py-12">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm text-center space-y-6">
            <div className="text-6xl md:text-7xl">
              {isPerfect ? "🎉" : percentage >= 70 ? "👍" : "💪"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {isPerfect
                ? t("완벽해요!", "Perfect!")
                : percentage >= 70
                  ? t("잘했어요!", "Great job!")
                  : t("더 연습해봐요!", "Keep practicing!")}
            </h2>

            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-emerald-500">{correctCount}</p>
                <p className="text-sm text-gray-500">{t("맞음", "Correct")}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-400">{wrongSteps.length}</p>
                <p className="text-sm text-gray-500">{t("틀림", "Wrong")}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-500">{percentage}%</p>
                <p className="text-sm text-gray-500">{t("정답률", "Accuracy")}</p>
              </div>
            </div>

            {wrongSteps.length > 0 && (
              <div className="bg-orange-50 rounded-xl p-4 text-left space-y-2">
                <p className="font-bold text-orange-700 text-sm">{t("틀린 문제:", "Wrong answers:")}</p>
                {wrongSteps.map((idx, i) => {
                  const r = reviewSteps[idx]
                  if (!r) return null
                  const preview = getStepPreview(r.step)
                  return (
                    <p key={i} className="text-sm text-orange-600 truncate">
                      {i + 1}. {r.chapterTitle ? `[${r.chapterTitle}] ` : ""}{preview}
                    </p>
                  )
                })}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              {wrongSteps.length > 0 && (
                <button
                  onClick={() => router.push(`/learn/${lessonId}`)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-bold"
                >
                  <BookOpen className="w-5 h-5" />
                  {t("수업 다시 보기", "Review Lesson")}
                </button>
              )}
              <button
                onClick={() => {
                  setShowResults(false)
                  setCurrentIndex(0)
                  setScore(0)
                  setTotalAttempted(0)
                  setCorrectCount(0)
                  setSessionAttempts(0)
                  setCompletedSteps(new Set())
                  setWrongSteps([])
                  setResetCount(prev => prev + 1)
                  try { localStorage.removeItem(storageKey) } catch {}
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
              >
                <RotateCcw className="w-5 h-5" />
                {t("다시 풀기", "Try Again")}
              </button>
              <button
                onClick={() => router.push("/curriculum")}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
              >
                {t("돌아가기", "Back to Curriculum")}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ──────────────────────────────────────────────
  // 메인 복습 화면
  // ──────────────────────────────────────────────
  const nearbyExplains = currentReview
    ? getNearbyExplains(lesson, currentReview.originalIndex)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 바 */}
      <div className="border-b border-orange-100 bg-white/95 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3 flex items-center gap-3 md:gap-4">
          <button
            onClick={() => router.push("/curriculum")}
            className="rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </button>

          {/* 진행 도트 */}
          <div className="flex-1 flex items-center gap-1 flex-wrap">
            {reviewSteps.map((rs, idx) => {
              const isCurrent = idx === currentIndex
              const isCompleted = completedSteps.has(idx)
              const isWrong = wrongSteps.includes(idx)
              const isClickable = effectiveTeacher || isCompleted || isCurrent
              const typeLabel = rs.step.type === "quiz" ? "객관식" : rs.step.type === "practice" ? "빈칸" : rs.step.type === "interleaving" ? "복습" : rs.step.type === "errorQuiz" ? "오류찾기" : rs.step.type
              return (
                <div key={idx} className="relative group">
                  <button
                    disabled={!isClickable}
                    onClick={() => { if (isClickable && !isCurrent) goToStep(idx) }}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      isCurrent
                        ? "w-4 h-2.5 bg-indigo-500"
                        : isWrong
                          ? "w-2.5 h-2.5 bg-red-400 hover:bg-red-300 cursor-pointer"
                          : (effectiveTeacher || isCompleted)
                            ? "w-2.5 h-2.5 bg-emerald-400 hover:bg-emerald-500 cursor-pointer"
                            : "w-2.5 h-2.5 bg-gray-200 cursor-default"
                    )}
                  />
                  {/* 툴팁 */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                    <div className="bg-gray-800 text-white text-[11px] rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                      <p className="font-semibold">{idx + 1}번 · {typeLabel}</p>
                      {rs.chapterTitle && <p className="text-gray-300 mt-0.5">{rs.chapterTitle}</p>}
                    </div>
                    <div className="w-2 h-2 bg-gray-800 rotate-45 -mt-1" />
                  </div>
                </div>
              )
            })}
          </div>

          <span className="text-sm md:text-base font-bold text-gray-500 tabular-nums shrink-0">
            {currentIndex + 1}<span className="text-gray-300">/</span>{reviewSteps.length}
          </span>

          {/* Language toggle */}
          <LanguageToggle className="shrink-0" />
        </div>

        {/* 레슨명 + 챕터명 */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-2 flex items-center gap-1.5">
          <span className="text-xs font-semibold text-orange-500">{lesson.title}</span>
          {currentReview?.chapterTitle && (
            <>
              <span className="text-xs text-gray-300">›</span>
              <span className="text-xs text-gray-400">{currentReview.chapterTitle}</span>
            </>
          )}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 pb-40">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">

          {/* 수업 내용 힌트 */}
          {currentReview && (
            <div className="mb-5">
              <button
                onClick={() => setShowLesson(!showLesson)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 text-orange-600 font-bold text-xs transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                {showLesson
                  ? t("수업 내용 닫기 ▲", "Hide lesson ▲")
                  : t("📖 잘 모르겠으면 수업 내용 보기", "📖 View lesson hint")}
              </button>
              {showLesson && (
                <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 max-h-52 overflow-y-auto">
                  {nearbyExplains.length > 0 ? (
                    <>
                      {nearbyExplains.map((lines, i) => (
                        <div key={i} className={cn("text-xs text-amber-800 leading-relaxed", i > 0 && "mt-2 pt-2 border-t border-amber-100")}>
                          {lines.map((line, j) => <p key={j}>{line}</p>)}
                        </div>
                      ))}
                      <button
                        onClick={() => router.push(`/learn/${lessonId}`)}
                        className="mt-2 text-amber-600 font-bold text-xs hover:underline"
                      >
                        {t("전체 수업 보기 →", "View full lesson →")}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => router.push(`/learn/${lessonId}`)}
                      className="text-amber-600 font-bold text-xs hover:underline"
                    >
                      {t("수업 페이지에서 보기 →", "View in lesson →")}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 복습 스텝 렌더러 */}
          {currentReview && (
            <ReviewStepRenderer
              key={`review-${currentIndex}-${resetCount}`}
              step={currentReview.step}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              language={lesson.language ?? "cpp"}
            />
          )}

          {/* 완료된 문제 — 다시 풀기 */}
          {isCurrentStepCompleted && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  setCompletedSteps(prev => { const next = new Set(prev); next.delete(currentIndex); return next })
                  setWrongSteps(prev => prev.filter(i => i !== currentIndex))
                  setResetCount(prev => prev + 1)
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t("이 문제 다시 풀기", "Redo this question")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-20">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-2.5">
          <div className="flex gap-3 md:gap-4 justify-center">
            <button
              onClick={goPrev}
              className={cn(
                "flex items-center justify-center gap-1 rounded-xl font-bold transition-colors px-4 py-2.5 md:px-6 md:py-3",
                currentIndex > 0 ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "invisible"
              )}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{t("이전", "Prev")}</span>
            </button>
            <button
              onClick={goNext}
              disabled={!isCurrentStepCompleted && !effectiveTeacher}
              className={cn(
                "flex items-center justify-center gap-1 rounded-xl font-bold transition-colors px-4 py-2.5 md:px-6 md:py-3",
                (isCurrentStepCompleted || effectiveTeacher)
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <span className="text-sm md:text-base">
                {currentIndex === reviewSteps.length - 1 ? t("결과 보기", "See Results") : t("다음", "Next")}
              </span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
