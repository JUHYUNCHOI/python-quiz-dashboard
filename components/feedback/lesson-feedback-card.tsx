"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LessonFeedback } from "@/lib/feedback-analyzer"

interface Props {
  feedback: LessonFeedback
  t: (ko: string, en: string) => string
}

export function LessonFeedbackCard({ feedback, t }: Props) {
  const router = useRouter()

  return (
    <div className="space-y-3 animate-fade-in-delay">
      {/* 진도 요약 */}
      <div className="bg-purple-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-purple-700">
            {t("전체 진도", "Overall Progress")}
          </span>
          <span className="text-xs font-bold text-purple-500">
            {feedback.progressSummary.completed}/{feedback.progressSummary.total}
          </span>
        </div>
        <div className="h-2.5 bg-purple-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${feedback.progressSummary.percentage}%` }}
          />
        </div>
        <p className="text-xs text-purple-500 mt-1.5 text-right font-bold">
          {feedback.progressSummary.percentage}%
        </p>
      </div>

      {/* 마일스톤 메시지 */}
      <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 rounded-2xl border border-amber-200">
        <span className="text-2xl">{feedback.emoji}</span>
        <p className="text-sm font-bold text-amber-700">
          {t(feedback.headline.ko, feedback.headline.en)}
        </p>
      </div>

      {/* 복습 추천 */}
      {feedback.reviewSuggestions.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-gray-400 px-1">{t("복습 추천", "Review Suggestions")}</p>
          {feedback.reviewSuggestions.map(s => (
            <button
              key={s.lessonId}
              onClick={() => router.push(`/learn/${s.lessonId}`)}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors text-left"
            >
              <span className="text-sm">🔄</span>
              <span className="text-xs font-bold text-gray-600 flex-1">{s.name}</span>
              <span className="text-[10px] text-gray-400">{t("복습하기", "Review")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
