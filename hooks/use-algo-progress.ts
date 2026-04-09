"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "algo-completed"

export function useAlgoProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadProgress() {
      // 1단계: localStorage 즉시 로드
      let lsCompleted: string[] = []
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          lsCompleted = JSON.parse(raw) as string[]
          setCompleted(new Set(lsCompleted))
        }
      } catch {}

      // 2단계: DB 로드
      try {
        const res = await fetch("/api/algo/progress")
        if (!res.ok) throw new Error("API error")

        const { completed: dbCompleted }: { completed: string[] } = await res.json()

        // DB + localStorage 합치기
        const merged = new Set([...dbCompleted, ...lsCompleted])
        setCompleted(merged)

        // localStorage에만 있고 DB에 없는 항목 → 백그라운드 마이그레이션
        const toMigrate = lsCompleted.filter(id => !dbCompleted.includes(id))
        if (toMigrate.length > 0) {
          for (const id of toMigrate) {
            fetch("/api/algo/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ problemId: id }),
            }).catch(() => {})
          }
        }

        // localStorage 최신 상태로 업데이트
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...merged]))
      } catch {
        // DB 실패 시 localStorage만 사용
      }
    }

    loadProgress()
  }, [])

  const markComplete = useCallback(async (problemId: string) => {
    // 즉시 UI 반영
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(problemId)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch {}
      return next
    })

    // DB 저장 (백그라운드)
    try {
      await fetch("/api/algo/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId }),
      })
    } catch {}
  }, [])

  const isComplete = useCallback((problemId: string) => completed.has(problemId), [completed])

  const getTopicProgress = useCallback((problemIds: string[]) =>
    problemIds.filter(id => completed.has(id)).length,
    [completed]
  )

  return { completed, markComplete, isComplete, getTopicProgress }
}
