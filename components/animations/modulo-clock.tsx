"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"

// ============================================================
// 모듈로 (%) 시계 순환 시각화
//
// 4 가지 모드:
//   clock   — % 24 시계 (23 + 5 = 28 → 4시)
//   evenodd — % 2 짝홀 (두 줄로 배열)
//   lastdigit — % 10 일의 자리
//   multiple — % N == 0 배수 확인
//
// 기본 모드: clock (학생이 가장 직관적으로 잡음)
// ============================================================

type Mode = "clock" | "evenodd" | "lastdigit" | "multiple"

interface ModuloClockProps {
  lang?: "ko" | "en"
  defaultMode?: Mode
  defaultStart?: number
  defaultAdd?: number
  /** clock 모드의 시계 분할 수 (12 또는 24). 기본 24 */
  clockDivisions?: 12 | 24
}

const TXT = {
  ko: {
    title: "🕐 나머지(%) 시계",
    modeClock: "🕐 시계",
    modeEvenOdd: "짝/홀",
    modeLastDigit: "끝자리",
    modeMultiple: "배수 확인",
    start: "시작 숫자",
    add: "더할 숫자",
    number: "숫자",
    divisor: "나누는 수",
    result: "결과",
    sum: "합",
    quotient: "몫",
    remainder: "나머지",
    rotations: "바퀴",
    isEven: "짝수예요 ✨",
    isOdd: "홀수예요 🔥",
    isMultiple: "배수 맞아요",
    notMultiple: "배수 아니에요",
    formula: "식",
    play: "한 칸씩 돌리기",
    reset: "다시",
    hour: "시",
  },
  en: {
    title: "Modulo (%) Clock",
    modeClock: "Clock (% N)",
    modeEvenOdd: "Even/Odd (% 2)",
    modeLastDigit: "Last digit (% 10)",
    modeMultiple: "Multiple check (% N)",
    start: "Start",
    add: "Add",
    number: "Number",
    divisor: "Divisor",
    result: "Result",
    sum: "Sum",
    quotient: "Quotient",
    remainder: "Remainder",
    rotations: "laps",
    isEven: "Even",
    isOdd: "Odd",
    isMultiple: "Multiple",
    notMultiple: "Not multiple",
    formula: "Formula",
    play: "Step one",
    reset: "Reset",
    hour: "h",
  },
}

const ACCENT = "#6366f1" // indigo-500
const ACCENT_BG = "#eef2ff"
const POS = "#10b981" // emerald-500
const NEG = "#ef4444" // red-500

// ───────────────────────── helpers ─────────────────────────

function modPos(a: number, m: number): number {
  return ((a % m) + m) % m
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n))
}

// ───────────────────────── Clock mode ─────────────────────────

