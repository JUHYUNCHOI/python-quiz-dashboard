"use client"

import { useState } from "react"
import { CodeTraceSimulator, type CodeTracePreset } from "./code-trace-simulator"
import * as P from "./presets"

// 편의 래퍼: 레지스트리에서 props 없이 바로 사용
export function CodeTracePyIfElse({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_IF_ELSE_BASIC} lang={lang as "ko" | "en"} />
}
export function CodeTracePyNestedIf({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_NESTED_IF} lang={lang as "ko" | "en"} />
}
export function CodeTracePyForSum({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_FOR_SUM} lang={lang as "ko" | "en"} />
}
export function CodeTracePyWhile({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_WHILE_COUNTDOWN} lang={lang as "ko" | "en"} />
}
export function CodeTracePyForIf({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_FOR_IF_FILTER} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppIfElse({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_IF_ELSE_BASIC} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppFor({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_FOR_BASIC} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppArrayLoop({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_ARRAY_LOOP} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppWhile({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_WHILE_BASIC} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppBraceTrapNo({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_BRACE_TRAP_NO} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppBraceTrapYes({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_BRACE_TRAP_YES} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppScoreGrade({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_SCORE_GRADE} lang={lang as "ko" | "en"} />
}
export function CodeTracePyIfElseLow({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_IF_ELSE_LOW} lang={lang as "ko" | "en"} />
}
export function CodeTracePyNestedIfFalse({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.PY_NESTED_IF_FALSE} lang={lang as "ko" | "en"} />
}
export function CodeTraceCppScoreGradeHigh({ lang = "ko" }: { lang?: string }) {
  return <CodeTraceSimulator preset={P.CPP_SCORE_GRADE_HIGH} lang={lang as "ko" | "en"} />
}

// ============================================================
// 시나리오 탭 전환 콤보 컴포넌트
// ============================================================

interface ScenarioTab {
  label: string
  preset: CodeTracePreset
}

function ScenarioTabs({ tabs, lang }: { tabs: ScenarioTab[]; lang: "ko" | "en" }) {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="flex gap-2 mb-3">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeIdx === i
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-700/60 text-slate-300 hover:bg-slate-600/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 활성 시뮬레이터 */}
      <CodeTraceSimulator key={activeIdx} preset={tabs[activeIdx].preset} lang={lang} />
    </div>
  )
}

/** 중괄호 함정: 없을 때 — score=80 vs score=96 */
export function CodeTraceCppBraceTrapNoCombo({ lang = "ko" }: { lang?: string }) {
  const l = lang as "ko" | "en"
  return (
    <ScenarioTabs
      lang={l}
      tabs={[
        { label: "score = 80 (거짓)", preset: P.CPP_BRACE_TRAP_NO },
        { label: "score = 96 (참)", preset: P.CPP_BRACE_TRAP_NO_TRUE },
      ]}
    />
  )
}

/** 중괄호 함정: 있을 때 — score=80 vs score=96 */
export function CodeTraceCppBraceTrapYesCombo({ lang = "ko" }: { lang?: string }) {
  const l = lang as "ko" | "en"
  return (
    <ScenarioTabs
      lang={l}
      tabs={[
        { label: "score = 80 (거짓)", preset: P.CPP_BRACE_TRAP_YES },
        { label: "score = 96 (참)", preset: P.CPP_BRACE_TRAP_YES_TRUE },
      ]}
    />
  )
}
