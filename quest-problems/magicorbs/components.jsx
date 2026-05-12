import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ═══════════════════════════════════════════════════════════════
   MagicOrbsDeepAuditSim — pick a sample of orbs, sort them
   descending by power, then choose K. Watch which orbs get
   selected (the top K) and the running sum update live.
   "Audit all K" enumerates every K from 0..N to show how the
   maximum total grows as you're allowed to pick more orbs.
   ═══════════════════════════════════════════════════════════════ */
const _ORB_PRESETS = [
  { vals: [5, 3, 4],            label: "[5,3,4]" },
  { vals: [7, 2, 9, 1, 6],      label: "[7,2,9,1,6]" },
  { vals: [4, 4, 4, 1, 8, 3],   label: "[4,4,4,1,8,3]" },
  { vals: [10, 1, 2, 9, 3, 8, 4], label: "[10,1,2,9,3,8,4] (N=7)" },
];

export function MagicOrbsDeepAuditSim({ E }) {
  const [pi, setPi] = useState(0);
  const [k, setK] = useState(2);
  const [audited, setAudited] = useState(false);

  const { vals } = _ORB_PRESETS[pi];
  const N = vals.length;
  const safeK = Math.min(k, N);

  // Sort descending, but keep original index for the "before" row
  const indexed = vals.map((v, i) => ({ v, i }));
  const sorted = [...indexed].sort((a, b) => b.v - a.v);
  const pickedSet = new Set(sorted.slice(0, safeK).map(o => o.i));
  const total = sorted.slice(0, safeK).reduce((s, o) => s + o.v, 0);

  const switchPreset = (newPi) => {
    setPi(newPi);
    const newN = _ORB_PRESETS[newPi].vals.length;
    setK(prev => Math.min(prev, newN));
    setAudited(false);
  };

  // Audit: enumerate K = 0..N → max total for each
  const auditRows = [];
  for (let kk = 0; kk <= N; kk++) {
    const sum = sorted.slice(0, kk).reduce((s, o) => s + o.v, 0);
    auditRows.push({ k: kk, sum });
  }
  const bestRow = auditRows[auditRows.length - 1];

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {_ORB_PRESETS.map((p, i) => (
          <button key={i} onClick={() => switchPreset(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 8 }}>
        {t(E, "Use − / + to change K. Watch which orbs get picked and the total power grow.",
              "− / + 로 K 를 바꿔봐. 어떤 구슬이 뽑히는지, 총 파워가 어떻게 자라는지 봐.")}
      </div>

      {/* original order row */}
      <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginBottom: 4, fontWeight: 700, letterSpacing: 0.4 }}>
        {t(E, "ORIGINAL ORDER", "원래 순서")}
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {indexed.map((o, i) => (
          <div key={i} style={{
            width: 38, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
            background: "#f5f3ff", border: "1.5px solid #c4b5fd", color: "#5b21b6",
          }}>
            {o.v}
          </div>
        ))}
      </div>

      {/* arrow */}
      <div style={{ textAlign: "center", fontSize: 14, color: A, marginBottom: 4 }}>
        ↓ {t(E, "sort descending", "내림차순 정렬")} ↓
      </div>

      {/* sorted row with picked highlight */}
      <div style={{ fontSize: 10, color: C.dim, textAlign: "center", marginBottom: 4, fontWeight: 700, letterSpacing: 0.4 }}>
        {t(E, "SORTED — top K picked", "정렬됨 — 앞에서 K 개")}
      </div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 4, flexWrap: "wrap" }}>
        {sorted.map((o, i) => {
          const picked = i < safeK;
          const bg = picked ? "#dcfce7" : "#f1f5f9";
          const border = picked ? "#86efac" : "#cbd5e1";
          const color = picked ? "#166534" : "#64748b";
          return (
            <div key={i} style={{
              width: 38, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
              background: bg, border: `1.5px solid ${border}`, color,
              outline: picked ? `2px dashed ${A}` : "none",
              outlineOffset: picked ? -4 : 0,
              opacity: picked ? 1 : 0.6,
            }}>
              {o.v}
            </div>
          );
        })}
      </div>

      {/* tick row to mark which positions are within top K */}
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {sorted.map((_, i) => (
          <div key={i} style={{
            width: 38, textAlign: "center", fontSize: 11,
            color: i < safeK ? "#15803d" : "#94a3b8",
            fontWeight: i < safeK ? 700 : 400,
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            {i < safeK ? "✓" : "·"}
          </div>
        ))}
      </div>

      {/* K controls + total */}
      <div style={{
        background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 10,
        padding: "8px 12px", marginBottom: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => { setK(Math.max(0, safeK - 1)); setAudited(false); }} style={{
            width: 28, height: 28, borderRadius: 6, border: `1px solid ${A}`,
            background: "#fff", color: A, fontWeight: 800, cursor: "pointer", fontSize: 14,
          }}>−</button>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", fontFamily: "'JetBrains Mono',monospace", minWidth: 60, textAlign: "center" }}>
            K = {safeK} / {N}
          </div>
          <button onClick={() => { setK(Math.min(N, safeK + 1)); setAudited(false); }} style={{
            width: 28, height: 28, borderRadius: 6, border: `1px solid ${A}`,
            background: "#fff", color: A, fontWeight: 800, cursor: "pointer", fontSize: 14,
          }}>+</button>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "total power", "총 파워")} = {total}
        </div>
      </div>

      {/* audit button */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <button onClick={() => setAudited(true)} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${A}`,
          background: A, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          {t(E, `🔍 Audit all K = 0..${N}`, `🔍 K = 0..${N} 모두 점검`)}
        </button>
      </div>

      {/* audit panel */}
      {audited && (
        <div style={{
          background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10,
          padding: 10, fontSize: 11.5, color: "#9a3412", lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: "#7c2d12" }}>
            {t(E, "Each K → max total power", "각 K → 최대 총 파워")}
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: 4, marginBottom: 8, fontFamily: "'JetBrains Mono',monospace",
          }}>
            {auditRows.map((r) => (
              <div key={r.k} style={{
                background: r.k === safeK ? "#fef3c7" : "#fff",
                border: `1px solid ${r.k === safeK ? "#f59e0b" : "#fed7aa"}`,
                borderRadius: 6, padding: "3px 6px", fontSize: 11, color: "#7c2d12",
                display: "flex", justifyContent: "space-between", gap: 4,
                fontWeight: r.k === safeK ? 800 : 500,
              }}>
                <span>K={r.k}</span>
                <b>{r.sum}</b>
              </div>
            ))}
          </div>
          <div style={{
            background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8,
            padding: "6px 10px", color: "#166534", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
          }}>
            {t(E, "non-decreasing — bigger K never hurts.", "단조 비감소 — K 가 커지면 절대 손해 안 봐.")}
            {" "}{t(E, "max at K=", "최댓값 K=")}{bestRow.k} → {bestRow.sum}
          </div>
        </div>
      )}
    </div>
  );
}

const FULL_PY = [
  "N, K = map(int, input().split())",
  "vals = list(map(int, input().split()))",
  "",
  "# Sort values in descending order",
  "vals.sort(reverse=True)",
  "",
  "# Pick the top K orbs for maximum sum",
  "ans = sum(vals[:K])",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <set>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> orbs(N);",
  "    for (int i = 0; i < N; i++) cin >> orbs[i];",
  "",
  "    // Generic: count distinct orb colors / sum / etc.",
  "    set<int> distinct(orbs.begin(), orbs.end());",
  "    cout << (int)distinct.size() << \"\\n\";",
  "    return 0;",
  "}",
];

export function getMagicOrbsSections(E) {
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
        t(E, "set<int> distinct(orbs.begin(), orbs.end()) deduplicates in one line.",
            "set<int> distinct(orbs.begin(), orbs.end())으로 한 줄에 중복 제거."),
        t(E, "Cast .size() to (int) before printing to avoid signed/unsigned mismatch warnings.",
            "출력 전 .size()를 (int)로 캐스팅해 부호 경고 회피."),
      ],
    },
  ];
}

export function MagicOrbsProgressiveCode(props) {
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


export function downloadMagicOrbsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "MagicOrbs — Full Study Guide", "MagicOrbs — 종합 풀이 노트");
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

