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

// 좌표는 일러스트 배경 (public/journey-map.png) 위 % 위치
// 그림이 그려진 노드 스탬프 *정중앙* 에 맞춰 조정. 그림 교체 시 좌표만 갱신.
// 현재 그림: "코딩 성장 로드맵" (ChatGPT 생성, 2026-05-28)
const PLACEMENTS: Record<string, MapPlacement> = {
  "python":          { x: 15, y: 24, landmark: "🌱" },
  "python-practice": { x: 34, y: 43, landmark: "💪" },
  "cpp":             { x: 64, y: 24, landmark: "⛰️" },
  "cpp-practice":    { x: 78, y: 50, landmark: "🌉" },
  "algo":            { x: 38, y: 65, landmark: "🏰" },
  "usaco":           { x: 72, y: 87, landmark: "👑" },
}

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
  const { t } = useLanguage()
  const isDone = progress.status === "completed"

  // 일러스트 위 *투명* 클릭 타겟. 그림 스탬프 위에 정확히 정렬.
  // ⭐ 완료 표시 + 활성 ring + hover 만 추가.
  return (
    <div
      className="absolute"
      style={{
        left: `${placement.x}%`,
        top: `${placement.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Link
        href={stage.href}
        aria-label={stage.title}
        title={t(stage.title, stage.titleEn)}
        className="group relative block rounded-full transition-transform hover:scale-110 active:scale-95"
        style={{ width: "clamp(48px, 11vw, 88px)", height: "clamp(48px, 11vw, 88px)" }}
      >
        {/* 활성 — 펄스 ring */}
        {isActive && (
          <span className="absolute inset-0 rounded-full ring-4 ring-orange-400 ring-offset-2 animate-pulse pointer-events-none" />
        )}

        {/* hover halo */}
        <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 group-hover:shadow-2xl transition-all pointer-events-none" />

        {/* ⭐ 완료 배지 — 우상단 */}
        {isDone && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl drop-shadow-md z-10 pointer-events-none">
            ⭐
          </span>
        )}
      </Link>
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
      className="relative w-full mx-auto rounded-3xl shadow-2xl border-4 border-amber-800/40 overflow-hidden bg-amber-100"
      style={{ aspectRatio: "1371 / 1147" }}
    >
      {/* 일러스트 배경 — public/journey-map.png 에 그림 저장 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/journey-map.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />

      {/* 노드들 — 일러스트 위 % 좌표로 배치 */}
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
                      <p className="font-black text-xl sm:text-2xl text-amber-900 leading-snug mb-1">
                        {t("처음이에요", "I'm new")}
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
                      <p className="font-black text-xl sm:text-2xl text-amber-900 leading-snug mb-1">
                        {t("Python 만 할래요", "Python only")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("Python 만으로 대회까지", "Python only — to contests")}
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
                      <p className="font-black text-xl sm:text-2xl text-amber-900 leading-snug mb-1">
                        {t("Python 알아요", "I know Python")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("Python 건너뛰고 C++ 부터", "Skip Python, start with C++")}
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
                      <p className="font-black text-xl sm:text-2xl text-blue-900 leading-snug mb-1">
                        {t("잘 모르겠어요", "Not sure?")}
                      </p>
                      <p className="text-sm sm:text-base text-gray-700 font-bold mb-3 sm:mb-4 leading-snug break-keep">
                        {t("5 문제 풀고 자동 추천 받기", "Take 5 Qs — get auto-pick")}
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

        {/* 🗺️ 보물지도 — 학생이 한눈에 "내 여정" 본다 */}
        <div className="mb-5">
          <GameMap completedIds={completedIds} hasCpp={hasCpp} />
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
            <p className="text-[11px] text-emerald-700 font-bold inline-block px-2.5 py-0.5 bg-emerald-100 rounded-full border border-emerald-400">
              ✅ {t("C++ 트랙 — Python 단계 자동 완료", "C++ track — Python auto-completed")}
            </p>
          </div>
        )}

        {/* 더 연습할 곳 — 접힘 (선택). 학생이 *원할 때만* 펼침. */}
        <details className="mt-6 group">
          <summary className="cursor-pointer select-none text-xs sm:text-sm font-bold text-gray-500 hover:text-gray-700 text-center list-none flex items-center justify-center gap-1.5">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            {t("다 풀고 더 도전하고 싶을 때", "Done? Want more challenge")}
          </summary>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
            <Link
              href="/practice"
              className="group flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-md active:scale-95 transition-all"
            >
              <span className="text-2xl sm:text-3xl shrink-0">📚</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-blue-600 leading-tight">
                  {t("수업이 어려우면", "Lesson too hard?")}
                </p>
                <p className="text-sm sm:text-base font-black text-gray-900 leading-tight mt-0.5">
                  {t("수업별 클러스터", "Lesson Clusters")}
                </p>
              </div>
              <span className="text-gray-400 group-hover:text-blue-600 shrink-0">→</span>
            </Link>

            <Link
              href="/coding-bank"
              className="group flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border-2 border-amber-200 hover:border-amber-400 hover:shadow-md active:scale-95 transition-all"
            >
              <span className="text-2xl sm:text-3xl shrink-0">🏦</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-amber-600 leading-tight">
                  {t("기본 끝내고 더 도전", "Done basics? Push more")}
                </p>
                <p className="text-sm sm:text-base font-black text-gray-900 leading-tight mt-0.5">
                  {t("코딩 뱅크", "Coding Bank")}
                </p>
              </div>
              <span className="text-gray-400 group-hover:text-amber-600 shrink-0">→</span>
            </Link>

            <Link
              href="/algo"
              className="group flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md active:scale-95 transition-all"
            >
              <span className="text-2xl sm:text-3xl shrink-0">🧩</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-purple-600 leading-tight">
                  {t("궁금한 알고리즘만", "Curious about algos?")}
                </p>
                <p className="text-sm sm:text-base font-black text-gray-900 leading-tight mt-0.5">
                  {t("알고리즘 토픽", "Algo Topics")}
                </p>
              </div>
              <span className="text-gray-400 group-hover:text-purple-600 shrink-0">→</span>
            </Link>
          </div>
        </details>
      </main>

      <BottomNav />
    </div>
  )
}
