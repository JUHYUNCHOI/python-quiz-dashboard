"use client"

import React, { useState } from "react"

// ============================================
// 컴파일 플로우 애니메이션
// 코드 작성 → 컴파일(g++) → 실행파일(a.out) → 실행 → 출력
// + 실행파일 이름 붙이기 (g++ -o hello)
// ============================================

interface CompileFlowProps {
  lang?: "ko" | "en"
}

interface FlowStage {
  id: string
  icon: string
  label: string
  desc: string
  terminal?: string
  output?: string
}

const STAGES: FlowStage[] = [
  {
    id: "write",
    icon: "📝",
    label: "코드 작성",
    desc: "main.cpp 파일에 코드를 작성했어!",
    terminal: "# main.cpp 파일 내용\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello\" << std::endl;\n    return 0;\n}",
  },
  {
    id: "compile",
    icon: "⚡",
    label: "컴파일",
    desc: "g++로 컴파일! 코드를 컴퓨터가 알아듣는 이진수로 변환해!",
    terminal: "$ g++ main.cpp\n\n✓ 컴파일 성공!",
  },
  {
    id: "binary",
    icon: "📦",
    label: "a.out 생성",
    desc: "컴파일 결과로 a.out 실행 파일이 생겨났어!",
    terminal: "$ ls\nmain.cpp    a.out\n\n# a.out = 이진수로 된 실행 파일",
  },
  {
    id: "run",
    icon: "▶️",
    label: "실행",
    desc: "./a.out으로 실행하면...",
    terminal: "$ ./a.out",
  },
  {
    id: "output",
    icon: "🎉",
    label: "출력!",
    desc: "화면에 Hello가 뜬다!",
    terminal: "$ ./a.out\nHello",
    output: "Hello",
  },
]

const NAMING_STAGES: FlowStage[] = [
  {
    id: "name-compile",
    icon: "⚡",
    label: "이름 붙여 컴파일",
    desc: "-o 옵션으로 실행 파일 이름을 정할 수 있어!",
    terminal: "$ g++ -o hello main.cpp\n\n✓ 컴파일 성공!",
  },
  {
    id: "name-check",
    icon: "📦",
    label: "hello 생성",
    desc: "a.out 대신 hello라는 이름의 실행 파일이 생겨났어!",
    terminal: "$ ls\nmain.cpp    hello\n\n# hello = 내가 이름 붙인 실행 파일!",
  },
  {
    id: "name-run",
    icon: "🎉",
    label: "실행!",
    desc: "./hello로 실행!",
    terminal: "$ ./hello\nHello",
    output: "Hello",
  },
]

