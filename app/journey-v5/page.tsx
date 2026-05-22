"use client"

/**
 * Journey v5 — 구조 수정 + 마을 통합
 *
 * 핵심 통찰 (학생 피드백): "Python 만 하고 C++ 안 할 수도 있어.
 * C++ STL/USACO메인이 꼭 알고리즘의 선수 아니잖아"
 *
 * 진짜 학생 여정:
 *   메인 spine (모두 거치는 길):
 *     [Python 기초] → [알고리즘 Lab] → [USACO 실전]
 *
 *   C++ 파이프라인 (큰 가지, USACO 경쟁 학생용):
 *     [C++ 기초] → [STL] → [USACO 메인] → [코딩 뱅크] ─┘ (알고리즘으로 합류)
 *
 *   Python 심화 (작은 가지, Python 마스터용):
 *     [Python 심화]
 *
 * 각 메인 노드 아래 작은 위성 (v4 의 마을 기능):
 *   🔁 복습 / 💪 도전 / 📝 퀴즈
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
  x: number       // 0-100
  y: number       // 0-180
  landmark: string
  /** 노드 분류 — 메인 라인 / C++ 가지 / Python 심화 가지 / 작은 가지 */
  track: "main" | "cpp-branch" | "py-side" | "branch-of-branch"
}

// ── 좌표 — 메인은 왼쪽 spine, C++ 는 오른쪽 큰 가지 ─────────────────
const PLACEMENTS: Record<string, MapPlacement> = {
  // 메인 spine — 왼쪽 세로 (모두 거치는 길)
  "py-basic":   { x: 30, y: 10,   landmark: "🌱", track: "main" },
  "algo":       { x: 30, y: 108,  landmark: "🏰", track: "main" },
  "usaco":      { x: 30, y: 148,  landmark: "👑", track: "main" },

  // Python 심화 — 왼쪽 작은 가지
  "py-advanced": { x: 8, y: 22, landmark: "🌳", track: "py-side" },

  // C++ 파이프라인 — 오른쪽 큰 가지 (위에서 아래)
  "cpp-basic":      { x: 65, y: 28,  landmark: "⛰️", track: "cpp-branch" },
  "cpp-stl":        { x: 70, y: 50,  landmark: "🏔️", track: "cpp-branch" },
  "cpp-usaco-main": { x: 65, y: 72,  landmark: "🗻", track: "cpp-branch" },
  "coding-bank":    { x: 55, y: 92,  landmark: "🌉", track: "cpp-branch" },

  // C++ 가지 안의 가지 — 오른쪽 끝
  "cpp-advanced-ref": { x: 90, y: 68, landmark: "📜", track: "branch-of-branch" },
  "cpp-p3-mock":      { x: 90, y: 78, landmark: "⚔️", track: "branch-of-branch" },
}

// 메인 spine path (Python 기초 → 알고리즘 → USACO) — 굵은 실선
const MAIN_PATH = "M 30 10 L 30 108 L 30 148"

// C++ 파이프라인 path (Python 기초 → C++ 기초 → ... → 코딩 뱅크 → 알고리즘) — 굵은 점선
const CPP_PATH = [
  "M 30 10",
  "Q 45 12, 65 28",   // → C++ 기초
  "L 70 50",          // → STL
  "L 65 72",          // → USACO 메인
  "L 55 92",          // → 코딩 뱅크
  "Q 45 100, 30 108", // → 알고리즘 (합류)
].join(" ")

// Python 심화 path (Python 기초 → Python 심화) — 가는 점선
const PY_SIDE_PATH = "M 30 10 Q 20 14, 8 22"

// C++ 가지 안 가지들
const CPP_INNER_BRANCH_PATHS = [
  "M 65 72 L 90 68",
  "M 65 72 L 90 78",
]

// ── 위성 (마을 사이드 액션) ───────────────────────────────────────
interface Satellite {
  emoji: string
  label: string
  labelEn: string
  href: string
}

