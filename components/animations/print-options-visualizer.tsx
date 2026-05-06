"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ============================================
// print() sep / end 시각화 — 학생이 ▷ 한 단계 버튼을 누를 때마다 토큰이 하나씩 출현.
// hideEnd=true 면 end 토큰 / 두 번째 print / end 범례 모두 숨김 (sep 만 배운 시점용).
// ============================================

type Preset = {
  id: string
  label: string         // 버튼 라벨 (기본)
  labelSepOnly?: string // sep 만 보여줄 때 (hideEnd=true) 의 버튼 라벨
  values: string[]      // print() 의 인자
  sep: string           // sep 옵션
  end: string           // end 옵션
  next?: string[]       // 두 번째 print() 의 인자 (없으면 다음 print 미시연)
  caption: string       // 하단 한 줄 설명
  color: string         // 강조 색
}

function getPresets(isEn: boolean): Preset[] {
  return [
    {
      id: "default",
      label: isEn ? "Default (sep=\" \", end=\"\\n\")" : "기본 (sep=\" \", end=\"\\n\")",
      labelSepOnly: isEn ? "Default (sep=\" \")" : "기본 (sep=\" \")",
      values: ["A", "B", "C"],
      sep: " ",
      end: "\n",
      next: ["X"],
      caption: isEn
        ? "Defaults: a space between values, newline at the end. So the next print starts on a new line."
        : "기본값: 값 사이는 공백, 끝은 줄바꿈. 그래서 다음 print 는 새 줄에서 시작.",
      color: "#3b82f6",
    },
    {
      id: "sep-dash",
      label: 'sep="-"',
      values: ["2024", "01", "15"],
      sep: "-",
      end: "\n",
      caption: isEn
        ? "sep replaces the gap between values — perfect for dates."
        : "sep 은 값 사이의 공간을 대신해요 — 날짜 표기에 딱.",
      color: "#f59e0b",
    },
    {
      id: "sep-slash",
      label: 'sep="/"',
      values: ["2024", "01", "15"],
      sep: "/",
      end: "\n",
      caption: isEn
        ? "sep=\"/\" — slashes between, classic for dates."
        : "sep=\"/\" — 사이에 슬래시. 날짜 표기에 자주 써요.",
      color: "#06b6d4",
    },
    {
      id: "sep-empty",
      label: 'sep=""',
      values: ["A", "B", "C"],
      sep: "",
      end: "\n",
      caption: isEn
        ? "sep=\"\" glues values together — no gap at all."
        : "sep=\"\" 는 값을 딱 붙여요 — 빈틈 없음.",
      color: "#a855f7",
    },
    {
      id: "default-end",
      label: isEn ? "Default end (\"\\n\")" : "기본 end (\"\\n\")",
      values: ["Hello"],
      sep: " ",
      end: "\n",
      next: ["World"],
      caption: isEn
        ? "end=\"\\n\" → cursor jumps to the next line. The next print starts there."
        : "end=\"\\n\" → 커서가 다음 줄로. 다음 print 는 거기서 시작.",
      color: "#3b82f6",
    },
    {
      id: "end-space",
      label: 'end=" "',
      values: ["Hello"],
      sep: " ",
      end: " ",
      next: ["World"],
      caption: isEn
        ? "end=\" \" → cursor stays on the same line with a space. The next print continues right there."
        : "end=\" \" → 줄바꿈 대신 공백. 커서가 같은 줄에 있어서 다음 print 가 이어 붙어요.",
      color: "#10b981",
    },
    {
      id: "end-empty",
      label: 'end=""',
      values: ["Load"],
      sep: " ",
      end: "",
      next: ["ing..."],
      caption: isEn
        ? "end=\"\" → no newline, no space. The next print is glued to the previous output."
        : "end=\"\" → 아무것도 없음. 다음 print 가 그대로 붙어요. 로딩 효과 단골 패턴.",
      color: "#ec4899",
    },
    {
      id: "end-asterisk",
      label: 'end="*"',
      values: ["Hi"],
      sep: " ",
      end: "*",
      next: ["Bye"],
      caption: isEn
        ? "end=\"*\" → an asterisk after the print, then the next print sticks on right after."
        : "end=\"*\" → 끝에 * 가 붙고, 다음 print 가 바로 이어 붙어요. (어떤 글자든 가능!)",
      color: "#f97316",
    },
    {
      id: "mixed",
      label: 'sep="-", end="!"',
      values: ["a", "b", "c"],
      sep: "-",
      end: "!",
      next: ["Done"],
      caption: isEn
        ? "Both at once: dash between, ! at the end, then the next print sticks right after."
        : "둘 다 동시에: 사이는 -, 끝은 ! 그리고 다음 print 가 바로 이어 붙음.",
      color: "#06b6d4",
    },
  ]
}

