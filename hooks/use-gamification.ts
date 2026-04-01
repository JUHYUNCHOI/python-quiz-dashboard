"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { flushToSupabase } from "@/lib/supabase/keepalive-flush"

// -------- Types --------
export interface GamificationState {
  totalXp: number
  level: number
  xpInCurrentLevel: number
  dailyStreak: number
  lastActiveDate: string
  sessionsToday: number
  xpToday: number
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
  xpToday: "gamification-xp-today",
} as const

const XP_PER_LEVEL = 100
export const DAILY_XP_GOAL = 100
export const STREAK_SHIELD_COST = 50

// -------- Level Titles --------
export function getLevelTitle(level: number): { title: string; emoji: string } {
  if (level >= 50) return { title: "전설", emoji: "👑" }
  if (level >= 30) return { title: "마스터", emoji: "💎" }
  if (level >= 20) return { title: "고수", emoji: "🔥" }
  if (level >= 10) return { title: "코딩러", emoji: "⚡" }
  if (level >= 5)  return { title: "초보 코더", emoji: "📗" }
  return { title: "입문자", emoji: "🐣" }
}

// -------- Helpers --------
function calcComboBonus(maxCombo: number): number {
  if (maxCombo >= 10) return 30
  if (maxCombo >= 8) return 20
  if (maxCombo >= 5) return 15
  if (maxCombo >= 3) return 10
  return 0
}

