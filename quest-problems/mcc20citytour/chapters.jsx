import { C, t } from "@/components/quest/theme";
import { getMcc20CityTourSections } from "./components";

export const SOLUTION_CODE = [
  "from collections import deque",
  "",
  "R, C_ = map(int, input().split())",
  "grid = []",
  "for _ in range(R):",
  "    grid.append(list(map(int, input().split())))",
  "",
  "sr, sc = map(int, input().split())",
  "",
  "visited = [[False]*C_ for _ in range(R)]",
  "visited[sr][sc] = True",
  "q = deque([(sr, sc)])",
  "count = 1",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<R and 0<=nc<C_ and not visited[nr][nc] and grid[nr][nc]==1:",
  "            visited[nr][nc] = True",
  "            q.append((nr, nc))",
  "            count += 1",
  "",
  "print(count)",
];

export function makeMcc20CityTourCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Fluffy explores a grid city, jumping to adjacent buildings. Count how many buildings Fluffy can visit using BFS.",
        "Fluffy가 격자 도시를 탐험하며 인접 건물로 점프해. BFS로 방문할 수 있는 건물 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfd9\ufe0f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>City Tour</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P2</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: BFS from starting position. Visit all reachable cells with value 1. Count visited cells.",
              "핵심: 시작 위치에서 BFS. 값이 1인 도달 가능한 모든 셀 방문. 방문한 셀 수 세기.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "3x3 grid all 1s, Fluffy at (1,1). How many buildings can Fluffy visit?",
        "3x3 격자 전부 1, Fluffy가 (1,1)에 있어. 몇 개 건물 방문 가능?"),
      question: t(E,
        "3x3 grid, all buildings connected. Fluffy at center. How many can visit?",
        "3x3 격자, 모든 건물 연결. Fluffy 중앙. 몇 개 방문 가능?"),
      options: [
        t(E, "9 (all)", "9 (전부)"),
        t(E, "5", "5"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! All 9 cells are connected, so BFS visits all of them.",
        "맞아! 9개 셀 모두 연결돼 있어서 BFS가 전부 방문해."),
    },
    {
      type: "input",
      narr: t(E,
        "In a fully connected 3x3 grid, how many buildings can be visited?",
        "완전 연결된 3x3 격자에서 몇 개 건물 방문 가능?"),
      question: t(E,
        "3x3 grid, all 1s. Total reachable buildings?",
        "3x3 격자, 전부 1. 도달 가능한 건물 수?"),
      hint: t(E, "3 * 3 = 9", "3 * 3 = 9"),
      answer: 9,
    },
  ];
}

export function makeMcc20CityTourCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "BFS from start, visiting all connected cells. O(R*C) time.",
        "시작점에서 BFS, 연결된 모든 셀 방문. O(R*C) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(R*C)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Use deque for BFS. Check 4 directions. Mark visited to avoid revisiting. Count all reached cells.",
              "BFS에 deque 사용. 4방향 확인. 방문 표시로 재방문 방지. 도달한 모든 셀 카운트.")}
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20CityTourSections(E),
    },
  ];
}
