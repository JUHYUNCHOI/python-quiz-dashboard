"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { X, Eye, Save, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LessonSelect } from "./lesson-select"
import type { DBQuestion } from "./question-bank"

interface QuestionEditorProps {
  question: DBQuestion | null  // null = 새 문제
  onClose: () => void
  onSaved: () => void
}

const DIFFICULTY_OPTIONS = ["쉬움", "보통", "어려움"]
const LANGUAGE_OPTIONS = ["python", "cpp"]

export function QuestionEditor({ question, onClose, onSaved }: QuestionEditorProps) {
  const isNew = !question

  const [language, setLanguage] = useState(question?.language ?? "python")
  const [lessonId, setLessonId] = useState(question?.lesson_id ?? "")

  const handleLanguageChange = (v: string) => {
    setLanguage(v)
    setLessonId("")  // reset when language changes
  }
  const [difficulty, setDifficulty] = useState(question?.difficulty ?? "보통")
  const [questionText, setQuestionText] = useState(question?.question ?? "")
  const [code, setCode] = useState(question?.code ?? "")
  const [options, setOptions] = useState<string[]>(question?.options ?? ["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState(question?.correct_answer ?? 0)
  const [explanation, setExplanation] = useState(question?.explanation ?? "")
  const [keyConceptTitle, setKeyConceptTitle] = useState(question?.key_concept_title ?? "")
  const [keyConceptDescription, setKeyConceptDescription] = useState(question?.key_concept_description ?? "")
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!questionText.trim() || options.some(o => !o.trim()) || !lessonId) {
      setSaveError("문제 내용, 선택지 4개, 레슨은 필수입니다.")
      return
    }

    setIsSaving(true)
    setSaveError(null)

    const payload = {
      language,
      lesson_id: lessonId,
      difficulty,
      question: questionText,
      code: code.trim() || null,
      options,
      correct_answer: correctAnswer,
      explanation: explanation.trim() || null,
      key_concept_title: keyConceptTitle.trim() || null,
      key_concept_description: keyConceptDescription.trim() || null,
    }

    try {
      let res: Response
      if (isNew) {
        res = await fetch("/api/admin/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch(`/api/admin/questions/${question.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        const err = await res.json()
        setSaveError(err.error ?? "저장 실패")
        return
      }

      onSaved()
      onClose()
    } catch {
      setSaveError("네트워크 오류")
    } finally {
      setIsSaving(false)
    }
  }

  const DIFFICULTY_COLORS: Record<string, string> = {
    쉬움: "border-green-500 text-green-700",
    보통: "border-orange-500 text-orange-700",
    어려움: "border-red-500 text-red-700",
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{isNew ? "새 문제 만들기" : `문제 #${question.id} 수정`}</h2>
            {!isNew && <p className="text-xs text-gray-400">{question.language} · 레슨 {question.lesson_id}</p>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        <div className="p-6 space-y-5">
          {/* Language + LessonId + Difficulty */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">언어</label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">레슨 *</label>
              <LessonSelect value={lessonId} onChange={setLessonId} language={language} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">난이도</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_OPTIONS.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">문제 내용 *</label>
            <Textarea
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              placeholder="다음 코드의 출력 결과는?"
              className="min-h-[100px]"
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">코드 블록 (선택)</label>
            <Textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder={"x = 10\nprint(x)"}
              className="min-h-[100px] font-mono text-sm"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">선택지 * (초록 버튼 = 정답)</label>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={() => setCorrectAnswer(i)}
                    className={`w-8 h-8 rounded-full text-sm font-bold shrink-0 border-2 transition-colors ${
                      correctAnswer === i
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 text-gray-500 hover:border-green-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                  <Input
                    value={opt}
                    onChange={e => {
                      const next = [...options]
                      next[i] = e.target.value
                      setOptions(next)
                    }}
                    placeholder={`선택지 ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">해설</label>
            <Textarea
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="정답 해설..."
              className="min-h-[80px]"
            />
          </div>

          {/* Key Concept */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">핵심 개념 제목</label>
              <Input
                value={keyConceptTitle}
                onChange={e => setKeyConceptTitle(e.target.value)}
                placeholder="변수와 할당"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">핵심 개념 설명</label>
              <Input
                value={keyConceptDescription}
                onChange={e => setKeyConceptDescription(e.target.value)}
                placeholder="변수는 값을 저장하는 이름표입니다."
              />
            </div>
          </div>

          {/* Preview Toggle */}
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "미리보기 닫기" : "미리보기"}
          </Button>

          {/* Preview */}
          {showPreview && (
            <Card className="p-5 bg-gray-50">
              <p className="font-bold text-gray-900 mb-3 whitespace-pre-wrap">{questionText || "(문제 내용)"}</p>
              {code.trim() && (
                <pre className="bg-gray-900 text-green-400 rounded-lg p-3 text-sm font-mono mb-3 overflow-x-auto">{code}</pre>
              )}
              <div className="space-y-2">
                {options.map((opt, i) => (
                  <div key={i} className={`p-3 rounded-lg border text-sm ${
                    correctAnswer === i ? "border-green-500 bg-green-50 font-semibold" : "border-gray-200 bg-white"
                  }`}>
                    {i + 1}. {opt || "(선택지 없음)"}
                    {correctAnswer === i && <span className="ml-2 text-green-600 text-xs">✓ 정답</span>}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline">{language}</Badge>
                <Badge variant="outline">레슨 {lessonId || "?"}</Badge>
                <Badge variant="outline" className={DIFFICULTY_COLORS[difficulty]}>{difficulty}</Badge>
              </div>
            </Card>
          )}

          {saveError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{saveError}</div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>취소</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600 text-white">
            {isSaving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />저장 중...</> : <><Save className="h-4 w-4 mr-2" />저장하기</>}
          </Button>
        </div>
      </Card>
    </div>
  )
}
