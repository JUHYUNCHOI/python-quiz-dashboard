import { useState, useEffect, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ───────── Bucket Brigade interactive grid ─────────
   Eye-evident 10×10 sim: shows L (lake), B (barn), R (rock).
   ▶ button animates the BFS shortest path; cows fill in cell-by-cell.
   Counter displays cows placed so far. */
const SAMPLE_GRID = [
  "..........",
  "..........",
  "....L.....",
  "..........",
  "..........",
  ".....R....",
  "..........",
  "..........",
  ".......B..",
  "..........",
];
// Manual BFS shortest path from L(2,4) to B(8,7), avoiding R(5,5).
// Path includes endpoints; cows = path.length - 2.
const SAMPLE_PATH = [
  [2,4],[3,4],[4,4],[5,4],[6,4],[6,5],[6,6],[6,7],[7,7],[8,7],
];

export function BucketBrigadeGrid({ E }) {
  const [step, setStep] = useState(0); // 0 = start, 1..N-1 = how many cells revealed
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing) return;
    if (step >= SAMPLE_PATH.length) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep(s => s + 1), 380);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, step]);

  const reset = () => { setPlaying(false); setStep(0); };
  const play = () => { if (step >= SAMPLE_PATH.length) setStep(0); setPlaying(true); };
  const pause = () => setPlaying(false);

  const inPath = (r, c) => {
    for (let i = 0; i < step; i++) if (SAMPLE_PATH[i][0] === r && SAMPLE_PATH[i][1] === c) return i;
    return -1;
  };

  // cows = revealed path cells, excluding L (idx 0) and B (last idx if reached).
  const reachedBarn = step >= SAMPLE_PATH.length;
  const cowsPlaced = Math.max(0, step - 1 - (reachedBarn ? 1 : 0));

  return (
    <div style={{ background: "#fff7ed", border: "1.5px dashed #fb923c", borderRadius: 12, padding: 12, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412" }}>
          {t(E, "🪣 See it: water flows L → B", "🪣 눈으로 보기: 물이 L → B 로")}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {!playing
            ? <button onClick={play} style={btnStyle(A)}>{t(E, "▶ Play", "▶ 재생")}</button>
            : <button onClick={pause} style={btnStyle("#9a3412")}>{t(E, "⏸ Pause", "⏸ 정지")}</button>}
          <button onClick={reset} style={btnStyle("#6b7280")}>{t(E, "↺ Reset", "↺ 리셋")}</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 2, background: "#fffbeb", padding: 6, borderRadius: 8, border: "1px solid #fed7aa" }}>
          {SAMPLE_GRID.map((row, r) => (
            <div key={r} style={{ display: "flex", gap: 2 }}>
              {row.split("").map((ch, c) => {
                const pi = inPath(r, c);
                let bg = "#fff", color = "#cbd5e1", txt = "·", border = "1px solid #f1f5f9";
                if (ch === "L") { bg = "#bae6fd"; color = "#0369a1"; txt = "L"; border = "1.5px solid #0284c7"; }
                else if (ch === "B") { bg = "#fde68a"; color = "#92400e"; txt = "B"; border = "1.5px solid #d97706"; }
                else if (ch === "R") { bg = "#374151"; color = "#fff"; txt = "R"; border = "1.5px solid #111827"; }
                else if (pi > 0 && !(r === SAMPLE_PATH[SAMPLE_PATH.length-1][0] && c === SAMPLE_PATH[SAMPLE_PATH.length-1][1])) {
                  bg = "#fecaca"; color = "#991b1b"; txt = "🐄"; border = "1.5px solid #dc2626";
                }
                return (
                  <div key={c} style={{
                    width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 4, fontSize: txt === "🐄" ? 13 : 12, fontWeight: 700,
                    fontFamily: "'JetBrains Mono',monospace",
                    background: bg, color, border,
                    transition: "background 180ms, transform 180ms",
                  }}>{txt}</div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", fontSize: 12, color: "#7c2d12", flexWrap: "wrap", gap: 6 }}>
        <div><b>{t(E, "Step", "단계")}:</b> {step} / {SAMPLE_PATH.length}</div>
        <div><b>{t(E, "Cows placed", "놓은 소")}:</b> <span style={{ color: A, fontWeight: 800 }}>{cowsPlaced}</span></div>
        <div><b>{t(E, "Path length", "경로 길이")}:</b> {Math.max(0, step)}</div>
      </div>
      {reachedBarn && (
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#15803d" }}>
          {t(E, "✓ Reached barn! Cows = path − 2 (L, B excluded)", "✓ 헛간 도착! 소 = 경로 − 2 (L, B 제외)")}
        </div>
      )}
    </div>
  );
}

function btnStyle(color) {
  return {
    background: color, color: "#fff", border: "none", borderRadius: 6,
    padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer",
  };
}

const FULL_PY = [
  "import sys",
  "from collections import deque",
  "",
  "grid = []",
  "for i in range(10):",
  "    grid.append(input().strip())",
  "",
  "# Find positions of B (barn), L (lake), R (rock)",
  "barn = lake = rock = None",
  "for r in range(10):",
  "    for c in range(10):",
  "        if grid[r][c] == 'B': barn = (r, c)",
  "        elif grid[r][c] == 'L': lake = (r, c)",
  "        elif grid[r][c] == 'R': rock = (r, c)",
  "",
  "# BFS from lake to barn, avoiding rock",
  "visited = [[False]*10 for _ in range(10)]",
  "visited[lake[0]][lake[1]] = True",
  "q = deque([(lake[0], lake[1], 0)])",
  "",
  "while q:",
  "    r, c, d = q.popleft()",
  "    if (r, c) == barn:",
  "        # path_length = d cells traversed",
  "        # cows needed = d - 1 (lake and barn excluded)",
  "        print(d - 1)",
  "        break",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<10 and 0<=nc<10 and not visited[nr][nc]:",
  "            if (nr,nc) != rock:",
  "                visited[nr][nc] = True",
  "                q.append((nr, nc, d+1))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <queue>",
  "#include <utility>",
  "using namespace std;",
  "",
  "int main() {",
  "    cin.tie(nullptr);",
  "",
  "    vector<string> grid(10);",
  "    for (int i = 0; i < 10; i++) cin >> grid[i];",
  "",
  "    pair<int,int> barn, lake, rock;",
  "    for (int r = 0; r < 10; r++) {",
  "        for (int c = 0; c < 10; c++) {",
  "            if (grid[r][c] == 'B') barn = {r, c};",
  "            else if (grid[r][c] == 'L') lake = {r, c};",
  "            else if (grid[r][c] == 'R') rock = {r, c};",
  "        }",
  "    }",
  "",
  "    // BFS from lake to barn, avoiding rock",
  "    vector<vector<bool>> visited(10, vector<bool>(10, false));",
  "    visited[lake.first][lake.second] = true;",
  "    queue<tuple<int,int,int>> q;",
  "    q.push({lake.first, lake.second, 0});",
  "",
  "    int dr[] = {-1, 1, 0, 0};",
  "    int dc[] = {0, 0, -1, 1};",
  "    while (!q.empty()) {",
  "        auto [r, c, d] = q.front();",
  "        q.pop();",
  "        if (r == barn.first && c == barn.second) {",
  "            cout << (d - 1) << \"\\n\";",
  "            return 0;",
  "        }",
  "        for (int k = 0; k < 4; k++) {",
  "            int nr = r + dr[k], nc = c + dc[k];",
  "            if (nr < 0 || nr >= 10 || nc < 0 || nc >= 10) continue;",
  "            if (visited[nr][nc]) continue;",
  "            if (grid[nr][nc] == 'R') continue;",
  "            visited[nr][nc] = true;",
  "            q.push({nr, nc, d + 1});",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getBucketBrigadeSections(E) {
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
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) — 코드 의도가 명확해져."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합/곱이 약 2×10^9를 넘을 수 있으면 long long 사용."),
      ],
    },
  ];
}

export function BucketBrigadeProgressiveCode(props) {
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


export function downloadBucketBrigadePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "BucketBrigade — Full Study Guide", "BucketBrigade — 종합 풀이 노트");
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

