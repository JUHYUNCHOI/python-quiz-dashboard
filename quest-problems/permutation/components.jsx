import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#7c5cfc";

/* ═══════════════════════════════════════════════════════════════
   getPermSections — 단계별 코드 + Python/C++ + reasoning
   ═══════════════════════════════════════════════════════════════ */

const PERM_INPUT_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    N = int(input())",
  "    h = list(map(int, input().split()))",
];
const PERM_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int T; cin >> T;",
  "    while (T--) {",
  "        int N; cin >> N;",
  "        vector<int> h(N - 1);",
  "        for (int i = 0; i < N - 1; i++) cin >> h[i];",
];

const PERM_TRY_PY = [
  "    found = False",
  "    perm = [0] * N",
  "",
  "    # 시작값 1, 2, ..., N 차례로 시도",
  "    for start in range(1, N + 1):",
  "        perm[0] = start",
  "        used = [False] * (N + 1)",
  "        used[start] = True",
  "        valid = True",
  "",
  "        # 매 단계: + 또는 - 중 가능한 거 선택",
  "        for i in range(N - 1):",
  "            plus = perm[i] + h[i]",
  "            minus = perm[i] - h[i]",
  "            if 1 <= plus <= N and not used[plus]:",
  "                perm[i+1] = plus",
  "                used[plus] = True",
  "            elif 1 <= minus <= N and not used[minus]:",
  "                perm[i+1] = minus",
  "                used[minus] = True",
  "            else:",
  "                valid = False",
  "                break",
  "",
  "        if valid:",
  "            found = True",
  "            break",
];
const PERM_TRY_CPP = [
  "        bool found = false;",
  "        vector<int> perm(N);",
  "",
  "        // 시작값 1, 2, ..., N 차례로 시도",
  "        for (int start = 1; start <= N && !found; start++) {",
  "            perm[0] = start;",
  "            vector<bool> used(N + 1, false);",
  "            used[start] = true;",
  "            bool valid = true;",
  "",
  "            // 매 단계: + 또는 - 중 가능한 거 선택",
  "            for (int i = 0; i < N - 1; i++) {",
  "                int plus = perm[i] + h[i];",
  "                int minus = perm[i] - h[i];",
  "                if (plus >= 1 && plus <= N && !used[plus]) {",
  "                    perm[i+1] = plus;",
  "                    used[plus] = true;",
  "                } else if (minus >= 1 && minus <= N && !used[minus]) {",
  "                    perm[i+1] = minus;",
  "                    used[minus] = true;",
  "                } else {",
  "                    valid = false;",
  "                    break;",
  "                }",
  "            }",
  "",
  "            if (valid) found = true;",
  "        }",
];

const PERM_OUTPUT_PY = [
  "    if found:",
  "        print(' '.join(map(str, perm)))",
  "    else:",
  "        print(-1)",
];
const PERM_OUTPUT_CPP = [
  "        if (found) {",
  "            for (int i = 0; i < N; i++) cout << perm[i] << \" \\n\"[i == N-1];",
  "        } else {",
  "            cout << -1 << \"\\n\";",
  "        }",
  "    }",
  "    return 0;",
  "}",
];

const PERM_FULL_PY = [...PERM_INPUT_PY, "", ...PERM_TRY_PY, "", ...PERM_OUTPUT_PY];
const PERM_FULL_CPP = [...PERM_INPUT_CPP, "", ...PERM_TRY_CPP, "", ...PERM_OUTPUT_CPP];

