"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Clock, Target, Zap, Award, Home, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SessionCompletePage() {
  const router = useRouter()
  const [showBadge, setShowBadge] = useState(false)

  // Mock data - in real app, get from session storage or API
  const sessionData = {
    completed: 20,
    total: 20,
    totalTime: "22분 15초",
    avgTimePerQuestion: "1분 7초",
    focusedTime: "21분 30초",
    accuracy: 85,
    correct: 17,
    comparison: "평균보다 3분 빠르고 정답률 +5% 높아요!",
    engagementQuality: 95,
    achievements: [
      { id: 1, title: "첫 20문제 완료!", icon: "🎯", unlocked: true },
      { id: 2, title: "3일 연속 학습!", icon: "🔥", unlocked: true },
      { id: 3, title: "집중력 챔피언!", icon: "⚡", unlocked: true },
    ],
  }

  useEffect(() => {
    setTimeout(() => setShowBadge(true), 500)
  }, [])

  const handleGoHome = () => {
    router.push("/")
  }

  const handleReview = () => {
    router.push("/quiz/results")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-mint-50 to-lavender-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-in">🦒🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {sessionData.completed}/{sessionData.total} 문제 완료!
          </h1>
          <p className="text-xl text-gray-600">정말 잘했어요!</p>
        </div>

        {/* Results Summary */}
        <Card className="p-6 md:p-8 mb-6 border-2 border-orange-200 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-orange-500" />
            학습 결과
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{sessionData.totalTime}</div>
              <div className="text-xs text-gray-600">총 시간</div>
            </div>

            <div className="text-center p-4 bg-mint-50 rounded-xl">
              <Target className="h-6 w-6 text-mint-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{sessionData.avgTimePerQuestion}</div>
              <div className="text-xs text-gray-600">문제당 평균</div>
            </div>

            <div className="text-center p-4 bg-lavender-50 rounded-xl">
              <Zap className="h-6 w-6 text-lavender-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{sessionData.focusedTime}</div>
              <div className="text-xs text-gray-600">집중 시간</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{sessionData.accuracy}%</div>
              <div className="text-xs text-gray-600">정답률</div>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-mint-100 rounded-xl">
            <p className="text-sm font-semibold text-gray-800">{sessionData.comparison}</p>
          </div>
        </Card>

        {/* Achievements */}
        {showBadge && (
          <Card className="p-6 md:p-8 mb-6 border-2 border-yellow-200 shadow-lg animate-bounce-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              업적 달성!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sessionData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    "p-4 rounded-xl text-center transition-all",
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 shadow-lg"
                      : "bg-gray-100 opacity-50",
                  )}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-semibold text-gray-800">{achievement.title}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Honesty Indicators */}
        <Card className="p-6 md:p-8 mb-8 border-2 border-mint-200 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">학습 품질</h2>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">진심도</span>
              <span className="text-lg font-bold text-mint-600">{sessionData.engagementQuality}%</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-mint-400 to-mint-500 transition-all duration-1000"
                style={{ width: `${sessionData.engagementQuality}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">문제당 평균 시간:</span> {sessionData.avgTimePerQuestion}
            </div>
            <div>
              <span className="font-semibold">집중 시간 비율:</span> {sessionData.engagementQuality}%
            </div>
          </div>

          {sessionData.engagementQuality >= 90 && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
              <p className="text-sm font-semibold text-green-700">완벽한 집중력이에요! 👏</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleGoHome}
            className="py-6 text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            홈으로
          </Button>

          <Button
            onClick={handleReview}
            className="py-6 text-lg font-semibold bg-gradient-to-r from-mint-400 to-mint-500 hover:from-mint-500 hover:to-mint-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            틀린 문제 복습
          </Button>
        </div>
      </main>
    </div>
  )
}
