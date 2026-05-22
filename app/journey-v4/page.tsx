"use client"

/**
 * Journey v4 — 보물지도 + 각 메인 랜드마크 마을화
 *
 * v3 base 그대로 + 각 메인 스테이지 아래 작은 위성 아이콘들:
 *   🔁 복습 — 이전 거 다시
 *   💪 도전 — 그 레벨 연습 (Practice cluster)
 *   📝 퀴즈 — 그 레벨 퀴즈
 *
 * 학생이 메인 보스 못 깨면 → 마을에서 무기 보강하고 다시 도전 (게임 흐름).
 */

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

interface MapPlacement {
  x: number
  y: number
  landmark: string
}

const PLACEMENTS: Record<string, MapPlacement> = {
  "py-basic":       { x: 50, y: 8,   landmark: "🌱" },
  "py-advanced":    { x: 25, y: 24,  landmark: "🌳" },
  "cpp-basic":      { x: 72, y: 40,  landmark: "⛰️" },
  "cpp-stl":        { x: 22, y: 56,  landmark: "🏔️" },
  "cpp-usaco-main": { x: 70, y: 72,  landmark: "🗻" },
  "coding-bank":    { x: 28, y: 92,  landmark: "🌉" },
  "algo":           { x: 70, y: 114, landmark: "🏰" },
  "usaco":          { x: 50, y: 142, landmark: "👑" },
  "cpp-advanced-ref": { x: 92, y: 68, landmark: "📜" },
  "cpp-p3-mock":      { x: 92, y: 79, landmark: "⚔️" },
}

// 곡선 path
const PATH_D = [
  "M 50 8",
  "Q 50 18, 25 24",
  "Q 25 32, 72 40",
  "Q 72 48, 22 56",
  "Q 22 64, 70 72",
  "Q 70 84, 28 92",
  "Q 28 103, 70 114",
  "Q 70 130, 50 142",
].join(" ")

const BRANCH_PATHS = [
  "M 70 72 L 92 68",
  "M 70 72 L 92 79",
]

// ── 마을 위성 — 각 메인 스테이지가 가지는 사이드 액션 ────────────────
interface Satellite {
  emoji: string
  label: string
  labelEn: string
  href: string
}

const STAGE_SATELLITES: Record<string, Satellite[]> = {
  "py-basic": [
    { emoji: "🔁", label: "복습",   labelEn: "Review",    href: "/curriculum?course=python" },
    { emoji: "💪", label: "도전",   labelEn: "Practice",  href: "/practice?lang=python" },
    { emoji: "📝", label: "퀴즈",   labelEn: "Quiz",      href: "/quiz/setup?course=python" },
  ],
  "py-advanced": [
    { emoji: "🔁", label: "복습",   labelEn: "Review",    href: "/curriculum?course=python" },
    { emoji: "💪", label: "도전",   labelEn: "Practice",  href: "/practice?lang=python" },
    { emoji: "📝", label: "퀴즈",   labelEn: "Quiz",      href: "/quiz/setup?course=python" },
  ],
  "cpp-basic": [
    { emoji: "🔁", label: "복습",   labelEn: "Review",    href: "/curriculum?course=cpp" },
    { emoji: "💪", label: "도전",   labelEn: "Practice",  href: "/practice?lang=cpp" },
    { emoji: "📝", label: "퀴즈",   labelEn: "Quiz",      href: "/quiz/setup?course=cpp" },
  ],
  "cpp-stl": [
    { emoji: "🔁", label: "복습",   labelEn: "Review",    href: "/curriculum?course=cpp" },
    { emoji: "💪", label: "도전",   labelEn: "Practice",  href: "/practice?lang=cpp" },
    { emoji: "📝", label: "퀴즈",   labelEn: "Quiz",      href: "/quiz/setup?course=cpp" },
  ],
  "cpp-usaco-main": [
    { emoji: "🔁", label: "복습",   labelEn: "Review",    href: "/curriculum?course=cpp" },
    { emoji: "💪", label: "도전",   labelEn: "Practice",  href: "/practice?lang=cpp" },
    { emoji: "📝", label: "퀴즈",   labelEn: "Quiz",      href: "/quiz/setup?course=cpp" },
  ],
  "coding-bank": [
    { emoji: "🌟", label: "쉬운 거", labelEn: "Easier",   href: "/coding-bank" },
  ],
  "algo": [
    { emoji: "💪", label: "USACO",  labelEn: "USACO",    href: "/quest" },
  ],
  "usaco": [
    { emoji: "🔁", label: "쉬운 거", labelEn: "Easier",   href: "/quest" },
  ],
}

