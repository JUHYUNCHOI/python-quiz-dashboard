// 🔒 USACO_VERIFIED — cpid=916, revegetation (2019 Feb Bronze #2)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ─────────────────────────────────────────────────────────
   RevegSim — interactive grass-assignment playground
   N = 5 pastures, fixed M = 5 constraint pairs.
   • Click a pasture to cycle through colors 0(blank) → 1 → 2 → 3 → 4 → 0
   • Violated constraints highlight in red live
   • "Greedy 자동" button = run the same algorithm SOLUTION_CODE uses
   • "초기화" = clear all colors
   Match theme: orange A = #f97316, 4 grass-type palette.
   ───────────────────────────────────────────────────────── */
const GRASS_COLORS = {
  0: { bg: "#f3f4f6", fg: "#94a3b8", border: "#d1d5db" },           // empty
  1: { bg: "#bbf7d0", fg: "#14532d", border: "#16a34a" },           // green
  2: { bg: "#fde68a", fg: "#78350f", border: "#d97706" },           // yellow
  3: { bg: "#fecaca", fg: "#7f1d1d", border: "#dc2626" },           // red
  4: { bg: "#bfdbfe", fg: "#1e3a8a", border: "#2563eb" },           // blue
};

// 5 pastures laid out on a pentagon. Constraints (edges) form a small graph
// with an interesting greedy answer: 12121.
const SIM_N = 5;
const SIM_EDGES = [[1,2],[2,3],[3,4],[4,5],[1,3]]; // 1-2 1-3 2-3 3-4 4-5
const SIM_POS = [
  null,                       // index 0 unused
  { x: 200, y:  40 },         // 1 — top
  { x: 340, y: 140 },         // 2 — top-right
  { x: 285, y: 290 },         // 3 — bot-right
  { x: 115, y: 290 },         // 4 — bot-left
  { x:  60, y: 140 },         // 5 — top-left
];

function greedyAssign() {
  const adj = Array.from({ length: SIM_N + 1 }, () => new Set());
  for (const [a, b] of SIM_EDGES) { adj[a].add(b); adj[b].add(a); }
  const color = Array(SIM_N + 1).fill(0);
  for (let i = 1; i <= SIM_N; i++) {
    const used = new Set();
    for (const j of adj[i]) if (color[j] !== 0) used.add(color[j]);
    for (let c = 1; c <= 4; c++) if (!used.has(c)) { color[i] = c; break; }
  }
  return color;
}

