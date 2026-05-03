import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   getInterviewSections — 단계별 코드 + Python/C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const IV_INPUT_PY = [
  "import sys, heapq",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "times = list(map(int, input().split()))",
];
const IV_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, K;",
  "    cin >> N >> K;",
  "    vector<long long> times(N);",
  "    for (int i = 0; i < N; i++) cin >> times[i];",
];

const IV_SIMULATE_PY = [
  "# min-heap of (free_time, counter_id)",
  "heap = []",
  "for i in range(K):",
  "    heapq.heappush(heap, (times[i], i))",
  "",
  "# Cows K..N-2 take the next free counter",
  "for i in range(K, N - 1):",
  "    finish, counter = heapq.heappop(heap)",
  "    heapq.heappush(heap, (finish + times[i], counter))",
];
const IV_SIMULATE_CPP = [
  "    // min-heap: pair<free_time, counter_id>",
  "    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> heap;",
  "    for (int i = 0; i < K; i++) heap.push({times[i], i});",
  "",
  "    // Cows K..N-2 take next free counter",
  "    for (int i = K; i < N - 1; i++) {",
  "        auto [finish, counter] = heap.top(); heap.pop();",
  "        heap.push({finish + times[i], counter});",
  "    }",
];

const IV_OUTPUT_PY = [
  "# Bessie (cow N-1) could go to ANY counter with min free time",
  "min_free = heap[0][0]",
  "candidates = sorted(cid + 1 for ft, cid in heap if ft == min_free)",
  "",
  "print(len(candidates))",
  "print(' '.join(map(str, candidates)))",
];
const IV_OUTPUT_CPP = [
  "    // Bessie could go to ANY counter with min free time",
  "    long long min_free = heap.top().first;",
  "    vector<int> candidates;",
  "    while (!heap.empty()) {",
  "        auto [ft, cid] = heap.top(); heap.pop();",
  "        if (ft == min_free) candidates.push_back(cid + 1);",
  "    }",
  "    sort(candidates.begin(), candidates.end());",
  "",
  "    cout << candidates.size() << \"\\n\";",
  "    for (size_t i = 0; i < candidates.size(); i++)",
  "        cout << candidates[i] << \" \\n\"[i == candidates.size() - 1];",
  "    return 0;",
  "}",
];

const IV_FULL_PY = [...IV_INPUT_PY, "", ...IV_SIMULATE_PY, "", ...IV_OUTPUT_PY];
const IV_FULL_CPP = [...IV_INPUT_CPP, "", ...IV_SIMULATE_CPP, "", ...IV_OUTPUT_CPP];

export function getInterviewSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: IV_INPUT_PY, cpp: IV_INPUT_CPP,
      why: [
        t(E, "N cows lined up, K counters available. times[i] = how long cow i takes.", "N 마리 소 줄섬, K 개 카운터. times[i] = 소 i 가 걸리는 시간."),
        t(E, "First K cows immediately go to counters 0..K-1.", "처음 K 마리 소는 즉시 카운터 0..K-1 로."),
      ],
      pyOnly: [
        t(E, "import heapq for the priority queue (min-heap).", "import heapq 로 우선순위 큐 (min-heap)."),
      ],
      cppOnly: [
        t(E, "priority_queue with greater<> for min-heap (default is max-heap).", "priority_queue + greater<> 로 min-heap (기본은 max-heap)."),
        t(E, "long long for free times — could overflow with int if times are large.", "long long 사용 — int 면 overflow 위험."),
      ],
    },
    {
      label: t(E, "🐄 2. Simulate Cows K..N-2", "🐄 2. K..N-2 번째 소 시뮬"),
      color: "#16a34a",
      py: IV_SIMULATE_PY, cpp: IV_SIMULATE_CPP,
      why: [
        t(E, "Each remaining cow goes to the COUNTER THAT BECOMES FREE FIRST.", "남은 소들은 가장 먼저 비는 카운터로 감."),
        t(E, "Pop from min-heap → that's the next available counter (with its current finish time).", "min-heap 에서 pop → 다음 사용 가능 카운터 (현재 종료 시간 포함)."),
        t(E, "Push back: same counter, but new finish_time = old + cow's processing time.", "다시 push: 같은 카운터, 새 종료 시간 = 이전 + 이 소의 처리 시간."),
        t(E, "Stop BEFORE Bessie (cow N-1) — she's the question.", "Bessie (소 N-1) 직전에 멈춤 — 그녀가 우리 질문."),
      ],
      pyOnly: [
        t(E, "heapq.heappop / heappush — log K each.", "heapq.heappop / heappush — 각각 log K."),
      ],
      cppOnly: [
        t(E, "auto [a, b] = pair — C++17 structured bindings, like Python tuple unpacking.", "auto [a, b] = pair — C++17 structured bindings, Python 튜플 언패킹과 비슷."),
      ],
    },
    {
      label: t(E, "🎯 3. Bessie's Possible Counters", "🎯 3. Bessie 가 갈 수 있는 카운터들"),
      color: A,
      py: IV_OUTPUT_PY, cpp: IV_OUTPUT_CPP,
      why: [
        t(E, "After K..N-2 cows are processed, the heap shows current finish times of all K counters.", "K..N-2 소 처리 후, heap 에 K 개 카운터의 현재 종료 시간."),
        t(E, "Bessie goes to the EARLIEST FREE counter — but tied counters are all valid choices.", "Bessie 는 가장 먼저 비는 카운터로 — 동점이면 모두 유효 선택."),
        t(E, "Find min_free = heap[0][0]. Collect all counters with that exact free time.", "min_free = heap[0][0] 찾기. 그 시간과 일치하는 모든 카운터 수집."),
        t(E, "Output sorted (1-indexed): count + the counter list.", "정렬 출력 (1-indexed): 개수 + 카운터 목록."),
      ],
      pyOnly: [
        t(E, "Generator expression in sorted() — concise filter+map+sort in one line.", "sorted() 안 generator — filter+map+sort 한 줄."),
      ],
      cppOnly: [
        t(E, "Drain heap into vector to access all elements (heap iteration not direct).", "heap 을 vector 로 비우기 — heap 직접 iteration 안 됨."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: A,
      py: IV_FULL_PY, cpp: IV_FULL_CPP,
      why: [
        t(E, "Time: O(N log K). For N=2×10⁵, K=2×10⁵: ~3.5×10⁶ ops. Fast.", "시간: O(N log K). N=2×10⁵, K=2×10⁵: ~3.5×10⁶ 연산. 빠름."),
        t(E, "Space: O(K) for heap.", "공간: O(K) for heap."),
        t(E, "Insight: 'first idea' would simulate cow-by-cow with full counter scan — that'd be O(NK). Heap reduces K → log K per cow.", "통찰: '첫 아이디어' 는 매 소마다 K 카운터 스캔 — O(NK). Heap 으로 K → log K."),
      ],
    },
  ];
}


