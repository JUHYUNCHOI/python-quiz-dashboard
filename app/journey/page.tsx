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
  type StageStatus,
} from "@/lib/journey-stages"
import { CheckCircle2, ChevronRight, Lock, Sparkles } from "lucide-react"

const RANK_COLORS: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  bronze: { bg: "bg-amber-50",   border: "border-amber-300",  text: "text-amber-700",   ring: "ring-amber-300" },
  silver: { bg: "bg-slate-50",   border: "border-slate-300",  text: "text-slate-600",   ring: "ring-slate-300" },
  gold:   { bg: "bg-yellow-50",  border: "border-yellow-300", text: "text-yellow-700",  ring: "ring-yellow-300" },
  master: { bg: "bg-purple-50",  border: "border-purple-300", text: "text-purple-700",  ring: "ring-purple-300" },
  bridge: { bg: "bg-emerald-50", border: "border-emerald-300",text: "text-emerald-700", ring: "ring-emerald-300" },
}

const STATUS_BADGE: Record<StageStatus, { label: string; labelEn: string; color: string }> = {
  "locked":      { label: "잠김",     labelEn: "Locked",     color: "bg-gray-200 text-gray-500" },
  "available":   { label: "시작",     labelEn: "Start",      color: "bg-orange-500 text-white" },
  "in-progress": { label: "진행 중",  labelEn: "In Progress",color: "bg-blue-500 text-white animate-pulse" },
  "completed":   { label: "완료",     labelEn: "Done",       color: "bg-green-500 text-white" },
}

