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
import { useGamification } from "@/hooks/use-gamification"
import { PythonDiagnosticQuiz } from "@/components/python-diagnostic-quiz"

// ── 6 스테이지 좌표 (viewBox 100×180) ────────────────────────────
interface MapPlacement {
  x: number   // 0-100
  y: number   // 0-180
  landmark: string
}

// 그래프 노드 위치 — 깨끗한 vertical flow + C++ 가지 오른쪽
// 일러스트 의존 X. 좌표 자유롭게 조정 가능.
const PLACEMENTS: Record<string, MapPlacement> = {
  "python":          { x: 28, y: 12, landmark: "🌱" },
  "python-practice": { x: 28, y: 35, landmark: "💪" },
  "cpp":             { x: 72, y: 35, landmark: "⚡" },
  "cpp-practice":    { x: 72, y: 55, landmark: "🌉" },
  "algo":            { x: 28, y: 65, landmark: "🧩" },
  "usaco":           { x: 28, y: 88, landmark: "🏆" },
}

// (이전 graph edges 는 트랙별 세로 한 줄 구조로 대체됨 — STAGES_BY_TRACK 참고)

// ── 노드 — 세로 흐름 안 단일 항목 (모달 카드 스타일) ─────────────
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
  const isInProgress = progress.status === "in-progress"
  const isUntraveled = !isDone && !isInProgress && !isActive

  // 박스 배경 — *반드시 불투명* (뒤에 SVG 라인 가리기 위해 — 사용자 지적)
  const boxColor = isDone
    ? "border-emerald-500 bg-emerald-50"
    : isActive
      ? "border-orange-500 bg-orange-50"
      : isInProgress
        ? "border-amber-400 bg-amber-50"
        : "border-gray-300 bg-white"

  const labelColor = isDone ? "text-emerald-700"
    : isActive ? "text-orange-700"
    : isInProgress ? "text-amber-700"
    : isUntraveled ? "text-gray-400"
    : "text-gray-500"

  return (
    <Link
      href={stage.href}
      aria-label={stage.title}
      title={t(stage.title, stage.titleEn)}
      className="group relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95"
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl border-2 shadow-md w-16 h-16 sm:w-20 sm:h-20 transition-all group-hover:shadow-lg",
          boxColor
        )}
      >
        {isActive && (
          <span className="absolute inset-0 rounded-xl ring-4 ring-orange-400 ring-offset-2 animate-pulse pointer-events-none" />
        )}
        <span className={cn("text-3xl sm:text-4xl drop-shadow-sm", isUntraveled && "grayscale opacity-50")}>
          {placement.landmark}
        </span>
      </div>
      <span className={cn(
        "mt-2 font-black whitespace-nowrap leading-tight",
        labelColor,
        // 영어는 시각적으로 작아 보임 → 한 단계 ↑
        lang === "en" ? "text-sm sm:text-base" : "text-xs sm:text-sm"
      )}>
        {lang === "en" ? stage.titleEn : stage.title}
      </span>
    </Link>
  )
}

// ── 트랙별 스테이지 순서 — 자기 길만 보여줌 ─────────────────
const STAGES_BY_TRACK: Record<"A" | "B" | "C", string[]> = {
  A: ["python", "python-practice", "cpp", "cpp-practice", "algo", "usaco"],
  B: ["python", "python-practice", "algo", "usaco"],
  C: ["cpp", "cpp-practice", "algo", "usaco"],
}

// ── 노드별 좌표 (Track A Y-자 layout) ─────────
// Track A: 위 = Python 가로 한 줄, 아래 = C++ 가로 한 줄, 오른쪽 = 알고+USACO 합류
// viewBox 100 × 60
const POS_TRACK_A: Record<string, { x: number; y: number }> = {
  "python":          { x: 9,  y: 15 },
  "python-practice": { x: 28, y: 15 },
  "cpp":             { x: 9,  y: 45 },
  "cpp-practice":    { x: 28, y: 45 },
  "algo":            { x: 60, y: 30 },
  "usaco":           { x: 87, y: 30 },
}
// Track A 연결선 path (둥근 각, 통과여부는 양 끝 노드 둘 다 완료 시 컬러)
// 각 path: [from-id, to-id, "M..L..L.."]
const CONNECTIONS_TRACK_A: Array<[string, string, string]> = [
  ["python",          "python-practice", "M 9 15 L 28 15"],
  ["cpp",             "cpp-practice",    "M 9 45 L 28 45"],
  ["python-practice", "algo",            "M 28 15 L 50 15 L 50 30 L 60 30"],
  ["cpp-practice",    "algo",            "M 28 45 L 50 45 L 50 30 L 60 30"],
  ["algo",            "usaco",           "M 60 30 L 87 30"],
]

