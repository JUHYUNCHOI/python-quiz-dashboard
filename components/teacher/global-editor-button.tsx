"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Code2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

// Lazy-load the heavy editor only when opened
const TeacherLiveEditor = dynamic(
  () => import("./live-editor").then(m => ({ default: m.TeacherLiveEditor })),
  { ssr: false }
)

export function GlobalTeacherEditorButton() {
  const { profile } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isTeacher = profile?.role === "teacher"
  // /learn 페이지는 헤더에 전용 에디터 버튼이 있으므로 중복 표시 방지
  const isLearnPage = pathname?.startsWith("/learn")

  if (!isTeacher || isLearnPage) return null

  return (
    <>
      {/* Floating trigger button — bottom-right, above any bottom nav */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-indigo-500 active:scale-95 transition-all"
        title="코딩 에디터 열기"
      >
        <Code2 size={16} />
        에디터
      </button>

      {open && (
        <TeacherLiveEditor onClose={() => setOpen(false)} />
      )}
    </>
  )
}
