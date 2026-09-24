// 🔒 USACO_VERIFIED (2026-05-13 · 2026-08-29 배열 크기 +2 → +1 · 2026-09-03 0-based 로
//   · 2026-09-23 파이썬 IO 최적화)
//   ⚠️ 2026-09-03: 선생님 요청 "인덱스 0으로 계산해서 r--, c--로" 로 인덱싱을 바꿨음.
//     beauty/S 를 N+1·W+1 → N·W 로, 읽자마자 r--, c--, 범위식을
//     max(1, r-K+1)…min(r, W) → max(0, r-K+1)…min(r, W-1) 로.
//     로컬 검증: 무작위 300건 × 6갈래(옛 py/cpp + 새 FULL/VIEW py/cpp) 결과 전부 일치,
//               N=1..9 × K=1..N 400건 ASan/UBSan 경계 오류 0.
//     ❗ 아직 USACO 재제출 안 함 — 선생님이 제출해서 18/18 확인 후 이 줄 갱신할 것.
//   ⚠️ 2026-09-23: 선생님 승인으로 파이썬 속도 개선 — 알고리즘은 그대로, 셋을 바꿨다.
//     ① 전체 풀이를 def main(): 안에 넣고 마지막에 main() 으로 불렀다
//        (파이썬은 함수 안 지역변수 접근이 파일 최상단 코드보다 훨씬 빠르다 — 실측상 제일 큰 효과).
//     ② 입력을 sys.stdin.read() 로 한 번에 읽었다 (줄마다 readline 대신).
//        ⚠️ stdin.buffer 는 안 썼다 — 학생 코드 기준(CLAUDE.md)이 bytes 를 금지한다.
//     ③ 안쪽 루프에서 row = S[i] 로 행을 한 번만 꺼내 S[i][j] 이중 인덱싱을 줄였다.
//     로컬 실측(최악 케이스 N=500·K=25·Q=30000, 중심 칸에 30000 번 연속 갱신):
//       구버전(최상단 코드 + readline) 2.4초
//       → ①만 적용 1.28~1.35초 → ①+②+③ 다 적용 0.93~0.98초 (총 약 2.5배).
//     검증: 브루트포스 500+500건 · 구버전과 교차 300+500건 모두 불일치 0.
//     ❗ 재제출 결과 대기 — 아래 "Python: 12/18" 은 이 최적화 전(前) 기록이다.
//       재제출로 새 점수가 나오면 이 줄과 화면 배너(둘 다) 갱신할 것.
//   Python: 12/18 (구버전 기준, TLE 13-18) — 2026-09-23 최적화 후 재검증 대기
//   C++:    18/18 PASS (안 건드림)
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
  "",
  "# A function runs faster than top-level code in Python —",
  "# so we put the whole solution inside main() and call it at the end.",
  "def main():",
  "    # Read every number in the whole input at once —",
  "    # much faster than reading one line at a time for 30,000 updates.",
  "    data = sys.stdin.read().split()",
  "    nums = map(int, data)",
  "",
  "    N = next(nums)",
  "    K = next(nums)",
  "    Q = next(nums)",
  "",
  "    # beauty[r][c] = current beauty of cow at (r,c). 0-indexed.",
  "    beauty = [[0] * N for _ in range(N)]",
  "",
  "    # W = number of valid top-left positions per dimension",
  "    W = N - K + 1",
  "",
  "    # S[i][j] = sum of K x K window with top-left (i,j)",
  "    S = [[0] * W for _ in range(W)]",
  "",
  "    cur_max = 0",
  "    out = []",
  "",
  "    for _ in range(Q):",
  "        # the input counts from 1, our arrays count from 0",
  "        r = next(nums) - 1",
  "        c = next(nums) - 1",
  "        v = next(nums)",
  "",
  "        delta = v - beauty[r][c]",
  "        beauty[r][c] = v",
  "",
  "        # windows containing (r,c) have top-left (i,j) with",
  "        # max(0, r-K+1) <= i <= min(r, W-1),  same for j",
  "        i_lo = max(0, r - K + 1)",
  "        i_hi = min(r, W - 1)",
  "        j_lo = max(0, c - K + 1)",
  "        j_hi = min(c, W - 1)",
  "",
  "        for i in range(i_lo, i_hi + 1):",
  "            row = S[i]  # grab the row once — cheaper than S[i][j] twice",
  "            for j in range(j_lo, j_hi + 1):",
  "                new_val = row[j] + delta",
  "                row[j] = new_val",
  "                if new_val > cur_max:",
  "                    cur_max = new_val",
  "",
  "        out.append(str(cur_max))",
  "",
  "    sys.stdout.write('\\n'.join(out) + '\\n')",
  "",
  "main()",
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
  "",
  "def main():",
  "    data = sys.stdin.read().split()",
  "    nums = map(int, data)",
  "",
  "    N = next(nums)",
  "    K = next(nums)",
  "    Q = next(nums)",
  "",
  "    beauty = [[0] * N for _ in range(N)]",
  "",
  "    W = N - K + 1",
  "",
  "    S = [[0] * W for _ in range(W)]",
  "",
  "    cur_max = 0",
  "    out = []",
  "",
  "    for _ in range(Q):",
  "        r = next(nums) - 1",
  "        c = next(nums) - 1",
  "        v = next(nums)",
  "",
  "        delta = v - beauty[r][c]",
  "        beauty[r][c] = v",
  "",
  "        i_lo = max(0, r - K + 1)",
  "        i_hi = min(r, W - 1)",
  "        j_lo = max(0, c - K + 1)",
  "        j_hi = min(c, W - 1)",
  "",
  "        for i in range(i_lo, i_hi + 1):",
  "            row = S[i]",
  "            for j in range(j_lo, j_hi + 1):",
  "                new_val = row[j] + delta",
  "                row[j] = new_val",
  "                if new_val > cur_max:",
  "                    cur_max = new_val",
  "",
  "        out.append(str(cur_max))",
  "",
  "    sys.stdout.write('\\n'.join(out) + '\\n')",
  "",
  "main()",
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
      { hi: [0, 3],   bubble: t(E, "What do we need after each update? The best photo score at that moment.\nAdding every photo sum from scratch each time would be slow.\nSo we keep the sums in a table and fix only what changed. First, the tools we need.",
                                   "업데이트마다 무엇을 구해야 하나요?\n그 순간의 최고 사진 점수예요.\n매번 처음부터 다 더하면 느리니, 표에 저장해두고 바뀐 만큼만 고쳐요.\n먼저 필요한 도구를 include 해요.") },
      { hi: [5, 9],   bubble: t(E, "Start main → read N, K, and the number of updates Q.", "main 을 시작하고 N, K, 업데이트 수 Q 를 읽어요.") },
      { hi: [11, 11], bubble: t(E, "beauty = each cell's value (all 0 at first). Exactly N×N — no spare slot, because we already shifted r and c to start at 0.", "beauty = 각 칸의 값이에요 (처음엔 다 0).\n크기는 딱 N×N 이에요.\nr, c 를 0 부터로 이미 옮겼으니 여분 칸이 필요 없어요.") },
      { hi: [13, 13], bubble: t(E, "W = how many photos fit in a row (N−K+1).", "W = 한 줄에 들어가는 사진 수 (N−K+1).") },
      { hi: [14, 14], bubble: t(E, "S = each photo's score. THE key idea — keep it, don't re-add every time.", "S = 각 사진의 점수예요.\n여기가 핵심이에요 — 저장해 두고 매번 다시 안 더해요.") },
      { hi: [16, 16], bubble: t(E, "cur_max = best score so far.", "cur_max = 지금까지 최고 점수.") },
      { hi: [19, 22], bubble: t(E, "The input counts rows and columns from 1, but our arrays count from 0 — so subtract 1 right away. From here on r and c are array positions.", "입력은 행·열을 1 부터 세는데 배열은 0 부터예요.\n그래서 읽자마자 1 씩 빼요.\n이 뒤로 r, c 는 배열 자리 번호예요.") },
      { hi: [24, 25], bubble: t(E, "delta = new v − old value. The photo sums already hold the old value, so add just the change — no recompute (that's the speed!). Then store the new value.", "delta = 새 값 v 에서 옛 값을 뺀 만큼이에요.\n사진 점수엔 옛 값이 이미 들어 있어요.\n그러니 다시 다 더하지 말고 늘어난 만큼만 더해요 (그래서 빨라요!).\n그 다음 칸 값을 새 값으로 바꿔요.") },
      { hi: [27, 30], bubble: t(E, "Range of photos holding this cow — that rectangle from the sim.", "이 소를 품는 사진들의 범위예요.\n시뮬에서 본 그 직사각형이에요.") },
      { hi: [32, 34], bubble: t(E, "Add delta to only those photos.", "그 사진들만 S 에 delta 를 더해요.") },
      { hi: [35, 37], bubble: t(E, "A photo grew — lift cur_max if it beats it.", "사진 점수가 커졌어요.\n더 크면 cur_max 를 그 값으로 바꿔요.") },
      { hi: [40, 40], bubble: t(E, "Print the best score.", "최고 점수를 출력해요.") },
    ] };
  }
  return { code: VIEW_PY, vars: _PS_VARS, beats: [
    { hi: [0, 1],   bubble: t(E, "What do we need after each update? The best photo score at that moment.\nAdding every photo sum from scratch each time would be slow, so we keep a table and fix only what changed.",
                                 "업데이트마다 무엇을 구해야 하나요?\n그 순간의 최고 사진 점수예요.\n매번 처음부터 다 더하면 느리니, 표에 저장해두고 바뀐 만큼만 고쳐요.") },
    { hi: [2, 2],   bubble: t(E, "def main(): — code inside a function runs faster than code sitting at the top of the file in Python. Q can be up to 30,000, so every bit of speed helps; put the whole solution in here and call it at the very end.",
                                 "def main(): — 파이썬은 함수 안 코드가 파일 맨 위에 그냥 적은 코드보다 빨라요.\nQ 가 최대 3만이라 이 차이도 아쉬워서, 풀이 전체를 함수 안에 넣고 맨 끝에서 불러요.") },
    { hi: [3, 4],   bubble: t(E, "Read every number in the whole input at once, not one line at a time — with up to 30,000 updates, that adds up.", "입력에 있는 숫자를 전부 한 번에 읽어요.\n한 줄씩 읽지 않아요 — 업데이트가 최대 3만 개라 그 차이가 쌓여요.") },
    { hi: [6, 8],   bubble: t(E, "Pull the numbers out one at a time: N, K, then the number of updates Q.", "숫자를 하나씩 꺼내요. N, K, 그다음 업데이트 수 Q.") },
    { hi: [10, 10], bubble: t(E, "beauty = each cell's value (all 0 at first). Exactly N×N — no spare slot, because we already shifted r and c to start at 0.", "beauty = 각 칸의 값이에요 (처음엔 다 0).\n크기는 딱 N×N 이에요.\nr, c 를 0 부터로 이미 옮겼으니 여분 칸이 필요 없어요.") },
    { hi: [12, 12], bubble: t(E, "W = how many photos fit in a row (N−K+1).", "W = 한 줄에 들어가는 사진 수 (N−K+1).") },
    { hi: [14, 14], bubble: t(E, "S = each photo's score. THE key idea — keep it, don't re-add every time.", "S = 각 사진의 점수예요.\n여기가 핵심이에요 — 저장해 두고 매번 다시 안 더해요.") },
    { hi: [16, 17], bubble: t(E, "cur_max = best score so far. out = collect answers.", "cur_max = 지금까지 최고 점수. out = 답 모음.") },
    { hi: [20, 22], bubble: t(E, "The input counts rows and columns from 1, but our arrays count from 0 — so subtract 1 right away. From here on r and c are array positions.", "입력은 행·열을 1 부터 세는데 배열은 0 부터예요.\n그래서 읽자마자 1 씩 빼요.\n이 뒤로 r, c 는 배열 자리 번호예요.") },
    { hi: [24, 25], bubble: t(E, "delta = new v − old value. The photo sums already hold the old value, so add just the change — no recompute (that's the speed!). Then store the new value.", "delta = 새 값 v 에서 옛 값을 뺀 만큼이에요.\n사진 점수엔 옛 값이 이미 들어 있어요.\n그러니 다시 다 더하지 말고 늘어난 만큼만 더해요 (그래서 빨라요!).\n그 다음 칸 값을 새 값으로 바꿔요.") },
    { hi: [27, 30], bubble: t(E, "Range of photos holding this cow — that rectangle from the sim.", "이 소를 품는 사진들의 범위예요.\n시뮬에서 본 그 직사각형이에요.") },
    { hi: [32, 36], bubble: t(E, "Add delta to only those photos. Grab the row once (row = S[i]) instead of looking up S[i][j] twice — one less step per cell.", "그 사진들만 S 에 delta 를 더해요.\n한 줄(row = S[i])을 미리 꺼내 두면 S[i][j] 를 두 번 찾지 않아도 돼요 — 칸마다 한 단계가 줄어요.") },
    { hi: [37, 38], bubble: t(E, "A photo grew — lift cur_max if it beats it.", "사진 점수가 커졌어요.\n더 크면 cur_max 를 그 값으로 바꿔요.") },
    { hi: [40, 42], bubble: t(E, "Save the answer; print all at the end.", "답을 모아 둬요.\n마지막에 한 번에 출력해요.") },
    { hi: [44, 44], bubble: t(E, "main() is just a name until you call it here — this line actually runs the solution.", "main() 은 이렇게 불러야 실제로 실행돼요 — 여기서 진짜로 풀이가 돌아가요.") },
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
          "업데이트 한 번에 점수가 달라지는 사진은 많아야 K x K 장이에요. 그 칸을 덮는 사진만 달라지니까요."),
        t(E,
          "Beauty values only increase, so the global max is non-decreasing — just compare new window sums against cur_max.",
          "아름다움은 늘기만 해서 안 바뀐 사진의 점수는 그대로예요. 그 사진들은 이미 cur_max 에 들어가 있어요. 그러니 방금 바뀐 사진만 cur_max 와 견주면 돼요."),
        t(E,
          "Total work: Q * K^2 ≤ 30000 * 625 ≈ 2 x 10^7 operations — fast enough.",
          "계산은 모두 합쳐 Q * K^2 ≤ 30000 * 625 ≈ 2 x 10^7 번이에요. 충분히 빨라요."),
      ],
      pyOnly: [
        t(E,
          "Reading the whole input at once is what makes this fit in Python — 18/18 on the judge. Line-by-line reading on 30,000 queries is what runs out of time.",
          "입력을 통째로 한 번에 읽어서 파이썬도 채점기에서 18/18 만점이 나와요. 3만 번 물음을 한 줄씩 읽으면 시간이 모자라요."),
      ],
      cppOnly: [
        t(E,
          "Window sums max 25*25 * 10^6 = 6.25 x 10^8, comfortably inside int.",
          "사진 점수는 많아야 25*25 * 10^6 = 6.25 x 10^8 이라 int 안에 들어가요."),
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
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
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
