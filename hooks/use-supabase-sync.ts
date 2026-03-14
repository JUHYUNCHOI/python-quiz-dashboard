"use client"

import { useCallback, useRef, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { flushToSupabase } from "@/lib/supabase/keepalive-flush"

/**
 * Supabase 동기화 훅
 * localStorage에 항상 즉시 쓰고, 로그인 상태면 Supabase에도 debounce 쓰기
 * visibilitychange 시 미전송 데이터 즉시 flush (keepalive fetch)
 */
export function useSupabaseSync() {
  const { user } = useAuth()
  const supabase = createClient()
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const pendingPayloads = useRef<Map<string, { table: string; data: Record<string, unknown>; onConflict: string }>>(new Map())

  // 페이지 숨김/닫기 시 모든 미전송 데이터 즉시 flush (keepalive fetch로 탭 닫기 시에도 전송)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && pendingPayloads.current.size > 0) {
        // 모든 타이머 취소
        for (const timer of debounceTimers.current.values()) {
          clearTimeout(timer)
        }
        debounceTimers.current.clear()

        // 모든 pending을 keepalive fetch로 즉시 전송
        for (const pending of pendingPayloads.current.values()) {
          flushToSupabase(pending.table, pending.data, pending.onConflict)
        }
        pendingPayloads.current.clear()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      for (const timer of debounceTimers.current.values()) {
        clearTimeout(timer)
      }
    }
  }, [])

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

    const timerKey = `${table}-${JSON.stringify(matchColumns)}`
    const existing = debounceTimers.current.get(timerKey)
    if (existing) clearTimeout(existing)

    const onConflict = table === "gamification_data" || table === "user_preferences"
      ? "user_id"
      : `user_id,${Object.keys(matchColumns).join(",")}`

    const upsertData: Record<string, unknown> = {
      user_id: user.id,
      [valueColumn]: value,
      updated_at: new Date().toISOString(),
      ...matchColumns,
      ...extraColumns,
    }

    pendingPayloads.current.set(timerKey, { table, data: upsertData, onConflict })

    const timer = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from(table)
          .upsert(upsertData, { onConflict })
        if (error) {
          console.error(`[SupabaseSync] ${table} upsert failed:`, error.message, error.code)
        }
        pendingPayloads.current.delete(timerKey)
      } catch (e) {
        console.error(`[SupabaseSync] ${table} network error:`, e)
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

    const upsertData = {
      user_id: user.id,
      ...data,
      updated_at: new Date().toISOString(),
    }

    pendingPayloads.current.set(timerKey, { table, data: upsertData, onConflict: "user_id" })

    const timer = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from(table)
          .upsert(upsertData, { onConflict: "user_id" })
        if (error) {
          console.error(`[SupabaseSync] ${table} row upsert failed:`, error.message, error.code)
        }
        pendingPayloads.current.delete(timerKey)
      } catch (e) {
        console.error(`[SupabaseSync] ${table} row network error:`, e)
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
