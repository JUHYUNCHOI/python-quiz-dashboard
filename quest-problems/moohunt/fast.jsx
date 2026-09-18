"use client";

/* Moo Hunt — 더 빠른 풀이 (usaco.org 공식 답안).
   출처: https://usaco.org/current/data/sol_prob2_bronze_season26contest2.html
         (Jan 2026 Bronze #2 = season26 second contest, cpid 1564)

   🔒 components.jsx 의 FULL_PY / FULL_CPP (USACO 채점기로 검증된 완전탐색) 는
   한 글자도 건드리지 않는다. 여기는 별도 파일이다.

   ✅ 2026-09-11 **선생님이 USACO 채점기에 직접 제출해 C++ 통과**를 확인했다.
      제출한 실물은 docs/usaco-submit/moohunt-nobit.cpp · .py 다 (이 파일과 로직 동일).
      ⚠️ 파이썬은 제출해도 안 된다 — 공식도 만점 파이썬 답안이 없다. 아래 실측 참고.

   ⚠️ 2026-09-12 실측 (지금 실린 **비트 없는** 코드, N=20·K=20만, cpp-qa):
        C++ **1.49초** (제한 2초) · Python **104초** (제한 4초)
      USACO_VERIFICATION.md 는 다른 기계에서 C++ 1.43~1.44초. 기계마다 갈린다.
      ⚠️ **아래 16~32줄의 숫자들은 비트를 쓰던 옛 판본을 잰 값이다.** 지금 코드가 아니다.
         화면(chapters.jsx 정직 배너)에 그중 하나(1.96초)가 새어 나가 있었고 2026-09-12 에 고쳤다.
         옛 값을 지우지 않고 남기는 이유는 "비트를 걷어내니 오히려 빨라졌다" 는 판단의 근거이기 때문이다.
         **화면에 옮길 때는 반드시 위의 오늘 실측을 써라.**

      로컬 검증 (2026-09-04):
        · 진짜 샘플 "5 6 ..." → 4 2  (파이썬·C++ 둘 다)
        · 무작위 300 케이스를 완전탐색과 대조 → 불일치 0 (파이썬)
        · 무작위 200 케이스 대조 → 불일치 0 (C++)
        · N=12/14/16 에서 완전탐색 대비 13~22배 빠름 (파이썬 실측)
        ⚠️ 2026-09-11 최대 크기(N=20·K=20만)로 공식 답안과 나란히 쟀다. 답은 여섯 개 전부 32496 1:
             공식 Subtask 893초 · 우리 느린 코드 905초   (같은 모양이라 같은 속도)
             공식 Full 1  1.50초 · 우리 빠른 C++ 1.48초  (동일 알고리즘, 제한 2초에 아슬아슬)
             공식 Full 2  1.26초 ← **우리에겐 없는 풀이.** MSB 를 뒤집어 앞 결과를 물려받는다
                                   (score[msk] = score[msk ^ (1<<msb)] + 보정).
                                   여유가 더 필요하면 이걸 가져와야 한다.
             우리 빠른 파이썬 63.9초 (제한 4초)
        ⚠️ 2026-09-11 재작성: 파이썬의 isAt 3차원 리스트를 **딕셔너리**로 바꿨다.
          이유: 2·3차원 리스트를 가르치는 레슨이 **0개**인데 딕셔너리는 13개다.
          학생이 정확히 그 자리에서 그만뒀다 — "isAt[x][a][b] 나오자마자 '나 혼자 못 짜겠다'".
          값: 66.0초 → 95.7초. **둘 다 제한 4초를 한참 넘어 어차피 만점이 안 되는 자리**라 손해가 없다.
          C++ 은 그대로 둔다 — 2초 제한에 얇고 공식 답안과 일치가 이미 검증됐다.
          언어별로 자료구조가 다른 건 cowphotos 선례가 있다(py=Counter / cpp=vector).
        ⚠️ 작은 N 에서 잰 값으로는 그 결론이 뒤집힌다 — N=20·K=20만에서
          FAST_PY **69.4초** (제한 4초, 17배 초과) · FAST_CPP **1.96초** (제한 2초, 아슬아슬).
          작은 N 에서 '몇 배 빠름' 은 통과를 뜻하지 않는다. 2^N 이 지수로 커지기 때문이다.
          그래서 파이썬 쪽에 정직 배너를 달았다 (chapters.jsx, photoshoot25 와 같은 모양).

   ⚠️ 2026-09-13 C++ 표를 **3차원 → 2차원**으로 바꿨다. 선생님: "c++은 3차배열이네.
      3차배열 안쓰고 map을 사용하면 안되는거야?" · "2차배열도 된다면서 왜 3차배열로 되어 있지?"
      정직한 답: **공식 답안이 3차원이라 그대로 옮겼고, 재보지 않았다.** 파이썬은 9/11 에
      "2·3차원 리스트를 가르치는 레슨이 0개" 라서 딕셔너리로 바꿨는데, C++ 은 "2초 제한에
      얇다" 는 이유로 그대로 뒀다 — **그 '얇다' 를 잰 적이 없다.**
      실측(N=20 · K=20만 · 제한 2초):
        2차원 배열 1.45초 · 1차원 배열 1.43초 · 3차원 배열 1.51초
        unordered_map 5.35초 ✗ · map 16.57초 ✗
      map 은 왜 느린가 — 표를 찾는 횟수가 **4억 4천만 번**이라 한 번의 비용이 그대로 총 시간이 된다.
        배열 3.2ns · unordered_map 11.9ns · map 37ns.
        배열은 번호를 계산해 바로 가고(8000칸 = 31KB 라 CPU 캐시에 통째로 들어간다),
        map 은 흩어진 노드를 12번쯤 따라간다.
      2차원을 고른 이유: **cpp-21 에서 2차원 배열을 가르친다**(3차원은 0개). 속도도 같고,
      시뮬이 이미 "M 자리마다 표 하나씩" 이라고 말해서 그림과도 맞는다.
      ✅ 2026-09-13 **선생님이 이 2차원 판본을 제출해 다시 통과**시켰다.
         제출본 = docs/usaco-submit/moohunt-2d.cpp (이 파일의 FAST_CPP 를 그대로 뽑은 것).
         3차원 판본(moohunt-nobit.cpp, 9/11 통과)도 기록으로 남겨둔다 — 두 판본은 400건 완전 일치.

   핵심 두 가지:
     ① y 와 z 는 둘 다 O 이기만 하면 되니 순서가 상관없다 → min/max 로 묶는다
     ② 보드가 정해지면 M 자리와 O 자리가 갈린다.
        득점할 수 있는 건 "M 하나 + O 둘" 조합뿐이니 그것만 본다
        (N=20 에서 보드당 6,840 → 평균 428) */

