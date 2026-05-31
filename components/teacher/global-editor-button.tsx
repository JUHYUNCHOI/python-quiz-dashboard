"use client"

import { useState, useEffect } from "react"
import { Code2, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { OWNER_EMAIL } from "@/components/owner-only-guard"
import { TeacherLiveEditor } from "./live-editor"

export function GlobalTeacherEditorButton() {
  const { user, profile, isLoading } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isMirror, setIsMirror] = useState(false)

  // 미러 창에서는 에디터 버튼 숨김 (메인 창에서만 사용)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMirror(new URLSearchParams(window.location.search).get("mirror") === "1")
    }
  }, [])

  const isTeacher = profile?.role === "teacher"
  const isOwner = user?.email === OWNER_EMAIL
  // /learn, /teach, /quest/[id] 는 일반 선생님에겐 가림 (콘텐츠 충돌).
  // 단, owner (julia) 는 *어디서든* 에디터 필요 → 예외 없이 모든 페이지 허용.
  const isLearnPage = pathname?.startsWith("/learn")
  const isTeachPage = pathname?.startsWith("/teach")
  const isQuestProblemPage = pathname?.startsWith("/quest/") && pathname !== "/quest"
  const restrictedForOthers = isLearnPage || isTeachPage || isQuestProblemPage

  if (isLoading) return null
  if (isMirror) return null  // 미러 창에는 표시 안 함
  if (!isTeacher) return null  // 학생은 표시 안 함
  if (!isOwner && restrictedForOthers) return null  // 일반 선생님은 제외 페이지에서 가림

  return (
    <>
      {/* 플로팅 버튼 — 하단 내비바(bottom-0 ~56px) 위에 오도록 bottom-20 사용 */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-purple-500 active:scale-95 transition-all"
        title="코딩 에디터 열기"
      >
        {open ? <X size={16} /> : <Code2 size={16} />}
        {open ? "닫기" : "에디터"}
      </button>

      {open && (
        <TeacherLiveEditor onClose={() => setOpen(false)} />
      )}
    </>
  )
}
