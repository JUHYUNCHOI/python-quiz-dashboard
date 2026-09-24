import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { MobileSim } from "./sims";

const A = "#d97706";

/* ═══════════════════════════════════════════════════════════════
   MobileGameSim — App 이 import 하는 이름 유지. 실제 시뮬은 sims.jsx.
   (예전 '점수 합' 시뮬은 잘못된 문제였음 → 올바른 그리디 시뮬로 교체)
   ═══════════════════════════════════════════════════════════════ */
export function MobileGameSim(props) {
  return <MobileSim {...props} />;
}

/* ═══════════════════════════════════════════════════════════════
   SOLUTION CODE — 그리디 + max-heap (usaco/mcc 검증된 접근)
   Alice 파워는 커지기만 → 매번 '먹을 수 있는 가장 큰 적'을 먹으면 최소 처치.
   ═══════════════════════════════════════════════════════════════ */
const FULL_PY = [
  "import heapq",
  "T = int(input())",
  "for _ in range(T):",
  "    N, A, B = map(int, input().split())",
  "    p = sorted(map(int, input().split()))",
  "    heap = []          # 먹을 수 있는 적 (max-heap: -값 저장)",
  "    ptr = 0",
  "    kills = 0",
  "    cur = A",
  "    while cur < B:",
  "        while ptr < N and p[ptr] < cur:   # 지금 먹을 수 있는 적 넣기",
  "            heapq.heappush(heap, -p[ptr])",
  "            ptr += 1",
  "        if not heap:",
  "            break                          # 더 먹을 적이 없음",
  "        cur += -heapq.heappop(heap)        # 가장 큰 적을 먹어 최대 성장",
  "        kills += 1",
  "    if cur >= B:",
  "        print(kills)",
  "    else:",
  "        print(-1)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <queue>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        long long N, A, B;",
  "        cin >> N >> A >> B;",
  "        vector<long long> p(N);",
  "        for (auto& x : p) {",
  "            cin >> x;",
  "        }",
  "        sort(p.begin(), p.end());            // 파워 오름차순",
  "",
  "        priority_queue<long long> pq;         // 먹을 수 있는 적 (max-heap)",
  "        int ptr = 0;",
  "        int kills = 0;",
  "        long long cur = A;",
  "        while (cur < B) {",
  "            while (ptr < N && p[ptr] < cur) {",
  "                pq.push(p[ptr]);",
  "                ptr++;",
  "            }",
  "            if (pq.empty()) {",
  "                break;            // 더 먹을 적이 없음",
  "            }",
  "            cur += pq.top();  // 가장 큰 적을 먹어 최대 성장",
  "            pq.pop();",
  "            kills++;",
  "        }",
  "        if (cur >= B) {",
  "            cout << kills << \"\\n\";",
  "        } else {",
  "            cout << -1 << \"\\n\";",
  "        }",
  "    }",
  "}",
];

export function getMobileGameSections(E) {
  return [
    {
      label: t(E, "🎯 Greedy + max-heap", "🎯 그리디 + 최대힙"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Alice's power only grows, so the set of beatable enemies only grows too — eating the biggest beatable enemy each time gives the fewest kills.",
            "Alice 파워는 커지기만 하니 먹을 수 있는 적도 늘기만 해요.\n가장 큰 적을 먹으면 파워가 제일 많이 오르고, 아까 먹을 수 있던 적도 그대로 남아요.\n그래서 매번 가장 큰 적을 먹는 게 처치 수가 가장 적어요."),
        t(E, "Sort enemies, push each one that becomes beatable (p < cur) into a max-heap, then pop the biggest to eat.",
            "적을 정렬하고, 먹을 수 있게 된(p < cur) 적을 최대힙에 넣은 뒤, 가장 큰 것을 꺼내 먹어요."),
        t(E, "Strictly less (p < cur): equal power can't be beaten. Stop and print -1 when the heap is empty but power < B.",
            "파워가 같으면 못 먹어요. p < cur 여야 해요.\n힙이 비었는데 파워가 B 보다 작으면 멈추고 -1 을 출력해요."),
      ],
      pyOnly: [
        t(E, "Python's heapq is a min-heap, so store -p to pop the largest. sorted() gives ascending powers.",
            "파이썬 heapq 는 최소힙이라 -p 로 넣어 가장 큰 걸 꺼내요.\nsorted() 로 파워를 오름차순으로 놓아요."),
      ],
      cppOnly: [
        t(E, "priority_queue<long long> is a max-heap by default — pq.top() is the biggest. Use long long since powers add up.",
            "priority_queue<long long> 는 기본이 최대힙이라 pq.top() 이 가장 커요.\n파워가 쌓이니 long long 을 써요."),
      ],
    },
  ];
}

