"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { fetchCodeSubmissions, upsertCodeSubmission } from "@/lib/supabase/code-submissions"

interface CodeSubmissionContextValue {
  /** 저장된 정답 코드 반환 (없으면 null) */
  getSubmission: (stepId: string) => string | null
  /** 정답 코드 저장 (DB + 로컬 캐시) */
  saveSubmission: (stepId: string, code: string) => void
  /** DB 로드 완료 여부 */
  loaded: boolean
  /** 로그인 여부 (runners에서 로그인 유도 표시용) */
  isAuthenticated: boolean
  /** 현재 레슨 ID (localStorage 마이그레이션용) */
  lessonId: string
}

const CodeSubmissionContext = createContext<CodeSubmissionContextValue>({
  getSubmission: () => null,
  saveSubmission: () => {},
  loaded: false,
  isAuthenticated: false,
  lessonId: "",
})

export function CodeSubmissionProvider({
  lessonId,
  children,
}: {
  lessonId: string
  children: ReactNode
}) {
  const { profile, isAuthenticated } = useAuth()
  const [submissions, setSubmissions] = useState<Record<string, string>>({})
  const [loaded, setLoaded] = useState(false)

  // 레슨 진입 시 이 레슨의 모든 제출 코드 한 번에 로드
  useEffect(() => {
    if (!isAuthenticated || !profile?.id) {
      setLoaded(true) // 비로그인: 그냥 완료 처리 (localStorage만 사용)
      return
    }
    setLoaded(false)
    fetchCodeSubmissions(profile.id, lessonId)
      .then(data => { setSubmissions(data); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [lessonId, isAuthenticated, profile?.id])

  const saveSubmission = useCallback((stepId: string, code: string) => {
    if (!isAuthenticated || !profile?.id) return
    // 로컬 캐시 즉시 업데이트 (UI 즉시 반영)
    setSubmissions(prev => ({ ...prev, [stepId]: code }))
    // DB 비동기 저장 (fire-and-forget)
    upsertCodeSubmission(profile.id, lessonId, stepId, code).catch(console.error)
  }, [lessonId, isAuthenticated, profile?.id])

  const getSubmission = useCallback((stepId: string) => {
    return submissions[stepId] ?? null
  }, [submissions])

  return (
    <CodeSubmissionContext.Provider value={{ getSubmission, saveSubmission, loaded, isAuthenticated, lessonId }}>
      {children}
    </CodeSubmissionContext.Provider>
  )
}

export function useCodeSubmission() {
  return useContext(CodeSubmissionContext)
}
