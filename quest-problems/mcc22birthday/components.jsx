import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   Mcc22BirthdayDeepAuditSim — toggle each cat's availability per
   time slot, watch the column counts update live, and see which
   slot wins the party. Mirrors the greedy column-scan in solve().
   ═══════════════════════════════════════════════════════════════ */
const _DEEP_PRESETS = [
  { label: "3×2", cats: ["🐈", "🐱", "🐈‍⬛"], slots: 2, init: [[1,0],[1,1],[0,1]] },
  { label: "4×3", cats: ["🐈", "🐱", "🐈‍⬛", "😺"], slots: 3, init: [[1,0,1],[0,1,1],[1,1,0],[0,0,1]] },
  { label: "5×4", cats: ["🐈", "🐱", "🐈‍⬛", "😺", "😻"], slots: 4, init: [[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,1,0]] },
];

export function Mcc22BirthdayDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _DEEP_PRESETS[pi];
  const [grid, setGrid] = useState(() => preset.init.map(row => [...row]));

  const switchPreset = (newPi) => {
    setPi(newPi);
    setGrid(_DEEP_PRESETS[newPi].init.map(row => [...row]));
  };

  const toggle = (r, c) => {
    const u = grid.map(row => [...row]);
    u[r][c] = u[r][c] ? 0 : 1;
    setGrid(u);
  };

  const counts = [];
  for (let c = 0; c < preset.slots; c++) {
    let s = 0;
    for (let r = 0; r < preset.cats.length; r++) s += grid[r]?.[c] || 0;
    counts.push(s);
  }
  const best = counts.reduce((a, b) => Math.max(a, b), 0);
  const winners = counts.map((v, i) => v === best ? i : -1).filter(i => i >= 0);

  const reset = () => setGrid(preset.init.map(row => [...row]));
  const fillAll = () => setGrid(preset.cats.map(() => Array(preset.slots).fill(1)));
  const clearAll = () => setGrid(preset.cats.map(() => Array(preset.slots).fill(0)));

  const cellSize = 40;

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_DEEP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {t(E, "Tap a cell to toggle a cat's availability. Watch each slot's count update live.",
              "셀을 탭해서 고양이의 참석 가능 여부를 토글해 봐. 각 시간대 인원수가 바로바로 갱신돼.")}
      </div>

      {/* matrix */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ display: "inline-block" }}>
          {/* header row: slot labels */}
          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
            <div style={{ width: cellSize + 4, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.dim, fontWeight: 700 }}>
              {t(E, "cat \\ slot", "고양이 \\ 시간대")}
            </div>
            {Array.from({ length: preset.slots }).map((_, c) => (
              <div key={c} style={{
                width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: A, background: "#fff7ed", borderRadius: 6, border: "1px solid #fdba74",
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {`s${c + 1}`}
              </div>
            ))}
          </div>

          {/* body rows */}
          {preset.cats.map((cat, r) => (
            <div key={r} style={{ display: "flex", gap: 4, marginBottom: 4 }}>
              <div style={{ width: cellSize + 4, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {cat}
              </div>
              {Array.from({ length: preset.slots }).map((_, c) => {
                const on = !!grid[r]?.[c];
                return (
                  <button key={c} onClick={() => toggle(r, c)} style={{
                    width: cellSize, height: cellSize, padding: 0, cursor: "pointer",
                    borderRadius: 6, border: `1.5px solid ${on ? "#f97316" : "#e5e7eb"}`,
                    background: on ? "#fed7aa" : "#f9fafb",
                    color: on ? "#9a3412" : "#cbd5e1",
                    fontSize: 16, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {on ? "✓" : "·"}
                  </button>
                );
              })}
            </div>
          ))}

          {/* footer row: column sums */}
          <div style={{ display: "flex", gap: 4, marginTop: 6, paddingTop: 6, borderTop: "1px dashed #fdba74" }}>
            <div style={{ width: cellSize + 4, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#15803d" }}>
              {t(E, "count", "인원수")}
            </div>
            {counts.map((v, c) => {
              const isWin = v === best && best > 0;
              return (
                <div key={c} style={{
                  width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 6, fontSize: 16, fontWeight: 800,
                  background: isWin ? "#dcfce7" : "#f3f4f6",
                  border: `1.5px solid ${isWin ? "#16a34a" : "#e5e7eb"}`,
                  color: isWin ? "#15803d" : C.dim,
                  fontFamily: "'JetBrains Mono',monospace",
                }}>
                  {v}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* result banner */}
      <div style={{
        background: best > 0 ? "#dcfce7" : "#fee2e2",
        border: `1px solid ${best > 0 ? "#16a34a" : "#dc2626"}`,
        borderRadius: 10, padding: "8px 12px", marginBottom: 8,
        textAlign: "center", fontSize: 13, fontWeight: 700,
        color: best > 0 ? "#15803d" : "#991b1b",
      }}>
        {best > 0
          ? t(E, `🎂 Best slot: ${winners.map(i => `s${i + 1}`).join(", ")} → ${best} cat${best === 1 ? "" : "s"}`,
                `🎂 최고 시간대: ${winners.map(i => `s${i + 1}`).join(", ")} → ${best}마리`)
          : t(E, "✗ Nobody can attend any slot — pick at least one ✓.",
                "✗ 어느 시간대도 참석자가 없어 — ✓ 를 하나라도 켜봐.")}
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <button onClick={reset} style={{
          padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 11, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset", "↻ 초기화")}
        </button>
        <button onClick={fillAll} style={{
          padding: "5px 12px", borderRadius: 8, border: `1px solid ${A}`,
          background: A, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, "✓ All available", "✓ 모두 참석")}
        </button>
        <button onClick={clearAll} style={{
          padding: "5px 12px", borderRadius: 8, border: `1px solid #d1d5db`,
          background: "#f9fafb", color: C.dim, fontSize: 11, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, "· Clear", "· 모두 비우기")}
        </button>
      </div>

      {/* hint */}
      <div style={{
        background: "#fff7ed", border: `1px solid #fdba74`, borderRadius: 8, padding: "8px 12px",
        fontSize: 11, color: "#9a3412", textAlign: "center", lineHeight: 1.5,
      }}>
        {t(E, "💡 The solution scans each column and counts ✓'s — exactly what the green row shows. The max wins.",
              "💡 풀이 코드도 각 열을 훑으며 ✓ 개수를 세 — 초록색 줄이 바로 그 결과. 그중 최댓값이 답.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1  # cats",
  "    T = int(input_data[idx]); idx += 1  # time slots",
  "",
  "    # Each cat has a set of available time slots",
  "    avail = []",
  "    for i in range(N):",
  "        k = int(input_data[idx])",
  "        idx += 1",
  "        slots = set()",
  "        for _ in range(k):",
  "            slots.add(int(input_data[idx]))",
  "            idx += 1",
  "        avail.append(slots)",
  "",
  "    # Greedy: pick the time slot that accommodates most cats",
  "    best = 0",
  "    for slot in range(1, T + 1):",
  "        count = sum(1 for i in range(N) if slot in avail[i])",
  "        best = max(best, count)",
  "",
  "    print(best)",
  "",
  "solve()",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "",
  "    auto solve = [&]() {   // TODO: type args",
  "        auto input_data = sys.stdin.read().split();",
  "        auto idx = 0;",
  "        auto N = int(input_data[idx]); idx += 1  # cats;",
  "        auto T = int(input_data[idx]); idx += 1  # time slots;",
  "",
  "        // Each cat has a set of available time slots",
  "        auto avail = [];",
  "        for (int i = 0; i < N; i++) {",
  "            auto k = int(input_data[idx]); idx += 1;",
  "            auto slots = set();",
  "            for (int _ = 0; _ < k; _++) {",
  "                // slots.add(int(input_data[idx]))",
  "                idx += 1",
  "            // avail.append(slots)",
  "",
  "        // Greedy: pick the time slot that accommodates most cats",
  "        auto best = 0;",
  "        for (int slot = 1; slot < T + 1; slot++) {",
  "            auto count = sum(1 for i in range(N) if slot in avail[i]);",
  "            auto best = max(best, count);",
  "",
  "        cout << best << \"\\n\";",
  "",
  "    // solve()",
  "",
  "    return 0;",
  "}",
];

export function getMcc22BirthdaySections(E) {
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

export function Mcc22BirthdayProgressiveCode(props) {
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


export function downloadMcc22BirthdayPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Birthday — Full Study Guide", "Mcc22Birthday — 종합 풀이 노트");
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

