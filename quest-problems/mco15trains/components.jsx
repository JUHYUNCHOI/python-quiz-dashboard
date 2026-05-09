import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ═══════════════════════════════════════════════════════════════
   TrainsAuditSim — student builds a 4-connected train path on a
   tiny grid, sim audits validity + cost vs. optimal Dijkstra cost.
   Reveals WHY the minimum-sum path matters — many valid paths,
   only one (or a few) tie the minimum.
   ═══════════════════════════════════════════════════════════════ */
const _BLK = -1;
const _TRAIN_PRESETS = [
  // 3×3 introductory: small populations, optional detour
  {
    name: "3×3 easy",
    grid: [
      [1, 9, 1],
      [1, 9, 1],
      [1, 1, 1],
    ],
    a: [0, 0], b: [0, 2],
  },
  // 3×3 with a -1 wall forcing a detour
  {
    name: "3×3 wall",
    grid: [
      [2, _BLK, 5],
      [3,    1, 4],
      [9,    2, 1],
    ],
    a: [0, 0], b: [0, 2],
  },
  // 4×4 trickier: greedy fails, Dijkstra wins
  {
    name: "4×4 trap",
    grid: [
      [1, 1, 1, 1],
      [9, 9, 9, 1],
      [1, 1, 1, 1],
      [1, 9, 9, 9],
    ],
    a: [0, 0], b: [3, 0],
  },
];

// Dijkstra over the grid (cost = sum of populations on path, A inclusive).
function _dijkstraTrains(grid, a, b) {
  const N = grid.length, M = grid[0].length;
  const INF = Infinity;
  const dist = Array.from({ length: N }, () => Array(M).fill(INF));
  dist[a[0]][a[1]] = grid[a[0]][a[1]];
  // simple O(N²·M²) Dijkstra (small grids only) — no heap needed
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  while (true) {
    let bx = -1, by = -1, bd = INF;
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) {
      if (!visited[i][j] && dist[i][j] < bd) { bd = dist[i][j]; bx = i; by = j; }
    }
    if (bx < 0) break;
    visited[bx][by] = true;
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    for (const [dx, dy] of dirs) {
      const nx = bx + dx, ny = by + dy;
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (grid[nx][ny] === _BLK) continue;
      const nd = bd + grid[nx][ny];
      if (nd < dist[nx][ny]) dist[nx][ny] = nd;
    }
  }
  return dist[b[0]][b[1]];
}

