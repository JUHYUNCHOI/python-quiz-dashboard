"use client"

import { Suspense, useEffect, useState, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useGamification } from "@/hooks/use-gamification"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { useQuizSessionSync } from "@/hooks/use-quiz-session-sync"
import type { SessionData } from "@/hooks/use-quiz-state"

// -------- CountUp animation --------
function CountUp({ end, duration = 800, prefix = "", suffix = "", className = "" }: {
  end: number; duration?: number; prefix?: string; suffix?: string; className?: string
}) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration])

  return <span className={className}>{prefix}{value}{suffix}</span>
}

// -------- XP Row (slide in) --------
function XpRow({ emoji, label, xp, visible, delay }: {
  emoji: string; label: string; xp: number; visible: boolean; delay: number
}) {
  if (!visible || xp === 0) return null
  return (
    <div
      className="flex items-center justify-between px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl animate-fly-in-right"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <span className="text-base font-semibold text-gray-700">{label}</span>
      </div>
      <span className="text-lg font-bold text-orange-600">+{xp} XP</span>
    </div>
  )
}

// -------- Level Progress Bar --------
function LevelBar({ level, xpInLevel, xpPerLevel, visible, isLevelUp }: {
  level: number; xpInLevel: number; xpPerLevel: number; visible: boolean; isLevelUp: boolean
}) {
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setBarWidth((xpInLevel / xpPerLevel) * 100)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [visible, xpInLevel, xpPerLevel])

  if (!visible) return null

  return (
    <div className={cn("space-y-2 animate-fly-in-right", isLevelUp && "animate-level-up")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("text-2xl font-black", isLevelUp ? "text-yellow-500" : "text-orange-500")}>
            Lv.{level}
          </span>
          {isLevelUp && (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full animate-number-pop">
              레벨 업! 🎉
            </span>
          )}
        </div>
        <span className="text-sm text-gray-500">{xpInLevel}/{xpPerLevel} XP</span>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            isLevelUp
              ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
              : "bg-gradient-to-r from-orange-400 to-orange-500",
          )}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  )
}

// -------- Main Page --------
export default function SessionCompletePageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-mint-50 to-lavender-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🦒</div>
          <p className="text-xl text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    }>
      <SessionCompletePage />
    </Suspense>
  )
}

function SessionCompletePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const endReason = searchParams.get("reason") === "hearts" ? "hearts" : "completed"
  const gamification = useGamification()
  const { play } = useSoundEffect()
  const { saveQuizSession } = useQuizSessionSync()

  // Session data from sessionStorage
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [xpCommitted, setXpCommitted] = useState(false)

  // Animation phase (0–7)
  const [phase, setPhase] = useState(-1)

  // Load session data
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("quizSessionData")
      if (raw) {
        setSessionData(JSON.parse(raw))
      }
    } catch {}
  }, [])

  // Calculate XP breakdown
  const breakdown = sessionData
    ? gamification.calculateXpBreakdown(sessionData.correctAnswers, sessionData.totalQuestions, sessionData.maxCombo)
    : null

  // Previous level (before commit)
  const [prevLevel, setPrevLevel] = useState(gamification.level)

  // Commit XP once + save quiz session to Supabase
  useEffect(() => {
    if (breakdown && !xpCommitted && sessionData) {
      setPrevLevel(gamification.level)
      gamification.commitSessionXp(breakdown)
      saveQuizSession(sessionData, breakdown.totalXp)
      setXpCommitted(true)
    }
  }, [breakdown, xpCommitted, gamification, sessionData, saveQuizSession])

  // Staggered phase reveal
  useEffect(() => {
    if (!sessionData) return
    const timers: NodeJS.Timeout[] = []
    for (let i = 0; i <= 7; i++) {
      timers.push(setTimeout(() => setPhase(i), 400 + i * 600))
    }
    // Play sound at the right time
    timers.push(setTimeout(() => play("chapterComplete"), 500))
    if (breakdown && breakdown.perfectBonus > 0) {
      timers.push(setTimeout(() => play("combo10"), 400 + 4 * 600))
    }
    return () => timers.forEach(clearTimeout)
  }, [sessionData]) // eslint-disable-line react-hooks/exhaustive-deps

  // Level up sound
  const isLevelUp = xpCommitted && gamification.level > prevLevel
  useEffect(() => {
    if (isLevelUp) {
      const t = setTimeout(() => play("levelup"), 400 + 6 * 600 + 300)
      return () => clearTimeout(t)
    }
  }, [isLevelUp]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlayAgain = useCallback(() => {
    sessionStorage.removeItem("quizSessionData")
    router.push("/quiz/setup")
  }, [router])

  const handleGoHome = useCallback(() => {
    sessionStorage.removeItem("quizSessionData")
    router.push("/")
  }, [router])

  // Format time
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000)
    const min = Math.floor(totalSec / 60)
    const sec = totalSec % 60
    return min > 0 ? `${min}분 ${sec}초` : `${sec}초`
  }

  // Loading state
  if (!sessionData || !breakdown) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-mint-50 to-lavender-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🦒</div>
          <p className="text-xl text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const accuracy = Math.round((sessionData.correctAnswers / sessionData.totalQuestions) * 100)
  const isHeartsDepleted = endReason === "hearts"

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-mint-50 to-lavender-50">
      <main className="container mx-auto px-4 py-8 max-w-lg">

        {/* === Phase 0: Header with giraffe + score === */}
        {phase >= 0 && (
          <div className="text-center mb-8 animate-scale-in">
            {/* Giraffe */}
            <div className="text-7xl md:text-8xl mb-3 animate-bounce-celebration">
              {isHeartsDepleted ? "🦒💔" : accuracy === 100 ? "🦒👑" : "🦒🎉"}
            </div>

            {/* Score headline */}
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-1">
              <CountUp end={sessionData.correctAnswers} duration={1200} />
              <span className="text-gray-400">/{sessionData.totalQuestions}</span>
              <span className="ml-2 text-3xl">정답!</span>
            </h1>

            {isHeartsDepleted && (
              <p className="text-lg text-red-500 font-semibold mt-2 animate-fade-in-delay">
                하트가 모두 소진되었어요 💔
              </p>
            )}

            {/* Sub stats */}
            <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
              <span>⏱ {formatTime(sessionData.timeElapsedMs)}</span>
              <span>🎯 {accuracy}%</span>
              {sessionData.maxCombo >= 3 && <span>⚡ 최대 {sessionData.maxCombo}연속</span>}
            </div>
          </div>
        )}

        {/* === XP Breakdown Card === */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-orange-200/50 p-5 space-y-3 mb-6">
          <h2 className={cn(
            "text-lg font-bold text-gray-700 mb-2 transition-opacity duration-500",
            phase >= 1 ? "opacity-100" : "opacity-0"
          )}>
            📊 XP 획득 내역
          </h2>

          {/* Phase 1: Base XP */}
          <XpRow
            emoji="📝"
            label={`기본 점수 (${sessionData.correctAnswers}×10)`}
            xp={breakdown.baseXp}
            visible={phase >= 1}
            delay={0}
          />

          {/* Phase 2: Combo bonus */}
          <XpRow
            emoji="⚡"
            label={`콤보 보너스 (최대 ${sessionData.maxCombo}연속)`}
            xp={breakdown.comboBonus}
            visible={phase >= 2}
            delay={0}
          />

          {/* Phase 3: Streak bonus */}
          <XpRow
            emoji="🔥"
            label={`연속 학습 보너스 (${gamification.dailyStreak}일)`}
            xp={breakdown.streakBonus}
            visible={phase >= 3}
            delay={0}
          />

          {/* Phase 4: Perfect bonus */}
          {breakdown.perfectBonus > 0 && phase >= 4 && (
            <div
              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl animate-scale-in shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <span className="text-base font-bold text-yellow-700">퍼펙트 보너스!</span>
              </div>
              <span className="text-lg font-black text-yellow-600">+{breakdown.perfectBonus} XP</span>
            </div>
          )}

          {/* Phase 5: Total */}
          {phase >= 5 && (
            <div className="pt-3 border-t-2 border-orange-200/60">
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-gray-800">총 획득</span>
                <span className="text-3xl font-black text-orange-600 animate-number-pop">
                  +<CountUp end={breakdown.totalXp} duration={1000} /> XP
                </span>
              </div>
            </div>
          )}
        </div>

        {/* === Phase 6: Level progress === */}
        <div className="mb-8">
          <LevelBar
            level={gamification.level}
            xpInLevel={gamification.xpInCurrentLevel}
            xpPerLevel={100}
            visible={phase >= 6}
            isLevelUp={isLevelUp}
          />
        </div>

        {/* === Phase 7: Action buttons === */}
        {phase >= 7 && (
          <div className="space-y-3 animate-fade-in-delay">
            {/* Play again - big CTA */}
            <button
              onClick={handlePlayAgain}
              className="w-full py-4 rounded-2xl text-xl font-black text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95"
            >
              한 판 더? 🔥
            </button>

            {/* Go home - subtle text */}
            <button
              onClick={handleGoHome}
              className="w-full py-3 text-base font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              그만하기
            </button>

            {/* Daily streak badge */}
            {gamification.dailyStreak > 0 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="text-2xl animate-flame">🔥</span>
                <span className="text-sm font-bold text-orange-600">
                  {gamification.dailyStreak}일 연속 학습 중!
                </span>
              </div>
            )}
          </div>
        )}

        {/* Confetti for perfect score */}
        {accuracy === 100 && phase >= 4 && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 10}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div
                  className={cn(
                    "w-2 h-2 md:w-3 md:h-3",
                    ["bg-orange-400", "bg-yellow-400", "bg-mint-400", "bg-lavender-400", "bg-pink-400"][i % 5],
                    i % 3 === 0 && "rounded-full",
                    i % 3 === 1 && "rotate-45",
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
