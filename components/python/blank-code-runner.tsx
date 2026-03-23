"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Loader2, RotateCcw, Check, X, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlightPythonInline } from "@/components/ui/code-block"
import { useCodeSubmission } from "@/contexts/code-submission-context"

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

interface BlankCodeRunnerProps {
  initialCode: string
  expectedOutput?: string
  task?: string
  hint?: string
  hint2?: string
  onSuccess?: () => void
  minHeight?: string
  storageKey?: string
  /** 이미 완료한 스텝 여부 — 저장된 코드 없으면 정답으로 자동 채움 */
  isStepDone?: boolean
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

// initialCode에서 ___ 위치를 파싱
function parseBlanks(code: string) {
  const lines = code.split('\n')
  const blanks: { line: number; start: number; end: number; id: number }[] = []
  let blankId = 0

  for (let i = 0; i < lines.length; i++) {
    const regex = /___/g
    let match
    while ((match = regex.exec(lines[i])) !== null) {
      blanks.push({
        line: i,
        start: match.index,
        end: match.index + 3,
        id: blankId++
      })
    }
  }
  return blanks
}

// hint2에서 정답 배열 추출 ("choices / computer" → ["choices", "computer"])
function parseAnswers(hint2: string): string[] {
  return hint2.split(' / ').map(s => s.trim())
}

// 빈칸 값을 코드에 합성 (컴포넌트 외부에서도 사용 가능)
function buildAssembledCode(initialCode: string, filledValues: Record<number, string>): string {
  const lines = initialCode.split('\n')
  let blankIdx = 0
  const result: string[] = []
  for (const line of lines) {
    const regex = /___/g
    let newLine = ''
    let lastIndex = 0
    let match
    while ((match = regex.exec(line)) !== null) {
      newLine += line.slice(lastIndex, match.index)
      newLine += filledValues[blankIdx] || '___'
      blankIdx++
      lastIndex = match.index + 3
    }
    newLine += line.slice(lastIndex)
    result.push(newLine)
  }
  return result.join('\n')
}

export function BlankCodeRunner({
  initialCode,
  expectedOutput = "",
  task = "",
  hint = "",
  hint2 = "",
  onSuccess,
  minHeight = "140px",
  storageKey,
  isStepDone = false
}: BlankCodeRunnerProps) {
  const blanks = parseBlanks(initialCode)
  const answers = hint2 ? parseAnswers(hint2) : []

  const lsKey = storageKey ? `blank-runner-${storageKey}` : null

  // localStorage에서 저장된 상태 복원
  // 없고 이미 완료한 스텝이면 hint2 정답으로 채움
  const loadSaved = () => {
    if (lsKey) {
      try {
        const raw = localStorage.getItem(lsKey)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (parsed.values !== undefined) return { values: parsed.values as Record<number, string>, correct: parsed.correct ?? null }
          return { values: parsed as Record<number, string>, correct: null }
        }
      } catch { /* ignore */ }
    }
    // 저장된 코드 없음 + 완료한 스텝 → 정답으로 채움
    if (isStepDone && answers.length > 0) {
      return {
        values: Object.fromEntries(answers.map((ans, i) => [i, ans])) as Record<number, string>,
        correct: true as boolean | null
      }
    }
    return { values: {} as Record<number, string>, correct: null as boolean | null }
  }

  const { values: savedValues, correct: savedCorrect } = loadSaved()

  const [filledValues, setFilledValues] = useState<Record<number, string>>(savedValues)

