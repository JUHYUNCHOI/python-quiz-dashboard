"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface LastProgress {
  lessonId: string
  lessonTitle: string
  chapter: number
  step: number
}

export function GiraffeHero() {
  const [lastProgress, setLastProgress] = useState<LastProgress | null>(null)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    // localStorage에서 마지막 학습 진행 상황 찾기
    try {
      const keys = Object.keys(localStorage)
      const progressKeys = keys.filter(k => k.startsWith("practice-v2-"))

      // 모든 진행 중인 수업 중 가장 높은 진도(chapter+step)의 수업을 찾기
      let latest: LastProgress | null = null
      let highestProgress = -1
      for (const key of progressKeys) {
        const data = JSON.parse(localStorage.getItem(key) || "{}")
        if (data.chapter !== undefined && data.step !== undefined) {
          const lessonId = key.replace("practice-v2-", "")
          const progressScore = data.chapter * 100 + data.step
          if (progressScore > highestProgress) {
            highestProgress = progressScore
            latest = {
              lessonId,
              lessonTitle: "",
              chapter: data.chapter,
              step: data.step,
            }
          }
        }
      }
      setLastProgress(latest)
    } catch {
      // localStorage 접근 실패 시 무시
    }
  }, [])

  const ctaHref = lastProgress ? `/learn/${lastProgress.lessonId}` : "/curriculum"
  const ctaText = lastProgress ? t("이어서 학습하기", "Continue Learning") : t("학습 시작하기", "Start Learning")

  return (
    <Card className="overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <div className="flex items-center gap-4 p-5 md:p-6">
        {/* 기린 이모지 - 컴팩트 */}
        <div className="relative flex-shrink-0">
          <div className="text-[64px] md:text-[80px] leading-none">🦒</div>
          <div className="absolute -right-1 -top-1 animate-bounce text-xl md:text-2xl">✨</div>
        </div>

        {/* 텍스트 + CTA */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
            {t("안녕! 오늘도 함께 배워요", "Hi! Let's learn together")}
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            {t("코딩 마스터가 되는 그날까지", "Until you become a coding master")} 🐍
          </p>

          {mounted && (
            <Link href={ctaHref}>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm md:text-base font-bold text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95">
                <Sparkles className="w-4 h-4" />
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
