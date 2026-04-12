"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"
import { createClass } from "./actions"
import type { Class } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { Plus, Users, Copy, Check, ChevronRight, AlertTriangle, Flag } from "lucide-react"
import { FlaggedQuestions } from "@/components/teacher/flagged-questions"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { getLessonName } from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"

interface StudentRisk {
  studentId: string
  studentName: string
  classId: string
  className: string
  detail: string
  emoji: string
  action: string
  severity: "danger" | "warning"
}

function daysSinceStr(dateStr: string): number {
  if (!dateStr || dateStr === "-") return 999
  try { return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000) }
  catch { return 999 }
}

export default function TeacherDashboardPage() {
  const { user, profile, isLoading: authLoading } = useAuth()
  const { t } = useLanguage()
  const [classes, setClasses] = useState<(Class & { memberCount: number })[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [risks, setRisks] = useState<StudentRisk[]>([])
  const [hwCount, setHwCount] = useState<number | null>(null)
  const [flagCount, setFlagCount] = useState<number | null>(null)

  const loadClasses = async () => {
    const supabase = createClient()
    const { data: classData } = await supabase
      .from("classes")
      .select("*")
      .eq("teacher_id", user!.id)
      .order("created_at", { ascending: false })

    if (classData) {
      // 각 반의 학생 수 조회
      const classesWithCount = await Promise.all(
        classData.map(async (cls) => {
          const { count } = await supabase
            .from("class_members")
            .select("*", { count: "exact", head: true })
            .eq("class_id", cls.id)
          return { ...cls, memberCount: count ?? 0 }
        })
      )
      setClasses(classesWithCount)
      // 위험 학생 분석
      await loadRisks(supabase, classesWithCount)
    }
    // 숙제 확인 필요 건수 (미채점 or 오답만)
    const { count: hwc } = await supabase
      .from("homework_submissions")
      .select("*", { count: "exact", head: true })
      .or("teacher_grade.is.null,teacher_grade.eq.fail")
    setHwCount(hwc ?? 0)

    // 미검토 신고 문제 건수
    const { count: fc } = await supabase
      .from("flagged_questions")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")
    setFlagCount(fc ?? 0)

    setIsLoading(false)
  }

  const loadRisks = async (supabase: ReturnType<typeof createClient>, classList: (Class & { memberCount: number })[]) => {
    const allClassIds = classList.map(c => c.id)
    if (!allClassIds.length) return

    const { data: allMembers } = await supabase
      .from("class_members")
      .select("student_id, class_id")
      .in("class_id", allClassIds)

    if (!allMembers?.length) return
    const studentIds = [...new Set(allMembers.map(m => m.student_id))]

    const [{ data: profiles }, { data: gamification }, { data: quizSessions }, { data: lessonProgress }] = await Promise.all([
      supabase.from("profiles").select("id, display_name").in("id", studentIds),
      supabase.from("gamification_data").select("user_id, last_active_date").in("user_id", studentIds),
      supabase.from("quiz_sessions")
        .select("user_id, correct_answers, total_questions, completed_at")
        .in("user_id", studentIds)
        .order("completed_at", { ascending: false })
        .limit(studentIds.length * 6),   // 위험 감지에는 최근 5개면 충분
      supabase.from("lesson_progress")
        .select("user_id, lesson_id, progress_type, score, updated_at")
        .in("user_id", studentIds)
        .eq("completed", true)
        .limit(studentIds.length * 120),  // learn + review 모두 포함
    ])

    const profileMap = new Map((profiles || []).map(p => [p.id, p.display_name || "학생"]))
    const gamMap = new Map((gamification || []).map(g => [g.user_id, g.last_active_date || "-"]))
    const classMap = new Map(classList.map(c => [c.id, c.name]))

    // 학생별 반 매핑 (중복 멤버십 시 첫 번째 반)
    const studentClassMap = new Map<string, string>()
    for (const m of allMembers) {
      if (!studentClassMap.has(m.student_id)) studentClassMap.set(m.student_id, m.class_id)
    }

    // 학생별 퀴즈 최근 completed_at
    const quizLatestMap = new Map<string, string>()
    const quizMap = new Map<string, { correct_answers: number; total_questions: number }[]>()
    for (const qs of quizSessions || []) {
      if (!quizMap.has(qs.user_id)) quizMap.set(qs.user_id, [])
      const arr = quizMap.get(qs.user_id)!
      if (arr.length < 5) arr.push(qs)
      // 가장 최근 퀴즈 날짜 추적
      if (qs.completed_at) {
        const prev = quizLatestMap.get(qs.user_id)
        if (!prev || qs.completed_at > prev) quizLatestMap.set(qs.user_id, qs.completed_at)
      }
    }

    // 학생별 최근 활동 updated_at (learn + review 모두)
    // progressMap은 취약점 감지용으로 review만 사용
    const progressLatestMap = new Map<string, string>()
    const progressMap = new Map<string, { lesson_id: string; score: number }[]>()
    for (const p of lessonProgress || []) {
      // lastActive: learn/review 모두 반영
      if (p.updated_at) {
        const prev = progressLatestMap.get(p.user_id)
        if (!prev || p.updated_at > prev) progressLatestMap.set(p.user_id, p.updated_at)
      }
      // 취약점 감지: review만
      if (p.progress_type === "review") {
        if (!progressMap.has(p.user_id)) progressMap.set(p.user_id, [])
        progressMap.get(p.user_id)!.push({ lesson_id: p.lesson_id, score: p.score })
      }
    }

    const result: StudentRisk[] = []
    for (const sid of studentIds) {
      const name = profileMap.get(sid) || "학생"
      const classId = studentClassMap.get(sid) || ""
      const className = classMap.get(classId) || ""
      // gamification, 퀴즈, 복습 중 가장 최근 활동을 lastActive로 사용
      const candidates = [
        gamMap.get(sid) || "-",
        quizLatestMap.get(sid) || "-",
        progressLatestMap.get(sid) || "-",
      ].filter(d => d !== "-")
      const lastActive = candidates.length > 0
        ? candidates.reduce((a, b) => a > b ? a : b)
        : "-"
      const days = daysSinceStr(lastActive)
      const sessions = quizMap.get(sid) || []
      const avgAcc = sessions.length >= 2
        ? sessions.reduce((s, q) => s + (q.correct_answers / q.total_questions) * 100, 0) / sessions.length
        : null

      if (days >= 7) {
        result.push({ studentId: sid, studentName: name, classId, className, detail: `${days}일째 접속 없음`, emoji: "🚨", action: "연락 필요", severity: "danger" })
      } else if (avgAcc !== null && avgAcc < 55 && sessions.length >= 3 && days <= 3) {
        const reviews = (progressMap.get(sid) || []).sort((a, b) => a.score - b.score).slice(0, 2)
        const weakStr = reviews.length > 0
          ? reviews.map(r => `${getLessonName(r.lesson_id, "ko")} ${r.score}%`).join(" · ")
          : `퀴즈 ${Math.round(avgAcc)}%`
        result.push({ studentId: sid, studentName: name, classId, className, detail: weakStr, emoji: "📉", action: "1:1 설명 권장", severity: "warning" })
      }
    }

    result.sort((a, b) => (a.severity === "danger" ? 0 : 1) - (b.severity === "danger" ? 0 : 1))
    setRisks(result)
  }

  useEffect(() => {
    if (!user) return
    loadClasses()
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  // 인증 가드: 로그인 + teacher 역할 필요
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-[60px] animate-bounce">🦒</div>
        </div>
        <BottomNav />
      </div>
    )
  }
  if (!user || profile?.role !== "teacher") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
        <Header />
        <main className="max-w-md mx-auto px-4 pt-10 text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h2 className="text-xl font-bold text-gray-800">{t("선생님 전용 페이지", "Teacher Only")}</h2>
          <p className="text-gray-500">{t("선생님 계정으로 로그인이 필요합니다", "Teacher login required")}</p>
          <Link href="/login" className="inline-block px-6 py-2 rounded-xl bg-orange-500 text-white font-bold">{t("로그인", "Login")}</Link>
        </main>
        <BottomNav />
      </div>
    )
  }

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClassName.trim()) return

    const result = await createClass(newClassName.trim())
    if (result.success) {
      setNewClassName("")
      setIsCreating(false)
      loadClasses()
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const regenerateCode = async (cls: (typeof classes)[number], e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!window.confirm(t(
      `'${cls.name}' 반의 참가 코드를 재발급할까요?\n기존에 가입한 학생들은 영향 없어요.`,
      `Regenerate join code for '${cls.name}'?\nStudents already in the class won't be affected.`
    ))) return
    const supabase = createClient()
    const newCode = Math.random().toString(36).slice(2, 8).toUpperCase()
    const { error } = await supabase.from("classes").update({ join_code: newCode }).eq("id", cls.id)
    if (!error) loadClasses()
  }

  const shareCode = async (cls: (typeof classes)[number]) => {
    const message = t(
      `[코드린] ${cls.name} 반에 초대합니다!\n참여 코드: ${cls.join_code}\n\ncoderin.app에서 로그인 후 '반 참가' 메뉴에 코드를 입력하세요.`,
      `[Coderin] You're invited to ${cls.name}!\nJoin code: ${cls.join_code}\n\nLogin at coderin.app and enter the code to join.`
    )
    if (navigator.share) {
      try { await navigator.share({ title: t("코드린 반 참여", "Join Coderin Class"), text: message }) } catch {}
    } else {
      navigator.clipboard.writeText(message)
      setCopiedCode(cls.join_code + "-share")
      setTimeout(() => setCopiedCode(null), 2000)
    }
  }

  const displayName = profile?.display_name || t("선생님", "Teacher")

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">{t("내 반 관리", "Manage My Classes")}</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
          >
            <Plus className="w-4 h-4" /> {t("새 반 만들기", "Create New Class")}
          </button>
        </div>

        {/* 숙제 검토 링크 */}
        <Link href="/teacher/homework" className="flex items-center gap-3 p-4 rounded-xl border-2 border-indigo-100 bg-indigo-50 hover:bg-indigo-100 transition-colors mb-2">
          <span className="text-2xl">📋</span>
          <div className="flex-1">
            <p className="font-bold text-indigo-800">{t("숙제 제출 현황 보기", "View Homework Submissions")}</p>
            <p className="text-xs text-indigo-500">{t("학생들이 제출한 코드를 확인하세요", "Review code submitted by students")}</p>
          </div>
          {hwCount !== null && hwCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
              확인 필요 {hwCount}건
            </span>
          )}
        </Link>

        {/* 신고된 문제 링크 */}
        <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-orange-100 bg-orange-50 mb-4">
          <Flag className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-orange-800">{t("신고된 문제 검토", "Review Flagged Questions")}</p>
            <p className="text-xs text-orange-500">{t("학생이 신고한 부적합 문제를 확인하세요", "Check questions flagged by students")}</p>
          </div>
          {flagCount !== null && flagCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
              {flagCount}{t("건", "")}
            </span>
          )}
        </div>

        {/* 전체 반 신경써야 할 학생 */}
        {risks.length > 0 && (
          <div className={cn(
            "rounded-2xl border p-4 space-y-2 mb-6",
            risks.some(r => r.severity === "danger") ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
          )}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className={cn("w-4 h-4", risks.some(r => r.severity === "danger") ? "text-red-500" : "text-amber-500")} />
              <h3 className={cn("text-sm font-black", risks.some(r => r.severity === "danger") ? "text-red-800" : "text-amber-800")}>
                {t(`지금 신경써야 할 학생 ${risks.length}명`, `${risks.length} students need attention`)}
              </h3>
            </div>
            {risks.map((risk, i) => (
              <Link
                key={i}
                href={`/teacher/class?id=${risk.classId}&student=${risk.studentId}`}
                className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors group"
              >
                <span className="text-base flex-shrink-0">{risk.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {risk.studentName}
                    <span className="ml-1.5 text-[10px] text-gray-400 font-normal">{risk.className}</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">{risk.detail}</p>
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0",
                  risk.severity === "danger" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                )}>
                  {risk.action}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* 새 반 만들기 폼 */}
        {isCreating && (
          <Card className="p-4 mb-4 border-2 border-orange-200">
            <form onSubmit={handleCreateClass} className="flex gap-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder={t("반 이름 (예: 1학년 3반)", "Class name (e.g., Grade 1 Class 3)")}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600"
              >
                {t("만들기", "Create")}
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200"
              >
                {t("취소", "Cancel")}
              </button>
            </form>
          </Card>
        )}

        {/* 반 목록 */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">{t("불러오는 중...", "Loading...")}</div>
        ) : classes.length === 0 ? (
          <div className="space-y-4">
            {/* 온보딩 안내 */}
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👋</span>
                <div>
                  <p className="font-black text-gray-900">{t("코드린 선생님, 환영합니다!", "Welcome to Coderin, Teacher!")}</p>
                  <p className="text-xs text-gray-500">{t("아래 3단계로 수업을 시작해보세요", "Follow these 3 steps to get started")}</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    color: "bg-orange-500",
                    title: t("반 만들기", "Create a Class"),
                    desc: t("위의 '새 반 만들기' 버튼을 눌러 반을 생성하면 참여 코드가 생성돼요.", "Tap '+ New Class' above to create a class and get a join code."),
                  },
                  {
                    step: "2",
                    color: "bg-blue-500",
                    title: t("학생 초대", "Invite Students"),
                    desc: t("참여 코드를 학생에게 알려주세요. 학생이 코드린에 로그인 후 코드를 입력하면 반에 합류해요.", "Share the join code with students. They enter it after logging in to join your class."),
                  },
                  {
                    step: "3",
                    color: "bg-green-500",
                    title: t("진도 & 과제 확인", "Track Progress & Homework"),
                    desc: t("반 관리 페이지에서 학생별 레슨 진도, 과제 제출 현황, 학부모 리포트 링크를 확인할 수 있어요.", "In the class page, view each student's lesson progress, homework submissions, and generate parent report links."),
                  },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3 bg-white rounded-xl p-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 ${item.color}`}>
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classes.map((cls) => {
              const dangerCount = risks.filter(r => r.classId === cls.id && r.severity === "danger").length
              const warnCount = risks.filter(r => r.classId === cls.id && r.severity === "warning").length
              return (
              <Link key={cls.id} href={`/teacher/class?id=${cls.id}`}>
                <Card className="p-4 border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{cls.name}</h3>
                        {!cls.is_active && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{t("비활성", "Inactive")}</span>
                        )}
                        {dangerCount > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">🚨 {dangerCount}명</span>
                        )}
                        {warnCount > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">📉 {warnCount}명</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> {t(`${cls.memberCount}명`, `${cls.memberCount} members`)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            copyCode(cls.join_code)
                          }}
                          className="flex items-center gap-1 hover:text-orange-600 transition-colors"
                        >
                          {copiedCode === cls.join_code ? (
                            <><Check className="w-3.5 h-3.5 text-green-500" /> {t("복사됨", "Copied")}</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> {cls.join_code}</>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            shareCode(cls)
                          }}
                          className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700 transition-colors font-semibold"
                        >
                          {copiedCode === cls.join_code + "-share" ? (
                            <><Check className="w-3.5 h-3.5 text-green-500" /> {t("복사됨", "Copied")}</>
                          ) : (
                            t("공유 →", "Share →")
                          )}
                        </button>
                        <button
                          onClick={(e) => regenerateCode(cls, e)}
                          className="flex items-center gap-1 text-gray-300 hover:text-gray-500 transition-colors text-xs"
                          title={t("코드 재발급", "Regenerate code")}
                        >
                          🔄
                        </button>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </Card>
              </Link>
              )
            })}
          </div>
        )}
        {/* 신고된 문제 목록 */}
        <div className="mt-6 border-t pt-6">
          <FlaggedQuestions />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
