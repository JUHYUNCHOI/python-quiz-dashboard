"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================
// Range-based for 루프 시각화
// 핵심: i = i * 2 했을 때 원본이 바뀌냐 안 바뀌냐
// copy, ref, const ref 세 가지 모드
// ============================================

const INIT_VALUES = [10, 20, 30]

type Mode = "copy" | "ref" | "cref"

const MODE_INFO: Record<Mode, { syntax: string; label: string; color: string; bg: string; border: string; canModify: boolean; isRef: boolean }> = {
  copy: {
    syntax: "for (int i : v)",
    label: "복사",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    canModify: false,
    isRef: false,
  },
  ref: {
    syntax: "for (int& i : v)",
    label: "참조",
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    canModify: true,
    isRef: true,
  },
  cref: {
    syntax: "for (const int& i : v)",
    label: "const 참조",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    canModify: false,
    isRef: true,
  },
}

// 단계 정의:
// step 0: 첫 번째 원소 접근 (수정 전)
// step 1: i = i * 2 적용 후 (원본 변화 확인)
// step 2: 두 번째 원소 접근
// step 3: i = i * 2 적용
// step 4: 세 번째 원소 접근
// step 5: i = i * 2 적용
// step 6: 루프 완료 - 최종 결과 요약
const TOTAL_STEPS = 7 // 0~6

export function RangeForVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(0)
  const isEn = lang === "en"

  const info = MODE_INFO[mode]

  const handleModeChange = (m: Mode) => {
    setMode(m)
    setStep(0)
  }

  // 현재 스텝 기준으로 원본 벡터 상태 계산
  // ref 모드에서만 원본이 바뀜
  const getVectorState = () => {
    if (!info.isRef || !info.canModify) return [...INIT_VALUES]
    const v = [...INIT_VALUES]
    // 몇 번째 원소까지 수정이 완료됐는지
    const completedIdx = Math.floor(step / 2) // step 1 → idx 0 완료, step 3 → idx 1 완료, ...
    for (let i = 0; i < completedIdx; i++) {
      v[i] = INIT_VALUES[i] * 2
    }
    // 현재 홀수 스텝이면 현재 원소도 수정 중
    if (step % 2 === 1 && step < TOTAL_STEPS - 1) {
      const curIdx = Math.floor(step / 2)
      if (curIdx < v.length) v[curIdx] = INIT_VALUES[curIdx] * 2
    }
    return v
  }

  const vectorState = getVectorState()

  // 현재 활성화된 원소 인덱스 (-1이면 없음)
  const activeIdx = step >= TOTAL_STEPS - 1 ? -1 : Math.floor(step / 2)
  const isAfterModify = step % 2 === 1 && step < TOTAL_STEPS - 1
  const isDone = step === TOTAL_STEPS - 1

  // 복사 모드에서 i의 현재 값
  const copyValue = activeIdx >= 0
    ? (isAfterModify ? INIT_VALUES[activeIdx] * 2 : INIT_VALUES[activeIdx])
    : null

  const prev = () => setStep(s => Math.max(0, s - 1))
  const next = () => setStep(s => Math.min(TOTAL_STEPS - 1, s + 1))

  return (
    <div className="w-full max-w-lg mx-auto space-y-3">

      {/* 모드 선택 탭 */}
      <div className="flex flex-col gap-1.5">
        {(Object.entries(MODE_INFO) as [Mode, typeof MODE_INFO[Mode]][]).map(([id, m]) => (
          <button
            key={id}
            onClick={() => handleModeChange(id)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl border-2 text-left transition-all"
            style={mode === id
              ? { background: m.bg, borderColor: m.color }
              : { background: "white", borderColor: "#e2e8f0" }
            }
          >
            <span className="font-mono text-sm font-bold" style={{ color: mode === id ? m.color : "#94a3b8" }}>
              {m.syntax}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={mode === id
                ? { background: m.color, color: "white" }
                : { background: "#f1f5f9", color: "#94a3b8" }
              }
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* 시뮬 박스 */}
      <div
        className="rounded-2xl border-2 p-4 space-y-4 transition-colors duration-300"
        style={{ background: info.bg, borderColor: info.border }}
      >
        {/* 코드 한 줄 */}
        <div className="bg-gray-900 rounded-xl px-4 py-2 font-mono text-sm text-gray-100">
          {info.syntax}
          <span className="text-gray-400"> {"{ i = i * 2; }"}</span>
        </div>

        {/* 원본 벡터 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider uppercase">
            {isEn ? "vector v (original)" : "원본 벡터 v"}
          </div>
          <div className="flex gap-2">
            {vectorState.map((val, i) => {
              const isActive = activeIdx === i
              const wasModified = info.canModify && info.isRef && val !== INIT_VALUES[i]
              return (
                <div key={i} className="flex flex-col items-center gap-1 relative">
                  {/* 참조 모드 화살표 */}
                  {info.isRef && isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center"
                      style={{ color: info.color }}
                    >
                      <span className="text-[10px] font-bold">i</span>
                      <span className="text-sm leading-none">↓</span>
                    </motion.div>
                  )}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold border-2 transition-all duration-300"
                    style={{
                      background: isActive ? info.color : wasModified ? info.color + "25" : "white",
                      color: isActive ? "white" : wasModified ? info.color : "#475569",
                      borderColor: isActive ? info.color : wasModified ? info.color + "60" : "#e2e8f0",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={val}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {val}
                      </motion.span>
                    </AnimatePresence>
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
            <div className="text-[11px] font-bold text-red-400 mb-2 tracking-wider uppercase">
              {isEn ? "int i — copy (NEW memory)" : "int i — 복사본 (새 메모리)"}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold border-2 transition-all duration-300"
                style={{
                  background: copyValue !== null ? "#ef4444" : "white",
                  color: copyValue !== null ? "white" : "#d1d5db",
                  borderColor: copyValue !== null ? "#ef4444" : "#e2e8f0",
                  borderStyle: copyValue !== null ? "solid" : "dashed",
                }}
              >
                {copyValue !== null ? copyValue : "—"}
              </div>
              {copyValue !== null && (
                <div className="text-xs text-red-500">
                  {isAfterModify
                    ? (isEn ? "i changed → but v is still unchanged! 😱" : "i만 바뀜 → 원본 v는 그대로! 😱")
                    : (isEn ? "copied from v[" + activeIdx + "]" : `v[${activeIdx}]에서 복사됨`)
                  }
                </div>
              )}
            </div>
          </div>
        )}

        {/* 참조/const 참조 모드: 상태 메시지 */}
        {(mode === "ref" || mode === "cref") && activeIdx >= 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mode}-${step}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl px-3 py-2 text-xs font-medium"
              style={{ background: info.color + "15", color: info.color }}
            >
              {mode === "ref"
                ? (isAfterModify
                    ? (isEn ? `v[${activeIdx}] modified to ${INIT_VALUES[activeIdx] * 2}! ✅ original changed!` : `v[${activeIdx}]이 ${INIT_VALUES[activeIdx] * 2}로 바뀜! ✅ 원본이 직접 수정됐어요!`)
                    : (isEn ? `i points directly to v[${activeIdx}] — same memory!` : `i는 v[${activeIdx}]을 직접 가리켜요 — 같은 메모리!`))
                : (isEn ? `i = const ref to v[${activeIdx}] — read only, no copy` : `i는 v[${activeIdx}]의 읽기전용 참조 — 복사 없음, 수정 불가`)
              }
            </motion.div>
          </AnimatePresence>
        )}

        {/* 루프 완료 결과 */}
        {isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-3 space-y-2"
            style={{ background: info.color + "15" }}
          >
            <p className="text-sm font-bold" style={{ color: info.color }}>
              {isEn ? "Loop complete! Final state of v:" : "루프 완료! 최종 v 상태:"}
            </p>
            <div className="flex gap-2">
              {vectorState.map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-14 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-bold border-2"
                    style={{
                      background: info.canModify && info.isRef ? info.color + "20" : "white",
                      color: info.canModify && info.isRef ? info.color : "#475569",
                      borderColor: info.canModify && info.isRef ? info.color + "60" : "#e2e8f0",
                    }}
                  >
                    {val}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">[{i}]</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold" style={{ color: info.color }}>
              {mode === "copy"
                ? (isEn ? "v is unchanged {10, 20, 30} — only copies were modified!" : "v는 그대로 {10, 20, 30} — i(복사본)만 바뀌었어요!")
                : mode === "ref"
                  ? (isEn ? "v is now {20, 40, 60} — originals were modified!" : "v가 {20, 40, 60}으로 바뀜 — 원본이 직접 수정됐어요!")
                  : (isEn ? "v is unchanged {10, 20, 30} — const prevents modification!" : "v는 그대로 {10, 20, 30} — const라서 수정이 막혔어요!")
              }
            </p>
          </motion.div>
        )}

        {/* 이전/다음 버튼 */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 disabled:opacity-30 transition-all hover:border-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
            {isEn ? "Prev" : "이전"}
          </button>

          {/* 스텝 인디케이터 */}
          <div className="flex gap-1.5 items-center">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === step ? 20 : 8,
                  height: 8,
                  background: i === step ? info.color : i < step ? info.color + "50" : "#e2e8f0",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={step === TOTAL_STEPS - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30 transition-all"
            style={{ background: info.color }}
          >
            {isEn ? "Next" : "다음"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 핵심 요약 */}
      <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-800">
        <p className="font-bold mb-2">💡 {isEn ? "Summary" : "핵심 정리"}</p>
        <div className="space-y-1.5 text-xs text-indigo-700">
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold shrink-0">int i</span>
            <span>→ {isEn ? "copy — modifying i doesn't change v" : "복사 — i를 바꿔도 원본 v는 그대로"}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold shrink-0">int& i</span>
            <span>→ {isEn ? "reference — modifying i changes v directly!" : "참조 — i를 바꾸면 원본 v가 바뀜!"}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold shrink-0">const int& i</span>
            <span>→ {isEn ? "const ref — fast like ref, but modification blocked" : "const 참조 — 속도는 참조처럼 빠르고, 수정은 막힘"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
