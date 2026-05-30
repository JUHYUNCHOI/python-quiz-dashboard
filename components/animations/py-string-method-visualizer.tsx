"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================================
// 파이썬 문자열 메서드 시뮬레이터
//
// 탭별 메서드 시각화:
//   - upper / lower : 글자 박스 색 변하면서 대/소문자 변환
//   - strip / lstrip / rstrip : 양쪽/한쪽 공백 박스 fade-out
//   - replace(old, new) : old 매칭 하이라이트 → new 로 swap
//   - find : 매칭 위치 검색 (없으면 -1, 빨강)
//   - count : 모든 매칭 카운트
//
// 모든 메서드는 원본과 결과를 같이 보여줘서 "불변성" 강조
// ============================================================

interface PythonStringMethodVisualizerProps {
  lang?: "ko" | "en"
  initialText?: string
}

type MethodTab =
  | "upper"
  | "lower"
  | "strip"
  | "lstrip"
  | "rstrip"
  | "replace"
  | "find"
  | "count"

const TAB_META: Record<
  MethodTab,
  { label: string; emoji: string; color: string; bg: string }
> = {
  upper: { label: "upper()", emoji: "🔼", color: "#2563eb", bg: "#eff6ff" },
  lower: { label: "lower()", emoji: "🔽", color: "#0891b2", bg: "#ecfeff" },
  strip: { label: "strip()", emoji: "✂️", color: "#0d9488", bg: "#f0fdfa" },
  lstrip: { label: "lstrip()", emoji: "◀️", color: "#059669", bg: "#ecfdf5" },
  rstrip: { label: "rstrip()", emoji: "▶️", color: "#16a34a", bg: "#f0fdf4" },
  replace: { label: "replace()", emoji: "🔁", color: "#d97706", bg: "#fffbeb" },
  find: { label: "find()", emoji: "🔍", color: "#7c3aed", bg: "#f5f3ff" },
  count: { label: "count()", emoji: "🔢", color: "#db2777", bg: "#fdf2f8" },
}

const TABS: MethodTab[] = [
  "upper",
  "lower",
  "strip",
  "lstrip",
  "rstrip",
  "replace",
  "find",
  "count",
]

// ---------------------------------------------------------
// 글자 박스 한 줄 (원본/결과 공통)
// ---------------------------------------------------------
interface CharCell {
  ch: string
  highlight?: boolean // 매칭/변환 대상
  fading?: boolean // strip 으로 제거되는 공백
  swapped?: boolean // replace 로 새로 들어온 글자
  removed?: boolean // 이미 제거된 것 (자리만 차지)
}

