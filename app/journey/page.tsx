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

// ── 노드 시각 스타일 (테마별) ───────────────────────────────────────
const RANK_THEME: Record<string, { ring: string; bg: string; shadow: string; text: string }> = {
  bronze: { ring: "ring-amber-400",  bg: "bg-gradient-to-br from-amber-300 to-amber-500",   shadow: "shadow-amber-300/60",  text: "text-amber-900"  },
  silver: { ring: "ring-slate-400",  bg: "bg-gradient-to-br from-slate-300 to-slate-500",   shadow: "shadow-slate-300/60",  text: "text-slate-900"  },
  gold:   { ring: "ring-yellow-400", bg: "bg-gradient-to-br from-yellow-300 to-yellow-500", shadow: "shadow-yellow-300/60", text: "text-yellow-900" },
  master: { ring: "ring-purple-400", bg: "bg-gradient-to-br from-purple-400 to-purple-600", shadow: "shadow-purple-300/60", text: "text-purple-50"  },
  bridge: { ring: "ring-emerald-400",bg: "bg-gradient-to-br from-emerald-300 to-emerald-500",shadow: "shadow-emerald-300/60",text: "text-emerald-900"},
}

// ── 큰 원형 노드 (메달리온) ──────────────────────────────────────
function StageMedallion({
  stage,
  progress,
  isActive,
  isMain,
}: {
  stage: JourneyStage
  progress: { done: number; total: number; pct: number; status: string }
  isActive: boolean
  isMain: boolean
}) {
  const { t, lang } = useLanguage()
  const theme = RANK_THEME[stage.rank]
  const isDone = progress.status === "completed"
  const size = isMain ? "w-32 h-32 sm:w-36 sm:h-36" : "w-20 h-20"  // 가지는 작게

  return (
    <Link
      href={stage.href}
      className={cn("group relative inline-block transition-transform duration-200 hover:scale-110 active:scale-95")}
    >
      {/* "여기!" 말풍선 + 학생 아바타 — 현재 진행 중 노드 */}
      {isActive && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 pointer-events-none">
          <div className="bg-white rounded-2xl px-2.5 py-1 shadow-lg border border-orange-300 text-[10px] font-black text-orange-600 whitespace-nowrap animate-bounce">
            ▶ {t("너 여기!", "You're here!")}
          </div>
          <span className="text-4xl drop-shadow-md">🦒</span>
        </div>
      )}

      {/* 펄스 링 — 활성 노드만 */}
      {isActive && (
        <span className={cn(
          "absolute inset-0 rounded-full ring-4 ring-offset-4 animate-pulse",
          theme.ring,
        )} aria-hidden />
      )}

      {/* 메달리온 본체 */}
      <div className={cn(
        "relative rounded-full flex items-center justify-center shadow-2xl border-4 border-white",
        size,
        theme.bg, theme.shadow,
        isDone && "ring-4 ring-yellow-400 ring-offset-2",
      )}>
        {/* 이모지 */}
        <span className={cn(
          isMain ? "text-5xl sm:text-6xl" : "text-3xl",
          "drop-shadow-md filter",
        )}>
          {isDone ? "✅" : stage.emoji}
        </span>

        {/* 완료 별 — 메달리온 오른쪽 위 */}
        {isDone && (
          <span className="absolute -top-1 -right-1 text-2xl drop-shadow-md">⭐</span>
        )}

        {/* 진도 — 메달리온 아래 작은 배지 */}
        {!isDone && progress.total > 0 && progress.done > 0 && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white rounded-full shadow-md border border-gray-200">
            <span className="text-[9px] font-black text-gray-700 tabular-nums">
              {progress.done}/{progress.total}
            </span>
          </div>
        )}
      </div>

      {/* 노드 아래 제목 */}
      <div className="mt-3 text-center max-w-[140px] mx-auto">
        <p className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
          {lang === "en" ? stage.titleEn : stage.title}
        </p>
        <p className={cn(
          "text-[10px] font-bold mt-0.5 uppercase tracking-wider",
          stage.rank === "bronze" ? "text-amber-700" :
          stage.rank === "silver" ? "text-slate-600" :
          stage.rank === "gold" ? "text-yellow-700" :
          stage.rank === "master" ? "text-purple-700" :
          "text-emerald-700",
        )}>
          {stage.rank === "bridge" ? t("다리", "Bridge") : stage.rank}
        </p>
      </div>
    </Link>
  )
}

// ── 곡선 path SVG 조각 (지그재그 연결) ────────────────────────────
function CurvedConnector({ direction }: { direction: "left-to-right" | "right-to-left" }) {
  // 두 노드 사이를 잇는 곡선 — 한쪽에서 다른 쪽으로 zigzag
  const path = direction === "left-to-right"
    ? "M 30 0 Q 30 60, 50 70 Q 70 80, 70 120"
    : "M 70 0 Q 70 60, 50 70 Q 30 80, 30 120"
  return (
    <svg className="w-full h-20 sm:h-24" viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden>
      <path d={path} stroke="#d1d5db" strokeWidth="3" strokeDasharray="6 6" fill="none" strokeLinecap="round" />
      {/* 작은 발자국 (별) 따라 */}
      <circle cx="50" cy="70" r="3" fill="#fbbf24" />
    </svg>
  )
}

// ── 가지 path (메인 노드 → 가지 노드) ──────────────────────────────
function BranchConnector() {
  return (
    <svg className="w-16 h-1 inline-block" viewBox="0 0 64 4" preserveAspectRatio="none" aria-hidden>
      <line x1="0" y1="2" x2="64" y2="2" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  )
}

