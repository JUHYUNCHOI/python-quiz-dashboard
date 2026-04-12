"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { X, Play, Loader2, RotateCcw, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

// ── C++ syntax highlight (Wandbox API) ───────────────────────────────────────
const CPP_KEYWORDS = /\b(auto|bool|break|case|catch|char|class|const|continue|default|delete|do|double|else|enum|explicit|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|nullptr|operator|private|protected|public|return|short|signed|sizeof|static|struct|switch|template|this|throw|true|try|typedef|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|string|vector|map|set|pair|cout|cin|endl|std|deque|stack|queue|sort|auto)\b/g
const CPP_PREPROCESSOR = /^(#\s*(?:include|define|undef|if|ifdef|ifndef|elif|else|endif|pragma)\b.*)/gm
const CPP_STRING = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const CPP_COMMENT = /\/\/.*|\/\*[\s\S]*?\*\//g
const CPP_NUMBER = /\b\d+(?:\.\d+)?[uUlLfF]?\b/g

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function highlightCpp(code: string): string {
  type M = { start: number; end: number; text: string; cls: string }
  const matches: M[] = []
  const addM = (re: RegExp, cls: string) => {
    re.lastIndex = 0
    let m
    while ((m = re.exec(code)) !== null)
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
  }
  addM(new RegExp(CPP_COMMENT.source, "g"), "comment")
  addM(new RegExp(CPP_STRING.source, "g"), "string")
  addM(new RegExp(CPP_PREPROCESSOR.source, "gm"), "pre")
  addM(new RegExp(CPP_KEYWORDS.source, "g"), "kw")
  addM(new RegExp(CPP_NUMBER.source, "g"), "num")
  matches.sort((a, b) => a.start - b.start)
  const filtered: M[] = []
  let cur = 0
  for (const m of matches) { if (m.start >= cur) { filtered.push(m); cur = m.end } }
  cur = 0; let html = ""
  const colors: Record<string, string> = { kw: "#ff7b72", comment: "#8b949e", string: "#a5d6ff", pre: "#ff7b72", num: "#ffa657" }
  for (const m of filtered) {
    if (m.start > cur) html += escHtml(code.slice(cur, m.start))
    const c = colors[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${c};font-style:italic` : `color:${c}`
    html += `<span style="${style}">${escHtml(m.text)}</span>`
    cur = m.end
  }
  if (cur < code.length) html += escHtml(code.slice(cur))
  return html
}

// ── Python syntax highlight (Pyodide, in-browser) ─────────────────────────────
const PY_KEYWORDS = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|int|str|float|bool|list|dict|set|tuple|len|range|print|input|type|isinstance|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round)\b/g
const PY_STRING = /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const PY_COMMENT = /#.*/g
const PY_DECO = /@\w+/g
const PY_NUMBER = /\b\d+(?:\.\d+)?[jJ]?\b/g

function highlightPython(code: string): string {
  type M = { start: number; end: number; text: string; cls: string }
  const matches: M[] = []
  const addM = (re: RegExp, cls: string) => {
    re.lastIndex = 0; let m
    while ((m = re.exec(code)) !== null)
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
  }
  addM(new RegExp(PY_COMMENT.source, "g"), "comment")
  addM(new RegExp(PY_STRING.source, "g"), "string")
  addM(new RegExp(PY_DECO.source, "g"), "deco")
  addM(new RegExp(PY_KEYWORDS.source, "g"), "kw")
  addM(new RegExp(PY_NUMBER.source, "g"), "num")
  matches.sort((a, b) => a.start - b.start)
  const filtered: M[] = []
  let cur = 0
  for (const m of matches) { if (m.start >= cur) { filtered.push(m); cur = m.end } }
  cur = 0; let html = ""
  const colors: Record<string, string> = { kw: "#ff7b72", comment: "#8b949e", string: "#a5d6ff", deco: "#ffa657", num: "#ffa657" }
  for (const m of filtered) {
    if (m.start > cur) html += escHtml(code.slice(cur, m.start))
    const c = colors[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${c};font-style:italic` : `color:${c}`
    html += `<span style="${style}">${escHtml(m.text)}</span>`
    cur = m.end
  }
  if (cur < code.length) html += escHtml(code.slice(cur))
  return html
}

// ── Pyodide singleton ─────────────────────────────────────────────────────────
// Window.loadPyodide is already declared in blank-code-runner.tsx with a compatible type
let pyodideInstance: any = null
let pyodideLoading: Promise<any> | null = null

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance
  if (pyodideLoading) return pyodideLoading
  pyodideLoading = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script")
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
        s.onload = () => resolve(); s.onerror = reject
        document.head.appendChild(s)
      })
    }
    pyodideInstance = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" })
    return pyodideInstance
  })()
  return pyodideLoading
}

