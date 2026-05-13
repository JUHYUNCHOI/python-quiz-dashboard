// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 0/1 (RTE - missing T (test cases) handling)
//   C++:    0/1 (WA - missing T loop, also wrong algo)
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "N, K = map(int, input().split())",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(input().strip())",
  "",
  "# DP: dp[r][c][dir][changes] = number of paths",
  "# dir: 0 = right, 1 = down, 2 = start (no direction yet)",
  "# changes: number of direction changes so far",
  "",
  "from functools import lru_cache",
  "",
  "@lru_cache(maxsize=None)",
  "def dp(r, c, direction, changes):",
  "    if r == N-1 and c == N-1:",
  "        return 1",
  "    if changes > K:",
  "        return 0",
  "    total = 0",
  "    # Move right",
  "    if c + 1 < N and grid[r][c+1] != 'H':",
  "        new_changes = changes",
  "        if direction == 1:  # was going down",
  "            new_changes += 1",
  "        if new_changes <= K:",
  "            total += dp(r, c+1, 0, new_changes)",
  "    # Move down",
  "    if r + 1 < N and grid[r+1][c] != 'H':",
  "        new_changes = changes",
  "        if direction == 0:  # was going right",
  "            new_changes += 1",
  "        if new_changes <= K:",
  "            total += dp(r+1, c, 1, new_changes)",
  "    return total",
  "",
  "if grid[0][0] == 'H':",
  "    print(0)",
  "else:",
  "    print(dp(0, 0, 2, 0))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <functional>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K; cin >> N >> K;",
  "    vector<string> grid(N);",
  "    for (auto& r : grid) cin >> r;",
  "    // 4D DP[r][c][dir][changes] — direction: 0=right,1=down",
  "    // Initialize at start (0,0). From there we can move right or down with no \"previous direction\" bias.",
  "    // For Bronze: simple recursion with memoization.",
  "    vector<vector<vector<vector<long long>>>> dp(N, vector<vector<vector<long long>>>(N, vector<vector<long long>>(2, vector<long long>(K + 1, -1))));",
  "    function<long long(int,int,int,int)> rec = [&](int r, int c, int dir, int ch) -> long long {",
  "        if (r >= N || c >= N || grid[r][c] == 'H') return 0;",
  "        if (r == N - 1 && c == N - 1) return 1;",
  "        long long& v = dp[r][c][dir][ch];",
  "        if (v != -1) return v;",
  "        v = 0;",
  "        // move right (dir 0)",
  "        if (c + 1 < N) v += rec(r, c + 1, 0, ch + (dir == 1 ? 1 : 0) > K ? 0 : ch + (dir == 1 ? 1 : 0));",
  "        // move down (dir 1)",
  "        if (r + 1 < N) v += rec(r + 1, c, 1, ch + (dir == 0 ? 1 : 0) > K ? 0 : ch + (dir == 0 ? 1 : 0));",
  "        return v;",
  "    };",
  "    cout << rec(0, 0, 0, 0) + rec(0, 0, 1, 0) << \"\\n\";   // try both initial dirs",
  "    return 0;",
  "}",
];

export function getWalkHomeSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function WalkHomeProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadWalkHomePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "WalkHome — Full Study Guide", "WalkHome — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}

