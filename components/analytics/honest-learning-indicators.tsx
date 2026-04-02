"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useLanguage } from "@/contexts/language-context"

export function HonestLearningIndicators() {
  const { t } = useLanguage()

  const dayLabels = [
    t("월", "Mon"), t("화", "Tue"), t("수", "Wed"), t("목", "Thu"),
    t("금", "Fri"), t("토", "Sat"), t("일", "Sun"),
  ]

  const focusData = [
    { day: dayLabels[0], focused: 14, distracted: 6 },
    { day: dayLabels[1], focused: 19, distracted: 1 },
    { day: dayLabels[2], focused: 13, distracted: 7 },
    { day: dayLabels[3], focused: 18, distracted: 2 },
    { day: dayLabels[4], focused: 17, distracted: 3 },
    { day: dayLabels[5], focused: 23, distracted: 2 },
    { day: dayLabels[6], focused: 17, distracted: 3 },
  ]

  const timeDistribution = [
    { range: "<10s", count: 12, color: "#ef4444", label: t("너무 빠름", "Too fast") },
    { range: "10-20s", count: 45, color: "#f97316", label: t("빠름", "Fast") },
    { range: "20s-2m", count: 180, color: "#22c55e", label: t("적정", "Optimal") },
    { range: ">2m", count: 23, color: "#3b82f6", label: t("신중함", "Careful") },
  ]

  const activityPattern = [
    { time: t("오전", "AM"), value: 15 },
    { time: t("오후", "PM"), value: 65 },
    { time: t("저녁", "Evening"), value: 20 },
  ]

  const COLORS = ["#f97316", "#3b82f6", "#8b5cf6"]

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-6">{t("정직한 학습 지표", "Honest Learning Indicators")}</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Focus Quality Chart */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("집중도 품질", "Focus Quality")}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={focusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="focused" stackId="a" fill="#22c55e" name={t("집중 시간", "Focused")} radius={[0, 0, 0, 0]} />
              <Bar dataKey="distracted" stackId="a" fill="#ef4444" name={t("산만한 시간", "Distracted")} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-green-800">{t("목표: 85% 이상 집중 시간", "Goal: 85%+ focused time")}</p>
            <p className="text-sm text-green-700 mt-1">{t("현재: 88% - 목표 달성! 🎉", "Current: 88% - Goal reached! 🎉")}</p>
          </div>
        </div>

        {/* Time Distribution */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("문제당 시간 분포", "Time per Question")}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={timeDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="range" type="category" stroke="#64748b" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {timeDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Patterns */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("활동 시간대", "Activity Time")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={activityPattern}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ time, value }) => `${time} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityPattern.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-slate-600 text-center mt-2">
            {t("가장 활발한 시간:", "Most active time:")} <span className="font-semibold text-slate-800">{t("오후 2-4시", "2-4 PM")}</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("학습 패턴 요약", "Learning Pattern Summary")}</h3>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-800">{t("평균 세션 길이", "Avg. Session Length")}</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">25{t("분", " min")}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-semibold text-purple-800">{t("일관성 점수", "Consistency Score")}</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">79/100</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-800">{t("복습 완료율", "Review Completion")}</p>
              <p className="text-2xl font-bold text-green-900 mt-1">92%</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
