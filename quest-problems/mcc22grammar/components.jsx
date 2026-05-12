import { useState, useMemo } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* ============================================================
   Mcc22GrammarSim — pick a sentence, step through each word
   pair, watch each consecutive (X, Y) get checked against
   the grammar's edge SET. Verdict turns VALID / INVALID.
   ============================================================ */
const _SIM_EDGES = [
  ["WE", "DONT"], ["WE", "KNOW"],
  ["THEY", "DONT"], ["THEY", "KNOW"],
  ["DONT", "KNOW"],
  ["KNOW", "THAT"],
  ["THAT", "WE"], ["THAT", "THEY"],
];
const _SIM_EDGE_SET = new Set(_SIM_EDGES.map(([a, b]) => `${a}|${b}`));
const _SIM_SENTENCES = [
  ["WE", "KNOW"],
  ["WE", "KNOW", "THAT", "THEY", "KNOW"],
  ["THEY", "DONT", "KNOW", "THAT"],
  ["KNOW", "WE", "DONT"],
];

export function Mcc22GrammarSim({ E }) {
  const [sIdx, setSIdx] = useState(0);
  const [step, setStep] = useState(0);

  const sentence = _SIM_SENTENCES[sIdx];
  const totalPairs = Math.max(0, sentence.length - 1);
  const checked = Math.min(step, totalPairs);

  const { firstBadIdx, doneAll } = useMemo(() => {
    let bad = -1;
    for (let i = 0; i < totalPairs; i++) {
      const ok = _SIM_EDGE_SET.has(`${sentence[i]}|${sentence[i + 1]}`);
      if (!ok) { bad = i; break; }
    }
    return { firstBadIdx: bad, doneAll: checked >= totalPairs };
  }, [sIdx, totalPairs, checked, sentence]);

  const sentenceBroken = doneAll && firstBadIdx !== -1 && checked > firstBadIdx;
  const verdict = doneAll
    ? (firstBadIdx === -1
        ? t(E, "VALID — every pair has an edge", "VALID — 모든 쌍에 화살표 있음")
        : t(E, "INVALID — pair without edge", "INVALID — 화살표 없는 쌍"))
    : t(E, "checking…", "확인 중…");

  const pickSentence = (i) => { setSIdx(i); setStep(0); };
  const stepNext = () => setStep(s => Math.min(s + 1, totalPairs));
  const stepReset = () => setStep(0);

  // Layout positions for the 5 distinct words
  const WORDS = ["WE", "THEY", "DONT", "KNOW", "THAT"];
  const _POS = {
    WE:    { cx: 70,  cy: 40  },
    THEY:  { cx: 70,  cy: 130 },
    DONT:  { cx: 200, cy: 40  },
    KNOW:  { cx: 200, cy: 130 },
    THAT:  { cx: 330, cy: 85  },
  };
  const svgW = 400, svgH = 175;

  // Currently being inspected pair (the one just checked, or the next one)
  const inspectIdx = doneAll
    ? (firstBadIdx === -1 ? totalPairs - 1 : firstBadIdx)
    : checked;
  const fromW = sentence[inspectIdx];
  const toW   = sentence[inspectIdx + 1];
  const inspectKey = fromW && toW ? `${fromW}|${toW}` : null;
  const inspectExists = inspectKey ? _SIM_EDGE_SET.has(inspectKey) : false;

  return (
    <div style={{ padding: 14 }}>
      <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", marginBottom: 8, textAlign: "center" }}>
          {t(E, "🔎 Pick a sentence — step through each word pair", "🔎 문장을 골라 — 단어 쌍을 한 번에 하나씩 확인")}
        </div>

        {/* Sentence pickers */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          {_SIM_SENTENCES.map((s, i) => (
            <button key={i} onClick={() => pickSentence(i)} style={{
              background: i === sIdx ? A : "#fff",
              color: i === sIdx ? "#fff" : A,
              border: `1.5px solid ${A}`,
              borderRadius: 8, padding: "4px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {s.join(" ")}
            </button>
          ))}
        </div>

        {/* SVG grammar graph */}
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #6ee7b7", padding: 4, overflowX: "auto" }}>
          <svg width={svgW} height={svgH} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }}>
            <defs>
              <marker id="arr-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
              </marker>
              <marker id="arr-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={A} />
              </marker>
              <marker id="arr-bad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
              </marker>
            </defs>

            {/* Edges */}
            {_SIM_EDGES.map(([u, v]) => {
              const a = _POS[u], b = _POS[v];
              const dx = b.cx - a.cx, dy = b.cy - a.cy;
              const len = Math.hypot(dx, dy) || 1;
              const ox = (dx / len) * 26, oy = (dy / len) * 14;
              const isInspect = inspectKey === `${u}|${v}`;
              const stroke = isInspect ? (inspectExists ? A : "#dc2626") : "#cbd5e1";
              const marker = isInspect ? (inspectExists ? "arr-ok" : "arr-bad") : "arr-dim";
              const sw = isInspect ? 2.5 : 1.2;
              return (
                <line key={`${u}-${v}`}
                  x1={a.cx + ox} y1={a.cy + oy}
                  x2={b.cx - ox} y2={b.cy - oy}
                  stroke={stroke} strokeWidth={sw}
                  markerEnd={`url(#${marker})`} />
              );
            })}

            {/* Missing edge attempt — draw a dashed red line if pair is not in the grammar */}
            {inspectKey && !inspectExists && fromW && toW && _POS[fromW] && _POS[toW] && (() => {
              const a = _POS[fromW], b = _POS[toW];
              const dx = b.cx - a.cx, dy = b.cy - a.cy;
              const len = Math.hypot(dx, dy) || 1;
              const ox = (dx / len) * 26, oy = (dy / len) * 14;
              return (
                <line
                  x1={a.cx + ox} y1={a.cy + oy}
                  x2={b.cx - ox} y2={b.cy - oy}
                  stroke="#dc2626" strokeWidth={2.5} strokeDasharray="5,4"
                  markerEnd="url(#arr-bad)" />
              );
            })()}

            {/* Nodes */}
            {WORDS.map(w => {
              const p = _POS[w];
              const isFrom = inspectKey && fromW === w;
              const isTo   = inspectKey && toW === w;
              const fill = isFrom ? "#7c3aed" : isTo ? "#0891b2" : "#fff";
              const stroke = isFrom ? "#7c3aed" : isTo ? "#0891b2" : A;
              const textColor = isFrom || isTo ? "#fff" : "#065f46";
              return (
                <g key={w}>
                  <rect x={p.cx - 26} y={p.cy - 14} width={52} height={28} rx={8}
                    fill={fill} stroke={stroke} strokeWidth={2} />
                  <text x={p.cx} y={p.cy + 4} textAnchor="middle"
                    style={{ fontSize: 11, fontWeight: 800, fill: textColor, fontFamily: "system-ui, sans-serif" }}>
                    {w}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 6, flexWrap: "wrap", fontSize: 11, color: "#065f46" }}>
          <span><b style={{ color: "#7c3aed" }}>■</b> X</span>
          <span><b style={{ color: "#0891b2" }}>■</b> Y</span>
          <span><b style={{ color: A }}>→</b> {t(E, "edge in grammar", "문법에 있는 화살표")}</span>
          <span><b style={{ color: "#dc2626" }}>⇢</b> {t(E, "missing edge", "없는 화살표")}</span>
        </div>
      </div>

      {/* Sentence with per-pair markers */}
      <div style={{
        background: "#fff", border: `1.5px solid ${A}`, borderRadius: 12, padding: "10px 14px", marginBottom: 10,
        textAlign: "center", fontFamily: "'JetBrains Mono', monospace",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 6 }}>
          {t(E, "Sentence", "문장")} · {checked} / {totalPairs} {t(E, "pairs checked", "쌍 확인됨")}
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: A, lineHeight: 1.7 }}>
          {sentence.map((w, i) => {
            const isInspectFrom = i === inspectIdx && !doneAll;
            const isBad = sentenceBroken && i > firstBadIdx;
            const color = isBad ? "#dc2626" : isInspectFrom ? "#7c3aed" : A;
            return (
              <span key={i}>
                <span style={{ color, textDecoration: isBad ? "line-through" : "none" }}>{w}</span>
                {i < sentence.length - 1 && (() => {
                  const ok = _SIM_EDGE_SET.has(`${sentence[i]}|${sentence[i + 1]}`);
                  const done = i < checked;
                  const sym = !done ? "·" : ok ? "→" : "✗";
                  const c = !done ? "#cbd5e1" : ok ? A : "#dc2626";
                  return <span style={{ color: c, margin: "0 6px" }}>{sym}</span>;
                })()}
              </span>
            );
          })}
        </div>
      </div>

      {/* Step controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}>
        <button onClick={stepReset} style={{
          background: "#fff", color: A, border: `1.5px solid ${A}`,
          borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
        }}>
          ⟲ {t(E, "Reset", "처음")}
        </button>
        <button onClick={stepNext} disabled={doneAll} style={{
          background: doneAll ? "#d1d5db" : A,
          color: "#fff",
          border: `1.5px solid ${doneAll ? "#d1d5db" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 800,
          cursor: doneAll ? "not-allowed" : "pointer",
        }}>
          {t(E, "Check next pair ▶", "다음 쌍 확인 ▶")}
        </button>
      </div>

      {/* Verdict card */}
      <div style={{
        background: "#fff", border: `2px solid ${doneAll ? (firstBadIdx === -1 ? A : "#dc2626") : "#cbd5e1"}`,
        borderRadius: 12, padding: "12px 14px", textAlign: "center",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 6 }}>
          🎯 {t(E, "Verdict", "판정")}
        </div>
        <div style={{
          fontSize: 15, fontWeight: 800,
          color: doneAll ? (firstBadIdx === -1 ? A : "#dc2626") : C.dim,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {verdict}
        </div>
        {doneAll && firstBadIdx !== -1 && (
          <div style={{ fontSize: 11, color: C.dim, marginTop: 6 }}>
            {t(E,
              `No edge ${sentence[firstBadIdx]} → ${sentence[firstBadIdx + 1]} in the grammar`,
              `문법에 ${sentence[firstBadIdx]} → ${sentence[firstBadIdx + 1]} 화살표가 없어요`)}
          </div>
        )}
      </div>
    </div>
  );
}

const FULL_PY = [
  "import sys",
  "from collections import deque",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    W = int(input_data[idx])",
  "    idx += 1",
  "    words = []",
  "    word_id = {}",
  "    for i in range(W):",
  "        w = input_data[idx]",
  "        idx += 1",
  "        words.append(w)",
  "        word_id[w] = i",
  "",
  "    E = int(input_data[idx])",
  "    idx += 1",
  "    adj = [[] for _ in range(W)]",
  "    for _ in range(E):",
  "        u = word_id[input_data[idx]]",
  "        idx += 1",
  "        v = word_id[input_data[idx]]",
  "        idx += 1",
  "        adj[u].append(v)",
  "",
  "    S = int(input_data[idx])",
  "    idx += 1",
  "    for _ in range(S):",
  "        n = int(input_data[idx])",
  "        idx += 1",
  "        sentence = []",
  "        for _ in range(n):",
  "            sentence.append(word_id[input_data[idx]])",
  "            idx += 1",
  "        valid = True",
  "        for i in range(n - 1):",
  "            if sentence[i+1] not in adj[sentence[i]]:",
  "                valid = False; break",
  "        print('YES' if valid else 'NO')",
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
  "        auto W = int(input_data[idx]); idx += 1;",
  "        auto words = [];",
  "        auto word_id = {};",
  "        for (int i = 0; i < W; i++) {",
  "            auto w = input_data[idx]; idx += 1;",
  "            // words.append(w)",
  "            // word_id[w] = i",
  "",
  "        auto E = int(input_data[idx]); idx += 1;",
  "        auto adj = [[] for _ in range(W)];",
  "        for (int _ = 0; _ < E; _++) {",
  "            auto u = word_id[input_data[idx]]; idx += 1;",
  "            auto v = word_id[input_data[idx]]; idx += 1;",
  "            // adj[u].append(v)",
  "",
  "        auto S = int(input_data[idx]); idx += 1;",
  "        for (int _ = 0; _ < S; _++) {",
  "            auto n = int(input_data[idx]); idx += 1;",
  "            auto sentence = [];",
  "            for (int _ = 0; _ < n; _++) {",
  "                // sentence.append(word_id[input_data[idx]])",
  "                idx += 1",
  "            auto valid = True;",
  "            // for i in range(n - 1):",
  "                if (sentence[i+1] not in adj[sentence[i]]) {",
  "                    auto valid = False; break;",
  "            cout << 'YES' if valid else 'NO' << \"\\n\";",
  "",
  "    // solve()",
  "",
  "    return 0;",
  "}",
];

export function getMcc22GrammarSections(E) {
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

export function Mcc22GrammarProgressiveCode(props) {
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


export function downloadMcc22GrammarPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc22Grammar — Full Study Guide", "Mcc22Grammar — 종합 풀이 노트");
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

