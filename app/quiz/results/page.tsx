"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, Target, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { CircularProgress } from "@/components/circular-progress"
import { PerformanceCard } from "@/components/performance-card"
import { ReviewTimeline } from "@/components/review-timeline"
import { WrongAnswerCard } from "@/components/wrong-answer-card"

// Sample results data
const resultsData = {
  score: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  timeSpent: "12:34",
  accuracy: 80,
  performance: [
    {
      category: "기초 문법",
      icon: BookOpen,
      correct: 4,
      total: 5,
      color: "orange",
    },
    {
      category: "자료 구조",
      icon: Target,
      correct: 3,
      total: 5,
      color: "mint",
    },
    {
      category: "함수",
      icon: Zap,
      correct: 5,
      total: 5,
      color: "lavender",
    },
  ],
  reviewSchedule: [
    { time: "지금 바로", count: 3, color: "orange", days: 0 },
    { time: "1일 후", count: 2, color: "yellow", days: 1 },
    { time: "3일 후", count: 2, color: "mint", days: 3 },
    { time: "7일 후", count: 1, color: "lavender", days: 7 },
  ],
  wrongAnswers: [
    {
      id: 1,
      question: "리스트에서 마지막 요소를 가져오는 올바른 방법은?",
      code: "my_list = [1, 2, 3, 4, 5]",
      yourAnswer: "my_list[5]",
      correctAnswer: "my_list[-1]",
      explanation:
        "Python에서는 음수 인덱스를 사용하여 뒤에서부터 요소에 접근할 수 있습니다. -1은 마지막 요소를 의미합니다.",
    },
    {
      id: 2,
      question: "다음 코드의 출력 결과는?",
      code: "def func(x=[]):\n    x.append(1)\n    return x\n\nprint(func())\nprint(func())",
      yourAnswer: "[1] [1]",
      correctAnswer: "[1] [1, 1]",
      explanation:
        "Python에서 기본 인자는 함수가 정의될 때 한 번만 생성됩니다. 따라서 같은 리스트 객체가 재사용되어 값이 누적됩니다.",
    },
  ],
}

export default function ResultsPage() {
  const router = useRouter()
  const [expandedAnswers, setExpandedAnswers] = useState<number[]>([])
  const [showPerformance, setShowPerformance] = useState(true)
  const [showReview, setShowReview] = useState(true)
  const [showWrongAnswers, setShowWrongAnswers] = useState(true)

  const toggleAnswer = (id: number) => {
    setExpandedAnswers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getMessage = () => {
    if (resultsData.score >= 90) return "완벽해요! 정말 잘하셨어요!"
    if (resultsData.score >= 70) return "잘했어요! 조금만 더 복습하면 완벽해요!"
    return "괜찮아요! 복습하면 더 잘할 수 있어요!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Results Summary */}
          <div className="animate-fade-in rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                <CircularProgress score={resultsData.score} />

                <div className="text-center md:text-left">
                  <h1 className="mb-2 text-3xl font-bold text-gray-800">퀴즈 완료!</h1>
                  <p className="mb-4 text-lg text-gray-600">{getMessage()}</p>

                  <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                    <div className="rounded-full bg-orange-100 px-4 py-2">
                      <span className="text-sm text-gray-600">정확도</span>
                      <span className="ml-2 font-semibold text-orange-600">{resultsData.accuracy}%</span>
                    </div>
                    <div className="rounded-full bg-mint-100 px-4 py-2">
                      <span className="text-sm text-gray-600">소요 시간</span>
                      <span className="ml-2 font-mono font-semibold text-mint-600">{resultsData.timeSpent}</span>
                    </div>
                    <div className="rounded-full bg-lavender-100 px-4 py-2">
                      <span className="text-sm text-gray-600">정답</span>
                      <span className="ml-2 font-semibold text-lavender-600">
                        {resultsData.correctAnswers}/{resultsData.totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Celebrating Giraffe */}
              <div className="text-8xl animate-bounce-in">🦒✨</div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="animate-fade-in animation-delay-100">
            <button
              onClick={() => setShowPerformance(!showPerformance)}
              className="mb-4 flex w-full items-center justify-between md:pointer-events-none"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">카테고리별 성과</h2>
              {showPerformance ? (
                <ChevronUp className="h-5 w-5 text-gray-600 md:hidden" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 md:hidden" />
              )}
            </button>
            {showPerformance && (
              <div className="grid gap-4 md:grid-cols-3">
                {resultsData.performance.map((perf, index) => (
                  <PerformanceCard key={index} {...perf} />
                ))}
              </div>
            )}
          </div>

          {/* Review Schedule */}
          <div className="animate-fade-in animation-delay-200">
            <button
              onClick={() => setShowReview(!showReview)}
              className="mb-4 flex w-full items-center justify-between md:pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 md:h-5 md:w-5 text-orange-500" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">복습 일정</h2>
              </div>
              {showReview ? (
                <ChevronUp className="h-5 w-5 text-gray-600 md:hidden" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 md:hidden" />
              )}
            </button>
            {showReview && <ReviewTimeline schedule={resultsData.reviewSchedule} />}
          </div>

          {/* Wrong Answers Section */}
          {resultsData.wrongAnswers.length > 0 && (
            <div className="animate-fade-in animation-delay-200">
              <button
                onClick={() => setShowWrongAnswers(!showWrongAnswers)}
                className="mb-4 flex w-full items-center justify-between md:pointer-events-none"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  틀린 문제 ({resultsData.wrongAnswers.length}개)
                </h2>
                {showWrongAnswers ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 md:hidden" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 md:hidden" />
                )}
              </button>
              {showWrongAnswers && (
                <div className="space-y-4">
                  {resultsData.wrongAnswers.map((answer) => (
                    <WrongAnswerCard
                      key={answer.id}
                      answer={answer}
                      isExpanded={expandedAnswers.includes(answer.id)}
                      onToggle={() => toggleAnswer(answer.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => router.push("/quiz")}
              className="flex-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              복습 시작하기
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="flex-1 rounded-full border-2 border-orange-300 py-6 text-lg font-semibold text-orange-600 transition-all hover:bg-orange-50"
            >
              대시보드로
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
