"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useGamification } from "@/hooks/use-gamification"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { LogOut, Trophy, Flame, Zap, ShieldCheck, Users, LogIn, Globe } from "lucide-react"
import Link from "next/link"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"

export default function ProfilePage() {
  const { user, profile, isAuthenticated, isLoading, refreshProfile } = useAuth()
  const { level, totalXp, dailyStreak, xpInCurrentLevel } = useGamification()
  const { t } = useLanguage()
  // undefined = 로딩, null = 반 없음
  const [myClass, setMyClass] = useState<{ id: string; name: string } | null | undefined>(undefined)
  const [leavingClass, setLeavingClass] = useState(false)

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from("class_members")
      .select("class_id, classes(id, name)")
      .eq("student_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        const cls = data?.classes
        if (cls && !Array.isArray(cls)) {
          const c = cls as { id: string; name: string }
          setMyClass({ id: c.id, name: c.name })
        } else {
          setMyClass(null)
        }
      })
  }, [user])

  const handleLeaveClass = async () => {
    if (!user || !myClass) return
    if (!window.confirm(t(`'${myClass.name}' 반을 탈퇴할까요?`, `Leave class '${myClass.name}'?`))) return
    setLeavingClass(true)
    const supabase = createClient()
    await supabase.from("class_members").delete().eq("student_id", user.id).eq("class_id", myClass.id)
    setMyClass(null)
    setLeavingClass(false)
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

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-[1000px] mx-auto">
        <div className="lg:flex lg:gap-8 lg:items-start">
        {/* ── 왼쪽: 프로필 + 통계 ── */}
        <div className="lg:w-72 lg:flex-shrink-0 space-y-4 mb-4 lg:mb-0">
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
              <p className="text-xs text-gray-500">{t("총 XP", "Total XP")}</p>
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

        </div>

        {/* ── 오른쪽: 메뉴 ── */}
        <div className="lg:flex-1 space-y-4">
        {/* 메뉴 */}
        <div className="space-y-2">
          {profile?.role !== "teacher" && (
            <>
              <Link href="/analytics">
                <Card className="p-4 border border-gray-100 hover:border-blue-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span className="font-medium text-gray-700">{t("학습 분석", "Learning Analytics")}</span>
                  </div>
                </Card>
              </Link>
              <Link href="/progress">
                <Card className="p-4 border border-gray-100 hover:border-green-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📈</span>
                    <span className="font-medium text-gray-700">{t("학습 진도", "Learning Progress")}</span>
                  </div>
                </Card>
              </Link>
              {/* 현재 반 + 탈퇴 */}
              {myClass ? (
                <Card className="p-4 border border-orange-200 bg-orange-50/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-400">{t("현재 반", "Current Class")}</p>
                        <p className="font-bold text-gray-800">{myClass.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLeaveClass}
                      disabled={leavingClass}
                      className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                    >
                      {leavingClass ? t("처리 중...", "Leaving...") : t("탈퇴", "Leave")}
                    </button>
                  </div>
                </Card>
              ) : (
                <Link href="/join">
                  <Card className="p-4 border border-gray-100 hover:border-orange-200 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span className="font-medium text-gray-700">{t("반 참가하기", "Join Class")}</span>
                    </div>
                  </Card>
                </Link>
              )}
              <Link href="/teacher/register">
                <Card className="p-4 border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <span className="font-medium text-gray-700">{t("선생님으로 전환하기", "Switch to Teacher")}</span>
                  </div>
                </Card>
              </Link>
            </>
          )}

          {profile?.role === "teacher" && (
            <>
              <Card className={`p-5 border-2 ${
                typeof window !== "undefined" && localStorage.getItem("teacher-as-student") === "true"
                  ? "border-blue-200 bg-blue-50/50"
                  : "border-purple-200 bg-purple-50/50"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-gray-700">{t("수업 모드", "Lesson Mode")}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {typeof window !== "undefined" && localStorage.getItem("teacher-as-student") === "true"
                    ? t("현재 학생 모드: 진도가 저장되고, 퀴즈를 풀어야 넘어갈 수 있어요", "Student mode: progress saved, must solve quizzes")
                    : t("현재 선생님 모드: 자유롭게 이동 가능, 진도 저장 안 됨", "Teacher mode: free navigation, progress not saved")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem("teacher-as-student", "false")
                      window.location.reload()
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                      typeof window !== "undefined" && localStorage.getItem("teacher-as-student") !== "true"
                        ? "bg-purple-600 text-white shadow-md ring-2 ring-purple-300"
                        : "bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50"
                    }`}
                  >
                    👨‍🏫 {t("선생님 모드", "Teacher")}
                  </button>
                  <button
                    onClick={() => {
                      localStorage.setItem("teacher-as-student", "true")
                      window.location.reload()
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                      typeof window !== "undefined" && localStorage.getItem("teacher-as-student") === "true"
                        ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-300"
                        : "bg-white text-blue-600 border-2 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    👨‍🎓 {t("학생 모드", "Student")}
                  </button>
                </div>
              </Card>
              <Link href="/teacher">
                <Card className="p-4 border border-gray-100 hover:border-purple-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-700">{t("선생님 대시보드", "Teacher Dashboard")}</span>
                  </div>
                </Card>
              </Link>
            </>
          )}

        </div>
        </div>
        </div>

        {/* 로그아웃 */}
        <button
          onClick={async () => {
            const supabase = createClient()
            await supabase.auth.signOut()
            window.location.href = "/login"
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 font-medium transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t("로그아웃", "Logout")}
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
