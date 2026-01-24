"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PerformanceCardProps {
  category: string
  icon: LucideIcon
  correct: number
  total: number
  color: "orange" | "mint" | "lavender"
}

export function PerformanceCard({ category, icon: Icon, correct, total, color }: PerformanceCardProps) {
  const percentage = (correct / total) * 100

  const colorClasses = {
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-500",
      progress: "bg-orange-400",
      text: "text-orange-600",
    },
    mint: {
      bg: "bg-mint-50",
      icon: "text-mint-500",
      progress: "bg-mint-400",
      text: "text-mint-600",
    },
    lavender: {
      bg: "bg-lavender-50",
      icon: "text-lavender-500",
      progress: "bg-lavender-400",
      text: "text-lavender-600",
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={cn("rounded-2xl p-6 shadow-md transition-all hover:shadow-lg", colors.bg)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-full bg-white p-2", colors.icon)}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-gray-800">{category}</h3>
        </div>
        <span className={cn("text-lg font-bold", colors.text)}>
          {correct}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-white">
        <div
          className={cn("h-full transition-all duration-1000", colors.progress)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-600">{Math.round(percentage)}% 정답률</p>
    </div>
  )
}
