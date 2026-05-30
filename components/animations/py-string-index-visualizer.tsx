"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 파이썬 문자열 인덱싱 시뮬레이터
//
// 한 줄에 글자 박스들이 나열되고
// 위에는 양수 인덱스 (0, 1, 2, ...) - 파랑
// 아래에는 음수 인덱스 (-N, ..., -1) - 보라
// 학생이 인덱스를 입력하면 해당 글자에 하이라이트
// ============================================================

interface PyStringIndexVisualizerProps {
  lang?: "ko" | "en"
  initialText?: string
  maxLength?: number
}

const POS_COLOR = "#3b82f6" // blue-500
const POS_BG = "#eff6ff"    // blue-50
const NEG_COLOR = "#8b5cf6" // violet-500
const NEG_BG = "#f5f3ff"    // violet-50

type ExampleKind = "pos" | "neg"
interface Example {
  label: string
  index: number
  kind: ExampleKind
}

export function PyStringIndexVisualizer({
  lang = "ko",
  initialText = "Python",
  maxLength = 12,
}: PyStringIndexVisualizerProps) {
  const isEn = lang === "en"
  const [text, setText] = useState(initialText)
  const [indexInput, setIndexInput] = useState<string>("0")
  const [highlightIndex, setHighlightIndex] = useState<number | null>(0)

  // 글자 배열 (Array.from으로 이모지/한글도 안전하게 분해)
  const chars = useMemo(() => Array.from(text), [text])
  const len = chars.length

  // highlightIndex 는 항상 0..len-1 사이의 "양수 등가" 값으로 저장
  // (학생이 -1 을 입력해도 len-1 로 변환해서 같은 박스를 가리키게)
  const normalized = highlightIndex
  const indexNum = parseInt(indexInput, 10)
  const isInputValid = !Number.isNaN(indexNum)
  const outOfRange = isInputValid && (indexNum >= len || indexNum < -len)

  const labelHeader = isEn ? "String Indexing" : "문자열 인덱싱"
  const labelTextInput = isEn ? "Try your own word:" : "단어 바꿔보기:"
  const labelIndexInput = isEn ? "Index:" : "인덱스:"
  const labelResult = isEn ? "Result" : "결과"
  const labelIndexError = isEn
    ? `IndexError: string index out of range (length ${len})`
    : `IndexError: 범위를 벗어났어요 (길이 ${len})`

  const examples: Example[] = useMemo(() => {
    if (len === 0) return []
    const list: Example[] = [
      { label: "text[0]", index: 0, kind: "pos" },
      { label: "text[-1]", index: -1, kind: "neg" },
    ]
    if (len >= 4) list.push({ label: "text[3]", index: 3, kind: "pos" })
    if (len >= 2) list.push({ label: "text[-2]", index: -2, kind: "neg" })
    return list
  }, [len])

  // 인덱스 입력 처리
  const applyIndex = (raw: string) => {
    setIndexInput(raw)
    const n = parseInt(raw, 10)
    if (Number.isNaN(n)) {
      setHighlightIndex(null)
      return
    }
    if (n >= len || n < -len) {
      setHighlightIndex(null)
      return
    }
    const pos = n >= 0 ? n : len + n
    setHighlightIndex(pos)
  }

  const applyExample = (ex: Example) => {
    setIndexInput(String(ex.index))
    const pos = ex.index >= 0 ? ex.index : len + ex.index
    setHighlightIndex(pos)
  }

  // 단어 변경 처리
  const onTextChange = (v: string) => {
    const sliced = Array.from(v).slice(0, maxLength).join("")
    setText(sliced)
    // 하이라이트 인덱스가 새 길이를 벗어나면 초기화
    const newLen = Array.from(sliced).length
    if (highlightIndex !== null && highlightIndex >= newLen) {
      setHighlightIndex(null)
      setIndexInput("")
    }
  }

  return (
    <div className="w-full sm:max-w-md mx-auto select-none space-y-3">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-slate-700">
          🔢 {labelHeader}
        </span>
      </div>

      {/* 메인 카드 */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 space-y-4">
        {/* 단어 입력 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">
            {labelTextInput}
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            maxLength={maxLength * 2 /* 한글/이모지 여유 */}
            className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-mono text-sm focus:outline-none focus:border-slate-400 transition-all"
            placeholder="Python"
          />
        </div>

        {/* 글자 박스 행 (스크롤 가능) */}
        <div className="overflow-x-auto pb-1">
          <div className="inline-flex items-stretch gap-1.5 min-w-full justify-center">
            {chars.map((ch, i) => {
              const isHl = i === normalized
              const negIdx = i - len
              return (
                <button
                  key={i}
                  onClick={() => {
                    setHighlightIndex(i)
                    setIndexInput(String(i))
                  }}
                  className="flex flex-col items-center gap-1 group"
                  type="button"
                >
                  {/* 양수 인덱스 (위) */}
                  <motion.span
                    animate={isHl ? { scale: 1.15, y: -1 } : { scale: 1, y: 0 }}
                    className="text-[11px] font-mono font-bold tabular-nums px-1.5 py-0.5 rounded-md transition-colors"
                    style={
                      isHl
                        ? { background: POS_COLOR, color: "white" }
                        : { color: POS_COLOR, background: POS_BG }
                    }
                  >
                    {i}
                  </motion.span>

                  {/* 글자 박스 */}
                  <motion.div
                    animate={
                      isHl
                        ? { scale: [1, 1.15, 1.08], y: [0, -2, 0] }
                        : { scale: 1, y: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    className="w-9 h-11 sm:w-10 sm:h-12 rounded-xl flex items-center justify-center font-mono text-lg sm:text-xl font-black border-2 transition-all"
                    style={
                      isHl
                        ? {
                            borderColor: POS_COLOR,
                            background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)",
                            color: "#1e293b",
                            boxShadow: `0 0 0 3px ${POS_COLOR}30`,
                          }
                        : {
                            borderColor: "#e2e8f0",
                            background: "white",
                            color: "#475569",
                          }
                    }
                  >
                    {ch === " " ? "·" : ch}
                  </motion.div>

                  {/* 음수 인덱스 (아래) */}
                  <motion.span
                    animate={isHl ? { scale: 1.15, y: 1 } : { scale: 1, y: 0 }}
                    className="text-[11px] font-mono font-bold tabular-nums px-1.5 py-0.5 rounded-md transition-colors"
                    style={
                      isHl
                        ? { background: NEG_COLOR, color: "white" }
                        : { color: NEG_COLOR, background: NEG_BG }
                    }
                  >
                    {negIdx}
                  </motion.span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 인덱스 입력 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">
            {labelIndexInput}{" "}
            <span className="text-slate-400 font-normal">
              (-{len} ~ {len - 1})
            </span>
          </label>
          <div className="flex items-center gap-2">
            <div className="font-mono text-sm text-slate-500 shrink-0">text[</div>
            <input
              type="number"
              value={indexInput}
              onChange={(e) => applyIndex(e.target.value)}
              className="w-20 px-2 py-2 rounded-xl border-2 border-slate-200 font-mono text-sm text-center focus:outline-none focus:border-slate-400 transition-all"
              placeholder="0"
            />
            <div className="font-mono text-sm text-slate-500 shrink-0">]</div>

            {/* 결과 */}
            <div className="flex-1 flex justify-end">
              <AnimatePresence mode="wait">
                {outOfRange ? (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-bold text-red-500"
                  >
                    ⚠ {isEn ? "out of range" : "범위 초과"}
                  </motion.div>
                ) : normalized !== null && isInputValid ? (
                  <motion.div
                    key={`ok-${normalized}-${indexInput}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-mono text-sm font-black"
                    style={{
                      borderColor: POS_COLOR,
                      background: POS_BG,
                      color: POS_COLOR,
                    }}
                  >
                    <span className="text-[10px] font-bold text-slate-400">→</span>
                    <span>'{chars[normalized]}'</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* IndexError 메시지 */}
        <AnimatePresence>
          {outOfRange && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-red-50 border-2 border-red-200 px-3 py-2 text-xs font-mono font-bold text-red-600"
            >
              {labelIndexError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 예시 버튼 */}
        {examples.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-500">
              {isEn ? "Try these:" : "이걸로 해보기:"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {examples.map((ex) => {
                const color = ex.kind === "pos" ? POS_COLOR : NEG_COLOR
                const bg = ex.kind === "pos" ? POS_BG : NEG_BG
                return (
                  <button
                    key={ex.label}
                    onClick={() => applyExample(ex)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border-2 transition-all hover:scale-105"
                    style={{
                      borderColor: color,
                      background: bg,
                      color,
                    }}
                  >
                    {ex.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* 결과 카드 (큰 글자) */}
        {normalized !== null && isInputValid && !outOfRange && chars[normalized] !== undefined && (
          <motion.div
            key={`big-${normalized}-${indexInput}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-slate-50 border-2 border-slate-200 px-3 py-3 flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-slate-500">text[</span>
              <span className="font-bold" style={{ color: indexNum < 0 ? NEG_COLOR : POS_COLOR }}>
                {indexNum}
              </span>
              <span className="text-slate-500">]</span>
              <span className="text-slate-400">=</span>
            </div>
            <div className="text-2xl font-mono font-black text-slate-800">
              '{chars[normalized]}'
            </div>
          </motion.div>
        )}

        {/* 핵심 정리 */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border-2 border-slate-200 px-3 py-2.5 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="font-mono font-bold tabular-nums px-1.5 py-0.5 rounded"
              style={{ background: POS_COLOR, color: "white" }}
            >
              0 →
            </span>
            <span className="text-slate-600">
              {isEn ? "starts from left (front)" : "왼쪽(앞)부터 시작"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="font-mono font-bold tabular-nums px-1.5 py-0.5 rounded"
              style={{ background: NEG_COLOR, color: "white" }}
            >
              ← -1
            </span>
            <span className="text-slate-600">
              {isEn ? "starts from right (last char)" : "오른쪽(마지막)부터 시작"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PyStringIndexVisualizer
