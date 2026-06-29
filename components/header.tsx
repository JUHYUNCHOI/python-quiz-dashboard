"use client"

import { useEffect, useState } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { Trophy, Flame, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import { useLanguage } from "@/contexts/language-context"
import { getWrongBank, syncWrongBankFromSupabase } from "@/lib/mark-lesson-complete"
import { useEffectiveIsTeacher } from "@/lib/effective-role"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const { profile, isAuthenticated, isLoading } = useAuth()
  const { level, dailyStreak } = useGamification()
  const { lang, t } = useLanguage()
  const pathname = usePathname()
  const isTeacher = useEffectiveIsTeacher()

  // 창고 카운트 — 어디서든 자기 틀린 문제 빠른 접근
  const [bankRemaining, setBankRemaining] = useState(0)
  useEffect(() => {
    if (!isAuthenticated) return
    // localStorage 즉시 read
    const local = getWrongBank()
    setBankRemaining(local.filter(e => !e.mastered).length)
    // pathname 변경 시 (페이지 이동 마다) 다시 read
  }, [isAuthenticated, pathname])

  // Supabase 동기화 — 로그인 시 한 번만 (전체 페이지 대상)
  useEffect(() => {
    if (!isAuthenticated) return
    syncWrongBankFromSupabase().then(synced => {
      setBankRemaining(synced.filter(e => !e.mastered).length)
    })
  }, [isAuthenticated])

  const displayName = profile?.display_name || t("학습자", "Learner")

  // /quest/[problemId] 안에서는 글로벌 언어 토글 숨김.
  // 161 문제 App 들이 lang 변경 시 step 0 으로 리셋되어 학생 진행 사라짐.
  // 학생이 문제 들어가기 전에 언어 정해두는 것을 강제.
  const isInQuestProblem = /^\/quest\/[^/]+/.test(pathname || "")

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* 데스크탑·패드(md+)에서는 좌측 사이드바에 로고가 있으므로 헤더 브랜드는 숨김 */}
        <Link href="/" className="flex items-center gap-2 md:hidden">
          <div className="text-2xl md:text-3xl">🦒</div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-gray-800">{t("코드린", "Coderin")}</h1>
            {isAuthenticated && <p className="text-xs md:text-sm text-gray-600">{displayName}{t("님", "")}</p>}
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* 언어 선택 탭 — 공용 컴포넌트로 통일. /quest/[problemId] 에서는 숨김 (App 리셋 방지) */}
          {!isInQuestProblem && <LanguageToggle />}

          {!isLoading && !isAuthenticated ? (
            <Link
              href={`/login?returnTo=${encodeURIComponent(pathname)}`}
              className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-2 min-h-[44px] hover:bg-orange-200 transition-colors"
            >
              <LogIn className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">{t("로그인", "Login")}</span>
            </Link>
          ) : (
            <>
              {/* 선생님 모드 인디케이터 — 학생/선생님 상태 명확히 보이게 */}
              {isTeacher && (
                <div
                  className="flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-2 min-h-[44px]"
                  title={t("선생님 모드 — 어디든 접근 가능, 문제 안 풀고도 다음 가능", "Teacher mode — full access, can advance without solving")}
                >
                  <span className="text-base leading-none">👨‍🏫</span>
                  <span className="text-sm font-bold text-amber-800">{t("선생님", "Teacher")}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-2 min-h-[44px]">
                <Trophy className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">Lv.{level}</span>
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-2 min-h-[44px]">
                <Flame className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700">{dailyStreak}{t("일", "d")}</span>
              </div>

              {/* 창고 — 0 이면 회색 (발견용), 있으면 빨강 + 카운트 */}
              <Link
                href="/missed"
                title={bankRemaining > 0
                  ? t(`틀린 문제 ${bankRemaining}개 — 클릭해서 풀기`, `${bankRemaining} wrong — click to practice`)
                  : t("틀린 문제 창고 (지금은 비어있어요)", "Wrong question bank (empty)")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 min-h-[44px] transition-colors",
                  bankRemaining > 0
                    ? "bg-rose-100 hover:bg-rose-200"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                <span className="text-base">📚</span>
                {bankRemaining > 0 ? (
                  <span className="text-sm font-semibold text-rose-700">{bankRemaining}</span>
                ) : (
                  <span className="text-xs font-medium text-gray-500 hidden sm:inline">{t("창고", "Bank")}</span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
