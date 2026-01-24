"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CelebrationScreenProps {
  show: boolean
  points?: number
  streak?: number
}

export function CelebrationScreen({ show, points = 10, streak = 0 }: CelebrationScreenProps) {
  const [message, setMessage] = useState("완벽해요!")

  const messages = ["완벽해요!", "똑똑해요!", "최고예요!", "천재인가요?", "멋져요!"]

  useEffect(() => {
    if (show) {
      setMessage(messages[Math.floor(Math.random() * messages.length)])
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-yellow-300 to-mint-400 animate-gradient-shift opacity-20" />

      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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
                i % 5 === 0 && "bg-orange-400 rounded-full",
                i % 5 === 1 && "bg-mint-400 rounded-full",
                i % 5 === 2 && "bg-lavender-400 rounded-full",
                i % 5 === 3 && "bg-yellow-400 rotate-45",
                i % 5 === 4 && "bg-pink-400 rounded-sm",
              )}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 animate-scale-in">
        {/* Giant giraffe with party hat */}
        <div className="relative animate-bounce-celebration">
          <div className="text-8xl md:text-9xl animate-wiggle">🦒</div>
          <div className="absolute -top-4 -right-2 text-4xl md:text-5xl animate-spin-slow">🎉</div>
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
              className="absolute w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full animate-particle-burst"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-100px)`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Screen edge glow */}
      <div className="absolute inset-0 border-8 border-yellow-400/30 rounded-lg animate-pulse pointer-events-none" />
    </div>
  )
}
