"use client"

import { cn } from "@/lib/utils"

interface ReviewScheduleItem {
  time: string
  count: number
  color: "orange" | "yellow" | "mint" | "lavender"
  days: number
}

interface ReviewTimelineProps {
  schedule: ReviewScheduleItem[]
}

export function ReviewTimeline({ schedule }: ReviewTimelineProps) {
  const colorClasses = {
    orange: "bg-orange-400 text-white",
    yellow: "bg-yellow-400 text-gray-800",
    mint: "bg-mint-400 text-white",
    lavender: "bg-lavender-400 text-white",
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div className={cn("h-4 w-4 rounded-full", colorClasses[item.color])} />
              {index < schedule.length - 1 && <div className="h-12 w-0.5 bg-gray-200" />}
            </div>

            {/* Content */}
            <div className="flex flex-1 items-center justify-between rounded-2xl bg-gray-50 p-4 transition-all hover:bg-gray-100">
              <div>
                <h4 className="font-semibold text-gray-800">{item.time}</h4>
                <p className="text-sm text-gray-600">{item.count}개 문제</p>
              </div>

              <div className={cn("rounded-full px-4 py-1 text-sm font-semibold", colorClasses[item.color])}>
                {item.days === 0 ? "지금" : `D+${item.days}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
