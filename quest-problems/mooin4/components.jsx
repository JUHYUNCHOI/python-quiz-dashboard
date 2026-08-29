// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 16/16 PASS
//   C++:    16/16 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

export const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T, k = map(int, input().split())",
  "out = []",
  "for _ in range(T):",
  "    N = int(input())",
  "    S = input().strip()",
  "    # Walk right to left. Track parity of O's typed at later positions.",
  "    typed = [''] * N",
  "    flips = 0",
  "    for i in range(N - 1, -1, -1):",
  "        c = S[i]",
  "        if flips % 2 == 1:",
  "            c = 'O' if c == 'M' else 'M'",
  "        typed[i] = c",
  "        if c == 'O':",
  "            flips += 1",
  "    out.append('YES')",
  "    if k == 1:",
  "        out.append(''.join(typed))",
  "print('\\n'.join(out))",
];

export const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T, k;",
  "    cin >> T >> k;",
  "    for (int t = 0; t < T; t++) {",
  "        int N; string S;",
  "        cin >> N >> S;",
  "        // Walk right to left. Track parity of O's typed later.",
  "        string typed(N, ' ');",
  "        int flips = 0;",
  "        for (int i = N - 1; i >= 0; i--) {",
  "            char c = S[i];",
  "            if (flips % 2 == 1) {",
  "                c = (c == 'M') ? 'O' : 'M';",
  "            }",
  "            typed[i] = c;",
  "            if (c == 'O') {",
  "                flips++;",
  "            }",
  "        }",
  "        cout << \"YES\\n\";",
  "        if (k == 1) {",
  "            cout << typed << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

// CodeWalk — 코드 위 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙). 검증본 코드 그대로.
const _M4_VARS = [
  { v: "S", ko: "화면 문자열", en: "the screen string" },
  { v: "typed", ko: "실제 친 글자", en: "actually typed" },
  { v: "flips", ko: "뒤에서 친 O 홀짝", en: "parity of later O's" },
  { v: "k", ko: "출력 모드", en: "output mode" },
];
export function getMooin4Walk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _M4_VARS, beats: [
      { hi: [4, 9],   bubble: t(E, "Read T and k, then each test's N and the screen string S.", "T 와 k 읽고, 테스트마다 N 과 화면 문자열 S.") },
      { hi: [10, 12], bubble: t(E, "Walk RIGHT→LEFT.\nflips = are the O's typed after this spot odd or even?", "오른쪽에서 왼쪽으로 훑어요.\nflips 는 이 자리보다 뒤에서 친 O 의 홀짝이에요.") },
      { hi: [13, 22], bubble: t(E, "For each character: if flips is odd, M and O are swapped.\nRecord what was really typed.\nIf that key is O, flip the parity.", "글자마다 봐요. flips 가 홀수면 M 과 O 가 뒤바뀐 거예요.\n실제로 친 글자를 기록해요.\n그 키가 O 면 홀짝을 뒤집어요.") },
      { hi: [23, 26], bubble: t(E, "Always YES. If k==1, also print the actual typed string.", "항상 YES. k==1 이면 실제 친 문자열도 출력.") },
    ] };
  }
  return { code: FULL_PY, vars: _M4_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input.", "빠른 입력.") },
    { hi: [3, 7],   bubble: t(E, "Read T and k, then each test's N and the screen string S.", "T 와 k 읽고, 테스트마다 N 과 화면 문자열 S.") },
    { hi: [8, 10],  bubble: t(E, "Walk RIGHT→LEFT.\nflips = are the O's typed after this spot odd or even?", "오른쪽에서 왼쪽으로 훑어요.\nflips 는 이 자리보다 뒤에서 친 O 의 홀짝이에요.") },
    { hi: [11, 17], bubble: t(E, "For each character: if flips is odd, M and O are swapped.\nRecord what was really typed.\nIf that key is O, flip the parity.", "글자마다 봐요. flips 가 홀수면 M 과 O 가 뒤바뀐 거예요.\n실제로 친 글자를 기록해요.\n그 키가 O 면 홀짝을 뒤집어요.") },
    { hi: [18, 20], bubble: t(E, "Always YES. If k==1, also output the actual typed string.", "항상 YES. k==1 이면 실제 친 문자열도 출력.") },
    { hi: [21, 21], bubble: t(E, "Print all results at once.", "결과를 한 번에 출력.") },
  ] };
}

export function getMooin4Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "Key insight: the last typed key never gets flipped — it equals S[N-1] directly.",
          "핵심: 마지막에 친 글자는 절대 뒤집히지 않으니 S[N-1] 과 같아요."),
        t(E,
          "Walking right→left, each later O flips the current character once. Track parity of later O's.",
          "오른쪽→왼쪽으로 가면서, 나중에 친 O 하나마다 현재 글자가 한 번 뒤집혀요. 나중 O 의 홀짝만 추적."),
        t(E,
          "If parity is odd, flip the target letter to figure out what to type. The answer is always YES.",
          "홀수면 목표 글자를 뒤집어서 무엇을 칠지 결정. 답은 항상 YES."),
      ],
      pyOnly: [
        t(E,
          "sys.stdin.readline keeps it fast across up to 10^4 test cases.",
          "테스트케이스가 많으니 sys.stdin.readline 으로 빠르게."),
      ],
      cppOnly: [
        t(E,
          "Build typed in-place — O(N) per test case, O(sum N) total.",
          "typed 문자열을 그 자리에서 채워요 — 케이스당 O(N), 전체 O(합 N)."),
      ],
    },
  ];
}

export function Mooin4ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadMooin4PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "It's Mooin' Time IV — Full Study Guide", "무잉 타임 IV — 종합 풀이 노트");
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
<div class="sub">USACO Jan 2026, Bronze #1 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
