"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 파이썬 데이터 타입 카드 시각화
//
// 4 가지 기본 타입 (int / float / str / bool) 을 카드로 보여주고
// 카드 클릭 → 예시 값들 펼침
// 입력란에 값 적기 → 자동으로 어느 타입인지 하이라이트 (type() 시뮬)
// ============================================================

export interface PyTypeCardsProps {
  lang?: "ko" | "en"
  initialValue?: string
}

type TypeKey = "int" | "float" | "str" | "bool"

interface TypeMeta {
  key: TypeKey
  koName: string
  enName: string
  abbr: string
  icon: string
  color: string       // 글자/테두리 강조 색
  bg: string          // 카드 배경
  bgActive: string    // 선택됐을 때 배경
  ring: string        // 선택 링 색
  examples: string[]
}

const TYPES: TypeMeta[] = [
  {
    key: "int",
    koName: "정수",
    enName: "Integer",
    abbr: "int",
    icon: "🔢",
    color: "#2563eb",       // blue-600
    bg: "#eff6ff",          // blue-50
    bgActive: "#dbeafe",    // blue-100
    ring: "#3b82f6",        // blue-500
    examples: ["10", "-5", "0", "100"],
  },
  {
    key: "float",
    koName: "실수",
    enName: "Float",
    abbr: "float",
    icon: "📏",
    color: "#059669",       // emerald-600
    bg: "#ecfdf5",          // emerald-50
    bgActive: "#d1fae5",    // emerald-100
    ring: "#10b981",        // emerald-500
    examples: ["3.14", "0.5", "-1.5", "2.0"],
  },
  {
    key: "str",
    koName: "글자",
    enName: "String",
    abbr: "str",
    icon: "💬",
    color: "#ea580c",       // orange-600
    bg: "#fff7ed",          // orange-50
    bgActive: "#ffedd5",    // orange-100
    ring: "#f97316",        // orange-500
    examples: ['"hello"', '"파이썬"', '"123"', '"😊"'],
  },
  {
    key: "bool",
    koName: "참거짓",
    enName: "Boolean",
    abbr: "bool",
    icon: "💡",
    color: "#7c3aed",       // violet-600
    bg: "#f5f3ff",          // violet-50
    bgActive: "#ede9fe",    // violet-100
    ring: "#8b5cf6",        // violet-500
    examples: ["True", "False"],
  },
]

// 학생이 입력한 raw 문자열 → 어떤 파이썬 타입인지 추론
// (실제 Python type() 동작 흉내. 단 따옴표로 감싸진 건 str)
function detectType(raw: string): TypeKey | null {
  const trimmed = raw.trim()
  if (trimmed.length === 0) return null

  // 문자열 리터럴: "..." 또는 '...'
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
  ) {
    return "str"
  }

  // 불리언 (True/False — 파이썬은 대소문자 구분)
  if (trimmed === "True" || trimmed === "False") return "bool"

  // 정수: 선택적 +/- + 숫자만
  if (/^[+-]?\d+$/.test(trimmed)) return "int"

  // 실수: 소수점 포함 숫자 (예: 3.14, .5, 1., -1.5)
  if (/^[+-]?(\d+\.\d*|\.\d+|\d+\.)$/.test(trimmed)) return "float"

  // 따옴표 없이 일반 글자만 입력했으면 — 안내용으로 "str로 보일 거예요" 처리
  // (실제 파이썬에선 NameError 지만, 11 살에겐 "따옴표 빠짐" 만 알려주기)
  return null
}