// ── Wandbox ──────────────────────────────────────────────────────────────────
const WANDBOX_API = "https://wandbox.org/api/compile.json"

// ── Default snippets ──────────────────────────────────────────────────────────
const DEFAULT_CPP = `#include <iostream>
using namespace std;

int main() {
    // 여기에 코드를 작성하세요

    return 0;
}`

const DEFAULT_PYTHON = `# 여기에 코드를 작성하세요
`

// ── Component ─────────────────────────────────────────────────────────────────
interface TeacherLiveEditorProps {
  defaultLang?: "cpp" | "python"
  onClose: () => void
}

export function TeacherLiveEditor({ defaultLang = "cpp", onClose }: TeacherLiveEditorProps) {
  const [lang, setLang] = useState<"cpp" | "python">(defaultLang)
  const [code, setCode] = useState(defaultLang === "cpp" ? DEFAULT_CPP : DEFAULT_PYTHON)
  const [stdin, setStdin] = useState("")
  const [showStdin, setShowStdin] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [pyLoaded, setPyLoaded] = useState(false)
  const [pyLoading, setPyLoading] = useState(false)
  const prevLangRef = useRef(lang)

  // 언어 전환 시 기본 코드 세팅
  const handleLangSwitch = (newLang: "cpp" | "python") => {
    if (newLang === lang) return
    setLang(newLang)
    setCode(newLang === "cpp" ? DEFAULT_CPP : DEFAULT_PYTHON)
    setOutput(null)
    setError(null)
    prevLangRef.current = newLang
  }

  // Python: Pyodide 미리 로드
  useEffect(() => {
    if (lang === "python" && !pyLoaded && !pyLoading) {
      setPyLoading(true)
      getPyodide().then(() => { setPyLoaded(true); setPyLoading(false) }).catch(() => setPyLoading(false))
    }
  }, [lang, pyLoaded, pyLoading])

  const runCode = useCallback(async () => {
    if (!code.trim() || isRunning) return
    setIsRunning(true)
    setOutput(null)
    setError(null)

    try {
      if (lang === "cpp") {
        const res = await fetch(WANDBOX_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            compiler: "gcc-13.2.0",
            "compiler-option-raw": "-std=c++17",
            ...(stdin.trim() ? { stdin } : {}),
          }),
        })
        if (!res.ok) throw new Error("Wandbox API 오류")
        const data = await res.json()
        if (data.compiler_error) {
          const firstErr = data.compiler_error.split("\n").find((l: string) => l.includes("error:"))
          setError("❌ " + (firstErr?.split("error:")[1]?.trim() || data.compiler_error.split("\n")[0]))
        } else {
          setOutput(data.program_output || data.output || "(출력 없음)")
        }
      } else {
        // Python: Pyodide
        const py = await getPyodide()
        const lines: string[] = []
        py.setStdout({ batched: (s: string) => lines.push(s) })

        // stdin 주입 (input() 호출 시 줄 단위로 반환)
        if (stdin.trim()) {
          const stdinLines = stdin.trim().split("\n")
          let stdinIdx = 0
          py.globals.set("_stdin_lines", py.toPy(stdinLines))
          await py.runPythonAsync(`
import builtins
_stdin_lines = list(_stdin_lines)
_stdin_idx = 0
def _patched_input(prompt=''):
    global _stdin_idx
    if prompt:
        print(prompt, end='')
    val = _stdin_lines[_stdin_idx] if _stdin_idx < len(_stdin_lines) else ''
    _stdin_idx += 1
    return val
builtins.input = _patched_input
`)
        }

        await py.runPythonAsync(code)
        setOutput(lines.join("\n") || "(출력 없음)")
      }
    } catch (e: any) {
      setError("❌ " + (e?.message || String(e)))
    } finally {
      setIsRunning(false)
    }
  }, [code, lang, stdin, isRunning])

  // Cmd+Enter / Ctrl+Enter 단축키
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault()
        runCode()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [runCode])

  const highlight = lang === "cpp" ? highlightCpp : highlightPython

  return (
    <div className="fixed right-0 top-0 bottom-0 z-40 flex flex-col w-[480px] max-w-[95vw] bg-[#0d1117] shadow-2xl border-l border-gray-700">
      {/* 헤더 */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700 shrink-0">
        <span className="text-sm font-bold text-gray-200">👨‍🏫 라이브 에디터</span>

        {/* 언어 토글 */}
        <div className="flex items-center gap-1 ml-2 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => handleLangSwitch("cpp")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-bold transition-colors",
              lang === "cpp" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"
            )}
          >
            C++
          </button>
          <button
            onClick={() => handleLangSwitch("python")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-bold transition-colors",
              lang === "python" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-gray-200"
            )}
          >
            Python
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* 실행 버튼 */}
          <button
            onClick={runCode}
            disabled={isRunning || (lang === "python" && pyLoading)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              isRunning || (lang === "python" && pyLoading)
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500 text-white"
            )}
          >
            {isRunning || (lang === "python" && pyLoading)
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{pyLoading ? "로딩..." : "실행 중..."}</>
              : <><Play className="w-3.5 h-3.5" />실행 <span className="opacity-60 font-normal">⌘↵</span></>
            }
          </button>

          {/* 초기화 */}
          <button
            onClick={() => { setCode(lang === "cpp" ? DEFAULT_CPP : DEFAULT_PYTHON); setOutput(null); setError(null) }}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
            title="초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* 닫기 */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className="flex-1 overflow-auto">
        <SimpleEditor
          value={code}
          onValueChange={setCode}
          highlight={highlight}
          padding={16}
          style={{
            fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
            fontSize: 13,
            lineHeight: 1.6,
            color: "#e6edf3",
            minHeight: "100%",
            background: "transparent",
          }}
          textareaClassName="outline-none"
        />
      </div>

      {/* stdin 토글 */}
      <div className="border-t border-gray-700 shrink-0">
        <button
          onClick={() => setShowStdin(!showStdin)}
          className="flex items-center gap-1.5 w-full px-4 py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showStdin && "rotate-180")} />
          입력값 (stdin)
          {stdin.trim() && <span className="ml-1 px-1.5 py-0.5 rounded bg-blue-900 text-blue-300 text-[10px]">있음</span>}
        </button>
        {showStdin && (
          <textarea
            value={stdin}
            onChange={e => setStdin(e.target.value)}
            placeholder={"프로그램에 입력할 값을 줄 단위로 입력하세요\n예) 3\n10 20 30"}
            className="w-full bg-gray-900 text-gray-300 text-xs font-mono px-4 py-2 outline-none resize-none border-t border-gray-700"
            rows={3}
          />
        )}
      </div>

      {/* 출력 영역 */}
      {(output !== null || error !== null) && (
        <div className="border-t border-gray-700 shrink-0 max-h-[220px] overflow-auto">
          <div className="px-3 py-1.5 border-b border-gray-700 flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">출력</span>
            <button
              onClick={() => { setOutput(null); setError(null) }}
              className="ml-auto text-gray-600 hover:text-gray-400 text-[10px]"
            >
              지우기
            </button>
          </div>
          <pre className={cn(
            "px-4 py-3 text-sm font-mono whitespace-pre-wrap break-words leading-relaxed",
            error ? "text-red-400" : "text-green-300"
          )}>
            {error ?? output}
          </pre>
        </div>
      )}
    </div>
  )
}
