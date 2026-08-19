import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#2563eb";

const FULL_PY = [
  "import sys, math",
  "",
  "data = sys.stdin.read().split()",
  "N = int(data[0])",
  "A = int(data[1])",
  "R = list(map(int, data[2:2 + (N - 1)]))",
  "",
  "b = sorted(R, reverse=True)   # known radii, largest first",
  "m = N - 1",
  "",
  "# prefix[i] = b1^2 - b2^2 + b3^2 - ...  (alternating sum of squares)",
  "prefix = [0] * (m + 1)",
  "for i in range(1, m + 1):",
  "    sign = 1 if i % 2 == 1 else -1",
  "    prefix[i] = prefix[i - 1] + sign * b[i - 1] ** 2",
  "S = prefix[m]",
  "",
  "# the missing radius slots into one position p (1..N)",
  "for p in range(1, N + 1):",
  "    pre = prefix[p - 1]",
  "    x2 = (A + S - 2 * pre) if p % 2 == 1 else (2 * pre - A - S)",
  "    if x2 < 0:",
  "        continue",
  "    x = math.isqrt(x2)              # integer square root",
  "    if x * x != x2 or x <= 0:       # must be a positive perfect square",
  "        continue",
  "    upper = b[p - 2] if p - 1 >= 1 else None   # neighbor above (bigger)",
  "    lower = b[p - 1] if p - 1 < m else 0       # neighbor below (smaller)",
  "    if upper is not None and x > upper:",
  "        continue",
  "    if x < lower:",
  "        continue",
  "    print(x)",
  "    break",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "#include <cmath>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N; long long A;",
  "    cin >> N >> A;",
  "    int m = N - 1;",
  "    vector<long long> b(m);",
  "    for (auto &v : b) cin >> v;",
  "    sort(b.rbegin(), b.rend());          // largest first",
  "",
  "    // prefix alternating sum of squares (use __int128 — sums exceed 10^18)",
  "    vector<__int128> prefix(m + 1, 0);",
  "    for (int i = 1; i <= m; i++) {",
  "        __int128 sq = (__int128)b[i - 1] * b[i - 1];",
  "        prefix[i] = prefix[i - 1] + (i % 2 == 1 ? sq : -sq);",
  "    }",
  "    __int128 S = prefix[m];",
  "",
  "    for (int p = 1; p <= N; p++) {",
  "        __int128 pre = prefix[p - 1];",
  "        __int128 x2 = (p % 2 == 1) ? ((__int128)A + S - 2 * pre)",
  "                                   : (2 * pre - (__int128)A - S);",
  "        if (x2 < 0) continue;",
  "        long long x = (long long)sqrtl((long double)x2);   // integer sqrt",
  "        while ((__int128)(x + 1) * (x + 1) <= x2) x++;",
  "        while (x > 0 && (__int128)x * x > x2) x--;",
  "        if ((__int128)x * x != x2 || x <= 0) continue;",
  "        long long upper = (p - 1 >= 1) ? b[p - 2] : (long long)4e18;",
  "        long long lower = (p - 1 < m) ? b[p - 1] : 0;",
  "        if (x > upper || x < lower) continue;",
  "        cout << x << \"\\n\";",
  "        return 0;",
  "    }",
  "    return 0;",
  "}",
];

export function getMcc21GlassSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Sort the known radii largest-first, then build 'prefix': prefix[i] = b1² − b2² + b3² − … So the WHOLE alternating sum of squares is precomputed and any prefix is O(1).",
            "아는 반지름을 큰 것부터 정렬하고 'prefix' 를 만들어요: prefix[i] = b1² − b2² + b3² − … 이렇게 하면 번갈아 제곱 합 전체가 미리 계산되고 어떤 앞부분도 O(1) 이에요."),
        t(E, "The missing radius must land in ONE slot p of the sorted order. Radii above p keep their signs; every radius below p shifts one place, so all their signs flip. That turns 'alternating sum = A' into a single equation for x².",
            "깨진 반지름은 정렬 순서의 어떤 한 자리 p 에 들어가요. p 위의 반지름은 부호를 유지하고, p 아래는 한 칸 밀려 부호가 전부 뒤집혀요. 그래서 '번갈아 합 = A' 가 x² 에 대한 식 하나로 바뀌어요."),
        t(E, "Solve x² per slot in O(1): p odd → x² = A+S−2·pre, p even → x² = 2·pre−A−S. Accept x only if x² is a positive perfect square (isqrt check) AND x fits between its neighbors upper/lower. The first slot that passes is a valid answer.",
            "자리마다 x² 를 O(1) 로 풀어요: p 홀수 → x² = A+S−2·pre, p 짝수 → x² = 2·pre−A−S. x² 가 양의 완전제곱(isqrt 확인)이고 x 가 이웃 upper/lower 사이에 맞을 때만 채택해요. 통과하는 첫 자리가 유효한 정답이에요."),
      ],
      pyOnly: [
        t(E, "math.isqrt(x2) is exact integer square root — no float rounding. Check x*x == x2 to confirm x2 is a perfect square.",
            "math.isqrt(x2) 는 정확한 정수 제곱근이라 실수 반올림 오차가 없어요. x*x == x2 로 완전제곱인지 확인해요."),
        t(E, "Python ints are unbounded, so b[i]² (up to 10¹⁸) and their running sum never overflow — no big-integer setup needed.",
            "파이썬 정수는 크기 제한이 없어서 b[i]² (최대 10¹⁸) 과 그 누적 합이 절대 넘치지 않아요 — 큰 정수 준비가 따로 필요 없어요."),
      ],
      cppOnly: [
        t(E, "Sums reach ~5·10⁴ terms of 10¹⁸ each → far past long long. Use __int128 for prefix, S, and x². Read A as long long (up to 10¹⁸).",
            "합계는 10¹⁸ 짜리 항이 약 5·10⁴ 개 → long long 을 크게 초과해요. prefix, S, x² 는 __int128 로. A 는 long long(최대 10¹⁸)으로 읽어요."),
        t(E, "There is no int128 sqrt, so seed with sqrtl then nudge x up/down until x*x == x2 exactly.",
            "int128 용 sqrt 가 없어서 sqrtl 로 시작한 뒤 x*x == x2 가 정확히 될 때까지 x 를 위아래로 미세 조정해요."),
      ],
    },
  ];
}

export function Mcc21GlassProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#2563eb" />;
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


export function downloadMcc21GlassPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc21Glass — Full Study Guide", "Mcc21Glass — 종합 풀이 노트");
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

