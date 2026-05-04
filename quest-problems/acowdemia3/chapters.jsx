import { C, t } from "@/components/quest/theme";
import { getAcowdemia3Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "R, C = map(int, input().split())",
  "grid = []",
  "for _ in range(R):",
  "    grid.append(input().strip())",
  "",
  "# Find cows and grass cells",
  "# Cows can befriend via shared adjacent grass",
  "# This is a bipartite matching problem",
  "# Each grass cell can mediate at most 1 friendship",
  "",
  "from collections import defaultdict",
  "",
  "adj = defaultdict(list)  # grass -> list of adjacent cows",
  "dirs = [(0,1),(0,-1),(1,0),(-1,0)]",
  "",
  "for r in range(R):",
  "    for c in range(C):",
  "        if grid[r][c] == 'G':  # grass",
  "            for dr, dc in dirs:",
  "                nr, nc = r+dr, c+dc",
  "                if 0<=nr<R and 0<=nc<C and grid[nr][nc]=='C':",
  "                    adj[(r,c)].append((nr,nc))",
  "",
  "# Max matching: each grass matches at most 1 cow pair",
  "match = {}",
  "def dfs(grass, visited):",
  "    for cow in adj[grass]:",
  "        if cow not in visited:",
  "            visited.add(cow)",
  "            if cow not in match or dfs(match[cow], visited):",
  "                match[cow] = grass",
  "                return True",
  "    return False",
  "",
  "ans = 0",
  "for g in adj:",
  "    if dfs(g, set()): ans += 1",
  "print(ans // 2)  # each friendship uses 2 cow slots",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow3Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows on a grid can become friends if they share an adjacent grass cell.\nEach grass cell can only mediate one friendship.\nMaximize the number of friendships!", "격자 위의 소들은 인접한 풀 칸을 공유하면 친구가 될 수 있어요. 각 풀 칸은 하나의 우정만 중재할 수 있어요. 우정의 수를 최대화해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Acowdemia III</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2021 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: This is a matching problem.\nGrass cells connect cow pairs. Each grass can mediate at most one friendship. Use greedy or bipartite matching.",
              "핵심: 이것은 매칭 문제예요.\n풀 칸이 소 쌍을 연결해요.\n각 풀은 최대 하나의 우정만 중재.\n그리디 또는 이분 매칭 사용.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If 2 cows are both adjacent to 1 grass cell, what is the maximum number of friendships?", "2마리의 소가 모두 1개의 풀 칸에 인접하면, 최대 우정 수는?"),
      question: t(E,
        "2 cows adjacent to 1 grass cell. Max friendships?",
        "2마리 소가 1개의 풀 칸에 인접. 최대 우정 수?"),
      options: [
        t(E, "0", "0"),
        t(E, "1", "1"),
        t(E, "2", "2"),
      ],
      correct: 1,
      explain: t(E,
        "The 2 cows can become friends through the shared grass cell. That grass cell is used up, so max = 1.",
        "2마리 소가 공유 풀 칸을 통해 친구가 될 수 있어요. 그 풀 칸은 사용되어 최대 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2 cows adjacent to 1 grass cell. How many friendships at most?", "2마리 소가 1개의 풀 칸에 인접. 최대 우정 수?"),
      question: t(E,
        "2 cows, 1 shared grass cell. Max friendships?",
        "소 2마리, 공유 풀 칸 1개. 최대 우정 수?"),
      hint: t(E,
        "Each grass cell mediates exactly one friendship between two adjacent cows.",
        "각 풀 칸은 인접한 두 소 사이의 정확히 하나의 우정을 중재."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAcow3Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Model as bipartite matching: grass cells on one side, cow pairs on the other.\nUse augmenting paths.\nO(R*C * sqrt(V)) time.", "이분 매칭으로 모델링: 한쪽에 풀 칸, 다른 쪽에 소 쌍. 증가 경로 사용. O(R*C * sqrt(V)) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Bipartite Matching</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Build a graph: each grass cell connects to its adjacent cows.\nFind maximum matching where each grass mediates at most one cow pair.",
              "그래프 구성: 각 풀 칸이 인접한 소들에 연결.\n각 풀이 최대 하나의 소 쌍만 중재하는 최대 매칭 찾기.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getAcowdemia3Sections(E),
    },
  ];
}
