"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const ARRAY = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
const TARGET = 56

export function LinearSearchAnimation({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const [currentIdx, setCurrentIdx] = useState<number>(-1)
  const [found, setFound] = useState(false)
  const [started, setStarted] = useState(false)

  const start = () => {
    setCurrentIdx(0)
    setStarted(true)
    setFound(false)
  }

  const next = () => {
    if (found) return
    if (ARRAY[currentIdx] === TARGET) {
      setFound(true)
      return
    }
    if (currentIdx < ARRAY.length - 1) {
      setCurrentIdx(currentIdx + 1)
    }
  }

  const reset = () => {
    setCurrentIdx(-1)
    setStarted(false)
    setFound(false)
  }

  const isChecked = (i: number) => started && i < currentIdx
  const isCurrent = (i: number) => started && i === currentIdx

  return (
    <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-500">{isEn ? "Linear Search" : "선형 탐색 (Linear Search)"}</p>
          <p className="text-sm font-bold">{isEn ? "Target: " : "찾는 값: "}<span className="text-orange-500">{TARGET}</span></p>
        </div>
        {started && (
          <span className="text-sm font-black text-orange-500 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            {found ? (isEn ? `🎉 Found in ${currentIdx + 1} step${currentIdx + 1 === 1 ? "" : "s"}!` : `🎉 ${currentIdx + 1}번 만에 찾았어요!`) : (isEn ? `${currentIdx + 1} checked` : `${currentIdx + 1}번 확인`)}
          </span>
        )}
      </div>

      <div className="flex justify-center gap-1 flex-wrap mb-4">
        {ARRAY.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: found && i === currentIdx
                ? "#22c55e"
                : isCurrent(i)
                ? "#f97316"
                : isChecked(i)
                ? "#e5e7eb"
                : "#fff",
              scale: isCurrent(i) ? 1.15 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center w-10 h-12 rounded-lg border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            style={{ color: isChecked(i) ? "#9ca3af" : "#111" }}
          >
            <span>{val}</span>
            <span className="text-[10px] font-normal text-gray-400">[{i}]</span>
          </motion.div>
        ))}
      </div>

      {started && !found && currentIdx >= 0 && (
        <p className="text-center text-sm text-gray-600 mb-3">
          arr[{currentIdx}] = {ARRAY[currentIdx]} ...{" "}
          <span className="text-red-500 font-bold">✗ {isEn ? `not ${TARGET}` : `${TARGET}이 아니에요`}</span>
        </p>
      )}
      {found && (
        <p className="text-center text-sm mb-3">
          <span className="text-green-600 font-bold">arr[{currentIdx}] = {TARGET} ✓ {isEn ? `Found! (${currentIdx + 1} check${currentIdx + 1 === 1 ? "" : "s"})` : `찾았어요! (${currentIdx + 1}번 확인)`}</span>
        </p>
      )}

      <div className="flex justify-center gap-2">
        {!started ? (
          <button
            onClick={start}
            className="px-5 py-2 bg-orange-500 text-white font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
          >
            ▶ {isEn ? "Start" : "시작"}
          </button>
        ) : found ? (
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-200 text-gray-700 font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
          >
            ↩ {isEn ? "Again" : "다시"}
          </button>
        ) : (
          <>
            <button
              onClick={next}
              className="px-5 py-2 bg-orange-500 text-white font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
            >
              → {isEn ? "Next check" : "다음 확인"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
            >
              ↩
            </button>
          </>
        )}
      </div>

      {found && (
        <p className="text-center text-xs text-gray-500 mt-3">
          {isEn
            ? <>Array of 10: {currentIdx + 1} check{currentIdx + 1 === 1 ? "" : "s"} — worst case for 1 million items: <strong>1 million checks!</strong></>
            : <>10개 배열에서 {currentIdx + 1}번 확인 — 100만 개면 최악 <strong>100만 번!</strong></>
          }
        </p>
      )}
    </div>
  )
}
