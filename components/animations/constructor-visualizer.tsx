"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────────────────────
// ConstructorVisualizer
// 생성자 없을 때 vs 있을 때 vs 메서드 호출 비교 애니메이션
// ──────────────────────────────────────────────────────────────

interface Props {
  lang?: "ko" | "en"
}

// ── 멤버 필드 하나 ───────────────────────────────────────────
function Field({
  name,
  value,
  state = "normal",
  delay = 0,
}: {
  name: string
  value: string
  state?: "normal" | "garbage" | "active" | "done"
  delay?: number
}) {
  const valueStyle = {
    garbage: "bg-red-500/20 text-red-300 border border-red-500/30",
    active:  "bg-amber-500/20 text-amber-200 border border-amber-400/40",
    done:    "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40",
    normal:  "bg-slate-600/40 text-slate-200 border border-slate-500/30",
  }[state]

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between gap-3"
    >
      <span className="text-slate-400 text-xs font-mono">{name}</span>
      <span className={cn("px-2 py-0.5 rounded-md text-xs font-mono font-semibold", valueStyle)}>
        {value}
      </span>
    </motion.div>
  )
}

// ── 오브젝트 박스 ────────────────────────────────────────────
function ObjectBox({
  label,
  fields,
  borderColor = "border-slate-600",
}: {
  label: string
  fields: { name: string; value: string; state?: "normal" | "garbage" | "active" | "done" }[]
  borderColor?: string
}) {
  return (
    <div className={cn("rounded-xl border-2 p-3 bg-slate-800/60 min-w-[160px]", borderColor)}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">{label}</div>
      <div className="flex flex-col gap-1.5">
        {fields.map((f, i) => (
          <Field key={f.name} name={f.name} value={f.value} state={f.state} delay={i * 0.1} />
        ))}
      </div>
    </div>
  )
}

// ── 탭 ① 생성자 없음 ─────────────────────────────────────────
function TabNoConstructor({ lang }: { lang: string }) {
  const isEn = lang === "en"
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-800/60 rounded-xl p-3 font-mono text-sm text-slate-300 border border-slate-700">
        <span className="text-slate-500">// </span>
        <span className="text-sky-300">BankAccount</span>
        <span className="text-slate-200"> acc</span>
        <span className="text-slate-400">;</span>
        <span className="text-slate-500 ml-3">
          {isEn ? "// no constructor" : "// 생성자 없음"}
        </span>
      </div>

      <div className="flex items-start gap-4 flex-wrap">
        <ObjectBox
          label="acc"
          borderColor="border-red-500/60"
          fields={[
            { name: "owner",   value: "???",          state: "garbage" },
            { name: "balance", value: "-398475.23",   state: "garbage" },
          ]}
        />
        <div className="flex flex-col gap-1.5 justify-center">
          <span className="text-red-400 font-bold text-sm">
            😱 {isEn ? "Garbage values!" : "쓰레기 값!"}
          </span>
          <span className="text-slate-500 text-xs leading-relaxed">
            {isEn
              ? "Members have\nundefined behavior"
              : "초기화 안 하면\n예측 불가한 값 등장"}
          </span>
        </div>
      </div>

      <div className="rounded-lg bg-red-500/10 border border-red-500/25 px-3 py-2 text-xs text-red-300 leading-relaxed">
        ⚠️ {isEn
          ? "Without a constructor, member variables get random/garbage values at runtime!"
          : "생성자가 없으면 멤버 변수 초기값이 보장되지 않아요. 실행할 때마다 이상한 값이 나올 수 있어요!"}
      </div>
    </div>
  )
}

