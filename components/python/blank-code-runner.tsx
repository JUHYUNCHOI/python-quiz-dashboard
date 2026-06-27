"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Loader2, RotateCcw, Check, X, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlightPythonInline } from "@/components/ui/code-block"
import { useCodeSubmission } from "@/contexts/code-submission-context"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { renderInlineMarkdown } from "@/components/learn/render-content"
import { translatePythonError } from "@/lib/python-error-friendly"
import { useEffectiveIsTeacher } from "@/lib/effective-role"
import { runPython, preloadPython } from "@/utils/pyodideWorker"

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
  setStdout: (options: { batched?: (msg: string) => void; raw?: (charCode: number) => void; write?: (buf: Uint8Array) => number }) => void
  setStdin?: (options: { stdin?: () => string | undefined | null; isatty?: boolean }) => void
}

interface BlankCodeRunnerProps {
  initialCode: string
  expectedOutput?: string
  stdin?: string
  task?: string
  hint?: string
  hint2?: string
  onSuccess?: () => void
  minHeight?: string
  storageKey?: string
  /** 이미 완료한 스텝 여부 — 저장된 코드 없으면 정답으로 자동 채움 */
  isStepDone?: boolean
  /** 보기 선택지 — 제공 시 버튼 클릭으로 빈칸 채움 */
  choices?: string[]
}