const STAGE_SATELLITES: Record<string, Satellite[]> = {
  "py-basic": [
    { emoji: "🔁", label: "복습", labelEn: "Review",   href: "/curriculum?course=python" },
    { emoji: "💪", label: "도전", labelEn: "Practice", href: "/practice?lang=python" },
    { emoji: "📝", label: "퀴즈", labelEn: "Quiz",     href: "/quiz/setup?course=python" },
  ],
  "py-advanced": [
    { emoji: "🔁", label: "복습", labelEn: "Review",   href: "/curriculum?course=python" },
    { emoji: "📝", label: "퀴즈", labelEn: "Quiz",     href: "/quiz/setup?course=python" },
  ],
  "cpp-basic": [
    { emoji: "🔁", label: "복습", labelEn: "Review",   href: "/curriculum?course=cpp" },
    { emoji: "💪", label: "도전", labelEn: "Practice", href: "/practice?lang=cpp" },
    { emoji: "📝", label: "퀴즈", labelEn: "Quiz",     href: "/quiz/setup?course=cpp" },
  ],
  "cpp-stl": [
    { emoji: "🔁", label: "복습", labelEn: "Review",   href: "/curriculum?course=cpp" },
    { emoji: "💪", label: "도전", labelEn: "Practice", href: "/practice?lang=cpp" },
    { emoji: "📝", label: "퀴즈", labelEn: "Quiz",     href: "/quiz/setup?course=cpp" },
  ],
  "cpp-usaco-main": [
    { emoji: "🔁", label: "복습", labelEn: "Review",   href: "/curriculum?course=cpp" },
    { emoji: "💪", label: "도전", labelEn: "Practice", href: "/practice?lang=cpp" },
    { emoji: "📝", label: "퀴즈", labelEn: "Quiz",     href: "/quiz/setup?course=cpp" },
  ],
  "coding-bank": [
    { emoji: "🌟", label: "풀기", labelEn: "Solve",    href: "/coding-bank" },
  ],
  "algo": [
    { emoji: "📍", label: "전체", labelEn: "All",      href: "/algo" },
    { emoji: "🏆", label: "USACO", labelEn: "USACO",   href: "/quest" },
  ],
  "usaco": [
    { emoji: "📍", label: "전체", labelEn: "All",      href: "/quest" },
  ],
}

// ── 작은 위성 아이콘 (작고 깔끔) ─────────────────────────────────
function SatelliteIcon({ sat }: { sat: Satellite }) {
  const { t } = useLanguage()
  return (
    <Link
      href={sat.href}
      className="inline-flex flex-col items-center transition-transform hover:scale-125 active:scale-95"
      title={t(sat.label, sat.labelEn)}
    >
      <div className="w-6 h-6 rounded-full bg-white border border-amber-400 shadow flex items-center justify-center">
        <span className="text-xs">{sat.emoji}</span>
      </div>
      <span className="text-[8px] font-bold text-amber-900 mt-0.5 leading-none">
        {t(sat.label, sat.labelEn)}
      </span>
    </Link>
  )
}

