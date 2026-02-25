"use client"

import { useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"

/**
 * Supabase 동기화 훅
 * localStorage에 항상 즉시 쓰고, 로그인 상태면 Supabase에도 debounce 쓰기
 */
export function useSupabaseSync() {
  const { user } = useAuth()
  const supabase = createClient()
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map())

  /**
   * Supabase 테이블에서 데이터 로드
   */
  const loadFromSupabase = useCallback(async <T>(
    table: string,
    matchColumns: Record<string, string | null>,
    valueColumn: string,
    defaultValue: T
  ): Promise<T | null> => {
    if (!user) return null

    try {
      let query = supabase.from(table).select("*").eq("user_id", user.id)

      for (const [col, val] of Object.entries(matchColumns)) {
        if (val === null) {
          query = query.is(col, null)
        } else {
          query = query.eq(col, val)
        }
      }

      const { data, error } = await query.single()

      if (error || !data) return null
      return (data as Record<string, unknown>)[valueColumn] as T ?? defaultValue
    } catch {
      return null
    }
  }, [user, supabase])

  /**
   * Supabase 테이블에 데이터 저장 (debounce)
   */
  const saveToSupabase = useCallback((
    table: string,
    matchColumns: Record<string, string | null>,
    valueColumn: string,
    value: unknown,
    extraColumns?: Record<string, unknown>,
    debounceMs: number = 1000
  ) => {
    if (!user) return

    // 기존 타이머 취소
    const timerKey = `${table}-${JSON.stringify(matchColumns)}`
    const existing = debounceTimers.current.get(timerKey)
    if (existing) clearTimeout(existing)

    // 새 타이머 설정
    const timer = setTimeout(async () => {
      try {
        const upsertData: Record<string, unknown> = {
          user_id: user.id,
          [valueColumn]: value,
          updated_at: new Date().toISOString(),
          ...matchColumns,
          ...extraColumns,
        }

        await supabase
          .from(table)
          .upsert(upsertData, {
            onConflict: table === "gamification_data" || table === "user_preferences"
              ? "user_id"
              : `user_id,${Object.keys(matchColumns).join(",")}`,
          })
      } catch {
        // Supabase 저장 실패 시 무시 (localStorage에는 이미 저장됨)
      }
    }, debounceMs)

    debounceTimers.current.set(timerKey, timer)
  }, [user, supabase])

  /**
   * Supabase에서 전체 행 데이터 로드
   */
  const loadRowFromSupabase = useCallback(async <T extends Record<string, unknown>>(
    table: string,
    defaultValue: T
  ): Promise<T | null> => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (error || !data) return null
      return data as T
    } catch {
      return null
    }
  }, [user, supabase])

  /**
   * Supabase 테이블에 전체 행 저장 (debounce)
   */
  const saveRowToSupabase = useCallback((
    table: string,
    data: Record<string, unknown>,
    debounceMs: number = 1000
  ) => {
    if (!user) return

    const timerKey = `${table}-row`
    const existing = debounceTimers.current.get(timerKey)
    if (existing) clearTimeout(existing)

    const timer = setTimeout(async () => {
      try {
        await supabase
          .from(table)
          .upsert({
            user_id: user.id,
            ...data,
            updated_at: new Date().toISOString(),
          }, { onConflict: "user_id" })
      } catch {
        // 저장 실패 시 무시
      }
    }, debounceMs)

    debounceTimers.current.set(timerKey, timer)
  }, [user, supabase])

  return {
    isAuthenticated: !!user,
    userId: user?.id ?? null,
    loadFromSupabase,
    saveToSupabase,
    loadRowFromSupabase,
    saveRowToSupabase,
  }
}