// src: 어느 print 의 토큰인지 (1 = 첫번째, 2 = 두번째)
// valueIdx: value 토큰일 때 print 안 몇 번째 인자인지 (0-based)
type Token = { kind: "value" | "sep" | "end"; text: string; src: 1 | 2; valueIdx?: number }

// 1차 print 의 토큰 시퀀스 만들기. hideEnd=true 면 end 생략.
function buildPrint1Tokens(values: string[], sep: string, end: string, hideEnd: boolean): Token[] {
  const out: Token[] = []
  values.forEach((v, i) => {
    out.push({ kind: "value", text: v, src: 1, valueIdx: i })
    if (i < values.length - 1) {
      out.push({ kind: "sep", text: sep, src: 1 })
    }
  })
  if (!hideEnd) out.push({ kind: "end", text: end, src: 1 })
  return out
}

// 2차 print 의 토큰 시퀀스 만들기 (기본 sep=" ", end="\n").
function buildPrint2Tokens(values: string[]): Token[] {
  const out: Token[] = []
  values.forEach((v, i) => {
    out.push({ kind: "value", text: v, src: 2, valueIdx: i })
    if (i < values.length - 1) {
      out.push({ kind: "sep", text: " ", src: 2 })
    }
  })
  out.push({ kind: "end", text: "\n", src: 2 })
  return out
}

// 출력된 토큰들을 \n 기준으로 줄로 나누기.
function splitIntoLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]]
  for (const t of tokens) {
    if (t.kind === "end" && t.text === "\n") {
      lines[lines.length - 1].push(t)
      lines.push([])
    } else if (t.text.includes("\n")) {
      const parts = t.text.split("\n")
      parts.forEach((p, i) => {
        if (p) lines[lines.length - 1].push({ kind: t.kind, text: p, src: t.src })
        if (i < parts.length - 1) lines.push([])
      })
    } else {
      lines[lines.length - 1].push(t)
    }
  }
  return lines
}

