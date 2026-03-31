"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "algo-completed"

export function useAlgoProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCompleted(new Set(JSON.parse(raw) as string[]))
    } catch { /* ignore */ }
  }, [])

  const markComplete = useCallback((problemId: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(problemId)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch { /* ignore */ }
      return next
    })
  }, [])

  const isComplete = useCallback((problemId: string) => completed.has(problemId), [completed])

  const getTopicProgress = useCallback((problemIds: string[]) =>
    problemIds.filter(id => completed.has(id)).length,
    [completed]
  )

  return { completed, markComplete, isComplete, getTopicProgress }
}
