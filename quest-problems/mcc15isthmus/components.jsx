import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ──────────────────────────────────────────────────────────────
   DeepAuditSim — bilingual peak/valley audit visualizer
   Sequence [1,3,5,3,1] with K=2. Click any interior position
   (i = K..N-K-1) to see the K left + K right neighbor checks.
   ────────────────────────────────────────────────────────────── */
export function Mcc15IsthmusDeepAuditSim({ E }) {
  const a = [1, 3, 5, 3, 1];
  const K = 2;
  const N = a.length;
  const [pos, setPos] = useState(2);

  const interior = [];
  for (let i = K; i < N - K; i++) interior.push(i);

  // Compute audit for current pos
  const leftPeak = []; // strictly increasing into i
  for (let j = 1; j <= K; j++) {
    leftPeak.push({ j, lhs: a[pos - j], rhs: a[pos - j + 1], ok: a[pos - j] < a[pos - j + 1] });
  }
  const rightPeak = []; // strictly decreasing out of i
  for (let j = 0; j < K; j++) {
    rightPeak.push({ j, lhs: a[pos + j], rhs: a[pos + j + 1], ok: a[pos + j] > a[pos + j + 1] });
  }
  const leftValley = leftPeak.map(c => ({ ...c, ok: c.lhs > c.rhs }));
  const rightValley = rightPeak.map(c => ({ ...c, ok: c.lhs < c.rhs }));

  const isPeak = leftPeak.every(c => c.ok) && rightPeak.every(c => c.ok);
  const isValley = leftValley.every(c => c.ok) && rightValley.every(c => c.ok);
  const verdict = isPeak ? "PEAK" : isValley ? "VALLEY" : null;

  const cellSize = 44;

  return (
    <div style={{
      background: "#f8fafc", border: `1.5px solid ${A}`, borderRadius: 12,
      padding: "12px 14px", marginTop: 10,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 8, textAlign: "center" }}>
        🔍 {t(E, "Deep Audit Sim", "심층 감사 시뮬")} · [1, 3, 5, 3, 1], K=2
      </div>

      {/* Sequence row — click interior positions */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {a.map((v, i) => {
          const isInterior = interior.includes(i);
          const isCur = i === pos;
          const inLeftWin = isInterior && i >= pos - K && i < pos;
          const inRightWin = isInterior && i > pos && i <= pos + K;
          const inWin = i >= pos - K && i <= pos + K;
          let bg = "#fff", color = C.text, border = "1.5px solid #cbd5e1";
          if (isCur) { bg = A; color = "#fff"; border = `2px solid ${A}`; }
          else if (inWin) { bg = "#dbeafe"; border = "1.5px solid #93c5fd"; }
          return (
            <button
              key={i}
              onClick={() => isInterior && setPos(i)}
              disabled={!isInterior}
              title={isInterior ? t(E, `Audit position ${i}`, `위치 ${i} 감사`) : t(E, "Edge — skip", "끝 — 건너뜀")}
              style={{
                width: cellSize, height: cellSize, borderRadius: 8,
                background: bg, color, border, cursor: isInterior ? "pointer" : "not-allowed",
                fontWeight: 700, fontSize: 16, opacity: isInterior ? 1 : 0.5,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}
            >
              <div>{v}</div>
              <div style={{ fontSize: 9, fontWeight: 500, opacity: 0.75 }}>i={i}</div>
            </button>
          );
        })}
      </div>

      {/* Audit checks */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontWeight: 700, color: "#7c3aed", marginBottom: 4 }}>
            {t(E, "PEAK check", "PEAK 검사")}
          </div>
          <div style={{ fontSize: 10, color: C.dim, marginBottom: 4 }}>
            {t(E, "left ↑ then right ↓", "왼쪽 ↑ 후 오른쪽 ↓")}
          </div>
          {leftPeak.map((c, k) => (
            <div key={`lp${k}`} style={{ color: c.ok ? "#16a34a" : "#dc2626", fontFamily: "monospace" }}>
              {c.lhs} &lt; {c.rhs} {c.ok ? "✓" : "✗"}
            </div>
          ))}
          {rightPeak.map((c, k) => (
            <div key={`rp${k}`} style={{ color: c.ok ? "#16a34a" : "#dc2626", fontFamily: "monospace" }}>
              {c.lhs} &gt; {c.rhs} {c.ok ? "✓" : "✗"}
            </div>
          ))}
          <div style={{ marginTop: 4, fontWeight: 700, color: isPeak ? "#16a34a" : "#94a3b8" }}>
            {isPeak ? `✓ ${t(E, "PEAK", "PEAK")}` : t(E, "not a peak", "PEAK 아님")}
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 10px" }}>
          <div style={{ fontWeight: 700, color: "#0891b2", marginBottom: 4 }}>
            {t(E, "VALLEY check", "VALLEY 검사")}
          </div>
          <div style={{ fontSize: 10, color: C.dim, marginBottom: 4 }}>
            {t(E, "left ↓ then right ↑", "왼쪽 ↓ 후 오른쪽 ↑")}
          </div>
          {leftValley.map((c, k) => (
            <div key={`lv${k}`} style={{ color: c.ok ? "#16a34a" : "#dc2626", fontFamily: "monospace" }}>
              {c.lhs} &gt; {c.rhs} {c.ok ? "✓" : "✗"}
            </div>
          ))}
          {rightValley.map((c, k) => (
            <div key={`rv${k}`} style={{ color: c.ok ? "#16a34a" : "#dc2626", fontFamily: "monospace" }}>
              {c.lhs} &lt; {c.rhs} {c.ok ? "✓" : "✗"}
            </div>
          ))}
          <div style={{ marginTop: 4, fontWeight: 700, color: isValley ? "#16a34a" : "#94a3b8" }}>
            {isValley ? `✓ ${t(E, "VALLEY", "VALLEY")}` : t(E, "not a valley", "VALLEY 아님")}
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div style={{
        marginTop: 10, padding: "6px 10px", borderRadius: 8, textAlign: "center", fontSize: 12, fontWeight: 700,
        background: verdict ? "#dcfce7" : "#f1f5f9",
        color: verdict ? "#15803d" : "#64748b",
        border: `1px solid ${verdict ? "#86efac" : "#cbd5e1"}`,
      }}>
        {verdict
          ? t(E, `Position ${pos} counts as a ${verdict}.`, `위치 ${pos} 는 ${verdict} 로 인정.`)
          : t(E, `Position ${pos} is neither peak nor valley.`, `위치 ${pos} 는 PEAK 도 VALLEY 도 아님.`)}
      </div>
      <div style={{ fontSize: 10, color: C.dim, marginTop: 6, textAlign: "center" }}>
        {t(E, "Click any blue-bordered position to audit it.",
              "파란 테두리 위치를 눌러 감사해봐요.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, K = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "count = 0",
  "for i in range(K, N - K):",
  "    # Check if position i is a peak",
  "    is_peak = True",
  "    for j in range(1, K + 1):",
  "        if a[i - j] >= a[i - j + 1]:",
  "            is_peak = False",
  "            break",
  "    if is_peak:",
  "        for j in range(0, K):",
  "            if a[i + j] <= a[i + j + 1]:",
  "                is_peak = False",
  "                break",
  "    if is_peak:",
  "        count += 1",
  "        continue",
  "",
  "    # Check if position i is a valley",
  "    is_valley = True",
  "    for j in range(1, K + 1):",
  "        if a[i - j] <= a[i - j + 1]:",
  "            is_valley = False",
  "            break",
  "    if is_valley:",
  "        for j in range(0, K):",
  "            if a[i + j] >= a[i + j + 1]:",
  "                is_valley = False",
  "                break",
  "    if is_valley:",
  "        count += 1",
  "",
  "print(count)",
];

const FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    long long N, K; cin >> N >> K;",
  "    vector<long long> a; { long long _x; while (cin >> _x) a.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    auto count = 0;",
  "    for (long long i = K; i < N - K; i++) {",
  "        // Check if position i is a peak",
  "        auto is_peak = True;",
  "        for (long long j = 1; j < K + 1; j++) {",
  "            if (a[i - j] >= a[i - j + 1]) {",
  "                auto is_peak = False;",
  "                break;",
  "        if (is_peak) {",
  "            for (long long j = 0; j < K; j++) {",
  "                if (a[i + j] <= a[i + j + 1]) {",
  "                    auto is_peak = False;",
  "                    break;",
  "        if (is_peak) {",
  "            count += 1;",
  "            continue;",
  "",
  "        // Check if position i is a valley",
  "        auto is_valley = True;",
  "        for (long long j = 1; j < K + 1; j++) {",
  "            if (a[i - j] <= a[i - j + 1]) {",
  "                auto is_valley = False;",
  "                break;",
  "        if (is_valley) {",
  "            for (long long j = 0; j < K; j++) {",
  "                if (a[i + j] >= a[i + j + 1]) {",
  "                    auto is_valley = False;",
  "                    break;",
  "        if (is_valley) {",
  "            count += 1;",
  "",
  "    cout << count << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc15IsthmusSections(E) {
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

export function Mcc15IsthmusProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMcc15IsthmusPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Isthmus — Full Study Guide", "Mcc15Isthmus — 종합 풀이 노트");
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

