"use client"

import React, { useState } from "react"
import { createPortal } from "react-dom"
import { CodeBlock } from "@/components/ui/code-block"
import { useLanguage } from "@/contexts/language-context"

// ── 클릭 시 확대되는 이미지 컴포넌트 ──
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="my-4 flex justify-center cursor-zoom-in"
        onClick={() => setOpen(true)}
        title="클릭하면 크게 볼 수 있어요"
      >
        <img src={src} alt={alt}
          className="w-full rounded-xl border border-gray-200 shadow-sm"
          style={{ maxWidth: '520px' }} />
      </div>

      {open && typeof window !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-bold"
            >×</button>
            <img src={src} alt={alt}
              className="w-full rounded-xl"
              style={{ maxHeight: '80vh', objectFit: 'contain' }} />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

// ============================================
// 인라인 컬러 태그 맵: {pink:텍스트} → 핑크색
// ============================================
const COLOR_MAP: Record<string, string> = {
  pink: "text-pink-600",
  red: "text-red-600",
  blue: "text-blue-600",
  sky: "text-sky-600",
  green: "text-emerald-600",
  teal: "text-teal-600",
  purple: "text-violet-600",
  orange: "text-orange-600",
  amber: "text-amber-600",
  indigo: "text-indigo-600",
}
const COLOR_BG_MAP: Record<string, string> = {
  pink: "bg-pink-50 border-pink-200 text-pink-700",
  red: "bg-red-50 border-red-200 text-red-700",
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  sky: "bg-sky-50 border-sky-200 text-sky-700",
  green: "bg-emerald-50 border-emerald-200 text-emerald-700",
  teal: "bg-teal-50 border-teal-200 text-teal-700",
  purple: "bg-violet-50 border-violet-200 text-violet-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
}

// ============================================
// 인라인 마크다운 헬퍼: `code` + **bold** + {color:text} 처리
// ============================================
function renderInlineMarkdown(text: string, keyPrefix: string = ""): React.ReactNode[] {
  // 1단계: {color:text} 컬러 태그 + `code` + **bold** 통합 분리
  const colorTagPattern = /(\{(?:pink|red|blue|sky|green|teal|purple|orange|amber|indigo):[^}]+\})/g
  const segments = text.split(colorTagPattern)

  return segments.flatMap((segment, si): React.ReactNode[] => {
    // {color:text} 컬러 태그 처리
    const colorMatch = segment.match(/^\{(pink|red|blue|sky|green|teal|purple|orange|amber|indigo):([^}]+)\}$/)
    if (colorMatch) {
      const colorName = colorMatch[1]
      const innerText = colorMatch[2]
      const cls = COLOR_MAP[colorName] || "text-gray-700"
      // 내부 **bold**와 `code` 처리
      return [<span key={`${keyPrefix}c${si}`} className={`${cls} font-semibold`}>{renderBasicInline(innerText, `${keyPrefix}c${si}-`)}</span>]
    }

    // 일반 텍스트: `code` + **bold** 처리
    return renderBasicInline(segment, `${keyPrefix}${si}-`)
  })
}

// `code` + **bold** 처리 (컬러 태그 내부에서도 재사용)
function renderBasicInline(text: string, keyPrefix: string = ""): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.flatMap((part, j): React.ReactNode[] => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return [
        <code key={`${keyPrefix}${j}`} className="bg-indigo-100 px-1.5 py-0.5 rounded-md font-mono text-indigo-700 text-sm font-semibold">
          {part.slice(1, -1)}
        </code>
      ]
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
    return boldParts.map((bp, k) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={`${keyPrefix}${j}-${k}`} className="font-bold text-indigo-600">{bp.slice(2, -2)}</strong>
      }
      return bp
    })
  })
}

// chat bubble 전용 인라인 (배경색이 다름)
function renderChatInline(text: string, keyPrefix: string = ""): React.ReactNode[] {
  const colorTagPattern = /(\{(?:pink|red|blue|sky|green|teal|purple|orange|amber|indigo):[^}]+\})/g
  const segments = text.split(colorTagPattern)

  return segments.flatMap((segment, si): React.ReactNode[] => {
    const colorMatch = segment.match(/^\{(pink|red|blue|sky|green|teal|purple|orange|amber|indigo):([^}]+)\}$/)
    if (colorMatch) {
      const cls = COLOR_MAP[colorMatch[1]] || ""
      return [<span key={`${keyPrefix}c${si}`} className={`${cls} font-semibold`}>{colorMatch[2]}</span>]
    }
    const parts = segment.split(/(`[^`]+`)/g)
    return parts.flatMap((part, j): React.ReactNode[] => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return [
          <code key={`${keyPrefix}${si}-${j}`} className="bg-white/30 px-1 py-0.5 rounded font-mono text-sm font-bold">
            {part.slice(1, -1)}
          </code>
        ]
      }
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
      return boldParts.map((bp, k) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${keyPrefix}${si}-${j}-${k}`} className="font-bold">{bp.slice(2, -2)}</strong>
        }
        return bp
      })
    })
  })
}

