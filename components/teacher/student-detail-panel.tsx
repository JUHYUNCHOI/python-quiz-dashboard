"use client"

import { useState } from "react"
import { X, BookOpen, Trophy, Flame, ChevronDown, ExternalLink, Check, AlertTriangle, Dumbbell } from "lucide-react"
import { StudentProgress } from "@/components/teacher/student-progress"
import { StudentQuizReport } from "@/components/teacher/student-quiz-report"
import { cn } from "@/lib/utils"
import { getLessonName } from "@/lib/curriculum-data"
import type { QuizSession } from "@/lib/supabase/types"

// ─── 연습문제 클러스터 요약 타입 ─────────────────────────────
interface ClusterSummary {
  clusterId: string
  clusterTitle: string
  clusterEmoji: string
  totalProblems: number
  solvedProblems: number
  stuckProblems: { problemId: string; problemTitle: string; attempts: number }[]
}

// ─── 로컬 인터페이스 ──────────────────────────────────────────
interface LessonProgressRow {
  lesson_id: string
  progress_type: "learn" | "review"
  completed: boolean
  score: number
  updated_at: string
}

interface StepVisitSummary {
  lesson_id: string
  visited_steps: number
  total_steps: number
  last_visited_at: string
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
  stepVisits: StepVisitSummary[]
}

// ─── 헬퍼 함수 ───────────────────────────────────────────────
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

function formatLastActive(dateStr: string, lang: "ko" | "en"): string {
  if (!dateStr || dateStr === "-") return lang === "en" ? "No record" : "기록 없음"
  const days = daysSince(dateStr)
  if (days === 0) return lang === "en" ? "Today" : "오늘"
  if (days === 1) return lang === "en" ? "Yesterday" : "어제"
  if (days < 7) return lang === "en" ? `${days}d ago` : `${days}일 전`
  if (days < 14) return lang === "en" ? "1w ago" : "1주 전"
  if (days < 30) return lang === "en" ? `${Math.floor(days / 7)}w ago` : `${Math.floor(days / 7)}주 전`
  return lang === "en" ? "30d+" : "30일+"
}

// ─── 진단 ────────────────────────────────────────────────────
interface DiagnosisResult {
  summary: string
  severity: "good" | "warning" | "danger"
  weakConcepts: string[]
  weakQuestions: {
    id: number
    conceptTitle: string
    topics: string[]
    text: string
    wrong: number
    total: number
    pct: number
  }[]
  overdueReviews: { lessonId: string; days: number }[]
}

