"use client"

/**
 * Journey 학습 여정 — 6 스테이지 보물지도.
 *
 * 메인 spine: 🐍 Python → 💪 Python 연습 → 🧠 알고리즘 → 🏆 USACO
 * C++ 가지: 💪 Python 연습 에서 분기 → ⚡ C++ → 💪 C++ 연습 → 🧠 알고리즘 합류
 *
 * C++ 진도 있는 학생 (Path 3) → Python + Py연습 자동 ✅ 표시
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
import { getSmartNext, getPreferredTrack } from "@/lib/smart-next"

// ── 6 스테이지 좌표 (viewBox 100×180) ────────────────────────────
interface MapPlacement {
  x: number   // 0-100
  y: number   // 0-180
  landmark: string
}

const PLACEMENTS: Record<string, MapPlacement> = {
  // 메인 spine — 가운데 살짝 왼쪽, 위에서 아래로
  "python":          { x: 30, y: 12,  landmark: "🌱" },
  "python-practice": { x: 30, y: 38,  landmark: "💪" },
  "algo":            { x: 30, y: 110, landmark: "🏰" },
  "usaco":           { x: 30, y: 148, landmark: "👑" },

  // C++ 가지 — 오른쪽으로 분기 후 다시 합류
  "cpp":             { x: 75, y: 60,  landmark: "⛰️" },
  "cpp-practice":    { x: 75, y: 88,  landmark: "🌉" },
}

// 메인 spine path — 굵은 실선
const MAIN_PATH = "M 30 12 L 30 38 L 30 110 L 30 148"

// C++ 가지 path — Py연습 에서 분기 → cpp → cpp-practice → 알고리즘 합류
const CPP_BRANCH_PATH = [
  "M 30 38",
  "Q 50 42, 75 60",     // → C++
  "L 75 88",            // → C++ 연습
  "Q 55 100, 30 110",   // → 알고리즘 합류
].join(" ")

// ── 랜드마크 노드 ─────────────────────────────────────────────────
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
  const isMain = stage.type === "main"

  // 사이즈
  const circleClass = isMain ? "w-20 h-20 sm:w-24 sm:h-24" : "w-16 h-16 sm:w-20 sm:h-20"
  const emojiClass = isMain ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
  const borderClass = isMain
    ? "border-amber-500"
    : "border-blue-400 border-dashed"

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
          <div className="relative flex flex-col items-center transition-transform group-hover:scale-110 group-active:scale-95">
            <div className={cn(
              "relative flex items-center justify-center rounded-full bg-white border-4 shadow-xl",
              circleClass, borderClass,
              isDone && "border-green-500 border-solid",
              !isDone && isActive && "border-orange-400 border-solid",
            )}>
              <span className={cn(emojiClass, "drop-shadow")}>{placement.landmark}</span>
              {isDone && (
                <span className="absolute -top-2 -right-2 text-2xl drop-shadow-md">⭐</span>
              )}
              {(stage.id === "usaco") && !isDone && (
                <span className="absolute -top-1.5 -left-1.5 text-base drop-shadow">⚔️</span>
              )}
            </div>
            <div className={cn(
              "mt-1.5 px-2 py-0.5 rounded-md text-center shadow-md border whitespace-nowrap",
              isMain
                ? "bg-amber-50 border-amber-300"
                : "bg-blue-50 border-blue-300 border-dashed",
            )}>
              <p className={cn("font-black text-gray-900 leading-tight", isMain ? "text-[11px] sm:text-xs" : "text-[10px]")}>
                {lang === "en" ? stage.titleEn : stage.title}
              </p>
              {progress.total > 0 && (
                <p className={cn(
                  "text-[9px] font-bold tabular-nums leading-tight",
                  isDone ? "text-green-600" : "text-orange-600",
                )}>
                  {progress.done}/{progress.total}
                </p>
              )}
            </div>
          </div>
        </Link>
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
  // 활성 스테이지 = 메인 spine 의 첫 미완료 (혹은 C++ 가지 진행 중이면 그쪽)
  const mainStages = JOURNEY_STAGES.filter(s => s.type === "main")
  let activeStageId: string | null = null

  // C++ 가지 진행 중인지 먼저 체크
  const cppStage = JOURNEY_STAGES.find(s => s.id === "cpp")
  const cppPractice = JOURNEY_STAGES.find(s => s.id === "cpp-practice")
  if (cppStage && cppPractice) {
    const cppP = getStageProgress(cppStage, completedIds, hasCpp)
    const cppPP = getStageProgress(cppPractice, completedIds, hasCpp)
    if (cppP.status === "in-progress") activeStageId = "cpp"
    else if (cppP.status === "completed" && cppPP.status !== "completed") activeStageId = "cpp-practice"
  }

  // C++ 가지 활성 안이면 메인 spine 에서 첫 미완료
  if (!activeStageId) {
    for (const s of mainStages) {
      const p = getStageProgress(s, completedIds, hasCpp)
      if (p.status !== "completed") { activeStageId = s.id; break }
    }
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
          <linearGradient id="j-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100" height="180" fill="url(#j-bg)" />

        {/* C++ 가지 영역 — 오른쪽 산악 (반투명) */}
        <path
          d="M 50 30 L 100 30 L 100 100 Q 75 102, 50 100 Z"
          fill="#dbeafe"
          opacity="0.4"
        />

        {/* 알고리즘 영역 */}
        <rect x="0" y="100" width="100" height="28" fill="#e9d5ff" opacity="0.35" />

        {/* USACO 정상 영역 */}
        <rect x="0" y="128" width="100" height="52" fill="#fcd34d" opacity="0.4" />

        {/* 메인 spine — 굵은 실선 */}
        <path
          d={MAIN_PATH}
          stroke="#92400e"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* C++ 가지 — 굵은 점선 (다른 길) */}
        <path
          d={CPP_BRANCH_PATH}
          stroke="#1e40af"
          strokeWidth="1.8"
          strokeDasharray="3 2"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>

      {/* 영역 라벨 */}
      <div className="absolute pointer-events-none" style={{ left: "2%", top: "2%" }}>
        <span className="text-[8px] sm:text-[9px] font-black text-amber-900/70 tracking-wider">⭐ 메인 LINE</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "55%", top: "32%" }}>
        <span className="text-[8px] sm:text-[9px] font-black text-blue-800/70 tracking-wider">⛰️ C++ DETOUR (선택)</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "2%", top: `${108/180*100}%` }}>
        <span className="text-[8px] sm:text-[9px] font-black text-purple-800/70 tracking-wider">✨ ALGO</span>
      </div>
      <div className="absolute pointer-events-none" style={{ left: "2%", top: `${135/180*100}%` }}>
        <span className="text-[8px] sm:text-[9px] font-black text-yellow-800/70 tracking-wider">🏆 USACO</span>
      </div>

      {/* 데코 */}
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "85%", top: "5%" }}>☁️</span>
      <span className="absolute text-2xl opacity-30 pointer-events-none" style={{ left: "92%", top: "20%" }}>⛰️</span>
      <span className="absolute text-lg opacity-30 pointer-events-none" style={{ left: "10%", top: "60%" }}>🌲</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "55%", top: "55%" }}>🏔️</span>
      <span className="absolute text-xl opacity-30 pointer-events-none" style={{ left: "85%", top: "110%" }}>✨</span>
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
  const preferredTrack = getPreferredTrack(completedIds)
  const nextAction = getSmartNext(completedIds, preferredTrack)
  const isFresh = completedIds.size === 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 pb-32">
      <Header />

      <main className="max-w-3xl mx-auto px-3 sm:px-6 pt-6">
        {/* 📍 지금 할 일 — 결정 피로 0 */}
        <Link
          href={nextAction.href}
          className="block mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-200/50 hover:shadow-2xl active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/25 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shrink-0">
              {nextAction.emoji ?? "📍"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold opacity-90 mb-0.5">
                {isFresh ? t("🚀 여기서 시작", "🚀 Start here") : t("📍 지금 할 일", "📍 Up next")}
              </p>
              <p className="text-lg sm:text-xl font-black leading-tight">
                {t(nextAction.title, nextAction.titleEn)}
              </p>
              {nextAction.subtitle && (
                <p className="text-[11px] sm:text-xs opacity-90 mt-0.5 truncate">{nextAction.subtitle}</p>
              )}
            </div>
            <span className="text-2xl sm:text-3xl shrink-0">→</span>
          </div>
        </Link>

        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1.5 bg-amber-200 rounded-full shadow-md border-2 border-amber-400 mb-3 transform -rotate-2">
            <span className="text-sm font-black text-amber-900">🗺️ {t("학습 모험 지도", "Adventure Map")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-900 leading-tight" style={{ fontFamily: "serif" }}>
            {t("Python 부터 USACO 정상까지", "From Python to USACO Peak")}
          </h1>
          <p className="text-xs sm:text-sm text-amber-700 mt-1 italic">
            {t("위 큰 버튼만 누르면 자동 — 또는 랜드마크 클릭", "Hit the big button — or click a landmark")}
          </p>
          {hasCpp && (
            <p className="text-[11px] text-emerald-700 font-bold mt-2 inline-block px-2.5 py-0.5 bg-emerald-100 rounded-full border border-emerald-400">
              ✅ {t("C++ 트랙 — Python 단계 자동 완료", "C++ track — Python auto-completed")}
            </p>
          )}
        </div>

        <GameMap completedIds={completedIds} hasCpp={hasCpp} />

        {/* 3 경로 설명 */}
        <div className="mt-6 mx-auto max-w-md space-y-2">
          <div className="bg-amber-50 rounded-xl p-3 border-2 border-amber-300">
            <p className="text-xs font-black text-amber-900 mb-1.5 text-center">
              ⭐ {t("3가지 경로 (자유 선택)", "3 Paths (Free Choice)")}
            </p>
            <div className="space-y-1 text-[11px] text-amber-800">
              <p><b>1.</b> 🐍 → 💪 → 🧠 → 🏆 {t("(Python 만)", "(Python only)")}</p>
              <p><b>2.</b> 🐍 → 💪 → ⚡ → 💪 → 🧠 → 🏆 {t("(풀 코스)", "(Full)")}</p>
              <p><b>3.</b> ⚡ → 💪 → 🧠 → 🏆 {t("(C++ 부터 — Python 자동)", "(C++ start — Python auto)")}</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
