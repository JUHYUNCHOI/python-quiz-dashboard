"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/supabase/types"
import { migrateLocalStorageToSupabase } from "@/lib/supabase/migrate-local-data"
import { restoreFromCloud } from "@/lib/supabase/restore-from-cloud"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/** 유저별 학습 데이터 localStorage 초기화 (계정 전환/로그아웃 시 호출) */
function clearUserLocalStorage() {
  const fixedKeys = [
    "completedLessons", "completedQuizzes", "quiz-history",
    "question-mastery", "activity-log",
    "gamification-total-xp", "gamification-daily-streak",
    "gamification-last-active-date", "gamification-sessions-today",
    "language", "sound-muted",
  ]
  fixedKeys.forEach(k => localStorage.removeItem(k))
  Object.keys(localStorage)
    .filter(k =>
      k.startsWith("practice-v2-") || k.startsWith("lesson-") ||
      k.startsWith("blank-runner-") || k.startsWith("python-runner-") ||
      k.startsWith("library-variant-")
    )
    .forEach(k => localStorage.removeItem(k))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await Promise.race([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000)),
      ])

      if (!error && data) {
        setProfile(data as Profile)
      } else if (error?.code === "PGRST116") {
        // 프로필이 없는 경우 (DB 재생성 등) 자동 생성
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
          const meta = currentUser.user_metadata || {}
          const { data: newProfile } = await supabase
            .from("profiles")
            .upsert({
              id: userId,
              display_name: meta.name || meta.full_name || "학습자",
              avatar_url: meta.avatar_url || meta.picture || null,
            })
            .select()
            .single()

          if (newProfile) {
            setProfile(newProfile as Profile)
          }
        }
      }
    } catch {
      // 프로필 조회 실패 또는 타임아웃 시 무시
    }
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id)
    }
  }, [user?.id, fetchProfile])

  useEffect(() => {
    // 초기 사용자 확인 — getSession()으로 빠르게 로컬 토큰 체크
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          // 로컬에 세션 없음 → 즉시 로딩 해제 (네트워크 호출 불필요)
          setUser(null)
          setIsLoading(false)
          return
        }

        // 세션 있으면 서버에서 유저 검증
        setUser(session.user)
        await fetchProfile(session.user.id)
      } catch {
        // Supabase 미설정 시 (URL이 placeholder) 조용히 실패
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // 안전장치: 5초 후에도 로딩 중이면 강제 해제
    const timeout = setTimeout(() => setIsLoading(false), 5000)

    // Auth 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await fetchProfile(currentUser.id)

          // 로그인 시 양방향 동기화 (순차 실행: 업로드 완료 후 복원)
          if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
            const lastUserId = localStorage.getItem("last-user-id")
            const isNewUser = lastUserId && lastUserId !== currentUser.id

            if (isNewUser) {
              // 다른 계정 전환: 기존 로컬 데이터 초기화 후 클라우드에서 복원
              clearUserLocalStorage()
              restoreFromCloud(currentUser.id)
                .catch((e) => { console.error("[AuthContext] restore failed:", e) })
            } else {
              // 같은 계정: 로컬 데이터 업로드 후 클라우드 복원 (merge)
              migrateLocalStorageToSupabase(currentUser.id)
                .catch((e) => { console.error("[AuthContext] migrate failed:", e) })
                .then(() => restoreFromCloud(currentUser.id))
                .catch((e) => { console.error("[AuthContext] restore failed:", e) })
            }

            localStorage.setItem("last-user-id", currentUser.id)
          }
        } else {
          setProfile(null)

          // 로그아웃 시 학습 데이터 초기화 (다음 사용자 오염 방지)
          if (event === "SIGNED_OUT") {
            clearUserLocalStorage()
          }
        }

        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // JWT 토큰 자동 갱신 (25분마다) — 긴 레슨 중 세션 만료로 인한 저장 실패 방지
  useEffect(() => {
    if (!user) return
    const interval = setInterval(async () => {
      try {
        // getUser()는 네트워크 호출을 하면서 자동으로 토큰을 갱신함
        await supabase.auth.getUser()
      } catch {
        // 네트워크 에러 시 무시 — 다음 인터벌에서 재시도
      }
    }, 25 * 60 * 1000) // 25분 (JWT 기본 만료 60분보다 충분히 앞서)
    return () => clearInterval(interval)
  }, [user, supabase])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!user,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
