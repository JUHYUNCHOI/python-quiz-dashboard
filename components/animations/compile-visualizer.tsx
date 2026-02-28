"use client"

import React, { useState, useEffect, useRef } from "react"

// ============================================
// 컴파일 시뮬레이터
// C++ 코드 → 컴파일 → 기계어(바이너리) 변환 시각화
// ============================================

interface CompileVisualizerProps {
  lang?: "ko" | "en"
}

// 가짜 바이너리 생성
function generateBinary(length: number): string {
  return Array.from({ length }, () => Math.random() > 0.5 ? "1" : "0").join("")
}

// 코드 → 바이너리 매핑
function codeToBinaryLines(code: string): string[] {
  return code.split("\n").map(line => {
    if (!line.trim()) return ""
    const bytes = line.trim().split("").map(ch =>
      ch.charCodeAt(0).toString(2).padStart(8, "0")
    )
    return bytes.slice(0, 4).join(" ")
  })
}

const CODE_SAMPLES = [
  { label: { ko: "Hello World", en: "Hello World" }, code: `cout << "Hi!";\nreturn 0;` },
  { label: { ko: "변수 선언", en: "Variables" }, code: `int x = 42;\ncout << x;` },
  { label: { ko: "반복문", en: "Loop" }, code: `for(int i=0; i<5; i++)\n  cout << i;` },
]

