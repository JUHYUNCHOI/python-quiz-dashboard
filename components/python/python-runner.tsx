"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Loader2, RotateCcw, Check, X, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

// Pyodide 타입 정의
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>
  }
}

interface PyodideInterface {
  runPython: (code: string) => any
  runPythonAsync: (code: string) => Promise<any>
  globals: any
  setStdout: (options: { batched: (msg: string) => void }) => void
}

interface PythonRunnerProps {
  initialCode?: string
  expectedOutput?: string
  task?: string
  hint?: string
  onSuccess?: () => void
  onError?: () => void
  readOnly?: boolean
  showExpectedOutput?: boolean
  minHeight?: string
  requireCodeChange?: boolean
}

// Pyodide 싱글톤
let pyodideInstance: PyodideInterface | null = null
let pyodideLoading: Promise<PyodideInterface> | null = null

async function loadPyodideInstance(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance
  
  if (pyodideLoading) return pyodideLoading
  
  pyodideLoading = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Pyodide 로드 실패"))
        document.head.appendChild(script)
      })
    }
    
    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
    })
    
    return pyodideInstance
  })()
  
  return pyodideLoading
}

export function PythonRunner({
  initialCode = "",
  expectedOutput = "",
  task = "",
  hint = "",
  onSuccess,
  onError,
  readOnly = false,
  showExpectedOutput = false,
  minHeight = "100px",
  requireCodeChange = true
}: PythonRunnerProps) {
  const [code, setCode] = useState(initialCode)  // initialCode를 실제 초기값으로
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPyodideReady, setIsPyodideReady] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [hasEdited, setHasEdited] = useState(false)  // 유저가 수정했는지 추적
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    loadPyodideInstance()
      .then(() => setIsPyodideReady(true))
      .catch((err) => {
        console.error("Pyodide 로드 에러:", err)
        setError("Python 환경을 불러오는 중...")
      })
  }, [])

  useEffect(() => {
    setIsCorrect(null)
    setOutput("")
    setError("")
  }, [code])

  const runCode = useCallback(async () => {
    if (!isPyodideReady || !pyodideInstance) {
      setError("Python 로딩 중...")
      return
    }

    // 코드가 비어있으면 실행 안 함
    if (!code.trim()) {
      setError("❌ 코드를 직접 작성해보세요!")
      return
    }

    // 초기 코드와 똑같으면 수정 안내
    if (requireCodeChange && initialCode && code.trim() === initialCode.trim()) {
      setError("✏️ 코드를 수정해야 해요! 주석을 참고해서 코드를 완성해보세요!")
      return
    }

    setIsLoading(true)
    setOutput("")
    setError("")
    setIsCorrect(null)

    try {
      let capturedOutput = ""
      pyodideInstance.setStdout({
        batched: (msg: string) => {
          capturedOutput += msg + "\n"
        }
      })

      await pyodideInstance.runPythonAsync(code)
      
      const result = capturedOutput.trimEnd()
      setOutput(result)

      if (expectedOutput) {
        const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ")
        const isMatch = normalize(result) === normalize(expectedOutput)

        setIsCorrect(isMatch)
        setAttempts(prev => prev + 1)

        if (isMatch) {
          onSuccess?.()
        } else {
          onError?.()
          if (attempts >= 1 && hint) {
            setShowHint(true)
          }
        }
      } else {
        // expectedOutput이 없으면 실행만 하면 성공 (run-only 모드)
        setIsCorrect(true)
        onSuccess?.()
      }
    } catch (err: any) {
      let errorMsg = err.message || "에러!"
      
      if (errorMsg.includes("SyntaxError")) {
        if (errorMsg.includes("EOL while scanning string")) {
          errorMsg = "❌ 따옴표를 닫지 않았어요!"
        } else if (errorMsg.includes("unexpected EOF")) {
          errorMsg = "❌ 괄호가 안 닫혔어요!"
        } else {
          errorMsg = "❌ 문법 오류! 오타 확인해보세요!"
        }
      } else if (errorMsg.includes("NameError")) {
        const match = errorMsg.match(/name '(\w+)' is not defined/)
        if (match) {
          errorMsg = `❌ '${match[1]}'에 따옴표를 붙여보세요!`
        } else {
          errorMsg = "❌ 변수/함수 이름을 확인해보세요!"
        }
      } else if (errorMsg.includes("TypeError")) {
        errorMsg = "❌ 타입 오류!"
      }
      
      setError(errorMsg)
      setIsCorrect(false)
      setAttempts(prev => prev + 1)
      onError?.()
      
      if (attempts >= 1 && hint) {
        setShowHint(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [code, isPyodideReady, expectedOutput, onSuccess, onError, attempts, hint])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Shift+Enter 또는 Ctrl/Cmd+Enter로 실행
    if (e.key === "Enter" && (e.shiftKey || e.ctrlKey || e.metaKey) && code.trim()) {
      e.preventDefault()
      runCode()
    }
    // Tab 키로 들여쓰기
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newCode = code.substring(0, start) + "    " + code.substring(end)
        setCode(newCode)
        setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 4 }, 0)
      }
    }
  }

  const reset = () => {
    setCode(initialCode)
    setOutput("")
    setError("")
    setIsCorrect(null)
    setShowHint(false)
    setHasEdited(false)
    textareaRef.current?.focus()
  }

  return (
    <div className="space-y-3">
      {/* 문제 */}
      {task && (
        <div className="bg-indigo-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-indigo-200">
          <p className="text-indigo-800 font-bold text-sm md:text-base">🎯 {task}</p>
        </div>
      )}

      {/* 코드 에디터 */}
      <div className={cn(
        "bg-gray-900 rounded-xl overflow-hidden border-2 transition-all",
        isCorrect === true && "border-green-500",
        isCorrect === false && "border-red-500",
        isCorrect === null && "border-gray-700"
      )}>
        <div className="flex items-center justify-between px-2 md:px-3 py-1 md:py-1.5 bg-gray-800">
          <div className="flex items-center gap-1 md:gap-1.5">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-[10px] md:text-xs font-mono">
            {isPyodideReady ? "🐍 Ready" : "⏳..."}
          </span>
        </div>
        
        <div className="relative">
          {/* 초기 코드가 있고 아직 수정 안 했을 때: 수정해야 할 부분 표시 */}
          {initialCode && !hasEdited && code === initialCode && (
            <div className="absolute top-0 right-0 z-20 m-2">
              <span className="text-[10px] md:text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-bold animate-pulse">
                ← 코드를 수정해보세요!
              </span>
            </div>
          )}
          
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              if (e.target.value !== initialCode) {
                setHasEdited(true)
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={readOnly || isLoading}
            placeholder="Python 코드 입력..."
            className={cn(
              "w-full bg-transparent text-yellow-300 font-mono p-2 md:p-3 resize-none focus:outline-none placeholder:text-gray-600 relative z-10",
              "text-xs md:text-sm leading-relaxed"
            )}
            style={{ minHeight }}
            spellCheck={false}
          />
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex gap-2">
        <button
          onClick={runCode}
          disabled={!code.trim() || isLoading || !isPyodideReady}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all",
            code.trim() && isPyodideReady && !isLoading
              ? "bg-green-600 hover:bg-green-500 text-white shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )}
          {isLoading ? "실행중..." : "▶ 실행"}
        </button>
        
        <button
          onClick={reset}
          className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all"
          title="초기화"
        >
          <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>

      {/* 실행 결과 */}
      {(output || error) && (
        <div className={cn(
          "rounded-lg md:rounded-xl p-2.5 md:p-3 border-2 transition-all",
          error ? "bg-red-50 border-red-300" : 
          isCorrect ? "bg-green-50 border-green-300" :
          "bg-gray-50 border-gray-300"
        )}>
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            {error ? (
              <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" />
            ) : isCorrect ? (
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
            ) : (
              <span className="text-gray-500 text-sm">→</span>
            )}
            <span className={cn(
              "font-bold text-xs md:text-sm",
              error ? "text-red-600" : isCorrect ? "text-green-600" : "text-gray-700"
            )}>
              {error ? "에러!" : isCorrect ? "정답! 🎉" : "결과:"}
            </span>
          </div>
          
          <pre className={cn(
            "font-mono text-xs md:text-sm whitespace-pre-wrap",
            error ? "text-red-700" : "text-gray-800"
          )}>
            {error || output}
          </pre>
        </div>
      )}

      {/* 기대 출력 */}
      {showExpectedOutput && expectedOutput && isCorrect === false && (
        <div className="bg-amber-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-amber-300">
          <p className="text-amber-800 font-bold mb-1 text-xs md:text-sm">🎯 이렇게 나와야 해요:</p>
          <pre className="font-mono text-amber-900 bg-amber-100 p-1.5 md:p-2 rounded text-xs md:text-sm">
            {expectedOutput}
          </pre>
        </div>
      )}

      {/* 힌트 */}
      {showHint && hint && (
        <div className="bg-purple-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-purple-300 animate-fadeIn">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
            <span className="font-bold text-purple-700 text-xs md:text-sm">💡 힌트!</span>
          </div>
          <p className="text-purple-800 font-mono text-xs md:text-sm">{hint}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  )
}
