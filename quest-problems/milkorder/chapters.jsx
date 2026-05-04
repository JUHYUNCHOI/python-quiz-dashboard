import { C, t } from "@/components/quest/theme";
import { getMilkOrderSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "from collections import deque",
  "",
  "N, M, K = map(int, input().split())",
  "hierarchy = []",
  "for _ in range(M):",
  "    line = list(map(int, input().split()))",
  "    hierarchy.append(line[1:])",
  "",
  "fixed = {}",
  "for _ in range(K):",
  "    c, p = map(int, input().split())",
  "    fixed[c] = p",
  "",
  "# Build graph from hierarchy constraints",
  "# Try to place cow 1 as early as possible",
  "# Use topological sort with priority queue",
  "",
  "from heapq import heappush, heappop",
  "",
  "adj = [[] for _ in range(N+1)]",
  "indeg = [0] * (N+1)",
  "for seq in hierarchy:",
  "    for i in range(len(seq)-1):",
  "        adj[seq[i]].append(seq[i+1])",
  "        indeg[seq[i+1]] += 1",
  "",
  "# Greedy: assign positions with topo sort",
  "pq = []",
  "for i in range(1, N+1):",
  "    if indeg[i] == 0:",
  "        heappush(pq, i)",
  "",
  "order = []",
  "while pq:",
  "    u = heappop(pq)",
  "    order.append(u)",
  "    for v in adj[u]:",
  "        indeg[v] -= 1",
  "        if indeg[v] == 0:",
  "            heappush(pq, v)",
  "",
  "print(order.index(1) + 1)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMilkOrderCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows must be ordered for milking.\nSome have hierarchy constraints (A before B) and some have fixed positions.\nFind the earliest possible position for cow 1!", "N마리 소의 착유 순서를 정해야 해요. 일부는 순서 제약 (A가 B보다 먼저)이 있고 일부는 고정 위치가 있어요. 소 1번의 가능한 가장 빠른 위치를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Milking Order</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Build a directed graph from hierarchy constraints.\nUse topological sort to find earliest valid position for cow 1.",
              "핵심: 순서 제약으로 방향 그래프 구축.\n위상 정렬로 소 1번의 가장 빠른 유효 위치 찾기.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If cow 1 has no constraints at all, what's the earliest position it can be in?", "소 1번에 아무 제약이 없으면, 가능한 가장 빠른 위치는?"),
      question: t(E,
        "Cow 1 has no constraints. Earliest position?",
        "소 1번에 제약 없음. 가장 빠른 위치는?"),
      options: [
        t(E, "Position 1", "1번 위치"),
        t(E, "Position N", "N번 위치"),
        t(E, "Cannot determine", "알 수 없음"),
      ],
      correct: 0,
      explain: t(E,
        "With no constraints, cow 1 can go first! Position 1.",
        "제약이 없으면, 소 1번이 첫 번째로 갈 수 있어요! 1번 위치."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If cow 1 has no constraints, what position can it be placed at earliest?", "소 1번에 제약이 없으면, 가장 일찍 배치할 수 있는 위치는?"),
      question: t(E,
        "No constraints on cow 1. Earliest position number?",
        "소 1번에 제약 없음. 가장 빠른 위치 번호는?"),
      hint: t(E,
        "Without any ordering or fixed position constraint, cow 1 can be first.",
        "순서나 고정 위치 제약 없이, 소 1번은 첫 번째가 될 수 있어요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMilkOrderCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Build a DAG from constraints.\nTopological sort with a min-heap gives the lexicographically smallest ordering, placing cow 1 as early as possible.\nO(N + M) time!", "제약으로 DAG 구축. 최소 힙으로 위상 정렬하면 사전순 가장 작은 순서를 줘서 소 1번을 최대한 앞에 배치해요. O(N + M) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26A1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N + M)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Topological sort with min-heap ensures cow 1 (smallest ID) gets placed as early as possible among valid orderings.",
              "최소 힙 위상 정렬로 소 1번(가장 작은 ID)이 유효한 순서 중 최대한 앞에 배치돼요.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMilkOrderSections(E),
    },
  ];
}