function PrintOptionsVisualizer({
  lang = "ko",
  presetIds,
  hideEnd = false,
  hideSep = false,
}: {
  lang?: "ko" | "en"
  presetIds?: string[]   // 보여줄 프리셋 id 만 필터. 미지정이면 전체.
  hideEnd?: boolean      // true 면 end 토큰 / 두 번째 print / 범례 모두 숨김
  hideSep?: boolean      // true 면 코드의 sep 인자 / 범례 숨김 (end 만 배운 시점용)
}) {
  const isEn = lang === "en"
  const ALL_PRESETS = getPresets(isEn)
  const PRESETS = presetIds && presetIds.length > 0
    ? ALL_PRESETS.filter((p) => presetIds.includes(p.id))
    : ALL_PRESETS
  const [selectedId, setSelectedId] = useState(PRESETS[0].id)
  const [revealed, setRevealed] = useState(0)        // 지금까지 보여준 토큰 개수 (1+2차 합)

  const preset = PRESETS.find((p) => p.id === selectedId) ?? PRESETS[0]
  const tokens1 = buildPrint1Tokens(preset.values, preset.sep, preset.end, hideEnd)
  const tokens2 = !hideEnd && preset.next ? buildPrint2Tokens(preset.next) : []
  const totalTokens = tokens1.length + tokens2.length
  const allTokens: Token[] = [...tokens1, ...tokens2].slice(0, revealed)
  const lines = splitIntoLines(allTokens)

  const reset = () => setRevealed(0)
  const step = () => setRevealed((r) => Math.min(r + 1, totalTokens))
  const runAll = () => setRevealed(totalTokens)

  const isDone = revealed >= totalTokens
  const showCursor = revealed > 0   // 출력 시작 후엔 항상 깜빡이는 커서 표시
  const firstPrintDone = revealed >= tokens1.length
  const tokensLeft = totalTokens - revealed

  // 가장 최근에 그려진 토큰 (코드 패널 하이라이트용)
  const latestToken: Token | undefined = revealed > 0 ? [...tokens1, ...tokens2][revealed - 1] : undefined

  // 코드 부분 강조 헬퍼 — 어떤 부분이 지금 활성화되었는지
  const isActive = {
    print1Value: (idx: number) =>
      latestToken?.src === 1 && latestToken.kind === "value" && latestToken.valueIdx === idx,
    print1Sep: () =>
      latestToken?.src === 1 && latestToken.kind === "sep",
    print1End: () =>
      latestToken?.src === 1 && latestToken.kind === "end",
    print2Value: (idx: number) =>
      latestToken?.src === 2 && latestToken.kind === "value" && latestToken.valueIdx === idx,
    print2Sep: () =>
      latestToken?.src === 2 && latestToken.kind === "sep",
    print2End: () =>
      latestToken?.src === 2 && latestToken.kind === "end",
  }

  // 활성 강조 스타일
  const activeStyle = {
    background: "#fbbf2440",                // amber-400/25
    boxShadow: "0 0 0 2px #fbbf24",
    borderRadius: 4,
    padding: "0 2px",
  }
  const inactiveStyle = { padding: "0 2px" }

  // 다음에 나올 토큰 종류 미리 보기 — 학생이 누르기 전에 추측해볼 수 있도록 친절하게
  const nextToken: Token | undefined = revealed < totalTokens ? [...tokens1, ...tokens2][revealed] : undefined
  const nextLabel: string = (() => {
    if (!nextToken) return ""
    const printPrefix = nextToken.src === 2
      ? (isEn ? "(2nd print) " : "(두 번째 print) ")
      : ""
    if (nextToken.kind === "value") {
      return isEn
        ? `→ next: ${printPrefix}value "${nextToken.text}"`
        : `→ 다음: ${printPrefix}값 "${nextToken.text}"`
    }
    if (nextToken.kind === "sep") {
      const display = nextToken.text === "" ? '""' : `"${nextToken.text === " " ? "·" : nextToken.text}"`
      return isEn
        ? `→ next: ${printPrefix}sep ${display} (between values)`
        : `→ 다음: ${printPrefix}sep ${display} (값 사이로)`
    }
    if (nextToken.kind === "end") {
      const display = nextToken.text === "\n"
        ? '"\\n" (newline → next line)'
        : nextToken.text === ""
          ? '"" (nothing)'
          : `"${nextToken.text === " " ? "·" : nextToken.text}"`
      const displayKo = nextToken.text === "\n"
        ? '"\\n" (줄바꿈 → 다음 줄로)'
        : nextToken.text === ""
          ? '"" (아무것도 없음)'
          : `"${nextToken.text === " " ? "·" : nextToken.text}"`
      return isEn
        ? `→ next: ${printPrefix}end ${display} (after last value)`
        : `→ 다음: ${printPrefix}end ${displayKo} (마지막 값 뒤에)`
    }
    return ""
  })()

  // 토큰 렌더링
  const renderToken = (t: Token, key: string) => {
    if (t.kind === "end") {
      if (t.text === "\n") {
        return (
          <motion.span
            key={key}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[10px] font-bold align-middle"
            style={{ background: "#0e7490", color: "#cffafe" }}
            title='end="\n"'
          >
            ↵
          </motion.span>
        )
      }
      if (t.text === "") {
        return (
          <motion.span
            key={key}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block w-2 h-4 mx-0.5 align-middle border border-dashed rounded-sm"
            style={{ borderColor: "#22d3ee", background: "#0e749022" }}
            title='end=""'
          />
        )
      }
      return (
        <motion.span
          key={key}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-1 py-0.5 mx-0.5 rounded font-mono text-sm font-bold align-middle"
          style={{ background: "#0e7490", color: "#cffafe" }}
          title={`end=${JSON.stringify(t.text)}`}
        >
          {t.text === " " ? "·" : t.text}
        </motion.span>
      )
    }
    if (t.kind === "sep") {
      if (t.text === "") {
        return (
          <motion.span
            key={key}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block w-1.5 h-4 mx-0 align-middle border border-dashed rounded-sm"
            style={{ borderColor: "#fbbf24", background: "#92400e22" }}
            title='sep=""'
          />
        )
      }
      return (
        <motion.span
          key={key}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-1 py-0.5 mx-0.5 rounded font-mono text-sm font-bold align-middle"
          style={{ background: "#92400e", color: "#fde68a" }}
          title={`sep=${JSON.stringify(t.text)}`}
        >
          {t.text === " " ? "·" : t.text}
        </motion.span>
      )
    }
    // value
    return (
      <motion.span
        key={key}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-base align-middle"
        style={{ color: "#f9fafb", background: t.src === 2 ? "#1e3a8a40" : "transparent", padding: t.src === 2 ? "0 2px" : 0, borderRadius: t.src === 2 ? 2 : 0 }}
      >
        {t.text}
      </motion.span>
    )
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
            {hideEnd && p.labelSepOnly ? p.labelSepOnly : p.label}
          </button>
        ))}
      </div>

      {/* 선택한 프리셋 설명 — 항상 표시 (선택 즉시 보임) */}
      <motion.div
        key={selectedId}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl px-3 py-2 text-xs"
        style={{ background: preset.color + "15", color: "#374151", borderLeft: `3px solid ${preset.color}` }}
      >
        💡 {preset.caption}
      </motion.div>

      {/* 코드 + 터미널 */}
      <div className="rounded-2xl border-2 p-4 space-y-4" style={{ borderColor: preset.color + "40", background: preset.color + "0d" }}>

        {/* 코드 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider">
            {isEn ? "CODE" : "코드"}
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 font-mono text-sm text-gray-100 whitespace-pre overflow-x-auto">
            <div>
              <span className="text-purple-300">print</span>
              <span>(</span>
              {preset.values.map((v, i) => (
                <span key={i}>
                  <motion.span
                    animate={isActive.print1Value(i) ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-amber-200 inline-block"
                    style={isActive.print1Value(i) ? activeStyle : inactiveStyle}
                  >
                    {`"${v}"`}
                  </motion.span>
                  {i < preset.values.length - 1 && <span>, </span>}
                </span>
              ))}
              {!hideSep && (
                <>
                  <span>, </span>
                  <motion.span
                    animate={isActive.print1Sep() ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block"
                    style={isActive.print1Sep() ? activeStyle : inactiveStyle}
                  >
                    <span className="text-yellow-300">sep</span>
                    <span>=</span>
                    <span className="text-yellow-200">{`"${preset.sep.replace("\n", "\\n")}"`}</span>
                  </motion.span>
                </>
              )}
              {!hideEnd && (
                <>
                  <span>, </span>
                  <motion.span
                    animate={isActive.print1End() ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block"
                    style={isActive.print1End() ? activeStyle : inactiveStyle}
                  >
                    <span className="text-cyan-300">end</span>
                    <span>=</span>
                    <span className="text-cyan-200">{`"${preset.end.replace("\n", "\\n")}"`}</span>
                  </motion.span>
                </>
              )}
              <span>)</span>
            </div>
            {!hideEnd && preset.next && (
              <div>
                <span className="text-purple-300">print</span>
                <span>(</span>
                {preset.next.map((v, i) => (
                  <span key={i}>
                    <motion.span
                      animate={isActive.print2Value(i) ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-amber-200 inline-block"
                      style={isActive.print2Value(i) ? activeStyle : inactiveStyle}
                    >
                      {`"${v}"`}
                    </motion.span>
                    {i < preset.next!.length - 1 && <span>, </span>}
                  </span>
                ))}
                <span>)</span>
                <span className="text-gray-500">  {isEn ? "# 2nd print" : "# 두 번째 print"}</span>
              </div>
            )}
          </div>
        </div>

        {/* 터미널 출력 */}
        <div>
          <div className="text-[11px] font-bold text-gray-400 mb-2 tracking-wider flex items-center justify-between">
            <span>{isEn ? "TERMINAL OUTPUT" : "터미널 출력"}</span>
            <span className="font-normal normal-case tracking-normal text-[10px] text-gray-400 flex items-center gap-2">
              {!hideSep && (
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded" style={{ background: "#92400e" }} />
                  sep
                </span>
              )}
              {!hideEnd && (
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded" style={{ background: "#0e7490" }} />
                  end
                </span>
              )}
            </span>
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-3 min-h-[110px] font-mono text-sm text-gray-100 leading-7">
            {lines.map((line, li) => {
              const isLast = li === lines.length - 1
              const hasCursorHere = isLast && showCursor
              return (
                <div key={li} className="whitespace-pre min-h-[1.75rem]">
                  {line.map((t, ti) => renderToken(t, `${li}-${ti}`))}
                  {/* 마지막 줄 끝 — 시작 후엔 항상 깜빡이는 커서. 줄 시작이면 ml 없음 */}
                  {hasCursorHere && (
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`inline-block w-2 h-4 align-middle ${line.length > 0 ? "ml-0.5" : ""}`}
                      style={{ background: "#fbbf24" }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 진행 상태 + 다음 토큰 미리 보기 */}
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-500">
            <span className="font-mono">{revealed}</span>
            <span className="text-gray-300"> / </span>
            <span className="font-mono">{totalTokens}</span>
            <span className="ml-1">{isEn ? "tokens" : "토큰"}</span>
          </div>
          {!isDone && nextLabel && (
            <div className="text-gray-500 italic">{nextLabel}</div>
          )}
          {isDone && (
            <div className="font-bold" style={{ color: preset.color }}>✓ {isEn ? "done" : "끝"}</div>
          )}
        </div>

        {/* 1차 끝났는데 2차 시작 전 → 다음 print 위치 안내 */}
        <AnimatePresence>
          {!hideEnd && preset.next && firstPrintDone && revealed === tokens1.length && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl px-3 py-2 text-[11px] text-gray-600"
              style={{ background: "#fef3c7" }}
            >
              {isEn
                ? "→ Watch the blinking cursor — that's where the second print starts. Click Step to continue."
                : "→ 깜빡이는 커서 자리 = 두 번째 print 가 시작하는 곳. 한 단계 더 눌러 봐요."}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={step}
            disabled={isDone}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: preset.color }}
          >
            ▷ {isEn ? "Step" : "한 단계"}
            {!isDone && tokensLeft > 0 && (
              <span className="ml-1 text-xs opacity-80">({tokensLeft} {isEn ? "left" : "남음"})</span>
            )}
          </button>
          <button
            onClick={runAll}
            disabled={isDone}
            className="px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "white", color: preset.color, borderColor: preset.color + "60" }}
          >
            ⏭ {isEn ? "Show all" : "끝까지"}
          </button>
          <button
            onClick={reset}
            disabled={revealed === 0}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ↺ {isEn ? "Reset" : "다시"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrintOptionsVisualizer
export { PrintOptionsVisualizer }
