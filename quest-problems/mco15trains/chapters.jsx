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
        "An N × N grid has a population count in each cell (or −1 if blocked). Build a train path from cell A to cell B moving up/down/left/right between non-blocked cells. The cost of the path is the SUM of populations along it (every cell visited displaces its population).\nPrint the MINIMUM total displaced population.",
        "N × N 격자에 각 칸의 인구 수가 있어요 (또는 −1 = 막힘). 막혀있지 않은 칸 사이에서 상하좌우로 칸 A 에서 칸 B 까지 철도 경로를 놓아요. 경로 비용 = 지나는 칸들의 인구 합 (방문한 모든 칸이 옮겨와요).\n옮긴 인구 총합의 최솟값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude82"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Trains</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P4</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N × N grid with populations per cell (or −1 if blocked)", "각 칸의 인구 수를 가진 N × N 격자 (−1 = 막힘)")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Build a train path from cell ", "칸 A 에서 칸 B 까지 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "A to cell B moving up/down/left/right", "상하좌우로 이동하며 경로 놓기")}</b>
                  {t(E, " between non-blocked cells. Cost = sum of populations along the path.",
                        " (막혀있지 않은 칸 사이). 비용 = 지나는 칸들의 인구 합.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MINIMUM total displaced population", "옮긴 인구 총합의 최솟값")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "On a grid, you can move up, down, left, or right.\nHow many directions of movement are allowed?", "격자에서 위, 아래, 왼쪽, 오른쪽으로 이동 가능해요. 몇 방향으로 이동할 수 있나?"),
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
        "맞아! 격자에서는 4방향(상, 하, 좌, 우)만 이동 가능해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "On a grid, we move in 4 directions. How many directions?", "격자에서 4방향으로 이동해요. 몇 방향?"),
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
        "Dijkstra on the N×N grid: start at A with cost grid[A], expand to non-blocked neighbors, accumulate population costs in a min-heap. Stop at B.",
        "N×N 격자 다익스트라: A 에서 비용 grid[A] 로 시작, 차단되지 않은 이웃으로 확장, 인구 비용을 최소 힙에 누적. B 에서 중단."),
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
      sections: getTrainsSections(E),
    },
  ];
}
