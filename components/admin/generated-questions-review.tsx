"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Edit, CheckCheck } from "lucide-react"
import { QuestionEditor } from "./question-editor"

interface GeneratedQuestionsReviewProps {
  questions: any[]
  onComplete: () => void
}

export function GeneratedQuestionsReview({ questions, onComplete }: GeneratedQuestionsReviewProps) {
  const [reviewedQuestions, setReviewedQuestions] = useState<{
    [key: number]: "accepted" | "rejected"
  }>({})
  const [editingQuestion, setEditingQuestion] = useState<any>(null)

  const handleAccept = (id: number) => {
    setReviewedQuestions((prev) => ({ ...prev, [id]: "accepted" }))
  }

  const handleReject = (id: number) => {
    setReviewedQuestions((prev) => ({ ...prev, [id]: "rejected" }))
  }

  const acceptedCount = Object.values(reviewedQuestions).filter((status) => status === "accepted").length

  const handleComplete = () => {
    console.log("[v0] Accepted questions:", acceptedCount)
    onComplete()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-gradient-to-r from-mint-500 to-mint-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">AI가 생성한 문제를 검토하세요</h2>
            <p className="text-mint-100 text-sm">
              {acceptedCount}/{questions.length}개 승인됨
            </p>
          </div>
          <Button
            onClick={handleComplete}
            disabled={acceptedCount === 0}
            size="lg"
            className="bg-white text-mint-600 hover:bg-mint-50"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            검토 완료
          </Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {questions.map((question) => {
          const status = reviewedQuestions[question.id]
          return (
            <Card
              key={question.id}
              className={`p-6 transition-all ${
                status === "accepted"
                  ? "border-green-500 bg-green-50"
                  : status === "rejected"
                    ? "border-red-300 bg-red-50 opacity-50"
                    : "hover:border-orange-300"
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {question.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        question.difficulty === "초급"
                          ? "border-green-500 text-green-700"
                          : question.difficulty === "중급"
                            ? "border-orange-500 text-orange-700"
                            : "border-red-500 text-red-700"
                      }
                    >
                      {question.difficulty}
                    </Badge>
                  </div>

                  <p className="font-semibold text-gray-900 mb-4 whitespace-pre-wrap">{question.question}</p>

                  <div className="space-y-2 mb-4">
                    {question.options.map((option: string, index: number) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border text-sm ${
                          index === question.correctAnswer
                            ? "border-green-500 bg-green-50 font-semibold"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {index + 1}. {option}
                      </div>
                    ))}
                  </div>

                  {question.explanation && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 mb-1">해설</p>
                      <p className="text-sm text-blue-800">{question.explanation}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {status !== "accepted" && status !== "rejected" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAccept(question.id)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingQuestion(question)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {status === "accepted" && <Badge className="bg-green-500">승인됨</Badge>}
                  {status === "rejected" && (
                    <Badge variant="outline" className="border-red-500 text-red-700">
                      거부됨
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {editingQuestion && (
        <QuestionEditor
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={(question) => {
            console.log("[v0] Edited question:", question)
            setEditingQuestion(null)
            handleAccept(question.id)
          }}
        />
      )}
    </div>
  )
}
