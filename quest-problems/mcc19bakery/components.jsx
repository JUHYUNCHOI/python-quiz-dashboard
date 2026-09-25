import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

const FULL_PY = [
  "import collections",
  "",
  "N = int(input())",
  "prices = list(map(int, input().split()))",
  "",
  "# 작은 것 -> 큰 것 순서라 back() 이 제일 비싸고 front() 가 제일 싸요",
  "prices.sort()",
  "dq = collections.deque(prices)",
  "",
  "pay = 0",
  "while dq:",
  "    pay += dq.pop()      # 제일 비싼 것 -> 지불",
  "    pay += dq.pop()      # 2 번째로 비싼 것 -> 지불",
  "    dq.pop()             # 3 번째로 비싼 것 -> 무료",
  "    pay += dq.popleft()  # 남은 것 중 제일 싼 것 -> 지불",
  "",
  "print(pay)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <deque>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    deque<int> dq(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> dq[i];",
  "    }",
  "",
  "    sort(dq.begin(), dq.end());   // 오름차순",
  "",
  "    long long pay = 0;",
  "    while (!dq.empty()) {",
  "        pay += dq.back();  // 제일 비싼 것",
  "        dq.pop_back();",
  "        pay += dq.back();  // 2 번째로 비싼 것",
  "        dq.pop_back();",
  "        dq.pop_back();                      // 3 번째로 비싼 것 -> 무료",
  "        pay += dq.front();  // 남은 것 중 제일 싼 것",
  "        dq.pop_front();",
  "    }",
  "    cout << pay << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMcc19BakerySections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Sort ascending and hold the prices in a deque so both ends are cheap to reach: the back is the most expensive, the front is the cheapest.",
            "오름차순으로 정렬해 덱에 담으면 양끝을 빠르게 꺼낼 수 있어요. 뒤쪽은 제일 비싼 것, 앞쪽은 제일 싼 것이에요."),
        t(E, "Each round takes 4 breads: pay the two most-expensive, let the 3rd-most-expensive be FREE, then spend the CHEAPEST remaining as the last pay-slot.",
            "한 묶음에 빵이 4 개예요. 제일 비싼 두 개를 지불하고, 세 번째로 비싼 것을 무료로 받고, 남은 것 중 제일 싼 것을 마지막 지불 자리로 써요."),
        t(E, "Why pair the cheapest with expensive ones? Only the 2nd-cheapest of a batch is free. Pairing a cheap bread as a pay-slot lets the free slot land on a pricier bread — naive 'chop into blocks of 4' wastes a cheap bread there and pays 36 instead of 35 on the sample.",
            "왜 싼 것을 비싼 것과 짝지을까요? 묶음에서 무료가 되는 건 2 번째로 싼 것뿐이에요. 그래서 싼 빵을 지불 자리로 쓰면 무료 자리가 더 비싼 빵에 떨어져요. 그냥 '4 개씩 자르기' 는 무료 자리를 싼 빵에 써 버려서 예제에서 35 대신 36 을 지불해요."),
      ],
      pyOnly: [
        t(E, "collections.deque lets you take from the right cheaply and popleft() from the left.",
            "collections.deque 는 오른쪽 pop() 과 왼쪽 popleft() 로 양끝을 바로 꺼내요. 안에 몇 개가 들어 있든 한 번에 꺼내져요."),
      ],
      cppOnly: [
        t(E, "std::deque lets you look at and remove from both ends cheaply - back()/pop_back() and front()/pop_front().",
            "std::deque 는 back()/pop_back() 과 front()/pop_front() 로 양끝을 바로 꺼내요. 안에 몇 개가 들어 있든 한 번에 꺼내져요."),
        t(E, "Use long long for pay — many breads with large prices can exceed the int range.",
            "합계 pay 는 long long 으로 둬요. 빵이 많고 가격이 크면 int 범위를 넘을 수 있어요."),
      ],
    },
  ];
}

export function Mcc19BakeryProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). FULL_PY 는 표시용 배열이다 — 내용은 절대 바꾸지 않고, 그대로 가져와
   beats(설명 말풍선)만 덧붙인다. MCC 는 C++ 이 없다 — py 만 만든다. ── */
export function getMcc19BakeryWalk(E) {
  return {
    code: FULL_PY,
    vars: [
      { v: "dq", ko: "가격 오름차순 덱 (뒤=비쌈, 앞=쌈)", en: "prices in a deque (back=priciest, front=cheapest)" },
      { v: "pay", ko: "지금까지 낸 금액", en: "amount paid so far" },
    ],
    beats: [
      { hi: [0, 3], bubble: t(E,
        "What do we need to find? The least total we can pay, grouping breads 4 at a time. Read N and the prices.",
        "무엇을 내놓아야 하나요? 빵을 4 개씩 묶어 낼 때 낼 수 있는 최소 금액이에요.\nN 과 가격들을 읽어요.") },
      { hi: [5, 7], bubble: t(E,
        "Sort and hold the prices in a deque, so both ends are cheap to grab — the back is the priciest, the front is the cheapest.",
        "정렬해서 덱에 담아요 — 양끝을 바로 꺼낼 수 있어요. 뒤쪽이 제일 비싼 빵, 앞쪽이 제일 싼 빵이에요.") },
      { hi: [9, 14], bubble: t(E,
        "Each group of 4: pay the two priciest, let the 3rd-priciest be FREE, then pay the cheapest one left over — that way the free slot lands on an expensive bread instead of a cheap one.",
        "네 개씩 묶어요. 제일 비싼 두 개는 값을 내고, 세 번째로 비싼 것은 무료로 받고,\n남은 것 중 제일 싼 것을 마지막 지불 자리로 써요.\n그래야 무료 자리가 싼 빵이 아니라 비싼 빵에 떨어져요.") },
      { hi: [16, 16], bubble: t(E,
        "Once every group is done, print the total paid.",
        "모든 묶음을 다 처리했으면, 낸 금액을 출력해요.") },
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


export function downloadMcc19BakeryPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Bakery — Full Study Guide", "Mcc19Bakery — 종합 풀이 노트");
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

