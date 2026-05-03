import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#dc2626";

const CK_INPUT_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "a = list(map(int, input().split()))   # FJ's breeds",
  "b = list(map(int, input().split()))   # Bessie's breeds",
];
const CK_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N; cin >> N;",
  "    vector<int> a(N), b(N);",
  "    for (int i = 0; i < N; i++) cin >> a[i];",
  "    for (int i = 0; i < N; i++) cin >> b[i];",
];

const CK_CURRENT_PY = [
  "# Part 1: Current matches at same positions",
  "match = 0",
  "for i in range(N):",
  "    if a[i] == b[i]:",
  "        match += 1",
];
const CK_CURRENT_CPP = [
  "    // Part 1: Current matches at same positions",
  "    int match = 0;",
  "    for (int i = 0; i < N; i++)",
  "        if (a[i] == b[i]) match++;",
];

const CK_MAX_PY = [
  "# Part 2: Max possible matches by rearranging b",
  "from collections import Counter",
  "ca = Counter(a)",
  "cb = Counter(b)",
  "",
  "# For each breed: pair as many as we have on BOTH sides = min(ca[x], cb[x])",
  "max_match = sum(min(ca[x], cb.get(x, 0)) for x in ca)",
];
const CK_MAX_CPP = [
  "    // Part 2: Max possible matches by rearranging b",
  "    map<int, int> ca, cb;",
  "    for (int x : a) ca[x]++;",
  "    for (int x : b) cb[x]++;",
  "",
  "    // For each breed: min(ca[x], cb[x]) — bottleneck count",
  "    int max_match = 0;",
  "    for (auto& [x, count] : ca)",
  "        max_match += min(count, cb[x]);",
];

const CK_OUTPUT_PY = [
  "print(match)",
  "print(max_match)",
];
const CK_OUTPUT_CPP = [
  "    cout << match << \"\\n\" << max_match << \"\\n\";",
  "    return 0;",
  "}",
];

const CK_FULL_PY = [...CK_INPUT_PY, "", ...CK_CURRENT_PY, "", ...CK_MAX_PY, "", ...CK_OUTPUT_PY];
const CK_FULL_CPP = [...CK_INPUT_CPP, "", ...CK_CURRENT_CPP, "", ...CK_MAX_CPP, "", ...CK_OUTPUT_CPP];

export function getCheckupsSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: CK_INPUT_PY, cpp: CK_INPUT_CPP,
      why: [
        t(E, "Read N, then two arrays a[] (FJ's order) and b[] (Bessie's).", "N 읽고, 두 배열 a[] (FJ 순서), b[] (Bessie 순서) 읽기."),
        t(E, "Both arrays have length N — N cows in line, each with a breed type.", "두 배열 모두 길이 N — N 마리 소, 각각 품종 타입."),
      ],
      pyOnly: [
        t(E, "list(map(int, ...)) for parsing space-separated ints quickly.", "list(map(int, ...)) 으로 공백 구분 int 빠르게 파싱."),
      ],
      cppOnly: [
        t(E, "vector<int>(N) sized at construction; then fill with cin loop.", "vector<int>(N) 으로 크기 지정 후 cin 루프로 채움."),
      ],
    },
    {
      label: t(E, "🎯 2. Current Matches (same position)", "🎯 2. 현재 일치 (같은 위치)"),
      color: "#16a34a",
      py: CK_CURRENT_PY, cpp: CK_CURRENT_CPP,
      why: [
        t(E, "Walk through both arrays in parallel. Count where a[i] == b[i].", "두 배열을 동시에 순회. a[i] == b[i] 인 곳 카운트."),
        t(E, "Simple O(N) scan. This is the FIRST part of the answer.", "단순 O(N) 스캔. 답의 FIRST 부분."),
      ],
    },
    {
      label: t(E, "📊 3. Max Possible Matches (rearrange b)", "📊 3. 최대 가능 일치 (b 재배열)"),
      color: "#0891b2",
      py: CK_MAX_PY, cpp: CK_MAX_CPP,
      why: [
        t(E, "💡 Key insight: if a has 5 of breed X and b has 3 of breed X, we can match at most 3 — the smaller count is the bottleneck.",
            "💡 핵심: a 에 품종 X 가 5 개, b 에 X 가 3 개면, 최대 3 개만 매칭 — 적은 쪽이 한계."),
        t(E, "Sum min(ca[x], cb[x]) over all breeds → the maximum achievable matches.", "모든 품종에 대해 min(ca[x], cb[x]) 합 → 달성 가능 최대 일치."),
        t(E, "This works because we can always REARRANGE b to put matching breeds at correct positions.", "b 를 재배열하면 일치하는 품종을 올바른 위치에 둘 수 있어서 항상 작동."),
      ],
      pyOnly: [
        t(E, "Counter(arr) builds a frequency dict in one line.", "Counter(arr) 로 빈도 dict 한 줄에 생성."),
        t(E, "cb.get(x, 0) — safe lookup; returns 0 if breed x not in b.", "cb.get(x, 0) — 안전 조회; b 에 x 없으면 0 반환."),
        t(E, "Generator expression in sum() — concise + memory efficient.", "sum() 안 generator — 간결 + 메모리 효율적."),
      ],
      cppOnly: [
        t(E, "map<int, int> auto-initializes to 0 on first access via [].", "map<int, int> 은 [] 첫 접근 시 자동 0 초기화."),
        t(E, "Range-for with structured bindings: auto& [key, value] : map.", "Range-for + structured bindings: auto& [key, value] : map."),
      ],
    },
    {
      label: t(E, "📤 4. Output + Full Code", "📤 4. 출력 + 전체 코드"),
      color: A,
      py: CK_FULL_PY, cpp: CK_FULL_CPP,
      why: [
        t(E, "Output: current matches first, then max possible matches. Two lines.", "출력: 현재 일치 먼저, 그 다음 최대 가능 일치. 두 줄."),
        t(E, "Time: O(N) for both parts. Very fast.", "시간: 양쪽 모두 O(N). 매우 빠름."),
        t(E, "Space: O(N) for the Counter / map of breeds.", "공간: 품종의 Counter / map 으로 O(N)."),
      ],
    },
  ];
}

export function CheckupsProgressiveCode({ E, lang = "py", sections }) {
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

const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sum","Counter"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","map","pair"];
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

export function downloadCheckupsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Cow Checkups — Full Study Guide", "🐮 Cow Checkups — 종합 풀이 노트");
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
  .box { background: #fee2e2; border: 1.5px solid #fca5a5; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2025 Feb Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E, "Two arrays of breed types: a[] (FJ's order) and b[] (Bessie's). Output (1) current matches at same positions, then (2) max possible matches if we can rearrange b.",
        "두 품종 배열: a[] (FJ 순서), b[] (Bessie 순서). 출력 (1) 같은 위치 현재 일치 수, 그 다음 (2) b 재배열 시 최대 가능 일치 수.")}</p>
<h2>2. ${t(E, "Insight: Frequency Min", "통찰: 빈도 min")}</h2>
<div class="box">
  <b>💡 ${t(E, "Why min(ca[x], cb[x])?", "왜 min(ca[x], cb[x])?")}</b>
  ${t(E, "If a has 5 of breed X but b has only 3, we can pair at most 3 — bottleneck = min. Sum over all breeds = max matches.",
        "a 에 X 가 5 개인데 b 에 3 개뿐이면 최대 3 개만 매칭 — 한계 = min. 모든 품종 합 = 최대 일치.")}
</div>
<h2>3. ${t(E, "Code (4 sections)", "코드 (4 섹션)")}</h2>
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
