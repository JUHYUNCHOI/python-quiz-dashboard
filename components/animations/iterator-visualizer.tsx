"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

// ============================================================
// Iterator visualizer — vector 안의 커서 개념 직관화
// ============================================================

const VECTOR = [10, 20, 30, 40, 50]
const TOTAL = VECTOR.length

export function IteratorVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [pos, setPos] = useState(0) // 0..TOTAL — TOTAL means end()
  const isEn = lang === "en"

  const isAtEnd = pos === TOTAL
  const currentVal = isAtEnd ? null : VECTOR[pos]

  const goBegin = () => setPos(0)
  const goNext = () => setPos((p) => Math.min(p + 1, TOTAL))
  const goPrev = () => setPos((p) => Math.max(p - 1, 0))
  const goEnd = () => setPos(TOTAL)

  // Cell layout (in px) — used for cursor positioning
  const CELL_W = 56
  const GAP = 8

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-2xl border-2 border-slate-200 select-none">
      {/* code / state line */}
      <div className="text-center mb-4 font-mono text-sm bg-slate-900 text-slate-100 rounded-xl py-2.5 px-3">
        {isAtEnd ? (
          <div className="text-rose-300">
            it = v.end() &nbsp;
            <span className="text-slate-400 text-xs">
              {isEn ? "// no value here, just the end marker" : "// 값 없음, 끝 신호"}
            </span>
          </div>
        ) : (
          <div>
            <span className="text-emerald-300">*it</span> ={" "}
            <span className="text-yellow-300 font-bold">{currentVal}</span>
            <span className="text-slate-500 mx-2">|</span>
            <span className="text-blue-300">it - v.begin()</span> ={" "}
            <span className="text-yellow-300 font-bold">{pos}</span>
          </div>
        )}
      </div>

      {/* cursor row */}
      <div className="relative h-7" style={{ width: (TOTAL + 1) * CELL_W + TOTAL * GAP }}>
        <motion.div
          animate={{ x: pos * (CELL_W + GAP) + CELL_W / 2 - 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="absolute top-0 text-2xl leading-none"
          style={{ color: isAtEnd ? "var(--color-rose-600)" : "var(--color-emerald-500)" }}
        >
          ▼
        </motion.div>
      </div>

      {/* vector cells + end marker */}
      <div className="flex gap-2 mb-2">
        {VECTOR.map((val, i) => (
          <div
            key={i}
            className="w-14 h-14 rounded-xl border-[3px] flex items-center justify-center font-mono font-bold text-lg transition-all duration-200"
            style={{
              borderColor: pos === i ? "var(--color-emerald-500)" : "var(--color-slate-300)",
              background: pos === i ? "var(--color-emerald-50)" : "var(--color-slate-50)",
              color: pos === i ? "var(--color-emerald-800)" : "var(--color-slate-500)",
              boxShadow: pos === i ? "0 0 0 4px #10b98125" : undefined,
            }}
          >
            {val}
          </div>
        ))}
        {/* end() marker — past-the-end */}
        <div
          className="w-14 h-14 rounded-xl border-[3px] border-dashed flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-200"
          style={{
            borderColor: isAtEnd ? "var(--color-rose-600)" : "var(--color-slate-300)",
            background: isAtEnd ? "var(--color-rose-50)" : "transparent",
            color: isAtEnd ? "var(--color-rose-700)" : "var(--color-slate-400)",
            boxShadow: isAtEnd ? "0 0 0 4px #e11d4825" : undefined,
          }}
        >
          end
        </div>
      </div>

      {/* indices below */}
      <div className="flex gap-2 mb-4 text-[11px] text-slate-400 font-mono">
        {VECTOR.map((_, i) => (
          <div key={i} className="w-14 text-center">
            [{i}]
          </div>
        ))}
        <div className="w-14 text-center">{isEn ? "end()" : "end()"}</div>
      </div>

      {/* controls */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        <button
          onClick={goBegin}
          className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
        >
          v.begin()
        </button>
        <button
          onClick={goPrev}
          disabled={pos === 0}
          aria-label="prev"
          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-colors flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goNext}
          disabled={pos === TOTAL}
          className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 disabled:opacity-30 transition-colors flex items-center gap-1"
        >
          ++it <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={goEnd}
          className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
        >
          v.end()
        </button>
        <button
          onClick={goBegin}
          aria-label="reset"
          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-center text-[11px] text-slate-400 mt-3 px-2 leading-relaxed">
        {isEn ? (
          <>
            <span className="font-mono">begin()</span> points at the first cell.{" "}
            <span className="font-mono">end()</span> points <strong>past</strong> the last cell —
            it&apos;s the &ldquo;end-of-range&rdquo; marker, not a real element.
          </>
        ) : (
          <>
            <span className="font-mono">begin()</span> 은 첫 칸을,{" "}
            <span className="font-mono">end()</span> 은 마지막 칸의 <strong>다음 자리</strong> 를
            가리켜요 — 실제 원소가 아니라 &ldquo;끝났다&rdquo; 는 신호예요.
          </>
        )}
      </div>
    </div>
  )
}
