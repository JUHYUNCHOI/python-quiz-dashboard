import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   CrossRoad2Sim — step through every pair of cows and check if
   their two positions INTERLEAVE (a1 < b1 < a2 < b2  or  rotated).
   For each pair we show the four positions on the strip and the
   interleave check, then accumulate the crossing count.
   ═══════════════════════════════════════════════════════════════ */
const _CR2_PRESETS = [
  { label: "ABBA", s: "ABBA" },        // 1 crossing? no — A surrounds B (nested)
  { label: "ABAB", s: "ABAB" },        // 1 crossing (interleave)
  { label: "ABCABC", s: "ABCABC" },    // all 3 pairs interleave → 3
  { label: "ABCBAC", s: "ABCBAC" },    // mixed
];

// Build sorted list of unique cows + their two positions.
function _cr2Pairs(s) {
  const pos = {};
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!pos[c]) pos[c] = [];
    pos[c].push(i);
  }
  const cows = Object.keys(pos).sort();
  const pairs = [];
  for (let i = 0; i < cows.length; i++) {
    for (let j = i + 1; j < cows.length; j++) {
      const [a1, a2] = pos[cows[i]];
      const [b1, b2] = pos[cows[j]];
      const cross = (a1 < b1 && b1 < a2 && a2 < b2) || (b1 < a1 && a1 < b2 && b2 < a2);
      pairs.push({ A: cows[i], B: cows[j], a1, a2, b1, b2, cross });
    }
  }
  return { pos, cows, pairs };
}

export function CrossRoad2Sim({ E }) {
  const [pi, setPi] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const preset = _CR2_PRESETS[pi];
  const s = preset.s;
  const { pairs } = _cr2Pairs(s);

  // ans = number of crossing pairs in pairs[0..stepIdx-1]
  let ans = 0;
  for (let i = 0; i < stepIdx; i++) if (pairs[i].cross) ans += 1;
  const cur = stepIdx > 0 ? pairs[stepIdx - 1] : null;

  const colorA = "#f97316"; // pair A
  const colorB = "#2563eb"; // pair B

  // Renders the string strip, highlighting the 4 positions of the current pair.
  const strip = () => (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
      {s.split("").map((ch, i) => {
        let bg = "#fff", bd = C.border, fg = C.dim;
        if (cur) {
          if (i === cur.a1 || i === cur.a2) { bg = "#fff7ed"; bd = colorA; fg = colorA; }
          else if (i === cur.b1 || i === cur.b2) { bg = "#eff6ff"; bd = colorB; fg = colorB; }
        }
        return (
          <div key={i} style={{
            width: 26, height: 30, borderRadius: 6,
            border: `1.5px solid ${bd}`, background: bg, color: fg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 800,
          }}>{ch}</div>
        );
      })}
    </div>
  );

  // Position labels under the strip.
  const idxStrip = () => (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginTop: 2 }}>
      {s.split("").map((_, i) => (
        <div key={i} style={{ width: 26, textAlign: "center", fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono',monospace" }}>{i}</div>
      ))}
    </div>
  );

  const eventBox = () => {
    if (!cur) return t(E, "Press → to inspect the first pair of cows.", "→ 를 눌러 첫 소-쌍을 확인해요.");
    const { A: ca, B: cb, a1, a2, b1, b2, cross } = cur;
    const order = [
      { p: a1, c: ca, col: colorA },
      { p: a2, c: ca, col: colorA },
      { p: b1, c: cb, col: colorB },
      { p: b2, c: cb, col: colorB },
    ].sort((x, y) => x.p - y.p);
    const orderStr = order.map(o => o.c).join("");
    return (
      <>
        <div>
          {t(E, "Pair ", "쌍 ")}
          <b style={{ color: colorA }}>{ca}</b>
          {t(E, " (positions ", " (위치 ")}{a1},{a2}
          {t(E, ") vs ", ") 와 ")}
          <b style={{ color: colorB }}>{cb}</b>
          {t(E, " (positions ", " (위치 ")}{b1},{b2}{")"}
        </div>
        <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "sorted order: ", "정렬된 순서: ")}<b>{orderStr}</b>{" → "}
          {cross
            ? <span style={{ color: "#16a34a", fontWeight: 800 }}>{t(E, "interleave! cross +1", "엇갈림! 교차 +1")}</span>
            : <span style={{ color: C.dim }}>{t(E, "nested or apart — no cross", "포개지거나 떨어짐 — 교차 X")}</span>}
        </div>
      </>
    );
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_CR2_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setStepIdx(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `1px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p.label}</button>
        ))}
      </div>

      {/* String strip with highlighted positions */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 8px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "string s (cow letters at each crossing point)", "문자열 s (각 횡단 지점의 소 글자)")}
        </div>
        {strip()}
        {idxStrip()}
      </div>

      {/* Pair list — done so far, current, remaining */}
      <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 8px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>
          {t(E, "all cow-pairs to check", "확인할 모든 소-쌍")}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {pairs.map((p, i) => {
            const done = i < stepIdx - 1;
            const isCur = i === stepIdx - 1;
            const tagBg = isCur ? "#fffbeb" : (done ? (p.cross ? "#dcfce7" : "#f1f5f9") : "#fff");
            const tagBd = isCur ? A : (done ? (p.cross ? "#86efac" : C.border) : C.border);
            const tagFg = done && p.cross ? "#16a34a" : (done ? C.dim : C.text);
            return (
              <div key={i} style={{
                padding: "3px 8px", borderRadius: 6,
                border: `1.5px solid ${tagBd}`, background: tagBg, color: tagFg,
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700,
                opacity: done || isCur ? 1 : 0.5,
              }}>
                ({p.A},{p.B}){done ? (p.cross ? " ✓" : " ·") : ""}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}`, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
          ans = <b style={{ color: "#16a34a" }}>{ans}</b>
          <span style={{ color: C.dim }}>{"  ("}{stepIdx}/{pairs.length}{")"}</span>
        </div>
      </div>

      {/* event narration */}
      <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: "#9a3412", lineHeight: 1.6, minHeight: 48 }}>
        {eventBox()}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0} style={{
          background: stepIdx === 0 ? "#e5e7eb" : "#fff", border: `1px solid ${stepIdx === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600, color: stepIdx === 0 ? "#b0b5c3" : A,
          cursor: stepIdx === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{stepIdx} / {pairs.length}</span>
        <button onClick={() => setStepIdx(Math.min(pairs.length, stepIdx + 1))} disabled={stepIdx === pairs.length} style={{
          background: stepIdx === pairs.length ? "#e5e7eb" : A, border: `1px solid ${stepIdx === pairs.length ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600,
          color: stepIdx === pairs.length ? "#b0b5c3" : "#fff", cursor: stepIdx === pairs.length ? "default" : "pointer",
        }}>→</button>
        <button onClick={() => setStepIdx(0)} disabled={stepIdx === 0} style={{
          background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "5px 10px", fontSize: 11, fontWeight: 600, color: C.dim,
          cursor: stepIdx === 0 ? "default" : "pointer",
        }}>{t(E, "reset", "초기화")}</button>
      </div>
    </div>
  );
}

