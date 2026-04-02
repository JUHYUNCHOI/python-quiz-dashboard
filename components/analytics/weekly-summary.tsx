"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/contexts/language-context"

export function WeeklySummary() {
  const { t } = useLanguage()

  const dayLabels = [
    t("월", "Mon"), t("화", "Tue"), t("수", "Wed"), t("목", "Thu"),
    t("금", "Fri"), t("토", "Sat"), t("일", "Sun"),
  ]

  const weeklyData = [
    { day: dayLabels[0], questions: 15, accuracy: 73 },
    { day: dayLabels[1], questions: 20, accuracy: 90 },
    { day: dayLabels[2], questions: 20, accuracy: 78 },
    { day: dayLabels[3], questions: 20, accuracy: 85 },
    { day: dayLabels[4], questions: 20, accuracy: 88 },
    { day: dayLabels[5], questions: 25, accuracy: 92 },
    { day: dayLabels[6], questions: 20, accuracy: 87 },
  ]

  const engagementHeatmap = [
    { day: dayLabels[0], focus: 70, time: 65, completion: 75 },
    { day: dayLabels[1], focus: 95, time: 90, completion: 100 },
    { day: dayLabels[2], focus: 65, time: 70, completion: 100 },
    { day: dayLabels[3], focus: 92, time: 88, completion: 100 },
    { day: dayLabels[4], focus: 88, time: 85, completion: 100 },
    { day: dayLabels[5], focus: 95, time: 92, completion: 100 },
    { day: dayLabels[6], focus: 87, time: 85, completion: 100 },
  ]

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">{t("주간 요약", "Weekly Summary")}</h2>
        <div className="text-right">
          <p className="text-sm text-slate-600">{t("이번 주 목표", "Weekly goal")}</p>
          <p className="text-2xl font-bold text-green-600">140/140 {t("완료 ✓", "done ✓")}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Questions per Day */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("일일 문제 수", "Daily Questions")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
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
              <Bar dataKey="questions" fill="#FF9F66" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy Trend */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("정답률 추이", "Accuracy Trend")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#7DD3C0"
                strokeWidth={3}
                dot={{ fill: "#7DD3C0", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement Quality Heatmap */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">{t("참여도 히트맵", "Engagement Heatmap")}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-medium text-slate-600">{t("지표", "Metric")}</th>
                {engagementHeatmap.map((day) => (
                  <th key={day.day} className="text-center py-2 px-3 font-medium text-slate-600">
                    {day.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 font-medium text-slate-700">{t("집중도", "Focus")}</td>
                {engagementHeatmap.map((day, i) => (
                  <td key={i} className="text-center py-3 px-3">
                    <div
                      className={`inline-block w-12 h-8 rounded ${
                        day.focus > 90
                          ? "bg-green-500"
                          : day.focus > 80
                            ? "bg-green-400"
                            : day.focus > 70
                              ? "bg-yellow-400"
                              : "bg-orange-400"
                      }`}
                      title={`${day.focus}%`}
                    />
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 font-medium text-slate-700">{t("시간 품질", "Time Quality")}</td>
                {engagementHeatmap.map((day, i) => (
                  <td key={i} className="text-center py-3 px-3">
                    <div
                      className={`inline-block w-12 h-8 rounded ${
                        day.time > 90
                          ? "bg-blue-500"
                          : day.time > 80
                            ? "bg-blue-400"
                            : day.time > 70
                              ? "bg-yellow-400"
                              : "bg-orange-400"
                      }`}
                      title={`${day.time}%`}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-slate-700">{t("완료율", "Completion")}</td>
                {engagementHeatmap.map((day, i) => (
                  <td key={i} className="text-center py-3 px-3">
                    <div
                      className={`inline-block w-12 h-8 rounded ${
                        day.completion === 100 ? "bg-green-500" : "bg-yellow-400"
                      }`}
                      title={`${day.completion}%`}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
