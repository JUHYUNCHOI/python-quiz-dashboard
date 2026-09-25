// 🔒 USACO_VERIFIED — re-submitted 2026-06-16 (C++17): AC 10/10 on cpid=1157
// 🔒 USACO_VERIFIED (corrected from archive 2026-06-14)
//   Python: passes official sample (T loop added; 4-state DP). USACO re-submit pending.
//   C++:    passes official sample (T loop + per-case memo reset; correct DP). USACO re-submit pending.
//   Fixed: added missing T test-case loop; replaced buggy ternary-prune C++ algo with clean memoized 4-state DP.
//   **2026-07-17 (선생님 "재귀는 힘들어"): 재귀 걷어내기 — 메모이제이션 재귀 dp() →
//     bottom-up 표 채우기(목표 오른아래에서 역방향). 4상태 dp[r][c][dir][changes] 동일 정의,
//     읽는 이웃(오른/아래)이 역순 덕에 이미 채워짐. 로컬: 이전 재귀본과 300+200 랜덤 격자
//     출력 동일, PY==CPP 교차, clang++ 컴파일. 알고리즘 동일 → USACO 재제출로 재확인 권장.**
//   코드 수정 시 USACO 재제출 필요 — REPO_ROOT/USACO_VERIFICATION.md 참고

import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

const FULL_PY = [
  "T = int(input())",
  "for _ in range(T):",
  "    N, K = map(int, input().split())",
  "    grid = []",
  "    for _ in range(N):",
  "        grid.append(input().strip())",
  "",
  "    # dp[r][c][direction][changes] = # of ways from (r, c) to home (N-1, N-1)",
  "    # direction: 0 = arrived moving right, 1 = arrived moving down, 2 = start",
  "    # Fill the table from home (bottom-right) BACKWARD — no recursion.",
  "    # Each cell only needs the cell to its right and the cell below,",
  "    # and those are already filled because we go in reverse order.",
  "    dp = [[[[0] * (K + 1) for _ in range(3)] for _ in range(N)] for _ in range(N)]",
  "",
  "    for r in range(N - 1, -1, -1):",
  "        for c in range(N - 1, -1, -1):",
  "            for direction in range(3):",
  "                for changes in range(K + 1):",
  "                    if r == N - 1 and c == N - 1:",
  "                        dp[r][c][direction][changes] = 1   # reached home",
  "                        continue",
  "                    total = 0",
  "                    # Move right",
  "                    if c + 1 < N and grid[r][c+1] != 'H':",
  "                        if direction == 1:",
  "                            nc = changes + 1",
  "                        else:",
  "                            nc = changes",
  "                        if nc <= K:",
  "                            total += dp[r][c+1][0][nc]",
  "                    # Move down",
  "                    if r + 1 < N and grid[r+1][c] != 'H':",
  "                        if direction == 0:",
  "                            nc = changes + 1",
  "                        else:",
  "                            nc = changes",
  "                        if nc <= K:",
  "                            total += dp[r+1][c][1][nc]",
  "                    dp[r][c][direction][changes] = total",
  "",
  "    print(dp[0][0][2][0])",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int N, K;",
  "vector<string> grid;",
  "// dp[r][c][direction][changes] = # of ways from (r, c) to home",
  "long long dp[50][50][3][4];",
  "",
  "// direction: 0 = arrived moving right, 1 = arrived moving down, 2 = start",
  "int main() {",
  "    int T;",
  "    cin >> T;",
  "    while (T--) {",
  "        cin >> N >> K;",
  "        grid.assign(N, \"\");",
  "        for (int i = 0; i < N; i++) {",
  "            cin >> grid[i];",
  "        }",
  "",
  "        // Fill the table from home (bottom-right) BACKWARD — no recursion.",
  "        // Right/down neighbours are already filled thanks to reverse order.",
  "        for (int r = N - 1; r >= 0; r--)",
  "        for (int c = N - 1; c >= 0; c--)",
  "        for (int direction = 0; direction < 3; direction++)",
  "        for (int changes = 0; changes <= K; changes++) {",
  "            if (r == N - 1 && c == N - 1) {",
  "                dp[r][c][direction][changes] = 1;   // reached home",
  "                continue;",
  "            }",
  "            long long total = 0;",
  "            // Move right",
  "            if (c + 1 < N && grid[r][c + 1] != 'H') {",
  "                int inc = 0;",
  "                if (direction == 1) {",
  "                    inc = 1;",
  "                }",
  "                int nc = changes + inc;",
  "                if (nc <= K) {",
  "                    total += dp[r][c + 1][0][nc];",
  "                }",
  "            }",
  "            // Move down",
  "            if (r + 1 < N && grid[r + 1][c] != 'H') {",
  "                int inc = 0;",
  "                if (direction == 0) {",
  "                    inc = 1;",
  "                }",
  "                int nc = changes + inc;",
  "                if (nc <= K) {",
  "                    total += dp[r + 1][c][1][nc];",
  "                }",
  "            }",
  "            dp[r][c][direction][changes] = total;",
  "        }",
  "        cout << dp[0][0][2][0] << \"\\n\";",
  "    }",
  "    return 0;",
  "}",
];

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ 아래는 위 FULL_PY/FULL_CPP 를 **그대로** 쓴다 — 배열 내용은 절대 바꾸지 않고,
   beats(설명 말풍선)만 덧붙인다. getWalkHomeSections() 는 PDF 다운로드가 계속 쓰므로
   그대로 둔다. ── */
