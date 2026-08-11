import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

// InnovationSim 은 sims.jsx 에 있음 — App 이 여기서 import 하므로 그대로 재노출.
export { InnovationSim } from "./sims";

/* ============================================================
   정답 코드 (MCC 2023 P3 Innovation — 그리디 + 정렬 + min-heap)
   답 = Σ(a+b over 고른 m장) + max(c+d among 고른 m장)
   c+d 오름차순 정렬 → 각 카드를 '마지막(c+d 최대)'으로 가정,
   그 앞의 a+b 상위 m-1개 합(min-heap)을 유지하며 best 갱신.
   ============================================================ */
const FULL_PY = [
  "import sys, heapq",
  "input = sys.stdin.readline",
  "n, m = map(int, input().split())",
  "cards = []",
  "for _ in range(n):",
  "    a, b, c, d = map(int, input().split())",
  "    cards.append((c + d, a + b))",
  "cards.sort()                       # c+d 오름차순",
  "heap = []                          # 앞쪽 a+b 상위 m-1개",
  "topsum = 0                         # 그 합",
  "best = 0                           # 정답",
  "for cd, ab in cards:",
  "    if len(heap) >= m - 1:",
  "        best = max(best, topsum + ab + cd)",
  "    heapq.heappush(heap, ab)",
  "    topsum += ab",
  "    if len(heap) > m - 1:",
  "        topsum -= heapq.heappop(heap)",
  "print(best)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <queue>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n, m; cin >> n >> m;",
  "    vector<pair<long long,long long>> card(n);     // (c+d, a+b)",
  "    for (int i = 0; i < n; i++) {",
  "        long long a, b, c, d; cin >> a >> b >> c >> d;",
  "        card[i] = { c + d, a + b };",
  "    }",
  "    sort(card.begin(), card.end());                // c+d 오름차순",
  "",
  "    priority_queue<long long, vector<long long>, greater<long long>> topAB; // a+b 상위 m-1개",
  "    long long sumTop = 0, best = 0;",
  "    for (int i = 0; i < n; i++) {",
  "        long long cd = card[i].first, ab = card[i].second;",
  "        if ((int)topAB.size() >= m - 1)",
  "            best = max(best, sumTop + ab + cd);",
  "        topAB.push(ab); sumTop += ab;",
  "        if ((int)topAB.size() > m - 1) { sumTop -= topAB.top(); topAB.pop(); }",
  "    }",
  "    cout << best << \"\\n\";",
  "}",
];

export function getInnovationSections(E) {
  return [
    {
      label: t(E, "📥 Read + Sort by c+d", "📥 읽기 + c+d 정렬"),
      color: A,
      py: FULL_PY.slice(0, 8),
      cpp: FULL_CPP.slice(0, 14),
      why: [
        t(E, "For each card we only ever need two totals: a+b (always visible) and c+d (visible only if this card is last).",
            "카드마다 필요한 건 두 합뿐이에요: a+b (항상 보임), c+d (이 카드가 마지막일 때만 보임)."),
        t(E, "Store each card as (c+d, a+b) and sort by c+d ascending. Then any card, together with the cards before it, can be its group's 'last (largest c+d)' card.",
            "각 카드를 (c+d, a+b) 로 저장하고 c+d 오름차순 정렬. 그러면 어떤 카드든 그 앞의 카드들과 함께 '마지막(c+d 최대)' 카드가 될 수 있어요."),
      ],
      pyOnly: [
        t(E, "sys.stdin.readline speeds up reading when n is up to 20000.",
            "n 이 최대 20000 이라 sys.stdin.readline 으로 입력 가속."),
      ],
      cppOnly: [
        t(E, "pair sorts by .first (c+d) automatically. Use long long — values reach 10^9.",
            "pair 는 .first(c+d) 기준으로 자동 정렬. 값이 10^9 까지라 long long 사용."),
      ],
    },
    {
      label: t(E, "🗂️ Keep top m−1 of a+b", "🗂️ a+b 상위 m−1개 유지"),
      color: A,
      py: FULL_PY.slice(8, 11),
      cpp: FULL_CPP.slice(14, 17),
      why: [
        t(E, "A min-heap holds the a+b of the best m−1 cards seen so far; topsum is their sum; best is the running answer.",
            "min-heap 은 지금까지 본 카드 중 a+b 상위 m−1개를 담고, topsum 은 그 합, best 는 정답이에요."),
        t(E, "Keeping only m−1 leaves one slot for the 'special last card' we add next.",
            "m−1개만 유지하는 건, 다음에 더할 '특별한 마지막 카드' 자리 하나를 비워두는 거예요."),
      ],
      pyOnly: [
        t(E, "heapq is a min-heap, so heap[0] / heappop remove the smallest a+b — exactly what we discard.",
            "heapq 는 min-heap 이라 heappop 이 가장 작은 a+b 를 빼요 — 우리가 버릴 것과 정확히 일치."),
      ],
      cppOnly: [
        t(E, "greater<> turns priority_queue into a min-heap so top()/pop() drop the smallest a+b.",
            "greater<> 로 priority_queue 를 min-heap 으로 만들면 top()/pop() 이 가장 작은 a+b 를 버림."),
      ],
    },
    {
      label: t(E, "🎯 Try each card as the last one", "🎯 각 카드를 마지막 장으로"),
      color: A,
      py: FULL_PY.slice(11),
      cpp: FULL_CPP.slice(17),
      why: [
        t(E, "Walk cards in c+d order. Once we have m−1 candidates in front, using this card as the last gives: topsum (m−1 best a+b) + this card's a+b + its c+d.",
            "c+d 순서로 카드를 훑어요. 앞에 후보 m−1개가 있으면, 이 카드를 마지막으로 두면: topsum(상위 m−1개 a+b) + 이 카드 a+b + 이 카드 c+d."),
        t(E, "Then push this card's a+b into the pool and, if it now exceeds m−1, drop the smallest — the pool always stays the best m−1.",
            "그다음 이 카드의 a+b 를 풀에 넣고, m−1개를 넘으면 가장 작은 걸 버려요 — 풀은 항상 상위 m−1개 유지."),
        t(E, "m = 1 works too: with 0 candidates, every card alone gives a+b+c+d, so best = max single card.",
            "m = 1 도 자동 처리: 후보 0개라 각 카드 혼자 a+b+c+d → best = 카드 하나 최댓값."),
      ],
      pyOnly: [
        t(E, "The whole loop is O(n log n) from the heap operations — fast for n ≤ 20000.",
            "heap 연산으로 전체가 O(n log n) — n ≤ 20000 에 충분히 빠름."),
      ],
      cppOnly: [
        t(E, "One linear pass with O(log n) heap ops per card = O(n log n) total.",
            "카드마다 O(log n) heap 연산의 선형 패스 = 전체 O(n log n)."),
      ],
    },
  ];
}

