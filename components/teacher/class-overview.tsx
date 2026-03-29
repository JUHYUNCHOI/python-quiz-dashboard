"use client"

import { useState } from "react"
import { AlertTriangle, TrendingUp, Users, Flame, BookOpen, Target, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { getLessonName } from "@/lib/curriculum-data"
import type { QuizSession } from "@/lib/supabase/types"

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
  quizSessions: QuizSession[]
}

interface Props {
  students: StudentRow[]
  onStudentClick?: (studentId: string) => void
}

function daysSince(dateStr: string): number {
  if (!dateStr || dateStr === "-") return 999
  try {
    return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  } catch { return 999 }
}

// 학생 패턴 분류 — 노력도 vs 이해도 매트릭스
type StudentPattern = "star" | "hardworker" | "coaster" | "atrisk" | "new"

function classifyPattern(s: StudentRow): StudentPattern {
  if (s.completedLessons === 0 && s.lessonProgress.length === 0) return "new"

  const recentQuizzes = s.quizSessions.slice(0, 10)
  const avgAccuracy = recentQuizzes.length > 0
    ? recentQuizzes.reduce((sum, q) => sum + (q.correct_answers / q.total_questions) * 100, 0) / recentQuizzes.length
    : null

  const lastActiveDays = daysSince(s.lastActive)
  const isRegular = lastActiveDays <= 2 && (s.quizSessions.length >= 3 || s.completedLessons >= 3)
  const highAccuracy = avgAccuracy !== null && avgAccuracy >= 72
  const lowAccuracy  = avgAccuracy !== null && avgAccuracy < 55

  if (isRegular && highAccuracy)  return "star"        // 잘 따라가는 학생
  if (isRegular && lowAccuracy)   return "hardworker"  // 열심히 하는데 이해 부족
  if (!isRegular && highAccuracy) return "coaster"     // 실력은 있는데 게으름
  if (!isRegular && lowAccuracy)  return "atrisk"      // 개입 필요
  return "star" // default: 데이터 부족 시 문제 없는 걸로 간주
}

const PATTERN_META: Record<StudentPattern, { emoji: string; label: string; color: string; bg: string; advice: string }> = {
  star:       { emoji: "✅", label: "잘 따라가는 중",    color: "text-green-700",  bg: "bg-green-50",  advice: "꾸준히 접속 + 퀴즈 정답률 높음" },
  hardworker: { emoji: "⚡", label: "개념 보충 필요",    color: "text-amber-700",  bg: "bg-amber-50",  advice: "열심히 하는데 퀴즈 정답률 낮음 — 개념 설명 필요" },
  coaster:    { emoji: "💤", label: "접속이 줄어드는 중", color: "text-blue-700",  bg: "bg-blue-50",   advice: "퀴즈는 잘 맞는데 최근 접속 없음 — 독려 필요" },
  atrisk:     { emoji: "🚨", label: "집중 관리 필요",    color: "text-red-700",    bg: "bg-red-50",    advice: "접속도 줄고 퀴즈 정답률도 낮음 — 적극 개입 필요" },
  new:        { emoji: "🌱", label: "아직 시작 전",      color: "text-gray-500",   bg: "bg-gray-50",   advice: "시작을 독려해 주세요" },
}

// 위험 알림 생성
interface RiskAlert {
  studentId: string
  studentName: string
  detail: string
  severity: "danger" | "warning"
  emoji: string
  action: string  // 선생님이 할 수 있는 것
  focusLesson?: string // 구체적으로 문제가 되는 레슨/영역
}

