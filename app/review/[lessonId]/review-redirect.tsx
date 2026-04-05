"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function ReviewRedirect({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    const id = isNaN(Number(lessonId)) ? lessonId : Number(lessonId)
    const course = String(lessonId).startsWith("cpp")
      ? "cpp"
      : String(lessonId).startsWith("pseudo") || String(lessonId).startsWith("igcse")
      ? "pseudo"
      : "python"

    sessionStorage.setItem(
      "quizSettings",
      JSON.stringify({
        questionCount: 20,
        difficulty: "mixed",
        course,
        startTime: Date.now(),
        lessonFilter: id,
        isReview: true,
      })
    )
    router.replace("/quiz")
  }, [lessonId, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 animate-pulse">{t("복습 퀴즈를 준비하고 있어요...", "Preparing review quiz...")}</p>
    </div>
  )
}
