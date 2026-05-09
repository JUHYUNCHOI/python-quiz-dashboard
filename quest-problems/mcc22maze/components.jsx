import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ════════════════════════════════════════════════════════════
   Mcc22MazeBfsSim — clickable maze + BFS step-through
   Bilingual via E prop. Theme: red (#dc2626).
   ════════════════════════════════════════════════════════════ */
const SIM_GRID = [
  "....#",
  ".#..#",
  ".#...",
  ".###.",
  ".....",
];

function runBfsSteps(grid) {
  const R = grid.length, Cw = grid[0].length;
  const dist = Array.from({ length: R }, () => Array(Cw).fill(-1));
  dist[0][0] = 0;
  const order = [{ r: 0, c: 0, d: 0 }];
  const q = [[0, 0]];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < R && nc >= 0 && nc < Cw && grid[nr][nc] === "." && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        order.push({ r: nr, c: nc, d: dist[nr][nc] });
        q.push([nr, nc]);
      }
    }
  }
  return order;
}

export function Mcc22MazeBfsSim({ E }) {
  const order = useMemo(() => runBfsSteps(SIM_GRID), []);
  const [step, setStep] = useState(0);

  const R = SIM_GRID.length, Cw = SIM_GRID[0].length;
  const visited = new Map();
  for (let i = 0; i <= step && i < order.length; i++) {
    visited.set(`${order[i].r},${order[i].c}`, order[i].d);
  }
  const frontier = step < order.length ? `${order[step].r},${order[step].c}` : null;
  const goalKey = `${R - 1},${Cw - 1}`;
  const goalReached = visited.has(goalKey);
  const goalDist = visited.get(goalKey);

  const cellSize = 38;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fef2f2", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
          🧭 {t(E, "BFS Walkthrough", "BFS 시뮬레이션")}
        </div>
        <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
          {t(E,
            "Click NEXT to expand BFS one cell at a time. Numbers show distance from start.",
            "다음 버튼으로 BFS가 한 칸씩 퍼져요. 숫자는 시작점에서의 거리예요.")}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{ display: "inline-block", background: "#0f172a", padding: 8, borderRadius: 8 }}>
          {SIM_GRID.map((row, r) => (
            <div key={r} style={{ display: "flex" }}>
              {row.split("").map((ch, c) => {
                const k = `${r},${c}`;
                const isWall = ch === "#";
                const isStart = r === 0 && c === 0;
                const isGoal = r === R - 1 && c === Cw - 1;
                const isFrontier = k === frontier;
                const d = visited.get(k);
                const visitedHere = d != null;
                let bg = "#1e293b";
                if (isWall) bg = "#475569";
                else if (isFrontier) bg = "#fbbf24";
                else if (visitedHere) bg = "#fca5a5";
                const border = isStart ? "2px solid #15803d" : isGoal ? `2px solid ${A}` : "1px solid #334155";
                return (
                  <div key={c} style={{
                    width: cellSize, height: cellSize, margin: 1, background: bg,
                    color: isWall ? "#cbd5e1" : "#0f172a", border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, borderRadius: 4, fontFamily: "monospace",
                  }}>
                    {isWall ? "#" : visitedHere ? d : isStart ? "S" : isGoal ? "G" : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            background: step === 0 ? "#e5e7eb" : "#fff", color: step === 0 ? "#9ca3af" : A,
            border: `1.5px solid ${step === 0 ? "#d1d5db" : A}`, borderRadius: 8,
            padding: "6px 14px", fontSize: 12, fontWeight: 800, cursor: step === 0 ? "default" : "pointer",
          }}>← {t(E, "Back", "뒤로")}</button>
        <button
          onClick={() => setStep(s => Math.min(order.length - 1, s + 1))}
          disabled={step >= order.length - 1}
          style={{
            background: step >= order.length - 1 ? "#e5e7eb" : A,
            color: step >= order.length - 1 ? "#9ca3af" : "#fff",
            border: `1.5px solid ${step >= order.length - 1 ? "#d1d5db" : A}`, borderRadius: 8,
            padding: "6px 14px", fontSize: 12, fontWeight: 800,
            cursor: step >= order.length - 1 ? "default" : "pointer",
          }}>{t(E, "Next", "다음")} →</button>
        <button
          onClick={() => setStep(0)}
          style={{
            background: "#fff", color: "#475569", border: "1.5px solid #cbd5e1", borderRadius: 8,
            padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>↺ {t(E, "Reset", "처음")}</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, fontSize: 11, color: C.dim, flexWrap: "wrap", marginBottom: 8 }}>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#fbbf24", borderRadius: 2, marginRight: 4 }} />{t(E, "current", "현재")}</span>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#fca5a5", borderRadius: 2, marginRight: 4 }} />{t(E, "visited", "방문")}</span>
        <span><span style={{ display: "inline-block", width: 10, height: 10, background: "#475569", borderRadius: 2, marginRight: 4 }} />{t(E, "wall", "벽")}</span>
      </div>

      <div style={{ textAlign: "center", fontSize: 12, color: C.text }}>
        {t(E, "Step ", "단계 ")}<b style={{ color: A }}>{step + 1}</b>{t(E, " of ", " / ")}<b>{order.length}</b>
        {goalReached && (
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: "#15803d" }}>
            ✅ {t(E, "Goal reached! Shortest distance = ", "도착! 최단 거리 = ")}<span style={{ color: A }}>{goalDist}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const FULL_PY = [
  "from collections import deque",
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    R = int(input_data[idx])",
  "    idx += 1",
  "    C_ = int(input_data[idx])",
  "    idx += 1",
  "    grid = []",
  "    for i in range(R):",
  "        grid.append(input_data[idx])",
  "        idx += 1",
  "",
  "    # BFS from (0,0) to (R-1,C-1)",
  "    dist = [[-1]*C_ for _ in range(R)]",
  "    dist[0][0] = 0",
  "    q = deque([(0, 0)])",
  "    while q:",
  "        r, c = q.popleft()",
  "        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "            nr, nc = r+dr, c+dc",
  "            if 0<=nr<R and 0<=nc<C_ and grid[nr][nc]=='.' and dist[nr][nc]==-1:",
  "                dist[nr][nc] = dist[r][c] + 1",
  "                q.append((nr, nc))",
  "",
  "    print(dist[R-1][C_-1])",
  "",
  "solve()",
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
  "    auto solve = [&]() {   // TODO: type args",
  "        auto input_data = sys.stdin.read().split();",
  "        auto idx = 0;",
  "        auto R = int(input_data[idx]); idx += 1;",
  "        auto C_ = int(input_data[idx]); idx += 1;",
  "        auto grid = [];",
  "        for (long long i = 0; i < R; i++) {",
  "            // grid.append(input_data[idx])",
  "            idx += 1",
  "",
  "        // BFS from (0,0) to (R-1,C-1)",
  "        auto dist = [[-1]*C_ for _ in range(R)];",
  "        // dist[0][0] = 0",
  "        auto q = deque([(0, 0)]);",
  "        while (q) {",
  "            // r, c = q.popleft()",
  "            // for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "                // nr, nc = r+dr, c+dc",
  "                if (0<=nr<R and 0<=nc<C_ and grid[nr][nc]=='.' and dist[nr][nc]==-1) {",
  "                    // dist[nr][nc] = dist[r][c] + 1",
  "                    // q.append((nr, nc))",
  "",
  "        cout << dist[R-1][C_-1] << \"\\n\";",
  "",
  "    // solve()",
  "",
  "    return 0;",
  "}",
];

export function getMcc22MazeSections(E) {
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

export function Mcc22MazeProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadMcc22MazePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Maze — Full Study Guide", "Mcc22Maze — 종합 풀이 노트");
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

