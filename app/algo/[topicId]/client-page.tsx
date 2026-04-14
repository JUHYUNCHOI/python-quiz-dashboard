"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trophy, ExternalLink } from "lucide-react"
import { AlgoViewer } from "@/components/algo/algo-viewer"
import { useLanguage } from "@/contexts/language-context"
import type { AlgoTopic } from "@/data/algo/topics"
import { getAlgoContestLinks, codeQuestUrl } from "@/data/algo/contest-links"
import type { ContestProblem } from "@/data/algo/contest-links"
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

      {/* 실전 대회 문제 섹션 */}
      <AlgoContestSection topicId={topic.id} lang={lang} />
    </div>
  )
}

// ── 실전 대회 문제 추천 ────────────────────────────────────────────
const DIFF_LABEL: Record<ContestProblem["difficulty"], { ko: string; en: string }> = {
  easy:   { ko: "쉬움",  en: "Easy" },
  medium: { ko: "보통",  en: "Medium" },
}
const DIFF_COLOR: Record<ContestProblem["difficulty"], string> = {
  easy:   "text-emerald-700 bg-emerald-100",
  medium: "text-amber-700 bg-amber-100",
}

function AlgoContestSection({ topicId, lang }: { topicId: string; lang: string }) {
  const links = getAlgoContestLinks(topicId)
  if (!links) return null

  return (
    <div className="max-w-[1400px] mx-auto px-4 pb-12 mt-2">
      <div className="border-t border-gray-200 pt-8">
        {/* 섹션 헤더 */}
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-sm font-bold text-gray-700">
            {lang === "en" ? "Try Competition Problems" : "실전 대회 문제 도전"}
          </span>
          <div className="flex-1 h-px bg-amber-100" />
        </div>
        <p className="text-xs text-gray-400 mb-4">
          {lang === "en"
            ? "Apply what you learned to real USACO / MCC competition problems on CodeQuest."
            : "방금 배운 개념으로 USACO / MCC 실전 문제에 도전해보세요."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {links.problems.map(p => (
            <a
              key={p.id}
              href={codeQuestUrl(p.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 transition-all p-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                  <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", DIFF_COLOR[p.difficulty])}>
                    {lang === "en" ? DIFF_LABEL[p.difficulty].en : DIFF_LABEL[p.difficulty].ko}
                  </span>
                  <span className="text-xs text-gray-400">{p.source}</span>
                </div>
                <p className="text-xs text-gray-500">{p.why}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
