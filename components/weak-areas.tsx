"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getTopicStats } from "@/lib/quiz-history"
import { cn } from "@/lib/utils"

interface TopicStat {
  topic: string
  accuracy: number
  total: number
}

export function WeakAreas() {
  const { t } = useLanguage()
  const router = useRouter()
  const [topics, setTopics] = useState<TopicStat[]>([])
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    const stats = getTopicStats()
    setHasData(stats.length > 0)
    // 3문제 이상 풀은 토픽만, 낮은 정답률 순
    setTopics(stats.filter(s => s.total >= 3))
  }, [])

  if (!hasData) {
    return (
      <Card className="border-0 bg-white p-5 shadow-lg">
        <h2 className="text-base font-bold text-gray-700 mb-3">🎯 {t("토픽별 내 실력", "My Topic Scores")}</h2>
        <div className="flex flex-col items-center py-6 text-gray-400">
          <p className="text-sm">{t("퀴즈를 풀면 토픽별 정답률을 보여드려요!", "Take quizzes to see topic-wise accuracy!")}</p>
        </div>
      </Card>
    )
  }

  if (topics.length === 0) {
    return (
      <Card className="border-0 bg-white p-5 shadow-lg">
        <h2 className="text-base font-bold text-gray-700 mb-3">🎯 {t("토픽별 내 실력", "My Topic Scores")}</h2>
        <div className="flex flex-col items-center py-4">
          <p className="text-2xl mb-1">🎉</p>
          <p className="text-sm text-green-600 font-bold">{t("문제를 더 풀면 분석해 드릴게요!", "Answer more questions for analysis!")}</p>
        </div>
      </Card>
    )
  }

  // 상위 3개 취약 (복습 추천), 나머지는 참고용
  const weakTopics   = topics.filter(t => t.accuracy < 70).slice(0, 3)
  const strongTopics = topics.filter(t => t.accuracy >= 70).slice(0, 4)

  return (
    <Card className="border-0 bg-white p-5 shadow-lg">
      <h2 className="text-base font-bold text-gray-700 mb-4">🎯 {t("토픽별 내 실력", "My Topic Scores")}</h2>

      {/* 취약 토픽 — 복습 추천 */}
      {weakTopics.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
            {t("📌 집중 연습 필요", "📌 Needs Practice")}
          </p>
          <div className="space-y-2">
            {weakTopics.map((topic) => (
              <TopicBar
                key={topic.topic}
                topic={topic}
                variant="weak"
                onPractice={() => router.push("/quiz/setup")}
                t={t}
              />
            ))}
          </div>
        </div>
      )}

      {/* 강점 토픽 — 유지 */}
      {strongTopics.length > 0 && (
        <div>
          <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">
            {t("✅ 잘하고 있어요", "✅ Doing Well")}
          </p>
          <div className="space-y-2">
            {strongTopics.map((topic) => (
              <TopicBar
                key={topic.topic}
                topic={topic}
                variant="strong"
                t={t}
              />
            ))}
          </div>
        </div>
      )}

      {weakTopics.length === 0 && (
        <p className="text-sm text-green-600 font-bold text-center py-2">
          {t("🎉 모든 토픽 70% 이상! 계속 이대로!", "🎉 All topics 70%+! Keep it up!")}
        </p>
      )}
    </Card>
  )
}

function TopicBar({ topic, variant, onPractice, t }: {
  topic: TopicStat
  variant: "weak" | "strong"
  onPractice?: () => void
  t: (ko: string, en: string) => string
}) {
  const isWeak = variant === "weak"
  return (
    <div className={cn(
      "rounded-xl px-3 py-2.5 border",
      isWeak ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"
    )}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={cn("text-xs font-bold truncate flex-1", isWeak ? "text-gray-800" : "text-gray-500")}>
          {topic.topic}
        </span>
        <div className="flex items-center gap-2 ml-2">
          <span className={cn(
            "text-xs font-black",
            topic.accuracy < 50 ? "text-red-600" :
            topic.accuracy < 70 ? "text-amber-600" : "text-green-600"
          )}>
            {topic.accuracy}%
          </span>
          {isWeak && onPractice && (
            <button
              onClick={onPractice}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              {t("연습", "Practice")}
            </button>
          )}
        </div>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            topic.accuracy < 50 ? "bg-red-400" :
            topic.accuracy < 70 ? "bg-amber-400" : "bg-green-500"
          )}
          style={{ width: `${topic.accuracy}%` }}
        />
      </div>
      <p className={cn("text-[10px] mt-1", isWeak ? "text-gray-400" : "text-gray-300")}>
        {t(`${topic.total}문제 풀음`, `${topic.total} attempted`)}
      </p>
    </div>
  )
}