/* ⚠️ beats 의 hi 는 **0부터 세는 배열 인덱스**다. 화면에 보이는 줄 번호는 +1 이다.
   2026-09-07: 여기 다섯 개가 전부 1부터 세어 적혀 있어서 한 줄씩 밀려 있었다.
   첫 말풍선이 "N 과 K 읽기" 인데 밝아진 줄은 그 아래 **빈 줄**이었고, N 과 K 를 읽는
   진짜 줄은 자동 스크롤 위로 밀려 화면 밖이었다. 나머지 넷도 다 한 줄씩 밀렸다.
   components.jsx 의 완전탐색 walk 은 처음부터 0부터 세어 적혀 있어 멀쩡했다. */
import { t } from "@/components/quest/theme";

export const FAST_PY = [
  "import sys",
  "from collections import defaultdict",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "",
  "# 무브를 세어 둘 곳. 없던 열쇠를 물으면 0 부터 시작해요.",
  "count = defaultdict(int)",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    x -= 1",
  "    y -= 1",
  "    z -= 1",
  "    key = (x, min(y, z), max(y, z))",
  "    count[key] += 1",
  "",
  "# 보드는 리스트로 나타내요. 1 이면 M, 0 이면 O.",
  "board = [0] * N",
  "",
  "best = 0",
  "ways = 0",
  "while True:",
  "",
  "    # 이 보드에서 M 자리와 O 자리를 갈라요",
  "    Ms = []",
  "    Os = []",
  "    for i in range(N):",
  "        if board[i] == 1:",
  "            Ms.append(i)",
  "        else:",
  "            Os.append(i)",
  "",
  "    # 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이에요",
  "    score = 0",
  "    for m in Ms:",
  "        for i in range(len(Os)):",
  "            for j in range(i + 1, len(Os)):",
  "                key = (m, Os[i], Os[j])",
  "                score += count[key]",
  "",
  "    if score > best:",
  "        best = score",
  "        ways = 1",
  "    elif score == best:",
  "        ways += 1",
  "",
  "    # 다음 보드로 넘어가요 — 1번 칸이 일의 자리, 거기에 1 을 더해요.",
  "    # 1번 칸부터 M(1) 이면 O(0) 로 되돌리며 뒤로 가고,",
  "    # O(0) 를 만나면 그 자리를 M(1) 로 바꾸고 멈춰요.",
  "    i = 0",
  "    while i < N and board[i] == 1:",
  "        board[i] = 0",
  "        i += 1",
  "    if i == N:",
  "        break",
  "    board[i] = 1",
  "",
  "print(best, ways)",
];

