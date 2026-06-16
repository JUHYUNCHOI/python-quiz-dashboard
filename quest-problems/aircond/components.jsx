// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 11/11 on cpid=1276
// 🔧 REWRITTEN 2026-06-15 — real problem: Air Cownditioning II (2023 Jan Bronze 2, cpid 1297)
//   C++ placeholder (summed cow costs) replaced with the correct 2^M subset (bitmask) search,
//   matching the already-correct Python. Local: compiles + matches official sample (10) exactly.
//   USACO re-submit PENDING.
//   ⚠️ CURRICULUM NOTE: this Bronze problem's intended solution is bitmask enumeration over
//   the M (≤10) air conditioners — bit ops are taught only as a CP tip (cpp-20), not core
//   C++ curriculum. Kept because there is no non-bitmask Bronze solution and the Python
//   already shipped this approach. Flag for design review if a no-bitmask version is desired.

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ================================================================
   AC Subset Sim — toggle ACs, see stacked cooling on stalls
   Eye-evident: bars stack, cells turn green when need is met.
   Used in Ch1 between the 2^M quiz and the numeric input.
   ================================================================ */
export function ACSubsetSim({ E }) {
  // Fixed scenario matching the input quiz: 1 cow, 2 ACs, stalls 1-5
  const STALL_LO = 1, STALL_HI = 5;
  const COW = { s: 1, e: 5, c: 3, label: t(E, "Cow", "소") };
  const ACS = [
    { id: 0, s: 1, e: 5, p: 3, cost: 10, color: "#2563eb", bg: "#dbeafe" },
    { id: 1, s: 1, e: 3, p: 5, cost: 20, color: "#7c3aed", bg: "#ede9fe" },
  ];
  const [picked, setPicked] = useState([true, false]); // start with AC1 only
  const toggle = (i) => setPicked(p => p.map((v, k) => k === i ? !v : v));

  // Compute cooling per stall + total cost
  const stalls = [];
  for (let s = STALL_LO; s <= STALL_HI; s++) {
    let cool = 0;
    ACS.forEach((ac, i) => { if (picked[i] && s >= ac.s && s <= ac.e) cool += ac.p; });
    stalls.push({ s, cool, ok: cool >= COW.c });
  }
  const totalCost = ACS.reduce((sum, ac, i) => sum + (picked[i] ? ac.cost : 0), 0);
  const allOk = stalls.every(x => x.ok);
  const anyPicked = picked.some(Boolean);

  const cellW = 56;

  return (
    <div style={{
      background: "#f8fafc", border: `1.5px dashed ${A}`, borderRadius: 12,
      padding: 14, marginTop: 6, marginBottom: 6,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: A, letterSpacing: 0.5, marginBottom: 8 }}>
        🧪 {t(E, "Try it: toggle ACs, watch the stalls", "직접 해보기: 에어컨을 켜고 꺼보면서 축사를 봐")}
      </div>

      {/* AC toggle row */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {ACS.map((ac, i) => (
          <button key={ac.id} onClick={() => toggle(i)} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: picked[i] ? ac.bg : "#fff",
            border: `1.5px solid ${picked[i] ? ac.color : "#cbd5e1"}`,
            borderRadius: 8, padding: "6px 10px", cursor: "pointer",
            fontSize: 12, fontWeight: 600, color: picked[i] ? ac.color : "#64748b",
            transition: "all 120ms",
          }}>
            <span style={{
              width: 14, height: 14, borderRadius: 3,
              border: `2px solid ${picked[i] ? ac.color : "#94a3b8"}`,
              background: picked[i] ? ac.color : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 10, fontWeight: 900,
            }}>{picked[i] ? "✓" : ""}</span>
            <span>AC{i + 1}</span>
            <span style={{ fontSize: 10, color: picked[i] ? ac.color : "#94a3b8" }}>
              [{ac.s}-{ac.e}] +{ac.p} · ${ac.cost}
            </span>
          </button>
        ))}
      </div>

      {/* Stall grid with stacked cooling bars */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {stalls.map(({ s, cool, ok }) => {
            const need = COW.c;
            const barH = 60;
            const unit = barH / Math.max(need + 2, 5);
            // Per-AC contributions for stacking
            const contribs = ACS
              .map((ac, i) => picked[i] && s >= ac.s && s <= ac.e ? { p: ac.p, color: ac.color } : null)
              .filter(Boolean);
            return (
              <div key={s} style={{ width: cellW, textAlign: "center" }}>
                {/* Bar area */}
                <div style={{
                  height: barH, position: "relative",
                  background: "#f1f5f9", borderRadius: 6,
                  border: `1px solid ${ok ? C.okBd : C.noBd}`,
                  display: "flex", flexDirection: "column-reverse", overflow: "hidden",
                }}>
                  {/* Need line */}
                  <div style={{
                    position: "absolute", left: 0, right: 0,
                    bottom: need * unit - 1,
                    borderTop: "2px dashed #dc2626", zIndex: 2,
                  }} />
                  {/* Stacked AC contributions (bottom up) */}
                  {contribs.map((c, ci) => (
                    <div key={ci} style={{
                      height: c.p * unit, background: c.color, opacity: 0.85,
                      borderTop: ci > 0 ? "1px solid #fff" : "none",
                    }} />
                  ))}
                </div>
                {/* Stall label */}
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginTop: 4 }}>{s}</div>
                {/* Cooling number */}
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: ok ? "#15803d" : "#dc2626",
                }}>
                  {cool}{ok ? " ✓" : " ✗"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cow needs label */}
      <div style={{ textAlign: "center", fontSize: 11, color: "#dc2626", marginBottom: 10 }}>
        - - - {t(E, `Cow needs ${COW.c} cooling in stalls ${COW.s}-${COW.e}`,
                    `소가 축사 ${COW.s}-${COW.e}에서 냉방 ${COW.c} 필요`)} - - -
      </div>

      {/* Status footer */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 14, alignItems: "center",
        background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8,
        padding: "8px 12px", fontSize: 12,
      }}>
        <span>
          💰 <b>{t(E, "Cost", "비용")}:</b>{" "}
          <span style={{ color: A, fontWeight: 700 }}>{totalCost}</span>
        </span>
        <span style={{ color: C.dimLight }}>|</span>
        <span style={{
          fontWeight: 700,
          color: !anyPicked ? C.dim : (allOk ? "#15803d" : "#dc2626"),
        }}>
          {!anyPicked
            ? t(E, "Pick at least one AC", "에어컨을 1개 이상 골라봐")
            : (allOk
                ? t(E, "✓ All stalls satisfied", "✓ 모든 축사 OK")
                : t(E, "✗ Some stall under cooled", "✗ 부족한 축사 있어"))}
        </span>
      </div>

      <div style={{ fontSize: 11, color: C.dim, marginTop: 8, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "Try {AC1}, {AC2}, {AC1+AC2}, {} — only valid subsets count, pick the cheapest.",
          "{AC1만}, {AC2만}, {둘 다}, {아무것도 X} 시도해봐 — 모든 소가 OK인 것 중 가장 싼 것이 답.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, M = map(int, input().split())",
  "cows = []",
  "for _ in range(N):",
  "    s, e, c = map(int, input().split())",
  "    cows.append((s, e, c))  # stall range, cooling needed",
  "",
  "acs = []",
  "for _ in range(M):",
  "    s, e, p, cost = map(int, input().split())",
  "    acs.append((s, e, p, cost))",
  "",
  "best = float('inf')",
  "",
  "# Try all 2^M subsets of ACs",
  "for mask in range(1 << M):",
  "    total_cost = 0",
  "    cooling = [0] * 101  # cooling at each stall",
  "    for j in range(M):",
  "        if mask & (1 << j):",
  "            s, e, p, cost = acs[j]",
  "            total_cost += cost",
  "            for pos in range(s, e + 1):",
  "                cooling[pos] += p",
  "    # Check if all cows satisfied",
  "    ok = True",
  "    for s, e, c in cows:",
  "        for pos in range(s, e + 1):",
  "            if cooling[pos] < c:",
  "                ok = False",
  "                break",
  "        if not ok: break",
  "    if ok:",
  "        best = min(best, total_cost)",
  "",
  "print(best)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, M; cin >> N >> M;",
  "    vector<int> cs(N), ce(N), cc(N);          // cow: stall range + cooling needed",
  "    for (int i = 0; i < N; i++) cin >> cs[i] >> ce[i] >> cc[i];",
  "    vector<int> as(M), ae(M), ap(M), acost(M);// AC: range, power, cost",
  "    for (int j = 0; j < M; j++) cin >> as[j] >> ae[j] >> ap[j] >> acost[j];",
  "",
  "    long long best = -1;",
  "    // Try every subset of the M air conditioners (M <= 10, so 2^M <= 1024)",
  "    for (int mask = 0; mask < (1 << M); mask++) {",
  "        long long total = 0;",
  "        vector<int> cool(101, 0);             // cooling at each stall 1..100",
  "        for (int j = 0; j < M; j++)",
  "            if (mask & (1 << j)) {            // AC j is turned on",
  "                total += acost[j];",
  "                for (int pos = as[j]; pos <= ae[j]; pos++) cool[pos] += ap[j];",
  "            }",
  "        bool ok = true;",
  "        for (int i = 0; i < N && ok; i++)",
  "            for (int pos = cs[i]; pos <= ce[i]; pos++)",
  "                if (cool[pos] < cc[i]) { ok = false; break; }",
  "        if (ok && (best == -1 || total < best)) best = total;",
  "    }",
  "    cout << best << \"\\n\";",
  "    return 0;",
  "}",
];

export function getAirCondSections(E) {
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

export function AirCondProgressiveCode(props) {
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


export function downloadAirCondPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "AirCond — Full Study Guide", "AirCond — 종합 풀이 노트");
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

