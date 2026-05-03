import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#d97706";

/* Section 1: Read T test cases + heights */
const CP_INPUT_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
];
const CP_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N;",
  "        cin >> N;",
  "        vector<int> h(N);",
  "        for (int i = 0; i < N; i++) cin >> h[i];",
];

/* Section 2: count distinct values that appear >= 2 (pair candidates) */
const CP_COUNT_PY = [
  "    from collections import Counter",
  "    freq = Counter(h)",
  "    pairs = sum(1 for c in freq.values() if c >= 2)",
  "    has_any = len(freq) >= 1",
];
const CP_COUNT_CPP = [
  "        map<int,int> freq;",
  "        for (int x : h) freq[x]++;",
  "        int pairs = 0;",
  "        for (auto& [v, c] : freq) if (c >= 2) pairs++;",
  "        bool has_any = !freq.empty();",
];

/* Section 3: assemble length */
const CP_ANS_PY = [
  "    ans = 2 * pairs + (1 if has_any else 0)",
  "    print(ans)",
];
const CP_ANS_CPP = [
  "        int ans = 2 * pairs + (has_any ? 1 : 0);",
  "        cout << ans << '\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: full code */
const CP_FULL_PY = [
  "from collections import Counter",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
  "    freq = Counter(h)",
  "    pairs = sum(1 for c in freq.values() if c >= 2)",
  "    has_any = len(freq) >= 1",
  "    print(2 * pairs + (1 if has_any else 0))",
];
const CP_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        int N;",
  "        cin >> N;",
  "        vector<int> h(N);",
  "        for (int i = 0; i < N; i++) cin >> h[i];",
  "        map<int,int> freq;",
  "        for (int x : h) freq[x]++;",
  "        int pairs = 0;",
  "        for (auto& [v, c] : freq) if (c >= 2) pairs++;",
  "        cout << (2 * pairs + (freq.empty() ? 0 : 1)) << '\n';",
  "    }",
  "    return 0;",
  "}",
];

export function getCowPhotosSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Heights", "📦 1. 입력 + 키 배열"),
      color: A,
      py: CP_INPUT_PY, cpp: CP_INPUT_CPP,
      why: [
        t(E, "T independent test cases. Each: N then the cow heights.",
            "T개 독립 테스트 케이스. 각: N과 소들의 키."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) reads a row of integers.",
            "list(map(int, input().split()))로 정수 한 줄 읽기."),
      ],
      cppOnly: [
        t(E, "ios::sync_with_stdio(false) speeds up input across many test cases.",
            "ios::sync_with_stdio(false)로 다수 테스트 입력 가속."),
      ],
    },
    {
      label: t(E, "🔢 2. Count Pair Candidates", "🔢 2. 페어 후보 세기"),
      color: "#0891b2",
      py: CP_COUNT_PY, cpp: CP_COUNT_CPP,
      why: [
        t(E, "Bitonic + palindrome + no adjacent equals ⇒ each ring uses a distinct value.",
            "바이토닉 + 팰린드롬 + 인접 다름 ⇒ 각 링은 서로 다른 값."),
        t(E, "A value can become a 'ring' only if it appears ≥ 2 times.",
            "값이 ≥ 2번 등장해야 '링'이 될 수 있음."),
      ],
      pyOnly: [
        t(E, "Counter(h) builds the frequency map; values() gives raw counts.",
            "Counter(h)로 빈도 맵; values()로 빈도만 추출."),
      ],
      cppOnly: [
        t(E, "map<int,int> keeps it simple — order doesn't matter for the count.",
            "map<int,int>으로 간단하게 — 순서 무관."),
      ],
    },
    {
      label: t(E, "🏔️ 3. Assemble Length", "🏔️ 3. 길이 계산"),
      color: "#16a34a",
      py: CP_ANS_PY, cpp: CP_ANS_CPP,
      why: [
        t(E, "Each ring contributes 2 cows; peak adds 1 (if any cow exists).",
            "각 링이 2마리 기여; 피크가 +1 (소가 1마리라도 있으면)."),
        t(E, "Final length = 2 × pairs + 1 — odd-length palindrome with single peak.",
            "최종 길이 = 2 × pairs + 1 — 단일 피크 홀수 길이 팰린드롬."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: CP_FULL_PY, cpp: CP_FULL_CPP,
      why: [
        t(E, "Read each test case → frequency map → count pairs → print 2·pairs + peak.",
            "각 테스트 읽기 → 빈도 맵 → 페어 카운트 → 2·pairs + 피크 출력."),
        t(E, "All work is O(N) per test case — well within Bronze limits.",
            "테스트당 모두 O(N) — Bronze 제한에 충분."),
      ],
    },
  ];
}

export function CowPhotosProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadCowPhotosPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "More Cow Photos — Full Study Guide", "📸 More Cow Photos — 종합 풀이 노트");
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
