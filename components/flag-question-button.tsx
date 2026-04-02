"use client"

import { useState, useRef, useEffect } from "react"
import { Flag } from "lucide-react"
import { flagQuestion, type FlagReason } from "@/lib/flag-question"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface FlagButtonProps {
  questionId: number
  lessonId: string | number
}

const REASONS: { value: FlagReason; ko: string; en: string }[] = [
  { value: "wrong_answer",  ko: "정답이 틀린 것 같아요",       en: "Wrong answer" },
  { value: "wrong_lesson",  ko: "이 레슨과 관계없는 문제예요", en: "Unrelated to this lesson" },
  { value: "not_taught",    ko: "배우지 않은 내용이에요",       en: "Concept not taught yet" },
  { value: "duplicate",     ko: "비슷한 문제가 이미 있어요",   en: "Duplicate question" },
  { value: "unclear",       ko: "문제가 불명확해요",            en: "Unclear question" },
  { value: "other",         ko: "기타",                         en: "Other" },
]

export function FlagButton({ questionId, lessonId }: FlagButtonProps) {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<FlagReason | null>(null)
  const [comment, setComment] = useState("")
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "done">("idle")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSubmit = async () => {
    if (!reason) return
    setSubmitStatus("submitting")
    await flagQuestion({
      questionId,
      lessonId,
      reason,
      comment: comment.trim() || undefined,
    })
    setSubmitStatus("done")
    setTimeout(() => {
      setOpen(false)
      setSubmitStatus("idle")
      setReason(null)
      setComment("")
    }, 1500)
  }

  if (submitStatus === "done") {
    return (
      <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
        ✓ {t("신고 완료", "Reported")}
      </span>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "p-1.5 rounded-lg text-gray-300 hover:text-orange-400 hover:bg-orange-50 transition-all",
          open && "text-orange-400 bg-orange-50"
        )}
        title={t("문제 신고", "Flag this question")}
      >
        <Flag className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-50 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
          <p className="text-sm font-bold text-gray-800 mb-3">
            {t("이 문제에 문제가 있나요?", "Something wrong with this question?")}
          </p>

          <div className="space-y-1.5 mb-3">
            {REASONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setReason(r.value)}
                className={cn(
                  "w-full text-left text-xs px-3 py-2 rounded-xl border transition-all",
                  reason === r.value
                    ? "border-orange-400 bg-orange-50 text-orange-700 font-semibold"
                    : "border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50"
                )}
              >
                {lang === "ko" ? r.ko : r.en}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("추가 설명 (선택사항)", "Additional details (optional)")}
            className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:border-orange-300 outline-none resize-none h-16 mb-3"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!reason || submitStatus === "submitting"}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {submitStatus === "submitting"
                ? t("전송 중...", "Sending...")
                : t("신고하기", "Submit Report")}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-xl text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200"
            >
              {t("취소", "Cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
