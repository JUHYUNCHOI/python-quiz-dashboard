"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"

// -------- Types --------
export interface GamificationState {
  totalXp: number
  level: number
  xpInCurrentLevel: number
  dailyStreak: number
  lastActiveDate: string
  sessionsToday: number
}

export interface XpBreakdown {
  baseXp: number
  comboBonus: number
  streakBonus: number
  perfectBonus: number
  totalXp: number
}

// -------- Constants --------
const STORAGE_KEYS = {
  totalXp: "gamification-total-xp",
  dailyStreak: "gamification-daily-streak",
  lastActiveDate: "gamification-last-active-date",
  sessionsToday: "gamification-sessions-today",
} as const

const XP_PER_LEVEL = 100

// -------- Helpers --------
function calcComboBonus(maxCombo: number): number {
  if (maxCombo >= 10) return 30
  if (maxCombo >= 8) return 20
  if (maxCombo >= 5) return 15
  if (maxCombo >= 3) return 10
  return 0
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function isYesterday(dateStr: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateStr === yesterday.toISOString().slice(0, 10)
}

function loadState(): GamificationState {
  try {
    const totalXp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXp) || "0", 10)
    const dailyStreak = parseInt(localStorage.getItem(STORAGE_KEYS.dailyStreak) || "0", 10)
    const lastActiveDate = localStorage.getItem(STORAGE_KEYS.lastActiveDate) || ""
    const sessionsToday = parseInt(localStorage.getItem(STORAGE_KEYS.sessionsToday) || "0", 10)
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
    const xpInCurrentLevel = totalXp % XP_PER_LEVEL
    const today = todayStr()
    const actualSessionsToday = lastActiveDate === today ? sessionsToday : 0

    return { totalXp, level, xpInCurrentLevel, dailyStreak, lastActiveDate, sessionsToday: actualSessionsToday }
  } catch {
    return { totalXp: 0, level: 1, xpInCurrentLevel: 0, dailyStreak: 0, lastActiveDate: "", sessionsToday: 0 }
  }
}

function persistState(s: GamificationState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.totalXp, String(s.totalXp))
    localStorage.setItem(STORAGE_KEYS.dailyStreak, String(s.dailyStreak))
    localStorage.setItem(STORAGE_KEYS.lastActiveDate, s.lastActiveDate)
    localStorage.setItem(STORAGE_KEYS.sessionsToday, String(s.sessionsToday))
  } catch {}
}

// -------- Hook --------
export function useGamification() {
  const [state, setState] = useState<GamificationState>(() => {
    if (typeof window === "undefined") {
      return { totalXp: 0, level: 1, xpInCurrentLevel: 0, dailyStreak: 0, lastActiveDate: "", sessionsToday: 0 }
    }
    return loadState()
  })

  // Supabase 동기화
  const { user } = useAuth()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setState(loadState())
  }, [])

  // 로그인 시 Supabase에서 데이터 로드 (있으면 덮어쓰기)
  useEffect(() => {
    if (!user) return

    const loadFromSupabase = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("gamification_data")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (!error && data && data.total_xp > 0) {
          const totalXp = data.total_xp
          const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
          const xpInCurrentLevel = totalXp % XP_PER_LEVEL
          const today = todayStr()
          const sessionsToday = data.last_active_date === today ? data.sessions_today : 0

          const newState: GamificationState = {
            totalXp,
            level,
            xpInCurrentLevel,
            dailyStreak: data.daily_streak,
            lastActiveDate: data.last_active_date,
            sessionsToday,
          }
          setState(newState)
          persistState(newState) // localStorage도 업데이트
        }
      } catch {
        // Supabase 로드 실패 시 localStorage 유지
      }
    }

    loadFromSupabase()
  }, [user])

  // Supabase에 debounce 저장
  const syncToSupabase = useCallback((s: GamificationState) => {
    if (!user) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      try {
        const supabase = createClient()
        await supabase.from("gamification_data").upsert({
          user_id: user.id,
          total_xp: s.totalXp,
          daily_streak: s.dailyStreak,
          last_active_date: s.lastActiveDate,
          sessions_today: s.sessionsToday,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" })
      } catch {
        // 저장 실패 시 무시
      }
    }, 1000)
  }, [user])

  const calculateXpBreakdown = useCallback(
    (correctAnswers: number, totalQuestions: number, maxCombo: number): XpBreakdown => {
      const baseXp = correctAnswers * 10
      const comboBonus = calcComboBonus(maxCombo)
      const streakBonus = state.dailyStreak > 3 ? 10 : 0
      const perfectBonus = correctAnswers === totalQuestions ? 50 : 0
      return {
        baseXp,
        comboBonus,
        streakBonus,
        perfectBonus,
        totalXp: baseXp + comboBonus + streakBonus + perfectBonus,
      }
    },
    [state.dailyStreak],
  )

  const commitSessionXp = useCallback((xpBreakdown: XpBreakdown) => {
    setState((prev) => {
      const today = todayStr()
      const isNewDay = prev.lastActiveDate !== today

      let newStreak = prev.dailyStreak
      if (isNewDay) {
        if (isYesterday(prev.lastActiveDate)) {
          newStreak = prev.dailyStreak + 1
        } else if (prev.lastActiveDate === "") {
          newStreak = 1
        } else {
          newStreak = 1
        }
      }

      const newTotalXp = prev.totalXp + xpBreakdown.totalXp
      const newLevel = Math.floor(newTotalXp / XP_PER_LEVEL) + 1
      const xpInCurrentLevel = newTotalXp % XP_PER_LEVEL
      const newSessionsToday = isNewDay ? 1 : prev.sessionsToday + 1

      const next: GamificationState = {
        totalXp: newTotalXp,
        level: newLevel,
        xpInCurrentLevel,
        dailyStreak: newStreak,
        lastActiveDate: today,
        sessionsToday: newSessionsToday,
      }

      persistState(next)
      syncToSupabase(next) // Supabase에도 저장
      return next
    })
  }, [syncToSupabase])

  return {
    ...state,
    calculateXpBreakdown,
    commitSessionXp,
  }
}
