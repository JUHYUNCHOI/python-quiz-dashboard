"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
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

  useEffect(() => {
    const trend = getAccuracyTrend(30)
    setAccuracyData(trend.map(d => ({
      date: d.date.slice(5), // "03-01" format
      accuracy: d.accuracy,
    })))
    setQuizCount(getTotalQuizCount())
  }, [])

  const hasData = accuracyData.length > 0

  return (
    <div className="space-y-6">
      {/* Accuracy Over Time */}
      <Card className="border-0 bg-white p-4 md:p-6 shadow-lg">
        <h3 className="mb-4 text-base md:text-lg font-bold">
          {t("정답률 추이 (최근 30일)", "Accuracy Trend (Last 30 Days)")}
        </h3>
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height={200} className="md:hidden">
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [`${value}%`, t("정답률", "Accuracy")]}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#FF9F66"
                  strokeWidth={2}
                  dot={{ fill: "#FF9F66", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={250} className="hidden md:block">
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [`${value}%`, t("정답률", "Accuracy")]}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#FF9F66"
                  strokeWidth={3}
                  dot={{ fill: "#FF9F66", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
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
