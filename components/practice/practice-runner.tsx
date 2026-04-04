"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Play, Loader2, RotateCcw, ChevronDown, Check, X, Lightbulb, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PracticeProblem } from "@/data/practice/types"

const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

// Prism을 모듈 레벨에서 미리 로드 (타이밍 문제 방지)
let prismLoaded = false
function loadPrism() {
  if (prismLoaded || typeof window === "undefined") return
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Prism = require("prismjs")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("prismjs/components/prism-clike")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("prismjs/components/prism-cpp")
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("prismjs/components/prism-python")
    prismLoaded = true
    return Prism
  } catch {
    return null
  }
}

function highlightCode(code: string, language: "cpp" | "python" = "cpp"): string {
  if (typeof window === "undefined") return code
  try {
    if (!prismLoaded) loadPrism()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Prism = require("prismjs")
    if (language === "python" && Prism.languages.python) {
      return Prism.highlight(code, Prism.languages.python, "python")
    } else if (Prism.languages.cpp) {
      return Prism.highlight(code, Prism.languages.cpp, "cpp")
    }
    return code
  } catch {
    return code
  }
}

const WANDBOX_API = "https://wandbox.org/api/compile.json"

type TestResult = { passed: boolean; output: string; expected: string }

interface PracticeRunnerProps {
  problem: PracticeProblem
  onSuccess?: (starred: boolean) => void
}

export function PracticeRunner({ problem, onSuccess }: PracticeRunnerProps) {
  const lang = problem.language ?? "cpp"
  const storageKey = `practice-code-${problem.id}`

  const [code, setCode] = useState(() => {
    if (typeof window === "undefined") return problem.initialCode
    try { return localStorage.getItem(storageKey) || problem.initialCode } catch { return problem.initialCode }
  })
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [allPassed, setAllPassed] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const runTests = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    setError("")
    setResults([])
    try {
      localStorage.setItem(storageKey, code)
    } catch {}

    const newResults: TestResult[] = []
    let compileError = ""

    for (const tc of problem.testCases) {
      try {
        const body = lang === "python"
          ? { compiler: "cpython-3.12.2", code, stdin: tc.stdin }
          : { compiler: "gcc-head", code, options: "warning,gnu++17", stdin: tc.stdin, "compiler-option-raw": "-O2 -std=c++17" }
        const res = await fetch(WANDBOX_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (data.status === "1") {
          compileError = lang === "python"
            ? (data.program_error || data.compiler_error || "런타임 오류")
            : (data.compiler_error || "컴파일 오류")
          break
        }
        const actual = (data.program_output || "").trim()
        const expected = tc.expectedOutput.trim()
        newResults.push({ passed: actual === expected, output: actual, expected })
      } catch {
        compileError = "네트워크 오류. 잠시 후 다시 시도해주세요."
        break
      }
    }

    if (compileError) {
      setError(compileError)
    } else {
      setResults(newResults)
      const passed = newResults.every(r => r.passed)
      setAllPassed(passed)
      if (passed) {
        const starred = hintsShown === 0 && !showSolution
        onSuccess?.(starred)
      }
    }
    setIsLoading(false)
  }, [code, problem, isLoading, onSuccess, storageKey, hintsShown, showSolution])

  const reset = () => {
    setCode(problem.initialCode)
    setResults([])
    setError("")
    setAllPassed(false)
    setHintsShown(0)
    setShowSolution(false)
    try { localStorage.removeItem(storageKey) } catch {}
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 코드 에디터 */}
      <div className="cpp-editor-dark relative rounded-xl overflow-hidden border border-white/10 bg-[#1e1e2e]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-white/10">
          <span className="text-xs text-white/40 font-mono">{lang === "python" ? "main.py" : "main.cpp"}</span>
          <button onClick={reset} className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors">
            <RotateCcw className="w-3 h-3" /> 초기화
          </button>
        </div>
        <SimpleEditor
          value={code}
          onValueChange={c => setCode(c)}
          highlight={c => highlightCode(c, lang)}
          padding={16}
          style={{ fontFamily: "monospace", fontSize: 14, minHeight: 260, color: "#cdd6f4", background: "transparent" }}
        />
      </div>

      {/* 실행 버튼 */}
      <button
        onClick={runTests}
        disabled={isLoading}
        className={cn(
          "flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
          isLoading ? "bg-white/10 text-white/40" : "bg-emerald-500 hover:bg-emerald-400 text-white"
        )}
      >
        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> 테스트 실행 중...</> : <><Play className="w-4 h-4" /> 테스트 실행</>}
      </button>

      {/* 컴파일 오류 */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
          <p className="text-red-400 text-sm font-mono whitespace-pre-wrap">{error}</p>
        </div>
      )}

      {/* 테스트 결과 */}
      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map((r, i) => (
            <div key={i} className={cn(
              "rounded-xl border p-3 text-sm",
              r.passed ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"
            )}>
              <div className="flex items-center gap-2 mb-1">
                {r.passed
                  ? <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  : <X className="w-4 h-4 text-red-400 shrink-0" />}
                <span className={cn("font-medium", r.passed ? "text-emerald-400" : "text-red-400")}>
                  테스트 {i + 1}{problem.testCases[i]?.label ? ` — ${problem.testCases[i].label}` : ""}
                </span>
              </div>
              {!r.passed && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-white/40">입력: </span>
                    <span className="text-white/70">{problem.testCases[i].stdin}</span>
                  </div>
                  <div />
                  <div>
                    <span className="text-white/40">예상: </span>
                    <span className="text-emerald-400">{r.expected}</span>
                  </div>
                  <div>
                    <span className="text-white/40">실제: </span>
                    <span className="text-red-400">{r.output || "(출력 없음)"}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {allPassed && (
            <div className={cn(
              "rounded-xl border p-4 text-center",
              hintsShown === 0 && !showSolution
                ? "bg-yellow-500/10 border-yellow-500/30"
                : "bg-emerald-500/10 border-emerald-500/30"
            )}>
              {hintsShown === 0 && !showSolution ? (
                <>
                  <p className="text-yellow-400 font-bold text-lg">⭐ 힌트 없이 통과!</p>
                  <p className="text-yellow-300/60 text-xs mt-1">스스로 풀었어요</p>
                </>
              ) : (
                <>
                  <p className="text-emerald-400 font-bold">🎉 모든 테스트 통과!</p>
                  <p className="text-emerald-300/60 text-xs mt-1">힌트 없이 다시 도전하면 ⭐를 획득할 수 있어요</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 힌트 */}
      {problem.hints.length > 0 && (
        <div className="flex flex-col gap-2">
          {problem.hints.slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-sm text-yellow-200">
              <span className="font-medium text-yellow-400">💡 힌트 {i + 1}</span>
              <p className="mt-1">{hint}</p>
            </div>
          ))}
          {hintsShown < problem.hints.length && (
            <button
              onClick={() => setHintsShown(h => h + 1)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              <Lightbulb className="w-4 h-4" />
              힌트 {hintsShown + 1} 보기
            </button>
          )}
        </div>
      )}

      {/* 정답 코드 보기 */}
      <button
        onClick={() => setShowSolution(s => !s)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
      >
        <Eye className="w-4 h-4" />
        {showSolution ? "정답 숨기기" : "정답 보기"}
        <ChevronDown className={cn("w-4 h-4 transition-transform", showSolution && "rotate-180")} />
      </button>
      {showSolution && (
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
          <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">{problem.solutionCode}</pre>
          <p className="mt-3 text-sm text-gray-500">{problem.solutionExplanation}</p>
        </div>
      )}
    </div>
  )
}
