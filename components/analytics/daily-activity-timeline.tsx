"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Target, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function DailyActivityTimeline() {
  const { t } = useLanguage()

  const dailyActivities = [
    {
      date: "10월 24일 (목)",
      completed: 20,
      total: 20,
      timeSpent: 25,
      accuracy: 85,
      focus: 92,
      indicators: [
        t("⚡ 집중도 높음", "⚡ High focus"),
        t("🎯 세심하게 풀었어요", "🎯 Thorough solving"),
      ],
      status: "excellent",
    },
    {
      date: "10월 23일 (수)",
      completed: 20,
      total: 20,
      timeSpent: 18,
      accuracy: 78,
      focus: 65,
      indicators: [
        t("💭 약간 산만했어요", "💭 Slightly distracted"),
        t("⏱️ 빠르게 풀었어요", "⏱️ Solved quickly"),
      ],
      status: "good",
    },
    {
      date: "10월 22일 (화)",
      completed: 20,
      total: 20,
      timeSpent: 32,
      accuracy: 90,
      focus: 95,
      indicators: [
        t("⚡ 집중도 높음", "⚡ High focus"),
        t("🎯 세심하게 풀었어요", "🎯 Thorough solving"),
      ],
      status: "excellent",
    },
    {
      date: "10월 21일 (월)",
      completed: 15,
      total: 20,
      timeSpent: 22,
      accuracy: 73,
      focus: 70,
      indicators: [t("💭 약간 산만했어요", "💭 Slightly distracted")],
      status: "warning",
    },
  ]

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-6">{t("일일 활동 타임라인", "Daily Activity Timeline")}</h2>

      <div className="space-y-4">
        {dailyActivities.map((activity, index) => (
          <Card
            key={index}
            className={`p-5 border-2 ${
              activity.status === "excellent"
                ? "border-green-200 bg-green-50"
                : activity.status === "good"
                  ? "border-blue-200 bg-blue-50"
                  : "border-yellow-200 bg-yellow-50"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Date and Completion */}
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">{activity.date}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-slate-700">
                    {activity.completed}/{activity.total} {t("완료", "done")}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700">{activity.timeSpent}{t("분", " min")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700">{activity.accuracy}% {t("정답", "correct")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700">{t("집중도", "Focus")} {activity.focus}%</span>
                </div>
              </div>

              {/* Indicators */}
              <div className="flex flex-wrap gap-2">
                {activity.indicators.map((indicator, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200">
                    {indicator}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
