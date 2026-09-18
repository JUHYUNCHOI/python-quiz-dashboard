// 🔒 USACO_VERIFIED — cpid=891, shellgame (2019 Jan Bronze #1)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('shell.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N = int(lines[0])",
  "# 각 swap: (a, b, g) — a 와 b 컵 바꾸고 g 컵 추측",
  "a_list = []",
  "b_list = []",
  "g_list = []",
  "for i in range(N):",
  "    parts = lines[1 + i].split()",
  "    a_list.append(int(parts[0]))",
  "    b_list.append(int(parts[1]))",
  "    g_list.append(int(parts[2]))",
  "",
  "# 시작 위치 1, 2, 3 다 시도해서 최대 점수 찾기",
  "best = 0",
  "for start in range(1, 4):",
  "    pos = start",
  "    score = 0",
  "    for i in range(N):",
  "        a = a_list[i]",
  "        b = b_list[i]",
  "        g = g_list[i]",
  "        if pos == a:",
  "            pos = b",
  "        elif pos == b:",
  "            pos = a",
  "        if pos == g:",
  "            score += 1",
  "    if score > best:",
  "        best = score",
  "",
  "with open('shell.out', 'w') as file:",
  "    file.write(str(best) + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"shell.in\");",
  "    ofstream fout(\"shell.out\");",
  "",
  "    int N;",
  "    fin >> N;",
  "    vector<int> a_arr(N), b_arr(N), g_arr(N);",
  "    for (int i = 0; i < N; i++) {",
  "        fin >> a_arr[i] >> b_arr[i] >> g_arr[i];",
  "    }",
  "    // 시작 위치 1, 2, 3 다 시도해서 최대 점수",
  "    int best = 0;",
  "    for (int start = 1; start <= 3; start++) {",
  "        int pos = start;",
  "        int score = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            int a = a_arr[i];",
  "            int b = b_arr[i];",
  "            int g = g_arr[i];",
  "            if (pos == a) {",
  "                pos = b;",
  "            } else if (pos == b) {",
  "                pos = a;",
  "            }",
  "            if (pos == g) {",
  "                score++;",
  "            }",
  "        }",
  "        if (score > best) {",
  "            best = score;",
  "        }",
  "    }",
  "    fout << best << \"\\n\";",
  "    return 0;",
  "}",
];

export function getShellGameSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we print? The best possible number of correct guesses, over all 3 choices of where the shell truly started. So first read N and the N swaps (a, b, guess).",
            "무엇을 출력해야 하나요? 조개가 실제로 어디서 시작했든, 가장 많이 맞힐 수 있는 정답 수예요.\n그러니 먼저 N 과 N 번의 (a, b, 추측) 을 읽어요."),
        t(E, "We don't know which cup is real, so try all 3 starting positions separately and replay the same swaps for each — the guesses might match a different number of times.",
            "실제 조개가 어디 있었는지 모르니, 시작 위치 1, 2, 3 을 각각 가정해요.\n같은 뒤섞기를 그대로 따라가면서 추측이 맞은 횟수를 세요."),
        t(E, "So for each start, track the shell's position through every swap, count matching guesses, and keep the best score across all 3 starts.",
            "그래서 시작마다 조개 위치를 뒤섞기 순서대로 따라가며 추측이 맞은 횟수를 세고,\n세 시작 중 가장 좋은 점수를 남겨요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python 은 list, map, sorted 덕분에 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "헤더는 필요한 것만 적어요 (<iostream>, <vector> …). 그래야 읽기 쉬워요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "더하거나 곱한 값이 2×10^9 를 넘을 것 같으면 long long 을 써요."),
      ],
    },
  ];
}

export function ShellGameProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadShellGamePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혀 있어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ShellGame — Full Study Guide", "ShellGame — 종합 풀이 노트");
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

