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
  correctAnswer?: number  // API 방식에서는 서버에서만 반환
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
  course?: string
  lessonFilter?: number | string
  isReview?: boolean
}

export interface QuestionResult {
  question_id: number
  question_text: string
  time_taken_ms: number
  selected_answer: number
  correct_answer: number
  is_correct: boolean
  related_topics?: string[]
  lesson_id?: string | number
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
  course?: string              // 코스 (python | cpp) — retry 시 올바른 문제 풀이용
  // 말해보카 스타일 통계
  perfectCount: number
  greatCount: number
  goodCount: number
  retryCorrectCount: number   // 재출제에서 맞힌 수
  // 복습 세션 추적
  isReview?: boolean
  lessonFilter?: number | string
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
  const [retryInsertedQuestions, setRetryInsertedQuestions] = useState<QuizQuestion[]>([])
  const [gradeStats, setGradeStats] = useState({ perfect: 0, great: 0, good: 0, retryCorrect: 0 })

  // Server-side answer checking
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false)
  const [serverCorrectAnswer, setServerCorrectAnswer] = useState<number | null>(null)

  // Mid check-in
  const [showMidCheckIn, setShowMidCheckIn] = useState(false)
  const [midCheckInShown, setMidCheckInShown] = useState(false)

  // Per-question result tracking
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])

  // 이전 문제로 돌아갈 때 상태 복원용 스냅샷
  const questionSnapshots = useRef<Map<number, { selectedAnswer: number; isCorrect: boolean }>>(new Map())

  // 스냅샷 복원 중 사운드 이펙트 억제 플래그 (뒤로가기/앞으로가기 시 틀린소리 방지)
  const isSnapshotRestore = useRef(false)

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
          course: quizSettings.course,
          isReview: quizSettings.isReview,
          lessonFilter: quizSettings.lessonFilter,
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

  // 재출제 문제 여부 파생값 (state 대신 derive) — activeRetryQuestion 기반
  const isRetryQuestion = !!activeRetryQuestion

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
        course: quizSettings.course,
        perfectCount: gradeStats.perfect,
        greatCount: gradeStats.great,
        goodCount: gradeStats.good,
        retryCorrectCount: gradeStats.retryCorrect,
        isReview: quizSettings.isReview,
        lessonFilter: quizSettings.lessonFilter,
      }
      sessionStorage.setItem("quizSessionData", JSON.stringify(data))
    },
    [quizSettings, currentQuestion, maxCombo, hearts, questionResults, gradeStats],
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
    // 이전 문제 복습 중(showResult=true이고 스냅샷 있는 문제) → 다음으로 건너뜀
    if (showResult && questionSnapshots.current.has(currentQuestion)) {
      const nextIdx = currentQuestion + 1
      const snap = questionSnapshots.current.get(nextIdx)
      if (snap) {
        // 다음 문제도 이미 풀었으면 복원
        isSnapshotRestore.current = true
        setCurrentQuestion(nextIdx)
        setSelectedAnswer(snap.selectedAnswer)
        setIsCorrect(snap.isCorrect)
        setShowResult(true)
        return
      } else {
        // 다음 문제는 아직 안 풀었으면 새로 풀기
        setCurrentQuestion(nextIdx)
        setSelectedAnswer(null)
        setShowResult(false)
        return
      }
    }

    if (selectedAnswer === null || sessionOver || showResult || isCheckingAnswer) return

    const timeSpent = (Date.now() - questionStartTime) / 1000
    if (timeSpent < 3) {
      setShowQuickAnswerWarning(true)
      setTimeout(() => setShowQuickAnswerWarning(false), 3000)
      return
    }

    const timeTakenMs = Date.now() - questionStartTime
    const capturedSelected = selectedAnswer
    const capturedQuestion = question
    const capturedCurrentQuestion = currentQuestion

    setIsCheckingAnswer(true)

    fetch("/api/check-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: capturedQuestion.id, selectedAnswer: capturedSelected }),
    })
      .then(res => res.json())
      .then(data => {
        const correct: boolean = data.correct
        const serverAnswer: number = data.correctAnswer

        setIsCheckingAnswer(false)
        setServerCorrectAnswer(serverAnswer)
        setIsCorrect(correct)
        setShowResult(true)

        // 이전 문제로 돌아올 때 복원용 스냅샷 저장
        questionSnapshots.current.set(capturedCurrentQuestion, { selectedAnswer: capturedSelected, isCorrect: correct })

        // Record per-question result
        setQuestionResults(prev => [...prev, {
          question_id: capturedQuestion.id,
          question_text: capturedQuestion.question.slice(0, 50),
          time_taken_ms: timeTakenMs,
          selected_answer: capturedSelected,
          correct_answer: serverAnswer,
          is_correct: correct,
          related_topics: capturedQuestion.relatedTopics,
          lesson_id: capturedQuestion.lessonId,
        }])

        // 시도 횟수 추적
        const prevAttempts = questionAttemptRef.current.get(capturedQuestion.id) || 0
        const attempts = prevAttempts + 1
        questionAttemptRef.current.set(capturedQuestion.id, attempts)

        // 간격 반복 기록
        const mastery = recordAnswer(capturedQuestion.id, correct, attempts)
        setCurrentGrade(mastery.lastGrade)

        // 재출제 큐 업데이트 (카운트다운) — 매 답변마다 항상 업데이트
        retryQueueRef.current = retryCheck.updatedQueue

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

            // 재출제 문제를 풀었으면 currentQuestion은 안 올림
            if (activeRetryQuestion) {
              setSelectedAnswer(null)
              setShowResult(false)
              return
            }

            if (capturedCurrentQuestion < quizSettings.questionCount - 1) {
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
          retryQueueRef.current = scheduleRetry(retryQueueRef.current, capturedQuestion.id)

          // Hearts logic (복습 모드는 하트 차감 없음)
          if (!quizSettings.isReview) {
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
      })
      .catch(() => {
        setIsCheckingAnswer(false)
      })
  }, [
    selectedAnswer,
    questionStartTime,
    question,
    currentQuestion,
    quizSettings.questionCount,
    quizSettings.isReview,
    wrongAnswerStreak,
    router,
    combo,
    hearts,
    sessionOver,
    showResult,
    isCheckingAnswer,
    score,
    saveSessionData,
    isRetryQuestion,
    activeRetryQuestion,
    retryCheck.updatedQueue,
  ])

  const handleSkip = useCallback(() => {
    // Record skipped question
    setQuestionResults(prev => [...prev, {
      question_id: question.id,
      question_text: question.question.slice(0, 50),
      time_taken_ms: Date.now() - questionStartTime,
      selected_answer: -1,
      correct_answer: -1,
      is_correct: false,
      related_topics: question.relatedTopics,
      lesson_id: question.lessonId,
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
    if (currentQuestion > 0) {
      const prevIdx = currentQuestion - 1
      const snap = questionSnapshots.current.get(prevIdx)
      setCurrentQuestion(prevIdx)
      if (snap) {
        // 이전에 풀었던 문제면 답변 상태 복원 (읽기 전용)
        isSnapshotRestore.current = true
        setSelectedAnswer(snap.selectedAnswer)
        setIsCorrect(snap.isCorrect)
        setShowResult(true)
      } else {
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }
  }, [currentQuestion])

  const jumpToQuestion = useCallback(
    (idx: number, snap: { selectedAnswer: number; isCorrect: boolean }) => {
      setCurrentQuestion(idx)
      setSelectedAnswer(snap.selectedAnswer)
      setIsCorrect(snap.isCorrect)
      setShowResult(true)
    },
    [],
  )

  const dismissMidCheckIn = useCallback(() => {
    setShowMidCheckIn(false)
  }, [])

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

    // 서버 채점 결과
    isCheckingAnswer,
    serverCorrectAnswer,

    // Refs
    isSnapshotRestore,
    questionSnapshots,

    // Actions
    handleAnswerSelect,
    handleNext,
    handleSkip,
    handleExit,
    confirmExit,
    cancelExit,
    handlePrevious,
    jumpToQuestion,
    dismissMidCheckIn,
    handleLowerDifficulty,
    handleTakeBreak,
    handleContinue,
    handleExplanationClose,
    handlePracticeSimilar,
  }
}
