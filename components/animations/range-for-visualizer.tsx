"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================
// Range-based for — 메모리 시각화
// copy vs ref 차이를 RAM 주소 기반으로 보여줌
// ============================================

const INIT = [10, 20, 30]
const V_ADDRS = ["0x100", "0x104", "0x108"]
const I_ADDR  = "0x200"   // copy 모드에서 i가 생기는 주소

type Mode = "copy" | "ref"

// ── 스텝 정의 (mode별 공통 7스텝) ──────────────────
// step 0: 초기 상태
// step 1: i=0 접근 (copy: 복사 발생 / ref: 포인터)
// step 2: i = i*2 적용
// step 3: i=1 접근
// step 4: i = i*2 적용
// step 5: i=2 접근
// step 6: i = i*2 적용 + 완료

const TOTAL = 7

function getVec(mode: Mode, step: number): number[] {
  const v = [...INIT]
  if (mode === "ref") {
    if (step >= 2) v[0] = INIT[0] * 2
    if (step >= 4) v[1] = INIT[1] * 2
    if (step >= 6) v[2] = INIT[2] * 2
  }
  return v
}

// 현재 반복 인덱스 (step 0: -1, 1~2: 0, 3~4: 1, 5~6: 2)
function getIdx(step: number) {
  if (step === 0) return -1
  return Math.floor((step - 1) / 2)
}

// 수정 단계인가? (짝수 step이 수정)
function isModifyStep(step: number) {
  return step > 0 && step % 2 === 0
}

