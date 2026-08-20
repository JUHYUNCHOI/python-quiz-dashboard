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
  "# small -> big, so back() is most expensive, front() is cheapest",
  "prices.sort()",
  "dq = collections.deque(prices)",
  "",
  "pay = 0",
  "while dq:",
  "    pay += dq.pop()      # most expensive  -> pay",
  "    pay += dq.pop()      # 2nd most expensive -> pay",
  "    dq.pop()             # 3rd most expensive -> FREE",
  "    pay += dq.popleft()  # cheapest remaining -> pay",
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
  "    int N; cin >> N;",
  "    deque<int> dq(N);",
  "    for (int i = 0; i < N; i++) cin >> dq[i];",
  "",
  "    sort(dq.begin(), dq.end());   // ascending",
  "",
  "    long long pay = 0;",
  "    while (!dq.empty()) {",
  "        pay += dq.back();  dq.pop_back();   // most expensive",
  "        pay += dq.back();  dq.pop_back();   // 2nd most expensive",
  "        dq.pop_back();                      // 3rd most expensive -> FREE",
  "        pay += dq.front(); dq.pop_front();  // cheapest remaining",
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
            "오름차순 정렬 후 덱에 담아 양끝을 빠르게 써요: 뒤쪽은 제일 비싼 것, 앞쪽은 제일 싼 것."),
        t(E, "Each round takes 4 breads: pay the two most-expensive, let the 3rd-most-expensive be FREE, then spend the CHEAPEST remaining as the last pay-slot.",
            "한 라운드에 빵 4 개: 제일 비싼 두 개를 지불하고, 세 번째로 비싼 것을 무료로, 남은 것 중 제일 싼 것을 마지막 지불 자리로 써요."),
        t(E, "Why pair the cheapest with expensive ones? Only the 2nd-cheapest of a batch is free. Pairing a cheap bread as a pay-slot lets the free slot land on a pricier bread — naive 'chop into blocks of 4' wastes a cheap bread there and pays 36 instead of 35 on the sample.",
            "왜 싼 것을 비싼 것과 짝지을까? 묶음에서 무료는 2 번째로 싼 것뿐이에요. 싼 빵을 지불 자리로 쓰면 무료 자리가 더 비싼 빵에 떨어져요 — 그냥 '4 개씩 자르기' 는 싼 빵을 거기에 낭비해서 예제에서 35 대신 36 을 지불해요."),
      ],
      pyOnly: [
        t(E, "collections.deque gives O(1) pop() from the right and popleft() from the left.",
            "collections.deque 는 오른쪽 pop() 과 왼쪽 popleft() 가 모두 O(1) 이에요."),
      ],
      cppOnly: [
        t(E, "std::deque supports back()/pop_back() and front()/pop_front() in O(1) each.",
            "std::deque 는 back()/pop_back() 과 front()/pop_front() 가 각각 O(1) 이에요."),
        t(E, "Use long long for pay — many breads with large prices can exceed the int range.",
            "합계 pay 는 long long 으로 — 빵이 많고 가격이 크면 int 범위를 넘을 수 있어요."),
      ],
    },
  ];
}

export function Mcc19BakeryProgressiveCode(props) {
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


export function downloadMcc19BakeryPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
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