  // 저장된 값에서도 중복 함수 호출 초기 감지
  const detectInitialWarnings = (values: Record<number, string>): Record<number, string> => {
    const warnings: Record<number, string> = {}
    const lines2 = initialCode.split('\n')
    let bIdx = 0
    for (const ln of lines2) {
      const re2 = /___/g; let m2
      while ((m2 = re2.exec(ln)) !== null) {
        const val = values[bIdx]?.trim() || ""
        const before = ln.slice(0, m2.index)
        const funcMatch = before.match(/(\w+)\s*\($/)
        if (funcMatch && val.startsWith(funcMatch[1] + "(")) {
          warnings[bIdx] = `💡 "${funcMatch[1]}(" 는 이미 있어요! 괄호 안에 들어갈 값만 입력하세요.`
        }
        bIdx++
      }
    }
    return warnings
  }

  const [nestedWarning, setNestedWarning] = useState<Record<number, string>>(
    () => detectInitialWarnings(savedValues)
  )
  const [focusedBlank, setFocusedBlank] = useState<number>(0)
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPyodideReady, setIsPyodideReady] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(savedCorrect)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    loadPyodideInstance()
      .then(() => setIsPyodideReady(true))
      .catch((err) => {
        console.error("Pyodide 로드 에러:", err)
        setError("Python 환경을 불러오는 중...")
      })
  }, [])

  // DB 연동 context (localStorage 저장에도 lessonId 필요하므로 먼저 선언)
  const { getSubmission, saveSubmission, loaded: dbLoaded, isAuthenticated: dbAuth, lessonId: dbLessonId } = useCodeSubmission()

  // 최신 값을 ref로 동기 추적 (unmount cleanup에서 사용)
  const latestFilledValues = useRef(filledValues)
  const latestIsCorrect = useRef(isCorrect)
  latestFilledValues.current = filledValues
  latestIsCorrect.current = isCorrect

  // 빈칸 값 + 정답 여부 localStorage 저장 (lessonId 포함 → 로그인 시 마이그레이션용)
  useEffect(() => {
    if (!lsKey) return
    try {
      localStorage.setItem(lsKey, JSON.stringify({ values: filledValues, correct: isCorrect, lessonId: dbLessonId || undefined }))
    } catch { /* ignore */ }
  }, [filledValues, isCorrect, lsKey, dbLessonId])

  // React 배치로 인해 unmount 전 effect가 실행 안 될 수 있음 → cleanup에서 강제 저장
  useEffect(() => {
    return () => {
      if (!lsKey) return
      try {
        localStorage.setItem(lsKey, JSON.stringify({
          values: latestFilledValues.current,
          correct: latestIsCorrect.current,
          lessonId: dbLessonId || undefined
        }))
      } catch { /* ignore */ }
    }
  }, [lsKey, dbLessonId])
  useEffect(() => {
    if (!dbLoaded || !storageKey) return
    const dbData = getSubmission(storageKey)

    if (savedCorrect === true) {
      // localStorage에 이미 정답 있음 → DB에 lazy migration (다른 기기 대비)
      const assembled = buildAssembledCode(initialCode, savedValues)
      saveSubmission(storageKey, JSON.stringify({ values: savedValues, assembled }))
    } else if (dbData) {
      // DB에 저장된 데이터 있음 (다른 기기에서 풀었음) → 복원
      try {
        const parsed = JSON.parse(dbData)
        if (parsed.values) {
          setFilledValues(parsed.values)
          setIsCorrect(true)
        }
      } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbLoaded, storageKey])

  // 빈칸 값을 코드에 합성
  const buildCode = useCallback(() => {
    return buildAssembledCode(initialCode, filledValues)
  }, [initialCode, filledValues])

  // 모든 빈칸이 채워졌는지
  const allFilled = blanks.every(b => filledValues[b.id]?.trim())

  const runCode = useCallback(async () => {
    if (!isPyodideReady || !pyodideInstance) {
      setError("Python 로딩 중...")
      return
    }

    if (!allFilled) {
      setError("✏️ 모든 빈칸을 채워주세요!")
      return
    }

    const code = buildCode()

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
          if (storageKey) saveSubmission(storageKey, JSON.stringify({ values: filledValues, assembled: code }))
        } else {
          if (attempts >= 1 && hint) {
            setShowHint(true)
          }
        }
      } else {
        setIsCorrect(true)
        onSuccess?.()
        if (storageKey) saveSubmission(storageKey, JSON.stringify({ values: filledValues, assembled: code }))
      }
    } catch (err: any) {
      let errorMsg = err.message || "에러!"

      if (errorMsg.includes("SyntaxError")) {
        errorMsg = "❌ 문법 오류! 빈칸에 올바른 값을 넣었는지 확인해보세요!"
      } else if (errorMsg.includes("NameError")) {
        const match = errorMsg.match(/name '(\w+)' is not defined/)
        if (match) {
          errorMsg = `❌ '${match[1]}'를 확인해보세요!`
        } else {
          errorMsg = "❌ 변수/함수 이름을 확인해보세요!"
        }
      } else if (errorMsg.includes("TypeError")) {
        errorMsg = "❌ 타입 오류! 빈칸 값을 확인해보세요!"
      }

      setError(errorMsg)
      setIsCorrect(false)
      setAttempts(prev => prev + 1)

      if (attempts >= 1 && hint) {
        setShowHint(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [buildCode, isPyodideReady, expectedOutput, onSuccess, attempts, hint, allFilled])

  const reset = () => {
    setFilledValues({})
    setOutput("")
    setError("")
    setIsCorrect(null)
    setShowHint(false)
    setFocusedBlank(0)
    setTimeout(() => inputRefs.current[0]?.focus(), 0)
  }

  // 코드를 줄별로 렌더링 (빈칸은 input 필드로)
  const renderCodeWithBlanks = () => {
    const lines = initialCode.split('\n')
    let blankIdx = 0

    return lines.map((line, lineIdx) => {
      const regex = /___/g
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      let match

      while ((match = regex.exec(line)) !== null) {
        // ___ 앞의 코드
        if (match.index > lastIndex) {
          const beforeText = line.slice(lastIndex, match.index)
          parts.push(
            <span key={`code-${lineIdx}-${lastIndex}`}>
              {highlightPythonInline(beforeText, true)}
            </span>
          )
        }

        // input 필드
        const currentBlankId = blankIdx
        const value = filledValues[currentBlankId] || ''
        const answerLength = answers[currentBlankId]?.length || 6

        parts.push(
          <input
            key={`blank-${lineIdx}-${currentBlankId}`}
            ref={el => { inputRefs.current[currentBlankId] = el }}
            type="text"
            value={value}
            onChange={(e) => {
              const newVal = e.target.value
              setFilledValues(prev => ({ ...prev, [currentBlankId]: newVal }))
              setIsCorrect(null)
              setOutput("")
              setError("")
              // 중복 함수 호출 감지: 템플릿에 이미 func( 가 있는데 input에도 func( 를 입력한 경우
              // 예: print(___) → 학생이 print('Hello') 입력 → print(print('Hello')) 가 됨
              const lines2 = initialCode.split('\n')
              let bIdx = 0
              let warning = ""
              for (const ln of lines2) {
                const re2 = /___/g; let m2
                while ((m2 = re2.exec(ln)) !== null) {
                  if (bIdx === currentBlankId) {
                    const before = ln.slice(0, m2.index)
                    const funcMatch = before.match(/(\w+)\s*\($/)
                    if (funcMatch && newVal.trim().startsWith(funcMatch[1] + "(")) {
                      warning = `💡 "${funcMatch[1]}(" 는 이미 있어요! 괄호 안에 들어갈 값만 입력하세요.`
                    }
                  }
                  bIdx++
                }
              }
              setNestedWarning(prev => ({ ...prev, [currentBlankId]: warning }))
            }}
            onFocus={() => setFocusedBlank(currentBlankId)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                // 다음 빈칸으로 이동하거나, 마지막이면 실행
                const nextId = currentBlankId + 1
                if (nextId < blanks.length) {
                  inputRefs.current[nextId]?.focus()
                } else if (allFilled) {
                  runCode()
                }
              }
              if (e.key === "Tab") {
                e.preventDefault()
                const nextId = e.shiftKey ? currentBlankId - 1 : currentBlankId + 1
                if (nextId >= 0 && nextId < blanks.length) {
                  inputRefs.current[nextId]?.focus()
                }
              }
            }}
            placeholder="___"
            className={cn(
              "inline-block font-mono text-center rounded-md border-2 mx-0.5 px-1 py-0 transition-all",
              "text-[13px] md:text-[15px] leading-[1.8] bg-gray-800 outline-none",
              focusedBlank === currentBlankId
                ? "border-amber-400 text-amber-300 ring-1 ring-amber-400/50"
                : value
                  ? "border-indigo-400 text-indigo-300"
                  : "border-gray-500 text-gray-400"
            )}
            style={{ width: `${Math.max(answerLength, value.length, 3) + 2}ch` }}
            spellCheck={false}
            autoComplete="off"
          />
        )

        blankIdx++
        lastIndex = match.index + 3
      }

      // 줄의 나머지 코드
      if (lastIndex < line.length) {
        const afterText = line.slice(lastIndex)
        parts.push(
          <span key={`code-${lineIdx}-end`}>
            {highlightPythonInline(afterText, true)}
          </span>
        )
      }

      // 빈 줄
      if (parts.length === 0) {
        parts.push(<span key={`empty-${lineIdx}`}>&nbsp;</span>)
      }

      return (
        <div key={lineIdx} className="leading-[1.8] whitespace-pre">
          {parts}
        </div>
      )
    })
  }

  return (
    <div className="space-y-3">
      {/* 문제 */}
      {task && (
        <div className="bg-indigo-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-indigo-200">
          <p className="text-indigo-800 font-bold text-sm md:text-base">🎯 {task}</p>
        </div>
      )}

      {/* 기대 출력 미리보기 — 빈칸에 뭘 넣어야 하는지 유추 가능 */}
      {expectedOutput && (
        <div className="bg-amber-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-amber-200">
          <p className="text-amber-700 font-bold text-xs md:text-sm mb-1">📋 이렇게 출력되도록 빈칸을 채우세요:</p>
          <pre className="font-mono text-xs md:text-sm text-amber-900 whitespace-pre-wrap bg-amber-100/50 rounded-md p-2">{expectedOutput}</pre>
        </div>
      )}

      {/* 코드 에디터 (빈칸 포함) */}
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

        <div className="font-mono p-3 md:p-4 text-[13px] md:text-[15px] overflow-x-auto" style={{ minHeight }}>
          {renderCodeWithBlanks()}
        </div>
      </div>

      {/* 중복 함수 호출 경고 */}
      {Object.values(nestedWarning).some(w => w) && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg px-3 py-2">
          {Object.entries(nestedWarning).filter(([, w]) => w).map(([id, w]) => (
            <p key={id} className="text-amber-800 text-xs font-medium">{w}</p>
          ))}
        </div>
      )}

      {/* 빈칸 미완료 힌트 */}
      {!allFilled && (
        <p className="text-center text-xs text-amber-500 font-medium animate-pulse">
          👆 위 빈칸을 채우면 실행 버튼이 활성화돼요!
        </p>
      )}

      {/* 버튼들 */}
      <div className="flex gap-2">
        <button
          onClick={runCode}
          disabled={!allFilled || isLoading || !isPyodideReady}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-sm md:text-base transition-all",
            allFilled && isPyodideReady && !isLoading
              ? "bg-green-600 hover:bg-green-500 text-white shadow-md animate-pulse"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )}
          {isLoading ? "실행중..." : allFilled ? "▶ 실행하기!" : "빈칸을 채워주세요"}
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

      {/* 정답 힌트 (3회 실패 시) */}
      {attempts >= 3 && hint2 && !isCorrect && (
        <div className="bg-orange-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-orange-300">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-600" />
            <span className="font-bold text-orange-700 text-xs md:text-sm">🔑 정답 힌트!</span>
          </div>
          <p className="text-orange-800 font-mono text-xs md:text-sm">{hint2}</p>
        </div>
      )}

      {/* 비로그인 학생 로그인 유도 (정답 맞췄을 때 한 번만 표시) */}
      {isCorrect === true && !dbAuth && (
        <p className="text-center text-xs text-gray-400">
          💾 이 기기에만 저장돼요.{" "}
          <a href="/login" className="text-indigo-500 hover:text-indigo-700 underline font-medium">
            로그인
          </a>
          하면 어디서든 코드가 저장돼요!
        </p>
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
