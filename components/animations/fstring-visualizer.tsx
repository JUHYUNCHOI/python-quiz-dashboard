"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// f-string 시각화
// f"...{var}..." 의 placeholder 가 실제 값으로 치환되는 과정을
// 변수 박스 → 슬롯 → 최종 문자열 순서로 보여줌
// 포맷 스펙(:.2f, :>10, :,) 도 단계별로 적용
// ============================================

type Var = { name: string; value: string; color: string }

type Slot = {
  varName: string         // 어떤 변수의 값
  format?: string         // ":.2f" 같은 포맷 스펙 (없으면 plain)
  formatLabel?: string    // 한글 설명
}

// 문자열 안에 슬롯이 어떻게 박혀있는지: 텍스트 조각 + 슬롯이 번갈아 등장
type Piece = { kind: "text"; text: string } | { kind: "slot"; slot: Slot; slotIdx: number }

type Preset = {
  id: string
  label: string
  vars: Var[]
  template: string             // 사람이 보는 f-string 템플릿 (시각화용)
  pieces: Piece[]              // 파싱된 조각들
  expected: string             // 최종 출력
  caption: string              // 한 줄 설명
  color: string
}

function getPresets(isEn: boolean): Preset[] {
  return [
    {
      id: "basic",
      label: isEn ? "Basic — name + age" : "기본 — 이름 + 나이",
      vars: [
        { name: "name", value: '"철수"', color: "#3b82f6" },
        { name: "age", value: "15", color: "#10b981" },
      ],
      template: 'f"안녕 {name}, {age}살!"',
      pieces: [
        { kind: "text", text: "안녕 " },
        { kind: "slot", slot: { varName: "name" }, slotIdx: 0 },
        { kind: "text", text: ", " },
        { kind: "slot", slot: { varName: "age" }, slotIdx: 1 },
        { kind: "text", text: "살!" },
      ],
      expected: "안녕 철수, 15살!",
      caption: isEn
        ? "{var} slots get replaced by the variable's value, in order. Surrounding text stays as is."
        : "{변수} 슬롯이 변수의 값으로 차례차례 바뀌어요. 슬롯 바깥 글자는 그대로.",
      color: "#3b82f6",
    },
    {
      id: "expr",
      label: isEn ? "Expression — {a+b}" : "표현식 — {a+b}",
      vars: [
        { name: "a", value: "7", color: "#a855f7" },
        { name: "b", value: "3", color: "#a855f7" },
      ],
      template: 'f"{a} + {b} = {a + b}"',
      pieces: [
        { kind: "text", text: "" },
        { kind: "slot", slot: { varName: "a" }, slotIdx: 0 },
        { kind: "text", text: " + " },
        { kind: "slot", slot: { varName: "b" }, slotIdx: 1 },
        { kind: "text", text: " = " },
        { kind: "slot", slot: { varName: "a + b", format: undefined, formatLabel: undefined }, slotIdx: 2 },
        { kind: "text", text: "" },
      ],
      expected: "7 + 3 = 10",
      caption: isEn
        ? "Slots can hold expressions, not just variable names. {a+b} computes 7+3 first, then drops 10 in."
        : "슬롯 안에 변수뿐 아니라 식도 들어가요. {a+b} 는 먼저 7+3 을 계산하고 결과 10 을 넣어요.",
      color: "#a855f7",
    },
    {
      id: "round",
      label: 'Format :.2f',
      vars: [
        { name: "pi", value: "3.14159", color: "#f59e0b" },
      ],
      template: 'f"π ≈ {pi:.2f}"',
      pieces: [
        { kind: "text", text: "π ≈ " },
        { kind: "slot", slot: { varName: "pi", format: ":.2f", formatLabel: isEn ? "round to 2 decimals" : "소수 둘째 자리까지 반올림" }, slotIdx: 0 },
        { kind: "text", text: "" },
      ],
      expected: "π ≈ 3.14",
      caption: isEn
        ? ":.2f rounds the float to 2 decimal places — handy for prices, scores."
        : ":.2f 는 소수 둘째 자리까지 반올림 — 가격, 점수 표기에 유용.",
      color: "#f59e0b",
    },
    {
      id: "comma",
      label: 'Format :,',
      vars: [
        { name: "price", value: "1234567", color: "#10b981" },
      ],
      template: 'f"가격: {price:,}원"',
      pieces: [
        { kind: "text", text: "가격: " },
        { kind: "slot", slot: { varName: "price", format: ":,", formatLabel: isEn ? "thousands separator" : "천 단위 콤마" }, slotIdx: 0 },
        { kind: "text", text: "원" },
      ],
      expected: "가격: 1,234,567원",
      caption: isEn
        ? ":, drops thousands separators in. Big numbers become readable."
        : ":, 는 천 단위마다 콤마. 큰 숫자가 읽기 쉬워져요.",
      color: "#10b981",
    },
    {
      id: "align",
      label: 'Format :>8',
      vars: [
        { name: "name", value: '"Alice"', color: "#ec4899" },
      ],
      template: 'f"|{name:>8}|"',
      pieces: [
        { kind: "text", text: "|" },
        { kind: "slot", slot: { varName: "name", format: ":>8", formatLabel: isEn ? "right-align in width 8" : "너비 8 칸, 오른쪽 정렬" }, slotIdx: 0 },
        { kind: "text", text: "|" },
      ],
      expected: "|   Alice|",
      caption: isEn
        ? ":>8 reserves a width of 8 characters and right-aligns. Spaces fill the gap."
        : ":>8 은 칸 너비 8 을 잡고 오른쪽 정렬. 빈 자리는 공백으로 채워요.",
      color: "#ec4899",
    },
  ]
}

