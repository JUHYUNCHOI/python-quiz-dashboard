"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// 스택 시각화 (lesson 23 / cpp-18) — LIFO "접시 쌓기"
// push: 맨 위에 톡 쌓임 / pop: 맨 위가 위로 들려 빠져나감 / peek: 맨 위만 반짝
// "마지막에 넣은 게 먼저 나온다" 를 눈으로.
// ============================================

type Item = { id: number; val: string }
type Flash = { kind: "push" | "pop" | "peek" | "empty"; val?: string } | null

const COL = "#8b5cf6" // 보라 (스택 테마)

function StackVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const tt = (ko: string, en: string) => (isEn ? en : ko)

  const idRef = useRef(4)
  const [items, setItems] = useState<Item[]>([
    { id: 1, val: "10" },
    { id: 2, val: "20" },
    { id: 3, val: "30" },
  ])
  const [next, setNext] = useState("40")
  const [peeking, setPeeking] = useState(false)
  const [flash, setFlash] = useState<Flash>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [shake, setShake] = useState(0)

  useEffect(() => () => { if (flashTimer.current) clearTimeout(flashTimer.current) }, [])

  const setFlashTemp = (f: Flash) => {
    setFlash(f)
    if (flashTimer.current) clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlash(null), 2600)
  }

  const push = () => {
    const v = (next.trim() || String(idRef.current * 10))
    setItems((s) => [...s, { id: idRef.current++, val: v }])
    setPeeking(false)
    setFlashTemp({ kind: "push", val: v })
    const n = parseInt(v, 10)
    setNext(Number.isNaN(n) ? "" : String(n + 10))
  }

  const pop = () => {
    if (items.length === 0) { setShake((x) => x + 1); setFlashTemp({ kind: "empty" }); return }
    const top = items[items.length - 1]
    setItems((s) => s.slice(0, -1))
    setPeeking(false)
    setFlashTemp({ kind: "pop", val: top.val })
  }

  const peek = () => {
    if (items.length === 0) { setShake((x) => x + 1); setFlashTemp({ kind: "empty" }); return }
    setPeeking(true)
    setFlashTemp({ kind: "peek", val: items[items.length - 1].val })
  }

  const reset = () => {
    idRef.current = 4
    setItems([{ id: 1, val: "10" }, { id: 2, val: "20" }, { id: 3, val: "30" }])
    setNext("40")
    setPeeking(false)
    setFlash(null)
  }

  const topId = items.length ? items[items.length - 1].id : -1

  const flashText = (() => {
    if (!flash) return null
    switch (flash.kind) {
      case "push": return tt(`📥 push(${flash.val}) — 맨 위에 쌓았어요`, `📥 push(${flash.val}) — placed on top`)
      case "pop": return tt(`📤 pop() → ${flash.val} — 맨 위(마지막에 넣은 것)가 먼저!`, `📤 pop() → ${flash.val} — the top (last in) comes out first!`)
      case "peek": return tt(`👁 맨 위는 ${flash.val} — 보기만 하고 안 뺐어요`, `👁 top is ${flash.val} — just looking, not removing`)
      case "empty": return tt("⚠️ 스택이 비었어요 — 꺼낼 게 없어요!", "⚠️ Stack is empty — nothing to take!")
    }
  })()

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* 무대 */}
      <div className="rounded-2xl border-2 p-4 flex flex-col items-center" style={{ borderColor: COL + "33", background: COL + "0a" }}>
        {/* 입구 = 출구 표시 (맨 위 한 곳) */}
        <div className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: COL }}>
          ↕ {tt("넣고 빼는 곳은 '맨 위' 한 곳뿐", "you push & pop only at the TOP")}
        </div>

        {/* 스택 기둥 */}
        <motion.div
          key={shake}
          animate={flash?.kind === "empty" ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          transition={{ duration: 0.45 }}
          className="relative w-40 min-h-[180px] flex flex-col-reverse items-stretch gap-1.5 rounded-b-xl border-x-2 border-b-2 px-2 py-2"
          style={{ borderColor: COL + "55" }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((it) => {
              const isTop = it.id === topId
              return (
                <motion.div
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: -60, scale: 0.8 }}
                  animate={{
                    opacity: 1, y: 0, scale: 1,
                    boxShadow: isTop && peeking ? `0 0 0 3px ${COL}` : "0 0 0 0px transparent",
                  }}
                  exit={{ opacity: 0, y: -70, scale: 0.7, transition: { duration: 0.45 } }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="h-11 rounded-lg flex items-center justify-center font-mono text-lg font-bold text-white relative"
                  style={{ background: isTop ? COL : COL + "bb" }}
                >
                  {it.val}
                  {isTop && (
                    <motion.span layout className="absolute -right-[68px] text-xs font-bold whitespace-nowrap" style={{ color: COL }}>
                      ← TOP
                    </motion.span>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
          {items.length === 0 && (
            <div className="h-11 flex items-center justify-center text-xs text-gray-400">{tt("(비어 있음)", "(empty)")}</div>
          )}
        </motion.div>
        <div className="text-[11px] text-gray-400 mt-1">{tt("바닥", "bottom")}</div>

        {/* 상태 메시지 */}
        <div className="h-6 mt-2 flex items-center">
          <AnimatePresence mode="wait">
            {flashText && (
              <motion.div
                key={flashText}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs font-bold text-center px-2"
                style={{ color: flash?.kind === "empty" ? "#ef4444" : COL }}
              >
                {flashText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 조작 */}
      <div className="flex items-center gap-2">
        <input
          value={next}
          onChange={(e) => setNext(e.target.value)}
          spellCheck={false} autoComplete="off"
          className="w-16 px-2 py-2 rounded-lg border-2 border-gray-200 bg-white font-mono text-sm font-bold text-center text-gray-700 outline-none focus:border-violet-400"
        />
        <button onClick={push} className="px-3 py-2 rounded-xl text-sm font-bold text-white active:scale-95 transition-transform" style={{ background: COL }}>
          ⬇ push
        </button>
        <button onClick={pop} className="px-3 py-2 rounded-xl text-sm font-bold border-2 active:scale-95 transition-transform" style={{ color: COL, borderColor: COL + "66", background: "white" }}>
          ⬆ pop
        </button>
        <button onClick={peek} className="px-3 py-2 rounded-xl text-sm font-bold border-2 active:scale-95 transition-transform" style={{ color: COL, borderColor: COL + "66", background: "white" }}>
          👁 peek
        </button>
        <button onClick={reset} className="ml-auto px-3 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-transform">
          ↺
        </button>
      </div>

      {/* 캡션 */}
      <div className="rounded-xl px-3 py-2.5 text-xs leading-relaxed" style={{ background: COL + "12", color: "#374151" }}>
        💡 {tt(
          "스택 = 마지막에 넣은 게 먼저 나와요 (LIFO). 넣고 빼는 곳이 '맨 위' 한 곳뿐이라 — 책 쌓기, 되돌리기(Ctrl+Z), 웹 뒤로가기처럼 \"가장 최근 것\"부터 처리할 때 써요.",
          "A stack is Last-In-First-Out (LIFO). You add and remove only at the TOP — like a pile of books, Undo (Ctrl+Z), or the browser Back button, where you handle the \"most recent\" thing first.",
        )}
      </div>
    </div>
  )
}

export default StackVisualizer
export { StackVisualizer }
