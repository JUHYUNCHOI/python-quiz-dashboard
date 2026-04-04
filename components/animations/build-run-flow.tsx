"use client"

import React, { useState } from "react"

// ============================================
// 빌드-실행 플로우 애니메이션 (가로 레이아웃)
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

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: "bg-emerald-500/15", border: "border-emerald-500/50", text: "text-emerald-400" },
  blue:    { bg: "bg-blue-500/15",    border: "border-blue-500/50",    text: "text-blue-400" },
  amber:   { bg: "bg-amber-500/15",   border: "border-amber-500/50",   text: "text-amber-400" },
  purple:  { bg: "bg-purple-500/15",  border: "border-purple-500/50",  text: "text-purple-400" },
  rose:    { bg: "bg-rose-500/15",    border: "border-rose-500/50",    text: "text-rose-400" },
}

interface FlowNode {
  icon: string
  label: string
  desc: string
  active: boolean
  color: string
  terminal?: boolean
}

function RightArrow({ visible }: { visible: boolean }) {
  return (
    <div className={`flex-shrink-0 flex items-center justify-center transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
      <svg width="28" height="16" viewBox="0 0 28 16" className="text-gray-500">
        <line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="2" />
        <polygon points="18,3 26,8 18,13" fill="currentColor" />
      </svg>
    </div>
  )
}

function FlowNodeBox({ node }: { node: FlowNode }) {
  const c = colorMap[node.color]
  return (
    <div className={`transition-all duration-500 ${node.active ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
      <div className={`rounded-xl border-2 ${c.border} ${c.bg} p-3 flex flex-col items-center gap-1 min-w-[80px] text-center`}>
        <span className="text-2xl">{node.icon}</span>
        <p className={`font-mono font-bold text-xs ${node.terminal ? "text-green-400" : c.text} break-all`}>
          {node.terminal && <span className="text-gray-500">$ </span>}
          {node.label}
        </p>
        <p className="text-gray-400 text-[10px] leading-tight">{node.desc}</p>
      </div>
    </div>
  )
}

export function BuildRunFlow({ lang = "ko" }: BuildRunFlowProps) {
  const [phase, setPhase] = useState<number>(PHASES.SOURCE)

  const ko = lang === "ko"
  const isNaming = phase >= PHASES.NAMING_INTRO

  const next = () => setPhase(p => Math.min(p + 1, PHASES.DONE))
  const reset = () => setPhase(PHASES.SOURCE)

  const nodes: FlowNode[] = isNaming ? [
    { icon: "📝", label: "main.cpp",              desc: ko ? "우리가 쓴 코드" : "Our code",              active: phase >= PHASES.NAMING_INTRO,   color: "emerald" },
    { icon: "🔧", label: "g++ -o myprogram main.cpp", desc: ko ? "이름 지정 컴파일" : "Named compile",       active: phase >= PHASES.NAMING_COMPILE, color: "blue",   terminal: true },
    { icon: "💾", label: "myprogram",              desc: ko ? "내가 정한 이름" : "My named file",          active: phase >= PHASES.NAMING_COMPILE, color: "amber" },
    { icon: "▶️", label: "./myprogram",            desc: ko ? "실행!" : "Run!",                           active: phase >= PHASES.NAMING_RUN,     color: "purple", terminal: true },
    { icon: "✨", label: "Hello",                  desc: ko ? "똑같이 출력! 🎉" : "Same output! 🎉",      active: phase >= PHASES.NAMING_RUN,     color: "rose" },
  ] : [
    { icon: "📝", label: "main.cpp",              desc: ko ? "우리가 쓴 코드" : "Our code",              active: phase >= PHASES.SOURCE,  color: "emerald" },
    { icon: "🔧", label: "g++ main.cpp",           desc: ko ? "컴파일!" : "Compile!",                    active: phase >= PHASES.COMPILE, color: "blue",   terminal: true },
    { icon: "💾", label: "a.out",                  desc: ko ? "실행 파일 생성" : "Executable created",   active: phase >= PHASES.AOUT,    color: "amber" },
    { icon: "▶️", label: "./a.out",               desc: ko ? "실행!" : "Run!",                           active: phase >= PHASES.RUN,     color: "purple", terminal: true },
    { icon: "✨", label: "Hello",                  desc: ko ? "화면에 출력! 🎉" : "Printed! 🎉",         active: phase >= PHASES.OUTPUT,  color: "rose" },
  ]

  const headerText = (() => {
    if (phase === PHASES.SOURCE)        return ko ? "① 코드를 작성했어!" : "① Code is written!"
    if (phase === PHASES.COMPILE)       return ko ? "② g++ 로 컴파일하자!" : "② Compile with g++!"
    if (phase === PHASES.AOUT)          return ko ? "③ a.out 파일이 생겼어!" : "③ a.out file created!"
    if (phase === PHASES.RUN)           return ko ? "④ 실행해보자!" : "④ Let's run it!"
    if (phase === PHASES.OUTPUT)        return ko ? "⑤ Hello가 출력됐어! 🎉" : "⑤ Hello printed! 🎉"
    if (phase === PHASES.NAMING_INTRO)  return ko ? "💡 이름을 바꿀 수도 있어!" : "💡 You can rename it!"
    if (phase === PHASES.NAMING_COMPILE)return ko ? "-o 옵션으로 이름 지정!" : "-o flag sets the name!"
    if (phase === PHASES.NAMING_RUN)    return ko ? "myprogram 실행 → 똑같이 Hello!" : "Run myprogram → Hello!"
    return ko ? "✅ 코드 작성 → 컴파일 → 실행!" : "✅ Write → Compile → Run!"
  })()

  const btnText = (() => {
    if (phase === PHASES.OUTPUT)   return ko ? "이름 바꾸는 법 보기 →" : "See naming →"
    if (phase >= PHASES.DONE)      return ko ? "처음부터 다시 보기" : "Watch again"
    return ko ? "다음 →" : "Next →"
  })()

  return (
    <div className="w-full space-y-4">
      <div className="bg-gray-900 rounded-2xl p-5 md:p-6 space-y-5">
        {/* 헤더 */}
        <p className="text-center text-base font-black text-white transition-all duration-300">
          {headerText}
        </p>

        {/* 가로 플로우 */}
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {nodes.map((node, i) => (
            <React.Fragment key={`${isNaming ? "n" : "b"}-${i}`}>
              {i > 0 && <RightArrow visible={node.active} />}
              <FlowNodeBox node={node} />
            </React.Fragment>
          ))}
        </div>

        {/* 이름 변경 설명 */}
        {phase === PHASES.NAMING_INTRO && (
          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 animate-fadeIn">
            <p className="text-blue-300 text-sm font-bold text-center">
              {ko ? "a.out 말고 원하는 이름으로 만들 수 있어!" : "You can name the output file anything!"}
            </p>
            <p className="text-gray-400 text-xs text-center mt-1 font-mono">
              g++ <span className="text-amber-400 font-bold">-o myprogram</span> main.cpp

            </p>
          </div>
        )}

        {/* 완료 메시지 */}
        {phase === PHASES.DONE && (
          <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 animate-fadeIn">
            <p className="text-emerald-300 text-sm font-bold text-center">
              {ko ? "🎯 기억하자! 코드 작성 → 컴파일 → 실행!" : "🎯 Remember! Write → Compile → Run!"}
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
