"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── 비교할 pair 예제 ───────────────────────────────────────
const EXAMPLES = [
  {
    label: "first가 다를 때",
    a: { first: 2, second: 5 },
    b: { first: 1, second: 9 },
    description: "first: 2 vs 1 → 2 > 1 이니까 a > b!",
    firstEqual: false,
    result: "a > b",
    resultColor: "text-orange-600",
  },
  {
    label: "first가 같을 때",
    a: { first: 1, second: 5 },
    b: { first: 1, second: 3 },
    description: "first: 1 == 1 → second로! 5 > 3 이니까 a > b!",
    firstEqual: true,
    result: "a > b",
    resultColor: "text-orange-600",
  },
  {
    label: "완전히 같을 때",
    a: { first: 3, second: 7 },
    b: { first: 3, second: 7 },
    description: "first: 3 == 3 → second: 7 == 7 → a == b!",
    firstEqual: true,
    result: "a == b",
    resultColor: "text-blue-600",
  },
]

// ─── 정렬 데모 ────────────────────────────────────────────
const INITIAL_PAIRS = [
  { first: 3, second: "C", id: 0 },
  { first: 1, second: "A", id: 1 },
  { first: 2, second: "B", id: 2 },
  { first: 1, second: "D", id: 3 },
]
const SORTED_PAIRS = [
  { first: 1, second: "A", id: 1 },
  { first: 1, second: "D", id: 3 },
  { first: 2, second: "B", id: 2 },
  { first: 3, second: "C", id: 0 },
]

