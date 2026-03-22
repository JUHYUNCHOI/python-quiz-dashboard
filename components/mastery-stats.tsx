"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { getMasteryStats } from "@/lib/spaced-repetition"
import { useLanguage } from "@/contexts/language-context"

/**
 * Leitner 5-box 숙달 분포 시각화
 * "몇 개 질문이 어느 단계에 있는지" — 학생이 자신의 진짜 학습 상태를 볼 수 있게
 */
export function MasteryStats() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({ learningCount: 0, reviewingCount: 0, masteredCount: 0, totalDue: 0 })
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    const s = getMasteryStats()
    const total = s.learningCount + s.reviewingCount + s.masteredCount
    setStats(s)
    setHasData(total > 0)
  }, [])

  const total = stats.learningCount + stats.reviewingCount + stats.masteredCount

  const stages = [
    {
      label: t("배우는 중", "Learning"),
      count: stats.learningCount,
      emoji: "🌱",
      color: "bg-red-400",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: t("복습 중", "Reviewing"),
      count: stats.reviewingCount,
      emoji: "🌿",
      color: "bg-yellow-400",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
    },
    {
      label: t("숙달됨", "Mastered"),
      count: stats.masteredCount,
      emoji: "👑",
      color: "bg-green-400",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  if (!hasData) {
    return (
      <Card className="border-0 bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-700">{t("🧠 문제 숙달 현황", "🧠 Question Mastery")}</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-6 text-gray-400">
          <p className="text-sm">{t("퀴즈를 풀면 숙달 현황이 표시돼요!", "Take quizzes to see mastery stats!")}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-700">{t("🧠 문제 숙달 현황", "🧠 Question Mastery")}</h3>
        <span className="text-xs text-gray-400">{t(`총 ${total}문제`, `${total} total`)}</span>
      </div>

      {/* Stacked progress bar */}
      <div className="flex h-3 w-full rounded-full overflow-hidden mb-4 bg-gray-100">
        {stages.map(s => (
          total > 0 && s.count > 0 ? (
            <div
              key={s.label}
              className={`${s.color} transition-all duration-700`}
              style={{ width: `${(s.count / total) * 100}%` }}
            />
          ) : null
        ))}
      </div>

      {/* Stage breakdown */}
      <div className="grid grid-cols-3 gap-2">
        {stages.map(s => (
          <div key={s.label} className={`${s.bgColor} rounded-xl p-3 text-center`}>
            <div className="text-xl mb-1">{s.emoji}</div>
            <div className={`text-xl font-black ${s.textColor}`}>{s.count}</div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 복습 필요 */}
      {stats.totalDue > 0 && (
        <div className="mt-3 flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2">
          <span className="text-xs text-orange-700 font-medium">
            ⏰ {t(`오늘 복습할 문제 ${stats.totalDue}개`, `${stats.totalDue} due for review today`)}
          </span>
          <a
            href="/quiz?mode=review"
            className="text-xs font-bold text-orange-600 hover:text-orange-500"
          >
            {t("복습하기 →", "Review →")}
          </a>
        </div>
      )}
    </Card>
  )
}