// ============================================
// 접을 수 있는 코드블록 컴포넌트
// ============================================
function CollapsibleCode({ label, code, language }: { label: string; code: string; language: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="my-3">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors"
      >
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {label}
      </button>
      {open && (
        <div className="mt-2 relative group">
          <CodeBlock code={code} language={language} />
          <CopyButton code={code} />
        </div>
      )}
    </div>
  )
}

// ============================================
// 코드 복사 버튼 컴포넌트
// ============================================
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  const { t } = useLanguage()
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-gray-700/60 hover:bg-gray-600/80 text-gray-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
    >
      {copied ? t("✓ 복사됨", "✓ Copied") : t("📋 복사", "📋 Copy")}
    </button>
  )
}

// ============================================
// 코드펜스 언어 + 하이라이트 라인 파싱
// ============================================
function parseLangAndHighlights(langStr: string): { lang: string; highlightLines: Set<number> } {
  const match = langStr.match(/^(\w+)\s*\{([^}]+)\}$/)
  if (!match) return { lang: langStr, highlightLines: new Set() }

  const lang = match[1]
  const spec = match[2]
  const lines = new Set<number>()
  spec.split(',').forEach(part => {
    const range = part.trim().match(/^(\d+)-(\d+)$/)
    if (range) {
      for (let n = parseInt(range[1]); n <= parseInt(range[2]); n++) lines.add(n)
    } else {
      const n = parseInt(part.trim())
      if (!isNaN(n)) lines.add(n)
    }
  })
  return { lang, highlightLines: lines }
}

