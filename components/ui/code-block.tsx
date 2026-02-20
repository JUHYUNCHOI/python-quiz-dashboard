"use client"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

// 토큰화 패턴
const patterns: { regex: RegExp; className: string }[] = [
  { regex: /'[^']*'|"[^"]*"/g, className: 'text-emerald-400' },
  { regex: /\b\d+\.?\d*\b/g, className: 'text-orange-400' },
  { regex: /\b(print|type|if|else|elif|for|while|def|class|return|import|from|as|try|except|finally|with|True|False|None|and|or|not|in|is)\b/g, className: 'text-pink-400 font-semibold' },
  { regex: /\b(len|range|str|int|float|bool|list|dict|set|tuple|input|open|abs|max|min|sum|round)\b/g, className: 'text-cyan-400' },
  { regex: /[+\-*/%=<>!&|^~]+/g, className: 'text-sky-300' },
  { regex: /[()[\]{}]/g, className: 'text-yellow-200' },
  { regex: /[,:]/g, className: 'text-gray-400' },
]

// 한 줄을 토큰화 (div 없이 토큰 배열만 반환)
function tokenizeLine(line: string, keyPrefix: string = ''): React.ReactNode[] {
  const tokens: React.ReactNode[] = []
  let remaining = line
  let keyIndex = 0

  // 주석 처리
  const commentIndex = remaining.indexOf('#')
  let comment = ''
  if (commentIndex !== -1) {
    comment = remaining.slice(commentIndex)
    remaining = remaining.slice(0, commentIndex)
  }

  // 먼저 문자열을 찾아서 보호
  const stringMatches: { start: number; end: number; text: string }[] = []
  const stringRegex = /'[^']*'|"[^"]*"/g
  let match
  while ((match = stringRegex.exec(remaining)) !== null) {
    stringMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0]
    })
  }

  // 문자 단위로 처리
  let i = 0
  while (i < remaining.length) {
    const inString = stringMatches.find(s => i >= s.start && i < s.end)
    if (inString) {
      tokens.push(
        <span key={`${keyPrefix}${keyIndex++}`} className="text-emerald-400">
          {inString.text}
        </span>
      )
      i = inString.end
      continue
    }

    let matched = false
    for (const pattern of patterns.slice(1)) {
      const testStr = remaining.slice(i)
      const keywordMatch = testStr.match(new RegExp(`^${pattern.regex.source}`))
      if (keywordMatch) {
        tokens.push(
          <span key={`${keyPrefix}${keyIndex++}`} className={pattern.className}>
            {keywordMatch[0]}
          </span>
        )
        i += keywordMatch[0].length
        matched = true
        break
      }
    }

    if (!matched) {
      let text = ''
      while (i < remaining.length) {
        const inStr = stringMatches.find(s => i >= s.start && i < s.end)
        if (inStr) break

        let shouldBreak = false
        for (const pattern of patterns.slice(1)) {
          const testStr = remaining.slice(i)
          if (testStr.match(new RegExp(`^${pattern.regex.source}`))) {
            shouldBreak = true
            break
          }
        }
        if (shouldBreak) break

        text += remaining[i]
        i++
      }
      if (text) {
        tokens.push(
          <span key={`${keyPrefix}${keyIndex++}`} className="text-gray-100">
            {text}
          </span>
        )
      }
    }
  }

  if (comment) {
    tokens.push(
      <span key={`${keyPrefix}${keyIndex++}`} className="text-green-500 italic">
        {comment}
      </span>
    )
  }

  return tokens
}

// Python syntax highlighting (줄별 div 포함)
export function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split('\n')

  return lines.map((line, lineIndex) => {
    const tokens = tokenizeLine(line, `L${lineIndex}-`)
    return (
      <div key={lineIndex} className="leading-relaxed">
        {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
      </div>
    )
  })
}

// 인라인 하이라이팅 (div 없이 span만 — BlankCodeRunner용)
export function highlightPythonInline(text: string): React.ReactNode[] {
  return tokenizeLine(text)
}

// 간단한 하이라이팅 (Python 외)
function highlightSimple(code: string): React.ReactNode {
  return <span className="text-yellow-300">{code}</span>
}

export function CodeBlock({ code, language = 'python', className }: CodeBlockProps) {
  const highlighted = language === 'python' ? highlightPython(code) : highlightSimple(code)

  return (
    <div className={cn(
      "bg-gray-900 rounded-xl p-4 md:p-5 overflow-x-auto shadow-xl shadow-black/30",
      className
    )}>
      <pre className="font-mono text-sm md:text-base">
        {highlighted}
      </pre>
    </div>
  )
}
