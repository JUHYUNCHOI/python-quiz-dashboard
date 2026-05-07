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
        "A city is a grid where each cell is a building (1) or empty (0). Fluffy stands on a starting building and can jump to any adjacent building (up/down/left/right) — but never onto empty cells.\nPrint how many buildings Fluffy can visit (counting the start).",
        "도시는 각 칸이 건물 (1) 또는 빈 칸 (0) 인 격자예요. Fluffy 가 시작 건물에 서있고 인접 건물 (상하좌우) 로만 점프할 수 있어요 — 빈 칸으로는 갈 수 없어요.\nFluffy 가 방문할 수 있는 건물의 수 (시작 포함) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfd9\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>City Tour</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P2</div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A city is a grid where each cell is ", "도시는 각 칸이 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "a building (1) or empty (0)", "건물 (1) 또는 빈 칸 (0)")}</b>
                  {t(E, ".", " 인 격자예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Fluffy starts on a given building and can ", "Fluffy 가 시작 건물에서 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "jump to adjacent buildings (up/down/left/right)", "인접한 건물 (상하좌우) 로 점프")}</b>
                  {t(E, ", never onto empty cells.",
                        ". 빈 칸으로는 갈 수 없어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of buildings Fluffy can visit (including start)", "Fluffy 가 방문할 수 있는 건물의 수 (시작 포함)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "3x3 grid all 1s, Fluffy at (1,1). How many buildings can Fluffy visit?", "3x3 격자 전부 1, Fluffy가 (1,1)에 있어요. 몇 개 건물 방문 가능?"),
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
        "맞아! 9개 셀 모두 연결돼 있어서 BFS가 전부 방문해요."),
    },
    {
      type: "input",
      narr: t(E,
        "In a fully connected 3x3 grid, how many buildings can be visited?", "완전 연결된 3x3 격자에서 몇 개 건물 방문 가능?"),
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
        "BFS from the starting building. From each cell visit its 4 adjacent neighbors that are buildings (1) and not yet visited. Count all visited cells.",
        "시작 건물에서 BFS. 각 칸에서 인접 4 이웃 중 건물 (1) 이고 미방문인 것 방문. 방문한 모든 칸 카운트."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20CityTourSections(E),
    },
  ];
}