// ── 랜드마크 (메인 / C++ 가지 / 작은 가지) ─────────────────────────
function LandmarkNode({
  stage,
  placement,
  progress,
  isActive,
}: {
  stage: JourneyStage
  placement: MapPlacement
  progress: { done: number; total: number; pct: number; status: string }
  isActive: boolean
}) {
  const { t, lang } = useLanguage()
  const isDone = progress.status === "completed"
  const satellites = STAGE_SATELLITES[stage.id] ?? []

  // 트랙별 사이즈 + 스타일
  const sizes = {
    "main":             { circle: "w-20 h-20 sm:w-24 sm:h-24", emoji: "text-4xl sm:text-5xl", border: "border-amber-500", labelSize: "text-[11px] sm:text-xs font-black" },
    "cpp-branch":       { circle: "w-16 h-16 sm:w-20 sm:h-20", emoji: "text-3xl sm:text-4xl", border: "border-blue-400 border-dashed", labelSize: "text-[10px] font-bold" },
    "py-side":          { circle: "w-14 h-14",                 emoji: "text-2xl",             border: "border-emerald-400 border-dashed", labelSize: "text-[10px] font-bold" },
    "branch-of-branch": { circle: "w-12 h-12",                 emoji: "text-xl",              border: "border-slate-300 border-dotted", labelSize: "text-[9px] font-bold" },
  }
  const sz = sizes[placement.track]

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

        <Link href={stage.href} className="group relative inline-block">
          {isActive && (
            <span className="absolute inset-0 rounded-full ring-4 ring-orange-400 ring-offset-2 animate-pulse pointer-events-none" />
          )}
          <div className={cn("relative flex flex-col items-center transition-transform group-hover:scale-110 group-active:scale-95")}>
            <div className={cn(
              "relative flex items-center justify-center rounded-full bg-white border-4 shadow-xl",
              sz.circle, sz.border,
              isDone && "border-green-500 border-solid",
              !isDone && isActive && "border-orange-400 border-solid",
            )}>
              <span className={cn(sz.emoji, "drop-shadow")}>{placement.landmark}</span>
              {isDone && (
                <span className="absolute -top-2 -right-2 text-xl drop-shadow-md">⭐</span>
              )}
              {(stage.id === "usaco") && !isDone && (
                <span className="absolute -top-1.5 -left-1.5 text-base drop-shadow">⚔️</span>
              )}
            </div>
            <div className={cn(
              "mt-1 px-1.5 py-0.5 rounded-md text-center shadow-md border whitespace-nowrap",
              placement.track === "main" ? "bg-amber-50 border-amber-300"
              : placement.track === "cpp-branch" ? "bg-blue-50 border-blue-200 border-dashed"
              : "bg-white/80 border-gray-200 border-dashed",
            )}>
              <p className={cn(sz.labelSize, "text-gray-900 leading-tight")}>
                {lang === "en" ? stage.titleEn : stage.title}
              </p>
              {progress.total > 0 && !isDone && progress.done > 0 && (
                <p className="text-[9px] font-bold text-orange-600 tabular-nums leading-tight">
                  {progress.done}/{progress.total}
                </p>
              )}
            </div>
          </div>
        </Link>

        {/* 위성 — 작은 마을 (메인 + C++ 큰 가지 만) */}
        {satellites.length > 0 && (placement.track === "main" || placement.track === "cpp-branch") && (
          <div className="flex justify-center gap-1 mt-1">
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
          <linearGradient id="v5-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>

        {/* 양피지 베이스 */}
        <rect x="0" y="0" width="100" height="180" fill="url(#v5-bg)" />

        {/* C++ 영역 — 오른쪽 산악 (반투명) */}
        <path
          d="M 50 0 L 100 0 L 100 105 Q 75 102, 50 105 Z"
          fill="#dbeafe"
          opacity="0.4"
        />

        {/* 알고리즘 영역 */}
        <rect x="0" y="105" width="100" height="25" fill="#e9d5ff" opacity="0.35" />

        {/* USACO 정상 영역 */}
        <rect x="0" y="130" width="100" height="50" fill="#fcd34d" opacity="0.35" />

        {/* 메인 spine — 굵은 실선 (Python 기초 → 알고리즘 → USACO) */}
        <path
          d={MAIN_PATH}
          stroke="#92400e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* C++ 가지 — 굵은 점선 (다른 길 느낌) */}
        <path
          d={CPP_PATH}
          stroke="#1e40af"
          strokeWidth="1.8"
          strokeDasharray="3 2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Python 심화 가지 — 가는 점선 */}
        <path
          d={PY_SIDE_PATH}
          stroke="#047857"
          strokeWidth="0.8"
          strokeDasharray="1.5 1"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* C++ 안의 가지 */}
        {CPP_INNER_BRANCH_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#475569"
            strokeWidth="0.5"
            strokeDasharray="1 1"
            fill="none"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* 영역 라벨 */}
      <div className="absolute pointer-events-none" style={{ left: "2%", top: "2%" }}>
        <span className="text-[8px] sm:text-[9px] font-black text-amber-900/70 tracking-wider">⭐ 메인 LINE</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "52%", top: "5%" }}>
        <span className="text-[8px] sm:text-[9px] font-black text-blue-800/70 tracking-wider">⛰️ C++ DETOUR</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "2%", top: `${110/180*100}%` }}>
        <span className="text-[8px] sm:text-[9px] font-black text-purple-800/70 tracking-wider">✨ ALGO</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "2%", top: `${135/180*100}%` }}>
        <span className="text-[8px] sm:text-[9px] font-black text-yellow-800/70 tracking-wider">🏆 USACO</span>
      </div>

      {/* 데코 */}
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "85%", top: "2%" }}>☁️</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "92%", top: "12%" }}>⛰️</span>
      <span className="absolute text-lg opacity-30 pointer-events-none" style={{ left: "95%", top: "30%" }}>⛰️</span>
      <span className="absolute text-lg opacity-30 pointer-events-none" style={{ left: "10%", top: "60%" }}>🌲</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "15%", top: "85%" }}>🌊</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "70%", top: "115%" }}>✨</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "75%", top: "150%" }}>⭐</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "10%", top: "160%" }}>⭐</span>

      {/* 노드들 */}
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
          />
        )
      })}

      <div className="absolute top-2 right-2 text-[10px] text-amber-800/40 font-black pointer-events-none">N ↑</div>
      <div className="absolute bottom-2 left-2 text-[9px] text-amber-800/40 font-mono pointer-events-none">⚓ {new Date().getFullYear()}</div>
    </div>
  )
}

