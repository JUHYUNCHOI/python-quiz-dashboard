"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Step = "idle" | "h" | "cpp" | "main" | "link" | "done"

const STEPS: { id: Step; label: string; desc: string }[] = [
  { id: "h",    label: "① math.h 읽기",      desc: "컴파일러가 math.h를 읽어요. '이런 함수들이 있을 거야!' 하고 기억해둬요." },
  { id: "cpp",  label: "② math.cpp 컴파일",  desc: "math.cpp에서 #include로 math.h를 가져와요. 선언대로 함수 본체가 맞는지 확인하고 컴파일해요." },
  { id: "main", label: "③ main.cpp 컴파일",  desc: "main.cpp도 math.h를 include해요. 덕분에 add()가 어떻게 생겼는지 알고 사용할 수 있어요!" },
  { id: "link", label: "④ 두 파일 연결!",    desc: "컴파일된 math.cpp와 main.cpp를 하나로 연결(링크)해요. add() 호출이 실제 본체와 연결돼요!" },
  { id: "done", label: "✅ 실행 파일 완성!", desc: "세 파일이 협력해서 하나의 실행 프로그램이 됐어요! 본체(math.cpp)를 몰라도, 헤더(math.h)만 보면 함수를 쓸 수 있어요." },
]

export function HeaderFilesAnimation() {
  const [step, setStep] = useState<Step>("idle")

  const stepIndex = STEPS.findIndex(s => s.id === step)
  const currentStepInfo = STEPS.find(s => s.id === step)

  // 각 파일의 상태: "active" = 현재 주인공, "past" = 이미 처리됨, "dim" = 아직 안 됨
  const getFileState = (fileStep: Step) => {
    if (step === "idle") return "dim"
    const fileIdx = STEPS.findIndex(s => s.id === fileStep)
    if (fileIdx === stepIndex) return "active"
    if (fileIdx < stepIndex) return "past"
    return "dim"
  }

  const next = () => {
    if (step === "idle") setStep("h")
    else {
      const idx = STEPS.findIndex(s => s.id === step)
      if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id)
    }
  }

  const reset = () => setStep("idle")

  const showArrow = (from: Step, to: Step) => {
    const fromIdx = STEPS.findIndex(s => s.id === from)
    const toIdx = STEPS.findIndex(s => s.id === to)
    // 현재 스텝이 to에 해당할 때 화살표 표시
    return step === to || (stepIndex > toIdx && toIdx > 0)
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-4 text-white text-sm select-none">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-xs">🔗 세 파일이 어떻게 연결되는지 봐요</span>
        {step !== "idle" && (
          <button onClick={reset} className="text-xs text-slate-500 hover:text-slate-300">↺ 처음</button>
        )}
      </div>

      {/* 파일 3개 */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <FileCard
          name="math.h"
          color="indigo"
          state={getFileState("h")}
          lines={[
            { text: "int add(int a, int b);", isInclude: false },
            { text: "int multiply(int a, int b);", isInclude: false },
          ]}
        />

        <FileCard
          name="math.cpp"
          color="emerald"
          state={getFileState("cpp")}
          highlightInclude={step === "cpp"}
          lines={[
            { text: '#include "math.h"', isInclude: true },
            { text: "int add(int a, int b) {", isInclude: false },
            { text: "  return a + b;", isInclude: false },
            { text: "}", isInclude: false },
          ]}
        />

        <FileCard
          name="main.cpp"
          color="orange"
          state={getFileState("main")}
          highlightInclude={step === "main"}
          lines={[
            { text: '#include "math.h"', isInclude: true },
            { text: "int main() {", isInclude: false },
            { text: "  add(3, 5);", isInclude: false },
            { text: "}", isInclude: false },
          ]}
        />
      </div>

      {/* 화살표: include 연결 */}
      {(step === "cpp" || (stepIndex > 1 && step !== "idle")) && (
        <div className="flex justify-center gap-6 mb-3 text-xs">
          {(step === "cpp" || stepIndex > 1) && (
            <span className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg",
              step === "cpp" ? "bg-indigo-900/60 text-indigo-300 font-bold" : "text-slate-500"
            )}>
              <span className="text-indigo-400">math.h</span>
              <span className="text-slate-400">──▶</span>
              <span className="text-emerald-400">math.cpp</span>
            </span>
          )}
          {(step === "main" || stepIndex > 2) && (
            <span className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg",
              step === "main" ? "bg-indigo-900/60 text-indigo-300 font-bold" : "text-slate-500"
            )}>
              <span className="text-indigo-400">math.h</span>
              <span className="text-slate-400">──▶</span>
              <span className="text-orange-400">main.cpp</span>
            </span>
          )}
        </div>
      )}

      {/* 링크 단계 */}
      {(step === "link" || step === "done") && (
        <div className="flex items-center justify-center gap-2 mb-3 text-xs">
          <span className="bg-emerald-900/40 border border-emerald-600/40 rounded-lg px-2 py-1 text-emerald-300">math.cpp</span>
          <span className="text-slate-400">+</span>
          <span className="bg-orange-900/40 border border-orange-600/40 rounded-lg px-2 py-1 text-orange-300">main.cpp</span>
          <span className={cn(
            "text-yellow-400 font-bold",
            step === "link" && "animate-pulse"
          )}>──▶ 🔗 링크!</span>
        </div>
      )}

      {/* 완성 배너 */}
      {step === "done" && (
        <div className="mb-3 flex justify-center">
          <div className="bg-green-900/50 border border-green-500/50 rounded-xl px-4 py-2 text-green-300 font-bold text-sm">
            🎉 실행 파일 완성!
          </div>
        </div>
      )}

      {/* 설명 */}
      <div className={cn(
        "rounded-xl px-3 py-2.5 text-xs leading-relaxed mb-3 min-h-[44px]",
        step === "idle" ? "bg-slate-800 text-slate-400" : "bg-slate-700 text-slate-200"
      )}>
        {step === "idle"
          ? "▶ 시작 버튼을 눌러 컴파일 과정을 따라가봐요!"
          : currentStepInfo?.desc}
      </div>

      {/* 진행 표시 */}
      <div className="flex gap-1 mb-3">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < stepIndex ? "bg-indigo-500" :
              i === stepIndex ? "bg-indigo-400 animate-pulse" :
              "bg-slate-700"
            )}
          />
        ))}
      </div>

      {step !== "done" && (
        <button
          onClick={next}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors"
        >
          {step === "idle" ? "▶ 시작" : `▶ 다음 (${STEPS[stepIndex + 1]?.label ?? ""})`}
        </button>
      )}
    </div>
  )
}

