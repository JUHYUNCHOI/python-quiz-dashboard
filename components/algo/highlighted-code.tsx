"use client"

/**
 * HighlightedCode — Python / C++ 간단한 신택스 하이라이팅.
 * 외부 라이브러리 없이 정규식 + className 토큰 분리.
 *
 * 컬러:
 *   - 키워드 (def, for, if, return 등) → 보라
 *   - 숫자 → 노랑
 *   - 문자열 → 초록
 *   - 주석 → 회색 + italic
 *   - 기본 텍스트 → 밝은 회색
 */

import React from "react"

const PY_KEYWORDS = new Set([
  "def","return","for","if","else","elif","while","import","from","in","range","not","and","or",
  "True","False","None","print","int","float","str","bool","len","input","lambda","class",
  "break","continue","sys","map","list","tuple","dict","set","sorted","sum","max","min","abs",
  "reverse","key","pass","with","as","try","except","finally","raise","yield","global","nonlocal",
])

const CPP_KEYWORDS = new Set([
  "int","long","double","float","void","char","bool","auto","short","unsigned","signed","size_t",
  "return","if","else","for","while","do","break","continue","switch","case","default","goto",
  "struct","class","public","private","protected","namespace","using","const","static","extern",
  "true","false","nullptr","NULL","this","new","delete","sizeof","typeof","typedef","template",
  "include","define","ifndef","endif","ifdef",
  "vector","string","pair","map","set","unordered_map","unordered_set","stack","queue","priority_queue",
  "sort","reverse","lower_bound","upper_bound","find","count","accumulate","swap",
  "cin","cout","endl","ios","main",
  "greater","less","min","max",
])

function tokenizeLine(line: string, lang: "py" | "cpp", lineKey: string): React.ReactNode[] {
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS
  const commentMarker = lang === "py" ? "#" : "//"
  // 주석 분리
  // 단, 문자열 안의 # 이나 // 는 주석 아님. 간단히 처리 — 첫 따옴표 밖에서 marker 찾음.
  let commentIdx = -1
  let inStr: string | null = null
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inStr) {
      if (c === inStr && line[i - 1] !== "\\") inStr = null
    } else {
      if (c === '"' || c === "'") inStr = c
      else if (line.slice(i, i + commentMarker.length) === commentMarker) { commentIdx = i; break }
    }
  }
  const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line
  const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : ""

  const out: React.ReactNode[] = []
  // 토큰: 단어, 숫자, 문자열, 공백, 기타 기호
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+(?:\.\d+)?|\s+|[^\w\s"'])/g
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(codePart)) !== null) {
    const tok = m[0]
    const key = `${lineKey}-${i++}`
    if (/^["']/.test(tok)) {
      out.push(<span key={key} className="text-emerald-300">{tok}</span>)
    } else if (keywords.has(tok)) {
      out.push(<span key={key} className="text-purple-400">{tok}</span>)
    } else if (/^\d+(?:\.\d+)?$/.test(tok)) {
      out.push(<span key={key} className="text-amber-300">{tok}</span>)
    } else if (/^\s+$/.test(tok)) {
      out.push(<span key={key}>{tok}</span>)
    } else {
      out.push(<span key={key} className="text-gray-200">{tok}</span>)
    }
  }
  if (commentPart) {
    out.push(<span key={`${lineKey}-c`} className="text-gray-500 italic">{commentPart}</span>)
  }
  return out
}

export function HighlightedCode({ code, lang }: { code: string; lang: "py" | "cpp" }) {
  const lines = code.split("\n")
  return (
    <pre className="px-4 py-3 text-[13px] font-mono overflow-x-auto leading-relaxed text-gray-100">
      <code>
        {lines.map((line, i) => (
          <div key={i}>{tokenizeLine(line, lang, `l${i}`)}</div>
        ))}
      </code>
    </pre>
  )
}
