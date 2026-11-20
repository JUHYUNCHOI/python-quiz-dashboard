"use client"

import { useEffect, useState } from "react"
import type { TierId } from "@/lib/tier-system"
import { loadTierState, syncTierFromServer } from "@/lib/tier-store"

/**
 * 지금 학생의 티어. `null` = 배치고사를 아직 안 봤다(언랭).
 *
 * `loaded` 를 따로 주는 이유: 불러오기 전에 `null` 을 그대로 그리면 이미 배치고사를
 * 본 학생에게 "언랭" 이 한 번 번쩍인다. 호출하는 쪽에서 `loaded` 가 false 인 동안은
 * 같은 높이의 빈칸을 그려야 한다(레이아웃이 튀지 않게).
 */
export function useTier(): { tier: TierId | null; loaded: boolean } {
  const [tier, setTier] = useState<TierId | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTier(loadTierState()?.tier ?? null)
    setLoaded(true)
    let alive = true
    syncTierFromServer().then(m => { if (alive) setTier(m.state?.tier ?? null) })
    return () => { alive = false }
  }, [])

  return { tier, loaded }
}
