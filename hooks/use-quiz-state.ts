"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

export interface QuizQuestion {
  id: number
  difficulty: string
  question: string
  code: string
  options: string[]
  correctAnswer: number
  explanation: string
  keyConceptTitle: string
  keyConceptDescription: string
  codeComparison?: {
    wrong: string
    correct: string
  }
  relatedTopics?: string[]
}

export interface QuizSettings {
  questionCount: number
  difficulty: string
  startTime: number
}

const DEFAULT_SETTINGS: QuizSettings = {
  questionCount: 20,
  difficulty: "mixed",
  startTime: Date.now(),
}

export function useQuizState(questions: QuizQuestion[]) {
  const router = useRouter()
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(DEFAULT_SETTINGS)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [streak, setStreak] = useState(5)

  // Wrong answer streak & pause
  const [wrongAnswerStreak, setWrongAnswerStreak] = useState(0)
  const [showPauseScreen, setShowPauseScreen] = useState(false)

  // Celebration & explanation
  const [showCelebration, setShowCelebration] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // Mid check-in
  const [showMidCheckIn, setShowMidCheckIn] = useState(false)

  // Quick answer warning
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [showQuickAnswerWarning, setShowQuickAnswerWarning] = useState(false)

  // Toast for wrong answer
  const [showWrongToast, setShowWrongToast] = useState(false)

  // Load settings from session storage
  useEffect(() => {
    const settings = sessionStorage.getItem("quizSettings")
    if (settings) {
      setQuizSettings(JSON.parse(settings))
    } else {
      router.push("/quiz/setup")
    }
  }, [router])

  // Mid check-in at 50%
  useEffect(() => {
    if (currentQuestion === Math.floor(quizSettings.questionCount / 2) && !showMidCheckIn) {
      setShowMidCheckIn(true)
      setTimeout(() => setShowMidCheckIn(false), 3000)
    }
  }, [currentQuestion, quizSettings.questionCount, showMidCheckIn])

  // Reset question start time on question change
  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [currentQuestion])

  const question = questions[currentQuestion % questions.length]
  const progress = ((currentQuestion + 1) / quizSettings.questionCount) * 100
  const estimatedRemainingTime = Math.ceil((quizSettings.questionCount - currentQuestion - 1) * 1)

  const handleAnswerSelect = useCallback((index: number) => {
    if (!showResult) {
      setSelectedAnswer(index)
    }
  }, [showResult])

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return

    const timeSpent = (Date.now() - questionStartTime) / 1000
    if (timeSpent < 3) {
      setShowQuickAnswerWarning(true)
      setTimeout(() => setShowQuickAnswerWarning(false), 3000)
      return
    }

    const correct = selectedAnswer === question.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore((s) => s + 1)
      setWrongAnswerStreak(0)
      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        if (currentQuestion < quizSettings.questionCount - 1) {
          setCurrentQuestion((q) => q + 1)
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

      setShowWrongToast(true)
      setReviewCount((r) => r + 1)
      setTimeout(() => setShowWrongToast(false), 3000)
      setShowExplanation(true)
    }
  }, [selectedAnswer, questionStartTime, question, currentQuestion, quizSettings.questionCount, wrongAnswerStreak, router])

  const handleSkip = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      router.push("/quiz/results")
    }
  }, [currentQuestion, questions.length, router])

  const handleExit = useCallback(() => {
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
  }, [currentQuestion, quizSettings.questionCount, router])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0 && !showResult) {
      setCurrentQuestion((q) => q - 1)
      setSelectedAnswer(null)
    }
  }, [currentQuestion, showResult])

  const handleLowerDifficulty = useCallback(() => {
    setShowPauseScreen(false)
    setWrongAnswerStreak(0)
  }, [])

  const handleTakeBreak = useCallback(() => {
    router.push("/")
  }, [router])

  const handleContinue = useCallback(() => {
    setShowPauseScreen(false)
    setWrongAnswerStreak(0)
  }, [])

  const handleExplanationClose = useCallback(() => {
    setShowExplanation(false)
    if (currentQuestion < quizSettings.questionCount - 1) {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      router.push("/quiz/results")
    }
  }, [currentQuestion, quizSettings.questionCount, router])

  const handlePracticeSimilar = useCallback(() => {
    setShowExplanation(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }, [])

  return {
    // Current state
    question,
    currentQuestion,
    selectedAnswer,
    showResult,
    isCorrect,
    score,
    reviewCount,
    streak,
    progress,
    estimatedRemainingTime,
    quizSettings,

    // UI state
    showCelebration,
    showExplanation,
    showPauseScreen,
    showMidCheckIn,
    showQuickAnswerWarning,
    showWrongToast,

    // Actions
    handleAnswerSelect,
    handleNext,
    handleSkip,
    handleExit,
    handlePrevious,
    handleLowerDifficulty,
    handleTakeBreak,
    handleContinue,
    handleExplanationClose,
    handlePracticeSimilar,
  }
}
