"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

const SimpleEditor = dynamic(() => import("react-simple-code-editor"), { ssr: false })

interface Props {
  value: string
  onValueChange: (code: string) => void
  highlight: (code: string) => string
  /** 1-based line number to highlight (e.g. compile error line). undefined → no highlight. */
  errorLine?: number
  padding?: number
  tabSize?: number
  insertSpaces?: boolean
  style?: React.CSSProperties
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement & HTMLDivElement>
}

const DEFAULT_FONT_SIZE = 14
const DEFAULT_LINE_HEIGHT = 1.5

/**
 * SimpleEditor wrapper that adds:
 *  - left gutter with 1-based line numbers
 *  - red highlight on the error line (if `errorLine` is provided)
 *
 * Why custom: react-simple-code-editor has no built-in line numbers.
 * Compile errors say "line N:..." → students need to see which line N is.
 */
export function CodeEditorWithGutter({
  value,
  onValueChange,
  highlight,
  errorLine,
  padding = 16,
  tabSize = 4,
  insertSpaces = true,
  style,
  onKeyDown,
}: Props) {
  const lineCount = useMemo(() => value.split("\n").length, [value])

  // Derive font / line-height from style prop so gutter aligns with editor.
  const fontSize = typeof style?.fontSize === "number" ? style.fontSize : DEFAULT_FONT_SIZE
  const lineHeight = typeof style?.lineHeight === "number" ? style.lineHeight : DEFAULT_LINE_HEIGHT
  const fontFamily = style?.fontFamily ?? "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, monospace"
  // Match gutter bg to editor bg so they look like one continuous surface.
  const editorBg = (style?.background as string) ?? "#1e1e2e"

  const editorStyle: React.CSSProperties = {
    fontFamily,
    fontSize,
    lineHeight,
    background: "transparent",   // gutter wrapper holds the bg
    color: "#e6edf3",
    ...(style || {}),
  }

  // VSCode-like: gutter merges with editor (same bg), dim numbers, error line tinted.
  return (
    <div
      className="cpp-editor-gutter-wrap"
      style={{
        display: "flex",
        position: "relative",
        background: editorBg,
      }}
    >
      {/* Line number gutter — visually merged with editor */}
      <div
        aria-hidden="true"
        style={{
          paddingTop: padding,
          paddingBottom: padding,
          fontFamily,
          fontSize: Math.max(11, fontSize - 2),
          lineHeight,
          color: "rgba(230, 237, 243, 0.55)",   // dim but readable (slightly stronger than VSCode default)
          textAlign: "right",
          userSelect: "none",
          background: editorBg,
          minWidth: 40,
          flexShrink: 0,
        }}
      >
        {Array.from({ length: lineCount }, (_, i) => {
          const ln = i + 1
          const isError = errorLine === ln
          return (
            <div
              key={ln}
              style={{
                paddingLeft: 8,
                paddingRight: 12,
                background: isError ? "rgba(239, 68, 68, 0.15)" : "transparent",
                color: isError ? "#fca5a5" : undefined,
                fontWeight: isError ? 700 : 400,
                height: `${fontSize * lineHeight}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                borderLeft: isError ? "2px solid #ef4444" : "2px solid transparent",
                boxSizing: "border-box",
              }}
            >
              {ln}
            </div>
          )
        })}
      </div>

      {/* Editor */}
      <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
        <SimpleEditor
          value={value}
          onValueChange={onValueChange}
          highlight={highlight}
          padding={padding}
          tabSize={tabSize}
          insertSpaces={insertSpaces}
          style={editorStyle}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}

/**
 * Parse a compiler error message to extract the first line number from
 * the user's own file (main.cpp / main.py), skipping system headers.
 *
 * Handles:
 *  - gcc/clang: "file:line:col: error|warning|note: ..."
 *  - gcc 옛 포맷: "file:line: error: ..." (col 없음)
 *  - clang fatal: "file:line:col: fatal error: ..."
 *  - Python: "File \"...\", line N" or just "line N, in ..."
 */
export function parseErrorLine(errorMessage: string | undefined | null): number | undefined {
  if (!errorMessage) return undefined

  // 1) 메인 file:line[:col]: keyword 모두 매칭, 시스템 헤더는 스킵
  //    e.g. "main.cpp.cpp:18:27: error: ..." 또는 "/piston/.../header.h:42:1: note: ..."
  const allMatches = [...errorMessage.matchAll(
    /(?:^|\n)([^\s:]+?\.[a-zA-Z]+(?:\.[a-zA-Z]+)?):(\d+)(?::\d+)?:\s*(?:fatal\s+)?(?:error|warning|note)/gi
  )]

  // 우선 시스템 경로 아닌 파일에서 에러 줄 찾기
  for (const m of allMatches) {
    const file = m[1]
    const line = parseInt(m[2], 10)
    if (!Number.isFinite(line) || line <= 0) continue
    // 시스템/라이브러리 헤더 스킵
    if (file.includes("/usr/") || file.includes("/piston/") || file.includes("include/")) continue
    // .h / .hpp 도 보통 헤더 — 학생 코드는 .cpp / .py
    if (file.endsWith(".h") || file.endsWith(".hpp")) continue
    return line
  }
  // 그래도 못 찾았으면 그냥 첫 매칭 사용
  if (allMatches.length > 0) {
    const line = parseInt(allMatches[0][2], 10)
    if (Number.isFinite(line) && line > 0) return line
  }

  // 2) Python traceback: 'File "...", line N' 또는 그냥 'line N'
  const py = errorMessage.match(/(?:File\s+"[^"]*",\s+)?line\s+(\d+)/i)
  if (py) {
    const n = parseInt(py[1], 10)
    if (Number.isFinite(n) && n > 0) return n
  }

  // 3) "at line N" / "라인 N" 같은 변형
  const alt = errorMessage.match(/(?:at\s+line|라인|\\bline)\s*:?\s*(\d+)/i)
  if (alt) {
    const n = parseInt(alt[1], 10)
    if (Number.isFinite(n) && n > 0) return n
  }

  return undefined
}
