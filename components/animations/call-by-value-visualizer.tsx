"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================================
// Call by Value visualization — function gets a copy
// ============================================================

const TOTAL = 5
type Step = 0 | 1 | 2 | 3 | 4

function getNumValue(step: number): number {
  return 10
}
function getXValue(step: number): number | null {
  if (step <= 0) return null
  if (step >= 4) return null
  return step >= 2 ? 99 : 10
}
function xVisible(step: number): boolean {
  return step >= 1 && step <= 3
}

export function CallByValueVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [step, setStep] = useState<Step>(0)
  const isEn = lang === "en"

  const numVal = getNumValue(step)
  const xVal = getXValue(step)
  const showX = xVisible(step)

  const stepLabel = (() => {
    if (step === 0) return isEn ? "1. main has num = 10" : "1. main 에 num = 10"
    if (step === 1) return isEn ? "2. tryChange(num) called — num is copied into x" : "2. tryChange(num) 호출 — num 의 값이 x 로 복사됨"
    if (step === 2) return isEn ? "3. inside function: x = 99" : "3. 함수 안에서 x = 99 로 변경"
    if (step === 3) return isEn ? "4. x changed, but num is untouched" : "4. x 는 99 인데 num 은 그대로"
    return isEn ? "5. function returns — x is destroyed, num stays 10" : "5. 함수 종료 — x 는 사라지고 num 은 그대로 10"
  })()

  return (
    <div className="w-full max-w-md mx-auto space-y-3 select-none">
      {/* 코드 */}
      <div className="bg-slate-900 rounded-2xl px-4 py-3 font-mono text-sm text-slate-100 leading-relaxed">
        <div><span className="text-blue-400">void</span> <span className="text-yellow-300">tryChange</span>(<span className="text-emerald-400">int</span> x) {"{"}</div>
        <div className="pl-4">x = 99;</div>
        <div>{"}"}</div>
        <div className="mt-2"><span className="text-emerald-400">int</span> num = 10;</div>
        <div><span className="text-yellow-300">tryChange</span>(num);</div>
        <div><span className="text-blue-400">cout</span> {"<<"} num;<span className="text-slate-500">  // ?</span></div>
      </div>

      {/* 단계 라벨 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          <span
            className="inline-block px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: step === 2 ? "#fef3c7" : "#f1f5f9",
              color: step === 2 ? "#92400e" : "#475569",
            }}
          >
            {step === 2 && "⚡ "}
            {stepLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 메모리 시각화 */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
        <div className="flex items-start justify-around gap-6 min-h-[140px]">
          {/* main 의 num */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">main</span>
            <motion.div
              animate={step === 0 ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-3 transition-all duration-300"
              style={{
                borderWidth: 3,
                borderStyle: "solid",
                borderColor: "#10b981",
                background: "#ecfdf5",
                color: "#065f46",
              }}
            >
              <span className="text-[10px] font-bold opacity-70">num</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={numVal}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-black"
                >
                  {numVal}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* 화살표 (함수 호출 시) */}
          <AnimatePresence>
            {step >= 1 && step <= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: step === 1 ? 0.15 : 0 }}
                className="flex flex-col items-center pt-8 gap-1"
              >
                <span className="text-[10px] font-bold text-orange-500">
                  {isEn ? "copy" : "복사"}
                </span>
                <span className="text-3xl text-orange-500 leading-none">→</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* tryChange 함수의 x */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              tryChange()
            </span>
            <AnimatePresence>
              {showX && xVal !== null ? (
                <motion.div
                  key="x-box"
                  initial={{ opacity: 0, scale: 0.5, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 10 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-mono border-3 transition-all duration-300"
                  style={{
                    borderWidth: 3,
                    borderStyle: "dashed",
                    borderColor: step === 2 ? "#f97316" : "#fdba74",
                    background: step === 2 ? "#fff7ed" : "#fffbeb",
                    color: "#f97316",
                    boxShadow: step === 2 ? "0 0 0 5px #f9731625" : undefined,
                  }}
                >
                  <span className="text-[10px] font-bold opacity-70">x</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={xVal}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      className="text-2xl font-black"
                    >
                      {xVal}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-[10px] text-slate-300"
                  style={{ borderWidth: 2, borderStyle: "dashed", borderColor: "#e2e8f0" }}>
                  {step === 0 ? (isEn ? "not yet" : "아직 없음") : (isEn ? "destroyed" : "사라짐")}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 메시지 */}
        <AnimatePresence mode="wait">
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-xl px-3 py-2 text-sm text-center font-bold"
              style={{ background: "#ecfdf5", color: "#065f46" }}
            >
              {isEn
                ? "✅ num is still 10 — function only changed its own copy"
                : "✅ num 은 여전히 10 — 함수는 자기 복사본만 바꿨음"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 이전/다음 */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
          disabled={step === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 bg-white border-2 border-slate-200 disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          {isEn ? "Prev" : "이전"}
        </button>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i as Step)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === step ? 18 : 7,
                height: 7,
                background: i === step ? "#10b981" : i < step ? "#10b98155" : "#d1d5db",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setStep((s) => Math.min(TOTAL - 1, s + 1) as Step)}
          disabled={step === TOTAL - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30 transition-all"
          style={{ background: "#10b981" }}
        >
          {isEn ? "Next" : "다음"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
