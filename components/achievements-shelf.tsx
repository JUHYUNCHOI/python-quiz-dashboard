"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import {
  ACHIEVEMENT_DEFS,
  syncAchievements,
  type UnlockedAchievement,
} from "@/lib/achievements"
import { cn } from "@/lib/utils"

export function AchievementsShelf() {
  const { t } = useLanguage()
  const [unlocked, setUnlocked] = useState<UnlockedAchievement[]>([])
  const [newIds, setNewIds] = useState<string[]>([])

  useEffect(() => {
    const { unlocked: u, newlyUnlocked } = syncAchievements()
    setUnlocked(u)
    if (newlyUnlocked.length > 0) {
      setNewIds(newlyUnlocked)
      // 3초 후 "NEW" 뱃지 페이드아웃
      setTimeout(() => setNewIds([]), 4000)
    }
  }, [])

  const unlockedIds = new Set(unlocked.map((u) => u.id))
  const unlockedCount = unlockedIds.size
  const totalCount = ACHIEVEMENT_DEFS.length

  // 잠금해제된 것 먼저, 그 다음 미잠금 (비밀 업적은 잠금상태면 마지막)
  const sorted = [...ACHIEVEMENT_DEFS].sort((a, b) => {
    const aU = unlockedIds.has(a.id) ? 0 : 1
    const bU = unlockedIds.has(b.id) ? 0 : 1
    if (aU !== bU) return aU - bU
    // 잠금해제된 것끼리는 최근 순 (unlockedAt 내림차순)
    if (aU === 0) {
      const aTime = unlocked.find((u) => u.id === a.id)?.unlockedAt ?? 0
      const bTime = unlocked.find((u) => u.id === b.id)?.unlockedAt ?? 0
      return bTime - aTime
    }
    // 미잠금: 비밀 업적 뒤로
    return (a.secret ? 1 : 0) - (b.secret ? 1 : 0)
  })

  return (
    <Card className="border-0 bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🏅</span>
          <span className="font-bold text-gray-800 text-sm">
            {t("업적", "Achievements")}
          </span>
        </div>
        <span className="text-xs font-bold text-gray-400">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      {/* Horizontal scrollable badge row */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {sorted.map((def) => {
          const isUnlocked = unlockedIds.has(def.id)
          const isNew = newIds.includes(def.id)

          return (
            <div
              key={def.id}
              className={cn(
                "relative shrink-0 flex flex-col items-center gap-1 w-16 p-2 rounded-xl border transition-all",
                isUnlocked
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-gray-50 border-gray-100 opacity-40",
              )}
              title={isUnlocked ? t(def.desc, def.descEn) : t("???", "???")}
            >
              {/* NEW badge */}
              {isNew && (
                <span className="absolute -top-1 -right-1 text-[9px] font-black bg-red-500 text-white px-1 rounded-full leading-4 z-10 animate-bounce">
                  NEW
                </span>
              )}

              {/* Emoji */}
              <span className="text-xl leading-none">
                {isUnlocked ? def.emoji : def.secret ? "❓" : def.emoji}
              </span>

              {/* Title */}
              <span
                className={cn(
                  "text-[9px] font-bold text-center leading-tight",
                  isUnlocked ? "text-gray-700" : "text-gray-300",
                )}
              >
                {isUnlocked ? t(def.title, def.titleEn) : t("???", "???")}
              </span>
            </div>
          )
        })}
      </div>

      {/* 전체 보기 — 아직 미구현이므로 count 안내만 */}
      {unlockedCount === 0 && (
        <p className="text-xs text-gray-400 text-center mt-2">
          {t(
            "퀴즈를 풀면 업적을 따낼 수 있어요! 🎯",
            "Complete quizzes to earn achievements! 🎯",
          )}
        </p>
      )}
    </Card>
  )
}
