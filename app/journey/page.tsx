"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import {
  JOURNEY_STAGES,
  getStageProgress,
  hasCppTrackProgress,
  type JourneyStage,
} from "@/lib/journey-stages"

// ── 스테이지별 지도 좌표 (viewBox 100×180 비율 기준 %) ────────────────
// 각 스테이지를 지도 어느 지점에 그릴지 + 어떤 랜드마크 아이콘 쓸지.
interface MapPlacement {
  x: number  // 0~100
  y: number  // 0~180
  landmark: string  // 메인 랜드마크 (이모지 큰 거)
  landmarkEn: string
}

const PLACEMENTS: Record<string, MapPlacement> = {
  // 메인 라인 — 지그재그
  "py-basic":       { x: 50, y: 8,   landmark: "🌱", landmarkEn: "🌱" },
  "py-advanced":    { x: 25, y: 22,  landmark: "🌳", landmarkEn: "🌳" },
  "cpp-basic":      { x: 72, y: 36,  landmark: "⛰️", landmarkEn: "⛰️" },
  "cpp-stl":        { x: 22, y: 52,  landmark: "🏔️", landmarkEn: "🏔️" },
  "cpp-usaco-main": { x: 70, y: 68,  landmark: "🗻", landmarkEn: "🗻" },
  "coding-bank":    { x: 28, y: 88,  landmark: "🌉", landmarkEn: "🌉" },
  "algo":           { x: 70, y: 110, landmark: "🏰", landmarkEn: "🏰" },
  "usaco":          { x: 50, y: 138, landmark: "👑", landmarkEn: "👑" },
  // 가지 — cpp-usaco-main 옆
  "cpp-advanced-ref": { x: 92, y: 64, landmark: "📜", landmarkEn: "📜" },
  "cpp-p3-mock":      { x: 92, y: 75, landmark: "⚔️", landmarkEn: "⚔️" },
}

// SVG path — 메인 스테이지 순서대로 곡선 연결
const PATH_D = [
  "M 50 8",         // py-basic
  "Q 50 16, 25 22", // → py-advanced
  "Q 25 28, 72 36", // → cpp-basic
  "Q 72 44, 22 52", // → cpp-stl
  "Q 22 60, 70 68", // → cpp-usaco-main
  "Q 70 80, 28 88", // → coding-bank
  "Q 28 99, 70 110",// → algo
  "Q 70 125, 50 138",// → usaco
].join(" ")

// 가지 path
const BRANCH_PATHS = [
  // cpp-usaco-main(70,68) → cpp-advanced-ref(92,64)
  "M 70 68 L 92 64",
  // cpp-usaco-main(70,68) → cpp-p3-mock(92,75)
  "M 70 68 L 92 75",
]