export function RevegSim({ E }) {
  const [color, setColor] = useState(() => Array(SIM_N + 1).fill(0));

  const cycle = i => {
    const u = [...color]; u[i] = (u[i] + 1) % 5; setColor(u);
  };
  const reset = () => setColor(Array(SIM_N + 1).fill(0));
  const auto  = () => setColor(greedyAssign());

  // Find violations + summary
  const violations = SIM_EDGES.filter(([a, b]) => color[a] !== 0 && color[b] !== 0 && color[a] === color[b]);
  const filled = color.slice(1).filter(c => c !== 0).length;
  const allFilled = filled === SIM_N;
  const valid = allFilled && violations.length === 0;
  const assignString = color.slice(1).map(c => c === 0 ? "·" : c).join("");
  const greedy = greedyAssign();
  const greedyStr = greedy.slice(1).join("");
  const isLexSmallest = valid && assignString === greedyStr;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, fontSize: 12.5, color: "#9a3412", lineHeight: 1.55 }}>
        <b>🎮 {t(E, "Try it", "직접 해봐")}:</b>{" "}
        {t(E, "Click each pasture to cycle through grass types 1→2→3→4. Edges that connect SAME-color pastures glow red — that's a violation. Try to find the lexicographically smallest valid assignment (lowest digits first), then press \"Greedy auto\" to compare.",
              "각 목초지를 클릭해서 잔디 종류 1→2→3→4 로 순환. 같은 색끼리 연결된 간선은 빨갛게 빛나요 — 그게 위반. 사전순 가장 작은 유효 배색을 직접 찾아본 뒤 \"그리디 자동\" 으로 비교해봐.")}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
        <svg width="400" height="340" viewBox="0 0 400 340" style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, flexShrink: 0, maxWidth: "100%", height: "auto" }}>
          {/* edges first so nodes draw on top */}
          {SIM_EDGES.map(([a, b], i) => {
            const va = SIM_POS[a], vb = SIM_POS[b];
            const bad = color[a] !== 0 && color[b] !== 0 && color[a] === color[b];
            return (
              <line key={i}
                x1={va.x} y1={va.y} x2={vb.x} y2={vb.y}
                stroke={bad ? "#dc2626" : "#94a3b8"}
                strokeWidth={bad ? 4 : 2}
                strokeDasharray={bad ? "0" : "6,4"}
              />
            );
          })}
          {Array.from({ length: SIM_N }, (_, k) => {
            const i = k + 1;
            const p = SIM_POS[i];
            const c = color[i];
            const sty = GRASS_COLORS[c];
            return (
              <g key={i} onClick={() => cycle(i)} style={{ cursor: "pointer" }}>
                <circle cx={p.x} cy={p.y} r="32"
                  fill={sty.bg} stroke={sty.border} strokeWidth="3" />
                <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="11"
                  fill={sty.fg} fontWeight="700">P{i}</text>
                <text x={p.x} y={p.y + 13} textAnchor="middle" fontSize="16"
                  fill={sty.fg} fontWeight="800">{c === 0 ? "·" : c}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ flex: 1, minWidth: 220, fontSize: 12.5 }}>
          <div style={{ background: "#0f172a", color: "#f8fafc", padding: "10px 12px", borderRadius: 8, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>
            <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>{t(E, "Current assignment", "현재 배색")}</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 4, color: A }}>{assignString}</div>
          </div>

          <div style={{ background: violations.length ? "#fef2f2" : (allFilled ? "#dcfce7" : "#f1f5f9"),
                        border: `1.5px solid ${violations.length ? "#fca5a5" : (allFilled ? "#86efac" : C.border)}`,
                        borderRadius: 8, padding: "8px 10px", marginBottom: 6,
                        color: violations.length ? "#7f1d1d" : (allFilled ? "#15803d" : C.dim),
                        fontWeight: 700 }}>
            {violations.length > 0
              ? <>❌ {t(E, "Violations", "위반")}: {violations.map(([a,b]) => `P${a}–P${b}`).join(", ")}</>
              : (allFilled
                ? (isLexSmallest
                    ? <>✅ {t(E, "Valid AND lexicographically smallest!", "유효하고 사전순 최소!")}</>
                    : <>✅ {t(E, "Valid — but not the smallest. Greedy gives", "유효 — 그러나 최소는 아님. 그리디:")} <code style={{ color: A }}>{greedyStr}</code></>)
                : <>⏳ {t(E, "Filled", "채움")}: {filled}/{SIM_N}</>)
            }
          </div>

          <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", fontSize: 11.5, color: C.dim, marginBottom: 8 }}>
            <b style={{ color: C.text }}>{t(E, "Constraints", "제약")}:</b>{" "}
            {SIM_EDGES.map(([a,b]) => `(${a},${b})`).join(" ")}
            <div style={{ marginTop: 4 }}>{t(E, "Each pair → DIFFERENT grass types.", "각 쌍은 서로 다른 잔디 종류여야 함.")}</div>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={auto} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: A, color: "#fff" }}>
              ▶ {t(E, "Greedy auto", "그리디 자동")}
            </button>
            <button onClick={reset} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1.5px solid ${C.border}`, cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: "#fff", color: C.text }}>
              ↺ {t(E, "Reset", "초기화")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('revegetate.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "N, M = map(int, lines[0].split())",
  "",
  "# 각 목초지마다 '다른 풀이어야 하는' 목초지 목록",
  "adj = []",
  "for i in range(N + 1):",
  "    adj.append([])",
  "for k in range(M):",
  "    a, b = map(int, lines[1 + k].split())",
  "    adj[a].append(b)",
  "    adj[b].append(a)",
  "",
  "# 그리디: 각 목초지에 가장 작은 색(1~4) 할당",
  "color = [0] * (N + 1)",
  "for i in range(1, N + 1):",
  "    # 이웃이 이미 쓴 색 모으기",
  "    used = [False] * 5  # used[1..4]",
  "    for j in adj[i]:",
  "        if color[j] != 0:",
  "            used[color[j]] = True",
  "    for c in range(1, 5):",
  "        if not used[c]:",
  "            color[i] = c",
  "            break",
  "",
  "with open('revegetate.out', 'w') as file:",
  "    result = ''",
  "    for i in range(1, N + 1):",
  "        result += str(color[i])",
  "    file.write(result + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"revegetate.in\");",
  "    ofstream fout(\"revegetate.out\");",
  "",
  "    int N, M;",
  "    fin >> N >> M;",
  "    // 각 목초지마다 '다른 풀이어야 하는' 목초지 목록",
  "    vector<vector<int>> adj(N + 1);",
  "    for (int k = 0; k < M; k++) {",
  "        int a, b;",
  "        fin >> a >> b;",
  "        adj[a].push_back(b);",
  "        adj[b].push_back(a);",
  "    }",
  "    // 그리디: 각 목초지에 가장 작은 색(1~4) 할당",
  "    vector<int> color(N + 1, 0);",
  "    for (int i = 1; i <= N; i++) {",
  "        bool used[5] = {false, false, false, false, false};",
  "        for (int j : adj[i]) {",
  "            if (color[j] != 0) used[color[j]] = true;",
  "        }",
  "        for (int c = 1; c <= 4; c++) {",
  "            if (!used[c]) { color[i] = c; break; }",
  "        }",
  "    }",
  "    for (int i = 1; i <= N; i++) fout << color[i];",
  "    fout << \"\\n\";",
  "    return 0;",
  "}",
];

export function getRevegSections(E) {
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

export function RevegProgressiveCode(props) {
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


export function downloadRevegPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Reveg — Full Study Guide", "Reveg — 종합 풀이 노트");
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