export function TrainsAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _TRAIN_PRESETS[pi];
  const { grid, a, b } = preset;
  const N = grid.length, M = grid[0].length;

  // path = ordered list of [r,c] starting at a
  const [path, setPath] = useState(() => [a]);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setPath([_TRAIN_PRESETS[newPi].a]);
  };

  // utilities
  const inPath = (r, c) => path.some(([pr, pc]) => pr === r && pc === c);
  const head = path[path.length - 1];
  const isAt = (r, c, [tr, tc]) => r === tr && c === tc;
  const adj = (r, c) => Math.abs(r - head[0]) + Math.abs(c - head[1]) === 1;

  const onCellClick = (r, c) => {
    if (grid[r][c] === _BLK) return;
    // if clicking last cell of path, undo (backtrack)
    if (path.length > 1) {
      const [lr, lc] = path[path.length - 1];
      if (lr === r && lc === c) {
        setPath(path.slice(0, -1));
        return;
      }
    }
    // can't revisit cells in the path
    if (inPath(r, c)) return;
    // must be 4-adjacent to head
    if (!adj(r, c)) return;
    setPath([...path, [r, c]]);
  };

  const reset = () => setPath([a]);

  // audit: at B?
  const reachedB = isAt(head[0], head[1], b);
  const cost = path.reduce((s, [r, c]) => s + grid[r][c], 0);
  const optimal = _dijkstraTrains(grid, a, b);
  const isOptimal = reachedB && cost === optimal;

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_TRAIN_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.name}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8, lineHeight: 1.5 }}>
        {t(E,
          "Tap a cell adjacent to the path's head to extend. Tap the head to undo. -1 = blocked.",
          "경로 끝과 인접한 칸 탭 = 이어붙이기. 끝 칸 다시 탭 = 되돌리기. -1 = 막힘.")}
      </div>

      {/* grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${M}, 44px)`, gap: 4 }}>
          {grid.map((row, r) => row.map((v, c) => {
            const blocked = v === _BLK;
            const onPath = inPath(r, c);
            const isA = isAt(r, c, a);
            const isB = isAt(r, c, b);
            const isHead = isAt(r, c, head);
            const adjacent = !blocked && !onPath && adj(r, c);
            let bg = "#f3f4f6", bd = "#d1d5db", color = "#374151";
            if (blocked) { bg = "#1f2937"; bd = "#0f172a"; color = "#9ca3af"; }
            else if (onPath) { bg = "#dbeafe"; bd = A; color = "#1e3a8a"; }
            if (isA) { bg = "#dcfce7"; bd = "#16a34a"; color = "#15803d"; }
            if (isB) { bg = isB && reachedB ? "#fde68a" : "#fee2e2"; bd = isB && reachedB ? "#f59e0b" : "#dc2626"; color = isB && reachedB ? "#92400e" : "#991b1b"; }
            if (isHead && !isA) { bd = "#7c3aed"; }
            if (adjacent) { bd = "#60a5fa"; }
            return (
              <button key={`${r}-${c}`} onClick={() => onCellClick(r, c)} disabled={blocked} style={{
                width: 44, height: 44, borderRadius: 6, border: `1.5px solid ${bd}`,
                background: bg, color, cursor: blocked ? "not-allowed" : "pointer",
                fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14,
                position: "relative", padding: 0,
              }}>
                {blocked ? "−1" : v}
                {isA && <div style={{ position: "absolute", top: -8, left: -2, fontSize: 11, fontWeight: 800, color: "#16a34a" }}>A</div>}
                {isB && <div style={{ position: "absolute", top: -8, right: -2, fontSize: 11, fontWeight: 800, color: "#dc2626" }}>B</div>}
              </button>
            );
          }))}
        </div>
      </div>

      {/* path string */}
      <div style={{
        background: "#0f172a", borderRadius: 8, padding: "8px 12px", marginBottom: 8,
        textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
        color: "#f8fafc", letterSpacing: 0.5, minHeight: 22,
      }}>
        {path.map(([r, c], i) => (
          <span key={i}>
            {i > 0 && <span style={{ color: "#475569" }}> → </span>}
            <span style={{ color: i === 0 ? "#22c55e" : (i === path.length - 1 && reachedB ? "#fbbf24" : "#93c5fd") }}>
              ({r},{c})={grid[r][c]}
            </span>
          </span>
        ))}
      </div>

      {/* audit result */}
      <div style={{
        background: reachedB ? (isOptimal ? "#dcfce7" : "#fff7ed") : "#fee2e2",
        border: `1px solid ${reachedB ? (isOptimal ? "#16a34a" : "#f59e0b") : "#dc2626"}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 8,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: reachedB ? (isOptimal ? "#15803d" : "#9a3412") : "#991b1b" }}>
          {reachedB
            ? (isOptimal ? t(E, "🎯 Optimal!", "🎯 최적!") : t(E, "✓ Reached B", "✓ B 도달"))
            : t(E, "… not at B yet", "… 아직 B 아님")}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: reachedB ? (isOptimal ? "#15803d" : "#9a3412") : "#991b1b", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, `cost = ${cost}`, `비용 = ${cost}`)} · {t(E, `min = ${optimal}`, `최소 = ${optimal}`)}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <button onClick={reset} style={{
          padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 11, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset path", "↻ 경로 초기화")}
        </button>
      </div>

      {/* hint */}
      <div style={{
        background: "#eff6ff", border: `1px solid #93c5fd`, borderRadius: 8, padding: "8px 12px",
        fontSize: 11, color: "#1e3a8a", textAlign: "center", lineHeight: 1.5,
      }}>
        {!reachedB
          ? t(E,
              `Extend the path 4-directionally until you reach B. Optimal Dijkstra cost = ${optimal}.`,
              `4 방향으로 경로를 이어 B 까지 가요. 다익스트라 최적 비용 = ${optimal}.`)
          : (isOptimal
              ? t(E,
                  `Perfect — your path ties the minimum (${optimal}). That's exactly what dist[B] in the code stores.`,
                  `완벽! 경로 비용이 최솟값 (${optimal}) 과 같아요. 코드의 dist[B] 가 저장하는 값이에요.`)
              : t(E,
                  `Reached B with cost ${cost}, but min = ${optimal}. Try another route — Dijkstra finds the lowest-cost route automatically.`,
                  `B 에 도달했지만 비용 ${cost}, 최솟값은 ${optimal}. 다른 경로를 시도해 봐요 — 다익스트라는 최소 비용 경로를 자동으로 찾아요.`))}
      </div>
    </div>
  );
}