type Phase = "idle" | "highlighting" | "substituting" | "done"

function FStringVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const isEn = lang === "en"
  const PRESETS = getPresets(isEn)
  const [selectedId, setSelectedId] = useState(PRESETS[0].id)
  // 진행 단계: 0 = 시작 전, 1 = 첫 슬롯 강조, 2 = 첫 슬롯 치환됨, 3 = 둘째 슬롯 강조, 4 = 둘째 치환, ...
  // 각 슬롯마다 2 단계 (highlight → substitute) 가 있음
  const [step, setStep] = useState(0)

  const preset = PRESETS.find((p) => p.id === selectedId) ?? PRESETS[0]
  const slots = preset.pieces.filter((p) => p.kind === "slot")
  const totalSteps = slots.length * 2  // 각 슬롯당 2 단계 (강조 + 치환)

  // 파생 상태
  const phase: Phase =
    step === 0 ? "idle" :
    step >= totalSteps ? "done" :
    step % 2 === 1 ? "highlighting" : "substituting"
  const activeSlot = phase === "highlighting" ? Math.floor(step / 2) : -1
  const substituted = Math.floor((step - 1) / 2)  // 마지막으로 치환된 슬롯 인덱스
  const stepsLeft = totalSteps - step

  const reset = () => setStep(0)
  const stepOnce = () => setStep((s) => Math.min(s + 1, totalSteps))
  const runAll = () => setStep(totalSteps)

  // 슬롯이 치환되었는지 (조각 인덱스가 아닌 슬롯 인덱스 기준)
  const isSlotSubstituted = (slotIdx: number) => substituted >= slotIdx

  // 변수 값에서 따옴표 제거 (디스플레이 시)
  const displayValue = (v: string) => v.startsWith('"') && v.endsWith('"') ? v.slice(1, -1) : v

  // 슬롯이 어떤 값으로 표시되어야 하는지
  const slotDisplay = (slot: Slot): string => {
    // 표현식 처리: "a + b" → 7 + 3 = 10
    if (slot.varName.includes("+") || slot.varName.includes("-") || slot.varName.includes("*")) {
      // 간단히: 프리셋에서 직접 결과 매핑
      if (slot.varName === "a + b") {
        const a = preset.vars.find(v => v.name === "a")
        const b = preset.vars.find(v => v.name === "b")
        if (a && b) return String(Number(a.value) + Number(b.value))
      }
      return "?"
    }
    const v = preset.vars.find((vv) => vv.name === slot.varName)
    if (!v) return "?"
    let raw = displayValue(v.value)
    if (slot.format === ":.2f") {
      const n = parseFloat(raw)
      return isNaN(n) ? raw : n.toFixed(2)
    }
    if (slot.format === ":,") {
      const n = parseInt(raw, 10)
      return isNaN(n) ? raw : n.toLocaleString("en-US")
    }
    if (slot.format === ":>8") {
      return raw.padStart(8, " ")
    }
    return raw
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">

      {/* 프리셋 선택 */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedId(p.id); reset() }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all font-mono"
            style={selectedId === p.id
              ? { background: p.color, color: "white", borderColor: p.color }
              : { background: "white", color: "#94a3b8", borderColor: "#e2e8f0" }
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-2 p-4 space-y-4" style={{ borderColor: preset.color + "40", background: preset.color + "0d" }}>

        {/* 변수 박스들 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "VARIABLES" : "변수"}
          </div>
          <div className="flex flex-wrap gap-2">
            {preset.vars.map((v) => (
              <div key={v.name} className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 bg-white" style={{ borderColor: v.color }}>
                <span className="font-mono text-sm font-bold" style={{ color: v.color }}>{v.name}</span>
                <span className="text-gray-300 text-sm">=</span>
                <span className="font-mono text-sm text-gray-700">{v.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 템플릿 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "F-STRING TEMPLATE" : "f-string 템플릿"}
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-gray-100 leading-7">
            <span className="text-purple-300">f</span>
            <span className="text-amber-200">"</span>
            {preset.pieces.map((piece, i) => {
              if (piece.kind === "text") {
                return <span key={i} className="text-amber-200">{piece.text}</span>
              }
              const isActive = activeSlot === piece.slotIdx && phase === "highlighting"
              const slotVar = preset.vars.find((v) => v.name === piece.slot.varName)
              const slotColor = slotVar?.color || preset.color
              return (
                <motion.span
                  key={i}
                  animate={isActive ? { scale: [1, 1.18, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-1 rounded border"
                  style={{
                    borderColor: isActive ? slotColor : slotColor + "70",
                    background: isActive ? slotColor + "55" : slotColor + "22",
                    color: slotColor,
                  }}
                >
                  {`{${piece.slot.varName}${piece.slot.format ?? ""}}`}
                </motion.span>
              )
            })}
            <span className="text-amber-200">"</span>
          </div>
        </div>

        {/* 포맷 스펙 설명 (있을 때만) */}
        {slots.some((s) => s.kind === "slot" && s.slot.formatLabel) && (
          <div className="space-y-1">
            {slots.map((s, i) => {
              if (s.kind !== "slot" || !s.slot.formatLabel) return null
              return (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <code className="px-2 py-0.5 rounded bg-white border font-mono">{s.slot.format}</code>
                  <span>= {s.slot.formatLabel}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* 결과 출력 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "RESULT" : "결과"}
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 min-h-[48px] font-mono text-sm text-gray-100 leading-7 whitespace-pre">
            {preset.pieces.map((piece, i) => {
              if (piece.kind === "text") {
                return <span key={i}>{piece.text}</span>
              }
              const slotVar = preset.vars.find((v) => v.name === piece.slot.varName)
              const slotColor = slotVar?.color || preset.color
              const subbed = isSlotSubstituted(piece.slotIdx)
              if (!subbed) {
                // 아직 치환 전 — 회색 슬롯 표시
                return (
                  <span key={i} className="inline-block px-1 rounded border border-dashed text-gray-500 text-xs align-middle">
                    {`{${piece.slot.varName}}`}
                  </span>
                )
              }
              const isJustSubbed = phase === "substituting" && substituted === piece.slotIdx
              return (
                <motion.span
                  key={i}
                  initial={isJustSubbed ? { scale: 1.6, opacity: 0.4 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="inline-block px-0.5 rounded font-bold"
                  style={{ color: slotColor, background: slotColor + "22" }}
                >
                  {slotDisplay(piece.slot)}
                </motion.span>
              )
            })}
          </div>
        </div>

        {/* 캡션 */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-3 py-2 text-xs"
              style={{ background: preset.color + "15", color: "#374151" }}
            >
              💡 {preset.caption}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 진행 상태 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            <span className="font-mono">{step}</span>
            <span className="text-gray-300"> / </span>
            <span className="font-mono">{totalSteps}</span>
            <span className="ml-1">{isEn ? "steps" : "단계"}</span>
          </span>
          {phase === "done" && (
            <span className="font-bold" style={{ color: preset.color }}>✓ {isEn ? "done" : "끝"}</span>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={stepOnce}
            disabled={phase === "done"}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: preset.color }}
          >
            ▷ {isEn ? "Step" : "한 단계"}
            {stepsLeft > 0 && (
              <span className="ml-1 text-xs opacity-80">({stepsLeft} {isEn ? "left" : "남음"})</span>
            )}
          </button>
          <button
            onClick={runAll}
            disabled={phase === "done"}
            className="px-4 py-2 rounded-xl text-sm font-bold border-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "white", color: preset.color, borderColor: preset.color + "60" }}
          >
            ⏭ {isEn ? "Show all" : "끝까지"}
          </button>
          <button
            onClick={reset}
            disabled={step === 0}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ↺ {isEn ? "Reset" : "다시"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FStringVisualizer
export { FStringVisualizer }