export const FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "",
  "    // 표 한 줄 = M 자리 하나. 그 안은 O 짝을 번호 하나로 합쳐서 넣어요.",
  "    // 두 칸을 번호 하나로: 작은 쪽 * N + 큰 쪽",
  "    // y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없다 → 작은 쪽·큰 쪽으로 모은다",
  "    vector<vector<int>> count(N, vector<int>(N * N, 0));",
  "    for (int i = 0; i < K; i++) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "        x--;",
  "        y--;",
  "        z--;",
  "        count[x][min(y, z) * N + max(y, z)] += 1;",
  "    }",
  "",
  "    // 보드는 리스트로 나타내요. 1 이면 M, 0 이면 O.",
  "    vector<int> board(N, 0);",
  "",
  "    int best = 0;",
  "    int ways = 0;",
  "    while (true) {",
  "",
  "        // 이 보드에서 M 자리와 O 자리를 가른다",
  "        vector<int> Ms, Os;",
  "        for (int i = 0; i < N; i++) {",
  "            if (board[i] == 1) {",
  "                Ms.push_back(i);",
  "            } else {",
  "                Os.push_back(i);",
  "            }",
  "        }",
  "",
  "        // 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이다",
  "        int score = 0;",
  "        for (int a = 0; a < (int)Ms.size(); a++) {",
  "            for (int i = 0; i < (int)Os.size(); i++) {",
  "                for (int j = i + 1; j < (int)Os.size(); j++) {",
  "                    score += count[Ms[a]][Os[i] * N + Os[j]];",
  "                }",
  "            }",
  "        }",
  "",
  "        if (score > best) {",
  "            best = score;",
  "            ways = 1;",
  "        } else if (score == best) {",
  "            ways++;",
  "        }",
  "",
  "        // 다음 보드로 넘어가요 — 1번 칸이 일의 자리, 거기에 1 을 더해요.",
  "        int i = 0;",
  "        while (i < N && board[i] == 1) {",
  "            board[i] = 0;",
  "            i++;",
  "        }",
  "        if (i == N) {",
  "            break;",
  "        }",
  "        board[i] = 1;",
  "    }",
  "",
  "    cout << best << \" \" << ways << \"\\n\";",
  "    return 0;",
  "}",
];

const _FAST_VARS = [
  { v: "N", ko: "칸 수", en: "cells" },
  { v: "K", ko: "무브 수", en: "moves" },
  { v: "count", ko: "x 가 M, a·b 가 O 면 득점하는 무브 개수", en: "moves scoring when x is M and a,b are O" },
  { v: "Ms / Os", ko: "이 보드에서 M 인 칸 / O 인 칸", en: "M cells / O cells of this board" },
];

