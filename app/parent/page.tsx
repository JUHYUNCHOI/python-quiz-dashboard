"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getLessonName } from "@/lib/curriculum-data"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { BookOpen, Trophy, Flame, Clock, TrendingUp, Check, Minus } from "lucide-react"

interface ParentReportData {
  student_name: string
  total_xp: number
  daily_streak: number
  last_active_date: string
  lesson_progress: {
    lesson_id: string
    progress_type: string
    completed: boolean
    score: number
    updated_at: string
  }[]
  recent_quizzes: {
    difficulty: string
    total_questions: number
    correct_answers: number
    max_combo: number
    time_elapsed_ms: number
    end_reason: string
    xp_earned: number
    completed_at: string
  }[]
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "-"
  try {
    const d = new Date(dateStr)
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
  } catch { return dateStr }
}

function formatShortDate(dateStr: string): string {
  if (!dateStr) return ""
  try {
    const d = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return "오늘"
    if (diffDays === 1) return "어제"
    if (diffDays < 7) return `${diffDays}일 전`
    return `${d.getMonth() + 1}/${d.getDate()}`
  } catch { return "" }
}

function daysSince(dateStr: string): number {
  if (!dateStr) return 999
  try {
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  } catch { return 999 }
}

export default function ParentReportPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl animate-bounce">🦒</div>
          <p className="text-gray-500">리포트를 불러오는 중...</p>
        </div>
      </div>
    }>
      <ParentReportPage />
    </Suspense>
  )
}

function ParentReportPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("t") || ""
  const { lang } = useLanguage()
  const [data, setData] = useState<ParentReportData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setError("유효하지 않은 링크입니다")
      setLoading(false)
      return
    }

    async function load() {
      try {
        const supabase = createClient()
        const { data: result, error: rpcError } = await supabase.rpc("get_parent_report", {
          p_token: token,
        })

        if (rpcError) {
          setError("리포트를 불러올 수 없습니다")
          setLoading(false)
          return
        }

        if (result?.error === "invalid_token") {
          setError("유효하지 않은 링크입니다")
          setLoading(false)
          return
        }

        setData(result as ParentReportData)
      } catch {
        setError("오류가 발생했습니다")
      }
      setLoading(false)
    }
    load()
  }, [token])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl animate-bounce">🦒</div>
          <p className="text-gray-500">리포트를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl">🔒</div>
          <p className="text-gray-600 font-bold">{error || "리포트를 찾을 수 없습니다"}</p>
          <p className="text-sm text-gray-400">선생님에게 새 링크를 요청해주세요</p>
        </div>
      </div>
    )
  }

  // 분석
  const progress = data.lesson_progress || []
  const completedLessons = progress.filter(p => p.completed)
  const lastActiveDays = daysSince(data.last_active_date)

  // 이번 주 활동
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const weekStr = oneWeekAgo.toISOString()
  const thisWeekProgress = progress.filter(p => p.updated_at > weekStr)
  const thisWeekCompleted = thisWeekProgress.filter(p => p.completed)

  // 최근 퀴즈 평균 정답률
  const quizzes = data.recent_quizzes || []
  const avgAccuracy = quizzes.length > 0
    ? Math.round(quizzes.reduce((s, q) => s + (q.correct_answers / q.total_questions) * 100, 0) / quizzes.length)
    : null

  // 최근 완료 레슨 5개
  const recentCompleted = [...completedLessons]
    .sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
    .slice(0, 5)

  // 잘한 점 / 보충 필요한 점 자동 생성
  const goodPoints: string[] = []
  const improvementPoints: string[] = []

  if (data.daily_streak >= 3) goodPoints.push(`${data.daily_streak}일 연속 학습 중이에요! 습관이 잘 잡히고 있어요`)
  if (thisWeekCompleted.length > 0) goodPoints.push(`이번 주 ${thisWeekCompleted.length}개 레슨을 완료했어요`)
  if (avgAccuracy !== null && avgAccuracy >= 80) goodPoints.push(`퀴즈 평균 정답률 ${avgAccuracy}%로 높은 이해도를 보여요`)
  if (completedLessons.length >= 10) goodPoints.push(`총 ${completedLessons.length}개 레슨을 완료했어요!`)
  if (goodPoints.length === 0 && completedLessons.length > 0) goodPoints.push("꾸준히 학습을 진행하고 있어요")

  if (lastActiveDays >= 3 && lastActiveDays < 999) improvementPoints.push(`${lastActiveDays}일째 접속하지 않았어요. 꾸준한 학습이 중요해요`)
  if (avgAccuracy !== null && avgAccuracy < 50) improvementPoints.push(`퀴즈 정답률이 ${avgAccuracy}%예요. 복습이 필요해 보여요`)
  if (data.daily_streak === 0 && completedLessons.length > 0) improvementPoints.push("학습 연속 기록이 끊어졌어요. 매일 조금씩이라도 학습하면 좋아요")
  if (completedLessons.length === 0 && progress.length > 0) improvementPoints.push("아직 완료한 레슨이 없어요. 끝까지 마무리하는 습관이 중요해요")

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50/30">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🦒</span>
            <div>
              <p className="text-sm opacity-80">코드린 학습 리포트</p>
              <h1 className="text-2xl font-black">{data.student_name}</h1>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-2">
            {formatDate(new Date().toISOString())} 기준
          </p>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 요약 통계 */}
        <div className="grid grid-cols-3 gap-3">
          <StatBox
            icon={<BookOpen className="w-5 h-5" />}
            value={String(completedLessons.length)}
            label="완료 레슨"
            color="purple"
          />
          <StatBox
            icon={<Trophy className="w-5 h-5" />}
            value={String(data.total_xp)}
            label="총 XP"
            color="orange"
          />
          <StatBox
            icon={<Flame className="w-5 h-5" />}
            value={`${data.daily_streak}일`}
            label="연속 학습"
            color={data.daily_streak >= 3 ? "green" : "gray"}
          />
        </div>

        {/* 마지막 활동 */}
        <div className={cn(
          "rounded-2xl p-4 border",
          lastActiveDays <= 1 ? "bg-green-50 border-green-200" :
          lastActiveDays <= 3 ? "bg-blue-50 border-blue-200" :
          lastActiveDays <= 7 ? "bg-amber-50 border-amber-200" :
          "bg-red-50 border-red-200"
        )}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-bold text-gray-700">마지막 활동</span>
            <span className={cn(
              "text-sm font-bold ml-auto",
              lastActiveDays <= 1 ? "text-green-600" :
              lastActiveDays <= 3 ? "text-blue-600" :
              lastActiveDays <= 7 ? "text-amber-600" :
              "text-red-600"
            )}>
              {lastActiveDays === 0 ? "오늘" :
               lastActiveDays === 1 ? "어제" :
               lastActiveDays < 999 ? `${lastActiveDays}일 전` : "기록 없음"}
            </span>
          </div>
        </div>

        {/* ✅ 잘한 점 */}
        {goodPoints.length > 0 && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 space-y-2">
            <h2 className="text-sm font-black text-green-700 flex items-center gap-2">
              <span className="text-lg">👏</span> 잘하고 있는 점
            </h2>
            {goodPoints.map((point, i) => (
              <p key={i} className="text-sm text-green-700 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                {point}
              </p>
            ))}
          </div>
        )}

        {/* ⚠️ 보충 필요한 점 */}
        {improvementPoints.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-2">
            <h2 className="text-sm font-black text-amber-700 flex items-center gap-2">
              <span className="text-lg">💡</span> 이런 점을 도와주세요
            </h2>
            {improvementPoints.map((point, i) => (
              <p key={i} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">•</span>
                {point}
              </p>
            ))}
          </div>
        )}

        {/* 이번 주 활동 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
          <h2 className="text-sm font-black text-gray-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> 이번 주 학습
          </h2>
          {thisWeekProgress.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-2">이번 주 활동이 없어요</p>
          ) : (
            <div className="space-y-1">
              {thisWeekProgress
                .sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
                .slice(0, 8)
                .map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1">
                  <span className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    p.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                  )}>
                    {p.completed ? <Check className="w-3 h-3" /> : <Minus className="w-2.5 h-2.5" />}
                  </span>
                  <span className="flex-1 text-gray-700 font-medium truncate">
                    {getLessonName(p.lesson_id, lang)}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatShortDate(p.updated_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 최근 퀴즈 결과 */}
        {quizzes.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
            <h2 className="text-sm font-black text-gray-700 flex items-center gap-2">
              📝 최근 퀴즈
              {avgAccuracy !== null && (
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full ml-auto",
                  avgAccuracy >= 80 ? "bg-green-100 text-green-700" :
                  avgAccuracy >= 50 ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                )}>
                  평균 {avgAccuracy}%
                </span>
              )}
            </h2>
            <div className="space-y-2">
              {quizzes.map((q, i) => {
                const acc = Math.round((q.correct_answers / q.total_questions) * 100)
                return (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-xs text-gray-400 w-16 flex-shrink-0">
                      {formatShortDate(q.completed_at)}
                    </span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          acc >= 80 ? "bg-green-500" : acc >= 50 ? "bg-amber-500" : "bg-red-400"
                        )}
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-xs font-bold w-14 text-right",
                      acc >= 80 ? "text-green-600" : acc >= 50 ? "text-amber-600" : "text-red-600"
                    )}>
                      {q.correct_answers}/{q.total_questions}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 최근 완료 레슨 */}
        {recentCompleted.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
            <h2 className="text-sm font-black text-gray-700">📚 최근 완료한 레슨</h2>
            <div className="space-y-1">
              {recentCompleted.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="flex-1 text-gray-700 font-medium truncate">
                    {getLessonName(p.lesson_id, lang)}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatShortDate(p.updated_at)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 푸터 */}
        <div className="text-center py-6">
          <p className="text-xs text-gray-300">코드린 (Coderin) 학습 리포트</p>
          <p className="text-xs text-gray-300 mt-1">이 페이지는 선생님이 공유한 링크입니다</p>
        </div>
      </main>
    </div>
  )
}

function StatBox({ icon, value, label, color }: {
  icon: React.ReactNode
  value: string
  label: string
  color: "purple" | "orange" | "green" | "gray"
}) {
  const colors = {
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    green: "bg-green-50 text-green-600 border-green-200",
    gray: "bg-gray-50 text-gray-600 border-gray-200",
  }
  return (
    <div className={cn("rounded-xl border p-3 text-center", colors[color])}>
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <div className="text-xl font-black">{value}</div>
      <div className="text-[10px] opacity-70">{label}</div>
    </div>
  )
}
