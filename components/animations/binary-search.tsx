"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const ARRAY = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
const TARGET = 56

interface Iteration {
  left: number
  right: number
  mid: number
  result: "less" | "greater" | "found"
}

function buildIterations(): Iteration[] {
  const iters: Iteration[] = []
  let left = 0
  let right = ARRAY.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (ARRAY[mid] === TARGET) {
      iters.push({ left, right, mid, result: "found" })
      break
    } else if (ARRAY[mid] < TARGET) {
      iters.push({ left, right, mid, result: "less" })
      left = mid + 1
    } else {
      iters.push({ left, right, mid, result: "greater" })
      right = mid - 1
    }
  }
  return iters
}

const ITERATIONS = buildIterations()

type Phase = "range" | "mid"

export function BinarySearchAnimation() {
  const [iterIdx, setIterIdx] = useState(-1)
  const [phase, setPhase] = useState<Phase>("range")
  const [started, setStarted] = useState(false)

  const current = iterIdx >= 0 ? ITERATIONS[iterIdx] : null
  const found = phase === "mid" && current?.result === "found"
  const comparisons = phase === "mid" ? iterIdx + 1 : iterIdx

  const start = () => {
    setIterIdx(0)
    setPhase("range")
    setStarted(true)
  }

  const next = () => {
    if (phase === "range") {
      setPhase("mid")
    } else {
      if (current?.result !== "found" && iterIdx < ITERATIONS.length - 1) {
        setIterIdx(iterIdx + 1)
        setPhase("range")
      }
    }
  }

  const reset = () => {
    setIterIdx(-1)
    setPhase("range")
    setStarted(false)
  }

  const getColor = (i: number) => {
    if (!current) return "#fff"
    const inRange = i >= current.left && i <= current.right

    if (phase === "mid" && i === current.mid) {
      return current.result === "found" ? "#22c55e" : "#f97316"
    }
    if (!inRange) return "#e5e7eb"
    if (phase === "range") return "#dbeafe" // 범위 표시 (연파랑)
    return "#fff"
  }

  const isEliminated = (i: number) => {
    if (!current) return false
    return i < current.left || i > current.right
  }

  const isMid = (i: number) => phase === "mid" && current !== null && i === current.mid

  return (
    <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-500">이진 탐색 (Binary Search)</p>
          <p className="text-sm font-bold">찾는 값: <span className="text-blue-500">{TARGET}</span></p>
        </div>
        {started && (
          <span className="text-sm font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {found ? `🎉 ${comparisons}번 만에 찾았어요!` : comparisons > 0 ? `${comparisons}번 확인` : "범위 확인 중"}
          </span>
        )}
      </div>

      <div className="flex justify-center gap-1 flex-wrap mb-4">
        {ARRAY.map((val, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: getColor(i),
              scale: isMid(i) ? 1.15 : 1,
              opacity: isEliminated(i) ? 0.35 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-10 h-12 rounded-lg border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            style={{ color: isEliminated(i) ? "#9ca3af" : "#111" }}
          >
            <span>{val}</span>
            <span className="text-[10px] font-normal text-gray-400">[{i}]</span>
          </motion.div>
        ))}
      </div>

      {/* 설명 */}
      <div className="text-center text-sm mb-4 min-h-[40px] flex items-center justify-center">
        {!started && (
          <span className="text-gray-400">버튼을 눌러서 시작해봐요!</span>
        )}
        {started && current && phase === "range" && (
          <span className="text-blue-600 font-bold">
            탐색 범위: index {current.left} ~ {current.right}{" "}
            <span className="text-gray-500 font-normal">
              ({ARRAY[current.left]} ~ {ARRAY[current.right]})
            </span>
          </span>
        )}
        {started && current && phase === "mid" && (
          <>
            {current.result === "found" ? (
              <span className="text-green-600 font-bold">
                arr[{current.mid}] = {ARRAY[current.mid]} ✓ 찾았어요!
              </span>
            ) : current.result === "less" ? (
              <span className="text-gray-700">
                중간값 arr[{current.mid}] = <strong>{ARRAY[current.mid]}</strong> &lt; {TARGET} →{" "}
                <span className="text-blue-500 font-bold">오른쪽 절반만 탐색!</span>
              </span>
            ) : (
              <span className="text-gray-700">
                중간값 arr[{current.mid}] = <strong>{ARRAY[current.mid]}</strong> &gt; {TARGET} →{" "}
                <span className="text-blue-500 font-bold">왼쪽 절반만 탐색!</span>
              </span>
            )}
          </>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex justify-center gap-2">
        {!started ? (
          <button
            onClick={start}
            className="px-5 py-2 bg-blue-500 text-white font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
          >
            ▶ 시작
          </button>
        ) : found ? (
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-200 text-gray-700 font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
          >
            ↩ 다시
          </button>
        ) : (
          <>
            <button
              onClick={next}
              className="px-5 py-2 bg-blue-500 text-white font-black rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5"
            >
              {phase === "range" ? "→ 중간값 확인" : "→ 다음 범위"}
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
          10개 배열에서 {comparisons}번 확인 — 선형 탐색은 <strong>8번</strong>이었어요! 100만 개도 <strong>20번!</strong>
        </p>
      )}
    </div>
  )
}
