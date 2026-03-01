"use client"

import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { useLanguage } from "@/contexts/language-context"

// ============================================
// 인라인 마크다운 헬퍼: `code` + **bold** 처리
// ============================================
function renderInlineMarkdown(text: string, keyPrefix: string = ""): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, j) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${keyPrefix}${j}`} className="bg-indigo-100 px-1.5 py-0.5 rounded-md font-mono text-indigo-700 text-sm font-semibold">
          {part.slice(1, -1)}
        </code>
      )
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
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, j) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${keyPrefix}${j}`} className="bg-white/30 px-1 py-0.5 rounded font-mono text-sm font-bold">
          {part.slice(1, -1)}
        </code>
      )
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
    return boldParts.map((bp, k) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={`${keyPrefix}${j}-${k}`} className="font-bold">{bp.slice(2, -2)}</strong>
      }
      return bp
    })
  })
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
// 메인 렌더 함수
// ============================================
export function renderContent(content: string) {
  const elements: React.ReactNode[] = []
  const lines = content.split('\n')
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // ── 코드블록 ──
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      const lang = line.slice(3).trim() || 'python'
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
            <CodeBlock code={codeText} language={lang} />
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
        const parseRow = (row: string) =>
          row.slice(1, -1).split('|').map(cell => cell.trim())

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
                      <td key={ci} className="px-3 py-2 text-gray-700 border-t border-indigo-100">
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
      const isSvg = src.endsWith('.svg')
      elements.push(
        <div key={key++} className="my-4 flex justify-center">
          {isSvg ? (
            <object data={src} type="image/svg+xml" aria-label={alt}
              className="max-w-full rounded-xl border border-gray-200 shadow-sm"
              style={{ maxHeight: '400px', width: '100%' }} />
          ) : (
            <img src={src} alt={alt} className="max-w-full rounded-xl border border-gray-200 shadow-sm" style={{ maxHeight: '360px' }} />
          )}
        </div>
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
              <span className="font-bold text-indigo-700 text-sm">따라해보세요!</span>
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
