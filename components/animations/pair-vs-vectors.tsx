"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

// ====================================================================
// pair vs 두 vector 비교 — 단계별 진행
// 학생이 클릭하면서 천천히 따라갈 수 있게 4 단계로 분해
// ====================================================================

const INITIAL = [
  { name: "Kim", score: 78, color: "bg-rose-400" },
  { name: "Lee", score: 95, color: "bg-violet-400" },
  { name: "Park", score: 88, color: "bg-sky-400" },
]

// 점수 오름차순 정렬: 78(Kim), 88(Park), 95(Lee)
const SORTED = [INITIAL[0], INITIAL[2], INITIAL[1]]

const TOTAL_STEPS = 4

export function PairVsTwoVectorsAnimation({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [step, setStep] = useState(0)
  const isEn = lang === "en"

  // 단계별 상태 결정
  // step 0: 초기 (둘 다 정렬 전)
  // step 1: 왼쪽만 scores 정렬 (names 그대로 → mismatch)
  // step 2: 왼쪽 그대로 + 오른쪽 pair 정렬 시작
  // step 3: 모두 정렬 완료 + 결론
  const leftSorted = step >= 1
  const rightSorted = step >= 2
  const showLeftBroken = step >= 1
  const showRightOk = step >= 2
  const showConclusion = step >= 3

  const leftScores = leftSorted ? [78, 88, 95] : [78, 95, 88]
  const leftNames = ["Kim", "Lee", "Park"] // 항상 그대로
  const rightData = rightSorted ? SORTED : INITIAL

  const stepCaption = (() => {
    if (step === 0) {
      return isEn
        ? "Two students stored two ways — left: separate vectors, right: vector of pairs."
        : "학생 데이터를 두 방식으로 저장했어요 — 왼쪽: 벡터 두 개, 오른쪽: pair 벡터 하나."
    }
    if (step === 1) {
      return isEn
        ? "Sort the left side's scores vector. names stays put → Kim ↔ 78 mismatch!"
        : "왼쪽 — scores 벡터만 정렬했어요. names 는 그대로 → Kim 자리에 78점이 와버렸어요. 짝이 깨짐!"
    }
    if (step === 2) {
      return isEn
        ? "Now sort the right side. The whole pair moves as one, so name and score stay paired."
        : "오른쪽도 정렬했어요. pair 가 통째로 이동하니까 이름과 점수가 절대 분리되지 않아요."
    }
    return isEn
      ? "Bottom line: bundle related data as a pair → sort never breaks the link."
      : "결론: 같이 다루는 데이터는 pair 로 묶기. 정렬해도 짝이 절대 안 깨져요."
  })()

  return (
    <div className="space-y-3 select-none">
      {/* 상단 안내 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          {isEn ? `Step ${step + 1} / ${TOTAL_STEPS}` : `${step + 1} / ${TOTAL_STEPS} 단계`}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === step ? 18 : 7,
                height: 7,
                background: i === step ? "#6366f1" : i < step ? "#6366f155" : "#e2e8f0",
              }}
            />
          ))}
        </div>
      </div>

      {/* 단계 라벨 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-900 leading-relaxed"
        >
          {stepCaption}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3 bg-white rounded-xl p-3 border-2 border-slate-200">
        {/* 왼쪽: 두 vector */}
        <div className="space-y-2">
          <div className="text-center">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              {isEn ? "❌ Two separate vectors" : "❌ 벡터 2 개 따로"}
            </span>
          </div>

          {/* names */}
          <div className="space-y-1">
            <div className="text-[10px] text-gray-400 font-mono text-center">names</div>
            {leftNames.map((name, i) => (
              <div key={i} className="flex items-center justify-center">
                <div
                  className={cn(
                    "w-full py-1.5 px-2 rounded text-center text-xs font-bold text-white",
                    INITIAL.find((d) => d.name === name)?.color ?? "bg-gray-400"
                  )}
                >
                  {name}
                </div>
              </div>
            ))}
          </div>

          {/* 연결 상태 */}
          <div className="flex items-center justify-center">
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded font-bold transition-all",
                showLeftBroken
                  ? "text-rose-600 bg-rose-50 border border-rose-300"
                  : "text-emerald-600 bg-emerald-50 border border-emerald-200"
              )}
            >
              {showLeftBroken
                ? isEn
                  ? "😱 Link broken!"
                  : "😱 연결 끊김!"
                : isEn
                ? "linked"
                : "연결됨"}
            </span>
          </div>

          {/* scores */}
          <div className="space-y-1">
            <div className="text-[10px] text-gray-400 font-mono text-center">scores</div>
            <AnimatePresence mode="popLayout">
              {leftScores.map((score, i) => {
                const origColor = INITIAL.find((d) => d.score === score)?.color ?? "bg-gray-400"
                const nameColor = INITIAL.find((d) => d.name === leftNames[i])?.color ?? "bg-gray-400"
                const mismatch = leftSorted && origColor !== nameColor
                return (
                  <motion.div
                    key={score}
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <div
                      className={cn(
                        "w-full py-1.5 px-2 rounded text-center text-xs font-bold text-white relative",
                        mismatch ? "bg-rose-500 ring-2 ring-rose-300" : origColor
                      )}
                    >
                      {isEn ? score : `${score}점`}
                      {mismatch && (
                        <span className="absolute -top-1 -right-1 text-[8px] bg-rose-700 text-white rounded-full px-1">
                          ❌
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {showLeftBroken && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-rose-700 text-center bg-rose-50 rounded p-1.5 border border-rose-200"
            >
              {isEn ? (
                <>
                  78 = Kim? Lee?
                  <br />
                  Can&apos;t tell! 😱
                </>
              ) : (
                <>
                  78점 = Kim? Lee?
                  <br />알 수 없어요! 😱
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* 오른쪽: pair 묶음 */}
        <div className="space-y-2">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isEn ? "✅ vector of pairs" : "✅ pair 로 묶기"}
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
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex items-center justify-center"
                >
                  <div
                    className={cn(
                      "w-full py-1.5 px-2 rounded text-center text-xs font-bold text-white flex items-center justify-center gap-1",
                      item.color
                    )}
                  >
                    <span>{isEn ? item.score : `${item.score}점`}</span>
                    <span className="opacity-60">·</span>
                    <span>{item.name}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center">
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded font-bold transition-all",
                showRightOk
                  ? "text-emerald-600 bg-emerald-50 border border-emerald-300"
                  : "text-slate-500 bg-slate-50 border border-slate-200"
              )}
            >
              {isEn ? "Always move together 🔗" : "항상 함께 이동 🔗"}
            </span>
          </div>

          {showRightOk && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-emerald-700 text-center bg-emerald-50 rounded p-1.5 border border-emerald-200"
            >
              {isEn ? (
                <>
                  78 = Kim ✓
                  <br />
                  Link never broke! 🎉
                </>
              ) : (
                <>
                  78점 = Kim ✓
                  <br />
                  연결 안 끊겨요! 🎉
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-slate-600 bg-white border-2 border-slate-200 disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          {isEn ? "Prev" : "이전"}
        </button>

        <button
          onClick={() => setStep(0)}
          aria-label="reset"
          className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
          disabled={step === TOTAL_STEPS - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 transition-all"
        >
          {isEn ? "Next" : "다음"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 결론 (마지막 단계에서만) */}
      {showConclusion && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-violet-50 rounded-xl p-3 border border-violet-200"
        >
          <p className="text-xs text-violet-800 text-center leading-relaxed">
            {isEn ? (
              <>
                <strong>Key idea:</strong> Bundle related data as a <code>pair</code>.
                <br />
                Sorting never breaks the link. 🔗
              </>
            ) : (
              <>
                <strong>핵심:</strong> 같이 다루는 데이터는 <code>pair</code> 로 묶기.
                <br />
                정렬해도 짝이 안 깨져요. 🔗
              </>
            )}
          </p>
        </motion.div>
      )}
    </div>
  )
}
