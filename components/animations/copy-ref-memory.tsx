"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw } from "lucide-react"

// ============================================
// 복사 vs 참조 메모리 시뮬레이션
// for(int x : v) vs for(int& x : v)
// 실제 메모리 주소 기반으로 무슨 일이 일어나는지 보여줌
// ============================================

const VALUES = [10, 20, 30]
const BASE_ADDR = 0x100  // vector v의 시작 주소

type Mode = "copy" | "ref"

function toHex(n: number) {
  return "0x" + n.toString(16).toUpperCase().padStart(3, "0")
}

export function CopyRefMemory({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [mode, setMode] = useState<Mode>("copy")
  const [step, setStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const [copyAddr] = useState(0x200)  // 복사본이 생기는 주소
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isEn = lang === "en"

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStep(-1)
    setRunning(false)
  }

  const start = () => {
    reset()
    setRunning(true)
    setTimeout(() => setStep(0), 150)
  }

  useEffect(() => {
    if (!running || step < 0) return
    if (step >= VALUES.length) { setRunning(false); return }
    timerRef.current = setTimeout(() => setStep(s => s + 1), 1200)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [running, step])

  useEffect(() => { reset() }, [mode])

  const done = step >= VALUES.length
  const activeIdx = done ? -1 : step

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">

      {/* 모드 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {([
          { id: "copy" as Mode, label: "for (int x : v)", sub: isEn ? "copy" : "복사본 생성", color: "#ef4444", bg: "#fef2f2" },
          { id: "ref" as Mode, label: "for (int& x : v)", sub: isEn ? "reference" : "직접 참조", color: "#10b981", bg: "#f0fdf4" },
        ]).map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className="px-3 py-2.5 rounded-xl border-2 text-left transition-all"
            style={mode === m.id
              ? { background: m.bg, borderColor: m.color }
              : { background: "white", borderColor: "#e2e8f0" }
            }
          >
            <div className="font-mono text-xs font-bold" style={{ color: mode === m.id ? m.color : "#94a3b8" }}>
              {m.label}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: mode === m.id ? m.color + "cc" : "#cbd5e1" }}>
              {m.sub}
            </div>
          </button>
        ))}
      </div>

      {/* 메모리 시뮬 */}
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 space-y-5">

        {/* 코드 */}
        <div className="bg-gray-900 rounded-xl px-4 py-2.5 font-mono text-sm text-gray-100">
          {mode === "copy"
            ? <><span className="text-blue-400">for</span> (<span className="text-green-400">int</span> x : v) &#123; ... &#125;</>
            : <><span className="text-blue-400">for</span> (<span className="text-green-400">int</span><span className="text-yellow-300">&amp;</span> x : v) &#123; ... &#125;</>
          }
        </div>

        {/* RAM 레이아웃 */}
        <div className="space-y-3">

          {/* 원본 vector v */}
          <div>
            <div className="text-[10px] font-bold text-gray-400 mb-1.5 tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
              {isEn ? "RAM — vector v (original)" : "RAM — 원본 벡터 v"}
            </div>
            <div className="flex gap-2">
              {VALUES.map((val, i) => {
                const addr = BASE_ADDR + i * 4
                const isActive = activeIdx === i
                return (
                  <motion.div
                    key={i}
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-14 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border-2 transition-all duration-300"
                      style={{
                        background: isActive ? "#1e293b" : "#f8fafc",
                        color: isActive ? "#f1f5f9" : "#475569",
                        borderColor: isActive ? "#475569" : "#e2e8f0",
                      }}
                    >
                      {val}
                    </div>
                    <span className="text-[9px] font-mono text-gray-400">{toHex(addr)}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 복사 모드: x 변수 메모리 */}
          {mode === "copy" && (
            <div>
              <div className="text-[10px] font-bold text-red-400 mb-1.5 tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                {isEn ? "RAM — int x (NEW copy each iteration!)" : "RAM — int x (매 반복마다 새 복사본!)"}
              </div>
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {activeIdx >= 0 ? (
                    <motion.div
                      key={activeIdx}
                      initial={{ scale: 0, opacity: 0, y: -8 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="w-14 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border-2 border-red-300 bg-red-50 text-red-600">
                        {VALUES[activeIdx]}
                      </div>
                      <span className="text-[9px] font-mono text-red-400">{toHex(copyAddr)}</span>
                    </motion.div>
                  ) : (
                    <div className="w-14 h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 font-mono text-xs">
                      —
                    </div>
                  )}
                </AnimatePresence>

                {/* 복사 화살표 */}
                {activeIdx >= 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 text-xs text-red-400 font-medium"
                  >
                    <span className="text-[10px] bg-red-100 px-2 py-0.5 rounded-full">
                      {toHex(BASE_ADDR + activeIdx * 4)} → {toHex(copyAddr)}
                    </span>
                    <span>{isEn ? "copy!" : "복사!"}</span>
                  </motion.div>
                )}
              </div>
              {activeIdx >= 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-red-500 mt-1.5"
                >
                  ⚠️ {isEn
                    ? `New memory allocated at ${toHex(copyAddr)} — value ${VALUES[activeIdx]} copied from ${toHex(BASE_ADDR + activeIdx * 4)}`
                    : `${toHex(copyAddr)}에 새 메모리 할당 — ${toHex(BASE_ADDR + activeIdx * 4)}의 값 ${VALUES[activeIdx]}을 복사`}
                </motion.p>
              )}
            </div>
          )}

          {/* 참조 모드: x는 새 메모리 없음, 그냥 가리킴 */}
          {mode === "ref" && (
            <div>
              <div className="text-[10px] font-bold text-emerald-500 mb-1.5 tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                {isEn ? "x = reference (same address, no copy!)" : "x = 참조 (같은 주소, 복사 없음!)"}
              </div>

              <AnimatePresence>
                {activeIdx >= 0 && (
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    {/* x 라벨 */}
                    <div className="px-3 py-1.5 rounded-lg font-mono text-sm font-bold border-2 border-emerald-300 bg-emerald-50 text-emerald-700">
                      x
                    </div>
                    {/* 화살표 */}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: 2, duration: 0.3 }}
                      className="text-emerald-500 font-bold text-base"
                    >
                      →
                    </motion.div>
                    {/* 가리키는 주소 */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-14 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-bold border-2 border-emerald-400 bg-emerald-50 text-emerald-700">
                        {VALUES[activeIdx]}
                      </div>
                      <span className="text-[9px] font-mono text-emerald-500">
                        {toHex(BASE_ADDR + activeIdx * 4)}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      {isEn ? "← same address!" : "← 같은 주소!"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeIdx >= 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-emerald-600 mt-1.5"
                >
                  ✅ {isEn
                    ? `x refers to ${toHex(BASE_ADDR + activeIdx * 4)} directly — zero new memory!`
                    : `x는 ${toHex(BASE_ADDR + activeIdx * 4)}를 직접 가리킴 — 새 메모리 없음!`}
                </motion.p>
              )}
            </div>
          )}
        </div>

        {/* 완료 */}
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl px-4 py-3 text-sm font-bold text-center"
            style={mode === "copy"
              ? { background: "#fef2f2", color: "#ef4444" }
              : { background: "#f0fdf4", color: "#10b981" }
            }
          >
            {mode === "copy"
              ? (isEn ? "3 copies were made (×3 memory allocations)" : "복사 3번 발생 → 메모리 3번 추가 할당!")
              : (isEn ? "0 copies — just 3 address references!" : "복사 0번 → 주소만 3번 참조!")}
          </motion.div>
        )}

        {/* 재생 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={start}
            disabled={running}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
            style={{ background: mode === "copy" ? "#ef4444" : "#10b981" }}
          >
            <Play className="w-3.5 h-3.5" />
            {isEn ? "Run" : "실행"}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 결론 카드 */}
      <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4 text-sm text-indigo-800">
        <p className="font-bold mb-1">💡 {isEn ? "Why & is faster" : "왜 &가 빠른가?"}</p>
        <p className="text-indigo-700 text-xs leading-relaxed">
          {isEn
            ? "Without &, every iteration allocates new memory and copies the value. With &, x is just an alias (another name) for the original — no allocation, no copy. For large objects (strings, structs), the difference is huge."
            : "& 없이는 반복마다 새 메모리를 잡고 값을 복사해요. &를 쓰면 x는 원본의 또 다른 이름일 뿐 — 메모리 할당도, 복사도 없어요. 큰 데이터(string, 구조체 등)에서는 차이가 크게 납니다."
          }
        </p>
      </div>
    </div>
  )
}
