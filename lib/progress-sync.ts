"use client"

import { createClient } from "@/lib/supabase/client"

const COMPLETED_KEY = "completedLessons"

/** localStorage 의 완료 레슨 id 집합 (문자열 정규화). 실패해도 빈 집합 반환. */
export function getCompletedLessonsLocal(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]") as unknown[]
    return new Set(raw.map(String))
  } catch {
    return new Set()
  }
}

/**
 * Supabase `lesson_progress`(completed=true) 를 localStorage `completedLessons` 에 **병합**한다.
 *
 * 왜 필요한가: /journey, /coding-bank 는 DB 를 직접 읽지만 /practice, /learn, /algo 의
 * "다음 추천(getSmartNext)" 은 localStorage 만 읽었다. 다른 기기에서 진행했거나 캐시가
 * 비워지면 진도가 stale 해져 추천이 틀렸다. 로그인 직후 1회 호출해 로컬을 실제 진도로 맞춘다.
 *
 * - 순수 병합(추가만) — 로컬에 있던 항목을 절대 지우지 않음. 데이터 손실 위험 없음.
 * - 실패(비로그인/네트워크)해도 throw 하지 않고 로컬 집합을 반환.
 *
 * @returns 병합된 완료 레슨 id 집합
 */
export async function syncCompletedLessons(): Promise<Set<string>> {
  const set = getCompletedLessonsLocal()
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return set

    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true)

    if (data && data.length) {
      let changed = false
      for (const row of data) {
        const id = String((row as { lesson_id: string | number }).lesson_id)
        if (!set.has(id)) {
          set.add(id)
          changed = true
        }
      }
      if (changed) {
        try {
          localStorage.setItem(COMPLETED_KEY, JSON.stringify([...set]))
        } catch {}
      }
    }
  } catch {
    // 비로그인 / 네트워크 오류 — 로컬 값 그대로 사용
  }
  return set
}
