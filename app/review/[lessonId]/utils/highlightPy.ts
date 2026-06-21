// 복습 Python 코드 에디터용 신택스 하이라이터 (문자열 HTML 반환 → react-simple-code-editor 용).
// C++ 의 highlightCppCode 와 짝. (학생: '신택스 하이라이트도 안돼' — 2026-06-21 라이브)
// teacher/live-editor.tsx 의 문자열 하이라이터와 같은 규칙, 자체 포함.

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const PY_KEYWORDS = /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|int|str|float|bool|list|dict|set|tuple|len|range|print|input|type|isinstance|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round)\b/g
const PY_STRING = /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
const PY_COMMENT = /#.*/g
const PY_DECO = /@\w+/g
const PY_NUMBER = /\b\d+(?:\.\d+)?[jJ]?\b/g

export function highlightPythonCode(code: string): string {
  type M = { start: number; end: number; text: string; cls: string }
  const matches: M[] = []
  const addM = (re: RegExp, cls: string) => {
    re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls })
    }
  }
  addM(new RegExp(PY_COMMENT.source, "g"), "comment")
  addM(new RegExp(PY_STRING.source, "g"), "string")
  addM(new RegExp(PY_DECO.source, "g"), "deco")
  addM(new RegExp(PY_KEYWORDS.source, "g"), "kw")
  addM(new RegExp(PY_NUMBER.source, "g"), "num")
  matches.sort((a, b) => a.start - b.start)

  // 겹치는 매치 제거 (먼저 시작한 것 우선)
  const filtered: M[] = []
  let cur = 0
  for (const m of matches) {
    if (m.start >= cur) { filtered.push(m); cur = m.end }
  }

  const colors: Record<string, string> = {
    kw: "#ff7b72", comment: "#8b949e", string: "#a5d6ff", deco: "#ffa657", num: "#ffa657",
  }
  cur = 0
  let html = ""
  for (const m of filtered) {
    if (m.start > cur) html += escHtml(code.slice(cur, m.start))
    const c = colors[m.cls] || "#e6edf3"
    const style = m.cls === "comment" ? `color:${c};font-style:italic` : `color:${c}`
    html += `<span style="${style}">${escHtml(m.text)}</span>`
    cur = m.end
  }
  if (cur < code.length) html += escHtml(code.slice(cur))
  return html
}
