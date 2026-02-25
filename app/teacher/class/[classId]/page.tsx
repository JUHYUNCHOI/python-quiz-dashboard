"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import type { Class, Profile, GamificationData } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Copy, Check, Users, Trophy, Flame, BookOpen } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

interface StudentRow {
  id: string
  displayName: string
  avatarUrl: string | null
  completedLessons: number
  totalXp: number
  dailyStreak: number
  lastActive: string
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

    // 완료 레슨 수
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("user_id")
      .in("user_id", studentIds)
      .eq("completed", true)

    // 조합
    const profileMap = new Map((profiles || []).map(p => [p.id, p]))
    const gamMap = new Map((gamification || []).map((g: GamificationData) => [g.user_id, g]))

    // 유저별 완료 수 계산
    const completedMap = new Map<string, number>()
    for (const p of progress || []) {
      completedMap.set(p.user_id, (completedMap.get(p.user_id) || 0) + 1)
    }

    const rows: StudentRow[] = studentIds.map(sid => {
      const prof = profileMap.get(sid) as Profile | undefined
      const gam = gamMap.get(sid)
      return {
        id: sid,
        displayName: prof?.display_name || "학생",
        avatarUrl: prof?.avatar_url || null,
        completedLessons: completedMap.get(sid) || 0,
        totalXp: gam?.total_xp || 0,
        dailyStreak: gam?.daily_streak || 0,
        lastActive: gam?.last_active_date || "-",
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
                  <Card key={student.id} className="p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                      {/* 순위 / 아바타 */}
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600 flex-shrink-0">
                        {idx + 1}
                      </div>

                      {/* 이름 */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate">{student.displayName}</p>
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
                    </div>
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
