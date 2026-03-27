"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================================
// 복사 vs 참조 — 탭 전환, 한 번에 하나씩
// ============================================================

const INIT = [10, 20, 30]
type Mode = "copy" | "ref"

// step 0: 초기 / 1~2: v[0] / 3~4: v[1] / 5~6: v[2] / 7: 완료
const TOTAL = 8

function getRefVec(step: number) {
  const v = [...INIT]
  if (step >= 2) v[0] = 20
  if (step >= 4) v[1] = 40
  if (step >= 6) v[2] = 60
  return v
}

function getIdx(step: number) {
  if (step === 0 || step === 7) return -1
  return Math.floor((step - 1) / 2)
}

function isModifyStep(step: number) {
  return step > 0 && step % 2 === 0 && step < 7
}

export function RangeForVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"

  const idx = getIdx(step)
  const modifying = isModifyStep(step)
  const done = step === 7
  const isCopy = mode === "copy"
  const refVec = getRefVec(step)
  const vec = isCopy ? INIT : refVec

  const copyIVal = idx !== null && idx >= 0
    ? (modifying ? INIT[idx] * 2 : INIT[idx])
    : null

  const accent = isCopy ? "#f97316" : "#6366f1"

  const handleMode = (m: Mode) => { setMode(m); setStep(0) }

  // 단계 설명
  const stepLabel = (() => {
    if (step === 0) return isEn ? "Initial: v = {10, 20, 30}" : "초기 상태: v = {10, 20, 30}"
    if (done) return isEn ? "Done! Check the result ↓" : "완료! 결과를 확인해보세요 ↓"
    const i = idx!
    if (!modifying) return isEn ? `Step ${i+1}: accessing v[${i}] = ${INIT[i]}` : `${i+1}번째: v[${i}] = ${INIT[i]} 접근`
    return `i = i * 2  →  ${INIT[i!]} × 2 = ${INIT[i!] * 2}`
  })()

  return (
    <div className="w-full max-w-sm mx-auto space-y-3 select-none">

      {/* 탭 */}
      <div className="grid grid-cols-2 gap-2">
        {([
          { id: "copy" as Mode, syntax: "for (int i : v)",  badge: isEn ? "copy" : "복사",      color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
          { id: "ref"  as Mode, syntax: "for (int& i : v)", badge: isEn ? "reference" : "참조", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
        ]).map(m => (
          <button key={m.id} onClick={() => handleMode(m.id)}
            className="rounded-2xl border-2 px-3 py-2 text-left transition-all"
            style={mode === m.id ? { borderColor: m.color, background: m.bg } : { borderColor: "#e2e8f0", background: "white" }}>
            <div className="font-mono text-xs font-bold" style={{ color: mode === m.id ? m.color : "#94a3b8" }}>
              {m.syntax}
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
              style={mode === m.id ? { background: m.color, color: "white" } : { background: "#f1f5f9", color: "#94a3b8" }}>
              {m.badge}
            </span>
          </button>
        ))}
      </div>

      {/* 단계 레이블 */}
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-center">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: modifying ? "#fef3c7" : "#f1f5f9", color: modifying ? "#92400e" : "#475569" }}>
            {modifying && "⚡ "}{stepLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 메인 카드 */}
      <div className="rounded-2xl border-2 bg-white overflow-hidden"
        style={{ borderColor: accent + "50" }}>

        {/* 코드 */}
        <div className="bg-slate-900 px-4 py-2.5 font-mono text-sm text-slate-100">
          {isCopy
            ? <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span> <b>i</b> : v) {"{ "}<span className="text-yellow-300">i = i * 2</span>; {"}"}</>
            : <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span><span className="text-pink-400">&amp;</span> <b>i</b> : v) {"{ "}<span className="text-yellow-300">i = i * 2</span>; {"}"}</>
          }
        </div>

        <div className="p-4 space-y-4">

          {/* 벡터 v */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {isEn ? "vector v" : "벡터 v — 원본"}
            </p>
            <div className="flex gap-2.5">
              {vec.map((val, i) => {
                const isActive = idx === i && !(isCopy && modifying)
                const changed = !isCopy && val !== INIT[i]
                return (
                  <div key={i} className="relative flex flex-col items-center gap-1.5">
                    {/* 참조: i 라벨 */}
                    <div className="h-6 flex items-end justify-center">
                      {!isCopy && idx === i && (
                        <motion.span key={`lbl-${i}`}
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] font-black text-white px-1.5 py-0.5 rounded-full"
                          style={{ background: "#6366f1" }}>
                          i
                        </motion.span>
                      )}
                    </div>
                    <motion.div
                      animate={isActive ? { scale: [1, 1.1, 1] } : modifying && !isCopy && idx === i ? { scale: [1, 1.18, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-xl font-black border-3 transition-all duration-300"
                      style={{
                        borderWidth: 3,
                        background: isActive ? accent + "15" : changed ? "#ede9fe" : "#f8fafc",
                        borderColor: isActive ? accent : changed ? "#a78bfa" : "#e2e8f0",
                        color: isActive ? accent : changed ? "#7c3aed" : "#94a3b8",
                        boxShadow: isActive ? `0 0 0 4px ${accent}20` : undefined,
                      }}>
                      <AnimatePresence mode="wait">
                        <motion.span key={val}
                          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
                          {val}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                    <span className="text-[10px] font-mono text-slate-300">v[{i}]</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 복사 모드: i 상자 */}
          {isCopy && (
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-2">
                {isEn ? "int i — new box" : "int i — 새로 만들어진 상자"}
              </p>
              <AnimatePresence mode="wait">
                {copyIVal === null ? (
                  <div key="empty" className="w-14 h-14 rounded-2xl border-dashed border-slate-200 flex items-center justify-center text-slate-200 text-xl font-mono"
                    style={{ borderWidth: 3, borderStyle: "dashed" }}>?</div>
                ) : !modifying ? (
                  // 접근 단계: i에 값 복사됨
                  <motion.div key={`access-${idx}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0, y: -8 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-xl font-black"
                      style={{ borderWidth: 3, borderStyle: "solid", background: "#fff7ed", borderColor: "#fdba74", color: "#f97316" }}>
                      {INIT[idx!]}
                    </motion.div>
                    <p className="text-xs text-orange-500 font-medium">
                      {isEn ? `copied from v[${idx}]` : `v[${idx}]에서 복사됨`}
                    </p>
                  </motion.div>
                ) : (
                  // 수정 단계: 이전값 → × 2 → 새값
                  <motion.div key={`modify-${idx}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      {/* 이전 값 — 흐린 상자 */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-lg font-black text-slate-300"
                          style={{ borderWidth: 2, borderStyle: "dashed", borderColor: "#e2e8f0" }}>
                          {INIT[idx!]}
                        </div>
                        <span className="text-[9px] text-slate-300">복사됐을 때</span>
                      </div>
                      {/* 연산 */}
                      <div className="text-slate-400 text-sm font-bold">× 2 →</div>
                      {/* 결과 */}
                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-xl font-black"
                          style={{ borderWidth: 3, borderStyle: "solid", background: "#fff7ed", borderColor: "#f97316", color: "#f97316", boxShadow: "0 0 0 4px #f9731620" }}>
                          {INIT[idx!] * 2}
                        </motion.div>
                        <span className="text-[9px] font-bold text-orange-500">i (지금)</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      v[{idx}]은 <span className="font-bold text-slate-500">{INIT[idx!]}</span> 그대로 😱
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 참조 모드: 상태 메시지 */}
          {!isCopy && idx !== null && idx >= 0 && (
            <AnimatePresence mode="wait">
              <motion.div key={`ref-${step}`}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-xl px-3 py-2.5 border-2 text-xs space-y-0.5"
                style={{ background: "#eef2ff", borderColor: "#c7d2fe" }}>
                {!modifying ? (
                  <>
                    <p className="font-bold text-indigo-700">
                      {isEn ? `i = v[${idx}] 상자 그 자체 (새 상자 없음)` : `i는 v[${idx}] 상자 그 자체예요`}
                    </p>
                    <p className="text-indigo-400">
                      {isEn ? "same box, just a new name tag" : "새 상자 없이 이름표만 추가됐어요"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-indigo-700">
                      ✅ v[{idx}] 상자가 {INIT[idx!] * 2}으로 직접 바뀜!
                    </p>
                    <p className="text-indigo-400">i가 v[{idx}] 그 자체니까요</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* 완료 */}
          {done && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border-2 p-3 space-y-2 text-center"
              style={{ borderColor: accent + "50", background: accent + "08" }}>
              <p className="text-xs font-bold" style={{ color: accent }}>
                {isEn ? "Final result of v:" : "루프 후 v의 최종 상태:"}
              </p>
              <div className="flex gap-2 justify-center">
                {(isCopy ? INIT : refVec).map((val, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-lg font-black border-2 transition-all"
                    style={{
                      background: isCopy ? "white" : accent + "15",
                      borderColor: isCopy ? "#e2e8f0" : accent + "60",
                      color: isCopy ? "#94a3b8" : accent,
                    }}>
                    {val}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold" style={{ color: accent }}>
                {isCopy
                  ? (isEn ? "😱 v unchanged! Only copies changed." : "😱 v는 그대로! i(복사본)만 바뀌었어요.")
                  : (isEn ? "✅ v changed! i was the same box." : "✅ v가 바뀌었어요! i가 같은 상자였으니까요.")}
              </p>
            </motion.div>
          )}

          {step === 0 && (
            <p className="text-center text-xs text-slate-400">
              {isEn ? "👆 Press Next to start" : "👆 다음을 눌러 시작해보세요"}
            </p>
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

      {/* 요약 */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-3">
          <p className="font-mono font-bold text-orange-500 mb-1">int i</p>
          <p className="text-orange-700">{isEn ? "new box → changing i doesn't affect v" : "새 상자 → i 바꿔도 v 그대로"}</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-3">
          <p className="font-mono font-bold text-indigo-500 mb-1">int& i</p>
          <p className="text-indigo-700">{isEn ? "no new box → i IS v[k]" : "새 상자 없음 → i가 곧 v[k]"}</p>
        </div>
      </div>
    </div>
  )
}
