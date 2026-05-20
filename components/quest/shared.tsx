"use client"

import { Fragment, useState, useEffect } from "react"
import type React from "react"

// ── Typing animation hook ─────────────────────────────────────────────────────

export function useTyping(text: string, speed = 28): string {
  const [shown, setShown] = useState("")
  useEffect(() => {
    setShown("")
    if (!text) return
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return shown
}

// ── Narration ─────────────────────────────────────────────────────────────────

interface NarrationProps {
  text: string
  variant?: "accent" | "ok" | "no"
}

export function Narration({ text, variant = "accent" }: NarrationProps) {
  const shown = useTyping(text)

  const variantClasses = {
    accent: "bg-blue-50 border-blue-200 text-blue-600",
    ok:     "bg-green-50 border-green-200 text-green-600",
    no:     "bg-red-50 border-red-200 text-red-600",
  }

  return (
    <div
      className={`rounded-xl border-2 px-2 sm:px-4 py-1.5 sm:py-2.5 text-[13px] sm:text-sm font-semibold leading-relaxed whitespace-pre-line break-keep mb-2 sm:mb-2.5 min-h-[36px] sm:min-h-[40px] font-sans ${variantClasses[variant]}`}
    >
      {shown}
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

interface QuizProps {
  question: string
  hint?: string
  options: string[]
  correct: number
  explain?: string
  answered: number | null
  onAnswer: (i: number) => void
}

// 인라인 마크다운 — backtick 코드 + **bold** 처리. Quiz / NumInput
// 등 plain text 만 받던 props 가 이제 `code` / **bold** 도 자연 렌더.
function renderInline(text: string): React.ReactNode {
  if (!text) return text
  // 1단계: **bold** 로 분리
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g)
  return boldParts.map((part, bi) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2)
      // bold 안 backtick 처리
      return <strong key={bi}>{renderInlineCode(inner, `b${bi}-`)}</strong>
    }
    return <Fragment key={bi}>{renderInlineCode(part, `n${bi}-`)}</Fragment>
  })
}

function renderInlineCode(text: string, keyPrefix: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((p, j) => {
    if (p.startsWith("`") && p.endsWith("`") && p.length >= 2) {
      return (
        <code
          key={`${keyPrefix}${j}`}
          className="bg-indigo-100 px-1.5 py-0.5 rounded-md font-mono text-indigo-700 text-[0.9em] font-semibold"
        >
          {p.slice(1, -1)}
        </code>
      )
    }
    return <Fragment key={`${keyPrefix}${j}`}>{p}</Fragment>
  })
}

export function Quiz({ question, hint, options, correct, explain, answered, onAnswer }: QuizProps) {
  return (
    <div className="p-4">
      <div className="text-sm font-bold mb-3 text-gray-800">{renderInline(question)}</div>
      {hint && (
        <div className="text-xs font-semibold mb-2 text-amber-600">💡 {renderInline(hint)}</div>
      )}
      <div className="flex flex-col gap-1.5">
        {options.map((o, i) => {
          const picked = answered === i
          const isCorrect = i === correct
          const showResult = answered != null

          let cls = "bg-white border-gray-200 text-gray-800"
          if (showResult && isCorrect)              cls = "bg-green-50 border-green-200 text-green-600"
          else if (showResult && picked && !isCorrect) cls = "bg-red-50 border-red-200 text-red-600"

          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={showResult}
              className={`text-left px-3.5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${cls} ${!showResult ? "cursor-pointer hover:border-blue-300" : "cursor-default"}`}
            >
              {showResult && isCorrect ? "✅ " : showResult && picked ? "❌ " : ""}
              {renderInline(o)}
            </button>
          )
        })}
      </div>
      {answered != null && explain && (
        <div className="mt-2.5 px-3 py-2 bg-green-50 rounded-lg border border-green-200 text-xs font-semibold text-green-600">
          {renderInline(explain)}
        </div>
      )}
    </div>
  )
}

// ── NumInput ──────────────────────────────────────────────────────────────────

interface NumInputProps {
  question: string
  hint?: string
  answer: number
  E?: boolean
  onSolve?: () => void
}

