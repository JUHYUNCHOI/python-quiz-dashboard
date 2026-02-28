"use client"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

// 토큰화 패턴
const patterns: { regex: RegExp; className: string }[] = [
  { regex: /'[^']*'|"[^"]*"/g, className: 'text-emerald-700' },
  { regex: /\b\d+\.?\d*\b/g, className: 'text-orange-600' },
  { regex: /\b(print|type|if|else|elif|for|while|def|class|return|import|from|as|try|except|finally|with|True|False|None|and|or|not|in|is)\b/g, className: 'text-pink-600 font-semibold' },
  { regex: /\b(len|range|str|int|float|bool|list|dict|set|tuple|input|open|abs|max|min|sum|round)\b/g, className: 'text-teal-600' },
  { regex: /[+\-*/%=<>!&|^~]+/g, className: 'text-slate-500' },
  { regex: /[()[\]{}]/g, className: 'text-slate-600' },
  { regex: /[,:]/g, className: 'text-slate-500' },
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
        <span key={`${keyPrefix}${keyIndex++}`} className="text-emerald-700">
          {inString.text}
        </span>
      )
      i = inString.end
      continue
    }

    let matched = false
    for (const pattern of patterns.slice(1)) {
      const testStr = remaining.slice(i)
      const keywordMatch = testStr.match(new RegExp(`^(?:${pattern.regex.source})`))
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
          if (testStr.match(new RegExp(`^(?:${pattern.regex.source})`))) {
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
          <span key={`${keyPrefix}${keyIndex++}`} className="text-slate-800">
            {text}
          </span>
        )
      }
    }
  }

  if (comment) {
    tokens.push(
      <span key={`${keyPrefix}${keyIndex++}`} className="text-green-600 italic">
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

// ============================================
// C++ syntax highlighting
// ============================================

const cppPatterns: { regex: RegExp; className: string }[] = [
  { regex: /'[^']*'|"[^"]*"/g, className: 'text-emerald-700' },
  { regex: /\b\d+\.?\d*[fFL]?\b/g, className: 'text-orange-600' },
  { regex: /\b(if|else|for|while|do|switch|case|break|continue|return|class|struct|public|private|protected|virtual|override|const|static|void|int|double|float|char|bool|long|short|unsigned|signed|auto|string|true|false|nullptr|new|delete|namespace|using|template|typename|typedef|enum|sizeof|this|throw|try|catch|include|iostream|std)\b/g, className: 'text-pink-600 font-semibold' },
  { regex: /\b(cout|cin|endl|cerr|vector|map|set|pair|array|getline|push_back|size|begin|end|sort|find|swap|to_string|stoi|stod|printf|scanf|main)\b/g, className: 'text-teal-600' },
  { regex: /<<|>>|[+\-*/%=<>!&|^~]+/g, className: 'text-slate-500' },
  { regex: /[()[\]{}]/g, className: 'text-slate-600' },
  { regex: /[,:;]/g, className: 'text-slate-500' },
  { regex: /#\w+/g, className: 'text-purple-600 font-semibold' },
]

function tokenizeCppLine(line: string, keyPrefix: string = ''): React.ReactNode[] {
  const tokens: React.ReactNode[] = []
  let remaining = line
  let keyIndex = 0

  // C++ 주석 처리 (//)
  const commentIndex = remaining.indexOf('//')
  let comment = ''
  if (commentIndex !== -1) {
    // 문자열 안의 // 는 무시
    const beforeComment = remaining.slice(0, commentIndex)
    const singleQuotes = (beforeComment.match(/'/g) || []).length
    const doubleQuotes = (beforeComment.match(/"/g) || []).length
    if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
      comment = remaining.slice(commentIndex)
      remaining = remaining.slice(0, commentIndex)
    }
  }

  // 문자열 보호
  const stringMatches: { start: number; end: number; text: string }[] = []
  const stringRegex = /'[^']*'|"[^"]*"/g
  let match
  while ((match = stringRegex.exec(remaining)) !== null) {
    stringMatches.push({ start: match.index, end: match.index + match[0].length, text: match[0] })
  }

  let i = 0
  while (i < remaining.length) {
    const inString = stringMatches.find(s => i >= s.start && i < s.end)
    if (inString) {
      tokens.push(<span key={`${keyPrefix}${keyIndex++}`} className="text-emerald-700">{inString.text}</span>)
      i = inString.end
      continue
    }

    let matched = false
    for (const pattern of cppPatterns.slice(1)) {
      const testStr = remaining.slice(i)
      const keywordMatch = testStr.match(new RegExp(`^(?:${pattern.regex.source})`))
      if (keywordMatch) {
        tokens.push(<span key={`${keyPrefix}${keyIndex++}`} className={pattern.className}>{keywordMatch[0]}</span>)
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
        for (const pattern of cppPatterns.slice(1)) {
          const testStr = remaining.slice(i)
          if (testStr.match(new RegExp(`^(?:${pattern.regex.source})`))) { shouldBreak = true; break }
        }
        if (shouldBreak) break
        text += remaining[i]
        i++
      }
      if (text) {
        tokens.push(<span key={`${keyPrefix}${keyIndex++}`} className="text-slate-800">{text}</span>)
      }
    }
  }

  if (comment) {
    tokens.push(<span key={`${keyPrefix}${keyIndex++}`} className="text-green-600 italic">{comment}</span>)
  }

  return tokens
}

export function highlightCpp(code: string): React.ReactNode[] {
  const lines = code.split('\n')
  return lines.map((line, lineIndex) => {
    const tokens = tokenizeCppLine(line, `L${lineIndex}-`)
    return (
      <div key={lineIndex} className="leading-relaxed">
        {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
      </div>
    )
  })
}

// C++ 인라인 하이라이팅 (div 없이 span만 — FillBlankStep용)
export function highlightCppInline(text: string): React.ReactNode[] {
  return tokenizeCppLine(text)
}

// 간단한 하이라이팅 (Python/C++ 외)
function highlightSimple(code: string): React.ReactNode {
  return <span className="text-slate-800">{code}</span>
}

export function CodeBlock({ code, language = 'python', className }: CodeBlockProps) {
  const highlighted = language === 'python'
    ? highlightPython(code)
    : (language === 'cpp' || language === 'c++' || language === 'c')
      ? highlightCpp(code)
      : highlightSimple(code)

  return (
    <div className={cn(
      "bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 overflow-x-auto",
      className
    )}>
      <pre className="font-mono text-sm md:text-base">
        {highlighted}
      </pre>
    </div>
  )
}