export function getPermSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: PERM_INPUT_PY, cpp: PERM_INPUT_CPP,
      why: [
        t(E, "T test cases. Each: N, then N-1 hints h[0]..h[N-2].", "T 테스트케이스. 각: N, 그 다음 N-1 개 힌트 h[0]..h[N-2]."),
        t(E, "h[i] = |perm[i] - perm[i+1]| — absolute difference.", "h[i] = |perm[i] - perm[i+1]| — 절댓값 차이."),
      ],
      pyOnly: [
        t(E, "list(map(int, ...)) for parsing space-separated ints.", "list(map(int, ...)) 으로 공백 구분 정수 파싱."),
        t(E, "sys.stdin.readline for fast input.", "sys.stdin.readline 으로 빠른 입력."),
      ],
      cppOnly: [
        t(E, "vector<int> h(N-1) — exactly N-1 hints.", "vector<int> h(N-1) — 정확히 N-1 개 힌트."),
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) for fast I/O.", "ios::sync_with_stdio(false) + cin.tie(nullptr) 로 Fast I/O."),
      ],
    },
    {
      label: t(E, "🔍 2. Try Each Start (Greedy)", "🔍 2. 시작값 차례로 시도 (탐욕)"),
      color: "#16a34a",
      py: PERM_TRY_PY, cpp: PERM_TRY_CPP,
      why: [
        t(E, "Try each start = 1, 2, ..., N. For each: greedily build permutation.", "시작값 = 1, 2, ..., N 시도. 각각 탐욕적으로 순열 구성."),
        t(E, "At each step: perm[i+1] is perm[i]+h[i] OR perm[i]-h[i]. Try + first, fall back to -.", "각 단계: perm[i+1] = perm[i]+h[i] 또는 perm[i]-h[i]. + 먼저 시도, 안 되면 -."),
        t(E, "Validity: 1 ≤ value ≤ N AND not already used.", "유효성: 1 ≤ 값 ≤ N AND 미사용."),
        t(E, "Greedy works because at each step, AT MOST ONE valid choice exists (proof: the other choice would conflict with an earlier value).", "탐욕이 성립: 각 단계에서 유효한 선택은 최대 1 개 (증명: 다른 선택은 이전 값과 충돌)."),
        t(E, "If both fail at some step → this start doesn't work. Move to next start.", "두 옵션 다 실패 → 이 시작값 안 됨. 다음 시작값으로."),
      ],
      pyOnly: [
        t(E, "used = [False] * (N + 1) — index 0 unused, indexes 1..N for tracking.", "used = [False] * (N + 1) — 인덱스 0 미사용, 1..N 추적."),
      ],
      cppOnly: [
        t(E, "vector<bool>(N+1, false) — same idea, packed bools save memory.", "vector<bool>(N+1, false) — 같은 아이디어, packed bool 로 메모리 절약."),
      ],
    },
    {
      label: t(E, "📤 3. Output", "📤 3. 출력"),
      color: A,
      py: PERM_OUTPUT_PY, cpp: PERM_OUTPUT_CPP,
      why: [
        t(E, "If a valid permutation found → print space-separated.", "유효한 순열 찾음 → 공백 구분 출력."),
        t(E, "Otherwise (all N starts failed) → print -1.", "아니면 (N 개 시작 다 실패) → -1 출력."),
      ],
      pyOnly: [
        t(E, "' '.join(map(str, perm)) — convert ints to strings, join with space.", "' '.join(map(str, perm)) — int 를 str 로 변환 후 공백 join."),
      ],
      cppOnly: [
        t(E, "Trick: \" \\n\"[i == N-1] gives space normally, newline at end.", "트릭: \" \\n\"[i == N-1] 으로 일반은 공백, 마지막은 줄바꿈."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: A,
      py: PERM_FULL_PY, cpp: PERM_FULL_CPP,
      why: [
        t(E, "Time: O(N²) per test case (N starts × N steps each).", "시간: 테스트 케이스당 O(N²) (N 시작 × N 단계)."),
        t(E, "For N=1000: 10⁶ ops per test case. Plenty fast.", "N=1000: 테스트 케이스당 10⁶ 연산. 충분히 빠름."),
        t(E, "Edge case: h[i] = 0 → permutation needs perm[i] = perm[i+1] but values must be distinct → IMPOSSIBLE → -1.", "엣지: h[i] = 0 → perm[i] = perm[i+1] 필요한데 순열 값은 다 달라야 → 불가능 → -1."),
      ],
    },
  ];
}


