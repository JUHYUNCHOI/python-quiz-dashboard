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
        "FJ has a milk factory with N stations connected by N−1 one-way conveyor belts (so the underlying graph is a tree).\nFind a single station that EVERY other station can reach by following the conveyors. Print that station's number, or −1 if none exists.",
        "FJ 에게 N개의 역과 N−1개의 한 방향 컨베이어로 이뤄진 우유 공장이 있어요 (연결 구조가 트리 모양이에요).\n다른 모든 역에서 컨베이어를 따라 도달할 수 있는 단 하나의 역을 찾아요. 그 번호를 출력하고, 없으면 −1."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfed"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Milk Factory</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2019 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ's factory has ", "공장에 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N stations", "N개의 역")}</b>
                  {t(E, " connected by ", "이 있고, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N−1 one-way conveyor belts", "N−1개의 한 방향 컨베이어")}</b>
                  {t(E, " (the underlying graph is a tree).", "로 연결돼 있어요 (연결 구조가 트리 모양이에요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We want a ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "central station C", "중심 역 C")}</b>
                  {t(E, " such that ", " — ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "every other station can reach C", "다른 모든 역에서 C 로 갈 수 있어요")}</b>
                  {t(E, " by following the conveyor directions.", " (컨베이어 방향대로).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print such a station's number, or ", "그런 역의 번호를 출력해요. 없으면 ")}
                  <b style={{ color: "#dc2626" }}>−1</b>
                  {t(E, ".", " 출력.")}
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
        "Consider: edges 1->2 and 3->2. Which station is reachable from all others?", "간선 1->2, 3->2가 있어요. 모든 스테이션에서 도달 가능한 곳은?"),
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
        "In the example above, what station number is the answer?", "위 예제에서 답은 몇 번 스테이션일까요?"),
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
        "A central station C is reachable from every other ↔ in the REVERSE graph (flip arrows), C reaches every other. So build the reverse graph, then test each candidate via BFS/DFS — print the first one whose reverse-BFS reaches all N stations.",
        "중심 스테이션 C 가 다른 모든 곳에서 도달 가능 ↔ 역방향 그래프 (간선 뒤집기) 에서 C 가 다른 모두에 도달 가능. 그래서 역방향 그래프를 만들고 후보마다 BFS/DFS — 역방향 BFS 가 N 개 스테이션 모두에 도달하는 첫 후보를 출력."),
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
      sections: getMilkFactorySections(E),
    },
  ];
}
