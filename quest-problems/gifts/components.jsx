import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* 옛 문제(N 개를 K 명에게)용 GiftsSim 은 2026-07-30 삭제 — quest 를 진짜
   MCC 2024 P2 로 교체하면서 아무도 안 쓰는 죽은 시뮬이 됐다. 새 시뮬은 sims.jsx.
   (남겨두면 "이 문제는 N % K 구나" 로 오해한다.) */

/* ⚠️ 2026-07-30 전면 교체 — 이 파일의 코드는 *다른 문제* 를 풀고 있었다.
   옛 내용: "선물 N 개를 K 명에게 고르게 → 추가로 받는 사람 수" → print(N % K).
   진짜 MCC 2024 P2 (Gifts): 손님 n 명, 선물 m 개 (m < n). 손님마다 티어 t_i.
   티어 낮은 사람부터, 같은 티어면 먼저 온(번호 작은) 사람부터 선물을 준다.
   출력 = 손님 1..n 순서로 0/1 (받았으면 1).
   원문: public/problems/mcc-2024-statements.pdf p.3 */

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "n, m = map(int, input().split())",
  "t = list(map(int, input().split()))",
  "",
  "# (티어, 번호) 쌍으로 줄 세우기.",
  "# 튜플은 앞에서부터 비교 → 티어가 먼저, 같으면 번호가 작은 사람이 먼저.",
  "order = sorted(zip(t, range(n)))",
  "",
  "x = [0] * n",
  "for _, i in order[:m]:      # 앞에서 m 명만 선물을 받음",
  "    x[i] = 1",
  "",
  "print(*x)",
];

/* C++ 코드는 2026-07-30 삭제 — MCC quest 는 App 에서 codeLang="py" 로 고정돼
   학생에게 C++ 이 아예 안 보인다 (선생님: "MCC는 c++ 다 없애줘").
   안 보이는 코드를 유지하면 검증 대상만 늘고 학생에겐 도움이 0. */

export function getGiftsSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY,
      /* ⚠️ 2026-07-30 — 여기 설명이 옛 문제(N % K) 것으로 남아 있었다. 코드만 바꾸고
         옆의 why/pyOnly 를 안 고쳐서, 학생이 새 코드를 보며 옛 문제 설명을 읽게 됐다.
         코드를 갈아엎을 땐 *그 옆 노트도 같이* 봐야 한다. */
      /* 규칙 자체는 앞 슬라이드(세 동작)가 이미 말했다. 여기서는 *코드가 그 규칙을
         어떻게 담았는지* 만 — 안 그러면 같은 말이 네 번 나온다. */
      why: [
        t(E, "zip(t, range(n)) pairs each tier with its guest number. Tuples compare front to back, so tier decides first and the guest number breaks ties — the two rules land in one sort.",
            "zip(t, range(n)) 은 티어와 손님 번호를 짝지어요. 튜플은 앞에서부터 비교하니 티어가 먼저 정하고, 같으면 번호가 작은 사람이 앞 — 규칙 두 개가 정렬 한 번에 들어가요."),
        t(E, "order[:m] is 'the first m in line'. Slicing does the counting for us — no need to track how many gifts are left.",
            "order[:m] 이 '줄 앞에서 m 명' 이에요. 슬라이싱이 세는 일을 대신해 줘서, 선물이 몇 개 남았는지 따로 셀 필요가 없어요."),
        t(E, "x[i] = 1 writes the mark at the guest's own spot, so printing x gives guest order for free.",
            "x[i] = 1 은 그 손님의 원래 자리에 표시를 남겨요. 그래서 x 를 그냥 출력하면 손님 번호 순이 저절로 맞아요."),
      ],
      pyOnly: [
        t(E, "for _, i in order[:m] — the _ means 'we do not need the tier here, only the guest number'.",
            "for _, i in order[:m] 에서 _ 는 '여기선 티어는 안 쓰고 손님 번호만 쓴다' 는 뜻이에요."),
        t(E, "print(*x) prints the list separated by spaces — same as ' '.join(map(str, x)).",
            "print(*x) 는 리스트를 공백으로 띄워 출력해요 — ' '.join(map(str, x)) 와 같아요."),
      ],
    },
  ];
}

export function GiftsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadGiftsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Gifts — Full Study Guide", "Gifts — 종합 풀이 노트");
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

