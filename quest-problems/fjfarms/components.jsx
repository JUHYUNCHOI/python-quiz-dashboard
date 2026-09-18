// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 4/12 (1 WA + 7 TLE, O(N^2) too slow)
//   C++:    4/13 (1 WA + 8 TLE)
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "import sys",
  "",
  "data = sys.stdin.read().split()",
  "idx = 0",
  "T = int(data[idx])",
  "idx += 1",
  "",
  "def solve(N, h, a, t):",
  "    # Try each day x from 0 upward — bound 1100 is enough under Bronze constraints.",
  "    for x in range(1101):",
  "        heights = [h[i] + a[i] * x for i in range(N)]",
  "        # Count plants strictly TALLER than i.",
  "        tcomp = [sum(1 for j in range(N) if heights[j] > heights[i]) for i in range(N)]",
  "        if tcomp == t:",
  "            return x",
  "    return -1",
  "",
  "out = []",
  "for _ in range(T):",
  "    N = int(data[idx])",
  "    idx += 1",
  "    h = [int(data[idx + i]) for i in range(N)]",
  "    idx += N",
  "    a = [int(data[idx + i]) for i in range(N)]",
  "    idx += N",
  "    t = [int(data[idx + i]) for i in range(N)]",
  "    idx += N",
  "    out.append(str(solve(N, h, a, t)))",
  "",
  "print(chr(10).join(out))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int solve(int N, vector<long long>& h, vector<long long>& a, vector<int>& t) {",
  "    for (int x = 0; x <= 1100; x++) {",
  "        vector<long long> hh(N);",
  "        for (int i = 0; i < N; i++) {",
  "            hh[i] = h[i] + a[i] * x;",
  "        }",
  "        vector<int> tcomp(N, 0);",
  "        for (int i = 0; i < N; i++) {",
  "            for (int j = 0; j < N; j++) {",
  "                if (hh[j] > hh[i]) {",
  "                    tcomp[i]++;",
  "                }",
  "            }",
  "        }",
  "        if (tcomp == t) {",
  "            return x;",
  "        }",
  "    }",
  "    return -1;",
  "}",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int tc = 0; tc < T; tc++) {",
  "        int N;",
  "        cin >> N;",
  "        vector<long long> h(N), a(N);",
  "        vector<int> t(N);",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> h[i];",
  "        }",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> a[i];",
  "        }",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> t[i];",
  "        }",
  "        cout << solve(N, h, a, t) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getFjFarmsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What do we need? The smallest day x where every t[i] matches\n(or -1 if none does).",
            "무엇을 내놓아야 하나요? t[i] 가 전부 맞아떨어지는 가장 이른 날 x 예요.\n(그런 날이 없으면 -1)"),
        t(E, "Under Bronze limits the answer day is never too large, so trying\nx = 0, 1, 2, … one by one is fast enough — no need to be clever.",
            "Bronze 제약에서는 답이 되는 날이 그리 크지 않아서,\nx = 0, 1, 2, … 를 하나씩 다 시도해도 충분히 빨라요."),
        t(E, "So: for each day x, compute every height, count how many plants are\ntaller than i, and check it against t. Stop at the first match.",
            "그래서 날마다 키를 다시 계산하고, i 보다 큰 식물 수를 세어\nt 와 같은지 확인해요. 처음 맞는 날에서 멈춰요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python 은 list, map, sorted 덕분에 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "A helper function solve(...) keeps main() short and readable.",
            "도우미 함수 solve(...) 로 나누면 main() 이 짧아서 읽기 좋아요."),
        t(E, "Nested for-loops count how many cows are taller than cow i.",
            "for 문을 두 겹으로 돌려서 i 보다 키가 큰 식물이 몇 개인지 세요."),
      ],
    },
  ];
}

export function FjFarmsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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


export function downloadFjFarmsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FjFarms — Full Study Guide", "FjFarms — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

