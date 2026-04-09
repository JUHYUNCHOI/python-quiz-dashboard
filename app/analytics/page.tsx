"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { OverviewCards } from "@/components/analytics/overview-cards"
import { BarChart2 } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()

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

      <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">{t("학습 통계", "Learning Stats")}</h1>
          <p className="mt-2 text-slate-600">{t("나의 학습 현황을 한눈에", "Your learning overview at a glance")}</p>
        </div>

        {/* Overview Cards — real data */}
        <OverviewCards />

        {/* Progress page shortcut */}
        <div className="mt-6">
          <Link
            href="/progress"
            className="flex items-center gap-3 w-full bg-white rounded-2xl border border-blue-100 shadow-sm p-4 hover:bg-blue-50 transition-colors"
          >
            <BarChart2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800">{t("상세 진도 보기", "View Detailed Progress")}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t("레슨 진도, 정확도 차트, 약점 분석", "Lesson progress, accuracy chart, weak areas")}</p>
            </div>
            <span className="text-slate-400">→</span>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
