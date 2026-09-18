// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 13/13 PASS
//   C++:    13/13 PASS
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "def solve():",
  "    n, k = map(int, input().split())",
  "    a = list(map(int, input().split()))",
  "    m = abs(k)",
  "",
  "    # Group indices by residue mod |K| (a += K never changes residue)",
  "    groups = {}",
  "    for x in a:",
  "        groups.setdefault(x % m, []).append(x)",
  "",
  "    total = 0",
  "    for vals in groups.values():",
  "        # K > 0 → sort ascending; K < 0 → sort descending",
  "        vals.sort(reverse=(k < 0))",
  "        cur = vals[0]            # first slot stays put",
  "        for i in range(1, len(vals)):",
  "            # If next value already past cur, keep it; else push cur + K",
  "            if (k > 0 and vals[i] > cur) or (k < 0 and vals[i] < cur):",
  "                cur = vals[i]",
  "            else:",
  "                cur = cur + k",
  "                total += (cur - vals[i]) // k",
  "    print(total)",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    solve()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "#include <algorithm>",
  "#include <cstdlib>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    for (int t = 0; t < T; t++) {",
  "        long long n, k;",
  "        cin >> n >> k;",
  "        vector<long long> a(n);",
  "        for (int i = 0; i < n; i++) {",
  "            cin >> a[i];",
  "        }",
  "        long long m = llabs(k);",
  "",
  "        // Group by residue mod |K|",
  "        map<long long, vector<long long>> groups;",
  "        for (int i = 0; i < n; i++) {",
  "            long long x = a[i];",
  "            groups[((x % m) + m) % m].push_back(x);",
  "        }",
  "",
  "        long long total = 0;",
  "        for (auto &kv : groups) {",
  "            vector<long long> &vals = kv.second;",
  "            if (k > 0) {",
  "                sort(vals.begin(), vals.end());",
  "            } else {",
  "                sort(vals.begin(), vals.end(), greater<long long>());",
  "            }",
  "",
  "            long long cur = vals[0];",
  "            for (int i = 1; i < (int)vals.size(); i++) {",
  "                bool past;",
  "                if (k > 0) {",
  "                    past = (vals[i] > cur);",
  "                } else {",
  "                    past = (vals[i] < cur);",
  "                }",
  "                if (past) {",
  "                    cur = vals[i];",
  "                } else {",
  "                    cur = cur + k;",
  "                    total += (cur - vals[i]) / k;",
  "                }",
  "            }",
  "        }",
  "        cout << total << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

