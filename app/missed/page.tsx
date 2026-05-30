"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { getWrongBank, markWrongQuestionMastered, markLearnWrongMastered, syncWrongBankFromSupabase, type WrongQuestionEntry } from "@/lib/mark-lesson-complete"
import { lessonsData } from "../review/[lessonId]/data/lessons"
import type { StepContent, LessonData } from "../review/[lessonId]/data/types"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// review client-page 의 extractReviewSteps + getStepPreview 재사용용 (간소화 버전)
function extractStepsForLesson(lesson: LessonData): StepContent[] {
  const out: StepContent[] = []
  for (const step of lesson.steps) {
    if (step.type === "chapter") continue
    if (
      step.type === "quiz" ||
      step.type === "errorQuiz" ||
      step.type === "practice" ||
      step.type === "interleaving" ||
      (step.type === "explain" && step.content.predict)
    ) out.push(step)
  }
  return out
}
function previewOfStep(step: StepContent | undefined, isEn: boolean): string {
  if (!step) return ""
  switch (step.type) {
    case "quiz":
    case "errorQuiz":
      return (isEn && step.content.en?.question) ? step.content.en.question : step.content.question
    case "practice":
    case "interleaving":
      return (isEn && step.content.en?.task) ? step.content.en.task : step.content.task
    case "explain":
      return (isEn && step.content.en?.predict?.question)
        ? step.content.en.predict.question
        : (step.content.predict?.question ?? "")
    default:
      return ""
  }
}

interface GroupedEntries {
  lessonId: string
  entries: WrongQuestionEntry[]
}

export default function MissedPage() {
  const { t, lang } = useLanguage()
  const isEn = lang === "en"
  const sz = (kr: string, en: string) => isEn ? en : kr
  const [bank, setBank] = useState<WrongQuestionEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // 1) localStorage 즉시 표시 (빠른 paint)
    setBank(getWrongBank())
    setLoaded(true)
    // 2) Supabase 동기화 백그라운드 — 다른 기기에서 추가/마스터한 항목 merge
    syncWrongBankFromSupabase().then(synced => {
      setBank(synced)
    })
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
              <p className={cn("font-bold text-rose-600 mt-1", sz("text-xs", "text-sm"))}>{t("남은 문제", "To master")}</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
              <p className="text-3xl font-black text-emerald-700 tabular-nums">{totalMastered}</p>
              <p className={cn("font-bold text-emerald-600 mt-1", sz("text-xs", "text-sm"))}>{t("마스터 ✓", "Mastered ✓")}</p>
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
                    <p className={cn("font-bold text-rose-500 uppercase tracking-widest", sz("text-xs", "text-sm"))}>
                      {t("레슨", "Lesson")} {lessonId}
                    </p>
                    {(() => {
                      const lesson = lessonsData[lessonId]
                      const title = lesson ? (lang === "en" && lesson.titleEn ? lesson.titleEn : lesson.title) : null
                      return (
                        <>
                          {title && (
                            <p className="text-sm sm:text-base font-black text-gray-900 mt-0.5 break-keep">
                              {title}
                            </p>
                          )}
                          <p className="text-xs sm:text-sm font-bold text-rose-700 mt-0.5">
                            {entries.length}{t("문제 남음", " left")}
                          </p>
                        </>
                      )
                    })()}
                  </div>
                </div>
                {/* 각 문제 chip + 제거 버튼 — 풀어보기 또는 수동 제거 */}
                {(() => {
                  const lesson = lessonsData[lessonId]
                  const steps = lesson ? extractStepsForLesson(lesson) : []
                  const handleDismiss = (e: WrongQuestionEntry) => {
                    if (window.confirm(t("이 문제를 창고에서 제거할까요?", "Remove this question from the bank?"))) {
                      if (e.source === "learn" && e.stepId) {
                        markLearnWrongMastered(e.lessonId, e.stepId)
                      } else {
                        markWrongQuestionMastered(e.lessonId, e.stepIndex)
                      }
                      setBank(getWrongBank())
                    }
                  }
                  return (
                    <div className="flex flex-wrap gap-2">
                      {entries.map((e, i) => {
                        const isLearn = e.source === "learn"
                        // learn-source: 수업 페이지로 deep link (stepId 전달). review-source: /missed/practice
                        const href = isLearn
                          ? `/learn/${encodeURIComponent(e.lessonId)}?stepId=${encodeURIComponent(e.stepId ?? "")}`
                          : `/missed/practice?lesson=${encodeURIComponent(e.lessonId)}&q=${e.stepIndex}`
                        const preview = isLearn
                          ? (e.stepId ?? "")
                          : previewOfStep(steps[e.stepIndex], lang === "en")
                        const previewShort = preview.length > 80 ? preview.slice(0, 80) + "…" : preview
                        const label = isLearn
                          ? `📝 ${t("수업", "Lesson")}`
                          : `Q${e.stepIndex + 1}`
                        // learn-source 는 살짝 다른 색 (보라) — 수업 문제 구분
                        const bg = isLearn
                          ? "bg-purple-500 hover:bg-purple-600"
                          : "bg-rose-500 hover:bg-rose-600"
                        const bgDim = isLearn ? "bg-purple-400 hover:bg-purple-600 border-purple-300" : "bg-rose-400 hover:bg-rose-600 border-rose-300"
                        return (
                          <div key={`${e.lessonId}-${e.stepId ?? e.stepIndex}-${i}`} className="inline-flex items-stretch rounded-lg overflow-hidden shadow-sm">
                            <Link
                              href={href}
                              title={previewShort || label}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-black transition-all",
                                bg,
                                "text-white active:scale-95 min-w-[60px] justify-center"
                              )}
                            >
                              <span>{label}</span>
                              {/* streak 진행 표시 — 1번 맞은 상태 (마스터 직전) */}
                              {!isLearn && (e.correctStreak ?? 0) >= 1 && (
                                <span className="text-[10px] bg-white/30 rounded px-1 font-bold">
                                  {e.correctStreak}/2
                                </span>
                              )}
                              <span className="opacity-80">→</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDismiss(e)}
                              title={t("창고서 제거 (안 풀고)", "Remove (without solving)")}
                              className={cn("px-2.5 py-2.5 text-white border-l active:scale-95 transition-all text-xs font-black", bgDim)}
                            >
                              ✕
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            ))}
          </div>
        )}

        {/* 안내 */}
        {loaded && grouped.length > 0 && (
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs text-amber-700 leading-relaxed break-keep">
              💡 {t("마스터 기준: 두 번 연속 정답 + 24시간 간격 (우연/암기 방지). 또는 ✕ 클릭 — 이미 안다고 자기 선언.", "Mastery: 2 correct in a row + 24h gap (anti-luck/cramming). Or ✕ — declare you know it.")}
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
