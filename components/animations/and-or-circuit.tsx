"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 논리 연산자 회로 시각화 (and / or / not)
//
// 전기 회로 비유:
//   - 스위치 A, B 토글 → True/False
//   - and : 직렬 — 둘 다 ON 일 때만 전구 켜짐
//   - or  : 병렬 — 한 쪽만 ON 이어도 전구 켜짐
//   - not : 단일 스위치 — ON 이면 전구 OFF (반전)
//
// 학생이 스위치 클릭 → 즉시 회로 + 전류 흐름 + 전구 상태 변화
// ============================================================

type Mode = "and" | "or" | "not"

interface AndOrCircuitProps {
  lang?: "ko" | "en"
  initialMode?: Mode
}

const ON_COLOR = "#facc15" // yellow-400 (전기 흐름)
const OFF_COLOR = "#cbd5e1" // slate-300 (꺼진 전선)
const BULB_ON = "#fde047" // yellow-300
const BULB_OFF = "#e2e8f0" // slate-200

function compute(mode: Mode, a: boolean, b: boolean): boolean {
  if (mode === "and") return a && b
  if (mode === "or") return a || b
  return !a // not
}

function formatBool(v: boolean, isEn: boolean) {
  if (isEn) return v ? "True" : "False"
  return v ? "True (참)" : "False (거짓)"
}

