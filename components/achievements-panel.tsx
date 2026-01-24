"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const achievements = [
  { name: "첫 걸음", description: "첫 퀴즈 완료", unlocked: true, icon: "🎯" },
  { name: "연속 학습", description: "7일 연속 학습", unlocked: true, icon: "🔥" },
  { name: "완벽주의자", description: "10문제 연속 정답", unlocked: true, icon: "⭐" },
  { name: "마스터", description: "한 주제 100% 완료", unlocked: true, icon: "🏆" },
  { name: "도전자", description: "100문제 해결", unlocked: false, icon: "🎖️" },
  { name: "전문가", description: "모든 주제 완료", unlocked: false, icon: "👑" },
]

const nextMilestone = {
  name: "도전자 배지",
  current: 85,
  target: 100,
  description: "100문제 해결하기",
}

export function AchievementsPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Achievements */}
      <Card className="border-0 bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-bold">업적</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-300",
                achievement.unlocked
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 hover:scale-105 hover:shadow-md"
                  : "bg-gray-100 opacity-50",
              )}
            >
              <div className="text-4xl">{achievement.icon}</div>
              <div className="text-center">
                <p className="text-xs font-semibold">{achievement.name}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Next Milestone */}
      <Card className="border-0 bg-gradient-to-br from-lavender-50 to-mint-50 p-6 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <Target className="h-6 w-6 text-lavender-500" />
          <h2 className="text-xl font-bold">다음 목표</h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl">{achievements[4].icon}</div>
          <h3 className="text-2xl font-bold">{nextMilestone.name}</h3>
          <p className="text-center text-muted-foreground">{nextMilestone.description}</p>

          <div className="w-full">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold">진행률</span>
              <span className="font-bold text-lavender-600">
                {nextMilestone.current} / {nextMilestone.target}
              </span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lavender-400 to-mint-400 transition-all duration-500"
                style={{ width: `${(nextMilestone.current / nextMilestone.target) * 100}%` }}
              />
            </div>
          </div>

          <p className="text-center text-sm font-semibold text-lavender-600">
            {nextMilestone.target - nextMilestone.current}문제 남았어요!
          </p>
        </div>
      </Card>
    </div>
  )
}
