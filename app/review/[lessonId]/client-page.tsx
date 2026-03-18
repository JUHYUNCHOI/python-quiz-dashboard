"use client"

import { useState, useEffect, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, X, BookOpen, RotateCcw, Trophy, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { markQuizComplete } from "@/lib/mark-lesson-complete"
import { StepRenderer } from "@/components/learn/step-renderer"
import { lessonsData, bilingualLessons } from "@/components/learn/lesson-registry"
import type { LessonStep, LessonData } from "@/components/learn/types"

// ============================================================
// 수업 레슨에서 quiz/predict/fillblank 스텝만 추출
// ============================================================
function extractReviewSteps(lesson: LessonData): { step: LessonStep; chapterId: string; chapterTitle: string; chapterEmoji: string }[] {
  const reviewTypes = new Set(["quiz", "predict", "fillblank", "tryit", "practice", "mission"])
  const steps: { step: LessonStep; chapterId: string; chapterTitle: string; chapterEmoji: string }[] = []

  for (const chapter of lesson.chapters) {
    for (const step of chapter.steps) {
      if (reviewTypes.has(step.type)) {
        steps.push({ step, chapterId: chapter.id, chapterTitle: chapter.title, chapterEmoji: chapter.emoji })
      }
    }
  }
  return steps
}

// 해당 챕터의 explain 스텝들을 가져오기
function getChapterExplains(lesson: LessonData, chapterId: string): LessonStep[] {
  const chapter = lesson.chapters.find(ch => ch.id === chapterId)
  if (!chapter) return []
  return chapter.steps.filter(s => s.type === "explain")
}

// ============================================================
// 메인 컴포넌트
// ============================================================
export default function ReviewPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = use(params)
  const lessonId = resolvedParams.lessonId
  const router = useRouter()
  const { t, lang } = useLanguage()
  const { profile } = useAuth()
  const isTeacher = profile?.role === "teacher"
  const teacherAsStudent = typeof window !== "undefined" && localStorage.getItem("teacher-as-student") === "true"
  const effectiveTeacher = isTeacher && !teacherAsStudent
  const { play } = useSoundEffect()

  // 수업 페이지와 동일한 한/영 레슨 선택 로직
  const isBilingual = lessonId in bilingualLessons
  const lesson = isBilingual ? bilingualLessons[lessonId][lang] : lessonsData[lessonId]
  const reviewSteps = lesson ? extractReviewSteps(lesson) : []

  // localStorage에서 진도 복원
  const storageKey = `review-progress-${lessonId}`
  const loadSaved = () => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) return JSON.parse(saved)
    } catch {}
    // 이미 완료한 학생: 모든 스텝을 정답으로 채움
    try {
      const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]").map(String)
      const completedQuizzes = JSON.parse(localStorage.getItem("completedQuizzes") || "[]").map(String)
      const wasCompleted = completedLessons.includes(String(lessonId)) || completedQuizzes.includes(String(lessonId))
      if (wasCompleted && reviewSteps.length > 0) {
        const allCompleted = reviewSteps.map((_, i) => i)
        const allAnswers: Record<number, number> = {}
        reviewSteps.forEach((r, i) => {
          if (r.step.answer !== undefined) allAnswers[i] = r.step.answer
        })
        return {
          currentIndex: 0,
          score: reviewSteps.length * 10,
          totalAttempted: reviewSteps.length,
          correctCount: reviewSteps.length,
          completedSteps: allCompleted,
          wrongSteps: [],
          savedAnswers: allAnswers,
        }
      }
    } catch {}
    return null
  }
  const saved = loadSaved()

  const [currentIndex, setCurrentIndex] = useState<number>(saved?.currentIndex ?? 0)
  const [score, setScore] = useState<number>(saved?.score ?? 0)
  const [totalAttempted, setTotalAttempted] = useState<number>(saved?.totalAttempted ?? 0)
  const [correctCount, setCorrectCount] = useState<number>(saved?.correctCount ?? 0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set(saved?.completedSteps ?? []))
  const [showResults, setShowResults] = useState(false)
  const [wrongSteps, setWrongSteps] = useState<number[]>(saved?.wrongSteps ?? [])

  // StepRenderer 관련 상태
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizAttempts, setQuizAttempts] = useState(0)
  const [hintLevel, setHintLevel] = useState(0)
  const [isCurrentStepCompleted, setIsCurrentStepCompleted] = useState(saved?.completedSteps?.includes(saved?.currentIndex ?? 0) ?? false)
  const [showLesson, setShowLesson] = useState(false)

  // 각 스텝별 선택한 답 저장 (quiz/predict용)
  const [savedAnswers, setSavedAnswers] = useState<Record<number, number>>(saved?.savedAnswers ?? {})
  // 리셋 카운터 (key 변경용)
  const [resetCount, setResetCount] = useState(0)

  // 진도 저장
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        currentIndex, score, totalAttempted, correctCount,
        completedSteps: Array.from(completedSteps),
        wrongSteps, savedAnswers,
      }))
    } catch {}
  }, [currentIndex, score, totalAttempted, correctCount, completedSteps, wrongSteps, savedAnswers, storageKey])

  // 현재 스텝
  const currentReview = reviewSteps[currentIndex]

  // 레슨 없으면 에러
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

  // 퀴즈 정답 처리
  const handleQuizAnswer = useCallback((idx: number) => {
    setSelectedAnswer(idx)
    setSavedAnswers(prev => ({ ...prev, [currentIndex]: idx }))
    setQuizAttempts(prev => prev + 1)
    const step = reviewSteps[currentIndex]?.step
    if (!step) return

    const isCorrect = idx === step.answer
    if (isCorrect) {
      play("correct")
      setShowExplanation(true)
      if (!completedSteps.has(currentIndex)) {
        setCorrectCount(prev => prev + 1)
        setTotalAttempted(prev => prev + 1)
        setScore(prev => prev + 10)
        setCompletedSteps(prev => new Set([...prev, currentIndex]))
        setIsCurrentStepCompleted(true)
      }
    } else {
      play("wrong")
      if (quizAttempts >= 1) {
        setShowExplanation(true)
        if (!completedSteps.has(currentIndex)) {
          setTotalAttempted(prev => prev + 1)
          setWrongSteps(prev => [...prev, currentIndex])
          setCompletedSteps(prev => new Set([...prev, currentIndex]))
          setIsCurrentStepCompleted(true)
        }
      }
    }
  }, [currentIndex, reviewSteps, completedSteps, quizAttempts, play])

  // 퀴즈 설명 확인 후
  const acknowledgeQuiz = useCallback(() => {
    // 다음 문제로
    if (currentIndex < reviewSteps.length - 1) {
      goToStep(currentIndex + 1)
    } else {
      setShowResults(true)
    }
  }, [currentIndex, reviewSteps.length])

  // fillblank 완료 처리
  const handleStepComplete = useCallback((correct: boolean) => {
    if (!completedSteps.has(currentIndex)) {
      setTotalAttempted(prev => prev + 1)
      if (correct) {
        setCorrectCount(prev => prev + 1)
        setScore(prev => prev + 10)
        play("correct")
      } else {
        setWrongSteps(prev => [...prev, currentIndex])
        play("wrong")
      }
      setCompletedSteps(prev => new Set([...prev, currentIndex]))
      setIsCurrentStepCompleted(true)
    }
  }, [currentIndex, completedSteps, play])

  const handleStepAcknowledge = useCallback(() => {
    if (currentIndex < reviewSteps.length - 1) {
      goToStep(currentIndex + 1)
    } else {
      setShowResults(true)
    }
  }, [currentIndex, reviewSteps.length])

  // 스텝 이동
  const goToStep = (idx: number) => {
    setCurrentIndex(idx)
    setHintLevel(0)
    setShowLesson(false)
    const wasCompleted = completedSteps.has(idx)
    setIsCurrentStepCompleted(wasCompleted)
    // 이미 풀었던 문제면 답 복원
    if (wasCompleted && savedAnswers[idx] !== undefined) {
      setSelectedAnswer(savedAnswers[idx])
      setShowExplanation(true)
      setQuizAttempts(2) // 이미 풀었으므로
    } else {
      setSelectedAnswer(null)
      setShowExplanation(false)
      setQuizAttempts(0)
    }
  }

  // 이전/다음
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

  // 결과 화면
  if (showResults) {
    const percentage = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0
    const isPerfect = wrongSteps.length === 0

    // 완료 시 저장
    useEffect(() => {
      if (percentage >= 70) {
        markQuizComplete(lessonId)
      }
    }, [])

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b border-orange-100 bg-white/95 backdrop-blur-lg sticky top-0 z-10">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3 flex items-center gap-3">
            <button onClick={() => router.push("/curriculum")} className="rounded-full p-2 hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 flex-1">{lesson.emoji} {lesson.title} — {t("복습 결과", "Review Results")}</h1>
          </div>
        </div>

        <div className="max-w-[600px] mx-auto px-4 py-8 md:py-12">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm text-center space-y-6">
            <div className="text-6xl md:text-7xl">
              {isPerfect ? "🎉" : percentage >= 70 ? "👍" : "💪"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {isPerfect ? t("완벽해요!", "Perfect!") : percentage >= 70 ? t("잘했어요!", "Great job!") : t("더 연습해봐요!", "Keep practicing!")}
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
                <p className="font-bold text-orange-700 text-sm">{t("틀린 문제의 챕터:", "Wrong answers from:")}</p>
                {wrongSteps.map((idx, i) => {
                  const r = reviewSteps[idx]
                  return (
                    <p key={i} className="text-sm text-orange-600">
                      {r.chapterEmoji} {r.chapterTitle} — {r.step.title}
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
                  setCompletedSteps(new Set())
                  setWrongSteps([])
                  try { localStorage.removeItem(storageKey) } catch {}
                  goToStep(0)
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 바 — 수업 페이지와 동일 스타일 */}
      <div className="border-b border-orange-100 bg-white/95 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3 flex items-center gap-3 md:gap-4">
          <button
            onClick={() => router.push("/curriculum")}
            className="rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </button>

          {/* 진행 바 — 수업과 같은 점(dot) 스타일 */}
          <div className="flex-1 flex items-center gap-[2px] h-2.5 md:h-3">
            {reviewSteps.map((_, idx) => {
              const isCurrent = idx === currentIndex
              const isCompleted = completedSteps.has(idx)
              const isWrong = wrongSteps.includes(idx)
              const isClickable = effectiveTeacher || isCompleted || isCurrent
              return (
                <button
                  key={idx}
                  disabled={!isClickable}
                  onClick={() => { if (isClickable && !isCurrent) goToStep(idx) }}
                  className={cn(
                    "h-full flex-1 transition-all duration-300 min-w-[3px]",
                    isCurrent
                      ? "bg-indigo-500 scale-y-125"
                      : isWrong
                        ? "bg-red-400 hover:bg-red-300 cursor-pointer"
                        : (effectiveTeacher || isCompleted)
                          ? "bg-emerald-400 hover:bg-emerald-300 cursor-pointer"
                          : "bg-gray-200",
                    idx === 0 && "rounded-l-full",
                    idx === reviewSteps.length - 1 && "rounded-r-full",
                  )}
                />
              )
            })}
          </div>

          <span className="text-sm md:text-base font-bold text-gray-500 tabular-nums shrink-0">
            {currentIndex + 1}<span className="text-gray-300">/</span>{reviewSteps.length}
          </span>
        </div>

        {/* 챕터 정보 */}
        {currentReview && (
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-2">
            <p className="text-xs text-gray-500">
              {currentReview.chapterEmoji} {currentReview.chapterTitle}
            </p>
          </div>
        )}
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 pb-24">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          {currentReview && (
            <StepRenderer
              key={`review-${currentIndex}-${resetCount}`}
              step={currentReview.step}
              lang={lang}
              isCompleted={effectiveTeacher ? false : isCurrentStepCompleted}
              hintLevel={hintLevel}
              onHintLevelChange={setHintLevel}
              onSuccess={() => {
                if (!completedSteps.has(currentIndex)) {
                  setCorrectCount(prev => prev + 1)
                  setTotalAttempted(prev => prev + 1)
                  setScore(prev => prev + 10)
                  setCompletedSteps(prev => new Set([...prev, currentIndex]))
                  setIsCurrentStepCompleted(true)
                  play("correct")
                }
              }}
              selectedAnswer={selectedAnswer}
              showExplanation={showExplanation}
              quizAttempts={quizAttempts}
              onQuizAnswer={handleQuizAnswer}
              onQuizAcknowledge={acknowledgeQuiz}
              onStepComplete={handleStepComplete}
              onStepAcknowledge={handleStepAcknowledge}
              isReview={true}
            />
          )}

          {/* 완료된 문제 — 다시 풀기 버튼 */}
          {isCurrentStepCompleted && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  setSelectedAnswer(null)
                  setShowExplanation(false)
                  setQuizAttempts(0)
                  setIsCurrentStepCompleted(false)
                  setResetCount(prev => prev + 1)
                  // savedAnswers에서 제거
                  setSavedAnswers(prev => {
                    const next = { ...prev }
                    delete next[currentIndex]
                    return next
                  })
                  // completedSteps에서 제거
                  setCompletedSteps(prev => {
                    const next = new Set(prev)
                    next.delete(currentIndex)
                    return next
                  })
                  // wrongSteps에서 제거
                  setWrongSteps(prev => prev.filter(i => i !== currentIndex))
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t("이 문제 다시 풀기", "Redo this question")}
              </button>
            </div>
          )}

          {/* 틀렸을 때 — 수업 내용 인라인 보기 */}
          {isCurrentStepCompleted && wrongSteps.includes(currentIndex) && (
            <div className="mt-4">
              <button
                onClick={() => setShowLesson(!showLesson)}
                className="flex items-center gap-2 px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 text-orange-700 font-bold text-sm w-full transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                {showLesson
                  ? t("수업 내용 닫기 ▲", "Hide lesson ▲")
                  : t("📖 이 부분 수업 내용 보기 ▼", "📖 View lesson content ▼")}
              </button>
              {showLesson && currentReview && (
                <div className="mt-3 space-y-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <p className="text-indigo-700 font-bold text-sm">
                    {currentReview.chapterEmoji} {currentReview.chapterTitle}
                  </p>
                  {getChapterExplains(lesson, currentReview.chapterId).map((explain, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm space-y-2">
                      {explain.content && (
                        <div className="text-gray-800 text-sm font-medium whitespace-pre-line">{explain.content}</div>
                      )}
                      {explain.code && (
                        <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs overflow-x-auto font-mono">{explain.code}</pre>
                      )}
                    </div>
                  ))}
                  {getChapterExplains(lesson, currentReview.chapterId).length === 0 && (
                    <button
                      onClick={() => router.push(`/learn/${lessonId}`)}
                      className="text-indigo-600 font-bold text-sm hover:underline"
                    >
                      {t("수업 페이지에서 보기 →", "View in lesson →")}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 하단 네비게이션 — 수업 페이지와 동일 */}
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
