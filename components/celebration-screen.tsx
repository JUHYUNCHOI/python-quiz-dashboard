"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { ComboTierInfo } from "@/hooks/use-quiz-state"

interface CelebrationScreenProps {
  show: boolean
  points?: number
  streak?: number
  comboTier?: ComboTierInfo
  combo?: number
}

const tierMessages: Record<string, string[]> = {
  base: ["완벽해요!", "똑똑해요!", "최고예요!", "천재인가요?", "멋져요!"],
  good: ["3연속! 대단해요!", "연속 정답! 굿!", "잘하고 있어요!"],
  fire: ["불타오르고 있어! 🔥", "멈출 수가 없다!", "화끈하다!"],
  insane: ["미쳤다! 천재야!", "이건 레전드급!", "역대급 실력!"],
  legend: ["전설이 탄생했다! 👑", "이 세상 사람 맞아?!", "무적 모드!"],
}

export function CelebrationScreen({ show, points = 10, streak = 0, comboTier, combo = 0 }: CelebrationScreenProps) {
  const [message, setMessage] = useState("완벽해요!")
  const tier = comboTier?.tier || "base"

  useEffect(() => {
    if (show) {
      const msgs = tierMessages[tier] || tierMessages.base
      setMessage(msgs[Math.floor(Math.random() * msgs.length)])
    }
  }, [show, tier])

  if (!show) return null

  const confettiCount = tier === "legend" ? 80 : tier === "insane" ? 65 : 50

  const confettiColors: Record<string, string[]> = {
    base: ["bg-orange-400", "bg-mint-400", "bg-lavender-400", "bg-yellow-400", "bg-pink-400"],
    good: ["bg-blue-400", "bg-cyan-400", "bg-mint-400", "bg-indigo-300", "bg-blue-300"],
    fire: ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-amber-400", "bg-orange-300"],
    insane: ["bg-yellow-400", "bg-amber-300", "bg-orange-300", "bg-yellow-300", "bg-amber-400"],
    legend: ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-blue-400", "bg-purple-400", "bg-pink-400"],
  }

  const bgGradient = cn(
    "absolute inset-0 animate-gradient-shift",
    tier === "base" && "bg-gradient-to-br from-orange-400 via-yellow-300 to-mint-400 opacity-20",
    tier === "good" && "bg-gradient-to-br from-blue-400 via-cyan-300 to-mint-400 opacity-25",
    tier === "fire" && "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 opacity-30",
    tier === "insane" && "bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 opacity-30",
    tier === "legend" && "bg-gradient-to-br from-red-400 via-yellow-300 via-green-300 to-purple-400 opacity-40",
  )

  const borderGlow = cn(
    "absolute inset-0 rounded-lg pointer-events-none",
    tier === "base" && "border-8 border-yellow-400/30 animate-pulse",
    tier === "good" && "border-8 border-blue-400/40 combo-glow-blue",
    tier === "fire" && "border-8 border-orange-400/50 combo-glow-orange",
    tier === "insane" && "border-8 border-yellow-400/60 combo-glow-golden",
    tier === "legend" && "border-8 border-purple-400/50 combo-glow-rainbow",
  )

  const giraffeOverlay = tier === "legend" ? "👑" : tier === "insane" ? "🌟" : tier === "fire" ? "🔥" : "🎉"

  const colors = confettiColors[tier] || confettiColors.base

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Background gradient animation */}
      <div className={bgGradient} />

      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(confettiCount)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div
              className={cn(
                "w-2 h-2 md:w-3 md:h-3",
                colors[i % colors.length],
                i % 3 === 0 && "rounded-full",
                i % 3 === 1 && "rotate-45",
                i % 3 === 2 && "rounded-sm",
              )}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 animate-scale-in">
        {/* Giant giraffe with tier overlay */}
        <div className="relative animate-bounce-celebration">
          <div className="text-8xl md:text-9xl animate-wiggle">🦒</div>
          <div className="absolute -top-4 -right-2 text-4xl md:text-5xl animate-spin-slow">{giraffeOverlay}</div>
          <div className="absolute -top-2 -left-2 text-3xl md:text-4xl animate-pulse">✨</div>
        </div>

        {/* Success message */}
        <div className="text-center space-y-2 md:space-y-3">
          <div className="text-5xl md:text-7xl lg:text-8xl font-black text-orange-500 animate-scale-in drop-shadow-lg">
            정답!
          </div>
          <div className="text-2xl md:text-4xl font-bold text-gray-800 animate-fade-in-delay">{message}</div>
        </div>

        {/* Points animation */}
        <div className="text-3xl md:text-5xl font-bold text-orange-600 animate-fly-up">+{points} XP</div>

        {/* Combo counter (shown when combo >= 3) */}
        {combo >= 3 && comboTier && (
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-3 shadow-lg animate-scale-in",
              tier === "good" && "bg-blue-100 border-2 border-blue-300",
              tier === "fire" && "bg-orange-100 border-2 border-orange-400 animate-pulse",
              tier === "insane" && "bg-yellow-100 border-2 border-yellow-400 combo-glow-golden",
              tier === "legend" && "bg-white border-2 border-purple-400 combo-glow-rainbow",
            )}
          >
            <span className="text-2xl">{comboTier.emoji}</span>
            <span className="text-lg font-black">{combo}연속!</span>
          </div>
        )}

        {/* Streak indicator */}
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg animate-fade-in-delay-2">
            <span className="text-2xl md:text-3xl animate-flame">🔥</span>
            <span className="text-lg md:text-xl font-bold text-orange-600">{streak}일 연속!</span>
          </div>
        )}

        {/* Particle burst */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-3 h-3 md:w-4 md:h-4 rounded-full animate-particle-burst",
                tier === "insane" || tier === "legend" ? "bg-yellow-400" : "bg-yellow-400",
              )}
              style={{
                transform: `rotate(${i * 30}deg) translateY(-100px)`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Screen edge glow */}
      <div className={borderGlow} />
    </div>
  )
}