export function AndOrCircuit({
  lang = "ko",
  initialMode = "and",
}: AndOrCircuitProps) {
  const isEn = lang === "en"
  const [mode, setMode] = useState<Mode>(initialMode)
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)

  const result = useMemo(() => compute(mode, a, b), [mode, a, b])

  const labels = {
    title: isEn ? "Logic Gate Circuit" : "논리 회로 시뮬레이터",
    sub: isEn
      ? "Click a switch to toggle. Watch the bulb."
      : "스위치를 눌러서 켜고 꺼봐요. 전구를 관찰!",
    switchA: isEn ? "Switch A" : "스위치 A",
    switchB: isEn ? "Switch B" : "스위치 B",
    on: isEn ? "ON" : "ON",
    off: isEn ? "OFF" : "OFF",
    result: isEn ? "Result" : "결과",
    explanation: {
      and: isEn
        ? "AND — both switches must be ON (series circuit)."
        : "AND — 두 스위치가 모두 ON 이어야 전구가 켜짐 (직렬 회로).",
      or: isEn
        ? "OR — any one switch ON is enough (parallel circuit)."
        : "OR — 한 쪽만 ON 이어도 전구가 켜짐 (병렬 회로).",
      not: isEn
        ? "NOT — flips the switch. ON makes the bulb OFF."
        : "NOT — 스위치를 뒤집어요. ON 이면 전구는 OFF.",
    },
    code: {
      and: isEn ? "a and b" : "a and b",
      or: isEn ? "a or b" : "a or b",
      not: isEn ? "not a" : "not a",
    },
  }

  const modeButtons: { id: Mode; label: string }[] = [
    { id: "and", label: "and" },
    { id: "or", label: "or" },
    { id: "not", label: "not" },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-4 flex flex-col items-start gap-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-800">
          {labels.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">{labels.sub}</p>
      </div>

      {/* 모드 탭 */}
      <div className="mb-5 inline-flex rounded-xl bg-slate-100 p-1">
        {modeButtons.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition ${
              mode === m.id
                ? "bg-white text-slate-900 shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 회로 시각화 */}
      <div className="rounded-xl bg-slate-50 p-4 sm:p-6 mb-4">
        <CircuitDiagram
          mode={mode}
          a={a}
          b={b}
          result={result}
          onToggleA={() => setA((v) => !v)}
          onToggleB={() => setB((v) => !v)}
          labels={labels}
        />
      </div>

      {/* 결과 표시 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-3">
        <div className="text-xs text-slate-500 mb-1">{labels.result}</div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <code className="text-sm sm:text-base font-mono text-slate-700 bg-white px-2 py-1 rounded">
            {mode === "not"
              ? `not ${a ? "True" : "False"}`
              : `${a ? "True" : "False"} ${mode} ${b ? "True" : "False"}`}
          </code>
          <span className="text-slate-400 text-lg">→</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${mode}-${a}-${b}-${result}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className={`text-2xl sm:text-3xl font-extrabold ${
                result ? "text-yellow-500" : "text-slate-400"
              }`}
            >
              {formatBool(result, isEn)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* 설명 */}
      <p className="text-sm text-slate-600 leading-relaxed">
        {labels.explanation[mode]}
      </p>
    </div>
  )
}

// ----------------------------------------------------------
// 회로 다이어그램 — SVG 기반
// ----------------------------------------------------------
interface CircuitDiagramProps {
  mode: Mode
  a: boolean
  b: boolean
  result: boolean
  onToggleA: () => void
  onToggleB: () => void
  labels: {
    switchA: string
    switchB: string
    on: string
    off: string
  }
}

function CircuitDiagram({
  mode,
  a,
  b,
  result,
  onToggleA,
  onToggleB,
  labels,
}: CircuitDiagramProps) {
  // 전류가 흐르는 라인 색
  const liveColor = result ? ON_COLOR : OFF_COLOR

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 전구 — 항상 상단에 크게 */}
      <Bulb on={result} />

      {/* 회로 라인 (SVG) — 모드별로 다른 회로 */}
      <div className="w-full">
        {mode === "and" && (
          <SeriesCircuit a={a} b={b} liveColor={liveColor} powered={result} />
        )}
        {mode === "or" && (
          <ParallelCircuit a={a} b={b} liveColor={liveColor} powered={result} />
        )}
        {mode === "not" && (
          <NotCircuit a={a} liveColor={liveColor} powered={result} />
        )}
      </div>

      {/* 스위치 버튼들 */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <SwitchButton
          label={labels.switchA}
          on={a}
          onText={labels.on}
          offText={labels.off}
          onClick={onToggleA}
        />
        {mode !== "not" && (
          <SwitchButton
            label={labels.switchB}
            on={b}
            onText={labels.on}
            offText={labels.off}
            onClick={onToggleB}
          />
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------------
// 직렬 회로 (AND): 배터리 → A → B → 전구
// ----------------------------------------------------------
function SeriesCircuit({
  a,
  b,
  liveColor,
  powered,
}: {
  a: boolean
  b: boolean
  liveColor: string
  powered: boolean
}) {
  // 전류는 a && b 일 때만 전구까지 흐름
  // 시각 표현: 라인 색은 powered 면 노란색, 아니면 회색
  // 각 스위치 부분은 그 스위치까지의 흐름을 보여주려고 단계적 색칠
  const wireBeforeA = a || b ? OFF_COLOR : OFF_COLOR
  // 배터리 → A: 항상 잠재력
  const beforeA = OFF_COLOR
  const afterA = a ? (b ? ON_COLOR : OFF_COLOR) : OFF_COLOR
  const afterB = powered ? ON_COLOR : OFF_COLOR

  return (
    <svg viewBox="0 0 320 80" className="w-full h-20">
      {/* 배터리 표시 */}
      <BatterySymbol x={10} y={40} />

      {/* 전선: 배터리 → 스위치 A */}
      <Wire x1={30} y1={40} x2={100} y2={40} color={beforeA} flowing={false} />
      <SwitchSymbol x={100} y={40} on={a} />

      {/* 전선: A → B */}
      <Wire x1={130} y1={40} x2={190} y2={40} color={afterA} flowing={afterA === ON_COLOR} />
      <SwitchSymbol x={190} y={40} on={b} />

      {/* 전선: B → 전구 (위로 빠지는 표시) */}
      <Wire x1={220} y1={40} x2={310} y2={40} color={afterB} flowing={powered} />
      <BulbConnector x={310} y={40} on={powered} />
    </svg>
  )
}

// ----------------------------------------------------------
// 병렬 회로 (OR): 배터리 → (A || B) → 전구
// ----------------------------------------------------------
function ParallelCircuit({
  a,
  b,
  liveColor,
  powered,
}: {
  a: boolean
  b: boolean
  liveColor: string
  powered: boolean
}) {
  const topLine = a ? ON_COLOR : OFF_COLOR
  const bottomLine = b ? ON_COLOR : OFF_COLOR
  const mainLine = powered ? ON_COLOR : OFF_COLOR

  return (
    <svg viewBox="0 0 320 120" className="w-full h-28">
      {/* 배터리 */}
      <BatterySymbol x={10} y={60} />
      <Wire x1={30} y1={60} x2={70} y2={60} color={OFF_COLOR} flowing={false} />

      {/* 분기점 → 위/아래로 갈라짐 */}
      <Wire x1={70} y1={60} x2={70} y2={25} color={OFF_COLOR} flowing={false} />
      <Wire x1={70} y1={60} x2={70} y2={95} color={OFF_COLOR} flowing={false} />

      {/* 위쪽 가지: 스위치 A */}
      <Wire x1={70} y1={25} x2={130} y2={25} color={OFF_COLOR} flowing={false} />
      <SwitchSymbol x={130} y={25} on={a} />
      <Wire x1={160} y1={25} x2={230} y2={25} color={topLine} flowing={a} />
      <Wire x1={230} y1={25} x2={230} y2={60} color={topLine} flowing={a} />

      {/* 아래쪽 가지: 스위치 B */}
      <Wire x1={70} y1={95} x2={130} y2={95} color={OFF_COLOR} flowing={false} />
      <SwitchSymbol x={130} y={95} on={b} />
      <Wire x1={160} y1={95} x2={230} y2={95} color={bottomLine} flowing={b} />
      <Wire x1={230} y1={95} x2={230} y2={60} color={bottomLine} flowing={b} />

      {/* 합류점 → 전구 */}
      <Wire x1={230} y1={60} x2={310} y2={60} color={mainLine} flowing={powered} />
      <BulbConnector x={310} y={60} on={powered} />
    </svg>
  )
}

// ----------------------------------------------------------
// NOT 회로: 배터리 → 반전기 → 전구
// 스위치 A 가 ON 이면 전구 OFF (반전)
// ----------------------------------------------------------
function NotCircuit({
  a,
  liveColor,
  powered,
}: {
  a: boolean
  liveColor: string
  powered: boolean
}) {
  const lineColor = powered ? ON_COLOR : OFF_COLOR

  return (
    <svg viewBox="0 0 320 80" className="w-full h-20">
      <BatterySymbol x={10} y={40} />
      <Wire x1={30} y1={40} x2={110} y2={40} color={OFF_COLOR} flowing={false} />

      {/* 스위치 A */}
      <SwitchSymbol x={110} y={40} on={a} />

      {/* 반전기 (NOT gate 삼각형) */}
      <Wire
        x1={140}
        y1={40}
        x2={190}
        y2={40}
        color={a ? ON_COLOR : OFF_COLOR}
        flowing={a}
      />
      <NotGate x={190} y={40} active={a} />

      {/* 반전기 출력 → 전구 */}
      <Wire x1={230} y1={40} x2={310} y2={40} color={lineColor} flowing={powered} />
      <BulbConnector x={310} y={40} on={powered} />
    </svg>
  )
}

// ----------------------------------------------------------
// SVG 부품들
// ----------------------------------------------------------
function Wire({
  x1,
  y1,
  x2,
  y2,
  color,
  flowing,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  flowing: boolean
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
      {flowing && (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#fef08a"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="6 6"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -24 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
      )}
    </g>
  )
}

function SwitchSymbol({ x, y, on }: { x: number; y: number; on: boolean }) {
  // 스위치는 30px 폭. (x, y)는 왼쪽 끝 점.
  // 단자 두 개 + 막대기 (ON 일 때 닫힘, OFF 일 때 위로 떠 있음)
  return (
    <g>
      {/* 단자 */}
      <circle cx={x} cy={y} r={3.5} fill="#475569" />
      <circle cx={x + 30} cy={y} r={3.5} fill="#475569" />
      {/* 스위치 막대기 */}
      <motion.line
        x1={x}
        y1={y}
        x2={on ? x + 30 : x + 24}
        y2={on ? y : y - 14}
        stroke={on ? ON_COLOR : "#94a3b8"}
        strokeWidth={3.5}
        strokeLinecap="round"
        initial={false}
        animate={{
          x2: on ? x + 30 : x + 24,
          y2: on ? y : y - 14,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </g>
  )
}

function BatterySymbol({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* + 단자 (긴 막대) */}
      <line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke="#475569" strokeWidth={3} />
      {/* - 단자 (짧은 막대) */}
      <line x1={x + 8} y1={y - 6} x2={x + 8} y2={y + 6} stroke="#475569" strokeWidth={3} />
      <text x={x - 2} y={y - 14} fontSize={10} fill="#475569" fontFamily="sans-serif">
        +
      </text>
    </g>
  )
}

function BulbConnector({ x, y, on }: { x: number; y: number; on: boolean }) {
  // 전구 그림은 상단에 별도로 표시되므로 여기는 작은 단자 표시만
  return <circle cx={x} cy={y} r={4} fill={on ? ON_COLOR : "#94a3b8"} />
}

function NotGate({ x, y, active }: { x: number; y: number; active: boolean }) {
  // 삼각형 + 원 (NOT gate 표준 기호). x는 왼쪽 끝 (입력단).
  const fill = active ? "#fde047" : "#f1f5f9"
  const stroke = active ? "#ca8a04" : "#94a3b8"
  return (
    <g>
      <polygon
        points={`${x},${y - 14} ${x},${y + 14} ${x + 32},${y}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
      />
      <circle cx={x + 36} cy={y} r={4} fill={fill} stroke={stroke} strokeWidth={2} />
    </g>
  )
}

// ----------------------------------------------------------
// 전구 — 상단에 크게
// ----------------------------------------------------------
function Bulb({ on }: { on: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        animate={
          on
            ? {
                boxShadow: [
                  "0 0 20px 4px rgba(253, 224, 71, 0.4)",
                  "0 0 36px 10px rgba(253, 224, 71, 0.7)",
                  "0 0 20px 4px rgba(253, 224, 71, 0.4)",
                ],
              }
            : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
        }
        transition={on ? { repeat: Infinity, duration: 1.4 } : { duration: 0.2 }}
        className="rounded-full"
      >
        <svg width={64} height={80} viewBox="0 0 64 80">
          {/* 전구 유리 */}
          <motion.ellipse
            cx={32}
            cy={32}
            rx={22}
            ry={26}
            fill={on ? BULB_ON : BULB_OFF}
            stroke={on ? "#ca8a04" : "#94a3b8"}
            strokeWidth={2}
            animate={on ? { fill: [BULB_ON, "#fef08a", BULB_ON] } : { fill: BULB_OFF }}
            transition={on ? { repeat: Infinity, duration: 1.2 } : { duration: 0.2 }}
          />
          {/* 필라멘트 */}
          <path
            d="M24 32 Q28 24 32 32 Q36 40 40 32"
            stroke={on ? "#a16207" : "#cbd5e1"}
            strokeWidth={1.5}
            fill="none"
          />
          {/* 소켓 */}
          <rect x={24} y={56} width={16} height={6} fill="#64748b" />
          <rect x={26} y={62} width={12} height={4} fill="#475569" />
          <rect x={28} y={66} width={8} height={4} fill="#334155" />
        </svg>
      </motion.div>
      <div className="text-xs font-semibold mt-1" style={{ color: on ? "#ca8a04" : "#94a3b8" }}>
        {on ? "ON" : "OFF"}
      </div>
    </div>
  )
}

// ----------------------------------------------------------
// 스위치 버튼 (클릭 가능)
// ----------------------------------------------------------
function SwitchButton({
  label,
  on,
  onText,
  offText,
  onClick,
}: {
  label: string
  on: boolean
  onText: string
  offText: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition active:scale-95 ${
        on
          ? "bg-yellow-50 border-yellow-400 text-yellow-700"
          : "bg-white border-slate-300 text-slate-500"
      }`}
    >
      <span className="text-xs font-semibold">{label}</span>
      <span
        className={`relative inline-flex items-center w-12 h-6 rounded-full transition ${
          on ? "bg-yellow-400" : "bg-slate-300"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 ${on ? "left-6" : "left-0.5"} w-5 h-5 rounded-full bg-white shadow`}
        />
      </span>
      <span className="text-xs font-bold w-8 text-left">
        {on ? onText : offText}
      </span>
    </button>
  )
}

export default AndOrCircuit
