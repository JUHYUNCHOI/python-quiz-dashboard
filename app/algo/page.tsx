"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { LanguageToggle } from "@/components/language-toggle"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

// 메달 등급 = 알고리즘 난이도 축 (토픽은 '기법 학습' 단위, 등급이 난이도)
const TIERS = [
  { wave: 1, ko: "🥉 Bronze — 기초", en: "🥉 Bronze — Basics", subKo: "USACO 입문에 필요한 기본기", subEn: "Foundations for USACO" },
  { wave: 2, ko: "🥈 Silver", en: "🥈 Silver", subKo: "탐색 · 재귀 · DP 입문", subEn: "Search, recursion, intro DP" },
  { wave: 3, ko: "🥇 Gold+", en: "🥇 Gold+", subKo: "고급 자료구조 · 알고리즘", subEn: "Advanced structures & algorithms" },
] as const

export default function AlgoPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  // 학생의 알고리즘 진도 (algo-* lesson_id) 가져오기
  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", user.id)
          .eq("completed", true)
        if (Array.isArray(data)) {
          setCompletedIds(new Set(data.map(d => d.lesson_id).filter(id => id.startsWith("algo-"))))
        }
      } catch {}
    }
    load()
  }, [])

  // 추천 다음 토픽 — 완료 안 한 첫 wave1, 없으면 첫 미완, 없으면 첫째
  const recommendedNext = ALGO_TOPICS.find(tp => tp.wave === 1 && !completedIds.has(tp.lessonId))
    || ALGO_TOPICS.find(tp => !completedIds.has(tp.lessonId))
    || ALGO_TOPICS[0]
  const doneCount = ALGO_TOPICS.filter(tp => completedIds.has(tp.lessonId)).length
  const isFresh = completedIds.size === 0

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push("/curriculum")}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">🧪 Algorithm Lab</h1>
            <p className="text-xs text-gray-400">{t(`토픽 ${doneCount}/${ALGO_TOPICS.length} 완료`, `${doneCount}/${ALGO_TOPICS.length} topics done`)}</p>
          </div>
          <LanguageToggle className="shrink-0" />
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 space-y-7">
        <p className="text-sm text-gray-400">
          {t("배우고 싶은 알고리즘을 눌러요 · 등급 순서대로 가면 자연스러워요", "Tap an algorithm to learn · following the tiers is the natural order")}
        </p>

        {/* 📊 전체 진행 */}
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-gray-600">{t("전체 진행", "Overall")}</span>
            <span className={doneCount > 0 ? "text-green-600" : "text-gray-400"}>
              ✓ {doneCount} / {ALGO_TOPICS.length} ({Math.round((doneCount / ALGO_TOPICS.length) * 100)}%)
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 transition-all" style={{ width: `${Math.round((doneCount / ALGO_TOPICS.length) * 100)}%` }} />
          </div>
        </div>

        {TIERS.map(tier => {
          const topics = ALGO_TOPICS.filter(tp => tp.wave === tier.wave)
          if (topics.length === 0) return null
          const tierDone = topics.filter(tp => completedIds.has(tp.lessonId)).length
          return (
            <section key={tier.wave}>
              {/* 등급 헤더 */}
              <div className="flex items-baseline gap-2 mb-1.5">
                <h2 className="text-sm font-extrabold text-gray-700">{t(tier.ko, tier.en)}</h2>
                <span className={cn("text-xs font-bold", tierDone > 0 ? "text-green-600" : "text-gray-400")}>
                  {tierDone}/{topics.length}
                </span>
                <span className="text-xs text-gray-300 hidden sm:inline">· {t(tier.subKo, tier.subEn)}</span>
              </div>
              {/* 등급별 진행 바 */}
              <div className="mb-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 transition-all" style={{ width: `${topics.length ? Math.round((tierDone / topics.length) * 100) : 0}%` }} />
              </div>

              {/* 토픽 카드 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {topics.map(tp => {
                  const done = completedIds.has(tp.lessonId)
                  const current = tp.id === recommendedNext?.id && !done
                  return (
                    <Link
                      key={tp.id}
                      href={`/algo/${tp.id}`}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                        done
                          ? "border-green-200 bg-green-50/60"
                          : current
                            ? "border-violet-400 bg-violet-50 ring-2 ring-violet-200"
                            : "border-gray-200 bg-white hover:border-violet-300 hover:shadow-sm"
                      )}
                    >
                      <span className="text-xl shrink-0">{tp.icon}</span>
                      <div className="min-w-0 flex-1">
                        {current && (
                          <span className="text-[10px] font-bold text-violet-500">
                            ▶ {isFresh ? t("여기서 시작", "Start here") : t("이어서", "Continue")}
                          </span>
                        )}
                        <p className={cn("text-sm font-bold truncate", done ? "text-gray-500" : "text-gray-900")}>
                          {t(tp.title, tp.titleEn)}
                        </p>
                      </div>
                      {done
                        ? <span className="text-green-500 shrink-0">✓</span>
                        : <span className="text-gray-300 shrink-0 group-hover:text-violet-400">→</span>}
                    </Link>
                  )
                })}
              </div>

              {/* Bronze 끝 → USACO 대회 도전 마일스톤 */}
              {tier.wave === 1 && (
                <Link
                  href="/quest"
                  className="mt-3 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 hover:shadow-sm transition-all"
                >
                  <span className="text-xl shrink-0">🏆</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-amber-800">{t("USACO 대회 도전", "Try USACO Contest")}</p>
                    <p className="text-xs text-amber-600">{t("Bronze 기초 끝 — 이제 실전 문제!", "Bronze done — real problems!")}</p>
                  </div>
                  <span className="text-amber-400 shrink-0">→</span>
                </Link>
              )}
            </section>
          )
        })}
      </div>
      <BottomNav />
    </div>
  )
}