// CodeWalk — 코드 위 '왜 이렇게?' 노트 벽 대신 코드 줄에 붙는 말풍선 (선생님 규칙).
// 검증본 코드(FULL_PY/CPP)는 그대로, 표시만 CodeWalk 로.
const _MD_VARS = [
  { v: "k", ko: "더하는 값", en: "the step" },
  { v: "m", ko: "|K|", en: "|K|" },
  { v: "groups", ko: "나머지별 그룹", en: "residue groups" },
  { v: "cur", ko: "직전에 놓은 값", en: "last placed" },
];
export function getMakeDistinctWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FULL_CPP, vars: _MD_VARS, beats: [
      { hi: [7, 17],  bubble: t(E, "What are we solving for? One number per test — the fewest operations needed.\nFirst read T, then each test's n, k, and the array. m = |k|.", "무엇을 구해야 하나요?\n테스트마다 최소 연산 횟수 하나예요.\n먼저 T 를 읽고, 테스트마다 n, k, 배열을 읽어요. m = |k| 예요.") },
      { hi: [19, 24], bubble: t(E, "Key insight: adding K never changes a value's remainder mod |K| → group values by that remainder. Groups are independent!", "K 를 더해도 |K| 로 나눈 나머지는 안 바뀌어요.\n그래서 나머지끼리 묶으면 그룹끼리 서로 영향이 없어요!") },
      { hi: [26, 35], bubble: t(E, "For each group: sort (K>0 ascending, K<0 descending). The first value stays put.", "그룹마다 정렬해요 (K>0 은 오름차순, K<0 은 내림차순). 첫 값은 그대로 둬요.") },
      { hi: [36, 50], bubble: t(E, "Greedy: if the next value is already past cur, keep it; else push it to cur+K and add the operations.", "다음 값이 이미 앞서 있으면 그대로 두고,\n아니면 cur+K 로 밀면서 횟수를 더해요.") },
      { hi: [51, 51], bubble: t(E, "Print this test's answer.", "이 테스트의 답을 출력해요.") },
    ] };
  }
  return { code: FULL_PY, vars: _MD_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "What are we solving for? One number per test — the fewest operations needed.\nSum of N can reach 10^6, so read fast first.", "무엇을 구해야 하나요?\n테스트마다 최소 연산 횟수 하나예요.\nN 의 합이 10^6 까지라 입력부터 빠르게 받아요.") },
    { hi: [3, 6],   bubble: t(E, "solve() handles ONE test: read n, k, the array. m = |k|.", "solve() 는 테스트 하나를 맡아요. n, k, 배열을 읽고 m = |k| 예요.") },
    { hi: [8, 11],  bubble: t(E, "Key insight: adding K never changes a value's remainder mod |K| → group values by that remainder. Groups are independent!", "K 를 더해도 |K| 로 나눈 나머지는 안 바뀌어요.\n그래서 나머지끼리 묶으면 그룹끼리 서로 영향이 없어요!") },
    { hi: [13, 17], bubble: t(E, "For each group: sort (K>0 ascending, K<0 descending). The first value stays put.", "그룹마다 정렬해요 (K>0 은 오름차순, K<0 은 내림차순). 첫 값은 그대로 둬요.") },
    { hi: [18, 24], bubble: t(E, "Greedy: if the next value is already past cur, keep it; else push it to cur+K and add the operations.", "다음 값이 이미 앞서 있으면 그대로 두고,\n아니면 cur+K 로 밀면서 횟수를 더해요.") },
    { hi: [25, 25], bubble: t(E, "Print this test's answer.", "이 테스트의 답을 출력해요.") },
    { hi: [27, 29], bubble: t(E, "Run solve() for all T tests.", "T 개 테스트를 solve() 로 반복해요.") },
  ] };
}

export function getMakeDistinctSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Adding K never changes residue mod |K|, so groups are independent.",
            "K 를 더해도 |K| 로 나눈 나머지는 변하지 않아요. 그래서 나머지가 같은 것끼리 묶으면 그룹끼리 서로 영향이 없어요."),
        t(E, "Within a group, sort then greedy: each element either stays or jumps to the next free slot.",
            "한 그룹 안에서는 정렬한 뒤 앞에서부터 봐요. 그대로 두거나 다음 빈 칸으로 밀어요."),
        t(E, "K > 0 sort ascending; K < 0 sort descending — same logic, mirrored direction.",
            "K > 0 이면 오름차순, K < 0 이면 내림차순으로 정렬해요. 방법은 같고 방향만 반대예요."),
      ],
      pyOnly: [
        t(E, "dict.setdefault makes residue grouping a one-liner.",
            "dict.setdefault 를 쓰면 나머지별로 묶는 일을 한 줄에 끝내요."),
        t(E, "Python big ints handle answer overflow automatically.",
            "Python 은 정수가 아무리 커져도 알아서 처리해 줘요."),
      ],
      cppOnly: [
        t(E, "long long is required — answer can exceed 2^31.",
            "답이 2^31 을 넘을 수 있어서 long long 을 꼭 써야 해요."),
        t(E, "((x % m) + m) % m gives a non-negative residue even for negative inputs (defensive).",
            "((x % m) + m) % m 으로 구하면 음수가 들어와도 나머지가 0 이상으로 나와요."),
      ],
    },
  ];
}

export function MakeDistinctProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMakeDistinctPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Make All Distinct — Full Study Guide", "Make All Distinct — 종합 풀이 노트");
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
