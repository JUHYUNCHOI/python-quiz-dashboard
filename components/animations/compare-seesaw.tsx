"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 비교 연산자 시소 시각화
//
// 두 숫자를 양쪽에 올린 시소가 무게에 따라 기울어지고,
// 선택한 연산자 (>, <, >=, <=, ==, !=) 가 True/False 인지 보여준다.
//
// 특히 >= vs > 의 차이가 명확하도록:
//   값이 같을 때 → 시소는 수평
//   - >  같음 → False (수평이지만 "더 크지" 않음)
//   - >= 같음 → True  ("크거나 같음" 의 "같음" 쪽)
// ============================================================

type CompareOp = ">" | "<" | ">=" | "<=" | "==" | "!="

interface CompareSeesawProps {
  lang?: "ko" | "en"
  initialLeft?: number
  initialRight?: number
  initialOp?: CompareOp
  min?: number
  max?: number
}

const LEFT_COLOR = "#3b82f6"   // blue-500
const LEFT_BG = "#eff6ff"      // blue-50
const RIGHT_COLOR = "#f59e0b"  // amber-500
const RIGHT_BG = "#fffbeb"     // amber-50
const TRUE_COLOR = "#10b981"   // emerald-500
const FALSE_COLOR = "#ef4444"  // red-500

const OPS: CompareOp[] = [">", "<", ">=", "<=", "==", "!="]

function evaluate(a: number, b: number, op: CompareOp): boolean {
  switch (op) {
    case ">": return a > b
    case "<": return a < b
    case ">=": return a >= b
    case "<=": return a <= b
    case "==": return a === b
    case "!=": return a !== b
  }
}

function opLabel(op: CompareOp, isEn: boolean): string {
  if (isEn) {
    switch (op) {
      case ">": return "greater than"
      case "<": return "less than"
      case ">=": return "greater or equal"
      case "<=": return "less or equal"
      case "==": return "equal to"
      case "!=": return "not equal to"
    }
  }
  switch (op) {
    case ">": return "보다 크다"
    case "<": return "보다 작다"
    case ">=": return "크거나 같다"
    case "<=": return "작거나 같다"
    case "==": return "같다"
    case "!=": return "다르다"
  }
}

