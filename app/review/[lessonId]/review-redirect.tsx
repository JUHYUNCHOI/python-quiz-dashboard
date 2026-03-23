"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ReviewRedirect({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const router = useRouter()

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
        questionCount: 10,
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
      <p className="text-gray-400 animate-pulse">복습 퀴즈를 준비하고 있어요...</p>
    </div>
  )
}
