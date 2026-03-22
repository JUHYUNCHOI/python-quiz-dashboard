"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { recordAnswer, getGradeInfo } from "@/lib/spaced-repetition"
import { scheduleRetry, getRetryQuestion } from "@/lib/quiz-question-selector"

export interface QuizQuestion {
  id: number
  lessonId: string | number
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
  animationKey?: string
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
  related_topics?: string[]
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
  // 말해보카 스타일 통계
  perfectCount: number
  greatCount: number
  goodCount: number
  retryCorrectCount: number   // 재출제에서 맞힌 수
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
  const [maxHearts, setMaxHearts] = useState(5)
  const [sessionOver, setSessionOver] = useState(false)
  const [lastHeartLost, setLastHeartLost] = useState(false)

  // Wrong answer streak & pause
  const [wrongAnswerStreak, setWrongAnswerStreak] = useState(0)
  const [showPauseScreen, setShowPauseScreen] = useState(false)

  // Celebration & explanation
  const [showCelebration, setShowCelebration] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // 말해보카 스타일: 오답 재출제 큐 + 등급
  const retryQueueRef = useRef<Map<number, number>>(new Map())
  const [currentGrade, setCurrentGrade] = useState<"perfect" | "great" | "good" | "fail" | null>(null)
  const questionAttemptRef = useRef<Map<number, number>>(new Map())  // questionId → 시도 횟수
  const [isRetryQuestion, setIsRetryQuestion] = useState(false)
  const [retryInsertedQuestions, setRetryInsertedQuestions] = useState<QuizQuestion[]>([])
  const [gradeStats, setGradeStats] = useState({ perfect: 0, great: 0, good: 0, retryCorrect: 0 })

  // Mid check-in
  const [showMidCheckIn, setShowMidCheckIn] = useState(false)
  const [midCheckInShown, setMidCheckInShown] = useState(false)

