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
        "An R × C grid maze: each cell is a wall (#) or open (.). Move only between adjacent open cells (up/down/left/right). Each step counts as 1.\nPrint the SHORTEST distance from the top-left cell (0, 0) to the bottom-right cell (R−1, C−1), or −1 if unreachable.",
        "R × C 격자 미로: 각 칸이 벽 (#) 또는 열림 (.) 이에요. 인접한 열린 칸 사이만 이동 (상하좌우). 한 걸음 = 1.\n좌상단 (0, 0) 에서 우하단 (R−1, C−1) 까지의 최단 거리를 출력해요. 도달할 수 없으면 −1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udff0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Maze</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P3</div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "R × C grid maze of walls (#) and open cells (.)", "벽 (#) 과 열린 칸 (.) 으로 된 R × C 격자 미로")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Move only between ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "adjacent open cells (up/down/left/right)", "인접한 열린 칸 (상하좌우)")}</b>
                  {t(E, ". Each step counts as 1.",
                        " 으로만 이동, 한 걸음 = 1.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "SHORTEST distance from (0, 0) to (R−1, C−1)", "(0, 0) 에서 (R−1, C−1) 까지의 최단 거리")}</b>
                  {t(E, ", or −1 if unreachable.", " 를 출력해요. 도달할 수 없으면 −1.")}
                </div>
              </div>
            </div>
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
        "맞아! 격자에서는 상하좌우만 이동 가능해요. (0,0)에서 오른쪽 (0,1), 아래로 (1,1) = 2단계."),
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
        "BFS from (0, 0). For each cell, explore 4 open neighbors and record the distance. Stop when reaching (R−1, C−1).",
        "(0, 0) 에서 BFS. 각 칸에서 열린 4 이웃을 탐색하고 거리 기록. (R−1, C−1) 에 도달하면 중단."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22MazeSections(E),
    },
  ];
}
