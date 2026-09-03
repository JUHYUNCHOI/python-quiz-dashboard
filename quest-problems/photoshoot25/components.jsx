// 🔒 USACO_VERIFIED (2026-05-13 · 2026-08-29 배열 크기 +2 → +1 · 2026-09-03 0-based 로)
//   ⚠️ 2026-09-03: 선생님 요청 "인덱스 0으로 계산해서 r--, c--로" 로 인덱싱을 바꿨음.
//     beauty/S 를 N+1·W+1 → N·W 로, 읽자마자 r--, c--, 범위식을
//     max(1, r-K+1)…min(r, W) → max(0, r-K+1)…min(r, W-1) 로.
//     로컬 검증: 무작위 300건 × 6갈래(옛 py/cpp + 새 FULL/VIEW py/cpp) 결과 전부 일치,
//               N=1..9 × K=1..N 400건 ASan/UBSan 경계 오류 0.
//     ❗ 아직 USACO 재제출 안 함 — 선생님이 제출해서 18/18 확인 후 이 줄 갱신할 것.
//   Python: 12/18 (TLE 13-18, Python too slow)
//   C++:    18/18 PASS
//   2026-08-29: 선생님 "이거 +2 안하고 할수 없을까?" → beauty/S 를 N+2 → N+1, W+2 → W+1.
//     +1 은 필요하고 +2 의 둘째 칸은 아무도 안 씀 (r,c 가 1…N 이라 beauty[N] 까지만 접근).
//     C++  : 랜덤 3,000건 결과 일치 · N=1~8 × K=1~N 전수를 ASan/UBSan 으로 경계 오류 0
//     Python: N=1~7 × K 전수 × 6회 = 168건 결과 일치, 에러 0
//     → 선생님이 USACO 재제출로 C++ 통과 확인 (2026-08-29).
//     같이 고침: "+2 는 자리만 넉넉히 — 신경 안 써도 돼요" 말풍선을 실제 이유로 교체.
//   코드 수정 시 USACO 재제출 필요 — /tmp/usaco_results.json 참고
//   상세: REPO_ROOT/USACO_VERIFICATION.md

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

export const FULL_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "Q = int(input())",
  "",
  "# beauty[r][c] = current beauty of cow at (r,c). 0-indexed.",
  "beauty = [[0] * N for _ in range(N)]",
  "",
  "# W = number of valid top-left positions per dimension",
  "W = N - K + 1",
  "",
  "# S[i][j] = sum of K x K window with top-left (i,j)",
  "S = [[0] * W for _ in range(W)]",
  "",
  "cur_max = 0",
  "out = []",
  "",
  "for _ in range(Q):",
  "    r, c, v = map(int, input().split())",
  "    # the input counts from 1, our arrays count from 0",
  "    r -= 1",
  "    c -= 1",
  "",
  "    delta = v - beauty[r][c]",
  "    beauty[r][c] = v",
  "",
  "    # windows containing (r,c) have top-left (i,j) with",
  "    # max(0, r-K+1) <= i <= min(r, W-1),  same for j",
  "    i_lo = max(0, r - K + 1)",
  "    i_hi = min(r, W - 1)",
  "    j_lo = max(0, c - K + 1)",
  "    j_hi = min(c, W - 1)",
  "",
  "    for i in range(i_lo, i_hi + 1):",
  "        for j in range(j_lo, j_hi + 1):",
  "            S[i][j] += delta",
  "            if S[i][j] > cur_max:",
  "                cur_max = S[i][j]",
  "",
  "    out.append(str(cur_max))",
  "",
  "sys.stdout.write('\\n'.join(out) + '\\n')",
];


export const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "    int Q;",
  "    cin >> Q;",
  "",
  "    // 0-indexed beauty grid",
  "    vector<vector<int>> beauty(N, vector<int>(N, 0));",
  "",
  "    int W = N - K + 1; // valid top-left range per dim",
  "    vector<vector<int>> S(W, vector<int>(W, 0));",
  "",
  "    int cur_max = 0;",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int r, c, v;",
  "        cin >> r >> c >> v;",
  "        // the input counts from 1, our arrays count from 0",
  "        r--;",
  "        c--;",
  "",
  "        int delta = v - beauty[r][c];",
  "        beauty[r][c] = v;",
  "",
  "        int i_lo = max(0, r - K + 1);",
  "        int i_hi = min(r, W - 1);",
  "        int j_lo = max(0, c - K + 1);",
  "        int j_hi = min(c, W - 1);",
  "",
  "        for (int i = i_lo; i <= i_hi; i++) {",
  "            for (int j = j_lo; j <= j_hi; j++) {",
  "                S[i][j] += delta;",
  "                if (S[i][j] > cur_max) {",
  "                    cur_max = S[i][j];",
  "                }",
  "            }",
  "        }",
  "        cout << cur_max << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];


