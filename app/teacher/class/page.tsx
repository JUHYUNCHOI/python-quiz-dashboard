"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import type { Class, Profile } from "@/lib/supabase/types"
import type { QuizSession } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Check, Users, Trophy, Flame, BookOpen, ChevronDown, ClipboardCheck, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { StudentProgress } from "@/components/teacher/student-progress"
import { ClassOverview } from "@/components/teacher/class-overview"
import { getLessonName, pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"
import { StudentDetailPanel } from "@/components/teacher/student-detail-panel"

const STUDENTS_PER_PAGE = 10

// 커리큘럼 순서 인덱스 (한 번만 계산)
const CURRICULUM_ORDER: Record<string, number> = {}
;[...pythonParts, ...cppParts, ...pseudoParts].forEach(part => {
  part.lessonIds.forEach((id, i) => {
    // 파트 간격을 두어 파트 내 순서 유지
    if (!(String(id) in CURRICULUM_ORDER)) {
      CURRICULUM_ORDER[String(id)] = Object.keys(CURRICULUM_ORDER).length
    }
  })
})

function lessonSortIndex(lessonId: string): number {
  return CURRICULUM_ORDER[lessonId] ?? 9999
}
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

// ─── 학생 상태 그리드 ────────────────────────────────────────
function studentStatus(s: { lastActive: string; quizSessions: { correct_answers: number; total_questions: number }[] }): "danger" | "warn" | "ok" | "new" {
  const days = Math.floor((Date.now() - new Date(s.lastActive === "-" ? 0 : s.lastActive).getTime()) / 86400000)
  const recent = s.quizSessions.slice(0, 5)
  const avgAcc = recent.length >= 2
    ? recent.reduce((sum, q) => sum + (q.correct_answers / q.total_questions) * 100, 0) / recent.length
    : null
  if (s.lastActive === "-" && recent.length === 0) return "new"
  if (days >= 7) return "danger"
  if (days >= 4 || (avgAcc !== null && avgAcc < 55 && days <= 3)) return "warn"
  return "ok"
}

const STATUS_DOT: Record<string, string> = {
  danger: "bg-red-500",
  warn:   "bg-amber-400",
  ok:     "bg-green-500",
  new:    "bg-gray-300",
}
const STATUS_ORDER = { danger: 0, warn: 1, ok: 2, new: 3 }

function StudentStatusGrid({ students, onStudentClick, lang, hwStudentIds, hwPendingIds }: {
  students: StudentRow[]
  onStudentClick: (id: string) => void
  lang: "ko" | "en"
  hwStudentIds?: Set<string>
  hwPendingIds?: Set<string>
}) {
  const sorted = [...students].sort((a, b) =>
    STATUS_ORDER[studentStatus(a)] - STATUS_ORDER[studentStatus(b)]
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-gray-700">👥 {lang === "en" ? "All Students" : "전체 학생 현황"}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">{lang === "en" ? "At-risk students first · Click to expand" : "문제 있는 학생 먼저 · 클릭하면 상세 확인"}</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />{lang === "en" ? "At risk" : "위험"}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />{lang === "en" ? "Watch" : "주의"}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />{lang === "en" ? "Good" : "양호"}</span>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {sorted.map(s => {
          const status = studentStatus(s)
          const days = Math.floor((Date.now() - new Date(s.lastActive === "-" ? 0 : s.lastActive).getTime()) / 86400000)
          const recent = s.quizSessions.slice(0, 5)
          const avgAcc = recent.length >= 2
            ? Math.round(recent.reduce((sum, q) => sum + (q.correct_answers / q.total_questions) * 100, 0) / recent.length)
            : null
          const lastLesson = s.lessonProgress
            .filter(r => r.progress_type === "learn" && r.completed)
            .sort((a, b) => b.updated_at.localeCompare(a.updated_at))[0]

          return (
            <button
              key={s.id}
              onClick={() => onStudentClick(s.id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left group"
            >
              <span className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-0.5", STATUS_DOT[status])} />
              <span className="text-sm font-semibold text-gray-800 w-20 truncate group-hover:text-orange-600 transition-colors">
                {s.displayName}
              </span>
              <span className={cn(
                "text-xs w-14 flex-shrink-0 font-medium",
                days === 0 ? "text-green-600" : days <= 2 ? "text-gray-500" : days <= 5 ? "text-amber-500 font-bold" : "text-red-500 font-bold"
              )}>
                {s.lastActive === "-" ? (lang === "en" ? "No record" : "기록없음") : days === 0 ? (lang === "en" ? "Today" : "오늘") : days === 1 ? (lang === "en" ? "Yesterday" : "어제") : (lang === "en" ? `${days}d ago` : `${days}일 전`)}
              </span>
              <span className="text-xs text-gray-400 flex-1 truncate">
                {lastLesson ? getLessonName(lastLesson.lesson_id, lang) : "—"}
              </span>
              <span className={cn(
                "text-xs font-black w-10 text-right flex-shrink-0",
                avgAcc === null ? "text-gray-300" : avgAcc >= 70 ? "text-green-600" : avgAcc >= 55 ? "text-amber-500" : "text-red-500"
              )}>
                {avgAcc !== null ? `${avgAcc}%` : "—"}
              </span>
              {hwStudentIds && (
                <span className="w-12 flex-shrink-0 text-right text-[10px] font-bold">
                  {hwPendingIds?.has(s.id)
                    ? <span className="text-amber-600">{lang === "en" ? "Needs review" : "확인필요"}</span>
                    : hwStudentIds.has(s.id)
                    ? <span className="text-green-600">{lang === "en" ? "Graded" : "채점완료"}</span>
                    : ""}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** 가장 최근에 활동한 레슨 찾기 */
function getCurrentLesson(progress: LessonProgressRow[], lang: "ko" | "en" = "ko"): { name: string; completed: boolean; date: string } | null {
  if (!progress || progress.length === 0) return null
  const sorted = [...progress].sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
  const recent = sorted[0]
  if (!recent) return null
  const emoji = recent.lesson_id.startsWith("cpp-") ? "⚡" : recent.lesson_id.startsWith("pseudo-") || recent.lesson_id.startsWith("igcse-") ? "📋" : "🐍"
  return {
    name: `${emoji} ${getLessonName(recent.lesson_id, lang)}`,
    completed: recent.completed,
    date: recent.updated_at,
  }
}

interface LessonProgressRow {
  lesson_id: string
  progress_type: "learn" | "review"
  completed: boolean
  score: number
  updated_at: string
}

interface StepVisitSummary {
  lesson_id: string
  visited_steps: number
  total_steps: number
  last_visited_at: string
}

interface StudentRow {
  id: string
  displayName: string
  avatarUrl: string | null
  completedLessons: number
  totalXp: number
  dailyStreak: number
  lastActive: string
  activeToday: boolean
  lessonProgress: LessonProgressRow[]
  quizSessions: QuizSession[]
  stepVisits: StepVisitSummary[]  // 스텝 방문 현황 (미완료 레슨 포함)
}


function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === "-") return "-"
  try {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}/${d.getDate()}`
  } catch {
    return dateStr
  }
}

function daysSince(dateStr: string): number {
  if (!dateStr || dateStr === "-") return 999
  try {
    const d = new Date(dateStr)
    const now = new Date()
    return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  } catch {
    return 999
  }
}

function formatLastActive(dateStr: string, lang: "ko" | "en" = "ko"): string {
  if (!dateStr || dateStr === "-") return lang === "en" ? "No record" : "기록 없음"
  const days = daysSince(dateStr)
  if (days === 0) return lang === "en" ? "Today" : "오늘"
  if (days === 1) return lang === "en" ? "Yesterday" : "어제"
  if (days < 7) return lang === "en" ? `${days}d ago` : `${days}일 전`
  if (days < 14) return lang === "en" ? "1w ago" : "1주 전"
  if (days < 30) return lang === "en" ? `${Math.floor(days / 7)}w ago` : `${Math.floor(days / 7)}주 전`
  return lang === "en" ? "30d+" : "30일+"
}


export default function ClassDetailPage() {
  const searchParams = useSearchParams()
  const classId = searchParams.get("id") || ""
  const focusStudentId = searchParams.get("student") || null
  const { user, profile: teacherProfile } = useAuth()
  const { lang } = useLanguage()
  const [classInfo, setClassInfo] = useState<Class | null>(null)
  const [students, setStudents] = useState<StudentRow[]>([])
  const [copiedCode, setCopiedCode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"name" | "xp" | "lessons" | "streak" | "lastActive">("lastActive")
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [parentLinkCopied, setParentLinkCopied] = useState<string | null>(null)
  const [parentLinkError, setParentLinkError] = useState<string | null>(null)
  const [generatingLink, setGeneratingLink] = useState<string | null>(null)
  const [studentPage, setStudentPage] = useState(0)
  const [hwStudentIds, setHwStudentIds] = useState<Set<string>>(new Set())
  const [hwPendingIds, setHwPendingIds] = useState<Set<string>>(new Set())
  const [hwLessonsByStudent, setHwLessonsByStudent] = useState<Map<string, Set<string>>>(new Map())
  // 학생 카드 펼칠 때만 question_details 포함한 상세 세션 로드
  const [detailedSessions, setDetailedSessions] = useState<Record<string, QuizSession[]>>({})

  useEffect(() => {
    if (!user) return
    if (!classId) {
      setIsLoading(false)
      return
    }
    loadClassData()
  }, [user, classId])

  // 학생 패널 열릴 때 question_details 포함 상세 세션 로드 (lazy)
  useEffect(() => {
    if (!selectedStudentId || detailedSessions[selectedStudentId]) return
    const fetchDetail = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("quiz_sessions")
        .select("*")
        .eq("user_id", selectedStudentId)
        .order("completed_at", { ascending: false })
        .limit(30)
      if (data) setDetailedSessions(prev => ({ ...prev, [selectedStudentId]: data as QuizSession[] }))
    }
    fetchDetail()
  }, [selectedStudentId]) // eslint-disable-line react-hooks/exhaustive-deps

  // URL에 student 파라미터 있으면 자동으로 해당 학생 패널 열기
  useEffect(() => {
    if (!focusStudentId || students.length === 0) return
    setSelectedStudentId(focusStudentId)
    const sorted = [...students].sort((a, b) => {
      const da = Math.floor((Date.now() - new Date(a.lastActive).getTime()) / 86400000)
      const db = Math.floor((Date.now() - new Date(b.lastActive).getTime()) / 86400000)
      return da - db
    })
    const idx = sorted.findIndex(s => s.id === focusStudentId)
    if (idx >= 0) setStudentPage(Math.floor(idx / STUDENTS_PER_PAGE))
  }, [focusStudentId, students]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadClassData = async () => {
    const supabase = createClient()

    // 반 정보 (소유권 확인: 본인 반만 접근)
    const { data: cls } = await supabase
      .from("classes")
      .select("*")
      .eq("id", classId)
      .eq("teacher_id", user!.id)
      .single()

    if (!cls) {
      setIsLoading(false)
      return
    }
    setClassInfo(cls)

    // 학생 목록
    const { data: members } = await supabase
      .from("class_members")
      .select("student_id")
      .eq("class_id", classId)

    if (!members || members.length === 0) {
      setIsLoading(false)
      return
    }

    const studentIds = members.map(m => m.student_id)

    // 프로필 (필요한 컬럼만)
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url")
      .in("id", studentIds)

    // 게이미피케이션 (필요한 컬럼만)
    const { data: gamification } = await supabase
      .from("gamification_data")
      .select("user_id, total_xp, daily_streak, last_active_date")
      .in("user_id", studentIds)

    // 전체 레슨 진도 (학생당 최대 ~120행, 상한 5000으로 고정)
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("user_id, lesson_id, progress_type, completed, score, updated_at")
      .in("user_id", studentIds)
      .limit(5000)

    // 퀴즈 세션 — question_details 제외, 학생당 최대 25개 (개요 통계용)
    const { data: quizSessions } = await supabase
      .from("quiz_sessions")
      .select("id, user_id, difficulty, total_questions, correct_answers, max_combo, hearts_remaining, time_elapsed_ms, end_reason, xp_earned, quick_answer_count, slow_answer_count, started_at, completed_at")
      .in("user_id", studentIds)
      .order("completed_at", { ascending: false })
      .limit(studentIds.length * 25)

    // 스텝 방문 로그 — 레슨별 방문 스텝 수 집계
    const { data: rawStepVisits } = await supabase
      .from("lesson_step_visits")
      .select("user_id, lesson_id, step_id, total_steps, last_visited_at")
      .in("user_id", studentIds)

    // 조합
    const profileMap = new Map((profiles || []).map(p => [p.id, p]))
    const gamMap = new Map((gamification || []).map((g: { user_id: string; total_xp: number; daily_streak: number; last_active_date: string }) => [g.user_id, g]))

    // 유저별 퀴즈 세션
    const quizMap = new Map<string, QuizSession[]>()
    for (const qs of quizSessions || []) {
      if (!quizMap.has(qs.user_id)) quizMap.set(qs.user_id, [])
      quizMap.get(qs.user_id)!.push(qs as QuizSession)
    }

    // 유저별 스텝 방문 집계: user_id → lesson_id → { visited, total, lastAt }
    type VisitAgg = { visitedSteps: Set<string>; total: number; lastAt: string }
    const stepVisitMap = new Map<string, Map<string, VisitAgg>>()
    for (const v of rawStepVisits || []) {
      if (!stepVisitMap.has(v.user_id)) stepVisitMap.set(v.user_id, new Map())
      const lessonMap = stepVisitMap.get(v.user_id)!
      if (!lessonMap.has(v.lesson_id)) {
        lessonMap.set(v.lesson_id, { visitedSteps: new Set(), total: v.total_steps, lastAt: v.last_visited_at })
      }
      const agg = lessonMap.get(v.lesson_id)!
      agg.visitedSteps.add(v.step_id)
      if (v.total_steps > agg.total) agg.total = v.total_steps
      if (v.last_visited_at > agg.lastAt) agg.lastAt = v.last_visited_at
    }

    // 유저별 진도 계산
    const progressMap = new Map<string, LessonProgressRow[]>()
    // 완료된 레슨을 unique하게 카운트 (learn 완료만, lesson_id 기준 중복 제거)
    const completedLessonsSet = new Map<string, Set<string>>()
    const todayStr = new Date().toISOString().slice(0, 10)
    const activeTodaySet = new Set<string>()

    for (const p of progress || []) {
      // 레슨 진도 목록
      if (!progressMap.has(p.user_id)) progressMap.set(p.user_id, [])
      // progress_type: "quiz" → "review" 로 normalize (구버전 호환)
      const normalizedType = p.progress_type === "quiz" ? "review" : (p.progress_type as "learn" | "review")
      progressMap.get(p.user_id)!.push({
        lesson_id: p.lesson_id,
        progress_type: normalizedType,
        completed: p.completed,
        score: p.score,
        updated_at: p.updated_at,
      })

      // 완료 수: "learn" 타입 + completed=true인 lesson_id만 unique하게 카운트
      // completed가 null인 레거시 행도 progress_type=learn이면 완료로 처리
      if ((p.completed === true || p.completed === null) && p.progress_type === "learn") {
        if (!completedLessonsSet.has(p.user_id)) completedLessonsSet.set(p.user_id, new Set())
        completedLessonsSet.get(p.user_id)!.add(p.lesson_id)
      }

      // 오늘 활동 여부
      if (p.updated_at && p.updated_at.slice(0, 10) === todayStr) {
        activeTodaySet.add(p.user_id)
      }
    }

    const rows: StudentRow[] = studentIds.map(sid => {
      const prof = profileMap.get(sid) as Profile | undefined
      const gam = gamMap.get(sid)
      const lessonProgress = (progressMap.get(sid) || []).sort((a, b) => {
        // 커리큘럼 순서로 정렬
        return lessonSortIndex(a.lesson_id) - lessonSortIndex(b.lesson_id)
      })

      // lastActive: gamification + lesson_progress.updated_at 중 더 최근 것
      const lessonLastActive = lessonProgress.reduce((max, p) => {
        const d = p.updated_at?.slice(0, 10) || ""
        return d > max ? d : max
      }, "")
      const gamLastActive = gam?.last_active_date || ""
      const lastActive = lessonLastActive > gamLastActive ? lessonLastActive : (gamLastActive || "-")

      return {
        id: sid,
        displayName: prof?.display_name || (lang === "en" ? "Student" : "학생"),
        avatarUrl: prof?.avatar_url || null,
        completedLessons: completedLessonsSet.get(sid)?.size || 0,
        totalXp: gam?.total_xp || 0,
        dailyStreak: gam?.daily_streak || 0,
        lastActive,
        activeToday: activeTodaySet.has(sid),
        lessonProgress,
        quizSessions: quizMap.get(sid) || [],
        stepVisits: Array.from(stepVisitMap.get(sid)?.entries() || []).map(([lessonId, agg]) => ({
          lesson_id: lessonId,
          visited_steps: agg.visitedSteps.size,
          total_steps: agg.total,
          last_visited_at: agg.lastAt,
        })),
      }
    })

    setStudents(rows)

    // 숙제 제출한 학생 ID 목록 + 확인 필요 학생 + 과제 레슨 맵
    const { data: hwData } = await supabase
      .from("homework_submissions")
      .select("student_id, lesson_id, teacher_grade")
      .in("student_id", studentIds)
    setHwStudentIds(new Set((hwData || []).map(h => h.student_id)))
    setHwPendingIds(new Set((hwData || []).filter(h => !h.teacher_grade || h.teacher_grade === "fail").map(h => h.student_id)))
    const lessonMap = new Map<string, Set<string>>()
    for (const h of (hwData || [])) {
      if (!lessonMap.has(h.student_id)) lessonMap.set(h.student_id, new Set())
      lessonMap.get(h.student_id)!.add(h.lesson_id)
    }
    setHwLessonsByStudent(lessonMap)

    setIsLoading(false)
  }

  const sortedStudents = [...students].sort((a, b) => {
    switch (sortBy) {
      case "xp": return b.totalXp - a.totalXp
      case "lessons": return b.completedLessons - a.completedLessons
      case "streak": return b.dailyStreak - a.dailyStreak
      case "lastActive": {
        // 최근 활동 순 (내림차순): "-" 또는 없는 경우 맨 뒤로
        const aDate = a.lastActive === "-" ? "0" : (a.lastActive || "0")
        const bDate = b.lastActive === "-" ? "0" : (b.lastActive || "0")
        return bDate.localeCompare(aDate)
      }
      default: return a.displayName.localeCompare(b.displayName)
    }
  })

  const copyCode = () => {
    if (classInfo) {
      navigator.clipboard.writeText(classInfo.join_code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const generateParentLink = async (student: StudentRow) => {
    if (!user || !classId || generatingLink) return
    setGeneratingLink(student.id)

    try {
      const supabase = createClient()
      // 이미 존재하는 링크 확인
      const { data: existing } = await supabase
        .from("parent_report_links")
        .select("token")
        .eq("student_id", student.id)
        .eq("class_id", classId)
        .eq("is_active", true)
        .maybeSingle()

      let linkToken: string

      if (existing) {
        linkToken = existing.token
      } else {
        // 새 토큰 생성
        linkToken = Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map(b => b.toString(36).padStart(2, "0"))
          .join("")
          .slice(0, 20)

        const { error: insertError } = await supabase.from("parent_report_links").insert({
          token: linkToken,
          student_id: student.id,
          class_id: classId,
          created_by: user.id,
          student_name: student.displayName,
        })
        if (insertError) throw insertError
      }

      const url = `${window.location.origin}/parent?t=${linkToken}`

      // Web Share API 지원 기기 (모바일)면 공유 시트 열기
      if (navigator.share) {
        await navigator.share({
          title: `${student.displayName} 학습 리포트`,
          text: `코드린에서 ${student.displayName}의 학습 현황을 확인하세요.`,
          url,
        }).catch(() => {
          // 공유 취소 시 클립보드로 폴백
          navigator.clipboard.writeText(url)
        })
      } else {
        await navigator.clipboard.writeText(url)
      }
      setParentLinkCopied(student.id)
      setTimeout(() => setParentLinkCopied(null), 3000)
    } catch (e) {
      console.error("Failed to generate parent link:", (e as any)?.message ?? (e as any)?.code ?? JSON.stringify(e))
      setParentLinkError(lang === "en" ? "Failed to generate link. Please try again." : "링크 생성에 실패했습니다. 다시 시도해주세요.")
      setTimeout(() => setParentLinkError(null), 4000)
    }
    setGeneratingLink(null)
  }

  const displayName = teacherProfile?.display_name || (lang === "en" ? "Teacher" : "선생님")

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      {parentLinkError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
          {parentLinkError}
        </div>
      )}

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-2xl mx-auto">
        <Link href="/teacher" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> {lang === "en" ? "Class list" : "반 목록으로"}
        </Link>

        {!classId && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🏫</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">{lang === "en" ? "Select a class" : "반을 선택해주세요"}</h2>
            <p className="text-gray-400 text-sm mb-6">{lang === "en" ? "Select a class to manage from the dashboard." : "대시보드에서 관리할 반을 선택하세요."}</p>
            <Link href="/teacher" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
              {lang === "en" ? "Go to Dashboard" : "대시보드로 이동"}
            </Link>
          </div>
        )}

        {classId && classInfo && (
          <>
            {/* 반 정보 카드 */}
            <Card className="p-5 mb-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <h1 className="text-xl font-bold text-gray-800 mb-3">{classInfo.name}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-orange-200">
                  <span className="text-sm text-gray-500">{lang === "en" ? "Join code" : "참가 코드"}</span>
                  <span className="font-mono font-bold text-lg text-orange-600 tracking-widest">
                    {classInfo.join_code}
                  </span>
                  <button
                    onClick={copyCode}
                    className="p-1 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    {copiedCode ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" /> {students.length}{lang === "en" ? " students" : "명"}
                </span>
              </div>
            </Card>

            {/* 학생 상태 그리드 — 가장 먼저 */}
            {students.length > 0 && (
              <StudentStatusGrid
                students={students}
                lang={lang}
                hwStudentIds={hwStudentIds}
                hwPendingIds={hwPendingIds}
                onStudentClick={(studentId) => {
                  setSelectedStudentId(studentId === selectedStudentId ? null : studentId)
                  const idx = sortedStudents.findIndex(s => s.id === studentId)
                  if (idx >= 0) setStudentPage(Math.floor(idx / STUDENTS_PER_PAGE))
                }}
              />
            )}

            {/* 반 전체 요약 + 위험 알림 + 약점 레슨 */}
            <ClassOverview
              students={students}
              joinCode={classInfo?.join_code}
              onStudentClick={(studentId) => {
                setSelectedStudentId(studentId === selectedStudentId ? null : studentId)
                const idx = sortedStudents.findIndex(s => s.id === studentId)
                if (idx >= 0) setStudentPage(Math.floor(idx / STUDENTS_PER_PAGE))
              }}
            />

            {/* 정렬 버튼 */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { key: "lastActive" as const, label: lang === "en" ? "Recent activity" : "최근 활동순" },
                { key: "name" as const, label: lang === "en" ? "Name" : "이름순" },
                { key: "xp" as const, label: lang === "en" ? "XP" : "XP순" },
                { key: "lessons" as const, label: lang === "en" ? "Lessons done" : "완료순" },
                { key: "streak" as const, label: lang === "en" ? "Streak" : "연속일순" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setSortBy(key); setStudentPage(0) }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    sortBy === key
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 학생 테이블 */}
            {isLoading ? (
              <div className="text-center py-12 text-gray-400">{lang === "en" ? "Loading..." : "불러오는 중..."}</div>
            ) : students.length === 0 ? (
              <Card className="p-8 text-center border-2 border-dashed border-gray-200">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-1">{lang === "en" ? "No students yet" : "아직 참가한 학생이 없어요"}</p>
                <p className="text-sm text-gray-400">
                  {lang === "en" ? "Share the join code " : "참가 코드 "}<strong className="text-orange-600">{classInfo.join_code}</strong>{lang === "en" ? " with students" : "를 학생들에게 공유하세요"}
                </p>
              </Card>
            ) : (
              <div className="space-y-2">
                {(() => {
                  const pagedStudents = sortedStudents.slice(studentPage * STUDENTS_PER_PAGE, (studentPage + 1) * STUDENTS_PER_PAGE)
                  const totalPages = Math.ceil(sortedStudents.length / STUDENTS_PER_PAGE)
                  return (<>
                {pagedStudents.map((student, idx) => (
                  <Card key={student.id} id={`student-${student.id}`} className={cn("border overflow-hidden transition-all", selectedStudentId === student.id ? "border-orange-300 shadow-md" : "border-gray-100")}>
                    {/* 학생 요약 행 */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedStudentId(selectedStudentId === student.id ? null : student.id)}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedStudentId(selectedStudentId === student.id ? null : student.id)}
                      className={cn("w-full p-4 flex items-center gap-3 transition-colors text-left cursor-pointer", selectedStudentId === student.id ? "bg-orange-50/60" : "hover:bg-gray-50/50")}
                    >
                      {/* 순위 + 오늘 활동 표시 */}
                      <div className="relative w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600 flex-shrink-0">
                        {idx + 1}
                        {student.activeToday && (
                          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                        )}
                      </div>

                      {/* 이름 + 현재 학습 중 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-gray-800 truncate">{student.displayName}</p>
                          {student.activeToday ? (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">{lang === "en" ? "Active today" : "오늘 활동"}</span>
                          ) : (
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                              daysSince(student.lastActive) >= 7
                                ? "bg-red-100 text-red-600"
                                : daysSince(student.lastActive) >= 3
                                ? "bg-amber-100 text-amber-600"
                                : "bg-gray-100 text-gray-400"
                            )}>
                              {formatLastActive(student.lastActive, lang)}
                            </span>
                          )}
                        </div>
                        {(() => {
                          const current = getCurrentLesson(student.lessonProgress, lang)
                          return current ? (
                            <p className="text-xs text-indigo-500 font-medium truncate">
                              📖 {current.name} {current.completed ? "✅" : "🔄"}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400">{lang === "en" ? "Not started yet" : "아직 시작 전"}</p>
                          )
                        })()}
                      </div>

                      {/* 통계 */}
                      <div className="flex items-center gap-3 text-sm flex-shrink-0">
                        <span className="flex items-center gap-1 text-purple-600" title="완료 레슨">
                          <BookOpen className="w-3.5 h-3.5" /> {student.completedLessons}
                        </span>
                        <span className="flex items-center gap-1 text-orange-600" title="총 XP">
                          <Trophy className="w-3.5 h-3.5" /> {student.totalXp}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600" title="퀴즈 세션">
                          <ClipboardCheck className="w-3.5 h-3.5" /> {student.quizSessions.length}
                        </span>
                        <span className="flex items-center gap-1 text-red-500" title="연속일">
                          <Flame className="w-3.5 h-3.5" /> {student.dailyStreak}
                        </span>
                      </div>

                      {/* 학부모 링크 */}
                      <button
                        onClick={(e) => { e.stopPropagation(); generateParentLink(student) }}
                        disabled={generatingLink === student.id}
                        className={cn(
                          "px-2 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 flex-shrink-0",
                          parentLinkCopied === student.id
                            ? "bg-green-100 text-green-700"
                            : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        )}
                        title="학부모 리포트 링크 복사"
                      >
                        {parentLinkCopied === student.id ? (
                          <><Check className="w-3 h-3" /> {lang === "en" ? "Copied" : "복사됨"}</>
                        ) : (
                          <><ExternalLink className="w-3 h-3" /> {lang === "en" ? "Parent" : "학부모"}</>
                        )}
                      </button>

                      {/* 패널 열기 화살표 */}
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
                        selectedStudentId === student.id && "rotate-180"
                      )} />
                    </div>
                  </Card>
                ))}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setStudentPage(p => Math.max(0, p - 1))}
                      disabled={studentPage === 0}
                      className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                    >
                      {lang === "en" ? "← Prev" : "← 이전"}
                    </button>
                    <span className="text-xs text-gray-500 font-medium">
                      {studentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setStudentPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={studentPage === totalPages - 1}
                      className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                    >
                      {lang === "en" ? "Next →" : "다음 →"}
                    </button>
                  </div>
                )}
                  </>)
                })()}
              </div>
            )}
          </>
        )}
      </main>

      {/* 학생 상세 슬라이드 패널 */}
      {selectedStudentId && (() => {
        const selectedStudent = students.find(s => s.id === selectedStudentId)
        return selectedStudent ? (
          <StudentDetailPanel
            student={selectedStudent}
            detailedSessions={detailedSessions[selectedStudentId] || []}
            homeworkLessonIds={hwLessonsByStudent.get(selectedStudentId)}
            onClose={() => setSelectedStudentId(null)}
            onGenerateParentLink={generateParentLink}
            parentLinkCopied={parentLinkCopied}
            generatingLink={generatingLink}
            lang={lang}
          />
        ) : null
      })()}

      <BottomNav />
    </div>
  )
}