export function RangeForVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"

  const idx = getIdx(step)
  const modifying = isModifyStep(step)
  const done = step === TOTAL - 1
  const vec = getVec(mode, step)

  // copy 모드에서 i 값
  const copyVal = idx >= 0
    ? (modifying ? INIT[idx] * 2 : INIT[idx])
    : null

  const handleMode = (m: Mode) => { setMode(m); setStep(0) }

  return (
    <div className="w-full max-w-lg mx-auto space-y-3 select-none">

      {/* 모드 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {([
          { id: "copy" as Mode, label: isEn ? "Copy" : "복사",    syntax: "for (int i : v)",  sub: isEn ? "slow" : "느림",  accent: "#ef4444" },
          { id: "ref"  as Mode, label: isEn ? "Reference" : "참조", syntax: "for (int& i : v)", sub: isEn ? "fast" : "빠름", accent: "#10b981" },
        ] as const).map(m => (
          <button
            key={m.id}
            onClick={() => handleMode(m.id)}
            className="rounded-2xl border-2 px-3 py-2.5 text-left transition-all"
            style={mode === m.id
              ? { borderColor: m.accent, background: m.accent + "12" }
              : { borderColor: "#e2e8f0", background: "white" }
            }
          >
            <div className="font-mono text-xs font-bold" style={{ color: mode === m.id ? m.accent : "#94a3b8" }}>
              {m.syntax}
            </div>
            <div className="text-[11px] mt-0.5 font-semibold" style={{ color: mode === m.id ? m.accent + "cc" : "#cbd5e1" }}>
              {m.label} — {m.sub}
            </div>
          </button>
        ))}
      </div>

      {/* 메모리 보드 */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

        {/* 코드 헤더 */}
        <div className="bg-gray-900 px-4 py-2.5 font-mono text-sm flex items-center gap-2">
          {mode === "copy" ? (
            <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span> <span className="text-white">i</span> : <span className="text-yellow-300">v</span>) <span className="text-gray-500">{"{ i = i * 2; }"}</span></>
          ) : (
            <><span className="text-blue-400">for</span> (<span className="text-emerald-400">int</span><span className="text-pink-400">&amp;</span> <span className="text-white">i</span> : <span className="text-yellow-300">v</span>) <span className="text-gray-500">{"{ i = i * 2; }"}</span></>
          )}
        </div>

        {/* RAM 패널 */}
        <div className="bg-[#0f172a] p-4 space-y-4">

          {/* ── 원본 벡터 v ── */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-[11px] font-bold text-yellow-300 tracking-widest uppercase">
                {isEn ? "RAM — vector v" : "RAM — 원본 벡터 v"}
              </span>
            </div>
            <div className="flex gap-2">
              {vec.map((val, i) => {
                const isActive = idx === i
                const wasModified = mode === "ref" && val !== INIT[i]
                const isBeingModified = mode === "ref" && modifying && idx === i
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    {/* 참조 모드: i 라벨 */}
                    <div className="h-5 flex items-end justify-center">
                      {mode === "ref" && isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center"
                        >
                          <span className="text-[10px] font-bold text-emerald-400 leading-none">i</span>
                          <span className="text-emerald-400 leading-none text-xs">↓</span>
                        </motion.div>
                      )}
                    </div>

                    {/* 메모리 셀 */}
                    <motion.div
                      animate={isBeingModified ? { scale: [1, 1.15, 1] } : isActive ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 0.35 }}
                      className="w-14 h-12 rounded-lg flex items-center justify-center font-mono text-base font-bold relative"
                      style={{
                        background: isActive
                          ? (mode === "copy" ? "#ef444420" : "#10b98120")
                          : wasModified
                            ? "#10b98115"
                            : "#1e293b",
                        border: `2px solid ${
                          isBeingModified ? "#10b981"
                          : isActive ? (mode === "copy" ? "#ef4444" : "#10b981")
                          : wasModified ? "#10b98150"
                          : "#334155"
                        }`,
                        color: isActive
                          ? (mode === "copy" ? "#ef4444" : "#10b981")
                          : wasModified ? "#10b981"
                          : "#94a3b8",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={val}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {val}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                    <span className="text-[9px] font-mono text-slate-500">{V_ADDRS[i]}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 복사 모드: i 변수 영역 ── */}
          {mode === "copy" && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-[11px] font-bold text-red-300 tracking-widest uppercase">
                  {isEn ? "RAM — int i (NEW copy each iteration)" : "RAM — int i (매 반복마다 새 복사본!)"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* i 셀 */}
                <div className="flex flex-col items-center gap-1">
                  <AnimatePresence mode="wait">
                    {copyVal !== null ? (
                      <motion.div
                        key={`copy-${idx}-${modifying}`}
                        initial={{ scale: 0.6, opacity: 0, y: -8 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-14 h-12 rounded-lg flex items-center justify-center font-mono text-base font-bold border-2"
                        style={{
                          background: "#ef444420",
                          borderColor: "#ef4444",
                          color: "#ef4444",
                        }}
                      >
                        {copyVal}
                      </motion.div>
                    ) : (
                      <div className="w-14 h-12 rounded-lg flex items-center justify-center font-mono text-base text-slate-600 border-2 border-dashed border-slate-700">
                        —
                      </div>
                    )}
                  </AnimatePresence>
                  <span className="text-[9px] font-mono text-slate-500">{copyVal !== null ? I_ADDR : "—"}</span>
                </div>

                {/* 복사 화살표 & 메시지 */}
                <AnimatePresence>
                  {idx >= 0 && !modifying && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-1"
                    >
                      <div className="text-[10px] bg-red-900/40 text-red-300 px-2 py-0.5 rounded-full font-mono border border-red-800/50">
                        {V_ADDRS[idx]} → {I_ADDR} 복사
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isEn ? "new memory allocated" : "새 메모리 할당됨"}
                      </div>
                    </motion.div>
                  )}
                  {modifying && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-1"
                    >
                      <div className="text-[10px] bg-red-900/40 text-red-300 px-2 py-0.5 rounded-full border border-red-800/50">
                        i = {INIT[idx!]} → {INIT[idx!] * 2}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        ⚠️ {isEn ? "v is still {10, 20, 30}" : "v는 여전히 그대로!"}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* ── 참조 모드: 상태 메시지 ── */}
          {mode === "ref" && idx >= 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`ref-${step}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl px-3 py-2.5 border border-emerald-800/50 bg-emerald-900/20"
              >
                {modifying ? (
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-emerald-400">
                      ✅ {V_ADDRS[idx!]}의 값이 직접 {INIT[idx!] * 2}으로 바뀜!
                    </div>
                    <div className="text-[10px] text-emerald-600">
                      {isEn ? "i and v[" + idx + "] are the same address — no copy needed" : `i와 v[${idx}]는 같은 주소 — 복사 없이 원본 수정!`}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-emerald-400">
                      i → {V_ADDRS[idx!]} {isEn ? "(same address as v[" + idx + "])" : `(v[${idx}]과 같은 주소)`}
                    </div>
                    <div className="text-[10px] text-emerald-600">
                      {isEn ? "no new memory allocated" : "새 메모리 할당 없음"}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── 완료 결과 ── */}
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border px-4 py-3 space-y-2"
              style={{
                borderColor: mode === "copy" ? "#ef444440" : "#10b98140",
                background: mode === "copy" ? "#ef444410" : "#10b98110",
              }}
            >
              <p className="text-xs font-bold" style={{ color: mode === "copy" ? "#ef4444" : "#10b981" }}>
                {isEn ? "Loop done! Final state of v:" : "루프 완료! 최종 v 상태:"}
              </p>
              <div className="flex gap-2">
                {vec.map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-12 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold border"
                      style={{
                        background: mode === "ref" ? "#10b98120" : "#1e293b",
                        color: mode === "ref" ? "#10b981" : "#94a3b8",
                        borderColor: mode === "ref" ? "#10b98150" : "#334155",
                      }}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-semibold" style={{ color: mode === "copy" ? "#ef4444" : "#10b981" }}>
                {mode === "copy"
                  ? (isEn ? "😱 v = {10, 20, 30} — copies were modified, not originals!" : "😱 v는 그대로 {10, 20, 30} — i(복사본)만 바뀌었어요!")
                  : (isEn ? "✅ v = {20, 40, 60} — originals were modified directly!" : "✅ v가 {20, 40, 60}으로 바뀜 — 원본이 직접 수정됐어요!")}
              </p>
            </motion.div>
          )}
        </div>

        {/* ── 이전/다음 버튼 ── */}
        <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 disabled:opacity-30 hover:border-gray-300 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            {isEn ? "Prev" : "이전"}
          </button>

          {/* 도트 인디케이터 */}
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === step ? 18 : 7,
                  height: 7,
                  background: i === step
                    ? (mode === "copy" ? "#ef4444" : "#10b981")
                    : i < step ? (mode === "copy" ? "#ef444450" : "#10b98150")
                    : "#d1d5db",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setStep(s => Math.min(TOTAL - 1, s + 1))}
            disabled={step === TOTAL - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30 transition-all"
            style={{ background: mode === "copy" ? "#ef4444" : "#10b981" }}
          >
            {isEn ? "Next" : "다음"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 핵심 요약 카드 */}
      <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4 space-y-2">
        <p className="text-sm font-bold text-indigo-800">💡 {isEn ? "Key difference" : "핵심 차이"}</p>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-start gap-2">
            <span className="font-mono font-bold text-red-500 shrink-0 pt-0.5">int i</span>
            <span className="text-gray-600">→ {isEn ? "copies value to new address — modifying i doesn't touch v" : "새 주소에 값 복사 → i를 수정해도 원본 v는 그대로"}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-mono font-bold text-emerald-600 shrink-0 pt-0.5">int& i</span>
            <span className="text-gray-600">→ {isEn ? "i IS v[k] — same address, modifying i changes v!" : "i가 v[k] 그 자체 → 같은 주소, i를 수정하면 v가 바뀜!"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
