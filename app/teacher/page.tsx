"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"
import { createClass } from "./actions"
import type { Class } from "@/lib/supabase/types"
import { Card } from "@/components/ui/card"
import { Plus, Users, Copy, Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

export default function TeacherDashboardPage() {
  const { user, profile } = useAuth()
  const [classes, setClasses] = useState<(Class & { memberCount: number })[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    loadClasses()
  }, [user])

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

  const displayName = profile?.display_name || "선생님"

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <Header />

      <main className="w-full px-4 sm:px-6 pb-24 pt-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">내 반 관리</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all"
          >
            <Plus className="w-4 h-4" /> 새 반 만들기
          </button>
        </div>

        {/* 새 반 만들기 폼 */}
        {isCreating && (
          <Card className="p-4 mb-4 border-2 border-orange-200">
            <form onSubmit={handleCreateClass} className="flex gap-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="반 이름 (예: 1학년 3반)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600"
              >
                만들기
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200"
              >
                취소
              </button>
            </form>
          </Card>
        )}

        {/* 반 목록 */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">불러오는 중...</div>
        ) : classes.length === 0 ? (
          <Card className="p-8 text-center border-2 border-dashed border-gray-200">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-1">아직 만든 반이 없어요</p>
            <p className="text-sm text-gray-400">&quot;새 반 만들기&quot;를 눌러 시작하세요</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {classes.map((cls) => (
              <Link key={cls.id} href={`/teacher/class/${cls.id}`}>
                <Card className="p-4 border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{cls.name}</h3>
                        {!cls.is_active && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">비활성</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> {cls.memberCount}명
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
                            <><Check className="w-3.5 h-3.5 text-green-500" /> 복사됨</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> 코드: {cls.join_code}</>
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
