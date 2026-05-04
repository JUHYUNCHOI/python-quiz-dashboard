import { C, t } from "@/components/quest/theme";
import { getMcc22MazeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "from collections import deque",
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    R = int(input_data[idx]); idx += 1",
  "    C_ = int(input_data[idx]); idx += 1",
  "    grid = []",
  "    for i in range(R):",
  "        grid.append(input_data[idx]); idx += 1",
  "",
  "    # BFS from (0,0) to (R-1,C-1)",
  "    dist = [[-1]*C_ for _ in range(R)]",
  "    dist[0][0] = 0",
  "    q = deque([(0, 0)])",
  "    while q:",
  "        r, c = q.popleft()",
  "        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "            nr, nc = r+dr, c+dc",
  "            if 0<=nr<R and 0<=nc<C_ and grid[nr][nc]=='.' and dist[nr][nc]==-1:",
  "                dist[nr][nc] = dist[r][c] + 1",
  "                q.append((nr, nc))",
  "",
  "    print(dist[R-1][C_-1])",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22MazeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given a grid maze with walls and open cells, find the shortest path from the top-left corner to the bottom-right corner using BFS!", "벽과 빈 칸이 있는 격자 미로에서 BFS를 사용해 왼쪽 위에서 오른쪽 아래까지 최단 경로를 찾아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udff0"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Maze</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P3</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: BFS on a grid.\nStart at (0,0), explore neighbors (up/down/left/right). First time reaching (R-1,C-1) gives the shortest distance.",
              "핵심: 격자에서 BFS. (0,0)에서 시작, 이웃(상하좌우) 탐색.\n(R-1,C-1)에 처음 도달하면 최단 거리.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "In a 2x2 empty maze (all cells open), starting at top-left (0,0), ending at bottom-right (1,1).\nWhat's the shortest path length?", "2x2 빈 미로(모든 칸 열림)에서 왼쪽 위(0,0)에서 오른쪽 아래(1,1)까지. 최단 경로 길이는?"),
      question: t(E,
        "2x2 empty maze. Shortest path from (0,0) to (1,1)?",
        "2x2 빈 미로. (0,0)에서 (1,1)까지 최단 경로?"),
      options: [
        t(E, "2 steps (right then down, or down then right)", "2단계 (오른쪽 후 아래, 또는 아래 후 오른쪽)"),
        t(E, "3 steps", "3단계"),
        t(E, "1 step (diagonal)", "1단계 (대각선)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! In a grid, we can only move up/down/left/right. From (0,0) we go right to (0,1) then down to (1,1) = 2 steps.",
        "맞아! 격자에서는 상하좌우만 이동 가능해. (0,0)에서 오른쪽 (0,1), 아래로 (1,1) = 2단계."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many steps is the shortest path in a 2x2 empty maze?", "2x2 빈 미로에서 최단 경로는 몇 단계?"),
      question: t(E,
        "2x2 empty maze, (0,0) to (1,1). Shortest path = ? steps",
        "2x2 빈 미로, (0,0)에서 (1,1). 최단 경로 = ? 단계"),
      hint: t(E,
        "Right then down, or down then right. 2 moves!",
        "오른쪽 후 아래, 또는 아래 후 오른쪽. 2번 이동!"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22MazeCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "BFS visits each cell at most once. Time complexity O(R * C).", "BFS는 각 칸을 최대 한 번 방문. 시간 복잡도 O(R * C)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(R * C)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "BFS with a queue.\nMark visited cells with their distance. Each cell is enqueued and dequeued at most once.",
              "큐를 이용한 BFS.\n방문한 칸에 거리를 기록. 각 칸은 최대 한 번 큐에 들어가고 나와.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22MazeSections(E),
    },
  ];
}
