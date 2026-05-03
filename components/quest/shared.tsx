"use client"

import { useState, useEffect } from "react"

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
      className={`rounded-xl border-2 px-4 py-2.5 text-sm font-semibold leading-relaxed whitespace-pre-line mb-2.5 min-h-[40px] font-sans ${variantClasses[variant]}`}
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

export function Quiz({ question, hint, options, correct, explain, answered, onAnswer }: QuizProps) {
  return (
    <div className="p-4">
      <div className="text-sm font-bold mb-3 text-gray-800">{question}</div>
      {hint && (
        <div className="text-xs font-semibold mb-2 text-amber-600">💡 {hint}</div>
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
              {o}
            </button>
          )
        })}
      </div>
      {answered != null && explain && (
        <div className="mt-2.5 px-3 py-2 bg-green-50 rounded-lg border border-green-200 text-xs font-semibold text-green-600">
          {explain}
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

export function highlight(line: string): React.ReactNode[] {
  const keywords = [
    "def", "return", "for", "if", "else", "elif", "while", "import", "from",
    "in", "range", "not", "and", "or", "True", "False", "None", "print",
    "int", "map", "input", "split", "len", "all", "abs", "round",
  ]
  const parts: React.ReactNode[] = []
  let rest = line
  const commentIdx = rest.indexOf("#")
  let comment = ""
  if (commentIdx >= 0) { comment = rest.slice(commentIdx); rest = rest.slice(0, commentIdx) }

  const re = /(\b\w+\b|"[^"]*"|'[^']*'|\d+|[^\w\s]|\s+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(rest)) !== null) {
    const tok = m[0]
    if (keywords.includes(tok))
      parts.push(<span key={m.index} style={{ color: "#c084fc" }}>{tok}</span>)
    else if (/^\d+$/.test(tok))
      parts.push(<span key={m.index} style={{ color: "#fbbf24" }}>{tok}</span>)
    else if (/^["']/.test(tok))
      parts.push(<span key={m.index} style={{ color: "#34d399" }}>{tok}</span>)
    else
      parts.push(<span key={m.index} style={{ color: "#f8fafc" }}>{tok}</span>)
  }
  if (comment)
    parts.push(<span key="cmt" style={{ color: "#94a3b8", fontStyle: "italic" }}>{comment}</span>)
  return parts
}

// ── CodeBlock ─────────────────────────────────────────────────────────────────

interface CodeBlockProps {
  lines: string[]
}

export function CodeBlock({ lines }: CodeBlockProps) {
  return (
    <div className="bg-gray-900 rounded-xl px-3 py-3 overflow-x-auto text-[13px] leading-relaxed font-mono">
      {lines.map((l, i) => (
        <div key={i} className="flex min-h-5">
          <span className="text-gray-500 w-7 text-right mr-2.5 flex-shrink-0 select-none text-[11px]">
            {i + 1}
          </span>
          <span style={{ whiteSpace: "pre" }}>{highlight(l)}</span>
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
