"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ──────────────────────────────────────────────────────────────
// ConstructorVisualizer
// 생성자 없을 때 vs 있을 때 vs 메서드 호출 비교 애니메이션
// ──────────────────────────────────────────────────────────────

interface Props {
  lang?: "ko" | "en"
}

const TABS = [
  { id: 0, ko: "① 생성자 없음",   en: "① No Constructor" },
  { id: 1, ko: "② 생성자 있음",   en: "② With Constructor" },
  { id: 2, ko: "③ 메서드 호출",   en: "③ Method Calls" },
]

// ── 공통 스타일 ──────────────────────────────────────────────
const BOX = "rounded-xl border-2 p-4 font-mono text-sm"
const LABEL = "text-[11px] font-bold uppercase tracking-widest mb-2"

// ── 오브젝트 박스 컴포넌트 ───────────────────────────────────
function ObjectBox({
  title,
  rows,
  borderColor = "border-indigo-500",
  titleColor = "text-indigo-300",
}: {
  title: string
  rows: { field: string; value: string; color?: string; shake?: boolean }[]
  borderColor?: string
  titleColor?: string
}) {
  return (
    <div className={`${BOX} ${borderColor} bg-[#1a1b2e] w-56`}>
      <div className={`${LABEL} ${titleColor}`}>{title}</div>
      <div className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.field}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center justify-between gap-2"
          >
            <span className="text-[#7aa2f7]">{r.field}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${r.color ?? "bg-gray-700 text-gray-300"}`}>
              {r.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── 코드 라인 컴포넌트 ───────────────────────────────────────
function CodeLine({ code, highlight = false }: { code: string; highlight?: boolean }) {
  return (
    <div className={`font-mono text-sm px-3 py-1 rounded ${highlight ? "bg-indigo-900/50 text-indigo-200" : "text-gray-400"}`}>
      {code}
    </div>
  )
}

// ── 화살표 ───────────────────────────────────────────────────
function Arrow({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className="flex flex-col items-center gap-0.5"
    >
      <div className="text-[11px] text-amber-400 font-bold">{label}</div>
      <div className="text-amber-400 text-lg">→</div>
    </motion.div>
  )
}

// ── 탭 0: 생성자 없음 ────────────────────────────────────────
function TabNoConstructor({ lang }: { lang: string }) {
  const t = (ko: string, en: string) => lang === "en" ? en : ko
  return (
    <div className="flex flex-col gap-5">
      {/* 코드 */}
      <div className="bg-[#1a1b2e] rounded-xl p-4 flex flex-col gap-1">
        <CodeLine code="BankAccount acc;  // 생성자 없음" highlight />
        <CodeLine code="// 멤버 변수를 초기화한 적 없음" />
      </div>

      {/* 결과 박스 */}
      <div className="flex items-center gap-4">
        <ObjectBox
          title="acc"
          borderColor="border-red-500"
          titleColor="text-red-400"
          rows={[
            { field: "owner",   value: "???",         color: "bg-red-900/60 text-red-300" },
            { field: "balance", value: "-398475.23", color: "bg-red-900/60 text-red-300" },
          ]}
        />
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-red-400 font-bold">😱 {t("쓰레기 값!", "Garbage values!")}</span>
          <span className="text-gray-400 text-xs">
            {t("초기화 없이 만든 객체의\n멤버 변수는 예측 불가", "Members have undefined\nbehavior without init")}
          </span>
        </div>
      </div>

      <div className="rounded-lg bg-red-900/20 border border-red-700/40 px-3 py-2 text-sm text-red-300">
        ⚠️ {t(
          "생성자가 없으면 멤버 변수 초기값이 보장되지 않아요. 실제로 실행해보면 이상한 값이 나올 수 있어요!",
          "Without a constructor, member variable initial values are not guaranteed — you'll get random/garbage values!"
        )}
      </div>
    </div>
  )
}

// ── 탭 1: 생성자 있음 ────────────────────────────────────────
function TabWithConstructor({ lang }: { lang: string }) {
  const t = (ko: string, en: string) => lang === "en" ? en : ko
  const [step, setStep] = useState(0)

  return (
    <div className="flex flex-col gap-5">
      {/* 코드 */}
      <div className="bg-[#1a1b2e] rounded-xl p-4 flex flex-col gap-1">
        <CodeLine code={`BankAccount acc("김철수", 1000);`} highlight />
        <CodeLine code={`//              ↑이름       ↑초기잔액`} />
        <CodeLine code="// 생성자 자동 호출!" />
      </div>

      {/* 스텝 버튼 */}
      <div className="flex gap-2">
        {[
          t("객체 생성 전", "Before creation"),
          t("생성자 호출 중", "Constructor runs"),
          t("초기화 완료!", "Initialized!"),
        ].map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              step === i ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 시각화 */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ObjectBox
              title="acc"
              borderColor="border-gray-600"
              titleColor="text-gray-400"
              rows={[
                { field: "owner",   value: "...", color: "bg-gray-700 text-gray-500" },
                { field: "balance", value: "...", color: "bg-gray-700 text-gray-500" },
              ]}
            />
            <p className="text-xs text-gray-500 mt-2">{t("아직 아무것도 없어요", "Nothing yet")}</p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-4 flex-wrap">
            {/* 인자 */}
            <div className="flex flex-col gap-2">
              <div className="bg-amber-900/30 border border-amber-600/40 rounded-lg px-3 py-2 text-sm">
                <div className="text-[10px] text-amber-400 font-bold mb-1">{t("인자 (Arguments)", "Arguments")}</div>
                <div className="font-mono text-amber-200">name = "김철수"</div>
                <div className="font-mono text-amber-200">initial = 1000</div>
              </div>
            </div>
            <Arrow label={t("대입", "assigns")} />
            {/* 객체 */}
            <ObjectBox
              title="acc"
              borderColor="border-amber-500"
              titleColor="text-amber-300"
              rows={[
                { field: "owner",   value: "김철수", color: "bg-amber-900/50 text-amber-200" },
                { field: "balance", value: "1000",  color: "bg-amber-900/50 text-amber-200" },
              ]}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-3">
            <ObjectBox
              title="acc"
              borderColor="border-emerald-500"
              titleColor="text-emerald-300"
              rows={[
                { field: "owner",   value: "\"김철수\"", color: "bg-emerald-900/50 text-emerald-200" },
                { field: "balance", value: "1000.0",   color: "bg-emerald-900/50 text-emerald-200" },
              ]}
            />
            <div className="rounded-lg bg-emerald-900/20 border border-emerald-700/40 px-3 py-2 text-sm text-emerald-300">
              ✅ {t(
                "생성자가 자동으로 모든 멤버를 초기화했어요!",
                "The constructor automatically initialized all members!"
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── 탭 2: 메서드 호출 ────────────────────────────────────────
function TabMethodCalls({ lang }: { lang: string }) {
  const t = (ko: string, en: string) => lang === "en" ? en : ko

  const steps = [
    { code: 'BankAccount acc("김철수", 1000)', balance: 1000, note: t("초기화", "Init"), color: "text-indigo-300" },
    { code: "acc.deposit(500)",                balance: 1500, note: t("+500 입금", "+500 deposit"), color: "text-emerald-300" },
    { code: "acc.withdraw(200)",               balance: 1300, note: t("-200 출금", "-200 withdraw"), color: "text-orange-300" },
    { code: "acc.withdraw(9999)",              balance: 1300, note: t("잔액 부족 → 무시!", "Insufficient → ignored!"), color: "text-red-300" },
    { code: "acc.getBalance()",                balance: 1300, note: t("출력: 1300", "Output: 1300"), color: "text-yellow-300" },
  ]

  const [current, setCurrent] = useState(0)
  const s = steps[current]

  return (
    <div className="flex flex-col gap-4">
      {/* 진행 바 */}
      <div className="flex gap-1">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i <= current ? "bg-indigo-500" : "bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* 현재 코드 */}
      <div className="bg-[#1a1b2e] rounded-xl p-3">
        <CodeLine code={s.code} highlight />
      </div>

      {/* 객체 상태 */}
      <div className="flex items-center gap-4">
        <ObjectBox
          title="acc"
          borderColor="border-indigo-500"
          titleColor="text-indigo-300"
          rows={[
            { field: "owner",   value: "\"김철수\"", color: "bg-indigo-900/50 text-indigo-200" },
            {
              field: "balance",
              value: s.balance.toString(),
              color: s.balance === 1300 && current === 3
                ? "bg-red-900/40 text-red-200"   // 무시됨
                : "bg-indigo-900/50 text-indigo-200",
            },
          ]}
        />
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm font-bold ${s.color}`}
        >
          {s.note}
        </motion.div>
      </div>

      {/* 이전/다음 */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-30"
        >
          ← {t("이전", "Prev")}
        </button>
        <button
          onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}
          disabled={current === steps.length - 1}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-30"
        >
          {t("다음", "Next")} →
        </button>
      </div>
    </div>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export function ConstructorVisualizer({ lang }: Props) {
  const [tab, setTab] = useState(0)
  const l = lang === "en" ? "en" : "ko"

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 탭 버튼 */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              tab === t.id
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {l === "en" ? t.en : t.ko}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {tab === 0 && <TabNoConstructor lang={l} />}
          {tab === 1 && <TabWithConstructor lang={l} />}
          {tab === 2 && <TabMethodCalls lang={l} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
