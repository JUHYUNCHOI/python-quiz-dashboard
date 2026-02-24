"use client"

import { useEffect, useCallback } from "react"
import { X, Clock, ChevronLeft, ChevronRight, Check, AlertCircle, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CodeDisplay } from "@/components/code-display"
import { CelebrationScreen } from "@/components/celebration-screen"
import { ExplanationPanel } from "@/components/explanation-panel"
import { cn } from "@/lib/utils"
import { useQuizState, getComboTier } from "@/hooks/use-quiz-state"
import type { QuizQuestion } from "@/hooks/use-quiz-state"
import { useQuizTimer } from "@/hooks/use-quiz-timer"
import { useFocusTracker } from "@/hooks/use-focus-tracker"
import { useSwipe } from "@/hooks/use-swipe"
import { useQuizKeyboard } from "@/hooks/use-quiz-keyboard"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { SoundToggle } from "@/components/sound-toggle"
import { useGamification } from "@/hooks/use-gamification"

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: "쉬움",
    question: "다음 코드의 출력 결과는 무엇인가요?",
    code: `x = 5\ny = 3\nprint(x + y)`,
    options: ["5", "8", "53", "오류"],
    correctAnswer: 1,
    explanation: "문자열이 아닌 숫자를 더하면 산술 연산이 수행됩니다.",
    keyConceptTitle: "산술 연산자",
    keyConceptDescription: "Python에서 + 연산자는 숫자 타입에서는 덧셈을, 문자열에서는 연결을 수행합니다.",
    relatedTopics: ["문자열 연결", "타입 변환", "연산자 우선순위"],
  },
  {
    id: 2,
    difficulty: "보통",
    question: "리스트에서 마지막 요소를 가져오는 올바른 방법은?",
    code: `my_list = [1, 2, 3, 4, 5]\n# 마지막 요소를 가져오려면?`,
    options: ["my_list[-1]", "my_list[5]", "my_list.last()", "my_list[end]"],
    correctAnswer: 0,
    explanation: "Python 리스트는 음수 인덱스를 지원하며, -1은 마지막 요소를 의미합니다.",
    keyConceptTitle: "음수 인덱싱",
    keyConceptDescription: "Python에서 -1은 마지막 요소, -2는 마지막에서 두 번째 요소를 나타냅니다.",
    codeComparison: {
      wrong: `my_list = [1, 2, 3, 4, 5]\nprint(my_list[5])  # IndexError!`,
      correct: `my_list = [1, 2, 3, 4, 5]\nprint(my_list[-1])  # 5`,
    },
    relatedTopics: ["리스트 슬라이싱", "인덱스 에러", "시퀀스 타입"],
  },
  {
    id: 3,
    difficulty: "어려움",
    question: "다음 코드의 출력 결과는?",
    code: `def func(x=[]):\n    x.append(1)\n    return x\n\nprint(func())\nprint(func())`,
    options: ["[1] [1]", "[1] [1, 1]", "[1, 1] [1, 1]", "오류"],
    correctAnswer: 1,
    explanation:
      "기본 인자는 함수 정의 시 한 번만 생성되므로, 가변 객체를 기본값으로 사용하면 호출 간에 상태가 공유됩니다.",
    keyConceptTitle: "가변 기본 인자의 함정",
    keyConceptDescription:
      "Python에서 기본 인자는 함수가 정의될 때 한 번만 평가됩니다. 리스트나 딕셔너리 같은 가변 객체를 기본값으로 사용하면 모든 호출이 같은 객체를 공유하게 됩니다.",
    codeComparison: {
      wrong: `def func(x=[]):\n    x.append(1)\n    return x`,
      correct: `def func(x=None):\n    if x is None:\n        x = []\n    x.append(1)\n    return x`,
    },
    relatedTopics: ["함수 기본값", "가변 vs 불변 객체", "함수 정의 시점"],
  },
]

