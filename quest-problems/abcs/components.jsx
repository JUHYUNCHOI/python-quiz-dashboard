import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ──────────────────────────────────────────────────────────────
   Interactive sim: pick A, B, C → see all 7 sums + sorted view.
   Helps the student feel WHY nums[0]=A, nums[1]=B, nums[6]=A+B+C.
   ────────────────────────────────────────────────────────────── */
export function AbcsSumExplorer({ E }) {
  const [aVal, setA] = useState(2);
  const [bVal, setB] = useState(3);
  const [cVal, setC] = useState(5);

  const sorted = [aVal, bVal, cVal].slice().sort((x, y) => x - y);
  const sA = sorted[0], sB = sorted[1], sC = sorted[2];

  const labelled = [
    { key: "A",     val: sA,           color: "#15803d" },
    { key: "B",     val: sB,           color: "#0891b2" },
    { key: "C",     val: sC,           color: "#7c3aed" },
    { key: "A+B",   val: sA + sB,      color: "#a16207" },
    { key: "A+C",   val: sA + sC,      color: "#a16207" },
    { key: "B+C",   val: sB + sC,      color: "#a16207" },
    { key: "A+B+C", val: sA + sB + sC, color: "#dc2626" },
  ];

  const sortedSums = labelled.slice().sort((x, y) => x.val - y.val);

  const Slider = ({ name, val, set, min, max, color }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
      <span style={{ width: 18, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={val}
        onChange={(e) => set(parseInt(e.target.value, 10))}
        style={{ flex: 1, accentColor: color }}
      />
      <span style={{
        minWidth: 32, textAlign: "center", fontWeight: 800, color: "#fff",
        background: color, borderRadius: 6, padding: "2px 6px",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
      }}>{val}</span>
    </div>
  );

  return (
    <div style={{ padding: 14 }}>
      <div style={{
        background: "#fffbeb", border: `1.5px solid ${A}`, borderRadius: 10,
        padding: "10px 14px", marginBottom: 12, textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
          🎮 {t(E, "Try It", "직접 해봐")}
        </div>
        <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
          {t(E,
            "Pick any A, B, C. Watch the 7 sums get computed, then see where A, B, A+B+C land after sorting.",
            "A, B, C 를 골라봐. 7개 합이 계산되고, 정렬 후 A, B, A+B+C 가 어느 자리에 가는지 봐.")}
        </div>
      </div>

      <div style={{
        background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 10,
        padding: "10px 14px", marginBottom: 12,
      }}>
        <Slider name="A" val={aVal} set={setA} min={1} max={9} color="#15803d" />
        <Slider name="B" val={bVal} set={setB} min={1} max={9} color="#0891b2" />
        <Slider name="C" val={cVal} set={setC} min={1} max={9} color="#7c3aed" />
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4, fontStyle: "italic" }}>
          {t(E,
            `Auto-sorted as A ≤ B ≤ C → A=${sA}, B=${sB}, C=${sC}`,
            `자동 정렬: A ≤ B ≤ C → A=${sA}, B=${sB}, C=${sC}`)}
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, marginBottom: 6 }}>
        {t(E, "1. The 7 sums (with labels)", "1. 7개 합 (레이블 표시)")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {labelled.map((s) => (
          <div key={s.key} style={{
            background: "#fff", border: `1.5px solid ${s.color}`, borderRadius: 8,
            padding: "4px 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            display: "flex", flexDirection: "column", alignItems: "center", minWidth: 52,
          }}>
            <span style={{ color: s.color, fontWeight: 800, fontSize: 10 }}>{s.key}</span>
            <span style={{ color: C.text, fontWeight: 700 }}>{s.val}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, marginBottom: 6 }}>
        {t(E, "2. After sort() — index → value (label)", "2. sort() 후 — 인덱스 → 값 (레이블)")}
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4,
        background: "#0f172a", borderRadius: 8, padding: 8,
      }}>
        {sortedSums.map((s, i) => {
          const highlight = i === 0 || i === 1 || i === 6;
          return (
            <div key={i} style={{
              background: highlight ? s.color : "#1e293b",
              border: `1.5px solid ${highlight ? s.color : "#334155"}`,
              borderRadius: 6, padding: "6px 2px", textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              <div style={{ fontSize: 9, color: highlight ? "#fff" : "#64748b", fontWeight: 700 }}>
                nums[{i}]
              </div>
              <div style={{ fontSize: 14, color: highlight ? "#fff" : "#cbd5e1", fontWeight: 800 }}>
                {s.val}
              </div>
              <div style={{ fontSize: 9, color: highlight ? "#fff" : "#64748b", fontWeight: 700 }}>
                {s.key}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12, padding: "8px 12px", background: "#dcfce7",
        border: "1.5px solid #86efac", borderRadius: 8, fontSize: 12,
        color: "#15803d", lineHeight: 1.55,
      }}>
        💡 <b>{t(E, "Notice", "관찰")}</b>:{" "}
        {t(E,
          "no matter what A, B, C you pick, nums[0] = A, nums[1] = B, and nums[6] = A+B+C. That's the whole trick.",
          "어떤 A, B, C 를 골라도 nums[0] = A, nums[1] = B, nums[6] = A+B+C. 이게 핵심이야.")}
      </div>
    </div>
  );
}


const FULL_PY = [
  "nums = list(map(int, input().split()))",
  "nums.sort()",
  "",
  "# The largest number is A+B+C",
  "abc = nums[6]",
  "",
  "# The smallest number is A (since A <= B <= C)",
  "A = nums[0]",
  "",
  "# The second smallest is B",
  "B = nums[1]",
  "",
  "# C = (A+B+C) - A - B",
  "C_val = abc - A - B",
  "",
  "print(A, B, C_val)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    vector<int> nums(7);",
  "    for (int i = 0; i < 7; i++) {",
  "        cin >> nums[i];",
  "    }",
  "    sort(nums.begin(), nums.end());",
  "",
  "    // smallest is A, second smallest is B, largest is A+B+C",
  "    int A = nums[0];",
  "    int B = nums[1];",
  "    int C = nums[6] - A - B;",
  "    cout << A << \" \" << B << \" \" << C << \"\n\";",
  "    return 0;",
  "}",
];

export function getAbcsSections(E) {
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

export function AbcsProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#d97706" />;
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


export function downloadAbcsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Abcs — Full Study Guide", "Abcs — 종합 풀이 노트");
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

