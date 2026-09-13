"use client";

/* Moo Hunt — **첫 코드**: 다 해보는 완전탐색 (비트 없이).
 *
 * 왜 이 파일이 생겼나 (2026-09-13, 선생님 "비트 없는 첫 코드 만들어줘"):
 *   quest 표준(memory/quest_problem_standard.md)은
 *   도입 → 형식 → 예제 → **첫 코드** → 한계 → 더 빠르게 인데, 첫 코드가 없었다.
 *   학생은 "손으로 채점"에서 곧장 최종 코드로 뛰었다.
 *
 * 왜 components.jsx 의 완전탐색을 안 쓰나:
 *   그 코드는 🔒 USACO_VERIFIED 라 못 고치는데 **비트마스크**를 쓴다
 *   (`for b in range(1 << N)` · `(b >> x) & 1`). 이번에 최종 코드에서 비트를 걷어냈고
 *   (선생님 지시 → 제출 → 통과), 보드 열거도 "리스트에 1 더하기" 로 가르친다.
 *   그 앞에서 비트를 첫 코드로 보여주면 정반대다. 그래서 **새로 쓴다.**
 *   `count-quests.py --list untaught` 의 [비트연산] 표시는 PDF 쪽 코드 때문에 남는다.
 *
 * 보드 열거는 최종 코드(fast.jsx)와 **글자 하나까지 같은 모양**이다 — 일부러 그렇게 뒀다.
 *   첫 코드에서 한 번 본 것이 최종 코드에서 그대로 다시 나와야 "무엇이 바뀌었나" 가 보인다.
 *   바뀌는 건 채점하는 가운데뿐이다: 무브를 매번 다 훑기 → 표에서 꺼내 더하기.
 *
 * ✅ 검증 (2026-09-13):
 *   · 공식 샘플 1 (N=5, K=6) → `4 2`  — 파이썬·C++ 둘 다
 *   · 🔒 검증된 비트 브루트(components.jsx FULL_PY)와 **무작위 400 케이스 대조 → 불일치 0**
 *     (N 3~12 · K 1~40 · 무브는 1..N 중 **서로 다른 세 칸**. 제약을 어기면 시험지가 틀린 것이다.)
 *   · 이 코드는 채점기에 낼 것이 아니다 — 제한 시간을 한참 넘는다. 그게 다음 쪽의 이야기다.
 *
 * ⚠️ beats 의 hi 는 **0부터 세는 배열 인덱스**다. 줄을 늘리면 뒤 번호가 전부 밀린다.
 */
import { t } from "@/components/quest/theme";

const BRUTE_PY = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, K = map(int, input().split())",
  "",
  "# 무브를 목록에 담아요. 칸 번호는 0번부터 세니까 1씩 빼요.",
  "moves = []",
  "for _ in range(K):",
  "    x, y, z = map(int, input().split())",
  "    moves.append((x - 1, y - 1, z - 1))",
  "",
  "# 보드를 리스트로 들고 다녀요. 1 이면 M, 0 이면 O.",
  "board = [0] * N",
  "",
  "best = 0",
  "ways = 0",
  "",
  "while True:",
  "    # 이 보드를 채점해요 — 무브를 하나씩 다 봐요.",
  "    score = 0",
  "    for x, y, z in moves:",
  "        if board[x] == 1 and board[y] == 0 and board[z] == 0:",
  "            score += 1",
  "",
  "    if score > best:",
  "        best = score",
  "        ways = 1",
  "    elif score == best:",
  "        ways += 1",
  "",
  "    # 다음 보드로 넘어가요 — 2진수에 1 을 더하는 것과 같아요.",
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

const BRUTE_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "using namespace std;",
  "",
  "int main() {",
  "    int N, K;",
  "    cin >> N >> K;",
  "",
  "    // 무브를 목록에 담아요. 칸 번호는 0번부터 세니까 1씩 빼요.",
  "    vector<int> mx(K), my(K), mz(K);",
  "    for (int i = 0; i < K; i++) {",
  "        cin >> mx[i] >> my[i] >> mz[i];",
  "        mx[i] = mx[i] - 1;",
  "        my[i] = my[i] - 1;",
  "        mz[i] = mz[i] - 1;",
  "    }",
  "",
  "    // 보드를 리스트로 들고 다녀요. 1 이면 M, 0 이면 O.",
  "    vector<int> board(N, 0);",
  "",
  "    int best = 0;",
  "    int ways = 0;",
  "",
  "    while (true) {",
  "        // 이 보드를 채점해요 — 무브를 하나씩 다 봐요.",
  "        int score = 0;",
  "        for (int i = 0; i < K; i++) {",
  "            if (board[mx[i]] == 1 && board[my[i]] == 0 && board[mz[i]] == 0) {",
  "                score = score + 1;",
  "            }",
  "        }",
  "",
  "        if (score > best) {",
  "            best = score;",
  "            ways = 1;",
  "        } else if (score == best) {",
  "            ways = ways + 1;",
  "        }",
  "",
  "        // 다음 보드로 넘어가요 — 2진수에 1 을 더하는 것과 같아요.",
  "        int i = 0;",
  "        while (i < N && board[i] == 1) {",
  "            board[i] = 0;",
  "            i = i + 1;",
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