function buildRiskAlerts(students: StudentRow[]): RiskAlert[] {
  const alerts: RiskAlert[] = []
  const avgCompleted = students.length > 0
    ? students.reduce((s, st) => s + st.completedLessons, 0) / students.length
    : 0

  for (const s of students) {
    const days = daysSince(s.lastActive)
    const recentQuizzes = s.quizSessions.slice(0, 5)
    const avgAcc = recentQuizzes.length >= 2
      ? recentQuizzes.reduce((sum, q) => sum + (q.correct_answers / q.total_questions) * 100, 0) / recentQuizzes.length
      : null

    // 가장 낮은 복습 점수 레슨 찾기
    const reviewRows = s.lessonProgress.filter(r => r.progress_type === "review" && r.completed && r.score > 0)
    const worstReview = reviewRows.length > 0
      ? reviewRows.reduce((min, r) => r.score < min.score ? r : min)
      : null

    // 장기 미접속
    if (days >= 7) {
      alerts.push({ studentId: s.id, studentName: s.displayName, detail: `${days}일째 접속 없음`, severity: "danger", emoji: "🚨", action: "연락 필요" })
    } else if (days >= 3 && days < 7) {
      alerts.push({ studentId: s.id, studentName: s.displayName, detail: `${days}일째 미접속`, severity: "warning", emoji: "⚠️", action: "확인 필요" })
    }

    // 낮은 정답률 (5문제 이상 풀었는데 55% 미만)
    if (avgAcc !== null && avgAcc < 55 && recentQuizzes.length >= 3 && days <= 3) {
      alerts.push({
        studentId: s.id,
        studentName: s.displayName,
        detail: `퀴즈 평균 ${Math.round(avgAcc)}% — 개념 이해 부족`,
        severity: "warning",
        emoji: "📉",
        action: "1:1 설명 권장",
        focusLesson: worstReview ? `복습 최저: 레슨 ${worstReview.lesson_id} (${worstReview.score}%)` : undefined,
      })
    }

    // 진도 크게 뒤처짐
    if (avgCompleted > 4 && s.completedLessons < avgCompleted * 0.4 && s.completedLessons >= 0) {
      if (!alerts.some(a => a.studentId === s.id && a.emoji === "🚨")) {
        alerts.push({ studentId: s.id, studentName: s.displayName, detail: `완료 ${s.completedLessons}개 (반 평균 ${Math.round(avgCompleted)}개)`, severity: "warning", emoji: "📊", action: "진도 확인" })
      }
    }
  }

  // danger 먼저, 중복 학생 제거 (같은 학생에 여러 알림이 있으면 severity 높은 거 우선)
  const seen = new Map<string, RiskAlert>()
  for (const a of alerts.sort((x, y) => (x.severity === "danger" ? 0 : 1) - (y.severity === "danger" ? 0 : 1))) {
    if (!seen.has(a.studentId) || (seen.get(a.studentId)!.severity === "warning" && a.severity === "danger")) {
      seen.set(a.studentId, a)
    }
  }
  return [...seen.values()]
}

