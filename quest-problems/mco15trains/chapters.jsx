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
  "ax -= 1  # 0-indexed",
  "ay -= 1",
  "bx -= 1",
  "by -= 1",
  "",
  "INF = float('inf')",
  "dist = []",
  "for _ in range(N):            # 줄마다 [INF, INF, …] 하나씩",
  "    dist.append([INF] * N)",
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
        "A 에서 B 까지 철도를 놓을 때 옮기는 인구가 가장 적은 길을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude82"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Trains</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P4</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E, "Find the minimum total population displaced by a train path from A to B on an N×N grid.", "N×N 격자에서 A 에서 B 까지 철도 경로가 옮기는 인구 총합의 최솟값을 구해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
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
        "On a grid, you can move up, down, left, or right.\nHow many directions of movement are allowed?", "격자에서는 몇 방향으로 움직일 수 있을까요?"),
      question: t(E,
        "How many directions can tracks be laid? (up/down/left/right)",
        "철도를 놓을 수 있는 방향은 몇 개일까요? (상/하/좌/우)"),
      options: [
        t(E, "4 directions", "4방향"),
        t(E, "8 directions (including diagonals)", "8방향 (대각선 포함)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Only 4-directional movement (up, down, left, right) is allowed on the grid.",
        "맞아요! 격자에서는 4방향(상, 하, 좌, 우)으로만 움직일 수 있어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "On a grid, we move in 4 directions. How many directions?", "격자에서 움직일 수 있는 방향은 몇 개일까요?"),
      question: t(E,
        "Number of movement directions on the grid?",
        "격자에서 움직일 수 있는 방향은 몇 개일까요?"),
      hint: t(E,
        "Count the directions listed: up, down, left, right.",
        "나열된 방향을 세어 봐요: 상, 하, 좌, 우."),
      answer: 4,
    },
    // 1-4: Audit sim — build a path on the grid, audit cost vs. Dijkstra optimum
    {
      type: "auditSim",
      narr: t(E,
        "Build your own train path A→B on a small grid. Live: cost is summed and compared against Dijkstra's minimum. Many valid paths exist — only the lowest-cost one wins.",
        "작은 격자에서 A→B 철도를 직접 놓아 봐요."),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrainsCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Dijkstra on the N×N grid: start at A with cost grid[A], expand to non-blocked neighbors, accumulate population costs in a min-heap. Stop at B. Sections build it one piece at a time.",
        "다익스트라로 비용이 가장 적은 길부터 차근차근 넓혀 가요."),
      sections: getTrainsSections(E),
    },
  ];
}
