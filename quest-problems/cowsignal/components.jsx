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
          "칸을 누르면 X 와 . 가 바뀌어요. K 슬라이더를 움직이면 K×K 확대가 바로 보여요!")}
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
            {t(E, `Original (${M}×${N}) — click to flip`, `원본 (${M}×${N}) — 눌러서 바꾸기`)}
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
            {t(E, "↑ source cell highlighted", "↑ 고른 원본 칸이에요")}
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
            {t(E, `↑ K×K block (${K}×${K}) for hovered cell`, `↑ 마우스를 올린 칸이 만든 K×K 블록 (${K}×${K})`)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, padding: "8px 12px", background: "#f5f3ff", borderRadius: 8, fontSize: 11, color: "#5b21b6", textAlign: "center" }}>
        {t(E,
          `One source cell → ${K}×${K} = ${K*K} copies. Total: ${M*N} cells → ${M*K*N*K} cells.`,
          `원본 한 칸이 ${K}×${K} = ${K*K}개로 늘어나요. 모두 ${M*N}칸에서 ${M*K*N*K}칸이 돼요.`)}
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
  "    for (int i = 0; i < M; i++) {",
  "        fin >> grid[i];",
  "    }",
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
        t(E, "What do we output? The M×N grid scaled up to an M*K by N*K grid.",
            "무엇을 내놓아야 하나요? M×N 격자를 K배로 키운 M*K × N*K 격자예요."),
        t(E, "Each original cell must become a K×K block of the same character.",
            "원래 한 칸이 그대로 K×K 블록이 돼야 해요."),
        t(E, "So repeat each row K times, and inside a row repeat each character K times.",
            "그래서 각 행을 K번 출력하고,\n그 행 안에서 글자 하나도 K번씩 늘려요."),
      ],
      pyOnly: [
        t(E, "Python's high-level constructs (list, map) make algorithms concise.",
            "Python 은 list · map 을 바로 쓸 수 있어서 코드가 짧아져요."),
      ],
      cppOnly: [
        t(E, "vector<string> stores each row of the input grid.",
            "vector<string> 에 입력 격자의 각 행을 담아요."),
        t(E, "Nested for-loops repeat each cell K times in both directions.",
            "for 문을 겹쳐서 각 칸을 가로로 K번, 세로로 K번 출력해요."),
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
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 골라요.")}</div>
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

