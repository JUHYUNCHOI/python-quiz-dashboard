"use client"

/* ============================================================
   "규칙을 재료로 건네주기" 시뮬레이터  (레슨 34 ch3)

   왜 만들었나 — 2026-09-06:
   레슨34 ch3(sorted+key=lambda)가 레슨35와 중복이라 삭제됐다.
   그러자 ch2 에서 배운 람다를 레슨34 안에서 **써먹는 자리가
   사라졌다** — 문법만 배우고 왜 배웠는지는 안 나온 채 끝났다.
   그 자리를 이 시뮬이 채운다. 함수 몸통은 한 글자도 안 바뀌는데
   규칙 카드만 갈아 끼우면 결과가 통째로 달라지는 걸 **보게** 한다.

   ⚠️ 자동재생 없음. ◀ ▶ 로 학생이 직접 넘긴다.
   ⚠️ 탭을 바꿔도 단계를 되감지 않는다 — 마지막 단계에서 카드만
      갈아 끼워 보는 것이 이 시뮬의 핵심 장면이기 때문이다.
   ============================================================ */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const KO = { wordBreak: "keep-all" as const, textWrap: "balance" as const }

const NUMS = [1, 2, 3]

type RuleId = "double" | "square"

const RULES: Record<RuleId, { label: string; code: string; fn: (n: number) => number }> = {
  double: { label: "두 배로", code: "lambda n: n * 2", fn: (n) => n * 2 },
  square: { label: "제곱으로", code: "lambda n: n ** 2", fn: (n) => n ** 2 },
}

/* 한 단계에 한 문장만. 길어지면 학생이 안 읽는다. */
const BEATS = [
  "함수 `전부` 는 재료를 **둘** 받아요 — 숫자들, 그리고 **규칙**.",
  "규칙 구멍에 **함수 카드**를 끼웠어요. 숫자가 아니라 함수예요.",
  "숫자 하나가 규칙 카드를 **통과**하면 결과가 하나 나와요.",
  "나머지도 똑같이 통과시키면 끝! 이게 함수가 돌려주는 답이에요.",
  "이제 **규칙 카드만 갈아 끼워** 보세요. `전부` 는 한 글자도 안 고쳤어요.",
]

export function PyRuleSwapper({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [rule, setRule] = useState<RuleId>("double")
  const [step, setStep] = useState(0)
  const last = BEATS.length - 1

  const r = RULES[rule]
  const slotted = step >= 1                    // 규칙 카드가 구멍에 꽂혔나
  const done = step >= 3 ? NUMS.length : step >= 2 ? 1 : 0   // 통과한 숫자 개수

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5">
      {/* 규칙 카드 고르기 */}
      <div className="mb-1 text-center text-xs font-bold text-indigo-700" style={KO}>
        건네줄 규칙 카드
      </div>
      <div className="mb-4 flex justify-center gap-2">
        {(Object.keys(RULES) as RuleId[]).map((k) => (
          <button
            key={k}
            onClick={() => setRule(k)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              rule === k
                ? "bg-indigo-600 text-white shadow"
                : "bg-white text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            🎁 {RULES[k].label}
          </button>
        ))}
      </div>

      {/* 지금 부르는 코드 */}
      <div className="mb-4 flex justify-center">
        <code className="rounded-lg bg-gray-800 px-3 py-1.5 text-left text-sm text-yellow-300">
          전부([1, 2, 3], {slotted ? r.code : "___"})
        </code>
      </div>

      {/* 무대 */}
      <div className="mb-4 rounded-xl border-2 border-gray-200 bg-white p-5">
        {/* 함수 상자 — 몸통은 절대 안 바뀐다는 걸 보여준다 */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3 font-mono text-[13px] leading-relaxed text-gray-700">
          <div>def 전부(숫자들, <span className="font-bold text-indigo-600">규칙</span>):</div>
          <div className="pl-4">결과 = []</div>
          <div className="pl-4">for n in 숫자들:</div>
          <div className="pl-8">
            결과.append(
            <span className={slotted ? "rounded bg-yellow-200 font-bold text-yellow-900" : ""}>
              규칙(n)
            </span>
            )
          </div>
          <div className="pl-4">return 결과</div>
        </div>

        {/* 규칙 구멍 */}
        <div className="mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <span className="whitespace-nowrap text-sm font-bold text-gray-500">규칙 구멍</span>
          <div className="min-w-[190px] rounded-xl border-2 border-dashed border-indigo-300 p-2 text-center">
            <AnimatePresence mode="wait">
              {slotted ? (
                <motion.code
                  key={r.code}
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="block rounded-lg bg-indigo-600 px-3 py-1.5 font-mono text-sm font-bold text-white"
                >
                  {r.code}
                </motion.code>
              ) : (
                <motion.span key="empty" className="block py-1.5 text-sm text-gray-400">
                  비어 있어요
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 숫자가 규칙을 통과하는 줄 */}
        <div className="flex flex-col gap-2">
          {NUMS.map((n, i) => {
            const passed = i < done
            return (
              <div key={n} className="flex items-center justify-center gap-3">
                <span className="w-10 rounded-lg bg-gray-100 py-1 text-center font-mono text-base font-bold text-gray-800">
                  {n}
                </span>
                <span className={`text-sm ${passed ? "text-indigo-500" : "text-gray-300"}`}>
                  ─ 규칙 ▶
                </span>
                <motion.span
                  animate={{ opacity: passed ? 1 : 0.25, scale: passed ? 1 : 0.9 }}
                  className={`w-14 rounded-lg py-1 text-center font-mono text-base font-bold ${
                    passed ? "bg-green-100 text-green-800 ring-2 ring-green-300" : "bg-gray-50 text-gray-300"
                  }`}
                >
                  {passed ? r.fn(n) : "?"}
                </motion.span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 text-center">
          <span className="font-mono text-sm text-gray-600">
            결과 ={" "}
            <span className="font-bold text-indigo-700">
              [{NUMS.slice(0, done).map((n) => r.fn(n)).join(", ")}
              {done < NUMS.length ? (done ? ", …" : "") : ""}]
            </span>
          </span>
        </div>
      </div>

      {/* 말풍선 */}
      <div
        className="mb-4 min-h-[52px] rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-800"
        style={KO}
      >
        {BEATS[step].split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((t, i) =>
          t.startsWith("**") ? (
            <strong key={i} className="text-indigo-700">{t.slice(2, -2)}</strong>
          ) : t.startsWith("`") ? (
            <code key={i} className="rounded bg-gray-100 px-1 font-mono text-[14px] text-gray-800">
              {t.slice(1, -1)}
            </code>
          ) : (
            <span key={i}>{t}</span>
          )
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
          {step + 1} / {BEATS.length}
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
