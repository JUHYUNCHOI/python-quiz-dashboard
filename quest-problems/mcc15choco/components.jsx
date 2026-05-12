import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ================================================================
   StackSim — bilingual stack walkthrough for [3, 3, 5, 5]
   Step through bars left → right, watch stack grow / pop and total update.
   ================================================================ */
const SIM_BARS = [3, 3, 5, 5];
// Each frame: {idx, stack[], total, action}
const SIM_FRAMES = [
  { idx: -1, stack: [],         total: 0,  actionEN: "Start: stack empty, total = 0.",                       actionKO: "시작: 스택 비었음, 총합 = 0." },
  { idx: 0,  stack: [3],        total: 0,  actionEN: "Bar 3: stack empty → push 3.",                         actionKO: "바 3: 스택 비었음 → 3 push." },
  { idx: 1,  stack: [],         total: 6,  actionEN: "Bar 3: top is 3, equal! Pop and add 2×3 = 6.",         actionKO: "바 3: top 이 3, 같음! pop 하고 2×3 = 6 더함." },
  { idx: 2,  stack: [5],        total: 6,  actionEN: "Bar 5: stack empty → push 5.",                         actionKO: "바 5: 스택 비었음 → 5 push." },
  { idx: 3,  stack: [],         total: 16, actionEN: "Bar 5: top is 5, equal! Pop and add 2×5 = 10. Total = 16.", actionKO: "바 5: top 이 5, 같음! pop 하고 2×5 = 10 더함. 총합 = 16." },
];

export function Mcc15ChocoStackSim({ E }) {
  const [f, setF] = useState(0);
  const frame = SIM_FRAMES[f];
  const action = E ? frame.actionEN : frame.actionKO;
  const atEnd = f >= SIM_FRAMES.length - 1;
  const atStart = f <= 0;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A }}>
          {t(E, "🥞 Stack Walkthrough — bars [3, 3, 5, 5]", "🥞 스택 시뮬레이션 — 바 [3, 3, 5, 5]")}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 3 }}>
          {t(E, `Step ${f + 1} / ${SIM_FRAMES.length}`, `${f + 1} 단계 / ${SIM_FRAMES.length}`)}
        </div>
      </div>

      {/* Bars row — highlight current */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 14 }}>
        {SIM_BARS.map((b, i) => {
          const cur = i === frame.idx;
          const past = i < frame.idx;
          return (
            <div key={i} style={{
              minWidth: 40, padding: "10px 12px",
              borderRadius: 8,
              background: cur ? A : past ? "#e9d5ff" : "#fff",
              color: cur ? "#fff" : past ? "#7c3aed" : C.text,
              border: `2px solid ${cur ? A : past ? "#c4b5fd" : C.border}`,
              fontWeight: 700, textAlign: "center",
              opacity: past ? 0.5 : 1,
              textDecoration: past ? "line-through" : "none",
            }}>{b}</div>
          );
        })}
      </div>

      {/* Stack visualization (grows upward) */}
      <div style={{
        background: "#f5f3ff", border: `1.5px dashed ${A}`,
        borderRadius: 10, padding: 12, marginBottom: 10,
        minHeight: 110,
        display: "flex", flexDirection: "column-reverse",
        alignItems: "center", gap: 4,
      }}>
        <div style={{ fontSize: 10, color: "#5b21b6", fontWeight: 700, letterSpacing: 0.5, marginTop: 4 }}>
          {t(E, "STACK (bottom → top)", "스택 (바닥 → top)")}
        </div>
        {frame.stack.length === 0 && (
          <div style={{ fontSize: 11, color: C.dim, fontStyle: "italic", padding: "10px 0" }}>
            {t(E, "(empty)", "(비었음)")}
          </div>
        )}
        {frame.stack.map((v, i) => (
          <div key={i} style={{
            minWidth: 50, padding: "6px 10px",
            background: "#fff", border: `1.5px solid ${A}`, borderRadius: 6,
            color: A, fontWeight: 700, textAlign: "center", fontSize: 13,
          }}>{v}</div>
        ))}
      </div>

      {/* Total */}
      <div style={{
        textAlign: "center",
        background: "#ecfdf5", border: "1.5px solid #34d399",
        borderRadius: 10, padding: "8px 12px", marginBottom: 10,
        fontSize: 13, color: "#065f46", fontWeight: 700,
      }}>
        {t(E, "Total removed = ", "제거한 총 길이 = ")}
        <span style={{ fontSize: 16, color: "#15803d" }}>{frame.total}</span>
      </div>

      {/* Action narration */}
      <div style={{
        background: "#fff", border: `1px solid ${C.border}`,
        borderRadius: 8, padding: "8px 12px", marginBottom: 12,
        fontSize: 12.5, color: C.text, lineHeight: 1.55,
      }}>
        {action}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <button onClick={() => setF(Math.max(0, f - 1))} disabled={atStart} style={{
          padding: "6px 14px", fontSize: 12, fontWeight: 700,
          background: atStart ? "#e5e7eb" : "#fff",
          color: atStart ? "#9ca3af" : A,
          border: `1.5px solid ${atStart ? "#e5e7eb" : A}`,
          borderRadius: 8, cursor: atStart ? "not-allowed" : "pointer",
        }}>← {t(E, "Prev", "이전")}</button>
        <button onClick={() => setF(0)} style={{
          padding: "6px 14px", fontSize: 12, fontWeight: 700,
          background: "#fff", color: "#6b7280",
          border: "1.5px solid #d1d5db", borderRadius: 8, cursor: "pointer",
        }}>↺ {t(E, "Reset", "처음")}</button>
        <button onClick={() => setF(Math.min(SIM_FRAMES.length - 1, f + 1))} disabled={atEnd} style={{
          padding: "6px 14px", fontSize: 12, fontWeight: 700,
          background: atEnd ? "#e5e7eb" : A,
          color: atEnd ? "#9ca3af" : "#fff",
          border: `1.5px solid ${atEnd ? "#e5e7eb" : A}`,
          borderRadius: 8, cursor: atEnd ? "not-allowed" : "pointer",
        }}>{t(E, "Next", "다음")} →</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "bars = list(map(int, input().split()))",
  "",
  "stack = []",
  "total = 0",
  "",
  "for bar in bars:",
  "    if stack and stack[-1] == bar:",
  "        # Adjacent equal pair found",
  "        total += 2 * bar",
  "        stack.pop()",
  "    else:",
  "        stack.append(bar)",
  "",
  "print(total)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; cin >> N;",
  "    vector<int> bars; { int _x; while (cin >> _x) bars.push_back(_x); if (!cin) cin.clear(); } // adapt: read N values",
  "",
  "    auto stack = [];",
  "    auto total = 0;",
  "",
  "    // for bar in bars:",
  "        if (stack and stack[-1] == bar) {",
  "            // Adjacent equal pair found",
  "            total += 2 * bar;",
  "            // stack.pop()",
  "        else {",
  "            // stack.append(bar)",
  "",
  "    cout << total << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

export function getMcc15ChocoSections(E) {
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

export function Mcc15ChocoProgressiveCode(props) {
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


export function downloadMcc15ChocoPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc15Choco — Full Study Guide", "Mcc15Choco — 종합 풀이 노트");
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

