import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ───────────────── Deep-audit BFS simulator ─────────────────
   Fluffy hops through a 4x4 building grid via BFS.
   Step-by-step: queue pops a cell, paints visited, enqueues adjacent buildings.
   ──────────────────────────────────────────────────────────── */
const SIM_GRID = [
  [1, 1, 0, 1],
  [0, 1, 0, 1],
  [1, 1, 1, 1],
  [1, 0, 0, 0],
];
const SIM_START = [0, 0];

function buildBfsTrace(grid, start) {
  const R = grid.length, C = grid[0].length;
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const [sr, sc] = start;
  visited[sr][sc] = true;
  const queue = [[sr, sc]];
  const trace = [];
  trace.push({
    queue: [...queue],
    visited: visited.map(r => [...r]),
    popped: null,
    enqueued: [],
    count: 1,
    note: { en: "Start. Push start cell, mark visited, count = 1.", ko: "시작. 출발 칸 push, 방문 표시, count = 1." },
  });
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (queue.length) {
    const [r, c] = queue.shift();
    const enqueued = [];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < R && nc >= 0 && nc < C && !visited[nr][nc] && grid[nr][nc] === 1) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
        enqueued.push([nr, nc]);
      }
    }
    const count = visited.flat().filter(Boolean).length;
    trace.push({
      queue: [...queue],
      visited: visited.map(r => [...r]),
      popped: [r, c],
      enqueued,
      count,
      note: enqueued.length
        ? { en: `Pop (${r},${c}). Enqueue ${enqueued.length} new building(s). count = ${count}.`,
            ko: `(${r},${c}) pop. 새 건물 ${enqueued.length}개 enqueue. count = ${count}.` }
        : { en: `Pop (${r},${c}). No new neighbours. count = ${count}.`,
            ko: `(${r},${c}) pop. 새 이웃 없음. count = ${count}.` },
    });
  }
  return trace;
}

