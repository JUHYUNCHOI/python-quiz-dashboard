"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { StatsCards } from "@/components/stats-cards"
import { ProgressTracker } from "@/components/progress-tracker"
import { PerformanceCharts } from "@/components/performance-charts"
import { WeakAreas } from "@/components/weak-areas"
import { useLanguage } from "@/contexts/language-context"

export default function ProgressPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-mint-50 to-lavender-50">
      <Header />

      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">{t("내 진도", "My Progress")}</h1>

        {/* Header Stats */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Left Column - Progress Tracker */}
          <div className="md:col-span-1">
            <ProgressTracker onTopicSelect={setSelectedTopic} />
          </div>

          {/* Right Column - Performance Charts + Heatmap */}
          <div className="md:col-span-1 xl:col-span-2">
            <PerformanceCharts selectedTopic={selectedTopic} />
          </div>
        </div>

        {/* Weak Areas Section */}
        <div className="mt-8">
          <WeakAreas />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
