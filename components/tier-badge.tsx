"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useTier } from "@/hooks/use-tier"
import { tierInfo, tierLabel } from "@/lib/tier-system"

/**
 * 헤더·사이드바에 서는 티어 칩 — 예전 `Lv.N` 배지 자리.
 *
 * 학생에게 보이는 실력 지표는 **티어 하나**다. `level`(8~99) 은 문제를 정렬하는
 * 내부 키일 뿐이라 화면에 뜨면 "레벨 올리기"가 목표가 되어 버린다.
 * (근거: `lib/tier-system.ts` 머리말)
 *
 * 세 곳(모바일 헤더 / 데스크탑 사이드바 / 진행 통계)이 같은 칩을 쓰므로
 * 티어를 읽어오는 로직을 여기 한 번만 둔다.
 *
 * `compact` — 라벨을 `sm` 미만에서 숨기고 아이콘만 남긴다. 모바일 헤더(375px)는
 * 로고·언어토글·불꽃·창고까지 한 줄에 들어가는데, 티어 이름은 예전 `Lv.125` 보다
 * 넓어서(「그랜드마스터」/「Grandmaster」) 그대로 두면 창고 버튼이 화면 밖으로 밀린다.
 * 같은 헤더의 `📚 창고` 라벨이 이미 쓰는 방식이다.
 */
export function TierBadge({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { t, lang } = useLanguage()
  const { tier, loaded } = useTier()

  const base = "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors"
  const label = cn("whitespace-nowrap", compact && "hidden sm:inline")

  if (!loaded) return <div className={cn(base, "invisible", className)}>—</div>

  if (!tier) {
    return (
      <Link
        href="/tier/placement"
        title={t("배치고사를 보면 티어가 정해져요", "Take the placement test to get your tier")}
        className={cn(base, "bg-gray-100 text-gray-500 hover:bg-gray-200", className)}
      >
        <span className="leading-none">🎯</span>
        <span className={label}>{t("언랭", "Unranked")}</span>
      </Link>
    )
  }

  const info = tierInfo(tier)
  return (
    <Link
      href="/tier"
      title={tierLabel(tier, lang)}
      className={cn(base, "hover:opacity-90", className)}
      style={{ backgroundColor: info.color, color: info.ink }}
    >
      <span className="leading-none">{info.emoji}</span>
      <span className={label}>{tierLabel(tier, lang)}</span>
    </Link>
  )
}
