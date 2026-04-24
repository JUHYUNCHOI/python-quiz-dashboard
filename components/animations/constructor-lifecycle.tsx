"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { highlightCpp } from "@/components/ui/code-block"

// ──────────────────────────────────────────────────────────────
// ConstructorLifecycle
// 3-way 탭: 생성자 없음 / Python 스타일 (바디 대입) / C++ 표준 (이니셜라이저 리스트)
// 한 번에 하나만 표시 (집중도). 각 방식에서 멤버가 언제 값을 갖는지 시각화.
// ──────────────────────────────────────────────────────────────

interface Props {
  lang?: "ko" | "en"
}

type FieldState = "empty" | "garbage" | "active" | "done"
type Mode = "none" | "after" | "while"

// 랜덤 쓰레기값 생성 (garbage 상태일 때 숫자 필드에 계속 바뀌는 값 표시)
function useGarbageNumber(active: boolean, seed: number) {
  const [n, setN] = useState(() => Math.floor(1e7 + Math.random() * 9e7))
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setN(Math.floor(1e7 + Math.random() * 9e7))
    }, 150)
    return () => clearInterval(id)
  }, [active, seed])
  return n
}

function Field({
  name,
  value,
  state,
}: {
  name: string
  value: string
  state: FieldState
}) {
  const isGarbageNumber = state === "garbage" && value.includes("garbage")
  const garbageN = useGarbageNumber(isGarbageNumber, 0)
  const display = isGarbageNumber ? `${garbageN} ⚠` : value

  const styles: Record<FieldState, string> = {
    empty: "bg-slate-700/60 text-slate-400 border-slate-600/40",
    garbage: "bg-red-500/30 text-red-100 border-red-500/60",
    active: "bg-amber-500/20 text-amber-200 border-amber-400/40",
    done: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
  }
  return (
    <motion.div layout className="flex items-center justify-between gap-3 py-0.5">
      <span className="text-slate-400 text-xs font-mono">{name}</span>
      <motion.span
        key={`${name}-${state}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          state === "garbage"
            ? { opacity: 1, scale: 1, x: [0, -1.5, 1.5, -1, 1, 0] }
            : { opacity: 1, scale: 1 }
        }
        transition={
          state === "garbage"
            ? { x: { repeat: Infinity, repeatType: "loop", duration: 0.5, ease: "easeInOut" } }
            : {}
        }
        className={cn(
          "px-2 py-0.5 rounded-md text-xs font-mono font-semibold border",
          styles[state],
        )}
      >
        {display}
      </motion.span>
    </motion.div>
  )
}

function Column({
  title,
  subtitle,
  stepCountLabel,
  code,
  caption,
  fields,
  highlight,
}: {
  title: string
  subtitle: string
  stepCountLabel: string
  code: string
  caption: string
  fields: Array<{ name: string; value: string; state: FieldState }>
  highlight: "neutral" | "active" | "done" | "danger"
}) {
  const boxByHighlight = {
    neutral: "border-slate-700 bg-slate-900/60",
    active: "border-amber-400/60 bg-slate-900/60 shadow-lg shadow-amber-500/10",
    done: "border-emerald-400/60 bg-slate-900/60 shadow-lg shadow-emerald-500/10",
    danger: "border-red-500/70 bg-red-950/40 shadow-lg shadow-red-500/20",
  }[highlight]

  const countLabelStyle = highlight === "danger"
    ? "bg-red-500/25 text-red-200 border border-red-400/50 px-1.5 py-0.5 rounded font-bold"
    : "text-slate-400"

  return (
    <div className={cn(
      "flex flex-col gap-3 rounded-2xl border p-4 transition-colors",
      boxByHighlight,
    )}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-slate-100">{title}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>
        </div>
        <span className={cn("text-[10px] font-semibold uppercase tracking-wide shrink-0", countLabelStyle)}>
          {highlight === "danger" ? `⚠️ ${stepCountLabel}` : stepCountLabel}
        </span>
      </div>

      <div className="rounded-lg bg-slate-800/70 border border-slate-700 px-3 py-2 text-[12px] leading-relaxed font-mono overflow-x-auto whitespace-pre">
        {highlightCpp(code, true)}
      </div>

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
  const [mode, setMode] = useState<Mode>("after")
  const [step, setStep] = useState(0)

  // 탭별로 "각 단계에서 실제로 뭐가 일어나는지" 를 라벨에 담아서 명확하게
  const stepLabelsByMode: Record<Mode, string[]> = isEn
    ? {
        none: ["Create object", "Members born w/ garbage", "Stuck forever"],
        after: ["Call constructor", "Members born empty", "Body writes values"],
        while: ["Call constructor", "Born with values", "(no step 2)"],
      }
    : {
        none: ["객체 만들기", "멤버 탄생 (쓰레기값)", "영원히 이 상태"],
        after: ["생성자 호출", "멤버 탄생 (빈값)", "바디에서 값 덮어씀"],
        while: ["생성자 호출", "원하는 값으로 바로 탄생", "(2단계 없음)"],
      }
  const stepLabels = stepLabelsByMode[mode]

  // ─────────────────────────────────────────────────────────────
  // "없음" 모드 — 생성자 없을 때
  // ─────────────────────────────────────────────────────────────
  const noneByStep = [
    {
      fields: [
        { name: "owner", value: "—", state: "empty" as FieldState },
        { name: "balance", value: "—", state: "empty" as FieldState },
      ],
      caption: isEn
        ? "No constructor exists. About to create the object."
        : "생성자가 없는 상태. 객체 만들기 직전.",
      highlight: "neutral" as const,
    },
    {
      fields: [
        { name: "owner", value: '""', state: "garbage" as FieldState },
        { name: "balance", value: "??? garbage", state: "garbage" as FieldState },
      ],
      caption: isEn
        ? "Members are born with empty/garbage values because there's no constructor to set them."
        : "생성자가 없어서 멤버들이 빈값/쓰레기값으로 태어나요. 아무도 값을 넣어주지 않아요.",
      highlight: "danger" as const,
    },
    {
      fields: [
        { name: "owner", value: '""', state: "garbage" as FieldState },
        { name: "balance", value: "??? garbage", state: "garbage" as FieldState },
      ],
      caption: isEn
        ? "Stuck this way forever. Using this object would behave unpredictably — dangerous."
        : "영원히 이 상태. 이런 객체를 사용하면 예측 불가 — 위험해요.",
      highlight: "danger" as const,
    },
  ]

  // ─────────────────────────────────────────────────────────────
  // "있음" 모드 — 생성자 있을 때 (두 방식 비교)
  // ─────────────────────────────────────────────────────────────

  // 만들고 넣기 (= 로 대입): 2단계
  const afterByStep = [
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
        ? "Step 1: members are born first — with empty/garbage values."
        : "1단계: 멤버들이 먼저 빈값/쓰레기값으로 태어나요.",
      highlight: "active" as const,
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "Step 2: body runs, values are written in. Two things happened."
        : "2단계: 바디가 실행되면서 값이 들어가요. 일이 2번 일어났어요.",
      highlight: "done" as const,
    },
  ]

  // 만들면서 넣기 (: 이니셜라이저 리스트): 1단계
  const whileByStep = [
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
        ? "Step 1: members are born with the final values directly. Done in 1 step."
        : "1단계: 멤버들이 처음부터 원하는 값으로 태어나요. 한 번에 끝.",
      highlight: "done" as const,
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "(No step 2 needed — members already hold the correct values.)"
        : "(2단계 없음 — 멤버가 이미 올바른 값을 가지고 있어요.)",
      highlight: "done" as const,
    },
  ]

  const noneCode = `class BankAccount {
    string owner;
    double balance;
    // 생성자 없음
};

BankAccount acc;  // 생성자 없이 그냥 만듦`

  const afterCode = `BankAccount(string name, double initial) {
    owner = name;       // 만든 다음 값 넣기
    balance = initial;
}`

  const whileCode = `BankAccount(string name, double initial)
    : owner(name), balance(initial) {}`

  const summaryWith = isEn ? (
    <>
      <span className="text-amber-300 font-semibold">Python-style</span> (body assignment) does 2 things
      (born empty → write values). <span className="text-emerald-300 font-semibold">C++ standard</span> (initializer list)
      does 1 thing (born with values). That's why <code className="text-emerald-300">const</code> and reference
      members — which can't be "overwritten later" — only work with the C++ standard way.
    </>
  ) : (
    <>
      <span className="text-amber-300 font-semibold">Python 스타일</span> (바디 대입) 은 일이 2번 일어나요
      (빈 상태로 태어남 → 값 덮어쓰기). <span className="text-emerald-300 font-semibold">C++ 표준</span> (이니셜라이저
      리스트) 은 한 번이면 끝 (태어날 때 이미 값이 있음). 그래서 "나중에 바꿀 수 없는"{" "}
      <code className="text-emerald-300">const</code> 와 reference 멤버는 C++ 표준 방식만 가능해요.
    </>
  )

  const summaryNone = isEn ? (
    <>
      Without a constructor, members are born with garbage. Nothing ever sets them. Using the object is
      dangerous — you need a <span className="text-emerald-300 font-semibold">constructor</span> to give
      the members proper initial values.
    </>
  ) : (
    <>
      생성자가 없으면 멤버는 쓰레기값으로 태어나서 아무도 값을 넣어주지 않아요. 사용하면 위험 —{" "}
      <span className="text-emerald-300 font-semibold">생성자</span> 로 멤버에게 값을 줘야 해요.
    </>
  )

  return (
    <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
      {/* 헤더 — 제목 + 모드 탭 인라인 */}
      <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-base font-bold text-slate-100">
          {isEn ? "Constructor Lifecycle" : "생성자 생애주기 — 멤버에 값이 언제 들어가나?"}
        </h3>
        <div className="inline-flex gap-0.5 rounded-lg bg-slate-800/70 p-0.5 text-[11px]">
          {(["none", "after", "while"] as Mode[]).map(m => {
            const label = m === "none"
              ? (isEn ? "No constructor" : "생성자 없음")
              : m === "after"
                ? (isEn ? "Python-style" : "Python 스타일")
                : (isEn ? "C++ standard ⭐" : "C++ 표준 ⭐")
            return (
              <button
                key={m}
                onClick={() => { setMode(m); setStep(0) }}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap",
                  mode === m
                    ? "bg-slate-950 text-white"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
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

      {/* 컨텐츠 — 선택된 방식 하나만 큰 화면에 표시 */}
      <AnimatePresence mode="wait">
        {mode === "none" && (
          <motion.div
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Column
              title={isEn ? "No constructor" : "생성자 없음"}
              subtitle={isEn ? "members stay as garbage forever" : "멤버가 쓰레기값으로 영원히"}
              stepCountLabel={isEn ? "danger" : "위험"}
              code={noneCode}
              fields={noneByStep[step].fields}
              caption={noneByStep[step].caption}
              highlight={noneByStep[step].highlight}
            />
          </motion.div>
        )}
        {mode === "after" && (
          <motion.div
            key="after"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Column
              title={isEn ? "Python-style (body assignment)" : "Python 스타일 — 바디 대입"}
              subtitle={isEn ? "= assignment in body · 2 steps (familiar to Python learners)" : "= 로 { } 안에서 값 대입 · 2단계 (Python 의 self.x = y 와 비슷)"}
              stepCountLabel={isEn ? "2 steps" : "2단계"}
              code={afterCode}
              fields={afterByStep[step].fields}
              caption={afterByStep[step].caption}
              highlight={afterByStep[step].highlight}
            />
          </motion.div>
        )}
        {mode === "while" && (
          <motion.div
            key="while"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Column
              title={isEn ? "C++ standard (initializer list) ⭐" : "C++ 표준 — 이니셜라이저 리스트 ⭐"}
              subtitle={isEn ? ": member(value) list · 1 step (the style real C++ code uses)" : ": 뒤에 멤버(값) 형식 · 1단계 (실무 C++ 이 주로 쓰는 방식)"}
              stepCountLabel={isEn ? "1 step" : "1단계"}
              code={whileCode}
              fields={whileByStep[step].fields}
              caption={whileByStep[step].caption}
              highlight={whileByStep[step].highlight}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 요약 */}
      <div className="mt-4 rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-3 text-xs text-slate-300 leading-relaxed">
        💡 {mode === "none" ? summaryNone : summaryWith}
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
