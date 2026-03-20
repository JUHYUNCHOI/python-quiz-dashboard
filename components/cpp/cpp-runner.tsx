"use client"

import { useState, useCallback, useRef } from "react"
import { Play, Loader2, RotateCcw, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

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
    // Extract the first error line
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
  minHeight = "180px",
  isEn = false
}: CppRunnerProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
        onError?.()
      } else if (runStderr) {
        setError("❌ 런타임 오류: " + runStderr.split("\n")[0])
        onError?.()
      } else {
        setOutput(runStdout)
        if (expectedOutput) {
          const isMatch = normalize(runStdout) === normalize(expectedOutput)
          setIsCorrect(isMatch)
          if (isMatch) onSuccess?.()
          else onError?.()
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
  }, [code, expectedOutput, onSuccess, onError, isLoading, isEn])

  const reset = () => {
    setCode(initialCode)
    setOutput("")
    setError("")
    setIsCorrect(null)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      runCode()
    }
    if (e.key === "Tab") {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      const newCode = code.substring(0, start) + "    " + code.substring(end)
      setCode(newCode)
      setTimeout(() => { el.selectionStart = el.selectionEnd = start + 4 }, 0)
    }
  }

  return (
    <div className="space-y-3">
      {task && (
        <div className="bg-teal-50 rounded-lg p-2.5 border border-teal-200">
          <p className="text-teal-800 font-bold text-sm">🎯 {task}</p>
        </div>
      )}

      {/* 코드 에디터 */}
      <div className={cn(
        "bg-gray-900 rounded-xl overflow-hidden border-2 transition-all",
        isCorrect === true && "border-green-500",
        isCorrect === false && "border-red-500",
        isCorrect === null && "border-gray-700"
      )}>
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-xs font-mono">C++ — Ctrl+Enter 실행</span>
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => { setCode(e.target.value); setIsCorrect(null); setOutput(""); setError("") }}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-900 text-gray-100 font-mono text-sm p-4 outline-none resize-none leading-relaxed"
          style={{ minHeight }}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
        />
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
          </div>
          <pre className={cn(
            "font-mono text-xs md:text-sm whitespace-pre-wrap break-all",
            error ? "text-red-700" : "text-gray-800"
          )}>
            {error || output}
          </pre>
          {/* 틀린 경우: 기대 출력 힌트 */}
          {!error && isCorrect === false && expectedOutput && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1">{isEn ? "Expected:" : "이렇게 나와야 해요:"}</p>
              <pre className="font-mono text-xs text-amber-700 bg-amber-50 p-2 rounded">
                {expectedOutput}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
