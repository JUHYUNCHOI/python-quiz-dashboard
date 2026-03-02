"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { LogOut, Trophy, Flame, Zap, ShieldCheck, Users, LogIn, Globe, ArrowLeftRight } from "lucide-react"
import Link from "next/link"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"

export default function ProfilePage() {
  const { user, profile, isAuthenticated, isLoading, refreshProfile } = useAuth()
  const { level, totalXp, dailyStreak, xpInCurrentLevel } = useGamification()
  const { t } = useLanguage()
  const [switching, setSwitching] = useState(false)

  const toggleRole = async () => {
    if (!user || switching) return
    setSwitching(true)
    try {
      const supabase = createClient()
      const newRole = profile?.role === "teacher" ? "student" : "teacher"
      await supabase.from("profiles").update({ role: newRole }).eq("id", user.id)
      await refreshProfile()
    } catch {
      // 실패 시 무시
    } finally {
      setSwitching(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-[60px] animate-bounce">🦒</div>
        </div>
        <BottomNav />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
        <Header />
        <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-md mx-auto space-y-4">
          {/* 게스트 통계 (localStorage 기반) */}
          {totalXp > 0 && (
            <Card className="p-4 border-2 border-gray-100">
              <h3 className="font-bold text-gray-700 mb-3 text-sm">{t("내 학습 기록", "My Progress")}</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-orange-50">
                  <Trophy className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-orange-600">Lv.{level}</p>
                  <p className="text-xs text-gray-500">{t("레벨", "Level")}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-purple-50">
                  <Zap className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-600">{totalXp}</p>
                  <p className="text-xs text-gray-500">{t("총 XP", "Total XP")}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-red-50">
                  <Flame className="w-5 h-5 text-red-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-600">{t(`${dailyStreak}일`, `${dailyStreak}d`)}</p>
                  <p className="text-xs text-gray-500">{t("연속 학습", "Streak")}</p>
                </div>
              </div>
            </Card>
          )}

          {/* 언어 설정 */}
          <Card className="p-4 border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">{t("언어", "Language")}</span>
              </div>
              <LanguageToggle className="bg-gray-50" />
            </div>
          </Card>

          {/* 로그인 안내 */}
          <Card className="p-6 text-center">
            <div className="text-[48px] mb-2">🦒</div>
            <h2 className="text-base font-bold text-gray-800 mb-1">{t("로그인하면 기록이 동기화돼요", "Login to sync your progress")}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {t("다른 기기에서도 이어하고,", "Continue on other devices,")}<br />
              {t("선생님 반에 참가할 수 있어요", "and join your teacher's class")}
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
            >
              <LogIn className="w-4 h-4" />
              {t("로그인하기", "Login")}
            </Link>
          </Card>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-md mx-auto space-y-4">
        {/* 프로필 카드 */}
        <Card className="p-6 text-center border-2 border-orange-200">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={t("프로필", "Profile")}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-orange-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-orange-100 flex items-center justify-center text-3xl">
              🦒
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-800">{profile?.display_name || t("학습자", "Learner")}</h2>
          <p className="text-sm text-gray-500 mt-1">{user?.email || ""}</p>
          {profile?.role === "teacher" && (
            <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-purple-100 text-sm font-medium text-purple-700">
              <ShieldCheck className="w-3.5 h-3.5" /> {t("선생님", "Teacher")}
            </span>
          )}
        </Card>

        {/* 통계 카드 */}
        <Card className="p-4 border-2 border-gray-100">
          <h3 className="font-bold text-gray-700 mb-3">{t("학습 통계", "Stats")}</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-orange-50">
              <Trophy className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-orange-600">Lv.{level}</p>
              <p className="text-xs text-gray-500">{xpInCurrentLevel}/100 XP</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-purple-50">
              <Zap className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-600">{totalXp}</p>
              <p className="text-xs text-gray-500">총 XP</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-red-50">
              <Flame className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-red-600">{t(`${dailyStreak}일`, `${dailyStreak}d`)}</p>
              <p className="text-xs text-gray-500">{t("연속 학습", "Streak")}</p>
            </div>
          </div>
        </Card>

        {/* 언어 설정 */}
        <Card className="p-4 border-2 border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">{t("언어", "Language")}</span>
            </div>
            <LanguageToggle className="bg-gray-50" />
          </div>
        </Card>

        {/* 메뉴 */}
        <div className="space-y-2">
          {profile?.role !== "teacher" && (
            <Link href="/join">
              <Card className="p-4 border border-gray-100 hover:border-orange-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-700">{t("반 참가하기", "Join Class")}</span>
                </div>
              </Card>
            </Link>
          )}

          {profile?.role === "teacher" && (
            <Link href="/teacher">
              <Card className="p-4 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-gray-700">{t("선생님 대시보드", "Teacher Dashboard")}</span>
                </div>
              </Card>
            </Link>
          )}

          {/* 역할 전환 */}
          <button onClick={toggleRole} disabled={switching} className="w-full">
            <Card className="p-4 border border-gray-100 hover:border-blue-200 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <ArrowLeftRight className={`w-5 h-5 text-blue-500 ${switching ? "animate-spin" : ""}`} />
                <span className="font-medium text-gray-700">
                  {switching
                    ? t("전환 중...", "Switching...")
                    : profile?.role === "teacher"
                      ? t("학생으로 전환", "Switch to Student")
                      : t("선생님으로 전환", "Switch to Teacher")
                  }
                </span>
              </div>
            </Card>
          </button>
        </div>

        {/* 로그아웃 */}
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 font-medium transition-all"
          >
            <LogOut className="w-4 h-4" />
            {t("로그아웃", "Logout")}
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  )
}