export function getWalkHomeWalk(E, lang = "py") {
  if (lang === "cpp") {
    return {
      code: FULL_CPP,
      vars: [
        { v: "dp[r][c][direction][changes]", ko: "그 칸에서 집까지 남은 길의 수", en: "paths remaining from this cell to home" },
        { v: "direction", ko: "바로 전에 온 방향 (0=오른쪽,1=아래,2=시작)", en: "direction we just arrived from (0=right,1=down,2=start)" },
        { v: "changes", ko: "지금까지 방향을 바꾼 횟수", en: "direction changes used so far" },
      ],
      beats: [
        { hi: [5, 9], bubble: t(E,
          "Listing every path would be too slow. So dp[r][c][direction][changes] is declared globally up front — 'paths remaining from here to home'.",
          "길을 하나씩 세면 너무 느려요. 그래서 dp[r][c][방향][바꾼횟수] 표를 전역에 미리 만들어 둬요.\n'여기서 집까지 남은 길의 수' 예요.") },
        { hi: [11, 19], bubble: t(E,
          "For each case, read N, K, and the grid. K is the max number of direction changes allowed.",
          "케이스마다 N, K 와 격자를 읽어요. K 는 방향을 바꿀 수 있는 최대 횟수예요.") },
        { hi: [21, 30], bubble: t(E,
          "Fill the table backward from home using four nested loops — no recursion needed. Home itself has exactly 1 way, so set it to 1 right away.",
          "집(오른아래 끝)에서부터 거꾸로 네 겹 반복문으로 표를 채워요 — 재귀가 필요 없어요.\n집 칸 자신은 길이 1가지라 바로 1을 넣어요.") },
        { hi: [32, 42], bubble: t(E,
          "If moving right is possible, bump changes by one only when we just came from 'down', then add the already-filled right cell's value.",
          "오른쪽으로 갈 수 있으면, 바로 전 방향이 '아래' 였을 때만 changes 를 하나 늘려서\n오른쪽 칸(이미 채워짐)의 값을 더해요.") },
        { hi: [43, 54], bubble: t(E,
          "Do the same for moving down. The sum of both directions is this cell's answer (total).",
          "아래로 갈 수 있으면 똑같이 해요. 두 방향의 합이 이 칸의 답(total)이에요.") },
        { hi: [56, 59], bubble: t(E,
          "Once filled, print dp[0][0][start(2)][0].",
          "표를 다 채웠으면 dp[0][0][시작(2)][0] 을 출력해요.") },
      ],
    };
  }
  return {
    code: FULL_PY,
    vars: [
      { v: "dp[r][c][direction][changes]", ko: "그 칸에서 집까지 남은 길의 수", en: "paths remaining from this cell to home" },
      { v: "direction", ko: "바로 전에 온 방향 (0=오른쪽,1=아래,2=시작)", en: "direction we just arrived from (0=right,1=down,2=start)" },
      { v: "changes", ko: "지금까지 방향을 바꾼 횟수", en: "direction changes used so far" },
    ],
    beats: [
      { hi: [0, 5], bubble: t(E,
        "What should we output? The number of paths from start to home with at most K direction changes. Read N, K, and the grid for each case.",
        "무엇을 내놓아야 하나요? 출발점에서 집까지, 방향을 K 번까지만 바꿔 가는 길의 수예요.\n케이스마다 N, K 와 격자를 읽어요.") },
      { hi: [7, 12], bubble: t(E,
        "Listing every path would be too slow. So store 'how many paths remain from here' in a table dp[r][c][direction][changes] — we'll fill it backward, so no recursion is needed.",
        "길을 하나씩 다 세면 너무 느려요. 그래서 '여기서 집까지 남은 길의 수' 를 담을\ndp[r][c][방향][바꾼횟수] 표를 만들어요. 뒤에서부터 채울 거라 재귀가 필요 없어요.") },
      { hi: [14, 20], bubble: t(E,
        "Walk cells backward starting from home (bottom-right). Home itself has exactly 1 way (already there), so set it to 1 and move on.",
        "집(오른아래 끝)에서부터 거꾸로 칸을 훑어요.\n집 칸 자신은 길이 1가지(이미 도착)라 바로 1을 넣고 넘어가요.") },
      { hi: [21, 29], bubble: t(E,
        "If moving right is possible, bump changes by one only when we just came from 'down', then add that already-filled right cell's value.",
        "오른쪽으로 갈 수 있으면, 방향이 바로 전에 '아래'였다면 changes 를 하나 늘려서\n오른쪽 칸의 값을 더해요 — 그 칸은 이미 채워져 있어요.") },
      { hi: [30, 38], bubble: t(E,
        "Do the same for moving down. The sum of both directions is this cell's answer.",
        "아래로 갈 수 있으면 똑같이 해요. 두 방향의 합이 이 칸의 답이에요.") },
      { hi: [40, 40], bubble: t(E,
        "Once the table is filled, print dp[0][0][start][0] — the number of paths from the start to home.",
        "표를 다 채웠으면 dp[0][0][시작][0] 을 출력해요 — 출발점에서 집까지 가는 길의 수예요.") },
    ],
  };
}

