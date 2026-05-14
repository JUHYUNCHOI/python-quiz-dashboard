// 🔒 USACO_VERIFIED — cpid=665, cowsignal (2016 Dec Bronze #3)
// py 10/10 PASS · cpp 10/10 PASS · 2026-05-14
import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   Scale-Up Sim: edit a 3×3 grid + K slider, watch live K×K expansion
   ═══════════════════════════════════════════════════════════════ */
export function CowSignalScaleSim({ E }) {
  const [grid, setGrid] = useState([
    ["X", ".", "X"],
    [".", "X", "."],
    ["X", ".", "X"],
  ]);
  const [K, setK] = useState(2);
  const [hover, setHover] = useState({ r: 1, c: 1 });

  const M = grid.length;
  const N = grid[0].length;

  const toggle = (r, c) => {
    setGrid(prev => prev.map((row, i) =>
      i === r ? row.map((ch, j) => j === c ? (ch === "X" ? "." : "X") : ch) : row
    ));
  };

  // Build expanded grid: M*K rows, N*K cols
  const expanded = [];
  for (let i = 0; i < M; i++) {
    for (let rep = 0; rep < K; rep++) {
      const row = [];
      for (let j = 0; j < N; j++) {
        for (let k = 0; k < K; k++) {
          row.push({ ch: grid[i][j], srcR: i, srcC: j });
        }
      }
      expanded.push(row);
    }
  }

  const cellSrcStyle = (ch, isHi) => ({
    width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 6, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
    background: ch === "X" ? "#7c3aed" : "#f5f3ff",
    border: isHi ? "2px solid #f59e0b" : `1px solid ${ch === "X" ? "#6d28d9" : "#c4b5fd"}`,
    color: ch === "X" ? "#fff" : "#c4b5fd",
    cursor: "pointer",
    boxShadow: isHi ? "0 0 0 2px #fef3c7" : "none",
    transition: "border .15s, box-shadow .15s",
  });

  // Expanded cell size shrinks as K grows
  const expCell = Math.max(10, Math.min(20, Math.floor(120 / (N * K))));

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "#fef3c7", border: "1.5px solid #f59e0b", borderRadius: 10,
        padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "#92400e", textAlign: "center",
      }}>
        🧪 {t(E,
          "Click a cell to flip X ↔ . — drag the K slider — see the live K×K expansion!",
          "셀을 눌러서 X ↔ . 바꿔봐요 — K 슬라이더를 옮기면서 — 실시간 K×K 확대를 확인!")}
      </div>

      {/* K slider */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        marginBottom: 14, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>
          K = <span style={{ fontSize: 18, fontFamily: "'JetBrains Mono',monospace" }}>{K}</span>
        </span>
        <input
          type="range" min={1} max={4} step={1} value={K}
          onChange={e => setK(Number(e.target.value))}
          style={{ width: 180, accentColor: "#8b5cf6" }}
        />
        <span style={{ fontSize: 11, color: C.dim }}>
          {t(E, `output: ${M*K}×${N*K}`, `출력: ${M*K}×${N*K}`)}
        </span>
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Original (editable) */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#8b5cf6", marginBottom: 6 }}>
            {t(E, `Original (${M}×${N}) — click to flip`, `원본 (${M}×${N}) — 클릭으로 변경`)}
          </div>
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 3 }}>
            {grid.map((row, r) => (
              <div key={r} style={{ display: "flex", gap: 3 }}>
                {row.map((ch, c) => {
                  const isHi = hover.r === r && hover.c === c;
                  return (
                    <div
                      key={c}
                      onClick={() => toggle(r, c)}
                      onMouseEnter={() => setHover({ r, c })}
                      style={cellSrcStyle(ch, isHi)}
                    >{ch}</div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.dim, marginTop: 6 }}>
            {t(E, "↑ source cell highlighted", "↑ 원본 칸 강조")}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#8b5cf6", fontWeight: 700, alignSelf: "center" }}>→</div>

        {/* Expanded */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 6 }}>
            {t(E, `Expanded (${M*K}×${N*K})`, `확대 (${M*K}×${N*K})`)}
          </div>
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 1, padding: 4, background: "#f9fafb", borderRadius: 6 }}>
            {expanded.map((row, r) => (
              <div key={r} style={{ display: "flex", gap: 1 }}>
                {row.map((cell, c) => {
                  const isBlock = cell.srcR === hover.r && cell.srcC === hover.c;
                  return (
                    <div key={c} style={{
                      width: expCell, height: expCell,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: Math.max(7, expCell - 6), fontWeight: 700,
                      fontFamily: "'JetBrains Mono',monospace",
                      background: cell.ch === "X" ? "#7c3aed" : "#f5f3ff",
                      border: isBlock ? "1.5px solid #f59e0b" : `1px solid ${cell.ch === "X" ? "#6d28d9" : "#ddd6fe"}`,
                      color: cell.ch === "X" ? "#fff" : "#c4b5fd",
                      borderRadius: 2,
                    }}>{expCell >= 14 ? cell.ch : ""}</div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#16a34a", marginTop: 6, fontWeight: 700 }}>
            {t(E, `↑ K×K block (${K}×${K}) for hovered cell`, `↑ 호버한 칸의 K×K 블록 (${K}×${K})`)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, padding: "8px 12px", background: "#f5f3ff", borderRadius: 8, fontSize: 11, color: "#5b21b6", textAlign: "center" }}>
        {t(E,
          `One source cell → ${K}×${K} = ${K*K} copies. Total: ${M*N} cells → ${M*K*N*K} cells.`,
          `원본 한 칸 → ${K}×${K} = ${K*K}개 복사. 총: ${M*N}칸 → ${M*K*N*K}칸.`)}
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "with open('cowsignal.in', 'r') as file:",
  "    lines = file.readlines()",
  "",
  "M, N, K = map(int, lines[0].split())",
  "grid = []",
  "for i in range(M):",
  "    grid.append(lines[1 + i].strip())",
  "",
  "# 각 행을 K 번 반복, 각 글자도 K 번 반복",
  "with open('cowsignal.out', 'w') as file:",
  "    for i in range(M):",
  "        for rep in range(K):",
  "            row = ''",
  "            for j in range(N):",
  "                row += grid[i][j] * K",
  "            file.write(row + '\\n')",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <fstream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    ifstream fin(\"cowsignal.in\");",
  "    ofstream fout(\"cowsignal.out\");",
  "",
  "    int M, N, K;",
  "    fin >> M >> N >> K;",
  "    vector<string> grid(M);",
  "    for (int i = 0; i < M; i++) fin >> grid[i];",
  "    // 각 행을 K 번 반복, 각 글자도 K 번 반복",
  "    for (int i = 0; i < M; i++) {",
  "        for (int rep = 0; rep < K; rep++) {",
  "            for (int j = 0; j < N; j++) {",
  "                for (int k = 0; k < K; k++) {",
  "                    fout << grid[i][j];",
  "                }",
  "            }",
  "            fout << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getCowSignalSections(E) {
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
        t(E, "vector<string> stores each row of the input grid.",
            "vector<string>로 입력 격자의 각 행을 저장."),
        t(E, "Nested for-loops repeat each cell K times in both directions.",
            "이중 for문으로 각 칸을 가로/세로 K번 반복 출력."),
      ],
    },
  ];
}

export function CowSignalProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadCowSignalPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CowSignal — Full Study Guide", "CowSignal — 종합 풀이 노트");
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

