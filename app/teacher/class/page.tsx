"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import type { Class, Profile, GamificationData } from "@/lib/supabase/types"
import type { QuizSession } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Check, Users, Trophy, Flame, BookOpen, ChevronDown, ClipboardCheck, ExternalLink, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { StudentQuizReport } from "@/components/teacher/student-quiz-report"
import { StudentConsistency } from "@/components/teacher/student-consistency"
import { StudentProgress } from "@/components/teacher/student-progress"
import { ClassOverview } from "@/components/teacher/class-overview"
import { getLessonName, pythonParts, cppParts, pseudoParts } from "@/lib/curriculum-data"

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
          <h3 className="text-sm font-black text-gray-700">👥 전체 학생 현황</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">문제 있는 학생 먼저 · 클릭하면 상세 확인</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />위험</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />주의</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />양호</span>
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
                {s.lastActive === "-" ? "기록없음" : days === 0 ? "오늘" : days === 1 ? "어제" : `${days}일 전`}
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
                    ? <span className="text-amber-600">확인필요</span>
                    : hwStudentIds.has(s.id)
                    ? <span className="text-green-600">채점완료</span>
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

function formatLastActive(dateStr: string): string {
  if (!dateStr || dateStr === "-") return "기록 없음"
  const days = daysSince(dateStr)
  if (days === 0) return "오늘"
  if (days === 1) return "어제"
  if (days < 7) return `${days}일 전`
  if (days < 14) return "1주 전"
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  return "30일+"
}

