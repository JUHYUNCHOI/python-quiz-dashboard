"use client"

import { useState } from "react"
import type { QuizSession } from "@/lib/supabase/types"
import { ChevronDown, AlertTriangle, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  quizSessions: QuizSession[]
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

  if (quizSessions.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-3 text-center">아직 퀴즈 기록이 없어요</p>
    )
  }

  return (
    <div className="mt-3 space-y-2">
      {quizSessions.map((session) => {
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
  )
}
