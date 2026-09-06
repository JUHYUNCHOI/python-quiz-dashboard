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
   ⚠️ 화면 글자는 반드시 lang 을 타야 한다. 2026-09-06 python-qa 가
      첫 판에서 이걸 잡았다 — lang 을 받기만 하고 안 써서, 영어 트랙
      학생(data/lesson34-en.ts ch3-2b)이 이 스텝만 한국어를 보고 있었다.
      같은 결함이 pySplitJoinVisualizer·mapFactory 에도 남아 있다.
   ============================================================ */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const KO = { wordBreak: "keep-all" as const, textWrap: "balance" as const }

const NUMS = [1, 2, 3]

type Lang = "ko" | "en"
type RuleId = "double" | "square"

/* 함수 이름은 레슨 파일과 글자까지 맞춘다 —
   ko: 전부/숫자들/규칙, en: apply_all/numbers/rule */
const T = {
  ko: {
    pick: "건네줄 규칙 카드",
    slot: "규칙 구멍",
    empty: "비어 있어요",
    fn: "전부",
    param: "숫자들",
    rule: "규칙",
    result: "결과",
    call: "규칙",
    prev: "이전 단계",
    next: "다음 단계",
    reset: "처음으로",
    labels: { double: "두 배로", square: "제곱으로" },
    /* 한 단계에 한 문장만. 길어지면 학생이 안 읽는다. */
    beats: [
      "함수 `전부` 는 재료를 **둘** 받아요 — 숫자들, 그리고 **규칙**.",
      "규칙 구멍에 **함수 카드**를 끼웠어요. 숫자가 아니라 함수예요.",
      "숫자 하나가 규칙 카드를 **통과**하면 결과가 하나 나와요.",
      "나머지도 똑같이 통과시키면 끝! 이게 함수가 돌려주는 답이에요.",
      "이제 **규칙 카드만 갈아 끼워** 보세요. `전부` 는 한 글자도 안 고쳤어요.",
    ],
  },
  en: {
    pick: "Rule card to hand over",
    slot: "rule slot",
    empty: "empty",
    fn: "apply_all",
    param: "numbers",
    rule: "rule",
    result: "result",
    call: "rule",
    prev: "previous step",
    next: "next step",
    reset: "back to start",
    labels: { double: "Double it", square: "Square it" },
    beats: [
      "`apply_all` takes **two** ingredients — the numbers, and a **rule**.",
      "We slid a **function card** into the rule slot. Not a number — a function.",
      "One number **passes through** the rule card and comes out changed.",
      "Send the rest through the same way. That's what the function returns.",
      "Now **swap only the rule card**. `apply_all` didn't change one character.",
    ],
  },
} as const

const RULES: Record<RuleId, { code: string; fn: (n: number) => number }> = {
  double: { code: "lambda n: n * 2", fn: (n) => n * 2 },
  square: { code: "lambda n: n ** 2", fn: (n) => n ** 2 },
}

export function PyRuleSwapper({ lang = "ko" }: { lang?: Lang }) {
  const [rule, setRule] = useState<RuleId>("double")
  const [step, setStep] = useState(0)
  const t = T[lang] ?? T.ko
  const last = t.beats.length - 1

  const r = RULES[rule]
  const slotted = step >= 1                                   // 규칙 카드가 구멍에 꽂혔나
  const done = step >= 3 ? NUMS.length : step >= 2 ? 1 : 0    // 통과한 숫자 개수

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5">
      {/* 규칙 카드 고르기 */}
      <div className="mb-1 text-center text-xs font-bold text-indigo-700" style={KO}>
        {t.pick}
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
            🎁 {t.labels[k]}
          </button>
        ))}
      </div>

      {/* 지금 부르는 코드 */}
      <div className="mb-4 flex justify-center">
        <code className="rounded-lg bg-gray-800 px-3 py-1.5 text-left text-sm text-yellow-300">
          {t.fn}([1, 2, 3], {slotted ? r.code : "___"})
        </code>
      </div>

      {/* 무대 */}
      <div className="mb-4 rounded-xl border-2 border-gray-200 bg-white p-5">
        {/* 함수 상자 — 몸통은 절대 안 바뀐다는 걸 보여준다 */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3 font-mono text-[13px] leading-relaxed text-gray-700">
          <div>
            def {t.fn}({t.param}, <span className="font-bold text-indigo-600">{t.rule}</span>):
          </div>
          <div className="pl-4">{t.result} = []</div>
          <div className="pl-4">for n in {t.param}:</div>
          <div className="pl-8">
            {t.result}.append(
            <span className={slotted ? "rounded bg-yellow-200 font-bold text-yellow-900" : ""}>
              {t.rule}(n)
            </span>
            )
          </div>
          <div className="pl-4">return {t.result}</div>
        </div>

        {/* 규칙 구멍 */}
        <div className="mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <span className="whitespace-nowrap text-sm font-bold text-gray-500">{t.slot}</span>
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
                  {t.empty}
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
                <span
                  className={`whitespace-nowrap text-sm ${passed ? "text-indigo-500" : "text-gray-300"}`}
                >
                  ─ {t.call} ▶
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
            {t.result} ={" "}
            <span className="font-bold text-indigo-700">
              [{NUMS.slice(0, done).map((n) => r.fn(n)).join(", ")}
              {done && done < NUMS.length ? ", …" : ""}]
            </span>
          </span>
        </div>
      </div>

      {/* 말풍선 */}
      <div
        className="mb-4 min-h-[52px] rounded-xl border-2 border-indigo-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-800"
        style={KO}
      >
        {t.beats[step].split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((x, i) =>
          x.startsWith("**") ? (
            <strong key={i} className="text-indigo-700">{x.slice(2, -2)}</strong>
          ) : x.startsWith("`") ? (
            <code key={i} className="rounded bg-gray-100 px-1 font-mono text-[14px] text-gray-800">
              {x.slice(1, -1)}
            </code>
          ) : (
            <span key={i}>{x}</span>
          )
        )}
      </div>

      {/* ◀ ▶ — 자동재생 없음 */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg bg-white p-2 text-indigo-700 shadow disabled:opacity-30"
          aria-label={t.prev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-mono text-sm text-gray-600">
          {step + 1} / {t.beats.length}
        </span>
        <button
          onClick={() => setStep((s) => Math.min(last, s + 1))}
          disabled={step === last}
          className="rounded-lg bg-white p-2 text-indigo-700 shadow disabled:opacity-30"
          aria-label={t.next}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setStep(0)}
          className="ml-2 rounded-lg bg-white p-2 text-gray-500 shadow"
          aria-label={t.reset}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
