"use client"

import { useState } from "react"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header studentName="지민" level={5} />

      {/* 학습 페이지: max-w-[1300px] + 중앙 정렬 */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">학습 분석 대시보드</h1>
            <p className="mt-2 text-slate-600">지민님의 학습 패턴과 성장을 확인하세요</p>
          </div>
          <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="lg" className="gap-2">
            <Settings className="h-5 w-5" />
            설정
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
