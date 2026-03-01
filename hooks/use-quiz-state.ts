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

export interface QuestionResult {
  question_id: number
  question_text: string
  time_taken_ms: number
  selected_answer: number
  correct_answer: number
  is_correct: boolean
}

export interface SessionData {
  totalQuestions: number
  correctAnswers: number
  maxCombo: number
  heartsRemaining: number
  timeElapsedMs: number
  endReason: "completed" | "hearts"
  questionDetails: QuestionResult[]
  startedAt: number
  difficulty: string
}

// -------- Combo Tier System --------
export type ComboTier = "base" | "good" | "fire" | "insane" | "legend"

export interface ComboTierInfo {
  tier: ComboTier
  xpPerCorrect: number
  label: string
  emoji: string
  glowClass: string
}

export function getComboTier(combo: number): ComboTierInfo {
  if (combo >= 10)
    return { tier: "legend", xpPerCorrect: 30, label: "전설!", emoji: "👑", glowClass: "combo-glow-rainbow" }
  if (combo >= 8)
    return { tier: "insane", xpPerCorrect: 25, label: "미쳤다!", emoji: "🌟", glowClass: "combo-glow-golden" }
  if (combo >= 5)
    return { tier: "fire", xpPerCorrect: 20, label: "불타는 중!", emoji: "🔥", glowClass: "combo-glow-orange" }
  if (combo >= 3)
    return { tier: "good", xpPerCorrect: 15, label: "3연속!", emoji: "⚡", glowClass: "combo-glow-blue" }
  return { tier: "base", xpPerCorrect: 10, label: "", emoji: "", glowClass: "" }
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

  // Combo system
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)

  // Hearts system
  const [hearts, setHearts] = useState(5)
  const [sessionOver, setSessionOver] = useState(false)
  const [lastHeartLost, setLastHeartLost] = useState(false)

  // Wrong answer streak & pause
  const [wrongAnswerStreak, setWrongAnswerStreak] = useState(0)
  const [showPauseScreen, setShowPauseScreen] = useState(false)

  // Celebration & explanation
  const [showCelebration, setShowCelebration] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // Mid check-in
  const [showMidCheckIn, setShowMidCheckIn] = useState(false)

  // Per-question result tracking
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])

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
    setLastHeartLost(false)
  }, [currentQuestion])

  const question = questions[currentQuestion % questions.length]
  const progress = ((currentQuestion + 1) / quizSettings.questionCount) * 100
  const estimatedRemainingTime = Math.ceil((quizSettings.questionCount - currentQuestion - 1) * 1)

  // Save session data to sessionStorage before navigation
  const saveSessionData = useCallback(
    (endReason: "completed" | "hearts", currentScore: number) => {
      const elapsed = Date.now() - quizSettings.startTime
      const data: SessionData = {
        totalQuestions: endReason === "hearts" ? currentQuestion + 1 : quizSettings.questionCount,
        correctAnswers: currentScore,
        maxCombo,
        heartsRemaining: hearts,
        timeElapsedMs: elapsed,
        endReason,
        questionDetails: questionResults,
        startedAt: quizSettings.startTime,
        difficulty: quizSettings.difficulty,
      }
      sessionStorage.setItem("quizSessionData", JSON.stringify(data))
    },
    [quizSettings, currentQuestion, maxCombo, hearts, questionResults],
  )

  const handleAnswerSelect = useCallback(
    (index: number) => {
      if (!showResult && !sessionOver) {
        setSelectedAnswer(index)
      }
    },
    [showResult, sessionOver],
  )

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || sessionOver) return

    const timeSpent = (Date.now() - questionStartTime) / 1000
    if (timeSpent < 3) {
      setShowQuickAnswerWarning(true)
      setTimeout(() => setShowQuickAnswerWarning(false), 3000)
      return
    }

    const correct = selectedAnswer === question.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    // Record per-question result
    const timeTakenMs = Date.now() - questionStartTime
    setQuestionResults(prev => [...prev, {
      question_id: question.id,
      question_text: question.question.slice(0, 50),
      time_taken_ms: timeTakenMs,
      selected_answer: selectedAnswer,
      correct_answer: question.correctAnswer,
      is_correct: correct,
    }])

    if (correct) {
      const newScore = score + 1
      setScore(newScore)
      setWrongAnswerStreak(0)

      // Combo logic
      const newCombo = combo + 1
      setCombo(newCombo)
      setMaxCombo((prev) => Math.max(prev, newCombo))

      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        if (currentQuestion < quizSettings.questionCount - 1) {
          setCurrentQuestion((q) => q + 1)
          setSelectedAnswer(null)
          setShowResult(false)
        } else {
          saveSessionData("completed", newScore)
          router.push("/quiz/session-complete")
        }
      }, 2000)
    } else {
      // Reset combo on wrong
      setCombo(0)

      // Hearts logic
      const newHearts = hearts - 1
      setHearts(newHearts)
      setLastHeartLost(true)

      if (newHearts <= 0) {
        setSessionOver(true)
        saveSessionData("hearts", score)
        setTimeout(() => {
          router.push("/quiz/session-complete?reason=hearts")
        }, 1500)
        return
      }

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
  }, [
    selectedAnswer,
    questionStartTime,
    question,
    currentQuestion,
    quizSettings.questionCount,
    wrongAnswerStreak,
    router,
    combo,
    hearts,
    sessionOver,
    score,
    saveSessionData,
  ])

  const handleSkip = useCallback(() => {
    // Record skipped question
    setQuestionResults(prev => [...prev, {
      question_id: question.id,
      question_text: question.question.slice(0, 50),
      time_taken_ms: Date.now() - questionStartTime,
      selected_answer: -1,
      correct_answer: question.correctAnswer,
      is_correct: false,
    }])

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      saveSessionData("completed", score)
      router.push("/quiz/session-complete")
    }
  }, [currentQuestion, questions.length, router, saveSessionData, score, question, questionStartTime])

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
      saveSessionData("completed", score)
      router.push("/quiz/session-complete")
    }
  }, [currentQuestion, quizSettings.questionCount, router, saveSessionData, score])

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
    progress,
    estimatedRemainingTime,
    quizSettings,

    // Combo & Hearts
    combo,
    maxCombo,
    hearts,
    sessionOver,
    lastHeartLost,

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
