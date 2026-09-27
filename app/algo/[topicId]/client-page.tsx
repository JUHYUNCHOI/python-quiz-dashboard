"use client"

import { useState, useEffect } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react"
import { AlgoViewer } from "@/components/algo/algo-viewer"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import type { AlgoTopic } from "@/data/algo/topics"
import { AlgoContestSection } from "@/components/algo/contest-section"
import { cn } from "@/lib/utils"
import { getCompletedLessons } from "@/lib/curriculum-data"
import { getSmartNext } from "@/lib/smart-next"

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
  const { lang } = useLanguage()
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

          {/* 설명(읽기) 언어 — "읽기" 라벨로 코드 언어와 구분 */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-gray-400 font-bold hidden sm:inline">{lang === "en" ? "Read" : "읽기"}</span>
            <LanguageToggle />
          </div>

          {/* 코드 언어 토글 (C++ / Python) — "코드" 라벨 */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-gray-400 font-bold hidden sm:inline">{lang === "en" ? "Code" : "코드"}</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
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
      </div>

      {/* 선수 학습 안내 (cpp-18 등) */}
      {topic.prerequisite && (
        <div className="max-w-[1400px] mx-auto px-4 pt-4">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
            <span className="text-2xl shrink-0">📚</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900 mb-1">
                {lang === "en"
                  ? `Helpful first: lesson "${topic.prerequisite.titleEn ?? topic.prerequisite.title}"`
                  : `먼저 보면 좋아요: "${topic.prerequisite.title}" 레슨`}
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">
                {lang === "en"
                  ? (topic.prerequisite.reasonEn ?? topic.prerequisite.reason)
                  : topic.prerequisite.reason}
              </p>
              <a
                href={`/learn/${topic.prerequisite.lessonId}`}
                className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md px-2.5 py-1 transition-colors"
              >
                {lang === "en" ? "→ Open lesson" : "→ 레슨 열기"}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 알고리즘 랩 컨텐츠 */}
      <div className="max-w-[1400px] mx-auto">
        <AlgoViewer topicId={topic.id} codeTrack={codeTrack} />
      </div>

      {/* 실전 대회 문제 섹션 */}
      <AlgoContestSection topicId={topic.id} lang={lang} />

      {/* Smart-Next: 다음 알고리즘 토픽 추천 */}
      <NextTopicCTA currentTopic={topic} lang={lang} router={router} />

      <BottomNav />
    </div>
  )
}

// ── 다음 토픽 추천 (Smart-Next) ─────────────────────────────────────
function NextTopicCTA({
  currentTopic,
  lang,
  router,
}: {
  currentTopic: AlgoTopic
  lang: "ko" | "en"
  router: ReturnType<typeof useRouter>
}) {
  const [smart, setSmart] = useState<ReturnType<typeof getSmartNext> | null>(null)
  useEffect(() => {
    // 현재 토픽을 완료한 것으로 가정해 다음 추천 계산
    const completedNow = getCompletedLessons()
    completedNow.add(currentTopic.lessonId)
    setSmart(getSmartNext(completedNow, "cpp")) // 알고리즘은 cpp 트랙 기준
  }, [currentTopic.lessonId])

  if (!smart || smart.type === "complete") return null
  if (smart.type === "algo-topic" && smart.href === `/algo/${currentTopic.id}`) return null

  const label = lang === "en" ? smart.titleEn : smart.title
  return (
    <div className="max-w-[1400px] mx-auto px-4 pb-12">
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => router.push(smart.href)}
          className="w-full max-w-md mx-auto py-3.5 px-4 rounded-2xl bg-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg"
        >
          <span className="text-xl">{smart.emoji ?? "▶"}</span>
          <div className="flex flex-col items-center">
            <span className="text-base">{label}</span>
            {smart.subtitle && (
              <span className="text-[11px] font-medium text-purple-100/90">{smart.subtitle}</span>
            )}
          </div>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── 실전 대회 문제 추천 ────────────────────────────────────────────
/* ⭐ 2026-09-27: 여기 있던 `AlgoContestSection`·`DIFF_LABEL`·`DIFF_COLOR` 를
 * `components/algo/contest-section.tsx` 로 옮겼다.
 *
 * 왜 — 이 파일은 **동적 라우트** `/algo/[topicId]` 인데, `app/algo/<토픽>/page.tsx`
 * **정적 라우트가 22개** 있어서 Next.js 라우팅 우선순위상 **어떤 토픽에서도
 * 렌더링되지 않는다.** 그래서 `contest-links.ts` 에 6개 토픽 데이터가 들어 있었는데
 * 5개월간 화면에 한 번도 안 떴다(커밋 `607b0fab`).
 * 정적 라우트가 실제로 쓰는 `TopicProblemsPage` 안으로 옮겨서 켰다.
 *
 * ⛔ 같은 컴포넌트를 두 벌 두지 않는다 — 두면 다음에 또 한쪽만 고쳐서 어긋난다
 *   (오늘 `graph-lesson.tsx` 가 정확히 그렇게 「재귀로」에 남아 있었다). */
