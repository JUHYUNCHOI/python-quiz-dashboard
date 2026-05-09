import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1  # number of lamps",
  "    M = int(input_data[idx]); idx += 1  # number of toggle ops",
  "",
  "    # Each toggle operation: toggle lamps from L to R",
  "    toggles = [0] * (N + 2)  # difference array",
  "    for _ in range(M):",
  "        L = int(input_data[idx])",
  "        idx += 1",
  "        R = int(input_data[idx])",
  "        idx += 1",
  "        toggles[L] += 1",
  "        toggles[R + 1] -= 1",
  "",
  "    # Prefix sum to get toggle count per lamp",
  "    count = 0",
  "    ans = 0",
  "    for i in range(1, N + 1):",
  "        count += toggles[i]",
  "        if count % 2 == 1:  # odd toggles = ON",
  "            ans += 1",
  "",
  "    print(ans)",
  "",
  "solve()",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "",
  "    auto solve = [&]() {   // TODO: type args",
  "        auto input_data = sys.stdin.read().split();",
  "        auto idx = 0;",
  "        auto N = int(input_data[idx]); idx += 1  # number of lamps;",
  "        auto M = int(input_data[idx]); idx += 1  # number of toggle ops;",
  "",
  "        // Each toggle operation: toggle lamps from L to R",
  "        auto toggles = [0] * (N + 2)  # difference array;",
  "        for (long long _ = 0; _ < M; _++) {",
  "            auto L = int(input_data[idx]); idx += 1;",
  "            auto R = int(input_data[idx]); idx += 1;",
  "            // toggles[L] += 1",
  "            // toggles[R + 1] -= 1",
  "",
  "        // Prefix sum to get toggle count per lamp",
  "        auto count = 0;",
  "        auto ans = 0;",
  "        for (long long i = 1; i < N + 1; i++) {",
  "            count += toggles[i];",
  "            // if count % 2 == 1:  # odd toggles = ON",
  "                ans += 1;",
  "",
  "        cout << ans << \"\\n\";",
  "",
  "    // solve()",
  "",
  "    return 0;",
  "}",
];

