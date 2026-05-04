import { C, t } from "@/components/quest/theme";
import { getMilkFactorySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "# adj[u] = list of nodes u can reach",
  "# We want a node reachable FROM all others",
  "# Reverse: find node that can reach all others",
  "# Or: for each node, check if all others can reach it",
  "",
  "# Build reverse adjacency list",
  "radj = [[] for _ in range(N+1)]",
  "for _ in range(N-1):",
  "    a, b = map(int, input().split())",
  "    radj[b].append(a)  # edge a->b means b can be reached from a",
  "",
  "# For each candidate node, BFS/DFS on reverse graph",
  "from collections import deque",
  "",
  "for candidate in range(1, N+1):",
  "    visited = set()",
  "    q = deque([candidate])",
  "    visited.add(candidate)",
  "    while q:",
  "        u = q.popleft()",
  "        for v in radj[u]:",
  "            if v not in visited:",
  "                visited.add(v)",
  "                q.append(v)",
  "    if len(visited) == N:",
  "        print(candidate)",
  "        break",
  "else:",
  "    print(-1)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFactoryCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N stations connected by N-1 one-way conveyor belts (a tree).\nFind a station that every other station can reach, or output -1.", "N개의 스테이션이 N-1개의 단방향 컨베이어 벨트로 연결돼 (트리). 모든 다른 스테이션에서 도달 가능한 스테이션을 찾거나, -1을 출력해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfed"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Milk Factory</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each candidate station, check if all other stations can reach it by traversing the reverse graph. Since it's a tree with N-1 edges, BFS/DFS works.",
              "핵심: 각 후보 스테이션에 대해 역방향 그래프를 탐색해서 모든 다른 스테이션이 도달 가능한지 확인. 트리라서 BFS/DFS로 해결.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consider: edges 1->2 and 3->2. Which station is reachable from all others?", "간선 1->2, 3->2가 있어. 모든 스테이션에서 도달 가능한 곳은?"),
      question: t(E,
        "Edges: 1->2, 3->2. Which station can all others reach?",
        "간선: 1->2, 3->2. 모든 스테이션이 도달 가능한 곳은?"),
      options: [
        t(E, "Station 1", "스테이션 1"),
        t(E, "Station 2", "스테이션 2"),
        t(E, "Station 3", "스테이션 3"),
        t(E, "No such station (-1)", "없음 (-1)"),
      ],
      correct: 1,
      explain: t(E,
        "Station 2 is reachable from 1 (via 1->2) and from 3 (via 3->2). Station 2 can reach itself.",
        "스테이션 2는 1에서 (1->2), 3에서 (3->2) 도달 가능. 자기 자신도 도달 가능."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "In the example above, what station number is the answer?", "위 예제에서 답은 몇 번 스테이션일까?"),
      question: t(E,
        "Edges: 1->2, 3->2. Answer station number?",
        "간선: 1->2, 3->2. 답 스테이션 번호는?"),
      hint: t(E,
        "All paths lead to station 2.",
        "모든 경로가 스테이션 2로 이어져."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeFactoryCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each of N candidates, BFS/DFS on the reverse graph takes O(N). Total: O(N^2).", "N개 후보 각각에 대해 역방향 그래프 BFS/DFS는 O(N). 총: O(N^2)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>{"O(N\u00b2)"}</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Build the reverse adjacency list. For each candidate node, BFS to see if all N nodes are reachable. First valid candidate is the answer.",
              "역방향 인접 리스트를 만들어. 각 후보 노드에서 BFS로 N개 노드 모두 도달 가능한지 확인. 첫 번째 유효 후보가 답.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMilkFactorySections(E),
    },
  ];
}
