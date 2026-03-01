"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/supabase/types"
import { migrateLocalStorageToSupabase } from "@/lib/supabase/migrate-local-data"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

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
      // 프로필 조회 실패 시 무시 (Supabase 미설정 등)
    }
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id)
    }
  }, [user?.id, fetchProfile])

  useEffect(() => {
    // 초기 사용자 확인
    const initAuth = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        setUser(currentUser)

        if (currentUser) {
          await fetchProfile(currentUser.id)
        }
      } catch {
        // Supabase 미설정 시 (URL이 placeholder) 조용히 실패
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Auth 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await fetchProfile(currentUser.id)

          // 첫 로그인 시 localStorage → Supabase 마이그레이션
          if (event === "SIGNED_IN") {
            migrateLocalStorageToSupabase(currentUser.id).catch(() => {})
          }
        } else {
          setProfile(null)
        }

        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
