"use client"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

// Python syntax highlighting
function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split('\n')
  
  return lines.map((line, lineIndex) => {
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
    
    // 토큰화
    const patterns: { regex: RegExp; className: string }[] = [
      // 문자열 (작은따옴표, 큰따옴표)
      { regex: /'[^']*'|"[^"]*"/g, className: 'text-emerald-400' },
      // 숫자
      { regex: /\b\d+\.?\d*\b/g, className: 'text-orange-400' },
      // 키워드
      { regex: /\b(print|type|if|else|elif|for|while|def|class|return|import|from|as|try|except|finally|with|True|False|None|and|or|not|in|is)\b/g, className: 'text-pink-400 font-semibold' },
      // 내장 함수
      { regex: /\b(len|range|str|int|float|bool|list|dict|set|tuple|input|open|abs|max|min|sum|round)\b/g, className: 'text-cyan-400' },
      // 연산자
      { regex: /[+\-*/%=<>!&|^~]+/g, className: 'text-sky-300' },
      // 괄호
      { regex: /[()[\]{}]/g, className: 'text-yellow-200' },
      // 콤마, 콜론
      { regex: /[,:]/g, className: 'text-gray-400' },
    ]
    
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
      // 문자열 영역인지 확인
      const inString = stringMatches.find(s => i >= s.start && i < s.end)
      if (inString) {
        tokens.push(
          <span key={keyIndex++} className="text-emerald-400">
            {inString.text}
          </span>
        )
        i = inString.end
        continue
      }
      
      // 키워드 매칭
      let matched = false
      for (const pattern of patterns.slice(1)) { // 문자열은 이미 처리했으므로 제외
        const testStr = remaining.slice(i)
        const keywordMatch = testStr.match(new RegExp(`^${pattern.regex.source}`))
        if (keywordMatch) {
          tokens.push(
            <span key={keyIndex++} className={pattern.className}>
              {keywordMatch[0]}
            </span>
          )
          i += keywordMatch[0].length
          matched = true
          break
        }
      }
      
      if (!matched) {
        // 일반 텍스트 (공백 포함)
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
            <span key={keyIndex++} className="text-gray-100">
              {text}
            </span>
          )
        }
      }
    }
    
    // 주석 추가
    if (comment) {
      tokens.push(
        <span key={keyIndex++} className="text-gray-500 italic">
          {comment}
        </span>
      )
    }
    
    return (
      <div key={lineIndex} className="leading-relaxed">
        {tokens.length > 0 ? tokens : <span>&nbsp;</span>}
      </div>
    )
  })
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