export default function JourneyV5Page() {
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
            <span className="text-sm font-black text-amber-900">🗺️ {t("v5 — 진짜 구조", "v5 — True Structure")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-900 leading-tight" style={{ fontFamily: "serif" }}>
            {t("메인 라인 + C++ 큰 가지", "Main Line + C++ Detour")}
          </h1>
          <p className="text-xs sm:text-sm text-amber-700 mt-1 italic">
            {t(
              "Python → 알고리즘 → USACO 가 메인. C++ 는 경쟁용 큰 우회로",
              "Python → Algo → USACO is main. C++ is a competitive detour",
            )}
          </p>
          {hasCpp && (
            <p className="text-[11px] text-emerald-700 font-bold mt-2 inline-block px-2.5 py-0.5 bg-emerald-100 rounded-full border border-emerald-400">
              ✅ {t("C++ 트랙 — Python 단계 자동 완료", "C++ track — Python auto-completed")}
            </p>
          )}
        </div>

        <GameMap completedIds={completedIds} hasCpp={hasCpp} />

        <div className="mt-6 mx-auto max-w-md space-y-2">
          <div className="bg-amber-50 rounded-xl p-3 border-2 border-amber-300 text-center">
            <p className="text-xs font-black text-amber-900 mb-1">
              ⭐ {t("메인 라인 (모두 거치는 길)", "Main Line (everyone)")}
            </p>
            <p className="text-[11px] text-amber-700">
              Python 기초 → 알고리즘 → USACO
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border-2 border-dashed border-blue-300 text-center">
            <p className="text-xs font-black text-blue-900 mb-1">
              ⛰️ {t("C++ 큰 우회로 (선택)", "C++ Detour (optional)")}
            </p>
            <p className="text-[11px] text-blue-700">
              {t("USACO 경쟁 / 빠른 코드 원하면", "For USACO competition / fast code")}
            </p>
          </div>
          <p className="text-[10px] text-center text-gray-500 italic">
            🏘️ {t("각 노드 아래 작은 위성 = 복습/도전/퀴즈 빠른 접근", "Small satellites = Review/Practice/Quiz shortcuts")}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
