// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 17/17 PASS
//   C++:    17/17 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const FULL_PY = [
  "N = int(input())",
  "s = input()",
  "arr = list(map(int, input().split()))",
  "arr = [x - 1 for x in arr]",
  "",
  "eG = eH = lG = lH = -1",
  "for i in range(N - 1, -1, -1):",
  "    if s[i] == 'G':",
  "        eG = i",
  "    if s[i] == 'H':",
  "        eH = i",
  "for i in range(N):",
  "    if s[i] == 'G':",
  "        lG = i",
  "    if s[i] == 'H':",
  "        lH = i",
  "",
  "ans = 0",
  "if eG != -1 and arr[eG] >= lG:",
  "    for i in range(eG):",
  "        if i == eH:",
  "            continue",
  "        if s[i] == 'H' and arr[i] >= eG:",
  "            ans += 1",
  "if eH != -1 and arr[eH] >= lH:",
  "    for i in range(eH):",
  "        if i == eG:",
  "            continue",
  "        if s[i] == 'G' and arr[i] >= eH:",
  "            ans += 1",
  "if eG != -1 and eH != -1:",
  "    if (arr[eG] >= lG or (eG <= eH and arr[eG] >= eH)) and \\",
  "       (arr[eH] >= lH or (eH <= eG and arr[eH] >= eG)):",
  "        ans += 1",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    string s;",
  "    cin >> s;",
  "    vector<int> arr(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> arr[i];",
  "        arr[i]--;",
  "    }",
  "",
  "    int eG = -1;",
  "    int eH = -1;",
  "    int lG = -1;",
  "    int lH = -1;",
  "    for (int i = N - 1; i >= 0; i--) {",
  "        if (s[i] == 'G') {",
  "            eG = i;",
  "        }",
  "        if (s[i] == 'H') {",
  "            eH = i;",
  "        }",
  "    }",
  "    for (int i = 0; i < N; i++) {",
  "        if (s[i] == 'G') {",
  "            lG = i;",
  "        }",
  "        if (s[i] == 'H') {",
  "            lH = i;",
  "        }",
  "    }",
  "",
  "    int ans = 0;",
  "    if (eG != -1 && arr[eG] >= lG) {",
  "        for (int i = 0; i < eG; i++) {",
  "            if (i == eH) {",
  "                continue;",
  "            }",
  "            if (s[i] == 'H' && arr[i] >= eG) {",
  "                ans++;",
  "            }",
  "        }",
  "    }",
  "    if (eH != -1 && arr[eH] >= lH) {",
  "        for (int i = 0; i < eH; i++) {",
  "            if (i == eG) {",
  "                continue;",
  "            }",
  "            if (s[i] == 'G' && arr[i] >= eH) {",
  "                ans++;",
  "            }",
  "        }",
  "    }",
  "    if (eG != -1 && eH != -1) {",
  "        bool gOK = (arr[eG] >= lG) || (eG <= eH && arr[eG] >= eH);",
  "        bool hOK = (arr[eH] >= lH) || (eH <= eG && arr[eH] >= eG);",
  "        if (gOK && hOK) {",
  "            ans++;",
  "        }",
  "    }",
  "    cout << ans << '\\n';",
  "    return 0;",
  "}",
];

export function getLeadersSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "The answer is how many valid (G-leader, H-leader) pairs exist.\nChecking every pair is O(N^2), too slow.\nKey fact: a valid pair always includes the very first cow\nof some breed that covers its whole breed.\nSo we find the first G and first H, then count the cases\nwhere each one plays that role.",
          "답은 되는 (G리더, H리더) 짝의 개수예요.\n모든 짝을 다 확인하면 N × N 번이라 느려요.\n핵심은, 되는 짝엔 늘 자기 품종을 전부 덮는\n맨 앞 소가 하나는 있다는 거예요.\n그래서 맨 앞 G 와 맨 앞 H 를 기준으로 경우를 나눠 세요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "We adjust arr[i]-- once on read to convert from 1-indexed to 0-indexed.",
            "읽을 때 arr[i]-- 로 1부터 세던 자리를 0부터 세도록 한 번에 바꿔요."),
        t(E, "Two reverse/forward scans find the first/last G and H positions in O(N).",
            "앞뒤로 한 번씩 훑으면 G 와 H 의 처음·마지막 위치를 O(N) 에 찾아요."),
      ],
    },
  ];
}

export function LeadersProgressiveCode(props) {
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


export function downloadLeadersPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Leaders — Full Study Guide", "Leaders — 종합 풀이 노트");
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

