"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Flame, Calendar, Clock, Sparkles } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"
import { getDueQuestions, getMasteryStats } from "@/lib/spaced-repetition"
import { getQuizHistory } from "@/lib/quiz-history"

export default function QuizSetupPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-orange-50 via-mint-50 to-lavender-50" />}>
      <QuizSetupPage />
    </Suspense>
  )
}

function QuizSetupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gamification = useGamification()
  const { t, lang } = useLanguage()

  const difficultyOptions = [
    { id: "beginner", label: t("초급", "Beginner"), color: "green", description: t("기초 문법과 개념", "Basic grammar and concepts") },
    { id: "intermediate", label: t("중급", "Intermediate"), color: "orange", description: t("실전 문제 해결", "Practical problem solving") },
    { id: "advanced", label: t("고급", "Advanced"), color: "red", description: t("심화 알고리즘", "Advanced algorithms") },
    { id: "mixed", label: t("혼합", "Mixed"), color: "rainbow", description: t("모든 난이도 섞어서", "Mix all difficulty levels"), default: true },
  ]
  const courseOptions = [
    { id: "python", label: "🐍 Python", color: "orange" },
    { id: "cpp", label: "⚡ C++", color: "blue" },
  ]
  const [selectedCourse, setSelectedCourse] = useState("python")
  const [questionCount, setQuestionCount] = useState(20)
  const [selectedDifficulty, setSelectedDifficulty] = useState("mixed")
  const [quizInProgress, setQuizInProgress] = useState(false)

  // 클라이언트 전용 상태 — hydration mismatch 방지
  const [dueCount, setDueCount] = useState(0)
  const [masteryStats, setMasteryStats] = useState<ReturnType<typeof getMasteryStats> | null>(null)
  const [todayCompleted, setTodayCompleted] = useState(0)
  const [isIgcseTrack, setIsIgcseTrack] = useState(false)

  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState("")

  // 저장된 설정 복원 + 진행 중 퀴즈 감지 + 클라이언트 전용 데이터 로드
  useEffect(() => {
    try {
      const prefs = sessionStorage.getItem("quiz-setup-prefs")
      if (prefs) {
        const p = JSON.parse(prefs)
        if (p.course) setSelectedCourse(p.course)
        if (p.questionCount) setQuestionCount(p.questionCount)
        if (p.difficulty) setSelectedDifficulty(p.difficulty)
      }
    } catch {}
    const inProgress = sessionStorage.getItem("quiz-in-progress") === "1"
    const hasSettings = !!sessionStorage.getItem("quizSettings")
    setQuizInProgress(inProgress && hasSettings)

    // localStorage 기반 데이터 — 클라이언트에서만 접근 가능
    const due = getDueQuestions()
    setDueCount(due.length)
    setMasteryStats(getMasteryStats())

    const todayStr = new Date().toISOString().slice(0, 10)
    const completed = getQuizHistory()
      .filter(e => e.date === todayStr && e.endReason === "completed")
      .reduce((sum, e) => sum + e.totalQuestions, 0)
    setTodayCompleted(completed)

    try {
      const saved = localStorage.getItem("completedLessons")
      if (saved) {
        const ids: string[] = JSON.parse(saved)
        setIsIgcseTrack(ids.some(id => id.startsWith("pseudo-") || id.startsWith("igcse-")))
      }
    } catch {}

    // mode=review → 즉시 복습 세션 시작 (due 데이터 로드 후 실행)
    const courseForReview = (() => {
      try {
        const prefs = sessionStorage.getItem("quiz-setup-prefs")
        return prefs ? (JSON.parse(prefs).course ?? "python") : "python"
      } catch { return "python" }
    })()
    if (searchParams.get("mode") === "review" && due.length > 0) {
      const reviewCount = Math.min(Math.max(due.length, 10), 30)
      sessionStorage.setItem("quizSettings", JSON.stringify({
        questionCount: reviewCount, difficulty: "mixed",
        course: courseForReview, startTime: Date.now(), reviewMode: true,
      }))
      router.replace("/quiz")
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 설정 변경 시 sessionStorage에 저장 (이탈 후 복원용)
  useEffect(() => {
    try {
      sessionStorage.setItem("quiz-setup-prefs", JSON.stringify({
        course: selectedCourse, questionCount, difficulty: selectedDifficulty,
      }))
    } catch {}
  }, [selectedCourse, questionCount, selectedDifficulty])

  const currentDate = new Date().toLocaleDateString(lang === "en" ? "en-US" : "ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  const estimatedTime = Math.ceil(questionCount * 1)
  const goalPct = Math.min(Math.round((todayCompleted / questionCount) * 100), 100)
  const goalMet = todayCompleted >= questionCount

  const handleQuickSelect = (count: number) => {
    setQuestionCount(count)
    setShowCustomInput(false)
  }

  const handleCustomInput = () => {
    setShowCustomInput(true)
  }

  const handleCustomSubmit = () => {
    const value = Number.parseInt(customValue)
    if (value >= 5 && value <= 100) {
      setQuestionCount(value)
      setShowCustomInput(false)
      setCustomValue("")
    }
  }

  const handleIncrement = () => {
    if (questionCount < 100) {
      setQuestionCount(questionCount + 1)
    }
  }

  const handleDecrement = () => {
    if (questionCount > 5) {
      setQuestionCount(questionCount - 1)
    }
  }

  const handleStart = () => {
    sessionStorage.removeItem("quiz-in-progress") // 이전 플래그 초기화
    setQuizInProgress(false)
    sessionStorage.setItem(
      "quizSettings",
      JSON.stringify({
        questionCount,
        difficulty: selectedDifficulty,
        course: selectedCourse,
        startTime: Date.now(),
      }),
    )
    router.push("/quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-mint-50 to-lavender-50">
      {/* 학습 페이지: max-w-[1300px] + 중앙 정렬 */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 */}
        <div className="mb-2">
          <Link href="/curriculum" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← {t("커리큘럼으로", "Back to Curriculum")}
          </Link>
        </div>
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="text-8xl animate-wave">🦒</div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{t("오늘도 함께 공부해볼까요?", "Ready to study together today?")}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
              <Flame className="h-4 w-4" />
              <span>{gamification.dailyStreak > 0 ? t(`${gamification.dailyStreak}일 연속 학습 중!`, `${gamification.dailyStreak}-day streak!`) : t("오늘 첫 학습!", "First session today!")}</span>
            </div>
          </div>
        </div>

        {/* 진행 중 퀴즈 이어서 풀기 배너 */}
        {quizInProgress && (
          <div className="mb-4 flex items-center gap-3 p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1">
              <p className="font-bold text-amber-800 text-sm">{t("진행 중인 퀴즈가 있어요", "Quiz in progress")}</p>
              <p className="text-xs text-amber-600">{t("이어서 풀거나 새로 시작할 수 있어요", "Continue or start fresh")}</p>
            </div>
            <button
              onClick={() => router.push("/quiz")}
              className="shrink-0 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors"
            >
              {t("이어서 →", "Continue →")}
            </button>
          </div>
        )}

        {/* 빠른 시작 (P6 캐주얼 유저용) */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              sessionStorage.setItem("quizSettings", JSON.stringify({
                questionCount: 5, difficulty: "mixed", course: selectedCourse, startTime: Date.now()
              }))
              router.push("/quiz")
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-orange-200 text-orange-600 font-bold hover:border-orange-400 hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span className="text-lg">⚡</span>
            {t(
              `지금 바로 5문제 (${courseOptions.find(c => c.id === selectedCourse)?.label ?? selectedCourse})`,
              `Quick 5 (${courseOptions.find(c => c.id === selectedCourse)?.label ?? selectedCourse})`
            )}
          </button>
        </div>

        {/* Course Selector */}
        <div className="flex justify-center gap-3 mb-6">
          {courseOptions.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={cn(
                "px-6 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105 border-2",
                selectedCourse === course.id
                  ? course.color === "orange"
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                    : "bg-blue-500 text-white border-blue-500 shadow-lg"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400",
              )}
            >
              {course.label}
            </button>
          ))}
        </div>

        {/* IGCSE 트랙 안내 */}
        {isIgcseTrack && (
          <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
            <p className="font-bold text-blue-800 text-sm">📚 IGCSE/Pseudocode 트랙 학생이시군요!</p>
            <p className="text-xs text-blue-600 mt-1">
              {t(
                "현재 연습 문제는 Python/C++ 전용이에요. Pseudocode 문제는 준비 중입니다. Python 문제로 알고리즘 사고력을 연습해보세요!",
                "Practice questions are currently Python/C++ only. Pseudocode questions are coming soon. Try Python questions to sharpen algorithmic thinking!"
              )}
            </p>
          </div>
        )}

        {/* Question Count Selector */}
        <Card className="p-6 md:p-8 mb-6 border-2 border-orange-200 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">{t("오늘 풀 문제 개수", "Number of problems today")}</h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleDecrement}
              disabled={questionCount <= 5}
              className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-2xl font-bold text-gray-700 transition-all hover:scale-110 active:scale-95"
              aria-label={t("문제 수 감소", "Decrease count")}
            >
              <Minus className="h-6 w-6" />
            </button>

            <div className="text-6xl md:text-7xl font-bold text-orange-500 min-w-[120px] text-center">
              {questionCount}
            </div>

            <button
              onClick={handleIncrement}
              disabled={questionCount >= 100}
              className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-2xl font-bold text-white transition-all hover:scale-110 active:scale-95"
              aria-label={t("문제 수 증가", "Increase count")}
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>

          {/* Quick Select Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {[5, 10, 20, 30, 50].map((count) => (
              <button
                key={count}
                onClick={() => handleQuickSelect(count)}
                className={cn(
                  "px-4 py-2 rounded-full font-semibold transition-all hover:scale-105",
                  questionCount === count
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300",
                )}
              >
                {count === 5 ? t("5개 ⚡", "5 ⚡") : t(`${count}개`, `${count} questions`)}
              </button>
            ))}
            <button
              onClick={handleCustomInput}
              className="px-4 py-2 rounded-full font-semibold bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 transition-all hover:scale-105"
            >
              {t("직접 입력", "Custom")}
            </button>
          </div>

          {showCustomInput && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <input
                type="number"
                min="5"
                max="100"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="5-100"
                className="w-24 px-3 py-2 border-2 border-orange-300 rounded-lg text-center font-semibold"
              />
              <Button onClick={handleCustomSubmit} className="bg-orange-500 hover:bg-orange-600">
                {t("확인", "OK")}
              </Button>
            </div>
          )}

          {/* Estimated Time */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-semibold">{t(`약 ${estimatedTime}분 소요`, `About ${estimatedTime} min`)}</span>
          </div>
        </Card>

        {/* 복습 + 숙련도 통합 상태 카드 */}
        {(dueCount > 0 || (masteryStats && (masteryStats.learningCount > 0 || masteryStats.reviewingCount > 0 || masteryStats.masteredCount > 0))) && (
          <Card className="p-4 mb-4 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 flex-wrap">
              {dueCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-xl">
                  <span className="text-base">🔄</span>
                  <div>
                    <p className="text-xs font-bold text-purple-700">{t(`복습 ${dueCount}개`, `${dueCount} to review`)}</p>
                    <p className="text-[10px] text-purple-400">{t("오늘 복습 추천", "Recommended today")}</p>
                  </div>
                </div>
              )}
              {masteryStats && masteryStats.learningCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-xl">
                  <span>🌱</span>
                  <span className="text-sm font-black text-red-600">{masteryStats.learningCount}</span>
                  <span className="text-[10px] text-red-400">{t("학습 중", "Learning")}</span>
                </div>
              )}
              {masteryStats && masteryStats.reviewingCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-xl">
                  <span>🌿</span>
                  <span className="text-sm font-black text-orange-600">{masteryStats.reviewingCount}</span>
                  <span className="text-[10px] text-orange-400">{t("복습 중", "Reviewing")}</span>
                </div>
              )}
              {masteryStats && masteryStats.masteredCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-xl">
                  <span>⭐</span>
                  <span className="text-sm font-black text-green-600">{masteryStats.masteredCount}</span>
                  <span className="text-[10px] text-green-400">{t("숙달", "Mastered")}</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Daily Goal Section — 실제 완료 데이터 */}
        <Card className={cn("p-5 mb-6 border-2 shadow-lg", goalMet ? "border-green-300 bg-green-50" : "border-mint-200")}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-mint-500" />
                <h3 className="text-sm font-bold text-gray-700">{t("오늘의 목표", "Today's Goal")}</h3>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {t(`${todayCompleted}/${questionCount} 완료`, `${todayCompleted}/${questionCount} done`)}
              </div>
              <p className="text-sm text-gray-500">
                {goalMet
                  ? t("🎉 오늘 목표 달성!", "🎉 Goal achieved today!")
                  : todayCompleted > 0
                    ? t(`${questionCount - todayCompleted}문제 더 풀면 완성!`, `${questionCount - todayCompleted} more to go!`)
                    : t("오늘도 끝까지 해보자!", "Let's finish today!")}
              </p>
            </div>
            <div className="relative w-20 h-20">
              <svg className="transform -rotate-90 w-20 h-20">
                <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="7" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke={goalMet ? "#22c55e" : "#7DD3C0"}
                  strokeWidth="7"
                  fill="none"
                  strokeDasharray={`${(goalPct / 100) * 201} 201`}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">{goalPct}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Difficulty Selection */}
        <Card className="p-6 mb-8 border-2 border-lavender-200 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t("난이도 선택", "Select Difficulty")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {difficultyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedDifficulty(option.id)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all hover:scale-105",
                  selectedDifficulty === option.id
                    ? "border-lavender-400 bg-lavender-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-lavender-300",
                )}
              >
                <div
                  className={cn(
                    "text-2xl font-bold mb-2",
                    option.color === "green" && "text-green-600",
                    option.color === "orange" && "text-orange-600",
                    option.color === "red" && "text-red-600",
                    option.color === "rainbow" &&
                      "bg-gradient-to-r from-green-600 via-orange-600 to-red-600 bg-clip-text text-transparent",
                  )}
                >
                  {option.label}
                </div>
                <div className="text-xs text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>

          {selectedDifficulty === "mixed" && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">{t("문제 분포:", "Distribution:")}</p>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-green-400 rounded" title={t("초급 33%", "Beginner 33%")} />
                <div className="flex-1 h-2 bg-orange-400 rounded" title={t("중급 33%", "Intermediate 33%")} />
                <div className="flex-1 h-2 bg-red-400 rounded" title={t("고급 34%", "Advanced 34%")} />
              </div>
            </div>
          )}

          {/* 하트(목숨) 안내 */}
          {(() => {
            const hearts = selectedDifficulty === "beginner" ? 7 : selectedDifficulty === "advanced" ? 3 : 5
            return (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: hearts }).map((_, i) => (
                    <span key={i} className="text-sm">❤️</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-right">
                  {t(
                    `하트 ${hearts}개 — 틀리면 1개 감소, 0개가 되면 종료돼요`,
                    `${hearts} hearts — lose 1 per wrong answer, game over at 0`
                  )}
                </p>
              </div>
            )
          })()}
        </Card>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          disabled={questionCount < 5}
          className="w-full py-8 text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className="flex items-center justify-center gap-2">
            {t("시작하기", "Start")}
            <span className="text-2xl group-hover:animate-bounce">🚀</span>
          </span>
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4 pb-20">{t("최소 80% 이상 완료해야 목표 달성으로 인정돼요", "Complete at least 80% to achieve your goal")}</p>
      </main>

      <BottomNav />
    </div>
  )
}