// ── 탭 ② 생성자 있음 ─────────────────────────────────────────
function TabWithConstructor({ lang }: { lang: string }) {
  const isEn = lang === "en"
  const [step, setStep] = useState(0)

  const steps = [
    isEn ? "Before" : "생성 전",
    isEn ? "Calling..." : "호출 중",
    isEn ? "Done!" : "완료!",
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-800/60 rounded-xl p-3 font-mono text-sm border border-slate-700">
        <div className="text-slate-200">
          <span className="text-sky-300">BankAccount</span>
          <span className="text-slate-200"> acc</span>
          <span className="text-slate-400">(</span>
          <span className="text-amber-300">"김철수"</span>
          <span className="text-slate-400">, </span>
          <span className="text-green-300">1000</span>
          <span className="text-slate-400">);</span>
        </div>
        <div className="text-slate-500 text-xs mt-1">
          {isEn ? "// constructor called automatically!" : "// 생성자 자동 호출!"}
        </div>
      </div>

      {/* 스텝 버튼 */}
      <div className="flex gap-1.5">
        {steps.map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={cn(
              "flex-1 px-2 py-1.5 rounded-lg text-xs font-bold transition-all",
              step === i
                ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
                : "bg-slate-700 text-slate-400 hover:bg-slate-600"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 시각화 */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-2"
          >
            <ObjectBox
              label="acc"
              borderColor="border-slate-600"
              fields={[
                { name: "owner",   value: "...", state: "normal" },
                { name: "balance", value: "...", state: "normal" },
              ]}
            />
            <p className="text-xs text-slate-500">
              {isEn ? "Not initialized yet" : "아직 아무것도 없어요"}
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl px-3 py-2.5">
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1.5">
                {isEn ? "Arguments" : "인자"}
              </div>
              <div className="font-mono text-sm text-amber-200 leading-relaxed">
                name = "김철수"<br />
                initial = 1000
              </div>
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] text-amber-400 font-bold">
                {isEn ? "assigns" : "대입"}
              </span>
              <span className="text-amber-400 text-lg">→</span>
            </div>

            <ObjectBox
              label="acc"
              borderColor="border-amber-400/60"
              fields={[
                { name: "owner",   value: '"김철수"', state: "active" },
                { name: "balance", value: "1000",     state: "active" },
              ]}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <ObjectBox
              label="acc"
              borderColor="border-emerald-400/60"
              fields={[
                { name: "owner",   value: '"김철수"', state: "done" },
                { name: "balance", value: "1000.0",   state: "done" },
              ]}
            />
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-3 py-2 text-xs text-emerald-300">
              ✅ {isEn
                ? "Constructor automatically initialized all members!"
                : "생성자가 자동으로 모든 멤버를 초기화했어요!"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── 탭 ③ 메서드 호출 ─────────────────────────────────────────
function TabMethodCalls({ lang }: { lang: string }) {
  const isEn = lang === "en"

  const steps = [
    {
      code: 'BankAccount acc("김철수", 1000)',
      balance: 1000,
      note: isEn ? "Init" : "초기화",
      noteColor: "text-indigo-300",
      balanceState: "done" as const,
    },
    {
      code: "acc.deposit(500)",
      balance: 1500,
      note: isEn ? "+500 deposit" : "+500 입금",
      noteColor: "text-emerald-300",
      balanceState: "done" as const,
    },
    {
      code: "acc.withdraw(200)",
      balance: 1300,
      note: isEn ? "-200 withdraw" : "-200 출금",
      noteColor: "text-orange-300",
      balanceState: "done" as const,
    },
    {
      code: "acc.withdraw(9999)",
      balance: 1300,
      note: isEn ? "Insufficient → ignored!" : "잔액 부족 → 무시!",
      noteColor: "text-red-300",
      balanceState: "garbage" as const,
    },
    {
      code: "acc.getBalance()",
      balance: 1300,
      note: isEn ? "Output: 1300" : "출력: 1300",
      noteColor: "text-yellow-300",
      balanceState: "done" as const,
    },
  ]

  const [current, setCurrent] = useState(0)
  const s = steps[current]

  return (
    <div className="flex flex-col gap-3">
      {/* 진행 바 */}
      <div className="flex gap-1">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "flex-1 h-1.5 rounded-full transition-all",
              i <= current ? "bg-indigo-400" : "bg-slate-700"
            )}
          />
        ))}
      </div>

      {/* 현재 코드 */}
      <div className="bg-slate-800/60 rounded-xl p-3 font-mono text-sm border border-slate-700">
        <span className="text-slate-400">{current + 1}. </span>
        <span className="text-slate-200">{s.code}</span>
        <span className="text-slate-400">;</span>
      </div>

      {/* 객체 상태 */}
      <div className="flex items-center gap-4">
        <ObjectBox
          label="acc"
          borderColor="border-indigo-400/50"
          fields={[
            { name: "owner",   value: '"김철수"', state: "normal" },
            { name: "balance", value: String(s.balance), state: s.balanceState },
          ]}
        />
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("text-sm font-bold", s.noteColor)}
        >
          {s.note}
        </motion.div>
      </div>

      {/* 이전/다음 */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-30 transition-colors"
        >
          ← {isEn ? "Prev" : "이전"}
        </button>
        <button
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
          disabled={current === steps.length - 1}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-30 transition-colors"
        >
          {isEn ? "Next" : "다음"} →
        </button>
      </div>
    </div>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export function ConstructorVisualizer({ lang }: Props) {
  const [tab, setTab] = useState(0)
  const l = lang === "en" ? "en" : "ko"

  const tabs = [
    { ko: "① 생성자 없음",   en: "① No Constructor" },
    { ko: "② 생성자 있음",   en: "② With Constructor" },
    { ko: "③ 메서드 호출",   en: "③ Method Calls" },
  ]

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg">
      {/* Mac-style 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-slate-400 text-xs font-mono ml-2">BankAccount.cpp</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* 탭 버튼 */}
        <div className="flex gap-1.5 flex-wrap">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                tab === i
                  ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
                  : "bg-slate-700 text-slate-400 hover:bg-slate-600"
              )}
            >
              {l === "en" ? t.en : t.ko}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {tab === 0 && <TabNoConstructor lang={l} />}
            {tab === 1 && <TabWithConstructor lang={l} />}
            {tab === 2 && <TabMethodCalls lang={l} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
