// 🔒 USACO_VERIFIED (2026-05-13, rewritten 2026-09-23 — pending resubmission)
//   Old: Python 2/9, C++ 2/12 — both TLE from a dead 10^6-iteration loop (py)
//   and an unbounded p-up-to-10^9 loop (cpp). Real constraint is N <= 1000
//   (checked against the official USACO problem page), so the candidate-
//   position O(N^2) approach alone is already fast (verified: N=1000 in
//   0.13s py / 0.005s cpp; 300 brute-force cross-checks, 0 mismatches).
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "N = int(input())",
  "claims = []",
  "for _ in range(N):",
  "    parts = input().split()",
  "    typ = parts[0]",
  "    val = int(parts[1])",
  "    claims.append((typ, val))",
  "",
  "# The best position for Bessie is always one of the claimed values.",
  "# N <= 1000, so trying every claimed value as a candidate is fast.",
  "best = N",
  "for _, val_c in claims:",
  "    p = val_c",
  "    liars = 0",
  "    for typ, val in claims:",
  "        if typ == 'G' and p < val:",
  "            liars += 1",
  "        elif typ == 'L' and p > val:",
  "            liars += 1",
  "    if liars < best:",
  "        best = liars",
  "",
  "print(best)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<char> type(N);",
  "    vector<int> value(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> type[i] >> value[i];",
  "    }",
  "",
  "    // The best position for Bessie is always one of the claimed values.",
  "    // N <= 1000, so trying every claimed value as a candidate is fast.",
  "    int best = N;",
  "    for (int c = 0; c < N; c++) {",
  "        int p = value[c];",
  "        int liars = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            if (type[i] == 'G' && p < value[i]) {",
  "                liars++;",
  "            }",
  "            if (type[i] == 'L' && p > value[i]) {",
  "                liars++;",
  "            }",
  "        }",
  "        if (liars < best) {",
  "            best = liars;",
  "        }",
  "    }",
  "    cout << best << endl;",
  "    return 0;",
  "}",
];

export function getCountLiarsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "A claim only flips between true and false at its own x, so those x values are the only positions worth testing.",
            "주장이 참에서 거짓으로 갈리는 자리는 그 주장에 적힌 x 뿐이에요.\n그래서 x 값들만 후보로 놓고 세어 보면 돼요."),
        t(E, "N is at most 1000, so checking N candidates against N claims (N x N) is fast enough.",
            "N 이 최대 1000 이라, 후보 N 개 x 주장 N 개를 다 세어봐도(N x N) 충분히 빨라요."),
      ],
      cppOnly: [
        t(E, "Two parallel vectors (type, value) store each claim — same index, same claim.",
            "벡터 두 개(type, value)가 짝을 이뤄 각 주장을 담아요. 같은 자리(index)가 같은 주장이에요."),
      ],
    },
  ];
}

export function CountLiarsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY / FULL_CPP 는 USACO_VERIFIED 풀이의 표시용 원본이다 — 절대 안 바꾸고,
   그대로 가져와 beats(설명 말풍선)만 덧붙인다. getCountLiarsSections() 는 PDF 다운로드가
   계속 쓰므로 그대로 둔다. ── */
export function getCountLiarsWalk(E, lang = "py") {
  const vars = [
    { v: "best", ko: "지금까지 찾은 가장 적은 거짓말쟁이 수", en: "fewest liars found so far" },
    { v: "p", ko: "지금 시도하는 Bessie 의 자리", en: "candidate position for Bessie" },
  ];
  if (lang === "cpp") {
    const code = FULL_CPP;
    return {
      code,
      vars,
      beats: [
        { hi: [0, 11], bubble: t(E,
          "What do we hand back? The fewest cows that must be lying, once Bessie picks her best position. Read N claims — each is 'G x' (claims position ≥ x) or 'L x' (claims position ≤ x).",
          "무엇을 내놓아야 하나요? Bessie 가 가장 좋은 자리를 골랐을 때 거짓말쟁이가 될 수밖에 없는 소의 수예요.\nN 개의 주장을 읽어요 — 'G x'(자리 ≥ x 라는 주장) 또는 'L x'(자리 ≤ x 라는 주장)예요.") },
        { hi: [13, 15], bubble: t(E,
          "The best position is always one of the claimed values — that's the only place truth can flip. N is small (≤1000), so trying every claimed value is fast. Start best at N (worst case).",
          "가장 좋은 자리는 항상 누군가의 주장값 중 하나예요 — 참·거짓이 바뀌는 자리가 거기뿐이거든요.\nN 이 작아서(≤1000) 후보를 다 시도해도 빨라요. best 는 최악의 경우(N)로 시작해요.") },
        { hi: [16, 29], bubble: t(E,
          "Try every claimed value as Bessie's position p. A 'G' claim lies when p is less than its value; an 'L' claim lies when p is more than its value. Keep the smallest liar count seen.",
          "모든 주장값을 Bessie 의 자리 p 로 하나씩 시도해요.\n'G' 주장은 p 가 그 값보다 작으면 거짓, 'L' 주장은 p 가 그 값보다 크면 거짓이에요.\n지금까지 중 가장 적은 거짓말쟁이 수를 best 에 남겨요.") },
        { hi: [31, 33], bubble: t(E,
          "Print the smallest liar count found.",
          "가장 적은 거짓말쟁이 수를 출력해요.") },
      ],
    };
  }
  const code = FULL_PY;
  return {
    code,
    vars,
    beats: [
      { hi: [0, 6], bubble: t(E,
        "What do we hand back? The fewest cows that must be lying, once Bessie picks her best position. Read N claims — each is 'G x' (claims position ≥ x) or 'L x' (claims position ≤ x).",
        "무엇을 내놓아야 하나요? Bessie 가 가장 좋은 자리를 골랐을 때 거짓말쟁이가 될 수밖에 없는 소의 수예요.\nN 개의 주장을 읽어요 — 'G x'(자리 ≥ x 라는 주장) 또는 'L x'(자리 ≤ x 라는 주장)예요.") },
      { hi: [8, 10], bubble: t(E,
        "The best position is always one of the claimed values — that's the only place truth can flip. N is small (≤1000), so trying every claimed value is fast. Start best at N (worst case).",
        "가장 좋은 자리는 항상 누군가의 주장값 중 하나예요 — 참·거짓이 바뀌는 자리가 거기뿐이거든요.\nN 이 작아서(≤1000) 후보를 다 시도해도 빨라요. best 는 최악의 경우(N)로 시작해요.") },
      { hi: [11, 20], bubble: t(E,
        "Try every claimed value as Bessie's position p. A 'G' claim lies when p is less than its value; an 'L' claim lies when p is more than its value. Keep the smallest liar count seen.",
        "모든 주장값을 Bessie 의 자리 p 로 하나씩 시도해요.\n'G' 주장은 p 가 그 값보다 작으면 거짓, 'L' 주장은 p 가 그 값보다 크면 거짓이에요.\n지금까지 중 가장 적은 거짓말쟁이 수를 best 에 남겨요.") },
      { hi: [22, 22], bubble: t(E,
        "Print the smallest liar count found.",
        "가장 적은 거짓말쟁이 수를 출력해요.") },
    ],
  };
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


export function downloadCountLiarsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CountLiars — Full Study Guide", "CountLiars — 종합 풀이 노트");
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

