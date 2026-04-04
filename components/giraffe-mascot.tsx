"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface GiraffeMascotProps {
  showResult: boolean
  isCorrect: boolean
}

export function GiraffeMascot({ showResult, isCorrect }: GiraffeMascotProps) {
  const { t } = useLanguage()
  const getExpression = () => {
    if (!showResult) return "🦒"
    return isCorrect ? "🦒✨" : "🦒💭"
  }

  const getMessage = () => {
    if (!showResult) return t("화이팅!", "You got this!")
    return isCorrect ? t("잘했어요!", "Great job!") : t("괜찮아요!", "That's okay!")
  }

  return (
    <div className="fixed right-4 top-24 z-50 hidden md:block">
      <div
        className={cn(
          "flex flex-col items-center gap-2 transition-all duration-500",
          showResult && "animate-bounce-in",
        )}
      >
        <div className="text-6xl">{getExpression()}</div>
        <div
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold shadow-lg",
            !showResult && "bg-orange-100 text-orange-700",
            showResult && isCorrect && "bg-green-100 text-green-700",
            showResult && !isCorrect && "bg-blue-100 text-blue-700",
          )}
        >
          {getMessage()}
        </div>
      </div>
    </div>
  )
}