export function getMcc22LampSections(E) {
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

/* ═══════════════════════════════════════════════════════════════
   Mcc22LampDeepAuditSim — deep-audit of the diff-array trick.
   Student picks a preset (N, list of toggle ops), tap any op to
   include / skip it, and watch THREE rows update live:
     1) toggle counts per lamp (raw)
     2) diff array (the trick: +1 at L, -1 at R+1)
     3) prefix-sum of diff = same as row 1, but built O(M+N)
   Lamps with odd toggle count light up. ON count appears at right.
   ═══════════════════════════════════════════════════════════════ */
const _LAMP_PRESETS = [
  { N: 5, ops: [[1, 5], [2, 4]] },           // teaches: nested → 2 ON
  { N: 6, ops: [[1, 3], [2, 5], [4, 6]] },   // overlapping
  { N: 8, ops: [[1, 8], [3, 6], [5, 7], [2, 2]] }, // mix incl. single
  { N: 7, ops: [[2, 6], [1, 7], [3, 5], [4, 4]] },
];

export function Mcc22LampDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const { N, ops } = _LAMP_PRESETS[pi];
  const [active, setActive] = useState(() => ops.map(() => true));

  const switchPreset = (newPi) => {
    setPi(newPi);
    setActive(_LAMP_PRESETS[newPi].ops.map(() => true));
  };
  const toggleOp = (i) => {
    const u = [...active]; u[i] = !u[i]; setActive(u);
  };
  const resetAll = () => setActive(ops.map(() => true));

  // raw toggle count per lamp (1..N)
  const counts = Array(N + 2).fill(0);
  // diff array (1..N+1)
  const diff = Array(N + 2).fill(0);
  ops.forEach(([L, R], i) => {
    if (!active[i]) return;
    for (let x = L; x <= R; x++) counts[x]++;
    diff[L]++;
    diff[R + 1]--;
  });
  // prefix-sum of diff for lamps 1..N
  const prefix = Array(N + 2).fill(0);
  let acc = 0;
  for (let i = 1; i <= N; i++) { acc += diff[i]; prefix[i] = acc; }

  let onCount = 0;
  for (let i = 1; i <= N; i++) if (prefix[i] % 2 === 1) onCount++;

  // shared cell style helpers
  const cellBase = {
    width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 6, fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
    border: "1px solid #d1d5db",
  };
  const labelStyle = {
    minWidth: 86, fontSize: 11, fontWeight: 700, color: C.dim,
    display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8,
  };

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_LAMP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8,
            border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            N={p.N}, M={p.ops.length}
          </button>
        ))}
        <button onClick={resetAll} style={{
          padding: "5px 10px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↺ Reset", "↺ 초기화")}
        </button>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 10 }}>
        {t(E, "Tap an operation to skip / include it. Watch all three rows update.",
              "연산을 탭해서 빼거나 포함해 봐. 세 줄이 동시에 변해요.")}
      </div>

      {/* operations row (clickable chips) */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
        {ops.map(([L, R], i) => {
          const on = active[i];
          return (
            <button key={i} onClick={() => toggleOp(i)} style={{
              padding: "5px 10px", borderRadius: 8,
              border: `1.5px solid ${on ? A : "#d1d5db"}`,
              background: on ? "#f5f3ff" : "#f9fafb",
              color: on ? "#5b21b6" : "#9ca3af",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
              textDecoration: on ? "none" : "line-through",
            }}>
              toggle({L},{R})
            </button>
          );
        })}
      </div>

      {/* lamp visual row (ON / OFF based on prefix % 2) */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
        <div style={labelStyle}>{t(E, "Lamps:", "램프:")}</div>
        {Array.from({ length: N }, (_, k) => {
          const idx = k + 1;
          const isOn = prefix[idx] % 2 === 1;
          return (
            <div key={idx} style={{
              ...cellBase,
              fontSize: 18,
              background: isOn ? "#fef3c7" : "#f3f4f6",
              border: `1.5px solid ${isOn ? "#f59e0b" : "#d1d5db"}`,
              color: isOn ? "#92400e" : "#9ca3af",
            }}>
              {isOn ? "💡" : "·"}
            </div>
          );
        })}
      </div>

      {/* row 1: raw toggle counts */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 4, flexWrap: "wrap", alignItems: "center" }}>
        <div style={labelStyle}>{t(E, "count:", "토글횟수:")}</div>
        {Array.from({ length: N }, (_, k) => {
          const idx = k + 1;
          const v = counts[idx];
          const odd = v % 2 === 1;
          return (
            <div key={idx} style={{
              ...cellBase,
              background: odd ? "#fef3c7" : "#f9fafb",
              borderColor: odd ? "#f59e0b" : "#e5e7eb",
              color: odd ? "#92400e" : "#6b7280",
            }}>
              {v}
            </div>
          );
        })}
      </div>

      {/* row 2: diff array (length N+1: indices 1..N+1) */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 4, flexWrap: "wrap", alignItems: "center" }}>
        <div style={labelStyle}>{t(E, "diff:", "차분:")}</div>
        {Array.from({ length: N + 1 }, (_, k) => {
          const idx = k + 1;
          const v = diff[idx];
          const nonzero = v !== 0;
          return (
            <div key={idx} style={{
              ...cellBase,
              background: nonzero ? "#ede9fe" : "#f9fafb",
              borderColor: nonzero ? A : "#e5e7eb",
              color: nonzero ? "#5b21b6" : "#9ca3af",
            }}>
              {v > 0 ? `+${v}` : v}
            </div>
          );
        })}
      </div>

      {/* row 3: prefix sum */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={labelStyle}>{t(E, "prefix:", "누적합:")}</div>
        {Array.from({ length: N }, (_, k) => {
          const idx = k + 1;
          const v = prefix[idx];
          const matches = v === counts[idx];
          return (
            <div key={idx} style={{
              ...cellBase,
              background: matches ? "#dcfce7" : "#fee2e2",
              borderColor: matches ? "#16a34a" : "#dc2626",
              color: matches ? "#166534" : "#991b1b",
            }}>
              {v}
            </div>
          );
        })}
      </div>

      {/* result panel */}
      <div style={{
        background: "#f5f3ff", border: `1px solid ${A}`, borderRadius: 10, padding: "10px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ fontSize: 12, color: "#5b21b6", fontWeight: 700 }}>
          {t(E, "Lamps ON (odd toggle count):", "켜진 램프 (홀수 토글):")}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
          {onCount}
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginTop: 8, lineHeight: 1.5 }}>
        {t(E,
          "Green prefix row = matches raw count. The diff trick gives the SAME answer in O(N+M) instead of O(N·M).",
          "초록색 누적합 줄 = 토글횟수와 똑같음. 차분 트릭은 O(N·M) 대신 O(N+M)으로 같은 답을 줘요.")}
      </div>
    </div>
  );
}

export function Mcc22LampProgressiveCode(props) {
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


export function downloadMcc22LampPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Lamp — Full Study Guide", "Mcc22Lamp — 종합 풀이 노트");
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

