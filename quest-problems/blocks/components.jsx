// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 20/20 on cpid=1205
// 🔒 USACO_VERIFIED (rewritten 2026-06-15)
//   Real problem: USACO 2022 Feb Bronze #3 "Blocks" (cpid 1205).
//   Per query word, print YES/NO — can it be spelled by assigning each
//   letter to a distinct block (one face up)?
//   Python: official sample PASS (YES NO YES YES NO NO) — local verify
//   C++:    official sample PASS — local verify (g++ -std=c++17)
//   **2026-07-17 (선생님 "재귀는 힘들어"): 재귀 걷어내기 — 백트래킹 solve(pos) →
//     itertools.permutations(range(4), len(word)) (C++: next_permutation). 4 블록에
//     글자별 다른 블록 배정 = 순열이라 라이브러리로 재귀 숨김. YES/NO 만 내므로 시도 순서
//     무관. 로컬: 이전 재귀본과 400+300 랜덤 출력 동일, PY==CPP 교차, clang++ 컴파일.**
//   USACO re-submit PENDING. 코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "from itertools import permutations",
  "",
  "N = int(input())",
  "blocks = [input().strip() for _ in range(4)]",
  "",
  "# Can `word` be spelled? Give each letter its own distinct block.",
  "# permutations(range(4), len(word)) = every way to pick that many",
  "# distinct blocks in order — one block per letter. No recursion.",
  "def can_spell(word):",
  "    for choice in permutations(range(4), len(word)):",
  "        # choice[pos] = the block assigned to letter word[pos]",
  "        if all(word[pos] in blocks[b] for pos, b in enumerate(choice)):",
  "            return True            # this assignment works",
  "    return False                   # no assignment worked",
  "",
  "for _ in range(N):",
  "    w = input().strip()",
  "    print(\"YES\" if can_spell(w) else \"NO\")",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <algorithm>",
  "#include <vector>",
  "using namespace std;",
  "",
  "string blocks[4];",
  "",
  "// Can `w` be spelled? Try every assignment of distinct blocks to letters.",
  "// next_permutation walks all orderings of {0,1,2,3} — no recursion.",
  "bool can_spell(const string &w) {",
  "    int len = (int)w.size();",
  "    if (len > 4) return false;               // only 4 blocks to hand out",
  "    vector<int> perm = {0, 1, 2, 3};",
  "    do {",
  "        bool ok = true;",
  "        for (int pos = 0; pos < len; pos++) {",
  "            // perm[pos] = block assigned to letter w[pos]",
  "            if (blocks[perm[pos]].find(w[pos]) == string::npos) { ok = false; break; }",
  "        }",
  "        if (ok) return true;                 // this assignment works",
  "    } while (next_permutation(perm.begin(), perm.end()));",
  "    return false;                            // no assignment worked",
  "}",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    for (int i = 0; i < 4; i++) cin >> blocks[i];",
  "    for (int q = 0; q < N; q++) {",
  "        string w;",
  "        cin >> w;",
  "        cout << (can_spell(w) ? \"YES\" : \"NO\") << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getBlocksSections(E) {
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
        t(E, "Split #include into specific headers (iostream, string) — no bits/stdc++.h.",
            "#include 는 배운 헤더만 (iostream, string) — bits/stdc++.h 안 써."),
        t(E, "s.find(c) != string::npos checks whether character c is on a face.",
            "s.find(c) != string::npos 로 글자 c 가 그 면에 있는지 확인."),
        t(E, "next_permutation walks every ordering of {0,1,2,3} — an iterative way to try all block assignments, no recursion.",
            "next_permutation 은 {0,1,2,3} 의 모든 순서를 훑어요 — 재귀 없이 반복문으로 모든 블록 배정을 시도."),
      ],
    },
  ];
}

export function BlocksProgressiveCode(props) {
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


export function downloadBlocksPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Blocks — Full Study Guide", "Blocks — 종합 풀이 노트");
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

