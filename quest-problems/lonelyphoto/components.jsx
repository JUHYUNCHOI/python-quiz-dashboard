import { useState, useRef } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ═══════════════════════════════════════════════════════════════
   LonelyPhotoSim — for each i: highlight same-type run + opp counts
   ═══════════════════════════════════════════════════════════════ */
const _LP_PRESETS = ["GHGHG", "GHHHG", "HGGGGH", "GHGHGHG"];

export function LonelyPhotoSim({ E }) {
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const s = _LP_PRESETS[pi];
  const N = s.length;
  const cur = Math.min(si, N - 1);

  // for current i: count left/right same-type runs
  let left = 0;
  for (let j = cur - 1; j >= 0 && s[j] === s[cur]; j--) left++;
  let right = 0;
  for (let j = cur + 1; j < N && s[j] === s[cur]; j++) right++;
  const oppLeft = cur - left;
  const oppRight = (N - 1 - cur) - right;
  const contribution = oppLeft * oppRight + Math.max(0, oppLeft - 1) + Math.max(0, oppRight - 1);

  // running total
  let runningTotal = 0;
  for (let i = 0; i <= cur; i++) {
    let l = 0; for (let j = i - 1; j >= 0 && s[j] === s[i]; j--) l++;
    let r = 0; for (let j = i + 1; j < N && s[j] === s[i]; j++) r++;
    const ol = i - l;
    const or_ = (N - 1 - i) - r;
    runningTotal += ol * or_ + Math.max(0, ol - 1) + Math.max(0, or_ - 1);
  }

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
        {_LP_PRESETS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setSi(0); }} style={{
            padding: "4px 10px", borderRadius: 8, border: `2px solid ${i === pi ? A : C.border}`,
            background: i === pi ? A : "transparent", color: i === pi ? "#fff" : C.dim,
            fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace",
          }}>{p}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 8 }}>
        {s.split("").map((ch, idx) => {
          const isCur = idx === cur;
          const inSameRun = (idx >= cur - left && idx <= cur + right);
          const isOppLeft = idx < cur - left;
          const isOppRight = idx > cur + right;
          return (
            <div key={idx} style={{
              width: 32, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, fontSize: 14, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace",
              background: isCur ? "#fef3c7" : (inSameRun ? "#dbeafe" : (isOppLeft ? "#dcfce7" : (isOppRight ? "#fee2e2" : "#fff"))),
              border: `2px solid ${isCur ? "#f59e0b" : (inSameRun ? A : (isOppLeft ? "#16a34a" : (isOppRight ? "#dc2626" : "#e5e7eb")))}`,
              color: C.text,
            }}>{ch}</div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 10, color: C.dim, marginBottom: 12 }}>
        🟡 = i ({cur}) · 🔵 = same run · 🟢 = opp_left ({oppLeft}) · 🔴 = opp_right ({oppRight})
      </div>

      <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 1.7 }}>
        i = {cur}, s[i] = '{s[cur]}'<br/>
        opp_left × opp_right = {oppLeft} × {oppRight} = {oppLeft * oppRight}<br/>
        + max(0, opp_left − 1) = {Math.max(0, oppLeft - 1)}<br/>
        + max(0, opp_right − 1) = {Math.max(0, oppRight - 1)}<br/>
        <b style={{ color: A }}>contribution = {contribution}</b><br/>
        <span style={{ color: C.dim }}>running total = {runningTotal}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
        <button onClick={() => setSi(Math.max(0, cur - 1))} disabled={cur === 0} style={{
          background: cur === 0 ? "#e5e7eb" : "#fff", border: `2px solid ${cur === 0 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800, color: cur === 0 ? "#b0b5c3" : A,
          cursor: cur === 0 ? "default" : "pointer",
        }}>←</button>
        <span style={{ fontSize: 11, color: C.dim, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{cur + 1} / {N}</span>
        <button onClick={() => setSi(Math.min(N - 1, cur + 1))} disabled={cur === N - 1} style={{
          background: cur === N - 1 ? "#e5e7eb" : A, border: `2px solid ${cur === N - 1 ? "#e5e7eb" : A}`,
          borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800,
          color: cur === N - 1 ? "#b0b5c3" : "#fff", cursor: cur === N - 1 ? "default" : "pointer",
        }}>→</button>
      </div>
    </div>
  );
}

export function LonelyPhotoRunner({ E }) {
  const [sIn, setSIn] = useState("GHGHG");
  const [result, setResult] = useState(null);
  const run = () => {
    const s = sIn.trim().toUpperCase();
    if (!s.match(/^[GH]+$/)) {
      setResult({ error: t(E, "Invalid: only G/H characters.", "잘못된 입력: G/H만.") });
      return;
    }
    const N = s.length;
    let total = 0;
    for (let i = 0; i < N; i++) {
      let l = 0; for (let j = i - 1; j >= 0 && s[j] === s[i]; j--) l++;
      let r = 0; for (let j = i + 1; j < N && s[j] === s[i]; j++) r++;
      const ol = i - l, or_ = (N - 1 - i) - r;
      total += ol * or_ + Math.max(0, ol - 1) + Math.max(0, or_ - 1);
    }
    setResult({ done: true, total });
  };
  return (
    <div style={{ padding: 14 }}>
      <input value={sIn} onChange={e => setSIn(e.target.value)} placeholder="G/H string"
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: A, marginBottom: 10, boxSizing: "border-box" }} />
      <button onClick={run} style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 800, marginBottom: 10, background: A, color: "#fff" }}>▶ {t(E, "Compute", "계산")}</button>
      {result?.error && (<div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "10px 12px", color: "#7f1d1d", fontSize: 12, fontWeight: 700 }}>{result.error}</div>)}
      {result?.done && (<div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: "10px 12px", color: "#15803d", fontSize: 16, fontWeight: 900, textAlign: "center" }}>✅ {result.total}</div>)}
    </div>
  );
}

/* Section 1: input */
const LP_INPUT_PY = [
  "N = int(input())",
  "s = input().strip()",
];
const LP_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    string s;",
  "    cin >> s;",
];

/* Section 2: scan run lengths */
const LP_RUN_PY = [
  "ans = 0",
  "for i in range(N):",
  "    # Count same-type cows extending left and right from i",
  "    left = right = 0",
  "    for j in range(i - 1, -1, -1):",
  "        if s[j] == s[i]: left += 1",
  "        else: break",
  "    for j in range(i + 1, N):",
  "        if s[j] == s[i]: right += 1",
  "        else: break",
];
const LP_RUN_CPP = [
  "    long long ans = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        int left = 0, right = 0;",
  "        for (int j = i - 1; j >= 0 && s[j] == s[i]; j--) left++;",
  "        for (int j = i + 1; j <  N && s[j] == s[i]; j++) right++;",
];

/* Section 3: count lonely substrings centred on i */
const LP_COUNT_PY = [
  "    # opp_left = opposite-type cows strictly left of the same-type run",
  "    opp_left  = i - left",
  "    opp_right = (N - 1 - i) - right",
  "",
  "    # Substrings of length >= 3 where i is the only cow of its type:",
  "    ans += opp_left * opp_right                # at least 1 on each side",
  "    ans += max(0, opp_left  - 1)               # 2+ on left, 0 on right",
  "    ans += max(0, opp_right - 1)               # 0 on left, 2+ on right",
  "",
  "print(ans)",
];
const LP_COUNT_CPP = [
  "        long long opp_left  = i - left;",
  "        long long opp_right = (N - 1 - i) - right;",
  "        ans += opp_left * opp_right;",
  "        ans += max(0LL, opp_left  - 1);",
  "        ans += max(0LL, opp_right - 1);",
  "    }",
  "    cout << ans << '\\n';",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const LP_FULL_PY = [
  "N = int(input())",
  "s = input().strip()",
  "",
  "ans = 0",
  "for i in range(N):",
  "    left = right = 0",
  "    for j in range(i - 1, -1, -1):",
  "        if s[j] == s[i]: left += 1",
  "        else: break",
  "    for j in range(i + 1, N):",
  "        if s[j] == s[i]: right += 1",
  "        else: break",
  "    opp_left  = i - left",
  "    opp_right = (N - 1 - i) - right",
  "    ans += opp_left * opp_right",
  "    ans += max(0, opp_left  - 1)",
  "    ans += max(0, opp_right - 1)",
  "",
  "print(ans)",
];
const LP_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N; cin >> N;",
  "    string s; cin >> s;",
  "",
  "    long long ans = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        int left = 0, right = 0;",
  "        for (int j = i - 1; j >= 0 && s[j] == s[i]; j--) left++;",
  "        for (int j = i + 1; j <  N && s[j] == s[i]; j++) right++;",
  "        long long opp_left  = i - left;",
  "        long long opp_right = (N - 1 - i) - right;",
  "        ans += opp_left * opp_right;",
  "        ans += max(0LL, opp_left  - 1);",
  "        ans += max(0LL, opp_right - 1);",
  "    }",
  "    cout << ans << '\\n';",
  "    return 0;",
  "}",
];

export function getLonelyPhotoSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + String", "📦 1. 입력 + 문자열"),
      color: A,
      py: LP_INPUT_PY, cpp: LP_INPUT_CPP,
      why: [
        t(E, "Read N (length) and the string of G/H characters.",
            "N (길이)와 G/H 문자열 읽기."),
      ],
      pyOnly: [
        t(E, "input().strip() removes any trailing newline.",
            "input().strip()으로 줄바꿈 제거."),
      ],
      cppOnly: [
        t(E, "cin >> string reads a whitespace-delimited token cleanly.",
            "cin >> string으로 깔끔하게 읽기."),
      ],
    },
    {
      label: t(E, "📏 2. Same-type Run Around i", "📏 2. i 주변 같은 타입 길이"),
      color: "#0891b2",
      py: LP_RUN_PY, cpp: LP_RUN_CPP,
      why: [
        t(E, "For each cow i, count consecutive same-type cows on its left and right.",
            "각 소 i에 대해, 같은 타입이 좌/우로 연속 몇 칸 있는지."),
        t(E, "If left + right > 0, cow i is NEVER alone in any substring containing one of those neighbors.",
            "left + right > 0이면, 그 이웃을 포함하는 부분문자열에서 i는 절대 외롭지 않음."),
      ],
      pyOnly: [
        t(E, "for j in range(i-1, -1, -1) walks left; break stops at the first different cow.",
            "for j in range(i-1, -1, -1)이 왼쪽 진행; 다른 타입 만나면 break."),
      ],
      cppOnly: [
        t(E, "Combine the bound check with the equality check in the for-loop condition.",
            "범위 체크와 동등성 체크를 for 조건에 함께."),
      ],
    },
    {
      label: t(E, "🧮 3. Count Lonely Substrings", "🧮 3. 외로운 부분문자열 세기"),
      color: "#16a34a",
      py: LP_COUNT_PY, cpp: LP_COUNT_CPP,
      why: [
        t(E, "opp_left = opposite-type cows strictly left of i's same-type run; opp_right symmetric.",
            "opp_left = i의 같은 타입 구간 왼쪽의 반대 타입 수; opp_right 대칭."),
        t(E, "We need length ≥ 3 with exactly one cow of i's type. Three cases: ≥1 on each side, ≥2 on one side only.",
            "길이 ≥ 3, i 타입이 정확히 1마리. 세 경우: 양쪽 ≥1, 한쪽만 ≥2."),
        t(E, "Sum is opp_left·opp_right + max(0, opp_left-1) + max(0, opp_right-1).",
            "합 = opp_left·opp_right + max(0, opp_left-1) + max(0, opp_right-1)."),
      ],
      pyOnly: [
        t(E, "max(0, x - 1) handles the case where there are < 2 cows available.",
            "max(0, x - 1)이 < 2 마리인 경우 처리."),
      ],
      cppOnly: [
        t(E, "Use 0LL to keep max() in long long territory and avoid narrowing.",
            "max()를 long long으로 유지하기 위해 0LL 사용."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: LP_FULL_PY, cpp: LP_FULL_CPP,
      why: [
        t(E, "Worst-case time per i is O(N) (scanning the full run), so overall O(N²) — fine for Bronze.",
            "i당 최악 O(N) (구간 스캔), 전체 O(N²) — Bronze에 충분."),
        t(E, "An O(N) version exists by precomputing run lengths, but isn't needed.",
            "구간 길이를 미리 계산하면 O(N)도 가능하지만 불필요."),
      ],
    },
  ];
}

export function LonelyPhotoProgressiveCode({ E, lang = "py", sections }) {
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
  if (comment) out += `<span style="color:#94a3b8;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}

export function downloadLonelyPhotoPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "📸 Lonely Photo — Full Study Guide", "📸 Lonely Photo — 종합 풀이 노트");
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
<div class="sub">USACO 2021 Dec Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