interface LineItem { text: string; isInclude: boolean }
interface FileCardProps {
  name: string
  color: "indigo" | "emerald" | "orange"
  state: "active" | "past" | "dim"
  lines: LineItem[]
  highlightInclude?: boolean
}

function FileCard({ name, color, state, lines, highlightInclude }: FileCardProps) {
  const borderColor = {
    indigo: state === "active" ? "border-indigo-400 shadow-indigo-900/60" : state === "past" ? "border-indigo-700" : "border-slate-700",
    emerald: state === "active" ? "border-emerald-400 shadow-emerald-900/60" : state === "past" ? "border-emerald-800" : "border-slate-700",
    orange: state === "active" ? "border-orange-400 shadow-orange-900/60" : state === "past" ? "border-orange-800" : "border-slate-700",
  }[color]

  const titleColor = {
    indigo: state === "active" ? "text-indigo-300" : state === "past" ? "text-indigo-500" : "text-slate-600",
    emerald: state === "active" ? "text-emerald-300" : state === "past" ? "text-emerald-600" : "text-slate-600",
    orange: state === "active" ? "text-orange-300" : state === "past" ? "text-orange-600" : "text-slate-600",
  }[color]

  return (
    <div className={cn(
      "rounded-xl border-2 p-2 transition-all duration-300",
      borderColor,
      state === "dim" && "opacity-25",
      state === "past" && "opacity-50",
      state === "active" && "shadow-lg",
    )}>
      <div className={cn("text-xs font-bold mb-1.5", titleColor)}>{name}</div>
      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "font-mono text-[9px] sm:text-[10px] leading-tight rounded px-0.5 transition-all duration-200",
              line.isInclude && highlightInclude
                ? "text-pink-300 bg-pink-900/30 font-bold"
                : line.isInclude
                ? "text-pink-500"
                : state === "active" ? "text-slate-200" : "text-slate-500",
            )}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}
