"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { CircularProgress } from "@/components/circular-progress"
import { WrongAnswerCard } from "@/components/wrong-answer-card"
import { useLanguage } from "@/contexts/language-context"
import type { SessionData } from "@/hooks/use-quiz-state"

export default function ResultsPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [expandedAnswers, setExpandedAnswers] = useState<number[]>([])
  const [showWrongAnswers, setShowWrongAnswers] = useState(true)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("quizSessionData")
      if (raw) {
        setSessionData(JSON.parse(raw))
      }
    } catch {
      // 파싱 실패 시 무시
    }
  }, [])

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦒</div>
          <p className="text-gray-500 mb-4">{t("퀴즈 데이터가 없어요", "No quiz data found")}</p>
          <Button onClick={() => router.push("/quiz/setup")}>
            {t("퀴즈 시작하기", "Start Quiz")}
          </Button>
        </div>
      </div>
    )
  }

  const scorePercent = sessionData.totalQuestions > 0
    ? Math.round((sessionData.correctAnswers / sessionData.totalQuestions) * 100)
    : 0
  const timeMinutes = Math.floor(sessionData.timeElapsedMs / 60000)
  const timeSeconds = Math.floor((sessionData.timeElapsedMs % 60000) / 1000)
  const timeFormatted = `${timeMinutes}:${String(timeSeconds).padStart(2, "0")}`

  const wrongAnswers = sessionData.questionDetails
    .filter(q => !q.is_correct && q.selected_answer !== -1)
    .map(q => ({
      id: q.question_id,
      question: q.question_text,
      code: "",
      yourAnswer: `${t("선택", "Choice")} ${q.selected_answer + 1}`,
      correctAnswer: `${t("선택", "Choice")} ${q.correct_answer + 1}`,
      explanation: "",
    }))

  const toggleAnswer = (id: number) => {
    setExpandedAnswers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const getMessage = () => {
    if (scorePercent >= 90) return t("완벽해요! 정말 잘하셨어요!", "Perfect! Great job!")
    if (scorePercent >= 70) return t("잘했어요! 조금만 더 복습하면 완벽해요!", "Good job! A little more review and you'll be perfect!")
    return t("괜찮아요! 복습하면 더 잘할 수 있어요!", "That's okay! You can do better with review!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-mint-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Results Summary */}
          <div className="animate-fade-in rounded-3xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                <CircularProgress score={scorePercent} />

                <div className="text-center md:text-left">
                  <h1 className="mb-2 text-3xl font-bold text-gray-800">{t("퀴즈 완료!", "Quiz Complete!")}</h1>
                  <p className="mb-4 text-lg text-gray-600">{getMessage()}</p>

                  <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                    <div className="rounded-full bg-orange-100 px-4 py-2">
                      <span className="text-sm text-gray-600">{t("정확도", "Accuracy")}</span>
                      <span className="ml-2 font-semibold text-orange-600">{scorePercent}%</span>
                    </div>
                    <div className="rounded-full bg-mint-100 px-4 py-2">
                      <span className="text-sm text-gray-600">{t("소요 시간", "Time Spent")}</span>
                      <span className="ml-2 font-mono font-semibold text-mint-600">{timeFormatted}</span>
                    </div>
                    <div className="rounded-full bg-lavender-100 px-4 py-2">
                      <span className="text-sm text-gray-600">{t("정답", "Correct")}</span>
                      <span className="ml-2 font-semibold text-lavender-600">
                        {sessionData.correctAnswers}/{sessionData.totalQuestions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Celebrating Giraffe */}
              <div className="text-8xl animate-bounce-in">🦒✨</div>
            </div>
          </div>

          {/* Wrong Answers Section */}
          {wrongAnswers.length > 0 && (
            <div className="animate-fade-in animation-delay-200">
              <button
                onClick={() => setShowWrongAnswers(!showWrongAnswers)}
                className="mb-4 flex w-full items-center justify-between md:pointer-events-none"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {t(`틀린 문제 (${wrongAnswers.length}개)`, `Wrong Answers (${wrongAnswers.length})`)}
                </h2>
                {showWrongAnswers ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 md:hidden" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 md:hidden" />
                )}
              </button>
              {showWrongAnswers && (
                <div className="space-y-4">
                  {wrongAnswers.map((answer) => (
                    <WrongAnswerCard
                      key={answer.id}
                      answer={answer}
                      isExpanded={expandedAnswers.includes(answer.id)}
                      onToggle={() => toggleAnswer(answer.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => router.push("/quiz/setup")}
              className="flex-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              {t("다시 도전하기", "Try Again")}
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="flex-1 rounded-full border-2 border-orange-300 py-6 text-lg font-semibold text-orange-600 transition-all hover:bg-orange-50"
            >
              {t("홈으로", "Home")}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
