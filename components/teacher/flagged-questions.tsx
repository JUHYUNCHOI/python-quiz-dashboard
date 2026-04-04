"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { updateFlagStatus } from "@/lib/flag-question"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { Flag, CheckCheck, Wrench, X, ChevronDown, ChevronUp } from "lucide-react"

interface FlaggedQuestion {
  id: string
  question_id: number
  lesson_id: string
  reported_by_name: string | null
  reason: string
  comment: string | null
  status: string
  created_at: string
}

const REASON_LABELS: Record<string, { ko: string; en: string }> = {
  wrong_answer:  { ko: "정답 오류",             en: "Wrong answer" },
  wrong_lesson:  { ko: "레슨과 무관",           en: "Unrelated to lesson" },
  not_taught:    { ko: "미학습 내용",           en: "Not yet taught" },
  duplicate:     { ko: "중복 문제",             en: "Duplicate" },
  unclear:       { ko: "문제 불명확",           en: "Unclear" },
  other:         { ko: "기타",                  en: "Other" },
}

const STATUS_STYLE: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  reviewed:  "bg-blue-100 text-blue-700",
  fixed:     "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-500",
}

const STATUS_LABELS: Record<string, { ko: string; en: string }> = {
  pending:   { ko: "미검토", en: "Pending" },
  reviewed:  { ko: "검토됨", en: "Reviewed" },
  fixed:     { ko: "수정됨", en: "Fixed" },
  dismissed: { ko: "무시됨", en: "Dismissed" },
}

export function FlaggedQuestions() {
  const { t, lang } = useLanguage()
  const [flags, setFlags] = useState<FlaggedQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending">("pending")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const loadFlags = useCallback(async () => {
    setIsLoading(true)
    const supabase = createClient()
    let query = supabase
      .from("flagged_questions")
      .select("*")
      .order("created_at", { ascending: false })

    if (filter === "pending") query = query.eq("status", "pending")

    const { data } = await query
    setFlags(data || [])
    setIsLoading(false)
  }, [filter])

  useEffect(() => { loadFlags() }, [loadFlags])

  const handleStatus = async (id: string, status: "reviewed" | "fixed" | "dismissed") => {
    setUpdating(id)
    await updateFlagStatus(id, status)
    await loadFlags()
    setUpdating(null)
  }

  const pendingCount = flags.filter(f => f.status === "pending").length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-gray-800 text-base">
            {t("신고된 문제", "Flagged Questions")}
          </h2>
          {pendingCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {(["pending", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-xl font-semibold transition-all",
                filter === f
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {f === "pending" ? t("미검토", "Pending") : t("전체", "All")}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400 text-center py-4">{t("불러오는 중...", "Loading...")}</p>
      ) : flags.length === 0 ? (
        <div className="text-center py-8 text-gray-400 space-y-1">
          <div className="text-3xl">🎉</div>
          <p className="text-sm font-medium">
            {filter === "pending"
              ? t("미검토 신고가 없어요!", "No pending reports!")
              : t("신고된 문제가 없어요", "No flagged questions yet")}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {flags.map((flag) => (
            <div
              key={flag.id}
              className={cn(
                "rounded-2xl border p-4 transition-all",
                flag.status === "pending" ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-white"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-sm text-gray-800">
                      {t("문제", "Q")} #{flag.question_id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono">
                      {flag.lesson_id}
                    </span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", STATUS_STYLE[flag.status])}>
                      {lang === "ko"
                        ? STATUS_LABELS[flag.status]?.ko
                        : STATUS_LABELS[flag.status]?.en}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-orange-600">
                      {lang === "ko"
                        ? REASON_LABELS[flag.reason]?.ko
                        : REASON_LABELS[flag.reason]?.en}
                    </span>
                    {" · "}
                    {flag.reported_by_name || t("알 수 없음", "Unknown")}
                    {" · "}
                    {new Date(flag.created_at).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US")}
                  </p>
                  {flag.comment && (
                    <p className="text-xs text-gray-500 mt-1 italic">"{flag.comment}"</p>
                  )}
                </div>

                <button
                  onClick={() => setExpanded(expanded === flag.id ? null : flag.id)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex-shrink-0"
                >
                  {expanded === flag.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Action buttons */}
              {(expanded === flag.id || flag.status === "pending") && (
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {flag.status !== "reviewed" && (
                    <button
                      onClick={() => handleStatus(flag.id, "reviewed")}
                      disabled={updating === flag.id}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold disabled:opacity-50 transition-all"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      {t("확인함", "Mark Reviewed")}
                    </button>
                  )}
                  {flag.status !== "fixed" && (
                    <button
                      onClick={() => handleStatus(flag.id, "fixed")}
                      disabled={updating === flag.id}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 font-semibold disabled:opacity-50 transition-all"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      {t("수정 완료", "Mark Fixed")}
                    </button>
                  )}
                  {flag.status !== "dismissed" && (
                    <button
                      onClick={() => handleStatus(flag.id, "dismissed")}
                      disabled={updating === flag.id}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 font-semibold disabled:opacity-50 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      {t("무시", "Dismiss")}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