function ClockMode({
  t,
  start,
  add,
  setStart,
  setAdd,
  divisions,
}: {
  t: typeof TXT.ko
  start: number
  add: number
  setStart: (n: number) => void
  setAdd: (n: number) => void
  divisions: number
}) {
  // 안전한 정수 변환
  const s = clamp(Math.floor(start), 0, 999)
  const a = clamp(Math.floor(add), 0, 999)
  const sum = s + a
  const result = modPos(sum, divisions)
  const laps = Math.floor(sum / divisions)

  // 바늘 각도 — 12시(위)가 0, 시계방향
  // SVG 좌표: -90도가 위쪽
  const angleResult = (result / divisions) * 360
  const angleStart = (modPos(s, divisions) / divisions) * 360

  // 표시용 각도 (애니메이션: 시작 → 시작+add 까지 회전)
  // 총 회전량 = (a / divisions) * 360
  const totalRotation = (a / divisions) * 360

  const [animatingAngle, setAnimatingAngle] = useState(angleStart)

  useEffect(() => {
    setAnimatingAngle(angleStart)
    // 다음 tick 에 회전 시작
    const id = requestAnimationFrame(() => {
      setAnimatingAngle(angleStart + totalRotation)
    })
    return () => cancelAnimationFrame(id)
  }, [s, a, divisions, angleStart, totalRotation])

  // 다이얼 눈금
  const ticks = Array.from({ length: divisions }, (_, i) => i)
  const R = 110 // 시계 반지름
  const cx = 140
  const cy = 140

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      {/* 입력 패널 */}
      <div className="flex-1 w-full space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-gray-600">{t.start}</span>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(parseInt(e.target.value || "0", 10) || 0)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-mono"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-600">{t.add}</span>
            <input
              type="number"
              value={add}
              onChange={(e) => setAdd(parseInt(e.target.value || "0", 10) || 0)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-mono"
            />
          </label>
        </div>

        <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200 space-y-2">
          <div className="text-sm text-gray-700">
            <span className="font-mono">({s} + {a}) % {divisions}</span>
          </div>
          <div className="text-sm text-gray-700">
            = <span className="font-mono">{sum} % {divisions}</span>
          </div>
          <div className="text-2xl font-bold text-indigo-700 font-mono">
            = {result}
            {divisions === 24 || divisions === 12 ? (
              <span className="text-base text-gray-600 ml-1">{t.hour}</span>
            ) : null}
          </div>
          {laps > 0 && (
            <div className="text-xs text-gray-500">
              🔄 시계 {laps}바퀴 돌고 + {result} 칸 더
            </div>
          )}
        </div>
      </div>

      {/* 시계 SVG */}
      <div className="flex-shrink-0">
        <svg width={280} height={280} viewBox="0 0 280 280">
          {/* 시계 테두리 */}
          <circle
            cx={cx}
            cy={cy}
            r={R + 12}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth={2}
          />
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill={ACCENT_BG}
            stroke={ACCENT}
            strokeWidth={2}
          />

          {/* 눈금 + 숫자 */}
          {ticks.map((i) => {
            const angle = (i / divisions) * 360 - 90
            const rad = (angle * Math.PI) / 180
            const x1 = cx + Math.cos(rad) * (R - 6)
            const y1 = cy + Math.sin(rad) * (R - 6)
            const x2 = cx + Math.cos(rad) * R
            const y2 = cy + Math.sin(rad) * R
            const tx = cx + Math.cos(rad) * (R - 22)
            const ty = cy + Math.sin(rad) * (R - 22)
            const isResult = i === result
            const isStart = i === modPos(s, divisions)
            const isMajor = divisions === 24 ? i % 6 === 0 : i % 3 === 0
            // 24분할일 때 모든 숫자 표시하면 빽빽 → 짝수만
            const showNumber = divisions === 12 || i % 2 === 0
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? "#475569" : "#94a3b8"}
                  strokeWidth={isMajor ? 2 : 1}
                />
                {showNumber && (
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={11}
                    fontWeight={isResult || isStart ? 700 : 500}
                    fill={
                      isResult
                        ? "#dc2626"
                        : isStart
                        ? "#0891b2"
                        : "#475569"
                    }
                  >
                    {i}
                  </text>
                )}
                {isResult && (
                  <motion.circle
                    cx={cx + Math.cos(rad) * (R - 22)}
                    cy={cy + Math.sin(rad) * (R - 22)}
                    r={13}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth={2}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  />
                )}
              </g>
            )
          })}

          {/* 시작 위치 마커 (작은 동그라미) */}
          <circle
            cx={cx + Math.cos(((angleStart - 90) * Math.PI) / 180) * (R - 40)}
            cy={cy + Math.sin(((angleStart - 90) * Math.PI) / 180) * (R - 40)}
            r={4}
            fill="#0891b2"
          />

          {/* 회전하는 바늘 */}
          <motion.line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - (R - 18)}
            stroke="#dc2626"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ originX: `${cx}px`, originY: `${cy}px` }}
            initial={false}
            animate={{ rotate: animatingAngle }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <circle cx={cx} cy={cy} r={6} fill="#dc2626" />
        </svg>
      </div>
    </div>
  )
}

// ───────────────────────── EvenOdd mode ─────────────────────────

