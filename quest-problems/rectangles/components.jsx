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
  "dp = []",
  "for kk in range(k + 1):",
  "    dp.append([INF] * (n + 1))",
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
  "best = INF",
  "for kk in range(1, k + 1):",
  "    best = min(best, dp[kk][n])",
  "print(best)",
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
   getRectanglesSlowWalk — 느린 코드(완전탐색)도 CodeWalk 로.

   왜 (2026-09-07): 이 quest 안에서 코드 보여주는 방식이 두 가지였다.
   최종 DP 코드는 CodeWalk(말풍선이 줄에 붙음)인데 느린 코드만 25줄 통째 dump 였다.
   선생님 지시(2026-07-14): "앞으로 코드는 모두 이런식으로 할거야." 이유는
   "위에 있는 설명은 안 읽힌다" — memory/feedback_quest_code_codewalk.md
   ux-reviewer: "아이는 최종 코드는 한 줄씩 따라가다가, 브루트 코드에서는 갑자기
   25줄을 스크롤하며 스스로 읽어야 해서 '여긴 왜 설명이 없지' 하고 속도가 뚝 떨어진다."
   ═══════════════════════════════════════════════════════════════ */
const SLOW_PY = [
  "n, k = map(int, input().split())",
  "h = [0] * n",
  "w = [0] * n",
  "for i in range(n):",
  "    h[i], w[i] = map(int, input().split())",
  "",
  "best = float('inf')",
  "for mask in range(1 << (n - 1)):",
  "    groups = 1",
  "    total = 0",
  "    sw, mh = w[0], h[0]",
  "    for i in range(1, n):",
  "        if mask >> (i - 1) & 1:",
  "            total += sw * mh",
  "            groups += 1",
  "            sw, mh = w[i], h[i]",
  "        else:",
  "            sw += w[i]",
  "            mh = max(mh, h[i])",
  "    total += sw * mh",
  "    if groups <= k:",
  "        best = min(best, total)",
  "",
  "print(best)",
];

const _SLOW_VARS = [
  { v: "mask", ko: "자를 자리 조합 하나 (비트 = 틈 하나)", en: "one cut pattern (bit = one gap)" },
  { v: "sw · mh", ko: "지금 모으는 덩어리의 폭합 · 최고높이", en: "current group: Σwidth · max-height" },
  { v: "groups", ko: "지금까지 만든 덩어리 수 (파랑 개수)", en: "groups made so far (# of blues)" },
  { v: "best", ko: "지금까지 본 것 중 제일 작은 총면적", en: "smallest total seen so far" },
];

export function getRectanglesSlowWalk(E) {
  return {
    code: SLOW_PY, vars: _SLOW_VARS, beats: [
      { hi: [0, 4], bubble: t(E,
        "Read n reds and k, then each red's height and width.",
        "빨강 n개와 k를 읽고, 빨강마다 높이와 폭을 읽어요.") },
      { hi: [7, 7], bubble: t(E,
        "Between n reds there are n−1 gaps. Each gap: cut or not. One number's bits = one choice for every gap — so this loop tries every way of cutting.",
        "빨강 n개 사이엔 틈이 n−1 군데예요. 틈마다 자를지 말지 두 가지. 숫자 하나의 비트가 틈마다의 선택이라, 이 반복문이 자르는 모든 방법을 다 해봐요.") },
      { hi: [10, 10], bubble: t(E,
        "Start the first group with red 1: its width and its height.",
        "첫 덩어리를 빨강 1번으로 시작해요. 그 폭과 높이로요.") },
      { hi: [12, 15], bubble: t(E,
        "Cut here? Then the group we were collecting is finished — pay (Σwidth × max-height) for it, count one more blue, and start a new group at red i.",
        "여기서 자른다면? 모으던 덩어리가 끝난 거예요 — (폭합 × 최고높이) 만큼 값을 내고, 파랑을 하나 더 세고, 빨강 i 부터 새 덩어리를 시작해요.") },
      { hi: [16, 18], bubble: t(E,
        "No cut? Then red i joins the current group — widths add up, height takes the max.",
        "안 자른다면? 빨강 i 가 지금 덩어리에 붙어요 — 폭은 더하고, 높이는 큰 쪽을 써요.") },
      { hi: [19, 23], bubble: t(E,
        "Pay for the last group too. If we used at most k blues, this cutting is allowed — keep it if it is the smallest so far.",
        "마지막 덩어리도 값을 내요. 파랑을 k개 이하로 썼으면 그 자르기는 규칙에 맞아요 — 지금까지 중 제일 작으면 답으로 둬요.") },
    ],
  };
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
      { hi: [7, 11], bubble: t(E,
        "dp is a table: one row per kk, one box per i. We build it row by row — each row is a list of (n+1) boxes, all INF at first. dp[kk][i] = the smallest total area to cover the first i reds using kk blues. Start from dp[0][0] = 0 (nothing covered, no area).",
        "dp 는 표예요. kk 마다 한 줄, 그 줄 안에 i 마다 칸 하나. 줄을 하나씩 만들어 붙여요 — 한 줄은 (n+1)칸짜리 리스트이고 처음엔 전부 INF 예요.\ndp[kk][i] = 앞 i개 빨강을 파랑 kk개로 덮는 최소 총면적. dp[0][0] = 0(아무것도 안 덮음, 면적 0)에서 시작.") },
      { hi: [12, 20], bubble: t(E,
        "Fill the table: let the last blue cover the group [j..i]. Widen it from i down to j, tracking sw (sum of widths) and mh (max height) — that group's blue = sw × mh. The rest is dp[kk-1][j-1]. Keep the minimum.",
        "표를 채워요: 마지막 파랑이 구간 [j..i]를 덮는다고 봐요. i에서 j까지 넓히며 sw(폭 합)·mh(최고 높이)를 갱신 — 그 파랑 = sw × mh. 앞부분은 dp[kk-1][j-1]. 최소로 갱신.") },
      { hi: [21, 24], bubble: t(E,
        "Now pick the answer: walk kk = 1..k and keep the smallest dp[kk][n] — the best way using at most K blues.",
        "이제 답을 골라요. kk 를 1부터 k 까지 훑으며 dp[kk][n] 중 제일 작은 걸 남겨요 — 파랑을 최대 K개 써서 전체를 덮는 최선이에요.") },
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
