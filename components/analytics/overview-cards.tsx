"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Flame, BookOpen } from "lucide-react"
import { useGamification, DAILY_XP_GOAL } from "@/hooks/use-gamification"
import { getQuizHistory } from "@/lib/quiz-history"
import { getCompletedLessons, pythonParts, cppParts } from "@/lib/curriculum-data"

export function OverviewCards() {
  const { dailyStreak, xpToday } = useGamification()
  const [completedCount, setCompletedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(1)

  useEffect(() => {
    const completed = getCompletedLessons()
    const allIds = [...pythonParts, ...cppParts].flatMap(p => p.lessonIds)
    setTotalCount(allIds.length)
    setCompletedCount(allIds.filter(id => completed.has(id)).length)
  }, [])

  // 최근 10일 히트맵 (실제 퀴즈 이력 기반)
  const heatmapData = useMemo(() => {
    const history = getQuizHistory()
    const dayMap = new Map<string, number>()
    for (const entry of history) {
      const prev = dayMap.get(entry.date) ?? 0
      dayMap.set(entry.date, Math.max(prev, entry.accuracy))
    }
    return Array.from({ length: 10 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (9 - i))
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      const acc = dayMap.get(dateStr) ?? 0
      return {
        day: i + 1,
        acc,
        color: acc >= 80 ? "bg-green-500" : acc >= 60 ? "bg-yellow-500" : acc > 0 ? "bg-orange-400" : "bg-gray-200",
      }
    })
  }, [])

  const goalDone = xpToday >= DAILY_XP_GOAL
  const xpPercent = Math.min(Math.round((xpToday / DAILY_XP_GOAL) * 100), 100)
  const lessonPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* 오늘의 목표 */}
      <Card className="p-6 bg-white shadow-lg border-2 border-green-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">오늘의 목표</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{xpToday} / {DAILY_XP_GOAL} XP</p>
            <p className={`mt-1 text-sm font-semibold ${goalDone ? "text-green-600" : "text-gray-400"}`}>
              {goalDone ? "완료 ✓" : `${xpPercent}% 달성`}
            </p>
          </div>
          <div className="text-4xl">{goalDone ? "🦒🎉" : "🦒"}</div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${goalDone ? "bg-green-500" : "bg-orange-400"}`}
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </Card>

      {/* 연속 학습 */}
      <Card className="p-6 bg-white shadow-lg border-2 border-orange-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">연속 학습</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">🔥 {dailyStreak}일</p>
            <p className="mt-1 text-sm text-slate-600">{dailyStreak > 0 ? "연속 학습 중!" : "오늘 시작해보세요"}</p>
          </div>
          <Flame className="h-10 w-10 text-orange-500" />
        </div>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {heatmapData.map((day, i) => (
            <div key={i} className={`h-6 w-full rounded ${day.color}`} title={day.acc > 0 ? `${day.acc}% 정확도` : "활동 없음"} />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-right">최근 10일 퀴즈 정확도</p>
      </Card>

      {/* 학습 진도 */}
      <Card className="p-6 bg-white shadow-lg border-2 border-purple-100">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">학습 진도</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{completedCount} / {totalCount}</p>
            <p className="mt-1 text-sm text-slate-600">레슨 완료</p>
          </div>
          <BookOpen className="h-10 w-10 text-purple-500" />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">전체 진도</span>
            <span className="text-xs font-bold text-purple-600">{lessonPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${lessonPercent}%` }} />
          </div>
        </div>
      </Card>
    </div>
  )
}
