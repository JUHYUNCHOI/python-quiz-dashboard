"use client"

import { useState, useCallback } from "react"
import { RotateCcw, SkipForward } from "lucide-react"
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
  // visited: set of "i,j" strings
  const [visited, setVisited] = useState<Set<string>>(new Set())

  const t = {
    title: isEn ? "Nested For Loop Visualizer" : "이중 for문 시각화",
    notStarted: isEn ? "Not started" : "시작 전",
    enterRow: (r: number) => isEn ? `Enter row i = ${r}` : `i = ${r} 행 진입`,
    visit: (r: number, c: number) => isEn ? `grid[${r}][${c}] = ${defaultGrid[r][c]}` : `grid[${r}][${c}] = ${defaultGrid[r][c]} 접근`,
    done: isEn ? "Done ✓" : "완료 ✓",
    nextStep: isEn ? "Next Step" : "다음 단계",
    restart: isEn ? "Restart" : "다시 시작",
    outerLoop: isEn ? "outer (row)" : "바깥 루프 (행)",
    innerLoop: isEn ? "inner (col)" : "안쪽 루프 (열)",
    visited: isEn ? "visited" : "방문",
    current: isEn ? "current" : "현재",
  }

  const statusText = (() => {
    if (phase === "idle") return t.notStarted
    if (phase === "done") return t.done
    if (phase === "entering-row") return t.enterRow(i)
    if (phase === "visiting") return t.visit(i, j)
    return ""
  })()

  // 클릭당 한 단계씩만 전진
  const stepForward = useCallback(() => {
    if (phase === "done") return

    if (phase === "idle") {
      setI(0)
      setJ(-1)
      setPhase("entering-row")
      return
    }

    if (phase === "entering-row") {
      // 첫 번째 셀 방문 시작
      setJ(0)
      setPhase("visiting")
      return
    }

    if (phase === "visiting") {
      setVisited(prev => new Set([...prev, `${i},${j}`]))
      const nextJ = j + 1
      if (nextJ < cols) {
        // 같은 행의 다음 열
        setJ(nextJ)
      } else {
        // 다음 행으로
        const nextI = i + 1
        if (nextI < rows) {
          setI(nextI)
          setJ(-1)
          setPhase("entering-row")
        } else {
          setPhase("done")
        }
      }
    }
  }, [phase, i, j, rows, cols])

  const reset = () => {
    setI(-1)
    setJ(-1)
    setPhase("idle")
    setVisited(new Set())
  }

  const isDone = phase === "done"
  const isEnteringRow = phase === "entering-row"

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 sm:p-6 text-white overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-medium text-slate-300">{title ?? t.title}</h3>
        <span className="px-2 py-1 bg-slate-700 rounded-lg font-mono text-xs text-slate-300">
          {statusText}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* 그리드 시각화 */}
        <div className="flex-shrink-0">
          <div className="text-xs text-slate-500 mb-2 font-mono">
            grid[{rows}][{cols}]
          </div>
          {/* 열 인덱스 헤더 */}
          <div className="flex gap-1 mb-1 ml-7">
            {Array.from({ length: cols }, (_, c) => (
              <div key={c} className={cn(
                "w-10 h-5 flex items-center justify-center text-xs font-mono font-bold rounded transition-colors duration-200",
                phase === "visiting" && j === c ? "text-blue-300" : "text-slate-600"
              )}>
                j={c}
              </div>
            ))}
          </div>
          {defaultGrid.map((row, r) => (
            <div key={r} className="flex items-center gap-1 mb-1">
              {/* 행 인덱스 */}
              <div className={cn(
                "w-6 text-xs font-mono font-bold text-right mr-1 transition-colors duration-200",
                (phase === "entering-row" || phase === "visiting") && i === r
                  ? "text-yellow-300"
                  : "text-slate-600"
              )}>
                {r}
              </div>
              {row.map((val, c) => {
                const isCurrentRow = i === r
                const isCurrentCell = i === r && j === c && phase === "visiting"
                const isRowHighlight = isCurrentRow && isEnteringRow
                const wasVisited = visited.has(`${r},${c}`)
                return (
                  <div
                    key={c}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-sm transition-all duration-200",
                      isCurrentCell
                        ? "border-green-400 bg-green-500/30 text-green-200 scale-110"
                        : isRowHighlight
                        ? "border-yellow-400/60 bg-yellow-500/10 text-slate-200"
                        : wasVisited
                        ? "border-slate-600 bg-slate-700/40 text-slate-500"
                        : "border-slate-700 bg-slate-800/60 text-slate-300"
                    )}
                  >
                    {val}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* for 루프 코드 */}
        <div className="flex-1 bg-slate-800/50 rounded-xl p-3 font-mono text-xs sm:text-sm">
          {/* 바깥 루프 */}
          <div className={cn(
            "flex flex-wrap items-center gap-1 mb-1 px-1 rounded transition-all duration-200",
            isEnteringRow ? "bg-yellow-500/20" : ""
          )}>
            <span className="text-blue-400">for</span>
            <span className="text-slate-400">(int</span>
            <span className={cn("font-bold", i >= 0 ? "text-yellow-300" : "text-slate-300")}> i</span>
            <span className="text-slate-400">= 0; i &lt;</span>
            <span className="text-yellow-300"> {rows}</span>
            <span className="text-slate-400">; i++)</span>
            <span className="text-slate-400">&#123;</span>
            {isEnteringRow && (
              <span className="ml-2 text-yellow-300 text-xs">← i = {i}</span>
            )}
          </div>

          {/* 안쪽 루프 */}
          <div className={cn(
            "ml-4 flex flex-wrap items-center gap-1 mb-1 px-1 rounded transition-all duration-200",
            phase === "visiting" ? "bg-green-500/20" : ""
          )}>
            <span className="text-blue-400">for</span>
            <span className="text-slate-400">(int</span>
            <span className={cn("font-bold", j >= 0 ? "text-blue-300" : "text-slate-300")}> j</span>
            <span className="text-slate-400">= 0; j &lt;</span>
            <span className="text-yellow-300"> {cols}</span>
            <span className="text-slate-400">; j++)</span>
            <span className="text-slate-400">&#123;</span>
            {phase === "visiting" && (
              <span className="ml-2 text-blue-300 text-xs">← j = {j}</span>
            )}
          </div>

          {/* 접근 코드 */}
          <div className={cn(
            "ml-8 flex items-center gap-1 mb-1 px-1 rounded transition-all duration-200",
            phase === "visiting" ? "bg-green-500/10" : ""
          )}>
            <span className="text-green-400">cout</span>
            <span className="text-slate-400">&lt;&lt;</span>
            <span className={cn(
              "px-1 rounded transition-all duration-200",
              phase === "visiting" ? "text-green-200 bg-green-500/20" : "text-slate-300"
            )}>
              grid[
              <span className={cn("font-bold", i >= 0 ? "text-yellow-300" : "text-slate-400")}>
                {i >= 0 ? i : "i"}
              </span>
              ][
              <span className={cn("font-bold", j >= 0 ? "text-blue-300" : "text-slate-400")}>
                {j >= 0 ? j : "j"}
              </span>
              ]
            </span>
            {phase === "visiting" && (
              <span className="text-green-300 font-bold">= {defaultGrid[i][j]}</span>
            )}
          </div>

          <div className="ml-4 text-slate-400">&#125;</div>
          <div className="text-slate-400">&#125;</div>

          {/* i, j 현재값 */}
          {(i >= 0 || j >= 0) && phase !== "done" && (
            <div className="mt-2 pt-2 border-t border-slate-700 flex gap-4 text-xs">
              <span>
                <span className="text-slate-500">i = </span>
                <span className="text-yellow-300 font-bold">{i >= 0 ? i : "?"}</span>
              </span>
              <span>
                <span className="text-slate-500">j = </span>
                <span className="text-blue-300 font-bold">{j >= 0 ? j : "?"}</span>
              </span>
              {phase === "visiting" && (
                <span>
                  <span className="text-slate-500">grid[i][j] = </span>
                  <span className="text-green-300 font-bold">{defaultGrid[i][j]}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 방문 순서 트레일 */}
      {visited.size > 0 && (
        <div className="bg-slate-950/40 rounded-xl p-3 mb-4 text-xs font-mono">
          <span className="text-slate-500 mr-2">{isEn ? "visited:" : "방문 순서:"}</span>
          {Array.from(visited).map((key, idx) => {
            const [r, c] = key.split(",")
            return (
              <span key={key} className="text-slate-400">
                [{r}][{c}]{idx < visited.size - 1 ? " → " : ""}
              </span>
            )
          })}
          {phase === "visiting" && (
            <span className="text-green-300"> → [{i}][{j}]</span>
          )}
        </div>
      )}

      {/* 컨트롤 */}
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
