/**
 * SimpleEditor 의 onKeyDown 핸들러를 만드는 헬퍼.
 * VSCode 비슷한 편의 기능 제공:
 *  - 자동 괄호 닫기:  { ( [ " '  입력 시 닫는 짝 자동 삽입
 *  - 스마트 들여쓰기: Enter 누르면 이전 줄 indent 유지 + { 또는 : 뒤면 +4 spaces
 *  - {|}  →  Enter 누르면 {\n    |\n} 형태로 커서 가운데 줄에
 *  - 닫는 괄호 중복 방지: ) ] } 가 이미 다음 자리에 있으면 그냥 건너뜀
 *  - 빈 짝 Backspace: {|} 사이에서 Backspace 누르면 둘 다 삭제
 *  - Ctrl/Cmd+Enter: 옵션으로 실행 콜백 호출
 *
 * @param setCode  코드 setter
 * @param opts
 *   - onCtrlEnter: Ctrl/Cmd+Enter 시 실행할 콜백 (없으면 무시)
 */
export interface SmartKeyHandlerOpts {
  onCtrlEnter?: () => void
}

export function createSmartKeyHandler(
  setCode: (next: string) => void,
  opts: SmartKeyHandlerOpts = {},
) {
  return (e: React.KeyboardEvent<HTMLTextAreaElement & HTMLDivElement>) => {
    const textarea = e.currentTarget
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const val = textarea.value

    // Ctrl/Cmd + Enter → 옵션 콜백 (코드 실행 등)
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      opts.onCtrlEnter?.()
      return
    }

    // Enter — 스마트 들여쓰기
    if (e.key === "Enter") {
      e.preventDefault()
      const lineStart = val.lastIndexOf("\n", start - 1) + 1
      const currentLine = val.slice(lineStart, start)
      const indent = currentLine.match(/^(\s*)/)?.[1] ?? ""
      const trimmed = currentLine.trimEnd()
      const justAfterBrace = trimmed.endsWith("{")
      const justAfterColon = trimmed.endsWith(":")
      const justBeforeClose = val[start] === "}"
      const extraIndent = justAfterBrace || justAfterColon ? "    " : ""

      // { | }  →  {\n    |\n}  (커서가 가운데 줄에)
      if (justAfterBrace && justBeforeClose) {
        const newVal =
          val.slice(0, start) + "\n" + indent + extraIndent + "\n" + indent + val.slice(start)
        const newCursor = start + 1 + indent.length + extraIndent.length
        setCode(newVal)
        requestAnimationFrame(() => {
          textarea.selectionStart = newCursor
          textarea.selectionEnd = newCursor
        })
        return
      }

      const newVal = val.slice(0, start) + "\n" + indent + extraIndent + val.slice(start)
      const newCursor = start + 1 + indent.length + extraIndent.length
      setCode(newVal)
      requestAnimationFrame(() => {
        textarea.selectionStart = newCursor
        textarea.selectionEnd = newCursor
      })
      return
    }

    // 자동 괄호 닫기 — { ( [ " ' 입력
    const pairs: Record<string, string> = {
      "{": "}",
      "(": ")",
      "[": "]",
      '"': '"',
      "'": "'",
    }
    if (pairs[e.key]) {
      // 따옴표 다음에 같은 따옴표 있으면 그냥 건너뜀
      if ((e.key === '"' || e.key === "'") && val[start] === e.key) {
        e.preventDefault()
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1
        })
        return
      }
      // 다음 글자가 식별자 (영문/숫자/_) 면 자동 닫기 비활성화
      // (코드 중간 삽입 시 의도치 않게 닫는 짝 추가되는 거 방지)
      const next = val[start]
      if (next && /[A-Za-z0-9_]/.test(next)) {
        return // 기본 동작 — 한 글자만 입력
      }
      e.preventDefault()
      const open = e.key
      const close = pairs[open]
      const selected = val.slice(start, end)
      const newVal = val.slice(0, start) + open + selected + close + val.slice(end)
      setCode(newVal)
      requestAnimationFrame(() => {
        if (selected) {
          textarea.selectionStart = start + 1
          textarea.selectionEnd = end + 1
        } else {
          textarea.selectionStart = textarea.selectionEnd = start + 1
        }
      })
      return
    }

    // 닫는 괄호 입력 — 다음 자리에 같은 닫는 괄호 있으면 그냥 건너뜀
    if ([")", "]", "}"].includes(e.key) && val[start] === e.key) {
      e.preventDefault()
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1
      })
      return
    }

    // Backspace — 빈 짝 (e.g. {|}) 사이면 둘 다 지움
    if (e.key === "Backspace" && start === end && start > 0) {
      const before = val[start - 1]
      const after = val[start]
      const matches: Record<string, string> = {
        "{": "}",
        "(": ")",
        "[": "]",
        '"': '"',
        "'": "'",
      }
      if (matches[before] === after) {
        e.preventDefault()
        const newVal = val.slice(0, start - 1) + val.slice(start + 1)
        setCode(newVal)
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start - 1
        })
        return
      }
    }
  }
}