/** 로컬 타임존 기준 YYYY-MM-DD (UTC 사용 시 한국 사용자 streak 깨짐 방지) */
function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function isYesterday(dateStr: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const ys = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`
  return dateStr === ys
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function safeParseInt(value: string | null, fallback: number): number {
  const parsed = parseInt(value || String(fallback), 10)
  return isNaN(parsed) || parsed < 0 ? fallback : parsed
}

function loadState(): GamificationState {
  try {
    const totalXp = safeParseInt(localStorage.getItem(STORAGE_KEYS.totalXp), 0)
    const dailyStreak = safeParseInt(localStorage.getItem(STORAGE_KEYS.dailyStreak), 0)
    const lastActiveDate = localStorage.getItem(STORAGE_KEYS.lastActiveDate) || ""
    const sessionsToday = safeParseInt(localStorage.getItem(STORAGE_KEYS.sessionsToday), 0)
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
    const xpInCurrentLevel = totalXp % XP_PER_LEVEL
    const today = todayStr()
    const isToday = lastActiveDate === today
    const actualSessionsToday = isToday ? sessionsToday : 0
    const xpTodayRaw = safeParseInt(localStorage.getItem(STORAGE_KEYS.xpToday), 0)
    // 마이그레이션: 오늘 세션을 했는데 xpToday가 0이면 (이전 버전 사용자)
    // → 세션 1번 = 퀴즈 최소 100+ XP이므로 목표 달성으로 처리
    const xpToday = isToday
      ? (xpTodayRaw > 0 ? xpTodayRaw : actualSessionsToday > 0 ? DAILY_XP_GOAL : 0)
      : 0

    return { totalXp, level, xpInCurrentLevel, dailyStreak, lastActiveDate, sessionsToday: actualSessionsToday, xpToday }
  } catch {
    return { totalXp: 0, level: 1, xpInCurrentLevel: 0, dailyStreak: 0, lastActiveDate: "", sessionsToday: 0, xpToday: 0 }
  }
}

function persistState(s: GamificationState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.totalXp, String(s.totalXp))
    localStorage.setItem(STORAGE_KEYS.dailyStreak, String(s.dailyStreak))
    localStorage.setItem(STORAGE_KEYS.lastActiveDate, s.lastActiveDate)
    localStorage.setItem(STORAGE_KEYS.sessionsToday, String(s.sessionsToday))
    localStorage.setItem(STORAGE_KEYS.xpToday, String(s.xpToday))
  } catch {}
}

// -------- Hook --------
export function useGamification() {
  const [state, setState] = useState<GamificationState>(() => {
    if (typeof window === "undefined") {
      return { totalXp: 0, level: 1, xpInCurrentLevel: 0, dailyStreak: 0, lastActiveDate: "", sessionsToday: 0, xpToday: 0 }
    }
    return loadState()
  })

  // Supabase 동기화
  const { user } = useAuth()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const pendingPayloadRef = useRef<Record<string, unknown> | null>(null)

  useEffect(() => {
    setState(loadState())
  }, [])

  // 로그인 시 Supabase에서 데이터 로드
  // - 로컬 vs Supabase 중 항상 더 큰 값(최신) 선택 → sync 지연에도 XP/스트릭 손실 없음
  // - 네트워크 오류 시 최대 2회 재시도, 실패해도 localStorage 유지 (화면 정상 표시)
  useEffect(() => {
    if (!user) return

    let cancelled = false

    const applySupabaseData = (data: Record<string, unknown>) => {
      if (cancelled) return

      const supabaseTotalXp = safeParseInt(String(data.total_xp ?? 0), 0)
      if (supabaseTotalXp <= 0) return // 신규 유저 or 빈 데이터 → localStorage 유지

      const today = todayStr()

      // 로컬 값 먼저 읽기 (Supabase sync 지연 시 로컬이 더 최신일 수 있음)
      const localTotalXp      = safeParseInt(localStorage.getItem(STORAGE_KEYS.totalXp), 0)
      const localLastActive   = localStorage.getItem(STORAGE_KEYS.lastActiveDate) || ""
      const localSessions     = safeParseInt(localStorage.getItem(STORAGE_KEYS.sessionsToday), 0)
      const localStreak       = safeParseInt(localStorage.getItem(STORAGE_KEYS.dailyStreak), 0)
      const localXpToday      = safeParseInt(localStorage.getItem(STORAGE_KEYS.xpToday), 0)

      const supabaseLastActive  = String(data.last_active_date ?? "")
      const supabaseStreak      = safeParseInt(String(data.daily_streak ?? 0), 0)
      const supabaseSessions    = safeParseInt(String(data.sessions_today ?? 0), 0)

      // 서버 값 우선: supabase에 데이터가 있으면 신뢰 (로컬 조작 방지)
      // 서버 값이 0인 경우만 로컬 폴백 (신규 유저 또는 sync 이전 데이터)
      // (YYYY-MM-DD 형식은 문자열 비교로 날짜 대소 판단 가능)
      const totalXp        = supabaseTotalXp > 0 ? supabaseTotalXp : localTotalXp
      const lastActiveDate = localLastActive > supabaseLastActive ? localLastActive : supabaseLastActive
      const dailyStreak    = Math.max(supabaseStreak, localStreak)

      // sessionsToday: 더 최신 날짜 기준으로 선택
      const sessionsToday = (() => {
        if (localLastActive === today && supabaseLastActive === today)
          return Math.max(localSessions, supabaseSessions)
        if (localLastActive === today) return localSessions
        if (supabaseLastActive === today) return supabaseSessions
        return 0
      })()

      // xpToday: Supabase에 없음 → 항상 로컬 기준 + migration
      const isLocalToday = localLastActive === today
      const xpToday = isLocalToday
        ? (localXpToday > 0 ? localXpToday : localSessions > 0 ? DAILY_XP_GOAL : 0)
        : 0

      const level          = Math.floor(totalXp / XP_PER_LEVEL) + 1
      const xpInCurrentLevel = totalXp % XP_PER_LEVEL

      const newState: GamificationState = {
        totalXp, level, xpInCurrentLevel,
        dailyStreak, lastActiveDate, sessionsToday, xpToday,
      }
      setState(newState)
      persistState(newState)
    }

    const loadFromSupabase = async (attempt: number): Promise<void> => {
      // 컴포넌트 언마운트 후엔 진입 자체를 막음
      if (cancelled) return
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("gamification_data")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error) {
          // PGRST116 = row not found (신규 유저) → 재시도 불필요
          if (error.code === "PGRST116") return
          throw new Error(error.message)
        }

        if (data) applySupabaseData(data as Record<string, unknown>)
      } catch {
        if (cancelled) return
        if (attempt < 2) {
          // 1차 실패 → 1.5초 후 재시도, 2차 실패 → 3초 후 재시도
          setTimeout(() => loadFromSupabase(attempt + 1), 1500 * (attempt + 1))
        }
        // 모든 재시도 실패 → localStorage 상태 유지, 화면은 정상 표시됨
      }
    }

    loadFromSupabase(0)
    return () => { cancelled = true }
  }, [user])

  // Supabase에 즉시 전송 (내부 헬퍼)
  const doSync = useCallback(async (payload: Record<string, unknown>) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("gamification_data").upsert(payload, { onConflict: "user_id" })
      if (error) {
        console.error("[Gamification Sync] upsert failed:", error.message, error.code)
        const { error: retryError } = await supabase.from("gamification_data").upsert(payload, { onConflict: "user_id" })
        if (retryError) console.error("[Gamification Sync] retry failed:", retryError.message)
      }
      pendingPayloadRef.current = null
    } catch (e) {
      console.error("[Gamification Sync] network error:", e)
    }
  }, [])

  // Supabase에 debounce 저장
  const syncToSupabase = useCallback((s: GamificationState) => {
    if (!user) return

    if (debounceRef.current) clearTimeout(debounceRef.current)

    const payload = {
      user_id: user.id,
      total_xp: s.totalXp,
      daily_streak: s.dailyStreak,
      last_active_date: s.lastActiveDate,
      sessions_today: s.sessionsToday,
      updated_at: new Date().toISOString(),
    }
    pendingPayloadRef.current = payload

    debounceRef.current = setTimeout(() => { doSync(payload) }, 1000)
  }, [user, doSync])

  // 페이지 숨김/닫기 시 keepalive fetch로 즉시 flush
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && pendingPayloadRef.current) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
          debounceRef.current = null
        }
        flushToSupabase(
          "gamification_data",
          pendingPayloadRef.current as Record<string, unknown>,
          "user_id"
        )
        pendingPayloadRef.current = null
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const calculateXpBreakdown = useCallback(
    (correctAnswers: number, totalQuestions: number, maxCombo: number): XpBreakdown => {
      const baseXp = correctAnswers * 10
      const comboBonus = calcComboBonus(maxCombo)
      const streakBonus = state.dailyStreak >= 3 ? 10 : 0
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

  const addDirectXp = useCallback((amount: number) => {
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

      const newTotalXp = prev.totalXp + amount
      const newLevel = Math.floor(newTotalXp / XP_PER_LEVEL) + 1
      const xpInCurrentLevel = newTotalXp % XP_PER_LEVEL
      const newSessionsToday = isNewDay ? 1 : prev.sessionsToday + 1
      const newXpToday = isNewDay ? amount : (prev.xpToday || 0) + amount

      const next: GamificationState = {
        totalXp: newTotalXp,
        level: newLevel,
        xpInCurrentLevel,
        dailyStreak: newStreak,
        lastActiveDate: today,
        sessionsToday: newSessionsToday,
        xpToday: newXpToday,
      }

      persistState(next)
      syncToSupabase(next)
      return next
    })
  }, [syncToSupabase])

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
      const newXpToday = isNewDay ? xpBreakdown.totalXp : (prev.xpToday || 0) + xpBreakdown.totalXp

      const next: GamificationState = {
        totalXp: newTotalXp,
        level: newLevel,
        xpInCurrentLevel,
        dailyStreak: newStreak,
        lastActiveDate: today,
        sessionsToday: newSessionsToday,
        xpToday: newXpToday,
      }

      persistState(next)
      syncToSupabase(next) // Supabase에도 저장
      return next
    })
  }, [syncToSupabase])

  // 스트릭 위험 감지: 마지막 활동이 그저께 이상 → 스트릭이 끊김
  const isStreakAtRisk = state.dailyStreak > 0
    && state.lastActiveDate !== todayStr()
    && !isYesterday(state.lastActiveDate)
    && state.lastActiveDate !== ""

  // 스트릭 보호권: XP 50 소모 → 어제 활동한 것처럼 lastActiveDate 복원
  const useStreakShield = useCallback(() => {
    if (state.totalXp < STREAK_SHIELD_COST) return false
    const ys = yesterdayStr()
    setState((prev) => {
      const newTotalXp = prev.totalXp - STREAK_SHIELD_COST
      const next: GamificationState = {
        ...prev,
        totalXp: newTotalXp,
        level: Math.floor(newTotalXp / XP_PER_LEVEL) + 1,
        xpInCurrentLevel: newTotalXp % XP_PER_LEVEL,
        lastActiveDate: ys,
      }
      persistState(next)
      syncToSupabase(next)
      return next
    })
    return true
  }, [state.totalXp, syncToSupabase])

  return {
    ...state,
    calculateXpBreakdown,
    commitSessionXp,
    addDirectXp,
    isStreakAtRisk,
    useStreakShield,
  }
}
