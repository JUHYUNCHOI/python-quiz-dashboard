// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 12/12 on cpid=1108
// C++ rewritten 2026-06-15
//   Python: correct incremental solver, prints comfortable count per iteration.
//   C++:    rewritten to match — keeps a `comfortable` set and re-checks only the
//           new cow + her 4 neighbors each step, printing the running size. Old code
//           never printed per-iteration and accumulated a single counter (0/1 WA).
//   Local-verified vs official sample (cpid 1108): output 0,0,0,1,0,0,1,2 — exact match.
//   USACO re-submission recommended to seal C++.

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ════════════════════════════════════════════════════════════════════
   ComfyCowsSim — click to add cows sequentially.
   Each occupied cell shows its current neighbor count.
   Cells with exactly 3 occupied neighbors glow as "comfortable".
   Running counter at bottom mirrors the per-step output of the problem.
   ════════════════════════════════════════════════════════════════════ */
const ROWS = 6;
const COLS = 9;
const DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const COMFY_PRESETS = [
  {
    name: "S1: 6 cows",
    cows: [[0, 0], [1, 0], [0, 1], [2, 0], [1, 1], [1, 2]],
  },
  {
    name: "Cluster",
    cows: [[2, 3], [2, 4], [2, 5], [1, 4], [3, 4]],
  },
  {
    name: "Empty",
    cows: [],
  },
];

function neighborCount(cows, r, c) {
  let n = 0;
  for (const [dr, dc] of DIRS) if (cows.has(`${r + dr},${c + dc}`)) n++;
  return n;
}