// ─────────────────────────────────────────────────────────
// 학생 자동 분석 카드
// ─────────────────────────────────────────────────────────
function StudentInsights({ lessonProgress, quizSessions, lang }: {
  lessonProgress: LessonProgressRow[]
  quizSessions: QuizSession[]
  lang: "ko" | "en"
}) {
  // lesson_id 별로 learn/review 최신 행 수집
  const learnMap = new Map<string, { updated_at: string }>()
  const reviewMap = new Map<string, { score: number; updated_at: string }>()
  for (const row of lessonProgress) {
    if (row.progress_type === "learn" && row.completed) {
      const ex = learnMap.get(row.lesson_id)
      if (!ex || row.updated_at > ex.updated_at) learnMap.set(row.lesson_id, { updated_at: row.updated_at })
    }
    if (row.progress_type === "review" && row.completed) {
      const ex = reviewMap.get(row.lesson_id)
      if (!ex || row.updated_at > ex.updated_at) reviewMap.set(row.lesson_id, { score: row.score, updated_at: row.updated_at })
    }
  }

  // 0. 자주 틀리는 문제 (퀴즈 세션 집계)
  const conceptMap = new Map<number, { text: string; total: number; wrong: number }>()
  for (const session of quizSessions) {
    for (const q of (session.question_details ?? [])) {
      const entry = conceptMap.get(q.question_id) ?? { text: q.question_text, total: 0, wrong: 0 }
      entry.total++
      if (!q.is_correct) entry.wrong++
      conceptMap.set(q.question_id, entry)
    }
  }
  const weakQuestions = [...conceptMap.entries()]
    .map(([id, v]) => ({ id, text: v.text, total: v.total, wrong: v.wrong, pct: Math.round((v.wrong / v.total) * 100) }))
    .filter(w => w.total >= 2 && w.wrong >= 2)   // 2번 이상 틀린 문제
    .sort((a, b) => b.wrong - a.wrong || b.pct - a.pct)
    .slice(0, 4)

  // 1. 낮은 복습 점수 수업 (복습 완료했지만 점수 < 70%)
  const lowScores = [...reviewMap.entries()]
    .map(([lessonId, { score, updated_at }]) => ({ lessonId, score, updated_at }))
    .filter(r => r.score > 0 && r.score < 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  // 2. 복습이 밀린 수업 (학습 완료 후 D+3 이상 미복습)
  const overdueReviews = [...learnMap.entries()]
    .filter(([lessonId]) => !reviewMap.has(lessonId))
    .map(([lessonId, { updated_at }]) => ({ lessonId, days: daysSince(updated_at) }))
    .filter(r => r.days >= 3)
    .sort((a, b) => b.days - a.days)
    .slice(0, 3)

  if (weakQuestions.length === 0 && lowScores.length === 0 && overdueReviews.length === 0) return null

  return (
    <div className="mt-3 mb-1 rounded-xl border border-orange-200 bg-orange-50 p-3 space-y-3">
      <div className="flex items-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
        <span className="text-xs font-black text-orange-700">학습 분석</span>
        <span className="text-[10px] text-orange-400 ml-auto">자동 감지</span>
      </div>

      {/* 자주 틀리는 문제 */}
      {weakQuestions.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">🔁 반복해서 틀린 문제</p>
          {weakQuestions.map(w => (
            <div key={w.id} className="flex items-start gap-2 py-1 border-b border-orange-100 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-700 line-clamp-2 leading-snug">{w.text}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
                <span className={cn(
                  "text-[10px] font-black px-1.5 py-0.5 rounded",
                  w.pct >= 80 ? "bg-red-100 text-red-600" : w.pct >= 60 ? "bg-orange-100 text-orange-600" : "bg-amber-100 text-amber-600"
                )}>{w.wrong}번 틀림</span>
                <span className="text-[9px] text-gray-400">{w.total}번 중 {w.pct}% 오답</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 낮은 복습 점수 */}
      {lowScores.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">📉 낮은 복습 점수 — 재복습 권장</p>
          {lowScores.map(r => (
            <div key={r.lessonId} className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-gray-700 truncate block font-medium">{getLessonName(r.lessonId, lang)}</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-20 h-1 bg-red-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", r.score < 40 ? "bg-red-500" : r.score < 60 ? "bg-orange-400" : "bg-amber-400")}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black",
                    r.score < 40 ? "text-red-600" : r.score < 60 ? "text-orange-600" : "text-amber-600"
                  )}>{r.score}%</span>
                </div>
              </div>
              <Link
                href={`/review/${r.lessonId}`}
                target="_blank"
                className="flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center gap-0.5"
              >
                복습하기 →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 복습이 밀린 수업 */}
      {overdueReviews.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">⏰ 복습이 밀린 수업</p>
          {overdueReviews.map(r => (
            <div key={r.lessonId} className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-gray-700 truncate block font-medium">{getLessonName(r.lessonId, lang)}</span>
                <span className={cn(
                  "text-[10px] font-bold",
                  r.days >= 14 ? "text-red-500" : r.days >= 7 ? "text-amber-500" : "text-yellow-600"
                )}>학습 후 {r.days}일째 복습 없음</span>
              </div>
              <Link
                href={`/review/${r.lessonId}`}
                target="_blank"
                className={cn(
                  "flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-lg transition-colors flex items-center gap-0.5",
                  r.days >= 14 ? "bg-red-100 text-red-600 hover:bg-red-200" :
                  r.days >= 7  ? "bg-amber-100 text-amber-600 hover:bg-amber-200" :
                                 "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                )}
              >
                복습하기 →
              </Link>
            </div>
          ))}
        </div>
      )}

      <p className="text-[9px] text-orange-300 border-t border-orange-200 pt-2">
        복습하기 링크를 학생에게 직접 공유하거나, 학생이 스스로 복습하도록 안내하세요.
      </p>
    </div>
  )
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
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"lessons" | "quizzes" | "consistency">("lessons")
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

  // 학생 카드 펼칠 때 question_details 포함 상세 세션 로드 (lazy)
  useEffect(() => {
    if (!expandedStudent || detailedSessions[expandedStudent]) return
    const fetchDetail = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from("quiz_sessions")
        .select("*")
        .eq("user_id", expandedStudent)
        .order("completed_at", { ascending: false })
        .limit(30)
      if (data) setDetailedSessions(prev => ({ ...prev, [expandedStudent]: data as QuizSession[] }))
    }
    fetchDetail()
  }, [expandedStudent]) // eslint-disable-line react-hooks/exhaustive-deps

  // URL에 student 파라미터 있으면 자동으로 해당 학생 펼치고 스크롤
  useEffect(() => {
    if (!focusStudentId || students.length === 0) return
    setExpandedStudent(focusStudentId)
    setActiveTab("lessons")
    const sorted = [...students].sort((a, b) => {
      const da = Math.floor((Date.now() - new Date(a.lastActive).getTime()) / 86400000)
      const db = Math.floor((Date.now() - new Date(b.lastActive).getTime()) / 86400000)
      return da - db
    })
    const idx = sorted.findIndex(s => s.id === focusStudentId)
    if (idx >= 0) setStudentPage(Math.floor(idx / STUDENTS_PER_PAGE))
    setTimeout(() => {
      document.getElementById(`student-${focusStudentId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 400)
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

    // 전체 레슨 진도 (학생 1명당 최대 ~120행 = 52레슨×2타입+버퍼)
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("user_id, lesson_id, progress_type, completed, score, updated_at")
      .in("user_id", studentIds)
      .limit(studentIds.length * 130)

    // 퀴즈 세션 — question_details 제외, 학생당 최대 25개 (개요 통계용)
    const { data: quizSessions } = await supabase
      .from("quiz_sessions")
      .select("id, user_id, difficulty, total_questions, correct_answers, max_combo, hearts_remaining, time_elapsed_ms, end_reason, xp_earned, quick_answer_count, slow_answer_count, started_at, completed_at")
      .in("user_id", studentIds)
      .order("completed_at", { ascending: false })
      .limit(studentIds.length * 25)

    // 조합
    const profileMap = new Map((profiles || []).map(p => [p.id, p]))
    const gamMap = new Map((gamification || []).map((g: { user_id: string; total_xp: number; daily_streak: number; last_active_date: string }) => [g.user_id, g]))

    // 유저별 퀴즈 세션
    const quizMap = new Map<string, QuizSession[]>()
    for (const qs of quizSessions || []) {
      if (!quizMap.has(qs.user_id)) quizMap.set(qs.user_id, [])
      quizMap.get(qs.user_id)!.push(qs as QuizSession)
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
      progressMap.get(p.user_id)!.push({
        lesson_id: p.lesson_id,
        progress_type: p.progress_type as "learn" | "review",
        completed: p.completed,
        score: p.score,
        updated_at: p.updated_at,
      })

      // 완료 수: "learn" 타입 + completed=true인 lesson_id만 unique하게 카운트
      if (p.completed && p.progress_type === "learn") {
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
        displayName: prof?.display_name || "학생",
        avatarUrl: prof?.avatar_url || null,
        completedLessons: completedLessonsSet.get(sid)?.size || 0,
        totalXp: gam?.total_xp || 0,
        dailyStreak: gam?.daily_streak || 0,
        lastActive,
        activeToday: activeTodaySet.has(sid),
        lessonProgress,
        quizSessions: quizMap.get(sid) || [],
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
        .single()

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
      console.error("Failed to generate parent link:", e)
      setParentLinkError("링크 생성에 실패했습니다. 다시 시도해주세요.")
      setTimeout(() => setParentLinkError(null), 4000)
    }
    setGeneratingLink(null)
  }

  const displayName = teacherProfile?.display_name || "선생님"

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
          <ArrowLeft className="w-4 h-4" /> 반 목록으로
        </Link>

        {!classId && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🏫</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">반을 선택해주세요</h2>
            <p className="text-gray-400 text-sm mb-6">대시보드에서 관리할 반을 선택하세요.</p>
            <Link href="/teacher" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
              대시보드로 이동
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
                  <span className="text-sm text-gray-500">참가 코드</span>
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
                  <Users className="w-4 h-4" /> {students.length}명
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
                  setExpandedStudent(studentId)
                  setActiveTab("lessons")
                  const idx = sortedStudents.findIndex(s => s.id === studentId)
                  if (idx >= 0) setStudentPage(Math.floor(idx / STUDENTS_PER_PAGE))
                  setTimeout(() => {
                    document.getElementById(`student-${studentId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }, 150)
                }}
              />
            )}

            {/* 반 전체 요약 + 위험 알림 + 약점 레슨 */}
            <ClassOverview
              students={students}
              joinCode={classInfo?.join_code}
              onStudentClick={(studentId) => {
                setExpandedStudent(studentId)
                setActiveTab("lessons")
                const idx = sortedStudents.findIndex(s => s.id === studentId)
                if (idx >= 0) setStudentPage(Math.floor(idx / STUDENTS_PER_PAGE))
                setTimeout(() => {
                  document.getElementById(`student-${studentId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
                }, 100)
              }}
            />

            {/* 정렬 버튼 */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { key: "lastActive" as const, label: "최근 활동순" },
                { key: "name" as const, label: "이름순" },
                { key: "xp" as const, label: "XP순" },
                { key: "lessons" as const, label: "완료순" },
                { key: "streak" as const, label: "연속일순" },
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
              <div className="text-center py-12 text-gray-400">불러오는 중...</div>
            ) : students.length === 0 ? (
              <Card className="p-8 text-center border-2 border-dashed border-gray-200">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-1">아직 참가한 학생이 없어요</p>
                <p className="text-sm text-gray-400">
                  참가 코드 <strong className="text-orange-600">{classInfo.join_code}</strong>를 학생들에게 공유하세요
                </p>
              </Card>
            ) : (
              <div className="space-y-2">
                {(() => {
                  const pagedStudents = sortedStudents.slice(studentPage * STUDENTS_PER_PAGE, (studentPage + 1) * STUDENTS_PER_PAGE)
                  const totalPages = Math.ceil(sortedStudents.length / STUDENTS_PER_PAGE)
                  return (<>
                {pagedStudents.map((student, idx) => (
                  <Card key={student.id} id={`student-${student.id}`} className="border border-gray-100 overflow-hidden">
                    {/* 학생 요약 행 */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                      onKeyDown={(e) => e.key === "Enter" && setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors text-left cursor-pointer"
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
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">오늘 활동</span>
                          ) : (
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                              daysSince(student.lastActive) >= 7
                                ? "bg-red-100 text-red-600"
                                : daysSince(student.lastActive) >= 3
                                ? "bg-amber-100 text-amber-600"
                                : "bg-gray-100 text-gray-400"
                            )}>
                              {formatLastActive(student.lastActive)}
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
                            <p className="text-xs text-gray-400">아직 시작 전</p>
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
                          <><Check className="w-3 h-3" /> 복사됨</>
                        ) : (
                          <><ExternalLink className="w-3 h-3" /> 학부모</>
                        )}
                      </button>

                      {/* 펼치기 화살표 */}
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
                        expandedStudent === student.id && "rotate-180"
                      )} />
                    </div>

                    {/* 펼친 상세: 탭 UI */}
                    {expandedStudent === student.id && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        {/* 자동 분석 카드 */}
                        <StudentInsights
                          lessonProgress={student.lessonProgress}
                          quizSessions={detailedSessions[student.id] || student.quizSessions}
                          lang={lang}
                        />

                        {/* 탭 버튼 + 학부모 링크 */}
                        <div className="flex gap-1 mt-3 mb-1 items-center">
                          {([
                            { key: "lessons" as const, label: "레슨 진도" },
                            { key: "quizzes" as const, label: "퀴즈 리포트" },
                            { key: "consistency" as const, label: "꾸준함" },
                          ]).map(({ key, label }) => (
                            <button
                              key={key}
                              onClick={() => setActiveTab(key)}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                                activeTab === key
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              )}
                            >
                              {label}
                            </button>
                          ))}

                          {/* 학부모 링크 버튼 */}
                          <button
                            onClick={(e) => { e.stopPropagation(); generateParentLink(student) }}
                            disabled={generatingLink === student.id}
                            className={cn(
                              "ml-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1",
                              parentLinkCopied === student.id
                                ? "bg-green-100 text-green-700"
                                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                            )}
                          >
                            {parentLinkCopied === student.id ? (
                              <><Check className="w-3 h-3" /> 복사됨!</>
                            ) : generatingLink === student.id ? (
                              "생성 중..."
                            ) : (
                              <><ExternalLink className="w-3 h-3" /> 학부모 링크</>
                            )}
                          </button>
                        </div>

                        {/* 레슨 진도 탭 */}
                        {activeTab === "lessons" && (
                          <StudentProgress lessonProgress={student.lessonProgress} studentId={student.id} homeworkLessonIds={hwLessonsByStudent.get(student.id)} />
                        )}

                        {/* 퀴즈 리포트 탭 */}
                        {activeTab === "quizzes" && (
                          <StudentQuizReport quizSessions={detailedSessions[student.id] || student.quizSessions} />
                        )}

                        {/* 꾸준함 탭 */}
                        {activeTab === "consistency" && (
                          <StudentConsistency quizSessions={student.quizSessions} />
                        )}
                      </div>
                    )}
                  </Card>
                ))}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setStudentPage(p => Math.max(0, p - 1))}
                      disabled={studentPage === 0}
                      className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                    >
                      ← 이전
                    </button>
                    <span className="text-xs text-gray-500 font-medium">
                      {studentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setStudentPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={studentPage === totalPages - 1}
                      className="px-3 py-1 text-xs font-bold rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
                    >
                      다음 →
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

      <BottomNav />
    </div>
  )
}
