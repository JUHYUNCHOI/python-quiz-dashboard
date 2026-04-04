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

// phase: "idle" | "checking" | 0 | 1 | ... (필드 인덱스) | "done"
type Phase = "idle" | "checking" | number | "done"

export function StructArrayLoop({
  title = "struct 배열 + for문 시각화",
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
  const t = {
    title: isEn ? "struct Array + for Loop" : "struct 배열 + for문 시각화",
    notStarted: isEn ? "Not started" : "시작 전",
    enterI: (i: number) => isEn ? `Enter i = ${i}` : `i = ${i} 진입`,
    done: isEn ? "Done ✓" : "완료 ✓",
    output: isEn ? "Output:" : "출력:",
    hint: isEn ? "Press Next Step to begin" : "다음 단계를 눌러보세요",
    loopEnd: (n: number) => isEn
      ? `— Loop ends (i = ${n}, i < ${n} fails)`
      : `— 반복 종료 (i = ${n}, i < ${n} 불만족)`,
    nextStep: isEn ? "Next Step" : "다음 단계",
    restart: isEn ? "Restart" : "다시 시작",
  }
  const [currentIdx, setCurrentIdx] = useState(-1)
  const [outputs, setOutputs] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>("idle")
  const total = items.length

  // 클릭할 때만 한 단계씩 전진 — 자동 진행 없음
  const stepForward = useCallback(() => {
    if (phase === "done") return

    if (phase === "idle") {
      setCurrentIdx(0)
      setPhase("checking")
      return
    }

    if (phase === "checking") {
      // 첫 번째 필드 접근 시작
      setPhase(0)
      return
    }

    if (typeof phase === "number") {
      const nextField = phase + 1
      if (nextField < fields.length) {
        // 같은 아이템의 다음 필드
        setPhase(nextField)
      } else {
        // 이 아이템의 모든 필드 접근 완료 → 출력 추가
        setOutputs(prev => [...prev, outputTemplate(items[currentIdx], currentIdx)])
        const nextIdx = currentIdx + 1
        if (nextIdx < total) {
          setCurrentIdx(nextIdx)
          setPhase("checking")
        } else {
          setPhase("done")
        }
      }
    }
  }, [phase, currentIdx, total, items, fields, outputTemplate])

  const reset = () => { setCurrentIdx(-1); setOutputs([]); setPhase("idle") }

  const isDone = phase === "done"
  const isChecking = phase === "checking"
  const activeField = typeof phase === "number" ? phase : -1
  const currentItem = currentIdx >= 0 ? items[currentIdx] : null

  // 단계 설명 텍스트
  const statusText = (() => {
    if (phase === "idle") return t.notStarted
    if (phase === "done") return t.done
    if (phase === "checking") return t.enterI(currentIdx)
    if (typeof phase === "number") return `[${currentIdx}].${fields[phase]}`
    return ""
  })()

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 sm:p-6 text-white overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-medium text-slate-300">{title ?? t.title}</h3>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-1 bg-slate-700 rounded-lg font-mono">{statusText}</span>
        </div>
      </div>

      {/* struct 배열 카드들 */}
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-2 font-mono">
          {structName} {arrayName}[{total}] = &#123;...&#125;
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
          {items.map((item, i) => {
            const isActive = currentIdx === i && phase !== "idle"
            const isPast = i < currentIdx || (i === currentIdx && isDone)
            return (
              <div
                key={i}
                className={cn(
                  "rounded-xl border-2 p-3 transition-all duration-300",
                  isActive && isChecking
                    ? "border-yellow-400 bg-yellow-500/20 scale-105"
                    : isActive && typeof phase === "number"
                    ? "border-blue-400 bg-blue-500/15 scale-105"
                    : isPast
                    ? "border-slate-600 bg-slate-700/40 opacity-60"
                    : "border-slate-700 bg-slate-800/60"
                )}
              >
                {/* 인덱스 뱃지 */}
                <div className={cn(
                  "text-xs font-mono font-bold mb-2 w-6 h-6 rounded-md flex items-center justify-center",
                  isActive ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400"
                )}>
                  {i}
                </div>
                {/* 필드들 */}
                {fields.map((field, fi) => {
                  const isFieldActive = isActive && activeField === fi
                  return (
                    <div key={field} className="flex flex-col mb-1">
                      <span className={cn(
                        "text-xs transition-colors duration-200",
                        isFieldActive ? "text-yellow-300 font-bold" : "text-slate-500"
                      )}>
                        {fieldLabels[fi] ?? field}
                      </span>
                      <span className={cn(
                        "font-mono text-sm font-semibold transition-all duration-200",
                        isFieldActive
                          ? "text-yellow-200 bg-yellow-500/20 rounded px-1"
                          : "text-slate-200"
                      )}>
                        {typeof item[field] === "string" ? `"${item[field]}"` : item[field]}
                      </span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* for loop 코드 */}
      <div className="bg-slate-800/50 rounded-xl p-3 font-mono text-sm mb-4">
        {/* for 헤더 */}
        <div className="flex flex-wrap items-center gap-1 mb-1">
          <span className="text-blue-400">for</span>
          <span className="text-slate-400">(</span>
          <span className="text-orange-300">int</span>
          <span className="text-white"> i = </span>
          <span className="text-yellow-300">0</span>
          <span className="text-slate-400">;</span>
          <span className={cn(
            "transition-all duration-200 px-1 rounded",
            isChecking ? "bg-yellow-500/30 text-yellow-200" : "text-white"
          )}>
            {" "}i &lt; <span className="text-yellow-300">{total}</span>
          </span>
          <span className="text-slate-400">;</span>
          <span className="text-white"> i++</span>
          <span className="text-slate-400">)</span>
          <span className="text-slate-400">&#123;</span>
        </div>

        {/* cout 줄 — 각 필드 접근 부분을 개별 하이라이트 */}
        <div className="ml-4 flex flex-wrap items-center gap-1 mb-1">
          <span className="text-green-400">cout</span>
          <span className="text-slate-400"> &lt;&lt; </span>
          {fields.map((field, fi) => (
            <span key={field} className="flex items-center gap-1">
              <span className={cn(
                "px-1 rounded transition-all duration-200",
                activeField === fi
                  ? "bg-yellow-500/40 text-yellow-200 font-bold"
                  : "text-slate-300"
              )}>
                {arrayName}[
                <span className={cn(
                  "font-bold",
                  currentIdx >= 0 ? "text-blue-300" : "text-slate-400"
                )}>
                  {currentIdx >= 0 ? currentIdx : "i"}
                </span>
                ].{field}
              </span>
              {fi < fields.length - 1 && (
                <>
                  <span className="text-slate-400"> &lt;&lt; </span>
                  <span className="text-green-300">": "</span>
                  <span className="text-slate-400"> &lt;&lt; </span>
                </>
              )}
            </span>
          ))}
          <span className="text-slate-400"> &lt;&lt; </span>
          <span className="text-purple-300">endl</span>
          <span className="text-slate-400">;</span>
        </div>
        <div className="text-slate-400">&#125;</div>

        {/* 현재 접근 중인 필드 값 */}
        {currentItem && activeField >= 0 && (
          <div className="mt-2 pt-2 border-t border-slate-700 text-xs flex items-center gap-2">
            <span className="text-slate-500">→</span>
            <span className="text-yellow-300 font-mono">
              {arrayName}[{currentIdx}].{fields[activeField]}
            </span>
            <span className="text-slate-500">=</span>
            <span className="text-yellow-200 font-mono font-bold bg-yellow-500/20 px-2 py-0.5 rounded">
              {typeof currentItem[fields[activeField]] === "string"
                ? `"${currentItem[fields[activeField]]}"`
                : currentItem[fields[activeField]]}
            </span>
          </div>
        )}
      </div>

      {/* 출력 패널 */}
      <div className="bg-slate-950/60 rounded-xl p-3 mb-4 min-h-[60px]">
        <div className="text-xs text-slate-500 mb-1">{t.output}</div>
        {outputs.length === 0 ? (
          <div className="text-slate-600 text-sm italic">{t.hint}</div>
        ) : (
          outputs.map((line, i) => (
            <div
              key={i}
              className={cn(
                "font-mono text-sm",
                i === outputs.length - 1 ? "text-green-300" : "text-slate-400"
              )}
            >
              {line}
            </div>
          ))
        )}
        {isDone && (
          <div className="text-xs text-slate-500 mt-1">{t.loopEnd(total)}</div>
        )}
      </div>

      {/* 컨트롤 버튼 */}
      <div className="flex items-center gap-2">
        <button
          onClick={isDone ? reset : stepForward}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          {isDone ? t.restart : t.nextStep}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
