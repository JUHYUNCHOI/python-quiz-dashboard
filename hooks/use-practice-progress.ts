/**
 * usePracticeProgress
 *
 * 학생의 연습 문제 풀이 진도를 관리합니다.
 * - 로드: DB 우선, localStorage 폴백 & 마이그레이션
 * - 저장: DB + localStorage 이중 저장 (curriculum 페이지 호환)
 */

import { useState, useEffect, useCallback } from "react"

interface PracticeProgress {
  solvedSet: Set<string>
  starredSet: Set<string>
  loaded: boolean
  markSolved: (problemId: string) => Promise<void>
  markStarred: (problemId: string) => Promise<void>
  toggleStarred: (problemId: string) => Promise<void>
}

export function usePracticeProgress(): PracticeProgress {
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())
  const [starredSet, setStarredSet] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadProgress() {
      // 1단계: localStorage 즉시 로드 (UI 바로 표시)
      let lsSolved: string[] = []
      let lsStarred: string[] = []
      try {
        lsSolved = JSON.parse(localStorage.getItem("practice-solved") || "[]")
        lsStarred = JSON.parse(localStorage.getItem("practice-starred") || "[]")
        setSolvedSet(new Set(lsSolved))
        setStarredSet(new Set(lsStarred))
      } catch {}

      // 2단계: DB 로드 (더 신뢰할 수 있는 데이터)
      try {
        const res = await fetch("/api/practice/progress")
        if (!res.ok) throw new Error("API error")

        const { solved: dbSolved, starred: dbStarred }: {
          solved: string[]
          starred: string[]
        } = await res.json()

        // DB + localStorage 합치기 (union — 어느 쪽이든 풀었으면 풀린 것으로)
        const mergedSolved = new Set([...dbSolved, ...lsSolved])
        const mergedStarred = new Set([...dbStarred, ...lsStarred])

        setSolvedSet(mergedSolved)
        setStarredSet(mergedStarred)

        // localStorage에만 있고 DB에 없는 항목 → DB로 마이그레이션 (백그라운드)
        const migrateIds = lsSolved.filter(id => !dbSolved.includes(id))
        if (migrateIds.length > 0) {
          migrateLocalToDb(migrateIds, lsStarred.filter(id => !dbStarred.includes(id)))
        }

        // 로컬스토리지도 최신 상태로 업데이트
        localStorage.setItem("practice-solved", JSON.stringify([...mergedSolved]))
        localStorage.setItem("practice-starred", JSON.stringify([...mergedStarred]))
      } catch {
        // DB 실패 시 localStorage 데이터만 사용 (오프라인 허용)
      }

      setLoaded(true)
    }

    loadProgress()
  }, [])

  // localStorage → DB 마이그레이션 (백그라운드, 에러 무시)
  async function migrateLocalToDb(solvedIds: string[], starredIds: string[]) {
    const allIds = [...new Set([...solvedIds, ...starredIds])]
    for (const id of allIds) {
      try {
        await fetch("/api/practice/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problemId: id,
            solved: solvedIds.includes(id),
            starred: starredIds.includes(id),
          }),
        })
      } catch {}
    }
  }

  const markSolved = useCallback(async (problemId: string) => {
    // 즉시 UI 반영
    setSolvedSet(prev => new Set([...prev, problemId]))

    // localStorage 업데이트 (curriculum 페이지 호환)
    try {
      const solved = JSON.parse(localStorage.getItem("practice-solved") || "[]") as string[]
      if (!solved.includes(problemId)) {
        localStorage.setItem("practice-solved", JSON.stringify([...solved, problemId]))
      }
    } catch {}

    // DB 업데이트
    try {
      await fetch("/api/practice/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, solved: true }),
      })
    } catch {
      // DB 실패해도 localStorage에는 저장됨
    }
  }, [])

  const markStarred = useCallback(async (problemId: string) => {
    setSolvedSet(prev => new Set([...prev, problemId])) // 별표 = 풀었다는 의미도 포함
    setStarredSet(prev => new Set([...prev, problemId]))

    try {
      const solved = JSON.parse(localStorage.getItem("practice-solved") || "[]") as string[]
      const starred = JSON.parse(localStorage.getItem("practice-starred") || "[]") as string[]
      if (!solved.includes(problemId))   localStorage.setItem("practice-solved", JSON.stringify([...solved, problemId]))
      if (!starred.includes(problemId)) localStorage.setItem("practice-starred", JSON.stringify([...starred, problemId]))
    } catch {}

    try {
      await fetch("/api/practice/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, solved: true, starred: true }),
      })
    } catch {}
  }, [])

  const toggleStarred = useCallback(async (problemId: string) => {
    const isCurrentlyStarred = starredSet.has(problemId)
    const newStarred = !isCurrentlyStarred

    setStarredSet(prev => {
      const next = new Set(prev)
      if (newStarred) next.add(problemId)
      else next.delete(problemId)
      return next
    })

    try {
      const starred = JSON.parse(localStorage.getItem("practice-starred") || "[]") as string[]
      const updated = newStarred
        ? [...starred, problemId]
        : starred.filter(id => id !== problemId)
      localStorage.setItem("practice-starred", JSON.stringify(updated))
    } catch {}

    try {
      await fetch("/api/practice/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, starred: newStarred }),
      })
    } catch {}
  }, [starredSet])

  return { solvedSet, starredSet, loaded, markSolved, markStarred, toggleStarred }
}