// CodeWalk — 코드 줄에 붙는 말풍선. 화면 표시용은 '주석 없는 깨끗한 코드'(검증본 로직 그대로, 주석만 제거).
// (선생님 2026-08-11: 한국어 버전에 영어 주석이 떠서 헷갈림 + "정보가 넘 많아". 설명은 말풍선에만.)
const _PS_VARS = [
  { v: "beauty", ko: "각 칸의 현재 값", en: "each cell's value" },
  { v: "S", ko: "각 사진(K×K)의 점수 합", en: "each photo's sum" },
  { v: "cur_max", ko: "지금까지 최고 점수", en: "best sum so far" },
  { v: "delta", ko: "이번에 늘어난 양", en: "how much it grew" },
  { v: "W", ko: "한 줄당 사진 수 = N−K+1", en: "photos per row = N−K+1" },
];

// 표시용(주석 제거). 실행/PDF 는 위 FULL_PY/FULL_CPP 그대로.
const VIEW_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "Q = int(input())",
  "",
  "beauty = [[0] * N for _ in range(N)]",
  "",
  "W = N - K + 1",
  "",
  "S = [[0] * W for _ in range(W)]",
  "",
  "cur_max = 0",
  "out = []",
  "",
  "for _ in range(Q):",
  "    r, c, v = map(int, input().split())",
  "    r -= 1",
  "    c -= 1",
  "",
  "    delta = v - beauty[r][c]",
  "    beauty[r][c] = v",
  "",
  "    i_lo = max(0, r - K + 1)",
  "    i_hi = min(r, W - 1)",
  "    j_lo = max(0, c - K + 1)",
  "    j_hi = min(c, W - 1)",
  "",
  "    for i in range(i_lo, i_hi + 1):",
  "        for j in range(j_lo, j_hi + 1):",
  "            S[i][j] += delta",
  "            if S[i][j] > cur_max:",
  "                cur_max = S[i][j]",
  "",
  "    out.append(str(cur_max))",
  "",
  "sys.stdout.write('\\n'.join(out) + '\\n')",
];


const VIEW_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "    int Q;",
  "    cin >> Q;",
  "",
  "    vector<vector<int>> beauty(N, vector<int>(N, 0));",
  "",
  "    int W = N - K + 1; // valid top-left range per dim",
  "    vector<vector<int>> S(W, vector<int>(W, 0));",
  "",
  "    int cur_max = 0;",
  "",
  "    for (int q = 0; q < Q; q++) {",
  "        int r, c, v;",
  "        cin >> r >> c >> v;",
  "        r--;",
  "        c--;",
  "",
  "        int delta = v - beauty[r][c];",
  "        beauty[r][c] = v;",
  "",
  "        int i_lo = max(0, r - K + 1);",
  "        int i_hi = min(r, W - 1);",
  "        int j_lo = max(0, c - K + 1);",
  "        int j_hi = min(c, W - 1);",
  "",
  "        for (int i = i_lo; i <= i_hi; i++) {",
  "            for (int j = j_lo; j <= j_hi; j++) {",
  "                S[i][j] += delta;",
  "                if (S[i][j] > cur_max) {",
  "                    cur_max = S[i][j];",
  "                }",
  "            }",
  "        }",
  "        cout << cur_max << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];


