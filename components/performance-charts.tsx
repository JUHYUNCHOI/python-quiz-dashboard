"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { StudyHeatmap } from "@/components/study-heatmap"

const accuracyData = [
  { day: "1일", accuracy: 65 },
  { day: "5일", accuracy: 70 },
  { day: "10일", accuracy: 75 },
  { day: "15일", accuracy: 78 },
  { day: "20일", accuracy: 82 },
  { day: "25일", accuracy: 85 },
  { day: "30일", accuracy: 88 },
]

const categoryData = [
  { category: "기초", questions: 120 },
  { category: "자료구조", questions: 85 },
  { category: "함수", questions: 67 },
  { category: "반복문", questions: 70 },
]

interface PerformanceChartsProps {
  selectedTopic: string | null
}

export function PerformanceCharts({ selectedTopic }: PerformanceChartsProps) {
  return (
    <div className="space-y-6">
      {/* Accuracy Over Time */}
      <Card className="border-0 bg-white p-4 md:p-6 shadow-lg">
        <h3 className="mb-4 text-base md:text-lg font-bold">정확도 추이 (최근 30일)</h3>
        <ResponsiveContainer width="100%" height={200} className="md:hidden">
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
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
            <XAxis dataKey="day" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
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
      </Card>

      {/* Questions Per Category */}
      <Card className="border-0 bg-white p-4 md:p-6 shadow-lg">
        <h3 className="mb-4 text-base md:text-lg font-bold">카테고리별 문제 수</h3>
        <ResponsiveContainer width="100%" height={200} className="md:hidden">
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="questions" fill="#7DD3C0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={250} className="hidden md:block">
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="questions" fill="#7DD3C0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Study Activity Heatmap */}
      <Card className="border-0 bg-white p-4 md:p-6 shadow-lg">
        <h3 className="mb-4 text-base md:text-lg font-bold">학습 활동</h3>
        <StudyHeatmap />
      </Card>
    </div>
  )
}