export function ClassOverview({ students, onStudentClick }: Props) {
  const { lang: _lang } = useLanguage()
  const [expandedPattern, setExpandedPattern] = useState<StudentPattern | null>(null)
  if (students.length === 0) return null

  const total = students.length
  const activeToday  = students.filter(s => s.activeToday).length

  // 이번 주 활동 인원 (7일 이내 접속)
  const activeThisWeek = students.filter(s => daysSince(s.lastActive) <= 7).length

  // 반 평균 퀴즈 정답률
  const studentsWithQuiz = students.filter(s => s.quizSessions.length >= 2)
  const classAvgAccuracy = studentsWithQuiz.length > 0
    ? Math.round(
        studentsWithQuiz.reduce((sum, s) => {
          const recent = s.quizSessions.slice(0, 10)
          const acc = recent.reduce((a, q) => a + (q.correct_answers / q.total_questions) * 100, 0) / recent.length
          return sum + acc
        }, 0) / studentsWithQuiz.length
      )
    : null

  const avgLessons = Math.round(students.reduce((s, st) => s + st.completedLessons, 0) / total)
  const maxCompleted = Math.max(...students.map(s => s.completedLessons), 1)

  // 패턴 분류 — 카운트 + 학생 목록 (클릭 연결용)
  const patternStudents = students.reduce((acc, s) => {
    const p = classifyPattern(s)
    if (!acc[p]) acc[p] = []
    // 퀴즈 평균
    const recent = s.quizSessions.slice(0, 5)
    const avgAcc = recent.length >= 2
      ? Math.round(recent.reduce((sum, q) => sum + (q.correct_answers / q.total_questions) * 100, 0) / recent.length)
      : null
    // 가장 낮은 복습 점수 레슨 찾기
    const reviewRows = s.lessonProgress.filter(r => r.progress_type === "review" && r.completed && r.score > 0)
    const worstReview = reviewRows.length > 0
      ? reviewRows.reduce((min, r) => r.score < min.score ? r : min)
      : null
    // 복습 안 한 레슨 중 가장 오래된 것
    const learnedIds = new Set(s.lessonProgress.filter(r => r.progress_type === "learn" && r.completed).map(r => r.lesson_id))
    const reviewedIds = new Set(s.lessonProgress.filter(r => r.progress_type === "review" && r.completed).map(r => r.lesson_id))
    const overdueLesson = s.lessonProgress
      .filter(r => r.progress_type === "learn" && r.completed && !reviewedIds.has(r.lesson_id))
      .sort((a, b) => a.updated_at.localeCompare(b.updated_at))[0] ?? null

    acc[p].push({
      id: s.id,
      name: s.displayName,
      avgAcc,
      completedLessons: s.completedLessons,
      worstLesson: worstReview ? { id: worstReview.lesson_id, score: worstReview.score } : null,
      overdueLesson: overdueLesson ? { id: overdueLesson.lesson_id } : null,
    })
    return acc
  }, {} as Record<StudentPattern, {
    id: string; name: string; avgAcc: number | null; completedLessons: number
    worstLesson: { id: string; score: number } | null
    overdueLesson: { id: string } | null
  }[]>)
  const patternCounts = Object.fromEntries(
    Object.entries(patternStudents).map(([k, v]) => [k, v.length])
  ) as Record<StudentPattern, number>

  const risks = buildRiskAlerts(students)
  const dangerCount = risks.filter(r => r.severity === "danger").length

  return (
    <div className="space-y-4 mb-6">

      {/* ① 이번 주 반 요약 — 선생님이 매일 제일 먼저 보는 숫자 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-black text-gray-700">📊 이번 주 반 현황</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <StatCard
            icon={<Users className="w-4 h-4" />}
            value={`${activeThisWeek}/${total}명`}
            label="이번 주 활동"
            sub={activeToday > 0 ? `오늘 ${activeToday}명` : "오늘 없음"}
            color={activeThisWeek >= total * 0.7 ? "green" : activeThisWeek > 0 ? "amber" : "red"}
          />
          <StatCard
            icon={<BookOpen className="w-4 h-4" />}
            value={`${avgLessons}개`}
            label="평균 완료 레슨"
            sub="반 평균"
            color="purple"
          />
          <StatCard
            icon={<Target className="w-4 h-4" />}
            value={classAvgAccuracy !== null ? `${classAvgAccuracy}%` : "—"}
            label="평균 퀴즈 정답률"
            sub={classAvgAccuracy !== null ? (classAvgAccuracy >= 75 ? "양호 👍" : classAvgAccuracy >= 55 ? "보통" : "복습 필요 ⚠️") : "데이터 부족"}
            color={classAvgAccuracy === null ? "gray" : classAvgAccuracy >= 75 ? "green" : classAvgAccuracy >= 55 ? "amber" : "red"}
          />
          <StatCard
            icon={<Flame className="w-4 h-4" />}
            value={`${(students.reduce((s, st) => s + st.dailyStreak, 0) / total).toFixed(1)}일`}
            label="평균 연속일"
            sub="스트릭"
            color="orange"
          />
        </div>
      </div>

      {/* ② 지금 당장 신경써야 할 학생 */}
      {risks.length > 0 && (
        <div className={cn(
          "rounded-2xl border p-4 space-y-3",
          dangerCount > 0 ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
        )}>
          <div className="flex items-center gap-2">
            <AlertTriangle className={cn("w-4 h-4", dangerCount > 0 ? "text-red-500" : "text-amber-500")} />
            <h3 className={cn("text-sm font-black", dangerCount > 0 ? "text-red-800" : "text-amber-800")}>
              지금 신경써야 할 학생 {risks.length}명
            </h3>
          </div>
          <div className="space-y-2">
            {risks.slice(0, 5).map((risk, i) => (
              <button
                key={i}
                onClick={() => onStudentClick?.(risk.studentId)}
                className="w-full flex items-start gap-3 bg-white rounded-xl px-3 py-2.5 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors group"
              >
                <span className="text-base mt-0.5 flex-shrink-0">{risk.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                    {risk.studentName}
                    <span className="text-[10px] text-gray-300 font-normal">→ 클릭해서 확인</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">{risk.detail}</p>
                  {risk.focusLesson && (
                    <p className="text-[10px] text-orange-500 font-bold mt-0.5">📌 {risk.focusLesson}</p>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5",
                  risk.severity === "danger" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                )}>
                  {risk.action}
                </span>
              </button>
            ))}
            {risks.length > 5 && (
              <p className="text-xs text-center text-gray-400">+{risks.length - 5}명 더 있어요 (아래 목록 확인)</p>
            )}
          </div>
        </div>
      )}

      {risks.length === 0 && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <p className="text-sm font-bold text-green-700">이번 주 모든 학생이 잘 따라가고 있어요!</p>
        </div>
      )}

      {/* ③ 학생 패턴 분포 — 수업 방향 결정에 도움 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-black text-gray-700">🗂️ 학생 유형 분포</h3>
        <p className="text-xs text-gray-400">접속 빈도 × 퀴즈 정답률 기준 · 카드를 눌러서 학생 확인</p>
        <div className="grid grid-cols-2 gap-2">
          {(["star", "hardworker", "coaster", "atrisk"] as StudentPattern[]).map(pattern => {
            const meta = PATTERN_META[pattern]
            const list = patternStudents[pattern] || []
            const count = list.length
            if (count === 0) return null
            const isExpanded = expandedPattern === pattern
            const borderColor = pattern === "star" ? "border-green-200" : pattern === "hardworker" ? "border-amber-200" : pattern === "coaster" ? "border-blue-200" : "border-red-200"
            return (
              <div key={pattern} className={cn("rounded-xl border overflow-hidden", meta.bg, borderColor)}>
                {/* 카드 헤더 — 클릭으로 펼치기 */}
                <button
                  onClick={() => {
                    if (count === 1) {
                      onStudentClick?.(list[0].id)
                    } else {
                      setExpandedPattern(isExpanded ? null : pattern)
                    }
                  }}
                  className="w-full p-3 text-left hover:brightness-95 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{meta.emoji}</span>
                      <span className={cn("text-xs font-black", meta.color)}>{count}명</span>
                    </div>
                    {count > 1 && (
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", meta.color, isExpanded && "rotate-180")} />
                    )}
                  </div>
                  <p className={cn("text-xs font-bold", meta.color)}>{meta.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{meta.advice}</p>
                  {count === 1 && (
                    <div className="mt-1 space-y-0.5">
                      <p className="text-[10px] text-gray-500">
                        {list[0].name}
                        {list[0].avgAcc !== null && <span className={cn("ml-1 font-bold", list[0].avgAcc < 55 ? "text-red-500" : "text-amber-500")}>퀴즈 {list[0].avgAcc}%</span>}
                      </p>
                      {list[0].worstLesson && (
                        <p className="text-[10px] text-red-500 font-bold">
                          📉 {getLessonName(list[0].worstLesson.id, "ko")} {list[0].worstLesson.score}%
                        </p>
                      )}
                      {!list[0].worstLesson && list[0].overdueLesson && (
                        <p className="text-[10px] text-amber-500 font-bold">
                          ⏰ {getLessonName(list[0].overdueLesson.id, "ko")} 복습 안 함
                        </p>
                      )}
                    </div>
                  )}
                </button>

                {/* 여러 명일 때: 학생 목록 펼침 */}
                {count > 1 && isExpanded && (
                  <div className="border-t border-black/5 divide-y divide-black/5">
                    {list.map(s => (
                      <button
                        key={s.id}
                        onClick={() => onStudentClick?.(s.id)}
                        className="w-full flex items-start justify-between px-3 py-2 hover:bg-black/5 transition-colors text-left gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <span className={cn("text-[11px] font-bold block", meta.color)}>{s.name}</span>
                          {s.worstLesson && (
                            <span className="text-[10px] text-red-500 font-bold">
                              📉 {getLessonName(s.worstLesson.id, "ko")} {s.worstLesson.score}%
                            </span>
                          )}
                          {!s.worstLesson && s.overdueLesson && (
                            <span className="text-[10px] text-amber-500 font-bold">
                              ⏰ {getLessonName(s.overdueLesson.id, "ko")} 복습 안 함
                            </span>
                          )}
                        </div>
                        {s.avgAcc !== null && (
                          <span className={cn(
                            "text-[10px] font-black flex-shrink-0 mt-0.5",
                            s.avgAcc < 55 ? "text-red-500" : s.avgAcc < 70 ? "text-amber-500" : "text-green-600"
                          )}>
                            {s.avgAcc}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {(patternCounts["new"] || 0) > 0 && (
          <p className="text-xs text-gray-400 text-center">🌱 아직 시작 안 한 학생 {patternCounts["new"] || 0}명</p>
        )}
      </div>

      {/* ④ 학생별 진도 바 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-black text-gray-700">학생별 진도 비교</h3>
        </div>
        <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
          {[...students]
            .sort((a, b) => b.completedLessons - a.completedLessons)
            .map(s => {
              const pct = (s.completedLessons / maxCompleted) * 100
              const pattern = classifyPattern(s)
              const meta = PATTERN_META[pattern]
              const days = daysSince(s.lastActive)
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="text-xs w-4 text-center">{meta.emoji}</span>
                  <span className={cn("text-xs font-medium w-16 truncate text-right",
                    days >= 5 ? "text-red-400" : days >= 3 ? "text-amber-500" : "text-gray-600"
                  )}>
                    {s.displayName}
                  </span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        pattern === "star" ? "bg-green-500" :
                        pattern === "hardworker" ? "bg-amber-400" :
                        pattern === "coaster" ? "bg-blue-400" :
                        pattern === "atrisk" ? "bg-red-400" : "bg-gray-300"
                      )}
                      style={{ width: `${Math.max(pct, s.completedLessons > 0 ? 3 : 0)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 w-8 text-right">
                    {s.completedLessons}
                  </span>
                </div>
              )
            })}
        </div>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />잘 따라가는 중</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />개념 보충 필요</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" />빠짐 주의</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" />개입 필요</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label, sub, color }: {
  icon: React.ReactNode; value: string; label: string; sub: string
  color: "green" | "amber" | "red" | "purple" | "orange" | "blue" | "gray"
}) {
  const colors = {
    green:  "bg-green-50  text-green-600  border-green-200",
    amber:  "bg-amber-50  text-amber-600  border-amber-200",
    red:    "bg-red-50    text-red-600    border-red-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    blue:   "bg-blue-50   text-blue-600   border-blue-200",
    gray:   "bg-gray-50   text-gray-500   border-gray-200",
  }
  return (
    <div className={cn("rounded-xl border p-3 text-center", colors[color])}>
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <div className="text-lg font-black">{value}</div>
      <div className="text-[10px] opacity-75 font-medium">{label}</div>
      <div className="text-[9px] opacity-60 mt-0.5">{sub}</div>
    </div>
  )
}