function buildDiagnosis(student: StudentRow, detailedSessions: QuizSession[]): DiagnosisResult {
  const cutoff60 = Date.now() - 60 * 24 * 60 * 60 * 1000
  const sessions = (detailedSessions.length > 0 ? detailedSessions : student.quizSessions)
    .filter(s => new Date(s.completed_at).getTime() >= cutoff60)

  // 약점 문제 분석
  const conceptMap = new Map<number, { text: string; conceptTitle: string; topics: string[]; total: number; wrong: number }>()
  for (const session of sessions) {
    for (const q of (session.question_details ?? [])) {
      const qAny = q as unknown as Record<string, unknown>
      const entry = conceptMap.get(q.question_id) ?? {
        text: q.question_text,
        conceptTitle: (qAny["key_concept_title"] as string) || "",
        topics: (qAny["related_topics"] as string[]) || [],
        total: 0,
        wrong: 0,
      }
      entry.total++
      if (!q.is_correct) entry.wrong++
      conceptMap.set(q.question_id, entry)
    }
  }

  const weakQuestions = [...conceptMap.entries()]
    .map(([id, v]) => ({
      id,
      text: v.text,
      conceptTitle: v.conceptTitle,
      topics: v.topics,
      total: v.total,
      wrong: v.wrong,
      pct: Math.round((v.wrong / v.total) * 100),
    }))
    .filter(w => w.total >= 2 && w.wrong >= 2)
    .sort((a, b) => b.wrong - a.wrong || b.pct - a.pct)
    .slice(0, 4)

  // 복습 밀린 레슨 분석
  const learnMap = new Map<string, { updated_at: string }>()
  const reviewMap = new Map<string, boolean>()
  for (const row of student.lessonProgress) {
    if (row.progress_type === "learn" && row.completed) {
      const ex = learnMap.get(row.lesson_id)
      if (!ex || row.updated_at > ex.updated_at) learnMap.set(row.lesson_id, { updated_at: row.updated_at })
    }
    if (row.progress_type === "review" && row.completed) {
      reviewMap.set(row.lesson_id, true)
    }
  }

  const overdueReviews = [...learnMap.entries()]
    .filter(([lessonId]) => !reviewMap.has(lessonId))
    .map(([lessonId, { updated_at }]) => ({ lessonId, days: daysSince(updated_at) }))
    .filter(r => r.days >= 7)
    .sort((a, b) => b.days - a.days)
    .slice(0, 3)

  // 약점 컨셉 상위 3개
  const weakConcepts = weakQuestions
    .map(w => w.conceptTitle || "")
    .filter(Boolean)
    .slice(0, 3)

  // severity 판단
  const lastActiveDays = daysSince(student.lastActive)
  let severity: "good" | "warning" | "danger"
  if (lastActiveDays >= 7 || (weakQuestions.length >= 2 && overdueReviews.length >= 2)) {
    severity = "danger"
  } else if (weakQuestions.length > 0 || overdueReviews.length > 0 || lastActiveDays >= 4) {
    severity = "warning"
  } else {
    severity = "good"
  }

  // 한국어 요약 문장
  let summary = "전반적으로 잘 따라가고 있어요"
  if (severity !== "good") {
    const parts: string[] = []
    if (weakConcepts.length > 0) {
      parts.push(`'${weakConcepts[0]}' 등 반복 오답 발생`)
    }
    if (overdueReviews.length > 0) {
      parts.push(`${overdueReviews.length}개 레슨 복습 지연`)
    }
    if (lastActiveDays >= 7) {
      parts.push(`${lastActiveDays}일째 미접속`)
    }
    summary = parts.join(" · ")
  }

  return { summary, severity, weakConcepts, weakQuestions, overdueReviews }
}