/* ProgressiveCode — vertical stack pattern */
export function InterviewProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`, `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ background: s.color, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 14, fontWeight: 800 }}>{s.label}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none", padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
                💡 {t(E, "Why this way?", "왜 이렇게?")}
              </div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span>
                  <span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>
                    {langLabel} {t(E, "specific:", "전용:")}
                  </div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              <CodeBlock lines={code} />
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* PDF helper functions (same as permutation) */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","join","sorted"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","priority_queue","greater","pair","sort"];

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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadInterviewPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Bessie's Interview — Full Study Guide", "🐄 Bessie의 인터뷰 — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #d1fae5; color: #065f46; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #d1fae5; border: 1.5px solid #6ee7b7; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 January Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "N cows queue up for K interview counters. Cow i takes time times[i] at any counter. When a counter becomes free, the next cow in line takes it. Bessie is the last cow (index N-1). Which counter(s) could she end up at?",
  "N 마리 소가 K 개 인터뷰 카운터에 줄섬. 소 i 는 어느 카운터에서든 times[i] 시간 걸림. 카운터가 비면 다음 소가 감. Bessie 는 마지막 소 (인덱스 N-1). 그녀가 갈 수 있는 카운터들은?")}</p>

<h3>${t(E, "Constraints", "제약")}</h3>
<p>1 ≤ K ≤ N ≤ 2×10⁵, 1 ≤ times[i] ≤ 10⁹.</p>

<h2>2. ${t(E, "First Idea: Simulation with Min-Heap", "첫 아이디어: Min-Heap 으로 시뮬")}</h2>
<div class="box">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "When the next cow arrives, she goes to the counter that becomes free SOONEST. Sounds like... a min-heap problem!",
        "다음 소가 도착할 때, 가장 빨리 비는 카운터로 감. min-heap 문제처럼 들림!")}
</div>
<p>${t(E,
  "Each entry in the heap = (free_time, counter_id). Pop the smallest free_time, push it back with new free_time = old + new cow's time.",
  "heap 의 각 항목 = (free_time, counter_id). 가장 작은 free_time pop, 새 free_time = 이전 + 새 소 시간으로 다시 push.")}</p>

<div class="box">
  <b>${t(E, "Tied counters = Bessie's choices", "동점 카운터 = Bessie 의 선택지")}</b>:
  ${t(E, "When multiple counters become free at the SAME time, Bessie could pick any. Output all of them sorted.",
        "여러 카운터가 같은 시간에 비면, Bessie 는 어느 것이든 선택 가능. 정렬해서 모두 출력.")}
</div>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(N log K) — N cows, each does heap pop+push (log K each).",
        "O(N log K) — N 소, 각각 heap pop+push (log K).")}
</div>

<h2>3. ${t(E, "Optimal Code (4 sections)", "최적 코드 (4 부분)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
