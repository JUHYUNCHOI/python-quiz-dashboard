"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// auto 타입 추론 시각화
// auto가 오른쪽 값을 보고 타입을 결정하는 과정
// ============================================

function getEXAMPLES(isEn: boolean) {
  return [
    {
      code: "auto x = 42;",
      value: "42",
      inferred: "int",
      color: "#3b82f6",
      bg: "#eff6ff",
      reason: isEn ? "integer → int" : "정수 → int",
      full: "int x = 42;",
    },
    {
      code: "auto x = 3.14;",
      value: "3.14",
      inferred: "double",
      color: "#8b5cf6",
      bg: "#f5f3ff",
      reason: isEn ? "decimal → double" : "소수 → double",
      full: "double x = 3.14;",
    },
    {
      code: 'auto x = true;',
      value: "true",
      inferred: "bool",
      color: "#ec4899",
      bg: "#fdf2f8",
      reason: "true/false → bool",
      full: "bool x = true;",
    },
    {
      code: 'auto x = "hi";',
      value: '"hi"',
      inferred: "string",
      color: "#f59e0b",
      bg: "#fffbeb",
      reason: isEn ? "string literal → string" : "문자열 → string",
      full: 'string x = "hi";',
    },
    {
      code: "// vector<int> v = {1,2,3};\nauto x = v[0];",
      value: "v[0]",
      inferred: "int",
      color: "#10b981",
      bg: "#f0fdf4",
      reason: isEn ? "vector<int> element → int" : "vector<int>의 원소 → int",
      full: "int x = v[0];",
    },
    {
      code: "// vector<int> v = {1,2,3};\nfor (auto x : v)",
      value: isEn ? "element of v" : "v의 원소",
      inferred: "int",
      color: "#06b6d4",
      bg: "#ecfeff",
      reason: isEn ? "vector<int> element type → int" : "vector<int>의 원소 타입 → int",
      full: "for (int x : v)",
    },
  ]
}

type Phase = "idle" | "scanning" | "revealing" | "done"

export function AutoTypeVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [selected, setSelected] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const isEn = lang === "en"
  const EXAMPLES = getEXAMPLES(isEn)
  const ex = EXAMPLES[selected]

  const run = () => {
    setPhase("scanning")
    setTimeout(() => setPhase("revealing"), 900)
    setTimeout(() => setPhase("done"), 1700)
  }

  const reset = () => setPhase("idle")

  const handleSelect = (i: number) => {
    setSelected(i)
    setPhase("idle")
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">

      {/* 예시 선택 */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((e, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono"
            style={selected === i
              ? { background: e.color, color: "white", borderColor: e.color }
              : { background: "white", color: "#94a3b8", borderColor: "#e2e8f0" }
            }
          >
            {e.reason}
          </button>
        ))}
      </div>

      {/* 메인 시뮬 */}
      <div
        className="rounded-2xl border-2 p-5 space-y-5 transition-colors duration-300"
        style={{ background: ex.bg, borderColor: ex.color + "40" }}
      >
        {/* Step 1: 코드 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {lang === "en" ? "CODE" : "코드"}
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-gray-100 whitespace-pre">
            {ex.code}
          </div>
        </div>

        {/* 화살표 + 타입 추론 과정 */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* auto 박스 */}
          <div className="flex flex-col items-center gap-1">
            <div
              className="px-4 py-2 rounded-xl font-mono text-sm font-bold border-2"
              style={{ borderColor: ex.color, color: ex.color, background: "white" }}
            >
              auto
            </div>
            <span className="text-[10px] text-gray-400">
              {lang === "en" ? "keyword" : "키워드"}
            </span>
          </div>

          {/* 스캔 화살표 */}
          <motion.div
            animate={phase === "scanning" ? { x: [0, 6, 0], opacity: [1, 0.5, 1] } : {}}
            transition={{ repeat: phase === "scanning" ? 2 : 0, duration: 0.4 }}
            className="text-gray-400 text-lg"
          >
            →
          </motion.div>

          {/* 값 박스 */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={phase === "scanning"
                ? { scale: [1, 1.1, 1], boxShadow: [`0 0 0px ${ex.color}00`, `0 0 12px ${ex.color}88`, `0 0 0px ${ex.color}00`] }
                : {}
              }
              transition={{ repeat: phase === "scanning" ? 2 : 0, duration: 0.4 }}
              className="px-4 py-2 rounded-xl font-mono text-sm font-bold border-2 bg-white"
              style={{ borderColor: ex.color, color: "#374151" }}
            >
              {ex.value}
            </motion.div>
            <span className="text-[10px] text-gray-400">
              {lang === "en" ? "right-hand value" : "오른쪽 값"}
            </span>
          </div>

          {/* 결과 화살표 */}
          <div className="text-gray-300 text-lg">→</div>

          {/* 추론된 타입 */}
          <div className="flex flex-col items-center gap-1">
            <AnimatePresence mode="wait">
              {phase === "idle" || phase === "scanning" ? (
                <motion.div
                  key="question"
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-16 h-10 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 font-mono text-sm font-bold"
                >
                  ?
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="px-4 py-2 rounded-xl font-mono text-sm font-bold text-white"
                  style={{ background: ex.color }}
                >
                  {ex.inferred}
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-[10px] text-gray-400">
              {lang === "en" ? "inferred type" : "추론된 타입"}
            </span>
          </div>
        </div>

        {/* 실제 컴파일러가 바꾼 코드 */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <div className="text-[11px] font-bold tracking-wider" style={{ color: ex.color }}>
                {lang === "en" ? "✅ COMPILER SEES IT AS:" : "✅ 컴파일러가 실제로 보는 코드:"}
              </div>
              <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-green-400">
                {ex.full}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 버튼 */}
        <div className="flex gap-2">
          {phase === "idle" ? (
            <button
              onClick={run}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: ex.color }}
            >
              {lang === "en" ? "▶ Infer type" : "▶ 타입 추론하기"}
            </button>
          ) : (
            <button
              onClick={reset}
              className="px-5 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200"
            >
              {lang === "en" ? "↺ Reset" : "↺ 다시"}
            </button>
          )}
        </div>
      </div>

      {/* 핵심 요약 */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 space-y-2">
        <div className="text-[11px] font-bold text-gray-400 tracking-wider">
          {lang === "en" ? "HOW AUTO WORKS" : "auto 동작 원리"}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {isEn
            ? <><code className="font-mono font-bold text-gray-800">auto</code> means "you don't have to write the type yourself".
              The compiler looks at the right-hand value and <strong>decides the type automatically</strong>. Because it happens at <strong>compile time</strong>, there's no speed cost!</>
            : <><code className="font-mono font-bold text-gray-800">auto</code>는 "타입을 직접 안 써도 돼요" 라는 뜻이에요.
              컴파일러가 오른쪽 값을 보고 <strong>스스로 타입을 결정</strong>해요. 실행 중이 아니라
              <strong> 컴파일 시점</strong>에 결정되기 때문에 속도는 똑같아요!</>
          }
        </p>
      </div>
    </div>
  )
}
