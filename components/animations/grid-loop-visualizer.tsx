"use client"

import { useState, useCallback } from "react"
import { RotateCcw, Play, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GridLoopVisualizerProps {
  rows?: number
  cols?: number
  grid?: number[][]
  title?: string
  lang?: string
}

type Phase = "idle" | "entering-row" | "visiting" | "done"

export function GridLoopVisualizer({
  rows = 3,
  cols = 3,
  grid: initialGrid,
  title,
  lang = "ko",
}: GridLoopVisualizerProps) {
  const isEn = lang === "en"

  const defaultGrid = initialGrid ?? Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => i * cols + j + 1)
  )

  const [i, setI] = useState(-1)
  const [j, setJ] = useState(-1)
  const [phase, setPhase] = useState<Phase>("idle")
  const [visited, setVisited] = useState<string[]>([]) // ordered array for output trail
  const [visitedSet, setVisitedSet] = useState<Set<string>>(new Set())

  const lbl = {
    title: isEn ? "Nested For Loop Visualizer" : "이중 for문 시각화",
    notStarted: isEn ? "Not started" : "시작 전",
    enterRow: (r: number) => isEn ? `Outer loop → row i = ${r}` : `바깥 루프 → i = ${r} 행`,
    visit: (r: number, c: number) => isEn
      ? `Visiting grid[${r}][${c}] = ${defaultGrid[r][c]}`
      : `grid[${r}][${c}] = ${defaultGrid[r][c]} 방문`,
    done: isEn ? "All done! ✓" : "순회 완료! ✓",
    nextStep: isEn ? "Next Step" : "다음 단계",
    start: isEn ? "Start" : "시작",
    restart: isEn ? "Restart" : "다시 시작",
    output: isEn ? "Output" : "출력",
    iLabel: isEn ? "row" : "행",
    jLabel: isEn ? "col" : "열",
  }

  const statusText = (() => {
    if (phase === "idle") return lbl.notStarted
    if (phase === "done") return lbl.done
    if (phase === "entering-row") return lbl.enterRow(i)
    if (phase === "visiting") return lbl.visit(i, j)
    return ""
  })()

  const stepForward = useCallback(() => {
    if (phase === "done") return

    if (phase === "idle") {
      setI(0); setJ(-1); setPhase("entering-row"); return
    }
    if (phase === "entering-row") {
      setJ(0); setPhase("visiting"); return
    }
    if (phase === "visiting") {
      const key = `${i},${j}`
      setVisited(prev => [...prev, key])
      setVisitedSet(prev => new Set([...prev, key]))
      const nextJ = j + 1
      if (nextJ < cols) {
        setJ(nextJ)
      } else {
        const nextI = i + 1
        if (nextI < rows) {
          setI(nextI); setJ(-1); setPhase("entering-row")
        } else {
          setPhase("done")
        }
      }
    }
  }, [phase, i, j, rows, cols, defaultGrid])

  const reset = () => {
    setI(-1); setJ(-1); setPhase("idle")
    setVisited([]); setVisitedSet(new Set())
  }

  const isDone = phase === "done"
  const isEnteringRow = phase === "entering-row"
  const isVisiting = phase === "visiting"

  // Status badge color
  const statusColor = isDone
    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
    : isEnteringRow
    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
    : isVisiting
    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
    : "bg-slate-700/60 text-slate-400 border border-slate-600/30"

  return (
    <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
      {/* 상단 헤더 바 */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-slate-400 text-xs font-mono ml-2">{title ?? lbl.title}</span>
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300", statusColor)}>
          {statusText}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-5">

          {/* ── 그리드 섹션 ── */}
          <div className="flex-shrink-0">
            {/* 범례 */}
            <div className="flex gap-3 mb-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-400/80" />
                <span className="text-slate-400 font-mono">i ({lbl.iLabel})</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-400/80" />
                <span className="text-slate-400 font-mono">j ({lbl.jLabel})</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-400/80" />
                <span className="text-slate-400 font-mono">{isEn ? "current" : "현재"}</span>
              </span>
            </div>

            {/* 열 헤더 */}
            <div className="flex gap-1 mb-1 ml-8">
              {Array.from({ length: cols }, (_, c) => (
                <div key={c} className={cn(
                  "w-11 h-5 flex items-center justify-center text-xs font-mono font-semibold rounded transition-all duration-200",
                  isVisiting && j === c ? "text-blue-300" : "text-slate-600"
                )}>
                  j={c}
                </div>
              ))}
            </div>

            {/* 그리드 행들 */}
            {defaultGrid.map((row, r) => (
              <div key={r} className="flex items-center gap-1 mb-1">
                {/* 행 인덱스 */}
                <div className={cn(
                  "w-7 text-xs font-mono font-semibold text-right mr-1 transition-all duration-200",
                  (isEnteringRow || isVisiting) && i === r ? "text-amber-300" : "text-slate-600"
                )}>
                  i={r}
                </div>

                {row.map((val, c) => {
                  const isCurrentCell = i === r && j === c && isVisiting
                  const isRowActive = i === r && isEnteringRow
                  const wasVisited = visitedSet.has(`${r},${c}`)

                  return (
                    <div
                      key={c}
                      className={cn(
                        "w-11 h-11 flex items-center justify-center rounded-xl font-mono font-bold text-sm transition-all duration-200 relative",
                        isCurrentCell
                          ? "bg-emerald-500/25 border-2 border-emerald-400 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/20"
                          : isRowActive
                          ? "bg-amber-500/15 border-2 border-amber-400/50 text-amber-200"
                          : wasVisited
                          ? "bg-slate-700/30 border border-slate-600/40 text-slate-500"
                          : "bg-slate-800/80 border border-slate-700/60 text-slate-300"
                      )}
                    >
                      {val}
                      {isCurrentCell && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}

            {/* i, j 값 표시 */}
            {phase !== "idle" && phase !== "done" && (
              <div className="mt-3 flex gap-3">
                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1.5">
                  <span className="text-amber-400 font-mono font-bold text-sm">i</span>
                  <span className="text-slate-500 text-xs">=</span>
                  <span className="text-amber-300 font-mono font-bold text-sm">{i >= 0 ? i : "?"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg px-2.5 py-1.5">
                  <span className="text-blue-400 font-mono font-bold text-sm">j</span>
                  <span className="text-slate-500 text-xs">=</span>
                  <span className="text-blue-300 font-mono font-bold text-sm">{j >= 0 ? j : "—"}</span>
                </div>
                {isVisiting && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1.5">
                    <span className="text-slate-400 font-mono text-xs">grid[i][j]</span>
                    <span className="text-slate-500 text-xs">=</span>
                    <span className="text-emerald-300 font-mono font-bold text-sm">{defaultGrid[i][j]}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── 코드 + 출력 섹션 ── */}
          <div className="flex-1 flex flex-col gap-3">
            {/* 코드 블록 */}
            <div className="bg-slate-900/80 rounded-xl border border-slate-700/40 overflow-hidden">
              <div className="px-3 py-1.5 bg-slate-800/60 border-b border-slate-700/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span className="text-slate-500 text-xs font-mono">main.cpp</span>
              </div>
              <div className="p-3 font-mono text-xs sm:text-sm space-y-0.5">
                {/* 바깥 루프 */}
                <div className={cn(
                  "flex flex-wrap items-center gap-x-1 px-2 py-1 rounded-lg transition-all duration-200",
                  isEnteringRow ? "bg-amber-500/15 border border-amber-500/20" : "border border-transparent"
                )}>
                  <span className="text-purple-400">for</span>
                  <span className="text-slate-500">(int</span>
                  <span className={cn("font-bold", i >= 0 ? "text-amber-300" : "text-slate-300")}> i</span>
                  <span className="text-slate-500">= 0; i &lt;</span>
                  <span className="text-amber-300 font-bold"> {rows}</span>
                  <span className="text-slate-500">; i++) &#123;</span>
                  {isEnteringRow && (
                    <span className="ml-1 text-amber-300 text-xs font-semibold animate-pulse">↵ i={i}</span>
                  )}
                </div>

                {/* 안쪽 루프 */}
                <div className={cn(
                  "flex flex-wrap items-center gap-x-1 ml-4 px-2 py-1 rounded-lg transition-all duration-200",
                  isVisiting ? "bg-blue-500/15 border border-blue-500/20" : "border border-transparent"
                )}>
                  <span className="text-purple-400">for</span>
                  <span className="text-slate-500">(int</span>
                  <span className={cn("font-bold", j >= 0 ? "text-blue-300" : "text-slate-300")}> j</span>
                  <span className="text-slate-500">= 0; j &lt;</span>
                  <span className="text-blue-300 font-bold"> {cols}</span>
                  <span className="text-slate-500">; j++) &#123;</span>
                  {isVisiting && (
                    <span className="ml-1 text-blue-300 text-xs font-semibold animate-pulse">↵ j={j}</span>
                  )}
                </div>

                {/* cout */}
                <div className={cn(
                  "flex items-center gap-x-1 ml-8 px-2 py-1 rounded-lg transition-all duration-200",
                  isVisiting ? "bg-emerald-500/10 border border-emerald-500/15" : "border border-transparent"
                )}>
                  <span className="text-cyan-400">cout</span>
                  <span className="text-slate-500">&lt;&lt;</span>
                  <span className={cn(
                    "transition-all duration-200",
                    isVisiting ? "text-emerald-200" : "text-slate-300"
                  )}>
                    grid[
                    <span className={cn("font-bold", i >= 0 ? "text-amber-300" : "text-slate-400")}>
                      {i >= 0 ? i : "i"}
                    </span>
                    ][
                    <span className={cn("font-bold", j >= 0 ? "text-blue-300" : "text-slate-400")}>
                      {j >= 0 ? j : "j"}
                    </span>
                    ]
                  </span>
                  {isVisiting && (
                    <span className="text-slate-500 ml-1">
                      <span className="text-slate-500">// →</span>
                      <span className="text-emerald-300 font-bold ml-1">{defaultGrid[i][j]}</span>
                    </span>
                  )}
                </div>

                <div className="ml-4 text-slate-600 px-2">&#125;</div>
                <div className="text-slate-600 px-2">&#125;</div>
              </div>
            </div>

            {/* 출력 트레일 */}
            <div className="bg-slate-900/60 rounded-xl border border-slate-700/40 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <ChevronRight className="w-3 h-3 text-slate-500" />
                <span className="text-slate-500 text-xs font-mono">{lbl.output}</span>
              </div>
              <div className="min-h-[28px] flex flex-wrap gap-1.5">
                {visited.map((key, idx) => {
                  const [r, c] = key.split(",").map(Number)
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-700/60 rounded text-xs font-mono text-slate-300 border border-slate-600/40"
                    >
                      <span className="text-slate-500 text-[10px]">[{r}][{c}]</span>
                      <span className="text-emerald-300 font-bold">{defaultGrid[r][c]}</span>
                    </span>
                  )
                })}
                {isVisiting && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/20 rounded text-xs font-mono border border-emerald-500/40 animate-pulse">
                    <span className="text-slate-400 text-[10px]">[{i}][{j}]</span>
                    <span className="text-emerald-300 font-bold">{defaultGrid[i][j]}</span>
                  </span>
                )}
                {visited.length === 0 && !isVisiting && (
                  <span className="text-slate-600 text-xs font-mono italic">
                    {isEn ? "nothing yet..." : "아직 출력 없음..."}
                  </span>
                )}
                {isDone && (
                  <span className="ml-1 text-emerald-400 text-xs font-mono">✓</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 컨트롤 바 */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          onClick={isDone ? reset : stepForward}
          disabled={false}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm",
            isDone
              ? "bg-slate-600 hover:bg-slate-500 text-white"
              : phase === "idle"
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
          )}
        >
          {phase === "idle" ? <Play className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {isDone ? lbl.restart : phase === "idle" ? lbl.start : lbl.nextStep}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/40 rounded-xl text-sm text-slate-400 hover:text-slate-300 transition-all duration-150"
          title={lbl.restart}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* 진행 바 */}
        {(visited.length > 0 || isDone) && (
          <div className="flex-1 ml-2">
            <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.round((visited.length / (rows * cols)) * 100)}%` }}
              />
            </div>
            <div className="text-right text-xs text-slate-600 font-mono mt-0.5">
              {visited.length}/{rows * cols}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