// ============================================
// 메인 렌더 함수
// ============================================
export function renderContent(content: string) {
  const elements: React.ReactNode[] = []
  const lines = content.split('\n')
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // ── 접기 코드블록: {collapse:버튼텍스트} 다음 줄에 ```코드 ──
    const collapseMatch = line.match(/^\{collapse:(.+)\}$/)
    if (collapseMatch) {
      const label = collapseMatch[1]
      i++
      if (i < lines.length && lines[i].startsWith('```')) {
        const lang = lines[i].slice(3).trim() || 'python'
        i++
        const codeLines: string[] = []
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        i++
        const codeText = codeLines.join('\n')
        elements.push(<CollapsibleCode key={key++} label={label} code={codeText} language={lang} />)
      }
      continue
    }

    // ── 코드블록 ──
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      const { lang, highlightLines } = parseLangAndHighlights(line.slice(3).trim() || 'python')
      i++

      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++

      if (codeLines.length > 0) {
        const codeText = codeLines.join('\n')
        elements.push(
          <div key={key++} className="my-4 relative group">
            <CodeBlock code={codeText} language={lang} highlightLines={highlightLines.size > 0 ? highlightLines : undefined} />
            <CopyButton code={codeText} />
          </div>
        )
      }
      continue
    }

    // ── 마크다운 테이블 ──
    if (line.trim().match(/^\|(.+)\|$/) && !line.trim().match(/^\|[-:\s|]+\|$/)) {
      const tableLines: string[] = []

      while (i < lines.length && lines[i].trim().match(/^\|(.+)\|$/)) {
        tableLines.push(lines[i].trim())
        i++
      }

      if (tableLines.length >= 2) {
        const parseRow = (row: string) => {
          const inner = row.slice(1, -1).replace(/\\\|/g, '\x00')
          return inner.split('|').map(cell => cell.trim().replace(/\x00/g, '|'))
        }

        const isSeparator = (row: string) =>
          parseRow(row).every(cell => /^[-:\s]+$/.test(cell))

        const hasHeader = tableLines.length >= 2 && isSeparator(tableLines[1])
        const headerRow = hasHeader ? parseRow(tableLines[0]) : null
        const bodyRows = hasHeader
          ? tableLines.slice(2).filter(r => !isSeparator(r)).map(parseRow)
          : tableLines.filter(r => !isSeparator(r)).map(parseRow)

        elements.push(
          <div key={key++} className="my-4 overflow-x-auto rounded-xl border border-indigo-200 shadow-sm">
            <table className="w-full text-sm">
              {headerRow && (
                <thead>
                  <tr className="bg-indigo-50 border-b-2 border-indigo-200">
                    {headerRow.map((cell, j) => (
                      <th key={j} className="px-3 py-2.5 text-left font-bold text-indigo-900 text-sm whitespace-nowrap">
                        {renderInlineMarkdown(cell, `th-${j}-`)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-indigo-50/30"}>
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-3 py-2 text-gray-700 border-t border-indigo-100${ci === 0 ? " whitespace-nowrap font-medium" : ""}`}>
                        {renderInlineMarkdown(cell, `td-${ri}-${ci}-`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // ── 이미지: ![alt](src) ──
    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      const alt = imgMatch[1]
      const src = imgMatch[2]
      elements.push(
        <ZoomableImage key={key++} src={src} alt={alt} />
      )
      i++
      continue
    }

    // ── 대화 말풍선 + 따라해보세요 콜아웃 ──
    const chatMatch = line.match(/^@(선생님|학생|핵심|따라해보세요|Teacher|Student|Key|TryIt):\s*(.+)$/)
    if (chatMatch) {
      const role = chatMatch[1]
      const text = chatMatch[2]

      if (role === '선생님' || role === 'Teacher') {
        elements.push(
          <div key={key++} className="flex items-start gap-2 my-2">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg md:text-xl">
              🧑‍🏫
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl rounded-tl-sm px-3 py-2 md:px-4 md:py-2.5 max-w-[85%]">
              <p className="text-sm md:text-base text-blue-900 leading-relaxed">{renderChatInline(text)}</p>
            </div>
          </div>
        )
      } else if (role === '학생' || role === 'Student') {
        elements.push(
          <div key={key++} className="flex items-start gap-2 my-2 flex-row-reverse">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500 flex items-center justify-center text-lg md:text-xl">
              🧒
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl rounded-tr-sm px-3 py-2 md:px-4 md:py-2.5 max-w-[85%]">
              <p className="text-sm md:text-base text-green-900 leading-relaxed">{renderChatInline(text)}</p>
            </div>
          </div>
        )
      } else if (role === '핵심' || role === 'Key') {
        elements.push(
          <div key={key++} className="my-3 bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-center">
            <p className="text-sm md:text-base text-amber-900 font-bold leading-relaxed">💡 {renderChatInline(text)}</p>
          </div>
        )
      } else if (role === '따라해보세요' || role === 'TryIt') {
        elements.push(
          <div key={key++} className="my-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-2xl px-4 py-3 md:px-5 md:py-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <span className="font-bold text-indigo-700 text-sm">{role === 'TryIt' ? "Try It!" : "따라해보세요!"}</span>
            </div>
            <p className="text-sm md:text-base text-indigo-800 leading-relaxed pl-9">
              {renderInlineMarkdown(text)}
            </p>
          </div>
        )
      }

      i++
      continue
    }

    // ── 컬러 블록 라인: {!color} 텍스트 ──
    const colorBlockMatch = line.match(/^\{!(pink|red|blue|sky|green|teal|purple|orange|amber|indigo)\}\s*(.+)$/)
    if (colorBlockMatch) {
      const colorName = colorBlockMatch[1]
      const blockText = colorBlockMatch[2]
      const bgCls = COLOR_BG_MAP[colorName] || "bg-gray-50 border-gray-200 text-gray-700"
      elements.push(
        <div key={key++} className={`my-2 ${bgCls} border rounded-xl px-3 py-2 md:px-4 md:py-2.5`}>
          <p className="text-sm md:text-base font-medium leading-relaxed">
            {renderInlineMarkdown(blockText, `cb-${key}-`)}
          </p>
        </div>
      )
      i++
      continue
    }

    // ── 💭 생각해보기 (thought bubble) ──
    if (line.startsWith('💭 ')) {
      const text = line.slice(2).trim()
      elements.push(
        <div key={key++} className="my-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-4 py-3 md:px-5 md:py-4">
          <p className="text-sm md:text-base text-indigo-800 leading-relaxed">
            <span className="text-lg md:text-xl mr-1">🤔</span>
            {renderInlineMarkdown(text)}
          </p>
        </div>
      )
      i++
      continue
    }

    // ── 헤더 ──
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-lg md:text-xl font-bold text-gray-900 mt-6 md:mt-8 mb-3 md:mb-4">{line.slice(3)}</h2>)
      i++
      continue
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-base md:text-lg font-bold text-gray-800 mt-5 md:mt-6 mb-2 md:mb-3">{line.slice(4)}</h3>)
      i++
      continue
    }

    // ── 리스트 ──
    if (line.startsWith('✅ ') || line.startsWith('- ')) {
      const text = line.startsWith('- ') ? line.slice(2) : line
      const prefix = line.startsWith('- ') ? '• ' : ''

      elements.push(
        <p key={key++} className="text-sm md:text-base text-gray-700 ml-2 my-1.5">
          {prefix}
          {renderInlineMarkdown(text)}
        </p>
      )
      i++
      continue
    }

    // ── 일반 텍스트 (인라인 마크다운 포함) ──
    if (line.trim()) {
      elements.push(
        <p key={key++} className="text-sm md:text-base text-gray-700 leading-relaxed my-1.5">
          {renderInlineMarkdown(line)}
        </p>
      )
      i++
      continue
    }

    // ── 빈 줄 ──
    elements.push(<div key={key++} className="h-2 md:h-3" />)
    i++
  }

  return elements
}
