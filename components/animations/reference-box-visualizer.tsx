"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 두 가지 방식 비교
//
// ① int y = x      → 복사: 완전히 별개의 상자
// ② int& ref = x   → 참조: 같은 상자에 이름표만 추가
// ============================================================

type Scenario = "copy" | "ref"

const SCENARIOS: { id: Scenario; code: string; title: string; subtitle: string; color: string; bg: string }[] = [
  {
    id: "copy",
    code: "int y = x;",
    title: "① 복사 (C++ 기본)",
    subtitle: "완전히 별개의 상자 생성",
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    id: "ref",
    code: "int& ref = x;",
    title: "② 참조 (C++ reference)",
    subtitle: "같은 상자, 이름표만 추가",
    color: "#6366f1",
    bg: "#eef2ff",
  },
]

export function ReferenceBoxVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [scenario, setScenario] = useState<Scenario>("copy")
  const [xVal, setXVal] = useState(10)
  const [yVal, setYVal] = useState(10)
  const [modified, setModified] = useState(false)

  const isEn = lang === "en"
  const s = SCENARIOS.find(s => s.id === scenario)!

  const handleScenario = (sc: Scenario) => {
    setScenario(sc)
    setXVal(10)
    setYVal(10)
    setModified(false)
  }

  const handleModify = () => {
    if (modified) {
      setXVal(10)
      setYVal(10)
      setModified(false)
      return
    }
    setModified(true)
    if (scenario === "copy") {
      setYVal(99)        // y만 바뀜, x는 그대로
    } else {
      setXVal(99)        // 같은 상자이므로 x도 바뀜
      setYVal(99)
    }
  }

  const secondLabel = scenario === "copy" ? "y" : "ref"
  const modifyCode = scenario === "copy" ? "y = 99;" : "ref = 99;"

  return (
    <div className="w-full max-w-md mx-auto space-y-3 select-none">

      {/* 시나리오 선택 */}
      <div className="space-y-1.5">
        {SCENARIOS.map(sc => (
          <button key={sc.id} onClick={() => handleScenario(sc.id)}
            className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all"
            style={scenario === sc.id
              ? { borderColor: sc.color, background: sc.bg }
              : { borderColor: "#e2e8f0", background: "white" }
            }
          >
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs font-bold" style={{ color: scenario === sc.id ? sc.color : "#94a3b8" }}>
                {sc.code}
              </div>
              <div className="text-[10px] mt-0.5 font-medium" style={{ color: scenario === sc.id ? sc.color + "cc" : "#cbd5e1" }}>
                {sc.title} — {sc.subtitle}
              </div>
            </div>
            {scenario === sc.id && (
              <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: sc.color }} />
            )}
          </button>
        ))}
      </div>

      {/* 메인 시각화 */}
      <div className="rounded-2xl border-2 bg-white p-5 space-y-5" style={{ borderColor: s.color + "40" }}>

        {/* 코드 */}
        <div className="bg-slate-900 rounded-xl px-4 py-2.5 font-mono text-sm text-slate-100 space-y-0.5">
          <div>
            <span className="text-emerald-400">int</span> <span className="text-white">x</span> = 10;
          </div>
          <div style={{ color: s.color }}>
            {scenario === "copy" && <><span className="text-emerald-400">int</span> <span className="text-white">y</span> = x;  <span className="text-slate-500">// y라는 새 상자에 10 복사</span></>}
            {scenario === "ref"  && <><span className="text-emerald-400">int</span><span style={{ color: "#f472b6" }}>&amp;</span> <span className="text-white">ref</span> = x;  <span className="text-slate-500">// ref = x의 또 다른 이름</span></>}
          </div>
          {modified && (
            <div className="text-yellow-300">
              {modifyCode}  <span className="text-slate-500">// 실행!</span>
            </div>
          )}
        </div>

        {/* 상자 시각화 */}
        <div className="space-y-4">

          {/* ① 복사 */}
          {scenario === "copy" && (
            <div className="space-y-3">
              {/* x 상자 */}
              <div className="flex items-center gap-3">
                <div className="w-16 text-right">
                  <span className="text-xs font-bold text-slate-400">x</span>
                </div>
                <Box value={xVal} color="#64748b" label="x" />
                <div className="text-xs text-slate-400">
                  {modified ? "😊 그대로 10!" : ""}
                </div>
              </div>

              {/* y 상자 — 별개! */}
              <div className="flex items-center gap-3">
                <div className="w-16 text-right">
                  <span className="text-xs font-bold text-orange-500">y</span>
                </div>
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0, x: -10 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Box value={yVal} color="#f97316" label="y" highlight={modified} />
                  </motion.div>
                </AnimatePresence>
                {modified && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-xs font-bold text-orange-500">
                    99로 바뀜! (x는 그대로)
                  </motion.div>
                )}
              </div>

              {/* 설명 */}
              <div className="rounded-xl bg-orange-50 border border-orange-100 px-3 py-2 text-xs text-orange-700">
                📦 <strong>복사</strong> — y 상자는 x 상자와 완전히 별개예요. y를 바꿔도 x는 그대로예요.
              </div>
            </div>
          )}

          {/* ② 참조 */}
          {scenario === "ref" && (
            <div className="space-y-3">
              {/* 하나의 상자에 두 이름표 */}
              <div className="flex items-start gap-3">
                <div className="w-16 text-right space-y-1 pt-2">
                  <div className="text-xs font-bold text-slate-400">x</div>
                  <div className="text-xs font-bold text-indigo-500">ref</div>
                </div>
                <div className="relative">
                  <Box value={xVal} color="#6366f1" label="" highlight={modified} />
                  {/* 두 이름표 */}
                  <div className="absolute -top-2 left-0 right-0 flex justify-center gap-1">
                    <span className="text-[9px] font-bold bg-slate-500 text-white px-1.5 py-0.5 rounded-full">x</span>
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full"
                      style={{ background: "#6366f1" }}
                    >
                      ref
                    </motion.span>
                  </div>
                </div>
                {modified && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-xs font-bold text-indigo-600 pt-2">
                    x도 ref도 둘 다 99!<br />
                    <span className="font-normal text-indigo-400">같은 상자니까요</span>
                  </motion.div>
                )}
              </div>

              <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-2 text-xs text-indigo-700">
                🏷️ <strong>참조</strong> — ref는 새 상자가 없어요! x 상자에 이름표만 하나 더 붙은 거예요. 상자는 하나, 이름은 두 개.
              </div>
            </div>
          )}
        </div>

        {/* 실행 버튼 */}
        <button
          onClick={handleModify}
          className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: modified ? "#94a3b8" : s.color }}
        >
          {modified
            ? (isEn ? "↺ Reset" : "↺ 초기화")
            : `▶ ${modifyCode} 실행해보기`}
        </button>
      </div>

      {/* 2줄 비교 요약 */}
      <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3 space-y-2 text-xs">
        <p className="font-bold text-slate-600 mb-1">📊 {isEn ? "Summary" : "한눈에 비교"}</p>
        {[
          { label: "복사", desc: "새 상자. y 바꿔도 x 그대로.", color: "#f97316" },
          { label: "C++ 참조", desc: "상자 없음. x에 이름표만 추가. 하나가 바뀌면 둘 다 바뀜.", color: "#6366f1" },
        ].map((row, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="font-mono font-bold shrink-0 pt-0.5" style={{ color: row.color }}>{row.label}</span>
            <span className="text-slate-500">{row.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Box({ value, color, label, highlight }: { value: number; color: string; label: string; highlight?: boolean }) {
  return (
    <motion.div
      animate={highlight ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.3 }}
      className="w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-2xl font-black border-3 transition-all duration-300"
      style={{
        borderWidth: 3,
        background: highlight ? color + "20" : "#f8fafc",
        borderColor: highlight ? color : "#e2e8f0",
        color: highlight ? color : "#94a3b8",
        boxShadow: highlight ? `0 0 0 4px ${color}25` : undefined,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span key={value}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.2 }}>
          {value}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}