export default function QuizPage() {
  const quiz = useQuizState(quizQuestions)
  const { play, isMuted, toggleMute } = useSoundEffect()
  const gamification = useGamification()
  const { isFocused, justReturnedFocus } = useFocusTracker()
  const comboTier = getComboTier(quiz.combo)

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

  // 오답 사운드 + 하트 깨지는 사운드
  useEffect(() => {
    if (quiz.showResult && !quiz.isCorrect) {
      play("heartbreak")
    }
  }, [quiz.showResult, quiz.isCorrect, play])

  const question = quiz.question

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      {/* Top Bar */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
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
              <div className="flex-1 max-w-xs md:max-w-md">
                <div className="mb-1 flex items-center justify-between text-xs md:text-sm text-gray-600">
                  <span>
                    문제 {quiz.currentQuestion + 1}/{quiz.quizSettings.questionCount}
                  </span>
                  <span className="hidden sm:inline">{Math.round(quiz.progress)}% 완료</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 rounded-full",
                      quiz.combo >= 5
                        ? "bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 animate-pulse"
                        : "bg-gradient-to-r from-orange-400 to-orange-500",
                    )}
                    style={{ width: `${quiz.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Center: Hearts */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
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
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  isLowTime ? "bg-red-100 animate-pulse" : "bg-orange-100",
                )}
              >
                <Clock className={cn("h-4 w-4", isLowTime ? "text-red-600" : "text-orange-600")} />
                <span className={cn("font-mono text-sm font-semibold", isLowTime ? "text-red-600" : "text-orange-600")}>
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {quiz.showQuickAnswerWarning && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-in-down">
          <Card className="bg-yellow-50 border-2 border-yellow-300 shadow-xl p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">너무 빨리 풀었어요</p>
                <p className="text-xs text-gray-600">다시 한번 확인해볼까요?</p>
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
                <p className="text-sm font-semibold text-gray-800 mb-1">다시 돌아왔네요!</p>
                <p className="text-xs text-gray-600">이어서 할까요?</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {quiz.showMidCheckIn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-white p-8 max-w-md mx-4 text-center animate-bounce-in">
            <div className="text-6xl mb-4">🦒💪</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">절반 왔어요!</h3>
            <p className="text-lg text-gray-600 mb-2">잘하고 있어요!</p>
            <p className="text-sm text-gray-500">
              지금까지 {Math.round((quiz.score / (quiz.currentQuestion + 1)) * 100)}% 정답률!
            </p>
          </Card>
        </div>
      )}

      {quiz.showPauseScreen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🦒💭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">괜찮아요?</h3>
              <p className="text-gray-600">너무 어려운가요?</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={quiz.handleLowerDifficulty}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
              >
                난이도 낮추기
              </Button>
              <Button
                onClick={quiz.handleTakeBreak}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg flex items-center justify-center gap-2"
              >
                <Coffee className="h-5 w-5" />
                쉬었다가 하기
              </Button>
              <Button
                onClick={quiz.handleContinue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                계속 하기
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Hearts depleted overlay */}
      {quiz.sessionOver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white p-8 max-w-md w-full text-center animate-bounce-in">
            <div className="text-7xl mb-4">💔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">하트가 다 떨어졌어요!</h3>
            <p className="text-gray-600 mb-6">
              {quiz.score}문제 맞혔어요. 다음엔 더 잘할 수 있을 거예요!
            </p>
            <div className="text-5xl mb-4">🦒💪</div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main
        className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchMove={swipeHandlers.onTouchMove}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        <div className="max-w-4xl mx-auto">
          <Card
            className={cn(
              "overflow-hidden border-2 transition-all duration-500",
              quiz.showResult && !quiz.isCorrect && "animate-shake border-red-300",
              quiz.combo >= 5 && !quiz.showResult && comboTier.glowClass,
            )}
          >
            <div className="p-4 md:p-6 lg:p-8">
              {/* Question Header */}
              <div className="mb-4 md:mb-6 flex items-center justify-between">
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
                <span className="text-xs md:text-sm text-gray-500">문제 #{question.id}</span>
              </div>

              {/* Question Text */}
              <h3 className="mb-6 text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-relaxed">
                {question.question}
              </h3>

              {/* Code Block */}
              <div className="mb-6">
                <CodeDisplay code={question.code} />
              </div>

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
                        "group relative w-full rounded-xl border-2 p-4 md:p-5 text-left transition-all duration-300 min-h-[56px]",
                        "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                        !quiz.showResult &&
                          !isSelected &&
                          "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50",
                        !quiz.showResult && isSelected && "border-orange-400 bg-orange-50 shadow-lg scale-[1.02]",
                        showCorrect && "border-green-400 bg-green-50 shadow-lg",
                        showWrong && "border-red-400 bg-red-50",
                        quiz.showResult && "cursor-not-allowed",
                      )}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-xl">
                        {isSelected && !quiz.showResult && (
                          <div className="absolute inset-0 bg-orange-400/20 animate-ripple rounded-xl" />
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
                          {option}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Bottom Actions */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {quiz.currentQuestion > 0 && (
                <button
                  onClick={quiz.handlePrevious}
                  className="hidden md:flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 min-h-[44px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  이전
                </button>
              )}
              <button
                onClick={quiz.handleSkip}
                className="text-sm text-gray-500 transition-colors hover:text-gray-700 min-h-[44px] px-2"
              >
                건너뛰기
              </button>
            </div>

            <Button
              onClick={quiz.handleNext}
              disabled={quiz.selectedAnswer === null}
              className="min-w-[120px] md:min-w-32 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 min-h-[44px]"
            >
              다음
              <ChevronRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400 md:hidden">
            좌우로 스와이프하여 이동하세요 • 1-4 키로 답변 선택
          </p>
        </div>
      </main>

      <CelebrationScreen
        show={quiz.showCelebration}
        points={comboTier.xpPerCorrect}
        streak={gamification.dailyStreak}
        comboTier={comboTier}
        combo={quiz.combo}
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
        onClose={quiz.handleExplanationClose}
        onPracticeSimilar={quiz.handlePracticeSimilar}
        onNext={quiz.handleExplanationClose}
      />
    </div>
  )
}
