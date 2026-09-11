"use client";

/* Moo Hunt — 더 빠른 풀이 (usaco.org 공식 답안).
   출처: https://usaco.org/current/data/sol_prob2_bronze_season26contest2.html
         (Jan 2026 Bronze #2 = season26 second contest, cpid 1564)

   🔒 components.jsx 의 FULL_PY / FULL_CPP (USACO 채점기로 검증된 완전탐색) 는
   한 글자도 건드리지 않는다. 여기는 별도 파일이다.

   ⚠️ 이 코드의 채점기 제출은 아직 안 했다 — 점수를 적지 말 것.
      로컬 검증만 했다 (2026-09-04):
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
  "N, K = map(int, input().split())",
  "",
  "# 무브를 세어 둘 곳. 열쇠는 (M 자리, O 자리 작은 쪽, O 자리 큰 쪽) 세 개짜리 묶음이에요.",
  "# y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없어요 → 작은 쪽·큰 쪽으로 모아요.",
  "count = {}",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    x -= 1",
  "    y -= 1",
  "    z -= 1",
  "    key = (x, min(y, z), max(y, z))",
  "    count[key] = count.get(key, 0) + 1",
  "",
  "best = 0",
  "ways = 0",
  "for board in range(1 << N):",
  "",
  "    # 이 보드에서 M 자리와 O 자리를 갈라요",
  "    Ms = []",
  "    Os = []",
  "    for i in range(N):",
  "        if (board >> i) & 1:",
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
  "                score += count.get(key, 0)",
  "",
  "    if score > best:",
  "        best = score",
  "        ways = 1",
  "    elif score == best:",
  "        ways += 1",
  "",
  "print(best, ways)",
];

export const FAST_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <algorithm>",
  "using namespace std;",
  "",
  "int main() {",
  "    int n, k;",
  "    cin >> n >> k;",
  "",
  "    // isAt[x][a][b] = 'x 가 M, a 와 b 가 O' 일 때 득점하는 무브의 개수 (a < b)",
  "    vector<vector<vector<int>>> isAt(n, vector<vector<int>>(n, vector<int>(n, 0)));",
  "    for (int i = 0; i < k; i++) {",
  "        int x, y, z;",
  "        cin >> x >> y >> z;",
  "        x--;",
  "        y--;",
  "        z--;",
  "        isAt[x][min(y, z)][max(y, z)]++;",
  "    }",
  "",
  "    vector<int> score(1 << n, 0);",
  "    for (int msk = 0; msk < (1 << n); msk++) {",
  "        vector<int> mpos, opos;",
  "        for (int i = 0; i < n; i++) {",
  "            if ((msk >> i) & 1) mpos.push_back(i);",
  "            else                opos.push_back(i);",
  "        }",
  "        // 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐",
  "        for (int m : mpos)",
  "            for (int i = 0; i < (int)opos.size(); i++)",
  "                for (int j = i + 1; j < (int)opos.size(); j++)",
  "                    score[msk] += isAt[m][opos[i]][opos[j]];",
  "    }",
  "",
  "    int best = *max_element(score.begin(), score.end());",
  "    int ways = count(score.begin(), score.end(), best);",
  "    cout << best << ' ' << ways << '\\n';",
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
      { hi: [0, 7],   bubble: t(E, "Headers we need, then read N (cells) and K (moves).", "필요한 헤더를 적고, N (칸 수) 와 K (무브 수) 를 읽어요.") },
      { hi: [9, 18], bubble: t(E, "Store the moves in a table instead of a list.\nisAt[x][a][b] = how many moves need x to be M and a, b to be O.\nSince y and z both just need to be O, min/max puts (1,2,3) and (1,3,2) in the same slot.",
                                   "무브를 목록이 아니라 표에 담아요.\nisAt[x][a][b] = 'x 가 M, a 와 b 가 O' 여야 득점하는 무브 개수.\ny 와 z 는 둘 다 O 이기만 하면 되니, min/max 로 (1,2,3) 과 (1,3,2) 를 같은 칸에 넣어요.") },
      { hi: [20, 26], bubble: t(E, "For each board, split the cells: which are M, which are O.", "보드마다 칸을 갈라요 — 어디가 M 이고 어디가 O 인지.") },
      { hi: [27, 31], bubble: t(E, "Here is the whole point.\nOnly 'one M cell + two O cells' can ever score, so look at nothing else.\nAt N = 20 that is about 428 combinations instead of 6,840.",
                                   "여기가 핵심이에요.\n득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐이니 다른 건 안 봐요.\nN = 20 에서 6,840 개 대신 평균 428 개만 봐요.") },
      { hi: [34, 37], bubble: t(E, "Best score, and how many boards reach it.", "최고 점수와, 그 점수에 이르는 보드 개수.") },
    ] };
  }
  return { code: FAST_PY, vars: _FAST_VARS, beats: [
    { hi: [0, 0],   bubble: t(E, "Read N (cells) and K (moves).", "N (칸 수) 와 K (무브 수) 읽기.") },
    { hi: [2, 11],  bubble: t(E, "Count the moves once, into a dictionary.\nThe key is (M cell, smaller O cell, larger O cell).\nSince y and z both just need to be O, min/max puts (1,2,3) and (1,3,2) under the same key.",
                                 "무브를 딕셔너리에 한 번만 세어 넣어요.\n열쇠는 (M 자리, O 자리 작은 쪽, O 자리 큰 쪽) 이에요.\ny 와 z 는 둘 다 O 이기만 하면 되니, min/max 로 (1,2,3) 과 (1,3,2) 를 같은 열쇠에 넣어요.") },
    { hi: [13, 15], bubble: t(E, "Start best & ways, then take one board at a time.\nScores are never negative, so 0 is a safe starting best.",
                                 "best 와 ways 를 두고, 보드를 하나씩 봐요.\n점수는 0 보다 작을 수 없으니 best 를 0 에서 시작해도 돼요.") },
    { hi: [17, 24], bubble: t(E, "For each board, split the cells: which are M, which are O.",
                                 "보드마다 칸을 갈라요 — 어디가 M 이고 어디가 O 인지.") },
    { hi: [26, 32], bubble: t(E, "Here is the whole point.\nOnly 'one M cell + two O cells' can ever score, so look at nothing else.\nj starts after i, so Os[i] < Os[j] always — that matches the smaller/larger rule we used for the keys.\nAt N = 20 that is about 428 combinations instead of 6,840.",
                                 "여기가 핵심이에요.\n득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐이니 그것만 봐요.\nj 를 i 다음부터 세니까 Os[i] < Os[j] 가 늘 성립해요 — 아까 열쇠를 작은 쪽·큰 쪽으로 넣은 규칙과 맞아요.\nN = 20 이면 6,840개가 아니라 428개쯤만 봐요.") },
    { hi: [34, 38], bubble: t(E, "Best score, and how many boards reach it.", "최고 점수와, 그 점수에 이르는 보드 개수.") },
    { hi: [40, 40], bubble: t(E, "Print both — that is the answer.", "둘을 출력해요 — 그게 답이에요.") },
  ] };
}
