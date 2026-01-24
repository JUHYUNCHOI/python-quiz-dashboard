"use client"

import { cn } from "@/lib/utils"

// Generate last 12 weeks of data
const generateHeatmapData = () => {
  const data = []
  const today = new Date()

  for (let week = 11; week >= 0; week--) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - week * 7 - (6 - day))
      const activity = Math.floor(Math.random() * 5) // 0-4 activity level
      weekData.push({ date, activity })
    }
    data.push(weekData)
  }
  return data
}

const getActivityColor = (level: number) => {
  if (level === 0) return "bg-gray-100"
  if (level === 1) return "bg-mint-100"
  if (level === 2) return "bg-mint-400"
  if (level === 3) return "bg-orange-400"
  return "bg-lavender-400"
}

export function StudyHeatmap() {
  const heatmapData = generateHeatmapData()
  const days = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col justify-around pr-2 text-xs text-muted-foreground">
          {days.map((day, i) => (
            <div key={i} className="h-3">
              {i % 2 === 1 && day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1">
          {heatmapData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    "group relative h-3 w-3 rounded-sm transition-all duration-200 hover:scale-150 hover:shadow-md",
                    getActivityColor(day.activity),
                  )}
                  title={`${day.date.toLocaleDateString()}: ${day.activity} 문제`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>적음</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={cn("h-3 w-3 rounded-sm", getActivityColor(level))} />
          ))}
        </div>
        <span>많음</span>
      </div>
    </div>
  )
}
