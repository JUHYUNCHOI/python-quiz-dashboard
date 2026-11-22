"use client"

// /coding-bank — 연습·도전 허브(/course/ladder)로 흡수됨 (2026-06-23).
// 코딩뱅크 100문제는 허브에 cat:"bank" 로 합류. 옛 주소 보존용 리다이렉트.
// (이전 페이지는 git 히스토리에 보존)

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function CodingBankRedirect() {
  const router = useRouter()
  const { t } = useLanguage()
  useEffect(() => {
    // `?kind=` 필터는 외부 문제를 뺀 뒤 사라졌다 — 그냥 허브로 보낸다.
    router.replace("/course/ladder")
  }, [router])

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b", fontSize: 14 }}>
      {t("코딩뱅크가 ", "The Coding Bank is now part of ")}
      <b style={{ color: "#0f172a" }}>{t("연습 · 도전", "Practice · Challenge")}</b>
      {t("으로 합쳐졌어요 — 이동 중…", " — taking you there…")}
    </div>
  )
}
