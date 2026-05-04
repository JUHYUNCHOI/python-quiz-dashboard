import { C, t } from "@/components/quest/theme";
import { getBucketBrigadeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from collections import deque",
  "",
  "grid = []",
  "for i in range(10):",
  "    grid.append(input().strip())",
  "",
  "# Find positions of B (barn), L (lake), R (rock)",
  "barn = lake = rock = None",
  "for r in range(10):",
  "    for c in range(10):",
  "        if grid[r][c] == 'B': barn = (r, c)",
  "        elif grid[r][c] == 'L': lake = (r, c)",
  "        elif grid[r][c] == 'R': rock = (r, c)",
  "",
  "# BFS from lake to barn, avoiding rock",
  "visited = [[False]*10 for _ in range(10)]",
  "visited[lake[0]][lake[1]] = True",
  "q = deque([(lake[0], lake[1], 0)])",
  "",
  "while q:",
  "    r, c, d = q.popleft()",
  "    if (r, c) == barn:",
  "        # path_length = d cells traversed",
  "        # cows needed = d - 1 (lake and barn excluded)",
  "        print(d - 1)",
  "        break",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<10 and 0<=nc<10 and not visited[nr][nc]:",
  "            if (nr,nc) != rock:",
  "                visited[nr][nc] = True",
  "                q.append((nr, nc, d+1))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBrigadeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "On a 10x10 grid there's a lake (L), a barn (B), and a rock (R).\nCows form a bucket brigade to pass water from lake to barn.\nFind the minimum number of cows needed, avoiding the rock!", "10x10 격자에 호수(L), 헛간(B), 바위(R)가 있어요.\n소들이 호수에서 헛간까지 물을 전달하는 버킷 릴레이를 만들어요.\n바위를 피해서 필요한 최소 소 수를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udea3"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Bucket Brigade</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: BFS on the grid from lake to barn, avoiding the rock.\nThe answer is the shortest path length minus 1 (lake and barn are endpoints, not cows).",
              "핵심: 호수에서 헛간까지 BFS. 바위를 피해서 최단 경로를 구하고,\n답은 경로 길이 - 1 (호수와 헛간은 끝점이라 소가 아님).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The grid is a fixed size. What are its dimensions?", "격자는 고정 크기예요. 크기가 얼마일까요?"),
      question: t(E,
        "What is the grid size in Bucket Brigade?",
        "Bucket Brigade에서 격자의 크기는?"),
      options: [
        t(E, "5x5", "5x5"),
        t(E, "10x10", "10x10"),
        t(E, "100x100", "100x100"),
        t(E, "NxN (variable)", "NxN (가변)"),
      ],
      correct: 1,
      explain: t(E,
        "The grid is always 10x10 in this problem.",
        "이 문제에서 격자는 항상 10x10이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "What is the grid size (one dimension)?", "격자의 한 변의 크기는?"),
      question: t(E,
        "The grid is NxN. What is N?",
        "격자가 NxN이예요. N은?"),
      hint: t(E,
        "The grid is always 10x10.",
        "격자는 항상 10x10이예요."),
      answer: 10,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBrigadeCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "BFS on a 10x10 grid is O(100) = O(1) since the grid size is fixed. Very fast!", "10x10 격자에서 BFS는 O(100) = O(1)이예요. 격자 크기가 고정이니까 아주 빨라요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "BFS from lake to barn on the grid, skip the rock cell.\nAnswer = shortest_path_length - 1.",
              "격자에서 호수에서 헛간까지 BFS, 바위 셀은 건너뛰어.\n답 = 최단경로길이 - 1.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBucketBrigadeSections(E),
    },
  ];
}
