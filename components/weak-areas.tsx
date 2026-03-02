"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle, PartyPopper } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { getTopicStats } from "@/lib/quiz-history"

interface WeakTopic {
  topic: string
  accuracy: number
  total: number
}

export function WeakAreas() {
  const { t } = useLanguage()
  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>([])
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    const stats = getTopicStats()
    setHasData(stats.length > 0)
    // 약점: 정답률 70% 미만 + 3문제 이상 풀은 토픽
    const weak = stats
      .filter(s => s.accuracy < 70 && s.total >= 3)
      .slice(0, 6) // 최대 6개
    setWeakTopics(weak)
  }, [])

  if (!hasData) {
    return (
      <Card className="border-0 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-orange-500" />
          <h2 className="text-xl font-bold">{t("약점 분석", "Weak Areas")}</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <span className="text-4xl mb-2">🎯</span>
          <p className="text-sm">{t("퀴즈를 3문제 이상 풀면 약점을 분석해드려요!", "Take 3+ quiz questions to see weak area analysis!")}</p>
        </div>
      </Card>
    )
  }

  if (weakTopics.length === 0) {
    return (
      <Card className="border-0 bg-gradient-to-br from-green-50 to-mint-50 p-6 shadow-lg">
        <div className="flex flex-col items-center justify-center py-6">
          <PartyPopper className="h-12 w-12 text-green-500 mb-3" />
          <h2 className="text-xl font-bold text-green-700 mb-1">{t("잘하고 있어요!", "Great job!")}</h2>
          <p className="text-sm text-green-600">{t("모든 토픽에서 70% 이상 정답률을 유지하고 있어요 🎉", "You're maintaining 70%+ accuracy across all topics 🎉")}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-2">
        <AlertCircle className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold">{t("약점 보완하기", "Improve Weak Areas")}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {weakTopics.map((topic, index) => (
          <Card
            key={index}
            className="group border-2 border-transparent bg-gradient-to-br from-orange-50 to-lavender-50 p-5 transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:shadow-lg"
          >
            <h3 className="mb-3 font-semibold">{topic.topic}</h3>

            <div className="mb-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("정답률", "Accuracy")}</span>
                <span className="font-bold text-orange-600">{topic.accuracy}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {t(`${topic.total}문제 중 ${Math.round(topic.total * topic.accuracy / 100)}개 정답`, `${Math.round(topic.total * topic.accuracy / 100)}/${topic.total} correct`)}
            </p>
          </Card>
        ))}
      </div>
    </Card>
  )
}
