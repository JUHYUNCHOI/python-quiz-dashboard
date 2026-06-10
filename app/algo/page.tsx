"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play } from "lucide-react"
import { ALGO_TOPICS } from "@/data/algo/topics"
import { LearningMap, type MapNode } from "@/components/learning-map"
import { LanguageToggle } from "@/components/language-toggle"
import { BottomNav } from "@/components/bottom-nav"
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

  // 맵 노드 — wave 순(=배열 순) 한 줄기. 구간 밴드 + Bronze 끝 🏆 대회 마일스톤.
  const WAVE_SECTION: Record<number, [string, string]> = {
    1: ["🥉 Bronze — 기초", "🥉 Bronze — Basics"],
    2: ["🥈 Silver", "🥈 Silver"],
    3: ["🥇 Gold+", "🥇 Gold+"],
  }
  const algoNodes: MapNode[] = []
  let _lastWave = 0
  for (const tp of ALGO_TOPICS) {
    if (tp.wave === 2 && _lastWave === 1) {
      algoNodes.push({
        id: "_contest", emoji: "🏆", milestone: true,
        label: t("USACO 대회 도전", "Try USACO Contest"),
        sub: t("Bronze 기초 끝 — 이제 실전 문제!", "Bronze done — real problems!"),
        href: "/quest", state: "ahead",
      })
    }
    const section = tp.wave !== _lastWave ? t(WAVE_SECTION[tp.wave][0], WAVE_SECTION[tp.wave][1]) : undefined
    _lastWave = tp.wave
    const done = completedIds.has(tp.lessonId)
    algoNodes.push({
      id: tp.id,
      emoji: tp.icon,
      label: t(tp.title, tp.titleEn),
      href: `/algo/${tp.id}`,
      state: done ? "done" : tp.id === recommendedNext?.id ? "current" : "ahead",
      section,
    })
  }
  const isFreshStart = completedIds.size === 0

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
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
        {/* 🗺 한 줄기 맵 — 현재 위치 + 추천(▶) + 자유 점프. 데스크탑 지그재그/모바일 세로. */}
        <p className="text-sm text-gray-400 -mb-2">{t("길 따라 한 칸씩 · 아무 토픽이나 눌러 바로 가도 OK", "Follow the path · or jump to any topic")}</p>
        <LearningMap
          nodes={algoNodes}
          recommendLabel={completedIds.size === 0 ? t("여기서 시작", "Start here") : t("이어서", "Continue")}
        />
      </div>
      <BottomNav />
    </div>
  )
}
