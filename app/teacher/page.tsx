"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"
import { createClass } from "./actions"
import type { Class } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { Plus, Users, Copy, Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

export default function TeacherDashboardPage() {
  const { user, profile, isLoading: authLoading } = useAuth()
  const { t } = useLanguage()
  const [classes, setClasses] = useState<(Class & { memberCount: number })[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    }
    setIsLoading(false)
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

  const displayName = profile?.display_name || t("선생님", "Teacher")

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-2xl mx-auto">
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
        <Link href="/teacher/homework" className="flex items-center gap-3 p-4 rounded-xl border-2 border-indigo-100 bg-indigo-50 hover:bg-indigo-100 transition-colors mb-6">
          <span className="text-2xl">📋</span>
          <div>
            <p className="font-bold text-indigo-800">{t("숙제 제출 현황 보기", "View Homework Submissions")}</p>
            <p className="text-xs text-indigo-500">{t("학생들이 제출한 코드를 확인하세요", "Review code submitted by students")}</p>
          </div>
        </Link>

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
          <Card className="p-8 text-center border-2 border-dashed border-gray-200">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-1">{t("아직 만든 반이 없어요", "No classes created yet")}</p>
            <p className="text-sm text-gray-400">{t("\"새 반 만들기\"를 눌러 시작하세요", "Press \"Create New Class\" to start")}</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {classes.map((cls) => (
              <Link key={cls.id} href={`/teacher/class?id=${cls.id}`}>
                <Card className="p-4 border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{cls.name}</h3>
                        {!cls.is_active && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{t("비활성", "Inactive")}</span>
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
                            <><Copy className="w-3.5 h-3.5" /> {t("코드", "Code")}: {cls.join_code}</>
                          )}
                        </button>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
