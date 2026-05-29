"use client"

import { useEffect, useState, useRef, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { ReviewStepRenderer } from "../../review/[lessonId]/ReviewStepRenderer"
import { lessonsData } from "../../review/[lessonId]/data/lessons"
import type { StepContent, LessonData } from "../../review/[lessonId]/data/types"
import { markWrongQuestionMastered, getWrongBank } from "@/lib/mark-lesson-complete"
import { useGamification } from "@/hooks/use-gamification"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewStep {
  step: StepContent
  originalIndex: number
  chapterTitle?: string
  chapterTitleEn?: string
}

// (review client-page 에서 복붙 — 작은 helper)
function extractReviewSteps(lesson: LessonData): ReviewStep[] {
  const result: ReviewStep[] = []
  let currentChapterTitle: string | undefined
  let currentChapterTitleEn: string | undefined
  for (let i = 0; i < lesson.steps.length; i++) {
    const step = lesson.steps[i]
    if (step.type === "chapter") {
      currentChapterTitle = step.content.title
      currentChapterTitleEn = step.content.en?.title
    } else if (
      step.type === "quiz" ||
      step.type === "errorQuiz" ||
      step.type === "practice" ||
      step.type === "interleaving" ||
      (step.type === "explain" && step.content.predict)
    ) {
      result.push({ step, originalIndex: i, chapterTitle: currentChapterTitle, chapterTitleEn: currentChapterTitleEn })
    }
  }
  return result
}

function PracticeInner() {
  const { t, lang } = useLanguage()
  const isEn = lang === "en"
  const router = useRouter()
  const searchParams = useSearchParams()

  const lessonId = searchParams.get("lesson") || ""
  const stepIndex = parseInt(searchParams.get("q") || "0", 10)

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle")
  const [resetCount, setResetCount] = useState(0)
  const [nextEntry, setNextEntry] = useState<{ lessonId: string; stepIndex: number } | null>(null)
  const autoCheckRef = useRef<(() => boolean) | null>(null)
  const { addDirectXp } = useGamification()

  const lesson = lessonsData[lessonId]
  const reviewSteps = lesson ? extractReviewSteps(lesson) : []
  const targetStep = reviewSteps[stepIndex]
  const language: "python" | "cpp" = lesson?.language ?? (/^\d+$/.test(lessonId) ? "python" : "cpp")

  // 다음 unmastered 문제 찾기 (현재 마스터 직후 호출용)
  useEffect(() => {
    if (status !== "correct") return
    const bank = getWrongBank()
    const remaining = bank.filter(e =>
      !e.mastered && !(e.lessonId === lessonId && e.stepIndex === stepIndex)
    )
    if (remaining.length > 0) {
      // 같은 lesson 안에 다음 문제 우선, 없으면 다른 lesson 의 첫 문제
      const sameLesson = remaining
        .filter(e => e.lessonId === lessonId)
        .sort((a, b) => a.stepIndex - b.stepIndex)[0]
      const other = remaining[0]
      setNextEntry(sameLesson ?? other)
    } else {
      setNextEntry(null)
    }
  }, [status, lessonId, stepIndex])

  const handleCorrect = useCallback(() => {
    setStatus("correct")
    // 창고에서 마스터 처리 + XP 보상 (+15 XP per master)
    markWrongQuestionMastered(lessonId, stepIndex)
    addDirectXp(15)
  }, [lessonId, stepIndex, addDirectXp])

  const handleWrong = useCallback(() => {
    setStatus("wrong")
  }, [])

  const handleRetry = useCallback(() => {
    setStatus("idle")
    setResetCount(c => c + 1)
  }, [])

  // lesson 또는 step 없음 처리
  if (!lesson || !targetStep) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-2xl mx-auto px-4 pt-8 pb-24 text-center">
          <p className="text-5xl mb-4">🤔</p>
          <p className="text-xl font-black text-gray-800 mb-2">
            {t("문제를 찾을 수 없어요", "Question not found")}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {t(`레슨: ${lessonId} · 문제 #${stepIndex + 1}`, `Lesson: ${lessonId} · Q#${stepIndex + 1}`)}
          </p>
          <Link href="/missed" className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm transition-colors">
            ← {t("문제 창고로", "Back to Bank")}
          </Link>
        </main>
      </div>
    )
  }

  const chapterTitle = isEn && targetStep.chapterTitleEn ? targetStep.chapterTitleEn : targetStep.chapterTitle
  const lessonTitle = isEn && lesson.titleEn ? lesson.titleEn : lesson.title

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-white to-amber-50/20">
      <Header />

      <main className="max-w-2xl mx-auto px-4 pt-3 pb-32">
        {/* 상단 헤더 */}
        <div className="flex items-center gap-2 mb-3">
          <Link href="/missed" className="rounded-full p-2 hover:bg-rose-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-rose-600" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              📚 {t("문제 창고", "Wrong Bank")}
            </p>
            <p className="text-sm font-black text-gray-900 truncate">
              {lessonTitle} · Q{stepIndex + 1}{chapterTitle ? ` · ${chapterTitle}` : ""}
            </p>
          </div>
        </div>

        {/* 안내 */}
        <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2">
          <p className="text-xs text-rose-700 leading-relaxed break-keep">
            💡 {t("이 문제를 맞히면 창고에서 빠져요. 틀려도 다시 시도 가능!", "Get this right to remove from bank. Wrong = retry OK!")}
          </p>
        </div>

        {/* 문제 */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-4 sm:p-5">
          <ReviewStepRenderer
            key={`${lessonId}-${stepIndex}-${resetCount}`}
            step={targetStep.step}
            stepKey={`missed-${lessonId}-${stepIndex}-${resetCount}`}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            language={language}
            autoCheckRef={autoCheckRef}
          />
        </div>

        {/* 결과 액션 */}
        {status === "correct" && (
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 p-5 text-center">
            <p className="text-5xl mb-2">🌟</p>
            <p className="text-xl font-black text-emerald-700 mb-1">
              {t("마스터!", "Mastered!")}
            </p>
            <p className="text-xs text-emerald-600 mb-4 break-keep">
              {nextEntry
                ? t("이 문제 끝! 다음 문제 계속할까요?", "Done! Try the next one?")
                : t("이 문제는 창고에서 빠졌어요. 모든 문제 마스터!", "Bank cleared. All mastered!")}
            </p>
            <div className="flex flex-col gap-2">
              {nextEntry && (
                <Link
                  href={`/missed/practice?lesson=${encodeURIComponent(nextEntry.lessonId)}&q=${nextEntry.stepIndex}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-xl font-bold text-sm transition-all"
                >
                  ▶ {t("다음 문제 풀기", "Next question")}
                </Link>
              )}
              <Link
                href="/missed"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]",
                  nextEntry
                    ? "bg-white border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                )}
              >
                {nextEntry ? t("창고로 (나중에)", "Back to Bank") : t("창고로 돌아가기 →", "Back to Bank →")}
              </Link>
            </div>
          </div>
        )}

        {status === "wrong" && (
          <div className="mt-5 rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 text-center">
            <p className="text-3xl mb-1">💪</p>
            <p className="text-base font-black text-amber-800 mb-1">
              {t("다시 한 번!", "Try again!")}
            </p>
            <p className="text-xs text-amber-700 mb-3 break-keep">
              {t("창고에선 다시 풀 수 있어요. 맞히면 마스터.", "Retry OK. Master to remove.")}
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm transition-colors"
            >
              🔄 {t("다시 시도", "Try again")}
            </button>
          </div>
        )}

        {/* 수업으로 가기 (참고용) */}
        <div className="mt-4 text-center">
          <Link
            href={`/learn/${lessonId}`}
            className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2 decoration-dotted"
          >
            {t("📖 이 레슨 수업 다시 보기", "📖 Re-watch lesson")}
          </Link>
        </div>
      </main>
    </div>
  )
}

export default function MissedPracticePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <PracticeInner />
    </Suspense>
  )
}
