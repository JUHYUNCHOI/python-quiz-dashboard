import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   Mcc20MissingDeepAuditSim — flip signs on each entry, watch the
   abs-value set update, and see which 1..N values stay "missing".
   The green sum row is exactly what print(sum(possible)) returns.
   ═══════════════════════════════════════════════════════════════ */
const _DEEP_PRESETS = [
  { label: "N=4", N: 4, init: [1, -3, 2] },        // missing: {4}
  { label: "N=5", N: 5, init: [-2, 4, -1, 5] },     // missing: {3}
  { label: "N=6", N: 6, init: [3, -1, -5, 6] },     // missing: {2,4}
  { label: "N=7", N: 7, init: [-2, 5, -7, 1, -3] }, // missing: {4,6}
];

export function Mcc20MissingDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = _DEEP_PRESETS[pi];
  const [arr, setArr] = useState(() => [...preset.init]);

  const switchPreset = (newPi) => {
    setPi(newPi);
    setArr([..._DEEP_PRESETS[newPi].init]);
  };

  const flipSign = (i) => {
    const u = [...arr];
    u[i] = -u[i];
    setArr(u);
  };

  const reset = () => setArr([...preset.init]);

  const present = new Set(arr.map((x) => Math.abs(x)));
  const missing = [];
  for (let v = 1; v <= preset.N; v++) {
    if (!present.has(v)) missing.push(v);
  }
  const total = missing.reduce((a, b) => a + b, 0);

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
        {t(E, "Tap an entry to flip its sign. abs() ignores it — the set of present values stays the same.",
              "항목을 탭해서 부호를 바꿔봐. abs() 가 부호를 무시해서 — 존재하는 값의 집합은 변하지 않아.")}
      </div>

      {/* given array */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, "given array a", "주어진 배열 a")}
        </div>
        <div style={{ display: "inline-flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {arr.map((x, i) => {
            const neg = x < 0;
            return (
              <button key={i} onClick={() => flipSign(i)} style={{
                minWidth: cellSize, height: cellSize, padding: "0 6px", cursor: "pointer",
                borderRadius: 6, border: `1.5px solid ${neg ? "#7c3aed" : "#fdba74"}`,
                background: neg ? "#ede9fe" : "#fff7ed",
                color: neg ? "#5b21b6" : "#9a3412",
                fontSize: 14, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                {x}
              </button>
            );
          })}
        </div>
      </div>

      {/* abs row */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, "abs(x) — present set", "abs(x) — 존재 집합")}
        </div>
        <div style={{ display: "inline-flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {[...present].sort((a, b) => a - b).map((v) => (
            <div key={v} style={{
              minWidth: cellSize, height: cellSize, padding: "0 6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: "1.5px solid #93c5fd",
              background: "#dbeafe", color: "#1e3a8a",
              fontSize: 14, fontWeight: 800,
              fontFamily: "'JetBrains Mono',monospace",
            }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* 1..N row, missing highlighted */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          {t(E, `scan 1..${preset.N}: missing values stay`, `1..${preset.N} 훑기: 빠진 값만 남아`)}
        </div>
        <div style={{ display: "inline-flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({ length: preset.N }).map((_, i) => {
            const v = i + 1;
            const isMissing = !present.has(v);
            return (
              <div key={v} style={{
                minWidth: cellSize, height: cellSize, padding: "0 6px",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6,
                border: `1.5px solid ${isMissing ? "#16a34a" : "#e5e7eb"}`,
                background: isMissing ? "#dcfce7" : "#f9fafb",
                color: isMissing ? "#15803d" : "#cbd5e1",
                fontSize: 14, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace",
                textDecoration: isMissing ? "none" : "line-through",
              }}>
                {v}
              </div>
            );
          })}
        </div>
      </div>

      {/* result banner */}
      <div style={{
        background: "#dcfce7",
        border: "1px solid #16a34a",
        borderRadius: 10, padding: "8px 12px", marginBottom: 8,
        textAlign: "center", fontSize: 13, fontWeight: 700,
        color: "#15803d",
        fontFamily: "'JetBrains Mono',monospace",
      }}>
        {missing.length > 0
          ? t(E,
              `print(sum([${missing.join(", ")}])) → ${total}`,
              `print(sum([${missing.join(", ")}])) → ${total}`)
          : t(E, "print(sum([])) → 0  (no values missing)", "print(sum([])) → 0  (빠진 값 없음)")}
      </div>

      {/* controls */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        <button onClick={reset} style={{
          padding: "5px 12px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.dim, fontSize: 11, fontWeight: 600, cursor: "pointer",
        }}>
          {t(E, "↻ Reset signs", "↻ 부호 초기화")}
        </button>
      </div>

      {/* hint */}
      <div style={{
        background: "#fff7ed", border: `1px solid #fdba74`, borderRadius: 8, padding: "8px 12px",
        fontSize: 11, color: "#9a3412", textAlign: "center", lineHeight: 1.5,
      }}>
        {t(E, "💡 Sign flips never change abs() — the present set is stable. Only values in 1..N that never appear are missing candidates.",
              "💡 부호 반전은 abs() 결과를 못 바꿔 — 존재 집합은 그대로. 1..N 중 한 번도 안 나온 값만 빠진 후보야.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# Sum of 1..N",
  "total = N * (N + 1) // 2",
  "given_sum = sum(abs(x) for x in a)",
  "",
  "# The missing number contributes to make total",
  "# But signs may be shuffled, so we consider",
  "# all possible missing values",
  "present = set(abs(x) for x in a)",
  "possible = []",
  "for v in range(1, N + 1):",
  "    if v not in present:",
  "        possible.append(v)",
  "",
  "print(sum(possible))",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long N; cin >> N;",
  "    vector<long long> a; { long long _x; while (cin >> _x) a.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    // Sum of 1..N",
  "    auto total = N * (N + 1) // 2;",
  "    auto given_sum = sum(abs(x) for x in a);",
  "",
  "    // The missing number contributes to make total",
  "    // But signs may be shuffled, so we consider",
  "    // all possible missing values",
  "    auto present = set(abs(x) for x in a);",
  "    auto possible = [];",
  "    for (long long v = 1; v < N + 1; v++) {",
  "        if (v not in present) {",
  "            // possible.append(v)",
  "",
  "    cout << sum(possible) << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc20MissingSections(E) {
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

export function Mcc20MissingProgressiveCode(props) {
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


export function downloadMcc20MissingPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Missing — Full Study Guide", "Mcc20Missing — 종합 풀이 노트");
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

