"use client"

// ──────────────────────────────────────────────────────────────
//  /course/kl — 연습·도전 허브로 흡수됨 (2026-06-23).
//  KL 수업 43문제는 이제 /course/ladder 의 🎯KL 필터로 들어감.
//  옛 주소·즐겨찾기 보존을 위해 리다이렉트 + 진도(✓) 이관.
//  (이전 단계형 페이지는 git 히스토리에 보존)
// ──────────────────────────────────────────────────────────────

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function KlRedirect() {
  const router = useRouter()
  useEffect(() => {
    // 옛 KL 진도(kl-prep-done) → 허브 진도(ladder-done) 이관
    try {
      const old = JSON.parse(localStorage.getItem("kl-prep-done") || "[]")
      if (Array.isArray(old) && old.length) {
        const cur = new Set<string>(JSON.parse(localStorage.getItem("ladder-done") || "[]"))
        old.forEach((id: string) => cur.add(id))
        localStorage.setItem("ladder-done", JSON.stringify([...cur]))
      }
    } catch { }
    router.replace("/course/ladder?kl=1")
  }, [router])

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b", fontSize: 14 }}>
      KL 연습이 <b style={{ color: "#0f172a" }}>연습 · 도전</b>으로 합쳐졌어요 — 이동 중…
    </div>
  )
}