const FULL_PY = [
  "# USACO 이전 contest는 파일 입출력 사용",
  "import sys",
  "sys.stdin = open('circlecross.in')",
  "sys.stdout = open('circlecross.out', 'w')",
  "",
  "N = int(input())",
  "s = input().strip()",
  "",
  "# Find first and second occurrence of each letter",
  "pos = {}",
  "for i, ch in enumerate(s):",
  "    if ch not in pos:",
  "        pos[ch] = [i]",
  "    else:",
  "        pos[ch].append(i)",
  "",
  "# Count crossing pairs",
  "# Two chords cross iff their endpoints alternate: A..B..A..B",
  "cows = list(pos.keys())",
  "ans = 0",
  "for i in range(len(cows)):",
  "    for j in range(i + 1, len(cows)):",
  "        a1, a2 = pos[cows[i]]",
  "        b1, b2 = pos[cows[j]]",
  "        # Check if they interleave",
  "        if a1 < b1 < a2 < b2 or b1 < a1 < b2 < a2:",
  "            ans += 1",
  "",
  "print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <string>",
  "#include <vector>",
  "#include <set>",
  "#include <map>",
  "using namespace std;",
  "",
  "int main() {",
  "    // USACO 이전 contest는 파일 입출력 사용",
  "    freopen(\"circlecross.in\", \"r\", stdin);",
  "    freopen(\"circlecross.out\", \"w\", stdout);",
  "",
  "    int N; cin >> N;",
  "    string s; cin >> s;",
  "    map<char, vector<int>> pos;",
  "    for (int i = 0; i < (int)s.size(); i++) pos[s[i]].push_back(i);",
  "    int crosses = 0;",
  "    for (auto& [ch, idx] : pos) {",
  "        if (idx.size() < 2) continue;",
  "        // Count letters that occur strictly between idx[0] and idx[1]",
  "        set<char> between;",
  "        for (int i = idx[0] + 1; i < idx[1]; i++) if (s[i] != ch) between.insert(s[i]);",
  "        crosses += between.size();",
  "    }",
  "    cout << (crosses / 2) << \"\\n\";",
  "    return 0;",
  "}",
];

export function getCrossRoad2Sections(E) {
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

export function CrossRoad2ProgressiveCode(props) {
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


export function downloadCrossRoad2PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "CrossRoad2 — Full Study Guide", "CrossRoad2 — 종합 풀이 노트");
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