export function CompileVisualizer({ lang = "ko" }: CompileVisualizerProps) {
  const [selectedCode, setSelectedCode] = useState(0)
  const [phase, setPhase] = useState<"idle" | "compiling" | "done">("idle")
  const [binaryLines, setBinaryLines] = useState<string[]>([])
  const [revealedLines, setRevealedLines] = useState(0)
  const [scrambleText, setScrambleText] = useState<string[]>([])

  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const revealRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentLineRef = useRef(0)

  const code = CODE_SAMPLES[selectedCode].code
  const codeLines = code.split("\n")

  const t = {
    ourCode: lang === "ko" ? "우리가 쓴 코드" : "Our Code",
    machineCode: lang === "ko" ? "컴퓨터가 읽는 기계어" : "Machine Language",
    compile: "COMPILE",
    convert: lang === "ko" ? "바꾸기!" : "Convert!",
    placeholder: lang === "ko" ? "변환 결과가 여기에 표시됩니다" : "Conversion result will appear here",
    bottomText: lang === "ko"
      ? "컴퓨터는 0과 1만 이해해요. 우리 코드를 바꿔줘야 실행할 수 있어요!"
      : "Computers only understand 0s and 1s. We need to convert our code to run it!",
    compiling: lang === "ko" ? "컴파일 중..." : "Compiling...",
    reset: lang === "ko" ? "다시 해보기" : "Try again",
  }

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current)
      if (revealRef.current) clearInterval(revealRef.current)
    }
  }, [])

  const clearTimers = () => {
    if (scrambleRef.current) { clearInterval(scrambleRef.current); scrambleRef.current = null }
    if (revealRef.current) { clearInterval(revealRef.current); revealRef.current = null }
  }

  const handleCompile = () => {
    if (phase !== "idle") return

    const targetLines = codeToBinaryLines(code)
    const lineCount = targetLines.filter(l => l).length

    setBinaryLines(targetLines)
    setRevealedLines(0)
    setPhase("compiling")
    currentLineRef.current = 0

    // 스크램블 효과
    scrambleRef.current = setInterval(() => {
      setScrambleText(targetLines.map(() => generateBinary(32)))
    }, 80)

    // 줄별 reveal
    revealRef.current = setInterval(() => {
      currentLineRef.current += 1
      setRevealedLines(currentLineRef.current)
      if (currentLineRef.current >= lineCount) {
        clearTimers()
        setPhase("done")
      }
    }, 600)
  }

  const handleReset = () => {
    clearTimers()
    setPhase("idle")
    setBinaryLines([])
    setRevealedLines(0)
    setScrambleText([])
    currentLineRef.current = 0
  }

  const handleCodeChange = (idx: number) => {
    setSelectedCode(idx)
    handleReset()
  }

  return (
    <div className="w-full space-y-4">
      {/* 코드 선택 탭 */}
      <div className="flex gap-2 justify-center">
        {CODE_SAMPLES.map((sample, i) => (
          <button
            key={i}
            onClick={() => handleCodeChange(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCode === i
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            {sample.label[lang]}
          </button>
        ))}
      </div>

      {/* 메인 시뮬레이터 */}
      <div className="bg-gray-900 rounded-2xl p-5 md:p-7 space-y-5">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* 왼쪽: 우리가 쓴 코드 */}
          <div className="flex-1 rounded-xl border-2 border-emerald-500/40 bg-gray-800/50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <span className="text-emerald-400 text-sm font-bold">{t.ourCode}</span>
            </div>
            <div className="font-mono text-sm space-y-1">
              {codeLines.map((line, i) => (
                <div key={i} className={`transition-all duration-300 ${
                  phase === "compiling" && revealedLines <= i ? "text-amber-300" : "text-gray-200"
                }`}>
                  {highlightCpp(line)}
                </div>
              ))}
            </div>
          </div>

          {/* 화살표 */}
          <div className="flex md:flex-col items-center justify-center gap-1 py-2 md:py-0 md:px-2">
            <div className={`transition-all duration-500 ${
              phase === "compiling" ? "text-emerald-400 scale-110" : "text-gray-500"
            }`}>
              <svg className="hidden md:block w-16 h-6" viewBox="0 0 64 24">
                <line x1="0" y1="12" x2="50" y2="12" stroke="currentColor" strokeWidth="2.5"
                  strokeDasharray={phase === "compiling" ? "4 4" : "0"}>
                  {phase === "compiling" && <animate attributeName="stroke-dashoffset" values="8;0" dur="0.4s" repeatCount="indefinite" />}
                </line>
                <polygon points="50,6 62,12 50,18" fill="currentColor" />
              </svg>
              <svg className="md:hidden w-6 h-10" viewBox="0 0 24 40">
                <line x1="12" y1="0" x2="12" y2="30" stroke="currentColor" strokeWidth="2.5"
                  strokeDasharray={phase === "compiling" ? "4 4" : "0"}>
                  {phase === "compiling" && <animate attributeName="stroke-dashoffset" values="8;0" dur="0.4s" repeatCount="indefinite" />}
                </line>
                <polygon points="6,30 12,40 18,30" fill="currentColor" />
              </svg>
            </div>
            <span className={`text-[10px] font-black tracking-widest transition-colors ${
              phase === "compiling" ? "text-emerald-400" : "text-gray-500"
            }`}>
              {t.compile}
            </span>
          </div>

          {/* 오른쪽: 기계어 */}
          <div className={`flex-1 rounded-xl border-2 p-4 transition-all duration-500 ${
            phase === "done" ? "border-amber-500/40 bg-gray-800/50" : "border-gray-600/40 bg-gray-800/30"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                phase === "done" ? "bg-amber-500/20" : "bg-gray-700"
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={phase === "done" ? "#f59e0b" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </span>
              <span className={`text-sm font-bold transition-colors ${
                phase === "done" ? "text-amber-400" : "text-gray-500"
              }`}>
                {t.machineCode}
              </span>
            </div>
            <div className="font-mono text-sm min-h-[3rem]">
              {phase === "idle" && (
                <p className="text-gray-600 text-xs italic">{t.placeholder}</p>
              )}
              {(phase === "compiling" || phase === "done") && (
                <div className="space-y-1">
                  {codeLines.map((_, i) => {
                    if (!codeLines[i].trim()) return <div key={i} className="h-4" />
                    if (i < revealedLines) {
                      return (
                        <div key={i} className="text-emerald-400">
                          {binaryLines[i]}
                        </div>
                      )
                    }
                    if (phase === "compiling") {
                      return (
                        <div key={i} className="text-gray-600 animate-pulse">
                          {scrambleText[i] || generateBinary(32)}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center">
          {phase === "idle" && (
            <button
              onClick={handleCompile}
              className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              {t.convert}
            </button>
          )}
          {phase === "compiling" && (
            <div className="px-8 py-3 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              {t.compiling}
            </div>
          )}
          {phase === "done" && (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold text-sm transition-all flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              {t.reset}
            </button>
          )}
        </div>

        {/* 하단 설명 */}
        <p className="text-center text-gray-500 text-xs">
          {t.bottomText}
        </p>
      </div>
    </div>
  )
}

// 간단한 C++ 코드 하이라이팅
function highlightCpp(line: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = []
  const regex = /(#include|cout|cin|endl|int|double|string|char|bool|return|for|if|else|while|void|using|namespace|std)|("(?:[^"\\]|\\.)*")|(\b\d+\b)|(<<|>>|[{};()=+\-*/<>!,])|(\s+)|([a-zA-Z_]\w*)/g
  let match
  let lastIndex = 0

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(<span key={`t${lastIndex}`} className="text-gray-300">{line.slice(lastIndex, match.index)}</span>)
    }
    if (match[1]) tokens.push(<span key={`k${match.index}`} className="text-orange-400 font-bold">{match[1]}</span>)
    else if (match[2]) tokens.push(<span key={`s${match.index}`} className="text-emerald-400">{match[2]}</span>)
    else if (match[3]) tokens.push(<span key={`n${match.index}`} className="text-amber-300">{match[3]}</span>)
    else if (match[4]) tokens.push(<span key={`o${match.index}`} className="text-gray-400">{match[4]}</span>)
    else if (match[5]) tokens.push(<span key={`w${match.index}`}>{match[5]}</span>)
    else if (match[6]) tokens.push(<span key={`i${match.index}`} className="text-gray-200">{match[6]}</span>)
    lastIndex = regex.lastIndex
  }

  if (lastIndex < line.length) {
    tokens.push(<span key={`e${lastIndex}`} className="text-gray-300">{line.slice(lastIndex)}</span>)
  }
  return tokens.length > 0 ? tokens : [<span key="plain" className="text-gray-300">{line}</span>]
}
