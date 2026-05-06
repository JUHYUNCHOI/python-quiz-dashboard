"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// 타입 변환 시각화 (lesson 9)
// 값이 한 타입 박스에서 다른 타입 박스로 옮겨가는 과정을 보여줌
// 변환 함수의 동작(소수점 버림, 따옴표 부착/제거 등) 을 시각적으로 강조
// ============================================

type Op = {
  // 입력
  inText: string         // "100"
  inType: "str" | "int" | "float" | "bool" | "none"
  // 변환 함수
  funcName: "int" | "float" | "str" | "bool"
  // 결과
  outText: string        // 100
  outType: "str" | "int" | "float" | "bool" | "error"
  // 처리 단계 라벨 (한 줄 설명)
  processLabel: string
  // 결과의 색
  color: string
}

type Preset = {
  id: string
  label: string
  ops: Op[]              // 한 프리셋 안에서 1~2 단계
  caption: string
  color: string
}

const TYPE_COLORS: Record<string, string> = {
  str: "#f59e0b",
  int: "#3b82f6",
  float: "#a855f7",
  bool: "#ec4899",
  none: "#94a3b8",
  error: "#ef4444",
}

function getPresets(isEn: boolean): Preset[] {
  return [
    {
      id: "str-to-int",
      label: 'int("123")',
      ops: [{
        inText: '"123"',
        inType: "str",
        funcName: "int",
        outText: "123",
        outType: "int",
        processLabel: isEn ? "strip the quotes → 123" : "따옴표를 벗겨 → 123",
        color: TYPE_COLORS.int,
      }],
      caption: isEn
        ? "int() reads the digits inside the string and rebuilds them as an integer. The quotes are gone."
        : "int() 는 문자열 안 숫자를 읽어 정수로 다시 만들어요. 따옴표는 사라져요.",
      color: TYPE_COLORS.int,
    },
    {
      id: "float-to-int",
      label: "int(3.7)",
      ops: [{
        inText: "3.7",
        inType: "float",
        funcName: "int",
        outText: "3",
        outType: "int",
        processLabel: isEn ? "drop everything after the dot → 3 (NOT rounded!)" : "소수점 뒤를 잘라냄 → 3 (반올림 아님!)",
        color: TYPE_COLORS.int,
      }],
      caption: isEn
        ? "int() truncates floats — it cuts off the decimal part. 3.9 also becomes 3, not 4!"
        : "int() 는 소수점을 잘라요(반올림 X). 3.9 도 3 이 돼요. (round() 와 차이!)",
      color: TYPE_COLORS.int,
    },
    {
      id: "str-to-float",
      label: 'float("3.14")',
      ops: [{
        inText: '"3.14"',
        inType: "str",
        funcName: "float",
        outText: "3.14",
        outType: "float",
        processLabel: isEn ? "parse as a decimal number" : "소수로 해석",
        color: TYPE_COLORS.float,
      }],
      caption: isEn
        ? "float() understands decimal points. Useful for prices, scores, measurements stored as strings."
        : "float() 는 소수점을 알아봐요. 문자열로 저장된 가격, 점수, 측정값에 자주 써요.",
      color: TYPE_COLORS.float,
    },
    {
      id: "int-to-str",
      label: "str(42)",
      ops: [{
        inText: "42",
        inType: "int",
        funcName: "str",
        outText: '"42"',
        outType: "str",
        processLabel: isEn ? "wrap in quotes → \"42\"" : "따옴표를 둘러서 → \"42\"",
        color: TYPE_COLORS.str,
      }],
      caption: isEn
        ? "str() puts the value into quotes. Needed when you want to + concatenate with other strings."
        : "str() 은 값을 따옴표로 감싸요. 다른 문자열과 + 로 이어붙일 때 필요.",
      color: TYPE_COLORS.str,
    },
    {
      id: "bool-cases",
      label: "bool() — True / False",
      ops: [
        { inText: "0",   inType: "int", funcName: "bool", outText: "False", outType: "bool", processLabel: isEn ? "0 is falsy" : "0 은 거짓",     color: TYPE_COLORS.bool },
        { inText: "1",   inType: "int", funcName: "bool", outText: "True",  outType: "bool", processLabel: isEn ? "non-zero → True" : "0 이 아니면 True", color: TYPE_COLORS.bool },
        { inText: '""',  inType: "str", funcName: "bool", outText: "False", outType: "bool", processLabel: isEn ? "empty string → False" : "빈 문자열 → False", color: TYPE_COLORS.bool },
        { inText: '"hi"',inType: "str", funcName: "bool", outText: "True",  outType: "bool", processLabel: isEn ? "non-empty string → True" : "비지 않은 문자열 → True", color: TYPE_COLORS.bool },
      ],
      caption: isEn
        ? "Falsy: 0, 0.0, \"\", None, []. Anything else is True."
        : "False 가 되는 것: 0, 0.0, \"\", None, []. 나머지는 모두 True.",
      color: TYPE_COLORS.bool,
    },
    {
      id: "trap",
      label: 'int("3.14") ❌',
      ops: [
        { inText: '"3.14"', inType: "str", funcName: "int",   outText: "ValueError",     outType: "error", processLabel: isEn ? "int() refuses decimal text!" : "int() 는 소수점 문자열 거부!", color: TYPE_COLORS.error },
        { inText: '"3.14"', inType: "str", funcName: "float", outText: "3.14",          outType: "float", processLabel: isEn ? "first → float ✅" : "먼저 float ✅", color: TYPE_COLORS.float },
        { inText: "3.14",   inType: "float", funcName: "int", outText: "3",              outType: "int",   processLabel: isEn ? "then → int (truncate)" : "그 다음 int (소수점 자름)", color: TYPE_COLORS.int },
      ],
      caption: isEn
        ? "Direct int(\"3.14\") errors. Safe path: int(float(\"3.14\")) — convert through float first."
        : "int(\"3.14\") 는 에러! 안전한 길: int(float(\"3.14\")) — float 거쳐서 int.",
      color: TYPE_COLORS.error,
    },
  ]
}

