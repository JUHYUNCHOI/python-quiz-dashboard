import { useState, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#f97316";

/* ═══════════════════════════════════════════════════════════════
   BalancedSim — visualize '(' × N + ')' × M and which pairs match
   ═══════════════════════════════════════════════════════════════ */
const _BAL_PRESETS = [
  { N: 3, M: 2 },   // (((    ))
  { N: 1, M: 5 },   // (    )))))
  { N: 4, M: 4 },   // ((((    ))))
  { N: 5, M: 3 },   // (((((    )))
];

export function BalancedSim({ E }) {
  const [pi, setPi] = useState(2);
  const { N, M } = _BAL_PRESETS[pi];
  const pairs = Math.min(N, M);
  const ans = 2 * pairs;

  // matched indices: pair i (0-based) matches '(' at index (N - pairs + i) with ')' at index (N + i)
  const matched = new Set();
  for (let i = 0; i < pairs; i++) {
    matched.add(N - pairs + i);   // '(' index in full string
    matched.add(N + i);           // ')' index in full string
  }

  const chars = [];
  for (let i = 0; i < N; i++) chars.push("(");
  for (let i = 0; i < M; i++) chars.push(")");

  // For each '(' that matched, draw an arc to its matched ')'
  // We'll just colour-code matched chars

  return (
    <div style={{ padding: 14 }}>
      {/* preset selector */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12, flexWrap: "wrap" }}>
        {_BAL_PRESETS.map((p, i) => (
          <button key={i} onClick={() => setPi(i)} style={{
            padding: "5px 10px", borderRadius: 8, border: `2px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>
            N={p.N}, M={p.M}
          </button>
        ))}
      </div>

      {/* bracket string */}
      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 6, flexWrap: "wrap" }}>
        {chars.map((ch, i) => {
          const isMatched = matched.has(i);
          const isOpen = ch === "(";
          return (
            <div key={i} style={{
              width: 28, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
              background: isMatched ? (isOpen ? "#fef3c7" : "#dbeafe") : "#f3f4f6",
              border: `2px solid ${isMatched ? (isOpen ? "#f59e0b" : "#3b82f6") : "#d1d5db"}`,
              color: isMatched ? (isOpen ? "#92400e" : "#1e3a8a") : "#9ca3af",
            }}>
              {ch}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", fontSize: 11, color: C.dim, marginBottom: 12 }}>
        {t(E, "Coloured = matched (counts toward answer). Greyed = leftover.",
              "색깔 = 매칭됨 (답에 포함). 회색 = 남은 것.")}
      </div>

      {/* result box */}
      <div style={{
        background: "#fff7ed", border: `2px solid ${A}`, borderRadius: 10, padding: "10px 14px", textAlign: "center",
      }}>
        <div style={{ fontSize: 12, color: C.dim, fontWeight: 700, marginBottom: 4 }}>
          min({N}, {M}) = {pairs} {t(E, "pairs", "쌍")}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: A, fontFamily: "'JetBrains Mono',monospace" }}>
          2 × {pairs} = {ans}
        </div>
        <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
          {t(E, "= longest balanced subsequence length", "= 가장 긴 균형 부분수열 길이")}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BalancedRunner — student inputs T queries, see results live
   ═══════════════════════════════════════════════════════════════ */
export function BalancedRunner({ E }) {
  const [input, setInput] = useState("3\n3 2\n1 5\n5 3");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const alive = useRef(false);

  const run = () => {
    const lines = input.trim().split("\n");
    const T = parseInt(lines[0]);
    if (!T || T < 1 || lines.length < T + 1) {
      setResults([{ error: t(E, "Invalid: line 1 = T, then T lines of 'N M'.", "잘못된 입력: 1줄 = T, 그 다음 T줄 'N M'.") }]);
      return;
    }
    setRunning(true); setResults([]);
    alive.current = true;
    let i = 0;
    const out = [];
    const tick = () => {
      if (!alive.current || i >= T) {
        setRunning(false);
        return;
      }
      const parts = lines[i + 1].trim().split(/\s+/).map(Number);
      if (parts.length !== 2 || parts.some(isNaN)) {
        out.push({ test: i + 1, error: true, line: lines[i + 1] });
      } else {
        const [N, M] = parts;
        out.push({ test: i + 1, N, M, ans: 2 * Math.min(N, M) });
      }
      setResults([...out]);
      i++;
      setTimeout(tick, 200);
    };
    setTimeout(tick, 100);
  };
  const stop = () => { alive.current = false; };

  return (
    <div style={{ padding: 14 }}>
      <textarea value={input} onChange={e => setInput(e.target.value)} disabled={running} rows={5}
        placeholder="T&#10;N1 M1&#10;N2 M2&#10;..."
        style={{
          width: "100%", padding: "8px 10px", borderRadius: 8, border: `2px solid ${C.border}`,
          fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 10,
          resize: "vertical", boxSizing: "border-box",
        }} />
      <button onClick={running ? stop : run} style={{
        width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 800, marginBottom: 10,
        background: running ? "#dc2626" : A, color: "#fff",
      }}>
        {running ? t(E, "⏹ Stop", "⏹ 중지") : t(E, "▶ Run", "▶ 실행")}
      </button>
      {results.length > 0 && (
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 6 }}>
            {t(E, "Output:", "출력:")}
          </div>
          {results.map((r, i) => (
            <div key={i} style={{ fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: r.error ? "#dc2626" : A, fontWeight: 800, lineHeight: 1.6 }}>
              {r.error ? `Test ${r.test}: bad input` : (r.test ? `Test ${r.test}: 2 × min(${r.N}, ${r.M}) = ${r.ans}` : r.error)}
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 12, background: "#f8fafc", borderRadius: 8, padding: "8px 10px", fontSize: 10, color: C.dim, lineHeight: 1.6 }}>
        <div style={{ fontWeight: 800, color: C.text, marginBottom: 4 }}>{t(E, "⏱ USACO Time Estimate", "⏱ USACO 시간 추정")}</div>
        <div>O(1) per query · trivially fast even for T = 10⁶</div>
      </div>
    </div>
  );
}

const BAL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    # Insight: string is N '(' followed by M ')' — order is fixed.",
  "    # Each '(' must pair with a ')' AFTER it.",
  "    # Maximum pairs = min(N, M). Each pair = 2 chars.",
  "    print(2 * min(N, M))",
];
const BAL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        long long N, M;",
  "        cin >> N >> M;",
  "        // Maximum balanced pairs = min(N, M); each pair = 2 chars",
  "        cout << 2 * min(N, M) << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

export function getBalancedSections(E) {
  return [
    {
      label: t(E, "🎯 Solution: 2 × min(N, M)", "🎯 풀이: 2 × min(N, M)"),
      color: A,
      py: BAL_PY, cpp: BAL_CPP,
      why: [
        t(E, "String is N '(' followed by M ')' — order is fixed by problem.", "문자열은 N 개 '(' 뒤에 M 개 ')' — 순서는 문제로 고정."),
        t(E, "Each balanced pair = one '(' followed by one ')'. To pair them, '(' must come before ')'.", "균형 쌍 = '(' 뒤에 ')'. 짝지으려면 '(' 가 먼저."),
        t(E, "Since ALL '(' come before ALL ')', any '(' can pair with any ')' — limit is min(N, M).", "모든 '(' 가 모든 ')' 보다 앞 → 어떤 '(' 든 어떤 ')' 와 짝 가능 — 한계는 min(N, M)."),
        t(E, "Each pair contributes 2 characters → answer = 2 × min(N, M).", "각 쌍은 2 글자 → 답 = 2 × min(N, M)."),
        t(E, "Time: O(1) per test case. Trivially fast.", "시간: 테스트 케이스당 O(1). 즉시."),
      ],
      pyOnly: [
        t(E, "min() built-in for the formula. sys.stdin.readline still useful for many T.",
            "min() 내장. T 가 많으면 sys.stdin.readline 이 빠름."),
      ],
      cppOnly: [
        t(E, "long long for N, M — could be up to 10^18.", "long long 사용 — N, M 이 10^18 까지 가능."),
        t(E, "min(N, M) from <algorithm> (included via bits/stdc++.h).", "min(N, M) 은 <algorithm> (bits/stdc++.h 포함)."),
      ],
    },
  ];
}

export function BalancedProgressiveCode({ E, lang = "py", sections }) {
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        {t(E, `Showing ${langLabel} (change via header dropdown ↑)`, `${langLabel} 표시 중 (위 헤더 dropdown 으로 변경)`)}
      </div>
      {sections.map((s, i) => {
        const code = lang === "py" ? s.py : s.cpp;
        const langSpecific = lang === "py" ? (s.pyOnly || []) : (s.cppOnly || []);
        return (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ background: s.color, color: "#fff", padding: "8px 14px", borderRadius: "10px 10px 0 0", fontSize: 14, fontWeight: 800 }}>{s.label}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderTop: "none", padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>💡 {t(E, "Why this way?", "왜 이렇게?")}</div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span><span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>{langLabel} {t(E, "specific:", "전용:")}</div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span><span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}><CodeBlock lines={code} /></div>
          </div>
        );
      })}
    </div>
  );
}

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min"];
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadBalancedPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Balanced Subsequences — Full Study Guide", "🔗 Balanced Subsequences — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h2 { font-size: 17px; padding: 8px 12px; border-radius: 8px; margin: 22px 0 10px; background: ${A}; color: white; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #fff7ed; border: 1.5px solid #fdba74; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 January Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E, "Given a string of N '(' followed by M ')', find the LONGEST balanced bracket subsequence.", "N 개 '(' 뒤에 M 개 ')' 인 문자열에서 가장 긴 균형 잡힌 괄호 부분수열의 길이.")}</p>
<h2>2. ${t(E, "Insight", "통찰")}</h2>
<div class="box">
  <b>💡 ${t(E, "Key idea", "핵심")}</b>:
  ${t(E, "Since ALL '(' come BEFORE ALL ')', every '(' can pair with every ')'. The bottleneck is whichever has fewer characters.",
        "모든 '(' 가 모든 ')' 보다 앞이라, 모든 '(' 가 어떤 ')' 와도 짝 가능. 적은 쪽이 한계.")}
</div>
<p>${t(E, "Answer = 2 × min(N, M). Each pair = 2 chars.", "답 = 2 × min(N, M). 각 쌍 = 2 글자.")}</p>
<h2>3. ${t(E, "Code", "코드")}</h2>
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
