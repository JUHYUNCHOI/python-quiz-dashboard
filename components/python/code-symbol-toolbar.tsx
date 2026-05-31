"use client"

/**
 * CodeSymbolToolbar — 코드 에디터 textarea 아래/위에 표시하는 심볼 단축 툴바.
 *
 * 모바일 학습자가 가장 답답해하는 부분: `( ) [ ] : ' " _` 같은 특수문자.
 * 일반 키보드에서는 3-4 번 탭해야 나오는데, 이 툴바로 한 번에 삽입.
 *
 * 사용:
 *   <CodeSymbolToolbar textareaRef={ref} setCode={setCode} variant="python" />
 *
 * - textareaRef: 코드를 입력하는 textarea 의 ref
 * - setCode: textarea 의 value 를 업데이트하는 setter (React state 동기화)
 * - variant: 'python' 또는 'cpp' (cpp 면 ; << >> 추가)
 *
 * 보임 조건: 터치가 *주* 입력 수단인 경우만 (= `(pointer: coarse) and (hover: none)` + width ≤ 900).
 *   Windows 터치스크린 노트북·태블릿 모드 등 키보드 위주 환경에선 안 뜸.
 */

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CodeSymbolToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  setCode: (next: string) => void
  variant?: "python" | "cpp"
  className?: string
}

const PY_SYMBOLS = [
  { label: "⇥", insert: "    ", title: "Tab (4 spaces)" },
  { label: "(", insert: "()", cursor: 1 },
  { label: "[", insert: "[]", cursor: 1 },
  { label: "{", insert: "{}", cursor: 1 },
  { label: ":", insert: ":" },
  { label: "=", insert: " = " },
  { label: "_", insert: "_" },
  { label: '"', insert: '""', cursor: 1 },
  { label: "'", insert: "''", cursor: 1 },
  { label: "+", insert: " + " },
  { label: "-", insert: " - " },
  { label: "*", insert: " * " },
  { label: "/", insert: " / " },
  { label: "<", insert: " < " },
  { label: ">", insert: " > " },
  { label: "#", insert: "# " },
]

const CPP_SYMBOLS = [
  { label: "⇥", insert: "    ", title: "Tab (4 spaces)" },
  { label: ";", insert: ";" },
  { label: "(", insert: "()", cursor: 1 },
  { label: "{", insert: "{}", cursor: 1 },
  { label: "[", insert: "[]", cursor: 1 },
  { label: "<<", insert: " << " },
  { label: ">>", insert: " >> " },
  { label: "=", insert: " = " },
  { label: "_", insert: "_" },
  { label: '"', insert: '""', cursor: 1 },
  { label: "'", insert: "''", cursor: 1 },
  { label: "+", insert: " + " },
  { label: "-", insert: " - " },
  { label: "*", insert: " * " },
  { label: "/", insert: " / " },
  { label: "//", insert: "// " },
]

export function CodeSymbolToolbar({ textareaRef, setCode, variant = "python", className }: CodeSymbolToolbarProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // 터치가 *주* 입력 수단인 경우에만 (= 진짜 모바일/태블릿).
    // Windows 터치스크린 노트북은 touch 가능하지만 키보드 위주라 제외.
    //   - (pointer: coarse) → 손가락 / 스타일러스 (정밀하지 않은 포인터)
    //   - (hover: none) → 호버 불가 (마우스 없음)
    // 화면 폭도 보조 조건: ≤ 900 으로 데스크탑 큰 화면에선 안 뜨게.
    const mq = window.matchMedia("(pointer: coarse) and (hover: none)")
    const smallScreen = window.innerWidth <= 900
    setShow(mq.matches && smallScreen)
  }, [])

  if (!show) return null

  const symbols = variant === "cpp" ? CPP_SYMBOLS : PY_SYMBOLS

  const handleInsert = (sym: typeof symbols[number]) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const val = ta.value
    const insertStr = sym.insert
    const newVal = val.slice(0, start) + insertStr + val.slice(end)
    // cursor 위치: insert 길이 끝, 또는 sym.cursor (괄호 짝 안쪽)
    const cursorOffset = sym.cursor !== undefined ? sym.cursor : insertStr.length
    setCode(newVal)
    requestAnimationFrame(() => {
      ta.focus()
      const pos = start + cursorOffset
      ta.selectionStart = ta.selectionEnd = pos
    })
  }

  return (
    <div
      className={cn(
        "flex gap-1 overflow-x-auto px-2 py-1.5 bg-gray-800 border-t border-gray-700 select-none scrollbar-thin",
        className
      )}
      // 키보드 띄운 상태에서 토글되면 textarea focus 잃지 않도록 onMouseDown 으로 처리
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => {
        // 부모 onMouseDown 이 안 먹는 일부 모바일 브라우저 대응
        const target = e.target as HTMLElement
        if (target.tagName !== "BUTTON") e.preventDefault()
      }}
    >
      {symbols.map((sym, i) => (
        <button
          key={`${sym.label}-${i}`}
          type="button"
          title={sym.title || sym.label}
          onMouseDown={(e) => { e.preventDefault(); handleInsert(sym) }}
          onTouchStart={(e) => { e.preventDefault(); handleInsert(sym) }}
          className="flex-shrink-0 min-w-[40px] h-9 px-2 rounded bg-gray-700 text-white font-mono text-sm font-bold active:bg-gray-600 hover:bg-gray-650 transition-colors"
        >
          {sym.label}
        </button>
      ))}
    </div>
  )
}
