"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { highlightCpp } from "@/components/ui/code-block"

// ──────────────────────────────────────────────────────────────
// ConstructorLifecycle
// "언제 어느 방식이 통하나" — 두 가지 상황(일반 멤버 vs const 멤버)
// 에서 Python 스타일과 리스트가 어떻게 동작하는지 나란히 비교.
// ──────────────────────────────────────────────────────────────

interface Props {
  lang?: "ko" | "en"
}

type Scenario = "normal" | "const"
type Status = "ok" | "error"

function CodeCard({
  title,
  subtitle,
  code,
  status,
  note,
}: {
  title: string
  subtitle: string
  code: string
  status: Status
  note: string
}) {
  const boxStyle = status === "ok"
    ? "border-emerald-400/60 bg-emerald-950/30"
    : "border-red-500/70 bg-red-950/40"
  const badgeStyle = status === "ok"
    ? "bg-emerald-500/25 text-emerald-200 border-emerald-400/50"
    : "bg-red-500/30 text-red-100 border-red-400/60"
  const badgeText = status === "ok" ? "✓" : "❌"

  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl border p-4", boxStyle)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-slate-100">{title}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{subtitle}</div>
        </div>
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded border shrink-0", badgeStyle)}>
          {badgeText}
        </span>
      </div>
      <div className="rounded-lg bg-slate-800/70 border border-slate-700 px-3 py-2 text-[12px] leading-relaxed font-mono overflow-x-auto whitespace-pre">
        {highlightCpp(code, true)}
      </div>
      <p className={cn(
        "text-xs leading-relaxed",
        status === "ok" ? "text-emerald-200" : "text-red-200"
      )}>
        {note}
      </p>
    </div>
  )
}

export function ConstructorLifecycle({ lang = "ko" }: Props) {
  const isEn = lang === "en"
  const [scenario, setScenario] = useState<Scenario>("normal")

  // ── 시나리오 A: 일반 멤버 (둘 다 OK) ────────────────────────
  const normalPython = `BankAccount(string name, double initial) {
    owner = name;       // ✓ 대입 OK
    balance = initial;
}`

  const normalList = `BankAccount(string name, double initial)
    : owner(name), balance(initial) {}`

  // ── 시나리오 B: const 멤버 (Python 스타일 컴파일 에러) ────
  const constPython = `class Player {
    const int id;       // 한 번 정해지면 못 바꿈
public:
    Player(int i) {
        id = i;    ❌   // 컴파일 에러!
    }
};`

  const constList = `class Player {
    const int id;
public:
    Player(int i) : id(i) {}    // ✓
};`

  const scenarioTitle = scenario === "normal"
    ? (isEn ? "Normal members (int, string, etc.)" : "일반 멤버 (int, string 등)")
    : (isEn ? "const member" : "const 멤버")

  const scenarioSummary = scenario === "normal"
    ? (isEn
        ? <>Both methods work for regular members. No visible difference for students. You could pick either — but real C++ code overwhelmingly picks the list (so you're ready for cases like the other tab).</>
        : <>일반 멤버에선 <span className="text-emerald-300 font-semibold">둘 다 작동</span>. 학생이 체감하는 차이 거의 없음. 편한 걸 써도 되지만, **실무 C++ 은 거의 리스트만** 씀 (다음 탭 같은 상황 대비해서).</>
      )
    : (isEn
        ? <>Python-style <strong className="text-red-300">won't compile</strong> with a const member (const can't be reassigned, but body-assignment IS reassignment). The list works because it initializes at birth, not reassigns. <br/><br/>👉 The moment your class has <code className="text-emerald-300">const</code> (or reference) members, you're forced to use the list. Pros default to the list to avoid this friction.</>
        : <>const 멤버 있으면 Python 스타일은 <strong className="text-red-300">컴파일 안 됨</strong>. const 는 한 번 정해지면 재대입 못 하는데, 바디 대입은 재대입이니까. 리스트는 "태어날 때 값 정함" 이라 재대입이 아님. <br/><br/>👉 클래스에 <code className="text-emerald-300">const</code> (나 reference) 멤버 하나라도 생기면 Python 스타일 선택지 사라짐. 실무는 이런 상황 예방 차원에서 **처음부터 리스트** 씀.</>
      )

  return (
    <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl">
      <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-base font-bold text-slate-100">
          {isEn ? "Which method works when?" : "언제 어느 방식이 통할까?"}
        </h3>
        <div className="inline-flex gap-0.5 rounded-lg bg-slate-800/70 p-0.5 text-[11px]">
          {(["normal", "const"] as Scenario[]).map(s => {
            const label = s === "normal"
              ? (isEn ? "Normal members" : "일반 멤버")
              : (isEn ? "const member" : "const 멤버")
            return (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={cn(
                  "px-2.5 py-1 rounded-md font-semibold transition-all whitespace-nowrap",
                  scenario === s
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

      <div className="text-xs text-slate-400 mb-3">
        {isEn
          ? `Scenario: ${scenarioTitle}`
          : `상황: ${scenarioTitle}`}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {scenario === "normal" ? (
            <>
              <CodeCard
                title={isEn ? "Python-style" : "Python 스타일"}
                subtitle={isEn ? "= assignment in body" : "= 로 바디 안에서 대입"}
                code={normalPython}
                status="ok"
                note={isEn ? "Compiles and runs. Same result." : "컴파일·실행 OK. 결과 동일."}
              />
              <CodeCard
                title={isEn ? "C++ list ⭐" : "C++ 리스트 ⭐"}
                subtitle={isEn ? ": member(value) list" : ": 뒤에 멤버(값) 리스트"}
                code={normalList}
                status="ok"
                note={isEn ? "Compiles and runs. Same result." : "컴파일·실행 OK. 결과 동일."}
              />
            </>
          ) : (
            <>
              <CodeCard
                title={isEn ? "Python-style" : "Python 스타일"}
                subtitle={isEn ? "= assignment in body" : "= 로 바디 안에서 대입"}
                code={constPython}
                status="error"
                note={isEn
                  ? "Compile error: assignment of read-only member 'id'. const can't be reassigned."
                  : "컴파일 에러: id 는 const 라 재대입 불가. 바디 대입은 '이미 만들어진 값을 다시 쓰는 것' 이라서 안 됨."}
              />
              <CodeCard
                title={isEn ? "C++ list ⭐" : "C++ 리스트 ⭐"}
                subtitle={isEn ? ": member(value) list" : ": 뒤에 멤버(값) 리스트"}
                code={constList}
                status="ok"
                note={isEn
                  ? "OK. The list initializes at creation, not reassignment — const is fine with this."
                  : "OK. 리스트는 '태어날 때 값 정함' 이라 재대입 아님 → const 도 문제없이 작동."}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-3 text-xs text-slate-300 leading-relaxed">
        💡 {scenarioSummary}
      </div>
    </div>
  )
}

export default ConstructorLifecycle
