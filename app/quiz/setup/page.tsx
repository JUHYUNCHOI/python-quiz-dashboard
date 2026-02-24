"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Flame, Calendar, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification"

const difficultyOptions = [
  { id: "beginner", label: "초급", color: "green", description: "기초 문법과 개념" },
  { id: "intermediate", label: "중급", color: "orange", description: "실전 문제 해결" },
  { id: "advanced", label: "고급", color: "red", description: "심화 알고리즘" },
  { id: "mixed", label: "혼합", color: "rainbow", description: "모든 난이도 섞어서", default: true },
]

export default function QuizSetupPage() {
  const router = useRouter()
  const gamification = useGamification()
  const [questionCount, setQuestionCount] = useState(20)
  const [selectedDifficulty, setSelectedDifficulty] = useState("mixed")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customValue, setCustomValue] = useState("")

  const currentDate = new Date().toLocaleDateString("ko-KR", {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">오늘도 함께 공부해볼까요?</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
              <Flame className="h-4 w-4" />
              <span>{gamification.dailyStreak > 0 ? `${gamification.dailyStreak}일 연속 학습 중!` : "오늘 첫 학습!"}</span>
            </div>
          </div>
        </div>

        {/* Question Count Selector */}
        <Card className="p-6 md:p-8 mb-6 border-2 border-orange-200 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">오늘 풀 문제 개수</h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleDecrement}
              disabled={questionCount <= 5}
              className="w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-2xl font-bold text-gray-700 transition-all hover:scale-110 active:scale-95"
              aria-label="문제 수 감소"
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
              aria-label="문제 수 증가"
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
                {count}개
              </button>
            ))}
            <button
              onClick={handleCustomInput}
              className="px-4 py-2 rounded-full font-semibold bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 transition-all hover:scale-105"
            >
              직접 입력
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
                확인
              </Button>
            </div>
          )}

          {/* Estimated Time */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-semibold">약 {estimatedTime}분 소요</span>
          </div>
        </Card>

        {/* Daily Goal Section */}
        <Card className="p-6 mb-6 border-2 border-mint-200 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-mint-500" />
            오늘의 목표
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">0/{questionCount} 완료</div>
              <p className="text-sm text-gray-600 mb-2">오늘도 끝까지 해보자!</p>
              <p className="text-xs text-gray-500">어제 15/20 완료 (75%)</p>
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
          <h3 className="text-lg font-bold text-gray-800 mb-4">난이도 선택</h3>
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
              <p className="text-sm text-gray-600 mb-2">문제 분포:</p>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-green-400 rounded" title="초급 33%" />
                <div className="flex-1 h-2 bg-orange-400 rounded" title="중급 33%" />
                <div className="flex-1 h-2 bg-red-400 rounded" title="고급 34%" />
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
            시작하기
            <span className="text-2xl group-hover:animate-bounce">🚀</span>
          </span>
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">최소 80% 이상 완료해야 목표 달성으로 인정돼요</p>
      </main>
    </div>
  )
}