// Track B / C: 가로 한 줄 (viewBox 100 × 25)
const POS_HORIZONTAL: Record<"B" | "C", Record<string, { x: number; y: number }>> = {
  B: {
    "python":          { x: 8,  y: 12 },
    "python-practice": { x: 35, y: 12 },
    "algo":            { x: 62, y: 12 },
    "usaco":           { x: 88, y: 12 },
  },
  C: {
    "cpp":             { x: 8,  y: 12 },
    "cpp-practice":    { x: 35, y: 12 },
    "algo":            { x: 62, y: 12 },
    "usaco":           { x: 88, y: 12 },
  },
}

function GameMap({
  completedIds,
  hasCpp,
  trackId,
}: {
  completedIds: Set<string | number>
  hasCpp: boolean
  trackId: "A" | "B" | "C"
}) {
  const { t } = useLanguage()

  // 트랙별 자기 경로만
  const stageIds = STAGES_BY_TRACK[trackId] ?? STAGES_BY_TRACK["A"]
  const stages = stageIds
    .map(id => JOURNEY_STAGES.find(s => s.id === id))
    .filter((s): s is JourneyStage => !!s)

  // 활성 = 트랙 안 첫 미완료
  let activeStageId: string | null = null
  for (const s of stages) {
    const p = getStageProgress(s, completedIds, hasCpp)
    if (p.status !== "completed") { activeStageId = s.id; break }
  }

  // 상태 헬퍼
  const isStageDone = (id: string) => {
    const s = JOURNEY_STAGES.find(x => x.id === id)
    if (!s) return false
    return getStageProgress(s, completedIds, hasCpp).status === "completed"
  }

  // Track A: Y-자, B/C: 가로 한 줄
  const layout = trackId === "A"
    ? { positions: POS_TRACK_A, connections: CONNECTIONS_TRACK_A, viewH: 60, aspect: "5 / 3" }
    : (() => {
        const pos = POS_HORIZONTAL[trackId]
        const orderedIds = STAGES_BY_TRACK[trackId]
        // 가로 연결: 인접 노드 두 개 잇는 직선
        const conns: Array<[string, string, string]> = []
        for (let i = 0; i < orderedIds.length - 1; i++) {
          const a = orderedIds[i], b = orderedIds[i + 1]
          const pa = pos[a], pb = pos[b]
          if (pa && pb) conns.push([a, b, `M ${pa.x} ${pa.y} L ${pb.x} ${pb.y}`])
        }
        return { positions: pos, connections: conns, viewH: 25, aspect: "4 / 1" }
      })()

  const activePos = activeStageId ? layout.positions[activeStageId] : null

  return (
    <div className="w-full mx-auto rounded-3xl shadow-md border-2 border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-4 sm:p-6">
      <p className="text-center text-[11px] sm:text-xs font-black text-amber-700 uppercase tracking-widest mb-4">
        🗺️ {t("나의 학습 여정", "My Journey")}
      </p>

      {/* ── 모바일 (sm 미만) — 세로 스택 ────────────────────────── */}
      <div className="sm:hidden flex flex-col items-center gap-1">
        {stages.map((stage, idx) => {
          const placement = PLACEMENTS[stage.id]
          if (!placement) return null
          const progress = getStageProgress(stage, completedIds, hasCpp)
          const isActive = stage.id === activeStageId
          const isLast = idx === stages.length - 1
          const arrowTraveled = !isLast && isStageDone(stage.id) && isStageDone(stages[idx + 1].id)
          return (
            <div key={stage.id} className="flex flex-col items-center">
              <div className="relative">
                {isActive && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-12 pointer-events-none z-10 flex flex-col items-center gap-0.5 animate-bounce whitespace-nowrap">
                    <div className="bg-orange-500 rounded-full px-2 py-0.5 shadow-md border-2 border-white text-[10px] font-black text-white">
                      ▶ {t("여기!", "You!")}
                    </div>
                    <span className="text-lg drop-shadow">🦒</span>
                  </div>
                )}
                <LandmarkNode
                  stage={stage}
                  placement={placement}
                  progress={progress}
                  isActive={isActive}
                />
              </div>
              {!isLast && (
                <span className={cn(
                  "text-2xl my-0.5 leading-none",
                  arrowTraveled ? "text-amber-500" : "text-gray-300"
                )}>↓</span>
              )}
            </div>
          )
        })}
      </div>

      {/* ── 데스크탑 (sm 이상) — Y-자 (A) / 가로 한 줄 (B,C) ──── */}
      <div className="hidden sm:block relative w-full" style={{ aspectRatio: layout.aspect }}>
        {/* SVG 연결선 — 각이 둥근 직선 */}
        <svg
          viewBox={`0 0 100 ${layout.viewH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {layout.connections.map(([a, b, d], i) => {
            const traveled = isStageDone(a) && isStageDone(b)
            return (
              <path
                key={i}
                d={d}
                stroke={traveled ? "#f59e0b" : "#d1d5db"}
                strokeWidth={traveled ? 1.6 : 1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={traveled ? undefined : "1.8 1.6"}
                opacity={traveled ? 0.95 : 0.7}
              />
            )
          })}
        </svg>

        {/* 노드들 — 절대 위치 */}
        {stages.map(stage => {
          const pos = layout.positions[stage.id]
          if (!pos) return null
          const placement = PLACEMENTS[stage.id]
          if (!placement) return null
          const progress = getStageProgress(stage, completedIds, hasCpp)
          const isActive = stage.id === activeStageId
          return (
            <div
              key={stage.id}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y / layout.viewH * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <LandmarkNode
                stage={stage}
                placement={placement}
                progress={progress}
                isActive={isActive}
              />
            </div>
          )
        })}

        {/* 🦒 아바타 — 활성 노드 위 */}
        {activePos && (
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: `${activePos.x}%`,
              top: `${activePos.y / layout.viewH * 100}%`,
              transform: "translate(-50%, -180%)",
            }}
          >
            <div className="flex flex-col items-center gap-0.5 animate-bounce">
              <div className="bg-orange-500 rounded-full px-2 py-0.5 shadow-md border-2 border-white text-[11px] font-black text-white whitespace-nowrap">
                ▶ {t("여기!", "You!")}
              </div>
              <span className="text-xl drop-shadow">🦒</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function JourneyPage() {
  const { t, lang } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const { isStreakAtRisk, dailyStreak } = useGamification()
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

  // Smart-next 의 preferredTrack 을 user track 에 맞춰 결정:
  // - Track A (신입): Python 진도 < 50 → python, 그 이후 → cpp
  // - Track B (Python only): 항상 python
  // - Track C (C++ only): 항상 cpp
  const PY_DONE_LOCAL = Array.from({ length: 52 }, (_, i) => String(i + 1)).filter(id => completedIds.has(id)).length
  const preferredTrack: "python" | "cpp" | "pseudo" =
    trackId === "B" ? "python"
    : trackId === "C" ? "cpp"
    : (PY_DONE_LOCAL < 50 ? "python" : "cpp")  // Track A — Python 거의 끝났을 때 cpp 전환
  const nextAction = getSmartNext(completedIds, preferredTrack)

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

  // 4-5 단계 진도 (트랙별) — PY_DONE 은 위에서 이미 계산 (PY_DONE_LOCAL)
  const PY_DONE = PY_DONE_LOCAL
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
        // 코딩 뱅크(cpp-16 잠금, C++ STL)는 Python 트랙에서 제외 — 메인 지도·smart-next 와 일치
        { emoji: "🐍", label: "Python 수업+연습", done: PY_DONE, total: 52 },
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
        {/* 트랙 선택 모달 — 4 정사각형 박스 가로 배치 */}
        {showTrackModal && (
          <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto p-3 sm:p-4">
            <div className="relative bg-white rounded-3xl max-w-5xl w-full mx-auto my-4 p-5 sm:p-8 shadow-2xl">
              {/* X 닫기 — 항상 위, 스크롤 무관 */}
              <button
                onClick={() => setShowTrackModal(false)}
                aria-label={t("닫기", "Close")}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center text-lg font-black shadow-sm active:scale-90 transition-all"
              >
                ✕
              </button>

              {showDiagnostic ? (
                <PythonDiagnosticQuiz
                  onResult={(track) => { saveTrack(track); setShowDiagnostic(false) }}
                  onCancel={() => setShowDiagnostic(false)}
                />
              ) : (
                <>
                  <div className="text-center mb-5 sm:mb-8 pr-8">
                    <h2 className="text-2xl sm:text-4xl font-black text-amber-900 mb-2 sm:mb-3">
                      {t("어떤 길로 갈래요?", "How do you want to learn?")}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      {t("나에게 맞는 거 하나 고르면 끝. 나중에 바꿔도 OK.", "Pick what fits. Changeable later.")}
                    </p>
                  </div>

                  {/* 4 박스 — 학습 흐름 시각이 메인 (세로 흐름, 큰 아이콘) */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Track A — 처음 */}
                    <button
                      onClick={() => saveTrack("A")}
                      className="flex flex-col p-4 sm:p-5 rounded-2xl border-2 border-amber-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg active:scale-95 transition-all text-center"
                    >
                      <p className="font-black text-xl sm:text-2xl text-amber-900 leading-snug mb-1 break-keep">
                        {t("코딩이 처음이에요", "New to coding")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("Python 부터 모두 배워요", "Start from Python — full course")}
                      </p>

                      <p className="text-[10px] sm:text-xs font-black text-amber-700 uppercase tracking-wider mb-2">
                        {t("학습 순서", "Order")}
                      </p>
                      {/* 학습 흐름 — 세로 큰 아이콘 */}
                      <div className="flex flex-col items-center gap-1 flex-1 justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🐍</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">Python 52강</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">⚡</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">C++ 23강</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🧩</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("알고리즘", "Algos")}</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🏆</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("대회 도전", "Contest")}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-orange-600 font-black mt-4">
                        {t("Track A 선택", "Choose A")} →
                      </p>
                    </button>

                    {/* Track B — Python 만 */}
                    <button
                      onClick={() => saveTrack("B")}
                      className="flex flex-col p-4 sm:p-5 rounded-2xl border-2 border-amber-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg active:scale-95 transition-all text-center"
                    >
                      <p className="font-black text-xl sm:text-2xl text-amber-900 leading-snug mb-1 break-keep">
                        {t("Python 만 할래요", "Python only")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("C++ 없이 Python 으로만", "No C++ — Python only")}
                      </p>

                      <p className="text-[10px] sm:text-xs font-black text-amber-700 uppercase tracking-wider mb-2">
                        {t("학습 순서", "Order")}
                      </p>
                      <div className="flex flex-col items-center gap-1 flex-1 justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🐍</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">Python 52강</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🧩</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("알고리즘 (Py)", "Algos (Py)")}</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🏆</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("대회 (Py)", "Contest (Py)")}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-orange-600 font-black mt-4">
                        {t("Track B 선택", "Choose B")} →
                      </p>
                    </button>

                    {/* Track C — Python 알고 있음 */}
                    <button
                      onClick={() => saveTrack("C")}
                      className="flex flex-col p-4 sm:p-5 rounded-2xl border-2 border-amber-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg active:scale-95 transition-all text-center"
                    >
                      <p className="font-black text-xl sm:text-2xl text-amber-900 leading-snug mb-1 break-keep">
                        {t("C++ 부터", "Start with C++")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("Python 알아야 해요", "Must know Python")}
                      </p>

                      <p className="text-[10px] sm:text-xs font-black text-amber-700 uppercase tracking-wider mb-2">
                        {t("학습 순서", "Order")}
                      </p>
                      <div className="flex flex-col items-center gap-1 flex-1 justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">⚡</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">C++ 23강</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🧩</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("알고리즘", "Algos")}</span>
                        </div>
                        <span className="text-amber-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🏆</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("대회 도전", "Contest")}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-orange-600 font-black mt-4">
                        {t("Track C 선택", "Choose C")} →
                      </p>
                    </button>

                    {/* 진단 퀴즈 */}
                    <button
                      onClick={() => setShowDiagnostic(true)}
                      className="flex flex-col p-4 sm:p-5 rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg active:scale-95 transition-all text-center"
                    >
                      <p className="font-black text-xl sm:text-2xl text-blue-900 leading-snug mb-1 break-keep">
                        {t("잘 모르겠어요", "Not sure?")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("5 문제 풀어보고 — 내 트랙 자동 추천", "Take 5 Qs — auto-recommend my track")}
                      </p>

                      <p className="text-[10px] sm:text-xs font-black text-blue-700 uppercase tracking-wider mb-2">
                        {t("진행", "Steps")}
                      </p>
                      <div className="flex flex-col items-center gap-1 flex-1 justify-center">
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">📝</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("5 문제", "5 Qs")}</span>
                        </div>
                        <span className="text-blue-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">🎯</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("자동 추천", "Auto-pick")}</span>
                        </div>
                        <span className="text-blue-400 text-lg">↓</span>
                        <div className="flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl">✅</span>
                          <span className="text-[10px] sm:text-xs font-bold text-gray-600 mt-0.5">{t("내 트랙", "Your track")}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-blue-600 font-black mt-4">
                        {t("퀴즈 시작", "Take quiz")} →
                      </p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* 🔥 Streak 끊김 알림 — 어제 안 들어왔으면 부드러운 격려 */}
        {isStreakAtRisk && dailyStreak > 0 && (
          <div className="mb-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 px-3 py-2.5 flex items-center gap-2">
            <span className="text-2xl shrink-0">🔥</span>
            <div className="flex-1 min-w-0">
              <p className={cn("font-black text-red-700", lang === "en" ? "text-sm" : "text-xs")}>
                {t(`${dailyStreak}일 연속 학습 — 어제 끊겼어요!`, `${dailyStreak}-day streak — broken yesterday!`)}
              </p>
              <p className={cn("text-red-600/80 mt-0.5 leading-snug break-keep", lang === "en" ? "text-xs" : "text-[11px]")}>
                {t("오늘 한 강만 들어도 다시 1일 시작 — 천천히 다시 쌓아봐요.", "1 lesson today restarts your streak — take it slow!")}
              </p>
            </div>
          </div>
        )}

        {/* 🔥 Streak 유지 — 양수일 때 + 끊김 X */}
        {!isStreakAtRisk && dailyStreak > 0 && (() => {
          const milestones = [7, 30, 100, 365]
          const isMilestone = milestones.includes(dailyStreak)
          const nextMilestone = milestones.find(m => m > dailyStreak)
          const daysToNext = nextMilestone ? nextMilestone - dailyStreak : null
          return (
            <div className={cn(
              "mb-3 rounded-xl px-3 py-2 flex items-center gap-2",
              isMilestone
                ? "bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-2 border-amber-400 shadow-md"
                : "bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"
            )}>
              <span className={cn("shrink-0", isMilestone ? "text-2xl animate-bounce" : "text-lg")}>🔥</span>
              <div className="flex-1 min-w-0">
                {isMilestone ? (
                  <p className={cn("font-black text-orange-700 break-keep", lang === "en" ? "text-sm" : "text-xs")}>
                    🎉 {t(`${dailyStreak}일 연속 달성! 대단해요!`, `${dailyStreak}-day streak! Amazing!`)}
                  </p>
                ) : (
                  <p className={cn("font-black text-orange-700", lang === "en" ? "text-sm" : "text-xs")}>
                    {t(`${dailyStreak}일 연속 학습 중`, `${dailyStreak}-day streak`)}
                    {daysToNext !== null && (
                      <span className="ml-1 font-normal text-orange-500/80 text-[11px]">
                        · {t(`${nextMilestone}일까지 ${daysToNext}일`, `${daysToNext}d to ${nextMilestone}`)}
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          )
        })()}

        {/* 트랙 표시 — "어디 있는지" 항상 명확 */}
        <div className="mb-3 flex items-center justify-between gap-2 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0">{trackInfo.emoji}</span>
            <div className="min-w-0">
              <p className={cn(
                "font-bold text-amber-700 uppercase tracking-wider",
                lang === "en" ? "text-[11px]" : "text-[9px]"
              )}>
                {t("나의 학습 트랙", "My Track")}
              </p>
              <p className={cn(
                "font-black text-amber-900 truncate",
                lang === "en" ? "text-base" : "text-sm"
              )}>
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

        {/* 🗺️ 보물지도 — 학생이 한눈에 "내 여정" 본다 */}
        <div className="mb-5">
          <GameMap completedIds={completedIds} hasCpp={hasCpp} trackId={trackId} />
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

        {hasCpp && (
          <div className="mb-4 text-center">
            <p className="text-xs sm:text-sm text-emerald-700 font-bold inline-block px-3 py-1 bg-emerald-100 rounded-full border border-emerald-400 break-keep">
              🐍 {t("Python 이미 안다고 선택했어요 — Python 수업은 건너뛰기 OK", "You said you know Python — Python lessons skipped")}
            </p>
          </div>
        )}

        {/* 막힐 때 / 더 풀고 싶을 때 안내 — 작은 한 줄 링크 (분산 효과 최소) */}
        <div className="mt-6 text-center text-xs sm:text-sm text-gray-500 break-keep px-2">
          <span className="block sm:inline">💡 {t("더 풀고 싶으면:", "Want more practice?")} </span>
          <span className="inline-block mt-1 sm:mt-0">
            <Link href="/practice" className="text-blue-600 hover:underline font-bold">
              {t("수업별 연습", "Lesson Clusters")}
            </Link>
            <span className="mx-1.5 text-gray-300">·</span>
            <Link href="/coding-bank" className="text-amber-600 hover:underline font-bold">
              {t("코딩 뱅크", "Coding Bank")}
            </Link>
            <span className="mx-1.5 text-gray-300">·</span>
            <Link href="/algo" className="text-purple-600 hover:underline font-bold">
              {t("알고리즘 토픽", "Algo Topics")}
            </Link>
          </span>
        </div>

      </main>

      <BottomNav />
    </div>
  )
}
