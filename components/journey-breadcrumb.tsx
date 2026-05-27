"use client"

/**
 * 학생이 항상 *어디 있는지* 알게 — 페이지 상단 breadcrumb.
 * 경로: 지도 → 단계 → 토픽 → 세부
 *
 * 기획 의도: memory/learning_tracks.md
 */

import Link from "next/link"
import { ChevronRight, Map } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export interface CrumbItem {
  label: string
  labelEn: string
  href?: string  // 마지막 항목 = 현재 페이지 = href 없음
  emoji?: string
}

export function JourneyBreadcrumb({ items }: { items: CrumbItem[] }) {
  const { t } = useLanguage()
  return (
    <nav className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 mb-3 flex-wrap">
      <Link href="/journey" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
        <Map className="w-3.5 h-3.5" />
        <span className="font-medium">{t("지도", "Map")}</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3 h-3 text-gray-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-orange-600 transition-colors flex items-center gap-0.5">
              {item.emoji && <span>{item.emoji}</span>}
              <span className="font-medium">{t(item.label, item.labelEn)}</span>
            </Link>
          ) : (
            <span className="text-gray-700 font-bold flex items-center gap-0.5">
              {item.emoji && <span>{item.emoji}</span>}
              <span>{t(item.label, item.labelEn)}</span>
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