// ─── CollapsibleSection ──────────────────────────────────────
function CollapsibleSection({
  title,
  emoji,
  children,
  defaultOpen = false,
}: {
  title: string
  emoji: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-black text-gray-700">
          {emoji} {title}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-50">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Props ───────────────────────────────────────────────────
interface Props {
  student: StudentRow | null
  detailedSessions: QuizSession[]
  homeworkLessonIds?: Set<string>
  practiceData?: ClusterSummary[]
  onClose: () => void
  onGenerateParentLink: (student: StudentRow) => void
  parentLinkCopied: string | null
  generatingLink: string | null
  lang: "ko" | "en"
}

// ─── Main Component ──────────────────────────────────────────
export function StudentDetailPanel({
  student,
  detailedSessions,
  homeworkLessonIds,
  practiceData,
  onClose,
  onGenerateParentLink,
  parentLinkCopied,
  generatingLink,
  lang,
}: Props) {
  const [expandedQ, setExpandedQ] = useState<number | null>(null)
  const [fetchedQuestions, setFetchedQuestions] = useState<Map<number, any>>(new Map())

  const handleExpandQuestion = async (id: number) => {
    if (expandedQ === id) { setExpandedQ(null); return }
    setExpandedQ(id)
    if (!fetchedQuestions.has(id)) {
      try {
        const res = await fetch(`/api/admin/questions/${id}`)
        if (res.ok) {
          const { question } = await res.json()
          setFetchedQuestions(prev => new Map(prev).set(id, question))
        }
      } catch { /* 조용히 실패 */ }
    }
  }

  if (!student) return null

  const diagnosis = buildDiagnosis(student, detailedSessions)
  const lastActiveDays = daysSince(student.lastActive)
  const hasIssues = diagnosis.weakQuestions.length > 0 || diagnosis.overdueReviews.length > 0

  const severityStyles = {
    good: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "✅",
      textColor: "text-green-700",
      labelColor: "text-green-500",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "⚠️",
      textColor: "text-amber-700",
      labelColor: "text-amber-500",
    },
    danger: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "🚨",
      textColor: "text-red-700",
      labelColor: "text-red-500",
    },
  }
  const sev = severityStyles[diagnosis.severity]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-white z-50 shadow-2xl flex flex-col">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-b border-gray-100 bg-gradient-to-b from-orange-50 to-white px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {/* Name + badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-black text-base text-gray-900 truncate">{student.displayName}</h2>
                {student.activeToday && (
                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">
                    {lang === "en" ? "Active today" : "오늘 활동"}
                  </span>
                )}
              </div>
              {/* Stats row */}
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-purple-600">
                  <BookOpen className="w-3 h-3" />
                  <span className="font-bold">{student.completedLessons}</span>
                  <span className="text-gray-400">{lang === "en" ? "lessons" : "레슨"}</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-orange-600">
                  <Trophy className="w-3 h-3" />
                  <span className="font-bold">{student.totalXp}</span>
                  <span className="text-gray-400">XP</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <Flame className="w-3 h-3" />
                  <span className="font-bold">{student.dailyStreak}</span>
                  <span className="text-gray-400">{lang === "en" ? "day streak" : "일 연속"}</span>
                </span>
                <span className={cn(
                  "text-xs font-medium",
                  lastActiveDays === 0 ? "text-green-600" :
                  lastActiveDays <= 3 ? "text-gray-500" :
                  lastActiveDays <= 6 ? "text-amber-600" : "text-red-600"
                )}>
                  {lang === "en" ? "Last:" : "최근:"} {formatLastActive(student.lastActive, lang)}
                </span>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── BODY ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-8">

          {/* Diagnosis card */}
          <div className={cn("mx-4 mt-4 rounded-xl border p-4", sev.bg, sev.border)}>
            <div className="flex items-start gap-2">
              <span className="text-base flex-shrink-0">{sev.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={cn("text-[10px] font-bold uppercase tracking-wide mb-0.5", sev.labelColor)}>
                  {lang === "en" ? "Student status" : "지금 이 학생의 문제"}
                </p>
                <p className={cn("text-xs font-semibold leading-snug", sev.textColor)}>
                  {diagnosis.summary}
                </p>
                {diagnosis.weakConcepts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {diagnosis.weakConcepts.map(c => (
                      <span key={c} className="text-[10px] bg-white/70 text-gray-600 px-1.5 py-0.5 rounded-full font-medium border border-gray-200">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="px-4 mt-3">
            <button
              onClick={() => onGenerateParentLink(student)}
              disabled={generatingLink === student.id}
              className={cn(
                "w-full py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5",
                parentLinkCopied === student.id
                  ? "bg-green-100 text-green-700"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              )}
            >
              {parentLinkCopied === student.id ? (
                <><Check className="w-4 h-4" /> {lang === "en" ? "Link copied!" : "링크 복사됨!"}</>
              ) : generatingLink === student.id ? (
                lang === "en" ? "Generating..." : "생성 중..."
              ) : (
                <><ExternalLink className="w-4 h-4" /> {lang === "en" ? "Parent report link" : "학부모 리포트 링크"}</>
              )}
            </button>
          </div>

          {/* Collapsible sections */}
          <div className="px-4 mt-4 space-y-2">

            {/* Section 1: 약점 분석 */}
            <CollapsibleSection title={lang === "en" ? "Weakness Analysis" : "약점 분석"} emoji="🎯" defaultOpen={hasIssues}>
              <div className="pt-3 space-y-3">
                {/* 반복 오답 문제 */}
                {diagnosis.weakQuestions.length > 0 ? (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      🔁 {lang === "en" ? "Repeatedly wrong" : "반복해서 틀린 문제"}
                    </p>
                    {diagnosis.weakQuestions.map(w => {
                      const isExpanded = expandedQ === w.id
                      const qDetail = fetchedQuestions.get(w.id)
                      return (
                        <div key={w.id} className="rounded-lg border border-orange-100 overflow-hidden">
                          <button
                            onClick={() => handleExpandQuestion(w.id)}
                            className="w-full flex items-start gap-2 px-3 py-2 text-left hover:bg-orange-50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              {(w.conceptTitle || qDetail?.keyConceptTitle) && (
                                <p className="text-[11px] font-bold text-gray-800 leading-snug">
                                  {w.conceptTitle || qDetail?.keyConceptTitle}
                                </p>
                              )}
                              {(w.topics.length > 0 || (qDetail?.relatedTopics?.length ?? 0) > 0) && (
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {(w.topics.length > 0 ? w.topics : qDetail?.related_topics || []).slice(0, 3).map((t: string) => (
                                    <span key={t} className="text-[9px] bg-orange-100 text-orange-600 px-1 py-0.5 rounded font-medium">{t}</span>
                                  ))}
                                </div>
                              )}
                              <p className="text-[10px] text-gray-500 line-clamp-1 leading-snug mt-0.5">{w.text}</p>
                            </div>
                            <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
                              <span className={cn(
                                "text-[10px] font-black px-1.5 py-0.5 rounded",
                                w.pct >= 80 ? "bg-red-100 text-red-600" : w.pct >= 60 ? "bg-orange-100 text-orange-600" : "bg-amber-100 text-amber-600"
                              )}>
                                {lang === "en" ? `Wrong ${w.wrong}×` : `${w.wrong}번 틀림`}
                              </span>
                              <span className="text-[9px] text-gray-400">
                                {lang === "en" ? `${w.pct}% of ${w.total}` : `${w.total}번 중 ${w.pct}%`}
                              </span>
                            </div>
                            <ChevronDown className={cn("w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5 transition-transform", isExpanded && "rotate-180")} />
                          </button>

                          {/* 펼친 상세 */}
                          {isExpanded && qDetail && (
                            <div className="px-3 pb-3 space-y-2 bg-orange-50/30">
                              <p className="text-[11px] text-gray-700 font-medium">{qDetail.question}</p>
                              {qDetail.code && (
                                <pre className="text-[10px] bg-gray-900 text-green-300 p-2 rounded overflow-x-auto leading-relaxed whitespace-pre-wrap">
                                  {qDetail.code}
                                </pre>
                              )}
                              <div className="space-y-1">
                                {qDetail.options.map((opt: string, idx: number) => (
                                  <div key={idx} className={cn(
                                    "text-[10px] px-2 py-1 rounded flex items-center gap-1.5",
                                    idx === qDetail.correct_answer
                                      ? "bg-green-100 text-green-700 font-bold"
                                      : "bg-gray-100 text-gray-500"
                                  )}>
                                    {idx === qDetail.correct_answer && <Check className="w-3 h-3 flex-shrink-0" />}
                                    <span>{opt}</span>
                                  </div>
                                ))}
                              </div>
                              {qDetail.explanation && (
                                <p className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1.5 rounded leading-snug">
                                  {qDetail.explanation}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : null}

                {/* 복습 밀린 레슨 */}
                {diagnosis.overdueReviews.length > 0 ? (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      ⏰ {lang === "en" ? "Overdue reviews" : "복습이 밀린 레슨"}
                    </p>
                    {diagnosis.overdueReviews.map(r => (
                      <div key={r.lessonId} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-amber-50 border border-amber-100">
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-gray-700 truncate">{getLessonName(r.lessonId, lang)}</p>
                          <p className={cn(
                            "text-[10px] font-bold",
                            r.days >= 14 ? "text-red-500" : "text-amber-600"
                          )}>
                            {lang === "en" ? `No review for ${r.days}d` : `학습 후 ${r.days}일째 복습 없음`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* 문제 없음 */}
                {!hasIssues && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    {lang === "en" ? "No issues found in the last 60 days" : "최근 60일 기준 문제 없음"}
                  </p>
                )}
              </div>
            </CollapsibleSection>

            {/* Section 2: 레슨 진도 */}
            <CollapsibleSection title={lang === "en" ? "Lesson Progress" : "레슨 진도"} emoji="📖">
              <div className="pt-2">
                <StudentProgress
                  lessonProgress={student.lessonProgress}
                  studentId={student.id}
                  homeworkLessonIds={homeworkLessonIds}
                  stepVisits={student.stepVisits}
                />
              </div>
            </CollapsibleSection>

            {/* Section 3: 퀴즈 이력 */}
            <CollapsibleSection title={lang === "en" ? "Quiz History" : "퀴즈 이력"} emoji="📊">
              <div className="pt-2">
                <StudentQuizReport
                  quizSessions={detailedSessions.length > 0 ? detailedSessions : student.quizSessions}
                />
              </div>
            </CollapsibleSection>

            {/* Section 4: 연습문제 진도 */}
            <CollapsibleSection title={lang === "en" ? "Practice Problems" : "연습문제"} emoji="🏋️">
              <div className="pt-2">
                {!practiceData ? (
                  <p className="text-xs text-gray-400 text-center py-3 animate-pulse">
                    {lang === "en" ? "Loading…" : "불러오는 중…"}
                  </p>
                ) : practiceData.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-3">
                    {lang === "en" ? "No practice activity yet" : "아직 연습문제 활동 없음"}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {/* 막힌 문제가 있는 클러스터를 먼저 정렬 */}
                    {[...practiceData]
                      .sort((a, b) => b.stuckProblems.length - a.stuckProblems.length)
                      .map(cluster => {
                        const pct = Math.round((cluster.solvedProblems / cluster.totalProblems) * 100)
                        const isComplete = cluster.solvedProblems === cluster.totalProblems
                        return (
                          <div
                            key={cluster.clusterId}
                            className={cn(
                              "rounded-xl border p-3",
                              cluster.stuckProblems.length > 0
                                ? "border-amber-200 bg-amber-50"
                                : isComplete
                                  ? "border-green-200 bg-green-50"
                                  : "border-gray-100 bg-white"
                            )}
                          >
                            {/* 클러스터 헤더 */}
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-gray-800">
                                {cluster.clusterEmoji} {cluster.clusterTitle}
                              </span>
                              <span className={cn(
                                "text-[11px] font-bold",
                                isComplete ? "text-green-600" :
                                cluster.stuckProblems.length > 0 ? "text-amber-600" : "text-gray-500"
                              )}>
                                {cluster.solvedProblems}/{cluster.totalProblems}
                                {isComplete && " ✅"}
                              </span>
                            </div>
                            {/* 진도 바 */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                              <div
                                className={cn(
                                  "h-1.5 rounded-full transition-all",
                                  isComplete ? "bg-green-400" :
                                  cluster.stuckProblems.length > 0 ? "bg-amber-400" : "bg-blue-400"
                                )}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            {/* 막힌 문제 목록 */}
                            {cluster.stuckProblems.length > 0 && (
                              <div className="space-y-1 mt-1">
                                {cluster.stuckProblems.map(p => (
                                  <div key={p.problemId} className="flex items-center gap-2 rounded-lg bg-white border border-amber-200 px-2 py-1.5">
                                    <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                    <span className="text-[11px] text-gray-700 truncate flex-1">{p.problemTitle}</span>
                                    <span className="text-[10px] font-bold text-amber-500 flex-shrink-0 whitespace-nowrap">
                                      {lang === "en" ? `${p.attempts} tries` : `${p.attempts}회 시도`}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>
            </CollapsibleSection>

          </div>
        </div>
      </div>
    </>
  )
}