type Phase = "idle" | "running" | "done"

function TypeBadge({ type }: { type: string }) {
  const c = TYPE_COLORS[type] || "#94a3b8"
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: c + "22", color: c }}>
      {type}
    </span>
  )
}

function TypeConversionVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const PRESETS = getPresets(isEn)
  const [selectedId, setSelectedId] = useState(PRESETS[0].id)
  // 한 op 당 1 단계로 단순화. step = 0 시작, step = N (op 수) 끝.
  const [step, setStep] = useState(0)

  const preset = PRESETS.find((p) => p.id === selectedId) ?? PRESETS[0]
  const totalSteps = preset.ops.length

  // 파생 상태
  const phase: Phase = step === 0 ? "idle" : step >= totalSteps ? "done" : "running"
  const activeOp = step > 0 && step < totalSteps ? step - 1 : -1   // 마지막 처리한 op
  const completed = step - 1                                        // 완료된 op 인덱스 (-1 부터)
  const stepsLeft = totalSteps - step

  const reset = () => setStep(0)
  const stepOnce = () => setStep((s) => Math.min(s + 1, totalSteps))
  const runAll = () => setStep(totalSteps)

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">

      {/* 프리셋 */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedId(p.id); reset() }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono"
            style={selectedId === p.id
              ? { background: p.color, color: "white", borderColor: p.color }
              : { background: "white", color: "#94a3b8", borderColor: "#e2e8f0" }
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-2 p-4 space-y-3" style={{ borderColor: preset.color + "40", background: preset.color + "0d" }}>

        {/* op 라인들 */}
        <div className="space-y-3">
          {preset.ops.map((op, i) => {
            const isActive = activeOp === i
            const isComplete = completed >= i
            const showResult = isComplete || (isActive && phase === "running")
            const inColor = TYPE_COLORS[op.inType]
            const outColor = TYPE_COLORS[op.outType]
            return (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* 입력 박스 */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="px-3 py-2 rounded-xl border-2 bg-white font-mono text-sm font-bold" style={{ borderColor: inColor, color: "#374151" }}>
                      {op.inText}
                    </div>
                    <TypeBadge type={op.inType} />
                  </motion.div>

                  {/* 함수 박스 */}
                  <motion.div
                    animate={isActive ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isActive ? 1 : 0 }}
                    className="px-3 py-2 rounded-xl text-sm font-mono font-bold text-white shadow-md"
                    style={{ background: outColor }}
                  >
                    {op.funcName}()
                  </motion.div>

                  {/* 화살표 */}
                  <div className="text-gray-400 text-lg">→</div>

                  {/* 출력 박스 */}
                  <AnimatePresence mode="wait">
                    {!showResult ? (
                      <motion.div
                        key="q"
                        exit={{ scale: 0, opacity: 0 }}
                        className="px-3 py-2 rounded-xl border-2 border-dashed border-gray-300 text-gray-300 font-mono text-sm font-bold"
                      >
                        ?
                      </motion.div>
                    ) : (
                      <motion.div
                        key="r"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className="px-3 py-2 rounded-xl font-mono text-sm font-bold"
                          style={{
                            background: outColor + "22",
                            color: outColor,
                            border: `2px solid ${outColor}`,
                          }}
                        >
                          {op.outText}
                        </div>
                        <TypeBadge type={op.outType} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 단계 라벨 */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs ml-2 pl-2 border-l-2"
                      style={{ borderColor: outColor + "55", color: "#475569" }}
                    >
                      {op.processLabel}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* 캡션 */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-3 py-2 text-xs"
              style={{ background: preset.color + "15", color: "#374151" }}
            >
              💡 {preset.caption}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 진행 상태 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            <span className="font-mono">{step}</span>
            <span className="text-gray-300"> / </span>
            <span className="font-mono">{totalSteps}</span>
            <span className="ml-1">{isEn ? "steps" : "단계"}</span>
          </span>
          {phase === "done" && (
            <span className="font-bold" style={{ color: preset.color }}>✓ {isEn ? "done" : "끝"}</span>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={stepOnce}
            disabled={phase === "done"}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: preset.color }}
          >
            ▷ {isEn ? "Step" : "한 단계"}
            {stepsLeft > 0 && (
              <span className="ml-1 text-xs opacity-80">({stepsLeft} {isEn ? "left" : "남음"})</span>
            )}
          </button>
          <button
            onClick={runAll}
            disabled={phase === "done"}
            className="px-4 py-2 rounded-xl text-sm font-bold border-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "white", color: preset.color, borderColor: preset.color + "60" }}
          >
            ⏭ {isEn ? "Show all" : "끝까지"}
          </button>
          <button
            onClick={reset}
            disabled={step === 0}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ↺ {isEn ? "Reset" : "다시"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TypeConversionVisualizer
export { TypeConversionVisualizer }
