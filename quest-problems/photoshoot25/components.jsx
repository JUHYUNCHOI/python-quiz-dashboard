import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

export const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "Q = int(input())",
  "",
  "# beauty[r][c] = current beauty of cow at (r,c). 1-indexed.",
  "beauty = [[0] * (N + 2) for _ in range(N + 2)]",
  "",
  "# W = number of valid top-left positions per dimension",
  "W = N - K + 1",
  "",
  "# S[i][j] = sum of K x K window with top-left (i,j)",
  "S = [[0] * (W + 2) for _ in range(W + 2)]",
  "",
  "cur_max = 0",
  "out = []",
  "",
  "for _ in range(Q):",
  "    r, c, v = map(int, input().split())",
  "    delta = v - beauty[r][c]",
  "    beauty[r][c] = v",
  "",
  "    # windows containing (r,c) have top-left (i,j) with",
  "    # max(1, r-K+1) <= i <= min(r, W),  same for j",
  "    i_lo = max(1, r - K + 1)",
  "    i_hi = min(r, W)",
  "    j_lo = max(1, c - K + 1)",
  "    j_hi = min(c, W)",
  "",
  "    for i in range(i_lo, i_hi + 1):",
  "        for j in range(j_lo, j_hi + 1):",
  "            S[i][j] += delta",
  "            if S[i][j] > cur_max:",
  "                cur_max = S[i][j]",
  "",
  "    out.append(str(cur_max))",
  "",
  "sys.stdout.write('\\n'.join(out) + '\\n')",
];

export const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "    int Q;",
  "    cin >> Q;",
  "",
  "    // 1-indexed beauty grid",
  "    vector<vector<int>> beauty(N + 2, vector<int>(N + 2, 0));",
  "",
  "    int W = N - K + 1; // valid top-left range per dim",
  "    vector<vector<int>> S(W + 2, vector<int>(W + 2, 0));",
  "",
  "    int cur_max = 0;",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int r, c, v;",
  "        cin >> r >> c >> v;",
  "        int delta = v - beauty[r][c];",
  "        beauty[r][c] = v;",
  "",
  "        int i_lo = max(1, r - K + 1);",
  "        int i_hi = min(r, W);",
  "        int j_lo = max(1, c - K + 1);",
  "        int j_hi = min(c, W);",
  "",
  "        for (int i = i_lo; i <= i_hi; i++) {",
  "            for (int j = j_lo; j <= j_hi; j++) {",
  "                S[i][j] += delta;",
  "                if (S[i][j] > cur_max) {",
  "                    cur_max = S[i][j];",
  "                }",
  "            }",
  "        }",
  "        cout << cur_max << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getPhotoshoot25Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "Each update touches only at most K x K windows (those whose K x K square covers the updated cell).",
          "각 업데이트는 최대 K x K 개 윈도우만 바뀜 (그 윈도우의 K x K 영역이 해당 칸을 덮을 때)."),
        t(E,
          "Beauty values only increase, so the global max is non-decreasing — just compare new window sums against cur_max.",
          "아름다움 값은 증가만 하므로 전체 최대값은 줄지 않음 — 새로 갱신된 윈도우 합만 cur_max 와 비교."),
        t(E,
          "Total work: Q * K^2 ≤ 30000 * 625 ≈ 2 x 10^7 operations — fast enough.",
          "총 연산량: Q * K^2 ≤ 30000 * 625 ≈ 2 x 10^7 — 충분히 빠름."),
      ],
      pyOnly: [
        t(E,
          "sys.stdin.readline + collected output is essential for 30000 queries in Python.",
          "Python 에서 30000 쿼리는 sys.stdin.readline + 출력 모아서 한 번에 필수."),
      ],
      cppOnly: [
        t(E,
          "Window sums max 25*25 * 10^6 = 6.25 x 10^8, comfortably inside int.",
          "윈도우 합은 최대 25*25 * 10^6 = 6.25 x 10^8 으로 int 안에 들어감."),
      ],
    },
  ];
}

export function Photoshoot25ProgressiveCode(props) {
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


export function downloadPhotoshoot25PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Photoshoot (2025) — Full Study Guide", "포토슛 (2025) — 종합 풀이 노트");
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
  .hint { background: #f5f3ff; border: 1px solid #8b5cf6; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #5b21b6; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2026 First Contest, Bronze #3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
