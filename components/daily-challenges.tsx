"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { getTodayChallenges, type DailyChallenge } from "@/lib/daily-challenges"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function DailyChallenges() {
  const { t } = useLanguage()
  const [challenges, setChallenges] = useState<DailyChallenge[]>([])
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    const list = getTodayChallenges()
    setChallenges(list)
    const done = list.every((c) => c.done)
    setAllDone(done)
    // 일일 챌린지 전부 완료 시 업적 트리거용 플래그 저장
    try {
      if (done) localStorage.setItem("daily-challenges-all-done", "1")
    } catch {}
  }, [])

  const doneCount = challenges.filter((c) => c.done).length
  const total = challenges.length

  if (challenges.length === 0) return null

  return (
    <Card className="border-0 bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🌟</span>
          <span className="font-bold text-gray-800 text-sm">
            {t("오늘의 도전", "Daily Challenges")}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {allDone ? (
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {t("🎉 완료!", "🎉 Done!")}
            </span>
          ) : (
            <span className="text-xs font-bold text-gray-400">
              {doneCount}/{total}
            </span>
          )}
        </div>
      </div>

      {/* Challenge rows */}
      <div className="space-y-2">
        {challenges.map((challenge) => (
          <ChallengeRow key={challenge.id} challenge={challenge} t={t} />
        ))}
      </div>

      {/* All done celebration */}
      {allDone && (
        <div className="mt-3 text-center py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <p className="text-xs font-bold text-green-700">
            {t(
              "🏆 오늘 도전 과제 모두 완료! 내일도 도전해봐요!",
              "🏆 All challenges done! See you tomorrow!",
            )}
          </p>
        </div>
      )}

      {/* CTA if not done */}
      {!allDone && (
        <Link
          href="/quiz/setup"
          className="block mt-3 text-center text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
        >
          {t("퀴즈 풀러 가기 →", "Go to Quiz →")}
        </Link>
      )}
    </Card>
  )
}

function ChallengeRow({
  challenge,
  t,
}: {
  challenge: DailyChallenge
  t: (ko: string, en: string) => string
}) {
  const { emoji, done, title, titleEn, desc, descEn, current, target, percent } = challenge

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-colors",
        done
          ? "bg-green-50 border-green-100"
          : "bg-gray-50 border-gray-100",
      )}
    >
      {/* Emoji / Checkmark */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0",
          done ? "bg-green-100" : "bg-white border border-gray-200",
        )}
      >
        {done ? "✅" : emoji}
      </div>

      {/* Text + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span
            className={cn(
              "text-xs font-bold",
              done ? "text-green-700" : "text-gray-700",
            )}
          >
            {t(title, titleEn)}
          </span>
          <span
            className={cn(
              "text-[10px] font-bold shrink-0 ml-2",
              done ? "text-green-600" : "text-gray-400",
            )}
          >
            {challenge.id === "session"
              ? done
                ? t("완료", "Done")
                : t("미완료", "Not done")
              : challenge.id === "accuracy"
              ? `${current}% / ${target}%`
              : `${current} / ${target}`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              done ? "bg-green-400" : "bg-orange-400",
            )}
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className={cn("text-[10px] mt-0.5", done ? "text-green-500" : "text-gray-400")}>
          {t(desc, descEn)}
        </p>
      </div>
    </div>
  )
}
