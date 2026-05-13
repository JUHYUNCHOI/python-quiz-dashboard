import { useState, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ================================================================
   Interactive bounding-square simulator
   ================================================================
   - Two draggable axis-aligned rectangles on a 12×8 grid
   - Live readout: bounding box, square side, area
   - Bilingual via t(E, ...)
   ================================================================ */
const GRID_W = 12;
const GRID_H = 8;
const CELL = 32;

function clampRect(r) {
  const x = Math.max(0, Math.min(GRID_W - r.w, r.x));
  const y = Math.max(0, Math.min(GRID_H - r.h, r.y));
  return { ...r, x, y };
}

export function SqPastureSim({ E }) {
  const [rectA, setRectA] = useState({ x: 1, y: 4, w: 3, h: 2 });
  const [rectB, setRectB] = useState({ x: 7, y: 1, w: 3, h: 3 });
  const dragRef = useRef(null);
  const svgRef = useRef(null);

  const minX = Math.min(rectA.x, rectB.x);
  const maxX = Math.max(rectA.x + rectA.w, rectB.x + rectB.w);
  const minY = Math.min(rectA.y, rectB.y);
  const maxY = Math.max(rectA.y + rectA.h, rectB.y + rectB.h);
  const bbW = maxX - minX;
  const bbH = maxY - minY;
  const side = Math.max(bbW, bbH);
  const area = side * side;

  const toSvg = (gx, gy) => ({ x: gx * CELL, y: (GRID_H - gy) * CELL });

  const startDrag = (which) => (e) => {
    e.preventDefault();
    dragRef.current = { which, startClient: getClient(e) };
  };
  const getClient = (e) => {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };
  const onMove = (e) => {
    const d = dragRef.current;
    if (!d || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const client = getClient(e);
    const sx = ((client.x - rect.left) / rect.width) * GRID_W * CELL;
    const sy = ((client.y - rect.top) / rect.height) * GRID_H * CELL;
    const gx = Math.round(sx / CELL);
    const gy = Math.round(GRID_H - sy / CELL);
    const target = d.which === "A" ? rectA : rectB;
    const setter = d.which === "A" ? setRectA : setRectB;
    setter(clampRect({ ...target, x: gx - Math.floor(target.w / 2), y: gy - Math.floor(target.h / 2) }));
  };
  const endDrag = () => { dragRef.current = null; };

  const svgW = GRID_W * CELL;
  const svgH = GRID_H * CELL;
  const bb = { ...toSvg(minX, maxY), w: bbW * CELL, h: bbH * CELL };
  const sq = { ...toSvg(minX, minY + side), w: side * CELL, h: side * CELL };

  const Rect = ({ r, fill, stroke, label, which }) => {
    const tl = toSvg(r.x, r.y + r.h);
    return (
      <g
        onMouseDown={startDrag(which)}
        onTouchStart={startDrag(which)}
        style={{ cursor: "grab" }}
      >
        <rect x={tl.x} y={tl.y} width={r.w * CELL} height={r.h * CELL} fill={fill} stroke={stroke} strokeWidth={2} rx={4} />
        <text x={tl.x + (r.w * CELL) / 2} y={tl.y + (r.h * CELL) / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={stroke}>{label}</text>
      </g>
    );
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff7ed", border: "1.5px solid #d97706", borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", marginBottom: 8, textAlign: "center" }}>
          🎮 {t(E, "Try it: drag rectangles, watch the square shrink/grow", "직접 해보기: 직사각형을 드래그해서 정사각형이 변하는 걸 봐요")}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgW} ${svgH}`}
            width="100%"
            style={{ maxWidth: 480, height: "auto", touchAction: "none", background: "#fffbeb", border: `1.5px solid ${A}`, borderRadius: 8 }}
            onMouseMove={onMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchMove={onMove}
            onTouchEnd={endDrag}
          >
            {/* Grid */}
            {Array.from({ length: GRID_W + 1 }).map((_, i) => (
              <line key={`vx${i}`} x1={i * CELL} y1={0} x2={i * CELL} y2={svgH} stroke="#fde68a" strokeWidth={1} />
            ))}
            {Array.from({ length: GRID_H + 1 }).map((_, i) => (
              <line key={`hy${i}`} x1={0} y1={i * CELL} x2={svgW} y2={i * CELL} stroke="#fde68a" strokeWidth={1} />
            ))}

            {/* Smallest square (drawn first so it sits behind) */}
            <rect x={sq.x} y={sq.y} width={sq.w} height={sq.h} fill="rgba(217,119,6,0.10)" stroke="#d97706" strokeWidth={2.5} strokeDasharray="6 4" rx={4} />

            {/* Bounding box */}
            <rect x={bb.x} y={bb.y} width={bb.w} height={bb.h} fill="none" stroke="#7c3aed" strokeWidth={2} strokeDasharray="3 3" rx={3} />

            {/* Pastures */}
            <Rect r={rectA} fill="rgba(59,130,246,0.30)" stroke="#3b82f6" label="A" which="A" />
            <Rect r={rectB} fill="rgba(34,197,94,0.30)" stroke="#22c55e" label="B" which="B" />
          </svg>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, fontSize: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #fdba74", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ color: "#7c3aed", fontWeight: 700, fontSize: 11 }}>{t(E, "Bounding box", "바운딩 박스")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.text, marginTop: 2 }}>{bbW} × {bbH}</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #fdba74", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ color: "#d97706", fontWeight: 700, fontSize: 11 }}>{t(E, "Square side", "정사각형 변")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: C.text, marginTop: 2 }}>max({bbW}, {bbH}) = {side}</div>
          </div>
          <div style={{ background: "#fff7ed", border: "1.5px solid #d97706", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ color: "#9a3412", fontWeight: 700, fontSize: 11 }}>{t(E, "Area", "면적")}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 800, color: "#9a3412", marginTop: 2 }}>{side}² = {area}</div>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
          {t(E,
            "Purple dashed = bounding box · Orange dashed = smallest enclosing square",
            "보라 점선 = 바운딩 박스 · 주황 점선 = 가장 작은 정사각형")}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "import sys",
  "sys.stdin = open('square.in')",
  "sys.stdout = open('square.out', 'w')",
  "",
  "# Read two rectangles",
  "x1, y1, x2, y2 = map(int, input().split())",
  "x3, y3, x4, y4 = map(int, input().split())",
  "",
  "# Bounding box of both rectangles",
  "min_x = min(x1, x3)",
  "max_x = max(x2, x4)",
  "min_y = min(y1, y3)",
  "max_y = max(y2, y4)",
  "",
  "# Square side = max of width and height span",
  "side = max(max_x - min_x, max_y - min_y)",
  "",
  "print(side * side)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    freopen(\"square.in\", \"r\", stdin);",
  "    freopen(\"square.out\", \"w\", stdout);",
  "",
  "    long long x1, y1, x2, y2, x3, y3, x4, y4;",
  "    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3 >> x4 >> y4;",
  "    long long minX = min(x1, x3), maxX = max(x2, x4);",
  "    long long minY = min(y1, y3), maxY = max(y2, y4);",
  "    long long side = max(maxX - minX, maxY - minY);",
  "    cout << side * side << \"\\n\";",
  "    return 0;",
  "}",
];

export function getSqPastureSections(E) {
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

export function SqPastureProgressiveCode(props) {
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


export function downloadSqPasturePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "SqPasture — Full Study Guide", "SqPasture — 종합 풀이 노트");
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

