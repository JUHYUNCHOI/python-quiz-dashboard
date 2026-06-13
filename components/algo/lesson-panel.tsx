"use client"

import { useState, useEffect, type ReactNode } from "react"
import { BookOpen, X } from "lucide-react"

/**
 * 알고리즘 토픽 수업을 '문제 화면 안에서' 옆 슬라이드로 보여주는 재사용 패널.
 * 이동(navigation) 없이 in-context. 왼쪽 가장자리 드래그로 너비 조절(30~95%).
 */
export function LessonPanel({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const [panelW, setPanelW] = useState(80) // vw, 기본 4/5
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) =>
      setPanelW(Math.min(95, Math.max(30, ((window.innerWidth - e.clientX) / window.innerWidth) * 100)))
    const onUp = () => setDragging(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    document.body.style.userSelect = "none"
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      document.body.style.userSelect = ""
    }
  }, [dragging])

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 bottom-0 w-full bg-white z-50 shadow-2xl overflow-y-auto"
        style={{ width: `${panelW}vw` }}
      >
        {/* 드래그 핸들 — 왼쪽 가장자리 (데스크탑) */}
        <div
          onMouseDown={() => setDragging(true)}
          className="hidden sm:flex absolute left-0 top-0 bottom-0 w-2.5 cursor-col-resize items-center justify-center hover:bg-violet-100 group z-10"
          title="드래그해서 크기 조절"
        >
          <div className="w-1 h-12 rounded-full bg-gray-300 group-hover:bg-violet-400 transition-colors" />
        </div>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 pl-5 flex items-center justify-between z-10">
          <h2 className="font-black text-gray-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-violet-500" /> {title}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="close">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="px-5 sm:px-6 py-5">{children}</div>
      </div>
    </>
  )
}
