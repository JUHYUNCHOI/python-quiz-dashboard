"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MemoryTypeVisualizerProps {
  lang?: "ko" | "en"
}

const TYPES = [
  {
    name: "bool",
    bytes: 1,
    color: "#FF6B9D",
    bg: "#FFF0F5",
    lightBar: "#FFD6E7",
    example: "bool ok = true;",
    desc: { ko: "참/거짓", en: "true / false" },
    range: { ko: "0 또는 1", en: "0 or 1" },
  },
  {
    name: "char",
    bytes: 1,
    color: "#FF9F43",
    bg: "#FFF8F0",
    lightBar: "#FFE4C8",
    example: "char ch = 'A';",
    desc: { ko: "글자 1개", en: "1 character" },
    range: { ko: "A~Z, 0~9 등", en: "A-Z, 0-9, etc." },
  },
  {
    name: "int",
    bytes: 4,
    color: "#54A0FF",
    bg: "#F0F7FF",
    lightBar: "#C8DFFF",
    example: "int x = 42;",
    desc: { ko: "정수", en: "integer" },
    range: { ko: "약 ±21억", en: "about ±2 billion" },
  },
  {
    name: "float",
    bytes: 4,
    color: "#00D2D3",
    bg: "#F0FFFE",
    lightBar: "#B8F0EF",
    example: "float f = 3.14f;",
    desc: { ko: "실수 (낮은 정밀도)", en: "decimal (low prec.)" },
    range: { ko: "소수점 ~7자리", en: "~7 decimal digits" },
  },
  {
    name: "double",
    bytes: 8,
    color: "#7C5CFC",
    bg: "#F5F0FF",
    lightBar: "#D8CCFF",
    example: "double d = 3.14159;",
    desc: { ko: "실수 (높은 정밀도)", en: "decimal (high prec.)" },
    range: { ko: "소수점 ~15자리", en: "~15 decimal digits" },
  },
  {
    name: "long long",
    bytes: 8,
    color: "#FF6348",
    bg: "#FFF5F3",
    lightBar: "#FFD4CC",
    example: "long long n = 9e18;",
    desc: { ko: "아주 큰 정수", en: "very large integer" },
    range: { ko: "약 ±920경", en: "about ±9.2 quintillion" },
  },
]

const MAX_BYTES = 8

export function MemoryTypeVisualizer({ lang = "ko" }: MemoryTypeVisualizerProps) {
  const [selected, setSelected] = useState(2)
  const bottomRef = useRef<HTMLDivElement>(null)
  const isEn = lang === "en"
  const type = TYPES[selected]

  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }, [selected])

  return (
    <div className="w-full max-w-xl mx-auto space-y-3">
      {/* ── 타입 선택 필 ── */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {TYPES.map((dt, i) => (
          <motion.button
            key={dt.name}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className="px-3 py-1.5 rounded-full text-xs font-extrabold transition-all"
            style={{
              background: selected === i ? dt.color : "#f1f5f9",
              color: selected === i ? "white" : "#94a3b8",
              boxShadow: selected === i ? `0 3px 10px ${dt.color}35` : "none",
            }}
          >
            {dt.name}
          </motion.button>
        ))}
      </div>

      {/* ── 메인 카드 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl overflow-hidden border"
          style={{ background: type.bg, borderColor: type.color + "25" }}
        >
          {/* 헤더: 타입명 + 바이트 + 코드 — 한 줄로 컴팩트하게 */}
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-mono text-xl font-black" style={{ color: type.color }}>
                  {type.name}
                </span>
                <span className="text-gray-400 text-xs ml-2">
                  {isEn ? type.desc.en : type.desc.ko} · {isEn ? type.range.en : type.range.ko}
                </span>
              </div>
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                className="flex items-baseline gap-0.5 px-3 py-1.5 rounded-xl"
                style={{ background: type.color + "15" }}
              >
                <span className="text-2xl font-black" style={{ color: type.color }}>{type.bytes}</span>
                <span className="text-[10px] font-bold" style={{ color: type.color + "88" }}>
                  {isEn ? "B" : "바이트"}
                </span>
              </motion.div>
            </div>

            {/* 코드 */}
            <div className="bg-gray-900 rounded-xl px-4 py-2.5 font-mono text-sm text-gray-200">
              {type.example}
            </div>
          </div>

          {/* ── 메모리 블록 ── */}
          <div className="px-5 pb-4">
            <div className="text-[10px] font-bold text-gray-400 mb-2 tracking-wider">
              {isEn ? "MEMORY" : "메모리"} — 1{isEn ? " cell" : "칸"} = 1 byte
            </div>

            {/* 8칸 — max-height 제한으로 정사각이 아닌 직사각형 */}
            <div className="grid grid-cols-8 gap-1.5">
              {Array.from({ length: MAX_BYTES }).map((_, i) => {
                const filled = i < type.bytes
                return (
                  <motion.div
                    key={`${selected}-${i}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: filled ? i * 0.06 : 0.25,
                      duration: 0.25,
                      type: "spring",
                      stiffness: 400,
                    }}
                    className="h-12 md:h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: filled ? type.color : "#e2e8f0",
                      boxShadow: filled
                        ? `0 2px 8px ${type.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`
                        : "inset 0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    {filled && (
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                    <span className={`relative text-xs font-bold ${filled ? "text-white" : "text-gray-400"}`}>
                      {filled ? `${i + 1}` : ""}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* 프로그레스 */}
            <div className="mt-2.5 h-2 rounded-full bg-gray-200 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(type.bytes / MAX_BYTES) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: type.color }}
              />
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-[10px] font-bold" style={{ color: type.color }}>
                {type.bytes} / {MAX_BYTES} {isEn ? "bytes" : "바이트"}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── 크기 비교 ── */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-5 py-4">
        <div className="text-[10px] font-bold text-gray-400 mb-3 tracking-wider">
          {isEn ? "SIZE COMPARISON" : "크기 비교"}
        </div>
        <div className="space-y-1.5">
          {TYPES.map((dt, i) => {
            const isActive = selected === i
            const pct = (dt.bytes / MAX_BYTES) * 100
            return (
              <motion.button
                key={dt.name}
                onClick={() => setSelected(i)}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 py-1 px-0.5 rounded-lg transition-all text-left"
              >
                <span className="w-16 md:w-20 font-mono text-[11px] md:text-xs font-extrabold shrink-0 transition-colors"
                  style={{ color: isActive ? dt.color : "#b0b8c4" }}>
                  {dt.name}
                </span>
                <div className="flex-1 h-6 rounded-lg overflow-hidden relative"
                  style={{ background: isActive ? dt.lightBar : "#f1f5f9" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.45, delay: i * 0.03, ease: "easeOut" }}
                    className="h-full rounded-lg relative"
                    style={{
                      background: dt.color,
                      opacity: isActive ? 1 : 0.45,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-lg" />
                  </motion.div>
                  <span className="absolute inset-0 flex items-center px-2 text-[10px] font-extrabold"
                    style={{ color: isActive ? "white" : "#94a3b8" }}>
                    {dt.bytes}B
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div ref={bottomRef} />
    </div>
  )
}
