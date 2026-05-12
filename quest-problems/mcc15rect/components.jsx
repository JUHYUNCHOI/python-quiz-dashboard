import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ================================================================
   Mcc15RectCornerSim — pick 3 corners, watch the 4th reveal via XOR
   pairing. Bilingual. Theme-matched (#059669 emerald).
   ================================================================ */
const PRESETS = [
  { corners: [[0, 0], [4, 0], [0, 3]], missing: [4, 3] },
  { corners: [[1, 1], [5, 1], [1, 4]], missing: [5, 4] },
  { corners: [[2, 0], [2, 5], [6, 0]], missing: [6, 5] },
  { corners: [[0, 2], [3, 2], [3, 6]], missing: [0, 6] },
];

export function Mcc15RectCornerSim({ E }) {
  const [pi, setPi] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const preset = PRESETS[pi];
  const [a, b, c] = preset.corners;
  const [mx, my] = preset.missing;

  const allX = [a[0], b[0], c[0], mx];
  const allY = [a[1], b[1], c[1], my];
  const minX = Math.min(...allX), maxX = Math.max(...allX);
  const minY = Math.min(...allY), maxY = Math.max(...allY);
  const padX = 1, padY = 1;
  const W = 240, H = 180;
  const sx = (x) => 20 + ((x - minX + padX) / (maxX - minX + 2 * padX)) * (W - 40);
  const sy = (y) => H - 20 - ((y - minY + padY) / (maxY - minY + 2 * padY)) * (H - 40);

  const x1 = a[0], x2 = b[0], x3 = c[0];
  const y1 = a[1], y2 = b[1], y3 = c[1];
  const xorX = x1 ^ x2 ^ x3;
  const xorY = y1 ^ y2 ^ y3;

  const next = () => { setPi((pi + 1) % PRESETS.length); setRevealed(false); };

  const dot = (x, y, color, label, key) => (
    <g key={key}>
      <circle cx={sx(x)} cy={sy(y)} r="6" fill={color} stroke="#fff" strokeWidth="2" />
      <text x={sx(x) + 9} y={sy(y) - 8} fontSize="11" fontWeight="700" fill={color}>{label}</text>
    </g>
  );

  return (
    <div style={{ background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: 12, marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 8, textAlign: "center" }}>
        🧪 {t(E, "Sim — Spot the missing corner", "시뮬 — 빠진 꼭짓점 찾기")}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <svg width={W} height={H} style={{ background: "#f0fdf4", borderRadius: 8 }}>
          {/* grid */}
          {Array.from({ length: maxX - minX + 2 * padX + 1 }).map((_, i) => {
            const gx = sx(minX - padX + i);
            return <line key={`vx${i}`} x1={gx} y1={20} x2={gx} y2={H - 20} stroke="#d1fae5" strokeWidth="1" />;
          })}
          {Array.from({ length: maxY - minY + 2 * padY + 1 }).map((_, i) => {
            const gy = sy(minY - padY + i);
            return <line key={`hy${i}`} x1={20} y1={gy} x2={W - 20} y2={gy} stroke="#d1fae5" strokeWidth="1" />;
          })}
          {/* rectangle outline if revealed */}
          {revealed && (() => {
            const xs = [...new Set(allX)].sort((p, q) => p - q);
            const ys = [...new Set(allY)].sort((p, q) => p - q);
            if (xs.length !== 2 || ys.length !== 2) return null;
            return <rect x={sx(xs[0])} y={sy(ys[1])} width={sx(xs[1]) - sx(xs[0])} height={sy(ys[0]) - sy(ys[1])}
              fill="none" stroke={A} strokeWidth="2" strokeDasharray="4 3" />;
          })()}
          {/* given corners */}
          {dot(a[0], a[1], "#059669", "A", "a")}
          {dot(b[0], b[1], "#059669", "B", "b")}
          {dot(c[0], c[1], "#059669", "C", "c")}
          {/* 4th corner */}
          {revealed
            ? dot(mx, my, "#dc2626", "?", "m")
            : <g>
                <circle cx={sx(mx)} cy={sy(my)} r="6" fill="#fde68a" stroke="#a16207" strokeWidth="2" strokeDasharray="2 2" />
                <text x={sx(mx) + 9} y={sy(my) - 8} fontSize="11" fontWeight="700" fill="#a16207">?</text>
              </g>}
        </svg>
      </div>

      <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55, padding: "0 4px" }}>
        <div><b style={{ color: A }}>{t(E, "Given:", "주어진 꼭짓점:")}</b>{` (${a[0]},${a[1]}), (${b[0]},${b[1]}), (${c[0]},${c[1]})`}</div>
        {revealed && (
          <div style={{ marginTop: 6, padding: 8, background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 6, fontSize: 11.5 }}>
            <div>{`x: ${x1} ^ ${x2} ^ ${x3} = `}<b style={{ color: "#dc2626" }}>{xorX}</b></div>
            <div>{`y: ${y1} ^ ${y2} ^ ${y3} = `}<b style={{ color: "#dc2626" }}>{xorY}</b></div>
            <div style={{ marginTop: 4, color: "#065f46" }}>
              {t(E, "Each side appears twice — XOR cancels the duplicates, leaving the lonely one.",
                  "각 좌표는 변마다 2번 등장 — XOR이 짝꿍을 지워서 짝 없는 값만 남아요.")}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10 }}>
        <button onClick={() => setRevealed(true)} disabled={revealed} style={{
          background: revealed ? "#d1fae5" : A, color: revealed ? "#065f46" : "#fff",
          border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 700,
          cursor: revealed ? "default" : "pointer",
        }}>
          {revealed ? t(E, "Revealed", "공개됨") : t(E, "Reveal 4th corner", "4번째 꼭짓점 공개")}
        </button>
        <button onClick={next} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, "Try another", "다른 예제")}
        </button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    coords = []",
  "    for i in range(3):",
  "        x, y = map(int, input().split())",
  "        coords.append((x, y))",
  "    x1, y1 = coords[0]",
  "    x2, y2 = coords[1]",
  "    x3, y3 = coords[2]",
  "    # XOR trick: the missing coordinate",
  "    x4 = x1 ^ x2 ^ x3",
  "    y4 = y1 ^ y2 ^ y3",
  "    print(x4, y4)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int T; cin >> T;",
  "    for (int _ = 0; _ < T; _++) {",
  "        auto coords = [];",
  "        for (int i = 0; i < 3; i++) {",
  "            int x, y; cin >> x >> y;",
  "            // coords.append((x, y))",
  "        // x1, y1 = coords[0]",
  "        // x2, y2 = coords[1]",
  "        // x3, y3 = coords[2]",
  "        // XOR trick: the missing coordinate",
  "        auto x4 = x1 ^ x2 ^ x3;",
  "        auto y4 = y1 ^ y2 ^ y3;",
  "        cout << x4, y4 << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc15RectSections(E) {
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
        t(E, "Split #include into specific headers you've learned (iostream, vector, string).",
            "#include 는 배운 헤더들로 (iostream, vector, string) 나눠 적어."),
        t(E, "Use int for sums and indices — only switch to a bigger type when sums exceed ~2×10^9.",
            "합계·인덱스는 int 로 충분 — 2×10^9 넘는 큰 합계만 더 큰 타입 고려."),
      ],
    },
  ];
}

export function Mcc15RectProgressiveCode(props) {
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


export function downloadMcc15RectPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Rect — Full Study Guide", "Mcc15Rect — 종합 풀이 노트");
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

