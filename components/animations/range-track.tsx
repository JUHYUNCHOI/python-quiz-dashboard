"use client"

import { useEffect, useMemo, useState } from "react"

// range 숫자 트랙 시뮬 — "시작 포함 / 끝 제외" 를 눈으로
// 애들이 제일 헷갈리는 두-숫자 range(2, 6) 을 마커가 한 칸씩 걸으며 보여줌.

interface Preset {
  code: string // range(...) 안의 인자 표기
  start: number
  stop: number
  step: number
}

const PRESETS: Preset[] = [
  { code: "5", start: 0, stop: 5, step: 1 },
  { code: "2, 6", start: 2, stop: 6, step: 1 },
  { code: "1, 10, 2", start: 1, stop: 10, step: 2 },
]

function produce({ start, stop, step }: Preset): number[] {
  const out: number[] = []
  for (let n = start; n < stop; n += step) out.push(n)
  return out
}

export function RangeTrack() {
  const [presetIdx, setPresetIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0) // 0 = 아직 시작 전
  const [playing, setPlaying] = useState(false)

  const preset = PRESETS[presetIdx]
  const produced = useMemo(() => produce(preset), [preset])
  const total = produced.length + 1 // 마지막 = STOP + 결과
  const trackMax = Math.max(preset.stop, 9)

  // 자동 재생
  useEffect(() => {
    if (!playing) return
    if (stepIdx >= total) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStepIdx((s) => s + 1), 850)
    return () => clearTimeout(t)
  }, [playing, stepIdx, total])

  function pick(i: number) {
    setPresetIdx(i)
    setStepIdx(0)
    setPlaying(false)
  }
  function reset() {
    setStepIdx(0)
    setPlaying(false)
  }
  function next() {
    setPlaying(false)
    setStepIdx((s) => Math.min(s + 1, total))
  }

  const revealedCount = Math.min(stepIdx, produced.length)
  const revealed = produced.slice(0, revealedCount)
  const atStop = stepIdx >= total
  const current = stepIdx >= 1 && stepIdx <= produced.length ? produced[stepIdx - 1] : null
  const nextVal = produced.length ? produced[produced.length - 1] + preset.step : preset.start

  // 말풍선 narration
  let bubble = ""
  if (stepIdx === 0) {
    bubble = `range(${preset.code}) — 시작 ${preset.start} 부터, 끝 ${preset.stop} 은 "직전까지". ▷ 눌러봐요!`
  } else if (stepIdx <= produced.length) {
    if (stepIdx === 1) {
      bubble = `시작 = ${produced[0]}  ← range 의 첫 숫자 그대로 (포함!) ✓`
    } else {
      bubble = `+${preset.step} → ${produced[stepIdx - 1]}  (아직 끝 ${preset.stop} 전이라 포함) ✓`
    }
  } else {
    const over = nextVal > preset.stop
    bubble = `다음은 ${nextVal} — 끝 ${preset.stop} ${over ? "넘어서" : "라서"} STOP 🚫. 끝은 안 나와요!  →  결과: ${produced.join(", ")}  (${produced.length}개)`
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
      {/* 프리셋 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((p, i) => (
          <button
            key={p.code}
            onClick={() => pick(i)}
            className={`font-mono text-[13px] px-3 py-1.5 rounded-lg border transition ${
              i === presetIdx
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-slate-700 border-slate-300 hover:border-violet-400"
            }`}
          >
            range({p.code})
          </button>
        ))}
      </div>

      {/* 코드 한 줄 */}
      <div className="font-mono text-[13px] md:text-[14px] text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 mb-3">
        <span className="text-pink-600 font-semibold">for</span> i{" "}
        <span className="text-pink-600 font-semibold">in</span>{" "}
        <span className="text-emerald-600">range</span>(
        <span className="text-orange-600">{preset.code}</span>):
      </div>

      {/* 숫자 트랙 */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {Array.from({ length: trackMax + 1 }, (_, n) => {
          const isProducedAll = produced.includes(n)
          const isRevealed = revealed.includes(n)
          const isStop = n === preset.stop
          const isCurrent = current === n
          const isBefore = n < preset.start

          let cls =
            "relative w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono font-semibold border transition-all duration-200 "
          if (isRevealed) {
            cls += "bg-emerald-500 text-white border-emerald-600 "
          } else if (isStop) {
            cls += atStop
              ? "bg-red-100 text-red-500 border-red-400 line-through "
              : "bg-white text-red-400 border-red-300 border-dashed "
          } else if (isProducedAll) {
            cls += "bg-white text-slate-400 border-slate-200 "
          } else if (isBefore) {
            cls += "bg-slate-100 text-slate-300 border-slate-200 "
          } else {
            cls += "bg-white text-slate-300 border-slate-200 "
          }
          if (isCurrent) cls += "ring-2 ring-emerald-400 scale-110 "

          return (
            <div key={n} className={cls}>
              {n}
              {isRevealed && (
                <span className="absolute -top-1.5 -right-1.5 text-[10px]">✓</span>
              )}
              {isStop && atStop && (
                <span className="absolute -top-2 -right-1.5 text-[11px]">🚫</span>
              )}
            </div>
          )
        })}
      </div>

      {/* 시작/끝 라벨 */}
      <div className="flex gap-4 text-[11px] mb-3" style={{ wordBreak: "keep-all" }}>
        <span className="text-emerald-700">🟩 시작 = {preset.start} (포함)</span>
        <span className="text-red-500">🟥 끝 = {preset.stop} (제외 — 안 나옴)</span>
      </div>

      {/* 결과 리스트 */}
      <div className="flex items-center gap-2 mb-3 min-h-[2rem]">
        <span className="text-[12px] text-slate-500">뽑힌 숫자:</span>
        {revealed.length === 0 ? (
          <span className="text-[12px] text-slate-300">아직 없음</span>
        ) : (
          revealed.map((n) => (
            <span
              key={n}
              className="font-mono text-[13px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300"
            >
              {n}
            </span>
          ))
        )}
        {atStop && (
          <span className="text-[12px] text-slate-500 ml-1">→ {produced.length}개</span>
        )}
      </div>

      {/* 말풍선 */}
      <div className="relative mb-3">
        <div className="absolute left-6 -top-[7px] w-0 h-0 border-l-8 border-r-8 border-b-[8px] border-l-transparent border-r-transparent border-b-amber-300" />
        <div
          className="bg-amber-50 border-[1.5px] border-amber-300 rounded-2xl px-4 py-2.5 text-[13px] text-amber-900 leading-relaxed font-medium"
          style={{ wordBreak: "keep-all" }}
        >
          💬 {bubble}
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex gap-2">
        <button
          onClick={reset}
          className="text-[13px] px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
        >
          ↺ 처음
        </button>
        <button
          onClick={next}
          disabled={atStop}
          className="text-[13px] px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40"
        >
          ▷ 한 칸
        </button>
        <button
          onClick={() => {
            if (atStop) reset()
            setPlaying((p) => !p)
          }}
          className="text-[13px] px-3 py-1.5 rounded-lg border border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100"
        >
          {playing ? "⏸ 멈춤" : "▶ 자동"}
        </button>
      </div>
    </div>
  )
}
