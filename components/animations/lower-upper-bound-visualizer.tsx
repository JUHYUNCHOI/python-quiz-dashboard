"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// lower_bound / upper_bound 시각화
// 정렬된 벡터에서 "이상" vs "초과" 의 차이를 직관적으로
// ============================================================

const VECTOR = [1, 3, 5, 5, 5, 7, 9]

export function LowerUpperBoundVisualizer({
  lang = "ko",
}: {
  lang?: "ko" | "en"
}) {
  const [target, setTarget] = useState(5)
  const isEn = lang === "en"

  // lower_bound: 첫 번째 위치 where v[i] >= target
  // upper_bound: 첫 번째 위치 where v[i] > target
  const lower = VECTOR.findIndex((v) => v >= target)
  const upper = VECTOR.findIndex((v) => v > target)
  const lb = lower === -1 ? VECTOR.length : lower
  const ub = upper === -1 ? VECTOR.length : upper
  const countOfTarget = ub - lb

  const TARGETS = [1, 3, 4, 5, 6, 7, 9, 10]

  const cellW = 48
  const gap = 6

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-2xl border-2 border-slate-200 select-none">
      {/* target chooser */}
      <div className="text-center mb-3 text-xs font-mono text-slate-500">
        {isEn ? "Pick a target value:" : "찾을 값을 골라봐요:"}
      </div>
      <div className="flex justify-center gap-1.5 mb-4 flex-wrap">
        {TARGETS.map((t) => (
          <button
            key={t}
            onClick={() => setTarget(t)}
            className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all"
            style={{
              background: target === t ? "#7c3aed" : "#f1f5f9",
              color: target === t ? "white" : "#475569",
              boxShadow: target === t ? "0 0 0 3px #7c3aed25" : undefined,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* vector cells */}
      <div className="relative mx-auto" style={{ width: VECTOR.length * cellW + (VECTOR.length - 1) * gap }}>
        {/* arrows above */}
        <div className="relative h-9 mb-1">
          <AnimatePresence>
            {/* lower_bound arrow */}
            <motion.div
              key={`lb-${lb}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute flex flex-col items-center"
              style={{ left: lb * (cellW + gap) + cellW / 2 - 26 }}
            >
              <span className="text-[10px] font-bold text-emerald-600 px-1.5 py-0.5 rounded bg-emerald-50">
                lower_bound
              </span>
              <span className="text-emerald-600 text-lg leading-none">▼</span>
            </motion.div>
            {/* upper_bound arrow */}
            <motion.div
              key={`ub-${ub}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="absolute flex flex-col items-center"
              style={{ left: ub * (cellW + gap) + cellW / 2 - 26 }}
            >
              <span className="text-[10px] font-bold text-rose-600 px-1.5 py-0.5 rounded bg-rose-50">
                upper_bound
              </span>
              <span className="text-rose-600 text-lg leading-none">▼</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* cells */}
        <div className="flex gap-1.5">
          {VECTOR.map((val, i) => {
            const inRange = i >= lb && i < ub
            const isEqual = val === target
            return (
              <div
                key={i}
                className="rounded-xl border-[3px] flex flex-col items-center justify-center font-mono font-bold transition-all duration-200"
                style={{
                  width: cellW,
                  height: cellW,
                  borderColor: inRange ? "#7c3aed" : isEqual ? "#a78bfa" : "#cbd5e1",
                  background: inRange ? "#ede9fe" : "#f8fafc",
                  color: inRange ? "#5b21b6" : "#64748b",
                  boxShadow: inRange ? "0 0 0 3px #7c3aed20" : undefined,
                }}
              >
                <span className="text-base">{val}</span>
                <span className="text-[9px] opacity-60 font-normal">[{i}]</span>
              </div>
            )
          })}
          {/* end marker */}
          <div
            className="rounded-xl border-[3px] border-dashed flex flex-col items-center justify-center font-mono text-[10px] font-bold"
            style={{
              width: cellW,
              height: cellW,
              borderColor: lb === VECTOR.length || ub === VECTOR.length ? "#94a3b8" : "#e2e8f0",
              color: "#94a3b8",
            }}
          >
            end
          </div>
        </div>
      </div>

      {/* explanation */}
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-50">
          <span className="font-mono font-bold text-emerald-600 shrink-0">lower_bound({target})</span>
          <span className="text-slate-700">
            {isEn ? (
              <>
                = first position where value <strong>≥ {target}</strong> →{" "}
                <span className="font-mono font-bold">{lb}</span>
              </>
            ) : (
              <>
                = <strong>{target} 이상</strong> 인 첫 위치 →{" "}
                <span className="font-mono font-bold">{lb}</span>
              </>
            )}
          </span>
        </div>
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-rose-50">
          <span className="font-mono font-bold text-rose-600 shrink-0">upper_bound({target})</span>
          <span className="text-slate-700">
            {isEn ? (
              <>
                = first position where value <strong>&gt; {target}</strong> →{" "}
                <span className="font-mono font-bold">{ub}</span>
              </>
            ) : (
              <>
                = <strong>{target} 초과</strong> 인 첫 위치 →{" "}
                <span className="font-mono font-bold">{ub}</span>
              </>
            )}
          </span>
        </div>
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-violet-50">
          <span className="font-mono font-bold text-violet-600 shrink-0">ub − lb</span>
          <span className="text-slate-700">
            {isEn ? (
              <>
                = how many <strong>{target}</strong>s in the range →{" "}
                <span className="font-mono font-bold">{countOfTarget}</span>
              </>
            ) : (
              <>
                = 범위 안의 <strong>{target}</strong> 개수 →{" "}
                <span className="font-mono font-bold">{countOfTarget}</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 mt-3 leading-relaxed">
        {isEn ? (
          <>
            ⚠️ Both work only on <strong>sorted</strong> data. The vector here is{" "}
            <span className="font-mono">[1, 3, 5, 5, 5, 7, 9]</span>.
          </>
        ) : (
          <>
            ⚠️ 둘 다 <strong>정렬된</strong> 데이터에서만 동작해요. 여기 벡터는{" "}
            <span className="font-mono">[1, 3, 5, 5, 5, 7, 9]</span>.
          </>
        )}
      </div>
    </div>
  )
}
