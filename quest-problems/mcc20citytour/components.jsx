import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";
const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ───────────────── Height-reachability concept sim ─────────────────
   Each cell is a building HEIGHT. Fluffy hops to a neighbor only when
   |height difference| < D. Change D and watch the reachable region
   (green) flood-fill out from the start (1,1) grow or shrink.
   The point: the edge rule is about the DIFFERENCE to a neighbor,
   not the height itself — so adjacency is dynamic, set by D.
   ─────────────────────────────────────────────────────────────────── */
// The official 4×5 sample grid — at D = 5 exactly 18 cells are reachable.
const SIM_H = [
  [1, 3, 7, 9, 16],
  [6, 2, 4, 1, 8],
  [8, 9, 10, 12, 14],
  [7, 5, 1, 4, 11],
];

function reachableMask(H, D) {
  const R = H.length, Cn = H[0].length;
  const vis = Array.from({ length: R }, () => Array(Cn).fill(false));
  vis[0][0] = true;
  const q = [[0, 0]];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < R && nc >= 0 && nc < Cn && !vis[nr][nc] &&
          Math.abs(H[nr][nc] - H[r][c]) < D) {
        vis[nr][nc] = true;
        q.push([nr, nc]);
      }
    }
  }
  return vis;
}

export function Mcc20CityTourBfsSim({ E }) {
  const [D, setD] = useState(5);
  const [touched, setTouched] = useState(false);
  const vis = useMemo(() => reachableMask(SIM_H, D), [D]);
  const R = SIM_H.length, Cn = SIM_H[0].length;
  const count = vis.flat().filter(Boolean).length;

  const cellStyle = (r, c) => {
    const on = vis[r][c];
    const isStart = r === 0 && c === 0;
    return {
      width: 46, height: 46, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 1,
      background: on ? "#d1fae5" : "#f3f4f6",
      border: isStart ? "2.5px solid #059669" : on ? "2px solid #6ee7b7" : "2px solid #e5e7eb",
      borderRadius: 8, color: on ? "#065f46" : "#9ca3af",
      fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: 14,
      transition: "background 160ms, border-color 160ms",
    };
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🐰 {t(E, "Where can Fluffy reach?", "Fluffy 는 어디까지 갈 수 있을까요?")}
        </div>
        {/* 2026-09-17: 100자가 줄바꿈 없이 한 덩어리였다. 절 단위로 끊는다. */}
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12,
          whiteSpace: "pre-line", textWrap: "balance" }}>
          {t(E,
            "Each cell shows a building HEIGHT.\nFluffy hops to a neighbor only when the height DIFFERENCE is less than D.\nChange D and watch the green region grow or shrink from the start 🐰.",
            "각 칸은 건물 높이예요.\nFluffy 는 이웃과의 높이 차이가 D 보다 작을 때만 건너가요.\nD 를 바꿔서 시작 🐰 에서 갈 수 있는 곳(초록)이\n어떻게 달라지는지 봐요.")}
        </div>

        {/* D stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#92400e", fontWeight: 700 }}>D =</span>
          <button onClick={() => { setTouched(true); setD(Math.max(1, D - 1)); }} style={dBtn}>−</button>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 800, color: A, minWidth: 22, textAlign: "center" }}>{D}</span>
          <button onClick={() => { setTouched(true); setD(Math.min(16, D + 1)); }} style={dBtn}>+</button>
          <span style={{ fontSize: 11.5, color: C.dim, ...KA }}>
            {t(E, "(hop allowed if |Δheight| < D)", "(높이 차이 < D 이면 건너기 가능)")}
          </span>
        </div>

        {/* height grid */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Cn}, 46px)`, gap: 4 }}>
            {SIM_H.map((row, r) => row.map((h, c) => (
              <div key={`${r}-${c}`} style={cellStyle(r, c)}>
                {r === 0 && c === 0 && <span style={{ fontSize: 11, lineHeight: 1 }}>🐰</span>}
                <span>{h}</span>
              </div>
            )))}
          </div>
        </div>

        <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, textAlign: "center" }}>
          {t(E, "reachable = ", "갈 수 있는 칸 = ")}<b style={{ color: "#34d399" }}>{count}</b>
          <span style={{ color: "#64748b" }}> / {R * Cn}</span>
        </div>

        {/* 2026-09-17: 150자가 한 덩어리였다 + D 를 만지기도 전에 결론이 다 떠 있었다.
            (mcc20cipher:27,109-118 의 touched 수법을 그대로 가져왔다.) */}
        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55,
          whiteSpace: "pre-line", textWrap: "balance", ...KA }}>
          {
            touched
              ? t(E,
                  "The rule is about the DIFFERENCE to a neighbor — not the height itself.\nTwo tall buildings side by side differ little, so the hop is easy.\nA tall one next to a short one becomes a wall once that difference reaches D.\nSo no wall is fixed: the same edge opens for a big D and closes for a small one.",
                  "중요한 건 높이 자체가 아니라 이웃과의 '차이' 예요.\n높은 건물 둘이 나란히 있으면 차이가 작아서 쉽게 건너요.\n높은 건물 옆 낮은 건물은 차이가 D 이상이면 벽이 돼요.\n그래서 벽이 어디인지 미리 정해져 있지 않아요.\n같은 자리도 D 가 크면 열리고 작으면 막혀요.")
              : t(E,
                  "Try a bigger D, then a smaller one.\nDoes the same edge stay a wall every time?",
                  "D 를 키웠다 줄였다 해봐요.\n같은 자리가 늘 벽으로 남아 있나요?")}
        </div>
      </div>
    </div>
  );
}
const dBtn = {
  width: 28, height: 28, borderRadius: 6, border: "1px solid #fcd34d", background: "#fff",
  color: "#92400e", fontSize: 17, fontWeight: 800, cursor: "pointer", lineHeight: 1,
};

/* ================================================================
   SOLUTION CODE  (flood-fill / BFS with the |Δheight| < D edge rule)
   Input format:  line 1 = "M N",  then M lines of N heights,  last line = "D".
   Start is fixed at (1,1) = index (0,0). Count reachable cells.
   ================================================================ */
const FULL_PY = [
  "from collections import deque",
  "",
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "M = 4",
  "N = 5",
  "D = 5",
  "H = [",
  "    [1, 3, 7, 9, 16],",
  "    [6, 2, 4, 1, 8],",
  "    [8, 9, 10, 12, 14],",
  "    [7, 5, 1, 4, 11],",
  "]",
  "",
  "visited = []",
  "for _ in range(M):            # 줄마다 [False, False, …] 하나씩",
  "    visited.append([False] * N)",
  "visited[0][0] = True          # start at (1,1) = index (0,0)",
  "q = deque([(0, 0)])",
  "count = 1",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<M and 0<=nc<N and not visited[nr][nc] \\",
  "                and abs(H[nr][nc]-H[r][c]) < D:",
  "            visited[nr][nc] = True",
  "            q.append((nr, nc))",
  "            count += 1",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <cstdlib>   // abs",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    int M = 4;",
  "    int N = 5;",
  "    int D = 5;",
  "    vector<vector<int>> H = {",
  "        {1, 3, 7, 9, 16},",
  "        {6, 2, 4, 1, 8},",
  "        {8, 9, 10, 12, 14},",
  "        {7, 5, 1, 4, 11},",
  "    };",
  "",
  "    vector<vector<bool>> visited(M, vector<bool>(N, false));",
  "    visited[0][0] = true;          // start at (1,1) = index (0,0)",
  "    queue<pair<int,int>> q;",
  "    q.push({0, 0});",
  "    int count = 1;",
  "",
  "    int dr[4] = {-1, 1, 0, 0};",
  "    int dc[4] = {0, 0, -1, 1};",
  "    while (!q.empty()) {",
  "        auto [r, c] = q.front();",
  "        q.pop();",
  "        for (int d = 0; d < 4; d++) {",
  "            int nr = r + dr[d];",
  "            int nc = c + dc[d];",
  "            if (nr >= 0 && nr < M && nc >= 0 && nc < N &&",
  "                !visited[nr][nc] && abs(H[nr][nc] - H[r][c]) < D) {",
  "                visited[nr][nc] = true;",
  "                q.push({nr, nc});",
  "                count++;",
  "            }",
  "        }",
  "    }",
  "    cout << count << \"\\n\";",
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
        /* 2026-09-17: 104·80 자가 한 덩어리였다. Stepper 는 \n 을 뭉개니 항목을 나눈다.
           "플러드필" 은 뜻을 안 밝힌 음차어라 우리말로 먼저 말하고 이름을 뒤에 붙인다. */
        t(E, "Start at (1,1) and let the reachable area spread outwards — this is BFS (flood fill).",
            "시작 칸 (1,1) 에서 갈 수 있는 곳을 바깥으로 번져 나가게 해요. 이 방법을 BFS(번져 나가며 채우기)라고 불러요."),
        t(E, "Pop a cell, then for each of its 4 neighbors step in only if it hasn't been visited AND the height gap |H[nr][nc] − H[r][c]| < D.",
            "칸을 하나 꺼내서 이웃 4 개를 봐요. 아직 안 간 칸이면서 높이 차 |H[nr][nc] − H[r][c]| < D 일 때만 들어가요."),
        t(E, "Mark visited AT PUSH time and bump count then — so every reachable cell is counted exactly once.",
            "큐에 넣는 순간 방문 표시를 하고 그때 count 를 올려요. 그래야 갈 수 있는 칸이 정확히 한 번씩만 세어져요."),
        t(E, "The answer is how many cells got visited.",
            "답은 방문한 칸의 개수예요."),
        t(E, "There is no fixed wall map: whether an edge is open depends on the two heights AND D.",
            "벽이 어디인지 미리 정해져 있지 않아요. 길이 열리는지는 두 높이와 D 에 따라 달라져요."),
        t(E, "The same neighbour can be open for a large D and blocked for a small one.",
            "같은 이웃도 D 가 크면 열리고 작으면 막혀요."),
      ],
      pyOnly: [
        t(E, "deque.popleft() finishes instantly no matter how big the deque is — that is what makes this real BFS, not a slow list.pop(0) each step.",
            "deque 의 popleft() 는 크기와 상관없이 바로 끝나는 연산이에요. 그래서 느린 list.pop(0) 대신 쓰면 진짜 BFS 가 돼요."),
        t(E, "abs(H[nr][nc] - H[r][c]) < D is the whole edge rule — the height DIFFERENCE, strictly less than D.",
            "abs(H[nr][nc] - H[r][c]) < D 한 줄이 규칙의 전부예요. 높이 '차이' 가 D 보다 작아야만 건너가요."),
      ],
      cppOnly: [
        t(E, "Use queue<pair<int,int>> and abs() from <cstdlib>; visited is a vector<vector<bool>>.",
            "queue<pair<int,int>> 와 <cstdlib> 의 abs() 를 써요. visited 는 vector<vector<bool>> 이에요."),
        t(E, "int is plenty here: heights fit (|H| ≤ 10^6) and the cell count is small (M×N ≤ 10^5).",
            "여기선 int 로 충분해요. 높이 (|H| ≤ 10^6) 와 칸 수 (M×N ≤ 10^5) 모두 int 범위 안이에요."),
      ],
    },
  ];
}

export function Mcc20CityTourProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set","queue"];
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
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
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
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 선택해요.")}</div>
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
