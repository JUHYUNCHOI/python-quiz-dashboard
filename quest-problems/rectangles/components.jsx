import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   RectangleCountSim — pick 2 horizontal + 2 vertical lines
   from the (N+1) × (M+1) grid lines and watch a rectangle form.
   Cycles through every C(N+1,2) × C(M+1,2) combination so the
   student SEES the formula instead of just trusting it.
   ═══════════════════════════════════════════════════════════════ */
const _RECT_PRESETS = [
  { N: 1, M: 1 },
  { N: 2, M: 2 },
  { N: 3, M: 2 },
];

function _comb2(x) { return (x * (x - 1)) / 2; }

function _enumPairs(k) {
  const out = [];
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) out.push([i, j]);
  return out;
}

export function RectangleCountSim({ E }) {
  const [pi, setPi] = useState(1);
  const [idx, setIdx] = useState(0);
  const preset = _RECT_PRESETS[pi];
  const N = preset.N, M = preset.M;

  const hPairs = _enumPairs(N + 1);  // pairs of horizontal lines (y values 0..N)
  const vPairs = _enumPairs(M + 1);  // pairs of vertical lines (x values 0..M)
  const total = hPairs.length * vPairs.length;
  const safeIdx = Math.min(idx, total - 1);
  const hp = hPairs[Math.floor(safeIdx / vPairs.length)];
  const vp = vPairs[safeIdx % vPairs.length];

  const W = 320, H = 220;
  const padL = 28, padR = 16, padT = 16, padB = 28;
  const cw = (W - padL - padR) / M;
  const ch = (H - padT - padB) / N;
  const sx = (x) => padL + x * cw;
  const sy = (y) => padT + (N - y) * ch;  // flip so y grows up

  const reset = (newPi) => { setPi(newPi); setIdx(0); };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_RECT_PRESETS.map((p, i) => (
          <button key={i} onClick={() => reset(i)} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.N}×{p.M}</button>
        ))}
      </div>

      <svg width={W} height={H} style={{ display: "block", margin: "0 auto", background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8 }}>
        {/* horizontal grid lines (y = 0..N) */}
        {Array.from({ length: N + 1 }, (_, y) => {
          const sel = y === hp[0] || y === hp[1];
          return (
            <g key={`h${y}`}>
              <line x1={sx(0)} y1={sy(y)} x2={sx(M)} y2={sy(y)}
                stroke={sel ? A : "#cbd5e1"} strokeWidth={sel ? 2.5 : 1} />
              <text x={padL - 6} y={sy(y) + 3} fontSize="9" fill={sel ? A : "#94a3b8"} textAnchor="end" fontWeight={sel ? 800 : 400}>{y}</text>
            </g>
          );
        })}
        {/* vertical grid lines (x = 0..M) */}
        {Array.from({ length: M + 1 }, (_, x) => {
          const sel = x === vp[0] || x === vp[1];
          return (
            <g key={`v${x}`}>
              <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(N)}
                stroke={sel ? A : "#cbd5e1"} strokeWidth={sel ? 2.5 : 1} />
              <text x={sx(x)} y={sy(0) + 14} fontSize="9" fill={sel ? A : "#94a3b8"} textAnchor="middle" fontWeight={sel ? 800 : 400}>{x}</text>
            </g>
          );
        })}
        {/* highlighted rectangle fill */}
        <rect
          x={sx(vp[0])} y={sy(hp[1])}
          width={(vp[1] - vp[0]) * cw}
          height={(hp[1] - hp[0]) * ch}
          fill={A} fillOpacity="0.25" stroke={A} strokeWidth="2.5"
        />
      </svg>

      <div style={{ background: "#fff7ed", border: `1.5px solid #fdba74`, borderRadius: 10, padding: "10px 12px", marginTop: 10, marginBottom: 10, fontSize: 12, color: C.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.7 }}>
        {t(E,
          `H-lines picked: y = ${hp[0]}, ${hp[1]}  ·  V-lines picked: x = ${vp[0]}, ${vp[1]}`,
          `수평선 선택: y = ${hp[0]}, ${hp[1]}  ·  수직선 선택: x = ${vp[0]}, ${vp[1]}`)}<br/>
        {t(E,
          `rectangle ${safeIdx + 1} / ${total}  ·  C(${N + 1},2) × C(${M + 1},2) = ${_comb2(N + 1)} × ${_comb2(M + 1)} = `,
          `직사각형 ${safeIdx + 1} / ${total}  ·  C(${N + 1},2) × C(${M + 1},2) = ${_comb2(N + 1)} × ${_comb2(M + 1)} = `)}
        <b style={{ color: A }}>{total}</b>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setIdx(Math.max(0, safeIdx - 1))} disabled={safeIdx === 0} style={{
          background: safeIdx === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${safeIdx === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: safeIdx === 0 ? "#b0b5c3" : A,
          cursor: safeIdx === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{safeIdx + 1} / {total}</span>
        <button onClick={() => setIdx(Math.min(total - 1, safeIdx + 1))} disabled={safeIdx === total - 1} style={{
          background: safeIdx === total - 1 ? "#e5e7eb" : A, border: `1px solid ${safeIdx === total - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: safeIdx === total - 1 ? "#b0b5c3" : "#fff", cursor: safeIdx === total - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, M = map(int, input().split())",
  "",
  "# Count axis-aligned rectangles in an N x M grid",
  "# Choose 2 horizontal lines from (N+1) and",
  "# 2 vertical lines from (M+1)",
  "# C(N+1, 2) * C(M+1, 2)",
  "",
  "def comb2(x):",
  "    return x * (x - 1) // 2",
  "",
  "result = comb2(N + 1) * comb2(M + 1)",
  "print(result)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long N, M; cin >> N >> M;",
  "    auto comb2 = [](long long x){ return x * (x - 1) / 2; };",
  "    cout << comb2(N + 1) * comb2(M + 1) << \"\n\";",
  "    return 0;",
  "}",
];

export function getRectanglesSections(E) {
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

export function RectanglesProgressiveCode(props) {
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


export function downloadRectanglesPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Rectangles — Full Study Guide", "Rectangles — 종합 풀이 노트");
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

