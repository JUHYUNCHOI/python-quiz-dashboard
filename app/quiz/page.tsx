"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Clock, ChevronLeft, ChevronRight, Check, AlertCircle, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CodeDisplay } from "@/components/code-display"
import { CelebrationScreen } from "@/components/celebration-screen"
import { ExplanationPanel } from "@/components/explanation-panel"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const quizQuestions = [
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
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)
  const [score, setScore] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [streak, setStreak] = useState(5)
  const [showToast, setShowToast] = useState(false)
  const [reviewCount, setReviewCount] = useState(0)

  const [quizSettings, setQuizSettings] = useState({ questionCount: 20, difficulty: "mixed", startTime: Date.now() })
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [wrongAnswerStreak, setWrongAnswerStreak] = useState(0)
  const [showPauseScreen, setShowPauseScreen] = useState(false)
  const [showMidCheckIn, setShowMidCheckIn] = useState(false)
  const [isFocused, setIsFocused] = useState(true)
  const [focusedTime, setFocusedTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [showQuickAnswerWarning, setShowQuickAnswerWarning] = useState(false)
  const focusTimeRef = useRef(0)
  const totalTimeRef = useRef(0)

  useEffect(() => {
    const settings = sessionStorage.getItem("quizSettings")
    if (settings) {
      setQuizSettings(JSON.parse(settings))
    } else {
      router.push("/quiz/setup")
    }
  }, [router])

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      totalTimeRef.current += 1
      setTotalTime(totalTimeRef.current)

      if (isFocused && !showResult) {
        focusTimeRef.current += 1
        setFocusedTime(focusTimeRef.current)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isFocused, showResult])

  useEffect(() => {
    if (currentQuestion === Math.floor(quizSettings.questionCount / 2) && !showMidCheckIn) {
      setShowMidCheckIn(true)
      setTimeout(() => setShowMidCheckIn(false), 3000)
    }
  }, [currentQuestion, quizSettings.questionCount, showMidCheckIn])

  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [currentQuestion])

  useEffect(() => {
    if (timeLeft > 0 && !showResult && isFocused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, showResult, isFocused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index)
    }
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const timeSpent = (Date.now() - questionStartTime) / 1000
    if (timeSpent < 3) {
      setShowQuickAnswerWarning(true)
      setTimeout(() => setShowQuickAnswerWarning(false), 3000)
      return
    }

    const correct = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
      setWrongAnswerStreak(0) // Reset wrong answer streak
      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        if (currentQuestion < quizSettings.questionCount - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setShowResult(false)
        } else {
          router.push("/quiz/session-complete")
        }
      }, 2000)
    } else {
      const newStreak = wrongAnswerStreak + 1
      setWrongAnswerStreak(newStreak)

      if (newStreak >= 5) {
        setShowPauseScreen(true)
        return
      }

      setShowToast(true)
      setReviewCount(reviewCount + 1)
      setTimeout(() => setShowToast(false), 3000)
      setShowExplanation(true)
    }
  }

  const handleSkip = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      router.push("/quiz/results")
    }
  }

  const handleExit = () => {
    const completed = currentQuestion + 1
    const percentage = (completed / quizSettings.questionCount) * 100

    if (percentage < 80) {
      const remaining = quizSettings.questionCount - completed
      if (
        confirm(
          `아직 ${remaining}문제 남았어요. 끝까지 해볼까요?\n\n"확인"을 누르면 계속 진행하고, "취소"를 누르면 진행 상황을 저장하고 나갑니다.`,
        )
      ) {
        return
      }
    }

    router.push("/")
  }

  const handleLowerDifficulty = () => {
    setShowPauseScreen(false)
    setWrongAnswerStreak(0)
    // In a real app, you would adjust the difficulty here
  }

  const handleTakeBreak = () => {
    router.push("/")
  }

  const handleContinue = () => {
    setShowPauseScreen(false)
    setWrongAnswerStreak(0)
  }

  const progress = ((currentQuestion + 1) / quizSettings.questionCount) * 100
  const estimatedRemainingTime = Math.ceil((quizSettings.questionCount - currentQuestion - 1) * 1)

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && !showResult && selectedAnswer !== null) {
      handleNext()
    }
    if (isRightSwipe && currentQuestion > 0 && !showResult) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && selectedAnswer !== null && !showResult) {
        handleNext()
      }
      if (e.key === "Escape") {
        if (showExplanation) {
          handleExplanationClose()
        } else {
          handleExit()
        }
      }
      if (e.key >= "1" && e.key <= "4" && !showResult) {
        handleAnswerSelect(Number.parseInt(e.key) - 1)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedAnswer, showResult, currentQuestion, showExplanation])

  const handleExplanationClose = () => {
    setShowExplanation(false)
    if (currentQuestion < quizSettings.questionCount - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      router.push("/quiz/results")
    }
  }

  const handlePracticeSimilar = () => {
    setShowExplanation(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const question = quizQuestions[currentQuestion % quizQuestions.length]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      {/* Top Bar */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        {/* 상단 바 - 학습 페이지: max-w-[1300px] */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              <button
                onClick={handleExit}
                className="rounded-full p-2 md:p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors hover:bg-gray-100"
                aria-label="나가기"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              </button>
              <div className="flex-1 max-w-xs md:max-w-md">
                <div className="mb-1 flex items-center justify-between text-xs md:text-sm text-gray-600">
                  <span>
                    문제 {currentQuestion + 1}/{quizSettings.questionCount}
                  </span>
                  <span className="hidden sm:inline">{Math.round(progress)}% 완료</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500 text-center">약 {estimatedRemainingTime}분 남음</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {reviewCount > 0 && (
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  복습 대기 {reviewCount}
                </div>
              )}

              <div
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 md:px-4 transition-colors",
                  timeLeft < 30 ? "bg-red-100 animate-pulse" : "bg-orange-100",
                )}
              >
                <Clock className={cn("h-4 w-4", timeLeft < 30 ? "text-red-600" : "text-orange-600")} />
                <span
                  className={cn("font-mono text-sm font-semibold", timeLeft < 30 ? "text-red-600" : "text-orange-600")}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQuickAnswerWarning && (
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

      {showToast && isFocused && (
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

      {showMidCheckIn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-white p-8 max-w-md mx-4 text-center animate-bounce-in">
            <div className="text-6xl mb-4">🦒💪</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">절반 왔어요!</h3>
            <p className="text-lg text-gray-600 mb-2">잘하고 있어요!</p>
            <p className="text-sm text-gray-500">
              지금까지 {Math.round((score / (currentQuestion + 1)) * 100)}% 정답률!
            </p>
          </Card>
        </div>
      )}

      {showPauseScreen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🦒💭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">괜찮아요?</h3>
              <p className="text-gray-600">너무 어려운가요?</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleLowerDifficulty}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
              >
                난이도 낮추기
              </Button>
              <Button
                onClick={handleTakeBreak}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg flex items-center justify-center gap-2"
              >
                <Coffee className="h-5 w-5" />
                쉬었다가 하기
              </Button>
              <Button
                onClick={handleContinue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                계속 하기
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content - 학습 페이지: max-w-[1300px] */}
      <main
        className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="max-w-4xl mx-auto">
          <Card
            className={cn(
              "overflow-hidden border-2 transition-all duration-500",
              showResult && !isCorrect && "animate-shake border-red-300",
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

              {/* Code Block with enhanced display */}
              <div className="mb-6">
                <CodeDisplay code={question.code} />
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
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={cn(
                        "group relative w-full rounded-xl border-2 p-4 md:p-5 text-left transition-all duration-300 min-h-[56px]",
                        "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                        !showResult &&
                          !isSelected &&
                          "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50",
                        !showResult && isSelected && "border-orange-400 bg-orange-50 shadow-lg scale-[1.02]",
                        showCorrect && "border-green-400 bg-green-50 shadow-lg",
                        showWrong && "border-red-400 bg-red-50",
                        showResult && "cursor-not-allowed",
                      )}
                    >
                      {/* Ripple effect on click */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl">
                        {isSelected && !showResult && (
                          <div className="absolute inset-0 bg-orange-400/20 animate-ripple rounded-xl" />
                        )}
                      </div>

                      <div className="flex items-center gap-3 md:gap-4 relative z-10">
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
                          {isSelected && !showResult && (
                            <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-white" />
                          )}
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
                    </button>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Bottom Actions */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {currentQuestion > 0 && (
                <button
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1)
                    setSelectedAnswer(null)
                    setShowResult(false)
                  }}
                  className="hidden md:flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-700 min-h-[44px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  이전
                </button>
              )}
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 transition-colors hover:text-gray-700 min-h-[44px] px-2"
              >
                건너뛰기
              </button>
            </div>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
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

      <CelebrationScreen show={showCelebration} points={10} streak={streak} />

      <ExplanationPanel
        show={showExplanation}
        yourAnswer={selectedAnswer !== null ? question.options[selectedAnswer] : ""}
        correctAnswer={question.options[question.correctAnswer]}
        explanation={question.explanation}
        keyConceptTitle={question.keyConceptTitle}
        keyConceptDescription={question.keyConceptDescription}
        codeComparison={question.codeComparison}
        relatedTopics={question.relatedTopics}
        onClose={handleExplanationClose}
        onPracticeSimilar={handlePracticeSimilar}
        onNext={handleExplanationClose}
      />
    </div>
  )
}