export function PyTypeCards({ lang = "ko", initialValue = "" }: PyTypeCardsProps) {
  const isEn = lang === "en"
  const [selected, setSelected] = useState<TypeKey | null>(null)
  const [input, setInput] = useState<string>(initialValue)

  const detected = useMemo(() => detectType(input), [input])
  // 입력이 있을 땐 detected 가 우선, 없으면 클릭으로 선택한 카드
  const activeKey: TypeKey | null = detected ?? selected

  const detectedMeta = detected ? TYPES.find((t) => t.key === detected) ?? null : null
  const inputTrimmed = input.trim()
  const showQuoteHint =
    inputTrimmed.length > 0 &&
    detected === null &&
    !(inputTrimmed.startsWith('"') || inputTrimmed.startsWith("'"))

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200">
      {/* 카드 그리드: 모바일 2x2, 데스크탑 1x4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {TYPES.map((t) => {
          const isActive = activeKey === t.key
          return (
            <motion.button
              key={t.key}
              type="button"
              onClick={() => {
                setSelected((prev) => (prev === t.key ? null : t.key))
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                backgroundColor: isActive ? t.bgActive : t.bg,
                boxShadow: isActive
                  ? `0 0 0 3px ${t.ring}, 0 8px 20px -8px ${t.ring}`
                  : "0 1px 2px rgba(0,0,0,0.04)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative rounded-2xl p-4 md:p-5 text-left border-2 cursor-pointer select-none"
              style={{ borderColor: isActive ? t.ring : "transparent" }}
              aria-pressed={isActive}
            >
              <div className="text-3xl md:text-4xl mb-1">{t.icon}</div>
              <div
                className="text-xl md:text-2xl font-extrabold leading-tight"
                style={{ color: t.color }}
              >
                {isEn ? t.enName : t.koName}
              </div>
              <div className="text-xs md:text-sm font-mono mt-1 text-slate-500">
                {t.abbr}
              </div>

              {/* 선택됐을 때 예시 값들 펼치기 */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden mt-3"
                  >
                    <div
                      className="text-[10px] md:text-xs font-semibold mb-1.5 uppercase tracking-wider"
                      style={{ color: t.color }}
                    >
                      {isEn ? "Examples" : "예시"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.examples.map((ex) => (
                        <span
                          key={ex}
                          className="px-2 py-1 rounded-md text-xs md:text-sm font-mono font-bold bg-white border"
                          style={{ borderColor: t.ring, color: t.color }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {/* type() 시뮬: 입력란 */}
      <div className="mt-6 md:mt-8 rounded-xl bg-white border border-slate-200 p-4 md:p-5">
        <label className="block text-sm md:text-base font-bold text-slate-700 mb-2">
          {isEn
            ? "Type a value — I'll tell you which type it is"
            : "값을 적어 보세요 — 어느 타입인지 알려줄게요"}
        </label>
        <div className="flex items-center gap-2 font-mono text-sm md:text-base">
          <span className="text-slate-400">{">>>"}</span>
          <span className="text-slate-700 font-semibold">type(</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isEn ? '5  or  "hello"  or  3.14  or  True' : '5  또는  "안녕"  또는  3.14  또는  True'}
            className="flex-1 min-w-0 px-2 py-1.5 rounded-md bg-slate-50 border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 font-mono"
          />
          <span className="text-slate-700 font-semibold">)</span>
        </div>

        {/* 결과 메시지 */}
        <div className="mt-4 min-h-[64px]">
          <AnimatePresence mode="wait">
            {detectedMeta ? (
              <motion.div
                key={detectedMeta.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 md:p-4 rounded-xl border-2"
                style={{
                  borderColor: detectedMeta.ring,
                  backgroundColor: detectedMeta.bgActive,
                }}
              >
                <span className="text-3xl md:text-4xl">{detectedMeta.icon}</span>
                <div>
                  <div
                    className="text-lg md:text-xl font-extrabold"
                    style={{ color: detectedMeta.color }}
                  >
                    {isEn
                      ? `It's a ${detectedMeta.enName} (${detectedMeta.abbr})!`
                      : `이건 ${detectedMeta.koName} (${detectedMeta.abbr}) 이에요!`}
                  </div>
                  <div className="text-xs md:text-sm font-mono text-slate-600 mt-0.5">
                    {`<class '${detectedMeta.abbr}'>`}
                  </div>
                </div>
              </motion.div>
            ) : showQuoteHint ? (
              <motion.div
                key="quote-hint"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-3 md:p-4 rounded-xl border-2 border-amber-300 bg-amber-50 text-amber-800 text-sm md:text-base"
              >
                {isEn
                  ? 'Hmm — wrap text in quotes! Like "hello" or "world"'
                  : '글자라면 따옴표로 감싸 보세요! 예: "안녕", "hello"'}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-400 text-sm md:text-base text-center py-3"
              >
                {isEn
                  ? "Try typing a number, text, or True/False"
                  : "숫자, 글자, 참/거짓 중 하나를 적어 보세요"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default PyTypeCards
