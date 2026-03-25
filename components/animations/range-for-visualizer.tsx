"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Copy, ArrowRight } from "lucide-react"

// ============================================
// for (int i : v)  vs  for (int& i : v)
// 핵심: 복사는 새 상자, 참조는 같은 상자를 가리킴
// ============================================

const INIT = [10, 20, 30]
type Mode = "copy" | "ref"

// step 0: 초기 (v만 보여줌)
// step 1~2: 원소 0 (접근 → 수정)
// step 3~4: 원소 1
// step 5~6: 원소 2
// step 7: 완료
const TOTAL = 8

function getVec(mode: Mode, step: number) {
  const v = [...INIT]
  if (mode === "ref") {
    if (step >= 2) v[0] = INIT[0] * 2
    if (step >= 4) v[1] = INIT[1] * 2
    if (step >= 6) v[2] = INIT[2] * 2
  }
  return v
}

function getIdx(step: number) {
  if (step === 0 || step === 7) return -1
  return Math.floor((step - 1) / 2)
}

function isModified(step: number) {
  return step > 0 && step % 2 === 0 && step < 7
}

export function RangeForVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"

  const idx = getIdx(step)
  const modified = isModified(step)
  const done = step === 7
  const vec = getVec(mode, step)

  // 복사 모드에서 i 박스 값
  const iVal = idx >= 0 ? (modified ? INIT[idx] * 2 : INIT[idx]) : null

  const handleMode = (m: Mode) => { setMode(m); setStep(0) }

  const isCopy = mode === "copy"
  const accent = isCopy ? "#f97316" : "#10b981"   // 복사=오렌지, 참조=초록
  const accentLight = isCopy ? "#fff7ed" : "#f0fdf4"
  const accentBorder = isCopy ? "#fed7aa" : "#a7f3d0"

  return (
    <div className="w-full max-w-md mx-auto space-y-3 select-none">

      {/* 모드 탭 */}
      <div className="grid grid-cols-2 gap-2">
        {([
          { id: "copy" as Mode, syntax: "for (int i : v)",  badge: isEn ? "copy" : "복사",  color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
          { id: "ref"  as Mode, syntax: "for (int& i : v)", badge: isEn ? "reference" : "참조", color: "#10b981", bg: "#f0fdf4", border: "#a7f3d0" },
        ]).map(m => (
          <button
            key={m.id}
            onClick={() => handleMode(m.id)}
            className="rounded-2xl border-2 px-3 py-2.5 text-left transition-all"
            style={mode === m.id ? { borderColor: m.color, background: m.bg } : { borderColor: "#e2e8f0", background: "white" }}
          >
            <div className="font-mono text-[13px] font-bold" style={{ color: mode === m.id ? m.color : "#94a3b8" }}>
              {m.syntax}
            </div>
            <div className="mt-0.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={mode === m.id
                  ? { background: m.color, color: "white" }
                  : { background: "#f1f5f9", color: "#94a3b8" }
                }>
                {m.badge}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 메인 시각화 */}
      <div className="rounded-2xl border-2 bg-white overflow-hidden" style={{ borderColor: accentBorder }}>

        {/* 코드 헤더 */}
        <div className="px-4 py-2.5 font-mono text-sm text-white" style={{ background: "#1e293b" }}>
          {isCopy
            ? <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span> <span className="text-white font-bold">i</span> : v) {"{ "}<span className="text-yellow-300">i = i * 2</span>; {"}"}</>
            : <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span><span className="text-orange-400">&amp;</span> <span className="text-white font-bold">i</span> : v) {"{ "}<span className="text-yellow-300">i = i * 2</span>; {"}"}</>
          }
        </div>

        <div className="p-5 space-y-6">

          {/* ── 벡터 v 상자들 ── */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
              {isEn ? "vector v" : "벡터 v — 원본"}
            </p>
            <div className="flex gap-3">
              {vec.map((val, i) => {
                const isActive = idx === i
                const wasChanged = mode === "ref" && val !== INIT[i]
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    {/* 참조 모드: i 라벨 + 화살표 */}
                    <div className="h-8 flex flex-col items-center justify-end">
                      {mode === "ref" && isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center"
                        >
                          <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: "#10b981", fontSize: 11 }}>
                            i
                          </span>
                          <span className="text-emerald-500 text-base leading-none">↓</span>
                        </motion.div>
                      )}
                    </div>

                    {/* 상자 */}
                    <motion.div
                      animate={isActive && !modified ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-xl font-black border-3 transition-all duration-300 shadow-sm"
                      style={{
                        borderWidth: 3,
                        background: isActive
                          ? accentLight
                          : wasChanged ? "#dcfce7" : "#f8fafc",
                        borderColor: isActive
                          ? accent
                          : wasChanged ? "#86efac" : "#e2e8f0",
                        color: isActive
                          ? accent
                          : wasChanged ? "#16a34a" : "#64748b",
                        boxShadow: isActive ? `0 0 0 4px ${accent}20` : undefined,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={val}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.2 }}
                        >
                          {val}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                    <span className="text-[11px] font-mono text-gray-400">v[{i}]</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 복사 모드: 새 상자 i ── */}
          {isCopy && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-orange-400 tracking-widest uppercase flex items-center gap-1">
                <Copy className="w-3 h-3" />
                {isEn ? "int i — new box (copy!)" : "int i — 새로 생긴 상자 (복사본!)"}
              </p>

              <div className="flex items-center gap-3">
                {/* i 상자 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="h-8" /> {/* 공간 맞추기 */}
                  <AnimatePresence mode="wait">
                    {iVal !== null ? (
                      <motion.div
                        key={`i-${idx}-${modified}`}
                        initial={{ scale: 0.4, opacity: 0, y: -12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 360, damping: 22 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-xl font-black border-3 shadow-sm"
                        style={{
                          borderWidth: 3,
                          background: modified ? "#fff7ed" : "#fff7ed",
                          borderColor: modified ? "#f97316" : "#fdba74",
                          color: "#f97316",
                          boxShadow: "0 0 0 4px #f9731620",
                        }}
                      >
                        {iVal}
                      </motion.div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl border-3 border-dashed border-gray-200 flex items-center justify-center text-gray-300 font-mono text-xl"
                        style={{ borderWidth: 3 }}>
                        ?
                      </div>
                    )}
                  </AnimatePresence>
                  <span className="text-[11px] font-mono text-orange-400 font-bold">i</span>
                </div>

                {/* 복사 표시 */}
                <AnimatePresence>
                  {idx >= 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-1.5"
                    >
                      {!modified ? (
                        <>
                          <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold">
                            <Copy className="w-3.5 h-3.5" />
                            {isEn ? "copied from v[" + idx + "]" : `v[${idx}]에서 복사됨`}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            {isEn ? "a brand-new separate box" : "완전히 새로운 별개의 상자예요"}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1 text-xs text-orange-500 font-bold">
                            i: {INIT[idx!]} → {INIT[idx!] * 2}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <span className="text-blue-500 font-bold">v[{idx}]</span>
                            {isEn ? " is still " : "은 여전히 "}
                            <span className="font-bold text-blue-500">{INIT[idx!]}</span>
                            <span>😱</span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* ── 참조 모드: 상태 메시지 ── */}
          {!isCopy && idx >= 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl px-4 py-3 border-2 flex items-start gap-3"
                style={{ background: "#f0fdf4", borderColor: "#86efac" }}
              >
                <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {!modified ? (
                    <>
                      <p className="text-sm font-bold text-emerald-700">
                        {isEn ? `i points to v[${idx}]'s box` : `i는 v[${idx}] 상자를 직접 가리켜요`}
                      </p>
                      <p className="text-xs text-emerald-600">
                        {isEn ? "same box — no copy made!" : "새 상자 없음 — 같은 상자를 공유해요!"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-emerald-700">
                        {isEn ? `v[${idx}] changed to ${INIT[idx!] * 2}!` : `v[${idx}] 상자의 값이 ${INIT[idx!] * 2}으로 바뀜!`}
                      </p>
                      <p className="text-xs text-emerald-600">
                        {isEn ? "i and v[" + idx + "] are the same box — modifying i changes v!" : `i가 v[${idx}]을 직접 가리키니까 원본이 바뀌어요!`}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── 완료 결과 비교 ── */}
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border-2 p-4 space-y-3"
              style={{ borderColor: accentBorder, background: accentLight }}
            >
              <p className="text-sm font-bold" style={{ color: accent }}>
                {isEn ? "Loop done! What happened to v?" : "루프 끝! v는 어떻게 됐을까요?"}
              </p>
              <div className="flex gap-2">
                {vec.map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-lg font-black border-2"
                      style={{
                        background: isCopy ? "white" : "#dcfce7",
                        borderColor: isCopy ? "#e2e8f0" : "#86efac",
                        color: isCopy ? "#94a3b8" : "#16a34a",
                      }}
                    >
                      {val}
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">v[{i}]</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold" style={{ color: accent }}>
                {isCopy
                  ? (isEn ? "😱 v = {10, 20, 30} — still the same! (copies were changed, not originals)" : "😱 v는 {10, 20, 30} 그대로! i(복사본)만 바뀌었고 원본은 그대로예요")
                  : (isEn ? "✅ v = {20, 40, 60} — originals were changed!" : "✅ v가 {20, 40, 60}으로 바뀜! i로 원본을 직접 수정했으니까요")}
              </p>
            </motion.div>
          )}

          {/* ── 단계 설명 (step 0) ── */}
          {step === 0 && (
            <p className="text-sm text-gray-500 text-center">
              {isEn ? "👆 Press Next to start!" : "👆 다음 버튼을 눌러 시작해보세요!"}
            </p>
          )}
        </div>

        {/* 이전/다음 버튼 */}
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 disabled:opacity-30 hover:border-gray-300 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            {isEn ? "Prev" : "이전"}
          </button>

          <div className="flex gap-1.5 items-center">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button key={i} onClick={() => setStep(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === step ? 20 : 7, height: 7,
                  background: i === step ? accent : i < step ? accent + "55" : "#d1d5db",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setStep(s => Math.min(TOTAL - 1, s + 1))}
            disabled={step === TOTAL - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30 transition-all"
            style={{ background: accent }}
          >
            {isEn ? "Next" : "다음"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 핵심 요약 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-3 space-y-1">
          <p className="font-mono text-xs font-bold text-orange-500">int i</p>
          <p className="text-[11px] text-orange-700 leading-relaxed">
            {isEn ? "new box created — changing i doesn't affect v" : "새 상자 생성 → i를 바꿔도 원본 v는 그대로"}
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3 space-y-1">
          <p className="font-mono text-xs font-bold text-emerald-600">int& i</p>
          <p className="text-[11px] text-emerald-700 leading-relaxed">
            {isEn ? "same box — changing i changes v directly!" : "같은 상자 → i를 바꾸면 원본 v가 바뀜!"}
          </p>
        </div>
      </div>
    </div>
  )
}
