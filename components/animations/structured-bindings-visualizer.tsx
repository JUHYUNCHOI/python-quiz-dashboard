"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

// =============================================================
// structured bindings 시각화
// pair 의 .first/.second 가 변수에 어떻게 "묶이는지" 단계별로
// =============================================================

type Mode = "pair" | "tuple"

interface ModeConfig {
  declaration: string
  bindingsCode: string
  parts: { label: string; value: string; varName: string; color: string }[]
}

const CONFIGS: Record<Mode, ModeConfig> = {
  pair: {
    declaration: 'pair<string, int> p = {"Kim", 95};',
    bindingsCode: 'auto [name, score] = p;',
    parts: [
      { label: ".first",  value: '"Kim"', varName: "name",  color: "#7c3aed" },
      { label: ".second", value: "95",     varName: "score", color: "#0891b2" },
    ],
  },
  tuple: {
    declaration: 'tuple<string, int, double> t = {"Kim", 15, 3.8};',
    bindingsCode: 'auto [name, age, gpa] = t;',
    parts: [
      { label: "<0>", value: '"Kim"', varName: "name", color: "#7c3aed" },
      { label: "<1>", value: "15",     varName: "age",  color: "#0891b2" },
      { label: "<2>", value: "3.8",    varName: "gpa",  color: "#059669" },
    ],
  },
}

const TOTAL_STEPS = 4

export function StructuredBindingsVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("pair")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"
  const cfg = CONFIGS[mode]

  // step 0: 묶음 (pair/tuple) 만 보여줌
  // step 1: bindings 코드 등장
  // step 2: 화살표가 묶음 → 변수로 그어짐
  // step 3: 변수 박스가 채워짐 + 결과
  const showBindingsCode = step >= 1
  const showArrows = step >= 2
  const showVariables = step >= 3

  const stepCaption = (() => {
    if (step === 0) {
      if (isEn) return `Here's a ${mode} with ${cfg.parts.length} pieces. Each piece has a position label.`
      return `${mode === "pair" ? "pair" : "tuple"} 가 ${cfg.parts.length} 개의 조각으로 이루어져 있어요. 각 조각엔 위치 라벨이 있어요.`
    }
    if (step === 1) {
      return isEn
        ? `Now the structured bindings line. \`auto [a, b, ...]\` declares new variables and links them to the bundle.`
        : `이제 structured bindings 줄이 등장. \`auto [a, b, ...]\` 가 새 변수를 *선언* 하면서 묶음과 연결.`
    }
    if (step === 2) {
      return isEn
        ? `Each piece is "bound" to a variable in order — first to first, second to second, ...`
        : `각 조각이 변수에 *순서대로* "묶여요" — 첫 번째는 첫 번째 변수에, 두 번째는 두 번째에...`
    }
    return isEn
      ? `Done. The variables now hold the values, with names you chose. Use them like any other variable.`
      : `완료. 변수에 값이 들어갔고, *이름까지 자기가 정한* 거예요. 이제 일반 변수처럼 쓰면 끝.`
  })()

  return (
    <div className="space-y-3 select-none">
      {/* 모드 선택 */}
      <div className="flex justify-center gap-2">
        {(["pair", "tuple"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setStep(0) }}
            className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all"
            style={{
              background: mode === m ? "#7c3aed" : "#f1f5f9",
              color: mode === m ? "white" : "#475569",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* 진행 상태 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          {isEn ? `Step ${step + 1} / ${TOTAL_STEPS}` : `${step + 1} / ${TOTAL_STEPS} 단계`}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === step ? 18 : 7,
                height: 7,
                background: i === step ? "#7c3aed" : i < step ? "#7c3aed55" : "#e2e8f0",
              }}
            />
          ))}
        </div>
      </div>

      {/* 단계 caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${step}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 text-sm text-violet-900 leading-relaxed"
        >
          {stepCaption}
        </motion.div>
      </AnimatePresence>

      {/* 메인 시각화 */}
      <div className="rounded-xl bg-slate-900 p-4 font-mono text-sm">
        {/* 코드 라인 */}
        <div className="text-slate-300 mb-4">
          <div className="text-yellow-300">{cfg.declaration}</div>
          <AnimatePresence>
            {showBindingsCode && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-emerald-300 mt-1"
              >
                {cfg.bindingsCode}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 묶음 + 화살표 + 변수 영역 */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 80px 1fr" }}>
          {/* 왼쪽: 묶음 (pair / tuple) */}
          <div>
            <div className="text-[10px] text-slate-500 mb-1 text-center">
              {mode === "pair" ? "p" : "t"}
            </div>
            <div className="space-y-1.5">
              {cfg.parts.map((part, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all"
                  style={{
                    borderColor: part.color,
                    background: `${part.color}15`,
                  }}
                >
                  <span className="text-[11px] font-mono opacity-70" style={{ color: part.color }}>
                    {part.label}
                  </span>
                  <span className="font-mono font-bold ml-auto" style={{ color: part.color }}>
                    {part.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 가운데: 화살표 */}
          <div className="flex flex-col justify-around relative">
            {cfg.parts.map((part, i) => (
              <AnimatePresence key={i}>
                {showArrows && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center justify-center text-2xl"
                    style={{ color: part.color }}
                  >
                    →
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* 오른쪽: 변수 */}
          <div>
            <div className="text-[10px] text-slate-500 mb-1 text-center">
              {isEn ? "new variables" : "새 변수"}
            </div>
            <div className="space-y-1.5">
              {cfg.parts.map((part, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all"
                  style={{
                    borderColor: showVariables ? part.color : "#475569",
                    background: showVariables ? `${part.color}15` : "transparent",
                    opacity: showBindingsCode ? 1 : 0.3,
                  }}
                >
                  <span className="text-[11px] font-mono" style={{ color: showVariables ? part.color : "#94a3b8" }}>
                    {part.varName}
                  </span>
                  <span className="font-mono font-bold ml-auto" style={{ color: showVariables ? part.color : "#475569" }}>
                    <AnimatePresence mode="wait">
                      {showVariables ? (
                        <motion.span
                          key="filled"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {part.value}
                        </motion.span>
                      ) : (
                        <span className="text-slate-600">?</span>
                      )}
                    </AnimatePresence>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 결과 메시지 */}
        <AnimatePresence>
          {showVariables && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-3 py-2 rounded-lg bg-emerald-900/40 border border-emerald-700 text-emerald-200 text-xs text-center"
            >
              {isEn ? (
                <>✅ Now you can use <code className="font-bold">{cfg.parts.map(p => p.varName).join(", ")}</code> directly.</>
              ) : (
                <>✅ 이제 <code className="font-bold">{cfg.parts.map(p => p.varName).join(", ")}</code> 를 일반 변수처럼 쓰면 돼요.</>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 컨트롤 */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 bg-white border-2 border-slate-200 disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          {isEn ? "Prev" : "이전"}
        </button>

        <button
          onClick={() => setStep(0)}
          aria-label="reset"
          className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
          disabled={step === TOTAL_STEPS - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-30 transition-all"
        >
          {isEn ? "Next" : "다음"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