const _BRUTE_VARS = [
  { v: "N", ko: "칸 수", en: "cells" },
  { v: "K", ko: "무브 수", en: "moves" },
  { v: "board", ko: "지금 보드 — 1 이면 M, 0 이면 O", en: "the board now — 1 is M, 0 is O" },
  { v: "best / ways", ko: "최고 점수 / 그 점수가 되는 보드 수", en: "best score / how many boards reach it" },
];

export function getMooHuntBruteWalk(E, lang = "py") {
  /* ⚠️ 걸음은 **5개**다. pedagogy 판정(2026-09-13): "브루트는 15~20줄인데 최종 코드(68줄)와
     같은 7걸음을 쓰면 한 걸음당 두 줄꼴 — 너무 잘게 썬다." 입력 둘을 하나로, 갱신과
     다음 보드를 하나로 합쳤다.
     ⚠️ 채점 걸음은 **3쪽(MOOMM 손 채점)을 이름으로 부른다.** 화면은 앞 쪽 기억에 기대면
     안 된다 (memory/feedback_screen_must_not_rely_on_memory.md). */
  if (lang === "cpp") {
    return { code: BRUTE_CPP, vars: _BRUTE_VARS, beats: [
      { hi: [0, 15],  bubble: t(E, "Read the input: N (cells), K (moves), then the K moves.\nCells are numbered from 1 in the input but from 0 in code, so subtract 1.",
                                   "입력을 읽어요 — N (칸 수), K (무브 수), 그리고 무브 K 개.\n입력은 칸을 1번부터 세고 코드는 0번부터 세니까 1 을 빼요.") },
      { hi: [17, 21], bubble: t(E, "The board is just a list: 1 means M, 0 means O. Start from all O.\nScores are never negative, so 0 is a safe starting best.",
                                   "보드는 그냥 리스트예요 — 1 이면 M, 0 이면 O. 전부 O 에서 시작해요.\n점수는 0 보다 작을 수 없으니 best 를 0 에서 시작해도 돼요.") },
      { hi: [23, 30], bubble: t(E, "Score this board — the very thing you did by hand on MOOMM.\nA move scores when x reads M and y, z read O. Walk all K of them.",
                                   "이 보드를 채점해요 — 3쪽에서 MOOMM 을 손으로 센 것과 똑같아요.\nx 자리가 M, y·z 자리가 O 면 1점. 무브 K 개를 다 훑어요.") },
      { hi: [32, 49], bubble: t(E, "Keep the best score and how many boards reach it.\nThen move to the next board — the way you just saw, adding 1.\nWhen every cell was M there is nothing left — stop.",
                                   "최고 점수와, 그 점수에 이르는 보드 개수를 남겨요.\n그리고 다음 보드로 — 방금 본 그 방법, 1 을 더하는 거예요.\n전부 M 이었다면 더 갈 데가 없으니 멈춰요.") },
      { hi: [51, 53], bubble: t(E, "Print both — that is the answer.", "둘을 출력해요 — 그게 답이에요.") },
    ] };
  }
  return { code: BRUTE_PY, vars: _BRUTE_VARS, beats: [
    { hi: [0, 9],   bubble: t(E, "Read the input: N (cells), K (moves), then the K moves.\nCells are numbered from 1 in the input but from 0 in code, so subtract 1.",
                                 "입력을 읽어요 — N (칸 수), K (무브 수), 그리고 무브 K 개.\n입력은 칸을 1번부터 세고 코드는 0번부터 세니까 1 을 빼요.") },
    { hi: [11, 15], bubble: t(E, "The board is just a list: 1 means M, 0 means O. Start from all O.\nScores are never negative, so 0 is a safe starting best.",
                                 "보드는 그냥 리스트예요 — 1 이면 M, 0 이면 O. 전부 O 에서 시작해요.\n점수는 0 보다 작을 수 없으니 best 를 0 에서 시작해도 돼요.") },
    { hi: [17, 22], bubble: t(E, "Score this board — the very thing you did by hand on MOOMM.\nA move scores when x reads M and y, z read O. Walk all K of them.",
                                 "이 보드를 채점해요 — 3쪽에서 MOOMM 을 손으로 센 것과 똑같아요.\nx 자리가 M, y·z 자리가 O 면 1점. 무브 K 개를 다 훑어요.") },
    { hi: [24, 37], bubble: t(E, "Keep the best score and how many boards reach it.\nThen move to the next board — the way you just saw, adding 1.\nWhen every cell was M there is nothing left — stop.",
                                 "최고 점수와, 그 점수에 이르는 보드 개수를 남겨요.\n그리고 다음 보드로 — 방금 본 그 방법, 1 을 더하는 거예요.\n전부 M 이었다면 더 갈 데가 없으니 멈춰요.") },
    { hi: [39, 39], bubble: t(E, "Print both — that is the answer.", "둘을 출력해요 — 그게 답이에요.") },
  ] };
}