export function getPhotoshoot25Walk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: VIEW_CPP, vars: _PS_VARS, beats: [
      { hi: [0, 3],   bubble: t(E, "Include the tools we need.", "필요한 도구 include.") },
      { hi: [5, 9],   bubble: t(E, "Start main → read N, K, and the number of updates Q.", "main 시작 → N, K, 업데이트 수 Q 읽기.") },
      { hi: [11, 11], bubble: t(E, "beauty = each cell's value (all 0 at first). Exactly N×N — no spare slot, because we already shifted r and c to start at 0.", "beauty = 각 칸의 값 (처음엔 다 0). 크기는 딱 N×N 이에요. r, c 를 0 부터로 이미 옮겼으니 여분 칸이 필요 없어요.") },
      { hi: [13, 13], bubble: t(E, "W = how many photos fit in a row (N−K+1).", "W = 한 줄에 들어가는 사진 수 (N−K+1).") },
      { hi: [14, 14], bubble: t(E, "S = each photo's score. THE key idea — keep it, don't re-add every time.", "S = 각 사진의 점수. 핵심 — 저장해두고 매번 다시 안 더함.") },
      { hi: [16, 16], bubble: t(E, "cur_max = best score so far.", "cur_max = 지금까지 최고 점수.") },
      { hi: [19, 22], bubble: t(E, "The input counts rows and columns from 1, but our arrays count from 0 — so subtract 1 right away. From here on r and c are array positions.", "입력은 행·열을 1 부터 세는데 배열은 0 부터예요. 그래서 읽자마자 1 씩 빼요. 이 뒤로 r, c 는 배열 자리 번호예요.") },
      { hi: [24, 25], bubble: t(E, "delta = new v − old value. The photo sums already hold the old value, so add just the change — no recompute (that's the speed!). Then store the new value.", "delta = 새 값 v − 옛 값. 사진 점수엔 옛 값이 이미 있어서, 다시 다 더하지 말고 '늘어난 만큼'만 더하면 돼요 (그래서 빠름!). 그 다음 칸 값을 새 값으로 갱신.") },
      { hi: [27, 30], bubble: t(E, "Range of photos holding this cow — that rectangle from the sim.", "이 소를 품는 사진들의 범위 — 시뮬의 그 직사각형.") },
      { hi: [32, 34], bubble: t(E, "Add delta to only those photos.", "그 사진들만 S 에 += delta.") },
      { hi: [35, 37], bubble: t(E, "A photo grew — lift cur_max if it beats it.", "사진이 커졌으니, 넘으면 cur_max 갱신.") },
      { hi: [40, 40], bubble: t(E, "Print the best score.", "최고 점수 출력.") },
    ] };
  }
  return { code: VIEW_PY, vars: _PS_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "Fast input.", "빠른 입력.") },
    { hi: [3, 4],   bubble: t(E, "Read N, K, and the number of updates Q.", "N, K, 업데이트 수 Q 읽기.") },
    { hi: [6, 6],   bubble: t(E, "beauty = each cell's value (all 0 at first). Exactly N×N — no spare slot, because we already shifted r and c to start at 0.", "beauty = 각 칸의 값 (처음엔 다 0). 크기는 딱 N×N 이에요. r, c 를 0 부터로 이미 옮겼으니 여분 칸이 필요 없어요.") },
    { hi: [8, 8],   bubble: t(E, "W = how many photos fit in a row (N−K+1).", "W = 한 줄에 들어가는 사진 수 (N−K+1).") },
    { hi: [10, 10], bubble: t(E, "S = each photo's score. THE key idea — keep it, don't re-add every time.", "S = 각 사진의 점수. 핵심 — 저장해두고 매번 다시 안 더함.") },
    { hi: [12, 13], bubble: t(E, "cur_max = best score so far. out = collect answers.", "cur_max = 지금까지 최고 점수. out = 답 모음.") },
    { hi: [16, 18], bubble: t(E, "The input counts rows and columns from 1, but our arrays count from 0 — so subtract 1 right away. From here on r and c are array positions.", "입력은 행·열을 1 부터 세는데 배열은 0 부터예요. 그래서 읽자마자 1 씩 빼요. 이 뒤로 r, c 는 배열 자리 번호예요.") },
    { hi: [20, 21], bubble: t(E, "delta = new v − old value. The photo sums already hold the old value, so add just the change — no recompute (that's the speed!). Then store the new value.", "delta = 새 값 v − 옛 값. 사진 점수엔 옛 값이 이미 있어서, 다시 다 더하지 말고 '늘어난 만큼'만 더하면 돼요 (그래서 빠름!). 그 다음 칸 값을 새 값으로 갱신.") },
    { hi: [23, 26], bubble: t(E, "Range of photos holding this cow — that rectangle from the sim.", "이 소를 품는 사진들의 범위 — 시뮬의 그 직사각형.") },
    { hi: [28, 30], bubble: t(E, "Add delta to only those photos.", "그 사진들만 S 에 += delta.") },
    { hi: [31, 32], bubble: t(E, "A photo grew — lift cur_max if it beats it.", "사진이 커졌으니, 넘으면 cur_max 갱신.") },
    { hi: [34, 36], bubble: t(E, "Save the answer; print all at the end.", "답 저장; 마지막에 한 번에 출력.") },
  ] };
}

export function getPhotoshoot25Sections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E,
          "Each update touches only at most K x K windows (those whose K x K square covers the updated cell).",
          "각 업데이트는 최대 K x K 개 윈도우만 바뀜 (그 윈도우의 K x K 영역이 해당 칸을 덮을 때)."),
        t(E,
          "Beauty values only increase, so the global max is non-decreasing — just compare new window sums against cur_max.",
          "아름다움 값은 증가만 하므로 전체 최대값은 줄지 않음 — 새로 갱신된 윈도우 합만 cur_max 와 비교."),
        t(E,
          "Total work: Q * K^2 ≤ 30000 * 625 ≈ 2 x 10^7 operations — fast enough.",
          "총 연산량: Q * K^2 ≤ 30000 * 625 ≈ 2 x 10^7 — 충분히 빠름."),
      ],
      pyOnly: [
        t(E,
          "Even with sys.stdin.readline + collected output, Python is too slow here — it times out on the larger tests (12/18). Same algorithm; submit in C++ for full marks.",
          "sys.stdin.readline + 출력 모으기를 써도 Python 은 이 문제엔 느려서 큰 테스트에서 시간초과 (12/18). 알고리즘은 같고, 만점은 C++ 로 제출."),
      ],
      cppOnly: [
        t(E,
          "Window sums max 25*25 * 10^6 = 6.25 x 10^8, comfortably inside int.",
          "윈도우 합은 최대 25*25 * 10^6 = 6.25 x 10^8 으로 int 안에 들어감."),
      ],
    },
  ];
}

export function Photoshoot25ProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
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


export function downloadPhotoshoot25PDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Photoshoot (2025) — Full Study Guide", "포토슛 (2025) — 종합 풀이 노트");
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
  .hint { background: #f5f3ff; border: 1px solid #8b5cf6; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #5b21b6; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 선택.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO Dec 2025, Bronze #3 · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
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
