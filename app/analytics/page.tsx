"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { OverviewCards } from "@/components/analytics/overview-cards"
import { DailyActivityTimeline } from "@/components/analytics/daily-activity-timeline"
import { WeeklySummary } from "@/components/analytics/weekly-summary"
import { EngagementRedFlags } from "@/components/analytics/engagement-red-flags"
import { HonestLearningIndicators } from "@/components/analytics/honest-learning-indicators"
import { AchievementsMilestones } from "@/components/analytics/achievements-milestones"
import { AnalyticsSettings } from "@/components/analytics/analytics-settings"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  const [showSettings, setShowSettings] = useState(false)
  const { profile, isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()
  const displayName = profile?.display_name || t("학습자", "Learner")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-5xl animate-bounce">🦒</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t("로그인이 필요해요", "Login Required")}</h2>
          <p className="text-slate-500 mb-6">{t("학습 분석을 보려면 먼저 로그인해주세요.", "Please login to view your learning analytics.")}</p>
          <a href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            {t("로그인하기", "Login")}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      {/* 학습 페이지: max-w-[1300px] + 중앙 정렬 */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{t("학습 분석 대시보드", "Learning Analytics")}</h1>
            <p className="mt-2 text-slate-600">{t(`${displayName}님의 학습 패턴과 성장을 확인하세요`, `${displayName}'s learning patterns and progress`)}</p>
          </div>
          <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="lg" className="gap-2">
            <Settings className="h-5 w-5" />
            {t("설정", "Settings")}
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-8">
            <AnalyticsSettings onClose={() => setShowSettings(false)} />
          </div>
        )}

        {/* Overview Cards */}
        <OverviewCards />

        {/* Daily Activity Timeline */}
        <div className="mt-8">
          <DailyActivityTimeline />
        </div>

        {/* Weekly Summary */}
        <div className="mt-8">
          <WeeklySummary />
        </div>

        {/* Engagement Red Flags */}
        <div className="mt-8">
          <EngagementRedFlags />
        </div>

        {/* Honest Learning Indicators */}
        <div className="mt-8">
          <HonestLearningIndicators />
        </div>

        {/* Achievements & Milestones */}
        <div className="mt-8">
          <AchievementsMilestones />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
