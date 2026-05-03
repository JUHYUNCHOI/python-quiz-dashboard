import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#0ea5e9";

/* Section 1: Read input */
const MJ_INPUT_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
];
const MJ_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
];

/* Section 2: collect adjacent-pair values */
const MJ_SCAN_PY = [
  "result = set()",
  "for i in range(N - 1):",
  "    if a[i] == a[i + 1]:",
  "        result.add(a[i])",
];
const MJ_SCAN_CPP = [
  "    set<int> result;",
  "    for (int i = 0; i + 1 < N; i++) {",
  "        if (a[i] == a[i + 1]) result.insert(a[i]);",
  "    }",
];

/* Section 3: print sorted or -1 */
const MJ_OUT_PY = [
  "if not result:",
  "    print(-1)",
  "else:",
  "    for x in sorted(result):",
  "        print(x)",
];
const MJ_OUT_CPP = [
  "    if (result.empty()) cout << -1 << '\\n';",
  "    else for (int x : result) cout << x << '\\n';   // set already sorted",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const MJ_FULL_PY = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "result = set()",
  "for i in range(N - 1):",
  "    if a[i] == a[i + 1]:",
  "        result.add(a[i])",
  "",
  "if not result:",
  "    print(-1)",
  "else:",
  "    for x in sorted(result):",
  "        print(x)",
];
const MJ_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "    int N; cin >> N;",
  "    vector<int> a(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "",
  "    set<int> result;",
  "    for (int i = 0; i + 1 < N; i++) if (a[i] == a[i + 1]) result.insert(a[i]);",
  "",
  "    if (result.empty()) cout << -1 << '\\n';",
  "    else for (int x : result) cout << x << '\\n';",
  "    return 0;",
  "}",
];

export function getMajoritySections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Preferences", "📦 1. 입력 + 선호도"),
      color: A,
      py: MJ_INPUT_PY, cpp: MJ_INPUT_CPP,
      why: [
        t(E, "Read N cows and their N hay-type preferences in a line.",
            "N마리 소와 그들의 건초 선호도 N개를 한 줄로 읽기."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) reads a row of integers.",
            "list(map(int, input().split()))로 정수 한 줄 읽기."),
      ],
      cppOnly: [
        t(E, "vector<int> a(N) sized exactly to N keeps memory tight.",
            "vector<int> a(N)로 메모리 정확하게."),
      ],
    },
    {
      label: t(E, "🔎 2. Scan for Adjacent Duplicates", "🔎 2. 인접 중복 찾기"),
      color: "#0891b2",
      py: MJ_SCAN_PY, cpp: MJ_SCAN_CPP,
      why: [
        t(E, "Key insight: a hay type can take over only if it already sits next to a copy of itself.",
            "핵심: 건초가 전체를 지배하려면 자기 자신 옆에 한 번이라도 있어야 함."),
        t(E, "Walk i from 0 to N-2. If a[i] == a[i+1], remember a[i].",
            "i = 0..N-2 순회. a[i] == a[i+1]이면 a[i] 기억."),
      ],
      pyOnly: [
        t(E, "set() automatically dedupes — no manual check needed.",
            "set()이 자동 중복 제거 — 수동 확인 불필요."),
      ],
      cppOnly: [
        t(E, "set<int> dedupes AND keeps sorted order — perfect for this output format.",
            "set<int>이 중복 제거 + 정렬 유지 — 출력 형식에 딱 맞음."),
      ],
    },
    {
      label: t(E, "🖨️ 3. Print Sorted (or -1)", "🖨️ 3. 정렬 출력 (또는 -1)"),
      color: "#16a34a",
      py: MJ_OUT_PY, cpp: MJ_OUT_CPP,
      why: [
        t(E, "If no adjacent duplicate exists, print -1.",
            "인접 중복이 없으면 -1 출력."),
        t(E, "Otherwise list the candidate hay types in ascending order, one per line.",
            "있으면 후보 건초 종류를 오름차순으로 한 줄에 하나씩."),
      ],
      pyOnly: [
        t(E, "sorted(result) yields the values in order without mutating the set.",
            "sorted(result)로 set 변경 없이 정렬 값 얻기."),
      ],
      cppOnly: [
        t(E, "Range-for over set<int> already iterates in sorted order.",
            "set<int>의 range-for은 이미 정렬 순서로 순회."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: MJ_FULL_PY, cpp: MJ_FULL_CPP,
      why: [
        t(E, "Single O(N) pass — extremely efficient for the constraints.",
            "단일 O(N) 패스 — 제약 조건에 매우 효율적."),
      ],
    },
  ];
}

export function MajorityProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadMajorityPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Majority Opinion — Full Study Guide", "🗳️ Majority Opinion — 종합 풀이 노트");
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
<div class="sub">USACO 2024 Jan Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
