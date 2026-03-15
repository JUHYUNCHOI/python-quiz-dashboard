"use client"

import { AlertTriangle, TrendingUp, Users, Flame, BookOpen, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLessonName } from "@/lib/curriculum-data"

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
  completedLessons: number
  totalXp: number
  dailyStreak: number
  lastActive: string
  activeToday: boolean
  lessonProgress: LessonProgressRow[]
}

interface RiskAlert {
  type: "inactive" | "stuck" | "low_quiz"
  studentName: string
  detail: string
  severity: "warning" | "danger"
  emoji: string
}

interface Props {
  students: StudentRow[]
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

function analyzeRisks(students: StudentRow[]): RiskAlert[] {
  const alerts: RiskAlert[] = []

  for (const s of students) {
    const days = daysSince(s.lastActive)

    // 7일 이상 미접속 → danger
    if (days >= 7) {
      alerts.push({
        type: "inactive",
        studentName: s.displayName,
        detail: `${days}일째 미접속`,
        severity: "danger",
        emoji: "🚨",
      })
    }
    // 3~6일 미접속 → warning
    else if (days >= 3) {
      alerts.push({
        type: "inactive",
        studentName: s.displayName,
        detail: `${days}일째 미접속`,
        severity: "warning",
        emoji: "⚠️",
      })
    }

    // 진도 정체: 레슨을 시작했지만 완료 수가 0
    if (s.lessonProgress.length > 0 && s.completedLessons === 0) {
      alerts.push({
        type: "stuck",
        studentName: s.displayName,
        detail: "시작했지만 아직 완료 없음",
        severity: "warning",
        emoji: "🔄",
      })
    }

    // 완료 수 대비 너무 낮은 경우 (클래스 평균의 50% 미만)
  }

  // 진도 하위 학생 경고 (평균의 50% 미만인 학생)
  if (students.length >= 3) {
    const avgCompleted = students.reduce((s, st) => s + st.completedLessons, 0) / students.length
    if (avgCompleted > 2) {
      for (const s of students) {
        if (s.completedLessons < avgCompleted * 0.5 && s.completedLessons > 0) {
          // 이미 inactive로 잡힌 학생은 중복 방지
          if (!alerts.some(a => a.studentName === s.displayName && a.type === "inactive")) {
            alerts.push({
              type: "stuck",
              studentName: s.displayName,
              detail: `완료 ${s.completedLessons}개 (평균 ${Math.round(avgCompleted)}개)`,
              severity: "warning",
              emoji: "📉",
            })
          }
        }
      }
    }
  }

  // severity 순 정렬 (danger > warning)
  alerts.sort((a, b) => (a.severity === "danger" ? 0 : 1) - (b.severity === "danger" ? 0 : 1))
  return alerts
}

export function ClassOverview({ students }: Props) {
  if (students.length === 0) return null

  const totalStudents = students.length
  const activeToday = students.filter(s => s.activeToday).length
  const avgLessons = Math.round(students.reduce((s, st) => s + st.completedLessons, 0) / totalStudents)
  const avgXp = Math.round(students.reduce((s, st) => s + st.totalXp, 0) / totalStudents)
  const avgStreak = (students.reduce((s, st) => s + st.dailyStreak, 0) / totalStudents).toFixed(1)

  // 가장 많이 하고 있는 레슨 (최근 활동 기준)
  const recentLessonCount = new Map<string, number>()
  for (const s of students) {
    if (s.lessonProgress.length > 0) {
      const sorted = [...s.lessonProgress].sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""))
      const recentId = sorted[0]?.lesson_id
      if (recentId) {
        recentLessonCount.set(recentId, (recentLessonCount.get(recentId) || 0) + 1)
      }
    }
  }
  const topLesson = [...recentLessonCount.entries()].sort((a, b) => b[1] - a[1])[0]

  // 위험 알림
  const risks = analyzeRisks(students)

  // 진도 분포 (간단한 막대 차트)
  const maxCompleted = Math.max(...students.map(s => s.completedLessons), 1)

  return (
    <div className="space-y-4 mb-6">
      {/* 반 전체 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard
          icon={<Users className="w-4 h-4" />}
          label="오늘 활동"
          value={`${activeToday}/${totalStudents}`}
          color={activeToday > totalStudents * 0.5 ? "green" : activeToday > 0 ? "amber" : "red"}
        />
        <StatCard
          icon={<BookOpen className="w-4 h-4" />}
          label="평균 완료"
          value={`${avgLessons}개`}
          color="purple"
        />
        <StatCard
          icon={<Trophy className="w-4 h-4" />}
          label="평균 XP"
          value={String(avgXp)}
          color="orange"
        />
        <StatCard
          icon={<Flame className="w-4 h-4" />}
          label="평균 연속일"
          value={`${avgStreak}일`}
          color="blue"
        />
      </div>

      {/* 현재 가장 많이 학습 중인 레슨 */}
      {topLesson && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 rounded-xl border border-indigo-200">
          <span className="text-sm">📖</span>
          <span className="text-xs font-bold text-indigo-700">가장 많이 학습 중:</span>
          <span className="text-xs text-indigo-600 flex-1 truncate">
            {getLessonName(topLesson[0])}
          </span>
          <span className="text-[10px] text-indigo-400">{topLesson[1]}명</span>
        </div>
      )}

      {/* 위험 알림 */}
      {risks.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-100/50 border-b border-red-200">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-700">주의 필요 ({risks.length})</span>
          </div>
          <div className="divide-y divide-red-100">
            {risks.slice(0, 5).map((risk, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2">
                <span className="text-sm">{risk.emoji}</span>
                <span className="text-xs font-bold text-gray-700">{risk.studentName}</span>
                <span className={cn(
                  "text-xs",
                  risk.severity === "danger" ? "text-red-600 font-bold" : "text-amber-600"
                )}>
                  {risk.detail}
                </span>
              </div>
            ))}
            {risks.length > 5 && (
              <div className="px-4 py-2 text-xs text-gray-400 text-center">
                +{risks.length - 5}개 더
              </div>
            )}
          </div>
        </div>
      )}

      {/* 진도 비교 막대 차트 */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-bold text-gray-700">학생별 진도 비교</span>
        </div>
        <div className="space-y-1.5">
          {[...students]
            .sort((a, b) => b.completedLessons - a.completedLessons)
            .map(s => {
              const pct = maxCompleted > 0 ? (s.completedLessons / maxCompleted) * 100 : 0
              const days = daysSince(s.lastActive)
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-medium w-16 truncate text-right",
                    days >= 3 ? "text-red-400" : "text-gray-600"
                  )}>
                    {s.displayName}
                  </span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        days >= 7 ? "bg-red-300" :
                        days >= 3 ? "bg-amber-400" :
                        s.completedLessons >= avgLessons ? "bg-green-500" :
                        "bg-blue-400"
                      )}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 w-8 text-right">
                    {s.completedLessons}
                  </span>
                </div>
              )
            })}
        </div>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 justify-end">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> 평균 이상</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> 평균 미만</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> 3일+ 미접속</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-300" /> 7일+ 미접속</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode
  label: string
  value: string
  color: "green" | "amber" | "red" | "purple" | "orange" | "blue"
}) {
  const colors = {
    green: "bg-green-50 text-green-600 border-green-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    red: "bg-red-50 text-red-600 border-red-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
  }
  return (
    <div className={cn("rounded-xl border p-3 text-center", colors[color])}>
      <div className="flex items-center justify-center gap-1 mb-1">
        {icon}
      </div>
      <div className="text-lg font-black">{value}</div>
      <div className="text-[10px] opacity-70">{label}</div>
    </div>
  )
}
