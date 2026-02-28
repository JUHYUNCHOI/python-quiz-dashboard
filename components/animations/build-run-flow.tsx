"use client"

import React, { useState } from "react"

// ============================================
// 빌드-실행 플로우 애니메이션
// main.cpp → g++ → a.out → ./a.out → Hello
// + 이름 붙이기: g++ -o myprogram main.cpp
// ============================================

interface BuildRunFlowProps {
  lang?: "ko" | "en"
}

const PHASES = {
  SOURCE: 0,
  COMPILE: 1,
  AOUT: 2,
  RUN: 3,
  OUTPUT: 4,
  NAMING_INTRO: 5,
  NAMING_COMPILE: 6,
  NAMING_RUN: 7,
  DONE: 8,
} as const

export function BuildRunFlow({ lang = "ko" }: BuildRunFlowProps) {
  const [phase, setPhase] = useState<number>(PHASES.SOURCE)

  const ko = lang === "ko"

  const next = () => setPhase(p => Math.min(p + 1, PHASES.DONE))
  const reset = () => setPhase(PHASES.SOURCE)

  const isNaming = phase >= PHASES.NAMING_INTRO

  // 현재 보여줄 노드들
  const nodes = isNaming ? [
    {
      icon: "📝", label: "main.cpp",
      desc: ko ? "우리가 쓴 코드" : "Our code",
      active: phase >= PHASES.NAMING_INTRO,
      color: "emerald",
    },
    {
      icon: "🔧", label: "g++ -o myprogram main.cpp",
      desc: ko ? "이름 지정 컴파일!" : "Compile with name!",
      active: phase >= PHASES.NAMING_COMPILE,
      color: "blue",
      terminal: true,
    },
    {
      icon: "💾", label: "myprogram",
      desc: ko ? "내가 정한 이름의 실행 파일!" : "Named executable!",
      active: phase >= PHASES.NAMING_COMPILE,
      color: "amber",
    },
    {
      icon: "▶️", label: "./myprogram",
      desc: ko ? "실행!" : "Run!",
      active: phase >= PHASES.NAMING_RUN,
      color: "purple",
      terminal: true,
    },
    {
      icon: "✨", label: "Hello",
      desc: ko ? "똑같이 출력! 🎉" : "Same output! 🎉",
      active: phase >= PHASES.NAMING_RUN,
      color: "rose",
    },
  ] : [
    {
      icon: "📝", label: "main.cpp",
      desc: ko ? "우리가 쓴 코드" : "Our code",
      active: phase >= PHASES.SOURCE,
      color: "emerald",
    },
    {
      icon: "🔧", label: "g++ main.cpp",
      desc: ko ? "컴파일! (이진수로 변환)" : "Compile! (convert to binary)",
      active: phase >= PHASES.COMPILE,
      color: "blue",
      terminal: true,
    },
    {
      icon: "💾", label: "a.out",
      desc: ko ? "이진수로 된 실행 파일 생성!" : "Binary executable created!",
      active: phase >= PHASES.AOUT,
      color: "amber",
    },
    {
      icon: "▶️", label: "./a.out",
      desc: ko ? "실행!" : "Run!",
      active: phase >= PHASES.RUN,
      color: "purple",
      terminal: true,
    },
    {
      icon: "✨", label: "Hello",
      desc: ko ? "화면에 출력! 🎉" : "Printed to screen! 🎉",
      active: phase >= PHASES.OUTPUT,
      color: "rose",
    },
  ]

  const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    emerald: { bg: "bg-emerald-500/15", border: "border-emerald-500/50", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
    blue: { bg: "bg-blue-500/15", border: "border-blue-500/50", text: "text-blue-400", glow: "shadow-blue-500/20" },
    amber: { bg: "bg-amber-500/15", border: "border-amber-500/50", text: "text-amber-400", glow: "shadow-amber-500/20" },
    purple: { bg: "bg-purple-500/15", border: "border-purple-500/50", text: "text-purple-400", glow: "shadow-purple-500/20" },
    rose: { bg: "bg-rose-500/15", border: "border-rose-500/50", text: "text-rose-400", glow: "shadow-rose-500/20" },
  }

  // 상단 안내 텍스트
  const headerText = (() => {
    if (phase === PHASES.SOURCE) return ko ? "① 코드를 작성했어!" : "① Code is written!"
    if (phase === PHASES.COMPILE) return ko ? "② g++ 로 컴파일하자!" : "② Compile with g++!"
    if (phase === PHASES.AOUT) return ko ? "③ a.out 파일이 생겼어!" : "③ a.out file created!"
    if (phase === PHASES.RUN) return ko ? "④ 실행해보자!" : "④ Let's run it!"
    if (phase === PHASES.OUTPUT) return ko ? "⑤ Hello가 출력됐어! 🎉" : "⑤ Hello printed! 🎉"
    if (phase === PHASES.NAMING_INTRO) return ko ? "💡 이름을 바꿀 수도 있어!" : "💡 You can change the name!"
    if (phase === PHASES.NAMING_COMPILE) return ko ? "-o 옵션으로 이름 지정!" : "-o flag sets the name!"
    if (phase === PHASES.NAMING_RUN) return ko ? "myprogram 실행 → 똑같이 Hello!" : "Run myprogram → Same Hello!"
    return ko ? "✅ 완벽하게 이해했어!" : "✅ Perfect understanding!"
  })()

  const btnText = (() => {
    if (phase === PHASES.OUTPUT) return ko ? "이름 바꾸는 법 보기 →" : "See naming →"
    if (phase >= PHASES.DONE) return ko ? "처음부터 다시 보기" : "Watch again"
    return ko ? "다음 단계 →" : "Next step →"
  })()

  return (
    <div className="w-full space-y-4">
      {/* 제목 */}
      <div className="bg-gray-900 rounded-2xl p-5 md:p-6 space-y-5">
        {/* 상단 텍스트 */}
        <p className="text-center text-lg font-black text-white transition-all duration-300">
          {headerText}
        </p>

        {/* 파이프라인 노드들 */}
        <div className="space-y-3">
          {nodes.map((node, i) => {
            const c = colorMap[node.color]
            const show = node.active

            return (
              <React.Fragment key={`${isNaming ? "n" : "b"}-${i}`}>
                {/* 화살표 (첫 번째 노드 제외) */}
                {i > 0 && (
                  <div className={`flex justify-center transition-all duration-500 ${show ? "opacity-100" : "opacity-0 h-0"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-500">
                      <line x1="12" y1="2" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
                      <polygon points="6,16 12,22 18,16" fill="currentColor" />
                    </svg>
                  </div>
                )}

                {/* 노드 */}
                <div className={`transition-all duration-500 ${
                  show
                    ? `opacity-100 transform translate-y-0 ${c.glow} shadow-lg`
                    : "opacity-0 h-0 overflow-hidden transform translate-y-4"
                }`}>
                  <div className={`rounded-xl border-2 ${c.border} ${c.bg} p-3 flex items-center gap-3`}>
                    <span className="text-2xl flex-shrink-0">{node.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-mono font-bold text-sm ${node.terminal ? "text-green-400" : c.text}`}>
                        {node.terminal && <span className="text-gray-500">$ </span>}
                        {node.label}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{node.desc}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {/* 이름 변경 설명 */}
        {phase === PHASES.NAMING_INTRO && (
          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 animate-fadeIn">
            <p className="text-blue-300 text-sm font-bold text-center">
              {ko
                ? "a.out 말고 원하는 이름으로 만들 수 있어!"
                : "You can name the output file anything you want!"}
            </p>
            <p className="text-gray-400 text-xs text-center mt-1 font-mono">
              g++ <span className="text-amber-400 font-bold">-o myprogram</span> main.cpp
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              {ko
                ? "-o myprogram = \"출력(output) 파일 이름을 myprogram으로!\""
                : "-o myprogram = \"name the output file myprogram!\""}
            </p>
          </div>
        )}

        {/* 완료 메시지 */}
        {phase === PHASES.DONE && (
          <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 animate-fadeIn">
            <p className="text-emerald-300 text-sm font-bold text-center">
              {ko
                ? "🎯 기억하자! 코드 작성 → 컴파일 → 실행!"
                : "🎯 Remember! Write code → Compile → Run!"}
            </p>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={phase >= PHASES.DONE ? reset : next}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 flex items-center gap-2 ${
              phase >= PHASES.DONE
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : phase === PHASES.OUTPUT
                  ? "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30"
            }`}
          >
            {phase >= PHASES.DONE && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            )}
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}
