"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useNavItems, isNavActive } from "./use-nav"

// 데스크탑(lg+) 전용 좌측 사이드바. 모바일에서는 숨기고 BottomNav(하단 탭바)가 대신 보임.
// 루트 레이아웃에서 한 번 렌더 → 모든 페이지에 적용 (페이지별 수정 없음).
export function DesktopSidebar() {
  const pathname = usePathname()
  const navItems = useNavItems()

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-60 flex-col border-r border-gray-200 bg-white z-50">
      <Link href="/" className="flex items-center gap-2 px-5 h-16 shrink-0 border-b border-gray-100">
        <span className="text-2xl">🦒</span>
        <span className="text-lg font-extrabold text-gray-900">Coderin</span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = isNavActive(item, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/60",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
