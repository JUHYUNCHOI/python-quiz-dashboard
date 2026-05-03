import { C, t } from "@/components/quest/theme";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

/* ──────────────────────────────────────────────────────────────
   Section 1: Input + Setup
   ────────────────────────────────────────────────────────────── */
const EX_INPUT_PY = [
  "N = int(input())",
  "milk = list(map(int, input().split()))",
];
const EX_INPUT_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> milk(N);",
  "    for (int i = 0; i < N; i++) cin >> milk[i];",
];

/* ──────────────────────────────────────────────────────────────
   Section 2: Total + Average + Remainder
   ────────────────────────────────────────────────────────────── */
const EX_MATH_PY = [
  "total = sum(milk)",
  "avg = total // N         # floor division",
  "extra = total % N        # remainder",
];
const EX_MATH_CPP = [
  "    long long total = 0;",
  "    for (long long x : milk) total += x;",
  "    long long avg = total / N;       // floor (positive ints)",
  "    long long extra = total % N;     // remainder",
];

/* ──────────────────────────────────────────────────────────────
   Section 3: Build Result Distribution
   ────────────────────────────────────────────────────────────── */
const EX_BUILD_PY = [
  "# extra cows get avg+1, the rest get avg",
  "result = [avg + 1] * extra + [avg] * (N - extra)",
];
const EX_BUILD_CPP = [
  "    vector<long long> result;",
  "    result.reserve(N);",
  "    for (long long i = 0; i < extra; i++)     result.push_back(avg + 1);",
  "    for (long long i = 0; i < N - extra; i++) result.push_back(avg);",
];

/* ──────────────────────────────────────────────────────────────
   Section 4: Output + Full Code
   ────────────────────────────────────────────────────────────── */
const EX_OUTPUT_PY = [
  "print(' '.join(map(str, result)))",
];
const EX_OUTPUT_CPP = [
  "    for (int i = 0; i < N; i++) {",
  "        cout << result[i];",
  "        cout << (i + 1 == N ? '\\n' : ' ');",
  "    }",
  "    return 0;",
  "}",
];

const EX_FULL_PY = [
  "N = int(input())",
  "milk = list(map(int, input().split()))",
  "",
  "total = sum(milk)",
  "avg = total // N",
  "extra = total % N",
  "",
  "result = [avg + 1] * extra + [avg] * (N - extra)",
  "print(' '.join(map(str, result)))",
];
const EX_FULL_CPP = [
  "#include <bits/stdc++.h>",
  "using namespace std;",
  "",
  "int main() {",
  "    ios::sync_with_stdio(false);",
  "    cin.tie(nullptr);",
  "",
  "    int N;",
  "    cin >> N;",
  "    vector<long long> milk(N);",
  "    for (int i = 0; i < N; i++) cin >> milk[i];",
  "",
  "    long long total = 0;",
  "    for (long long x : milk) total += x;",
  "    long long avg = total / N;",
  "    long long extra = total % N;",
  "",
  "    for (int i = 0; i < N; i++) {",
  "        long long v = (i < extra) ? avg + 1 : avg;",
  "        cout << v << (i + 1 == N ? '\\n' : ' ');",
  "    }",
  "    return 0;",
  "}",
];

