"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { RequireAuth } from "@/components/require-auth"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"
import { getSmartNext, getPreferredTrack } from "@/lib/smart-next"
import { useLanguage } from "@/contexts/language-context"
import { getLevelTitle } from "@/hooks/use-gamification"
import { getStudentTrackRank } from "@/lib/curriculum-ranks"

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
  labelEn: string
  desc: string
  descEn: string
  lessonIds: string[]
  platform: "coderin" | "algorithm" | "codequest"
}

const STAGES: Record<Track, Stage[]> = {
  python: [
    { id:"py",      emoji:"📚", label:"배우기",    labelEn:"Learn",    desc:"Python 수업 — 입문부터 완성까지 52레슨",    descEn:"Python lessons — beginner to advanced, 52 lessons",    lessonIds: PY_ALL_IDS,       platform:"coderin"   },
    { id:"algo-py", emoji:"🧩", label:"풀기",      labelEn:"Practice", desc:"코딩 문제 — 정렬·탐색·DP 21개 토픽",       descEn:"Coding problems — sorting, search, DP, 21 topics",       lessonIds: ALGO_TOPIC_IDS,   platform:"algorithm" },
    { id:"cq",      emoji:"🏆", label:"겨루기",    labelEn:"Compete",  desc:"대회 도전 — USACO / MCC 160개+ 문제",      descEn:"Competition prep — USACO / MCC 160+ problems",      lessonIds: [],               platform:"codequest" },
  ],
  cpp: [
    { id:"py",      emoji:"📚", label:"배우기 (Python)", labelEn:"Learn (Python)", desc:"Python 수업 — 입문부터 완성까지 52레슨", descEn:"Python lessons — beginner to advanced, 52 lessons", lessonIds: PY_ALL_IDS,       platform:"coderin"   },
    { id:"cpp",     emoji:"📚", label:"배우기 (C++)",    labelEn:"Learn (C++)",    desc:"C++ 수업 — 기초·중급·알고리즘 26레슨",  descEn:"C++ lessons — basics, intermediate, algorithms, 26 lessons",  lessonIds: CPP_ALL_IDS,      platform:"coderin"   },
    { id:"algo-cpp",emoji:"🧩", label:"풀기",            labelEn:"Practice",       desc:"코딩 문제 — 정렬·탐색·DP 21개 토픽",   descEn:"Coding problems — sorting, search, DP, 21 topics",   lessonIds: ALGO_TOPIC_IDS,   platform:"algorithm" },
    { id:"cq",      emoji:"🏆", label:"겨루기",          labelEn:"Compete",        desc:"대회 도전 — USACO / MCC 160개+ 문제",  descEn:"Competition prep — USACO / MCC 160+ problems",  lessonIds: [],               platform:"codequest" },
  ],
  igcse: [
    { id:"ps",   emoji:"📚", label:"배우기",    labelEn:"Learn",   desc:"수도코드 수업 — IGCSE CS 전 과정 37레슨",    descEn:"Pseudocode lessons — full IGCSE CS, 37 lessons",    lessonIds: PSEUDO_ALL_IDS,   platform:"coderin"   },
    { id:"cq",   emoji:"🏆", label:"겨루기",    labelEn:"Compete", desc:"대회 도전 — MCC 말레이시아 컴퓨팅 챌린지",   descEn:"Competition prep — MCC Malaysia Computing Challenge",   lessonIds: [],               platform:"codequest" },
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
  algorithm: { bg: "from-blue-500 to-purple-500",  border: "border-blue-200",   badge: "bg-blue-100 text-blue-700"     },
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
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl">
        {step === "role" ? (
          <>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🦒</div>
              <h2 className="text-xl font-black text-gray-900">{t("코드린에 오신 걸 환영해요!", "Welcome to Coderin!")}</h2>
              <p className="text-sm text-gray-500 mt-1">{t("어떻게 사용할 예정인가요?", "How will you be using it?")}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStep("joincode")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all"
              >
                <span className="text-3xl">🎒</span>
                <span className="font-black text-gray-800">{t("학생", "Student")}</span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">{t("코딩 배우기", "Learn coding")}</span>
              </button>
              <button
                onClick={() => onSelect("teacher")}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                <span className="text-3xl">📋</span>
                <span className="font-black text-gray-800">{t("선생님", "Teacher")}</span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">{t("학생 반 관리", "Manage classes")}</span>
              </button>
            </div>
            <p className="text-[11px] text-center text-gray-400 mt-3">
              {t("혼자 공부하거나 학부모라면 학생으로 시작하세요", "Self-studying or a parent? Start as a student")}
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">🎒</div>
              <h2 className="text-lg font-black text-gray-900">{t("선생님께 반 코드를 받으셨나요?", "Do you have a class code?")}</h2>
              <p className="text-sm text-gray-500 mt-1">{t("있으면 입력하고, 없으면 그냥 시작해도 돼요", "Enter it if you have one, or just start without it")}</p>
            </div>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder={t("반 코드 입력 (선택)", "Class code (optional)")}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-center text-lg font-mono font-bold tracking-widest mb-3"
              maxLength={8}
            />
            <button
              onClick={() => onSelect("student", joinCode.trim() || undefined)}
              className="w-full py-3 rounded-2xl bg-orange-500 text-white font-black text-base mb-2 hover:bg-orange-600 transition-all"
            >
              {joinCode.trim() ? t("반 참가하고 시작하기", "Join class & start") : t("혼자 시작하기", "Start solo")}
            </button>
            <button
              onClick={() => setStep("role")}
              className="w-full text-sm text-gray-400 hover:text-gray-600"
            >
              ← {t("뒤로", "Back")}
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
  step_id?: string | null
  step_title: string | null
  submitted_at: string
  teacher_grade: string | null
  teacher_comment: string | null
  attempt_count?: number  // 같은 step 재시도 합산용
}

function hwTimeAgo(iso: string, lang: "ko" | "en" = "ko") {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  const h = Math.floor(diff / 3600000)
  if (h < 1) return lang === "en" ? "Just now" : "방금"
  if (d < 1) return lang === "en" ? `${h}h ago` : `${h}시간 전`
  if (d < 7) return lang === "en" ? `${d}d ago` : `${d}일 전`
  const dt = new Date(iso)
  return `${dt.getMonth()+1}/${dt.getDate()}`
}

function PortalContent() {
  const router = useRouter()
  const { t, lang } = useLanguage()
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
  const [isTeacher, setIsTeacher] = useState(false)
  const [inClass, setInClass] = useState(false)

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

      // 역할 체크: null이면 온보딩 모달, teacher면 포털에서 전체 unlock 상태로 표시
      const { data: profileData } = await supabase
        .from("profiles").select("role").eq("id", user.id).maybeSingle()
      // owner (julia.juhyun) 는 학생 view 가 default — teacher 분기 안 탐
      const { OWNER_EMAIL } = await import("@/components/owner-only-guard")
      if (profileData?.role === "teacher" && user.email !== OWNER_EMAIL) {
        setIsTeacher(true)
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

      // 반 가입 여부 — 부모 리포트 공유 같은 기능은 반 학생/선생님에게만 노출
      const { data: classMem } = await supabase
        .from("class_members").select("class_id").eq("student_id", user.id).limit(1)
      if (classMem && classMem.length > 0) setInClass(true)

      // 진도
      const { data: progress } = await supabase
        .from("lesson_progress").select("lesson_id,completed")
        .eq("user_id", user.id).eq("completed", true)
      if (progress) {
        const ids = new Set(progress.map(p => p.lesson_id))
        setCompletedIds(ids)
        setCqCount([...ids].filter(id => id.startsWith("cq-")).length)
      }

      // 최근 숙제 제출 — 같은 step 의 여러 시도는 한 줄로 묶고 재시도 횟수 표시
      const { data: hw } = await supabase
        .from("homework_submissions")
        .select("id,lesson_id,step_id,step_title,submitted_at,teacher_grade,teacher_comment")
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(40)  // 충분히 가져와서 dedupe 후 5건 확보
      if (hw) {
        const grouped = new Map<string, HomeworkItem>()
        for (const h of hw) {
          const key = `${h.lesson_id}::${h.step_id ?? h.step_title ?? "_"}`
          const existing = grouped.get(key)
          if (existing) {
            existing.attempt_count = (existing.attempt_count ?? 1) + 1
          } else {
            grouped.set(key, { ...h, attempt_count: 1 })
          }
        }
        setHomeworks(Array.from(grouped.values()).slice(0, 5))
      }

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
      router.push("/algo")
      return
    }

    // CodeQuest — 코드린 내부 /quest 페이지로 이동
    router.push("/quest")
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
        await navigator.share({ title: t("코드린 학습 리포트", "Coderin Learning Report"), url })
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
    // 선생님 계정: 모든 단계 unlock
    if (isTeacher) return "active"
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
        <p className="text-gray-500">{t("불러오는 중...", "Loading...")}</p>
      </div>
    </div>
  )

  const trackLabel = track === "igcse" ? t("IGCSE 트랙", "IGCSE Track") : track === "cpp" ? t("C++ 트랙", "C++ Track") : t("Python 트랙", "Python Track")

  return (
    <div className="min-h-screen bg-gray-50">
      {showRoleModal && <RoleOnboardingModal onSelect={handleRoleSelect} />}
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {/* 선생님 배너 */}
        {isTeacher && (
          <div className="mb-4 rounded-2xl bg-purple-50 border border-purple-200 px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm text-purple-700 font-medium">
              📋 {t("선생님 계정 — 모든 단계가 잠금 해제됩니다", "Teacher account — all stages unlocked")}
            </p>
            <button
              onClick={() => router.push("/teacher")}
              className="shrink-0 text-xs font-bold text-purple-600 hover:text-purple-800 underline"
            >
              {t("대시보드 →", "Dashboard →")}
            </button>
          </div>
        )}

        {/* 🎯 최상단 거대 CTA — Smart-Next 엔진이 자동 결정.
            학생 마음 속의 '뭐 해야 하지?' 답 = 한 클릭으로 다음 단계.
            소프트 추천: 다른 영역도 다 클릭 가능, 이건 권장만. */}
        {!isTeacher && (() => {
          const preferredTrack = getPreferredTrack(completedIds)
          const next = getSmartNext(completedIds, preferredTrack)
          const isFresh = completedIds.size === 0
          return (
            <button
              onClick={() => router.push(next.href)}
              className="w-full mb-5 p-5 sm:p-6 rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-200 hover:shadow-2xl active:scale-[0.99] transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                  {next.emoji ?? "📚"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold opacity-90 mb-0.5">
                    {isFresh
                      ? t("🚀 처음이세요? 여기서 시작", "🚀 First time? Start here")
                      : t("▶ 다음 추천", "▶ Up next")}
                  </p>
                  <p className="text-xl sm:text-2xl font-black leading-tight">
                    {lang === "en" ? next.titleEn : next.title}
                  </p>
                  {next.subtitle && (
                    <p className="text-xs sm:text-sm opacity-90 mt-1 truncate">
                      {next.subtitle}
                    </p>
                  )}
                </div>
                <span className="text-3xl sm:text-4xl group-hover:translate-x-1 transition-transform shrink-0">→</span>
              </div>
            </button>
          )
        })()}
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">

        {/* ── 왼쪽: 인사 + 빠른이동 + 부모 리포트 ──
            모바일에서는 학습 여정 패널이 먼저 보이도록 order 조정 (lg 이상은 원래 순서). */}
        <div className="lg:w-[380px] lg:flex-shrink-0 space-y-4 order-2 lg:order-1">

        {/* 인사 + 스탯 + 레벨/칭호 + 트랙 랭크 */}
        {(() => {
          const level = Math.floor(xp / 100) + 1
          const xpInLevel = xp % 100
          const titleInfo = getLevelTitle(level)
          // 학생의 주력 트랙 랭크 (Bronze/Silver/Gold/Master)
          const localTrack = getPreferredTrack(completedIds)
          const trackParts = localTrack === "cpp" ? cppParts : localTrack === "pseudo" ? pseudoParts : pythonParts
          const trackRank = getStudentTrackRank(completedIds, trackParts)
          return (
            <div className="bg-orange-500 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🦒</span>
                <span className="text-sm font-semibold opacity-80">{t("코드린 포털", "Coderin Portal")}</span>
              </div>
              <h1 className="text-2xl font-black">
                {name ? t(`안녕하세요, ${name}님!`, `Hello, ${name}!`) : t("안녕하세요!", "Hello!")}
              </h1>

              {/* 큰 레벨/칭호 표시 — 학생들이 좋아하는 핵심 위젯 */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 bg-white/25 rounded-2xl px-3 py-2">
                  <span className="text-2xl">{titleInfo.emoji}</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] opacity-80 font-semibold">Lv. {level}</span>
                    <span className="text-base font-black">{titleInfo.title}</span>
                  </div>
                </div>
                {trackRank && (
                  <div className="flex items-center gap-1.5 bg-white/25 rounded-2xl px-3 py-2">
                    <span className="text-xl">{trackRank.emoji}</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] opacity-80 font-semibold">{t("커리큘럼", "Curriculum")}</span>
                      <span className="text-sm font-black">{t(trackRank.label, trackRank.labelEn)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 레벨 진행 바 */}
              <div className="mt-2.5">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/80 transition-all duration-500"
                    style={{ width: `${xpInLevel}%` }}
                  />
                </div>
                <p className="text-[10px] opacity-75 mt-1">
                  {xpInLevel} / 100 XP {t("다음 레벨까지", "to next level")}
                </p>
              </div>

              <p className="text-sm opacity-75 mt-3">{trackLabel}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <div className="bg-white/20 rounded-xl px-3 py-2 text-center flex-1 min-w-[68px]">
                  <p className="text-lg font-black">{xp.toLocaleString()}</p>
                  <p className="text-[10px] opacity-75">XP</p>
                </div>
                <div className="bg-white/20 rounded-xl px-3 py-2 text-center flex-1 min-w-[68px]">
                  <p className="text-lg font-black">🔥 {streak}</p>
                  <p className="text-[10px] opacity-75">{t("연속", "Streak")}</p>
                </div>
                {cqCount > 0 && (
                  <div className="bg-white/20 rounded-xl px-3 py-2 text-center flex-1 min-w-[68px]">
                    <p className="text-lg font-black">🏆 {cqCount}</p>
                    <p className="text-[10px] opacity-75">{t("대회", "Contest")}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => router.push("/analytics")}
                className="mt-3 text-[11px] font-semibold text-white/70 hover:text-white transition-colors underline underline-offset-2"
              >
                📊 {t("학습 분석 자세히 보기 →", "View Learning Analytics →")}
              </button>
            </div>
          )
        })()}

        {/* 🗺️ 학습 여정 맵 — 게임 스타일 로드맵 (메인 + 가지) */}
        <button
          onClick={() => router.push("/journey")}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 hover:shadow-lg active:scale-[0.99] transition-all flex items-center gap-3 text-left"
        >
          <span className="text-3xl shrink-0">🗺️</span>
          <div className="flex-1 min-w-0">
            <p className="text-base font-black">{t("학습 여정 맵", "Learning Journey Map")}</p>
            <p className="text-[11px] opacity-90 mt-0.5">
              {t("문법 → 알고리즘 → USACO — 전체 길 한눈에", "Syntax → Algorithm → USACO at a glance")}
            </p>
          </div>
          <span className="text-2xl shrink-0">→</span>
        </button>

        {/* 빠른 이동 — 항상 표시 (USACO 접근성 ↑ 위해 진도 무관) */}
        <div className="grid grid-cols-3 gap-2">
            {([
              { platform: "coderin",   emoji: "📚", labelKo: "배우기",  labelEn: "Learn"     },
              { platform: "algorithm", emoji: "🧩", labelKo: "풀기",    labelEn: "Practice"  },
              { platform: "codequest", emoji: "🏆", labelKo: "겨루기",  labelEn: "Compete"   },
            ] as const).map(({ platform, emoji, labelKo, labelEn }) => {
              const label = t(labelKo, labelEn)
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

        {/* 부모님 리포트 공유 — 반 가입 학생 / 선생님에게만 노출 (solo 학생은 혼란 가능) */}
        {(inClass || isTeacher) && (
          <button
            onClick={handleShareParentReport}
            disabled={parentLinkLoading}
            className="w-full py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all disabled:opacity-50"
          >
            {parentLinkLoading
              ? t("⏳ 링크 생성 중...", "⏳ Generating link...")
              : parentLinkCopied
                ? t("✅ 링크가 복사됐어요!", "✅ Link copied!")
                : t("👨‍👩‍👧 부모님께 학습 리포트 공유하기", "👨‍👩‍👧 Share Report with Parents")}
          </button>
        )}

        {/* 하단 안내 */}
        <p className="text-[11px] text-center text-gray-400">
          🔑 {t("로그인은 한 번만 — 풀기·겨루기에서도 자동으로 연결돼요", "Login once — auto-connected to Practice & Compete too")}
        </p>

        </div>

        {/* ── 오른쪽: 학습 여정 + 숙제 ── (모바일에서는 위로) */}
        <div className="lg:flex-1 space-y-5 mt-0 lg:mt-0 order-1 lg:order-2 mb-5 lg:mb-0">

        {/* 학습 여정 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
          <h2 className="text-sm font-black text-gray-700">🗺️ {t("내 학습 여정", "My Learning Journey")}</h2>

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
                      <p className="text-xs font-bold text-green-700">{t("Python 완료", "Python Complete")}</p>
                      <p className="text-[11px] text-green-500">{t("C++로 레벨업 중!", "Leveling up to C++!")}</p>
                    </div>
                  </div>
                )
              }

              if (status === "active") {
                // ── 현재 진행 중 카드 — 큰 CTA 가 카드 최상단, 그 아래 작은 진도 ──
                const isFresh = done === 0
                return (
                  <div key={stage.id} className="relative rounded-2xl border-2 border-orange-300 bg-white shadow-md p-4 transition-all">
                    {!isFirst && <div className="absolute -top-2 left-6 w-0.5 h-2 bg-gray-200" />}
                    {/* 헤더 — 한 줄 압축 (제목 + 진행중 배지) */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-2xl">{stage.emoji}</span>
                      <p className="text-base font-black text-gray-900 flex-1">
                        {lang === "en" ? stage.labelEn : stage.label}
                      </p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600 whitespace-nowrap">
                        {isFresh ? t("시작 전", "Not started") : t("진행 중", "In progress")}
                      </span>
                    </div>
                    {/* primary CTA — 카드 위에 크게 */}
                    <button
                      onClick={() => navigateTo(stage.platform, stage.id)}
                      className="w-full py-3.5 rounded-xl text-base font-black bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200/60 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">▶</span>
                      <span>
                        {isFresh
                          ? t("지금 시작하기", "Start now")
                          : t("이어서 학습하기", "Continue learning")}
                      </span>
                    </button>
                    {/* 진도 + 설명 — 작게, CTA 아래 */}
                    {total > 0 && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-orange-400 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-bold text-orange-500 flex-shrink-0">{done}/{total}</span>
                      </div>
                    )}
                    {stage.platform === "codequest" && cqCount > 0 && (
                      <p className="text-xs text-purple-600 font-semibold mt-1.5">🏆 {t(`${cqCount}문제 완료`, `${cqCount} solved`)}</p>
                    )}
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
                          {lang === "en" ? stage.labelEn : stage.label}
                        </p>
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", pStyle.badge)}>
                          {stage.platform === "coderin" ? "Coderin" :
                           stage.platform === "algorithm" ? "Algorithm Lab" : "CodeQuest"}
                        </span>
                      </div>
                      {status === "completed" && total > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-green-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-green-400 w-full" />
                          </div>
                          <span className="text-[10px] text-green-600 font-semibold flex-shrink-0">{total}/{total} {t("완료", "done")}</span>
                        </div>
                      )}
                    </div>
                    {status === "completed" && (
                      <button
                        onClick={() => navigateTo(stage.platform, stage.id)}
                        className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                      >
                        {t("복습", "Review")}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 제출한 코드 섹션 — C++ practice step 제출 내역 (Python 학생 + Python 트랙은 안 보임).
            A: '내 숙제' → '내가 제출한 코드' (더 정확)
            B: track === 'python' 일 때 숨김 (Python 학생에게 무의미)
            C: 같은 step 재시도는 그룹핑 (한 줄 + '재시도 N회' 배지)
            D: auto 등급도 ✅ 통과로 표시 */}
        {homeworks.length > 0 && track !== "python" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
            <div>
              <h2 className="text-sm font-black text-gray-700">📝 {t("내가 제출한 코드", "My Submissions")}</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">{t("C++ 연습 문제 제출 내역", "C++ practice problem submissions")}</p>
            </div>
            <div className="space-y-2">
              {homeworks.map(hw => {
                const grade = hw.teacher_grade
                const isPassed = grade === "pass" || grade === "auto"  // 자동 채점도 통과 처리
                const isFailed = grade === "fail"
                const isGraded = isPassed || isFailed
                const attempts = hw.attempt_count ?? 1
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
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-gray-800 truncate">
                            {hw.step_title || t("과제", "Assignment")}
                          </p>
                          {attempts > 1 && (
                            <span className="flex-shrink-0 text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                              {t(`${attempts}회 시도`, `${attempts} attempts`)}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{hwTimeAgo(hw.submitted_at, lang)}</p>
                      </div>
                      <span className={cn(
                        "flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full",
                        isGraded
                          ? isPassed
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      )}>
                        {isPassed
                          ? t("✅ 통과", "✅ Pass")
                          : isFailed
                            ? t("❌ 재도전", "❌ Retry")
                            : t("⏳ 선생님 확인 중", "⏳ Awaiting review")}
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

      </main>
      <BottomNav />
    </div>
  )
}
