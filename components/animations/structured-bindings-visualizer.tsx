"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

// =============================================================
// structured bindings 시각화
// 각 piece 를 *한 단계씩* 변수에 바인딩 (1번째→1번째, 2번째→2번째)
// =============================================================

type Mode = "struct" | "pair" | "tuple"

interface ModeConfig {
  declaration: string
  bindingsCode: string
  bundleVarName: string
  parts: { label: string; value: string; varName: string; color: string }[]
}

const CONFIGS: Record<Mode, ModeConfig> = {
  struct: {
    declaration: 'struct Student { string name; int score; };\nStudent s = {"Kim", 95};',
    bindingsCode: 'auto [name, score] = s;',
    bundleVarName: "s",
    parts: [
      { label: ".name",  value: '"Kim"', varName: "name",  color: "#7c3aed" },
      { label: ".score", value: "95",     varName: "score", color: "#0891b2" },
    ],
  },
  pair: {
    declaration: 'pair<string, int> p = {"Kim", 95};',
    bindingsCode: 'auto [name, score] = p;',
    bundleVarName: "p",
    parts: [
      { label: ".first",  value: '"Kim"', varName: "name",  color: "#7c3aed" },
      { label: ".second", value: "95",     varName: "score", color: "#0891b2" },
    ],
  },
  tuple: {
    declaration: 'tuple<string, int, double> t = {"Kim", 15, 3.8};',
    bindingsCode: 'auto [name, age, gpa] = t;',
    bundleVarName: "t",
    parts: [
      { label: "<0>", value: '"Kim"', varName: "name", color: "#7c3aed" },
      { label: "<1>", value: "15",     varName: "age",  color: "#0891b2" },
      { label: "<2>", value: "3.8",    varName: "gpa",  color: "#059669" },
    ],
  },
}

// 단계 구성:
// 0: 묶음만 보여줌
// 1: bindings 코드 등장 + 빈 변수 슬롯
// 2..(N+1): N 번째 piece → N 번째 변수 (한 번에 하나씩)
// N+2: 완료
function totalSteps(mode: Mode): number {
  return 2 + CONFIGS[mode].parts.length + 1
}