export function CompareSeesaw({
  lang = "ko",
  initialLeft = 7,
  initialRight = 5,
  initialOp = ">",
  min = 0,
  max = 20,
}: CompareSeesawProps) {
  const isEn = lang === "en"
  const [left, setLeft] = useState(initialLeft)
  const [right, setRight] = useState(initialRight)
  const [op, setOp] = useState<CompareOp>(initialOp)

  const result = useMemo(() => evaluate(left, right, op), [left, right, op])

  // 시소 회전 각도 (왼쪽이 무거우면 왼쪽이 내려가니까 음수)
  const diff = left - right
  const tilt = useMemo(() => {
    // 차이를 -15도 ~ +15도 사이로 매핑 (왼쪽 무거우면 왼쪽 down → 양수 rotate)
    const maxAbs = Math.max(1, max - min)
    const ratio = Math.max(-1, Math.min(1, diff / maxAbs))
    // 왼쪽이 무거우면 시소 왼쪽이 내려감 = 회전축 기준 시계방향 = positive rotate
    return ratio * 14
  }, [diff, min, max])

  const isEqual = left === right
  const labelHeader = isEn ? "Compare Seesaw" : "비교 시소"
  const labelLeft = isEn ? "Left number" : "왼쪽 숫자"
  const labelRight = isEn ? "Right number" : "오른쪽 숫자"
  const labelOp = isEn ? "Operator" : "연산자"
  const labelResult = isEn ? "Result" : "결과"

  // 같을 때 >= vs > 차이 강조 문구
  const equalNote = useMemo(() => {
    if (!isEqual) return null
    if (op === ">") return isEn ? "Equal → not strictly greater → False" : "같음 → '더 크지' 않음 → False"
    if (op === "<") return isEn ? "Equal → not strictly less → False" : "같음 → '더 작지' 않음 → False"
    if (op === ">=") return isEn ? "Equal counts as 'or equal' → True" : "'같음' 도 인정 → True"
    if (op === "<=") return isEn ? "Equal counts as 'or equal' → True" : "'같음' 도 인정 → True"
    if (op === "==") return isEn ? "Equal → True" : "같음 → True"
    if (op === "!=") return isEn ? "Equal → 'not equal' fails → False" : "같음 → '다르다' 가 아님 → False"
    return null
  }, [isEqual, op, isEn])

  const expression = `${left} ${op} ${right}`

  return (
    <div className="w-full sm:max-w-md mx-auto select-none space-y-3">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-slate-700">
          ⚖️ {labelHeader}
        </span>
      </div>

      {/* 메인 카드 */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 space-y-4">
        {/* 식 */}
        <div className="rounded-xl bg-slate-50 border-2 border-slate-200 px-3 py-2.5 text-center">
          <span className="font-mono text-2xl sm:text-3xl font-black tabular-nums">
            <span style={{ color: LEFT_COLOR }}>{left}</span>
            <span className="text-slate-500 mx-2">{op}</span>
            <span style={{ color: RIGHT_COLOR }}>{right}</span>
          </span>
        </div>

        {/* 시소 시각화 */}
        <div className="relative h-44 sm:h-48 rounded-xl bg-gradient-to-b from-sky-50 to-slate-50 border-2 border-slate-200 overflow-hidden">
          {/* 받침대 (피벗 위에 삼각형) */}
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "22px solid transparent",
                borderRight: "22px solid transparent",
                borderBottom: "32px solid #64748b", // slate-500
              }}
            />
            <div className="w-16 h-1.5 bg-slate-700 rounded-b" />
          </div>

          {/* 시소 막대 + 양쪽 무게추 (회전 그룹) */}
          <motion.div
            className="absolute left-1/2 bottom-[58px] -translate-x-1/2"
            style={{ transformOrigin: "center bottom" }}
            animate={{ rotate: tilt }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
          >
            {/* 막대 */}
            <div
              className="relative h-2 rounded-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
              style={{ width: "min(80vw, 280px)" }}
            >
              {/* 왼쪽 무게추 */}
              <motion.div
                className="absolute left-2 -top-1 -translate-y-full flex flex-col items-center gap-1"
                animate={{ scale: 1 }}
              >
                <div
                  className="rounded-xl border-2 flex items-center justify-center font-mono font-black tabular-nums shadow-md"
                  style={{
                    borderColor: LEFT_COLOR,
                    background: LEFT_BG,
                    color: LEFT_COLOR,
                    width: 52,
                    height: 52,
                    fontSize: 22,
                  }}
                >
                  {left}
                </div>
              </motion.div>

              {/* 오른쪽 무게추 */}
              <motion.div
                className="absolute right-2 -top-1 -translate-y-full flex flex-col items-center gap-1"
                animate={{ scale: 1 }}
              >
                <div
                  className="rounded-xl border-2 flex items-center justify-center font-mono font-black tabular-nums shadow-md"
                  style={{
                    borderColor: RIGHT_COLOR,
                    background: RIGHT_BG,
                    color: RIGHT_COLOR,
                    width: 52,
                    height: 52,
                    fontSize: 22,
                  }}
                >
                  {right}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 결과 배지 (오른쪽 위) */}
          <div className="absolute top-2 right-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${result}-${expression}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-black border-2"
                style={{
                  borderColor: result ? TRUE_COLOR : FALSE_COLOR,
                  background: result ? "#ecfdf5" : "#fef2f2",
                  color: result ? TRUE_COLOR : FALSE_COLOR,
                }}
              >
                {result ? "True" : "False"}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 수평/기울기 힌트 (왼쪽 위) */}
          <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-slate-400">
            {isEqual
              ? (isEn ? "balanced" : "수평")
              : diff > 0
                ? (isEn ? "left heavier" : "왼쪽 무거움")
                : (isEn ? "right heavier" : "오른쪽 무거움")}
          </div>
        </div>

        {/* 왼쪽 슬라이더 + input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold" style={{ color: LEFT_COLOR }}>
            {labelLeft}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={min}
              max={max}
              value={left}
              onChange={(e) => setLeft(parseInt(e.target.value, 10))}
              className="flex-1 accent-blue-500"
            />
            <input
              type="number"
              min={min}
              max={max}
              value={left}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10)
                if (!Number.isNaN(n)) setLeft(Math.max(min, Math.min(max, n)))
              }}
              className="w-16 px-2 py-1.5 rounded-lg border-2 border-slate-200 font-mono text-sm text-center focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* 오른쪽 슬라이더 + input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold" style={{ color: RIGHT_COLOR }}>
            {labelRight}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={min}
              max={max}
              value={right}
              onChange={(e) => setRight(parseInt(e.target.value, 10))}
              className="flex-1 accent-amber-500"
            />
            <input
              type="number"
              min={min}
              max={max}
              value={right}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10)
                if (!Number.isNaN(n)) setRight(Math.max(min, Math.min(max, n)))
              }}
              className="w-16 px-2 py-1.5 rounded-lg border-2 border-slate-200 font-mono text-sm text-center focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* 연산자 선택 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">
            {labelOp}
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {OPS.map((o) => {
              const active = o === op
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOp(o)}
                  className="py-2 rounded-lg font-mono font-black text-sm border-2 transition-all"
                  style={
                    active
                      ? {
                          borderColor: "#0f172a",
                          background: "#0f172a",
                          color: "white",
                        }
                      : {
                          borderColor: "#e2e8f0",
                          background: "white",
                          color: "#475569",
                        }
                  }
                >
                  {o}
                </button>
              )
            })}
          </div>
          <div className="text-[11px] text-slate-500 font-medium pt-1">
            {opLabel(op, isEn)}
          </div>
        </div>

        {/* 큰 결과 카드 */}
        <motion.div
          key={`big-${result}-${expression}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border-2 px-3 py-3 flex items-center justify-between gap-3"
          style={{
            borderColor: result ? TRUE_COLOR : FALSE_COLOR,
            background: result ? "#ecfdf5" : "#fef2f2",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              {labelResult}
            </span>
            <span className="font-mono text-sm text-slate-700">{expression}</span>
            <span className="text-slate-400 text-sm">→</span>
          </div>
          <div
            className="text-3xl sm:text-4xl font-mono font-black"
            style={{ color: result ? TRUE_COLOR : FALSE_COLOR }}
          >
            {result ? "True" : "False"}
          </div>
        </motion.div>

        {/* 같을 때 강조 노트 */}
        <AnimatePresence>
          {equalNote && (
            <motion.div
              key={`note-${op}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-gradient-to-r from-blue-50 to-amber-50 border-2 border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 flex items-center gap-2"
            >
              <span>💡</span>
              <span>{equalNote}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* > vs >= 빠른 비교 버튼 (같을 때만) */}
        {isEqual && (op === ">" || op === ">=") && (
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setOp(">")}
              className="flex-1 py-2 rounded-lg text-xs font-mono font-bold border-2 transition-all"
              style={
                op === ">"
                  ? { borderColor: FALSE_COLOR, background: "#fef2f2", color: FALSE_COLOR }
                  : { borderColor: "#e2e8f0", background: "white", color: "#475569" }
              }
            >
              {`${left} > ${right} → False`}
            </button>
            <button
              type="button"
              onClick={() => setOp(">=")}
              className="flex-1 py-2 rounded-lg text-xs font-mono font-bold border-2 transition-all"
              style={
                op === ">="
                  ? { borderColor: TRUE_COLOR, background: "#ecfdf5", color: TRUE_COLOR }
                  : { borderColor: "#e2e8f0", background: "white", color: "#475569" }
              }
            >
              {`${left} >= ${right} → True`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompareSeesaw
