"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Play, Loader2, RotateCcw, ChevronDown, Check, X, Lightbulb, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PracticeProblem } from "@/data/practice/types"
import { useLanguage } from "@/contexts/language-context"

const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

// ── Inline-style syntax highlighters (no external CSS needed) ──

const CPP_KEYWORDS = /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|string|vector|map|set|pair|cout|cin|endl|std)\b/g
const CPP_PREPROCESSOR = /^(#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|error|pragma|line)\b.*)/gm
const CPP_STRING = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const CPP_COMMENT_LINE = /\/\/.*/g
const CPP_COMMENT_BLOCK = /\/\*[\s\S]*?\*\//g
const CPP_NUMBER = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[uUlLfF]?\b/g

const PY_KEYWORDS = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|print|input|range|len|int|float|str|bool|list|dict|set|tuple|type|isinstance|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round|open|append|extend|insert|remove|pop|clear|copy|update|get|keys|values|items|join|split|strip|replace|format|upper|lower|self)\b/g
const PY_STRING = /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const PY_COMMENT = /#.*/g
const PY_DECORATOR = /@\w+/g
const PY_NUMBER = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function buildHighlightHtml(code: string, patterns: Array<{ re: RegExp; cls: string }>): string {
  type Match = { start: number; end: number; text: string; cls: string }
  const matches: Match[] = []
  for (const { re, cls } of patterns) {
    const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")
    r.lastIndex = 0
    let m
    while ((m = r.exec(code)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
    }
  }
  matches.sort((a, b) => a.start - b.start)
  const filtered: Match[] = []
  let cursor = 0
  for (const m of matches) {
    if (m.start >= cursor) { filtered.push(m); cursor = m.end }
  }
  const colorMap: Record<string, string> = {
    keyword: "#ff7b72", comment: "#b0bec5", string: "#a5d6ff",
    preprocessor: "#ff7b72", number: "#ffa657", decorator: "#d2a8ff",
  }
  cursor = 0
  let html = ""
  for (const m of filtered) {
    if (m.start > cursor) html += escapeHtml(code.slice(cursor, m.start))
    const color = colorMap[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${color};font-style:italic` : `color:${color}`
    html += `<span style="${style}">${escapeHtml(m.text)}</span>`
    cursor = m.end
  }
  if (cursor < code.length) html += escapeHtml(code.slice(cursor))
  return html
}

function highlightCode(code: string, language: "cpp" | "python" = "cpp"): string {
  if (language === "python") {
    return buildHighlightHtml(code, [
      { re: PY_STRING, cls: "string" },
      { re: PY_COMMENT, cls: "comment" },
      { re: PY_DECORATOR, cls: "decorator" },
      { re: PY_KEYWORDS, cls: "keyword" },
      { re: PY_NUMBER, cls: "number" },
    ])
  }
  return buildHighlightHtml(code, [
    { re: CPP_COMMENT_BLOCK, cls: "comment" },
    { re: CPP_COMMENT_LINE, cls: "comment" },
    { re: CPP_STRING, cls: "string" },
    { re: CPP_PREPROCESSOR, cls: "preprocessor" },
    { re: CPP_KEYWORDS, cls: "keyword" },
    { re: CPP_NUMBER, cls: "number" },
  ])
}

const WANDBOX_API = "https://wandbox.org/api/compile.json"

type TestResult = { passed: boolean; output: string; expected: string }

interface PracticeRunnerProps {
  problem: PracticeProblem
  onSuccess?: (starred: boolean) => void
}

export function PracticeRunner({ problem, onSuccess }: PracticeRunnerProps) {
  const { t } = useLanguage()
  const lang = problem.language ?? "cpp"
  const storageKey = `practice-code-${problem.id}`

  const [code, setCode] = useState(() => {
    const initial = problem.initialCode ?? ""
    if (typeof window === "undefined") return initial
    try { return localStorage.getItem(storageKey) || initial } catch { return initial }
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

    for (const tc of problem.testCases ?? []) {
      try {
        const body = lang === "python"
          ? { compiler: "cpython-3.12.2", code, stdin: tc.stdin }
          : { compiler: "gcc-head", code, stdin: tc.stdin, "compiler-option-raw": "-std=c++17\n-O2" }
        const res = await fetch(WANDBOX_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (data.status === "1") {
          compileError = lang === "python"
            ? (data.program_error || data.compiler_error || t("런타임 오류", "Runtime Error"))
            : (data.compiler_error || t("컴파일 오류", "Compile Error"))
          break
        }
        const actual = (data.program_output || "").trim()
        const expected = tc.expectedOutput.trim()
        newResults.push({ passed: actual === expected, output: actual, expected })
      } catch {
        compileError = t("네트워크 오류. 잠시 후 다시 시도해주세요.", "Network error. Please try again.")
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
  }, [code, problem, isLoading, onSuccess, storageKey, hintsShown, showSolution, t])

  const reset = () => {
    setCode(problem.initialCode ?? "")
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
            <RotateCcw className="w-3 h-3" /> {t("초기화", "Reset")}
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
        {isLoading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> {t("테스트 실행 중...", "Running...")}</>
          : <><Play className="w-4 h-4" /> {t("테스트 실행", "Run Tests")}</>}
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
                  {t("테스트", "Test")} {i + 1}{(problem.testCases ?? [])[i]?.label ? ` — ${(problem.testCases ?? [])[i].label}` : ""}
                </span>
              </div>
              {!r.passed && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-white/40">{t("입력: ", "Input: ")}</span>
                    <span className="text-white/70">{(problem.testCases ?? [])[i]?.stdin}</span>
                  </div>
                  <div />
                  <div>
                    <span className="text-white/40">{t("예상: ", "Expected: ")}</span>
                    <span className="text-emerald-400">{r.expected}</span>
                  </div>
                  <div>
                    <span className="text-white/40">{t("실제: ", "Actual: ")}</span>
                    <span className="text-red-400">{r.output || t("(출력 없음)", "(no output)")}</span>
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
                  <p className="text-yellow-400 font-bold text-lg">{t("⭐ 힌트 없이 통과!", "⭐ Solved without hints!")}</p>
                  <p className="text-yellow-300/60 text-xs mt-1">{t("스스로 풀었어요", "You figured it out!")}</p>
                </>
              ) : (
                <>
                  <p className="text-emerald-400 font-bold">{t("🎉 모든 테스트 통과!", "🎉 All tests passed!")}</p>
                  <p className="text-emerald-300/60 text-xs mt-1">{t("힌트 없이 다시 도전하면 ⭐를 획득할 수 있어요", "Try again without hints to earn ⭐")}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 힌트 */}
      {(problem.hints ?? []).length > 0 && (
        <div className="flex flex-col gap-2">
          {(problem.hints ?? []).slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-sm text-yellow-200">
              <span className="font-medium text-yellow-400">💡 {t("힌트", "Hint")} {i + 1}</span>
              <p className="mt-1">{hint}</p>
            </div>
          ))}
          {hintsShown < (problem.hints ?? []).length && (
            <button
              onClick={() => setHintsShown(h => h + 1)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              <Lightbulb className="w-4 h-4" />
              {t(`힌트 ${hintsShown + 1} 보기`, `Show hint ${hintsShown + 1}`)}
            </button>
          )}
        </div>
      )}

      {/* 정답 코드 */}
      <button
        onClick={() => setShowSolution(s => !s)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
      >
        <Eye className="w-4 h-4" />
        {showSolution ? t("정답 숨기기", "Hide solution") : t("정답 보기", "Show solution")}
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
