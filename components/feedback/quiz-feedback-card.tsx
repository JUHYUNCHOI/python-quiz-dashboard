"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { QuizFeedback } from "@/lib/feedback-analyzer"

interface Props {
  feedback: QuizFeedback
  t: (ko: string, en: string) => string
  visible: boolean
  nextActionHref?: string
}

export function QuizFeedbackCard({ feedback, t, visible, nextActionHref }: Props) {
  if (!visible) return null

  const toneColors = {
    celebrate: "from-green-50 to-emerald-50 border-green-200",
    encourage: "from-blue-50 to-indigo-50 border-blue-200",
    guide: "from-amber-50 to-orange-50 border-amber-200",
  }

  const toneAccent = {
    celebrate: "text-green-700",
    encourage: "text-blue-700",
    guide: "text-amber-700",
  }

  return (
    <div className={cn(
      "rounded-2xl border p-5 space-y-4 animate-fly-in-right bg-gradient-to-br",
      toneColors[feedback.tone]
    )}>
      {/* 헤드라인 */}
      <div className="flex items-start gap-3">
        <span className="text-3xl">{feedback.emoji}</span>
        <div>
          <h3 className={cn("text-lg font-black", toneAccent[feedback.tone])}>
            {t(feedback.headline.ko, feedback.headline.en)}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">
            {t(feedback.details.ko, feedback.details.en)}
          </p>
        </div>
      </div>

      {/* 성장 지표 */}
      {feedback.growth && (
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold",
          feedback.growth.trend === "up" ? "bg-green-100 text-green-700" :
          feedback.growth.trend === "down" ? "bg-gray-100 text-gray-600" :
          "bg-blue-100 text-blue-700"
        )}>
          <span>{feedback.growth.trend === "up" ? "📈" : feedback.growth.trend === "down" ? "💪" : "📊"}</span>
          <span>{t(feedback.growth.message.ko, feedback.growth.message.en)}</span>
        </div>
      )}

      {/* 강점 */}
      {feedback.strongTopics.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-500 mb-1.5">{t("잘하는 부분", "Strengths")}</p>
          <div className="flex flex-wrap gap-1.5">
            {feedback.strongTopics.map(t => (
              <span key={t.topic} className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                ✅ {t.topic} ({t.accuracy}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 약점 (복습 추천) */}
      {feedback.weakTopics.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-500 mb-1.5">{t("복습하면 좋을 부분", "Areas to review")}</p>
          <div className="flex flex-wrap gap-1.5">
            {feedback.weakTopics.map(t => (
              <span key={t.topic} className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                📖 {t.topic} ({t.accuracy}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 다음 행동 추천 */}
      {nextActionHref ? (
        <Link href={nextActionHref} className={cn(
          "flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-80",
          feedback.nextAction.type === "advance" ? "bg-indigo-100 text-indigo-700" :
          feedback.nextAction.type === "review" ? "bg-amber-100 text-amber-700" :
          "bg-blue-100 text-blue-700"
        )}>
          <div className="flex items-center gap-2">
            <span>{feedback.nextAction.type === "advance" ? "🚀" : feedback.nextAction.type === "review" ? "📖" : "🔄"}</span>
            <span>{t(feedback.nextAction.ko, feedback.nextAction.en)}</span>
          </div>
          <span className="text-xs opacity-60">→</span>
        </Link>
      ) : (
        <div className={cn(
          "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold",
          feedback.nextAction.type === "advance" ? "bg-indigo-100 text-indigo-700" :
          feedback.nextAction.type === "review" ? "bg-amber-100 text-amber-700" :
          "bg-blue-100 text-blue-700"
        )}>
          <span>{feedback.nextAction.type === "advance" ? "🚀" : feedback.nextAction.type === "review" ? "📖" : "🔄"}</span>
          <span>{t(feedback.nextAction.ko, feedback.nextAction.en)}</span>
        </div>
      )}
    </div>
  )
}
