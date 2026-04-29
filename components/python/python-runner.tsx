"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Play, Loader2, RotateCcw, Check, X, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlightPython } from "@/components/ui/code-block"
import { useCodeSubmission } from "@/contexts/code-submission-context"
import { useLanguage } from "@/contexts/language-context"

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
  storageKey?: string
  /** 이미 완료한 스텝 여부 — 저장된 코드 없어도 완료 상태 표시 */
  isStepDone?: boolean
  /** false면 실행만 해도 onSuccess 호출 (tryit 모드). true(기본)면 정답 맞아야 호출 (mission 모드) */
  requireCorrect?: boolean
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
  requireCodeChange = true,
  storageKey,
  isStepDone = false,
  requireCorrect = true,
}: PythonRunnerProps) {
  const { t } = useLanguage()
  const lsKey = storageKey ? `python-runner-${storageKey}` : null

  // localStorage에서 저장된 상태 복원
  // 없고 이미 완료한 스텝이면 완료 상태로 표시
  const loadSaved = () => {
    if (lsKey) {
      try {
        const raw = localStorage.getItem(lsKey)
        if (raw) {
          if (!raw.startsWith("{")) return { code: raw, correct: null as boolean | null }
          const parsed = JSON.parse(raw)
          return { code: parsed.code ?? initialCode, correct: parsed.correct ?? null }
        }
      } catch { /* ignore */ }
    }
    return { code: initialCode, correct: isStepDone ? (true as boolean | null) : null }
  }

  const { code: savedCode, correct: savedCorrect } = loadSaved()

  const [code, setCode] = useState(savedCode)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPyodideReady, setIsPyodideReady] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(savedCorrect)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [hasEdited, setHasEdited] = useState(false)  // 유저가 수정했는지 추적
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const highlightedCode = useMemo(() => highlightPython(code, true), [code])
  const isInitialMount = useRef(true)

  useEffect(() => {
    loadPyodideInstance()
      .then(() => setIsPyodideReady(true))
      .catch((err) => {
        console.error("Pyodide 로드 에러:", err)
        setError("Python 환경을 불러오는 중...")
      })
  }, [])

  // 코드 변경 시 결과 초기화 (첫 마운트 제외 — 저장된 isCorrect 유지)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    setIsCorrect(null)
    setOutput("")
    setError("")
  }, [code])

  // DB 연동 context (localStorage 저장에도 lessonId 필요하므로 먼저 선언)
  const { getSubmission, saveSubmission, loaded: dbLoaded, isAuthenticated: dbAuth, lessonId: dbLessonId } = useCodeSubmission()

  // 최신 값을 ref로 동기 추적 (unmount cleanup에서 사용)
  const latestCode = useRef(code)
  const latestIsCorrect = useRef(isCorrect)
  latestCode.current = code
  latestIsCorrect.current = isCorrect

  // 코드 + 정답 여부 localStorage 저장 (lessonId 포함 → 로그인 시 마이그레이션용)
  useEffect(() => {
    if (!lsKey) return
    try {
      localStorage.setItem(lsKey, JSON.stringify({ code, correct: isCorrect, lessonId: dbLessonId || undefined }))
    } catch { /* ignore */ }
  }, [code, isCorrect, lsKey, dbLessonId])

  // React 배치로 인해 unmount 전 effect가 실행 안 될 수 있음 → cleanup에서 강제 저장
  useEffect(() => {
    return () => {
      if (!lsKey) return
      try {
        localStorage.setItem(lsKey, JSON.stringify({
          code: latestCode.current,
          correct: latestIsCorrect.current,
          lessonId: dbLessonId || undefined
        }))
      } catch { /* ignore */ }
    }
  }, [lsKey, dbLessonId])
  useEffect(() => {
    if (!dbLoaded || !storageKey) return
    const dbCode = getSubmission(storageKey)

    if (savedCorrect === true) {
      // localStorage에 이미 정답 있음 → DB에 lazy migration
      saveSubmission(storageKey, savedCode)
    } else if (dbCode && !isCorrect) {
      // DB에 저장된 코드 있음 (다른 기기에서 풀었음) → 복원
      setCode(dbCode)
      setIsCorrect(true)
      isInitialMount.current = true // 코드 변경 시 isCorrect 리셋 방지
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbLoaded, storageKey])

  // 스크롤 동기화
  const handleScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }, [])

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
          // 정답: 항상 onSuccess
          onSuccess?.()
          if (storageKey) saveSubmission(storageKey, code)
        } else if (!requireCorrect) {
          // tryit 모드: 틀려도 실행 & 저장하면 다음으로 진행 허용
          onSuccess?.()
          if (storageKey) saveSubmission(storageKey, code)
        } else {
          // mission 모드: 틀리면 막음
          onError?.()
          if (attempts >= 1 && hint) {
            setShowHint(true)
          }
        }
      } else {
        // expectedOutput이 없으면 실행만 하면 성공 (run-only 모드)
        setIsCorrect(true)
        onSuccess?.()
        if (storageKey) saveSubmission(storageKey, code)
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const val = textarea.value

    // Shift+Enter 또는 Ctrl/Cmd+Enter로 실행
    if (e.key === "Enter" && (e.shiftKey || e.ctrlKey || e.metaKey) && code.trim()) {
      e.preventDefault()
      runCode()
      return
    }

    // Tab 키로 들여쓰기
    if (e.key === "Tab") {
      e.preventDefault()
      const newCode = val.substring(0, start) + "    " + val.substring(end)
      setCode(newCode)
      setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 4 }, 0)
      return
    }

    // Enter — 자동 들여쓰기 (직전 줄과 같은 indent + 콜론 끝나면 추가 indent)
    if (e.key === "Enter") {
      e.preventDefault()
      const lineStart = val.lastIndexOf("\n", start - 1) + 1
      const currentLine = val.slice(lineStart, start)
      const indent = currentLine.match(/^(\s*)/)?.[1] ?? ""
      const extraIndent = currentLine.trimEnd().endsWith(":") ? "    " : ""
      const newVal = val.slice(0, start) + "\n" + indent + extraIndent + val.slice(start)
      const newCursor = start + 1 + indent.length + extraIndent.length
      setCode(newVal)
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = newCursor
      })
      return
    }

    // 자동 괄호 닫기
    const pairs: Record<string, string> = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" }
    if (pairs[e.key]) {
      // 따옴표는 같은 따옴표 바로 다음이면 건너뛰기
      if ((e.key === '"' || e.key === "'") && val[start] === e.key) {
        e.preventDefault()
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1
        })
        return
      }
      e.preventDefault()
      const open = e.key
      const close = pairs[open]
      const selected = val.slice(start, end)
      const newVal = val.slice(0, start) + open + selected + close + val.slice(end)
      setCode(newVal)
      requestAnimationFrame(() => {
        if (selected) {
          textarea.selectionStart = start + 1
          textarea.selectionEnd = end + 1
        } else {
          textarea.selectionStart = textarea.selectionEnd = start + 1
        }
      })
      return
    }

    // 닫는 괄호 입력 — 다음 위치에 같은 닫는 괄호 있으면 건너뛰기
    if ([")", "]", "}"].includes(e.key) && val[start] === e.key) {
      e.preventDefault()
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
      })
      return
    }

    // Backspace — 빈 짝 사이면 둘 다 지우기
    if (e.key === "Backspace" && start === end && start > 0) {
      const before = val[start - 1]
      const after = val[start]
      const matches: Record<string, string> = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" }
      if (matches[before] === after) {
        e.preventDefault()
        const newVal = val.slice(0, start - 1) + val.slice(start + 1)
        setCode(newVal)
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start - 1
        })
        return
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
                {t("← 코드를 수정해보세요!", "← Edit the code!")}
              </span>
            </div>
          )}

          {/* Syntax highlighted 배경 레이어
              ⚠️ textarea 와 *완전히 동일한* 텍스트 메트릭 보장 — 안 그러면 커서 ≠ 글자 정렬 어긋남.
              - whitespace-pre (no wrap) — 둘 다 wrap 안 함 → 가로 스크롤
              - tabSize 4 — 탭 너비 통일 (Python 인덴테이션 안전)
              - fontFeatureSettings off — 일부 monospace 폰트의 ligature 비활성 (글자 너비 보장) */}
          <div
            ref={highlightRef}
            aria-hidden="true"
            className="absolute inset-0 font-mono p-3 md:p-4 overflow-hidden pointer-events-none text-[13px] md:text-[15px] leading-[1.8]"
            style={{ minHeight, tabSize: 4, fontFeatureSettings: '"liga" 0, "calt" 0' }}
          >
            <pre className="font-mono text-[13px] md:text-[15px] leading-[1.8] m-0 p-0 whitespace-pre" style={{ tabSize: 4 }}>
              {highlightedCode}
            </pre>
          </div>

          {/* 투명 textarea (입력용)
              wrap="off" — pre 와 동일하게 wrap 비활성. 긴 줄은 가로 스크롤. */}
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
            onScroll={handleScroll}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={readOnly || isLoading}
            placeholder={t("Python 코드 입력...", "Enter Python code...")}
            wrap="off"
            className={cn(
              "w-full bg-transparent font-mono p-3 md:p-4 resize-none focus:outline-none placeholder:text-gray-600 relative z-10 whitespace-pre overflow-auto",
              "text-[13px] md:text-[15px] leading-[1.8] text-transparent caret-white selection:bg-blue-500/40"
            )}
            style={{ minHeight, tabSize: 4, fontFeatureSettings: '"liga" 0, "calt" 0' }}
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
          {isLoading ? t("실행중...", "Running...") : requireCorrect ? t("▶ 실행", "▶ Run") : t("▶ 실행 & 저장", "▶ Run & Save")}
        </button>
        
        <button
          onClick={reset}
          className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all"
          title={t("초기화", "Reset")}
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
              {error ? t("에러!", "Error!") : isCorrect ? t("정답! 🎉", "Correct! 🎉") : t("결과:", "Output:")}
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

      {/* 비로그인 학생 로그인 유도 (정답 맞췄을 때 한 번만 표시) */}
      {isCorrect === true && !dbAuth && (
        <p className="text-center text-xs text-gray-400">
          {t("💾 이 기기에만 저장돼요.", "💾 Saved on this device only.")}{" "}
          <a href="/login" className="text-indigo-500 hover:text-indigo-700 underline font-medium">
            {t("로그인", "Login")}
          </a>
          {t("하면 어디서든 코드가 저장돼요!", " to sync your code across devices!")}
        </p>
      )}

      {/* 기대 출력 */}
      {showExpectedOutput && expectedOutput && isCorrect === false && (
        <div className="bg-amber-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-amber-300">
          <p className="text-amber-800 font-bold mb-1 text-xs md:text-sm">🎯 {t("이렇게 나와야 해요:", "Expected output:")}</p>
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
            <span className="font-bold text-purple-700 text-xs md:text-sm">💡 {t("힌트!", "Hint!")}</span>
          </div>
          <p className="text-purple-800 font-mono text-xs md:text-sm">{hint}</p>
        </div>
      )}

      {/* 건너뛰기 버튼 (3회 이상 실패 시) */}
      {requireCorrect && attempts >= 3 && isCorrect !== true && (
        <button
          onClick={() => { onSuccess?.() }}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-all"
        >
          {t("→ 다음으로 넘어갈게요", "→ Move on")}
        </button>
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
