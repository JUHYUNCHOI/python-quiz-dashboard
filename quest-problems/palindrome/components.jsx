import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#9333ea";

/* Section 1: helpers — is_palindrome + list of palindromes */
const PA_HELPER_PY = [
  "def is_palindrome(n):",
  "    s = str(n)",
  "    return s == s[::-1]",
  "",
  "S = int(input())",
  "palis = [p for p in range(1, S + 1) if is_palindrome(p)]",
];
const PA_HELPER_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "bool is_palindrome(int n) {",
  "    string s = to_string(n);",
  "    string r = s;",
  "    reverse(r.begin(), r.end());",
  "    return s == r;",
  "}",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int S;",
  "    cin >> S;",
  "",
  "    vector<int> palis;",
  "    for (int p = 1; p <= S; p++) if (is_palindrome(p)) palis.push_back(p);",
];

/* Section 2: DP — can_win[n] */
const PA_DP_PY = [
  "# can_win[n] = True if the player to move with n stones wins",
  "can_win = [False] * (S + 1)",
  "for n in range(1, S + 1):",
  "    for p in palis:",
  "        if p > n: break",
  "        if not can_win[n - p]:   # leave opponent in losing state",
  "            can_win[n] = True",
  "            break",
];
const PA_DP_CPP = [
  "    vector<bool> can_win(S + 1, false);",
  "    for (int n = 1; n <= S; n++) {",
  "        for (int p : palis) {",
  "            if (p > n) break;",
  "            if (!can_win[n - p]) { can_win[n] = true; break; }",
  "        }",
  "    }",
];

/* Section 3: print winner */
const PA_OUT_PY = [
  "print('B' if can_win[S] else 'E')",
];
const PA_OUT_CPP = [
  "    cout << (can_win[S] ? 'B' : 'E') << '\\n';",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const PA_FULL_PY = [
  "def is_palindrome(n):",
  "    s = str(n)",
  "    return s == s[::-1]",
  "",
  "S = int(input())",
  "palis = [p for p in range(1, S + 1) if is_palindrome(p)]",
  "",
  "can_win = [False] * (S + 1)",
  "for n in range(1, S + 1):",
  "    for p in palis:",
  "        if p > n: break",
  "        if not can_win[n - p]:",
  "            can_win[n] = True",
  "            break",
  "",
  "print('B' if can_win[S] else 'E')",
];
const PA_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "bool is_palindrome(int n) {",
  "    string s = to_string(n);",
  "    string r = s; reverse(r.begin(), r.end());",
  "    return s == r;",
  "}",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int S; cin >> S;",
  "",
  "    vector<int> palis;",
  "    for (int p = 1; p <= S; p++) if (is_palindrome(p)) palis.push_back(p);",
  "",
  "    vector<bool> can_win(S + 1, false);",
  "    for (int n = 1; n <= S; n++) {",
  "        for (int p : palis) {",
  "            if (p > n) break;",
  "            if (!can_win[n - p]) { can_win[n] = true; break; }",
  "        }",
  "    }",
  "",
  "    cout << (can_win[S] ? 'B' : 'E') << '\\n';",
  "    return 0;",
  "}",
];

export function getPalindromeSections(E) {
  return [
    {
      label: t(E, "📦 1. Helper + Palindromes List", "📦 1. 헬퍼 + 회문 리스트"),
      color: A,
      py: PA_HELPER_PY, cpp: PA_HELPER_CPP,
      why: [
        t(E, "is_palindrome(n) checks if n reads the same backwards.",
            "is_palindrome(n)이 n이 거꾸로 읽어도 같은지 확인."),
        t(E, "Pre-compute every palindrome from 1 to S — these are the legal move sizes.",
            "1부터 S까지 모든 회문을 미리 계산 — 합법적인 이동 크기."),
      ],
      pyOnly: [
        t(E, "s[::-1] reverses a string in one expression.",
            "s[::-1]로 문자열을 한 줄에 뒤집기."),
      ],
      cppOnly: [
        t(E, "to_string + reverse(begin, end) is the standard idiom.",
            "to_string + reverse(begin, end)이 표준 관용구."),
      ],
    },
    {
      label: t(E, "🧠 2. Game-Theory DP", "🧠 2. 게임 이론 DP"),
      color: "#0891b2",
      py: PA_DP_PY, cpp: PA_DP_CPP,
      why: [
        t(E, "can_win[n] = true if the player to move with n stones can force a win.",
            "can_win[n] = n개 돌에서 시작한 플레이어가 이길 수 있는지."),
        t(E, "Player wins iff there exists a palindrome p ≤ n with can_win[n - p] == false (opponent loses next).",
            "p ≤ n인 회문 중 can_win[n - p] == false (상대 패배)인 것이 있으면 승리."),
        t(E, "Bottom-up fill from n = 1 to S — each state depends only on smaller ones.",
            "n = 1부터 S까지 bottom-up — 각 상태는 더 작은 것에만 의존."),
      ],
      pyOnly: [
        t(E, "break out of the inner loop as soon as any winning move is found.",
            "이기는 수를 찾자마자 내부 루프 break."),
      ],
      cppOnly: [
        t(E, "vector<bool> is compact (1 bit per element) and fast enough here.",
            "vector<bool>은 비트 단위로 압축, 충분히 빠름."),
      ],
    },
    {
      label: t(E, "🏆 3. Print Winner", "🏆 3. 승자 출력"),
      color: "#16a34a",
      py: PA_OUT_PY, cpp: PA_OUT_CPP,
      why: [
        t(E, "Bessie moves first — she wins iff can_win[S] is true.",
            "베시가 선공 — can_win[S]가 true면 베시 승리."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: PA_FULL_PY, cpp: PA_FULL_CPP,
      why: [
        t(E, "Total work: O(S · |palindromes|) — well within limits since palindromes are sparse.",
            "총 작업: O(S · |palindromes|) — 회문이 드문 분포라 충분히 빠름."),
      ],
    },
  ];
}

export function PalindromeProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadPalindromePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Palindrome Game — Full Study Guide", "🎲 Palindrome Game — 종합 풀이 노트");
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
<div class="sub">USACO 2024 Feb Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
