"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useNavItems, isNavActive } from "./use-nav"

// 모바일 전용 하단 탭바. 데스크탑(lg+)에서는 숨기고 DesktopSidebar 가 대신 보임.
export function BottomNav() {
  const pathname = usePathname()
  const navItems = useNavItems()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 backdrop-blur-sm z-50 safe-area-inset-bottom">
      <div className="container mx-auto flex justify-around px-2 py-2 md:py-3 max-w-2xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = isNavActive(item, pathname)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors rounded-lg px-1.5 py-2 min-w-[44px] min-h-[56px]",
                isActive ? "text-orange-600 bg-orange-50" : "text-gray-500 hover:text-orange-500 hover:bg-orange-50/50",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