export function CompileFlow({ lang = "ko" }: CompileFlowProps) {
  const [currentStage, setCurrentStage] = useState(-1)
  const [phase, setPhase] = useState<"flow" | "naming">("flow")
  const [namingStage, setNamingStage] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)

  const stages = phase === "flow" ? STAGES : NAMING_STAGES
  const activeStage = phase === "flow" ? currentStage : namingStage

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)

    if (phase === "flow") {
      if (currentStage < STAGES.length - 1) {
        setCurrentStage(prev => prev + 1)
      } else {
        // Switch to naming phase
        setPhase("naming")
        setNamingStage(-1)
      }
    } else {
      if (namingStage < NAMING_STAGES.length - 1) {
        setNamingStage(prev => prev + 1)
      }
    }

    setTimeout(() => setIsAnimating(false), 400)
  }

  const handleReset = () => {
    setCurrentStage(-1)
    setNamingStage(-1)
    setPhase("flow")
  }

  const isComplete = phase === "naming" && namingStage >= NAMING_STAGES.length - 1

  return (
    <div className="w-full space-y-5">
      {/* 진행 표시 — 파이프라인 */}
      <div className="bg-gray-900 rounded-2xl p-5 md:p-7 space-y-5">
        {/* Phase indicator */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            phase === "flow"
              ? "bg-emerald-500 text-white"
              : "bg-gray-700 text-gray-400"
          }`}>
            기본 흐름
          </span>
          <span className="text-gray-600">→</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            phase === "naming"
              ? "bg-purple-500 text-white"
              : "bg-gray-700 text-gray-400"
          }`}>
            이름 붙이기
          </span>
        </div>

        {/* Pipeline visualization */}
        <div className="flex items-center justify-center gap-1 md:gap-2 overflow-x-auto pb-2">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.id}>
              {i > 0 && (
                <div className={`hidden md:flex items-center transition-all duration-500 ${
                  i <= activeStage ? "text-emerald-400" : "text-gray-600"
                }`}>
                  <svg width="28" height="16" viewBox="0 0 28 16">
                    <line x1="0" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="2"
                      strokeDasharray={i === activeStage + 1 ? "3 3" : "0"}>
                      {i === activeStage + 1 && (
                        <animate attributeName="stroke-dashoffset" values="6;0" dur="0.5s" repeatCount="indefinite" />
                      )}
                    </line>
                    <polygon points="18,4 26,8 18,12" fill="currentColor" />
                  </svg>
                </div>
              )}
              <button
                onClick={() => {
                  if (i <= activeStage) {
                    if (phase === "flow") setCurrentStage(i)
                    else setNamingStage(i)
                  }
                }}
                className={`flex flex-col items-center gap-1 px-2 md:px-3 py-2 rounded-xl transition-all duration-500 min-w-[60px] ${
                  i === activeStage
                    ? "bg-emerald-500/20 border-2 border-emerald-500 scale-110"
                    : i < activeStage
                    ? "bg-gray-700/50 border-2 border-emerald-500/30"
                    : "bg-gray-800/50 border-2 border-gray-700"
                }`}
              >
                <span className={`text-xl md:text-2xl transition-all ${
                  i <= activeStage ? "" : "grayscale opacity-40"
                }`}>
                  {stage.icon}
                </span>
                <span className={`text-[10px] md:text-xs font-bold whitespace-nowrap transition-colors ${
                  i === activeStage ? "text-emerald-400" : i < activeStage ? "text-gray-400" : "text-gray-600"
                }`}>
                  {stage.label}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Terminal display */}
        <div className="rounded-xl bg-gray-950 border border-gray-700 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 border-b border-gray-700">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-gray-500 text-xs font-mono">터미널</span>
          </div>
          {/* Terminal content */}
          <div className="p-4 min-h-[120px] font-mono text-sm">
            {activeStage < 0 ? (
              <p className="text-gray-600 italic">▶ 아래 버튼을 눌러서 시작해보자!</p>
            ) : (
              <div className="space-y-1">
                {stages[activeStage].terminal?.split("\n").map((line, i) => (
                  <div key={i} className={`transition-all duration-300 ${
                    line.startsWith("$")
                      ? "text-emerald-400"
                      : line.startsWith("#")
                      ? "text-gray-500"
                      : line.startsWith("✓")
                      ? "text-green-400 font-bold"
                      : "text-gray-200"
                  }`}>
                    {line}
                  </div>
                ))}
                {/* Output highlight */}
                {stages[activeStage].output && (
                  <div className="mt-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <span className="text-emerald-400 font-bold text-lg">{stages[activeStage].output}</span>
                    <span className="text-gray-500 text-xs ml-2">← 출력 결과!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {activeStage >= 0 && (
          <p className="text-center text-gray-300 text-sm font-medium">
            {stages[activeStage].desc}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          {!isComplete ? (
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {activeStage < 0
                ? "▶ 시작!"
                : phase === "flow" && currentStage >= STAGES.length - 1
                ? "🏷️ 이름 붙이기 배우기"
                : "다음 단계 →"
              }
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold text-sm transition-all flex items-center gap-2"
            >
              🔄 처음부터 다시 보기
            </button>
          )}
        </div>

        {/* Summary — only show at completion */}
        {isComplete && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-2">
            <p className="text-emerald-400 font-bold text-sm text-center">🎉 전체 흐름 정리!</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
              <span className="bg-gray-800 px-3 py-1.5 rounded-lg text-gray-200 font-mono">main.cpp</span>
              <span className="text-emerald-400 font-bold">→</span>
              <span className="bg-gray-800 px-3 py-1.5 rounded-lg text-amber-300 font-mono">g++ main.cpp</span>
              <span className="text-emerald-400 font-bold">→</span>
              <span className="bg-gray-800 px-3 py-1.5 rounded-lg text-purple-300 font-mono">a.out</span>
              <span className="text-emerald-400 font-bold">→</span>
              <span className="bg-gray-800 px-3 py-1.5 rounded-lg text-emerald-300 font-mono">./a.out</span>
              <span className="text-emerald-400 font-bold">→</span>
              <span className="bg-emerald-500/20 px-3 py-1.5 rounded-lg text-emerald-400 font-bold">Hello!</span>
            </div>
            <p className="text-gray-500 text-xs text-center mt-1">
              이름 붙이기: <code className="text-amber-300">g++ -o hello main.cpp</code> → <code className="text-emerald-300">./hello</code>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
