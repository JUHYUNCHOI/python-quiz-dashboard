"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Flame, Calendar, Clock, Sparkles } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"
import { getDueQuestions, getMasteryStats, getMasteryLabel } from "@/lib/spaced-repetition"

export default function QuizSetupPage() {
  const router = useRouter()
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

  // 간격 반복 상태
  const dueCount = typeof window !== "undefined" ? getDueQuestions().length : 0
  const masteryStats = typeof window !== "undefined" ? getMasteryStats() : null
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState("")

  const currentDate = new Date().toLocaleDateString(lang === "en" ? "en-US" : "ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  const estimatedTime = Math.ceil(questionCount * 1)

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
    // Store quiz settings in sessionStorage
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
            {[10, 20, 30, 50].map((count) => (
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
                {t(`${count}개`, `${count} questions`)}
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

        {/* 복습 알림 (간격 반복) */}
        {dueCount > 0 && (
          <Card className="p-4 mb-4 border-2 border-purple-200 bg-purple-50/50 shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔄</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-purple-700">
                  {t(`복습할 문제 ${dueCount}개!`, `${dueCount} questions to review!`)}
                </p>
                <p className="text-xs text-purple-500">
                  {t("잊어버리기 전에 복습하면 오래 기억해요", "Review before you forget for better retention")}
                </p>
              </div>
              <span className="text-2xl animate-pulse">🧠</span>
            </div>
          </Card>
        )}

        {/* 숙련도 현황 */}
        {masteryStats && (masteryStats.learningCount > 0 || masteryStats.reviewingCount > 0 || masteryStats.masteredCount > 0) && (
          <Card className="p-4 mb-4 border-2 border-gray-200 shadow-md">
            <h3 className="text-sm font-bold text-gray-700 mb-3">{t("나의 숙련도", "My Mastery")}</h3>
            <div className="flex gap-2">
              {masteryStats.learningCount > 0 && (
                <div className="flex-1 text-center p-2 bg-red-50 rounded-lg">
                  <div className="text-lg">🌱</div>
                  <div className="text-lg font-black text-red-600">{masteryStats.learningCount}</div>
                  <div className="text-[10px] text-red-500">{t("학습 중", "Learning")}</div>
                </div>
              )}
              {masteryStats.reviewingCount > 0 && (
                <div className="flex-1 text-center p-2 bg-orange-50 rounded-lg">
                  <div className="text-lg">🌿</div>
                  <div className="text-lg font-black text-orange-600">{masteryStats.reviewingCount}</div>
                  <div className="text-[10px] text-orange-500">{t("복습 중", "Reviewing")}</div>
                </div>
              )}
              {masteryStats.masteredCount > 0 && (
                <div className="flex-1 text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-lg">⭐</div>
                  <div className="text-lg font-black text-green-600">{masteryStats.masteredCount}</div>
                  <div className="text-[10px] text-green-500">{t("숙달", "Mastered")}</div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Daily Goal Section */}
        <Card className="p-6 mb-6 border-2 border-mint-200 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-mint-500" />
            {t("오늘의 목표", "Today's Goal")}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{t(`0/${questionCount} 완료`, `0/${questionCount} completed`)}</div>
              <p className="text-sm text-gray-600 mb-2">{t("오늘도 끝까지 해보자!", "Let's finish today!")}</p>
              <p className="text-xs text-gray-500">{t(`연속 학습 ${gamification.dailyStreak}일째!`, `${gamification.dailyStreak}-day streak!`)}</p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#7DD3C0"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(0 / questionCount) * 251.2} 251.2`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">0%</span>
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