function EvenOddMode({
  t,
  n,
  setN,
}: {
  t: typeof TXT.ko
  n: number
  setN: (x: number) => void
}) {
  const safeN = clamp(Math.floor(n), 0, 30)
  const remainder = safeN % 2
  const pairs = Math.floor(safeN / 2)
  const isEven = remainder === 0

  // 점들을 두 줄로 배치 (짝수면 두 줄 같음, 홀수면 위쪽 1개 더)
  // 각 pair = (top, bottom)
  const dots: Array<{ row: 0 | 1; col: number; isLeftover: boolean }> = []
  for (let i = 0; i < pairs; i++) {
    dots.push({ row: 0, col: i, isLeftover: false })
    dots.push({ row: 1, col: i, isLeftover: false })
  }
  if (remainder === 1) {
    dots.push({ row: 0, col: pairs, isLeftover: true })
  }

  const DOT_R = 14
  const DOT_GAP = 8
  const cols = pairs + (remainder === 1 ? 1 : 0)
  const width = Math.max(cols, 1) * (DOT_R * 2 + DOT_GAP) + DOT_GAP
  const height = (DOT_R * 2 + DOT_GAP) * 2 + DOT_GAP

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <label className="block flex-1 max-w-xs">
          <span className="text-xs text-gray-600">{t.number}</span>
          <input
            type="number"
            min={0}
            max={30}
            value={n}
            onChange={(e) => setN(parseInt(e.target.value || "0", 10) || 0)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-mono"
          />
        </label>
        <div className="text-xs text-gray-500 pb-2">0–30</div>
      </div>

      <div className="rounded-xl p-4 bg-gray-50 border border-gray-200 overflow-x-auto">
        <svg width={width} height={height} className="block">
          {dots.map((d, i) => {
            const cx = DOT_GAP + DOT_R + d.col * (DOT_R * 2 + DOT_GAP)
            const cy = DOT_GAP + DOT_R + d.row * (DOT_R * 2 + DOT_GAP)
            return (
              <motion.circle
                key={`${safeN}-${i}`}
                cx={cx}
                cy={cy}
                r={DOT_R}
                fill={d.isLeftover ? NEG : ACCENT}
                stroke={d.isLeftover ? "#991b1b" : "#3730a3"}
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
              />
            )
          })}
        </svg>
      </div>

      <div
        className={`rounded-xl p-4 border ${
          isEven
            ? "bg-emerald-50 border-emerald-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="font-mono text-sm text-gray-700">
          {safeN} % 2 ={" "}
          <span className="font-bold text-lg">{remainder}</span>
        </div>
        <div
          className={`text-base font-semibold mt-1 ${
            isEven ? "text-emerald-700" : "text-red-700"
          }`}
        >
          → {isEven ? t.isEven : t.isOdd}
        </div>
      </div>
    </div>
  )
}

// ───────────────────────── LastDigit mode ─────────────────────────

function LastDigitMode({
  t,
  n,
  setN,
}: {
  t: typeof TXT.ko
  n: number
  setN: (x: number) => void
}) {
  const safeN = clamp(Math.floor(Math.abs(n)), 0, 999999)
  const remainder = safeN % 10
  const digits = String(safeN).split("")

  return (
    <div className="space-y-4">
      <label className="block max-w-xs">
        <span className="text-xs text-gray-600">{t.number}</span>
        <input
          type="number"
          min={0}
          value={n}
          onChange={(e) => setN(parseInt(e.target.value || "0", 10) || 0)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-mono"
        />
      </label>

      <div className="rounded-xl p-6 bg-gray-50 border border-gray-200 flex justify-center">
        <div className="flex gap-2">
          {digits.map((d, i) => {
            const isLast = i === digits.length - 1
            return (
              <motion.div
                key={`${safeN}-${i}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className={`w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-bold font-mono ${
                  isLast
                    ? "bg-indigo-500 text-white shadow-md ring-4 ring-indigo-200"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                {d}
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-200">
        <div className="font-mono text-sm text-gray-700">
          {safeN} % 10 ={" "}
          <span className="font-bold text-2xl text-indigo-700">
            {remainder}
          </span>
        </div>
      </div>
    </div>
  )
}

// ───────────────────────── Multiple mode ─────────────────────────

function MultipleMode({
  t,
  n,
  divisor,
  setN,
  setDivisor,
}: {
  t: typeof TXT.ko
  n: number
  divisor: number
  setN: (x: number) => void
  setDivisor: (x: number) => void
}) {
  const safeN = clamp(Math.floor(n), 0, 200)
  const safeD = clamp(Math.floor(divisor), 2, 20)
  const remainder = safeN % safeD
  const isMultiple = remainder === 0
  const quotient = Math.floor(safeN / safeD)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <label className="block">
          <span className="text-xs text-gray-600">{t.number}</span>
          <input
            type="range"
            min={0}
            max={200}
            value={safeN}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className="mt-1 w-full"
          />
          <div className="text-center font-mono text-lg">{safeN}</div>
        </label>
        <label className="block">
          <span className="text-xs text-gray-600">{t.divisor}</span>
          <input
            type="range"
            min={2}
            max={20}
            value={safeD}
            onChange={(e) => setDivisor(parseInt(e.target.value, 10))}
            className="mt-1 w-full"
          />
          <div className="text-center font-mono text-lg">{safeD}</div>
        </label>
      </div>

      <div
        className={`rounded-xl p-5 border-2 ${
          isMultiple
            ? "bg-emerald-50 border-emerald-400"
            : "bg-gray-50 border-gray-300"
        }`}
      >
        <div className="font-mono text-base text-gray-700">
          {safeN} = {safeD} × {quotient}
          {remainder > 0 && (
            <span>
              {" "}
              + <span className="text-red-600 font-bold">{remainder}</span>
            </span>
          )}
        </div>
        <div className="font-mono text-sm text-gray-700 mt-1">
          {safeN} % {safeD} ={" "}
          <span
            className={`font-bold text-xl ${
              isMultiple ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {remainder}
          </span>
        </div>
        <motion.div
          key={`${safeN}-${safeD}-${isMultiple}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
            isMultiple
              ? "bg-emerald-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {isMultiple ? `✓ ${t.isMultiple}` : `✗ ${t.notMultiple}`}
        </motion.div>
      </div>
    </div>
  )
}

// ───────────────────────── Main ─────────────────────────

export function ModuloClock({
  lang = "ko",
  defaultMode = "clock",
  defaultStart = 23,
  defaultAdd = 5,
  clockDivisions = 24,
}: ModuloClockProps) {
  const t = TXT[lang === "en" ? "en" : "ko"]
  const [mode, setMode] = useState<Mode>(defaultMode)

  // 각 모드별 독립 state
  const [clockStart, setClockStart] = useState(defaultStart)
  const [clockAdd, setClockAdd] = useState(defaultAdd)
  const [evenOddN, setEvenOddN] = useState(7)
  const [lastDigitN, setLastDigitN] = useState(1234)
  const [multipleN, setMultipleN] = useState(15)
  const [multipleD, setMultipleD] = useState(5)

  const modes: { id: Mode; label: string }[] = [
    { id: "clock", label: t.modeClock },
    { id: "evenodd", label: t.modeEvenOdd },
    { id: "lastdigit", label: t.modeLastDigit },
    { id: "multiple", label: t.modeMultiple },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-bold text-gray-800">{t.title}</h3>
      </div>

      {/* 모드 탭 */}
      <div className="flex flex-wrap gap-1.5 mb-5 p-1 bg-gray-100 rounded-xl">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 min-w-0 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              mode === m.id
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 모드별 body */}
      <div>
        {mode === "clock" && (
          <ClockMode
            t={t}
            start={clockStart}
            add={clockAdd}
            setStart={setClockStart}
            setAdd={setClockAdd}
            divisions={clockDivisions}
          />
        )}
        {mode === "evenodd" && (
          <EvenOddMode t={t} n={evenOddN} setN={setEvenOddN} />
        )}
        {mode === "lastdigit" && (
          <LastDigitMode t={t} n={lastDigitN} setN={setLastDigitN} />
        )}
        {mode === "multiple" && (
          <MultipleMode
            t={t}
            n={multipleN}
            divisor={multipleD}
            setN={setMultipleN}
            setDivisor={setMultipleD}
          />
        )}
      </div>
    </div>
  )
}

export default ModuloClock