// ── 데코레이션 배경 (별, 구름 등) ───────────────────────────────────
function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <span className="absolute top-10 left-4 text-2xl opacity-30">⭐</span>
      <span className="absolute top-32 right-8 text-3xl opacity-25">☁️</span>
      <span className="absolute top-60 left-8 text-xl opacity-30">✨</span>
      <span className="absolute top-96 right-4 text-2xl opacity-25">⭐</span>
      <span className="absolute top-[700px] left-6 text-3xl opacity-25">☁️</span>
      <span className="absolute top-[900px] right-10 text-2xl opacity-30">✨</span>
      <span className="absolute top-[1200px] left-4 text-3xl opacity-25">⭐</span>
      <span className="absolute top-[1500px] right-8 text-2xl opacity-30">☁️</span>
      <span className="absolute top-[1800px] left-8 text-2xl opacity-25">✨</span>
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
  const mainStages = JOURNEY_STAGES.filter(s => s.type === "main")
  const branchesByMain: Record<string, JourneyStage[]> = {}
  for (const s of JOURNEY_STAGES.filter(s => s.type === "branch")) {
    if (!s.branchOf) continue
    if (!branchesByMain[s.branchOf]) branchesByMain[s.branchOf] = []
    branchesByMain[s.branchOf].push(s)
  }

  // 현재 활성 스테이지
  let activeStageId: string | null = null
  for (const s of mainStages) {
    const p = getStageProgress(s, completedIds, hasCpp)
    if (p.status !== "completed") { activeStageId = s.id; break }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-purple-100 pb-32 relative overflow-hidden">
      <BackgroundDecorations />
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 relative">
        {/* 헤더 */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white rounded-full shadow-md border-2 border-amber-300 mb-3">
            <span className="text-sm font-black text-amber-700">🗺️ {t("학습 여정 맵", "Journey Map")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            {t("문법부터 USACO 정상까지", "From Syntax to USACO Summit")}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t("아래로 내려가며 모험을 완성하세요", "Adventure begins — scroll down")}
          </p>
          {hasCpp && (
            <p className="text-[11px] text-emerald-700 font-bold mt-2 inline-block px-2.5 py-0.5 bg-emerald-50 rounded-full border border-emerald-300">
              ✅ {t("C++ 트랙 — Python 단계 자동 완료", "C++ track — Python auto-completed")}
            </p>
          )}
        </div>

        {/* 지그재그 로드맵 */}
        <div className="relative z-10">
          {mainStages.map((stage, idx) => {
            const progress = getStageProgress(stage, completedIds, hasCpp)
            const isActive = stage.id === activeStageId
            const branches = branchesByMain[stage.id] ?? []
            const isLeftSide = idx % 2 === 0
            const isLast = idx === mainStages.length - 1

            return (
              <div key={stage.id}>
                {/* 메인 노드 줄 — 좌/우 alternating */}
                <div className={cn(
                  "flex items-start gap-2 sm:gap-4 my-4",
                  isLeftSide ? "justify-start pl-2 sm:pl-8" : "justify-end pr-2 sm:pr-8",
                )}>
                  {/* 좌측 정렬일 때: [노드] [가지들] */}
                  {isLeftSide ? (
                    <>
                      <StageMedallion stage={stage} progress={progress} isActive={isActive} isMain />
                      {branches.length > 0 && (
                        <div className="flex items-start pt-12 sm:pt-14">
                          <BranchConnector />
                          <div className="flex flex-col gap-3 items-start">
                            {branches.map(br => {
                              const bp = getStageProgress(br, completedIds, hasCpp)
                              return (
                                <StageMedallion key={br.id} stage={br} progress={bp} isActive={false} isMain={false} />
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* 우측 정렬일 때: [가지들] [노드] */
                    <>
                      {branches.length > 0 && (
                        <div className="flex items-start pt-12 sm:pt-14 flex-row-reverse">
                          <BranchConnector />
                          <div className="flex flex-col gap-3 items-end">
                            {branches.map(br => {
                              const bp = getStageProgress(br, completedIds, hasCpp)
                              return (
                                <StageMedallion key={br.id} stage={br} progress={bp} isActive={false} isMain={false} />
                              )
                            })}
                          </div>
                        </div>
                      )}
                      <StageMedallion stage={stage} progress={progress} isActive={isActive} isMain />
                    </>
                  )}
                </div>

                {/* 노드 사이 곡선 path */}
                {!isLast && (
                  <div className="flex justify-center">
                    <CurvedConnector direction={isLeftSide ? "left-to-right" : "right-to-left"} />
                  </div>
                )}
              </div>
            )
          })}

          {/* 마지막 정상 깃발 */}
          <div className="text-center mt-8 relative z-10">
            <div className="inline-block">
              <span className="text-6xl drop-shadow-lg">🏔️</span>
              <p className="text-sm font-black text-gray-900 mt-1">{t("USACO 정상!", "USACO Summit!")}</p>
            </div>
          </div>
        </div>

        {/* 푯말 안내 */}
        <div className="mt-12 mx-auto max-w-md relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-amber-200 shadow-md text-center">
            <p className="text-xs font-bold text-gray-700">
              💡 {t("모든 단계 자유롭게 클릭 가능", "All stages clickable freely")}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {t(
                "메인은 추천 순서. 가지 (점선 노드) 는 사이드 퀘스트 — 필요할 때 들러도 OK",
                "Main is recommended order. Branches are side quests — visit when needed",
              )}
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
