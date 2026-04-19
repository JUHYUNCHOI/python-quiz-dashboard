"use client"

import { useState, useCallback } from "react"
import { RotateCcw, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

interface StructItem {
  [key: string]: string | number
}

interface StructArrayLoopProps {
  title?: string
  structName?: string
  arrayName?: string
  fields?: string[]
  fieldLabels?: string[]
  items?: StructItem[]
  outputTemplate?: (item: StructItem, i: number) => string
  lang?: string
}

// ── Phase 정의 ──
// for 문 실행 흐름을 정확히 추적하는 세분화된 단계
type Phase =
  | { type: "idle" }
  | { type: "init" }               // ① int i = 0  깜빡
  | { type: "check" }              // ② i < N  조건 확인 (통과) + 카드 ping
  | { type: "array_access" }       // ③ students[i] 접근 (카드 포커스)
  | { type: "field"; fi: number }  // ④ .fieldName 접근 + 카드 값 깜빡
  | { type: "increment" }          // ⑤ i++  깜빡
  | { type: "check_fail" }         // ⑥ i < N  조건 실패 → 종료
  | { type: "done" }

export function StructArrayLoop({
  title,
  structName = "Student",
  arrayName = "students",
  fields = ["name", "score"],
  fieldLabels = ["name", "score"],
  items = [
    { name: "김철수", score: 95 },
    { name: "이영희", score: 87 },
    { name: "박민준", score: 72 },
  ],
  outputTemplate = (item) => `${item.name}: ${item.score}`,
  lang = "ko",
}: StructArrayLoopProps) {
  const isEn = lang === "en"
  const total = items.length

  const [currentIdx, setCurrentIdx] = useState(0)
  const [outputs, setOutputs] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>({ type: "idle" })

  const stepForward = useCallback(() => {
    if (phase.type === "idle") {
      setCurrentIdx(0)
      setPhase({ type: "init" })
    } else if (phase.type === "init") {
      setPhase({ type: "check" })
    } else if (phase.type === "check") {
      setPhase({ type: "array_access" })
    } else if (phase.type === "array_access") {
      setPhase({ type: "field", fi: 0 })
    } else if (phase.type === "field") {
      if (phase.fi < fields.length - 1) {
        setPhase({ type: "field", fi: phase.fi + 1 })
      } else {
        // 마지막 필드 → 출력 추가 후 i++ 단계
        setOutputs(prev => [...prev, outputTemplate(items[currentIdx], currentIdx)])
        setPhase({ type: "increment" })
      }
    } else if (phase.type === "increment") {
      const nextIdx = currentIdx + 1
      if (nextIdx < total) {
        setCurrentIdx(nextIdx)
        setPhase({ type: "check" })
      } else {
        // i = total: 조건 실패
        setCurrentIdx(total) // i = N 을 표현
        setPhase({ type: "check_fail" })
      }
    } else if (phase.type === "check_fail") {
      setPhase({ type: "done" })
    }
  }, [phase, currentIdx, total, fields, items, outputTemplate])

  const reset = () => {
    setCurrentIdx(0)
    setOutputs([])
    setPhase({ type: "idle" })
  }

  // ── 편의 플래그 ──
  const isIdle         = phase.type === "idle"
  const isInit         = phase.type === "init"
  const isCheck        = phase.type === "check"
  const isArrayAccess  = phase.type === "array_access"
  const isField        = phase.type === "field"
  const isIncrement    = phase.type === "increment"
  const isCheckFail    = phase.type === "check_fail"
  const isDone         = phase.type === "done"
  const activeField    = phase.type === "field" ? phase.fi : -1

  // check_fail/done 에서는 i = total (배열 범위 초과)
  const currentItem = isCheckFail || isDone ? null : items[currentIdx]

  // ── 상태 설명 텍스트 ──
  const statusText = (() => {
    if (isIdle)        return isEn ? "Not started" : "시작 전"
    if (isInit)        return isEn ? `① i = 0  init` : `① i = 0 초기화`
    if (isCheck)       return isEn ? `② ${currentIdx} < ${total}  ✓` : `② ${currentIdx} < ${total}  ✓ 참!`
    if (isArrayAccess) return `③ ${arrayName}[${currentIdx}]`
    if (isField)       return `④ .${fields[activeField]}`
    if (isIncrement)   return isEn ? `⑤ i++ → i = ${currentIdx + 1}` : `⑤ i++ → i = ${currentIdx + 1}`
    if (isCheckFail)   return isEn ? `② ${total} < ${total}  ✗ End` : `② ${total} < ${total}  ✗ 거짓!`
    if (isDone)        return isEn ? "Done ✓" : "완료 ✓"
    return ""
  })()

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 sm:p-5 text-white overflow-hidden">

      {/* ── 헤더 ── */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-slate-300">
          {title ?? (isEn ? "struct Array + for Loop" : "struct 배열 + for문 시각화")}
        </h3>
        <span className="text-xs font-mono px-2 py-1 rounded-lg bg-slate-700/80 text-slate-300 border border-slate-600/50">
          {statusText}
        </span>
      </div>

      {/* ── 배열 카드 ── */}
      <div className="mb-5">
        <div className="text-xs text-slate-500 mb-2 font-mono">
          {structName} {arrayName}[{total}] = &#123;...&#125;
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
          {items.map((item, i) => {
            const isActiveCard = !isIdle && !isCheckFail && !isDone && i === currentIdx
            const isCardPulse  = isActiveCard && (isInit || isCheck)
            const isCardBlue   = isActiveCard && (isArrayAccess || isField || isIncrement)
            const isPast       = !isActiveCard && (isDone || isCheckFail || i < outputs.length)

            return (
              <div key={i} className="relative">
                {/* Ping ring: 카드가 새로 선택될 때 (init/check) */}
                {isCardPulse && (
                  <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/50 animate-ping pointer-events-none" />
                )}

                <div className={cn(
                  "rounded-xl border-2 p-3 transition-all duration-300 relative",
                  isCardPulse  ? "border-yellow-400 bg-yellow-500/12 scale-[1.03]" :
                  isCardBlue   ? "border-blue-400  bg-blue-500/12  scale-[1.03]" :
                  isPast       ? "border-slate-700 bg-slate-800/30 opacity-40" :
                                 "border-slate-700 bg-slate-800/60"
                )}>
                  {/* 인덱스 배지 */}
                  <div className={cn(
                    "text-xs font-mono font-bold mb-2.5 w-6 h-6 rounded-md flex items-center justify-center",
                    isActiveCard ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400"
                  )}>
                    {i}
                  </div>

                  {/* 필드 */}
                  {fields.map((field, fi) => {
                    const isFieldHighlight = isActiveCard && isField && activeField === fi
                    return (
                      <div key={field} className="flex flex-col mb-1.5">
                        <span className={cn(
                          "text-[11px] font-mono transition-colors duration-200",
                          isFieldHighlight ? "text-yellow-300 font-bold" : "text-slate-500"
                        )}>
                          {fieldLabels[fi] ?? field}
                        </span>
                        <span className={cn(
                          "font-mono text-sm font-semibold transition-all duration-200",
                          isFieldHighlight
                            ? "text-yellow-100 bg-yellow-500/25 rounded px-1 animate-pulse"
                            : "text-slate-200"
                        )}>
                          {typeof item[field] === "string" ? `"${item[field]}"` : item[field]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── for 루프 코드 ── */}
      <div className="bg-slate-800/50 rounded-xl p-3 font-mono text-sm mb-4 border border-slate-700/40">

        {/* for 헤더 */}
        <div className="flex flex-wrap items-center gap-x-0.5 gap-y-0.5 mb-1 leading-7">
          <span className="text-blue-400">for</span>
          <span className="text-slate-400">&nbsp;(</span>

          {/* int i = 0 */}
          <span className={cn(
            "px-1 rounded transition-all duration-200",
            isInit ? "bg-yellow-500/30 text-yellow-200 animate-pulse" : "text-slate-200"
          )}>
            <span className="text-orange-300">int</span>
            <span className="text-white"> i </span>
            <span className="text-slate-400">=</span>
            <span className="text-yellow-300"> 0</span>
          </span>
          <span className="text-slate-400">;&nbsp;</span>

          {/* i < N */}
          <span className={cn(
            "px-1 rounded transition-all duration-200",
            isCheck || isField
              ? "bg-green-500/20 text-green-300"
              : isCheckFail
              ? "bg-red-500/25 text-red-300 animate-pulse"
              : "text-white"
          )}>
            i &lt;&nbsp;
            <span className={cn(
              "font-bold",
              isCheck || isField ? "text-green-300" :
              isCheckFail ? "text-red-300" : "text-yellow-300"
            )}>{total}</span>
          </span>
          <span className="text-slate-400">;&nbsp;</span>

          {/* i++ */}
          <span className={cn(
            "px-1 rounded transition-all duration-200",
            isIncrement ? "bg-amber-500/30 text-amber-200 animate-pulse" : "text-white"
          )}>
            i++
          </span>

          <span className="text-slate-400">&nbsp;) &#123;</span>
        </div>

        {/* cout 줄 */}
        <div className="ml-4 flex flex-wrap items-center gap-x-1 gap-y-0.5 mb-1 leading-7">
          <span className="text-green-400">cout</span>
          <span className="text-slate-400"> &lt;&lt; </span>
          {fields.map((field, fi) => (
            <span key={field} className="flex items-center gap-0">
              {/* students[i] 부분 — array_access 단계에서 깜빡 */}
              <span className={cn(
                "px-1 rounded-l transition-all duration-200",
                isArrayAccess
                  ? "bg-blue-500/35 text-blue-100 animate-pulse font-bold"
                  : "text-slate-300"
              )}>
                {arrayName}[<span className={cn(
                  "font-bold",
                  isIdle || isCheckFail || isDone ? "text-slate-400" : "text-blue-300"
                )}>{isIdle || isCheckFail || isDone ? "i" : currentIdx}</span>]
              </span>
              {/* .field 부분 — field 단계에서 깜빡 */}
              <span className={cn(
                "px-1 rounded-r transition-all duration-200",
                isField && activeField === fi
                  ? "bg-yellow-500/35 text-yellow-100 animate-pulse font-bold"
                  : "text-slate-300"
              )}>
                .{field}
              </span>
              {fi < fields.length - 1 && (
                <>
                  <span className="text-slate-400 mx-1">&lt;&lt;</span>
                  <span className="text-green-300">{`": "`}</span>
                  <span className="text-slate-400 mx-1">&lt;&lt;</span>
                </>
              )}
            </span>
          ))}
          <span className="text-slate-400"> &lt;&lt; </span>
          <span className="text-purple-300">endl</span>
          <span className="text-slate-400">;</span>
        </div>

        <div className="text-slate-400">&#125;</div>

        {/* 접근 중인 값 표시 */}
        {isArrayAccess && currentItem && (
          <div className="mt-2 pt-2 border-t border-slate-700/60 text-xs flex items-center gap-2">
            <span className="text-slate-500">→</span>
            <span className="text-blue-300 font-mono">{arrayName}[{currentIdx}]</span>
            <span className="text-slate-500">= index {currentIdx} 의 {structName} 객체</span>
          </div>
        )}
        {isField && currentItem && (
          <div className="mt-2 pt-2 border-t border-slate-700/60 text-xs flex items-center gap-2">
            <span className="text-slate-500">→</span>
            <span className="text-yellow-300 font-mono">
              {arrayName}[{currentIdx}].{fields[activeField]}
            </span>
            <span className="text-slate-500">=</span>
            <span className="text-yellow-100 font-mono font-bold bg-yellow-500/20 px-2 py-0.5 rounded">
              {typeof currentItem[fields[activeField]] === "string"
                ? `"${currentItem[fields[activeField]]}"`
                : currentItem[fields[activeField]]}
            </span>
          </div>
        )}

        {/* 조건 실패 메시지 */}
        {isCheckFail && (
          <div className="mt-2 pt-2 border-t border-slate-700/60 text-xs text-red-400 flex items-center gap-2">
            <span>→</span>
            <span className="font-mono">{total} &lt; {total}</span>
            <span>= false</span>
            <span className="text-red-300 font-bold">
              {isEn ? "→ Loop ends!" : "→ 반복 종료!"}
            </span>
          </div>
        )}
      </div>

      {/* ── 출력 패널 ── */}
      <div className="bg-slate-950/60 rounded-xl p-3 mb-4 min-h-[56px]">
        <div className="text-xs text-slate-500 mb-1">{isEn ? "Output:" : "출력:"}</div>
        {outputs.length === 0 ? (
          <div className="text-slate-600 text-sm italic">
            {isEn ? "Press Next Step to begin" : "다음 단계를 눌러보세요"}
          </div>
        ) : (
          outputs.map((line, i) => (
            <div
              key={i}
              className={cn(
                "font-mono text-sm",
                i === outputs.length - 1 && !isDone ? "text-green-300" : "text-slate-400"
              )}
            >
              {line}
            </div>
          ))
        )}
        {(isDone || isCheckFail) && (
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {isEn
              ? `// i = ${total}: ${total} < ${total} is false → loop ends`
              : `// i = ${total}: ${total} < ${total} 실패 → 반복 종료`}
          </div>
        )}
      </div>

      {/* ── 컨트롤 ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={isDone ? reset : stepForward}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          {isDone
            ? (isEn ? "Restart" : "다시 시작")
            : (isEn ? "Next Step" : "다음 단계")}
        </button>
        {!isIdle && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
