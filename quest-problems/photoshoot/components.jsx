// 🔒 USACO_VERIFIED (2026-05-13)
//   Python: 0/1 (RTE - wrong input format (no target line))
//   C++:    0/1 (WA - solution for different problem (permutation, not reversal count))
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

/* ════════════════════════════════════════════════════════════════════
   PhotoshootUnfoldSim — guess a[0], unfold a[i+1] = b[i] - a[i] live.
   Highlights duplicates / out-of-range cells so a wrong guess is visible.
   ════════════════════════════════════════════════════════════════════ */
// Each preset has a unique a[0] in 1..N that yields a valid permutation.
// S1: a=[1,3,2,4,5] → b=[4,5,6,9]
// S2: a=[1,3,2,4]   → b=[4,5,6]
// S3: a=[3,1,4,2,5,6] → b=[4,5,6,7,11]
const PHOTOSHOOT_PRESETS = [
  { name: "S1", N: 5, b: [4, 5, 6, 9] },
  { name: "S2", N: 4, b: [4, 5, 6] },
  { name: "S3", N: 6, b: [4, 5, 6, 7, 11] },
];

export function PhotoshootUnfoldSim({ E }) {
  const [pi, setPi] = useState(0);
  const preset = PHOTOSHOOT_PRESETS[pi];
  const N = preset.N;
  const b = preset.b;
  const [a0, setA0] = useState(1);

  const safeA0 = Math.max(1, Math.min(N, a0));

  // Unfold a[i+1] = b[i] - a[i]
  const a = [safeA0];
  const used = { [safeA0]: true };
  let firstFailIdx = -1;
  let failReason = "";
  for (let i = 0; i + 1 < N; i++) {
    const next = b[i] - a[i];
    a.push(next);
    if (firstFailIdx === -1) {
      if (next < 1 || next > N) { firstFailIdx = i + 1; failReason = "range"; }
      else if (used[next]) { firstFailIdx = i + 1; failReason = "dup"; }
      else used[next] = true;
    }
  }
  const ok = firstFailIdx === -1;

  return (
    <div style={{
      padding: 12, marginTop: 12,
      background: "#fff", border: `1.5px solid ${A}`, borderRadius: 10,
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: A, marginBottom: 8, letterSpacing: 0.3 }}>
        🔬 {t(E, "Try it: guess a[0], watch the rest unfold", "직접 해봐: a[0] 추측, 나머지 자동 전개")}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {PHOTOSHOOT_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setA0(1); }}
            style={{
              padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1.5px solid ${pi === i ? A : C.border}`,
              background: pi === i ? "#fee2e2" : "#fff", color: pi === i ? A : C.text, cursor: "pointer",
              fontFamily: "'JetBrains Mono',monospace",
            }}>{p.name}: N={p.N}, b=[{p.b.join(",")}]</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "6px 10px", alignItems: "center", marginBottom: 12, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: A, fontFamily: "'JetBrains Mono',monospace" }}>a[0] =</div>
        <input type="range" min={1} max={N} value={safeA0}
          onChange={e => setA0(Number(e.target.value))}
          style={{ width: "100%", accentColor: A }} />
        <div style={{ fontWeight: 700, color: A, minWidth: 22, textAlign: "right", fontFamily: "'JetBrains Mono',monospace" }}>{safeA0}</div>
      </div>

      {/* a[] cells */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 6, flexWrap: "wrap" }}>
        {a.map((v, i) => {
          const isFail = firstFailIdx !== -1 && i === firstFailIdx;
          const isAfterFail = firstFailIdx !== -1 && i > firstFailIdx;
          const isA0 = i === 0;
          let bg = "#fff", bd = C.border, fg = C.text;
          if (isA0) { bg = "#fee2e2"; bd = A; fg = "#7f1d1d"; }
          else if (isFail) { bg = "#fef2f2"; bd = "#dc2626"; fg = "#7f1d1d"; }
          else if (isAfterFail) { bg = "#f3f4f6"; bd = C.border; fg = C.dim; }
          else { bg = "#dcfce7"; bd = "#86efac"; fg = "#15803d"; }
          return (
            <div key={i} style={{
              width: 40, height: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              borderRadius: 8, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono',monospace",
              background: bg, border: `2px solid ${bd}`, color: fg, position: "relative",
            }}>
              <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.7, lineHeight: 1 }}>a[{i}]</div>
              <div>{v}</div>
            </div>
          );
        })}
      </div>

      {/* b[] formula row */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
        {b.map((v, i) => (
          <div key={i} style={{
            width: 40, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 6, fontSize: 11, fontFamily: "'JetBrains Mono',monospace",
            background: "#eff6ff", border: "1px solid #93c5fd", color: "#1e40af",
            marginLeft: i === 0 ? 20 : 0,
          }}>b[{i}]={v}</div>
        ))}
      </div>

      {/* Verdict */}
      <div style={{
        background: ok ? "#dcfce7" : "#fee2e2",
        border: `1.5px solid ${ok ? "#86efac" : "#fca5a5"}`,
        borderRadius: 8, padding: "8px 10px", fontSize: 12, lineHeight: 1.5,
        color: ok ? "#15803d" : "#7f1d1d",
      }}>
        {ok ? (
          <span><b>✅ {t(E, "Valid permutation!", "유효한 순열!")}</b> {t(E, "All values in 1..N, no duplicates.", "모든 값이 1..N 범위, 중복 없음.")} a = [{a.join(", ")}]</span>
        ) : (
          <span>
            <b>❌ {t(E, "Fails at", "실패 위치")} a[{firstFailIdx}] = {a[firstFailIdx]}.</b>{" "}
            {failReason === "range"
              ? t(E, `Out of range 1..${N}.`, `1..${N} 범위 밖.`)
              : t(E, "Duplicate (already used).", "이미 사용된 값(중복).")}
          </span>
        )}
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: C.dim, lineHeight: 1.5 }}>
        {t(E,
          "Rule: a[i+1] = b[i] − a[i]. Pick a[0], the rest is forced. Slide until you find a valid lineup.",
          "규칙: a[i+1] = b[i] − a[i]. a[0] 만 정하면 나머지는 자동. 유효한 줄이 나올 때까지 슬라이더를 옮겨 봐.")}
      </div>
    </div>
  );
}

const FULL_PY = [
  "N = int(input())",
  "s = input()",
  "",
  "# Count G's at even 1-indexed positions (indices 1,3,5,...)",
  "# We want to maximize G's at even positions",
  "# Strategy: greedily fix prefix reversals",
  "",
  "cows = list(s)",
  "ans = 0",
  "",
  "for i in range(N - 1):",
  "    # If current cow doesn't match desired pattern,",
  "    # find the next different cow and reverse prefix",
  "    if cows[i] == cows[i + 1]:",
  "        continue",
  "    # A transition means we might need a reversal",
  "    ans += 1",
  "",
  "# The answer relates to counting transitions",
  "# between G and H in the string",
  "g_even = sum(1 for i in range(N) if (i+1) % 2 == 0 and cows[i] == 'G')",
  "print(g_even)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N;",
  "    cin >> N;",
  "    vector<int> b(N - 1);",
  "    for (int i = 0; i < N - 1; i++) {",
  "        cin >> b[i];",
  "    }",
  "",
  "    // Try every value for a[0] from 1 to N",
  "    for (int first = 1; first <= N; first++) {",
  "        vector<int> a(N);",
  "        a[0] = first;",
  "        bool ok = true;",
  "        vector<bool> used(N + 1, false);",
  "        used[first] = true;",
  "        for (int i = 0; i + 1 < N && ok; i++) {",
  "            a[i + 1] = b[i] - a[i];",
  "            if (a[i + 1] < 1 || a[i + 1] > N || used[a[i + 1]]) {",
  "                ok = false;",
  "                break;",
  "            }",
  "            used[a[i + 1]] = true;",
  "        }",
  "        if (ok) {",
  "            for (int i = 0; i < N; i++) {",
  "                if (i > 0) cout << \" \";",
  "                cout << a[i];",
  "            }",
  "            cout << \"\\n\";",
  "            return 0;",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

export function getPhotoshootSections(E) {
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
        t(E, "Brute force every possible a[0] from 1 to N — then derive the rest from a[i+1] = b[i] - a[i].",
            "a[0] 값을 1~N 으로 다 시도 — 나머지는 a[i+1] = b[i] - a[i] 로 유도."),
        t(E, "vector<bool> used to ensure each value 1..N appears exactly once.",
            "vector<bool> used 로 1~N 값이 정확히 한 번씩 등장하는지 체크."),
      ],
    },
  ];
}

export function PhotoshootProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#dc2626" />;
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


export function downloadPhotoshootPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Photoshoot — Full Study Guide", "Photoshoot — 종합 풀이 노트");
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

