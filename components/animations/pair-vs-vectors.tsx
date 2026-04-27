"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

// ====================================================================
// pair vs 두 vector 비교 — 단계별 진행
// 먼저 두 벡터 방식의 문제를 충분히 보여주고 → 그 다음 pair 등장
// ====================================================================

const INITIAL = [
  { name: "Kim", score: 78, color: "bg-orange-500" },
  { name: "Lee", score: 95, color: "bg-violet-600" },
  { name: "Park", score: 88, color: "bg-cyan-600" },
]

// 점수 오름차순 정렬: 78(Kim), 88(Park), 95(Lee)
const SORTED = [INITIAL[0], INITIAL[2], INITIAL[1]]

const TOTAL_STEPS = 6

export function PairVsTwoVectorsAnimation({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [step, setStep] = useState(0)
  const isEn = lang === "en"

  // 단계 시나리오
  // 0: 왼쪽 — 벡터 두 개, 짝 정상
  // 1: 왼쪽 scores 정렬 → 이름 그대로 → 깨짐 😱
  // 2: "고치려면 이름도 손으로 같은 순서로 옮겨야 해요" — names 도 정렬 (수동 노동)
  // 3: 오른쪽 pair 벡터 등장 (정렬 전)
  // 4: 오른쪽 정렬 → pair 한 덩어리 자동 이동 ✅
  // 5: 결론
  const leftSorted = step >= 1
  const namesAlsoSorted = step >= 2  // 수동 고생 단계
  const rightSorted = step >= 4
  const showLeftBroken = step === 1  // 깨짐은 1단계에서만
  const showLeftFixed = step === 2   // 고친 상태는 2단계에서만
  const showRight = step >= 3
  const showRightOk = step >= 4
  const showConclusion = step >= 5

  // 점수 정렬: [78, 95, 88] → [78, 88, 95]
  const leftScores = leftSorted ? [78, 88, 95] : [78, 95, 88]
  // 이름은 1단계에서 그대로, 2단계에서 점수에 맞춰 수동 정렬: Kim, Lee, Park → Kim, Park, Lee
  const leftNames = namesAlsoSorted ? ["Kim", "Park", "Lee"] : ["Kim", "Lee", "Park"]
  const rightData = rightSorted ? SORTED : INITIAL

  const stepCaption = (() => {
    if (step === 0) {
      return isEn
        ? "First, the common approach: store names and scores in two separate vectors. Same index = same student. Now properly paired."
        : "흔한 방법 — 이름 벡터, 점수 벡터를 따로 저장. 같은 인덱스가 같은 학생이에요. 지금은 잘 짝지어진 상태."
    }
    if (step === 1) {
      return isEn
        ? "Sort scores ascending. names doesn't move → Lee is now linked to 88, Park to 95. Pairing broke! 😱"
        : "점수 벡터를 오름차순으로 정렬했어요. 이름은 그대로 → Lee 자리에 88점, Park 자리에 95점 들어와버렸어요. 짝 깨짐 😱"
    }
    if (step === 2) {
      return isEn
        ? "To fix it, you'd have to MANUALLY reorder names in the matching order too. Tedious — and easy to forget!"
        : "짝을 다시 맞추려면 이름도 **손으로** 같은 순서대로 옮겨야 해요 (Kim, Park, Lee). 매번 신경 써야 하고, 깜빡하기 쉬워요!"
    }
    if (step === 3) {
      return isEn
        ? "Different approach — bundle name+score as a pair, then store one vector of pairs."
        : "다른 방법 — 이름과 점수를 pair 로 묶어서 한 벡터에 저장해봐요. 한 칸 = 한 학생."
    }
    if (step === 4) {
      return isEn
        ? "Sort by score. Each pair moves as ONE block — name and score travel together automatically. No manual fix needed!"
        : "점수 기준으로 정렬했어요. pair 한 덩어리가 통째로 이동 → 이름이 점수와 함께 자동으로 따라가요. 손댈 일 없음 ✅"
    }
    return isEn
      ? "Bottom line: bundle related data as a pair → sorting never breaks the link, no extra work."
      : "결론: 같이 다루는 데이터는 pair 로 묶기. 정렬해도 짝이 절대 안 깨지고, 추가 작업도 없어요."
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

      <div className="space-y-3 bg-white rounded-xl p-3 border-2 border-slate-200">
        {/* 위: 두 vector (가로 배치) */}
        <div className="space-y-2 rounded-lg p-2.5 border-2 border-rose-200">
          <div className="text-center">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              {isEn ? "❌ Two separate vectors" : "❌ 벡터 2 개 따로"}
            </span>
          </div>

          {/* names — 가로 */}
          <div className="space-y-0.5">
            <div className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
              <span>names</span>
              {showLeftFixed && (
                <span className="text-[9px] text-amber-600 bg-amber-50 px-1 rounded border border-amber-200">
                  {isEn ? "← manual sort" : "← 손으로 정렬"}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <AnimatePresence mode="popLayout">
                {leftNames.map((name) => (
                  <motion.div
                    key={name}
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex-1"
                  >
                    <div
                      className={cn(
                        "w-full py-2 px-2 rounded text-center text-xs font-bold text-white",
                        INITIAL.find((d) => d.name === name)?.color ?? "bg-gray-400"
                      )}
                    >
                      {name}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* scores — 가로 (names 와 같은 인덱스가 같은 학생 = 시각적으로 위/아래 정렬됨) */}
          <div className="space-y-0.5">
            <div className="text-[10px] text-gray-500 font-mono">scores</div>
            <div className="flex gap-1">
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
                      className="flex-1"
                    >
                      <div
                        className={cn(
                          "w-full py-2 px-2 rounded text-center text-xs font-bold text-white relative",
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
          </div>

          {/* 연결 상태 */}
          <div className="flex items-center justify-center">
            <span
              className={cn(
                "text-[10px] px-2 py-0.5 rounded font-bold transition-all",
                showLeftBroken
                  ? "text-rose-600 bg-rose-50 border border-rose-300"
                  : showLeftFixed
                  ? "text-amber-700 bg-amber-50 border border-amber-300"
                  : "text-emerald-600 bg-emerald-50 border border-emerald-200"
              )}
            >
              {showLeftBroken
                ? isEn
                  ? "😱 Index pairing broken!"
                  : "😱 같은 인덱스인데 짝이 깨짐!"
                : showLeftFixed
                ? isEn
                  ? "😮‍💨 fixed (manually)"
                  : "😮‍💨 겨우 맞춤 (손으로)"
                : isEn
                ? "✓ same index = same student"
                : "✓ 같은 인덱스 = 같은 학생"}
            </span>
          </div>

          {showLeftBroken && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-rose-700 text-center bg-rose-50 rounded p-1.5 border border-rose-200"
            >
              {isEn ? (
                <>
                  Lee was 95, now 88?
                  <br />
                  Wrong student! 😱
                </>
              ) : (
                <>
                  Lee 는 95 점이었는데
                  <br />
                  지금 88 점이 됐어요! 😱
                </>
              )}
            </motion.div>
          )}

          {showLeftFixed && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-amber-800 text-center bg-amber-50 rounded p-1.5 border border-amber-200"
            >
              {isEn ? (
                <>
                  Now matched, but you had to do it BY HAND.
                  <br />
                  Imagine 30 students. Or 3 vectors. 🥲
                </>
              ) : (
                <>
                  맞추긴 했지만 **손으로** 해야 했어요.
                  <br />
                  학생 30 명? 벡터 3 개? 너무 힘들어요 🥲
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* 아래: pair 묶음 (가로 배치) — step 2+ 부터 등장 */}
        {showRight && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-2 rounded-lg p-2.5 border-2 border-emerald-300"
          >
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isEn ? "✅ vector of pairs" : "✅ pair 로 묶기"}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="text-[10px] text-gray-500 font-mono">
              vector&lt;pair&lt;int,string&gt;&gt;
            </div>
            <div className="flex gap-1">
              <AnimatePresence mode="popLayout">
                {rightData.map((item) => (
                  <motion.div
                    key={item.name}
                    layout
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex-1"
                  >
                    <div
                      className={cn(
                        "w-full py-2 px-1 rounded text-center text-[11px] font-bold text-white flex flex-col items-center justify-center leading-tight",
                        item.color
                      )}
                    >
                      <span>{isEn ? item.score : `${item.score}점`}</span>
                      <span>{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
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
        </motion.div>
        )}
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
