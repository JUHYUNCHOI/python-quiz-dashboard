"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const CODE_LINES = [
  { text: "#include <iostream>", indent: 0 },
  { text: "using namespace std;", indent: 0 },
  { text: "", indent: 0 },
  { text: "int main() {", indent: 0 },
  { text: 'cout << add(3, 5);', indent: 1, isError: true },
  { text: "return 0;", indent: 1 },
  { text: "}", indent: 0 },
  { text: "", indent: 0 },
  { text: "int add(int a, int b) {", indent: 0, isLate: true },
  { text: "return a + b;", indent: 1 },
  { text: "}", indent: 0 },
]

const ERROR_LINE = 4

export function FunctionOrderAnimation() {
  const [currentLine, setCurrentLine] = useState(-1) // -1 = 아직 시작 안 함
  const [showError, setShowError] = useState(false)

  const isStarted = currentLine >= 0
  const isFinished = showError

  const handleStep = () => {
    if (showError) return

    const next = currentLine + 1

    if (next === ERROR_LINE) {
      setCurrentLine(next)
      setShowError(true)
    } else {
      setCurrentLine(next)
    }
  }

  const reset = () => {
    setCurrentLine(-1)
    setShowError(false)
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white font-mono text-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-xs">
          {!isStarted
            ? "▶ 버튼을 눌러 컴파일러가 읽는 순서를 따라가봐요"
            : showError
            ? "💥 컴파일 에러 발생!"
            : `⚡ 컴파일러가 읽는 중... (${currentLine + 1}번째 줄)`}
        </span>
        {isStarted && (
          <button onClick={reset} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ↺ 처음부터
          </button>
        )}
      </div>

      {/* 코드 */}
      <div className="space-y-0.5 mb-4">
        {CODE_LINES.map((row, i) => {
          const isActive = isStarted && i === currentLine
          const isPast = isStarted && i < currentLine
          const isErrorLine = showError && row.isError
          const isLateLine = showError && row.isLate
          const isUnread = isStarted && i > currentLine && !showError

          return (
            <div
              key={i}
              className={cn(
                "relative flex items-center gap-2 rounded px-2 py-0.5 transition-all duration-200",
                isActive && !isErrorLine && "bg-indigo-600/40",
                isErrorLine && "bg-red-500/30",
                isPast && !isErrorLine && "opacity-50",
                isUnread && "opacity-30",
                !isStarted && "opacity-40",
              )}
            >
              <span className="w-5 text-right text-slate-600 text-xs select-none shrink-0">{i + 1}</span>
              <span className={cn(
                "flex-1",
                isActive && !isErrorLine && "text-white font-semibold",
                isErrorLine && "text-red-300 font-bold",
                isLateLine && "text-slate-500 line-through",
              )}>
                {"  ".repeat(row.indent)}
                <CodeLine text={row.text} />
              </span>

              {isErrorLine && (
                <span className="ml-2 shrink-0 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 whitespace-nowrap">
                  ❌ add가 뭔지 몰라요!
                </span>
              )}
              {isLateLine && (
                <span className="ml-2 shrink-0 text-slate-500 text-xs whitespace-nowrap">
                  ← 너무 늦어요
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* 에러 설명 */}
      {showError && (
        <div className="mb-4 rounded-xl border border-red-500/50 bg-red-950/40 p-3 text-sm">
          <p className="text-red-300 font-bold mb-1">💥 컴파일 에러!</p>
          <p className="text-slate-300 text-xs leading-relaxed">
            컴파일러가 5번째 줄 <code className="text-red-300">add(3, 5)</code>를 만났는데,
            아직 <code className="text-red-300">add</code>가 뭔지 정의된 적이 없어요.
            <br />
            C++은 코드를 <strong className="text-white">위에서 아래로</strong> 읽기 때문에,
            함수를 쓰기 전에 먼저 알려줘야 해요!
          </p>
        </div>
      )}

      {/* 버튼 */}
      {!isFinished && (
        <button
          onClick={handleStep}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors"
        >
          {!isStarted ? "▶ 시작" : "▶ 다음 줄"}
        </button>
      )}
    </div>
  )
}

function CodeLine({ text }: { text: string }) {
  if (!text) return <span>&nbsp;</span>
  const keywords = ["int", "return", "using", "namespace", "std", "void", "cout", "include"]
  const parts = text.split(/(\b(?:int|return|using|namespace|std|void|cout|include)\b|"[^"]*"|<<|#\w+|\d+)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("#")) return <span key={i} className="text-pink-400">{part}</span>
        if (part.startsWith('"')) return <span key={i} className="text-emerald-400">{part}</span>
        if (keywords.includes(part)) return <span key={i} className="text-sky-400">{part}</span>
        if (/^\d+$/.test(part)) return <span key={i} className="text-orange-300">{part}</span>
        if (part === "<<") return <span key={i} className="text-pink-400">{part}</span>
        return <span key={i} className="text-slate-200">{part}</span>
      })}
    </>
  )
}
