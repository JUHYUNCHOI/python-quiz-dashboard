"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 변수 업데이트 시각화
//
// ① x = 4       → x 상자에 4가 들어감
// ② x + 2       → 계산은 되지만 결과가 사라짐 (x 불변)
// ③ x = x + 2   → 계산 후 결과가 다시 x에 저장 (x 변경)
// ============================================================

interface Phase {
  codeHighlight: number
  xValue: number
  showFlow: "none" | "lost" | "saved"
  captionKo: string
  captionEn: string
  color: string
  bg: string
}

const PHASES: Phase[] = [
  {
    codeHighlight: 0,
    xValue: 4,
    showFlow: "none",
    captionKo: "x 라는 상자를 만들고 4를 넣었어요!",
    captionEn: "We created a box called x and put 4 inside!",
    color: "#10b981",
    bg: "#f0fdf4",
  },
  {
    codeHighlight: 1,
    xValue: 4, // x는 그대로!
    showFlow: "lost",
    captionKo: "4 + 2 = 6 이 계산됐지만... 결과가 어디에도 저장되지 않았어요.\nx 상자는 여전히 4예요!",
    captionEn: "4 + 2 = 6 was calculated, but the result was never saved.\nx is still 4!",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    codeHighlight: 2,
    xValue: 6, // x가 6으로 바뀜!
    showFlow: "saved",
    captionKo: "x 에서 4를 꺼내 2를 더한 결과 6을 다시 x 에 저장했어요!\n= 이 있어야 상자의 값이 바뀌어요.",
    captionEn: "Read 4 from x, add 2, get 6 — then store 6 back into x!\nYou need = to update the box.",
    color: "#6366f1",
    bg: "#eef2ff",
  },
]

const CODE_LINES = [
  "x = 4",
  "x + 2",
  "x = x + 2",
]

const CODE_COMMENTS_KO = ["# x에 4 저장", "# 저장 안 됨!", "# x에 다시 저장!"]
const CODE_COMMENTS_EN = ["# store 4 in x", "# result lost!", "# store back in x!"]

