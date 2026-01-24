"use client"

import { Clock, CheckCircle2, Flame, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    label: "총 학습 시간",
    value: "24시간 30분",
    icon: Clock,
    color: "orange",
    gradient: "from-orange-400 to-orange-500",
  },
  {
    label: "해결한 문제",
    value: "342개",
    icon: CheckCircle2,
    color: "mint",
    gradient: "from-mint-400 to-mint-500",
  },
  {
    label: "연속 학습",
    value: "7일",
    icon: Flame,
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    label: "현재 레벨",
    value: "Level 5",
    icon: Star,
    color: "lavender",
    gradient: "from-lavender-400 to-lavender-500",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className="group relative overflow-hidden border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full bg-${stat.color}-100 p-3`}>
                <Icon className={`h-6 w-6 text-${stat.color}-500`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