// ── 랜드마크 노드 ───────────────────────────────────────────────────
function LandmarkNode({
  stage,
  placement,
  progress,
  isActive,
  isMain,
}: {
  stage: JourneyStage
  placement: MapPlacement
  progress: { done: number; total: number; pct: number; status: string }
  isActive: boolean
  isMain: boolean
}) {
  const { t, lang } = useLanguage()
  const isDone = progress.status === "completed"

  return (
    <div
      className="absolute"
      style={{
        left: `${placement.x}%`,
        top: `${placement.y / 180 * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Link href={stage.href} className="group relative inline-block">
        {/* "여기!" 말풍선 + 학생 — 활성 노드만 */}
        {isActive && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 pointer-events-none whitespace-nowrap">
            <div className="bg-white rounded-full px-2 py-0.5 shadow-md border-2 border-orange-400 text-[9px] font-black text-orange-600 animate-bounce">
              ▶ {t("너 여기!", "You!")}
            </div>
            <span className="text-3xl drop-shadow-lg">🦒</span>
          </div>
        )}

        {/* 펄스 ring (활성) */}
        {isActive && (
          <span className="absolute inset-0 rounded-full ring-4 ring-orange-400 ring-offset-2 animate-pulse pointer-events-none" />
        )}

        {/* 랜드마크 + 호버 효과 */}
        <div className={cn(
          "relative flex flex-col items-center transition-transform duration-200 group-hover:scale-110 group-active:scale-95",
        )}>
          {/* 큰 랜드마크 이모지 */}
          <div className={cn(
            "relative flex items-center justify-center rounded-full bg-white border-4 shadow-xl",
            isMain ? "w-20 h-20 sm:w-24 sm:h-24 border-amber-400" : "w-14 h-14 border-amber-300 border-dashed",
            isDone && "border-green-500",
            !isDone && isActive && "border-orange-400",
          )}>
            <span className={cn(isMain ? "text-4xl sm:text-5xl" : "text-2xl", "drop-shadow")}>
              {placement.landmark}
            </span>
            {/* 완료 별 */}
            {isDone && (
              <span className="absolute -top-2 -right-2 text-2xl drop-shadow-md">⭐</span>
            )}
            {/* 보스 표시 — 메인 트랙 마무리 / 정상 */}
            {(stage.id === "cpp-usaco-main" || stage.id === "usaco") && !isDone && (
              <span className="absolute -top-1.5 -left-1.5 text-lg drop-shadow">⚔️</span>
            )}
          </div>

          {/* 푯말 라벨 */}
          <div className={cn(
            "mt-1.5 px-2 py-0.5 rounded-md text-center shadow-md border whitespace-nowrap",
            isMain
              ? "bg-amber-50 border-amber-300"
              : "bg-white/80 border-amber-200 border-dashed",
          )}>
            <p className={cn(
              isMain ? "text-[11px] sm:text-xs font-black text-gray-900" : "text-[10px] font-bold text-gray-700",
            )}>
              {lang === "en" ? stage.titleEn : stage.title}
            </p>
            {progress.total > 0 && !isDone && progress.done > 0 && (
              <p className="text-[9px] font-bold text-orange-600 tabular-nums">
                {progress.done}/{progress.total}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

// ── 큰 지도 ─────────────────────────────────────────────────────────
function GameMap({
  completedIds,
  hasCpp,
}: {
  completedIds: Set<string | number>
  hasCpp: boolean
}) {
  // 활성 스테이지 찾기
  const mainStages = JOURNEY_STAGES.filter(s => s.type === "main")
  let activeStageId: string | null = null
  for (const s of mainStages) {
    const p = getStageProgress(s, completedIds, hasCpp)
    if (p.status !== "completed") { activeStageId = s.id; break }
  }

  return (
    <div
      className="relative w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border-4 border-amber-800/30 overflow-hidden"
      style={{ aspectRatio: "100 / 180" }}
    >
      {/* 배경 SVG — 영역별 색상 + 곡선 path + 데코 */}
      <svg
        viewBox="0 0 100 180"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* 영역별 배경 그라데이션 — 위에서 아래로 */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <linearGradient id="forest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dcfce7" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <linearGradient id="mountains" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="magic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <linearGradient id="treasure" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>

        {/* Python forest land */}
        <rect x="0" y="0"   width="100" height="30"  fill="url(#forest)"   opacity="0.6" />
        {/* C++ mountains */}
        <rect x="0" y="30"  width="100" height="48"  fill="url(#mountains)" opacity="0.5" />
        {/* Coding Bank river-ish bridge zone */}
        <rect x="0" y="78"  width="100" height="18"  fill="#fef3c7"        opacity="0.5" />
        {/* Magic algorithm realm */}
        <rect x="0" y="96"  width="100" height="30"  fill="url(#magic)"     opacity="0.5" />
        {/* Treasure / USACO summit */}
        <rect x="0" y="126" width="100" height="54"  fill="url(#treasure)"  opacity="0.6" />

        {/* 보물지도 path — 메인 라인 */}
        <path
          d={PATH_D}
          stroke="#92400e"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* 가지 path */}
        {BRANCH_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#92400e"
            strokeWidth="0.7"
            strokeDasharray="1.5 1"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* 영역 라벨 — 절대 위치 */}
      <div className="absolute pointer-events-none" style={{ left: "3%", top: "1.5%" }}>
        <span className="text-[9px] sm:text-[10px] font-black text-green-800/70 tracking-widest">🌳 PYTHON LAND</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${30/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-blue-800/70 tracking-widest">⛰️ C++ MOUNTAINS</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${78/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-amber-800/70 tracking-widest">🌊 BANK RIVER</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${96/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-purple-800/70 tracking-widest">✨ ALGO REALM</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${126/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-yellow-800/70 tracking-widest">🏆 USACO PEAK</span>
      </div>

      {/* 데코레이션 — 구름, 별 등 */}
      <span className="absolute text-2xl opacity-40 pointer-events-none" style={{ left: "12%", top: "4%" }}>☁️</span>
      <span className="absolute text-3xl opacity-30 pointer-events-none" style={{ left: "80%", top: "2%" }}>☁️</span>
      <span className="absolute text-xl opacity-40 pointer-events-none" style={{ left: "8%", top: "14%" }}>🌲</span>
      <span className="absolute text-lg opacity-40 pointer-events-none" style={{ left: "78%", top: "18%" }}>🌳</span>
      <span className="absolute text-xl opacity-40 pointer-events-none" style={{ left: "50%", top: "30%" }}>⛰️</span>
      <span className="absolute text-lg opacity-40 pointer-events-none" style={{ left: "82%", top: "44%" }}>⛰️</span>
      <span className="absolute text-lg opacity-40 pointer-events-none" style={{ left: "8%", top: "62%" }}>🏔️</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "45%", top: "84%" }}>🌊</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "20%", top: "104%" }}>✨</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "85%", top: "120%" }}>✨</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "20%", top: "140%" }}>⭐</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "75%", top: "150%" }}>⭐</span>

      {/* 스테이지 노드들 */}
      {JOURNEY_STAGES.map(stage => {
        const placement = PLACEMENTS[stage.id]
        if (!placement) return null
        const progress = getStageProgress(stage, completedIds, hasCpp)
        return (
          <LandmarkNode
            key={stage.id}
            stage={stage}
            placement={placement}
            progress={progress}
            isActive={stage.id === activeStageId}
            isMain={stage.type === "main"}
          />
        )
      })}

      {/* 보물지도 모서리 데코 — 종이 느낌 */}
      <div className="absolute top-2 right-2 text-[10px] text-amber-800/40 font-black pointer-events-none">N ↑</div>
      <div className="absolute bottom-2 left-2 text-[9px] text-amber-800/40 font-mono pointer-events-none">⚓ {new Date().getFullYear()}</div>
    </div>
  )
}

export default function JourneyPage() {
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [completedIds, setCompletedIds] = useState<Set<string | number>>(new Set())

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const raw = localStorage.getItem("completedLessons")
        if (raw) {
          const arr = JSON.parse(raw)
          if (Array.isArray(arr)) setCompletedIds(new Set(arr))
        }
      } catch {}
      if (isAuthenticated && user) {
        const supabase = createClient()
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_id,completed")
          .eq("user_id", user.id)
          .eq("completed", true)
        if (cancelled) return
        if (data) {
          setCompletedIds(prev => {
            const merged = new Set<string | number>(prev)
            data.forEach(r => merged.add(r.lesson_id))
            return merged
          })
        }
      }
    }
    load()
    return () => { cancelled = true }
  }, [isAuthenticated, user])

  const hasCpp = hasCppTrackProgress(completedIds)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 pb-32">
      <Header />

      <main className="max-w-3xl mx-auto px-3 sm:px-6 pt-6">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1.5 bg-amber-200 rounded-full shadow-md border-2 border-amber-400 mb-3 transform -rotate-2">
            <span className="text-sm font-black text-amber-900">🗺️ {t("학습 모험 지도", "Adventure Map")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-900 leading-tight" style={{ fontFamily: "serif" }}>
            {t("Python 숲에서 USACO 정상까지", "From Python Forest to USACO Peak")}
          </h1>
          <p className="text-xs sm:text-sm text-amber-700 mt-1 italic">
            {t("각 랜드마크를 클릭해 모험을 시작하세요", "Click any landmark to begin")}
          </p>
          {hasCpp && (
            <p className="text-[11px] text-emerald-700 font-bold mt-2 inline-block px-2.5 py-0.5 bg-emerald-100 rounded-full border border-emerald-400">
              ✅ {t("C++ 트랙 — Python 단계 자동 완료", "C++ track — Python auto-completed")}
            </p>
          )}
        </div>

        {/* 지도 */}
        <GameMap completedIds={completedIds} hasCpp={hasCpp} />

        {/* 푯말 */}
        <div className="mt-6 mx-auto max-w-md">
          <div className="bg-amber-50 rounded-xl p-3 border-2 border-dashed border-amber-400 text-center">
            <p className="text-xs font-bold text-amber-900">
              💡 {t("모든 랜드마크 자유 접근 — 점선 노드는 사이드 퀘스트", "All landmarks free to visit — dashed nodes are side quests")}
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
