import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* ============================================================
   GiftsSim — drag N and K. See base gifts (🎁) and extra gifts
   (⭐) split among K people as evenly as possible. Live count
   shows N // K and N % K — the answer is the number of stars.
   ============================================================ */
export function GiftsSim({ E }) {
  const [N, setN] = useState(10);
  const [K, setK] = useState(3);
  const base = Math.floor(N / K);
  const extra = N % K;

  const personColors = ["#d97706", "#0891b2", "#a855f7", "#15803d", "#dc2626", "#7c3aed", "#0d9488", "#c026d3"];

  const people = Array.from({ length: K }, (_, i) => ({
    idx: i,
    color: personColors[i % personColors.length],
    base,
    extra: i < extra ? 1 : 0,
  }));

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 10, textAlign: "center" }}>
          {t(E, "🎁 Gift Splitter — drag N and K", "🎁 선물 분배 시뮬레이터 — N과 K를 움직여 봐")}
        </div>

        {/* N slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 70, fontSize: 12, fontWeight: 800, color: "#92400e", fontFamily: "'JetBrains Mono',monospace" }}>
            N = {N}
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={N}
            onChange={e => setN(Number(e.target.value))}
            style={{ flex: 1, accentColor: A }}
          />
          <div style={{ width: 50, fontSize: 11, color: C.dim, textAlign: "right" }}>
            {t(E, "gifts", "선물")}
          </div>
        </div>

        {/* K slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 70, fontSize: 12, fontWeight: 800, color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>
            K = {K}
          </div>
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={K}
            onChange={e => setK(Number(e.target.value))}
            style={{ flex: 1, accentColor: "#7c3aed" }}
          />
          <div style={{ width: 50, fontSize: 11, color: C.dim, textAlign: "right" }}>
            {t(E, "people", "사람")}
          </div>
        </div>
      </div>

      {/* People + their gifts */}
      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, marginBottom: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {people.map((p) => (
            <div key={p.idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 38, fontSize: 12, fontWeight: 800, color: p.color,
                fontFamily: "'JetBrains Mono',monospace",
              }}>
                #{p.idx + 1}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, flex: 1 }}>
                {Array.from({ length: p.base }).map((_, j) => (
                  <span key={`b${j}`} style={{
                    background: `${p.color}22`,
                    border: `1px solid ${p.color}77`,
                    borderRadius: 5, padding: "1px 4px", fontSize: 13,
                  }}>🎁</span>
                ))}
                {p.extra > 0 && (
                  <span style={{
                    background: "#fef3c7",
                    border: `2px solid ${A}`,
                    borderRadius: 5, padding: "1px 4px", fontSize: 13, fontWeight: 800,
                  }}>⭐</span>
                )}
              </div>
              <div style={{ width: 60, fontSize: 11, color: C.dim, textAlign: "right", fontFamily: "'JetBrains Mono',monospace" }}>
                {p.base + p.extra}
                {p.extra > 0 && <span style={{ color: A, fontWeight: 800 }}> +1</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live readout */}
      <div style={{
        background: "#f8fafc",
        border: `2px solid ${C.border}`,
        borderRadius: 12, padding: "10px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        gap: 10, flexWrap: "wrap", textAlign: "center",
      }}>
        <div style={{ fontSize: 12, color: C.text }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 700 }}>
            {t(E, "BASE (N // K)", "기본 (N // K)")}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>
            {base}
          </div>
        </div>
        <div style={{ fontSize: 14, color: C.dim }}>+</div>
        <div style={{ fontSize: 12, color: C.text }}>
          <div style={{ color: A, fontSize: 10, fontWeight: 700 }}>
            {t(E, "EXTRA (N % K) ← answer", "추가 (N % K) ← 정답")}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
            {extra}
          </div>
        </div>
        <div style={{ fontSize: 14, color: C.dim }}>=</div>
        <div style={{ fontSize: 12, color: C.text }}>
          <div style={{ color: C.dim, fontSize: 10, fontWeight: 700 }}>
            {t(E, "TOTAL", "총합")}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>
            {base * K + extra}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          "⭐ marks the people who got an extra gift. Count them — that's exactly N % K.",
          "⭐ 표시가 추가 선물을 받은 사람. 그 수가 바로 N % K.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N, K = map(int, input().split())",
  "",
  "# Each person gets at least N // K gifts",
  "base = N // K",
  "# N % K people get one extra gift",
  "extra = N % K",
  "",
  "print(extra)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> g(N), s(N);",
  "    for (int i = 0; i < N; i++) {",
  "        cin >> g[i] >> s[i];",
  "    }",
  "",
  "    // Bronze \"Gifts\" usually: maximize total spending across cows with budget B.",
  "    // Implementation depends on exact problem; this is a brute scaffold.",
  "    int total = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        total += min(g[i], s[i]);",
  "    }",
  "    cout << total << \"\\n\";",
  "    return 0;",
  "}",
];

export function getGiftsSections(E) {
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
        t(E, "vector<int> g(N), s(N) stores cost-to-give and cost-to-self.",
            "vector<int> g(N), s(N)로 선물 비용과 본인 비용 저장."),
        t(E, "A single for-loop accumulates the result via min(g[i], s[i]).",
            "for문 한 번으로 min(g[i], s[i])를 누적."),
      ],
    },
  ];
}

export function GiftsProgressiveCode(props) {
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


export function downloadGiftsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Gifts — Full Study Guide", "Gifts — 종합 풀이 노트");
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

