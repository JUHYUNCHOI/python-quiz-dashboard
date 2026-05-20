"use client"

/**
 * AdSlot — Google AdSense 광고 단위 렌더링.
 *
 * 동작:
 *   - 로그인 사용자: 광고 안 보임 (ad-free 혜택)
 *   - 비로그인 사용자 + AdSense 활성화: 진짜 광고
 *   - 비로그인 사용자 + AdSense 미설정: 회색 placeholder (개발/스테이징)
 *
 * 사용:
 *   <AdSlot name="learnTop" format="leaderboard" />
 *   <AdSlot name="learnBottom" format="rectangle" />
 *
 * AdSense 활성화 가이드: lib/adsense-config.ts 헤더 주석 참고.
 */

import { useEffect, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ADSENSE_ENABLED, ADSENSE_PUBLISHER_ID, AD_SLOTS, type AdSlotName } from "@/lib/adsense-config"

interface AdSlotProps {
  /** AD_SLOTS 키 — 위치별로 다른 광고 단위 ID 매핑 */
  name: AdSlotName
  /** 광고 형식. responsive 가 가장 무난 (모바일/데스크탑 자동 적응) */
  format?: "responsive" | "leaderboard" | "rectangle" | "auto"
  /** 추가 클래스 */
  className?: string
}

const FORMAT_STYLES: Record<NonNullable<AdSlotProps["format"]>, string> = {
  responsive: "min-h-[100px]",
  leaderboard: "min-h-[90px] max-w-[728px]",
  rectangle: "min-h-[250px] max-w-[300px]",
  auto: "min-h-[100px]",
}

// 전역 AdSense script 한 번만 로드
declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export function AdSlot({ name, format = "responsive", className = "" }: AdSlotProps) {
  const { user, isLoading } = useAuth()
  const slotId = AD_SLOTS[name]
  const insRef = useRef<HTMLModElement>(null)

  // 로그인 사용자에겐 광고 안 보임 (가입 인센티브)
  // 인증 로딩 중에는 광고 자리 차지 안 함 (CLS 방지)
  const shouldShow = !isLoading && !user

  useEffect(() => {
    if (!shouldShow || !ADSENSE_ENABLED || !slotId) return
    try {
      // AdSense 푸시 — adsbygoogle 배열에 push 하면 광고 로드
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* AdSense 차단됐거나 스크립트 미로드 — 조용히 실패 */
    }
  }, [shouldShow, slotId])

  if (!shouldShow) return null

  const baseClasses = `block w-full mx-auto my-4 ${FORMAT_STYLES[format]} ${className}`

  // 개발 / 미설정 상태: 회색 placeholder 표시 (실제 광고 자리만 잡아둠)
  if (!ADSENSE_ENABLED || !slotId) {
    return (
      <div
        className={`${baseClasses} flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-[11px] text-gray-400 font-medium`}
        aria-label="Ad placeholder"
      >
        <span>📺 Ad Slot: {name}{!ADSENSE_ENABLED && " (AdSense 미설정)"}</span>
      </div>
    )
  }

  // 프로덕션 + AdSense 설정 완료: 실제 광고 ins 태그 렌더
  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${baseClasses}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
      data-ad-format={format === "responsive" ? "auto" : format}
      data-full-width-responsive={format === "responsive" ? "true" : undefined}
    />
  )
}