  // Per-question result tracking
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])

  // Quick answer warning
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [showQuickAnswerWarning, setShowQuickAnswerWarning] = useState(false)

  // Toast for wrong answer
  const [showWrongToast, setShowWrongToast] = useState(false)

  // Exit confirmation modal
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  // Load settings from session storage (cap questionCount to available questions)
  useEffect(() => {
    const settings = sessionStorage.getItem("quizSettings")
    if (settings) {
      const parsed = JSON.parse(settings) as QuizSettings
      parsed.questionCount = Math.min(parsed.questionCount, questions.length)
      setQuizSettings(parsed)
      // 난이도별 하트 수 설정: 쉬움 7, 보통 5, 어려움 3
      const difficultyHearts: Record<string, number> = {
        beginner: 7,
        intermediate: 5,
        advanced: 3,
        mixed: 5,
      }
      const h = difficultyHearts[parsed.difficulty] ?? 5
      setHearts(h)
      setMaxHearts(h)
    } else {
      router.push("/quiz/setup")
    }
  }, [router, questions.length])

  // Mid check-in at 50%
  useEffect(() => {
    if (currentQuestion === Math.floor(quizSettings.questionCount / 2) && !midCheckInShown) {
      setMidCheckInShown(true)
      setShowMidCheckIn(true)
      const timer = setTimeout(() => setShowMidCheckIn(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [currentQuestion, quizSettings.questionCount, midCheckInShown])

  // Reset question start time on question change
  useEffect(() => {
    setQuestionStartTime(Date.now())
    setLastHeartLost(false)
  }, [currentQuestion])

  // Warn before closing tab during quiz
  useEffect(() => {
    if (currentQuestion === 0 && !showResult) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [currentQuestion, showResult])

  // 30초마다 현재 세션 상태 sessionStorage에 자동 저장 (비정상 종료 복구용)
  useEffect(() => {
    if (sessionOver || currentQuestion === 0) return
    const interval = setInterval(() => {
      try {
        const elapsed = Date.now() - quizSettings.startTime
        const partial = {
          totalQuestions: quizSettings.questionCount,
          correctAnswers: score,
          maxCombo,
          heartsRemaining: hearts,
          timeElapsedMs: elapsed,
          endReason: "completed" as const,
          questionDetails: questionResults,
          startedAt: quizSettings.startTime,
          difficulty: quizSettings.difficulty,
          perfectCount: gradeStats.perfect,
          greatCount: gradeStats.great,
          goodCount: gradeStats.good,
          retryCorrectCount: gradeStats.retryCorrect,
        }
        sessionStorage.setItem("quizSessionData", JSON.stringify(partial))
      } catch {}
    }, 30000)
    return () => clearInterval(interval)
  }, [sessionOver, currentQuestion, quizSettings, score, maxCombo, hearts, questionResults, gradeStats])

  // 재출제 문제가 있으면 그것을 현재 문제로 사용
  const retryCheck = getRetryQuestion(retryQueueRef.current, questions)
  const activeRetryQuestion = retryCheck.question

  // 현재 문제: 재출제 문제가 있으면 그것, 없으면 순서대로
  const question = activeRetryQuestion || (questions[currentQuestion] ?? questions[0])
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
        perfectCount: gradeStats.perfect,
        greatCount: gradeStats.great,
        goodCount: gradeStats.good,
        retryCorrectCount: gradeStats.retryCorrect,
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
    if (selectedAnswer === null || sessionOver || showResult) return

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
      related_topics: question.relatedTopics,
    }])

    // 시도 횟수 추적
    const prevAttempts = questionAttemptRef.current.get(question.id) || 0
    const attempts = prevAttempts + 1
    questionAttemptRef.current.set(question.id, attempts)

    // 간격 반복 기록
    const mastery = recordAnswer(question.id, correct, attempts)
    setCurrentGrade(mastery.lastGrade)

    // 재출제 큐 업데이트 (카운트다운)
    if (activeRetryQuestion) {
      retryQueueRef.current = retryCheck.updatedQueue
    }

    if (correct) {
      const newScore = score + 1
      setScore(newScore)
      setWrongAnswerStreak(0)

      // 등급 통계 업데이트
      setGradeStats(prev => ({
        ...prev,
        perfect: prev.perfect + (mastery.lastGrade === "perfect" ? 1 : 0),
        great: prev.great + (mastery.lastGrade === "great" ? 1 : 0),
        good: prev.good + (mastery.lastGrade === "good" ? 1 : 0),
        retryCorrect: prev.retryCorrect + (isRetryQuestion ? 1 : 0),
      }))

      // Combo logic
      const newCombo = combo + 1
      setCombo(newCombo)
      setMaxCombo((prev) => Math.max(prev, newCombo))

      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
        setIsRetryQuestion(false)

        // 재출제 문제를 풀었으면 currentQuestion은 안 올림
        if (activeRetryQuestion) {
          setSelectedAnswer(null)
          setShowResult(false)
          return
        }

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

      // 오답 재출제 큐에 추가 (2-3문제 뒤에 다시 나옴)
      retryQueueRef.current = scheduleRetry(retryQueueRef.current, question.id)

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
    showResult,
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
      related_topics: question.relatedTopics,
    }])

    if (currentQuestion < quizSettings.questionCount - 1) {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      saveSessionData("completed", score)
      router.push("/quiz/session-complete")
    }
  }, [currentQuestion, quizSettings.questionCount, router, saveSessionData, score, question, questionStartTime])

  const handleExit = useCallback(() => {
    const completed = currentQuestion + 1
    const percentage = (completed / quizSettings.questionCount) * 100

    if (percentage < 80) {
      setShowExitConfirm(true)
      return
    }

    // 80% 이상 진행했으면 결과 저장 후 결과 페이지로
    saveSessionData("completed", score)
    router.push("/quiz/session-complete")
  }, [currentQuestion, quizSettings.questionCount, router, saveSessionData, score])

  const confirmExit = useCallback(() => {
    setShowExitConfirm(false)
    // 중간 종료해도 부분 결과 저장
    saveSessionData("completed", score)
    router.push("/quiz/session-complete")
  }, [router, saveSessionData, score])

  const cancelExit = useCallback(() => {
    setShowExitConfirm(false)
  }, [])

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
    setIsRetryQuestion(false)

    // 재출제 문제에서 설명 닫으면 currentQuestion 안 올림
    if (activeRetryQuestion) {
      setSelectedAnswer(null)
      setShowResult(false)
      return
    }

    if (currentQuestion < quizSettings.questionCount - 1) {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      saveSessionData("completed", score)
      router.push("/quiz/session-complete")
    }
  }, [currentQuestion, quizSettings.questionCount, router, saveSessionData, score, activeRetryQuestion])

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
    maxHearts,
    sessionOver,
    lastHeartLost,

    // UI state
    showCelebration,
    showExplanation,
    showPauseScreen,
    showMidCheckIn,
    showQuickAnswerWarning,
    showWrongToast,
    showExitConfirm,

    // 말해보카 스타일
    currentGrade,
    isRetryQuestion,
    gradeStats,

    // Actions
    handleAnswerSelect,
    handleNext,
    handleSkip,
    handleExit,
    confirmExit,
    cancelExit,
    handlePrevious,
    handleLowerDifficulty,
    handleTakeBreak,
    handleContinue,
    handleExplanationClose,
    handlePracticeSimilar,
  }
}
