"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Star, Target, Zap } from "lucide-react"

export function AchievementsMilestones() {
  const achievements = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "진정한 학습자",
      description: "7일 연속 85% 이상 집중도",
      earned: true,
      date: "10월 24일",
      rarity: "rare",
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "꼼꼼이",
      description: "평균 1분 이상 문제 풀이",
      earned: true,
      date: "10월 20일",
      rarity: "common",
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "생각쟁이",
      description: "해설 읽기 100% 완료",
      earned: true,
      date: "10월 18일",
      rarity: "common",
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "복습왕",
      description: "복습 문제 50개 완료",
      earned: false,
      progress: 35,
      total: 50,
      rarity: "uncommon",
    },
  ]

  const nextMilestone = {
    title: "30일 연속 학습",
    current: 7,
    target: 30,
    reward: "황금 기린 배지 🦒✨",
  }

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-6">업적 & 마일스톤</h2>

      {/* Achievements Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {achievements.map((achievement, index) => (
          <Card
            key={index}
            className={`p-4 ${
              achievement.earned
                ? achievement.rarity === "rare"
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300"
                  : "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200"
                : "bg-gray-50 border-2 border-gray-200 opacity-60"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={achievement.earned ? "" : "grayscale"}>{achievement.icon}</div>
              <div>
                <h3 className="font-bold text-slate-800">{achievement.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{achievement.description}</p>
              </div>
              {achievement.earned ? (
                <div className="text-xs text-green-600 font-semibold">✓ {achievement.date}</div>
              ) : (
                <div className="w-full">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {achievement.progress}/{achievement.total}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Next Milestone */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">다음 마일스톤</h3>
          <span className="text-3xl">🎯</span>
        </div>
        <p className="text-slate-700 font-semibold mb-3">{nextMilestone.title}</p>
        <div className="w-full bg-orange-200 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-yellow-500 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ width: `${(nextMilestone.current / nextMilestone.target) * 100}%` }}
          >
            {nextMilestone.current}/{nextMilestone.target}
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-3">
          보상: <span className="font-semibold text-orange-700">{nextMilestone.reward}</span>
        </p>
      </Card>
    </Card>
  )
}
