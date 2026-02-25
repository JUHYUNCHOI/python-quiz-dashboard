"use client"

import { Trophy, Flame, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import Link from "next/link"

export function Header() {
  const { profile, isAuthenticated, isLoading } = useAuth()
  const { level, dailyStreak } = useGamification()

  const displayName = profile?.display_name || "학습자"

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl md:text-3xl">🦒</div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-gray-800">기린 퀴즈</h1>
            <p className="text-xs md:text-sm text-gray-600">{displayName}님</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {!isLoading && !isAuthenticated ? (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-2 min-h-[44px] hover:bg-orange-200 transition-colors"
            >
              <LogIn className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">로그인</span>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-2 min-h-[44px]">
                <Trophy className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">Lv.{level}</span>
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-2 min-h-[44px]">
                <Flame className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700">{dailyStreak}일</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
