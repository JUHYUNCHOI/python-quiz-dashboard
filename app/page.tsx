"use client"

import { GiraffeHero } from "@/components/giraffe-hero"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Trophy, Flame, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useGamification } from "@/hooks/use-gamification"

export default function DashboardPage() {
  const { t } = useLanguage()
  const { level, totalXp, dailyStreak, sessionsToday } = useGamification()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-2xl mx-auto space-y-5">

        {/* 상단: 기린 히어로 */}
        <GiraffeHero />

        {/* 오늘의 통계 */}
        <Card className="p-4 border-2 border-gray-100">
          <h3 className="font-bold text-gray-700 mb-3 text-sm">{t("오늘의 학습", "Today's Progress")}</h3>
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
          {sessionsToday > 0 && (
            <p className="text-xs text-center text-gray-400 mt-2">
              {t(`오늘 ${sessionsToday}번 학습했어요!`, `${sessionsToday} session${sessionsToday > 1 ? 's' : ''} today!`)}
            </p>
          )}
        </Card>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/curriculum" className="block active:scale-[0.97] transition-transform">
            <Card className="p-5 border-2 border-green-200 hover:border-green-400 active:border-green-500 active:bg-green-50 transition-all hover:shadow-md min-h-[120px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <span className="font-bold text-sm text-gray-700">{t("수업하기", "Lessons")}</span>
                <span className="text-xs text-gray-400">{t("커리큘럼 따라 배우기", "Learn with curriculum")}</span>
              </div>
            </Card>
          </Link>
          <Link href="/quiz/setup" className="block active:scale-[0.97] transition-transform">
            <Card className="p-5 border-2 border-purple-200 hover:border-purple-400 active:border-purple-500 active:bg-purple-50 transition-all hover:shadow-md min-h-[120px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <span className="font-bold text-sm text-gray-700">{t("퀴즈 풀기", "Take Quiz")}</span>
                <span className="text-xs text-gray-400">{t("실력을 테스트해요", "Test your skills")}</span>
              </div>
            </Card>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
