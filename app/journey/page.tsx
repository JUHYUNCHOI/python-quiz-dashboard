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
import { PythonDiagnosticQuiz } from "@/components/python-diagnostic-quiz"

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

  // 트랙 판별 — 사용자 명시 선택 우선, 없으면 자동 추정 + 첫 진입 시 모달
  const [explicitTrack, setExplicitTrack] = useState<"A" | "B" | "C" | null>(null)
  const [showTrackModal, setShowTrackModal] = useState(false)
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("coderin-track") : null
      if (saved === "A" || saved === "B" || saved === "C") {
        setExplicitTrack(saved)
      } else if (isFresh) {
        // 첫 진입 (진도 0) — 트랙 선택 모달
        setShowTrackModal(true)
      }
    } catch {}
  }, [isFresh])

  const autoTrackId: "A" | "B" | "C" = hasCpp
    ? (completedIds.size > 30 ? "A" : "C")
    : "B"
  const trackId: "A" | "B" | "C" = explicitTrack ?? autoTrackId

  const saveTrack = (t: "A" | "B" | "C") => {
    setExplicitTrack(t)
    try { localStorage.setItem("coderin-track", t) } catch {}
    setShowTrackModal(false)
  }
  const trackLabels: Record<"A" | "B" | "C", { title: string; titleEn: string; emoji: string }> = {
    A: { title: "신입 (Python → C++ → 대회)", titleEn: "Beginner (Python → C++ → Contest)", emoji: "🌱" },
    B: { title: "Python 끝까지", titleEn: "Python all the way", emoji: "🐍" },
    C: { title: "Python 사전지식 (바로 C++)", titleEn: "Has Python (straight to C++)", emoji: "⚡" },
  }

  // 4-5 단계 진도 (트랙별)
  const PY_DONE = Array.from({ length: 52 }, (_, i) => String(i + 1)).filter(id => completedIds.has(id)).length
  const CPP_LIST = ["cpp-1","cpp-2","cpp-3","cpp-4","cpp-5","cpp-6","cpp-7","cpp-8","cpp-p1","cpp-9","cpp-10","cpp-11","cpp-12","cpp-13","cpp-14","cpp-21","cpp-22","cpp-p2","cpp-15","cpp-16","cpp-17","cpp-18","cpp-19","cpp-20","cpp-23","cpp-p3"]
  const CPP_DONE = CPP_LIST.filter(id => completedIds.has(id)).length
  const BANK_SOLVED = (() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("coding-bank-solved") : null
      return raw ? (JSON.parse(raw) as string[]).length : 0
    } catch { return 0 }
  })()
  // 20 알고리즘 토픽 — Wave 1 (Bronze 6) + Wave 2 (Silver 6) + Wave 3 (Gold+ 8)
  const ALL_ALGO_TOPICS = [
    "sorting","prefixsum","array","stackqueue","hashtable","string",      // Wave 1
    "recursion","binarysearch","greedy","graph","unionfind","dp",          // Wave 2
    "backtracking","tree","priorityqueue","topologicalsort","shortestpath","divideconquer","bitmanipulation","trie",  // Wave 3
  ]
  const ALGO_MASTERED = ALL_ALGO_TOPICS.filter(t => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(`algo-${t}-chapter`) : null
      if (!raw) return false
      const d = JSON.parse(raw)
      return d.mastered && Array.isArray(d.completed) && d.completed.length >= 5
    } catch { return false }
  }).length

  const stages = trackId === "B"
    ? [
        { emoji: "🐍", label: "Python 수업+연습", done: PY_DONE, total: 52 },
        { emoji: "💪", label: "코딩 뱅크 (도전)", done: BANK_SOLVED, total: 5 },
        { emoji: "🧩", label: "알고리즘 (Py)", done: ALGO_MASTERED, total: 20 },
        { emoji: "🏆", label: "대회", done: 0, total: 1 },
      ]
    : trackId === "C"
    ? [
        { emoji: "⚡", label: "C++ 수업+연습", done: CPP_DONE, total: CPP_LIST.length },
        { emoji: "💪", label: "코딩 뱅크 (도전)", done: BANK_SOLVED, total: 5 },
        { emoji: "🧩", label: "알고리즘", done: ALGO_MASTERED, total: 20 },
        { emoji: "🏆", label: "대회", done: 0, total: 1 },
      ]
    : [
        { emoji: "🐍", label: "Python 수업+연습", done: PY_DONE, total: 52 },
        { emoji: "⚡", label: "C++ 수업+연습", done: CPP_DONE, total: CPP_LIST.length },
        { emoji: "💪", label: "코딩 뱅크 (도전)", done: BANK_SOLVED, total: 5 },
        { emoji: "🧩", label: "알고리즘", done: ALGO_MASTERED, total: 20 },
        { emoji: "🏆", label: "대회", done: 0, total: 1 },
      ]

  // 현재 단계 idx (첫 미완료 stage)
  const currentStageIdx = stages.findIndex(s => s.done < s.total)
  const trackInfo = trackLabels[trackId]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 pb-32">
      <Header />

      <main className="max-w-3xl mx-auto px-3 sm:px-6 pt-6">
        {/* 트랙 선택 모달 — 첫 진입 또는 변경 시 */}
        {showTrackModal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              {showDiagnostic ? (
                <PythonDiagnosticQuiz
                  onResult={(track) => { saveTrack(track); setShowDiagnostic(false) }}
                  onCancel={() => setShowDiagnostic(false)}
                />
              ) : (
                <>
                  <h2 className="text-xl font-black text-amber-900 mb-1">
                    🛤️ {t("나의 학습 트랙 선택", "Pick your track")}
                  </h2>
                  <p className="text-xs text-gray-600 mb-4">
                    {t("나중에 언제든 바꿀 수 있어요.", "Changeable anytime later.")}
                  </p>
                  <div className="space-y-2">
                    {(["A", "B", "C"] as const).map(k => (
                      <button
                        key={k}
                        onClick={() => saveTrack(k)}
                        className="w-full text-left p-3 rounded-xl border-2 border-amber-200 hover:border-orange-400 hover:bg-orange-50 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{trackLabels[k].emoji}</span>
                          <span className="font-black text-sm text-amber-900">
                            Track {k} — {t(trackLabels[k].title, trackLabels[k].titleEn)}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 ml-7">
                          {k === "A" && t("처음 코딩 — Python 부터 차근차근", "First time — start from Python")}
                          {k === "B" && t("Python 만으로 USACO 까지 (Python 제출 가능)", "Python only, all the way to USACO (Python accepted)")}
                          {k === "C" && t("Python 이미 알아요 — 바로 C++ 부터", "Already know Python — start with C++")}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* 진단 퀴즈 — Python 안다고 자신 있는지 체크 */}
                  <button
                    onClick={() => setShowDiagnostic(true)}
                    className="w-full mt-3 p-3 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">🎯</span>
                      <span className="font-black text-sm text-blue-900">
                        {t("Python 진단 퀴즈 풀기 (5 문제)", "Take Python diagnostic (5 questions)")}
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-700 ml-7">
                      {t("자동으로 Track A 또는 C 추천", "Auto-recommend Track A or C")}
                    </p>
                  </button>

                  {explicitTrack && (
                    <button
                      onClick={() => setShowTrackModal(false)}
                      className="w-full mt-3 text-xs text-gray-500 hover:text-gray-700"
                    >
                      {t("취소", "Cancel")}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* 트랙 표시 — "어디 있는지" 항상 명확 */}
        <div className="mb-3 flex items-center justify-between gap-2 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0">{trackInfo.emoji}</span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">
                {t("나의 학습 트랙", "My Track")}
              </p>
              <p className="text-sm font-black text-amber-900 truncate">
                {t(trackInfo.title, trackInfo.titleEn)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTrackModal(true)}
            className="shrink-0 text-[11px] font-bold text-amber-700 hover:text-amber-900 underline decoration-dotted"
          >
            {t("변경", "Change")}
          </button>
        </div>

        {/* 📍 지금 할 일 — 결정 피로 0 */}
        <Link
          href={nextAction.href}
          className="block mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-200/50 hover:shadow-2xl active:scale-[0.99] transition-all"
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

        {/* 5 단계 선형 진도 — "전체 여정 어디" 한눈에 */}
        <div className="mb-5 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-amber-200 p-3 sm:p-4">
          <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 px-1">
            {t("전체 여정 — 단계별", "Full journey — by stage")}
          </p>
          <div className="space-y-2">
            {stages.map((s, idx) => {
              const pct = Math.round((s.done / s.total) * 100)
              const isDone = s.done >= s.total
              const isCurrent = idx === currentStageIdx
              const isLocked = currentStageIdx >= 0 && idx > currentStageIdx
              return (
                <div key={s.label} className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-lg",
                  isCurrent && "bg-orange-100 border border-orange-300",
                  isDone && "opacity-80",
                )}>
                  <span className="text-lg shrink-0">{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "text-xs font-black truncate",
                        isCurrent ? "text-orange-800" : isDone ? "text-emerald-700" : "text-gray-500",
                      )}>{idx + 1}. {s.label}</span>
                      {isCurrent && (
                        <span className="text-[8px] font-black px-1 py-0.5 bg-orange-500 text-white rounded">NOW</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full transition-all duration-500",
                          isDone ? "bg-emerald-400" : isCurrent ? "bg-orange-400" : "bg-gray-200",
                        )} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold tabular-nums shrink-0",
                        isCurrent ? "text-orange-700" : isDone ? "text-emerald-700" : "text-gray-400",
                      )}>
                        {isDone ? "✓" : isLocked ? "🔒" : `${s.done}/${s.total}`}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

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

        {/* 💡 옆길 — 부족하면 더 풀 곳 (선택) */}
        <div className="mt-6 mx-auto max-w-md space-y-2">
          <div className="bg-blue-50 rounded-xl p-3 border-2 border-blue-200">
            <p className="text-xs font-black text-blue-900 mb-2">
              💡 {t("부족하면 옆길로 더 연습 (선택)", "Need more? Side paths (optional)")}
            </p>
            <div className="space-y-1.5">
              <Link href="/practice" className="block text-[11px] text-blue-800 hover:text-blue-900 hover:underline">
                → {t("수업별 연습 문제 더 풀기 (클러스터)", "More lesson practice (clusters)")}
              </Link>
              <Link href="/coding-bank" className="block text-[11px] text-blue-800 hover:text-blue-900 hover:underline">
                → {t("코딩 뱅크 — 종합 도전 문제", "Coding Bank — challenge problems")}
              </Link>
              <Link href="/algo" className="block text-[11px] text-blue-800 hover:text-blue-900 hover:underline">
                → {t("알고리즘 토픽 — 자유롭게 골라 풀기", "Algorithm topics — pick freely")}
              </Link>
            </div>
          </div>

          {/* 3 경로 설명 */}
          <div className="bg-amber-50 rounded-xl p-3 border-2 border-amber-300">
            <p className="text-xs font-black text-amber-900 mb-1.5 text-center">
              ⭐ {t("3가지 경로 (자유 선택)", "3 Paths (Free Choice)")}
            </p>
            <div className="space-y-1 text-[11px] text-amber-800">
              <p><b>A.</b> 🐍 → ⚡ → 💪 → 🧠 → 🏆 {t("(신입 — Python 부터 종합)", "(Beginner — Python first)")}</p>
              <p><b>B.</b> 🐍 → 💪 → 🧠 → 🏆 {t("(Python 만 — USACO Py 제출)", "(Python only)")}</p>
              <p><b>C.</b> ⚡ → 💪 → 🧠 → 🏆 {t("(Python 사전지식 — 바로 C++)", "(Has Python — straight to C++)")}</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
