"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { RequireAuth } from "@/components/require-auth"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"

// ─── 플랫폼 URL 설정 ─────────────────────────────────────────────────
const ALGORITHM_URL = process.env.NEXT_PUBLIC_ALGORITHM_URL || "http://localhost:8080"
const CODEQUEST_URL = process.env.NEXT_PUBLIC_CODEQUEST_URL || "http://localhost:5173"

// ─── Algorithm 토픽 IDs ──────────────────────────────────────────────
const ALGO_TOPIC_IDS = [
  "algo-array","algo-backtracking","algo-binarysearch","algo-bitmanipulation",
  "algo-divideconquer","algo-dp","algo-graph","algo-greedy","algo-hashtable",
  "algo-linkedlist","algo-prefixsum","algo-priorityqueue","algo-recursion",
  "algo-shortestpath","algo-sorting","algo-stackqueue","algo-string",
  "algo-topologicalsort","algo-tree","algo-trie","algo-unionfind",
]

// ─── 커리큘럼 파트 ID 그룹 ───────────────────────────────────────────
const PY_ALL_IDS = Array.from({ length: 52 }, (_, i) => String(i + 1))
const CPP_ALL_IDS = [
  "cpp-1","cpp-2","cpp-3","cpp-4","cpp-5","cpp-6","cpp-7","cpp-8","cpp-p1",
  "cpp-9","cpp-21","cpp-10","cpp-11","cpp-12","cpp-13","cpp-14","cpp-22","cpp-p2",
  "cpp-15","cpp-23","cpp-16","cpp-17","cpp-18","cpp-19","cpp-20","cpp-p3",
]
const PSEUDO_ALL_IDS = [
  "pseudo-1","pseudo-2","pseudo-3","pseudo-4","pseudo-28","pseudo-5","pseudo-6","pseudo-7","pseudo-8","pseudo-p1",
  "pseudo-9","pseudo-10","pseudo-11","pseudo-12","pseudo-13","pseudo-14","pseudo-p2",
  "pseudo-15","pseudo-16","pseudo-17","pseudo-18","pseudo-19","pseudo-20","pseudo-p3",
  "pseudo-21","pseudo-22","pseudo-23","pseudo-24","pseudo-25","pseudo-26","pseudo-27",
  "igcse-sql1","igcse-sql2","igcse-logic1",
]

type Track = "python" | "cpp" | "igcse"

interface Stage {
  id: string
  emoji: string
  label: string
  desc: string
  lessonIds: string[]
  platform: "coderin" | "algorithm" | "codequest"
}

const STAGES: Record<Track, Stage[]> = {
  python: [
    { id:"py",      emoji:"📚", label:"배우기",    desc:"Python 수업 — 입문부터 완성까지 52레슨",    lessonIds: PY_ALL_IDS,       platform:"coderin"   },
    { id:"algo-py", emoji:"🧩", label:"풀기",      desc:"코딩 문제 — 정렬·탐색·DP 21개 토픽",       lessonIds: ALGO_TOPIC_IDS,   platform:"algorithm" },
    { id:"cq",      emoji:"🏆", label:"겨루기",    desc:"대회 도전 — USACO / MCC 160개+ 문제",      lessonIds: [],               platform:"codequest" },
  ],
  cpp: [
    { id:"py",      emoji:"📚", label:"배우기 (Python)", desc:"Python 수업 — 입문부터 완성까지 52레슨", lessonIds: PY_ALL_IDS,       platform:"coderin"   },
    { id:"cpp",     emoji:"📚", label:"배우기 (C++)",    desc:"C++ 수업 — 기초·중급·알고리즘 26레슨",  lessonIds: CPP_ALL_IDS,      platform:"coderin"   },
    { id:"algo-cpp",emoji:"🧩", label:"풀기",            desc:"코딩 문제 — 정렬·탐색·DP 21개 토픽",   lessonIds: ALGO_TOPIC_IDS,   platform:"algorithm" },
    { id:"cq",      emoji:"🏆", label:"겨루기",          desc:"대회 도전 — USACO / MCC 160개+ 문제",  lessonIds: [],               platform:"codequest" },
  ],
  igcse: [
    { id:"ps",   emoji:"📚", label:"배우기",    desc:"수도코드 수업 — IGCSE CS 전 과정 37레슨",    lessonIds: PSEUDO_ALL_IDS,   platform:"coderin"   },
    { id:"cq",   emoji:"🏆", label:"겨루기",    desc:"대회 도전 — MCC 말레이시아 컴퓨팅 챌린지",   lessonIds: [],               platform:"codequest" },
  ],
}

