"use client"

import { useEffect, useCallback, useMemo, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { RequireAuth } from "@/components/require-auth"
import { X, Clock, ChevronLeft, ChevronRight, Check, AlertCircle, Coffee, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CodeDisplay } from "@/components/code-display"
import { CelebrationScreen } from "@/components/celebration-screen"
import { ExplanationPanel } from "@/components/explanation-panel"
import { cn } from "@/lib/utils"
import { useQuizState, getComboTier } from "@/hooks/use-quiz-state"
import { getGradeInfo } from "@/lib/spaced-repetition"
import { createSmartSession } from "@/lib/quiz-question-selector"
import { useQuizTimer } from "@/hooks/use-quiz-timer"
import { useFocusTracker } from "@/hooks/use-focus-tracker"
import { useSwipe } from "@/hooks/use-swipe"
import { useQuizKeyboard } from "@/hooks/use-quiz-keyboard"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { SoundToggle } from "@/components/sound-toggle"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"
import { pythonQuestions } from "@/data/questions/python-questions"
import { cppQuestions } from "@/data/questions/cpp-questions"

// 셔플 (Fisher-Yates)
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function QuizPage() {
  const router = useRouter()

  // 설정 없이 직접 접근하면 setup으로 redirect
  const hasSettings = useRef<boolean | null>(null)
  if (typeof window !== "undefined" && hasSettings.current === null) {
    hasSettings.current = !!sessionStorage.getItem("quizSettings")
  }
  useEffect(() => {
    if (hasSettings.current === false) {
      router.replace("/quiz/setup")
    }
  }, [router])

  // 코스에 맞는 문제 배열 — 스마트 세션 (간격 반복 기반)
  const smartSession = useMemo(() => {
    if (typeof window === "undefined") return { questions: pythonQuestions, reviewCount: 0, newCount: 0 }
    try {
      const raw = sessionStorage.getItem("quizSettings")
      if (raw) {
        const parsed = JSON.parse(raw)
        const pool = parsed.course === "cpp" ? cppQuestions : pythonQuestions
        const count = parsed.questionCount || 20

        // 틀린 문제 다시 풀기: retryQuestionIds가 있으면 해당 문제들만 출제
        // pool (코스별)만 사용해야 함 — Python/C++ 문제 ID가 겹치므로 allQuestions 사용 시 다른 코스 문제가 섞임
        if (parsed.retryQuestionIds && parsed.retryQuestionIds.length > 0) {
          const retrySet = new Set<number>(parsed.retryQuestionIds)
          const retryPool = pool.filter(q => retrySet.has(q.id))
          if (retryPool.length > 0) {
            return { questions: shuffleArray(retryPool), reviewCount: retryPool.length, newCount: 0 }
          }
          // retryPool이 비어있으면 (삭제된 문제 ID) → 빈 배열 반환해서 리다이렉트 트리거
          return { questions: [], reviewCount: 0, newCount: 0, retryQueue: new Map() }
        }

        // 레슨 집중 퀴즈: lessonFilter가 있으면 해당 레슨 문제만 출제
        if (parsed.lessonFilter !== undefined) {
          const filtered = pool.filter(
            (q) => String(q.lessonId) === String(parsed.lessonFilter)
          )
          // 해당 레슨 문제가 3개 이상 있으면 집중 퀴즈, 아니면 일반 세션
          if (filtered.length >= 3) {
            return createSmartSession(filtered, Math.min(count, filtered.length), {
              difficulty: parsed.difficulty || "mixed",
              filterByProgress: false, // 레슨 집중이므로 진도 필터 끔
            })
          }
        }

        return createSmartSession(pool, count, {
          difficulty: parsed.difficulty || "mixed",
          filterByProgress: true,
        })
      }
    } catch {}
    return createSmartSession(pythonQuestions, 20)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const shuffled = smartSession.questions

  // 틀린 문제 retryPool이 비었으면 (삭제된 문제 ID) setup으로 리다이렉트
  useEffect(() => {
    if (shuffled.length === 0) {
      sessionStorage.removeItem("quizSettings")
      router.replace("/quiz/setup")
    }
  }, [shuffled.length, router])

  // 퀴즈 진행 중 플래그 — setup 페이지 "이어서 풀기" 배너용
  useEffect(() => {
    sessionStorage.setItem("quiz-in-progress", "1")
  }, [])

  // shuffled가 비어있으면 리다이렉트 중 — hooks 순서 유지 위해 fallback 사용
  const quiz = useQuizState(shuffled.length > 0 ? shuffled : pythonQuestions.slice(0, 1))
  const { play, isMuted, toggleMute } = useSoundEffect()
  const gamification = useGamification()
  const { t } = useLanguage()
  const { isFocused, justReturnedFocus } = useFocusTracker()
  const comboTier = getComboTier(quiz.combo)
  const [reportedQuestions, setReportedQuestions] = useState<Set<number>>(new Set())
  const [showReportToast, setShowReportToast] = useState(false)

  // 브라우저 뒤로가기 시 기존 나가기 확인 모달 재사용
  useEffect(() => {
    window.history.pushState(null, "", window.location.href)
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href)
      quiz.handleExit() // 기존 X버튼과 동일한 확인 모달 표시
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [quiz.handleExit])

  const handleReport = useCallback((questionId: number) => {
    if (reportedQuestions.has(questionId)) return
    setReportedQuestions(prev => new Set(prev).add(questionId))
    // localStorage에 신고 목록 저장
    try {
      const raw = localStorage.getItem("reported-questions") || "[]"
      const list: number[] = JSON.parse(raw)
      if (!list.includes(questionId)) {
        list.push(questionId)
        localStorage.setItem("reported-questions", JSON.stringify(list))
      }
    } catch {}
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 2000)
  }, [reportedQuestions])

  const { formattedTime, isLowTime } = useQuizTimer({
    initialTime: 300,
    isPaused: quiz.showResult || !isFocused,
  })

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (!quiz.showResult && quiz.selectedAnswer !== null) {
        quiz.handleNext()
      }
    },
    onSwipeRight: () => {
      quiz.handlePrevious()
    },
  })

  useQuizKeyboard({
    selectedAnswer: quiz.selectedAnswer,
    showResult: quiz.showResult,
    showExplanation: quiz.showExplanation,
    onSubmit: quiz.handleNext,
    onExit: quiz.handleExit,
    onCloseExplanation: quiz.handleExplanationClose,
    onSelectAnswer: quiz.handleAnswerSelect,
  })

  // 콤보 연동 사운드: 정답
  const playCorrectSound = useCallback(
    (currentCombo: number) => {
      if (currentCombo >= 10) play("combo10")
      else if (currentCombo >= 5) play("combo5")
      else if (currentCombo >= 3) play("combo3")
      else play("correct")
    },
    [play],
  )

  useEffect(() => {
    if (quiz.showCelebration) playCorrectSound(quiz.combo)
  }, [quiz.showCelebration, quiz.combo, playCorrectSound])

  // 오답 사운드 + 하트 깨지는 사운드 (스냅샷 복원 시에는 재생 안 함)
  useEffect(() => {
    if (quiz.showResult && !quiz.isCorrect) {
      if (quiz.isSnapshotRestore.current) {
        quiz.isSnapshotRestore.current = false
        return
      }
      play("heartbreak")
    }
  }, [quiz.showResult, quiz.isCorrect, play, quiz.isSnapshotRestore])

  const question = quiz.question

  return (
    <RequireAuth>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      {/* Top Bar — 수업 페이지와 동일한 스타일 */}
      <div className="border-b border-orange-100 bg-white/95 backdrop-blur-lg sticky top-0 z-10 safe-area-inset-bottom">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* Left: Exit + Progress */}
            <div className="flex items-center gap-2 md:gap-3 flex-1">
              <button
                onClick={quiz.handleExit}
                className="rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="나가기"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              </button>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                  <span>{t("문제", "Q")} {quiz.currentQuestion + 1}/{quiz.quizSettings.questionCount}</span>
                </div>
                <div className="flex gap-1 w-full">
                  {Array.from({ length: quiz.quizSettings.questionCount }).map((_, i) => {
                    const isAnswered = quiz.questionSnapshots.current.has(i)
                    const isCurrent = i === quiz.currentQuestion
                    const isJumpable = isAnswered || isCurrent
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (!isJumpable) return
                          if (isCurrent) return
                          const snap = quiz.questionSnapshots.current.get(i)
                          if (snap) {
                            quiz.isSnapshotRestore.current = true
                            quiz.jumpToQuestion(i, snap)
                          }
                        }}
                        className={cn(
                          "h-2.5 flex-1 rounded-sm transition-all duration-300",
                          isAnswered
                            ? isCurrent
                              ? "bg-green-500 ring-2 ring-indigo-400 ring-offset-1"
                              : "bg-green-400 hover:bg-green-500 cursor-pointer"
                            : isCurrent
                            ? quiz.combo >= 5
                              ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-pulse"
                              : "bg-indigo-500"
                            : "bg-gray-200 cursor-default",
                        )}
                        aria-label={`문제 ${i + 1}${isAnswered ? " (풀었음)" : ""}`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Center: Hearts */}
            <div className="relative flex items-center gap-0.5">
              {Array.from({ length: quiz.maxHearts }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-base md:text-lg transition-all duration-300",
                    i < quiz.hearts
                      ? quiz.hearts <= 2
                        ? "animate-heart-danger"
                        : ""
                      : "scale-75 grayscale opacity-40",
                    i === quiz.hearts && quiz.lastHeartLost && "animate-heartbreak",
                  )}
                >
                  {i < quiz.hearts ? "❤️" : "🖤"}
                </span>
              ))}
              {/* Floating -1 indicator */}
              {quiz.lastHeartLost && (
                <span
                  key={quiz.hearts}
                  className="animate-float-heart-up pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 text-sm font-bold text-red-500 whitespace-nowrap"
                >
                  -1 ❤️
                </span>
              )}
            </div>

            {/* Right: Combo + Sound + Timer */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Combo badge */}
              {quiz.combo >= 3 && (
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-1 text-xs md:text-sm font-bold animate-scale-in",
                    comboTier.tier === "good" && "bg-blue-100 text-blue-700",
                    comboTier.tier === "fire" && "bg-orange-100 text-orange-700 animate-pulse",
                    comboTier.tier === "insane" && "bg-yellow-100 text-yellow-700 combo-glow-golden",
                    comboTier.tier === "legend" && "bg-purple-100 text-purple-700 combo-glow-rainbow",
                  )}
                >
                  <span>{comboTier.emoji}</span>
                  <span>{quiz.combo}x</span>
                </div>
              )}

              <SoundToggle isMuted={isMuted} onToggle={toggleMute} />

              <div
                className={cn(
                  "flex flex-col items-center rounded-full px-3 py-1",
                  isLowTime ? "bg-red-100 animate-pulse" : "bg-orange-100",
                )}
              >
                <span className={cn("text-[9px] font-medium leading-tight", isLowTime ? "text-red-500" : "text-orange-400")}>
                  {t("학습 시간", "Time")}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className={cn("h-3.5 w-3.5", isLowTime ? "text-red-600" : "text-orange-600")} />
                  <span className={cn("font-mono text-sm font-semibold", isLowTime ? "text-red-600" : "text-orange-600")}>
                    {formattedTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReportToast && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <Card className="bg-white shadow-xl border-2 border-red-200 p-3 max-w-xs">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-red-400 flex-shrink-0" />
              <p className="text-sm font-semibold text-gray-700">{t("신고가 접수됐어요!", "Issue reported!")}</p>
            </div>
          </Card>
        </div>
      )}

      {quiz.showQuickAnswerWarning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-in-down">
          <Card className="bg-yellow-50 border-2 border-yellow-300 shadow-xl p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{t("너무 빨리 풀었어요", "Too fast!")}</p>
                <p className="text-xs text-gray-600">{t("다시 한번 확인해볼까요?", "Want to double-check?")}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {justReturnedFocus && isFocused && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <Card className="bg-white shadow-xl border-2 border-mint-200 p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🦒</div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">{t("다시 돌아왔네요!", "Welcome back!")}</p>
                <p className="text-xs text-gray-600">{t("이어서 할까요?", "Shall we continue?")}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {quiz.showMidCheckIn && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center cursor-pointer"
          onClick={quiz.dismissMidCheckIn}
          onTouchStart={quiz.dismissMidCheckIn}
        >
          <Card className="bg-white p-8 max-w-md mx-4 text-center animate-bounce-in pointer-events-none">
            <div className="text-6xl mb-4">🦒💪</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("절반 왔어요!", "Halfway there!")}</h3>
            <p className="text-lg text-gray-600 mb-2">{t("잘하고 있어요!", "You're doing great!")}</p>
            <p className="text-sm text-gray-500">
              {t(
                `지금까지 ${Math.round((quiz.score / (quiz.currentQuestion + 1)) * 100)}% 정답률!`,
                `${Math.round((quiz.score / (quiz.currentQuestion + 1)) * 100)}% accuracy so far!`
              )}
            </p>
            <p className="text-xs text-gray-400 mt-4">{t("탭해서 계속하기", "Tap to continue")}</p>
          </Card>
        </div>
      )}

      {quiz.showPauseScreen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🦒💭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("괜찮아요?", "Are you okay?")}</h3>
              <p className="text-gray-600">{t("너무 어려운가요?", "Is it too hard?")}</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={quiz.handleLowerDifficulty}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
              >
                {t("난이도 낮추기", "Lower difficulty")}
              </Button>
              <Button
                onClick={quiz.handleTakeBreak}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg flex items-center justify-center gap-2"
              >
                <Coffee className="h-5 w-5" />
                {t("쉬었다가 하기", "Take a break")}
              </Button>
              <Button
                onClick={quiz.handleContinue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                {t("계속 하기", "Continue")}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Danger vignette — hearts <= 2 (비복습 모드만) */}
      {quiz.hearts <= 2 && !quiz.sessionOver && !quiz.quizSettings.isReview && (
        <div
          className="animate-danger-vignette pointer-events-none fixed inset-0 z-30"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(220,38,38,0.55) 100%)" }}
        />
      )}

      {/* Screen flash on heart lost */}
      {quiz.lastHeartLost && (
        <div
          key={quiz.hearts}
          className="animate-screen-flash pointer-events-none fixed inset-0 z-40"
          style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(239,68,68,0.45) 100%)" }}
        />
      )}

      {/* Hearts depleted overlay */}
      {quiz.sessionOver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white p-8 max-w-md w-full text-center animate-bounce-in">
            <div className="text-7xl mb-4">💔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("하트가 다 떨어졌어요!", "Out of hearts!")}</h3>
            <p className="text-gray-600 mb-4">
              {t(
                `${quiz.score}문제 맞혔어요. 다음엔 더 잘할 수 있을 거예요!`,
                `You got ${quiz.score} right. You'll do better next time!`
              )}
            </p>
            <div className="text-5xl mb-6">🦒💪</div>
            <button
              onClick={quiz.confirmExit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              {t("결과 보기", "View Results")}
            </button>
          </Card>
        </div>
      )}

      {/* Main Content — 수업 페이지와 동일한 레이아웃 */}
      <main
        className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchMove={swipeHandlers.onTouchMove}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "bg-white rounded-2xl p-6 md:p-10 shadow-sm transition-all duration-300",
              quiz.showResult && !quiz.isCorrect && "animate-shake ring-2 ring-red-300",
              quiz.combo >= 5 && !quiz.showResult && comboTier.glowClass,
            )}
          >
            <div>
              {/* Question Header */}
              <div className="mb-4 md:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs md:text-sm font-semibold",
                      question.difficulty === "쉬움" && "bg-green-100 text-green-700",
                      question.difficulty === "보통" && "bg-yellow-100 text-yellow-700",
                      question.difficulty === "어려움" && "bg-red-100 text-red-700",
                    )}
                  >
                    {question.difficulty}
                  </span>
                  {quiz.isRetryQuestion && (
                    <span className="rounded-full px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 animate-pulse">
                      🔄 다시 풀기
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-gray-500">{t("문제", "Q")} #{question.id}</span>
                  <button
                    onClick={() => handleReport(question.id)}
                    title={t("문제 오류 신고", "Report issue")}
                    className={cn(
                      "p-1 rounded transition-colors",
                      reportedQuestions.has(question.id)
                        ? "text-red-400 cursor-default"
                        : "text-gray-300 hover:text-red-400"
                    )}
                  >
                    <Flag className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="mb-6 text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed">
                {question.question}
              </h3>

              {/* Code Block */}
              {question.code && question.code.trim() !== "" && (
                <div className="mb-6">
                  <CodeDisplay key={question.id} code={question.code} showLineNumbers={false} />
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = quiz.selectedAnswer === index
                  const isCorrectAnswer = index === question.correctAnswer
                  const showCorrect = quiz.showResult && isCorrectAnswer
                  const showWrong = quiz.showResult && isSelected && !quiz.isCorrect

                  return (
                    <button
                      key={index}
                      onClick={() => quiz.handleAnswerSelect(index)}
                      disabled={quiz.showResult}
                      className={cn(
                        "group relative w-full rounded-xl border-2 p-4 md:p-5 text-left transition-colors duration-200 min-h-[56px]",
                        "active:scale-[0.98]",
                        !quiz.showResult &&
                          !isSelected &&
                          "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50",
                        !quiz.showResult && isSelected && "border-orange-400 bg-orange-50 shadow-md",
                        showCorrect && "border-green-400 bg-green-50 shadow-lg",
                        showWrong && "border-red-400 bg-red-50",
                        quiz.showResult && "cursor-not-allowed",
                      )}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        {isSelected && !quiz.showResult && (
                          <div className="absolute inset-0 bg-orange-400/10 rounded-xl" />
                        )}
                      </div>

                      <div className="flex items-center gap-3 md:gap-4 relative z-10">
                        <div
                          className={cn(
                            "flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                            !quiz.showResult && !isSelected && "border-gray-300 bg-white",
                            !quiz.showResult && isSelected && "border-orange-500 bg-orange-500",
                            showCorrect && "border-green-500 bg-green-500",
                            showWrong && "border-red-500 bg-red-500",
                          )}
                        >
                          {isSelected && !quiz.showResult && (
                            <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-white" />
                          )}
                          {showCorrect && <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                          {showWrong && <X className="h-4 w-4 md:h-5 md:w-5 text-white" />}
                        </div>

                        <span
                          className={cn(
                            "flex-1 font-mono text-sm md:text-base lg:text-lg font-medium transition-colors",
                            !quiz.showResult && "text-gray-700",
                            showCorrect && "text-green-700",
                            showWrong && "text-red-700",
                          )}
                        >
                          {option.split(/\\n|\n/).map((line, i, arr) => (
                            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                          ))}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Actions — 수업 하단 네비와 동일 스타일 */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {quiz.currentQuestion > 0 && (
                <button
                  onClick={quiz.handlePrevious}
                  className="hidden md:flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 min-h-[44px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t("이전", "Prev")}
                </button>
              )}
              <button
                onClick={quiz.handleSkip}
                className="text-sm text-gray-500 transition-colors hover:text-gray-700 min-h-[44px] px-2"
              >
                {t("건너뛰기", "Skip")}
              </button>
            </div>

            <button
              onClick={quiz.handleNext}
              disabled={quiz.selectedAnswer === null}
              className={cn(
                "flex items-center justify-center gap-1 rounded-xl font-bold min-h-[44px] px-5 py-3 md:px-6 md:py-3 transition-colors",
                quiz.selectedAnswer !== null
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {t("다음", "Next")}
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400 md:hidden">
            {t("좌우로 스와이프하여 이동하세요 • 1-4 키로 답변 선택", "Swipe to navigate • Press 1-4 to select")}
          </p>
        </div>
      </main>

      <CelebrationScreen
        show={quiz.showCelebration}
        points={comboTier.xpPerCorrect}
        streak={gamification.dailyStreak}
        comboTier={comboTier}
        combo={quiz.combo}
        grade={quiz.currentGrade}
        isRetry={quiz.isRetryQuestion}
      />

      <ExplanationPanel
        show={quiz.showExplanation}
        yourAnswer={quiz.selectedAnswer !== null ? question.options[quiz.selectedAnswer] : ""}
        correctAnswer={question.options[question.correctAnswer]}
        explanation={question.explanation}
        keyConceptTitle={question.keyConceptTitle}
        keyConceptDescription={question.keyConceptDescription}
        codeComparison={question.codeComparison}
        relatedTopics={question.relatedTopics}
        animationKey={question.animationKey}
        onClose={quiz.handleExplanationClose}
        onPracticeSimilar={quiz.handlePracticeSimilar}
        onNext={quiz.handleExplanationClose}
      />

      {/* Exit Confirmation Modal */}
      {quiz.showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-2">
              <span className="text-4xl">🦒</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              {t("아직 문제가 남아있어요!", "You still have questions left!")}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              {t(
                `${quiz.quizSettings.questionCount - quiz.currentQuestion - 1}문제 더 남았어요. 어떻게 할까요?`,
                `${quiz.quizSettings.questionCount - quiz.currentQuestion - 1} questions remaining. What would you like to do?`
              )}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={quiz.cancelExit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {t("계속 풀기", "Keep Going")}
              </button>
              <button
                onClick={quiz.confirmExit}
                className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-medium text-sm hover:bg-gray-50 transition-all"
              >
                {t("그만하기", "Quit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </RequireAuth>
  )
}
