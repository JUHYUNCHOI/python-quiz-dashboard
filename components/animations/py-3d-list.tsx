"use client"

// ============================================
// 레슨 54 (파이썬 3차원 리스트) 전용 인터랙티브 컴포넌트 2종
//   ① Py3DFloorExplore — 1-6: 층을 넘기며(◀▶) 격자를 보고, 칸을 눌러 floors[f][r][c] 확인
//   ② Py3DStateToggle  — 3-5: 같은 (행,열) 인데 상태값(k) 만 바꾸면 값이 달라지는 것을 탭으로 확인
// 자동재생 없음 — 전부 버튼을 눌러야 다음으로 간다 (CLAUDE.md 시뮬 원칙).
// ============================================

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const t = (isEn: boolean, ko: string, en: string) => (isEn ? en : ko)

// ------------------------------------------------------------------
// ① Py3DFloorExplore — data/lesson54.ts ch1 의 board1/board2 와 같은 값
// ------------------------------------------------------------------

const FLOORS = [
  [
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 1],
    [0, 1, 0],
  ],
]
const FLOOR_LABELS_KO = ["1층 (1반)", "2층 (2반)"]
const FLOOR_LABELS_EN = ["Floor 1 (Class 1)", "Floor 2 (Class 2)"]

export function Py3DFloorExplore({ lang = "ko" }: { lang?: string }) {
  const isEn = lang === "en"
  const [f, setF] = useState(0)
  const [sel, setSel] = useState<{ r: number; c: number } | null>(null)
  const labels = isEn ? FLOOR_LABELS_EN : FLOOR_LABELS_KO

  const exprText = !sel
    ? t(isEn, "칸을 하나 눌러보세요", "Click any cell to start")
    : `floors[${f}][${sel.r}][${sel.c}]`
  const resultText = !sel ? "—" : `${FLOORS[f][sel.r][sel.c]}`

  const goFloor = (nf: number) => {
    setF(nf)
    setSel(null)
  }

  return (
    <div className="bg-violet-50/60 rounded-2xl border border-violet-200 shadow-md p-4 sm:p-5">
      {/* 층 이동 */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => goFloor(0)}
          disabled={f === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-600 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          {t(isEn, "이전 층", "Prev floor")}
        </button>
        <div className="flex-1 text-center font-bold text-violet-700 text-sm sm:text-base">
          {labels[f]}
        </div>
        <button
          onClick={() => goFloor(1)}
          disabled={f === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-30"
        >
          {t(isEn, "다음 층", "Next floor")}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 그리드 */}
      <div className="flex justify-center mb-4">
        <div className="inline-block">
          {FLOORS[f].map((row, r) => (
            <div key={r} className="flex gap-1.5 mb-1.5">
              {row.map((v, c) => {
                const isSel = sel?.r === r && sel?.c === c
                return (
                  <button
                    key={c}
                    onClick={() => setSel({ r, c })}
                    className={cn(
                      "w-11 h-11 sm:w-12 sm:h-12 rounded-xl font-mono font-bold text-sm sm:text-base border-2 transition-all",
                      isSel
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700 scale-105"
                        : "bg-white border-slate-200 text-slate-600 hover:border-violet-300"
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
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-sm text-slate-700">{exprText}</span>
        <span className="font-mono text-sm font-bold text-emerald-600">→ {resultText}</span>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// ② Py3DStateToggle — data/lesson54.ts ch3 의 ways 표와 같은 값
// ------------------------------------------------------------------

const WAYS = [
  [
    [1, 0],
    [2, 1],
  ],
  [
    [3, 1],
    [0, 2],
  ],
]

export function Py3DStateToggle({ lang = "ko" }: { lang?: string }) {
  const isEn = lang === "en"
  const [r, setR] = useState(1)
  const [c, setC] = useState(0)
  const [k, setK] = useState(0)

  const value = WAYS[r][c][k]

  return (
    <div className="bg-amber-50/60 rounded-2xl border border-amber-200 shadow-md p-4 sm:p-5">
      <p className="text-sm text-slate-600 mb-3">
        {t(
          isEn,
          "위치(행, 열)는 그대로 두고 상태(k)만 눌러 바꿔보세요.",
          "Keep the location (row, col) fixed and toggle the state (k)."
        )}
      </p>

      {/* 위치 선택 — 2x2 */}
      <div className="mb-3">
        <div className="text-xs font-bold text-slate-500 mb-1.5">
          {t(isEn, "위치 (행, 열) — 이건 그대로 있어요", "Location (row, col) — stays put")}
        </div>
        <div className="inline-flex flex-col gap-1.5">
          {[0, 1].map((rr) => (
            <div key={rr} className="flex gap-1.5">
              {[0, 1].map((cc) => {
                const isSel = r === rr && c === cc
                return (
                  <button
                    key={cc}
                    onClick={() => {
                      setR(rr)
                      setC(cc)
                    }}
                    className={cn(
                      "w-16 h-10 rounded-lg font-mono text-xs sm:text-sm font-bold border-2 transition-all",
                      isSel
                        ? "bg-sky-100 border-sky-500 text-sky-700"
                        : "bg-white border-slate-200 text-slate-500 hover:border-sky-300"
                    )}
                  >
                    ({rr},{cc})
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 상태(k) 탭 */}
      <div className="mb-4">
        <div className="text-xs font-bold text-slate-500 mb-1.5">
          {t(isEn, "상태 (k) — 이걸 눌러 바꿔보세요", "State (k) — press to change this")}
        </div>
        <div className="flex gap-2">
          {[0, 1].map((kk) => (
            <button
              key={kk}
              onClick={() => setK(kk)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold font-mono transition-all",
                k === kk ? "bg-amber-500 text-white shadow" : "bg-white text-slate-500 border border-slate-200"
              )}
            >
              k = {kk}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-sm text-slate-700">
          ways[{r}][{c}][{k}]
        </span>
        <span className="font-mono text-sm font-bold text-emerald-600">→ {value}</span>
      </div>
    </div>
  )
}
