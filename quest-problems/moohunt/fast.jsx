"use client";

/* Moo Hunt — 더 빠른 풀이 (usaco.org 공식 답안).
   출처: https://usaco.org/current/data/sol_prob2_bronze_season26contest2.html
         (Feb 2026 Bronze #2, cpid 1564)

   🔒 components.jsx 의 FULL_PY / FULL_CPP (USACO 채점기로 검증된 완전탐색) 는
   한 글자도 건드리지 않는다. 여기는 별도 파일이다.

   ⚠️ 이 코드의 채점기 제출은 아직 안 했다 — 점수를 적지 말 것.
      로컬 검증만 했다 (2026-09-04):
        · 진짜 샘플 "5 6 ..." → 4 2  (파이썬·C++ 둘 다)
        · 무작위 300 케이스를 완전탐색과 대조 → 불일치 0 (파이썬)
        · 무작위 200 케이스 대조 → 불일치 0 (C++)
        · N=12/14/16 에서 완전탐색 대비 13~22배 빠름 (파이썬 실측)

   핵심 두 가지:
     ① y 와 z 는 둘 다 O 이기만 하면 되니 순서가 상관없다 → min/max 로 묶는다
     ② 보드가 정해지면 M 자리와 O 자리가 갈린다.
        득점할 수 있는 건 "M 하나 + O 둘" 조합뿐이니 그것만 본다
        (N=20 에서 보드당 6,840 → 평균 428) */

import { t } from "@/components/quest/theme";

export const FAST_PY = [
  "N, K = map(int, input().split())",
  "",
  "# isAt[x][a][b] = 'x 가 M, a 와 b 가 O' 일 때 득점하는 무브의 개수 (a < b)",
  "# y 와 z 는 둘 다 O 이기만 하면 되니 순서는 상관없어요 → 작은 쪽·큰 쪽으로 묶어요",
  "isAt = [[[0] * N for _ in range(N)] for _ in range(N)]",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    x -= 1",
  "    y -= 1",
  "    z -= 1",
  "    isAt[x][min(y, z)][max(y, z)] += 1",
  "",
  "best = -1",
  "ways = 0",
  "for b in range(1 << N):",
  "    Ms = [i for i in range(N) if (b >> i) & 1]",
  "    Os = [i for i in range(N) if not (b >> i) & 1]",
  "",
  "    # 득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 조합뿐이에요",
  "    score = 0",
  "    for m in Ms:",
  "        for i in range(len(Os)):",
  "            for j in range(i + 1, len(Os)):",
  "                score += isAt[m][Os[i]][Os[j]]",
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
  "        x--; y--; z--;",
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
  { v: "isAt", ko: "x 가 M, a·b 가 O 면 득점하는 무브 개수", en: "moves scoring when x is M and a,b are O" },
  { v: "Ms / Os", ko: "이 보드에서 M 인 칸 / O 인 칸", en: "M cells / O cells of this board" },
];

export function getMooHuntFastWalk(E, lang = "py") {
  if (lang === "cpp") {
    return { code: FAST_CPP, vars: _FAST_VARS, beats: [
      { hi: [7, 8],   bubble: t(E, "Read N (cells) and K (moves).", "N (칸 수) 와 K (무브 수) 읽기.") },
      { hi: [10, 17], bubble: t(E, "Store the moves in a table instead of a list.\nisAt[x][a][b] = how many moves need x to be M and a, b to be O.\nSince y and z both just need to be O, min/max puts (1,2,3) and (1,3,2) in the same slot.",
                                   "무브를 목록이 아니라 표에 담아요.\nisAt[x][a][b] = 'x 가 M, a 와 b 가 O' 여야 득점하는 무브 개수.\ny 와 z 는 둘 다 O 이기만 하면 되니, min/max 로 (1,2,3) 과 (1,3,2) 를 같은 칸에 넣어요.") },
      { hi: [19, 25], bubble: t(E, "For each board, split the cells: which are M, which are O.", "보드마다 칸을 갈라요 — 어디가 M 이고 어디가 O 인지.") },
      { hi: [26, 30], bubble: t(E, "Here is the whole point.\nOnly 'one M cell + two O cells' can ever score, so look at nothing else.\nAt N = 20 that is about 428 combinations instead of 6,840.",
                                   "여기가 핵심이에요.\n득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐이니 다른 건 안 봐요.\nN = 20 에서 6,840 개 대신 평균 428 개만 봐요.") },
      { hi: [33, 35], bubble: t(E, "Best score, and how many boards reach it.", "최고 점수와, 그 점수에 이르는 보드 개수.") },
    ] };
  }
  return { code: FAST_PY, vars: _FAST_VARS, beats: [
    { hi: [1, 1],   bubble: t(E, "Read N (cells) and K (moves).", "N (칸 수) 와 K (무브 수) 읽기.") },
    { hi: [3, 11],  bubble: t(E, "Store the moves in a table instead of a list.\nisAt[x][a][b] = how many moves need x to be M and a, b to be O.\nSince y and z both just need to be O, min/max puts (1,2,3) and (1,3,2) in the same slot.",
                                 "무브를 목록이 아니라 표에 담아요.\nisAt[x][a][b] = 'x 가 M, a 와 b 가 O' 여야 득점하는 무브 개수.\ny 와 z 는 둘 다 O 이기만 하면 되니, min/max 로 (1,2,3) 과 (1,3,2) 를 같은 칸에 넣어요.") },
    { hi: [15, 17], bubble: t(E, "For each board, split the cells: which are M, which are O.", "보드마다 칸을 갈라요 — 어디가 M 이고 어디가 O 인지.") },
    { hi: [19, 24], bubble: t(E, "Here is the whole point.\nOnly 'one M cell + two O cells' can ever score, so look at nothing else.\nAt N = 20 that is about 428 combinations instead of 6,840.",
                                 "여기가 핵심이에요.\n득점할 수 있는 건 'M 자리 하나 + O 자리 둘' 뿐이니 다른 건 안 봐요.\nN = 20 에서 6,840 개 대신 평균 428 개만 봐요.") },
    { hi: [26, 30], bubble: t(E, "Best score, and how many boards reach it.", "최고 점수와, 그 점수에 이르는 보드 개수.") },
  ] };
}
