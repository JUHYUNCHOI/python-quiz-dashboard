"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { RequireAuth } from "@/components/require-auth"
import { StatsCards } from "@/components/stats-cards"
import { ProgressTracker } from "@/components/progress-tracker"
import { PerformanceCharts } from "@/components/performance-charts"
import { WeakAreas } from "@/components/weak-areas"
import { MasteryStats } from "@/components/mastery-stats"
import { useLanguage } from "@/contexts/language-context"
import { getCompletedLessons, pythonParts, cppParts, getLessonName } from "@/lib/curriculum-data"
import { ChevronRight, BookOpen } from "lucide-react"

export default function ProgressPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const { t, lang } = useLanguage()
  const router = useRouter()
  const [nextLesson, setNextLesson] = useState<{ id: string | number; label: string } | null>(null)

  // 다음 학습할 레슨 찾기 (완료한 레슨 다음 레슨)
  useEffect(() => {
    const completed = getCompletedLessons()
    const allParts = [...pythonParts, ...cppParts]
    // 퀴즈 레슨(p1, p2..., cpp-p1, cpp-p2...) 제외
    const isQuizLesson = (id: string) => /^p\d/.test(id) || /^cpp-p\d/.test(id)

    let found: { id: string | number; label: string } | null = null
    outer: for (const part of allParts) {
      for (let i = 0; i < part.lessonIds.length; i++) {
        const id = part.lessonIds[i]
        const idStr = String(id)
        if (!completed.has(id) && !completed.has(idStr) && !isQuizLesson(idStr)) {
          found = { id, label: getLessonName(id, lang) }
          break outer
        }
      }
    }
    if (found) setNextLesson(found)
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleContinue = () => {
    if (!nextLesson) {
      router.push("/curriculum")
      return
    }
    const id = nextLesson.id
    const isCpp = String(id).startsWith("cpp-")
    if (isCpp) {
      router.push(`/learn/cpp/${String(id).replace("cpp-", "")}`)
    } else {
      router.push(`/learn/${id}`)
    }
  }

  return (
    <RequireAuth>
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-mint-50 to-lavender-50">
      <Header />

      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">{t("내 진도", "My Progress")}</h1>

        {/* Hero Stats */}
        <StatsCards />

        {/* 계속 학습 CTA — research #1 priority */}
        <button
          onClick={handleContinue}
          className="mt-4 w-full flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl px-5 py-4 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-indigo-200" />
            <div className="text-left">
              <p className="text-xs text-indigo-200 font-medium">{t("이어서 학습하기", "Continue Learning")}</p>
              <p className="text-sm font-bold">
                {nextLesson
                  ? nextLesson.label
                  : t("커리큘럼 보기", "View Curriculum")}
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-indigo-300" />
        </button>

        {/* Mastery + Charts 2-column */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Left: Mastery + Progress Tracker */}
          <div className="space-y-6 md:col-span-1">
            <MasteryStats />
            <ProgressTracker onTopicSelect={setSelectedTopic} />
          </div>

          {/* Right: Accuracy trend + Heatmap */}
          <div className="md:col-span-1 xl:col-span-2">
            <PerformanceCharts selectedTopic={selectedTopic} />
          </div>
        </div>

        {/* Growth Points (formerly weak areas) */}
        <div className="mt-6">
          <WeakAreas />
        </div>
      </main>

      <BottomNav />
    </div>
    </RequireAuth>
  )
}
