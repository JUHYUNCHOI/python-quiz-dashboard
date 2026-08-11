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
  "import sys, heapq",
  "input = sys.stdin.readline",
  "",
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
  "    print(kills if cur >= B else -1)",
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
  "    int T; cin >> T;",
  "    while (T--) {",
  "        long long N, A, B;",
  "        cin >> N >> A >> B;",
  "        vector<long long> p(N);",
  "        for (auto& x : p) cin >> x;",
  "        sort(p.begin(), p.end());            // 파워 오름차순",
  "",
  "        priority_queue<long long> pq;         // 먹을 수 있는 적 (max-heap)",
  "        int ptr = 0, kills = 0;",
  "        long long cur = A;",
  "        while (cur < B) {",
  "            while (ptr < N && p[ptr] < cur) { pq.push(p[ptr]); ptr++; }",
  "            if (pq.empty()) break;            // 더 먹을 적이 없음",
  "            cur += pq.top(); pq.pop();        // 가장 큰 적을 먹어 최대 성장",
  "            kills++;",
  "        }",
  "        cout << (cur >= B ? to_string(kills) : string(\"-1\")) << \"\\n\";",
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
            "Alice 파워는 커지기만 하니 먹을 수 있는 적도 늘기만 해요 — 매번 가장 큰 적을 먹으면 최소 처치."),
        t(E, "Sort enemies, push each one that becomes beatable (p < cur) into a max-heap, then pop the biggest to eat.",
            "적을 정렬하고, 먹을 수 있게 된(p < cur) 적을 최대힙에 넣은 뒤, 가장 큰 것을 꺼내 먹어요."),
        t(E, "Strictly less (p < cur): equal power can't be beaten. Stop and print -1 when the heap is empty but power < B.",
            "strictly less (p < cur): 같은 파워는 못 먹어요. 힙이 비었는데 파워 < B 면 멈추고 -1 출력."),
      ],
      pyOnly: [
        t(E, "Python's heapq is a min-heap, so store -p to pop the largest. sorted() gives ascending powers.",
            "파이썬 heapq 는 최소힙이라 -p 로 넣어 가장 큰 걸 꺼내요. sorted() 로 파워 오름차순."),
      ],
      cppOnly: [
        t(E, "priority_queue<long long> is a max-heap by default — pq.top() is the biggest. Use long long since powers add up.",
            "priority_queue<long long> 는 기본이 최대힙 — pq.top() 이 가장 큼. 파워가 쌓이니 long long."),
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
        { hi: [0, 14], bubble: t(E,
          "For each of T tests, read N, A, B (enemy count · start power · goal) and the enemy powers, then sort the powers ascending.",
          "T개 테스트마다 N·A·B(적 수·시작 파워·목표)와 적 파워들을 읽고, 파워를 오름차순으로 정렬해요.") },
        { hi: [16, 18], bubble: t(E,
          "pq = beatable enemies as a max-heap. ptr = how far we've added, kills = kill count, cur = current power (starts at A).",
          "pq = 먹을 수 있는 적(최대힙). ptr = 어디까지 후보에 넣었나, kills = 처치 수, cur = 지금 파워(A로 시작).") },
        { hi: [19, 20], bubble: t(E,
          "While power is below the goal: first push every enemy weaker than cur (p[ptr] < cur) into the heap.",
          "파워가 목표에 못 미치는 동안: 먼저 지금 파워보다 약한 적(p[ptr] < cur)을 전부 힙에 넣어요.") },
        { hi: [21, 24], bubble: t(E,
          "If none are beatable, stop. Otherwise eat the biggest (pq.top) to grow the most, and count one kill.",
          "먹을 적이 없으면 멈춰요. 있으면 가장 큰 적(pq.top)을 먹어 최대로 성장하고, 처치 하나 세요.") },
        { hi: [25, 25], bubble: t(E,
          "Reached B → print kills. Never reached it → print -1.",
          "목표 B 에 닿았으면 kills, 끝내 못 닿았으면 -1 을 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY, vars: _MG_VARS, beats: [
      { hi: [0, 6], bubble: t(E,
        "For each of T tests, read N, A, B (enemy count · start power · goal) and the enemy powers, then sort the powers ascending.",
        "T개 테스트마다 N·A·B(적 수·시작 파워·목표)와 적 파워들을 읽고, 파워를 오름차순으로 정렬해요.") },
      { hi: [7, 10], bubble: t(E,
        "heap = beatable enemies (Python's heapq is a min-heap, so store -p to pop the largest). ptr, kills, and cur (starts at A).",
        "heap = 먹을 수 있는 적(파이썬 heapq 는 최소힙이라 -p 로 넣어 가장 큰 걸 꺼냄). ptr, kills, cur(A로 시작).") },
      { hi: [11, 14], bubble: t(E,
        "While power is below the goal: first push every enemy weaker than cur (p[ptr] < cur) into the heap.",
        "파워가 목표에 못 미치는 동안: 먼저 지금 파워보다 약한 적(p[ptr] < cur)을 전부 힙에 넣어요.") },
      { hi: [15, 18], bubble: t(E,
        "If none are beatable, stop. Otherwise eat the biggest to grow the most, and count one kill.",
        "먹을 적이 없으면 멈춰요. 있으면 가장 큰 적을 먹어 최대로 성장하고, 처치 하나 세요.") },
      { hi: [19, 19], bubble: t(E,
        "Reached B → print kills. Never reached it → print -1.",
        "목표 B 에 닿았으면 kills, 끝내 못 닿았으면 -1 을 출력해요.") },
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
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
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