export function Mcc20CityTourBfsSim({ E }) {
  const trace = useMemo(() => buildBfsTrace(SIM_GRID, SIM_START), []);
  const [step, setStep] = useState(0);
  const cur = trace[step];
  const R = SIM_GRID.length, Cn = SIM_GRID[0].length;

  const cellStyle = (r, c) => {
    const isBuilding = SIM_GRID[r][c] === 1;
    const visited = cur.visited[r][c];
    const isPopped = cur.popped && cur.popped[0] === r && cur.popped[1] === c;
    const isEnqueued = cur.enqueued.some(([er, ec]) => er === r && ec === c);
    let bg = isBuilding ? "#fef3c7" : "#f3f4f6";
    let border = isBuilding ? "#fcd34d" : "#e5e7eb";
    let color = isBuilding ? "#92400e" : "#9ca3af";
    if (visited) { bg = "#fde68a"; border = A; color = "#78350f"; }
    if (isEnqueued) { bg = "#a7f3d0"; border = "#15803d"; }
    if (isPopped) { bg = A; border = "#78350f"; color = "#fff"; }
    return {
      width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
      background: bg, border: `2px solid ${border}`, borderRadius: 6,
      color, fontWeight: 700, fontSize: 14,
      transition: "background 180ms, border-color 180ms",
    };
  };

  const cellLabel = (r, c) => {
    const isPopped = cur.popped && cur.popped[0] === r && cur.popped[1] === c;
    if (isPopped) return "🐰";
    if (SIM_GRID[r][c] === 1) return cur.visited[r][c] ? "✓" : "1";
    return "·";
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
          🐰 {t(E, "Fluffy's BFS hop-by-hop", "Fluffy 의 BFS 한 칸씩")}
        </div>
        <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
          {t(E,
            "Step through BFS on a 4×4 city. Watch the queue, the visited mark, and the count grow.",
            "4×4 도시에서 BFS 를 한 단계씩. 큐, 방문 표시, count 가 어떻게 늘어나는지 봐.")}
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4, textAlign: "center", fontWeight: 600 }}>
            {t(E, "Grid", "격자")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Cn}, 44px)`, gap: 4 }}>
            {SIM_GRID.map((row, r) => row.map((_, c) => (
              <div key={`${r}-${c}`} style={cellStyle(r, c)}>{cellLabel(r, c)}</div>
            )))}
          </div>
        </div>

        <div style={{ minWidth: 180 }}>
          <div style={{ fontSize: 11, color: C.dim, marginBottom: 4, fontWeight: 600 }}>
            {t(E, "Queue (front → back)", "Queue (앞 → 뒤)")}
          </div>
          <div style={{
            background: "#0f172a", color: "#fde68a", padding: 8, borderRadius: 8,
            fontFamily: "JetBrains Mono, monospace", fontSize: 12, minHeight: 40,
          }}>
            {cur.queue.length === 0
              ? <span style={{ color: "#64748b" }}>∅ {t(E, "empty", "비어있음")}</span>
              : cur.queue.map(([r, c], i) => (
                  <span key={i} style={{
                    display: "inline-block", padding: "2px 6px", margin: 2,
                    background: i === 0 ? A : "#334155", color: "#fff", borderRadius: 4, fontSize: 11,
                  }}>({r},{c})</span>
                ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.text }}>
            <b style={{ color: A }}>count = {cur.count}</b>
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
            {E ? cur.note.en : cur.note.ko}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, alignItems: "center" }}>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          style={{
            background: step === 0 ? "#e5e7eb" : "#fff", color: step === 0 ? "#9ca3af" : A,
            border: `1.5px solid ${step === 0 ? "#e5e7eb" : A}`, borderRadius: 8,
            padding: "5px 12px", fontWeight: 700, fontSize: 12,
            cursor: step === 0 ? "default" : "pointer",
          }}
        >◀ {t(E, "Prev", "이전")}</button>
        <span style={{ fontSize: 12, color: C.dim, minWidth: 70, textAlign: "center" }}>
          {step + 1} / {trace.length}
        </span>
        <button
          onClick={() => setStep(Math.min(trace.length - 1, step + 1))}
          disabled={step === trace.length - 1}
          style={{
            background: step === trace.length - 1 ? "#e5e7eb" : A,
            color: step === trace.length - 1 ? "#9ca3af" : "#fff",
            border: `1.5px solid ${step === trace.length - 1 ? "#e5e7eb" : A}`, borderRadius: 8,
            padding: "5px 12px", fontWeight: 700, fontSize: 12,
            cursor: step === trace.length - 1 ? "default" : "pointer",
          }}
        >{t(E, "Next", "다음")} ▶</button>
        <button
          onClick={() => setStep(0)}
          style={{
            background: "#fff", color: C.dim, border: `1.5px solid #e5e7eb`,
            borderRadius: 8, padding: "5px 10px", fontWeight: 600, fontSize: 11, cursor: "pointer",
          }}
        >↺ {t(E, "Reset", "처음")}</button>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.6 }}>
        🐰 = {t(E, "current pop", "현재 pop")} ·
        <span style={{ color: A, fontWeight: 700 }}> ✓</span> = {t(E, "visited", "방문")} ·
        <span style={{ color: "#15803d", fontWeight: 700 }}> 1</span> = {t(E, "building", "건물")} ·
        · = {t(E, "empty", "빈칸")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "from collections import deque",
  "",
  "R, C_ = map(int, input().split())",
  "grid = []",
  "for _ in range(R):",
  "    grid.append(list(map(int, input().split())))",
  "",
  "sr, sc = map(int, input().split())",
  "",
  "visited = [[False]*C_ for _ in range(R)]",
  "visited[sr][sc] = True",
  "q = deque([(sr, sc)])",
  "count = 1",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<R and 0<=nc<C_ and not visited[nr][nc] and grid[nr][nc]==1:",
  "            visited[nr][nc] = True",
  "            q.append((nr, nc))",
  "            count += 1",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "",
  "    long long R, C_; cin >> R >> C_;",
  "    auto grid = [];",
  "    for (long long _ = 0; _ < R; _++) {",
  "        // grid.append(list(map(int, input().split())))",
  "",
  "    long long sr, sc; cin >> sr >> sc;",
  "",
  "    auto visited = [[False]*C_ for _ in range(R)];",
  "    // visited[sr][sc] = True",
  "    auto q = deque([(sr, sc)]);",
  "    auto count = 1;",
  "",
  "    while (q) {",
  "        // r, c = q.popleft()",
  "        // for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "            // nr, nc = r+dr, c+dc",
  "            if (0<=nr<R and 0<=nc<C_ and not visited[nr][nc] and grid[nr][nc]==1) {",
  "                // visited[nr][nc] = True",
  "                // q.append((nr, nc))",
  "                count += 1;",
  "",
  "    cout << count << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc20CityTourSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Read the code section by section. Each line has a clear purpose.",
            "코드를 한 부분씩 읽어봐. 각 줄이 명확한 역할이 있어."),
        t(E, "C++ version is auto-translated from Python — adjust types and idioms as needed.",
            "C++ 버전은 Python에서 자동 변환 — 타입과 관용구는 필요시 조정."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map, sorted) make algorithms concise.",
            "Python의 고수준 구문 (list, map, sorted)으로 알고리즘이 간결."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up I/O.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입출력 가속."),
        t(E, "long long avoids overflow — use it freely for indices and sums.",
            "long long으로 오버플로 방지 — 인덱스, 합계에 자주 사용."),
      ],
    },
  ];
}

export function Mcc20CityTourProgressiveCode(props) {
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


export function downloadMcc20CityTourPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20CityTour — Full Study Guide", "Mcc20CityTour — 종합 풀이 노트");
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

