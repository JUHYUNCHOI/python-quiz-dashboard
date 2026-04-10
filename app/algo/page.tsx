"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

const WAVE_INFO = {
  1: { label: (n: number) => `Wave 1 — Bronze  (${n}개)`,   labelEn: (n: number) => `Wave 1 — Bronze  (${n} topics)`,  color: "border-amber-300 bg-amber-50",    badge: "text-amber-700 bg-amber-100" },
  2: { label: (n: number) => `Wave 2 — Silver  (${n}개)`,   labelEn: (n: number) => `Wave 2 — Silver  (${n} topics)`,  color: "border-slate-300 bg-slate-50",    badge: "text-slate-700 bg-slate-100" },
  3: { label: (n: number) => `Wave 3 — Gold+   (${n}개)`,   labelEn: (n: number) => `Wave 3 — Gold+   (${n} topics)`,  color: "border-yellow-300 bg-yellow-50",  badge: "text-yellow-700 bg-yellow-100" },
}

export default function AlgoPage() {
  const router = useRouter()
  const { t } = useLanguage()

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
                {waveTopics.map(topic => (
                  <Link
                    key={topic.id}
                    href={`/algo/${topic.id}`}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 bg-white hover:shadow-md transition-all hover:-translate-y-0.5",
                      info.color
                    )}
                  >
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
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
