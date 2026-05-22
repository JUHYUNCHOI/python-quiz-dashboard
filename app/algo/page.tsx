"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play } from "lucide-react"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

const WAVE_INFO = {
  1: { label: (n: number) => `Wave 1 — Bronze  (${n}개)`,   labelEn: (n: number) => `Wave 1 — Bronze  (${n} topics)`,  color: "border-amber-300 bg-amber-50",    badge: "text-amber-700 bg-amber-100" },
  2: { label: (n: number) => `Wave 2 — Silver  (${n}개)`,   labelEn: (n: number) => `Wave 2 — Silver  (${n} topics)`,  color: "border-slate-300 bg-slate-50",    badge: "text-slate-700 bg-slate-100" },
  3: { label: (n: number) => `Wave 3 — Gold+   (${n}개)`,   labelEn: (n: number) => `Wave 3 — Gold+   (${n} topics)`,  color: "border-yellow-300 bg-yellow-50",  badge: "text-yellow-700 bg-yellow-100" },
}

export default function AlgoPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)

  // 학생의 알고리즘 진도 (algo-* lesson_id) 가져오기
  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoaded(true); return }
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", user.id)
          .eq("completed", true)
        if (data) {
          setCompletedIds(new Set(data.map(d => d.lesson_id).filter(id => id.startsWith("algo-"))))
        }
      } catch {}
      setLoaded(true)
    }
    load()
  }, [])

  // 추천 다음 토픽 — 완료 안 한 첫 wave 1 토픽
  const recommendedNext = ALGO_TOPICS.find(tp => tp.wave === 1 && !completedIds.has(tp.lessonId))
    || ALGO_TOPICS.find(tp => !completedIds.has(tp.lessonId))
    || ALGO_TOPICS[0]
  const isFreshStart = completedIds.size === 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => router.push("/curriculum")}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">🧪 Algorithm Lab</h1>
            <p className="text-xs text-gray-400">{t(`${ALGO_TOPICS.length}개 토픽 · BFS/DFS, DP, 그리디 등`, `${ALGO_TOPICS.length} topics · BFS/DFS, DP, Greedy and more`)}</p>
          </div>
          <LanguageToggle className="shrink-0" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* 추천 다음 — Duolingo 스타일 큰 CTA. 진도 0 이면 '시작', 있으면 '이어서' */}
        {loaded && recommendedNext && (
          <Link
            href={`/algo/${recommendedNext.id}`}
            className="block bg-orange-500 rounded-2xl p-5 text-white shadow-lg shadow-amber-200/60 hover:shadow-xl active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {recommendedNext.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold opacity-90 mb-0.5">
                  {isFreshStart
                    ? t("🚀 추천 — 여기서 시작", "🚀 Recommended — Start here")
                    : t(`▶ 이어서 학습 (${completedIds.size}/${ALGO_TOPICS.length} 완료)`, `▶ Continue (${completedIds.size}/${ALGO_TOPICS.length} done)`)}
                </p>
                <p className="text-xl sm:text-2xl font-black leading-tight">
                  {t(recommendedNext.title, recommendedNext.titleEn)}
                </p>
                <p className="text-xs opacity-90 mt-1">
                  {t(recommendedNext.category, recommendedNext.categoryEn)}
                </p>
              </div>
              <Play className="w-8 h-8 opacity-80 shrink-0" />
            </div>
          </Link>
        )}

        {/* USACO 실전 문제로 바로 가는 링크 — 알고리즘 끝까지 안 가도 도전 가능 */}
        <Link
          href="/quest"
          className="block bg-amber-500 rounded-2xl p-4 text-white shadow-md hover:shadow-lg active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">🏆</div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-black leading-tight">
                {t("USACO 실전 문제 도전하기", "Try USACO Contest Problems")}
              </p>
              <p className="text-[11px] opacity-90 mt-0.5">
                {t("USACO Bronze / MCC 160+ 문제 — 알고리즘 익히면서 병행해도 OK", "USACO Bronze / MCC 160+ problems — try alongside algorithm topics")}
              </p>
            </div>
            <span className="text-2xl shrink-0">→</span>
          </div>
        </Link>

        {/* 전체 토픽 보기 안내 */}
        <p className="text-xs text-gray-400 text-center -mt-3">
          {t("아래는 전체 토픽 목록 — 자유롭게 골라도 OK", "All topics below — feel free to pick any")}
        </p>

        {([1, 2, 3] as const).map(wave => {
          const waveTopics = ALGO_TOPICS.filter(tp => tp.wave === wave)
          const info = WAVE_INFO[wave]
          return (
            <section key={wave}>
              <h2 className={cn(
                "text-sm font-bold px-3 py-1.5 rounded-lg border inline-block mb-3",
                info.badge
              )}>
                {t(info.label(waveTopics.length), info.labelEn(waveTopics.length))}
              </h2>
              <div className={cn(
                "grid gap-3",
                waveTopics.length <= 6
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6"
                  : "grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4"
              )}>
                {waveTopics.map(topic => {
                  const isCompleted = completedIds.has(topic.lessonId)
                  const isRecommended = topic.id === recommendedNext?.id
                  return (
                    <Link
                      key={topic.id}
                      href={`/algo/${topic.id}`}
                      className={cn(
                        "relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 bg-white hover:shadow-md transition-all hover:-translate-y-0.5",
                        info.color,
                        isCompleted && "ring-2 ring-green-300 ring-offset-1",
                        isRecommended && !isCompleted && "ring-2 ring-orange-400 ring-offset-1 animate-pulse"
                      )}
                    >
                      {isCompleted && (
                        <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                      )}
                      <span className="text-3xl">{topic.icon}</span>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                          {t(topic.title, topic.titleEn)}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {t(topic.category, topic.categoryEn)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
