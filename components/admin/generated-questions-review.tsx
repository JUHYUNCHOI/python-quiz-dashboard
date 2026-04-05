"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Edit, CheckCheck, Loader2 } from "lucide-react"
import { QuestionEditor } from "./question-editor"
import { cn } from "@/lib/utils"

interface GeneratedQuestionsReviewProps {
  questions: any[]
  onComplete: () => void
}

const DIFFICULTY_COLORS: Record<string, string> = {
  "쉬움": "border-green-500 text-green-700",
  "보통": "border-orange-500 text-orange-700",
  "어려움": "border-red-500 text-red-700",
}

export function GeneratedQuestionsReview({ questions, onComplete }: GeneratedQuestionsReviewProps) {
  // tempId 기반으로 상태 관리 (DB ID 없음)
  const [statuses, setStatuses] = useState<Record<number, "accepted" | "rejected">>({})
  const [editingQuestion, setEditingQuestion] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const accept = (tempId: number) => setStatuses(p => ({ ...p, [tempId]: "accepted" }))
  const reject = (tempId: number) => setStatuses(p => ({ ...p, [tempId]: "rejected" }))
  const acceptedCount = Object.values(statuses).filter(s => s === "accepted").length

  const handleComplete = async () => {
    const accepted = questions.filter(q => statuses[q.tempId] === "accepted")
    if (accepted.length === 0) return

    setIsSaving(true)
    setSaveError(null)

    let failed = 0
    for (const q of accepted) {
      const payload = {
        language: q.language,
        lesson_id: String(q.lessonId || ""),
        difficulty: q.difficulty,
        question: q.question,
        code: q.code || null,
        options: q.options,
        correct_answer: q.correctAnswer,
        explanation: q.explanation || null,
        key_concept_title: q.keyConceptTitle || null,
        key_concept_description: q.keyConceptDescription || null,
      }
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) failed++
    }

    setIsSaving(false)

    if (failed > 0) {
      setSaveError(`${failed}개 저장 실패. 나머지 ${accepted.length - failed}개는 저장됨.`)
    } else {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card className="p-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-0.5">AI 생성 문제 검토</h2>
            <p className="text-orange-100 text-sm">
              ✅ 승인 {acceptedCount}개 / 전체 {questions.length}개
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-orange-600 bg-white hover:bg-orange-50"
              onClick={() => questions.forEach(q => accept(q.tempId))}>
              전체 승인
            </Button>
            <Button
              onClick={handleComplete}
              disabled={acceptedCount === 0 || isSaving}
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold"
            >
              {isSaving
                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />저장 중...</>
                : <><CheckCheck className="h-4 w-4 mr-2" />DB에 저장 ({acceptedCount}개)</>
              }
            </Button>
          </div>
        </div>
        {saveError && <p className="mt-2 text-sm text-red-200">{saveError}</p>}
      </Card>

      {/* 문제 목록 */}
      <div className="space-y-4">
        {questions.map((q) => {
          const status = statuses[q.tempId]
          return (
            <Card
              key={q.tempId}
              className={cn(
                "p-5 transition-all",
                status === "accepted" && "border-green-400 bg-green-50",
                status === "rejected" && "border-red-200 bg-red-50 opacity-50",
              )}
            >
              <div className="flex gap-4">
                <div className="flex-1 min-w-0">
                  {/* 배지 */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{q.language}</Badge>
                    {q.lessonId && <Badge variant="outline" className="text-xs">레슨 {q.lessonId}</Badge>}
                    <Badge variant="outline" className={cn("text-xs", DIFFICULTY_COLORS[q.difficulty])}>
                      {q.difficulty}
                    </Badge>
                  </div>

                  {/* 문제 */}
                  <p className="font-semibold text-gray-900 mb-3 whitespace-pre-wrap">{q.question}</p>

                  {/* 코드 */}
                  {q.code && (
                    <pre className="bg-gray-900 text-green-400 rounded-lg p-3 text-sm font-mono mb-3 overflow-x-auto">
                      {q.code}
                    </pre>
                  )}

                  {/* 선택지 */}
                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt: string, i: number) => (
                      <div key={i} className={cn(
                        "px-3 py-2 rounded-lg border text-sm",
                        i === q.correctAnswer
                          ? "border-green-500 bg-green-50 font-semibold text-green-800"
                          : "border-gray-200 bg-white text-gray-700",
                      )}>
                        {i + 1}. {opt}
                        {i === q.correctAnswer && <span className="ml-2 text-xs text-green-600">✓ 정답</span>}
                      </div>
                    ))}
                  </div>

                  {/* 해설 */}
                  {q.explanation && (
                    <p className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col gap-2 shrink-0">
                  {!status && (
                    <>
                      <Button size="sm" onClick={() => accept(q.tempId)}
                        className="bg-green-500 hover:bg-green-600 text-white">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingQuestion(q)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => reject(q.tempId)}
                        className="text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {status === "accepted" && (
                    <button onClick={() => setStatuses(p => { const n = {...p}; delete n[q.tempId]; return n })}
                      className="text-xs text-green-700 font-bold bg-green-100 px-2 py-1 rounded">
                      ✅ 승인
                    </button>
                  )}
                  {status === "rejected" && (
                    <button onClick={() => setStatuses(p => { const n = {...p}; delete n[q.tempId]; return n })}
                      className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                      ✗ 거부
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {editingQuestion && (
        <QuestionEditor
          question={{
            ...editingQuestion,
            id: undefined,
            lesson_id: String(editingQuestion.lessonId || ""),
            correct_answer: editingQuestion.correctAnswer,
          }}
          onClose={() => setEditingQuestion(null)}
          onSaved={() => setEditingQuestion(null)}
        />
      )}
    </div>
  )
}