export function ComfyCowsSim({ E }) {
  const [pi, setPi] = useState(0);
  const [order, setOrder] = useState(() => COMFY_PRESETS[0].cows.map(([r, c]) => `${r},${c}`));

  const cows = new Set(order);
  const loadPreset = (i) => {
    setPi(i);
    setOrder(COMFY_PRESETS[i].cows.map(([r, c]) => `${r},${c}`));
  };
  const undo = () => setOrder(o => o.slice(0, -1));
  const reset = () => loadPreset(pi);

  const toggle = (r, c) => {
    const key = `${r},${c}`;
    if (cows.has(key)) {
      // Remove this cow (and any later ones — keeps the "sequential" story clean)
      const idx = order.indexOf(key);
      setOrder(order.slice(0, idx));
    } else {
      setOrder([...order, key]);
    }
  };

  let comfyCount = 0;
  for (const key of order) {
    const [r, c] = key.split(",").map(Number);
    if (neighborCount(cows, r, c) === 3) comfyCount++;
  }

  const cell = 36;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10, justifyContent: "center" }}>
        {COMFY_PRESETS.map((p, i) => (
          <button key={i} onClick={() => loadPreset(i)} style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
            border: `1.5px solid ${pi === i ? A : C.border}`,
            background: pi === i ? "#fff7ed" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
          }}>{p.name}</button>
        ))}
        <button onClick={undo} disabled={order.length === 0} style={{
          padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: "#fff", color: order.length ? C.text : C.dim,
          cursor: order.length ? "pointer" : "not-allowed",
        }}>{t(E, "↶ Undo", "↶ 취소")}</button>
        <button onClick={reset} style={{
          padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
          border: `1.5px solid ${C.border}`, background: "#fff", color: C.text, cursor: "pointer",
        }}>{t(E, "↺ Reset", "↺ 리셋")}</button>
      </div>

      <div style={{ fontSize: 11, color: C.dim, marginBottom: 8, textAlign: "center" }}>
        {t(E, "Click any cell to add / remove a cow. Numbers show that cow's neighbor count.",
              "칸을 클릭해 소를 추가/제거. 숫자는 그 소의 이웃 수.")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <div style={{ display: "grid", gap: 2, gridTemplateColumns: `repeat(${COLS}, ${cell}px)` }}>
          {Array.from({ length: ROWS }).map((_, r) =>
            Array.from({ length: COLS }).map((__, c) => {
              const key = `${r},${c}`;
              const isCow = cows.has(key);
              const n = isCow ? neighborCount(cows, r, c) : 0;
              const comfy = isCow && n === 3;
              return (
                <button key={key} onClick={() => toggle(r, c)} style={{
                  width: cell, height: cell, padding: 0, cursor: "pointer",
                  borderRadius: 4,
                  border: comfy ? `3px solid ${A}` : `1px solid ${isCow ? "#9a3412" : C.border}`,
                  background: comfy ? "#fed7aa" : isCow ? "#fff7ed" : "#fff",
                  fontSize: isCow ? 14 : 11,
                  fontWeight: 700,
                  color: comfy ? "#9a3412" : isCow ? "#9a3412" : "#cbd5e1",
                  fontFamily: "'JetBrains Mono',monospace",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {isCow ? (
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
                      <span style={{ fontSize: 14 }}>{"🐄"}</span>
                      <span style={{ fontSize: 9, color: comfy ? "#9a3412" : "#9a3412", marginTop: 1 }}>{n}</span>
                    </span>
                  ) : "·"}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", fontSize: 12 }}>
        <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "6px 12px" }}>
          <b>{t(E, "Cows", "소")}:</b>{" "}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#9a3412", fontWeight: 700 }}>{order.length}</span>
        </div>
        <div style={{ background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 8, padding: "6px 12px" }}>
          <b style={{ color: "#9a3412" }}>{t(E, "Comfortable", "편안")}:</b>{" "}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: A, fontWeight: 800 }}>{comfyCount}</span>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.55 }}>
        {t(E,
          "A cow is comfortable iff its neighbor number reads exactly 3. Adding or removing one cow only changes that cow plus her 4 neighbors — that's why the real solver only re-checks 5 cells per step.",
          "이웃 수가 정확히 3 일 때만 편안. 한 마리 추가/제거는 그 소 + 4 이웃만 영향 → 실제 풀이에서 매 스텝 5 칸만 재확인하면 되는 이유.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "cows = set()",
  "comfortable = set()",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "",
  "def count_neighbors(x, y):",
  "    return sum(1 for dx,dy in dirs if (x+dx,y+dy) in cows)",
  "",
  "def update_comfort(x, y):",
  "    n = count_neighbors(x, y)",
  "    if n == 3:",
  "        comfortable.add((x,y))",
  "    else:",
  "        comfortable.discard((x,y))",
  "",
  "results = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    cows.add((x, y))",
  "    # Update comfort for new cow and its neighbors",
  "    update_comfort(x, y)",
  "    for dx, dy in dirs:",
  "        nx, ny = x+dx, y+dy",
  "        if (nx, ny) in cows:",
  "            update_comfort(nx, ny)",
  "    results.append(len(comfortable))",
  "",
  "for r in results:",
  "    print(r)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <set>",
  "#include <utility>",
  "using namespace std;",
  "",
  "set<pair<int,int>> cows;        // every occupied cell",
  "set<pair<int,int>> comfortable; // cells that currently have exactly 3 neighbors",
  "int dx[] = {0, 0, 1, -1};",
  "int dy[] = {1, -1, 0, 0};",
  "",
  "int countNeighbors(int x, int y) {",
  "    int n = 0;",
  "    for (int k = 0; k < 4; k++)",
  "        if (cows.count({x + dx[k], y + dy[k]})) n++;",
  "    return n;",
  "}",
  "",
  "void updateComfort(int x, int y) {",
  "    // Only count a cell if a cow is actually standing on it.",
  "    if (cows.count({x, y}) && countNeighbors(x, y) == 3)",
  "        comfortable.insert({x, y});",
  "    else",
  "        comfortable.erase({x, y});",
  "}",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    for (int i = 0; i < N; i++) {",
  "        int x, y; cin >> x >> y;",
  "        cows.insert({x, y});",
  "        // The new cow + her 4 neighbors are the only cells",
  "        // whose comfort status can change this step.",
  "        updateComfort(x, y);",
  "        for (int k = 0; k < 4; k++)",
  "            updateComfort(x + dx[k], y + dy[k]);",
  "        cout << comfortable.size() << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getComfyCowsSections(E) {
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

export function ComfyCowsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadComfyCowsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "ComfyCows — Full Study Guide", "ComfyCows — 종합 풀이 노트");
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

