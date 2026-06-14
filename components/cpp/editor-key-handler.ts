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
 * ⚠️ 커서 보존 (2026-06): 예전엔 setCode(newVal) 뒤 requestAnimationFrame 으로
 *    selection 을 복원했는데, controlled <textarea value={code}> 에선 rAF 가
 *    React 리렌더와 경합해서 커서가 끝으로 튕기거나 글자가 엉뚱한 곳에 들어갔다.
 *    → 이제 textarea.setRangeText() 로 DOM 을 먼저 고치고 커서를 즉시 잡은 뒤
 *      setCode(textarea.value) 로 state 를 맞춘다. 이러면 React 가 "값이 DOM 과
 *      이미 같음"을 보고 value 를 다시 안 써서 커서가 보존된다 (표준 패턴).
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
  // SimpleEditor 는 HTMLTextAreaElement & HTMLDivElement 로 타입을 좁히고,
  // 일반 <textarea> 는 HTMLTextAreaElement 로 좁혀. 런타임에 실제로 쓰는 건
  // textarea 의 selection/value API 뿐이라 둘 다 안전하게 동작해.
  return (e: React.KeyboardEvent<any>) => {
    // IME composition 중에는 모든 키 가로채기 skip — 한글 조합 완료 Enter 가
    // run/submit/auto-indent 같은 의도치 않은 동작 일으키지 않게.
    // (nativeEvent.isComposing: 표준, keyCode 229: 구형 Safari/IME fallback)
    if ((e.nativeEvent as KeyboardEvent)?.isComposing || e.keyCode === 229) return

    const textarea = e.currentTarget as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const val = textarea.value

    // 텍스트 [from,to] 를 text 로 치환하고, 커서를 caret 위치에 놓고,
    // React state 를 DOM 과 동기화. setRangeText 가 DOM·undo 를 네이티브로
    // 처리하므로 커서가 절대 안 튕긴다.
    const apply = (text: string, from: number, to: number, caret: number) => {
      // setRangeText 미지원(아주 구형) 시 fallback
      if (typeof textarea.setRangeText === "function") {
        textarea.setRangeText(text, from, to, "preserve")
      } else {
        textarea.value = val.slice(0, from) + text + val.slice(to)
      }
      textarea.selectionStart = textarea.selectionEnd = caret
      setCode(textarea.value)
    }

    // 값은 그대로 두고 커서만 한 칸 이동 (괄호/따옴표 건너뛰기)
    const moveCaret = (caret: number) => {
      textarea.selectionStart = textarea.selectionEnd = caret
    }

    // Ctrl/Cmd + Enter 또는 Shift + Enter → 옵션 콜백 (코드 실행 등)
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey || e.shiftKey)) {
      e.preventDefault()
      opts.onCtrlEnter?.()
      return
    }

    // Tab — 4 spaces 들여쓰기 (Python 처럼 indent-sensitive 언어에 필수)
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault()
      apply("    ", start, end, start + 4)
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
        const insert = "\n" + indent + extraIndent + "\n" + indent
        const caret = start + 1 + indent.length + extraIndent.length
        apply(insert, start, end, caret)
        return
      }

      const insert = "\n" + indent + extraIndent
      apply(insert, start, end, start + insert.length)
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
        moveCaret(start + 1)
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
      if (typeof textarea.setRangeText === "function") {
        textarea.setRangeText(open + selected + close, start, end, "preserve")
      } else {
        textarea.value = val.slice(0, start) + open + selected + close + val.slice(end)
      }
      if (selected) {
        textarea.selectionStart = start + 1
        textarea.selectionEnd = end + 1
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + 1
      }
      setCode(textarea.value)
      return
    }

    // 닫는 괄호 입력 — 다음 자리에 같은 닫는 괄호 있으면 그냥 건너뜀
    if ([")", "]", "}"].includes(e.key) && val[start] === e.key) {
      e.preventDefault()
      moveCaret(start + 1)
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
        apply("", start - 1, start + 1, start - 1)
        return
      }
    }
  }
}
