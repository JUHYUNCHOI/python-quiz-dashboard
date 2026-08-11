import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";

const A = "#f97316";

/* ================================================================
   Rectangles (MCC 2023 P5) — 구간 분할 DP
   빨강 N개를 파랑 ≤ K개(연속 구간)로 덮어 총면적 최소.
   구간 비용 = (폭 합) × (최고 높이).  dp[kk][i] = 앞 i개를 파랑 kk개로.
   ================================================================ */
const FULL_PY = [
  "n, k = map(int, input().split())",
  "h = [0] * n",
  "w = [0] * n",
  "for i in range(n):",
  "    h[i], w[i] = map(int, input().split())",
  "if k > n:",
  "    k = n",
  "INF = float('inf')",
  "dp = [[INF] * (n + 1) for _ in range(k + 1)]",
  "dp[0][0] = 0",
  "for kk in range(1, k + 1):",
  "    for i in range(1, n + 1):",
  "        sw = 0",
  "        mh = 0",
  "        for j in range(i, 0, -1):",
  "            sw += w[j - 1]",
  "            mh = max(mh, h[j - 1])",
  "            if dp[kk - 1][j - 1] < INF:",
  "                dp[kk][i] = min(dp[kk][i], dp[kk - 1][j - 1] + sw * mh)",
  "print(min(dp[kk][n] for kk in range(1, k + 1)))",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    long long n, k;",
  "    cin >> n >> k;",
  "    vector<long long> h(n), w(n);",
  "    for (int i = 0; i < n; i++) cin >> h[i] >> w[i];",
  "    if (k > n) k = n;",
  "",
  "    const long long INF = 1e18;",
  "    vector<vector<long long>> dp(k + 1, vector<long long>(n + 1, INF));",
  "    dp[0][0] = 0;",
  "    for (int kk = 1; kk <= k; kk++)",
  "        for (int i = 1; i <= n; i++) {",
  "            long long sw = 0, mh = 0;",
  "            for (int j = i; j >= 1; j--) {",
  "                sw += w[j - 1];",
  "                mh = max(mh, h[j - 1]);",
  "                if (dp[kk - 1][j - 1] < INF)",
  "                    dp[kk][i] = min(dp[kk][i], dp[kk - 1][j - 1] + sw * mh);",
  "            }",
  "        }",
  "    long long ans = INF;",
  "    for (int kk = 1; kk <= k; kk++) ans = min(ans, dp[kk][n]);",
  "    cout << ans << \"\\n\";",
  "    return 0;",
  "}",
];

const _RECT_VARS = [
  { v: "n", ko: "빨강 사각형 개수", en: "# of red rects" },
  { v: "k", ko: "파랑 최대 개수", en: "max # of blue rects" },
  { v: "dp[kk][i]", ko: "앞 i개를 파랑 kk개로 덮는 최소 면적", en: "min area: first i reds, kk blues" },
  { v: "sw · mh", ko: "구간 폭합 × 최고높이 = 그 파랑 면적", en: "Σwidth × max-height = blue area" },
];


/* ═══════════════════════════════════════════════════════════════
   getRectanglesSections — PDF/progressive 용 (App 이 import).
   ═══════════════════════════════════════════════════════════════ */
