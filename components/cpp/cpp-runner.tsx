"use client"

import { useState, useCallback, useRef, useMemo } from "react"
import { Play, Loader2, RotateCcw, Check, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { CodeBlock, highlightCpp } from "@/components/ui/code-block"

interface CppRunnerProps {
  initialCode: string
  expectedOutput?: string
  task?: string
  onSuccess?: () => void
  onError?: () => void
  minHeight?: string
  isEn?: boolean
}

const PISTON_API = "https://emkc.org/api/v2/piston/execute"

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
  isEn = false
}: CppRunnerProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [failCount, setFailCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)

  const lineCount = initialCode.split("\n").length
  const editorMinHeight = minHeight ?? `${Math.max(280, lineCount * 28 + 64)}px`

  const highlightedCode = useMemo(() => highlightCpp(code, true), [code])

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  const runCode = useCallback(async () => {
    if (!code.trim() || isLoading) return
    setIsLoading(true)
    setOutput("")
    setError("")
    setIsCorrect(null)

    try {
      const res = await fetch(PISTON_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "cpp",
          version: "*",
          files: [{ content: code }]
        })
      })

      if (!res.ok) throw new Error("API error")
      const data = await res.json()

      const compileStderr = data.compile?.stderr || ""
      const runStdout = (data.run?.stdout || "").trimEnd()
      const runStderr = data.run?.stderr || ""

      if (compileStderr) {
        setError(friendlyError(compileStderr))
        const next = failCount + 1
        setFailCount(next)
        if (next >= 3) setShowAnswer(true)
        onError?.()
      } else if (runStderr) {
        setError("❌ 런타임 오류: " + runStderr.split("\n")[0])
        const next = failCount + 1
        setFailCount(next)
        if (next >= 3) setShowAnswer(true)
        onError?.()
      } else {
        setOutput(runStdout)
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
    } catch {
      setError(isEn
        ? "❌ Connection error. Check your internet and try again."
        : "❌ 연결 오류. 인터넷 연결을 확인하고 다시 시도해보세요.")
      onError?.()
    } finally {
      setIsLoading(false)
    }
  }, [code, expectedOutput, onSuccess, onError, isLoading, isEn, failCount])

  const reset = () => {
    setCode(initialCode)
    setOutput("")
    setError("")
    setIsCorrect(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      runCode()
    }
  }

  return (
    <div className="space-y-3" onKeyDown={handleKeyDown}>
      {task && (
        <div className="bg-teal-50 rounded-lg p-2.5 border border-teal-200">
          <p className="text-teal-800 font-bold text-sm">🎯 {task}</p>
        </div>
      )}

      {/* 예상 출력 표시 */}
      {expectedOutput && (
        <div className="bg-gray-900 rounded-xl p-3 border border-gray-700">
          <p className="text-gray-400 text-xs font-bold mb-1.5">
            {isEn ? "🎯 Target output:" : "🎯 이렇게 출력되어야 해요:"}
          </p>
          <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{expectedOutput}</pre>
        </div>
      )}

      {/* 코드 에디터 — 투명 textarea + highlight 레이어 */}
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
          <span className="text-gray-400 text-xs font-mono">C++ — Ctrl+Enter {isEn ? "to run" : "실행"}</span>
        </div>

        <div className="relative bg-[#282c34]" style={{ minHeight: editorMinHeight }}>
          {/* Syntax highlight 배경 레이어 */}
          <div
            ref={highlightRef}
            aria-hidden="true"
            className="absolute inset-0 font-mono p-4 overflow-hidden pointer-events-none text-[15px] leading-[1.7]"
            style={{ minHeight: editorMinHeight }}
          >
            <pre className="font-mono text-[15px] leading-[1.7] m-0 p-0 whitespace-pre">
              {highlightedCode}
            </pre>
          </div>

          {/* 투명 textarea (입력용) */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={e => { setCode(e.target.value); setIsCorrect(null); setOutput(""); setError("") }}
            onKeyDown={e => {
              if (e.key === "Tab") {
                e.preventDefault()
                const start = e.currentTarget.selectionStart
                const end = e.currentTarget.selectionEnd
                const newCode = code.substring(0, start) + "    " + code.substring(end)
                setCode(newCode)
                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4
                  }
                }, 0)
              }
            }}
            onScroll={handleScroll}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full bg-transparent font-mono p-4 resize-none focus:outline-none relative z-10 text-[15px] leading-[1.7] text-transparent caret-white selection:bg-blue-500/40 overflow-hidden"
            style={{ minHeight: editorMinHeight }}
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
            : <><Play className="w-4 h-4" />{isEn ? "▶ Run" : "▶ 실행"}</>
          }
        </button>
        <button
          onClick={reset}
          title={isEn ? "Reset" : "초기화"}
          className="px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all"
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
            {failCount > 0 && !isCorrect && (
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