export function VariableUpdateVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [idx, setIdx] = useState(0)
  const phase = PHASES[idx]
  const isEn = lang === "en"

  const goTo = (i: number) => setIdx(i)

  return (
    <div className="w-full max-w-sm mx-auto select-none space-y-3">

      {/* 탭 */}
      <div className="flex gap-1.5">
        {PHASES.map((p, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="flex-1 py-2 rounded-xl text-[11px] font-bold transition-all border-2"
            style={i === idx
              ? { borderColor: p.color, background: p.bg, color: p.color }
              : { borderColor: "#e2e8f0", background: "white", color: "#94a3b8" }
            }
          >
            {i === 0 ? (isEn ? "① Store" : "① 저장")
             : i === 1 ? (isEn ? "② No save" : "② 결과 손실")
             : (isEn ? "③ Save!" : "③ 다시 저장!")}
          </button>
        ))}
      </div>

      {/* 메인 카드 */}
      <div
        className="rounded-2xl border-2 bg-white p-4 space-y-4 transition-all duration-300"
        style={{ borderColor: phase.color + "50" }}
      >
        {/* 코드 블록 */}
        <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-sm space-y-1.5">
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg px-2 py-0.5 transition-all duration-300"
              style={i === phase.codeHighlight
                ? { background: PHASES[i].color + "25" }
                : {}}
            >
              <span
                className="transition-all duration-300"
                style={{
                  color: i === phase.codeHighlight ? PHASES[i].color : "#475569",
                  fontWeight: i === phase.codeHighlight ? 700 : 400,
                }}
              >
                {i === phase.codeHighlight ? "▶" : " "}
              </span>
              <span
                className="transition-all duration-300"
                style={{ color: i === phase.codeHighlight ? "white" : "#475569" }}
              >
                {line}
              </span>
              <span
                className="text-[10px] transition-all duration-300"
                style={{ color: i === phase.codeHighlight ? PHASES[i].color + "cc" : "#1e293b" }}
              >
                {isEn ? CODE_COMMENTS_EN[i] : CODE_COMMENTS_KO[i]}
              </span>
            </div>
          ))}
        </div>

        {/* 시각화 영역 */}
        <div className="flex items-center justify-center gap-3 py-2 min-h-[96px]">

          {/* x 상자 */}
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={
                idx === 2
                  ? { scale: [1, 1.18, 1], transition: { duration: 0.4 } }
                  : { scale: 1 }
              }
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono text-3xl font-black border-3 transition-all duration-400"
              style={{
                borderWidth: 3,
                borderColor: phase.color,
                background: phase.bg,
                color: phase.color,
                boxShadow: `0 0 0 4px ${phase.color}20`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase.xValue}
                  initial={{ opacity: 0, scale: 0.4, y: idx === 0 ? -20 : 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  {phase.xValue}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <span className="text-xs font-bold" style={{ color: phase.color }}>x</span>
          </div>

          {/* 흐름 영역 */}
          <AnimatePresence mode="wait">

            {/* ① 저장 — 화살표 아래로 (숫자 4가 들어오는 효과) */}
            {idx === 0 && (
              <motion.div
                key="flow-store"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-0.5 text-emerald-500"
              >
                <motion.div
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xs text-slate-400"
                >
                  4 →
                </motion.div>
                <span className="text-[10px] font-bold">{isEn ? "in!" : "쏙!"}</span>
              </motion.div>
            )}

            {/* ② 결과 손실 — 오른쪽으로 나갔다가 사라짐 */}
            {idx === 1 && (
              <motion.div
                key="flow-lost"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                {/* 화살표 out */}
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <span>4</span>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>→</motion.span>
                </div>

                {/* 계산 버블 */}
                <div
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold border-2"
                  style={{ borderColor: "#f59e0b", background: "#fffbeb", color: "#b45309" }}
                >
                  4 + 2 = 6
                </div>

                {/* 결과 사라짐 */}
                <motion.div
                  animate={{ opacity: [1, 1, 0], y: [0, 0, -12] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="text-xs font-bold text-red-400"
                >
                  💨 {isEn ? "gone!" : "사라짐!"}
                </motion.div>
              </motion.div>
            )}

            {/* ③ 저장됨 — 나갔다가 결과가 다시 들어옴 */}
            {idx === 2 && (
              <motion.div
                key="flow-saved"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1.5"
              >
                {/* 나가는 화살표 */}
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <span>4</span>
                  <span>→</span>
                </div>

                {/* 계산 버블 */}
                <div
                  className="px-2.5 py-1.5 rounded-xl text-xs font-bold border-2"
                  style={{ borderColor: "#6366f1", background: "#eef2ff", color: "#4338ca" }}
                >
                  4 + 2 = 6
                </div>

                {/* 돌아오는 화살표 */}
                <motion.div
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="flex items-center gap-1 text-xs font-bold"
                  style={{ color: "#6366f1" }}
                >
                  <span>←</span>
                  <span>6</span>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* 캡션 */}
        <div
          className="rounded-xl px-3 py-2.5 text-xs leading-relaxed font-medium"
          style={{ background: phase.bg, color: phase.color }}
        >
          {(isEn ? phase.captionEn : phase.captionKo).split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>

      {/* 핵심 요약 (마지막 탭에서 표시) */}
      <AnimatePresence>
        {idx === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-3 text-xs space-y-1.5"
          >
            <p className="font-bold text-slate-600">
              {isEn ? "📌 Key Point" : "📌 핵심 정리"}
            </p>
            <div className="flex items-start gap-2">
              <span className="font-mono font-bold text-amber-500 shrink-0">x + 2</span>
              <span className="text-slate-500">
                {isEn ? "→ Calculates but doesn't save. x stays the same." : "→ 계산만 하고 저장 안 함. x 그대로."}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono font-bold text-indigo-500 shrink-0">x = x + 2</span>
              <span className="text-slate-500">
                {isEn ? "→ Calculates AND stores back in x. x changes!" : "→ 계산 후 결과를 x에 저장. x가 바뀜!"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이전/다음 버튼 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goTo(Math.max(idx - 1, 0))}
          disabled={idx === 0}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 text-slate-500 disabled:opacity-30 transition-all"
        >
          ← {isEn ? "Prev" : "이전"}
        </button>
        <span className="text-xs text-slate-400 font-mono shrink-0">{idx + 1} / {PHASES.length}</span>
        <button
          onClick={() => goTo(Math.min(idx + 1, PHASES.length - 1))}
          disabled={idx === PHASES.length - 1}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-30"
          style={{ background: phase.color }}
        >
          {isEn ? "Next" : "다음"} →
        </button>
      </div>
    </div>
  )
}
