import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "arrows = []",
  "for _ in range(N):",
  "    x, y, d = input().split()",
  "    arrows.append((int(x), int(y), d))",
  "",
  "# Build position map for BFS",
  "pos_map = {}",
  "for i, (x, y, d) in enumerate(arrows):",
  "    pos_map[(x, y)] = i",
  "",
  "# Direction deltas: R, L, U, D",
  "dx = {'R': 1, 'L': -1, 'U': 0, 'D': 0}",
  "dy = {'R': 0, 'L': 0, 'U': 1, 'D': -1}",
  "",
  "# BFS from arrow 0",
  "from collections import deque",
  "visited = [False] * N",
  "queue = deque([0])",
  "visited[0] = True",
  "count = 1",
  "",
  "while queue:",
  "    i = queue.popleft()",
  "    x, y, d = arrows[i]",
  "    # Follow direction until hitting another arrow",
  "    nx, ny = x + dx[d], y + dy[d]",
  "    while (nx, ny) not in pos_map and \\",
  "          abs(nx) <= 1000 and abs(ny) <= 1000:",
  "        nx += dx[d]",
  "        ny += dy[d]",
  "    if (nx, ny) in pos_map:",
  "        j = pos_map[(nx, ny)]",
  "        if not visited[j]:",
  "            visited[j] = True",
  "            count += 1",
  "            queue.append(j)",
  "",
  "print(count)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExplodingArrowCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Arrows are placed on a grid, each pointing in a direction. When an arrow explodes, it triggers the next arrow in its direction. Count how many arrows explode in total!",
        "화살이 격자 위에 놓여 있고, 각각 한 방향을 가리켜. 화살이 폭발하면 그 방향의 다음 화살을 연쇄 폭발시켜. 총 몇 개가 폭발할까?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udca5"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Exploding Arrow</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P5</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Use BFS/DFS to simulate chain reactions. Each arrow points to the next one in its direction. Track visited arrows to avoid cycles.",
              "핵심: BFS/DFS로 연쇄 반응을 시뮬레이션해. 각 화살은 자기 방향의 다음 화살을 가리켜. 방문한 화살을 추적해서 순환을 피해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "3 arrows in a line, all pointing right: A -> B -> C. If A explodes first, how many total?",
        "3개의 화살이 일렬로 모두 오른쪽을 가리켜: A -> B -> C. A가 먼저 폭발하면 총 몇 개?"),
      question: t(E,
        "3 arrows in a row, all pointing right. First one triggers. Total explosions?",
        "화살 3개가 일렬로 모두 오른쪽. 첫 번째가 발동. 총 폭발 수?"),
      options: [
        t(E, "1", "1개"),
        t(E, "2", "2개"),
        t(E, "3", "3개"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! A triggers B, B triggers C. All 3 explode in a chain reaction.",
        "맞아! A가 B를 발동, B가 C를 발동. 연쇄 반응으로 3개 모두 폭발."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "3 arrows in a chain, all triggering the next one. How many explode?",
        "3개의 화살이 연쇄적으로 다음을 발동해. 몇 개가 폭발할까?"),
      question: t(E,
        "Chain of 3 arrows. How many explode total?",
        "화살 3개 체인. 총 몇 개 폭발?"),
      hint: t(E,
        "Each arrow triggers the next: 1 -> 2 -> 3. All three explode.",
        "각 화살이 다음을 발동: 1 -> 2 -> 3. 세 개 모두 폭발."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExplodingArrowCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Use BFS with a position map for efficient lookups. O(N * max_range) time in worst case.",
        "위치 맵으로 BFS를 사용해 효율적으로 탐색해. 최악의 경우 O(N * max_range) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>BFS Simulation</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Store arrow positions in a hash map. BFS from the first arrow, following each arrow's direction to find the next target.",
              "화살 위치를 해시맵에 저장. 첫 번째 화살에서 BFS, 각 화살의 방향을 따라 다음 대상을 찾아.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the BFS chain-reaction simulation!",
        "BFS 연쇄 반응 시뮬레이션 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
