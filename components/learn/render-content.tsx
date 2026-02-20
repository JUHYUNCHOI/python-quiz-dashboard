"use client"

import React from "react"
import { CodeBlock } from "@/components/ui/code-block"

export function renderContent(content: string) {
  const elements: React.ReactNode[] = []
  const lines = content.split('\n')
  let i = 0
  let key = 0
  
  while (i < lines.length) {
    const line = lines[i]
    
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
        elements.push(
          <div key={key++} className="my-4">
            <CodeBlock code={codeLines.join('\n')} language={lang === 'python' ? 'python' : 'python'} />
          </div>
        )
      }
      continue
    }
    
    // 이미지: ![alt](src)
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

    // 대화 말풍선: @선생님: / @학생: / @핵심:
    const chatMatch = line.match(/^@(선생님|학생|핵심):\s*(.+)$/)
    if (chatMatch) {
      const role = chatMatch[1]
      const text = chatMatch[2]

      // 텍스트 내 인라인 코드와 볼드 처리
      const renderInline = (t: string) => {
        const parts = t.split(/(`[^`]+`)/g)
        return parts.map((part, j) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={j} className="bg-white/30 px-1 py-0.5 rounded font-mono text-sm font-bold">
                {part.slice(1, -1)}
              </code>
            )
          }
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
          return boldParts.map((bp, k) => {
            if (bp.startsWith('**') && bp.endsWith('**')) {
              return <strong key={`${j}-${k}`} className="font-bold">{bp.slice(2, -2)}</strong>
            }
            return bp
          })
        })
      }

      if (role === '선생님') {
        elements.push(
          <div key={key++} className="flex items-start gap-2 my-2">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg md:text-xl">
              🧑‍🏫
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl rounded-tl-sm px-3 py-2 md:px-4 md:py-2.5 max-w-[85%]">
              <p className="text-sm md:text-base text-blue-900 leading-relaxed">{renderInline(text)}</p>
            </div>
          </div>
        )
      } else if (role === '학생') {
        elements.push(
          <div key={key++} className="flex items-start gap-2 my-2 flex-row-reverse">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500 flex items-center justify-center text-lg md:text-xl">
              🧒
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl rounded-tr-sm px-3 py-2 md:px-4 md:py-2.5 max-w-[85%]">
              <p className="text-sm md:text-base text-green-900 leading-relaxed">{renderInline(text)}</p>
            </div>
          </div>
        )
      } else if (role === '핵심') {
        elements.push(
          <div key={key++} className="my-3 bg-amber-50 border-2 border-amber-300 rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-center">
            <p className="text-sm md:text-base text-amber-900 font-bold leading-relaxed">💡 {renderInline(text)}</p>
          </div>
        )
      }

      i++
      continue
    }

    // 💭 생각해보기 (thought bubble)
    if (line.startsWith('💭 ')) {
      const text = line.slice(2).trim()
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      elements.push(
        <div key={key++} className="my-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-4 py-3 md:px-5 md:py-4">
          <p className="text-sm md:text-base text-indigo-800 leading-relaxed">
            <span className="text-lg md:text-xl mr-1">🤔</span>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-bold text-indigo-700">{part.slice(2, -2)}</strong>
              }
              return part
            })}
          </p>
        </div>
      )
      i++
      continue
    }

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
    
    if (line.startsWith('✅ ') || line.startsWith('- ')) {
      const text = line.startsWith('- ') ? line.slice(2) : line
      const prefix = line.startsWith('- ') ? '• ' : ''
      
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      elements.push(
        <p key={key++} className="text-sm md:text-base text-gray-700 ml-2 my-1.5">
          {prefix}
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-bold text-indigo-600">{part.slice(2, -2)}</strong>
            }
            return part
          })}
        </p>
      )
      i++
      continue
    }
    
    if (line.trim()) {
      const parts = line.split(/(`[^`]+`)/g)
      elements.push(
        <p key={key++} className="text-sm md:text-base text-gray-700 leading-relaxed my-1.5">
          {parts.map((part, j) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={j} className="bg-indigo-100 px-1.5 md:px-2 py-0.5 rounded-md font-mono text-indigo-700 text-sm md:text-base font-semibold">
                  {part.slice(1, -1)}
                </code>
              )
            }
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
            return boldParts.map((bp, k) => {
              if (bp.startsWith('**') && bp.endsWith('**')) {
                return <strong key={`${j}-${k}`} className="font-bold text-indigo-600 text-base md:text-lg">{bp.slice(2, -2)}</strong>
              }
              return bp
            })
          })}
        </p>
      )
      i++
      continue
    }
    
    elements.push(<div key={key++} className="h-2 md:h-3" />)
    i++
  }
  
  return elements
}