export function PairCompareAnimation() {
  const [step, setStep] = useState<0 | 1 | 2>(0) // 0=시작, 1=first비교, 2=second비교/결과
  const [exIdx, setExIdx] = useState(0)
  const [sorted, setSorted] = useState(false)

  const ex = EXAMPLES[exIdx]

  const reset = () => { setStep(0) }

  const next = () => {
    if (step === 0) setStep(1)
    else if (step === 1) setStep(2)
    else { setExIdx((exIdx + 1) % EXAMPLES.length); setStep(0) }
  }

  const btnLabel = step === 0 ? "▶ 비교 시작!" : step === 1 ? "→ 다음 단계" : "🔄 다음 예제"

  return (
    <div className="space-y-6 select-none">

      {/* ── 섹션 1: 단계별 비교 ── */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-5">
        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">📊 pair 비교 — 어떻게 작동할까?</p>

        {/* 예제 탭 */}
        <div className="flex gap-1.5 mb-4">
          {EXAMPLES.map((e, i) => (
            <button
              key={i}
              onClick={() => { setExIdx(i); setStep(0) }}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
                exIdx === i ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>

        {/* pair 카드 2개 */}
        <div className="flex items-center justify-center gap-4 mb-5">
          {/* pair a */}
          <PairCard
            label="a"
            first={ex.a.first}
            second={ex.a.second}
            highlightFirst={step >= 1}
            highlightSecond={step === 2 && ex.firstEqual}
            firstMatch={step >= 1 && ex.firstEqual}
          />

          {/* 비교 기호 */}
          <div className="text-center w-12">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-2xl text-gray-300 font-black">?</motion.div>
              )}
              {step === 1 && (
                <motion.div key="step1" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="space-y-1">
                  <div className="text-[10px] font-bold text-gray-400">first 비교</div>
                  <div className={`text-lg font-black ${ex.firstEqual ? "text-blue-500" : "text-orange-500"}`}>
                    {ex.a.first} {ex.firstEqual ? "==" : ex.a.first > ex.b.first ? ">" : "<"} {ex.b.first}
                  </div>
                  {ex.firstEqual && (
                    <div className="text-[10px] font-bold text-blue-400">같아요! →</div>
                  )}
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="space-y-1">
                  {ex.firstEqual && (
                    <div className="text-[10px] font-bold text-purple-400">second 비교</div>
                  )}
                  <div className={`text-xl font-black ${ex.resultColor}`}>
                    {ex.result}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* pair b */}
          <PairCard
            label="b"
            first={ex.b.first}
            second={ex.b.second}
            highlightFirst={step >= 1}
            highlightSecond={step === 2 && ex.firstEqual}
            firstMatch={step >= 1 && ex.firstEqual}
          />
        </div>

        {/* 설명 텍스트 */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p key="desc0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-sm text-gray-400 mb-4">
              버튼을 눌러서 비교 과정을 확인해봐요!
            </motion.p>
          )}
          {step === 1 && (
            <motion.p key="desc1" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`text-center text-sm font-bold mb-4 ${ex.firstEqual ? "text-blue-600" : "text-orange-600"}`}>
              {ex.firstEqual ? "① first값이 같아요 (1 == 1) → second도 비교해야 해요!" : `① first값이 달라요 (${ex.a.first} vs ${ex.b.first}) → 바로 결과 나와요!`}
            </motion.p>
          )}
          {step === 2 && (
            <motion.p key="desc2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-center text-sm font-bold mb-4 text-gray-700">
              {ex.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={next}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            {btnLabel}
          </button>
        </div>
      </div>

      {/* ── 섹션 2: 정렬 데모 ── */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-5">
        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">📦 vector&lt;pair&gt; 정렬 데모</p>
        <p className="text-[12px] text-gray-500 mb-4">
          pair 자체가 알아서 정렬되는 게 아니라, <span className="font-bold text-gray-700">vector에 pair를 담고 sort()를 호출</span>하면 pair의 비교 규칙대로 정렬돼요!<br/>
          <span className="font-bold text-blue-600">first 기준 정렬</span>, first가 같으면 <span className="font-bold text-purple-600">second 기준 정렬</span>
        </p>

        <div className="space-y-2 mb-4">
          {(sorted ? SORTED_PAIRS : INITIAL_PAIRS).map((p, i) => (
            <motion.div
              key={p.id}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 border-2 ${
                sorted
                  ? p.first === 1
                    ? "border-purple-200 bg-purple-50"
                    : "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <span className="text-[11px] font-black text-gray-400 w-4">{i}</span>
              <span className="font-mono text-sm">
                {"{"}
                <span className={`font-bold ${sorted && p.first === 1 ? "text-purple-600" : "text-blue-600"}`}>{p.first}</span>
                {", "}
                <span className="text-green-600 font-bold">"{p.second}"</span>
                {"}"}
              </span>
              {sorted && p.first === 1 && (
                <span className="ml-auto text-[10px] font-bold text-purple-400">first 같음 → second 순</span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setSorted(true)}
            disabled={sorted}
            className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
              sorted ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            📊 sort() 실행!
          </button>
          <button
            onClick={() => setSorted(false)}
            disabled={!sorted}
            className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
              !sorted ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🔄 초기화
          </button>
        </div>
      </div>

    </div>
  )
}

// ─── pair 카드 컴포넌트 ─────────────────────────────────────
function PairCard({
  label,
  first,
  second,
  highlightFirst,
  highlightSecond,
  firstMatch,
}: {
  label: string
  first: number
  second: number | string
  highlightFirst: boolean
  highlightSecond: boolean
  firstMatch: boolean
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-black text-gray-400 mb-1.5">{label}</p>
      <div className="rounded-xl border-2 border-gray-200 overflow-hidden w-28">
        {/* first */}
        <motion.div
          animate={{
            backgroundColor: highlightFirst
              ? firstMatch ? "#dbeafe" : "#fed7aa"
              : "#f9fafb",
          }}
          className="px-3 py-2 border-b border-gray-200"
        >
          <p className="text-[10px] font-bold text-gray-400 mb-0.5">.first</p>
          <motion.p
            animate={{ scale: highlightFirst ? 1.15 : 1 }}
            className={`text-xl font-black ${
              highlightFirst ? (firstMatch ? "text-blue-600" : "text-orange-600") : "text-gray-700"
            }`}
          >
            {first}
          </motion.p>
        </motion.div>
        {/* second */}
        <motion.div
          animate={{
            backgroundColor: highlightSecond ? "#f3e8ff" : "#f9fafb",
          }}
          className="px-3 py-2"
        >
          <p className="text-[10px] font-bold text-gray-400 mb-0.5">.second</p>
          <motion.p
            animate={{ scale: highlightSecond ? 1.15 : 1 }}
            className={`text-xl font-black ${highlightSecond ? "text-purple-600" : "text-gray-400"}`}
          >
            {second}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
