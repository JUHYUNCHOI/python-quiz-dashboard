"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================================
// 복사 vs 참조 — 한 번에 한 액션만 강조
// ============================================================

const INIT = [10, 20, 30]
type Mode = "copy" | "ref"

// step 0: intro / 1~2: v[0] / 3~4: v[1] / 5~6: v[2] / 7: done
const TOTAL = 8

type Action = "intro" | "access" | "modify" | "done"

function getStepInfo(step: number): { cellIdx: number; action: Action } {
  if (step === 0) return { cellIdx: -1, action: "intro" }
  if (step === 7) return { cellIdx: -1, action: "done" }
  const i = Math.floor((step - 1) / 2)
  return { cellIdx: i, action: step % 2 === 1 ? "access" : "modify" }
}

function getRefV(step: number) {
  const v = [...INIT]
  if (step >= 2) v[0] = 20
  if (step >= 4) v[1] = 40
  if (step >= 6) v[2] = 60
  return v
}

export function RangeForVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"
  const isCopy = mode === "copy"

  const { cellIdx, action } = getStepInfo(step)
  const vec = isCopy ? INIT : getRefV(step)

  const accent = isCopy ? "#f97316" : "#6366f1"
  const accentBg = isCopy ? "#fff7ed" : "#eef2ff"
  const accentBorder = isCopy ? "#fed7aa" : "#c7d2fe"

  // copy 모드 i 박스 값
  const iValue = cellIdx < 0
    ? null
    : action === "modify" ? INIT[cellIdx] * 2 : INIT[cellIdx]

  const handleMode = (m: Mode) => { setMode(m); setStep(0) }

  // 한 줄 narration — 한 액션만
  const narration = (() => {
    if (action === "intro") return isEn ? "👆 Tap Next to start" : "👆 다음을 눌러 시작"
    if (action === "done") {
      return isCopy
        ? (isEn ? "v unchanged — all 3 copies thrown away" : "v 그대로 — 복사본 3 개는 다 사라짐")
        : (isEn ? "v fully changed — i WAS each cell" : "v 전부 바뀜 — i 가 곧 그 칸이었으니까")
    }
    if (isCopy) {
      return action === "access"
        ? (isEn ? `Copy v[${cellIdx}] (${INIT[cellIdx]}) into new box i` : `v[${cellIdx}] (${INIT[cellIdx]}) 을 새 상자 i 에 복사`)
        : (isEn ? `i × 2 → i is ${INIT[cellIdx] * 2}. v[${cellIdx}] still ${INIT[cellIdx]}!` : `i × 2 → i 는 ${INIT[cellIdx] * 2}. v[${cellIdx}] 는 그대로 ${INIT[cellIdx]}!`)
    }
    return action === "access"
      ? (isEn ? `i becomes alias for v[${cellIdx}] — same box, new name` : `i 가 v[${cellIdx}] 의 별명이 됨 — 같은 상자, 새 이름`)
      : (isEn ? `i × 2 → v[${cellIdx}] itself becomes ${INIT[cellIdx] * 2}` : `i × 2 → v[${cellIdx}] 자체가 ${INIT[cellIdx] * 2} 으로 바뀜`)
  })()

  // 셀 한 개 렌더 — 포커스 외엔 dim
  const renderCell = (val: number, i: number) => {
    const isFocus = cellIdx === i
    const isChangedRef = !isCopy && val !== INIT[i]
    const isDimmed = !isFocus && !isChangedRef && cellIdx >= 0

    return (
      <div key={i} className="relative flex flex-col items-center gap-1.5">
        {/* ref 모드 i 라벨 */}
        <div className="h-6 flex items-end justify-center">
          {!isCopy && isFocus && (action === "access" || action === "modify") && (
            <motion.span
              key={`lbl-${i}-${step}`}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-white px-1.5 py-0.5 rounded-full shadow"
              style={{ background: "#6366f1" }}>
              i
            </motion.span>
          )}
        </div>
        <motion.div
          animate={isFocus ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-xl font-black transition-all duration-300"
          style={{
            borderWidth: 3,
            borderStyle: "solid",
            background: isFocus ? accent + "20" : isChangedRef ? "#ede9fe" : "#f8fafc",
            borderColor: isFocus ? accent : isChangedRef ? "#a78bfa" : "#e2e8f0",
            color: isFocus ? accent : isChangedRef ? "#7c3aed" : "#94a3b8",
            opacity: isDimmed ? 0.35 : 1,
            boxShadow: isFocus ? `0 0 0 4px ${accent}25` : undefined,
          }}>
          <AnimatePresence mode="wait">
            <motion.span key={val}
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
              {val}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        <span className="text-[10px] font-mono"
          style={{ color: isFocus ? accent : isDimmed ? "#cbd5e1" : "#94a3b8" }}>
          v[{i}]
        </span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-3 select-none">

      {/* 탭 — 차이점 한 줄도 안에 */}
      <div className="grid grid-cols-2 gap-2">
        {([
          { id: "copy" as Mode, syntax: "for (int i : v)", badge: isEn ? "copy" : "복사", sub: isEn ? "i = new box" : "i = 새 상자", color: "#f97316", bg: "#fff7ed" },
          { id: "ref" as Mode, syntax: "for (int& i : v)", badge: isEn ? "reference" : "참조", sub: isEn ? "i = the cell itself" : "i = 그 칸 자체", color: "#6366f1", bg: "#eef2ff" },
        ]).map(m => (
          <button key={m.id} onClick={() => handleMode(m.id)}
            className="rounded-2xl border-2 px-3 py-2 text-left transition-all"
            style={mode === m.id
              ? { borderColor: m.color, background: m.bg }
              : { borderColor: "#e2e8f0", background: "white" }}>
            <div className="font-mono text-xs font-bold mb-1"
              style={{ color: mode === m.id ? m.color : "#94a3b8" }}>
              {m.syntax}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block"
              style={mode === m.id
                ? { background: m.color, color: "white" }
                : { background: "#f1f5f9", color: "#94a3b8" }}>
              {m.badge}
            </span>
            <p className="text-[10px] mt-1.5"
              style={{ color: mode === m.id ? m.color : "#94a3b8" }}>
              {m.sub}
            </p>
          </button>
        ))}
      </div>

      {/* 메인 카드 */}
      <div className="rounded-2xl border-2 bg-white overflow-hidden"
        style={{ borderColor: accent + "50" }}>

        {/* 코드 */}
        <div className="bg-slate-900 px-4 py-2.5 font-mono text-sm text-slate-100 text-center">
          {isCopy
            ? <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span> <b>i</b> : v) {"{ "}<span className="text-yellow-300">i = i * 2</span>; {"}"}</>
            : <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span><span className="text-pink-400">&amp;</span> <b>i</b> : v) {"{ "}<span className="text-yellow-300">i = i * 2</span>; {"}"}</>
          }
        </div>

        {/* narration — 한 줄, 한 번에 한 메시지만 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`nar-${step}-${mode}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 text-center text-sm font-medium leading-snug"
            style={{
              background: action === "modify" ? accentBg : "#fafbfc",
              color: action === "modify" ? accent : "#475569",
              borderBottom: `1px solid ${accentBorder}`,
            }}>
            {action === "modify" && "⚡ "}
            {narration}
          </motion.div>
        </AnimatePresence>

        <div className="p-4 space-y-4">

          {/* 벡터 v */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-center"
              style={{ color: cellIdx < 0 ? "#94a3b8" : accent }}>
              {isEn ? "vector v" : "벡터 v"}
            </p>
            <div className="flex gap-2.5 justify-center">
              {vec.map(renderCell)}
            </div>
          </div>

          {/* COPY 모드 i 박스 */}
          {isCopy && cellIdx >= 0 && (
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-2 text-center">
                {isEn ? "i — new box (copy)" : "i — 새 상자 (복사본)"}
              </p>
              <div className="flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div key={`i-${step}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-2xl font-black"
                    style={{
                      borderWidth: 3,
                      borderStyle: "solid",
                      background: action === "modify" ? "#fff7ed" : "#fffbeb",
                      borderColor: action === "modify" ? "#f97316" : "#fdba74",
                      color: "#f97316",
                      boxShadow: action === "modify" ? "0 0 0 5px #f9731625" : undefined,
                    }}>
                    {iValue}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* 완료 결과 */}
          {action === "done" && (
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-center"
                style={{ color: accent }}>
                {isEn ? "v after the loop" : "루프 후 v"}
              </p>
              <div className="flex gap-2 justify-center">
                {vec.map((val, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-lg font-black border-2"
                    style={{
                      background: isCopy ? "white" : accent + "15",
                      borderColor: isCopy ? "#e2e8f0" : accent + "60",
                      color: isCopy ? "#94a3b8" : accent,
                    }}>
                    {val}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 이전/다음 */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 bg-white border-2 border-slate-200 disabled:opacity-30 transition-all">
            <ChevronLeft className="w-4 h-4" />
            {isEn ? "Prev" : "이전"}
          </button>
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button key={i} onClick={() => setStep(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === step ? 18 : 7, height: 7,
                  background: i === step ? accent : i < step ? accent + "55" : "#d1d5db",
                }} />
            ))}
          </div>
          <button onClick={() => setStep(s => Math.min(TOTAL - 1, s + 1))} disabled={step === TOTAL - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30 transition-all"
            style={{ background: accent }}>
            {isEn ? "Next" : "다음"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
