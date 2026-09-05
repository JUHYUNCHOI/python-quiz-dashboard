"use client"

/* ============================================================
   split() · join() 시뮬레이터  (레슨 18)

   왜 만들었나 — 2026-09-05 선생님 수업 관찰:
   "오늘 split, map 을 봤더니 충분히 연습도 안되고 수업내용으로 문제를
    풀기가 어려워. 시뮬이 필요하면 시뮬을 보던가 해야하지 않을까?"
   레슨 18(split·join)은 420줄인데 시뮬이 **하나도 없었다.** 글자 덩어리가
   조각으로 갈라지는 그림을 한 번도 안 보고 코드부터 친 것이다.

   ⚠️ 자동재생을 쓰지 않는다. 선생님: "자동은 뭐지? 우리 시뮬 스타일이랑
      넘 달라." → ◀ ▶ 로 학생이 직접 넘긴다.
   ============================================================ */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const KO = { wordBreak: "keep-all" as const, textWrap: "balance" as const }

type Mode = "split" | "join"

const PIECES = ["10", "20", "30"]
const SRC = "10 20 30"

/* 말풍선 — 한 단계에 한 문장만. 길어지면 학생이 안 읽는다. */
const SPLIT_BEATS = [
  "입력으로 받은 건 통째로 **글자 한 덩어리**예요. 계산을 못 해요.",
  "**공백**이 있는 자리를 찾아요. 여기가 가위질할 곳이에요.",
  "그 자리에서 **싹둑** — 세 조각으로 갈라졌어요.",
  "조각들을 **리스트**에 담으면 끝! 이제 하나씩 꺼내 쓸 수 있어요.",
]
const JOIN_BEATS = [
  "이번엔 반대예요. 조각 세 개가 리스트에 들어 있어요.",
  "조각 **사이사이**에 이어붙일 글자를 끼워요. 여기선 `-` 예요.",
  "쭉 밀어서 **한 덩어리**로 붙여요.",
  "다시 글자 한 덩어리가 됐어요. 출력할 때 이 모양이 필요해요.",
]

export function PySplitJoinVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("split")
  const [step, setStep] = useState(0)
  const beats = mode === "split" ? SPLIT_BEATS : JOIN_BEATS
  const last = beats.length - 1

  const go = (m: Mode) => { setMode(m); setStep(0) }

  /* 단계별 상태
     split: 0 한덩어리 → 1 공백강조 → 2 싹둑(조각 벌어짐) → 3 리스트에 담김
     join : 0 리스트   → 1 구분자끼움 → 2 밀어붙임(조각 붙음) → 3 문자열   */
  const cut = mode === "split" ? step >= 2 : step <= 1   // 조각이 떨어져 있나
  const marked = mode === "split" && step === 1          // 공백 강조
  const listed = mode === "split" ? step >= 3 : step <= 1
  const glued = mode === "join" && step >= 1             // 구분자가 보이나
  const sep = mode === "join" ? "-" : " "
  // 구분자 글자를 보여줄 때: split 은 아직 안 잘렸을 때, join 은 끼운 뒤
  const showSep = mode === "split" ? step <= 1 : glued

  const code = mode === "split"
    ? `"${SRC}".split()   →   ['10', '20', '30']`
    : `"-".join(['10', '20', '30'])   →   "10-20-30"`

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5">
      {/* 탭 */}
      <div className="mb-4 flex justify-center gap-2">
        {(["split", "join"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => go(m)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === m
                ? "bg-indigo-600 text-white shadow"
                : "bg-white text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            {m === "split" ? "✂️ split — 쪼개기" : "🔗 join — 이어붙이기"}
          </button>
        ))}
      </div>

      <div className="mb-4 text-center">
        <code className="inline-block rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-yellow-300">
          {code}
        </code>
      </div>

      {/* 무대 */}
      <div className="mb-4 flex min-h-[150px] items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-5">
        <div className="flex flex-col items-center gap-4">
          {/* 리스트 대괄호 — 조각이 리스트에 담겼을 때만 */}
          <div className="flex items-center gap-1">
            <AnimatePresence initial={false}>
              {listed && (
                <motion.span
                  key="lb"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden text-3xl font-bold text-indigo-500"
                >
                  [
                </motion.span>
              )}
            </AnimatePresence>

            {PIECES.map((p, i) => (
              <motion.div key={p} layout className="flex items-center">
                <motion.div
                  layout
                  className={`rounded-lg px-3 py-2 font-mono text-lg font-bold ${
                    listed
                      ? "bg-green-100 text-green-800 ring-2 ring-green-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  style={{ marginLeft: cut && i > 0 ? 10 : 0 }}
                >
                  {listed ? `'${p}'` : p}
                </motion.div>

                {/* 조각 사이의 구분자 */}
                {i < PIECES.length - 1 && (
                  <motion.span
                    layout
                    animate={{ opacity: showSep ? 1 : listed ? 1 : 0 }}
                    className={`px-1 font-mono text-lg font-bold ${
                      marked
                        ? "rounded bg-yellow-300 text-yellow-900 ring-2 ring-yellow-500"
                        : showSep
                        ? "text-gray-500"
                        : "text-indigo-500"
                    }`}
                  >
                    {showSep ? (sep === " " ? "␣" : sep) : listed ? "," : "·"}
                  </motion.span>
                )}
              </motion.div>
            ))}

            <AnimatePresence initial={false}>
              {listed && (
                <motion.span
                  key="rb"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden text-3xl font-bold text-indigo-500"
                >
                  ]
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* 가위 — 자르는 순간에만 */}
          <AnimatePresence>
            {mode === "split" && step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-2xl"
              >
                ✂️
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-xs text-gray-500" style={KO}>
            {listed ? "리스트 — 조각을 따로따로 꺼내 쓸 수 있어요" : "문자열 — 통째로 글자 한 덩어리"}
          </div>
        </div>
      </div>

      {/* 말풍선 */}
      <div
        className="mb-4 min-h-[52px] rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-800"
        style={KO}
      >
        {beats[step].split("**").map((t, i) =>
          i % 2 ? <strong key={i} className="text-indigo-700">{t}</strong> : <span key={i}>{t}</span>
        )}
      </div>

      {/* ◀ ▶ — 자동재생 없음 */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg bg-white p-2 text-indigo-700 shadow disabled:opacity-30"
          aria-label="이전 단계"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-mono text-sm text-gray-600">
          {step + 1} / {beats.length}
        </span>
        <button
          onClick={() => setStep((s) => Math.min(last, s + 1))}
          disabled={step === last}
          className="rounded-lg bg-white p-2 text-indigo-700 shadow disabled:opacity-30"
          aria-label="다음 단계"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setStep(0)}
          className="ml-2 rounded-lg bg-white p-2 text-gray-500 shadow"
          aria-label="처음으로"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
