"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ====================================================================
// pair vs 두 vector 비교 애니메이션
// 정렬 시 두 vector는 연결이 끊기고, pair는 항상 함께 움직임을 시각화
// ====================================================================

const INITIAL_DATA = [
  { name: "Kim", score: 78, color: "bg-rose-400" },
  { name: "Lee", score: 95, color: "bg-violet-400" },
  { name: "Park", score: 88, color: "bg-sky-400" },
]

// 점수 기준 오름차순 정렬 인덱스
const SORTED_ORDER = [0, 2, 1] // 78 < 88 < 95 → Kim, Park, Lee

export function PairVsTwoVectorsAnimation() {
  const [sorted, setSorted] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleSort = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setSorted(true)
      setAnimating(false)
    }, 600)
  }

  const handleReset = () => {
    setSorted(false)
    setAnimating(false)
  }

  // 두 vector 상태: 점수만 정렬됨 (이름은 그대로)
  const leftScores = sorted ? [78, 88, 95] : [78, 95, 88]
  const leftNames = ["Kim", "Lee", "Park"] // 항상 그대로

  // pair 상태: 쌍이 같이 움직임
  const rightData = sorted
    ? SORTED_ORDER.map(i => INITIAL_DATA[i])
    : INITIAL_DATA

  return (
    <div className="space-y-4 select-none">
      {/* 설명 */}
      <p className="text-sm text-gray-600 text-center font-medium">
        아래 버튼을 눌러서 정렬 시 어떤 차이가 생기는지 확인하세요!
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* 왼쪽: 두 vector 방식 */}
        <div className="space-y-2">
          <div className="text-center">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
              ❌ vector 2개로 따로 저장
            </span>
          </div>

          {/* names vector */}
          <div className="space-y-1">
            <div className="text-[10px] text-gray-400 font-mono text-center">names</div>
            {leftNames.map((name, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className={cn(
                  "w-full py-1.5 px-2 rounded text-center text-xs font-bold text-white",
                  INITIAL_DATA.find(d => d.name === name)?.color ?? "bg-gray-400"
                )}>
                  {name}
                </div>
              </div>
            ))}
          </div>

          {/* 연결선 (정렬 전) / 끊어진 연결 (정렬 후) */}
          <div className="flex items-center justify-center gap-1">
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded font-bold transition-all",
              sorted
                ? "text-red-600 bg-red-50 border border-red-200"
                : "text-green-600 bg-green-50 border border-green-200"
            )}>
              {sorted ? "😱 연결 끊김!" : "연결됨"}
            </span>
          </div>

          {/* scores vector */}
          <div className="space-y-1">
            <div className="text-[10px] text-gray-400 font-mono text-center">scores</div>
            <AnimatePresence mode="popLayout">
              {leftScores.map((score, i) => {
                // 정렬 후에는 점수와 이름의 색이 불일치
                const origColor = INITIAL_DATA.find(d => d.score === score)?.color ?? "bg-gray-400"
                const nameColor = INITIAL_DATA.find(d => d.name === leftNames[i])?.color ?? "bg-gray-400"
                const mismatch = sorted && origColor !== nameColor
                return (
                  <motion.div
                    key={score}
                    layout
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <div className={cn(
                      "w-full py-1.5 px-2 rounded text-center text-xs font-bold text-white relative",
                      mismatch ? "bg-red-400 ring-2 ring-red-300" : origColor
                    )}>
                      {score}점
                      {mismatch && (
                        <span className="absolute -top-1 -right-1 text-[8px] bg-red-600 text-white rounded-full px-1">❌</span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {sorted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-red-600 text-center bg-red-50 rounded p-1.5 border border-red-200"
            >
              78점 = Kim? Lee?<br />알 수 없어요! 😱
            </motion.div>
          )}
        </div>

        {/* 오른쪽: pair 방식 */}
        <div className="space-y-2">
          <div className="text-center">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              ✅ pair로 묶어서 저장
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] text-gray-400 font-mono text-center">
              vector&lt;pair&lt;int,string&gt;&gt;
            </div>
            <AnimatePresence mode="popLayout">
              {rightData.map((item) => (
                <motion.div
                  key={item.name}
                  layout
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <div className={cn(
                    "w-full py-1.5 px-2 rounded text-center text-xs font-bold text-white flex items-center justify-center gap-1",
                    item.color
                  )}>
                    <span>{item.score}점</span>
                    <span className="opacity-60">·</span>
                    <span>{item.name}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-[10px] text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded font-bold">
              항상 함께 이동 🔗
            </span>
          </div>

          {sorted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-green-700 text-center bg-green-50 rounded p-1.5 border border-green-200"
            >
              78점 = Kim ✓<br />연결이 안 끊겨요! 🎉
            </motion.div>
          )}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center gap-3">
        {!sorted ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSort}
            disabled={animating}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all disabled:opacity-60"
          >
            📊 점수순 정렬!
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-md transition-all"
          >
            🔄 초기화
          </motion.button>
        )}
      </div>

      {/* 요약 */}
      <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-200">
        <p className="text-xs text-indigo-800 text-center leading-relaxed">
          <strong>핵심:</strong> 관련 데이터는 pair로 묶어서 관리하면<br />
          정렬해도 연결이 절대 끊기지 않아요! 🔗
        </p>
      </div>
    </div>
  )
}
