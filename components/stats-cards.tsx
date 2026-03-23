"use client"

import { Flame, Star, BookOpen, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getCompletedLessons, pythonParts, cppParts } from "@/lib/curriculum-data"
import { getQuizHistory } from "@/lib/quiz-history"

export function StatsCards() {
  const { level, xpInCurrentLevel, totalXp, dailyStreak } = useGamification()
  const { t } = useLanguage()
  const [completedCount, setCompletedCount] = useState(0)
  const [recentAccuracy, setRecentAccuracy] = useState<number | null>(null)

  useEffect(() => {
    const completed = getCompletedLessons()
    const allIds = [...pythonParts, ...cppParts].flatMap(p => p.lessonIds)
    setCompletedCount(allIds.filter(id => completed.has(id)).length)

    const history = getQuizHistory()
    if (history.length > 0) {
      const recent = history.slice(0, 10)
      const totalCorrect = recent.reduce((s, e) => s + e.correctAnswers, 0)
      const totalQ = recent.reduce((s, e) => s + e.totalQuestions, 0)
      setRecentAccuracy(totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : null)
    }
  }, [])

  const stats = [
    {
      label: t("레벨", "Level"),
      value: `Lv.${level}`,
      sub: `${xpInCurrentLevel}/100 XP`,
      icon: Star,
      gradient: "from-lavender-400 to-lavender-500",
      iconBg: "bg-lavender-100",
      iconColor: "text-lavender-500",
    },
    {
      label: t("총 XP", "Total XP"),
      value: `${totalXp}`,
      sub: "XP",
      icon: Target,
      gradient: "from-orange-400 to-orange-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      label: t("연속 학습", "Streak"),
      value: `${dailyStreak}${t("일", "d")}`,
      sub: dailyStreak > 0 ? t("연속 학습 중!", "days in a row!") : t("오늘 시작해보세요", "Start today"),
      icon: Flame,
      gradient: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      label: t("완료한 수업", "Lessons Done"),
      value: `${completedCount}`,
      sub: recentAccuracy !== null ? t(`최근 정답률 ${recentAccuracy}%`, `Recent accuracy ${recentAccuracy}%`) : t("퀴즈를 풀어보세요", "Try a quiz"),
      icon: BookOpen,
      gradient: "from-mint-400 to-mint-500",
      iconBg: "bg-mint-100",
      iconColor: "text-mint-500",
    },
  ]

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
                <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
              </div>
              <div className={`rounded-full ${stat.iconBg} p-3`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