// CodeWalk — 코드 줄에 붙는 말풍선 (선생님 규칙). 3섹션이 하나의 연속 프로그램이라 그대로 이어 붙임.
const _INNO_VARS = [
  { v: "n", ko: "카드 수", en: "# of cards" },
  { v: "m", ko: "고를 카드 수", en: "cards to choose" },
  { v: "cards", ko: "(c+d, a+b) 목록", en: "list of (c+d, a+b)" },
  { v: "best", ko: "최대 보이는 합(답)", en: "max visible sum (answer)" },
];
export function getInnovationWalk(E, lang = "py") {
  const s = getInnovationSections(E);
  if (lang === "cpp") {
    const code = [...s[0].cpp, ...s[1].cpp, ...s[2].cpp];
    // s0=14 (0-13), s1=3 (14-16), s2=9 (17-25)
    return { code, vars: _INNO_VARS, beats: [
      { hi: [0, 13],  bubble: t(E, "Read each card and keep just two totals: (c+d, a+b). Sort by c+d ascending so any card can act as the 'last (largest c+d)' one.", "카드마다 두 합 (c+d, a+b) 만 저장. c+d 오름차순 정렬해서, 어떤 카드든 '마지막(c+d 최대)' 역할을 할 수 있게 해요.") },
      { hi: [14, 16], bubble: t(E, "Prepare a min-heap holding the top m−1 a+b values, their sum sumTop, and the running answer best.", "a+b 상위 m−1개를 담는 min-heap, 그 합 sumTop, 정답 best 를 준비해요.") },
      { hi: [17, 20], bubble: t(E, "For each card, if m−1 candidates are already in front, use THIS card as the special last one: sumTop + this a+b + this c+d. Update best.", "각 카드마다, 앞에 후보 m−1개가 있으면 이 카드를 특별한 마지막 장으로: sumTop + 이 a+b + 이 c+d. best 갱신.") },
      { hi: [21, 25], bubble: t(E, "Push this card's a+b into the pool; if the pool grows past m−1, drop the smallest so it always keeps the best m−1. Finally print best.", "이 카드의 a+b 를 풀에 넣고, m−1개를 넘으면 가장 작은 걸 버려 항상 상위 m−1개 유지. 마지막에 best 출력.") },
    ] };
  }
  const code = [...s[0].py, ...s[1].py, ...s[2].py];
  // s0=8 (0-7), s1=3 (8-10), s2=8 (11-18)
  return { code, vars: _INNO_VARS, beats: [
    { hi: [0, 7],   bubble: t(E, "Read each card and keep just two totals: (c+d, a+b). Sort by c+d ascending so any card can act as the 'last (largest c+d)' one.", "카드마다 두 합 (c+d, a+b) 만 저장. c+d 오름차순 정렬해서, 어떤 카드든 '마지막(c+d 최대)' 역할을 할 수 있게 해요.") },
    { hi: [8, 10],  bubble: t(E, "Prepare a min-heap holding the top m−1 a+b values, their sum topsum, and the running answer best.", "a+b 상위 m−1개를 담는 min-heap, 그 합 topsum, 정답 best 를 준비해요.") },
    { hi: [11, 13], bubble: t(E, "For each card, if m−1 candidates are already in front, use THIS card as the special last one: topsum + this a+b + this c+d. Update best.", "각 카드마다, 앞에 후보 m−1개가 있으면 이 카드를 특별한 마지막 장으로: topsum + 이 a+b + 이 c+d. best 갱신.") },
    { hi: [14, 18], bubble: t(E, "Push this card's a+b into the pool; if the pool grows past m−1, drop the smallest so it always keeps the best m−1. Finally print best.", "이 카드의 a+b 를 풀에 넣고, m−1개를 넘으면 가장 작은 걸 버려 항상 상위 m−1개 유지. 마지막에 best 출력.") },
  ] };
}

export function InnovationProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","heapq"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","queue","priority_queue","greater"];
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


export function downloadInnovationPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Innovation — Full Study Guide", "Innovation — 종합 풀이 노트");
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
  .hint { background: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #1e3a8a; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC 2023 P3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
