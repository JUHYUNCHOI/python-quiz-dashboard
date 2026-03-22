"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { StudyHeatmap } from "@/components/study-heatmap"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getAccuracyTrend, getTotalQuizCount } from "@/lib/quiz-history"

interface PerformanceChartsProps {
  selectedTopic: string | null
}

export function PerformanceCharts({ selectedTopic }: PerformanceChartsProps) {
  const { t } = useLanguage()
  const [accuracyData, setAccuracyData] = useState<{ date: string; accuracy: number }[]>([])
  const [quizCount, setQuizCount] = useState(0)
  const [days, setDays] = useState(14)

  useEffect(() => {
    const trend = getAccuracyTrend(days)
    setAccuracyData(trend.map(d => ({
      date: d.date.slice(5), // "03-01" format
      accuracy: d.accuracy,
    })))
    setQuizCount(getTotalQuizCount())
  }, [days])

  const hasData = accuracyData.length > 0

  // 첫 vs 마지막 정답률 비교 (개선 델타)
  const delta = hasData && accuracyData.length >= 2
    ? accuracyData[accuracyData.length - 1].accuracy - accuracyData[0].accuracy
    : null

  const chartTooltipStyle = {
    backgroundColor: "white",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  }

  const chartContent = (height: number) => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={accuracyData}>
        <defs>
          <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF9F66" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FF9F66" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="date" stroke="#999" fontSize={11} tickLine={false} />
        <YAxis stroke="#999" fontSize={11} domain={[0, 100]} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value: number) => [`${value}%`, t("정답률", "Accuracy")]}
        />
        <Area
          type="monotone"
          dataKey="accuracy"
          stroke="#FF9F66"
          strokeWidth={2.5}
          fill="url(#accuracyGradient)"
          dot={{ fill: "#FF9F66", r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#FF9F66" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  return (
    <div className="space-y-6">
      {/* Accuracy Over Time */}
      <Card className="border-0 bg-white p-4 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base md:text-lg font-bold">
            {t("정답률 추이", "Accuracy Trend")}
          </h3>
          <div className="flex gap-1">
            {[7, 14, 30].map(d => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                  days === d
                    ? "bg-orange-400 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {d}{t("일", "d")}
              </button>
            ))}
          </div>
        </div>

        {/* Delta annotation */}
        {delta !== null && (
          <p className={`text-xs font-semibold mb-3 ${delta >= 0 ? "text-green-600" : "text-orange-500"}`}>
            {delta >= 0
              ? `↑ ${t(`이 기간 +${delta}% 향상`, `+${delta}% improvement this period`)}`
              : `↓ ${t(`이 기간 ${delta}% 변화`, `${delta}% change this period`)}`}
          </p>
        )}

        {hasData ? (
          <>
            <div className="md:hidden">{chartContent(190)}</div>
            <div className="hidden md:block">{chartContent(240)}</div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-gray-400">
            <span className="text-4xl mb-2">📊</span>
            <p className="text-sm">{t("퀴즈를 풀면 정답률 추이가 여기에 표시돼요!", "Take quizzes to see your accuracy trend here!")}</p>
          </div>
        )}
      </Card>

      {/* Study Activity Heatmap */}
      <Card className="border-0 bg-white p-4 md:p-6 shadow-lg">
        <h3 className="mb-4 text-base md:text-lg font-bold">
          {t("학습 활동", "Study Activity")}
        </h3>
        <StudyHeatmap />
        {quizCount > 0 && (
          <p className="mt-3 text-xs text-gray-400">
            {t(`총 ${quizCount}번 퀴즈 완료`, `${quizCount} ${quizCount === 1 ? "quiz" : "quizzes"} completed`)}
          </p>
        )}
      </Card>
    </div>
  )
}