const FULL_PY = [
  "import heapq",
  "",
  "N = int(input())",
  "grid = []",
  "for i in range(N):",
  "    row = list(map(int, input().split()))",
  "    grid.append(row)",
  "",
  "ax, ay, bx, by = map(int, input().split())",
  "ax -= 1; ay -= 1; bx -= 1; by -= 1  # 0-indexed",
  "",
  "INF = float('inf')",
  "dist = [[INF] * N for _ in range(N)]",
  "dist[ax][ay] = grid[ax][ay]",
  "",
  "pq = [(grid[ax][ay], ax, ay)]",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "",
  "while pq:",
  "    d, x, y = heapq.heappop(pq)",
  "    if d > dist[x][y]:",
  "        continue",
  "    if x == bx and y == by:",
  "        break",
  "    for dx, dy in dirs:",
  "        nx, ny = x + dx, y + dy",
  "        if 0 <= nx < N and 0 <= ny < N and grid[nx][ny] != -1:",
  "            nd = d + grid[nx][ny]",
  "            if nd < dist[nx][ny]:",
  "                dist[nx][ny] = nd",
  "                heapq.heappush(pq, (nd, nx, ny))",
  "",
  "print(dist[bx][by])",
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
  "    long long N; cin >> N;",
  "    auto grid = [];",
  "    for (long long i = 0; i < N; i++) {",
  "        vector<long long> row; { long long _x; while (cin >> _x) row.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "        // grid.append(row)",
  "",
  "    // ax, ay, bx, by = map(int, input().split())",
  "    ax -= 1; ay -= 1; bx -= 1; by -= 1  # 0-indexed;",
  "",
  "    auto INF = float('inf');",
  "    auto dist = [[INF] * N for _ in range(N)];",
  "    // dist[ax][ay] = grid[ax][ay]",
  "",
  "    auto pq = [(grid[ax][ay], ax, ay)];",
  "    auto dirs = [(0,1),(0,-1),(1,0),(-1,0)];",
  "",
  "    while (pq) {",
  "        // d, x, y = heapq.heappop(pq)",
  "        if (d > dist[x][y]) {",
  "            continue;",
  "        if (x == bx and y == by) {",
  "            break;",
  "        // for dx, dy in dirs:",
  "            // nx, ny = x + dx, y + dy",
  "            if (0 <= nx < N and 0 <= ny < N and grid[nx][ny] != -1) {",
  "                auto nd = d + grid[nx][ny];",
  "                if (nd < dist[nx][ny]) {",
  "                    // dist[nx][ny] = nd",
  "                    // heapq.heappush(pq, (nd, nx, ny))",
  "",
  "    cout << dist[bx][by] << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getTrainsSections(E) {
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

export function TrainsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadTrainsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Trains — Full Study Guide", "Trains — 종합 풀이 노트");
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

