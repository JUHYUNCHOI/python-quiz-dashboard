"use client"

import { cn } from "@/lib/utils"
import type { StreakInfo } from "@/lib/feedback-analyzer"

interface Props {
  streak: StreakInfo
  t: (ko: string, en: string) => string
  compact?: boolean
}

export function StreakWidget({ streak, t, compact = false }: Props) {
  if (streak.currentStreak === 0 && compact) return null

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200">
        <span className="text-sm">{streak.emoji}</span>
        <span className="text-xs font-bold text-orange-600">
          {streak.currentStreak}{t("일", "d")}
        </span>
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-2xl p-4 border",
      streak.currentStreak >= 7
        ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300"
        : streak.currentStreak >= 3
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
          : "bg-gray-50 border-gray-200"
    )}>
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-3xl",
          streak.currentStreak >= 7 && "animate-flame"
        )}>
          {streak.emoji}
        </span>
        <div className="flex-1">
          <p className={cn(
            "text-sm font-black",
            streak.currentStreak >= 7 ? "text-orange-700" :
            streak.currentStreak >= 3 ? "text-blue-700" :
            "text-gray-700"
          )}>
            {t(streak.message.ko, streak.message.en)}
          </p>
          {streak.milestone && streak.daysToMilestone > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">
              {t(
                `${streak.milestone}일 달성까지 ${streak.daysToMilestone}일 남았어요!`,
                `${streak.daysToMilestone} days to ${streak.milestone}-day milestone!`
              )}
            </p>
          )}
        </div>
      </div>

      {/* 마일스톤 프로그레스 바 */}
      {streak.milestone && streak.currentStreak > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
            <span>{streak.currentStreak}{t("일", "d")}</span>
            <span>{streak.milestone}{t("일", "d")}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                streak.currentStreak >= 7 ? "bg-gradient-to-r from-orange-400 to-amber-400" :
                streak.currentStreak >= 3 ? "bg-gradient-to-r from-blue-400 to-indigo-400" :
                "bg-gray-400"
              )}
              style={{ width: `${Math.min((streak.currentStreak / streak.milestone) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
