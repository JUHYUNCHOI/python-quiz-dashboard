"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Flame, TrendingUp, BookOpen } from "lucide-react"

export function OverviewCards() {
  const heatmapData = Array.from({ length: 30 }, (_, i) => {
    const completion = Math.random() * 100
    return {
      day: i + 1,
      completion,
      color:
        completion > 90
          ? "bg-green-500"
          : completion > 70
            ? "bg-yellow-500"
            : completion > 50
              ? "bg-orange-500"
              : completion > 0
                ? "bg-red-500"
                : "bg-gray-200",
    }
  })

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Daily Commitment Card */}
      <Card className="p-6 bg-white shadow-lg border-2 border-green-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">오늘의 목표</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">20/20</p>
            <p className="mt-1 text-sm font-semibold text-green-600">완료 ✓</p>
          </div>
          <div className="text-4xl">🦒🎉</div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <span className="text-sm text-slate-600">목표 달성!</span>
        </div>
      </Card>

      {/* Streak Status Card */}
      <Card className="p-6 bg-white shadow-lg border-2 border-orange-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">연속 학습</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">🔥 7일</p>
            <p className="mt-1 text-sm text-slate-600">연속 완료</p>
          </div>
          <Flame className="h-10 w-10 text-orange-500" />
        </div>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {heatmapData.slice(-10).map((day, i) => (
            <div key={i} className={`h-6 w-full rounded ${day.color}`} title={`${day.completion.toFixed(0)}% 완료`} />
          ))}
        </div>
      </Card>

      {/* Engagement Score Card */}
      <Card className="p-6 bg-white shadow-lg border-2 border-blue-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">참여도 점수</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">87/100</p>
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              향상 중
            </p>
          </div>
          <div className="text-4xl">📊</div>
        </div>
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-600">완료율</span>
            <span className="font-semibold">95%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">집중도</span>
            <span className="font-semibold">88%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">일관성</span>
            <span className="font-semibold">79%</span>
          </div>
        </div>
      </Card>

      {/* Learning Progress Card */}
      <Card className="p-6 bg-white shadow-lg border-2 border-purple-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">학습 진도</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">5/12</p>
            <p className="mt-1 text-sm text-slate-600">주제 완료</p>
          </div>
          <BookOpen className="h-10 w-10 text-purple-500" />
        </div>
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-600">현재 레벨</span>
            <span className="font-semibold">중급</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">총 문제 수</span>
            <span className="font-semibold">340개</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
