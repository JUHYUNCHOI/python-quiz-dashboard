import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#7c5cfc";

/* Section 1: Input — string + queries */
const M3_INPUT_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
];
const M3_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, Q;",
  "    cin >> N >> Q;",
  "    string s;",
  "    cin >> s;",
];

/* Section 2: For each query, scan middle j */
const M3_LOOP_PY = [
  "for _ in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1   # convert to 0-based",
  "    best = -1",
  "",
  "    for j in range(l + 1, r):",
  "        # find farthest left i in [l, j) with s[i] != s[j]",
  "        i = next((ii for ii in range(l, j) if s[ii] != s[j]), -1)",
  "        # find farthest right k in (j, r] with s[k] == s[j]",
  "        k = next((kk for kk in range(r, j, -1) if s[kk] == s[j]), -1)",
];
const M3_LOOP_CPP = [
  "    while (Q--) {",
  "        int l, r;",
  "        cin >> l >> r;",
  "        l--; r--;",
  "        long long best = -1;",
  "",
  "        for (int j = l + 1; j < r; j++) {",
  "            int i = -1;",
  "            for (int ii = l; ii < j; ii++) if (s[ii] != s[j]) { i = ii; break; }",
  "            int k = -1;",
  "            for (int kk = r; kk > j; kk--) if (s[kk] == s[j]) { k = kk; break; }",
];

/* Section 3: update best with (j-i)*(k-j) */
const M3_UPDATE_PY = [
  "        if i != -1 and k != -1:",
  "            best = max(best, (j - i) * (k - j))",
  "    print(best)",
];
const M3_UPDATE_CPP = [
  "            if (i != -1 && k != -1) {",
  "                long long val = (long long)(j - i) * (k - j);",
  "                if (val > best) best = val;",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const M3_FULL_PY = [
  "N, Q = map(int, input().split())",
  "s = input().strip()",
  "",
  "for _ in range(Q):",
  "    l, r = map(int, input().split())",
  "    l -= 1; r -= 1",
  "    best = -1",
  "    for j in range(l + 1, r):",
  "        i = next((ii for ii in range(l, j) if s[ii] != s[j]), -1)",
  "        k = next((kk for kk in range(r, j, -1) if s[kk] == s[j]), -1)",
  "        if i != -1 and k != -1:",
  "            best = max(best, (j - i) * (k - j))",
  "    print(best)",
];
const M3_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N, Q; cin >> N >> Q;",
  "    string s; cin >> s;",
  "",
  "    while (Q--) {",
  "        int l, r; cin >> l >> r; l--; r--;",
  "        long long best = -1;",
  "        for (int j = l + 1; j < r; j++) {",
  "            int i = -1;",
  "            for (int ii = l; ii < j; ii++) if (s[ii] != s[j]) { i = ii; break; }",
  "            int k = -1;",
  "            for (int kk = r; kk > j; kk--) if (s[kk] == s[j]) { k = kk; break; }",
  "            if (i != -1 && k != -1) {",
  "                long long val = (long long)(j - i) * (k - j);",
  "                if (val > best) best = val;",
  "            }",
  "        }",
  "        cout << best << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getMooin3Sections(E) {
  return [
    {
      label: t(E, "📦 1. Input + String", "📦 1. 입력 + 문자열"),
      color: A,
      py: M3_INPUT_PY, cpp: M3_INPUT_CPP,
      why: [
        t(E, "Read N, Q, then the whole string s.",
            "N, Q와 문자열 s 읽기."),
        t(E, "Queries follow — each gives a 1-based [l, r] range.",
            "쿼리들이 따라옴 — 1-based [l, r] 범위."),
      ],
      pyOnly: [
        t(E, "input().strip() removes any trailing newline.",
            "input().strip()으로 줄바꿈 제거."),
      ],
      cppOnly: [
        t(E, "cin >> string reads a whitespace-delimited token cleanly.",
            "cin >> string으로 공백 구분 토큰 깔끔하게 읽기."),
      ],
    },
    {
      label: t(E, "🔍 2. Fix the Middle j", "🔍 2. 중간 j 고정"),
      color: "#0891b2",
      py: M3_LOOP_PY, cpp: M3_LOOP_CPP,
      why: [
        t(E, "For each candidate middle j in [l+1, r-1], we want the BEST i to its left and BEST k to its right.",
            "각 후보 중간 j ∈ [l+1, r-1]에 대해, 왼쪽 최선 i와 오른쪽 최선 k를 찾기."),
        t(E, "Best i = farthest from j (smallest index) with s[i] != s[j] → maximizes (j - i).",
            "최선 i = j에서 가장 먼 (가장 작은 인덱스) s[i] != s[j] → (j - i) 최대화."),
        t(E, "Best k = farthest from j (largest index) with s[k] == s[j] → maximizes (k - j).",
            "최선 k = j에서 가장 먼 (가장 큰 인덱스) s[k] == s[j] → (k - j) 최대화."),
      ],
      pyOnly: [
        t(E, "next((expr for ... if cond), -1) finds the first match or -1 — concise.",
            "next((expr for ... if cond), -1)이 첫 매칭 또는 -1 — 간결."),
      ],
      cppOnly: [
        t(E, "Inner loop with break is the most direct way; std::find_if also works.",
            "break를 쓴 내부 루프가 가장 직관적; std::find_if도 가능."),
      ],
    },
    {
      label: t(E, "🏆 3. Update Best Product", "🏆 3. 최댓값 갱신"),
      color: "#16a34a",
      py: M3_UPDATE_PY, cpp: M3_UPDATE_CPP,
      why: [
        t(E, "If both i and k exist, compute (j - i) * (k - j) and keep the maximum.",
            "i와 k가 모두 존재하면 (j - i) * (k - j) 계산해 최댓값 갱신."),
        t(E, "If no valid triplet exists in the range, best stays -1 — print as is.",
            "범위에 유효 트리플이 없으면 best는 -1 그대로 — 그대로 출력."),
      ],
      cppOnly: [
        t(E, "Cast one operand to long long to avoid overflow on the product.",
            "곱셈 오버플로 방지를 위해 한쪽을 long long으로 캐스팅."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: M3_FULL_PY, cpp: M3_FULL_CPP,
      why: [
        t(E, "Per query: O(N²) — fine for Bronze constraints.",
            "쿼리당: O(N²) — Bronze 제약에 충분."),
        t(E, "Total: O(N² · Q). Faster solutions exist with prefix structures, but brute force passes here.",
            "총: O(N² · Q). 접두 구조로 더 빠르게도 가능하지만 완전탐색으로 통과."),
      ],
    },
  ];
}

export function Mooin3ProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadMooin3PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mooin' Time III — Full Study Guide", "🐄 Mooin' Time III — 종합 풀이 노트");
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
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
