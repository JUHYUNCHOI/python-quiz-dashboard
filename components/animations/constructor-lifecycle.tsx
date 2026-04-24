"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { highlightCpp } from "@/components/ui/code-block"

// ──────────────────────────────────────────────────────────────
// ConstructorLifecycle
// 3-way 탭: 생성자 없음 / Python 스타일 (바디 대입) / C++ 권장 (이니셜라이저 리스트)
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

type Actor = "cpp" | "code" | "none"

function Column({
  title,
  subtitle,
  stepCountLabel,
  code,
  caption,
  fields,
  highlight,
  actor,
  operations,
  lang,
}: {
  title: string
  subtitle: string
  stepCountLabel: string
  code: string
  caption: string
  fields: Array<{ name: string; value: string; state: FieldState }>
  highlight: "neutral" | "active" | "done" | "danger"
  actor: Actor
  operations: string[]
  lang: "ko" | "en"
}) {
  const isEn = lang === "en"
  const actorLabel = actor === "cpp"
    ? (isEn ? "🤖 C++ is doing (hidden):" : "🤖 C++ 가 하는 일 (숨어서):")
    : actor === "code"
      ? (isEn ? "✏️ Your code is doing:" : "✏️ 너의 코드가 하는 일:")
      : null
  const actorBg = actor === "cpp"
    ? "bg-violet-500/10 border-violet-400/40"
    : actor === "code"
      ? "bg-sky-500/10 border-sky-400/40"
      : "bg-slate-800/30 border-slate-700/60"
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

      {/* 누가 뭘 하고 있는지 — 핵심 메커니즘 표시 */}
      {operations.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${actor}-${operations.join()}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={cn("rounded-lg border px-3 py-2", actorBg)}
          >
            {actorLabel && (
              <div className="text-[10px] font-bold text-slate-200 mb-1.5 uppercase tracking-wide">
                {actorLabel}
              </div>
            )}
            <div className="font-mono text-[11px] leading-snug text-slate-100 space-y-0.5">
              {operations.map((op, i) => (
                <div key={i}>→ {op}</div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

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
      actor: "none" as Actor,
      operations: [],
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
      actor: "cpp" as Actor,
      operations: isEn
        ? [
            "string owner{}            // default construct → \"\"",
            "double balance            // uninitialized → garbage",
          ]
        : [
            "string owner{}            // 기본 생성자 → 빈 \"\"",
            "double balance            // 초기화 안 됨 → 쓰레기값",
          ],
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
      actor: "none" as Actor,
      operations: isEn
        ? ["(no body to run — nobody fixes the garbage)"]
        : ["(실행할 바디 없음 — 아무도 쓰레기값을 고치지 않음)"],
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
        ? "BankAccount acc(\"kim\", 1000); called. About to run the constructor."
        : "BankAccount acc(\"kim\", 1000); 호출됨. 생성자 실행 직전.",
      highlight: "neutral" as const,
      actor: "none" as Actor,
      operations: [],
    },
    {
      fields: [
        { name: "owner", value: '""', state: "empty" as FieldState },
        { name: "balance", value: "??? garbage", state: "garbage" as FieldState },
      ],
      caption: isEn
        ? "BEFORE the body even starts, C++ silently default-constructs every member. This hidden step always happens for body-assignment style."
        : "바디 실행 직전에 C++ 가 **숨어서** 모든 멤버를 기본값으로 먼저 만들어요. 바디 대입 방식에는 이 숨은 단계가 항상 있어요.",
      highlight: "active" as const,
      actor: "cpp" as Actor,
      operations: isEn
        ? [
            "string owner{}            // default construct → \"\"",
            "double balance            // uninitialized → garbage",
          ]
        : [
            "string owner{}            // 기본 생성자 실행 → 빈 \"\"",
            "double balance            // 초기화 안 됨 → 쓰레기값",
          ],
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "NOW the body runs. Your = statements overwrite the members. Total: 2 operations per member (construct + assign)."
        : "이제 바디가 실행돼요. 네가 쓴 = 문장이 멤버를 덮어써요. 멤버당 2번 작업 (생성 + 대입).",
      highlight: "done" as const,
      actor: "code" as Actor,
      operations: isEn
        ? [
            "owner = name;             // \"\" → \"kim\"   (overwrite)",
            "balance = initial;        // garbage → 1000 (overwrite)",
          ]
        : [
            "owner = name;             // \"\" → \"kim\"   (덮어쓰기)",
            "balance = initial;        // 쓰레기값 → 1000 (덮어쓰기)",
          ],
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
        ? "BankAccount acc(\"kim\", 1000); called. The initializer list tells C++ exactly what values to build with."
        : "BankAccount acc(\"kim\", 1000); 호출됨. 이니셜라이저 리스트가 \"이 값으로 만들어라\" 고 C++ 에게 알려줘요.",
      highlight: "neutral" as const,
      actor: "none" as Actor,
      operations: [],
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "C++ constructs members DIRECTLY with the values you gave. No default-construct step. 1 operation per member."
        : "C++ 가 네가 준 값으로 멤버를 **바로** 만들어요. 기본값 단계가 없어요. 멤버당 1번 작업.",
      highlight: "done" as const,
      actor: "cpp" as Actor,
      operations: isEn
        ? [
            "string owner{name}        // construct with \"kim\"",
            "double balance{initial}   // construct with 1000",
          ]
        : [
            "string owner{name}        // \"kim\" 으로 바로 생성",
            "double balance{initial}   // 1000 으로 바로 생성",
          ],
    },
    {
      fields: [
        { name: "owner", value: '"kim"', state: "done" as FieldState },
        { name: "balance", value: "1000", state: "done" as FieldState },
      ],
      caption: isEn
        ? "Body {} is empty — nothing to run. Members already correct."
        : "바디 {} 비어있음 — 실행할 게 없어요. 멤버는 이미 올바른 값.",
      highlight: "done" as const,
      actor: "none" as Actor,
      operations: isEn
        ? ["(empty body — nothing to do)"]
        : ["(빈 바디 — 할 일 없음)"],
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
      (born empty → write values). <span className="text-emerald-300 font-semibold">C++ recommended</span> (initializer list)
      does 1 thing (born with values). That's why <code className="text-emerald-300">const</code> and reference
      members — which can't be "overwritten later" — only work with the C++ recommended way.
    </>
  ) : (
    <>
      <span className="text-amber-300 font-semibold">Python 스타일</span> (바디 대입) 은 일이 2번 일어나요
      (빈 상태로 태어남 → 값 덮어쓰기). <span className="text-emerald-300 font-semibold">C++ 권장</span> (이니셜라이저
      리스트) 은 한 번이면 끝 (태어날 때 이미 값이 있음). 그래서 "나중에 바꿀 수 없는"{" "}
      <code className="text-emerald-300">const</code> 와 reference 멤버는 C++ 권장 방식만 가능해요.
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
                : (isEn ? "C++ recommended ⭐" : "C++ 권장 ⭐")
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
              actor={noneByStep[step].actor}
              operations={noneByStep[step].operations}
              lang={lang}
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
              actor={afterByStep[step].actor}
              operations={afterByStep[step].operations}
              lang={lang}
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
              title={isEn ? "C++ recommended (initializer list) ⭐" : "C++ 권장 — 이니셜라이저 리스트 ⭐"}
              subtitle={isEn ? ": member(value) list · 1 step (the style real C++ code uses)" : ": 뒤에 멤버(값) 형식 · 1단계 (실무 C++ 이 주로 쓰는 방식)"}
              stepCountLabel={isEn ? "1 step" : "1단계"}
              code={whileCode}
              fields={whileByStep[step].fields}
              caption={whileByStep[step].caption}
              highlight={whileByStep[step].highlight}
              actor={whileByStep[step].actor}
              operations={whileByStep[step].operations}
              lang={lang}
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
