"use client"

import { useState, useEffect, useRef, Fragment } from "react"
import { Check, X, Lightbulb, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { highlightCpp, highlightCppInline, highlightPython, highlightPythonInline } from "@/components/ui/code-block"
import type {
  StepContent,
  QuizContent,
  PracticeContent,
  InterleavingContent,
  ErrorQuizContent,
  ExplainContent,
} from "./data/types"

// ─────────────────────────────────────────────────────────────
// Helper: normalize blank answers for comparison
// ─────────────────────────────────────────────────────────────
function normalize(s: string) {
  return s.replace(/\s+/g, "").toLowerCase()
}

function isAnswerCorrect(input: string, content: PracticeContent | InterleavingContent): boolean {
  const n = normalize(input)
  if (normalize(content.answer) === n) return true
  if (content.alternateAnswers?.some(a => normalize(a) === n)) return true
  return false
}

// ─────────────────────────────────────────────────────────────
// MCQ (quiz + errorQuiz)
// ─────────────────────────────────────────────────────────────
function McqStep({
  content,
  onCorrect,
  onWrong,
  language = "cpp",
}: {
  content: QuizContent | ErrorQuizContent
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
}) {
  const { t, lang } = useLanguage()
  const E = lang === "en"
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  const isRight = selected === content.answer

  // EN 필드 우선 사용 (없으면 Korean fallback)
  const question = (E && content.en?.question) ? content.en.question : content.question
  const options = (E && content.en?.options?.length) ? content.en.options : content.options
  const explanation = (E && content.en?.explanation) ? content.en.explanation : content.explanation

  const select = (i: number) => {
    if (answered) return
    setSelected(i)
    if (i === content.answer) onCorrect()
    else onWrong()
  }

  const LABELS = ["①", "②", "③", "④", "⑤"]

  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-gray-800 text-base leading-relaxed">{question}</p>
      {"code" in content && content.code && (
        <div className="rounded-xl bg-[#1a1b2e] px-4 py-3 font-mono text-sm overflow-x-auto leading-6">
          {language === "cpp"
            ? highlightCpp(content.code, true)
            : highlightPython(content.code, true)}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === content.answer
          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={answered}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-all flex items-center gap-3",
                !answered && "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/60 cursor-pointer shadow-sm",
                answered && isCorrect && "border-emerald-400 bg-emerald-50",
                answered && isSelected && !isCorrect && "border-red-400 bg-red-50",
                answered && !isSelected && !isCorrect && "border-gray-100 bg-gray-50/80 opacity-40 cursor-not-allowed",
              )}
            >
              <span className={cn(
                "text-base shrink-0 w-5 text-center",
                !answered ? "text-gray-300" :
                isCorrect ? "text-emerald-500" :
                isSelected ? "text-red-400" : "text-gray-300"
              )}>
                {LABELS[i]}
              </span>
              <span className={cn(
                "flex-1 text-sm",
                !answered ? "text-gray-800" :
                isCorrect ? "text-emerald-700 font-semibold" :
                isSelected ? "text-red-700" : "text-gray-500"
              )}>
                {opt}
              </span>
              {answered && isCorrect && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400 shrink-0" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={cn(
          "rounded-2xl border px-4 py-3 text-sm",
          isRight ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
        )}>
          <p className={cn("font-bold mb-1", isRight ? "text-emerald-700" : "text-red-600")}>
            {isRight ? t("✅ 정답!", "✅ Correct!") : t("❌ 오답!", "❌ Wrong!")}
          </p>
          <p className="text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Practice / Interleaving (fill-in-blank or write code)
// ─────────────────────────────────────────────────────────────
const BLANK_LABELS = ["①", "②", "③", "④", "⑤"]

// 다중 줄 템플릿 파트를 인라인 하이라이팅으로 렌더링
function renderTemplatePart(text: string, lang: "python" | "cpp"): React.ReactNode[] {
  const inlineFn = lang === "cpp"
    ? (l: string) => highlightCppInline(l, true)
    : (l: string) => highlightPythonInline(l, true)
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  lines.forEach((line, i) => {
    result.push(...inlineFn(line))
    if (i < lines.length - 1) result.push('\n')
  })
  return result
}

function PracticeStep({
  content,
  onCorrect,
  onWrong,
  language = "cpp",
}: {
  content: PracticeContent | InterleavingContent
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
}) {
  const { t, lang: curLang } = useLanguage()
  const isEn = curLang === "en"

  const isFullCode = content.template === null
  const template = typeof content.template === "string" ? content.template : ""
  // 빈칸 개수 카운트
  const blankCount = isFullCode ? 0 : (template.match(/___/g) || []).length
  const isMultiBlank = blankCount > 1

  // 빈칸 개수에 따라 inputs 배열 or 단일 string 관리
  const [inputs, setInputs] = useState<string[]>(() => Array(Math.max(blankCount, 1)).fill(""))
  const [result, setResult] = useState<"idle" | "correct" | "wrong">("idle")
  const [showHint, setShowHint] = useState(false)
  const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => { firstInputRef.current?.focus() }, [])

  // answer: "1, <=" 형태를 개별 블랭크로 분리
  const expectedParts = content.answer.split(",").map(s => s.trim())

  const check = () => {
    const combined = isMultiBlank
      ? inputs.map(s => s.trim()).join(", ")
      : inputs[0]
    if (!combined.trim()) return

    if (isAnswerCorrect(combined, content)) {
      setResult("correct")
      onCorrect()
    } else {
      setResult("wrong")
      onWrong()
    }
  }

  const retry = () => {
    setInputs(Array(Math.max(blankCount, 1)).fill(""))
    setResult("idle")
    setShowHint(false)
    setTimeout(() => firstInputRef.current?.focus(), 50)
  }

  // EN 필드 우선 (없으면 KO fallback)
  const task = (isEn && content.en?.task) ? content.en.task : content.task
  const guide = isEn && content.en?.guide
    ? content.en.guide
    : "guide" in content ? (content as { guide?: string }).guide : undefined
  const hint = isEn && content.en?.hint
    ? content.en.hint
    : "hint" in content ? (content as { hint?: string }).hint : undefined

  // 템플릿을 ___ 기준으로 분할해 인라인 input 렌더링
  const templateParts = template.split("___")

  return (
    <div className="flex flex-col gap-3">
      {"message" in content && (
        (() => {
          const msg = (isEn && content.en && "message" in content.en && content.en.message)
            ? (content.en as { message?: string }).message
            : (content as any).message
          return msg ? <p className="text-xs text-indigo-500 font-semibold bg-indigo-50 rounded-lg px-3 py-2">{msg}</p> : null
        })()
      )}
      {"level" in content && content.level !== undefined && (
        <span className="text-xs font-bold text-indigo-400">Lv.{content.level}</span>
      )}
      <p className="font-semibold text-gray-800">{task}</p>
      {guide && <p className="text-xs text-gray-500">{guide}</p>}

      {/* 인라인 빈칸 코드 블록 */}
      {typeof content.template === "string" && (
        <div className="rounded-xl bg-[#1a1b2e] px-4 py-3 font-mono text-sm text-[#cdd6f4] overflow-x-auto leading-7 whitespace-pre-wrap">
          {templateParts.map((part, i) => (
            <Fragment key={i}>
              {renderTemplatePart(part, language)}
              {i < templateParts.length - 1 && (
                result === "idle" ? (
                  <input
                    ref={i === 0 ? firstInputRef as React.RefObject<HTMLInputElement> : undefined}
                    type="text"
                    value={inputs[i] ?? ""}
                    onChange={e => {
                      const val = e.target.value
                      setInputs(prev => { const next = [...prev]; next[i] = val; return next })
                    }}
                    onKeyDown={e => { if (e.key === "Enter" && i === blankCount - 1) check() }}
                    className="inline-block bg-[#2a2b3e] border-b-2 border-indigo-400 text-indigo-200 font-mono text-sm px-1 mx-0.5 focus:outline-none focus:border-indigo-300 focus:bg-[#32345a] rounded-sm transition-colors align-baseline"
                    style={{ width: `${Math.max((inputs[i] ?? "").length + 2, 7)}ch`, minWidth: "7ch" }}
                  />
                ) : (
                  <span className={cn(
                    "inline-block border-b-2 px-1 mx-0.5 font-mono text-sm rounded-sm align-baseline",
                    result === "correct"
                      ? "border-emerald-400 text-emerald-300 bg-emerald-900/30"
                      : "border-red-400 text-red-300 bg-red-900/30"
                  )}>
                    {inputs[i] || "　"}
                  </span>
                )
              )}
            </Fragment>
          ))}
        </div>
      )}

      {/* 전체 코드 작성 (template=null) */}
      {result === "idle" && isFullCode && (
        <div className="flex gap-2">
          <textarea
            ref={firstInputRef as React.RefObject<HTMLTextAreaElement>}
            value={inputs[0]}
            onChange={e => setInputs([e.target.value])}
            placeholder={t("코드를 작성하세요...", "Write your code...")}
            rows={3}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 font-mono text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 resize-none"
          />
          <button
            onClick={check}
            disabled={!inputs[0].trim()}
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm disabled:opacity-40 transition-colors shrink-0 self-end"
          >
            {t("확인", "Check")}
          </button>
        </div>
      )}

      {/* 인라인 빈칸용 확인 버튼 */}
      {result === "idle" && !isFullCode && (
        <button
          onClick={check}
          disabled={inputs.some((v, i) => i < blankCount && !v.trim())}
          className="self-end px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm disabled:opacity-40 transition-colors"
        >
          {t("확인", "Check")}
        </button>
      )}

      {result === "correct" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-emerald-700 font-bold text-sm">✅ {t("정답!", "Correct!")}</p>
          {content.expect && (
            <pre className="mt-1 font-mono text-xs text-emerald-800 whitespace-pre-wrap">{content.expect}</pre>
          )}
        </div>
      )}

      {result === "wrong" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-red-600 font-bold text-sm">❌ {t("오답!", "Wrong!")}</p>
            <button onClick={retry} className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 font-medium">
              <RotateCcw className="w-3 h-3" /> {t("다시", "Retry")}
            </button>
          </div>
        </div>
      )}

      {/* Hint */}
      {hint && result === "idle" && (
        <div>
          <button onClick={() => setShowHint(s => !s)} className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-700">
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? t("힌트 숨기기", "Hide hint") : t("힌트 보기", "Show hint")}
          </button>
          {showHint && (
            <p className="mt-1 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200">{hint}</p>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Explain with Predict (prediction quiz)
// ─────────────────────────────────────────────────────────────
function PredictStep({
  content,
  onCorrect,
  onWrong,
  language = "cpp",
}: {
  content: ExplainContent & { predict: NonNullable<ExplainContent["predict"]> }
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
}) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const [showCode, setShowCode] = useState(false)
  const answered = selected !== null
  const isRight = selected === content.predict.answer

  const select = (i: number) => {
    if (answered) return
    setSelected(i)
    if (i === content.predict.answer) onCorrect()
    else onWrong()
  }

  const LABELS = ["①", "②", "③", "④"]

  return (
    <div className="flex flex-col gap-3">
      {/* Explanation lines */}
      {content.lines.length > 0 && (
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
          {content.lines.map((line, i) => <p key={i} className="text-sm text-blue-800">{line}</p>)}
        </div>
      )}

      {/* Code */}
      {content.code && (
        <div className="rounded-xl bg-[#1a1b2e] px-4 py-3 font-mono text-sm overflow-x-auto leading-6">
          {language === "cpp"
            ? highlightCpp(content.code, true)
            : highlightPython(content.code, true)}
        </div>
      )}

      {/* Prediction question */}
      <p className="font-semibold text-gray-800">
        {content.predict.question ?? t("결과가 뭘까?", "What will the output be?")}
      </p>

      <div className="flex flex-col gap-2">
        {content.predict.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === content.predict.answer
          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={answered}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-left transition-all flex items-center gap-3 text-sm",
                !answered && "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/60 cursor-pointer",
                answered && isCorrect && "border-emerald-400 bg-emerald-50",
                answered && isSelected && !isCorrect && "border-red-400 bg-red-50",
                answered && !isSelected && !isCorrect && "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50",
              )}
            >
              <span className={cn(
                "shrink-0 w-5 text-center",
                !answered ? "text-gray-300" : isCorrect ? "text-emerald-500" : isSelected ? "text-red-400" : "text-gray-300"
              )}>
                {LABELS[i]}
              </span>
              <span className={cn(
                isCorrect && answered ? "text-emerald-700 font-semibold" :
                isSelected && answered ? "text-red-700" : "text-gray-800"
              )}>
                {opt}
              </span>
              {answered && isCorrect && <Check className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400 ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={cn(
          "rounded-2xl border px-4 py-3 text-sm",
          isRight ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
        )}>
          <p className={cn("font-bold mb-1", isRight ? "text-emerald-700" : "text-red-600")}>
            {isRight ? t("✅ 맞았어요!", "✅ Correct!") : t("❌ 틀렸어요!", "❌ Wrong!")}
          </p>
          {content.predict.feedback && (
            <p className="text-gray-600">{content.predict.feedback}</p>
          )}
          {content.result && (
            <p className="mt-1 text-xs text-gray-500">
              {t("실제 결과:", "Actual output:")} <code className="font-mono bg-white px-1 rounded">{content.result}</code>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main ReviewStepRenderer
// ─────────────────────────────────────────────────────────────
export interface ReviewStepRendererProps {
  step: StepContent
  onCorrect: () => void
  onWrong: () => void
  language?: "python" | "cpp"
}

export function ReviewStepRenderer({ step, onCorrect, onWrong, language = "cpp" }: ReviewStepRendererProps) {
  switch (step.type) {
    case "quiz":
      return <McqStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} />

    case "errorQuiz":
      return <McqStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} />

    case "practice":
      return <PracticeStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} />

    case "interleaving":
      return <PracticeStep content={step.content} onCorrect={onCorrect} onWrong={onWrong} language={language} />

    case "explain":
      if (step.content.predict) {
        return (
          <PredictStep
            content={step.content as ExplainContent & { predict: NonNullable<ExplainContent["predict"]> }}
            onCorrect={onCorrect}
            onWrong={onWrong}
            language={language}
          />
        )
      }
      // Plain explain without predict — shouldn't appear in review but handle gracefully
      return null

    default:
      return null
  }
}
