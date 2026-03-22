"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import type { Class, Profile, GamificationData } from "@/lib/supabase/types"
import type { QuizSession } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Check, Users, Trophy, Flame, BookOpen, ChevronDown, ClipboardCheck, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { StudentQuizReport } from "@/components/teacher/student-quiz-report"
import { StudentConsistency } from "@/components/teacher/student-consistency"
import { StudentProgress } from "@/components/teacher/student-progress"
import { ClassOverview } from "@/components/teacher/class-overview"
import { getLessonName } from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

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

export default function ClassDetailPage() {
  const searchParams = useSearchParams()
  const classId = searchParams.get("id") || ""
  const { user, profile: teacherProfile } = useAuth()
  const { lang } = useLanguage()
  const [classInfo, setClassInfo] = useState<Class | null>(null)
  const [students, setStudents] = useState<StudentRow[]>([])
  const [copiedCode, setCopiedCode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"name" | "xp" | "lessons" | "streak">("name")
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"lessons" | "quizzes" | "consistency">("lessons")
  const [parentLinkCopied, setParentLinkCopied] = useState<string | null>(null)
  const [generatingLink, setGeneratingLink] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !classId) return
    loadClassData()
  }, [user, classId])

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

    // 프로필
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .in("id", studentIds)

    // 게이미피케이션
    const { data: gamification } = await supabase
      .from("gamification_data")
      .select("*")
      .in("user_id", studentIds)

    // 전체 레슨 진도 (완료/미완료 모두)
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("user_id, lesson_id, progress_type, completed, score, updated_at")
      .in("user_id", studentIds)

    // 퀴즈 세션
    const { data: quizSessions } = await supabase
      .from("quiz_sessions")
      .select("*")
      .in("user_id", studentIds)
      .order("completed_at", { ascending: false })

    // 조합
    const profileMap = new Map((profiles || []).map(p => [p.id, p]))
    const gamMap = new Map((gamification || []).map((g: GamificationData) => [g.user_id, g]))

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
        // 레슨 ID 순서로 정렬
        return a.lesson_id.localeCompare(b.lesson_id)
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
    setIsLoading(false)
  }

  const sortedStudents = [...students].sort((a, b) => {
    switch (sortBy) {
      case "xp": return b.totalXp - a.totalXp
      case "lessons": return b.completedLessons - a.completedLessons
      case "streak": return b.dailyStreak - a.dailyStreak
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

        await supabase.from("parent_report_links").insert({
          token: linkToken,
          student_id: student.id,
          class_id: classId,
          created_by: user.id,
          student_name: student.displayName,
        })
      }

      const url = `${window.location.origin}/parent?t=${linkToken}`
      await navigator.clipboard.writeText(url)
      setParentLinkCopied(student.id)
      setTimeout(() => setParentLinkCopied(null), 3000)
    } catch (e) {
      console.error("Failed to generate parent link:", e)
    }
    setGeneratingLink(null)
  }

  const displayName = teacherProfile?.display_name || "선생님"

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-2xl mx-auto">
        <Link href="/teacher" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> 반 목록으로
        </Link>

        {classInfo && (
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

            {/* 반 전체 요약 + 위험 알림 + 진도 비교 */}
            <ClassOverview students={students} />

            {/* 정렬 버튼 */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { key: "name" as const, label: "이름순" },
                { key: "xp" as const, label: "XP순" },
                { key: "lessons" as const, label: "완료순" },
                { key: "streak" as const, label: "연속일순" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
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
                {sortedStudents.map((student, idx) => (
                  <Card key={student.id} className="border border-gray-100 overflow-hidden">
                    {/* 학생 요약 행 */}
                    <button
                      onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                      className="w-full p-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors text-left"
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

                      {/* 펼치기 화살표 */}
                      <ChevronDown className={cn(
                        "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
                        expandedStudent === student.id && "rotate-180"
                      )} />
                    </button>

                    {/* 펼친 상세: 탭 UI */}
                    {expandedStudent === student.id && (
                      <div className="px-4 pb-4 border-t border-gray-100">
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
                          <StudentProgress lessonProgress={student.lessonProgress} />
                        )}

                        {/* 퀴즈 리포트 탭 */}
                        {activeTab === "quizzes" && (
                          <StudentQuizReport quizSessions={student.quizSessions} />
                        )}

                        {/* 꾸준함 탭 */}
                        {activeTab === "consistency" && (
                          <StudentConsistency quizSessions={student.quizSessions} />
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