function getTrack(completedIds: Set<string>): Track {
  const hasCpp   = [...completedIds].some(id => id.startsWith("cpp-"))
  const hasIgcse = [...completedIds].some(id => id.startsWith("pseudo-") || id.startsWith("igcse-"))
  if (hasIgcse) return "igcse"
  if (hasCpp)   return "cpp"
  return "python"
}

// ─── 플랫폼 카드 색상 ────────────────────────────────────────────────
const PLATFORM_STYLES = {
  coderin:   { bg: "from-orange-500 to-amber-500", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
  algorithm: { bg: "from-blue-500 to-indigo-500",  border: "border-blue-200",   badge: "bg-blue-100 text-blue-700"     },
  codequest: { bg: "from-purple-500 to-pink-500",  border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
}

export default function PortalPage() {
  return (
    <RequireAuth>
      <PortalContent />
    </RequireAuth>
  )
}

function RoleOnboardingModal({ onSelect }: { onSelect: (role: "student" | "teacher", joinCode?: string) => void }) {
  const [step, setStep] = useState<"role" | "joincode">("role")
  const [joinCode, setJoinCode] = useState("")

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl">
        {step === "role" ? (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🦒</div>
              <h2 className="text-xl font-black text-gray-900">코드린에 오신 걸 환영해요!</h2>
              <p className="text-sm text-gray-500 mt-1">어떻게 사용할 예정인가요?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStep("joincode")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all"
              >
                <span className="text-3xl">🎒</span>
                <span className="font-black text-gray-800">학생</span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">코딩 배우기</span>
              </button>
              <button
                onClick={() => onSelect("teacher")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
              >
                <span className="text-3xl">📋</span>
                <span className="font-black text-gray-800">선생님</span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">학생 반 관리</span>
              </button>
            </div>
            <p className="text-[11px] text-center text-gray-400 mt-3">
              혼자 공부하거나 학부모라면 학생으로 시작하세요
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">🎒</div>
              <h2 className="text-lg font-black text-gray-900">선생님께 반 코드를 받으셨나요?</h2>
              <p className="text-sm text-gray-500 mt-1">있으면 입력하고, 없으면 그냥 시작해도 돼요</p>
            </div>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="반 코드 입력 (선택)"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-center text-lg font-mono font-bold tracking-widest mb-3"
              maxLength={8}
            />
            <button
              onClick={() => onSelect("student", joinCode.trim() || undefined)}
              className="w-full py-3 rounded-2xl bg-orange-500 text-white font-black text-base mb-2 hover:bg-orange-600 transition-all"
            >
              {joinCode.trim() ? "반 참가하고 시작하기" : "혼자 시작하기"}
            </button>
            <button
              onClick={() => setStep("role")}
              className="w-full text-sm text-gray-400 hover:text-gray-600"
            >
              ← 뒤로
            </button>
          </>
        )}
      </div>
    </div>
  )
}

interface HomeworkItem {
  id: string
  lesson_id: string
  step_title: string | null
  submitted_at: string
  teacher_grade: string | null
  teacher_comment: string | null
}

function hwTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  const h = Math.floor(diff / 3600000)
  if (h < 1) return "방금"
  if (d < 1) return `${h}시간 전`
  if (d < 7) return `${d}일 전`
  const dt = new Date(iso)
  return `${dt.getMonth()+1}/${dt.getDate()}`
}

function PortalContent() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [cqCount, setCqCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [homeworks, setHomeworks] = useState<HomeworkItem[]>([])
  const [parentLinkCopied, setParentLinkCopied] = useState(false)
  const [parentLinkLoading, setParentLinkLoading] = useState(false)

  const handleRoleSelect = async (role: "student" | "teacher", joinCode?: string) => {
    setShowRoleModal(false)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("profiles").update({ role }).eq("id", user.id)
    if (role === "teacher") {
      router.replace("/teacher")
    } else {
      // 반 코드가 있으면 자동 참가 시도
      if (joinCode) {
        const { joinClassByCode } = await import("@/app/teacher/actions")
        await joinClassByCode(joinCode)
      }
      router.replace("/curriculum")
    }
  }

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 역할 체크: null이면 온보딩 모달, teacher면 대시보드로
      const { data: profileData } = await supabase
        .from("profiles").select("role").eq("id", user.id).maybeSingle()
      if (profileData?.role === "teacher") {
        router.replace("/teacher")
        return
      }
      if (!profileData?.role) setShowRoleModal(true)

      // 이름
      const { data: profile } = await supabase
        .from("profiles").select("display_name").eq("id", user.id).maybeSingle()
      if (profile?.display_name) setName(profile.display_name)

      // XP / 스트릭
      const { data: gami } = await supabase
        .from("gamification_data").select("total_xp,daily_streak").eq("user_id", user.id).maybeSingle()
      if (gami) { setXp(gami.total_xp ?? 0); setStreak(gami.daily_streak ?? 0) }

      // 진도
      const { data: progress } = await supabase
        .from("lesson_progress").select("lesson_id,completed")
        .eq("user_id", user.id).eq("completed", true)
      if (progress) {
        const ids = new Set(progress.map(p => p.lesson_id))
        setCompletedIds(ids)
        setCqCount([...ids].filter(id => id.startsWith("cq-")).length)
      }

      // 최근 숙제 제출 (최신 5개)
      const { data: hw } = await supabase
        .from("homework_submissions")
        .select("id,lesson_id,step_title,submitted_at,teacher_grade,teacher_comment")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(5)
      if (hw) setHomeworks(hw)

      setLoading(false)
    }
    load()
  }, [])

  // 다음 미완료 레슨 ID 찾기
  function getNextLessonId(): string | null {
    const allParts = [...pythonParts, ...cppParts, ...pseudoParts]
    for (const part of allParts) {
      for (const id of part.lessonIds) {
        const sid = String(id)
        if (!completedIds.has(sid) && !completedIds.has(id as string)) {
          return sid
        }
      }
    }
    return null
  }

  // 플랫폼으로 이동
  async function navigateTo(platform: "coderin" | "algorithm" | "codequest", stageId: string) {
    if (platform === "coderin") {
      const nextId = getNextLessonId()
      router.push(nextId ? `/learn/${nextId}` : "/curriculum")
      return
    }
    if (platform === "algorithm") {
      // 코드린 내부 알고리즘 페이지로 이동
      router.push("/algorithm")
      return
    }

    // CodeQuest — 외부 사이트 (SSO 토큰 전달)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const trackParam = `&track=${track}`
    if (session) {
      window.open(`${CODEQUEST_URL}?access_token=${session.access_token}&refresh_token=${session.refresh_token}${trackParam}`, "_blank")
    } else {
      window.open(`${CODEQUEST_URL}?track=${track}`, "_blank")
    }
  }

  const handleShareParentReport = async () => {
    setParentLinkLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 기존 토큰 확인
      let token: string | null = null
      const { data: existing } = await supabase
        .from("parent_report_links")
        .select("token")
        .eq("student_id", user.id)
        .maybeSingle()
      if (existing?.token) {
        token = existing.token
      } else {
        // 새 토큰 생성
        token = Array.from({ length: 20 }, () =>
          "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"[Math.floor(Math.random() * 56)]
        ).join("")
        // class_id는 선생님이 생성 시에만 필요 — 학생 직접 생성은 null (DB nullable)
        const { error: insertError } = await supabase.from("parent_report_links").insert({
          token,
          student_id: user.id,
          created_by: user.id,
          student_name: name || user.email || "",
        })
        if (insertError) throw insertError
      }

      const url = `${window.location.origin}/parent?t=${token}`
      if (navigator.share) {
        await navigator.share({ title: "코드린 학습 리포트", url })
      } else {
        await navigator.clipboard.writeText(url)
        setParentLinkCopied(true)
        setTimeout(() => setParentLinkCopied(false), 2500)
      }
    } catch {}
    setParentLinkLoading(false)
  }

  const track = getTrack(completedIds)
  const stages = STAGES[track]

  // 현재 활성 단계 찾기
  function getStageStatus(stage: Stage): "completed" | "active" | "locked" {
    if (stage.platform === "codequest") {
      // 이전 단계 완료 여부로 판단
      const idx = stages.indexOf(stage)
      const prev = stages[idx - 1]
      if (!prev) return "active"
      const prevDone = prev.lessonIds.filter(id => completedIds.has(id)).length
      return prevDone === prev.lessonIds.length ? "active" : "locked"
    }
    if (stage.lessonIds.length === 0) return "locked"
    const done = stage.lessonIds.filter(id => completedIds.has(id)).length
    if (done === stage.lessonIds.length) return "completed"
    if (done > 0) return "active"
    // 이전 단계가 없으면 첫 번째 단계는 항상 active
    const idx = stages.indexOf(stage)
    if (idx === 0) return "active"
    const prev = stages[idx - 1]
    const prevDone = prev.lessonIds.filter(id => completedIds.has(id)).length
    const threshold = Math.ceil(prev.lessonIds.length * 0.7)
    return prevDone >= threshold ? "active" : "locked"
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-5xl animate-bounce">🦒</div>
        <p className="text-gray-500">불러오는 중...</p>
      </div>
    </div>
  )

  const trackLabel = track === "igcse" ? "IGCSE 트랙" : track === "cpp" ? "C++ 트랙" : "Python 트랙"

  return (
    <div className="min-h-screen bg-gray-50">
      {showRoleModal && <RoleOnboardingModal onSelect={handleRoleSelect} />}
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="lg:flex lg:gap-8 lg:items-start">

        {/* ── 왼쪽: 인사 + 빠른이동 ── */}
        <div className="lg:w-[380px] lg:flex-shrink-0 space-y-5">

        {/* 인사 + 스탯 */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🦒</span>
            <span className="text-sm font-semibold opacity-80">코드린 포털</span>
          </div>
          <h1 className="text-2xl font-black">
            {name ? `안녕하세요, ${name}님!` : "안녕하세요!"}
          </h1>
          <p className="text-sm opacity-75 mt-0.5">{trackLabel}</p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
              <p className="text-xl font-black">{xp.toLocaleString()}</p>
              <p className="text-[11px] opacity-75">XP</p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
              <p className="text-xl font-black">🔥 {streak}</p>
              <p className="text-[11px] opacity-75">연속 학습</p>
            </div>
            {cqCount > 0 && (
              <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                <p className="text-xl font-black">🏆 {cqCount}</p>
                <p className="text-[11px] opacity-75">대회 문제</p>
              </div>
            )}
          </div>
          <button
            onClick={() => router.push("/analytics")}
            className="mt-3 text-[11px] font-semibold text-white/70 hover:text-white transition-colors underline underline-offset-2"
          >
            📊 학습 분석 자세히 보기 →
          </button>
        </div>

        </div>

        {/* ── 오른쪽: 학습 여정 + 숙제 ── */}
        <div className="lg:flex-1 space-y-5 mt-5 lg:mt-0">

        {/* 학습 여정 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
          <h2 className="text-sm font-black text-gray-700">🗺️ 내 학습 여정</h2>

          <div className="space-y-2">
            {stages.map((stage, idx) => {
              const status = getStageStatus(stage)
              const done = stage.lessonIds.filter(id => completedIds.has(id)).length
              const total = stage.lessonIds.length
              const pct = total > 0 ? Math.round((done / total) * 100) : (cqCount > 0 ? 100 : 0)
              const pStyle = PLATFORM_STYLES[stage.platform]
              const isFirst = idx === 0

              // ── C++ 트랙의 Python 전제 카드 ──────────────────────────
              const isPrereq = track === "cpp" && stage.id === "py"
              if (isPrereq) {
                return (
                  <div key={stage.id} className="relative rounded-xl border border-green-200 bg-green-50 px-3 py-2 flex items-center gap-2.5">
                    <span className="text-xl">🐍</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-green-700">Python 완료</p>
                      <p className="text-[11px] text-green-500">C++로 레벨업 중!</p>
                    </div>
                  </div>
                )
              }

              if (status === "active") {
                // ── 현재 진행 중 카드 (크게) ──────────────────────────────
                return (
                  <div key={stage.id} className="relative rounded-2xl border-2 border-orange-300 bg-white shadow-md p-4 transition-all">
                    {!isFirst && <div className="absolute -top-2 left-6 w-0.5 h-2 bg-gray-200" />}
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl flex-shrink-0">
                        {stage.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-base font-black text-gray-900">{stage.label}</p>
                          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", pStyle.badge)}>
                            {stage.platform === "coderin" ? "코드린" :
                             stage.platform === "algorithm" ? "Algorithm Lab" : "CodeQuest"}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600">진행 중</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{stage.desc}</p>
                        {total > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-orange-400 transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs font-bold text-orange-500 flex-shrink-0">{done}/{total}</span>
                          </div>
                        )}
                        {stage.platform === "codequest" && cqCount > 0 && (
                          <p className="text-xs text-purple-600 font-semibold mt-1">🏆 {cqCount}문제 완료</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => navigateTo(stage.platform, stage.id)}
                      className="mt-3 w-full py-2.5 rounded-xl text-sm font-black bg-orange-500 text-white hover:bg-orange-600 transition-all"
                    >
                      계속하기 →
                    </button>
                  </div>
                )
              }

              // ── 완료 / 잠김 카드 (작게) ───────────────────────────────
              return (
                <div key={stage.id} className={cn(
                  "relative rounded-xl border p-2.5 transition-all",
                  status === "completed" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100 opacity-50"
                )}>
                  {!isFirst && <div className="absolute -top-2 left-4 w-0.5 h-2 bg-gray-200" />}
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0",
                      status === "completed" ? "bg-green-100" : "bg-gray-100"
                    )}>
                      {status === "completed" ? "✅" : "🔒"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={cn("text-xs font-bold", status === "locked" ? "text-gray-400" : "text-gray-700")}>
                          {stage.label}
                        </p>
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", pStyle.badge)}>
                          {stage.platform === "coderin" ? "코드린" :
                           stage.platform === "algorithm" ? "Algorithm Lab" : "CodeQuest"}
                        </span>
                      </div>
                      {status === "completed" && total > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-green-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-green-400 w-full" />
                          </div>
                          <span className="text-[10px] text-green-600 font-semibold flex-shrink-0">{total}/{total} 완료</span>
                        </div>
                      )}
                    </div>
                    {status === "completed" && (
                      <button
                        onClick={() => navigateTo(stage.platform, stage.id)}
                        className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                      >
                        복습
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 숙제 섹션 — 제출 내역 있을 때만 표시 */}
        {homeworks.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
            <h2 className="text-sm font-black text-gray-700">📝 내 숙제</h2>
            <div className="space-y-2">
              {homeworks.map(hw => {
                const isGraded = hw.teacher_grade !== null
                const isPassed = hw.teacher_grade === "pass"
                const isFailed = hw.teacher_grade === "fail"
                return (
                  <div
                    key={hw.id}
                    className={cn(
                      "rounded-xl border p-3 cursor-pointer transition-all",
                      isGraded
                        ? isPassed
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                        : "bg-amber-50 border-amber-200"
                    )}
                    onClick={() => {
                      if (!hw.lesson_id) return
                      router.push(`/learn/${hw.lesson_id}`)
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">
                          {hw.step_title || "과제"}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{hwTimeAgo(hw.submitted_at)}</p>
                      </div>
                      <span className={cn(
                        "flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full",
                        isGraded
                          ? isPassed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      )}>
                        {isGraded ? (isPassed ? "✅ 통과" : "❌ 재도전") : "⏳ 채점 대기"}
                      </span>
                    </div>
                    {hw.teacher_comment && (
                      <p className="mt-2 text-[11px] text-gray-600 bg-white/70 rounded-lg px-2.5 py-1.5 border border-gray-100">
                        💬 {hw.teacher_comment}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        </div>
        </div>

        {/* 빠른 이동 */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 mt-5">
          {([
            { platform: "coderin",   emoji: "📚", label: "배우기"  },
            { platform: "algorithm", emoji: "🧩", label: "풀기"    },
            { platform: "codequest", emoji: "🏆", label: "겨루기"  },
          ] as const).map(({ platform, emoji, label }) => {
            const pStyle = PLATFORM_STYLES[platform]
            return (
              <button
                key={platform}
                onClick={() => navigateTo(platform, "")}
                className={cn(
                  "rounded-xl p-3 text-center border transition-all hover:shadow-sm",
                  pStyle.border, "bg-white"
                )}
              >
                <span className="text-2xl block mb-1">{emoji}</span>
                <span className="text-[11px] font-bold text-gray-700">{label}</span>
              </button>
            )
          })}
        </div>

        {/* 부모님 리포트 공유 */}
        <button
          onClick={handleShareParentReport}
          disabled={parentLinkLoading}
          className="w-full py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all disabled:opacity-50"
        >
          {parentLinkLoading
            ? "⏳ 링크 생성 중..."
            : parentLinkCopied
              ? "✅ 링크가 복사됐어요!"
              : "👨‍👩‍👧 부모님께 학습 리포트 공유하기"}
        </button>

        {/* 하단 안내 */}
        <p className="text-[11px] text-center text-gray-400 pb-4">
          🔑 로그인은 한 번만 — 풀기·겨루기에서도 자동으로 연결돼요
        </p>

      </main>
      <BottomNav />
    </div>
  )
}
