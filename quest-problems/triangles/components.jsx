import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ═══════════════════════════════════════════════════════════════
   TrianglesSim — pick right-angle vertex, auto-highlight legs,
                  live area × 2 = base × height
   ═══════════════════════════════════════════════════════════════ */
const _TR_PRESETS = [
  // case 1: (0,0)/(1,0)/(0,2) — the example from the quiz
  { pts: [[0,0],[1,0],[0,2]] },
  // case 2: classic 4-post grid corner
  { pts: [[1,1],[5,1],[1,4],[5,4]] },
  // case 3: 5 posts, multiple legs share rows/cols
  { pts: [[0,0],[3,0],[6,0],[0,4],[6,4]] },
];

export function TrianglesSim({ E }) {
  const [pi, setPi] = useState(0);
  const [pick, setPick] = useState(0); // index of clicked right-angle vertex
  const preset = _TR_PRESETS[pi];
  const pts = preset.pts;

  // For the picked corner k: among pts sharing y[k] (different x), pick one with max |dx|
  // among pts sharing x[k] (different y), pick one with max |dy|. Triangle = (k, hLeg, vLeg).
  const k = pick;
  const [kx, ky] = pts[k];
  let hIdx = -1, hDx = 0;
  let vIdx = -1, vDy = 0;
  for (let i = 0; i < pts.length; i++) {
    if (i === k) continue;
    const [x, y] = pts[i];
    if (y === ky) { const d = Math.abs(x - kx); if (d > hDx) { hDx = d; hIdx = i; } }
    if (x === kx) { const d = Math.abs(y - ky); if (d > vDy) { vDy = d; vIdx = i; } }
  }
  const has = hIdx !== -1 && vIdx !== -1;
  const twiceArea = has ? hDx * vDy : 0;

  // SVG bounds
  const minX = Math.min(...pts.map(p => p[0])) - 1;
  const maxX = Math.max(...pts.map(p => p[0])) + 1;
  const minY = Math.min(...pts.map(p => p[1])) - 1;
  const maxY = Math.max(...pts.map(p => p[1])) + 1;
  const W = 320, H = 220;
  const sx = (x) => ((x - minX) / (maxX - minX)) * W;
  const sy = (y) => H - ((y - minY) / (maxY - minY)) * H;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
        {_TR_PRESETS.map((_, i) => (
          <button key={i} onClick={() => { setPi(i); setPick(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>case {i + 1}</button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 6 }}>
        {t(E, "Click a post to set it as the right-angle corner.", "직각 꼭짓점으로 쓸 기둥을 클릭해요.")}
      </div>

      <svg width={W} height={H} style={{ display: "block", margin: "0 auto", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8 }}>
        {/* gridlines */}
        {Array.from({ length: maxX - minX + 1 }, (_, i) => minX + i).map((g) => (
          <line key={`v${g}`} x1={sx(g)} y1={0} x2={sx(g)} y2={H} stroke="#f1f5f9" strokeWidth="1" />
        ))}
        {Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i).map((g) => (
          <line key={`h${g}`} x1={0} y1={sy(g)} x2={W} y2={sy(g)} stroke="#f1f5f9" strokeWidth="1" />
        ))}

        {/* legs (drawn behind points) */}
        {has && (
          <>
            <line x1={sx(kx)} y1={sy(ky)} x2={sx(pts[hIdx][0])} y2={sy(pts[hIdx][1])} stroke="#7c3aed" strokeWidth="3" />
            <line x1={sx(kx)} y1={sy(ky)} x2={sx(pts[vIdx][0])} y2={sy(pts[vIdx][1])} stroke="#15803d" strokeWidth="3" />
            <line x1={sx(pts[hIdx][0])} y1={sy(pts[hIdx][1])} x2={sx(pts[vIdx][0])} y2={sy(pts[vIdx][1])} stroke="#d97706" strokeWidth="2" strokeDasharray="4 3" />
            {/* small right-angle marker at the corner */}
            <rect
              x={Math.min(sx(kx), sx(kx) + (sx(pts[hIdx][0]) - sx(kx)) * 0.12) - 0}
              y={Math.min(sy(ky), sy(ky) + (sy(pts[vIdx][1]) - sy(ky)) * 0.12) - 0}
              width={Math.abs((sx(pts[hIdx][0]) - sx(kx)) * 0.12)}
              height={Math.abs((sy(pts[vIdx][1]) - sy(ky)) * 0.12)}
              fill="none" stroke={A} strokeWidth="1.5"
            />
          </>
        )}

        {/* points */}
        {pts.map((p, i) => {
          const isCorner = i === k;
          const isLeg = i === hIdx || i === vIdx;
          const fill = isCorner ? A : isLeg ? "#7c3aed" : "#94a3b8";
          const r = isCorner ? 8 : 6;
          return (
            <g key={i} style={{ cursor: "pointer" }} onClick={() => setPick(i)}>
              <circle cx={sx(p[0])} cy={sy(p[1])} r={r + 6} fill="transparent" />
              <circle cx={sx(p[0])} cy={sy(p[1])} r={r} fill={fill} stroke="#fff" strokeWidth="2" />
              <text x={sx(p[0])} y={sy(p[1]) - r - 4} fontSize="10" fill={C.text} textAnchor="middle" fontWeight="700">
                ({p[0]},{p[1]})
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ background: "#fffbeb", border: `1.5px solid #fcd34d`, borderRadius: 10, padding: "10px 12px", marginTop: 12, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.8 }}>
        {t(E, "Right-angle corner", "직각 꼭짓점")} = <b style={{ color: A }}>({kx}, {ky})</b><br/>
        {has ? (
          <>
            {t(E, "Horizontal leg (same y)", "가로 변 (같은 y)")} → <b style={{ color: "#7c3aed" }}>({pts[hIdx][0]}, {pts[hIdx][1]})</b>, {t(E, "base", "밑변")} = {hDx}<br/>
            {t(E, "Vertical leg (same x)", "세로 변 (같은 x)")} → <b style={{ color: "#15803d" }}>({pts[vIdx][0]}, {pts[vIdx][1]})</b>, {t(E, "height", "높이")} = {vDy}<br/>
            <b style={{ color: A }}>2 × area = base × height = {hDx} × {vDy} = {twiceArea}</b>
          </>
        ) : (
          <span style={{ color: "#dc2626" }}>{t(E, "No axis-aligned triangle from this corner — pick another post.", "이 꼭짓점에서는 축에 평행한 삼각형 못 만들어요 — 다른 기둥을 골라봐요.")}</span>
        )}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "points = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    points.append((x, y))",
  "",
  "# Group points by x-coordinate and y-coordinate",
  "from collections import defaultdict",
  "by_x = defaultdict(list)",
  "by_y = defaultdict(list)",
  "for x, y in points:",
  "    by_x[x].append(y)",
  "    by_y[y].append(x)",
  "",
  "ans = 0",
  "# For each point as the right-angle vertex",
  "for x, y in points:",
  "    # vertical neighbors (same x, different y)",
  "    heights = [abs(y2 - y) for y2 in by_x[x] if y2 != y]",
  "    # horizontal neighbors (same y, different x)",
  "    widths = [abs(x2 - x) for x2 in by_y[y] if x2 != x]",
  "    for h in heights:",
  "        for w in widths:",
  "            ans = max(ans, h * w)",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int main() {",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> X(N), Y(N);",
  "    for (int i = 0; i < N; i++) cin >> X[i] >> Y[i];",
  "",
  "    // Find max area for axis-aligned right triangles",
  "    // Right angle at corner k: legs are |X[i]-X[k]| × |Y[j]-Y[k]|",
  "    // For each potential corner, find max horizontal + max vertical extent.",
  "    long long best = 0;",
  "    for (int k = 0; k < N; k++) {",
  "        long long maxDx = 0, maxDy = 0;",
  "        for (int i = 0; i < N; i++) {",
  "            if (Y[i] == Y[k]) maxDx = max(maxDx, abs(X[i] - X[k]));",
  "            if (X[i] == X[k]) maxDy = max(maxDy, abs(Y[i] - Y[k]));",
  "        }",
  "        best = max(best, maxDx * maxDy);",
  "    }",
  "    cout << best << \"\\n\";   // area × 2 (problem wants doubled area to keep int)",
  "    return 0;",
  "}",
];

export function getTrianglesSections(E) {
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

export function TrianglesProgressiveCode(props) {
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


export function downloadTrianglesPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Triangles — Full Study Guide", "Triangles — 종합 풀이 노트");
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