export function NumInput({ question, hint, answer, E, onSolve }: NumInputProps) {
  const [val, setVal] = useState("")
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(false)

  const submit = () => {
    const n = parseInt(val, 10)
    if (n === answer) { setCorrect(true); setWrong(false); onSolve?.() }
    else setWrong(true)
  }

  const inputBorder = correct ? "border-green-200 bg-green-50" : wrong ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"

  return (
    <div className="p-4">
      <div className="text-sm font-bold mb-2.5 text-gray-800">{question}</div>
      {hint && (
        <div className="text-xs font-semibold mb-2 text-amber-600">💡 {hint}</div>
      )}
      <div className="flex gap-1.5 items-center">
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          disabled={correct}
          className={`w-20 px-3 py-2 rounded-lg border-2 text-lg font-black text-center font-mono outline-none ${inputBorder}`}
        />
        {!correct && (
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg border-2 border-blue-600 bg-blue-600 text-white text-sm font-bold cursor-pointer"
          >
            {E ? "Check" : "확인"}
          </button>
        )}
        {correct && <span className="text-xl">✅</span>}
        {wrong && !correct && (
          <span className="text-xs font-bold text-red-600">
            {E ? "Try again!" : "다시!"}
          </span>
        )}
      </div>
    </div>
  )
}

// ── TextInput ─────────────────────────────────────────────────────────────────

interface TextInputProps {
  question: string
  hint?: string
  answer: string
  E?: boolean
  onSolve?: () => void
}

