"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────────────────────
// ConstructorLifecycle
// 바디 대입 vs 이니셜라이저 리스트 — 멤버가 언제 값을 갖는지 나란히 단계별 비교
// ──────────────────────────────────────────────────────────────

interface Props {
  lang?: "ko" | "en"
}

type FieldState = "empty" | "garbage" | "active" | "done"

function Field({
  name,
  value,
  state,
}: {
  name: string
  value: string
  state: FieldState
}) {
  const styles: Record<FieldState, string> = {
    empty: "bg-slate-700/60 text-slate-400 border-slate-600/40",
    garbage: "bg-red-500/20 text-red-300 border-red-500/40",
    active: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    done: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  }
  return (
    <motion.div
      layout
      className="flex items-center justify-between gap-3 py-0.5"
    >
      <span className="text-slate-400 text-xs font-mono">{name}</span>
      <motion.span
        key={`${name}-${state}-${value}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "px-2 py-0.5 rounded-md text-xs font-mono font-semibold border",
          styles[state],
        )}
      >
        {value}
      </motion.span>
    </motion.div>
  )
}

function Column({
  title,
  stepCountLabel,
  code,
  caption,
  fields,
  highlight,
}: {
  title: string
  stepCountLabel: string
  code: string
  caption: string
  fields: Array<{ name: string; value: string; state: FieldState }>
  highlight: "neutral" | "active" | "done"
}) {
  const borderByHighlight = {
    neutral: "border-slate-700",
    active: "border-amber-400/60 shadow-lg shadow-amber-500/10",
    done: "border-emerald-400/60 shadow-lg shadow-emerald-500/10",
  }[highlight]

  return (
    <div className={cn(
      "flex flex-col gap-3 rounded-2xl border bg-slate-900/60 p-4 transition-colors",
      borderByHighlight,
    )}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-slate-100">{title}</div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {stepCountLabel}
        </span>
      </div>

      <pre className="rounded-lg bg-slate-800/70 border border-slate-700 px-3 py-2 text-[11px] leading-relaxed text-slate-200 font-mono overflow-x-auto">
{code}
      </pre>

      <div className="rounded-lg bg-slate-800/40 border border-slate-700/60 px-3 py-2.5 min-h-[84px]">
        {fields.map(f => (
          <Field key={f.name} {...f} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={caption}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-xs text-slate-300 leading-relaxed"
        >
          {caption}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export function ConstructorLifecycle({ lang = "ko" }: Props) {
  const isEn = lang === "en"
  const [step, setStep] = useState(0)

  // Step 0: 호출 직전
  // Step 1: 멤버 "태어남"
  // Step 2: 값 최종 확정
  const stepLabels = isEn
    ? ["Call", "Birth", "Final"]
    : ["호출", "탄생", "완료"]

  // Body assignment: step 0 = 호출만, step 1 = 빈값으로 생성, step 2 = 대입 완료
  const bodyByStep = [
    {
      fields: [
        { name: "owner", value: "—", state: "empty" as FieldState },
        { name: "balance", value: "—", state: "empty" as FieldState },
      ],
      caption: isEn
        ? "About to enter the constructor body."
        : "생성자 바디에 진입하기 직전.",
      highlight: "neutral" as const,
    },
    {
      fields: [
        { name: "owner", value: '""', state: "empty" as FieldState },
        { name: "balance", value: "??? garbage", state: "garbage" as FieldState },
      ],
      caption: isEn
        ? "Step 1: Members are default-constructed first. owner = \"\", balance = garbage."
        : "1단계: 멤버들이 먼저 기본값으로 태어나요. owner = \"\", balance = 쓰레기값.",
      highlight: "active" as const,
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "Step 2: Body runs assignments. Members are OVERWRITTEN with the desired values. 2 things happened."
        : "2단계: 바디에서 대입을 실행해요. 멤버들을 원하는 값으로 덮어써요. 일이 2번 일어났어요.",
      highlight: "done" as const,
    },
  ]

  // Initializer list: step 0 = 호출만, step 1 = 처음부터 원하는 값으로, step 2 = 같음 (done)
  const listByStep = [
    {
      fields: [
        { name: "owner", value: "—", state: "empty" as FieldState },
        { name: "balance", value: "—", state: "empty" as FieldState },
      ],
      caption: isEn
        ? "About to construct with the initializer list."
        : "이니셜라이저 리스트로 생성 직전.",
      highlight: "neutral" as const,
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "Step 1: Members are born DIRECTLY with the desired values. Done in 1 step."
        : "1단계: 멤버들이 처음부터 원하는 값으로 태어나요. 한 번에 끝.",
      highlight: "done" as const,
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "(No step 2 needed — members already have correct values.)"
        : "(2단계 없음 — 멤버가 이미 올바른 값을 가지고 있어요.)",
      highlight: "done" as const,
    },
  ]

  const bodyCode = `BankAccount(name, initial) {
    owner = name;
    balance = initial;
}`

  const listCode = `BankAccount(name, initial)
    : owner(name), balance(initial) {}`

  const summary = isEn ? (
    <>
      <span className="text-amber-300 font-semibold">Body assignment</span> does 2 things
      (default-construct → overwrite). <span className="text-emerald-300 font-semibold">Initializer list</span> does
      1 thing (construct with the final value). That's why <code className="text-emerald-300">const</code> and
      reference members — which can't be "overwritten later" — <em>require</em> the list.
    </>
  ) : (
    <>
      <span className="text-amber-300 font-semibold">바디 대입</span>은 2번 일해요
      (기본생성 → 덮어쓰기). <span className="text-emerald-300 font-semibold">이니셜라이저 리스트</span>는
      1번이면 끝 (처음부터 최종값으로 생성). 그래서 "나중에 덮어쓰기"가 불가능한
      <code className="text-emerald-300"> const</code>와 reference 멤버는 리스트가 필수예요.
    </>
  )

  return (
    <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
      {/* 헤더 */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100">
          {isEn ? "Constructor Lifecycle — side by side" : "생성자 생애주기 — 두 방식 비교"}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {isEn
            ? "BankAccount acc(\"kim\", 1000); — watch when members get their values."
            : "BankAccount acc(\"kim\", 1000); — 멤버가 언제 값을 갖는지 지켜봐요."}
        </p>
      </div>

      {/* 스텝 버튼 */}
      <div className="flex gap-1.5 mb-4">
        {stepLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={cn(
              "flex-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all",
              step === i
                ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            )}
          >
            {`${i + 1}. ${label}`}
          </button>
        ))}
      </div>

      {/* 2열 비교 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Column
          title={isEn ? "Method 1: Body assignment" : "방법 1: 바디 대입"}
          stepCountLabel={isEn ? "2 steps" : "2단계"}
          code={bodyCode}
          fields={bodyByStep[step].fields}
          caption={bodyByStep[step].caption}
          highlight={bodyByStep[step].highlight}
        />
        <Column
          title={isEn ? "Method 2: Initializer list" : "방법 2: 이니셜라이저 리스트"}
          stepCountLabel={isEn ? "1 step" : "1단계"}
          code={listCode}
          fields={listByStep[step].fields}
          caption={listByStep[step].caption}
          highlight={listByStep[step].highlight}
        />
      </div>

      {/* 요약 */}
      <div className="mt-4 rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-3 text-xs text-slate-300 leading-relaxed">
        💡 {summary}
      </div>

      {/* 이전/다음 */}
      <div className="flex justify-between mt-3">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← {isEn ? "Prev" : "이전"}
        </button>
        <button
          onClick={() => setStep(s => Math.min(stepLabels.length - 1, s + 1))}
          disabled={step === stepLabels.length - 1}
          className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isEn ? "Next" : "다음"} →
        </button>
      </div>
    </div>
  )
}

export default ConstructorLifecycle
