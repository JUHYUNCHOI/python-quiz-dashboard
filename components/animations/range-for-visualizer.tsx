"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw, Copy, Zap, Lock } from "lucide-react"

// ============================================
// Range-based for 루프 시각화
// for(int i : v)  vs  for(int& i : v)  vs  for(const int& i : v)
// ============================================

const VALUES = [10, 20, 30, 40, 50]

type Mode = "copy" | "ref" | "cref"

const MODES: { id: Mode; label: string; syntax: string; color: string; bg: string; border: string }[] = [
  {
    id: "copy",
    label: "복사 (느림)",
    syntax: "for (int i : v)",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  {
    id: "ref",
    label: "참조 (빠름)",
    syntax: "for (int& i : v)",
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#a7f3d0",
  },
  {
    id: "cref",
    label: "const 참조 (권장)",
    syntax: "for (const int& i : v)",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
  },
]

export function RangeForVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(-1) // -1: 시작 전
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isEn = lang === "en"

  const current = MODES.find(m => m.id === mode)!
  const isRunning = step >= 0 && step < VALUES.length

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStep(-1)
    setRunning(false)
  }

  const start = () => {
    reset()
    setRunning(true)
    // step을 0부터 시작
    setTimeout(() => setStep(0), 100)
  }

  useEffect(() => {
    if (!running || step < 0) return
    if (step >= VALUES.length) {
      setRunning(false)
      return
    }
    timerRef.current = setTimeout(() => {
      setStep(s => s + 1)
    }, 900)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [running, step])

  useEffect(() => { reset() }, [mode])

  const done = step >= VALUES.length

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">

      {/* 모드 선택 */}
      <div className="flex flex-col gap-2">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl border-2 text-left transition-all"
            style={mode === m.id
              ? { background: m.bg, borderColor: m.color }
              : { background: "white", borderColor: "#e2e8f0" }
            }
          >
            <div>
              <span className="font-mono text-sm font-bold" style={{ color: mode === m.id ? m.color : "#64748b" }}>
                {m.syntax}
              </span>
            </div>
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={mode === m.id
                ? { background: m.color, color: "white" }
                : { background: "#f1f5f9", color: "#94a3b8" }
              }
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* 메인 시각화 */}
      <div
        className="rounded-2xl border-2 p-4 space-y-4 transition-all duration-300"
        style={{ background: current.bg, borderColor: current.border }}
      >
        {/* 원본 배열 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "VECTOR v" : "원본 벡터 v"}
          </div>
          <div className="flex gap-2">
            {VALUES.map((val, i) => {
              const isActive = step === i && !done
              const isPast = step > i
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-base font-bold border-2 relative"
                    style={{
                      background: isActive ? current.color : isPast ? current.color + "30" : "white",
                      color: isActive ? "white" : current.color,
                      borderColor: isActive ? current.color : isPast ? current.color + "50" : "#e2e8f0",
                    }}
                  >
                    {val}
                    {/* 참조 모드: i가 가리키는 화살표 표시 */}
                    {(mode === "ref" || mode === "cref") && isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold flex flex-col items-center"
                        style={{ color: current.color }}
                      >
                        <span className="text-[10px]">i</span>
                        <span>↓</span>
                      </motion.div>
                    )}
                    {/* const 참조: 자물쇠 */}
                    {mode === "cref" && isActive && (
                      <div className="absolute -top-1 -right-1">
                        <Lock className="w-3 h-3 text-indigo-500" />
                      </div>
                    )}
                  </motion.div>
                  <span className="text-[10px] text-gray-400 font-mono">[{i}]</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 복사 모드: i 변수 박스 */}
        {mode === "copy" && (
          <div>
            <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider flex items-center gap-1">
              <Copy className="w-3 h-3" />
              {isEn ? "int i (copy)" : "int i — 복사본"}
            </div>
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                {step >= 0 && !done ? (
                  <motion.div
                    key={step}
                    initial={{ scale: 0.5, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-base font-bold border-2"
                    style={{ background: "#ef4444", color: "white", borderColor: "#ef4444" }}
                  >
                    {VALUES[step]}
                  </motion.div>
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm text-gray-300 border-2 border-dashed border-gray-200">
                    ?
                  </div>
                )}
              </AnimatePresence>
              {step >= 0 && !done && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-400 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {isEn ? "new copy made each iteration" : "매 반복마다 값 복사 발생"}
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* 참조 모드: 화살표 설명 */}
        {(mode === "ref" || mode === "cref") && step >= 0 && !done && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-medium"
            style={{ color: current.color }}
          >
            <Zap className="w-3.5 h-3.5" />
            {mode === "ref"
              ? (isEn ? "i IS v[" + step + "] — no copy, direct access" : `i는 v[${step}] 그 자체 — 복사 없음, 직접 접근!`)
              : (isEn ? "i = const ref to v[" + step + "] — read only, no copy" : `i는 v[${step}]의 읽기전용 참조 — 수정 불가, 복사 없음!`)
            }
          </motion.div>
        )}

        {/* 완료 메시지 */}
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-2 rounded-xl text-sm font-bold"
            style={{ background: current.color + "20", color: current.color }}
          >
            ✅ {isEn ? "Loop complete!" : "반복 완료!"}
          </motion.div>
        )}

        {/* 재생 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={start}
            disabled={running}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
            style={{ background: current.color }}
          >
            <Play className="w-3.5 h-3.5" />
            {isEn ? "Run" : "실행"}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 비교 요약 카드 */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider">
          {isEn ? "COMPARISON" : "비교 요약"}
        </div>
        <div className="divide-y divide-gray-50">
          {[
            {
              syntax: "for (int i : v)",
              color: "#ef4444",
              copy: true,
              modify: true,
              safe: false,
              speed: 1,
              note: isEn ? "copies each value — slow for large data" : "값을 매번 복사 — 큰 데이터엔 느림",
            },
            {
              syntax: "for (int& i : v)",
              color: "#10b981",
              copy: false,
              modify: true,
              safe: false,
              speed: 3,
              note: isEn ? "direct access — fast, can modify" : "직접 접근 — 빠름, 값 변경 가능",
            },
            {
              syntax: "for (const int& i : v)",
              color: "#6366f1",
              copy: false,
              modify: false,
              safe: true,
              speed: 3,
              note: isEn ? "direct + read-only — recommended!" : "직접 접근 + 읽기전용 — 권장!",
            },
          ].map((row, i) => (
            <div key={i} className="px-4 py-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold" style={{ color: row.color }}>{row.syntax}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: j < row.speed ? row.color : "#e2e8f0" }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-gray-500">{row.note}</div>
              <div className="flex gap-2 text-[10px] font-bold">
                <span className={row.copy ? "text-red-400" : "text-emerald-500"}>
                  {row.copy ? "📋 복사" : "⚡ 복사없음"}
                </span>
                <span className={row.modify ? "text-amber-500" : "text-gray-400"}>
                  {row.modify ? "✏️ 수정가능" : "🔒 읽기전용"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-indigo-50 border-t border-indigo-100">
          <p className="text-xs text-indigo-700 font-medium">
            💡 {isEn
              ? "Best practice: use const int& for read-only loops, int& only when you need to modify values."
              : "실전 팁: 값을 바꿀 필요 없으면 const int&, 값을 바꿔야 할 때만 int& 써요!"}
          </p>
        </div>
      </div>
    </div>
  )
}