// ── 위성 아이콘 (작은 마을 건물) ────────────────────────────────────
function SatelliteIcon({ sat }: { sat: Satellite }) {
  const { t } = useLanguage()
  return (
    <Link
      href={sat.href}
      className="group/sat inline-flex flex-col items-center transition-transform hover:scale-125 active:scale-95"
      title={t(sat.label, sat.labelEn)}
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-amber-400 shadow flex items-center justify-center">
        <span className="text-base">{sat.emoji}</span>
      </div>
      <span className="text-[8px] sm:text-[9px] font-bold text-amber-900 mt-0.5">
        {t(sat.label, sat.labelEn)}
      </span>
    </Link>
  )
}

// ── 메인 랜드마크 + 마을 위성 ────────────────────────────────────────
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
  const satellites = isMain ? (STAGE_SATELLITES[stage.id] ?? []) : []

  return (
    <div
      className="absolute"
      style={{
        left: `${placement.x}%`,
        top: `${placement.y / 180 * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative inline-block">
        {/* 학생 아바타 — 활성 */}
        {isActive && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 pointer-events-none whitespace-nowrap">
            <div className="bg-white rounded-full px-2 py-0.5 shadow-md border-2 border-orange-400 text-[9px] font-black text-orange-600 animate-bounce">
              ▶ {t("너 여기!", "You!")}
            </div>
            <span className="text-3xl drop-shadow-lg">🦒</span>
          </div>
        )}

        {/* 메인 랜드마크 — 클릭 */}
        <Link href={stage.href} className="group relative inline-block">
          {isActive && (
            <span className="absolute inset-0 rounded-full ring-4 ring-orange-400 ring-offset-2 animate-pulse pointer-events-none" />
          )}
          <div className={cn(
            "relative flex flex-col items-center transition-transform group-hover:scale-110 group-active:scale-95",
          )}>
            <div className={cn(
              "relative flex items-center justify-center rounded-full bg-white border-4 shadow-xl",
              isMain ? "w-20 h-20 sm:w-24 sm:h-24 border-amber-400" : "w-14 h-14 border-amber-300 border-dashed",
              isDone && "border-green-500",
              !isDone && isActive && "border-orange-400",
            )}>
              <span className={cn(isMain ? "text-4xl sm:text-5xl" : "text-2xl", "drop-shadow")}>
                {placement.landmark}
              </span>
              {isDone && (
                <span className="absolute -top-2 -right-2 text-2xl drop-shadow-md">⭐</span>
              )}
              {(stage.id === "cpp-usaco-main" || stage.id === "usaco") && !isDone && (
                <span className="absolute -top-1.5 -left-1.5 text-lg drop-shadow">⚔️</span>
              )}
            </div>
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

        {/* 위성 — 마을의 사이드 액션 (메인만) */}
        {satellites.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-1.5">
            {satellites.map((sat, i) => (
              <SatelliteIcon key={i} sat={sat} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function GameMap({
  completedIds,
  hasCpp,
}: {
  completedIds: Set<string | number>
  hasCpp: boolean
}) {
  const { t } = useLanguage()
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
      <svg
        viewBox="0 0 100 180"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="forest-v4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dcfce7" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <linearGradient id="mountains-v4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#93c5fd" />
          </linearGradient>
          <linearGradient id="magic-v4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <linearGradient id="treasure-v4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>

        <rect x="0" y="0"   width="100" height="32"  fill="url(#forest-v4)"    opacity="0.6" />
        <rect x="0" y="32"  width="100" height="48"  fill="url(#mountains-v4)" opacity="0.5" />
        <rect x="0" y="80"  width="100" height="20"  fill="#fef3c7"            opacity="0.5" />
        <rect x="0" y="100" width="100" height="30"  fill="url(#magic-v4)"     opacity="0.5" />
        <rect x="0" y="130" width="100" height="50"  fill="url(#treasure-v4)"  opacity="0.6" />

        <path
          d={PATH_D}
          stroke="#92400e"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

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

      <div className="absolute pointer-events-none" style={{ left: "3%", top: "1.5%" }}>
        <span className="text-[9px] sm:text-[10px] font-black text-green-800/70 tracking-widest">🌳 PYTHON LAND</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${32/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-blue-800/70 tracking-widest">⛰️ C++ MOUNTAINS</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${80/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-amber-800/70 tracking-widest">🌊 BANK RIVER</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${100/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-purple-800/70 tracking-widest">✨ ALGO REALM</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "3%", top: `${130/180*100}%` }}>
        <span className="text-[9px] sm:text-[10px] font-black text-yellow-800/70 tracking-widest">🏆 USACO PEAK</span>
      </div>

      {/* 데코 */}
      <span className="absolute text-2xl opacity-40 pointer-events-none" style={{ left: "12%", top: "4%" }}>☁️</span>
      <span className="absolute text-3xl opacity-30 pointer-events-none" style={{ left: "80%", top: "2%" }}>☁️</span>
      <span className="absolute text-xl opacity-40 pointer-events-none" style={{ left: "8%", top: "14%" }}>🌲</span>
      <span className="absolute text-lg opacity-40 pointer-events-none" style={{ left: "82%", top: "20%" }}>🌳</span>
      <span className="absolute text-xl opacity-40 pointer-events-none" style={{ left: "50%", top: "34%" }}>⛰️</span>
      <span className="absolute text-lg opacity-40 pointer-events-none" style={{ left: "85%", top: "48%" }}>⛰️</span>
      <span className="absolute text-lg opacity-40 pointer-events-none" style={{ left: "8%", top: "66%" }}>🏔️</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "45%", top: "85%" }}>🌊</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "20%", top: "108%" }}>✨</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "85%", top: "124%" }}>✨</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "20%", top: "144%" }}>⭐</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "75%", top: "154%" }}>⭐</span>

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

      <div className="absolute top-2 right-2 text-[10px] text-amber-800/40 font-black pointer-events-none">N ↑</div>
      <div className="absolute bottom-2 left-2 text-[9px] text-amber-800/40 font-mono pointer-events-none">⚓ {new Date().getFullYear()}</div>
    </div>
  )
}

export default function JourneyV4Page() {
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
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1.5 bg-amber-200 rounded-full shadow-md border-2 border-amber-400 mb-3 transform -rotate-2">
            <span className="text-sm font-black text-amber-900">🗺️ {t("v4 — 마을 모드", "v4 — Town Mode")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-900 leading-tight" style={{ fontFamily: "serif" }}>
            {t("각 마을마다 복습 · 도전 · 퀴즈", "Each Town: Review · Practice · Quiz")}
          </h1>
          <p className="text-xs sm:text-sm text-amber-700 mt-1 italic">
            {t("보스 막히면 마을 가서 무기 보강하고 다시 도전!", "Stuck on boss? Visit the town, gear up, retry!")}
          </p>
          {hasCpp && (
            <p className="text-[11px] text-emerald-700 font-bold mt-2 inline-block px-2.5 py-0.5 bg-emerald-100 rounded-full border border-emerald-400">
              ✅ {t("C++ 트랙 — Python 단계 자동 완료", "C++ track — Python auto-completed")}
            </p>
          )}
        </div>

        <GameMap completedIds={completedIds} hasCpp={hasCpp} />

        <div className="mt-6 mx-auto max-w-md">
          <div className="bg-amber-50 rounded-xl p-3 border-2 border-dashed border-amber-400 text-center space-y-1">
            <p className="text-xs font-bold text-amber-900">
              🏠 {t("각 마을 = 🔁 복습 + 💪 도전 + 📝 퀴즈", "Each town = 🔁 Review + 💪 Practice + 📝 Quiz")}
            </p>
            <p className="text-[11px] text-amber-700">
              {t("막히면 옆에 있는 마을 활동으로 lateral 이동", "Stuck? Move lateral to town activities")}
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
