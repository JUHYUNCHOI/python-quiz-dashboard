import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#059669";

/* Section 1: Input + chart */
const HP_INPUT_PY = [
  "N, M = map(int, input().split())",
  "# beats[i][j] = '1' if symbol i beats symbol j, else '0'",
  "beats = [input().strip() for _ in range(N)]",
];
const HP_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, M;",
  "    cin >> N >> M;",
  "    vector<string> beats(N);",
  "    for (int i = 0; i < N; i++) cin >> beats[i];",
];

/* Section 2: helper — does pair (a,b) beat opponent x? */
const HP_HELPER_PY = [
  "def pair_beats(a, b, x):",
  "    # Bessie can pick whichever of a or b beats x",
  "    return beats[a][x] == '1' or beats[b][x] == '1'",
];
const HP_HELPER_CPP = [
  "    auto pair_beats = [&](int a, int b, int x) {",
  "        return beats[a][x] == '1' || beats[b][x] == '1';",
  "    };",
];

/* Section 3: per-query brute force */
const HP_LOOP_PY = [
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1; s2 -= 1   # convert to 0-based",
  "",
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  "            if pair_beats(a, b, s1) and pair_beats(a, b, s2):",
  "                count += 1",
  "    print(count)",
];
const HP_LOOP_CPP = [
  "    while (M--) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--; s2--;",
  "",
  "        long long count = 0;",
  "        for (int a = 0; a < N; a++)",
  "            for (int b = 0; b < N; b++)",
  "                if (pair_beats(a, b, s1) && pair_beats(a, b, s2)) count++;",
  "        cout << count << '\\n';",
  "    }",
  "    return 0;",
  "}",
];

/* Section 4: Full code */
const HP_FULL_PY = [
  "N, M = map(int, input().split())",
  "beats = [input().strip() for _ in range(N)]",
  "",
  "def pair_beats(a, b, x):",
  "    return beats[a][x] == '1' or beats[b][x] == '1'",
  "",
  "for _ in range(M):",
  "    s1, s2 = map(int, input().split())",
  "    s1 -= 1; s2 -= 1",
  "    count = 0",
  "    for a in range(N):",
  "        for b in range(N):",
  "            if pair_beats(a, b, s1) and pair_beats(a, b, s2):",
  "                count += 1",
  "    print(count)",
];
const HP_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N, M;",
  "    cin >> N >> M;",
  "    vector<string> beats(N);",
  "    for (int i = 0; i < N; i++) cin >> beats[i];",
  "",
  "    auto pair_beats = [&](int a, int b, int x) {",
  "        return beats[a][x] == '1' || beats[b][x] == '1';",
  "    };",
  "",
  "    while (M--) {",
  "        int s1, s2;",
  "        cin >> s1 >> s2;",
  "        s1--; s2--;",
  "        long long count = 0;",
  "        for (int a = 0; a < N; a++)",
  "            for (int b = 0; b < N; b++)",
  "                if (pair_beats(a, b, s1) && pair_beats(a, b, s2)) count++;",
  "        cout << count << '\\n';",
  "    }",
  "    return 0;",
  "}",
];
export function getHpsSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Beats Chart", "📦 1. 입력 + 승패 차트"),
      color: A,
      py: HP_INPUT_PY, cpp: HP_INPUT_CPP,
      why: [
        t(E, "Read N×N chart of '0'/'1'. beats[i][j] = '1' means symbol i beats symbol j.",
            "N×N의 '0'/'1' 차트 읽기. beats[i][j] = '1'이면 기호 i가 j를 이김."),
        t(E, "Storing it as strings is fine — direct character lookup is O(1).",
            "문자열로 저장 OK — 문자 직접 접근은 O(1)."),
      ],
      pyOnly: [
        t(E, "List comprehension reads N lines into a list of strings.",
            "리스트 컴프리헨션으로 N줄을 문자열 리스트로."),
      ],
      cppOnly: [
        t(E, "vector<string> stores rows; beats[i][j] gives the char directly.",
            "vector<string>으로 행 저장; beats[i][j]가 문자 바로 접근."),
      ],
    },
    {
      label: t(E, "🛡️ 2. pair_beats Helper", "🛡️ 2. pair_beats 헬퍼"),
      color: "#0891b2",
      py: HP_HELPER_PY, cpp: HP_HELPER_CPP,
      why: [
        t(E, "Bessie picks the better of (a, b) AFTER she sees Elsie's choice.",
            "베시는 엘시의 선택을 본 후 (a, b) 중 더 좋은 것을 고름."),
        t(E, "So she beats x if EITHER a or b beats x — a logical OR.",
            "그래서 a 또는 b 중 하나라도 x를 이기면 x를 이김 — 논리 OR."),
      ],
      pyOnly: [
        t(E, "A small named function makes the main loop very readable.",
            "작은 함수로 분리하면 메인 루프가 매우 읽기 쉬움."),
      ],
      cppOnly: [
        t(E, "A lambda capturing beats by reference avoids copying.",
            "beats를 참조 캡처하는 람다로 복사 회피."),
      ],
    },
    {
      label: t(E, "🔁 3. Brute-Force Each Query", "🔁 3. 쿼리마다 완전탐색"),
      color: "#16a34a",
      py: HP_LOOP_PY, cpp: HP_LOOP_CPP,
      why: [
        t(E, "For each Elsie pair, try all N² Bessie pairs (a, b).",
            "엘시의 각 쌍마다 베시의 N² 쌍 (a, b)을 모두 시도."),
        t(E, "(a, b) wins if pair_beats both s1 AND s2 — that means Bessie has a counter regardless.",
            "pair_beats가 s1과 s2 모두 만족하면 (a, b) 승 — 무엇을 내든 베시가 이기는 답이 있음."),
        t(E, "Total work: O(M · N²) — fits comfortably for Bronze sizes.",
            "총 작업: O(M · N²) — Bronze 크기에는 충분."),
      ],
      pyOnly: [
        t(E, "Two nested for loops on range(N) is the most direct way.",
            "range(N) 위 이중 for 루프가 가장 직관적."),
      ],
      cppOnly: [
        t(E, "long long count guards against overflow when N gets large.",
            "N이 커질 때 overflow 방지를 위해 long long count."),
      ],
    },
    {
      label: t(E, "🎯 4. Full Code", "🎯 4. 전체 코드"),
      color: "#7c3aed",
      py: HP_FULL_PY, cpp: HP_FULL_CPP,
      why: [
        t(E, "Read input → define helper → loop M queries → print counts. That's the whole program.",
            "입력 읽기 → 헬퍼 정의 → M개 쿼리 루프 → 결과 출력. 그게 전부."),
        t(E, "Brute force is fine here — no smarter trick needed at Bronze.",
            "Bronze에서는 완전탐색으로 충분 — 더 똑똑한 트릭 불필요."),
      ],
      pyOnly: [
        t(E, "If TLE in Python, switching to PyPy or replacing the inner loop with bit-AND on bitmask rows is a path.",
            "Python에서 TLE라면 PyPy 사용 또는 비트마스크 행 + AND로 내부 루프 대체 가능."),
      ],
      cppOnly: [
        t(E, "Output with '\\n' (not endl) keeps the loop fast.",
            "endl 대신 '\\n'로 출력해 루프 속도 유지."),
      ],
    },
  ];
}

export function HpsProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadHpsPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "HPS Minus One — Full Study Guide", "✊ HPS Minus One — 종합 풀이 노트");
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
