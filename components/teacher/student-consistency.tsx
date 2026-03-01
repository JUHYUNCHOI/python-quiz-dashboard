"use client"

import type { QuizSession } from "@/lib/supabase/types"
import { cn } from "@/lib/utils"

interface Props {
  quizSessions: QuizSession[]
}

function getDayLabel(day: number): string {
  return ["일", "월", "화", "수", "목", "금", "토"][day]
}

export function StudentConsistency({ quizSessions }: Props) {
  // Build activity map: date string → session count
  const activityMap = new Map<string, number>()
  for (const session of quizSessions) {
    const dateStr = session.completed_at.slice(0, 10) // YYYY-MM-DD
    activityMap.set(dateStr, (activityMap.get(dateStr) || 0) + 1)
  }

  // Generate 8 weeks of dates (56 days)
  const today = new Date()
  const weeks: { date: Date; dateStr: string; count: number }[][] = []

  // Find the start: go back to the most recent Sunday, then 7 more weeks
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - startDate.getDay() - 7 * 7) // 8 weeks back, aligned to Sunday

  for (let w = 0; w < 8; w++) {
    const week: { date: Date; dateStr: string; count: number }[] = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + w * 7 + d)
      const dateStr = date.toISOString().slice(0, 10)
      const isFuture = date > today
      week.push({
        date,
        dateStr,
        count: isFuture ? -1 : (activityMap.get(dateStr) || 0),
      })
    }
    weeks.push(week)
  }

  // Stats
  const totalSessions = quizSessions.length
  const uniqueDays = activityMap.size
  const lastSession = quizSessions.length > 0
    ? quizSessions.reduce((latest, s) =>
        s.completed_at > latest.completed_at ? s : latest
      )
    : null

  const daysSinceLastActivity = lastSession
    ? Math.floor((today.getTime() - new Date(lastSession.completed_at).getTime()) / (1000 * 60 * 60 * 24))
    : -1

  // This week sessions
  const thisWeekStart = new Date(today)
  thisWeekStart.setDate(today.getDate() - today.getDay())
  thisWeekStart.setHours(0, 0, 0, 0)
  const thisWeekSessions = quizSessions.filter(
    s => new Date(s.completed_at) >= thisWeekStart
  ).length

  // Weekly average (over 8 weeks)
  const weeklyAvg = totalSessions > 0 ? (totalSessions / 8).toFixed(1) : "0"

  if (quizSessions.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-3 text-center">아직 퀴즈 기록이 없어요</p>
    )
  }

  return (
    <div className="mt-3 space-y-4">
      {/* Stats row */}
      <div className="flex gap-3">
        <div className="flex-1 text-center py-2 px-3 bg-gray-50 rounded-lg">
          <div className={cn(
            "text-lg font-bold",
            daysSinceLastActivity === 0 ? "text-green-600" :
            daysSinceLastActivity <= 2 ? "text-orange-600" :
            "text-red-600"
          )}>
            {daysSinceLastActivity === 0 ? "오늘" :
             daysSinceLastActivity === -1 ? "-" :
             `${daysSinceLastActivity}일 전`}
          </div>
          <div className="text-[10px] text-gray-400">마지막 활동</div>
        </div>
        <div className="flex-1 text-center py-2 px-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{thisWeekSessions}</div>
          <div className="text-[10px] text-gray-400">이번 주</div>
        </div>
        <div className="flex-1 text-center py-2 px-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-purple-600">{weeklyAvg}</div>
          <div className="text-[10px] text-gray-400">주 평균</div>
        </div>
        <div className="flex-1 text-center py-2 px-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-700">{uniqueDays}</div>
          <div className="text-[10px] text-gray-400">활동일</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="flex gap-0.5 min-w-fit">
          {/* Day labels */}
          <div className="flex flex-col gap-0.5 mr-1">
            {[0, 1, 2, 3, 4, 5, 6].map(d => (
              <div key={d} className="w-6 h-4 flex items-center justify-end text-[9px] text-gray-400 pr-1">
                {d % 2 === 1 ? getDayLabel(d) : ""}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  className={cn(
                    "w-4 h-4 rounded-sm",
                    day.count === -1 ? "bg-transparent" :
                    day.count === 0 ? "bg-gray-100" :
                    day.count === 1 ? "bg-green-200" :
                    day.count === 2 ? "bg-green-400" :
                    "bg-green-600"
                  )}
                  title={day.count >= 0 ? `${day.dateStr}: ${day.count}회` : ""}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1 mt-2 justify-end text-[9px] text-gray-400">
          <span>적음</span>
          <div className="w-3 h-3 rounded-sm bg-gray-100" />
          <div className="w-3 h-3 rounded-sm bg-green-200" />
          <div className="w-3 h-3 rounded-sm bg-green-400" />
          <div className="w-3 h-3 rounded-sm bg-green-600" />
          <span>많음</span>
        </div>
      </div>
    </div>
  )
}
