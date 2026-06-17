"use client"

/**
 * TeacherMirror — owner (julia.juhyun@gmail.com) 전용 한글 미러 창.
 *
 * 동작:
 * - 메인 창 (수업 창): 우상단 floating 버튼 "🪟 한글 미러" 표시 (owner 만).
 * - 클릭 시 new window 열림 — 같은 페이지 + `?lang=ko&mirror=1`
 * - 메인 창에서 페이지 이동 (route 변경) 하면 BroadcastChannel 로 미러에 알림
 * - 미러 창은 메시지 받고 같은 페이지로 navigate (mirror=1, lang=ko 유지)
 * - 미러 창에서는 버튼 자체가 안 보임 (재귀 방지)
 *
 * 영어로 수업하면서 owner 본인은 한글 화면을 옆에 띄워두고 보는 용도.
 */

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { OWNER_EMAIL } from "@/components/owner-only-guard"

const CHANNEL_NAME = "coderin-teacher-mirror"

function getMirrorParam(): boolean {
  if (typeof window === "undefined") return false
  return new URLSearchParams(window.location.search).get("mirror") === "1"
}

export function TeacherMirror() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isMirror, setIsMirror] = useState(false)
  const [mounted, setMounted] = useState(false)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const isOwner = user?.email === OWNER_EMAIL

  // Hydration safe: detect mirror param after mount
  useEffect(() => {
    setIsMirror(getMirrorParam())
    setMounted(true)
  }, [])

  // Channel 초기화 (한 번)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("BroadcastChannel" in window)) return
    const ch = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = ch
    return () => {
      ch.close()
      channelRef.current = null
    }
  }, [])

  // 메인 창: pathname 또는 search 변경 시 미러에 broadcast
  useEffect(() => {
    if (!mounted) return
    if (isMirror) return
    if (!isOwner) return
    const ch = channelRef.current
    if (!ch) return
    const url = window.location.pathname + window.location.search
    ch.postMessage({ type: "nav", url, ts: Date.now() })
  }, [pathname, mounted, isMirror, isOwner])

  // 미러 창: nav 메시지 수신 → URL 동기화
  useEffect(() => {
    if (!mounted) return
    if (!isMirror) return
    const ch = channelRef.current
    if (!ch) return
    const handler = (e: MessageEvent) => {
      if (e.data?.type !== "nav" || typeof e.data.url !== "string") return
      try {
        const incoming = new URL(e.data.url, window.location.origin)
        // 미러 파라미터 강제 유지
        incoming.searchParams.set("mirror", "1")
        incoming.searchParams.set("lang", "ko")
        const target = incoming.pathname + "?" + incoming.searchParams.toString()
        const current = window.location.pathname + window.location.search
        if (target !== current) {
          // router.push 보다 location.assign — 정적 export 호환
          window.location.assign(target)
        }
      } catch {}
    }
    ch.addEventListener("message", handler)
    return () => ch.removeEventListener("message", handler)
  }, [mounted, isMirror])

  // 미러 창: quest 는 Next/Prev 시 URL 이 안 바뀌고 localStorage(quest-pos-*)로만
  // 페이지를 넘긴다. BroadcastChannel "nav" 는 URL(route) 변경만 감지하므로 quest 이동을
  // 못 따라갔다. → 메인 창이 quest-pos 를 쓰면 미러 창에 storage 이벤트가 오므로, 그때
  // 새 위치로 다시 그린다 (정적 export 호환 위해 reload).
  useEffect(() => {
    if (!mounted || !isMirror) return
    const onStorage = (e: StorageEvent) => {
      if (!e.key || !e.key.startsWith("quest-pos-")) return
      if (!e.newValue || e.newValue === e.oldValue) return
      window.location.reload()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [mounted, isMirror])

  // 미러 창에서는 버튼 X
  if (!mounted || isMirror || !isOwner) return null

  const openMirror = () => {
    const params = new URLSearchParams(window.location.search)
    params.set("lang", "ko")
    params.set("mirror", "1")
    const url = `${window.location.pathname}?${params.toString()}`
    window.open(
      url,
      "coderin-mirror-window",
      "width=720,height=960,scrollbars=yes,resizable=yes,toolbar=no,menubar=no"
    )
  }

  return (
    <button
      onClick={openMirror}
      className="fixed bottom-36 right-4 z-50 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-full px-4 py-2.5 shadow-lg flex items-center gap-2 text-sm font-bold transition-all"
      title="한글 미러 창 열기 (수업창 따라 같이 이동)"
    >
      <span className="text-base">🪟</span>
      <span>한글 미러</span>
    </button>
  )
}