export function TextInput({ question, hint, answer, E, onSolve }: TextInputProps) {
  const [val, setVal] = useState("")
  const [wrong, setWrong] = useState(false)
  const [correct, setCorrect] = useState(false)

  const normalizeInput = (s: string) =>
    s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').trim().toLowerCase()

  const submit = () => {
    if (normalizeInput(val) === normalizeInput(answer)) {
      setCorrect(true); setWrong(false); onSolve?.()
    } else {
      setWrong(true)
    }
  }

  const inputBorder = correct ? "border-green-200 bg-green-50" : wrong ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"

  return (
    <div className="p-4">
      <div className="text-sm font-bold mb-2.5 text-gray-800 whitespace-pre-line">{question}</div>
      {hint && (
        <div className="text-xs font-semibold mb-2 text-amber-600">💡 {hint}</div>
      )}
      <div className="flex gap-1.5 items-center">
        <input
          value={val}
          onChange={e => setVal(e.target.value.toLowerCase())}
          onKeyDown={e => e.key === "Enter" && submit()}
          disabled={correct}
          className={`w-24 px-3 py-2 rounded-lg border-2 text-lg font-black text-center font-mono outline-none ${inputBorder}`}
        />
        {!correct && (
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg border-2 border-blue-600 bg-blue-600 text-white text-sm font-bold cursor-pointer"
          >
            {E ? "Check" : "확인"}
          </button>
        )}
        {correct && <span className="text-xl">✅</span>}
        {wrong && !correct && (
          <span className="text-xs font-bold text-red-600">
            {E ? "Try again!" : "다시!"}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Syntax highlighting helper ────────────────────────────────────────────────

const PY_KEYWORDS = new Set([
  "def", "return", "for", "if", "else", "elif", "while", "import", "from",
  "in", "not", "and", "or", "True", "False", "None", "lambda", "class",
  "with", "as", "try", "except", "finally", "raise", "yield", "is",
  "break", "continue", "pass", "global", "nonlocal",
])
const PY_BUILTINS = new Set([
  "print", "input", "range", "len", "sum", "max", "min", "abs", "round",
  "int", "str", "list", "dict", "set", "tuple", "map", "filter", "sorted",
  "reversed", "enumerate", "zip", "all", "any", "open", "type", "isinstance",
  "chr", "ord", "bool", "float", "split", "join",
])

const CPP_KEYWORDS = new Set([
  "int", "long", "short", "double", "float", "char", "bool", "void",
  "auto", "const", "static", "struct", "class", "public", "private",
  "protected", "namespace", "using", "return", "if", "else", "for",
  "while", "do", "break", "continue", "switch", "case", "default",
  "true", "false", "nullptr", "new", "delete", "this", "template",
  "typename", "typedef", "sizeof", "include", "main",
])
const CPP_BUILTINS = new Set([
  "vector", "string", "map", "set", "pair", "tuple", "queue", "stack",
  "deque", "priority_queue", "unordered_map", "unordered_set",
  "cout", "cin", "endl", "ios", "iostream", "std", "sort", "swap",
  "max", "min", "abs", "next_permutation", "iota", "find", "count",
  "lower_bound", "upper_bound", "begin", "end", "size", "empty",
  "push_back", "pop_back", "push_front", "pop_front", "insert", "erase",
  "clear", "front", "back", "first", "second", "to_string", "stoi",
  "make_pair", "make_tuple", "get", "tie", "fill",
])

export function highlight(line: string, lang: "py" | "cpp" = "py"): React.ReactNode[] {
  const keywords = lang === "cpp" ? CPP_KEYWORDS : PY_KEYWORDS
  const builtins = lang === "cpp" ? CPP_BUILTINS : PY_BUILTINS
  const commentMark = lang === "cpp" ? "//" : "#"

  const parts: React.ReactNode[] = []
  let rest = line
  // C++ also has /* … */ but we keep it simple; line-level // covers most.
  const commentIdx = rest.indexOf(commentMark)
  let comment = ""
  if (commentIdx >= 0) { comment = rest.slice(commentIdx); rest = rest.slice(0, commentIdx) }

  // C++ preprocessor (#include, #define) — color whole token
  if (lang === "cpp") {
    const ppm = rest.match(/^(\s*)(#\w+)/)
    if (ppm) {
      parts.push(<span key="ws">{ppm[1]}</span>)
      parts.push(<span key="pp" style={{ color: "#c792ea" }}>{ppm[2]}</span>)
      rest = rest.slice(ppm[0].length)
    }
  }

  const re = /(\b\w+\b|"[^"]*"|'[^']*'|\d+|[^\w\s]|\s+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(rest)) !== null) {
    const tok = m[0]
    if (keywords.has(tok))
      parts.push(<span key={`${m.index}k`} style={{ color: "#c792ea" }}>{tok}</span>)
    else if (builtins.has(tok))
      parts.push(<span key={`${m.index}b`} style={{ color: "#82aaff" }}>{tok}</span>)
    else if (/^\d/.test(tok))
      parts.push(<span key={`${m.index}n`} style={{ color: "#f9a825" }}>{tok}</span>)
    else if (/^["']/.test(tok))
      parts.push(<span key={`${m.index}s`} style={{ color: "#a5d6a7" }}>{tok}</span>)
    else if ("=<>!+-*/%&|^~".includes(tok[0]) && tok.length <= 3)
      parts.push(<span key={`${m.index}o`} style={{ color: "#89ddff" }}>{tok}</span>)
    else
      parts.push(<span key={`${m.index}t`} style={{ color: "#e2e8f0" }}>{tok}</span>)
  }
  if (comment)
    parts.push(<span key="cmt" style={{ color: "#8b949e", fontStyle: "italic" }}>{comment}</span>)
  return parts
}

// ── CodeBlock ─────────────────────────────────────────────────────────────────

interface CodeBlockProps {
  lines: string[]
  lang?: "py" | "cpp"
}

export function CodeBlock({ lines, lang = "py" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea")
      ta.value = lines.join("\n")
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand("copy") } catch {}
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }
  return (
    <div className="relative bg-gray-900 rounded-xl px-3 py-3 overflow-x-auto text-[13px] leading-relaxed font-mono">
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${
          copied
            ? "bg-emerald-600 text-white"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
        style={{ zIndex: 1 }}
        aria-label="Copy code"
      >
        {copied ? "✓ Copied" : "📋 Copy"}
      </button>
      {lines.map((l, i) => (
        <div key={i} className="flex min-h-5">
          <span className="text-gray-500 w-7 text-right mr-2.5 flex-shrink-0 select-none text-[11px]">
            {i + 1}
          </span>
          <span style={{ whiteSpace: "pre" }}>{highlight(l, lang)}</span>
        </div>
      ))}
    </div>
  )
}

// ── CodeReveal ────────────────────────────────────────────────────────────────

interface CodeRevealProps {
  label: string
  lines: string[]
}

export function CodeReveal({ label, lines }: CodeRevealProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-blue-200 bg-blue-50 text-sm font-bold cursor-pointer text-blue-600 flex justify-between items-center"
      >
        <span>{label}</span>
        <span className="text-base">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="mt-2">
          <CodeBlock lines={lines} />
        </div>
      )}
    </div>
  )
}
