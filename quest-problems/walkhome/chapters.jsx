import { C, t } from "@/components/quest/theme";
import { getWalkHomeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(input().strip())",
  "",
  "# DP: dp[r][c][dir][changes] = number of paths",
  "# dir: 0 = right, 1 = down, 2 = start (no direction yet)",
  "# changes: number of direction changes so far",
  "",
  "from functools import lru_cache",
  "",
  "@lru_cache(maxsize=None)",
  "def dp(r, c, direction, changes):",
  "    if r == N-1 and c == N-1:",
  "        return 1",
  "    if changes > K:",
  "        return 0",
  "    total = 0",
  "    # Move right",
  "    if c + 1 < N and grid[r][c+1] != 'H':",
  "        new_changes = changes",
  "        if direction == 1:  # was going down",
  "            new_changes += 1",
  "        if new_changes <= K:",
  "            total += dp(r, c+1, 0, new_changes)",
  "    # Move down",
  "    if r + 1 < N and grid[r+1][c] != 'H':",
  "        new_changes = changes",
  "        if direction == 0:  # was going right",
  "            new_changes += 1",
  "        if new_changes <= K:",
  "            total += dp(r+1, c, 1, new_changes)",
  "    return total",
  "",
  "if grid[0][0] == 'H':",
  "    print(0)",
  "else:",
  "    print(dp(0, 0, 2, 0))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N x N grid.\nMove only right or down from (0,0) to (N-1,N-1).\nAvoid 'H' cells.\nAt most K direction changes allowed.\nCount valid paths!", "N x N 격자. (0,0)에서 (N-1,N-1)까지 오른쪽 또는 아래로만 이동. 'H' 칸은 피해. 방향 전환은 최대 K번. 유효한 경로 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfe0"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Walking Home</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: DP with state (row, col, direction, changes_left). K <= 3 so the state space is manageable: N^2 * 2 * (K+1).",
              "핵심: DP 상태 (행, 열, 방향, 남은 전환 수). K <= 3이므로 상태 공간 관리 가능: N^2 * 2 * (K+1).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "2x2 empty grid, K=1.\nPaths from (0,0) to (1,1): 'DR' (down then right) and 'RD' (right then down).\nBoth have exactly 1 direction change.", "2x2 빈 격자, K=1. (0,0)에서 (1,1)까지: 'DR'(아래 후 오른쪽)과 'RD'(오른쪽 후 아래). 둘 다 방향 전환 1번."),
      question: t(E,
        "2x2 empty grid, K=1. How many valid paths?",
        "2x2 빈 격자, K=1. 유효한 경로 수는?"),
      options: [
        t(E, "2 paths (DR and RD)", "2개 (DR과 RD)"),
        t(E, "1 path", "1개"),
        t(E, "4 paths", "4개"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! DR has 1 change (D->R), RD has 1 change (R->D). Both are <= K=1, so 2 paths.",
        "맞아! DR은 1번 전환(D->R), RD도 1번 전환(R->D). 둘 다 K=1 이하이므로 2개 경로."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2x2 empty grid, K=1. Count the paths!", "2x2 빈 격자, K=1. 경로 수를 세봐!"),
      question: t(E,
        "2x2 grid, no obstacles, K=1. Number of paths?",
        "2x2 격자, 장애물 없음, K=1. 경로 수?"),
      hint: t(E,
        "Only 2 possible paths: right-down and down-right. Each has 1 direction change.",
        "가능한 경로 2개: 오른쪽-아래와 아래-오른쪽. 각각 방향 전환 1번."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "DP with memoization.\nState space: N^2 * 2 directions * (K+1) changes.\nSince K <= 3, this is O(N^2 * 8) which is fast!", "메모이제이션 DP. 상태 공간: N^2 * 2방향 * (K+1)전환. K <= 3이니 O(N^2 * 8)으로 빨라!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N^2 * K)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "At each cell, try moving right or down. If direction changes from previous, increment change counter. Prune when changes > K.",
              "각 셀에서 오른쪽 또는 아래로 이동 시도. 이전과 방향이 바뀌면 전환 카운터 증가. 전환 > K이면 가지치기.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getWalkHomeSections(E),
    },
  ];
}
