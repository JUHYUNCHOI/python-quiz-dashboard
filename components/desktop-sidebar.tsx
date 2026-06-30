"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Flame, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavItems, isNavActive } from "./use-nav"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"

// 데스크탑(md+) 전용 좌측 사이드바. 모바일에서는 숨기고 BottomNav(하단 탭바)가 대신 보임.
// 루트 레이아웃에서 한 번 렌더 → 모든 페이지에 적용 (페이지별 수정 없음).
// 데스크탑에서는 글로벌 헤더를 숨기므로(빈 바 겹침 방지) 언어/로그인/레벨을 모두 여기서 담는다.
export function DesktopSidebar() {
  const pathname = usePathname()
  const navItems = useNavItems()
  const { isAuthenticated, isLoading } = useAuth()
  const { level, dailyStreak } = useGamification()
  const { t } = useLanguage()

  // /quest/[problemId] 안에서는 글로벌 언어 토글 숨김 (App 리셋 방지 — 헤더와 동일 규칙)
  const isInQuestProblem = /^\/quest\/[^/]+/.test(pathname || "")

  return (
    <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-60 flex-col border-r border-gray-200 bg-white z-50">
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

      {/* 하단: 언어 · (로그인 / 레벨·불꽃·창고) — 글로벌 헤더에서 옮겨옴 */}
      <div className="shrink-0 border-t border-gray-100 px-3 py-3 space-y-2.5">
        {!isInQuestProblem && (
          <div className="flex justify-start">
            <LanguageToggle />
          </div>
        )}

        {!isLoading && !isAuthenticated && (
          <Link
            href={`/login?returnTo=${encodeURIComponent(pathname || "/")}`}
            className="flex items-center gap-2 rounded-xl bg-orange-100 px-3 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-200 transition-colors"
          >
            <LogIn className="h-4 w-4" /> {t("로그인", "Login")}
          </Link>
        )}

        {isAuthenticated && (
          <>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-1.5 text-xs font-semibold text-orange-700">
                <Trophy className="h-3.5 w-3.5" /> Lv.{level}
              </span>
              {dailyStreak > 0 && (
                <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1.5 text-xs font-semibold text-red-700">
                  <Flame className="h-3.5 w-3.5" /> {dailyStreak}{t("일", "d")}
                </span>
              )}
            </div>
            <Link
              href="/missed"
              className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <span className="text-base">📚</span> {t("틀린 문제 창고", "Wrong-question bank")}
            </Link>
          </>
        )}
      </div>
    </aside>
  )
}
