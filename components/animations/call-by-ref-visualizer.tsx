"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================================
// Call by Reference visualization — function shares the same box
// ============================================================

const TOTAL = 5
type Step = 0 | 1 | 2 | 3 | 4

function getNumValue(step: number): number {
  if (step >= 2) return 99
  return 10
}
function aliasVisible(step: number): boolean {
  return step >= 1 && step <= 3
}

export function CallByRefVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [step, setStep] = useState<Step>(0)
  const isEn = lang === "en"

  const numVal = getNumValue(step)
  const showAlias = aliasVisible(step)

  const stepLabel = (() => {
    if (step === 0) return isEn ? "1. main has num = 10" : "1. main 에 num = 10"
    if (step === 1) return isEn ? "2. change(num) called — x becomes another name for num" : "2. change(num) 호출 — x 는 num 의 또 다른 이름 (별명)"
    if (step === 2) return isEn ? "3. inside function: x = 99 → since x IS num, num changes too" : "3. 함수 안: x = 99 → x 가 곧 num 이라서 num 도 99 로 바뀜"
    if (step === 3) return isEn ? "4. num is now 99 (the alias x still attached)" : "4. num 은 99 (별명 x 는 아직 붙어있음)"
    return isEn ? "5. function returns — alias x is gone, but num stays at 99" : "5. 함수 종료 — 별명 x 사라지지만 num 은 99 그대로"
  })()

  return (
    <div className="w-full max-w-md mx-auto space-y-3 select-none">
      {/* 코드 */}
      <div className="bg-slate-900 rounded-2xl px-4 py-3 font-mono text-sm text-slate-100 leading-relaxed">
        <div className="text-slate-500 text-xs mb-1">
          {isEn ? "// change: also tries to set x to 99, but with &" : "// change: x 를 99 로 바꾸는 함수 — 단, & 를 사용"}
        </div>
        <div>
          <span className="text-blue-400">void</span>{" "}
          <span className="text-yellow-300">change</span>(
          <span className="text-emerald-400">int</span>
          <span className="text-pink-400">&amp;</span> x) {"{"}
        </div>
        <div className="pl-4">x = 99;</div>
        <div>{"}"}</div>
        <div className="mt-2">
          <span className="text-emerald-400">int</span>{" "}
          <span className="text-blue-400">main</span>() {"{"}
        </div>
        <div className="pl-4">
          <span className="text-emerald-400">int</span> num = 10;
        </div>
        <div className="pl-4">
          <span className="text-yellow-300">change</span>(num);
        </div>
        <div className="pl-4">
          <span className="text-blue-400">cout</span> {"<<"} num;
          <span className="text-slate-500">  // ?</span>
        </div>
        <div>{"}"}</div>
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
            className="inline-block px-3 py-1.5 rounded-full text-xs font-bold leading-relaxed"
            style={{
              background: step === 2 ? "#ede9fe" : "#f1f5f9",
              color: step === 2 ? "#5b21b6" : "#475569",
            }}
          >
            {step === 2 && "⚡ "}
            {stepLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 메모리 시각화 */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
        <div className="flex items-center justify-center min-h-[180px]">
          {/* num 박스 + x 별명 */}
          <div className="flex flex-col items-center gap-2 relative">
            {/* x 별명 라벨 (참조: num 박스 위에 붙음) */}
            <div className="h-7 flex items-end justify-center">
              <AnimatePresence>
                {showAlias && (
                  <motion.div
                    key="alias"
                    initial={{ opacity: 0, y: -8, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-black text-white shadow-md"
                    style={{ background: "#7c3aed" }}
                  >
                    x
                    <span className="ml-1 text-[9px] opacity-80">
                      ({isEn ? "alias" : "별명"})
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              main
            </span>
            <motion.div
              animate={
                step === 2
                  ? { scale: [1, 1.12, 1] }
                  : step === 0
                  ? { scale: [1, 1.06, 1] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center font-mono border-3 transition-all duration-300"
              style={{
                borderWidth: 3,
                borderStyle: "solid",
                borderColor: step >= 2 ? "#7c3aed" : "#10b981",
                background: step >= 2 ? "#ede9fe" : "#ecfdf5",
                color: step >= 2 ? "#5b21b6" : "#065f46",
                boxShadow:
                  step === 2 ? "0 0 0 5px #7c3aed25" : undefined,
              }}
            >
              <span className="text-[10px] font-bold opacity-70">num</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={numVal}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-3xl font-black"
                >
                  {numVal}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <span className="text-[10px] text-slate-400 mt-1">
              {showAlias
                ? isEn
                  ? "same box, two names: num & x"
                  : "한 상자, 두 이름: num & x"
                : isEn
                ? "just num"
                : "num 만"}
            </span>
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
              style={{ background: "#ede9fe", color: "#5b21b6" }}
            >
              {isEn
                ? "✅ num is 99 — the function changed the original through the alias"
                : "✅ num 은 99 — 함수가 별명을 통해 원본을 바꿨음"}
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
                background:
                  i === step ? "#7c3aed" : i < step ? "#7c3aed55" : "#d1d5db",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setStep((s) => Math.min(TOTAL - 1, s + 1) as Step)}
          disabled={step === TOTAL - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30 transition-all"
          style={{ background: "#7c3aed" }}
        >
          {isEn ? "Next" : "다음"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
