"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Play, Loader2, RotateCcw, Check, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/code-block"
import { createClient } from "@/lib/supabase/client"
const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

const CPP_KEYWORDS = /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|string|vector|map|set|pair|cout|cin|endl|std)\b/g
const CPP_PREPROCESSOR = /^(#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|error|pragma|line)\b.*)/gm
const CPP_STRING = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const CPP_COMMENT_LINE = /\/\/.*/g
const CPP_COMMENT_BLOCK = /\/\*[\s\S]*?\*\//g
const CPP_NUMBER = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[uUlLfF]?\b/g

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function highlightCppCode(code: string): string {
  // We process the code with placeholders to avoid re-highlighting replaced regions
  const segments: Array<{ text: string; cls?: string }> = []
  let remaining = code

  // Build a list of all matches with their ranges, then sort by position
  type Match = { start: number; end: number; text: string; cls: string }
  const matches: Match[] = []

  const addMatches = (re: RegExp, cls: string) => {
    re.lastIndex = 0
    let m
    while ((m = re.exec(remaining)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
    }
  }

  addMatches(new RegExp(CPP_COMMENT_BLOCK.source, "g"), "comment")
  addMatches(new RegExp(CPP_COMMENT_LINE.source, "g"), "comment")
  addMatches(new RegExp(CPP_STRING.source, "g"), "string")
  addMatches(new RegExp(CPP_PREPROCESSOR.source, "gm"), "preprocessor")
  addMatches(new RegExp(CPP_KEYWORDS.source, "g"), "keyword")
  addMatches(new RegExp(CPP_NUMBER.source, "g"), "number")

  // Sort by start, remove overlapping
  matches.sort((a, b) => a.start - b.start)
  const filtered: Match[] = []
  let cursor = 0
  for (const m of matches) {
    if (m.start >= cursor) {
      filtered.push(m)
      cursor = m.end
    }
  }

  // Build HTML
  cursor = 0
  let html = ""
  for (const m of filtered) {
    if (m.start > cursor) {
      html += escapeHtml(remaining.slice(cursor, m.start))
    }
    const colorMap: Record<string, string> = {
      keyword: "#ff7b72",
      comment: "#8b949e",
      string: "#a5d6ff",
      preprocessor: "#ff7b72",
      number: "#ffa657",
    }
    const color = colorMap[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${color};font-style:italic` : `color:${color}`
    html += `<span style="${style}">${escapeHtml(m.text)}</span>`
    cursor = m.end
  }
  if (cursor < remaining.length) {
    html += escapeHtml(remaining.slice(cursor))
  }
  return html
}

interface CppRunnerProps {
  initialCode: string
  expectedOutput?: string
  task?: string
  onSuccess?: () => void
  onError?: () => void
  minHeight?: string
  isEn?: boolean
  // 숙제 제출 모드
  submissionMode?: boolean
  lessonId?: string
  stepId?: string
  stepTitle?: string
}

const WANDBOX_API = "https://wandbox.org/api/compile.json"

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase()
}

function friendlyError(stderr: string): string {
  if (stderr.includes("error: expected ';'")) return "❌ 세미콜론(;)이 빠진 곳이 있어요!"
  if (stderr.includes("error: expected '}'")) return "❌ 닫는 중괄호 }가 빠진 곳이 있어요!"
  if (stderr.includes("error: expected '{'")) return "❌ 여는 중괄호 {가 빠진 곳이 있어요!"
  if (stderr.includes("was not declared")) {
    const m = stderr.match(/'([^']+)' was not declared/)
    return m ? `❌ '${m[1]}'이 선언되지 않았어요. 오타나 #include를 확인해보세요.` : "❌ 선언되지 않은 변수/함수가 있어요."
  }
  if (stderr.includes("error:")) {
    const firstError = stderr.split("\n").find(l => l.includes("error:"))
    return "❌ 컴파일 오류: " + (firstError?.split("error:")[1]?.trim() || stderr.split("\n")[0])
  }
  return "❌ " + stderr.split("\n")[0]
}

export function CppRunner({
  initialCode,
  expectedOutput,
  task,
  onSuccess,
  onError,
  minHeight,
  isEn = false,
  submissionMode = false,
  lessonId,
  stepId,
  stepTitle,
}: CppRunnerProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [failCount, setFailCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const lineCount = initialCode.split("\n").length
  const editorMinHeight = minHeight ?? `${Math.max(280, lineCount * 28 + 64)}px`

  const saveCodeSilently = async (currentCode: string) => {
    if (isSubmitting || isSubmitted) return
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single()
      await supabase
        .from("homework_submissions")
        .insert({
          student_id: user.id,
          student_name: profile?.display_name || user.email,
          lesson_id: lessonId || "unknown",
          step_id: stepId || "unknown",
          step_title: stepTitle || "",
          code: currentCode,
        })
      setIsSubmitted(true)
    } catch {
      // 백그라운드 저장 실패는 조용히 처리 (학생 방해 안 함)
    } finally {
      setIsSubmitting(false)
    }
  }

  const runCode = useCallback(async () => {
    if (!code.trim() || isLoading) return
    setIsLoading(true)
    setOutput("")
    setError("")
    setIsCorrect(null)

    try {
      const res = await fetch(WANDBOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          compiler: "gcc-head",
          "compiler-option-raw": "-std=c++17\n-O2",
        })
      })

      if (!res.ok) throw new Error("API error")
      const data = await res.json()

      const compileStderr = data.compiler_error || ""
      const runStdout = (data.program_output || "").trimEnd()
      const runStderr = data.program_error || ""

      if (compileStderr) {
        setError(friendlyError(compileStderr))
        if (!submissionMode) {
          const next = failCount + 1
          setFailCount(next)
          if (next >= 3) setShowAnswer(true)
          onError?.()
        }
      } else if (runStderr && data.status !== "0") {
        setError("❌ 런타임 오류: " + runStderr.split("\n")[0])
        if (!submissionMode) {
          const next = failCount + 1
          setFailCount(next)
          if (next >= 3) setShowAnswer(true)
          onError?.()
        }
      } else {
        setOutput(runStdout)
        setHasRun(true)
        if (submissionMode && !isSubmitted) {
          // 자동 저장 (백그라운드) + 다음 버튼 활성화
          saveCodeSilently(code)
          onSuccess?.()
        } else if (!submissionMode) {
          if (expectedOutput) {
            const isMatch = normalize(runStdout) === normalize(expectedOutput)
            setIsCorrect(isMatch)
            if (isMatch) {
              onSuccess?.()
            } else {
              const next = failCount + 1
              setFailCount(next)
              if (next >= 3) setShowAnswer(true)
              onError?.()
            }
          } else {
            setIsCorrect(true)
            onSuccess?.()
          }
        }
      }
    } catch {
      setError(isEn
        ? "❌ Connection error. Check your internet and try again."
        : "❌ 연결 오류. 인터넷 연결을 확인하고 다시 시도해보세요.")
      onError?.()
    } finally {
      setIsLoading(false)
    }
  }, [code, expectedOutput, onSuccess, onError, isLoading, isEn, failCount, submissionMode, isSubmitted, isSubmitting])

  const reset = () => {
    setCode(initialCode)
    setOutput("")
    setError("")
    setIsCorrect(null)
    setHasRun(false)
  }

  return (
    <div className="space-y-3">
      {task && (
        <div className="bg-teal-50 rounded-lg p-2.5 border border-teal-200">
          <p className="text-teal-800 font-bold text-sm">🎯 {task}</p>
        </div>
      )}

      {expectedOutput && (
        <div className="bg-gray-900 rounded-xl p-3 border border-gray-700">
          <p className="text-gray-400 text-xs font-bold mb-1.5">
            {isEn ? "🎯 Target output:" : "🎯 이렇게 출력되어야 해요:"}
          </p>
          <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{expectedOutput}</pre>
        </div>
      )}

      {/* 코드 에디터 */}
      <div className={cn(
        "rounded-xl overflow-hidden border-2 transition-all",
        isCorrect === true && "border-green-500",
        isCorrect === false && "border-red-500",
        isCorrect === null && "border-gray-700"
      )}>
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#282c34]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs font-mono">C++ — Ctrl+Enter {isEn ? "to save" : "저장"}</span>
        </div>

        <div className="cpp-editor-dark" onKeyDown={e => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            runCode()
          }
        }}>
          <SimpleEditor
            value={code}
            onValueChange={newCode => { setCode(newCode); setIsCorrect(null); setOutput(""); setError("") }}
            highlight={highlightCppCode}
            padding={16}
            tabSize={4}
            insertSpaces={true}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", "Courier New", monospace',
              fontSize: 15,
              lineHeight: 1.7,
              minHeight: editorMinHeight,
              background: "#282c34",
              color: "#e6edf3",
            }}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={runCode}
          disabled={!code.trim() || isLoading}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all",
            code.trim() && !isLoading
              ? "bg-teal-600 hover:bg-teal-500 text-white shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          {isLoading
            ? <><Loader2 className="w-4 h-4 animate-spin" />{isEn ? "Running..." : "컴파일 중..."}</>
            : <><Play className="w-4 h-4" />{isEn ? "▶ Save" : "▶ 저장"}</>
          }
        </button>
        <button
          onClick={reset}
          title={isEn ? "Reset" : "초기화"}
          className="px-4 py-2.5 rounded-xl font-bold transition-all bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 실행 결과 */}
      {(output || error) && (
        <div className={cn(
          "rounded-xl p-3 border-2 transition-all",
          error ? "bg-red-50 border-red-300" :
          isCorrect === true ? "bg-green-50 border-green-300" :
          "bg-gray-50 border-gray-300"
        )}>
          <div className="flex items-center gap-2 mb-1">
            {error
              ? <X className="w-4 h-4 text-red-600" />
              : isCorrect === true
                ? <Check className="w-4 h-4 text-green-600" />
                : <span className="text-gray-500 text-sm">→</span>
            }
            <span className={cn(
              "font-bold text-sm",
              error ? "text-red-600" : isCorrect === true ? "text-green-600" : "text-gray-700"
            )}>
              {error ? (isEn ? "Error!" : "오류!") : isCorrect === true ? (isEn ? "Correct! 🎉" : "정답! 🎉") : (isEn ? "Output:" : "결과:")}
            </span>
            {failCount > 0 && !isCorrect && !submissionMode && (
              <span className="ml-auto text-xs text-gray-400">{isEn ? `${failCount} attempt(s)` : `${failCount}번 시도`}</span>
            )}
          </div>
          <pre className={cn(
            "font-mono text-xs md:text-sm whitespace-pre-wrap break-all",
            error ? "text-red-700" : "text-gray-800"
          )}>
            {error || output}
          </pre>
        </div>
      )}

      {/* 자동 저장 상태 표시 (submissionMode만) */}
      {submissionMode && isSubmitting && (
        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          {isEn ? "Saving..." : "저장 중..."}
        </p>
      )}
      {submissionMode && isSubmitted && (
        <p className="text-center text-xs text-green-600 flex items-center justify-center gap-1">
          <Check className="w-3 h-3" />
          {isEn ? "Saved ✓" : "저장됨 ✓"}
        </p>
      )}

      {/* 3번 틀린 후 정답 코드 공개 */}
      {showAnswer && initialCode && (
        <div className="rounded-xl border-2 border-red-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-700 font-bold text-sm">
            <Eye className="w-4 h-4" />
            {isEn ? "Answer code (3 attempts used)" : "정답 코드 (3번 시도 후 공개)"}
          </div>
          <div className="relative">
            <CodeBlock code={initialCode} language="cpp" />
          </div>
        </div>
      )}
    </div>
  )
}
