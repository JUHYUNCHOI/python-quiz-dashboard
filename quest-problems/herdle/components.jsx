// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1179
// 🔒 USACO_VERIFIED (2026-06-15)
//   Python: PASS (local — matches cpid=1179 sample1 1\n1 and sample2 1\n2)
//   C++:    PASS (local — matches cpid=1179 sample1 1\n1 and sample2 1\n2)
//   Fix: removed bogus leading-T loop & .split() parsing. Real problem = single
//        test case, 6 lines (3 answer + 3 guess), each line a 3-letter word;
//        index by character. C++ map keyed by char.
//   USACO 정식 재제출은 미실시 — 공식 샘플 2개 로컬 일치 확인.
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

const FULL_PY = [
  "# 3 lines = answer grid, next 3 lines = guess grid (single test case)",
  "ans = [input() for _ in range(3)]",
  "gue = [input() for _ in range(3)]",
  "",
  "green = 0",
  "yellow = 0",
  "remaining_ans = {}",
  "remaining_gue = {}",
  "",
  "# Pass 1: count GREEN (exact match), record leftover breeds",
  "for r in range(3):",
  "    for c in range(3):",
  "        if ans[r][c] == gue[r][c]:",
  "            green += 1",
  "        else:",
  "            remaining_ans[ans[r][c]] = remaining_ans.get(ans[r][c], 0) + 1",
  "            remaining_gue[gue[r][c]] = remaining_gue.get(gue[r][c], 0) + 1",
  "",
  "# Pass 2: count YELLOW from leftover breeds",
  "for breed in remaining_gue:",
  "    if breed in remaining_ans:",
  "        yellow += min(remaining_gue[breed], remaining_ans[breed])",
  "",
  "print(green)",
  "print(yellow)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <map>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 3 lines = answer grid, next 3 lines = guess grid (single test case)",
  "    vector<string> ans(3), gue(3);",
  "    for (int r = 0; r < 3; r++) {",
  "        cin >> ans[r];",
  "    }",
  "    for (int r = 0; r < 3; r++) {",
  "        cin >> gue[r];",
  "    }",
  "",
  "    int green = 0;",
  "    int yellow = 0;",
  "    map<char,int> remA, remG;",
  "",
  "    // Pass 1: count GREEN (exact match), record leftover breeds",
  "    for (int r = 0; r < 3; r++) {",
  "        for (int c = 0; c < 3; c++) {",
  "            if (ans[r][c] == gue[r][c]) {",
  "                green++;",
  "            } else {",
  "                remA[ans[r][c]]++;",
  "                remG[gue[r][c]]++;",
  "            }",
  "        }",
  "    }",
  "",
  "    // Pass 2: count YELLOW from leftover breeds",
  "    for (auto& kv : remG) {",
  "        if (remA.count(kv.first)) {",
  "            yellow += min(kv.second, remA[kv.first]);",
  "        }",
  "    }",
  "",
  "    cout << green << \"\\n\" << yellow << \"\\n\";",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고,
   beats(설명 말풍선)만 덧붙인다. getHerdleSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getHerdleWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "ans / gue", ko: "정답 격자 / 추측 격자 (3줄)", en: "answer grid / guess grid (3 rows)" },
        { v: "remA / remG", ko: "초록이 아닌 칸의 남은 품종 개수", en: "leftover breed counts (non-green cells)" },
        { v: "green / yellow", ko: "정확히 맞음 / 품종만 맞음", en: "exact match / right breed wrong spot" },
      ],
      beats: [
        { hi: [0, 15], bubble: t(E,
          "What should we output? The green and yellow counts. Read the 3-line ans grid, then the 3-line gue grid.",
          "무엇을 내놓아야 하나요? 초록과 노랑 개수예요.\n정답 격자(ans)와 추측 격자(gue)를 각각 3줄씩 읽어요.") },
        { hi: [17, 19], bubble: t(E,
          "Set up green and yellow counters, plus remA and remG — maps from letter to leftover count.",
          "초록·노랑을 셀 변수와, 초록이 아닌 칸의 남은 품종을 담을\nremA, remG(글자별 개수) 를 준비해요.") },
        { hi: [21, 31], bubble: t(E,
          "Pass 1 compares each position. Matches are green; mismatches add one to remA and remG for their own letter.",
          "1차로 같은 자리를 견줘요.\n같으면 초록이고, 다르면 양쪽 품종을 remA, remG 에 하나씩 더해요.") },
        { hi: [33, 38], bubble: t(E,
          "Pass 2 checks each remG breed against remA. If present in both, add the smaller count to yellow.",
          "2차로 remG 의 품종마다 remA 에도 있는지 봐요.\n있으면 적은 쪽 개수만큼 yellow 에 더해요.") },
        { hi: [40, 42], bubble: t(E,
          "Print green and yellow.",
          "green 과 yellow 를 한 줄에 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "ans / gue", ko: "정답 격자 / 추측 격자 (3줄)", en: "answer grid / guess grid (3 rows)" },
      { v: "remaining_ans / remaining_gue", ko: "초록이 아닌 칸의 남은 품종 개수", en: "leftover breed counts (non-green cells)" },
      { v: "green / yellow", ko: "정확히 맞음 / 품종만 맞음", en: "exact match / right breed wrong spot" },
    ],
    beats: [
      { hi: [0, 2], bubble: t(E,
        "What do we need to output? The green count (exact matches) and the yellow count (right breed, wrong spot). Read the 3-line answer grid (ans) and the 3-line guess grid (gue).",
        "무엇을 내놓아야 하나요? 초록(정확히 맞은 칸) 개수와 노랑(자리만 다른 칸) 개수예요.\n먼저 정답 격자(ans)와 추측 격자(gue)를 3줄씩 읽어요.") },
      { hi: [4, 7], bubble: t(E,
        "Set up counters for green and yellow, plus dictionaries to hold the leftover breeds from cells that aren't green.",
        "초록·노랑 개수를 셀 칸(green, yellow)과,\n초록이 아닌 칸의 남은 품종을 담을 칸(remaining_ans, remaining_gue)을 준비해요.") },
      { hi: [9, 16], bubble: t(E,
        "Pass 1 compares each position. If they match, it's green; otherwise, save both breeds — one to remaining_ans, one to remaining_gue.",
        "1차로 같은 자리를 하나씩 견줘요.\n정답과 추측이 같으면 초록이고, 다르면 그 자리의 두 품종을 각각 remaining_ans, remaining_gue 에 남겨 둬요.") },
      { hi: [18, 21], bubble: t(E,
        "Pass 2 matches leftover breeds. For a breed present on both sides, only the smaller count can actually be paired — that's how much yellow it adds.",
        "2차로 남은 품종끼리 짝지어요.\n같은 품종이 양쪽에 남아 있으면, 적은 쪽 개수만큼만 노랑으로 세요 — 그만큼만 실제로 짝지을 수 있으니까요.") },
      { hi: [23, 24], bubble: t(E,
        "Print green, then print yellow.",
        "초록과 노랑을 각각 출력해요.") },
    ],
  };
}