/* CodeWalk 용 — 코드 줄에 붙는 스텝별 설명 말풍선 (해요체) */
const _MG_VARS = [
  { v: "cur", ko: "지금 Alice 파워", en: "Alice's current power" },
  { v: "B", ko: "목표 파워", en: "goal power" },
  { v: "p", ko: "적 파워들 (정렬됨)", en: "enemy powers (sorted)" },
  { v: "heap / pq", ko: "먹을 수 있는 적 (최대)", en: "beatable enemies (max)" },
  { v: "kills", ko: "처치 수 = 답", en: "kills = answer" },
];

export function getMobileGameWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP, vars: _MG_VARS, beats: [
        { hi: [0, 17], bubble: t(E,
          "What do we need to find? The fewest kills to reach power B (or -1 if it can't be done).\nSo first we have to decide which enemy to eat each time.\nRead T, N, A, B and the enemy powers, then sort them ascending.",
          "무엇을 구해야 하나요?\n목표 B 에 닿는 최소 처치 수예요 (안 되면 -1).\n그러니 매번 어떤 적을 먹을지부터 정해야 해요.\nT·N·A·B 와 적 파워를 읽고 오름차순으로 정렬해요.") },
        { hi: [19, 22], bubble: t(E,
          "Eating the biggest beatable enemy grows power the most.\nSo we need to grab 'the biggest beatable enemy' quickly — a max-heap.\npq is that heap; cur is the current power, starting at A.",
          "먹을 수 있는 적 중 가장 큰 걸 먹어야 파워가 제일 많이 늘어요.\n그래서 '지금 먹을 수 있는 것 중 제일 큰 적' 을 빠르게 꺼낼 도구가 필요해요 — 최대힙이에요.\npq 가 그 힙이고, cur 는 지금 파워예요 (A 로 시작해요).") },
        { hi: [23, 27], bubble: t(E,
          "As power grows, more enemies become beatable.\nSo each time through the loop, push every enemy weaker than cur into the heap first.",
          "파워가 오를 때마다 새로 먹을 수 있는 적이 생겨요.\n그래서 돌 때마다 cur 보다 약한 적을 먼저 힙에 채워 넣어요.") },
        { hi: [28, 34], bubble: t(E,
          "Empty heap means nothing left to eat — stop there.\nOtherwise eat the biggest (pq.top) to grow the most, and count one kill.",
          "힙이 비었으면 더 먹을 적이 없다는 뜻이에요 — 거기서 멈춰요.\n아니면 가장 큰 적(pq.top)을 먹어 파워를 최대로 올리고, 처치 하나를 세요.") },
        { hi: [35, 39], bubble: t(E,
          "Repeat until power reaches B — print kills. Never reaches it — print -1.",
          "이렇게 반복해 B 에 닿았으면 kills, 끝내 못 닿았으면 -1 을 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY, vars: _MG_VARS, beats: [
      { hi: [0, 4], bubble: t(E,
        "What do we need to find? The fewest kills to reach power B (or -1 if it can't be done).\nSo first we have to decide which enemy to eat each time.\nRead T, N, A, B and the enemy powers, then sort them ascending.",
        "무엇을 구해야 하나요?\n목표 B 에 닿는 최소 처치 수예요 (안 되면 -1).\n그러니 매번 어떤 적을 먹을지부터 정해야 해요.\nT·N·A·B 와 적 파워를 읽고 오름차순으로 정렬해요.") },
      { hi: [5, 8], bubble: t(E,
        "Eating the biggest beatable enemy grows power the most.\nPython's heapq is a min-heap, so store -p to pop the largest.\nptr, kills, and cur (starting at A) track the rest.",
        "먹을 수 있는 적 중 가장 큰 걸 먹어야 파워가 제일 많이 늘어요.\nheapq 는 최소힙이라 -p 로 넣어야 가장 큰 걸 꺼낼 수 있어요.\nptr, kills, cur(=A) 도 같이 준비해요.") },
      { hi: [9, 12], bubble: t(E,
        "As power grows, more enemies become beatable.\nSo each time through the loop, push every enemy weaker than cur into the heap first.",
        "파워가 오를 때마다 새로 먹을 수 있는 적이 생겨요.\n그래서 돌 때마다 cur 보다 약한 적을 먼저 힙에 채워 넣어요.") },
      { hi: [13, 16], bubble: t(E,
        "Empty heap means nothing left to eat — stop there.\nOtherwise eat the biggest to grow the most, and count one kill.",
        "힙이 비었으면 더 먹을 적이 없다는 뜻이에요 — 거기서 멈춰요.\n아니면 가장 큰 적을 먹어 파워를 최대로 올리고, 처치 하나를 세요.") },
      { hi: [17, 20], bubble: t(E,
        "Repeat until power reaches B — print kills. Never reaches it — print -1.",
        "이렇게 반복해 B 에 닿았으면 kills, 끝내 못 닿았으면 -1 을 출력해요.") },
    ],
  };
}

export function MobileGameProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs","heapq"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","queue","priority_queue","to_string"];
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


export function downloadMobileGamePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mobile Game — Full Study Guide", "Mobile Game — 종합 풀이 노트");
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 고르세요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC 2023 P2 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
