"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { getWrongBank, type WrongQuestionEntry } from "@/lib/mark-lesson-complete"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface GroupedEntries {
  lessonId: string
  entries: WrongQuestionEntry[]
}

export default function MissedPage() {
  const { t } = useLanguage()
  const [bank, setBank] = useState<WrongQuestionEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setBank(getWrongBank())
    setLoaded(true)
  }, [])

  // lessonId 별 group
  const grouped: GroupedEntries[] = []
  const groupMap = new Map<string, WrongQuestionEntry[]>()
  for (const entry of bank) {
    if (entry.mastered) continue
    const arr = groupMap.get(entry.lessonId) ?? []
    arr.push(entry)
    groupMap.set(entry.lessonId, arr)
  }
  for (const [lessonId, entries] of groupMap.entries()) {
    grouped.push({ lessonId, entries })
  }
  // 최근 추가 순
  grouped.sort((a, b) => {
    const aMax = Math.max(...a.entries.map(e => e.addedAt))
    const bMax = Math.max(...b.entries.map(e => e.addedAt))
    return bMax - aMax
  })

  const totalUnmastered = bank.filter(e => !e.mastered).length
  const totalMastered = bank.filter(e => e.mastered).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-amber-50/30">
      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-4 pb-24">
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <Link href="/curriculum" className="rounded-full p-2 hover:bg-rose-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-rose-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-rose-700">
              📚 {t("틀린 문제 창고", "Wrong Question Bank")}
            </h1>
            <p className="text-xs sm:text-sm text-rose-600/70 mt-0.5">
              {t("복습에서 틀린 문제 모음. 다시 풀어 마스터하세요.", "Wrong questions from reviews. Practice to master.")}
            </p>
          </div>
        </div>

        {/* 통계 */}
        {loaded && (totalUnmastered > 0 || totalMastered > 0) && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl border-2 border-rose-200 bg-rose-50 p-3 text-center">
              <p className="text-3xl font-black text-rose-700 tabular-nums">{totalUnmastered}</p>
              <p className="text-xs font-bold text-rose-600 mt-1">{t("남은 문제", "To master")}</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
              <p className="text-3xl font-black text-emerald-700 tabular-nums">{totalMastered}</p>
              <p className="text-xs font-bold text-emerald-600 mt-1">{t("마스터 ✓", "Mastered ✓")}</p>
            </div>
          </div>
        )}

        {/* 빈 상태 */}
        {loaded && grouped.length === 0 && (
          <div className="text-center py-16 px-4">
            <p className="text-6xl mb-4">{totalMastered > 0 ? "🌟" : "✨"}</p>
            <p className="text-xl font-black text-gray-700 mb-2">
              {totalMastered > 0
                ? t("모든 틀린 문제 마스터!", "All mastered!")
                : t("아직 틀린 문제가 없어요", "No wrong questions yet")}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 break-keep">
              {totalMastered > 0
                ? t("복습에서 새로 틀리면 여기에 자동으로 들어와요.", "New wrong answers from reviews appear here.")
                : t("복습 문제를 풀다가 틀린 문제가 있으면 자동으로 여기에 모여요.", "Wrong answers from reviews auto-collect here.")}
            </p>
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm transition-colors"
            >
              {t("← 커리큘럼으로 돌아가기", "← Back to curriculum")}
            </Link>
          </div>
        )}

        {/* lesson 별 group */}
        {loaded && grouped.length > 0 && (
          <div className="flex flex-col gap-3">
            {grouped.map(({ lessonId, entries }) => (
              <div
                key={lessonId}
                className="rounded-2xl border-2 border-rose-200 bg-white shadow-sm p-4"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                      {t("레슨", "Lesson")} {lessonId}
                    </p>
                    <p className="text-base sm:text-lg font-black text-gray-900 mt-0.5">
                      {entries.length}{t("문제 남음", " left")}
                    </p>
                  </div>
                </div>
                {/* 각 문제 chip — 클릭 시 단일 문제 풀이 페이지로 */}
                <div className="flex flex-wrap gap-2">
                  {entries.map((e, i) => (
                    <Link
                      key={`${e.lessonId}-${e.stepIndex}-${i}`}
                      href={`/missed/practice?lesson=${encodeURIComponent(e.lessonId)}&q=${e.stepIndex}`}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black shadow-sm transition-all",
                        "bg-rose-500 hover:bg-rose-600 text-white active:scale-95"
                      )}
                    >
                      <span>Q{e.stepIndex + 1}</span>
                      <span className="opacity-80">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 안내 */}
        {loaded && grouped.length > 0 && (
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs text-amber-700 leading-relaxed break-keep">
              💡 {t("팁: 각 문제 (Q1, Q2 …) 누르면 그 문제 하나만 풀 수 있어요. 맞히면 창고에서 빠져요.", "Tip: Click each question (Q1, Q2 …) to practice it alone. Master to remove.")}
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
