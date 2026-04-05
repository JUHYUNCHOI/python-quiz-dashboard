"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FileText, Play, RotateCcw } from "lucide-react"

/**
 * 파일 읽기 메서드 비교 시뮬레이터
 * read() vs readline() vs readlines() 의 차이를 시각화
 */
export function ReadMethodDemo({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const [method, setMethod] = useState<"read" | "readline" | "readlines" | null>(null)
  const [step, setStep] = useState(0)

  const fileLines = isEn ? ["first line", "second line", "third line"] : ["첫 번째 줄", "두 번째 줄", "세 번째 줄"]

  const methods = [
    {
      key: "read" as const,
      label: "read()",
      desc: isEn ? "all → string" : "전체 → 문자열",
      emoji: "📄",
      color: "purple"
    },
    {
      key: "readline" as const,
      label: "readline()",
      desc: isEn ? "one line → string" : "한 줄 → 문자열",
      emoji: "📃",
      color: "teal"
    },
    {
      key: "readlines" as const,
      label: "readlines()",
      desc: isEn ? "all → list" : "전체 → 리스트",
      emoji: "📚",
      color: "indigo"
    },
  ]

  const simulate = (m: "read" | "readline" | "readlines") => {
    setMethod(m)
    setStep(1)
    setTimeout(() => setStep(2), 800)
  }

  const getResult = () => {
    if (method === "read") {
      return {
        type: "str",
        value: fileLines.join("\\n"),
        display: fileLines.join("\n"),
        highlight: [0, 1, 2]
      }
    } else if (method === "readline") {
      return {
        type: "str",
        value: fileLines[0] + "\\n",
        display: fileLines[0],
        highlight: [0]
      }
    } else {
      return {
        type: "list",
        value: `['${fileLines[0]}\\n', '${fileLines[1]}\\n', '${fileLines[2]}']`,
        display: fileLines.join("\n"),
        highlight: [0, 1, 2]
      }
    }
  }

  const reset = () => {
    setMethod(null)
    setStep(0)
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 md:p-6 border-2 border-purple-200">
      {/* 파일 내용 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-sm text-purple-800">📄 memo.txt</span>
        </div>
        <div className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden">
          {fileLines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "px-3 py-1.5 font-mono text-sm border-b last:border-b-0 flex items-center gap-2 transition-all duration-300",
                step === 2 && method && getResult().highlight.includes(i)
                  ? "bg-yellow-100 text-gray-800"
                  : "text-gray-600"
              )}
            >
              <span className="text-xs text-gray-400 w-4">{i + 1}</span>
              {line}
              {i < fileLines.length - 1 && <span className="text-gray-300 text-xs ml-auto">↵</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 메서드 선택 */}
      {step === 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-600 text-center mb-3">
            f.<span className="text-purple-600">???</span>() — {isEn ? "Which method to read with?" : "어떤 방법으로 읽을까요?"}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {methods.map(m => (
              <button
                key={m.key}
                onClick={() => simulate(m.key)}
                className={cn(
                  "py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all border-2",
                  "bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
                )}
              >
                <div className="text-xl mb-1">{m.emoji}</div>
                <div className="font-mono">{m.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 결과 */}
      {step >= 1 && method && (
        <div className="space-y-3">
          {step === 1 && (
            <div className="text-center py-3 animate-pulse text-purple-500 text-sm font-bold">
              {isEn ? "Reading... 📖" : "읽는 중... 📖"}
            </div>
          )}

          {step === 2 && (
            <>
              <div className="bg-gray-800 rounded-xl p-3 md:p-4">
                <div className="text-gray-400 text-xs mb-1 font-mono">
                  {isEn ? "result" : "결과"} = f.{method}()
                </div>
                <div className="text-green-300 font-mono text-sm">
                  {getResult().value}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <span className="text-gray-500 text-xs">{isEn ? "type: " : "타입: "}</span>
                  <span className={cn(
                    "text-xs font-mono font-bold",
                    getResult().type === "str" ? "text-amber-300" : "text-cyan-300"
                  )}>
                    {getResult().type === "str" ? (isEn ? "string (str)" : "문자열 (str)") : (isEn ? "list (list)" : "리스트 (list)")}
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {isEn ? "Try another method" : "다른 메서드 시도"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