export function getMooHuntFastWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FAST_CPP, vars: _FAST_VARS, beats: [
      { hi: [0, 6],   bubble: t(E, "Headers we need, then read N (cells) and K (moves).", "필요한 헤더를 적고, N (칸 수) 와 K (무브 수) 를 읽어요.") },
      { hi: [8, 18],  bubble: t(E, "This is the table you built a page ago.\nThe same table as a page ago — that cell was slot **7** in the array.\nTwo cells into one number: smaller * N + larger.",
                                   "앞 쪽에서 만든 그 표예요.\n무브를 여기에 한 번만 세어 넣어요.\n앞 쪽 표 그대로예요 — 거기서 본 그 칸이 배열에선 **7번**이었죠.\n두 칸은 번호 하나로 합쳐요. 작은 쪽 * N + 큰 쪽 이에요.") },
      { hi: [20, 25], bubble: t(E, "The board is just a list: 1 means M, 0 means O. Start from all O.", "보드는 그냥 리스트예요 — 1 이면 M, 0 이면 O. 전부 O 에서 시작해요.") },
      { hi: [26, 35], bubble: t(E, "For this board, split the cells: which are M, which are O.", "이 보드에서 칸을 갈라요 — 어디가 M 이고 어디가 O 인지.") },
      { hi: [36, 45], bubble: t(E, "Here is the whole point.\nOnly 'one M cell + two O cells' can ever score, so look at nothing else.\nOs was filled from cell 1 upward, so earlier entries are always smaller cells.\nj starts after i, so Os[i] is the smaller one — matching the smaller-first rule we used for the keys.",
                                   "여기가 핵심이에요.\n득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐이니 그것만 봐요.\nOs 는 1번 칸부터 차례로 담았으니 앞쪽이 늘 더 작은 자리예요.\nj 를 i 다음부터 고르면 Os[i] 가 작은 쪽 — 표에 넣을 때 정한 '작은 쪽 먼저' 와 저절로 맞아요.") },
      { hi: [46, 52], bubble: t(E, "Best score, and how many boards reach it.", "최고 점수와, 그 점수에 이르는 보드 개수.") },
      { hi: [54, 64], bubble: t(E, "Move to the next board — cell 1 is the ones place, so add 1 there.\nFrom cell 1 on: turn every M back to O until you meet an O, then make that one an M.",
                                   "다음 보드로 넘어가요 — 1번 칸이 일의 자리, 거기에 1 을 더해요.\n앞에서부터 M 이면 O 로 되돌리다가, O 를 만나면 그 자리를 M 으로 바꿔요.") },
      { hi: [66, 68], bubble: t(E, "Print both — that is the answer.", "둘을 출력해요 — 그게 답이에요.") },
    ] };
  }
  return { code: FAST_PY, vars: _FAST_VARS, beats: [
    { hi: [0, 4],   bubble: t(E, "Read N (cells) and K (moves).", "N (칸 수) 와 K (무브 수) 를 읽어요.") },
    { hi: [6, 14],  bubble: t(E, "The table from the last page — count in the code.\nThe key is (M cell, smaller O cell, larger O cell).\ny and z just need to be O, so min/max puts them in one key.",
                                 "앞 쪽에서 만든 그 표예요. 코드에서는 count 예요.\n열쇠는 (M 자리, 작은 O 자리, 큰 O 자리) 예요.\ny 와 z 는 둘 다 O 면 되니까 작은 쪽·큰 쪽으로 모아요.") },
    { hi: [16, 21], bubble: t(E, "The board is a list: 1 means M, 0 means O.\nStart from all O and walk every board.",
                                 "보드는 리스트예요. 1 이면 M, 0 이면 O.\n전부 O 에서 시작해서 모든 보드를 훑어요.") },
    { hi: [22, 30], bubble: t(E, "For this board, split the cells: which are M, which are O.",
                                 "이 보드에서 칸을 갈라요 — 어디가 M 이고 어디가 O 인지.") },
    { hi: [31, 38], bubble: t(E, "Here is the whole point.\nOnly 'one M cell + two O cells' can score, so look at nothing else.\nOs is filled in order, so Os[i] is always the smaller cell.\ncount is a defaultdict — asking for a missing key gives 0.",
                                 "여기가 핵심이에요.\n득점하는 건 'M 한 자리 + O 두 자리' 뿐이라 그것만 봐요.\nOs 는 차례로 담아서 Os[i] 가 늘 작은 자리예요.\ncount 는 defaultdict 라 없는 열쇠를 물으면 0 이 나와요.") },
    { hi: [40, 44], bubble: t(E, "Best score, and how many boards reach it.", "최고 점수와, 그 점수에 이르는 보드 개수.") },
    { hi: [46, 55], bubble: t(E, "Move to the next board — cell 1 is the ones place, so add 1 there.\nFrom cell 1 on: turn every M back to O until you meet an O, then make that one an M.\nWhen every cell was M there is nothing left — stop.",
                                 "다음 보드로 넘어가요 — 1번 칸이 일의 자리, 거기에 1 을 더해요.\n앞에서부터 M 이면 O 로 되돌리다가, O 를 만나면 그 자리를 M 으로 바꿔요.\n전부 M 이었다면 더 갈 데가 없으니 멈춰요.") },
    { hi: [57, 57], bubble: t(E, "Print both — that is the answer.", "둘을 출력해요 — 그게 답이에요.") },
  ] };
}