export function getHerdleSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? The green count (exact matches) and the yellow count (right breed, wrong spot).",
            "무엇을 답으로 내야 하나요?\n초록(정확히 맞은 칸) 개수와 노랑(자리만 다른 칸) 개수예요."),
        t(E, "Yellow only counts cells that aren't already green, so we must find all the greens first and set them aside.",
            "노랑은 초록이 아닌 자리만 대상이라,\n먼저 초록을 다 찾아내고 남은 자리만 봐야 해요."),
        t(E, "So pass 1 compares same positions to count green, and saves the leftover breeds from both grids.",
            "그래서 1차로 같은 자리를 견줘 초록을 세고,\n초록이 아닌 자리의 품종만 따로 남겨 둬요."),
        t(E, "Pass 2 matches leftover breeds and takes the smaller count on each side — that's how many can actually be paired up as yellow.",
            "2차에서는 남은 품종끼리 짝짓고, 정답·추측 개수 중\n작은 값만큼만 노랑으로 세요 — 실제로 짝지을 수 있는 만큼만요."),
      ],
      pyOnly: [],
      cppOnly: [
        t(E, "vector<string> holds 3 rows; index a row with [c] to get one breed letter.",
            "vector<string> 에 세 줄을 담고, [c] 로 품종 글자 하나를 꺼내요."),
        t(E, "map<char,int> counts breeds left over after the green pass.",
            "map<char,int> 로 초록을 뺀 뒤 남은 품종이 몇 마리인지 세요."),
      ],
    },
  ];
}

export function HerdleProgressiveCode(props) {
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


export function downloadHerdlePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Herdle — Full Study Guide", "Herdle — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장'을 선택해요.")}</div>
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