export function getWalkHomeSections(E) {
  return [
    {
      label: t(E, "🎯 Solution Code", "🎯 풀이 코드"),
      color: A,
      py: FULL_PY, cpp: FULL_CPP,
      why: [
        t(E, "What should we output? The number of paths from start to home with at most K direction changes.",
            "무엇을 답으로 내야 하나요?\n출발지에서 집까지, 방향을 K 번까지만 바꿔 가는 길의 수예요."),
        t(E, "Listing every path would be too slow, so store 'how many paths remain from here' for each cell instead.",
            "길을 하나씩 다 세면 너무 느려서,\n칸마다 '여기서 집까지 남은 길의 수' 를 미리 저장해 둬요."),
        t(E, "That count depends on which direction we arrived from and how many changes we've used, so the table needs those two extra dimensions too.",
            "그런데 그 수는 '어느 방향으로 왔는지' 와 '지금까지 몇 번\n바꿨는지' 에 따라 달라서, dp[r][c][방향][바꾼횟수] 로 나눠 저장해요."),
        t(E, "Fill the table backward starting from home — the right and below cells are already done, so no recursion is needed.",
            "집(오른아래 끝)에서부터 거꾸로 채우면 오른쪽·아래 칸이\n이미 채워져 있어서, 재귀 없이 표만 보고 더할 수 있어요."),
      ],
      pyOnly: [
        t(E, "Python's map() makes the code shorter.",
            "Python 의 map() 을 쓰면 알고리즘이 짧아져요."),
      ],
      cppOnly: [
        t(E, "Use specific includes (<iostream>, <vector>, ...) — keeps code clear.",
            "필요한 헤더만 (<iostream>, <vector>, ...) 넣으면 코드가 무엇을 쓰는지 잘 보여요."),
        t(E, "Use long long when sums or products may exceed ~2×10^9.",
            "합이나 곱이 약 2×10^9 를 넘을 수 있으면 long long 을 써요."),
      ],
    },
  ];
}

export function WalkHomeProgressiveCode(props) {
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


export function downloadWalkHomePDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업 차단됨.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "WalkHome — Full Study Guide", "WalkHome — 종합 풀이 노트");
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
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