export function getExchangeSections(E) {
  return [
    {
      label: t(E, "📦 1. Input + Setup", "📦 1. 입력 + 셋업"),
      color: A,
      py: EX_INPUT_PY, cpp: EX_INPUT_CPP,
      why: [
        t(E, "Read N, then read N milk amounts into an array.",
            "N을 읽고, 우유 양 N개를 배열에 저장."),
        t(E, "Use 64-bit integers — sum can grow large (N up to ~10^5, values up to 10^9).",
            "64비트 정수 사용 — 합계가 커질 수 있어 (N 최대 ~10^5, 값 최대 10^9)."),
      ],
      pyOnly: [
        t(E, "list(map(int, input().split())) is the standard Python pattern for a row of integers.",
            "list(map(int, input().split()))이 정수 한 줄 입력의 표준 패턴."),
      ],
      cppOnly: [
        t(E, "vector<long long> guards against overflow on the eventual sum.",
            "vector<long long>로 합계 오버플로 방지."),
        t(E, "ios::sync_with_stdio(false) + cin.tie(nullptr) speeds up input.",
            "ios::sync_with_stdio(false) + cin.tie(nullptr)로 입력 가속."),
      ],
    },
    {
      label: t(E, "🧮 2. Total / Average / Remainder", "🧮 2. 합계 / 평균 / 나머지"),
      color: "#0891b2",
      py: EX_MATH_PY, cpp: EX_MATH_CPP,
      why: [
        t(E, "After many rounds milk is conserved — total never changes.",
            "여러 라운드 후에도 우유는 보존돼 — 총량은 그대로."),
        t(E, "Final state: split total into N nearly-equal parts → avg = total ÷ N (floor), extra = total mod N.",
            "최종 상태: 총량을 N개로 거의 균등 분배 → avg = total ÷ N (내림), extra = total mod N."),
        t(E, "extra cows must hold avg+1 to absorb the remainder.",
            "나머지를 흡수하려면 extra마리가 avg+1을 가져야 함."),
      ],
      pyOnly: [
        t(E, "// is floor division for positive numbers — exactly what we want.",
            "//는 양수에서 내림 나눗셈 — 우리가 원하는 것."),
      ],
      cppOnly: [
        t(E, "Integer / on positive long long is floor division. Same for %.",
            "양의 long long에서 /는 내림 나눗셈. %도 동일."),
      ],
    },
    {
      label: t(E, "🏗️ 3. Build the Distribution", "🏗️ 3. 분배 구성"),
      color: "#16a34a",
      py: EX_BUILD_PY, cpp: EX_BUILD_CPP,
      why: [
        t(E, "Place 'extra' copies of avg+1 first, then (N - extra) copies of avg.",
            "avg+1을 extra개 먼저, 그 뒤에 avg를 (N - extra)개."),
        t(E, "Order doesn't matter for correctness — total stays the same. We pick a canonical order.",
            "순서는 정답에 영향 없음 — 합은 같음. 일관된 순서로 출력."),
      ],
      pyOnly: [
        t(E, "[x] * n quickly creates a list of n copies of x in Python.",
            "[x] * n으로 x를 n번 반복한 리스트를 빠르게 생성."),
      ],
      cppOnly: [
        t(E, "reserve(N) avoids reallocations during push_back.",
            "reserve(N)로 push_back 도중 재할당 방지."),
      ],
    },
    {
      label: t(E, "📤 4. Output + Full Code", "📤 4. 출력 + 전체 코드"),
      color: "#7c3aed",
      py: EX_FULL_PY, cpp: EX_FULL_CPP,
      why: [
        t(E, "Print all N values separated by spaces, ending with a newline.",
            "N개 값을 공백으로 구분, 마지막에 줄바꿈."),
        t(E, "Whole solution is O(N) time and O(N) space — no simulation needed.",
            "전체 솔루션은 O(N) 시간 / O(N) 공간 — 시뮬레이션 불필요."),
      ],
      pyOnly: [
        t(E, "' '.join(map(str, result)) converts ints to strings then joins with spaces.",
            "' '.join(map(str, result))로 정수→문자열 변환 후 공백으로 결합."),
      ],
      cppOnly: [
        t(E, "Avoid endl in tight loops — use '\\n' for speed.",
            "반복문 안에서 endl 대신 '\\n' 사용 (속도)."),
      ],
    },
  ];
}

export function ExchangeProgressiveCode({ E, lang = "py", sections }) {
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

export function downloadExchangePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "🥛 Milk Exchange — Full Study Guide", "🥛 Milk Exchange — 종합 풀이 노트");
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
