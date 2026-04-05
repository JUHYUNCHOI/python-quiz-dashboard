"use client"

import { useState } from "react"
import { X, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import type { LessonStep } from "./types"

interface StepEditorProps {
  step: LessonStep
  lessonId: string
  lang: "ko" | "en"
  onClose: () => void
  onSaved: (overrides: Partial<LessonStep>) => void
}

export function StepEditor({ step, lessonId, lang, onClose, onSaved }: StepEditorProps) {
  // 문자열 필드들
  const [title, setTitle]               = useState(step.title ?? "")
  const [content, setContent]           = useState(step.content ?? "")
  const [question, setQuestion]         = useState(step.question ?? "")
  const [code, setCode]                 = useState(step.code ?? "")
  const [initialCode, setInitialCode]   = useState(step.initialCode ?? "")
  const [expectedOutput, setExpected]   = useState(step.expectedOutput ?? "")
  const [explanation, setExplanation]   = useState(step.explanation ?? "")
  const [hint, setHint]                 = useState(step.hint ?? "")
  const [hint2, setHint2]               = useState(step.hint2 ?? "")
  const [task, setTask]                 = useState(step.task ?? "")

  // 선택지 (quiz/predict)
  const [options, setOptions] = useState<string[]>(
    step.options?.length ? [...step.options] : ["", "", "", ""]
  )
  const [answer, setAnswer] = useState<number>(step.answer ?? 0)

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = step.type

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    const overrides: Record<string, any> = {}
    const add = (key: string, val: string | number | string[]) => {
      if (Array.isArray(val)) { if (val.some(v => v !== "")) overrides[key] = val }
      else if (val !== "" && val !== null && val !== undefined) overrides[key] = val
    }

    add("title", title)
    add("content", content)
    if (t === "quiz" || t === "predict") {
      add("question", question)
      add("options", options)
      add("answer", answer)
      add("explanation", explanation)
    }
    if (t === "explain" || t === "tryit" || t === "mission" || t === "practice" || t === "coding") {
      add("code", code)
    }
    if (t === "practice" || t === "mission" || t === "coding" || t === "tryit") {
      add("initialCode", initialCode)
      add("expectedOutput", expectedOutput)
    }
    add("hint", hint)
    add("hint2", hint2)
    if (t !== "explain") add("task", task)
    if (t === "quiz" || t === "predict") add("explanation", explanation)

    try {
      const res = await fetch("/api/admin/lesson-step", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, stepId: step.id, lang, overrides }),
      })
      if (!res.ok) {
        const e = await res.json()
        setError(e.error ?? "저장 실패")
        return
      }
      onSaved(overrides as Partial<LessonStep>)
      onClose()
    } catch {
      setError("네트워크 오류")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-5 py-3.5 flex items-center justify-between z-10">
          <div>
            <p className="text-xs text-gray-400 font-mono">{lessonId} / {step.id} · {t}</p>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">스텝 내용 수정</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${lang === "ko" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                {lang === "ko" ? "🇰🇷 한국어" : "🇺🇸 English"}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        <div className="p-5 space-y-5">
          {/* 제목 — 항상 */}
          <Field label="제목">
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </Field>

          {/* 설명 텍스트 — explain/tryit/mission/practice */}
          {(t === "explain" || t === "tryit" || t === "mission" || t === "practice" || t === "coding") && (
            <Field label="설명 (마크다운)">
              <Textarea value={content} onChange={e => setContent(e.target.value)} className="min-h-[100px] font-mono text-sm" />
            </Field>
          )}

          {/* quiz/predict: 문제 + 선택지 + 정답 + 해설 */}
          {(t === "quiz" || t === "predict") && (
            <>
              <Field label="문제 내용">
                <Textarea value={question} onChange={e => setQuestion(e.target.value)} className="min-h-[80px]" />
              </Field>

              <Field label="코드 블록 (선택)">
                <Textarea value={code} onChange={e => setCode(e.target.value)} className="min-h-[80px] font-mono text-sm" />
              </Field>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">선택지 (초록 = 정답)</label>
                <div className="space-y-2">
                  {options.map((opt, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => setAnswer(i)}
                        className={`w-8 h-8 rounded-full text-sm font-bold shrink-0 border-2 transition-colors ${
                          answer === i
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 text-gray-500 hover:border-green-400"
                        }`}
                      >{i + 1}</button>
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

              <Field label="해설">
                <Textarea value={explanation} onChange={e => setExplanation(e.target.value)} className="min-h-[80px]" />
              </Field>
            </>
          )}

          {/* 코드 — explain/tryit/mission/practice */}
          {(t === "explain" || t === "tryit" || t === "mission" || t === "practice" || t === "coding") && (
            <Field label="코드 (읽기용)">
              <Textarea value={code} onChange={e => setCode(e.target.value)} className="min-h-[100px] font-mono text-sm" />
            </Field>
          )}

          {/* 초기 코드 & 예상 출력 — practice/mission/coding/tryit */}
          {(t === "practice" || t === "mission" || t === "coding" || t === "tryit") && (
            <>
              <Field label="초기 코드 (에디터 시작값)">
                <Textarea value={initialCode} onChange={e => setInitialCode(e.target.value)} className="min-h-[120px] font-mono text-sm" />
              </Field>
              <Field label="예상 출력 (정답)">
                <Textarea value={expectedOutput} onChange={e => setExpected(e.target.value)} className="min-h-[60px] font-mono text-sm" />
              </Field>
            </>
          )}

          {/* 힌트 — explain 제외 */}
          {t !== "explain" && (
            <>
              <Field label="힌트 1">
                <Textarea value={hint} onChange={e => setHint(e.target.value)} className="min-h-[70px]" />
              </Field>
              <Field label="힌트 2">
                <Textarea value={hint2} onChange={e => setHint2(e.target.value)} className="min-h-[70px]" />
              </Field>
            </>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t px-5 py-3.5 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>취소</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-orange-500 hover:bg-orange-600 text-white">
            {isSaving
              ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />저장 중...</>
              : <><Save className="h-4 w-4 mr-2" />저장</>
            }
          </Button>
        </div>
      </Card>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
