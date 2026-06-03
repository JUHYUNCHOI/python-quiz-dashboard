"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Play, Loader2, RotateCcw, Check, X, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlightPython } from "@/components/ui/code-block"
import { useCodeSubmission } from "@/contexts/code-submission-context"
import { useLanguage } from "@/contexts/language-context"
import { createSmartKeyHandler } from "@/components/cpp/editor-key-handler"
import { renderInlineMarkdown } from "@/components/learn/render-content"
import { CodeSymbolToolbar } from "./code-symbol-toolbar"
import { translatePythonError } from "@/lib/python-error-friendly"
import { useEffectiveIsTeacher } from "@/lib/effective-role"

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
  minHeight = "220px",
  requireCodeChange = true,
  storageKey,
  isStepDone = false,
  requireCorrect = true,
}: PythonRunnerProps) {
  const { t, lang } = useLanguage()
  // 선생님 뷰: 친근 메시지는 그대로 띄우되 원본 영어 에러를 펼친 상태로 (디버깅용).
  const isTeacher = useEffectiveIsTeacher()
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
  // 한글(IME) 조합 중인지 추적. 조합 중에는 결과-리셋 effect 의 setState 로
  // 추가 리렌더가 일어나면 React 가 selection 을 건드려 조합 글자가 괄호 밖으로
  // 튕겨나감 → 조합 끝(compositionend)까지 그 churn 을 막는다.
  const composingRef = useRef(false)

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
    // 조합 중에는 리렌더를 일으키지 않는다 (IME 깨짐 방지). 조합이 끝나면
    // onCompositionEnd 의 setCode 로 code 가 다시 바뀌어 이 effect 가 실행됨.
    if (composingRef.current) return
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

  // 줄 수 기반 minHeight 계산 (C++ runner 와 동일 패턴)
  // ⚠️ useEffect 로 style.height 동적 변경하면 두 레이어 어긋나 커서 정렬 깨짐.
  // 그래서 render 시점에 한 번 계산해서 두 레이어 style 에 동시 적용.
  // minHeight prop 은 floor — 코드 줄 수가 많으면 그만큼 늘어남.
  // 줄당 32px (15px font * 1.8 leading = 27px + 5px buffer), padding 48px (p-4 16px*2 + 여유)
  const lineCount = useMemo(() => code.split("\n").length, [code])
  const minPx = minHeight ? parseInt(minHeight) : 100
  const editorMinHeight = `${Math.max(minPx, lineCount * 32 + 48)}px`

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
      // ⚠️ batched 는 줄바꿈 시에만 flush — end="." 같은 개행 없는 출력에서
      // batched 가 안 불려 정답인데 틀린 것으로 판정되던 버그.
      // raw 콜백은 바이트별로 호출되어 개행 없어도 모든 출력 포착.
      const capturedBytes: number[] = []
      pyodideInstance.setStdout({
        raw: (b: number) => { capturedBytes.push(b) }
      })

      await pyodideInstance.runPythonAsync(code)

      const capturedOutput = new TextDecoder().decode(new Uint8Array(capturedBytes))
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
      // ⚠️ 원본 에러 메시지를 그대로 setError 에 저장.
      // 친근 변환은 렌더 단계의 translatePythonError() 가 담당 — 여기서 미리 가공하면
      // 정규식 매칭이 깨져서 변환기가 fallback("에러가 발생했어요") 으로 떨어짐.
      const errorMsg = err.message || "에러!"
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

  // VSCode 비슷한 편의: auto-bracket, smart indent (콜론 뒤 +4), Tab=4 spaces,
  // 빈 짝 Backspace, Shift/Ctrl/Cmd+Enter 로 실행. 공유 핸들러 사용.
  const handleKeyDown = createSmartKeyHandler(setCode, {
    onCtrlEnter: () => { if (code.trim()) runCode() },
  })

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
      {/* 문제 — sticky 로 코드 입력 중에도 항상 보임 (작은 화면 대응) */}
      {task && (
        <div className="sticky top-[110px] md:top-[120px] z-10 bg-purple-50/95 backdrop-blur rounded-lg md:rounded-xl p-2.5 md:p-3 border border-purple-200">
          <p className="text-purple-800 font-bold text-sm md:text-base">🎯 {task}</p>
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
            style={{ minHeight: editorMinHeight, tabSize: 4, fontFeatureSettings: '"liga" 0, "calt" 0' }}
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
            onCompositionStart={() => { composingRef.current = true }}
            onCompositionEnd={(e) => {
              composingRef.current = false
              // 조합 종료 후 React 가 selection 을 끝으로 튕기는 것을 보정 —
              // 조합 직전 커서 위치(괄호 안)를 유지시킨다.
              const ta = e.currentTarget
              const pos = ta.selectionStart
              setCode(ta.value)
              if (ta.value !== initialCode) setHasEdited(true)
              requestAnimationFrame(() => {
                try { ta.selectionStart = ta.selectionEnd = pos } catch { /* ignore */ }
              })
            }}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={readOnly || isLoading}
            placeholder={t("Python 코드 입력...", "Enter Python code...")}
            wrap="off"
            className={cn(
              "w-full bg-transparent font-mono p-3 md:p-4 resize-none focus:outline-none placeholder:text-gray-600 relative z-10 whitespace-pre overflow-x-auto overflow-y-hidden",
              "text-[13px] md:text-[15px] leading-[1.8] text-transparent caret-white selection:bg-blue-500/40"
            )}
            style={{ minHeight: editorMinHeight, tabSize: 4, fontFeatureSettings: '"liga" 0, "calt" 0' }}
            spellCheck={false}
          />
        </div>
        {/* 모바일 심볼 툴바 — 터치 디바이스에서만 표시 */}
        <CodeSymbolToolbar textareaRef={textareaRef} setCode={setCode} variant="python" />
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
          
          {error ? (
            (() => {
              // 학생 친화 에러 — 자가학습 핵심: 학생이 에러 보고 좌절 않게.
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

      {/* 비로그인 학생 로그인 유도 (정답 맞췄을 때 한 번만 표시) */}
      {isCorrect === true && !dbAuth && (
        <p className="text-center text-xs text-gray-400">
          {t("💾 이 기기에만 저장돼요.", "💾 Saved on this device only.")}{" "}
          <a href="/login" className="text-purple-500 hover:text-purple-700 underline font-medium">
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

      {/* 힌트 시스템 — 자가학습 모드: 학생이 원할 때 도움 요청 */}
      {hint && isCorrect !== true && (
        <>
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="w-full text-left px-3 py-2.5 rounded-lg border-2 border-dashed border-purple-300 text-purple-600 text-xs md:text-sm font-bold hover:bg-purple-50 transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>💡 {t("힌트 보기", "Show hint")}</span>
              <span className="ml-auto text-[10px] text-purple-400 font-medium">{t("막혔으면 눌러봐", "Stuck? Try this")}</span>
            </button>
          ) : (
            <div className="bg-purple-50 rounded-lg md:rounded-xl p-2.5 md:p-3 border border-purple-300 animate-fadeIn">
              <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
                <span className="font-bold text-purple-700 text-xs md:text-sm">💡 {t("힌트", "Hint")}</span>
              </div>
              <p className="text-purple-800 text-xs md:text-sm whitespace-pre-wrap">{renderInlineMarkdown(hint, "h1-")}</p>
            </div>
          )}
        </>
      )}

      {/* 건너뛰기 버튼 — 2회 이상 실패 시 (포기 안 하게 좀 더 시도 권유) */}
      {requireCorrect && attempts >= 2 && isCorrect !== true && (
        <button
          onClick={() => { onSuccess?.() }}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all"
        >
          {t("→ 너무 어려워요, 다음으로 넘어갈게요", "→ Too hard, move on")}
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
