import { C, t } from "@/components/quest/theme";
import { getTrainsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import heapq",
  "",
  "N = int(input())",
  "grid = []",
  "for i in range(N):",
  "    row = list(map(int, input().split()))",
  "    grid.append(row)",
  "",
  "ax, ay, bx, by = map(int, input().split())",
  "ax -= 1; ay -= 1; bx -= 1; by -= 1  # 0-indexed",
  "",
  "INF = float('inf')",
  "dist = [[INF] * N for _ in range(N)]",
  "dist[ax][ay] = grid[ax][ay]",
  "",
  "pq = [(grid[ax][ay], ax, ay)]",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "",
  "while pq:",
  "    d, x, y = heapq.heappop(pq)",
  "    if d > dist[x][y]:",
  "        continue",
  "    if x == bx and y == by:",
  "        break",
  "    for dx, dy in dirs:",
  "        nx, ny = x + dx, y + dy",
  "        if 0 <= nx < N and 0 <= ny < N and grid[nx][ny] != -1:",
  "            nd = d + grid[nx][ny]",
  "            if nd < dist[nx][ny]:",
  "                dist[nx][ny] = nd",
  "                heapq.heappush(pq, (nd, nx, ny))",
  "",
  "print(dist[bx][by])",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrainsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N*N grid has population counts in each cell (-1 = blocked).\nBuild train tracks from station A to station B moving in 4 directions.\nMinimize total displaced inhabitants along the path!", "N*N 격자에 각 셀의 인구수가 있어 (-1 = 차단). 역 A에서 역 B까지 4방향으로 철도를 놓아. 경로상 총 이주 주민 수를 최소화해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\ude82"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Trains</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P4</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: This is a shortest path problem on a weighted grid. Use Dijkstra's algorithm with cell population as edge weight. Blocked cells (-1) cannot be traversed.",
              "핵심: 가중 격자에서의 최단 경로 문제. 셀 인구수를 간선 가중치로 사용해 다익스트라 알고리즘 적용. 차단된 셀(-1)은 통과 불가.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "On a grid, you can move up, down, left, or right.\nHow many directions of movement are allowed?", "격자에서 위, 아래, 왼쪽, 오른쪽으로 이동 가능해. 몇 방향으로 이동할 수 있나?"),
      question: t(E,
        "How many directions can tracks be laid? (up/down/left/right)",
        "철도를 놓을 수 있는 방향은 몇 개? (상/하/좌/우)"),
      options: [
        t(E, "4 directions", "4방향"),
        t(E, "8 directions (including diagonals)", "8방향 (대각선 포함)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Only 4-directional movement (up, down, left, right) is allowed on the grid.",
        "맞아! 격자에서는 4방향(상, 하, 좌, 우)만 이동 가능해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "On a grid, we move in 4 directions. How many directions?", "격자에서 4방향으로 이동해. 몇 방향?"),
      question: t(E,
        "Number of movement directions on the grid?",
        "격자에서 이동 가능한 방향 수?"),
      hint: t(E,
        "Up, down, left, right = 4 directions.",
        "상, 하, 좌, 우 = 4방향."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrainsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Dijkstra's algorithm on an N*N grid.\nEach cell is a node, edges go to 4 neighbors.\nO(N^2 log N) with a priority queue.", "N*N 격자에서 다익스트라 알고리즘. 각 셀이 노드, 4이웃으로 간선. 우선순위 큐를 사용해 O(N^2 log N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N\u00b2 log N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Dijkstra: start from A with cost = grid[A]. For each neighbor, new cost = current + grid[neighbor]. Skip blocked cells (-1). Use min-heap for efficiency.",
              "다익스트라: A에서 시작, 비용 = grid[A]. 각 이웃에 대해 새 비용 = 현재 + grid[이웃]. 차단 셀(-1) 건너뛰기. 효율을 위해 최소 힙 사용.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getTrainsSections(E),
    },
  ];
}
