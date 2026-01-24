"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { StatsCards } from "@/components/stats-cards"
import { ProgressTracker } from "@/components/progress-tracker"
import { PerformanceCharts } from "@/components/performance-charts"
import { WeakAreas } from "@/components/weak-areas"
import { AchievementsPanel } from "@/components/achievements-panel"

export default function ProgressPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-mint-50 to-lavender-50">
      <Header studentName="지민" level={5} />

      {/* 학습 페이지: max-w-[1300px] + 중앙 정렬 */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6">
        {/* Header Stats */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Left Column - Progress Tracker */}
          <div className="md:col-span-1">
            <ProgressTracker onTopicSelect={setSelectedTopic} />
          </div>

          {/* Right Column - Performance Charts */}
          <div className="md:col-span-1 xl:col-span-2">
            <PerformanceCharts selectedTopic={selectedTopic} />
          </div>
        </div>

        {/* Weak Areas Section */}
        <div className="mt-8">
          <WeakAreas />
        </div>

        {/* Achievements Panel */}
        <div className="mt-8">
          <AchievementsPanel />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
