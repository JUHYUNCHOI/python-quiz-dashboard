"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FileText, ArrowRight, ArrowDown, RotateCcw } from "lucide-react"

/**
 * 파일 모드 비교 시뮬레이터
 * w, r, a 모드의 차이를 시각적으로 보여줌
 */
export function FileModeSimulator({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const initialContent = isEn ? "existing data\nprevious record" : "기존 데이터\n이전 기록"
  const newContent = isEn ? "new content!" : "새로운 내용!"
  const [fileContent, setFileContent] = useState(initialContent)
  const [mode, setMode] = useState<"w" | "r" | "a" | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [step, setStep] = useState(0)

  const modes = [
    {
      key: "w" as const,
      label: isEn ? "w (write)" : "w (쓰기)",
      color: "red",
      desc: isEn ? "Deletes existing → writes new" : "기존 내용 삭제 → 새로 씀",
      action: newContent,
      emoji: "🗑️✏️"
    },
    {
      key: "r" as const,
      label: isEn ? "r (read)" : "r (읽기)",
      color: "green",
      desc: isEn ? "Reads content only" : "내용을 읽기만 함",
      action: "",
      emoji: "👀"
    },
    {
      key: "a" as const,
      label: isEn ? "a (append)" : "a (추가)",
      color: "blue",
      desc: isEn ? "Appends after existing content" : "기존 내용 뒤에 추가",
      action: newContent,
      emoji: "➕"
    },
  ]

  const simulate = (m: "w" | "r" | "a") => {
    setMode(m)
    setStep(1)

    setTimeout(() => {
      if (m === "w") {
        setResult(newContent)
      } else if (m === "r") {
        setResult(fileContent)
      } else {
        setResult(fileContent + "\n" + newContent)
      }
      setStep(2)
    }, 1000)
  }

  const reset = () => {
    setMode(null)
    setResult(null)
    setStep(0)
    setFileContent(initialContent)
  }

  const selectedMode = modes.find(m => m.key === mode)

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 md:p-6 border-2 border-amber-200">
      {/* 파일 현재 상태 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-sm text-amber-800">{isEn ? "📄 data.txt (current content)" : "📄 data.txt (현재 내용)"}</span>
        </div>
        <div className="bg-white rounded-xl p-3 border-2 border-amber-200 font-mono text-sm">
          <pre className="whitespace-pre-wrap text-gray-700">{fileContent}</pre>
        </div>
      </div>

      {/* 모드 선택 */}
      {step === 0 && (
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-600 text-center mb-3">
            open('data.txt', <span className="text-red-500">???</span>) — {isEn ? "Which mode to open with?" : "어떤 모드로 열까요?"}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {modes.map(m => (
              <button
                key={m.key}
                onClick={() => simulate(m.key)}
                className={cn(
                  "py-3 px-2 rounded-xl font-bold text-sm transition-all border-2",
                  m.color === "red" && "bg-red-50 border-red-300 hover:bg-red-100 text-red-700",
                  m.color === "green" && "bg-green-50 border-green-300 hover:bg-green-100 text-green-700",
                  m.color === "blue" && "bg-blue-50 border-blue-300 hover:bg-blue-100 text-blue-700",
                )}
              >
                <div className="text-2xl mb-1">{m.emoji}</div>
                <div>'{m.key}'</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 실행 과정 */}
      {step >= 1 && selectedMode && (
        <div className="space-y-3">
          <div className={cn(
            "text-center py-2 rounded-xl font-bold text-sm",
            selectedMode.color === "red" && "bg-red-100 text-red-700",
            selectedMode.color === "green" && "bg-green-100 text-green-700",
            selectedMode.color === "blue" && "bg-blue-100 text-blue-700",
          )}>
            {selectedMode.emoji} open('data.txt', '{mode}') → {selectedMode.desc}
          </div>

          {step === 1 && (
            <div className="text-center py-4 animate-pulse text-gray-500 text-sm">
              {isEn ? "Processing..." : "처리 중..."}
            </div>
          )}

          {step === 2 && result !== null && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <ArrowDown className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-sm text-gray-600">
                  {mode === "r" ? (isEn ? "Read result:" : "읽은 결과:") : (isEn ? "File content changed:" : "파일 내용 변경:")}
                </span>
              </div>
              <div className={cn(
                "rounded-xl p-3 border-2 font-mono text-sm",
                selectedMode.color === "red" && "bg-red-50 border-red-200",
                selectedMode.color === "green" && "bg-green-50 border-green-200",
                selectedMode.color === "blue" && "bg-blue-50 border-blue-200",
              )}>
                <pre className="whitespace-pre-wrap">{result}</pre>
              </div>

              {mode === "w" && (
                <div className="text-center text-xs text-red-600 font-bold">
                  {isEn ? "⚠️ Existing content was deleted!" : "⚠️ 기존 내용이 사라졌어요!"}
                </div>
              )}
              {mode === "a" && (
                <div className="text-center text-xs text-blue-600 font-bold">
                  {isEn ? "✅ Appended after existing content!" : "✅ 기존 내용 뒤에 추가됐어요!"}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {isEn ? "Try another mode" : "다른 모드 시도"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