export function getRectanglesSections(E) {
  return [
    {
      label: t(E, "🎯 Interval-Partition DP", "🎯 구간 분할 DP"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "Each red must sit inside exactly one blue, and the reds are adjacent — so every blue covers a contiguous group of reds.",
            "각 빨강은 정확히 한 파랑 안, 빨강들은 붙어 있어요 — 그래서 파랑 하나는 빨강의 연속 구간을 덮어요."),
        t(E, "A group's blue = (sum of widths) × (max height). We partition the reds into ≤ K contiguous groups to minimize the total.",
            "한 구간의 파랑 = (폭의 합) × (최고 높이). 빨강을 ≤ K개 연속 구간으로 나눠 총면적을 최소화."),
        t(E, "dp[kk][i] = min area to cover the first i reds with kk blues. Try each last group [j..i].",
            "dp[kk][i] = 앞 i개 빨강을 파랑 kk개로 덮는 최소 면적. 마지막 구간 [j..i] 를 모두 시도."),
        t(E, "K can be up to 10⁹, but more than N blues is pointless — cap K = min(K, N).",
            "K 는 10⁹ 까지지만 N 보다 많은 파랑은 의미 없어 — K = min(K, N) 로 캡."),
      ],
      pyOnly: [
        t(E, "float('inf') as the DP sentinel; a generator in min(...) reads the final answer over all kk.",
            "DP 초기값은 float('inf'); min(...) 안 제너레이터로 모든 kk 중 최종 답을 읽어요."),
      ],
      cppOnly: [
        t(E, "Area can reach 200×1000×1000 → use long long for h, w, dp, and the answer.",
            "면적이 200×1000×1000 까지 → h, w, dp, 답 모두 long long."),
        t(E, "INF = 1e18 as the sentinel; guard dp[kk-1][j-1] < INF before extending.",
            "INF = 1e18 를 초기값으로; 확장 전에 dp[kk-1][j-1] < INF 확인."),
      ],
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   getRectanglesWalk — CodeWalk 용 {code, vars, beats} (Ch2 가 import).
   ═══════════════════════════════════════════════════════════════ */
export function getRectanglesWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP, vars: _RECT_VARS, beats: [
        { hi: [5, 9], bubble: t(E,
          "Read n reds and k. For each rect i, read its height h[i] and width w[i].",
          "빨강 n개와 k를 읽어요. 각 사각형 i마다 높이 h[i]·폭 w[i]를 읽어요.") },
        { hi: [10, 10], bubble: t(E,
          "k can be up to 10⁹, but you never need more than n blues (one per red). Cap k = min(k, n).",
          "k는 10⁹까지지만 파랑이 n개보다 많을 이유가 없어요 (하나씩이면 n개). k = min(k, n)로 캡.") },
        { hi: [12, 14], bubble: t(E,
          "dp[kk][i] = the smallest total area to cover the first i reds using kk blues. Start from dp[0][0] = 0 (nothing covered, no area).",
          "dp[kk][i] = 앞 i개 빨강을 파랑 kk개로 덮는 최소 총면적. dp[0][0] = 0(아무것도 안 덮음, 면적 0)에서 시작.") },
        { hi: [15, 24], bubble: t(E,
          "Fill the table: let the last blue cover the group [j..i]. Widen it from i down to j, tracking sw (sum of widths) and mh (max height) — that group's blue = sw × mh. The rest is dp[kk-1][j-1]. Keep the minimum.",
          "표를 채워요: 마지막 파랑이 구간 [j..i]를 덮는다고 봐요. i에서 j까지 넓히며 sw(폭 합)·mh(최고 높이)를 갱신 — 그 파랑 = sw × mh. 앞부분은 dp[kk-1][j-1]. 최소로 갱신.") },
        { hi: [25, 27], bubble: t(E,
          "The answer is the smallest dp[kk][n] over kk = 1..k — the best way using at most K blues.",
          "답은 kk = 1..k 중 가장 작은 dp[kk][n] — 파랑을 최대 K개 써서 전체를 덮는 최선.") },
      ],
    };
  }
  return {
    code: FULL_PY, vars: _RECT_VARS, beats: [
      { hi: [0, 4], bubble: t(E,
        "Read n reds and k. For each rect i, read its height h[i] and width w[i].",
        "빨강 n개와 k를 읽어요. 각 사각형 i마다 높이 h[i]·폭 w[i]를 읽어요.") },
      { hi: [5, 6], bubble: t(E,
        "k can be up to 10⁹, but you never need more than n blues (one per red). Cap k = min(k, n).",
        "k는 10⁹까지지만 파랑이 n개보다 많을 이유가 없어요 (하나씩이면 n개). k = min(k, n)로 캡.") },
      { hi: [7, 9], bubble: t(E,
        "dp[kk][i] = the smallest total area to cover the first i reds using kk blues. Start from dp[0][0] = 0 (nothing covered, no area).",
        "dp[kk][i] = 앞 i개 빨강을 파랑 kk개로 덮는 최소 총면적. dp[0][0] = 0(아무것도 안 덮음, 면적 0)에서 시작.") },
      { hi: [10, 18], bubble: t(E,
        "Fill the table: let the last blue cover the group [j..i]. Widen it from i down to j, tracking sw (sum of widths) and mh (max height) — that group's blue = sw × mh. The rest is dp[kk-1][j-1]. Keep the minimum.",
        "표를 채워요: 마지막 파랑이 구간 [j..i]를 덮는다고 봐요. i에서 j까지 넓히며 sw(폭 합)·mh(최고 높이)를 갱신 — 그 파랑 = sw × mh. 앞부분은 dp[kk-1][j-1]. 최소로 갱신.") },
      { hi: [19, 19], bubble: t(E,
        "The answer is the smallest dp[kk][n] over kk = 1..k — the best way using at most K blues.",
        "답은 kk = 1..k 중 가장 작은 dp[kk][n] — 파랑을 최대 K개 써서 전체를 덮는 최선.") },
    ],
  };
}

export function RectanglesProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#f97316" />;
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


export function downloadRectanglesPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Rectangles — Full Study Guide", "Rectangles — 종합 풀이 노트");
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
  .hint { background: #fff7ed; border: 1px solid #fdba74; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #9a3412; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">MCC 2023 P5 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
