"use client"

import { Flame, BookOpen, Target, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getCompletedLessons, pythonParts, cppParts } from "@/lib/curriculum-data"
import { getQuizHistory } from "@/lib/quiz-history"
import { useTier } from "@/hooks/use-tier"
import { tierInfo, tierLabel } from "@/lib/tier-system"
import { TierMark, UnrankedMark } from "@/components/tier-mark"

type Stat = {
  label: string
  value: string
  sub: string
  gradient: string
  iconBg: string
  iconColor: string
  /** 아이콘 자리 — 티어 칸만 lucide 대신 티어 마크를 쓴다. */
  icon?: LucideIcon
  mark?: React.ReactNode
  /** 누를 수 있는 칸이면 지정. 없으면 그냥 숫자 카드. */
  href?: string
  valueColor?: string
}

export function StatsCards() {
  // level / xpInCurrentLevel 은 일부러 쓰지 않는다 — 학생이 보는 실력 지표는 티어 하나다.
  const { totalXp, dailyStreak } = useGamification()
  const { t, lang } = useLanguage()
  const { tier, loaded: tierLoaded } = useTier()
  const [completedCount, setCompletedCount] = useState(0)
  const [recentAccuracy, setRecentAccuracy] = useState<number | null>(null)

  useEffect(() => {
    const completed = getCompletedLessons()
    const allIds = [...pythonParts, ...cppParts].flatMap(p => p.lessonIds)
    setCompletedCount(allIds.filter(id => completed.has(id)).length)

    const history = getQuizHistory()
    if (history.length > 0) {
      const recent = history.slice(0, 20)
      const totalCorrect = recent.reduce((s, e) => s + e.correctAnswers, 0)
      const totalQ = recent.reduce((s, e) => s + e.totalQuestions, 0)
      setRecentAccuracy(totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : null)
    }
  }, [])

  /**
   * 첫 칸은 예전 `레벨 / Lv.125` 자리다. 학생에게 보이는 실력 지표는 티어 하나이므로
   * 티어 이름을 그 자리에 넣고, 아직 배치고사를 안 봤으면 거기로 보낸다.
   * 로딩 중에는 "언랭" 이 번쩍이지 않도록 값을 비워 둔다.
   */
  const tierCard = tier
    ? {
        label: t("티어", "Tier"),
        value: tierLabel(tier, lang),
        valueColor: tierInfo(tier).color,
        sub: t("자기 티어 문제 10개 맞히면 승급", "Solve 10 at your tier to rank up"),
        mark: <TierMark tier={tier} size={24} />,
        href: "/tier",
      }
    : {
        label: t("티어", "Tier"),
        value: tierLoaded ? t("언랭", "Unranked") : "",
        valueColor: "#9ca3af",
        sub: t("배치고사를 보면 티어가 정해져요", "Take the placement test to get ranked"),
        mark: <UnrankedMark size={24} />,
        href: "/tier/placement",
      }

  const stats: Stat[] = [
    {
      ...tierCard,
      gradient: "from-gray-300 to-gray-400",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-500",
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
      sub: recentAccuracy !== null ? t(`최근 20회 정답률 ${recentAccuracy}%`, `Last 20 quizzes: ${recentAccuracy}%`) : t("퀴즈를 풀어보세요", "Try a quiz"),
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
        const card = (
          <Card
            className="group relative h-full overflow-hidden border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p
                  className="mt-2 text-3xl font-bold"
                  style={stat.valueColor ? { color: stat.valueColor } : undefined}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg}`}>
                {Icon ? <Icon className={`h-6 w-6 ${stat.iconColor}`} /> : stat.mark}
              </div>
            </div>
          </Card>
        )
        return stat.href
          ? <Link key={index} href={stat.href}>{card}</Link>
          : <div key={index}>{card}</div>
      })}
    </div>
  )
}