function StringRow({
  cells,
  label,
  accent,
  emptyHint,
}: {
  cells: CharCell[]
  label: string
  accent: string
  emptyHint?: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
        {label}
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex items-stretch gap-1 min-w-full">
          {cells.length === 0 ? (
            <div className="text-xs text-slate-400 italic px-2 py-3">
              {emptyHint ?? "(empty)"}
            </div>
          ) : (
            cells.map((cell, i) => {
              const isSpace = cell.ch === " "
              const display = isSpace ? "·" : cell.ch

              if (cell.removed) return null

              const baseStyle: React.CSSProperties = {
                borderColor: "#e2e8f0",
                background: "white",
                color: "#475569",
              }
              const hlStyle: React.CSSProperties = {
                borderColor: accent,
                background: "white",
                color: accent,
                boxShadow: `0 0 0 2px ${accent}30`,
              }
              const swapStyle: React.CSSProperties = {
                borderColor: accent,
                background: `linear-gradient(135deg, ${accent}15 0%, ${accent}05 100%)`,
                color: accent,
                boxShadow: `0 0 0 2px ${accent}40`,
              }
              const fadingStyle: React.CSSProperties = {
                borderColor: "#fca5a5",
                background: "#fef2f2",
                color: "#dc2626",
              }

              return (
                <motion.div
                  key={i}
                  layout
                  initial={cell.swapped ? { scale: 0.4, opacity: 0 } : false}
                  animate={
                    cell.fading
                      ? { opacity: [1, 0.6, 0.35], scale: [1, 0.95, 0.9] }
                      : cell.highlight
                        ? { scale: [1, 1.15, 1.08] }
                        : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.35 }}
                  className="w-7 h-9 sm:w-8 sm:h-10 rounded-lg flex items-center justify-center font-mono text-base font-bold border-2 transition-colors"
                  style={
                    cell.fading
                      ? fadingStyle
                      : cell.swapped
                        ? swapStyle
                        : cell.highlight
                          ? hlStyle
                          : baseStyle
                  }
                >
                  {display}
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------
// 메인 컴포넌트
// ---------------------------------------------------------
export function PythonStringMethodVisualizer({
  lang = "ko",
  initialText = "  Hello World  ",
}: PythonStringMethodVisualizerProps) {
  const isEn = lang === "en"
  const [tab, setTab] = useState<MethodTab>("upper")
  const [text, setText] = useState(initialText)
  const [oldStr, setOldStr] = useState("l")
  const [newStr, setNewStr] = useState("L")
  const [subStr, setSubStr] = useState("l")

  const labels = {
    header: isEn ? "String Methods" : "문자열 마법",
    textInput: isEn ? "Original string:" : "원래 글:",
    original: isEn ? "Original" : "원래",
    result: isEn ? "Result" : "결과",
    immutable: isEn
      ? "Original is unchanged. Methods return a new string."
      : "원래 글은 그대로! 메서드는 새 글을 만들어 줘요 ✨",
    oldLabel: isEn ? "Find:" : "찾을 글자:",
    newLabel: isEn ? "Replace with:" : "바꿀 글자:",
    subLabel: isEn ? "Substring:" : "찾을 글자:",
    foundAt: isEn ? "Found at index" : "찾았어요! 위치",
    notFound: isEn ? "Not found → -1" : "못 찾았어요 → -1",
    countResult: isEn ? "Occurrences" : "몇 번 나왔나",
  } as const

  // 원본 글자 cells
  const originalChars = useMemo(() => Array.from(text), [text])

  // ---------------------------------------------------------
  // 탭별 변환 로직
  // ---------------------------------------------------------
  const { originalCells, resultCells, codeLine, extra } = useMemo(() => {
    const baseOriginal: CharCell[] = originalChars.map((ch) => ({ ch }))

    if (tab === "upper" || tab === "lower") {
      const transform = (s: string) =>
        tab === "upper" ? s.toUpperCase() : s.toLowerCase()
      const original: CharCell[] = originalChars.map((ch) => ({
        ch,
        highlight:
          tab === "upper"
            ? ch !== ch.toUpperCase() && ch.toLowerCase() !== ch.toUpperCase()
            : ch !== ch.toLowerCase() && ch.toLowerCase() !== ch.toUpperCase(),
      }))
      const resultStr = transform(text)
      const result: CharCell[] = Array.from(resultStr).map((ch, i) => {
        const origCh = originalChars[i]
        const changed = origCh !== undefined && origCh !== ch
        return { ch, swapped: changed, highlight: changed }
      })
      return {
        originalCells: original,
        resultCells: result,
        codeLine: `text.${tab}()`,
        extra: null as React.ReactNode,
      }
    }

    if (tab === "strip" || tab === "lstrip" || tab === "rstrip") {
      // 왼쪽 공백 갯수
      let lws = 0
      while (lws < originalChars.length && originalChars[lws] === " ") lws++
      // 오른쪽 공백 갯수
      let rws = 0
      while (
        rws < originalChars.length - lws &&
        originalChars[originalChars.length - 1 - rws] === " "
      )
        rws++

      const stripLeft = tab === "strip" || tab === "lstrip"
      const stripRight = tab === "strip" || tab === "rstrip"

      const original: CharCell[] = originalChars.map((ch, i) => {
        const inLeft = i < lws
        const inRight = i >= originalChars.length - rws
        const willStrip =
          (inLeft && stripLeft) || (inRight && stripRight && ch === " ")
        return {
          ch,
          fading: willStrip && ch === " ",
        }
      })

      const startIdx = stripLeft ? lws : 0
      const endIdx = stripRight ? originalChars.length - rws : originalChars.length
      const resultStr = originalChars.slice(startIdx, endIdx).join("")
      const result: CharCell[] = Array.from(resultStr).map((ch) => ({ ch }))

      return {
        originalCells: original,
        resultCells: result,
        codeLine: `text.${tab}()`,
        extra: null,
      }
    }

    if (tab === "replace") {
      const old = oldStr
      const repl = newStr
      // 원본에서 매칭된 위치 찾기 (단순 indexOf 반복)
      const matches: number[] = []
      if (old.length > 0) {
        let i = 0
        while (i <= text.length - old.length) {
          if (text.slice(i, i + old.length) === old) {
            matches.push(i)
            i += old.length
          } else {
            i++
          }
        }
      }
      const original: CharCell[] = originalChars.map((ch, i) => {
        const inMatch = matches.some((m) => i >= m && i < m + old.length)
        return { ch, highlight: inMatch }
      })

      const resultStr = old.length > 0 ? text.split(old).join(repl) : text
      // result cells: 각 글자가 "원본의 어느 위치에서 왔는지"를 추적
      const result: CharCell[] = []
      if (old.length === 0) {
        for (const ch of Array.from(resultStr)) result.push({ ch })
      } else {
        let ti = 0
        let ri = 0
        const resultArr = Array.from(resultStr)
        while (ri < resultArr.length) {
          if (
            ti <= text.length - old.length &&
            text.slice(ti, ti + old.length) === old
          ) {
            // replace 된 부분
            for (let k = 0; k < repl.length; k++) {
              result.push({ ch: resultArr[ri + k], swapped: true, highlight: true })
            }
            ri += repl.length
            ti += old.length
          } else {
            result.push({ ch: resultArr[ri] })
            ri++
            ti++
          }
        }
      }

      return {
        originalCells: original,
        resultCells: result,
        codeLine: `text.replace("${old}", "${repl}")`,
        extra: (
          <div className="text-xs text-slate-500 mt-1">
            {isEn
              ? `${matches.length} match${matches.length === 1 ? "" : "es"} replaced`
              : `🔁 ${matches.length}군데 바뀌었어요`}
          </div>
        ),
      }
    }

    if (tab === "find") {
      const needle = subStr
      const idx = needle.length === 0 ? -1 : text.indexOf(needle)
      const original: CharCell[] = originalChars.map((ch, i) => ({
        ch,
        highlight: idx >= 0 && i >= idx && i < idx + needle.length,
      }))
      return {
        originalCells: original,
        resultCells: [],
        codeLine: `text.find("${needle}")`,
        extra: (
          <div className="mt-1">
            {idx >= 0 ? (
              <motion.div
                key={`found-${idx}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 font-mono text-sm font-black"
                style={{
                  borderColor: TAB_META.find.color,
                  background: TAB_META.find.bg,
                  color: TAB_META.find.color,
                }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wide">
                  {labels.foundAt}
                </span>
                <span className="text-base">{idx}</span>
              </motion.div>
            ) : (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 font-mono text-sm font-black"
                style={{
                  borderColor: "#dc2626",
                  background: "#fef2f2",
                  color: "#dc2626",
                }}
              >
                <span>⚠ {labels.notFound}</span>
              </motion.div>
            )}
          </div>
        ),
      }
    }

    // count
    const needle = subStr
    const matches: number[] = []
    if (needle.length > 0) {
      let i = 0
      while (i <= text.length - needle.length) {
        if (text.slice(i, i + needle.length) === needle) {
          matches.push(i)
          i += needle.length
        } else {
          i++
        }
      }
    }
    const original: CharCell[] = originalChars.map((ch, i) => ({
      ch,
      highlight: matches.some((m) => i >= m && i < m + needle.length),
    }))
    return {
      originalCells: original,
      resultCells: [],
      codeLine: `text.count("${needle}")`,
      extra: (
        <motion.div
          key={`count-${matches.length}-${needle}`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 font-mono text-sm font-black mt-1"
          style={{
            borderColor: TAB_META.count.color,
            background: TAB_META.count.bg,
            color: TAB_META.count.color,
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wide">
            {labels.countResult}
          </span>
          <span className="text-base">{matches.length}</span>
        </motion.div>
      ),
    }
  }, [tab, text, originalChars, oldStr, newStr, subStr, isEn, labels])

  const accent = TAB_META[tab].color
  const showResultRow = tab !== "find" && tab !== "count"

  // 결과 문자열 (코드 라인 옆에 표시용)
  const resultStr = useMemo(() => resultCells.map((c) => c.ch).join(""), [resultCells])

  return (
    <div className="w-full sm:max-w-md mx-auto select-none space-y-3">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-slate-700">
          ✨ {labels.header}
        </span>
      </div>

      {/* 메인 카드 */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 space-y-4">
        {/* 탭 */}
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((t) => {
            const meta = TAB_META[t]
            const active = t === tab
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border-2 transition-all"
                style={
                  active
                    ? {
                        borderColor: meta.color,
                        background: meta.color,
                        color: "white",
                      }
                    : {
                        borderColor: "#e2e8f0",
                        background: "white",
                        color: "#64748b",
                      }
                }
                type="button"
              >
                <span className="mr-1">{meta.emoji}</span>
                {meta.label}
              </button>
            )
          })}
        </div>

        {/* 원본 입력 */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">
            {labels.textInput}
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={32}
            className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-mono text-sm focus:outline-none focus:border-slate-400 transition-all"
            placeholder="  Hello World  "
          />
        </div>

        {/* 메서드별 추가 인자 */}
        {tab === "replace" && (
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">
                {labels.oldLabel}
              </label>
              <input
                type="text"
                value={oldStr}
                onChange={(e) => setOldStr(e.target.value)}
                maxLength={8}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-mono text-sm focus:outline-none transition-all"
                style={{ borderColor: "#e2e8f0" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                placeholder="l"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500">
                {labels.newLabel}
              </label>
              <input
                type="text"
                value={newStr}
                onChange={(e) => setNewStr(e.target.value)}
                maxLength={8}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-mono text-sm focus:outline-none transition-all"
                style={{ borderColor: "#e2e8f0" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                placeholder="L"
              />
            </div>
          </div>
        )}

        {(tab === "find" || tab === "count") && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">
              {labels.subLabel}
            </label>
            <input
              type="text"
              value={subStr}
              onChange={(e) => setSubStr(e.target.value)}
              maxLength={8}
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 font-mono text-sm focus:outline-none transition-all"
              style={{ borderColor: "#e2e8f0" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
              placeholder="l"
            />
          </div>
        )}

        {/* 코드 라인 */}
        <div
          className="rounded-xl border-2 px-3 py-2 font-mono text-sm flex items-center gap-2 flex-wrap"
          style={{ borderColor: accent, background: TAB_META[tab].bg }}
        >
          <span className="text-slate-500">&gt;&gt;&gt;</span>
          <span className="font-bold" style={{ color: accent }}>
            {codeLine}
          </span>
          {showResultRow && (
            <>
              <span className="text-slate-400">→</span>
              <span className="font-black text-slate-800">'{resultStr}'</span>
            </>
          )}
        </div>

        {/* 원본 행 */}
        <StringRow
          cells={originalCells}
          label={`${labels.original}  text = "${text}"`}
          accent={accent}
        />

        {/* 결과 행 (변환 메서드만) */}
        <AnimatePresence>
          {showResultRow && (
            <motion.div
              key={`res-${tab}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <StringRow
                cells={resultCells}
                label={`${labels.result}  →  "${resultStr}"`}
                accent={accent}
                emptyHint={isEn ? "(empty string)" : "(빈 문자열)"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 추가 정보 (find/count/replace) */}
        {extra}

        {/* 불변성 안내 */}
        <div
          className="rounded-xl border-2 px-3 py-2 text-xs flex items-start gap-2"
          style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
        >
          <span className="text-base leading-none">💡</span>
          <span className="text-slate-600 leading-relaxed">{labels.immutable}</span>
        </div>
      </div>
    </div>
  )
}

export default PythonStringMethodVisualizer
