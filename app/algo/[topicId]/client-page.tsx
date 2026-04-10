"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AlgoViewer } from "@/components/algo/algo-viewer"
import { useLanguage } from "@/contexts/language-context"
import type { AlgoTopic } from "@/data/algo/topics"
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
  const { lang, setLang } = useLanguage()
  const [codeTrack, setCodeTrack] = useState<"cpp" | "python">("cpp")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center gap-3">
          <button
            onClick={() => router.push("/algo")}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* 토픽 제목 */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-lg shrink-0">{topic.icon}</span>
            <h1 className="font-bold text-gray-900 truncate">
              {lang === "en" ? topic.titleEn : topic.title}
            </h1>
            <span className={cn(
              "text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0",
              WAVE_COLOR[topic.wave]
            )}>
              Wave {topic.wave} · {WAVE_LABEL[topic.wave]}
            </span>
          </div>

          {/* 언어 토글 (콘텐츠 언어: KO / EN) */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 shrink-0">
            <button
              onClick={() => setLang("ko")}
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-md transition-colors",
                lang === "ko" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >한국어</button>
            <button
              onClick={() => setLang("en")}
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-md transition-colors",
                lang === "en" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >EN</button>
          </div>

          {/* 코드 언어 토글 (C++ / Python) */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 shrink-0">
            <button
              onClick={() => setCodeTrack("cpp")}
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-md transition-colors",
                codeTrack === "cpp" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >⚡ C++</button>
            <button
              onClick={() => setCodeTrack("python")}
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-md transition-colors",
                codeTrack === "python" ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >🐍 Python</button>
          </div>
        </div>
      </div>

      {/* 알고리즘 랩 컨텐츠 */}
      <div className="max-w-[1400px] mx-auto">
        <AlgoViewer topicId={topic.id} codeTrack={codeTrack} />
      </div>
    </div>
  )
}
