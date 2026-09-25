"use client"

// ============================================
// 레슨 53 (파이썬 2차원 리스트) 전용 인터랙티브 컴포넌트 3종
//   ① Py2DGridExplore — 1-6: 행 전체 보기 / 칸 하나 보기 클릭 토글
//   ② Py2DAliasArrows — 2-4: [[0]*5]*3 함정 — 화살표 셋이 리스트 하나를 가리킴
//   ③ Py2DGridWalk   — 3-3: 이중 for 순회 — 커서가 행→열 순서로 이동 (수동 ◀▶)
// 자동재생 없음 — 전부 버튼을 눌러야 다음으로 간다 (CLAUDE.md 시뮬 원칙).
// ============================================

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const t = (isEn: boolean, ko: string, en: string) => (isEn ? en : ko)

// ------------------------------------------------------------------
// ① Py2DGridExplore
// ------------------------------------------------------------------

const NAMES = ["민지", "서준", "하은"]
const ATT = [
  [1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1],
  [0, 1, 1, 0, 1],
]

export function Py2DGridExplore({ lang = "ko" }: { lang?: string }) {
  const isEn = lang === "en"
  const [mode, setMode] = useState<"row" | "cell">("row")
  const [sel, setSel] = useState<{ r: number; c: number } | null>(null)

  const exprText = !sel
    ? t(isEn, "칸을 하나 눌러보세요", "Click any cell to start")
    : mode === "row"
    ? `students[${sel.r}]`
    : `students[${sel.r}][${sel.c}]`

  const resultText = !sel
    ? "—"
    : mode === "row"
    ? `[${ATT[sel.r].join(", ")}]`
    : `${ATT[sel.r][sel.c]}`

  return (
    <div className="bg-indigo-50/60 rounded-2xl border border-indigo-200 shadow-md p-4 sm:p-5">
      {/* 모드 토글 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("row")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all",
            mode === "row" ? "bg-amber-500 text-white shadow" : "bg-white text-slate-500 border border-slate-200"
          )}
        >
          {t(isEn, "🟧 가로줄 전체 보기", "🟧 Whole row")}
        </button>
        <button
          onClick={() => setMode("cell")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all",
            mode === "cell" ? "bg-emerald-500 text-white shadow" : "bg-white text-slate-500 border border-slate-200"
          )}
        >
          {t(isEn, "🟩 칸 하나만 보기", "🟩 One cell")}
        </button>
      </div>

      {/* 그리드 */}
      <div className="overflow-x-auto">
        <div className="inline-block">
          {ATT.map((row, r) => (
            <div key={r} className="flex items-center gap-1.5 mb-1.5">
              <div className="w-14 shrink-0 text-xs sm:text-sm font-bold text-slate-500 text-right pr-1">
                {NAMES[r]}
              </div>
              {row.map((v, c) => {
                const isRowHit = mode === "row" && sel?.r === r
                const isCellHit = mode === "cell" && sel?.r === r && sel?.c === c
                return (
                  <button
                    key={c}
                    onClick={() => setSel({ r, c })}
                    className={cn(
                      "w-10 h-10 sm:w-11 sm:h-11 rounded-lg font-mono font-bold text-sm sm:text-base border-2 transition-all",
                      isRowHit || isCellHit
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700 scale-105"
                        : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300"
                    )}
                  >
                    {v}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 결과 표시 */}
      <div className="mt-4 bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-sm text-slate-700">{exprText}</span>
        <span className="font-mono text-sm font-bold text-emerald-600">→ {resultText}</span>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// ② Py2DAliasArrows
// ------------------------------------------------------------------

export function Py2DAliasArrows({ lang = "ko" }: { lang?: string }) {
  const isEn = lang === "en"
  const [tab, setTab] = useState<"bad" | "good">("bad")
  // bad: 셋 다 같은 리스트를 가리킴
  const [shared, setShared] = useState<number[]>([0, 0, 0, 0, 0])
  // good: 각자 다른 리스트
  const [independent, setIndependent] = useState<number[][]>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])

  const applyBad = () => {
    const next = [...shared]
    next[0] = 9
    setShared(next)
  }
  const applyGood = () => {
    const next = independent.map((row) => [...row])
    next[0][0] = 9
    setIndependent(next)
  }
  const reset = () => {
    setShared([0, 0, 0, 0, 0])
    setIndependent([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ])
  }

  const Box = ({ label, values, highlight }: { label: string; values: number[]; highlight: boolean }) => (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-xs sm:text-sm font-bold text-slate-500">{label}</span>
      <div className="text-slate-300 text-lg leading-none">↓</div>
      <div
        className={cn(
          "flex gap-1 rounded-lg border-2 px-2 py-1.5 transition-all",
          highlight ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"
        )}
      >
        {values.map((v, i) => (
          <span
            key={i}
            className={cn(
              "w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded font-mono text-xs sm:text-sm font-bold",
              v !== 0 ? "bg-rose-200 text-rose-700" : "bg-slate-100 text-slate-400"
            )}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-rose-50/50 rounded-2xl border border-rose-200 shadow-md p-4 sm:p-5">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("bad")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold font-mono transition-all",
            tab === "bad" ? "bg-rose-500 text-white shadow" : "bg-white text-slate-500 border border-slate-200"
          )}
        >
          ❌ [[0]*5]*3
        </button>
        <button
          onClick={() => setTab("good")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold font-mono transition-all",
            tab === "good" ? "bg-emerald-500 text-white shadow" : "bg-white text-slate-500 border border-slate-200"
          )}
        >
          ✅ [... for _ in range(3)]
        </button>
      </div>

      {tab === "bad" ? (
        <>
          <p className="text-sm text-slate-600 mb-3">
            {t(
              isEn,
              "board[0], board[1], board[2] 가 전부 똑같은 리스트 하나를 가리켜요.",
              "board[0], board[1], board[2] all point to the exact same list."
            )}
          </p>
          <div className="flex justify-center gap-6 flex-wrap mb-4">
            <Box label="board[0]" values={shared} highlight={shared[0] !== 0} />
            <Box label="board[1]" values={shared} highlight={shared[0] !== 0} />
            <Box label="board[2]" values={shared} highlight={shared[0] !== 0} />
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-slate-600 mb-3">
            {t(
              isEn,
              "board[0], board[1], board[2] 가 각자 자기만의 리스트를 가져요.",
              "board[0], board[1], board[2] each have their own separate list."
            )}
          </p>
          <div className="flex justify-center gap-6 flex-wrap mb-4">
            <Box label="board[0]" values={independent[0]} highlight={independent[0][0] !== 0} />
            <Box label="board[1]" values={independent[1]} highlight={independent[1][0] !== 0} />
            <Box label="board[2]" values={independent[2]} highlight={independent[2][0] !== 0} />
          </div>
        </>
      )}

      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={tab === "bad" ? applyBad : applyGood}
          className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white font-mono transition-all"
        >
          board[0][0] = 9
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t(isEn, "다시", "Reset")}
        </button>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// ③ Py2DGridWalk
// ------------------------------------------------------------------

const WALK_GRID = [
  [1, 1, 0],
  [0, 1, 1],
]

type FlatStep = { i: number; j: number; kind: "outer" | "inner" }

export function Py2DGridWalk({ lang = "ko" }: { lang?: string }) {
  const isEn = lang === "en"
  const rows = WALK_GRID.length
  const cols = WALK_GRID[0].length

  // 걸음 목록 — 미리 계산해두고 화살표로 앞뒤 이동만 한다 (자동재생 없음)
  const steps = useMemo<FlatStep[]>(() => {
    const out: FlatStep[] = []
    for (let i = 0; i < rows; i++) {
      out.push({ i, j: -1, kind: "outer" })
      for (let j = 0; j < cols; j++) {
        out.push({ i, j, kind: "inner" })
      }
    }
    return out
  }, [rows, cols])

  const [ptr, setPtr] = useState(-1) // -1 = 시작 전
  const cur = ptr >= 0 ? steps[ptr] : null
  const isDone = ptr === steps.length - 1

  const visited = steps
    .slice(0, ptr + 1)
    .filter((s) => s.kind === "inner")

  const next = () => setPtr((p) => Math.min(p + 1, steps.length - 1))
  const prev = () => setPtr((p) => Math.max(p - 1, -1))
  const reset = () => setPtr(-1)

  const statusText = !cur
    ? t(isEn, "시작 전", "Not started")
    : cur.kind === "outer"
    ? t(isEn, `바깥 for → row = students[${cur.i}]`, `outer for → row = students[${cur.i}]`)
    : t(isEn, `안쪽 for → day = row[${cur.j}] = ${WALK_GRID[cur.i][cur.j]}`, `inner for → day = row[${cur.j}] = ${WALK_GRID[cur.i][cur.j]}`)

  return (
    <div className="bg-sky-50/60 rounded-2xl border border-sky-200 shadow-md p-4 sm:p-5">
      {/* 코드 */}
      <div className="bg-slate-900 rounded-xl p-3 font-mono text-xs sm:text-sm mb-4 space-y-0.5">
        <div className={cn("px-2 py-1 rounded", cur?.kind === "outer" ? "bg-amber-500/30" : "")}>
          <span className="text-purple-400">for</span> <span className="text-sky-300">row</span> <span className="text-purple-400">in</span> <span className="text-slate-200">students:</span>
        </div>
        <div className={cn("px-2 py-1 rounded ml-4", cur?.kind === "inner" ? "bg-emerald-500/30" : "")}>
          <span className="text-purple-400">for</span> <span className="text-sky-300">day</span> <span className="text-purple-400">in</span> <span className="text-slate-200">row:</span>
        </div>
        <div className="px-2 py-1 rounded ml-8 text-slate-200">print(day)</div>
      </div>

      {/* 상태 배지 */}
      <div className="mb-3">
        <span
          className={cn(
            "inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-bold",
            isDone
              ? "bg-emerald-100 text-emerald-700"
              : cur?.kind === "outer"
              ? "bg-amber-100 text-amber-700"
              : cur?.kind === "inner"
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-500"
          )}
        >
          {isDone ? t(isEn, "순회 완료! ✓", "Done! ✓") : statusText}
        </span>
      </div>

      {/* 그리드 */}
      <div className="flex justify-center mb-4">
        <div className="inline-block">
          {WALK_GRID.map((row, r) => (
            <div key={r} className="flex gap-1.5 mb-1.5">
              {row.map((v, c) => {
                const isCur = cur?.kind === "inner" && cur.i === r && cur.j === c
                const isRowActive = cur?.i === r && cur.kind !== undefined
                const wasVisited = visited.some((s) => s.i === r && s.j === c)
                return (
                  <div
                    key={c}
                    className={cn(
                      "w-11 h-11 flex items-center justify-center rounded-xl font-mono font-bold text-sm border-2 transition-all",
                      isCur
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700 scale-110"
                        : isRowActive
                        ? "bg-amber-50 border-amber-300 text-amber-700"
                        : wasVisited
                        ? "bg-slate-100 border-slate-300 text-slate-400"
                        : "bg-white border-slate-200 text-slate-600"
                    )}
                  >
                    {v}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 출력 트레일 */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 mb-4">
        <div className="text-slate-400 text-xs font-mono mb-1.5">{t(isEn, "출력", "Output")}</div>
        <div className="min-h-[24px] flex flex-wrap gap-1.5">
          {visited.length === 0 && <span className="text-slate-300 text-xs font-mono italic">...</span>}
          {visited.map((s, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-emerald-600 font-bold">
              {WALK_GRID[s.i][s.j]}
            </span>
          ))}
        </div>
      </div>

      {/* 컨트롤 — 수동 ◀▶ 만, 자동재생 없음 */}
      <div className="flex items-center gap-2">
        <button
          onClick={prev}
          disabled={ptr === -1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-600 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          {t(isEn, "이전", "Prev")}
        </button>
        <button
          onClick={next}
          disabled={isDone}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30"
        >
          {t(isEn, "다음", "Next")}
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t(isEn, "처음부터", "Restart")}
        </button>
      </div>
    </div>
  )
}