/* ProgressiveCode — vertical stack pattern */
export function PermProgressiveCode({ E, lang = "py", sections }) {
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
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>
                💡 {t(E, "Why this way?", "왜 이렇게?")}
              </div>
              {s.why.map((line, j) => (
                <div key={`w${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                  <span style={{ color: s.color, fontWeight: 800, flexShrink: 0 }}>•</span>
                  <span>{line}</span>
                </div>
              ))}
              {langSpecific.length > 0 && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
                  <div style={{ fontSize: 10, color: C.dim, fontWeight: 800, marginBottom: 4, letterSpacing: 0.5 }}>
                    {langLabel} {t(E, "specific:", "전용:")}
                  </div>
                  {langSpecific.map((line, j) => (
                    <div key={`l${j}`} style={{ fontSize: 12.5, color: C.text, lineHeight: 1.65, marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: lang === "py" ? "#16a34a" : "#0891b2", fontWeight: 800, flexShrink: 0 }}>▸</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              <CodeBlock lines={code} />
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* PDF — comprehensive study guide */
const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","join"];
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

export function downloadPermPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "FJ's Fav Permutation — Full Study Guide", "🔢 FJ의 좋아하는 순열 — 종합 풀이 노트");
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
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 12px; page-break-inside: avoid; }
  th, td { border: 1px solid #e5e7eb; padding: 5px 8px; text-align: left; }
  th { background: #ede9fe; color: #5b21b6; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  .box { background: #ede9fe; border: 1.5px solid #c4b5fd; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  .box.ok { background: #ecfdf5; border-color: #6ee7b7; }
  .box.no { background: #fef2f2; border-color: #fca5a5; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>

<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF' as the destination.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>

<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO 2024 Open Bronze · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>

<h2>1. ${t(E, "Problem", "문제")}</h2>
<p>${t(E,
  "Given an array of N-1 hints h[0]..h[N-2], where h[i] = |perm[i] - perm[i+1]|, reconstruct a permutation of 1..N matching the hints. If impossible, output -1.",
  "N-1 개의 힌트 h[0]..h[N-2] 가 주어짐. h[i] = |perm[i] - perm[i+1]|. 힌트와 일치하는 1..N 순열 복원. 불가능하면 -1 출력.")}</p>

<h3>${t(E, "Constraints", "제약")}</h3>
<p>1 ≤ T ≤ 10, 2 ≤ N ≤ 1000, 0 ≤ h[i] ≤ N-1.</p>

<h3>${t(E, "Sample I/O", "예제")}</h3>
<table>
  <tr><th>${t(E, "Input", "입력")}</th><th>${t(E, "Output", "출력")}</th></tr>
  <tr><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">3
4
2 3 2
3
1 1
3
0 1</pre></td><td><pre style="margin:0;background:#0f172a;color:#f8fafc;font-size:11px;">3 1 4 2
1 2 3
-1</pre></td></tr>
</table>

<h2>2. ${t(E, "First Idea: Greedy", "첫 아이디어: 탐욕")}</h2>
<div class="box ok">
  <b>💡 ${t(E, "Key insight", "핵심 통찰")}</b>:
  ${t(E, "If we know perm[0], the rest is forced — at each step, ONE of (perm[i]+h[i], perm[i]-h[i]) will be valid (in range 1..N AND not yet used).",
        "perm[0] 만 정하면 나머지는 강제 — 각 단계에서 (perm[i]+h[i], perm[i]-h[i]) 중 하나만 유효 (1..N 범위 + 미사용).")}
</div>
<p>${t(E,
  "So: try start = 1, 2, ..., N. For each, greedily build. If one works, output it.",
  "그래서: 시작값 1~N 차례로 시도. 각각 탐욕적으로 구성. 하나 성공하면 출력.")}</p>

<div class="box">
  <b>${t(E, "Time complexity", "시간복잡도")}:</b>
  ${t(E, "O(N²) per test case (N starts × N steps). For N=1000, T=10: 10⁷ ops total. Fast.",
        "테스트 케이스당 O(N²) (N 시작 × N 단계). N=1000, T=10: 10⁷ 연산. 빠름.")}
</div>

<h3>${t(E, "Edge case: h[i] = 0", "엣지: h[i] = 0")}</h3>
<p>${t(E, "h[i] = 0 means |perm[i] - perm[i+1]| = 0, so perm[i] = perm[i+1]. But permutation values are distinct. → IMPOSSIBLE → -1.",
        "h[i] = 0 이면 |perm[i] - perm[i+1]| = 0, 즉 perm[i] = perm[i+1]. 그러나 순열은 모든 값이 다름. → 불가능 → -1.")}</p>

<h2>3. ${t(E, "Solution Code (3 sections + full)", "최적 코드 (3 섹션 + 전체)")}</h2>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why">
    <b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b>
    <ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul>
  </div>
  ${sectionCode(s)}
`).join("")}

<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">
  © Coderin · 코드린 · ${t(E, "Generated for offline study", "오프라인 학습용")}
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}