export function StructuredBindingsVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("pair")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"
  const cfg = CONFIGS[mode]
  const TOTAL = totalSteps(mode)

  // 현재까지 바인딩된 piece 수: step 2 부터 1개씩 늘어남
  const boundCount = Math.max(0, Math.min(cfg.parts.length, step - 1))
  // 현재 *바인딩 중* 인 piece (활성): 2..(N+1) 단계에서만
  const activeIdx = step >= 2 && step <= cfg.parts.length + 1 ? step - 2 : -1
  const showBindingsCode = step >= 1
  const isComplete = step >= cfg.parts.length + 2

  const stepCaption = (() => {
    if (step === 0) {
      return isEn
        ? `Here's a ${mode} with ${cfg.parts.length} pieces. Each piece sits at a position.`
        : `${mode} 가 ${cfg.parts.length} 개의 조각으로 이루어져 있어요. 각 조각은 *위치* 가 정해져 있어요.`
    }
    if (step === 1) {
      return isEn
        ? `bindings line appears. \`auto [a, b, ...]\` declares new variables — the slots on the right are ready, but still empty.`
        : `bindings 줄이 등장. \`auto [a, b, ...]\` 가 새 변수 *슬롯* 을 만들어요 — 아직은 비어있는 상태.`
    }
    if (step >= 2 && step <= cfg.parts.length + 1) {
      const i = step - 2
      const p = cfg.parts[i]
      const ord = isEn
        ? ["1st", "2nd", "3rd"][i]
        : ["1번째", "2번째", "3번째"][i]
      return isEn
        ? `${ord} piece (${p.label} = ${p.value}) → ${ord} variable (${p.varName}). Same position, value flows in.`
        : `**${ord} 조각** (${p.label} = ${p.value}) → **${ord} 변수** (${p.varName}). 같은 위치끼리 짝지어 값이 들어가요.`
    }
    return isEn
      ? `Done. All pieces bound — variables now hold the values, with names you chose.`
      : `완료. 모든 조각이 바인딩됐어요 — 변수에 값이 들어갔고, *이름은 본인이 정한 것* 으로.`
  })()

  return (
    <div className="space-y-3 select-none">
      {/* 모드 선택 — 같은 auto [...] 문법이 둘 다에 통한다는 게 핵심 */}
      <div className="space-y-1">
        <div className="text-[11px] text-slate-500 text-center font-medium">
          {isEn ? "👇 Same syntax on both — that's why it's called structured bindings" : "👇 둘 다 같은 문법 — 그래서 이름이 structured bindings"}
        </div>
        <div className="flex justify-center gap-2">
        {(["struct", "pair"] as Mode[]).map((m) => (
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
      </div>

      {/* 진행 상태 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          {isEn ? `Step ${step + 1} / ${TOTAL}` : `${step + 1} / ${TOTAL} 단계`}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: TOTAL }).map((_, i) => (
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
          dangerouslySetInnerHTML={{
            __html: stepCaption.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"),
          }}
        />
      </AnimatePresence>

      {/* 메인 시각화 */}
      <div className="rounded-xl bg-white border-2 border-slate-200 p-4 font-mono text-sm">
        {/* 코드 라인 */}
        <div className="mb-4 bg-slate-900 rounded-lg p-3">
          <div className="text-yellow-300 whitespace-pre-line">{cfg.declaration}</div>
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
            <div className="text-[11px] text-slate-600 font-bold mb-1 text-center">
              {cfg.bundleVarName}
            </div>
            <div className="space-y-1.5">
              {cfg.parts.map((part, i) => {
                const isActive = i === activeIdx
                const isBoundPast = i < boundCount && !isActive
                return (
                  <motion.div
                    key={i}
                    animate={
                      isActive
                        ? { scale: [1, 1.06, 1], boxShadow: [`0 0 0 0 ${part.color}00`, `0 0 0 8px ${part.color}55`, `0 0 0 0 ${part.color}00`] }
                        : { scale: 1, boxShadow: `0 0 0 0 ${part.color}00` }
                    }
                    transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors"
                    style={{
                      borderColor: part.color,
                      background: isActive ? `${part.color}40` : isBoundPast ? `${part.color}25` : `${part.color}18`,
                    }}
                  >
                    <span className="text-[11px] font-mono font-bold" style={{ color: part.color }}>
                      {part.label}
                    </span>
                    <span className="font-mono font-bold ml-auto" style={{ color: part.color }}>
                      {part.value}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 가운데: 화살표 (한 번에 하나씩 등장) */}
          <div className="flex flex-col justify-around relative">
            {cfg.parts.map((part, i) => {
              const arrowVisible = i < boundCount || i === activeIdx
              const isActive = i === activeIdx
              return (
                <AnimatePresence key={i}>
                  {arrowVisible && (
                    <motion.div
                      initial={{ opacity: 0, x: -16, scale: 0.6 }}
                      animate={{ opacity: 1, x: 0, scale: isActive ? [1, 1.2, 1] : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        scale: isActive ? { duration: 0.6, repeat: Infinity } : { duration: 0.2 },
                      }}
                      className="flex items-center justify-center text-3xl font-bold"
                      style={{ color: part.color }}
                    >
                      →
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            })}
          </div>

          {/* 오른쪽: 변수 슬롯 (한 번에 하나씩 채워짐) */}
          <div>
            <div className="text-[11px] text-slate-600 font-bold mb-1 text-center">
              {isEn ? "new variables" : "새 변수"}
            </div>
            <div className="space-y-1.5">
              {cfg.parts.map((part, i) => {
                const isFilled = i < boundCount
                const isActive = i === activeIdx
                const isVisible = showBindingsCode
                return (
                  <motion.div
                    key={i}
                    animate={
                      isActive
                        ? { scale: [1, 1.06, 1], boxShadow: [`0 0 0 0 ${part.color}00`, `0 0 0 8px ${part.color}55`, `0 0 0 0 ${part.color}00`] }
                        : { scale: 1, boxShadow: `0 0 0 0 ${part.color}00` }
                    }
                    transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors"
                    style={{
                      borderColor: isFilled || isActive ? part.color : "#cbd5e1",
                      background: isFilled ? `${part.color}25` : isActive ? `${part.color}40` : "#f8fafc",
                      opacity: isVisible ? 1 : 0.4,
                    }}
                  >
                    <span className="text-[11px] font-mono font-bold" style={{ color: isFilled || isActive ? part.color : "#64748b" }}>
                      {part.varName}
                    </span>
                    <span className="font-mono font-bold ml-auto" style={{ color: isFilled ? part.color : "#94a3b8" }}>
                      <AnimatePresence mode="wait">
                        {isFilled ? (
                          <motion.span
                            key="filled"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            {part.value}
                          </motion.span>
                        ) : (
                          <span className="text-slate-400">?</span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 결과 메시지 */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs text-center font-bold"
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
          onClick={() => setStep((s) => Math.min(TOTAL - 1, s + 1))}
          disabled={step === TOTAL - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-30 transition-all"
        >
          {isEn ? "Next" : "다음"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
