"use client"

import { useState } from "react"
import type { QuizSession } from "@/lib/supabase/types"
import { ChevronDown, AlertTriangle, Clock, Zap, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  quizSessions: QuizSession[]
}

// ── 약점 요약 계산 ──────────────────────────────────────────
interface WeakPoint {
  question_id: number
  question_text: string
  total: number
  correct: number
  avgTimeMs: number
}

function buildWeakPoints(sessions: QuizSession[]): WeakPoint[] {
  const map = new Map<number, { text: string; total: number; correct: number; totalTimeMs: number }>()
  for (const session of sessions) {
    for (const q of (session.question_details ?? [])) {
      const entry = map.get(q.question_id) ?? { text: q.question_text, total: 0, correct: 0, totalTimeMs: 0 }
      entry.total++
      if (q.is_correct) entry.correct++
      entry.totalTimeMs += q.time_taken_ms ?? 0
      map.set(q.question_id, entry)
    }
  }
  return [...map.entries()]
    .map(([id, v]) => ({
      question_id: id,
      question_text: v.text,
      total: v.total,
      correct: v.correct,
      avgTimeMs: Math.round(v.totalTimeMs / v.total),
    }))
    .filter(w => w.total >= 2)
    .sort((a, b) => (a.correct / a.total) - (b.correct / b.total))
    .slice(0, 5)
}

function WeaknessSummary({ sessions }: { sessions: QuizSession[] }) {
  const weakPoints = buildWeakPoints(sessions)
  if (weakPoints.length === 0) return null
  return (
    <div className="rounded-xl border border-red-100 bg-red-50 p-3 space-y-2 mb-3">
      <div className="flex items-center gap-1.5">
        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
        <span className="text-xs font-black text-red-700">자주 틀리는 개념</span>
        <span className="text-[10px] text-red-400 ml-auto">최근 퀴즈 기준</span>
      </div>
      <div className="space-y-1.5">
        {weakPoints.map(w => {
          const pct = Math.round((w.correct / w.total) * 100)
          const isSlow = w.avgTimeMs > 60000
          return (
            <div key={w.question_id} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-600 flex-1 truncate">{w.question_text}</span>
                <span className={cn(
                  "text-[10px] font-bold flex-shrink-0 w-10 text-right",
                  pct === 0 ? "text-red-600" : pct < 50 ? "text-orange-600" : "text-amber-600"
                )}>{w.correct}/{w.total} {pct}%</span>
                {isSlow && <span className="text-[9px] bg-amber-100 text-amber-600 px-1 rounded flex-shrink-0">느림</span>}
              </div>
              <div className="h-1 bg-red-100 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", pct === 0 ? "bg-red-500" : pct < 50 ? "bg-orange-400" : "bg-amber-400")}
                  style={{ width: `${Math.max(pct, 3)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
  } catch {
    return dateStr
  }
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return min > 0 ? `${min}분 ${sec}초` : `${sec}초`
}

function getTimeColor(ms: number): string {
  if (ms < 3000) return "text-red-600 bg-red-50"
  if (ms > 120000) return "text-amber-600 bg-amber-50"
  return "text-gray-600 bg-gray-50"
}

export function StudentQuizReport({ quizSessions }: Props) {
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [showAllSessions, setShowAllSessions] = useState(false)

  if (quizSessions.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-3 text-center">아직 퀴즈 기록이 없어요</p>
    )
  }

  const visibleSessions = showAllSessions ? quizSessions : quizSessions.slice(0, 10)

  return (
    <div className="mt-3">
      {/* 약점 요약 카드 — 항상 최상단 */}
      <WeaknessSummary sessions={quizSessions} />

      {/* 세션 목록 */}
      <div className="space-y-2">
      {visibleSessions.map((session) => {
        const accuracy = Math.round((session.correct_answers / session.total_questions) * 100)
        const isExpanded = expandedSession === session.id

        return (
          <div key={session.id} className="rounded-lg border border-gray-100 overflow-hidden">
            {/* Session summary row */}
            <button
              onClick={() => setExpandedSession(isExpanded ? null : session.id)}
              className="w-full flex items-center gap-2 text-sm py-2.5 px-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              {/* Date */}
              <span className="text-xs text-gray-400 w-16 flex-shrink-0">
                {formatDate(session.completed_at)}
              </span>

              {/* Score */}
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                accuracy >= 80 ? "bg-green-100 text-green-700" :
                accuracy >= 50 ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              )}>
                {session.correct_answers}/{session.total_questions} ({accuracy}%)
              </span>

              {/* Time */}
              <span className="text-xs text-gray-400 flex items-center gap-0.5">
                <Clock className="w-3 h-3" />
                {formatTime(session.time_elapsed_ms)}
              </span>

              {/* Flags */}
              <div className="flex-1 flex items-center gap-1 justify-end">
                {session.quick_answer_count > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-medium">
                    <Zap className="w-2.5 h-2.5" />
                    찍기 의심 {session.quick_answer_count}
                  </span>
                )}
                {session.slow_answer_count > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    오래 걸림 {session.slow_answer_count}
                  </span>
                )}
                {session.end_reason === "hearts" && (
                  <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-medium">
                    하트 소진
                  </span>
                )}
              </div>

              <ChevronDown className={cn(
                "w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0",
                isExpanded && "rotate-180"
              )} />
            </button>

            {/* Expanded: per-question details */}
            {isExpanded && session.question_details && (
              <div className="px-3 py-2 border-t border-gray-100 space-y-1">
                {(session.question_details as Array<{
                  question_id: number
                  question_text: string
                  time_taken_ms: number
                  selected_answer: number
                  correct_answer: number
                  is_correct: boolean
                }>).map((q, i) => (
                  <div key={`${session.id}-q${i}`}
                    className="flex items-center gap-2 text-xs py-1"
                  >
                    {/* Correct/Wrong indicator */}
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                      q.is_correct ? "bg-green-100 text-green-600" :
                      q.selected_answer === -1 ? "bg-gray-100 text-gray-400" :
                      "bg-red-100 text-red-600"
                    )}>
                      {q.is_correct ? "O" : q.selected_answer === -1 ? "-" : "X"}
                    </span>

                    {/* Question text */}
                    <span className="flex-1 text-gray-600 truncate">
                      {q.question_text}
                    </span>

                    {/* Time taken */}
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded font-mono flex-shrink-0",
                      getTimeColor(q.time_taken_ms)
                    )}>
                      {q.time_taken_ms < 1000 ? `${q.time_taken_ms}ms` : `${(q.time_taken_ms / 1000).toFixed(1)}s`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
      </div>

      {/* 더 보기 버튼 */}
      {quizSessions.length > 10 && (
        <button
          onClick={() => setShowAllSessions(v => !v)}
          className="w-full mt-2 py-1.5 text-[11px] text-gray-400 hover:text-gray-600 font-medium text-center border border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          {showAllSessions
            ? "▲ 접기"
            : `▼ 이전 기록 더 보기 (+${quizSessions.length - 10}회)`}
        </button>
      )}
    </div>
  )
}