// Pyodide 실행은 Web Worker 로 (utils/pyodideWorker). 메인 스레드에서 직접 안 돌림 —
// 무한 루프 시 UI 가 얼지 않도록 + 타임아웃 시 워커 강제 종료.

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
  stdin,
  task = "",
  hint = "",
  hint2 = "",
  onSuccess,
  minHeight = "100px",
  storageKey,
  isStepDone = false,
  choices = [],
}: BlankCodeRunnerProps) {
  const blanks = parseBlanks(initialCode)
  const answers = hint2 ? parseAnswers(hint2) : []
  // 줄 수 기반 minHeight (코드 길이에 맞게 자동 grow, 세로 스크롤 X)
  // 줄당 32px + padding 48px (PythonRunner 와 동일)
  const lineCount = initialCode.split("\n").length
  const minPx = parseInt(minHeight) || 100
  const computedMinHeight = `${Math.max(minPx, lineCount * 32 + 48)}px`

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
  const [showAnswerHint, setShowAnswerHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    preloadPython()
      .then(() => setIsPyodideReady(true))
      .catch((err) => {
        console.error("Pyodide 로드 에러:", err)
        setError("Python 환경을 불러오는 중...")
      })
  }, [])

  // DB 연동 context (localStorage 저장에도 lessonId 필요하므로 먼저 선언)
  const { getSubmission, saveSubmission, loaded: dbLoaded, lessonId: dbLessonId } = useCodeSubmission()
  const { user } = useAuth()
  const { t, lang } = useLanguage()
  // 선생님 뷰: 친근 메시지는 그대로 띄우되 원본 영어 에러를 펼친 상태로 (디버깅용).
  const isTeacher = useEffectiveIsTeacher()

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
    if (!isPyodideReady) {
      setError("Python 로딩 중...")
      return
    }

    if (!allFilled) {
      setError(t("✏️ 모든 빈칸을 채워주세요!", "✏️ Fill in all the blanks!"))
      return
    }

    const code = buildCode()

    setIsLoading(true)
    setOutput("")
    setError("")
    setIsCorrect(null)

    try {
      // 워커에서 실행 — 메인 스레드(UI) 안 얼림. 5초 초과 시 워커 강제 종료로 무한 루프 잡힘.
      // stdout 캡처·200KB 캡·input 프롬프트 억제는 워커 내부 담당.
      const res = await runPython(code, { stdin: stdin ?? "", timeoutMs: 5000 })

      if (res.timedOut) {
        setError("__CR_TIMEOUT__")  // 렌더의 translatePythonError 가 친근 안내로 변환
        setIsCorrect(false)
        setAttempts(prev => prev + 1)
        if (attempts >= 1 && hint) setShowHint(true)
        return
      }

      if (!res.ok) {
        setError(res.error || "에러!")
        setIsCorrect(false)
        setAttempts(prev => prev + 1)
        if (attempts >= 1 && hint) setShowHint(true)
        return
      }

      const result = res.stdout.trimEnd()
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
      // 안전망 — runPython 은 보통 throw 하지 않지만(결과로 에러 반환), 예기치 못한 경우 대비.
      setError(err?.message || "에러!")
      setIsCorrect(false)
      setAttempts(prev => prev + 1)
      if (attempts >= 1 && hint) setShowHint(true)
    } finally {
      setIsLoading(false)
    }
  }, [buildCode, isPyodideReady, expectedOutput, onSuccess, attempts, hint, allFilled, stdin, filledValues, storageKey])

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

        // input 필드 (choices 없을 때) 또는 디스플레이 박스 (choices 있을 때)
        const currentBlankId = blankIdx
        const value = filledValues[currentBlankId] || ''
        // 박스 너비: 학생이 입력한 만큼만 자람 (빈칸일 땐 작게).
        // 정답 길이로 잡으면 (1) 답 길이 유출 (2) hint2 가 전체 힌트일 때 박스가 과하게 넓어짐 → 둘 다 방지.
        const boxWidth = Math.max(value.length + 1, 4)

        if (choices.length > 0) {
          // 보기 선택 모드: 클릭 가능한 디스플레이 박스
          parts.push(
            <span
              key={`blank-${lineIdx}-${currentBlankId}`}
              onClick={() => setFocusedBlank(currentBlankId)}
              className={cn(
                "inline-block font-mono text-center rounded-md border-2 mx-0.5 px-2 py-0 transition-all cursor-pointer select-none",
                "text-[13px] md:text-[15px] leading-[1.8]",
                focusedBlank === currentBlankId
                  ? "border-amber-400 bg-amber-900/30 text-amber-300 ring-1 ring-amber-400/50"
                  : value
                    ? "border-purple-400 bg-purple-900/30 text-purple-300"
                    : "border-gray-500 bg-gray-800 text-gray-500"
              )}
              style={{ minWidth: `${boxWidth}ch` }}
            >
              {value || '?'}
            </span>
          )
        } else {
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
                // IME composition 중에는 skip — 한글 조합 완료 Enter 가 다음 빈칸 이동/실행 트리거 안 하게
                if ((e.nativeEvent as KeyboardEvent)?.isComposing || e.keyCode === 229) return
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
                    ? "border-purple-400 text-purple-300"
                    : "border-gray-500 text-gray-400"
              )}
              style={{ width: `${boxWidth}ch` }}
              spellCheck={false}
              autoComplete="off"
            />
          )
        }

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
          {/* 줄번호 — 같은 줄 박스 안에 둬서 빈칸 박스로 줄 키가 커져도 자동 정렬. 데스크탑만. */}
          <span aria-hidden="true" className="hidden md:inline-block w-8 pr-2 text-right text-gray-500 select-none">{lineIdx + 1}</span>
          {parts}
        </div>
      )
    })
  }

  return (
    <div className="space-y-3">
      {/* 문제 — sticky 로 코드 입력 중에도 항상 보임 (작은 iPad 화면 대응) */}
      {task && !expectedOutput && (
        <div className="sticky top-[110px] md:top-[120px] z-10 bg-purple-50/95 backdrop-blur rounded-lg md:rounded-xl p-2.5 md:p-3 border border-purple-200">
          <p className="text-purple-800 font-bold text-sm md:text-base">🎯 {task}</p>
        </div>
      )}

      {/* 기대 출력 미리보기 — 빈칸에 뭘 넣어야 하는지 유추 가능. sticky 로 항상 보임. */}
      {expectedOutput && (
        <div className="sticky top-[110px] md:top-[120px] z-10 bg-amber-50/95 backdrop-blur rounded-lg md:rounded-xl p-2.5 md:p-3 border border-amber-200">
          <p className="text-amber-700 font-bold text-xs md:text-sm mb-1">{t("📋 이렇게 출력되도록 빈칸을 채우세요:", "📋 Fill in the blanks to get this output:")}</p>
          <pre className="font-mono text-xs md:text-sm text-amber-900 whitespace-pre-wrap bg-amber-100/50 rounded-md p-2 select-all cursor-text">{expectedOutput}</pre>
          {/[^\x00-\x7F]/.test(expectedOutput) && (
            <p className="text-amber-600 text-xs mt-1.5">
              {t("💡 위 텍스트를 드래그해서 복사하세요!", "💡 Drag to copy the text above!")}
            </p>
          )}
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

        <div className="font-mono p-3 md:p-4 text-[13px] md:text-[15px] overflow-x-auto" style={{ minHeight: computedMinHeight }}>
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

      {/* 보기 선택 버튼 */}
      {choices.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {t("보기", "Choose")}
          </p>
          <div className="flex flex-wrap gap-2">
            {choices.map((choice, idx) => {
              const isSelected = filledValues[focusedBlank]?.trim() === choice.trim()
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setFilledValues(prev => ({ ...prev, [focusedBlank]: choice }))
                    setIsCorrect(null)
                    setOutput("")
                    setError("")
                    // 다음 빈칸으로 포커스 이동 (있으면)
                    const nextId = focusedBlank + 1
                    if (nextId < blanks.length) {
                      setFocusedBlank(nextId)
                      setTimeout(() => inputRefs.current[nextId]?.focus(), 0)
                    }
                  }}
                  className={cn(
                    "px-4 py-2 rounded-xl border-2 font-mono text-sm font-semibold transition-all",
                    isSelected
                      ? "border-amber-400 bg-amber-100 text-amber-900 shadow-sm scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                  )}
                >
                  {choice}
                </button>
              )
            })}
          </div>
          {blanks.length > 1 && (
            <p className="text-xs text-gray-400">
              {t(`빈칸 ${focusedBlank + 1}번 선택 중`, `Filling blank ${focusedBlank + 1}`)}
            </p>
          )}
        </div>
      )}

      {/* 빈칸 미완료 힌트 */}
      {!allFilled && choices.length === 0 && (
        <p className="text-center text-xs text-amber-500 font-medium animate-pulse">
          {t("👆 위 빈칸을 채우면 실행 버튼이 활성화돼요!", "👆 Fill in the blanks to enable the run button!")}
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
          {isLoading ? t("실행중...", "Running...") : allFilled ? t("▶ 실행하기!", "▶ Run!") : t("빈칸을 채워주세요", "Fill in the blanks")}
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
          "bg-red-50 border-red-300"
        )}>
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            {error ? (
              <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" />
            ) : isCorrect ? (
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
            ) : (
              <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
            )}
            <span className={cn(
              "font-bold text-xs md:text-sm",
              error ? "text-red-600" : isCorrect ? "text-green-600" : "text-red-500"
            )}>
              {error ? t("에러!", "Error!") : isCorrect ? t("정답! 🎉", "Correct! 🎉") : t("틀렸어요! 다시 해봐요 🔄", "Incorrect! Try again 🔄")}
            </span>
          </div>

          {error ? (
            (() => {
              const friendly = translatePythonError(error, lang)
              return (
                <div className="space-y-2">
                  {friendly.title && (
                    <p className="font-bold text-sm md:text-base text-red-800">
                      {friendly.title}
                    </p>
                  )}
                  {friendly.hints.length > 0 && (
                    <ul className="space-y-1 text-xs md:text-sm text-red-700 list-disc list-inside">
                      {friendly.hints.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <details className="mt-1" open={isTeacher}>
                    <summary className="text-[11px] text-red-600/70 cursor-pointer hover:text-red-700 select-none">
                      {isTeacher
                        ? t("원본 에러 (선생님 뷰)", "Raw error (teacher view)")
                        : t("자세한 에러 메시지 보기", "Show technical details")}
                    </summary>
                    <pre className="font-mono text-[11px] md:text-xs whitespace-pre-wrap text-red-700/80 bg-red-100/50 rounded px-2 py-1.5 mt-1 overflow-x-auto">
                      {friendly.original}
                    </pre>
                  </details>
                </div>
              )
            })()
          ) : (
            <pre className="font-mono text-xs md:text-sm whitespace-pre-wrap text-gray-800">
              {output}
            </pre>
          )}
        </div>
      )}

      {/* 힌트 시스템 — 자가학습 모드: 학생이 원할 때 단계별 도움 요청 */}
      {!isCorrect && (hint || hint2) && (
        <div className="space-y-2">
          {/* Lv1 힌트 — 항상 요청 가능 */}
          {!showHint && hint && (
            <button
              onClick={() => setShowHint(true)}
              className="w-full text-left px-3 py-2.5 rounded-lg border-2 border-dashed border-purple-300 text-purple-600 text-xs md:text-sm font-bold hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>💡 {t("힌트 보기 (1/2)", "Show hint (1/2)")}</span>
              <span className="ml-auto text-[10px] text-purple-400 font-medium">{t("막혔으면 눌러봐", "Stuck? Try this")}</span>
            </button>
          )}
          {showHint && hint && (
            <div className="bg-purple-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-purple-300 animate-fadeIn">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
                <span className="font-bold text-purple-700 text-xs md:text-sm">💡 {t("힌트 1/2", "Hint 1/2")}</span>
              </div>
              <p className="text-purple-800 text-xs md:text-sm whitespace-pre-wrap">{renderInlineMarkdown(hint, "h1-")}</p>
            </div>
          )}

          {/* Lv2 정답 힌트 — 1차 힌트 본 후 요청 가능 (또는 3회 실패 시 자동) */}
          {hint2 && showHint && !showAnswerHint && (
            <button
              onClick={() => setShowAnswerHint(true)}
              className="w-full text-left px-3 py-2.5 rounded-lg border-2 border-dashed border-orange-300 text-orange-600 text-xs md:text-sm font-bold hover:bg-orange-50 transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>🔑 {t("정답에 더 가까운 힌트 보기 (2/2)", "Closer to answer (2/2)")}</span>
              {attempts >= 2 && (
                <span className="ml-auto text-[10px] text-orange-400 font-medium">{t("계속 막혀? 눌러봐", "Still stuck?")}</span>
              )}
            </button>
          )}
          {hint2 && (showAnswerHint || (attempts >= 3 && showHint)) && (
            <div className="bg-orange-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-orange-300 animate-fadeIn">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-600" />
                <span className="font-bold text-orange-700 text-xs md:text-sm">🔑 {t("정답에 가까운 힌트", "Answer hint")}</span>
              </div>
              <p className="text-orange-800 font-mono text-xs md:text-sm whitespace-pre-wrap">{hint2}</p>
            </div>
          )}

          {/* 건너뛰기 — 2번 이상 시도 후 노출 (포기 안 하게 좀 더 권유) */}
          {attempts >= 2 && (
            <button
              onClick={() => { onSuccess?.() }}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all"
            >
              {t("→ 너무 어려워요, 다음으로 (정답은 위 힌트 확인)", "→ Skip and move on (see hint above)")}
            </button>
          )}
        </div>
      )}

      {/* 비로그인 학생 로그인 유도 (정답 맞췄을 때 한 번만 표시) */}
      {isCorrect === true && !user && (
        <p className="text-center text-xs text-gray-400">
          {lang === 'ko' ? (
            <>💾 이 기기에만 저장돼요.{" "}<a href="/login" className="text-purple-500 hover:text-purple-700 underline font-medium">로그인</a>하면 어디서든 코드가 저장돼요!</>
          ) : (
            <>💾 Saved on this device only.{" "}<a href="/login" className="text-purple-500 hover:text-purple-700 underline font-medium">Log in</a> to save everywhere!</>
          )}
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
