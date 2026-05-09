import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ═══════════════════════════════════════════════════════════════
   Deep-Audit Sim: Rectangle XOR Inspector
   - Bilingual (E flag), theme-matched (green A = #059669).
   - Student picks one of 3 preset 3-corner sets, sees the rectangle
     drawn live, then runs XOR bit-by-bit on the x and y coordinates
     to reveal the missing 4th corner. Reinforces the XOR-trick
     invariant (each axis value appears twice -> XOR cancels).
   ═══════════════════════════════════════════════════════════════ */
const RECT_PRESETS = [
  { id: "A", c1: [0, 0], c2: [2, 0], c3: [0, 3], hidden: [2, 3] },
  { id: "B", c1: [1, 1], c2: [4, 1], c3: [1, 5], hidden: [4, 5] },
  { id: "C", c1: [2, 3], c2: [2, 7], c3: [6, 3], hidden: [6, 7] },
];

function xorTrace(a, b, c) {
  // Returns step list of XOR for 3 ints, bit-by-bit (4 bits is enough for presets up to 7).
  const bits = 4;
  const toBits = (n) => n.toString(2).padStart(bits, "0");
  const r = a ^ b ^ c;
  return { ba: toBits(a), bb: toBits(b), bc: toBits(c), br: toBits(r), val: r };
}

export function Mcc19Rect2AuditSim({ E }) {
  const [pid, setPid] = useState("A");
  const [reveal, setReveal] = useState(false);
  const p = RECT_PRESETS.find(r => r.id === pid) || RECT_PRESETS[0];
  const corners = [p.c1, p.c2, p.c3];
  const all4 = [...corners, p.hidden];
  const xs = all4.map(c => c[0]);
  const ys = all4.map(c => c[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const W = 240, H = 200, padPx = 24;
  const sx = (x) => padPx + ((x - minX) / Math.max(1, maxX - minX)) * (W - 2 * padPx);
  const sy = (y) => H - padPx - ((y - minY) / Math.max(1, maxY - minY)) * (H - 2 * padPx);
  const tx = xorTrace(p.c1[0], p.c2[0], p.c3[0]);
  const ty = xorTrace(p.c1[1], p.c2[1], p.c3[1]);

  const cornerDot = (c, i, hidden) => (
    <g key={i}>
      <circle cx={sx(c[0])} cy={sy(c[1])} r={7}
        fill={hidden ? (reveal ? "#fbbf24" : "#fff") : A}
        stroke={hidden ? "#d97706" : A}
        strokeWidth={2}
        strokeDasharray={hidden && !reveal ? "3 3" : "0"} />
      <text x={sx(c[0]) + 10} y={sy(c[1]) - 8} fontSize={11} fill={hidden ? "#92400e" : "#065f46"} fontWeight={700}>
        {hidden && !reveal ? "?" : `(${c[0]},${c[1]})`}
      </text>
    </g>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#ecfdf5", border: `1.5px solid #6ee7b7`, borderRadius: 12,
        padding: 12, marginBottom: 10,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 8 }}>
          🔬 {t(E, "Deep-Audit: XOR Bit Inspector", "정밀 감사: XOR 비트 검사기")}
        </div>
        <div style={{ fontSize: 12, color: "#065f46", marginBottom: 8, lineHeight: 1.5 }}>
          {t(E,
            "Pick a preset, watch the 3 known corners. The 4th is hidden until you XOR.",
            "프리셋을 골라 알려진 3 꼭짓점을 봐요. 4 번째는 XOR 하기 전엔 숨겨져 있어요.")}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {RECT_PRESETS.map(r => (
            <button key={r.id}
              onClick={() => { setPid(r.id); setReveal(false); }}
              style={{
                padding: "5px 12px", fontSize: 12, fontWeight: 700,
                borderRadius: 6, cursor: "pointer",
                border: `1.5px solid ${A}`,
                background: pid === r.id ? A : "#fff",
                color: pid === r.id ? "#fff" : A,
              }}>
              {t(E, `Preset ${r.id}`, `프리셋 ${r.id}`)}
            </button>
          ))}
          <button onClick={() => setReveal(v => !v)}
            style={{
              padding: "5px 12px", fontSize: 12, fontWeight: 700,
              borderRadius: 6, cursor: "pointer", marginLeft: "auto",
              border: `1.5px solid #d97706`,
              background: reveal ? "#d97706" : "#fff",
              color: reveal ? "#fff" : "#d97706",
            }}>
            {reveal
              ? t(E, "🙈 Hide 4th", "🙈 4 번째 숨기기")
              : t(E, "🔓 Run XOR → reveal", "🔓 XOR 실행 → 공개")}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
        <svg width={W} height={H} style={{
          background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8,
        }}>
          {/* axes */}
          <line x1={padPx} y1={H - padPx} x2={W - padPx} y2={H - padPx} stroke="#cbd5e1" strokeWidth={1} />
          <line x1={padPx} y1={padPx} x2={padPx} y2={H - padPx} stroke="#cbd5e1" strokeWidth={1} />
          {/* rectangle outline (only when revealed) */}
          {reveal && (
            <rect
              x={sx(minX)} y={sy(maxY)}
              width={sx(maxX) - sx(minX)} height={sy(minY) - sy(maxY)}
              fill="none" stroke={A} strokeWidth={2} strokeDasharray="4 3" />
          )}
          {corners.map((c, i) => cornerDot(c, i, false))}
          {cornerDot(p.hidden, 99, true)}
        </svg>

        <div style={{
          flex: "1 1 260px", minWidth: 240,
          background: "#0f172a", color: "#e2e8f0", borderRadius: 8,
          padding: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 12, lineHeight: 1.55,
        }}>
          <div style={{ color: "#94a3b8", marginBottom: 6 }}>
            {t(E, "// XOR audit on x-coords", "// x 좌표 XOR 감사")}
          </div>
          <div>x1 = {p.c1[0]}  <span style={{ color: "#64748b" }}>= {tx.ba}</span></div>
          <div>x2 = {p.c2[0]}  <span style={{ color: "#64748b" }}>= {tx.bb}</span></div>
          <div>x3 = {p.c3[0]}  <span style={{ color: "#64748b" }}>= {tx.bc}</span></div>
          <div style={{ borderTop: "1px dashed #334155", margin: "4px 0", paddingTop: 4 }}>
            x4 = {reveal
              ? <b style={{ color: "#fbbf24" }}>{tx.val}</b>
              : <span style={{ color: "#475569" }}>?</span>}
            {"  "}<span style={{ color: "#64748b" }}>
              = {reveal ? tx.br : "????"}
            </span>
          </div>
          <div style={{ height: 8 }} />
          <div style={{ color: "#94a3b8", marginBottom: 6 }}>
            {t(E, "// XOR audit on y-coords", "// y 좌표 XOR 감사")}
          </div>
          <div>y1 = {p.c1[1]}  <span style={{ color: "#64748b" }}>= {ty.ba}</span></div>
          <div>y2 = {p.c2[1]}  <span style={{ color: "#64748b" }}>= {ty.bb}</span></div>
          <div>y3 = {p.c3[1]}  <span style={{ color: "#64748b" }}>= {ty.bc}</span></div>
          <div style={{ borderTop: "1px dashed #334155", margin: "4px 0", paddingTop: 4 }}>
            y4 = {reveal
              ? <b style={{ color: "#fbbf24" }}>{ty.val}</b>
              : <span style={{ color: "#475569" }}>?</span>}
            {"  "}<span style={{ color: "#64748b" }}>
              = {reveal ? ty.br : "????"}
            </span>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 10, padding: "8px 12px", fontSize: 12,
        background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8,
        color: "#92400e", lineHeight: 1.55,
      }}>
        💡 {t(E,
          "Each x value appears twice across the 4 corners, so a^a = 0 cancels them and XORing the 3 known values leaves the missing one. Same trick on y.",
          "각 x 값은 4 꼭짓점에서 정확히 2 번 등장 → a^a = 0 으로 상쇄, 알려진 3 개 XOR 결과가 빠진 1 개. y 도 같은 원리.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# Given 3 corners of a rectangle, find the 4th",
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# XOR trick: x4 = x1 ^ x2 ^ x3, y4 = y1 ^ y2 ^ y3",
  "# Works because in a rectangle, each coordinate",
  "# appears exactly twice among the 4 corners",
  "x4 = x1 ^ x2 ^ x3",
  "y4 = y1 ^ y2 ^ y3",
  "",
  "print(x4, y4)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    // Given 3 corners of a rectangle, find the 4th",
  "    long long x1, y1; cin >> x1 >> y1;",
  "    long long x2, y2; cin >> x2 >> y2;",
  "    long long x3, y3; cin >> x3 >> y3;",
  "",
  "    // XOR trick: x4 = x1 ^ x2 ^ x3, y4 = y1 ^ y2 ^ y3",
  "    // Works because in a rectangle, each coordinate",
  "    // appears exactly twice among the 4 corners",
  "    auto x4 = x1 ^ x2 ^ x3;",
  "    auto y4 = y1 ^ y2 ^ y3;",
  "",
  "    cout << x4, y4 << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc19Rect2Sections(E) {
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

export function Mcc19Rect2ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#059669" />;
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


export function downloadMcc19Rect2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc19Rect2 — Full Study Guide", "Mcc19Rect2 — 종합 풀이 노트");
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

