"use client"

import { useState } from "react"
import { SkipForward, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

// ──────────────────────────────────────────────────────────────
// CinFillVisualizer
// cin >> 가 토큰을 하나씩 소비하면서 struct 배열/vector를 채우는 과정을 시각화
// ──────────────────────────────────────────────────────────────

interface StructItem { [key: string]: string | number }

interface CinFillVisualizerProps {
  structName?: string
  arrayName?: string
  fields?: string[]
  fieldLabels?: string[]
  items?: StructItem[]
  lang?: string
}

type CinStep =
  | { kind: "cin_n" }
  | { kind: "cin_field"; i: number; fi: number }

export function CinFillVisualizer({
  structName = "Student",
  arrayName = "students",
  fields = ["name", "score"],
  fieldLabels = ["name", "score"],
  items = [
    { name: "김철수", score: 95 },
    { name: "이영희", score: 87 },
    { name: "박민준", score: 72 },
  ],
  lang = "ko",
}: CinFillVisualizerProps) {
  const isEn = lang === "en"
  const n = items.length

  // ── 단계 & 토큰 시퀀스 생성 ──
  // steps[k] = k번째 cin >> 연산
  // tokens[k] = k번째 cin >> 가 읽는 값
  const steps: CinStep[] = [{ kind: "cin_n" }]
  const tokens: string[] = [String(n)]
  for (let i = 0; i < n; i++) {
    for (let fi = 0; fi < fields.length; fi++) {
      steps.push({ kind: "cin_field", i, fi })
      tokens.push(String(items[i][fields[fi]]))
    }
  }

  // stdin 디스플레이용 — 줄 단위로 그룹화
  // 줄 0: n
  // 줄 i+1: items[i] 의 모든 필드 토큰
  const tokenLines: { value: string; flatIdx: number }[][] = [
    [{ value: String(n), flatIdx: 0 }],
  ]
  for (let i = 0; i < n; i++) {
    tokenLines.push(
      fields.map((field, fi) => ({
        value: String(items[i][field]),
        flatIdx: 1 + i * fields.length + fi,
      }))
    )
  }

  const [stepIdx, setStepIdx] = useState(-1) // -1 = idle

  const isDone  = stepIdx >= steps.length
  const isIdle  = stepIdx < 0
  const current = (!isIdle && !isDone) ? steps[stepIdx] : null

  // 토큰 상태: consumed(지나감) | current(지금 읽는 중) | pending | idle
  const tokenStatus = (flatIdx: number) => {
    if (isIdle) return "idle"
    if (isDone || flatIdx < stepIdx) return "consumed"
    if (flatIdx === stepIdx) return "current"
    return "pending"
  }

  // 카드에 채워진 값 (현재 step 포함)
  const filled = new Map<string, string>()
  for (let s = 0; s <= stepIdx && s < steps.length; s++) {
    const st = steps[s]
    if (st.kind === "cin_field") {
      filled.set(`${st.i}-${st.fi}`, String(items[st.i][fields[st.fi]]))
    }
  }

  const showCards = stepIdx >= 0 // cin >> n 이후 카드 등장

  const next  = () => { if (!isDone) setStepIdx(s => s + 1); else setStepIdx(-1) }
  const reset = () => setStepIdx(-1)

  const activeCinN     = current?.kind === "cin_n"
  const activeCinField = current?.kind === "cin_field" ? current.fi : -1
  const displayI       = current?.kind === "cin_field" ? current.i : null

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
          <span className="text-slate-400 text-xs font-mono ml-2">
            {isEn ? "cin fills struct array" : "cin으로 struct 배열 채우기"}
          </span>
        </div>
        {!isIdle && (
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600/50">
            {isDone
              ? (isEn ? "Done ✓" : "완료 ✓")
              : `${stepIdx + 1} / ${steps.length}`}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* ── IDLE: 설명 화면 (시작 전) ── */}
        {isIdle && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              {/* 입력 형식 */}
              <div className="flex-1 bg-slate-950/70 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 mb-2 font-mono uppercase tracking-wider">
                  {isEn ? "Input format (stdin)" : "입력 형식 (stdin)"}
                </div>
                <div className="font-mono text-sm text-slate-300 leading-relaxed">
                  <div className="text-yellow-300">{n}</div>
                  {items.map((item, i) => (
                    <div key={i} className="text-slate-300">
                      {fields.map(f => String(item[f])).join(" ")}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                  {isEn
                    ? `↑ Line 1: n (count)\nLines 2~: one ${structName} per line`
                    : `↑ 첫 줄: n (개수)\n이후: 한 줄에 ${structName} 하나씩`}
                </div>
              </div>

              {/* 코드 */}
              <div className="flex-[2] bg-slate-800/50 rounded-xl p-3 border border-slate-700/40 font-mono text-sm">
                <div className="text-[11px] text-slate-500 mb-2 uppercase tracking-wider">code</div>
                <div>
                  <span className="text-orange-300">int</span>
                  <span className="text-white"> n</span>
                  <span className="text-slate-400">;</span>
                </div>
                <div>
                  <span className="text-sky-300">cin</span>
                  <span className="text-slate-400"> &gt;&gt; </span>
                  <span className="text-white">n</span>
                  <span className="text-slate-400">;</span>
                </div>
                <div className="mt-1">
                  <span className="text-sky-300">vector</span>
                  <span className="text-slate-400">&lt;</span>
                  <span className="text-orange-300">{structName}</span>
                  <span className="text-slate-400">&gt; </span>
                  <span className="text-white">{arrayName}</span>
                  <span className="text-slate-400">(n);</span>
                </div>
                <div className="mt-1">
                  <span className="text-blue-400">for</span>
                  <span className="text-slate-400"> (int i = 0; i &lt; n; i++) {"{"}</span>
                </div>
                {fields.map((field) => (
                  <div key={field} className="ml-4">
                    <span className="text-sky-300">cin</span>
                    <span className="text-slate-400"> &gt;&gt; </span>
                    <span className="text-slate-300">{arrayName}[i].{field}</span>
                    <span className="text-slate-400">;</span>
                  </div>
                ))}
                <div className="text-slate-400">{"}"}</div>
              </div>
            </div>

            {/* 시작 버튼 */}
            <button
              onClick={next}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              {isEn ? "▶ Start — watch cin fill step by step" : "▶ 시작하기 — cin이 채우는 과정 보기"}
            </button>
          </div>
        )}

        {/* ── RUNNING: stdin + 카드 + 코드 + 컨트롤 ── */}
        {!isIdle && <><div className="flex gap-3">

          {/* stdin 패널 */}
          <div className="bg-slate-950/70 rounded-xl p-3 flex-shrink-0 min-w-[110px]">
            <div className="text-[11px] text-slate-500 mb-2 font-mono uppercase tracking-wider">
              stdin
            </div>
            {tokenLines.map((line, li) => (
              <div key={li} className="flex gap-1.5 font-mono text-sm mb-0.5">
                {line.map((tok) => {
                  const st = tokenStatus(tok.flatIdx)
                  return (
                    <span
                      key={tok.flatIdx}
                      className={cn(
                        "rounded px-0.5 transition-all duration-200",
                        st === "current"  ? "bg-yellow-500/30 text-yellow-200 font-bold ring-1 ring-yellow-400/40" :
                        st === "consumed" ? "text-slate-600 line-through"  :
                        st === "pending"  ? "text-slate-400" :
                                            "text-slate-500"
                      )}
                    >
                      {tok.value}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>

          {/* 카드 영역 */}
          <div className="flex-1 min-w-0">
            {!showCards ? (
              <div className="text-slate-600 text-sm italic h-full flex items-center pl-1">
                {isEn ? "Press Next Step to begin" : "다음 단계를 눌러보세요"}
              </div>
            ) : (
              <>
                <div className="text-[11px] text-slate-500 mb-2 font-mono">
                  vector&lt;{structName}&gt; {arrayName}({n})
                </div>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
                >
                  {items.map((item, i) => {
                    const isActiveCard = current?.kind === "cin_field" && current.i === i
                    const filledCount  = fields.filter((_, fi) => filled.has(`${i}-${fi}`)).length
                    const isComplete   = filledCount === fields.length

                    return (
                      <div
                        key={i}
                        className={cn(
                          "rounded-xl border-2 p-3 transition-all duration-300",
                          isActiveCard
                            ? "border-blue-400 bg-blue-500/12 scale-[1.03]"
                            : isComplete
                            ? "border-emerald-500/50 bg-emerald-500/8"
                            : "border-slate-700 bg-slate-800/60"
                        )}
                      >
                        {/* 인덱스 배지 */}
                        <div className={cn(
                          "text-xs font-mono font-bold mb-2 w-6 h-6 rounded-md flex items-center justify-center",
                          isActiveCard ? "bg-blue-500 text-white" :
                          isComplete   ? "bg-emerald-600 text-white" :
                                         "bg-slate-700 text-slate-400"
                        )}>
                          {i}
                        </div>

                        {/* 필드 */}
                        {fields.map((field, fi) => {
                          const val = filled.get(`${i}-${fi}`)
                          const isFieldActive = isActiveCard &&
                            current?.kind === "cin_field" && current.fi === fi
                          return (
                            <div key={field} className="flex flex-col mb-1.5">
                              <span className={cn(
                                "text-[11px] font-mono",
                                isFieldActive ? "text-yellow-300 font-bold" :
                                val           ? "text-slate-400" : "text-slate-600"
                              )}>
                                {fieldLabels[fi] ?? field}
                              </span>
                              <span className={cn(
                                "font-mono text-sm font-semibold transition-all duration-200",
                                isFieldActive ? "text-yellow-100 animate-pulse" :
                                val           ? "text-slate-200" : "text-slate-700"
                              )}>
                                {val
                                  ? (typeof item[field] === "string" ? `"${val}"` : val)
                                  : "___"}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── 코드 블록 ── */}
        <div className="bg-slate-800/50 rounded-xl p-3 font-mono text-sm border border-slate-700/40">

          {/* cin >> n */}
          <div className={cn(
            "px-1.5 py-0.5 rounded transition-all duration-200 mb-0.5",
            activeCinN ? "bg-yellow-500/20" : ""
          )}>
            <span className="text-sky-300">cin</span>
            <span className="text-slate-400"> &gt;&gt; </span>
            <span className={activeCinN ? "text-yellow-200 font-bold" : "text-white"}>n</span>
            <span className="text-slate-400">;</span>
            {activeCinN && (
              <span className="ml-3 text-yellow-400/80 text-xs font-sans">
                ← {tokens[0]}
              </span>
            )}
          </div>

          {/* vector<Student> students(n); */}
          <div className="px-1.5 py-0.5 mb-1 text-slate-500">
            <span className="text-sky-300">vector</span>
            <span className="text-slate-400">&lt;</span>
            <span className="text-orange-300">{structName}</span>
            <span className="text-slate-400">&gt; </span>
            <span className="text-white">{arrayName}</span>
            <span className="text-slate-400">(n);</span>
          </div>

          {/* for 헤더 */}
          <div className="px-1.5 py-0.5 text-slate-500">
            <span className="text-blue-400">for</span>
            <span className="text-slate-400"> (</span>
            <span className="text-orange-300">int</span>
            <span className="text-white"> i = </span>
            <span className="text-yellow-300">0</span>
            <span className="text-slate-400">; i &lt; n; i++) {"{"}</span>
          </div>

          {/* cin >> 각 필드 */}
          {fields.map((field, fi) => (
            <div
              key={field}
              className={cn(
                "ml-4 px-1.5 py-0.5 rounded transition-all duration-200",
                activeCinField === fi ? "bg-yellow-500/20" : ""
              )}
            >
              <span className="text-sky-300">cin</span>
              <span className="text-slate-400"> &gt;&gt; </span>
              <span className={activeCinField === fi ? "text-yellow-200 font-bold" : "text-slate-300"}>
                {arrayName}[
                <span className={cn(
                  "font-bold",
                  isIdle || isDone ? "text-slate-400" : "text-blue-300"
                )}>
                  {isIdle || isDone ? "i" : (displayI !== null ? displayI : "i")}
                </span>
                ].{field}
              </span>
              <span className="text-slate-400">;</span>
              {activeCinField === fi && (
                <span className="ml-3 text-yellow-400/80 text-xs font-sans">
                  ← {tokens[stepIdx]}
                </span>
              )}
            </div>
          ))}

          <div className="px-1.5 py-0.5 text-slate-500">{"}"}</div>
        </div>

        {/* ── 컨트롤 ── */}
        <div className="flex items-center gap-2">
          <button
            onClick={next}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            {isDone
              ? (isEn ? "Restart" : "다시 시작")
              : (isEn ? "Next Step" : "다음 단계")}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        </>}

      </div>
    </div>
  )
}