export default function JourneyPage() {
  const { t, lang } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [completedIds, setCompletedIds] = useState<Set<string | number>>(new Set())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      // localStorage 즉시 로드
      try {
        const raw = localStorage.getItem("completedLessons")
        if (raw) {
          const arr = JSON.parse(raw)
          if (Array.isArray(arr)) setCompletedIds(new Set(arr))
        }
      } catch {}

      // Supabase 백그라운드 로드
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
      if (!cancelled) setLoaded(true)
    }
    load()
    return () => { cancelled = true }
  }, [isAuthenticated, user])

  const hasCpp = hasCppTrackProgress(completedIds)

  // 메인 / 가지 분리
  const mainStages = JOURNEY_STAGES.filter(s => s.type === "main")
  const branchesByMain: Record<string, JourneyStage[]> = {}
  for (const s of JOURNEY_STAGES.filter(s => s.type === "branch")) {
    if (!s.branchOf) continue
    if (!branchesByMain[s.branchOf]) branchesByMain[s.branchOf] = []
    branchesByMain[s.branchOf].push(s)
  }

  // 현재 활성 스테이지 — 첫 번째 in-progress 또는 available
  let activeStageId: string | null = null
  for (const s of mainStages) {
    const p = getStageProgress(s, completedIds, hasCpp)
    if (p.status !== "completed") { activeStageId = s.id; break }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50 pb-24">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🗺️</div>
          <h1 className="text-3xl font-black text-gray-900">{t("나의 학습 여정", "My Journey")}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t("문법 → 알고리즘 → USACO 까지 가는 길", "From syntax to algorithms to USACO")}
          </p>
          {hasCpp && (
            <p className="text-xs text-emerald-600 font-semibold mt-2">
              ✅ {t("C++ 트랙 학생 — Python 단계 자동 완료", "C++ track — Python stages auto-completed")}
            </p>
          )}
        </div>

        {/* 로드맵 */}
        <div className="relative">
          {/* 메인 spine — 노드 사이 세로 점선 */}
          <div className="flex flex-col items-center gap-4">
            {mainStages.map((stage, idx) => {
              const progress = getStageProgress(stage, completedIds, hasCpp)
              const isActive = stage.id === activeStageId
              const branches = branchesByMain[stage.id] ?? []
              const isLast = idx === mainStages.length - 1
              const rank = RANK_COLORS[stage.rank]
              const status = STATUS_BADGE[progress.status]

              return (
                <div key={stage.id} className="w-full flex flex-col items-center">
                  {/* 메인 노드 + 가지 (가로 정렬) */}
                  <div className="w-full flex items-center justify-center gap-3 relative">
                    {/* 메인 스테이지 카드 */}
                    <Link
                      href={stage.href}
                      className={cn(
                        "flex-1 max-w-md block rounded-2xl border-2 p-4 sm:p-5 transition-all relative",
                        rank.bg, rank.border,
                        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]",
                        isActive && "ring-4 ring-offset-2 shadow-xl",
                        isActive && rank.ring,
                        progress.status === "completed" && "opacity-90",
                      )}
                    >
                      {/* "여기!" 인디케이터 */}
                      {isActive && progress.status !== "completed" && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-full shadow-md whitespace-nowrap">
                          ▶ {t("여기!", "You are here!")}
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        {/* 큰 이모지 — 게임 노드 느낌 */}
                        <div className={cn(
                          "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 border-2",
                          progress.status === "completed" ? "bg-green-100 border-green-300" : `bg-white ${rank.border}`,
                        )}>
                          {progress.status === "completed" ? "✅" : stage.emoji}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* 제목 + 상태 배지 */}
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-base sm:text-lg font-black text-gray-900">
                              {lang === "en" ? stage.titleEn : stage.title}
                            </h3>
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide",
                              rank.bg, rank.text, "border", rank.border,
                            )}>
                              {stage.rank}
                            </span>
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full",
                              status.color,
                            )}>
                              {t(status.label, status.labelEn)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {lang === "en" ? stage.descriptionEn : stage.description}
                          </p>

                          {/* 진도 바 */}
                          {progress.total > 0 && (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-white/80 rounded-full overflow-hidden border border-gray-200">
                                <div
                                  className={cn(
                                    "h-full transition-all duration-500",
                                    progress.status === "completed" ? "bg-green-500" : "bg-orange-500",
                                  )}
                                  style={{ width: `${progress.pct}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-gray-500 tabular-nums shrink-0">
                                {progress.done}/{progress.total}
                              </span>
                            </div>
                          )}
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 self-center" />
                      </div>
                    </Link>

                    {/* 가지 (오른쪽에 작게) */}
                    {branches.length > 0 && (
                      <div className="hidden md:flex flex-col gap-2 absolute left-full top-1/2 -translate-y-1/2 ml-4 w-[200px]">
                        {/* 분기 라벨 */}
                        <span className="text-[10px] font-bold text-gray-400 -mb-1 ml-1">
                          ↳ {t("가지", "Branch")}
                        </span>
                        {branches.map(br => {
                          const bp = getStageProgress(br, completedIds, hasCpp)
                          const bRank = RANK_COLORS[br.rank]
                          return (
                            <Link
                              key={br.id}
                              href={br.href}
                              className={cn(
                                "block rounded-xl border-2 border-dashed p-2.5 text-xs transition-all hover:scale-105 hover:shadow-md",
                                bRank.bg, bRank.border,
                              )}
                            >
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-lg">{br.emoji}</span>
                                <span className="font-bold text-gray-900 text-xs">
                                  {lang === "en" ? br.titleEn : br.title}
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-500 leading-tight">
                                {lang === "en" ? br.descriptionEn : br.description}
                              </p>
                              {bp.total > 0 && (
                                <p className="text-[9px] text-gray-400 mt-1 tabular-nums">
                                  {bp.done}/{bp.total} ({bp.pct}%)
                                </p>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* 모바일용 가지 — 메인 아래 inline */}
                  {branches.length > 0 && (
                    <div className="md:hidden w-full max-w-md mt-2 pl-8 space-y-2 relative">
                      <span className="text-[10px] font-bold text-gray-400">↳ {t("가지", "Branch")}</span>
                      {branches.map(br => {
                        const bp = getStageProgress(br, completedIds, hasCpp)
                        const bRank = RANK_COLORS[br.rank]
                        return (
                          <Link
                            key={br.id}
                            href={br.href}
                            className={cn(
                              "block rounded-xl border-2 border-dashed p-2.5 transition-all",
                              bRank.bg, bRank.border,
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{br.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-gray-900">
                                  {lang === "en" ? br.titleEn : br.title}
                                </p>
                                <p className="text-[10px] text-gray-500 leading-tight">
                                  {lang === "en" ? br.descriptionEn : br.description}
                                </p>
                              </div>
                              {bp.total > 0 && (
                                <span className="text-[10px] font-bold text-gray-400 tabular-nums">
                                  {bp.done}/{bp.total}
                                </span>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}

                  {/* 메인 노드 사이 점선 */}
                  {!isLast && (
                    <div className="h-6 w-0.5 border-l-2 border-dashed border-gray-300 my-1" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            {t(
              "💡 모든 단계 자유롭게 클릭 가능 — 추천 순서일 뿐이에요",
              "💡 All stages are clickable — this is just the recommended path",
            )}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
