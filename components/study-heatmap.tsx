"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getActivityMap } from "@/lib/activity-log"

const getActivityColor = (level: number) => {
  if (level === 0) return "bg-gray-100"
  if (level === 1) return "bg-mint-200"
  if (level === 2) return "bg-mint-400"
  if (level >= 3) return "bg-orange-400"
  return "bg-gray-100"
}

function getActivityLevel(count: number): number {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  return 3
}

export function StudyHeatmap() {
  const { t } = useLanguage()
  const [activityMap, setActivityMap] = useState<Record<string, number>>({})

  useEffect(() => {
    setActivityMap(getActivityMap())
  }, [])

  // Generate last 12 weeks of data
  const heatmapData = []
  const today = new Date()

  for (let week = 11; week >= 0; week--) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(today)
      date.setDate(date.getDate() - week * 7 - (6 - day))
      const dateStr = date.toISOString().slice(0, 10)
      const count = activityMap[dateStr] || 0
      weekData.push({ date, dateStr, count, level: getActivityLevel(count) })
    }
    heatmapData.push(weekData)
  }

  const days = t("일,월,화,수,목,금,토", "S,M,T,W,T,F,S").split(",")

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
                    getActivityColor(day.level),
                  )}
                  title={`${day.date.toLocaleDateString()}: ${day.count > 0 ? t(`${day.count}건 활동`, `${day.count} activities`) : t("활동 없음", "No activity")}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>{t("적음", "Less")}</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((level) => (
            <div key={level} className={cn("h-3 w-3 rounded-sm", getActivityColor(level))} />
          ))}
        </div>
        <span>{t("많음", "More")}</span>
      </div>
    </div>
  )
}
