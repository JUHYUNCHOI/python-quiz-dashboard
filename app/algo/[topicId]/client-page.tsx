"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AlgoViewer } from "@/components/algo/algo-viewer"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import type { AlgoTopic } from "@/data/algo/topics"
import { ALGO_TOPICS } from "@/data/algo/topics"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AlgoTopicPageProps {
  topic: AlgoTopic
}

const WAVE_LABEL: Record<number, string> = { 1: "Bronze", 2: "Silver", 3: "Gold+" }
const WAVE_COLOR: Record<number, string> = {
  1: "text-amber-700 bg-amber-50 border-amber-200",
  2: "text-slate-600 bg-slate-50 border-slate-200",
  3: "text-yellow-700 bg-yellow-50 border-yellow-200",
}

export function AlgoTopicPage({ topic }: AlgoTopicPageProps) {
  const router = useRouter()
  const { t } = useLanguage()

  // 같은 wave의 다른 토픽들
  const sameWave = ALGO_TOPICS.filter(tp => tp.wave === topic.wave && tp.id !== topic.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center gap-3">
          <button
            onClick={() => router.push("/algo")}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-lg">{topic.icon}</span>
            <h1 className="font-bold text-gray-900 truncate">
              {t(topic.titleEn, topic.title)}
            </h1>
            <span className={cn(
              "text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0",
              WAVE_COLOR[topic.wave]
            )}>
              Wave {topic.wave} · {WAVE_LABEL[topic.wave]}
            </span>
          </div>

          <LanguageToggle className="shrink-0" />
        </div>

        {/* 같은 Wave 토픽 퀵 네비 */}
        {sameWave.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-4 pb-2 flex items-center gap-1.5 overflow-x-auto">
            {sameWave.map(tp => (
              <Link
                key={tp.id}
                href={`/algo/${tp.id}`}
                className="text-[11px] font-medium text-gray-500 hover:text-indigo-600 whitespace-nowrap px-2 py-0.5 rounded-lg hover:bg-indigo-50 transition-colors shrink-0"
              >
                {tp.icon} {t(tp.titleEn, tp.title)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 알고리즘 랩 컨텐츠 */}
      <div className="max-w-[1400px] mx-auto">
        <AlgoViewer topicId={topic.id} />
      </div>
    </div>
  )
}
