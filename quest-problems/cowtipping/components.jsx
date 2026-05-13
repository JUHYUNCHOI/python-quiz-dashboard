import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ================================================================
   CowTipSim — clickable subgrid-toggle sandbox.
   Click any cell (i, j) and the rectangle (0,0)..(i,j) flips.
   Counter shows how many tips. Goal: every cow facing down (0).
   ================================================================ */
const SIM_PRESETS = [
  { label: "★", grid: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
  { label: "▣", grid: [[1, 1, 0], [1, 0, 0], [0, 0, 0]] },
  { label: "◆", grid: [[1, 1, 1], [1, 1, 0], [1, 0, 0]] },
];

export function CowTipSim({ E }) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [grid, setGrid] = useState(() => SIM_PRESETS[0].grid.map((r) => [...r]));
  const [tips, setTips] = useState(0);
  const [history, setHistory] = useState([]);

  const N = grid.length;
  const allDown = grid.every((row) => row.every((v) => v === 0));

  const handleCell = (i, j) => {
    const next = grid.map((row, r) =>
      row.map((v, c) => (r <= i && c <= j ? v ^ 1 : v))
    );
    setGrid(next);
    setTips(tips + 1);
    setHistory([...history, [i, j]]);
  };

  const reset = () => {
    setGrid(SIM_PRESETS[presetIdx].grid.map((r) => [...r]));
    setTips(0);
    setHistory([]);
  };

  const choosePreset = (idx) => {
    setPresetIdx(idx);
    setGrid(SIM_PRESETS[idx].grid.map((r) => [...r]));
    setTips(0);
    setHistory([]);
  };

  const cellSize = 56;

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: "#ecfdf5", border: "1.5px solid #6ee7b7", borderRadius: 12,
        padding: "10px 14px", marginBottom: 12, fontSize: 12.5, color: "#065f46", lineHeight: 1.55,
      }}>
        <b>🐄 {t(E, "Try it!", "직접 해봐!")}</b>{" "}
        {t(E,
          "Click any cell (i, j) — every cow inside the rectangle (0, 0) to (i, j) flips. Make all cows face DOWN (0) in the fewest tips.",
          "어떤 칸 (i, j) 든 클릭하면 (0, 0) ~ (i, j) 직사각형 안 모든 소가 뒤집혀요. 가장 적은 횟수로 모두 0 (엎드림) 으로 만들어 봐요.")}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: C.dim, fontWeight: 600 }}>
          {t(E, "Preset:", "예시:")}
        </span>
        {SIM_PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => choosePreset(idx)}
            style={{
              background: idx === presetIdx ? A : "#fff",
              color: idx === presetIdx ? "#fff" : A,
              border: `1.5px solid ${A}`,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={reset}
          style={{
            marginLeft: "auto",
            background: "#fff",
            color: "#6b7280",
            border: "1.5px solid #d1d5db",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ↻ {t(E, "Reset", "초기화")}
        </button>
      </div>

      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(${N}, ${cellSize}px)`,
          gap: 4,
          background: "#f0fdf4",
          border: `2px solid ${A}`,
          borderRadius: 10,
          padding: 8,
        }}>
          {grid.map((row, i) =>
            row.map((v, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleCell(i, j)}
                title={`(${i}, ${j})`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  border: "1.5px solid #d1d5db",
                  borderRadius: 8,
                  background: v === 1 ? "#fef3c7" : "#ecfdf5",
                  fontSize: 26,
                  cursor: "pointer",
                  transition: "background 0.15s",
                  padding: 0,
                }}
              >
                {v === 1 ? "🐄" : "💤"}
              </button>
            ))
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }}>
          <div style={{
            background: "#fff",
            border: `1.5px solid ${A}`,
            borderRadius: 10,
            padding: "10px 14px",
          }}>
            <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, letterSpacing: 0.5 }}>
              {t(E, "TIPS USED", "사용한 횟수")}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: A, lineHeight: 1.1 }}>
              {tips}
            </div>
          </div>

          <div style={{
            background: allDown ? "#dcfce7" : "#fef3c7",
            border: `1.5px solid ${allDown ? "#16a34a" : "#fbbf24"}`,
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 12.5,
            fontWeight: 700,
            color: allDown ? "#15803d" : "#92400e",
            textAlign: "center",
          }}>
            {allDown
              ? t(E, "✅ All down! Nice work.", "✅ 모두 엎드림! 잘했어.")
              : t(E, "🐄 Standing cows remain", "🐄 아직 서있는 소가 있어요")}
          </div>

          {history.length > 0 && (
            <div style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 11.5,
              color: C.text,
              lineHeight: 1.5,
              maxHeight: 130,
              overflowY: "auto",
            }}>
              <div style={{ fontWeight: 700, color: C.dim, marginBottom: 4, fontSize: 10.5, letterSpacing: 0.5 }}>
                {t(E, "MOVES", "기록")}
              </div>
              {history.map(([i, j], k) => (
                <div key={k} style={{ fontFamily: "monospace" }}>
                  {k + 1}. ({i}, {j})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "import sys",
  "sys.stdin = open('cowtip.in')",
  "sys.stdout = open('cowtip.out', 'w')",
  "",
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(list(map(int, list(input().strip()))))",
  "",
  "ans = 0",
  "# Process from bottom-right to top-left",
  "for i in range(N-1, -1, -1):",
  "    for j in range(N-1, -1, -1):",
  "        if grid[i][j] == 1:",
  "            ans += 1",
  "            # Toggle rectangle (0,0)-(i,j)",
  "            for r in range(i+1):",
  "                for c in range(j+1):",
  "                    grid[r][c] ^= 1",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    freopen(\"cowtip.in\", \"r\", stdin);",
  "    freopen(\"cowtip.out\", \"w\", stdout);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<string> rows(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> rows[i];",
  "    }",
  "    vector<vector<int>> grid(N, vector<int>(N));",
  "    for (int i = 0; i < N; i++) {",
  "        for (int j = 0; j < N; j++) {",
  "            grid[i][j] = rows[i][j] - '0';",
  "        }",
  "    }",
  "    int ans = 0;",
  "    for (int i = N - 1; i >= 0; i--) {",
  "        for (int j = N - 1; j >= 0; j--) {",
  "            if (grid[i][j] == 1) {",
  "                ans++;",
  "                for (int x = 0; x <= i; x++) {",
  "                    for (int y = 0; y <= j; y++) {",
  "                        grid[x][y] ^= 1;",
  "                    }",
  "                }",
  "            }",
  "        }",
  "    }",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCowTipSections(E) {
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
        t(E, "vector<vector<int>> stores the grid as integers (0/1).",
            "vector<vector<int>>로 격자를 0/1 정수로 저장."),
        t(E, "Walk from bottom-right back to top-left, flipping each 1 we hit.",
            "오른쪽-아래에서 왼쪽-위로 훑으며 1을 만나면 뒤집기."),
      ],
    },
  ];
}

export function CowTipProgressiveCode(props) {
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


export function downloadCowTipPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CowTip — Full Study Guide", "CowTip — 종합 풀이 노트");
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

