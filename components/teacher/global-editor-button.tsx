"use client"

import { useState } from "react"
import { Code2, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { TeacherLiveEditor } from "./live-editor"

export function GlobalTeacherEditorButton() {
  const { profile, isLoading } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isTeacher = profile?.role === "teacher"
  // /learn 페이지는 헤더에 전용 버튼이 있으므로 중복 제외
  const isLearnPage = pathname?.startsWith("/learn")

  if (isLoading || !isTeacher || isLearnPage) return null

  return (
    <>
      {/* 플로팅 버튼 — 하단 내비바(bottom-0 ~56px) 위에 오도록 bottom-20 사용 */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-indigo-500 active:scale-95 transition-all"
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
