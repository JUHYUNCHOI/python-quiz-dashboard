"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cppQuestions } from "@/data/questions/cpp-questions"
import { pythonQuestions } from "@/data/questions/python-questions"
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

    const allQuestions = course === "cpp" ? cppQuestions : pythonQuestions
    const lessonQuestions = allQuestions.filter(q => String(q.lessonId) === String(id))
    const questionCount = Math.max(10, lessonQuestions.length)

    sessionStorage.setItem(
      "quizSettings",
      JSON.stringify({
        questionCount,
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
