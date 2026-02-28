"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import type { Class, Profile, GamificationData } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Check, Users, Trophy, Flame, BookOpen, ChevronDown, Clock } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"

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
}

// 레슨 ID → 표시 이름 매핑
const LESSON_NAMES: Record<string, string> = {
  "p1": "Python 1: 출력",
  "p2": "Python 2: 변수",
  "p3": "Python 3: 입력",
  "p4": "Python 4: 조건문",
  "p5": "Python 5: 반복문",
  "p6": "Python 6: 리스트",
  "p7": "Python 7: 함수",
  "p8": "Python 8: 딕셔너리",
  "cpp-1": "C++ 1: 출력",
  "cpp-2": "C++ 2: 변수",
  "cpp-3": "C++ 3: 입력",
  "cpp-4": "C++ 4: 조건문",
  "cpp-5": "C++ 5: 반복문",
  "cpp-6": "C++ 6: 배열",
  "cpp-7": "C++ 7: 문자열",
  "cpp-8": "C++ 8: 함수",
}

function getLessonName(lessonId: string): string {
  return LESSON_NAMES[lessonId] || lessonId
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

export default function ClassDetailPage() {
  const params = useParams()
  const classId = params.classId as string
  const { user, profile: teacherProfile } = useAuth()
  const [classInfo, setClassInfo] = useState<Class | null>(null)
  const [students, setStudents] = useState<StudentRow[]>([])
  const [copiedCode, setCopiedCode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"name" | "xp" | "lessons" | "streak">("name")
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !classId) return
    loadClassData()
  }, [user, classId])

  const loadClassData = async () => {
    const supabase = createClient()

    // 반 정보
    const { data: cls } = await supabase
      .from("classes")
      .select("*")
      .eq("id", classId)
      .single()

    if (cls) setClassInfo(cls)

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

    // 조합
    const profileMap = new Map((profiles || []).map(p => [p.id, p]))
    const gamMap = new Map((gamification || []).map((g: GamificationData) => [g.user_id, g]))

    // 유저별 진도 계산
    const progressMap = new Map<string, LessonProgressRow[]>()
    const completedMap = new Map<string, number>()
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

      // 완료 수
      if (p.completed) {
        completedMap.set(p.user_id, (completedMap.get(p.user_id) || 0) + 1)
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

      return {
        id: sid,
        displayName: prof?.display_name || "학생",
        avatarUrl: prof?.avatar_url || null,
        completedLessons: completedMap.get(sid) || 0,
        totalXp: gam?.total_xp || 0,
        dailyStreak: gam?.daily_streak || 0,
        lastActive: gam?.last_active_date || "-",
        activeToday: activeTodaySet.has(sid),
        lessonProgress,
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

                      {/* 이름 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-gray-800 truncate">{student.displayName}</p>
                          {student.activeToday && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">오늘 활동</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">마지막 활동: {student.lastActive}</p>
                      </div>

                      {/* 통계 */}
                      <div className="flex items-center gap-3 text-sm flex-shrink-0">
                        <span className="flex items-center gap-1 text-purple-600" title="완료 레슨">
                          <BookOpen className="w-3.5 h-3.5" /> {student.completedLessons}
                        </span>
                        <span className="flex items-center gap-1 text-orange-600" title="총 XP">
                          <Trophy className="w-3.5 h-3.5" /> {student.totalXp}
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

                    {/* 펼친 상세 진도 */}
                    {expandedStudent === student.id && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        {student.lessonProgress.length === 0 ? (
                          <p className="text-sm text-gray-400 py-3 text-center">아직 학습 기록이 없어요</p>
                        ) : (
                          <div className="mt-3 space-y-1.5">
                            {student.lessonProgress.map((lp, i) => (
                              <div key={`${lp.lesson_id}-${lp.progress_type}-${i}`}
                                className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg bg-gray-50"
                              >
                                {/* 상태 아이콘 */}
                                {lp.completed ? (
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                )}

                                {/* 레슨 이름 + 타입 */}
                                <span className="flex-1 text-gray-700 truncate">
                                  {getLessonName(lp.lesson_id)}
                                  <span className="text-xs text-gray-400 ml-1">
                                    ({lp.progress_type === "learn" ? "실습" : "복습"})
                                  </span>
                                </span>

                                {/* 점수 */}
                                <span className={cn(
                                  "text-xs font-bold px-2 py-0.5 rounded-full",
                                  lp.completed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-amber-100 text-amber-700"
                                )}>
                                  {lp.score}점
                                </span>

                                {/* 날짜 */}
                                <span className="text-xs text-gray-400 w-10 text-right">
                                  {formatDate(lp.updated_at)}
                                </span>
                              </div>
                            ))}
                          </div>
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
