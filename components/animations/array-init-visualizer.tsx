"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// 배열 부분 초기화 시각화
// int a[5] = {1,2,3} 일 때 나머지 칸의 기본값 표시
// ============================================

interface TypeInfo {
  name: string
  color: string
  bg: string
  border: string
  defaultValue: string
  defaultLabel: string
  declaration: string
  values: string[]  // 명시적으로 넣은 값들
  total: number     // 배열 총 크기
}

const TYPES: TypeInfo[] = [
  {
    name: "int",
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    defaultValue: "0",
    defaultLabel: "정수 기본값",
    declaration: "int a[5] = {1, 2, 3};",
    values: ["1", "2", "3"],
    total: 5,
  },
  {
    name: "double",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    defaultValue: "0.0",
    defaultLabel: "실수 기본값",
    declaration: "double a[5] = {1.5, 2.7};",
    values: ["1.5", "2.7"],
    total: 5,
  },
  {
    name: "bool",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    defaultValue: "false",
    defaultLabel: "bool 기본값",
    declaration: "bool a[4] = {true, true};",
    values: ["true", "true"],
    total: 4,
  },
  {
    name: "string",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    defaultValue: '""',
    defaultLabel: "빈 문자열",
    declaration: 'string a[4] = {"hi", "bye"};',
    values: ['"hi"', '"bye"'],
    total: 4,
  },
]

export function ArrayInitVisualizer({ lang = "ko" }: { lang?: "ko" | "en" }) {
  const [selected, setSelected] = useState(0)
  const t = TYPES[selected]
  const isEn = lang === "en"

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* 타입 선택 */}
      <div className="flex gap-2 flex-wrap justify-center">
        {TYPES.map((type, i) => (
          <button
            key={type.name}
            onClick={() => setSelected(i)}
            className="px-4 py-1.5 rounded-full text-sm font-bold transition-all"
            style={{
              background: selected === i ? type.color : "#f1f5f9",
              color: selected === i ? "white" : "#94a3b8",
            }}
          >
            {type.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border p-4 space-y-4"
          style={{ background: t.bg, borderColor: t.border }}
        >
          {/* 선언 코드 */}
          <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-gray-100">
            {t.declaration}
          </div>

          {/* 배열 칸 시각화 */}
          <div>
            <div className="text-xs font-bold text-gray-400 mb-2 tracking-wider">
              {isEn ? "ARRAY CELLS" : "배열 칸"}
            </div>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: t.total }).map((_, i) => {
                const isSet = i < t.values.length
                const value = isSet ? t.values[i] : t.defaultValue
                return (
                  <motion.div
                    key={`${selected}-${i}`}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 400, damping: 20 }}
                    className="flex flex-col items-center gap-1"
                  >
                    {/* 칸 */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center font-mono text-sm font-bold border-2"
                      style={
                        isSet
                          ? { background: t.color, color: "white", borderColor: t.color }
                          : { background: "white", color: t.color, borderColor: t.border, borderStyle: "dashed" }
                      }
                    >
                      {value}
                    </div>
                    {/* 인덱스 */}
                    <span className="text-xs text-gray-400 font-mono">[{i}]</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 범례 */}
          <div className="flex gap-3 flex-wrap text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded" style={{ background: t.color }} />
              <span className="text-gray-600 font-medium">{isEn ? "set by you" : "내가 넣은 값"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded border-2" style={{ borderColor: t.border, borderStyle: "dashed", background: "white" }} />
              <span className="text-gray-600 font-medium">
                {isEn ? `auto: ${t.defaultValue}` : `자동: ${t.defaultValue} (${t.defaultLabel})`}
              </span>
            </div>
          </div>

          {/* 핵심 메시지 */}
          <div
            className="rounded-xl px-4 py-3 text-sm font-medium"
            style={{ background: t.color + "15", color: t.color }}
          >
            💡 <code className="font-mono font-bold">{t.name}</code>{isEn
              ? ` arrays auto-fill with `
              : ` 배열은 비워두면 자동으로 `}
            <code className="font-mono font-bold">{t.defaultValue}</code>
            {isEn ? " for empty slots" : "으로 채워져요"}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 타입별 요약표 */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider">
          {isEn ? "DEFAULT VALUES BY TYPE" : "타입별 자동 초기값 요약"}
        </div>
        <div className="divide-y divide-gray-50">
          {TYPES.map((type, i) => (
            <button
              key={type.name}
              onClick={() => setSelected(i)}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-mono text-sm font-bold" style={{ color: type.color }}>{type.name}</span>
              <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{type.defaultValue}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
