import { C, t } from "@/components/quest/theme";

export const SOLUTION_CODE = [
  "from collections import deque",
  "",
  "N = int(input())",
  "sr, sc = map(int, input().split())",
  "tr, tc = map(int, input().split())",
  "",
  "moves = [(-2,-1),(-2,1),(-1,-2),(-1,2),",
  "         (1,-2),(1,2),(2,-1),(2,1)]",
  "",
  "dist = [[-1]*N for _ in range(N)]",
  "dist[sr][sc] = 0",
  "q = deque([(sr, sc)])",
  "",
  "while q:",
  "    r, c = q.popleft()",
  "    if r == tr and c == tc:",
  "        print(dist[r][c])",
  "        break",
  "    for dr, dc in moves:",
  "        nr, nc = r+dr, c+dc",
  "        if 0<=nr<N and 0<=nc<N and dist[nr][nc]==-1:",
  "            dist[nr][nc] = dist[r][c] + 1",
  "            q.append((nr, nc))",
];

export function makeMcc20KnightCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "A chess knight on an NxN grid. Find minimum moves to reach target using BFS. Knight moves in L-shapes.",
        "NxN 격자의 체스 나이트. BFS로 목표까지 최소 이동 횟수. 나이트는 L자로 이동."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u265e"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Knight</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P4</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: BFS with 8 possible knight moves. Each move is an L-shape (2+1 or 1+2). BFS gives shortest path.",
              "핵심: 8가지 나이트 이동으로 BFS. 각 이동은 L자 (2+1 또는 1+2). BFS가 최단 경로 제공.")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Knight at (0,0), target (1,2). This is one L-shaped move. How many moves?",
        "나이트 (0,0), 목표 (1,2). L자 이동 1번. 몇 번?"),
      question: t(E,
        "Knight at (0,0), target (1,2). Minimum moves?",
        "나이트 (0,0), 목표 (1,2). 최소 이동?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! (0,0) to (1,2) is exactly one knight move.",
        "맞아! (0,0)에서 (1,2)는 정확히 나이트 이동 1번."),
    },
    {
      type: "input",
      narr: t(E,
        "Knight at (0,0), target (1,2). Min moves?",
        "나이트 (0,0), 목표 (1,2). 최소 이동?"),
      question: t(E,
        "(0,0) -> (1,2) in how many knight moves?",
        "(0,0) -> (1,2) 나이트 이동 몇 번?"),
      hint: t(E, "One L-shaped move: right 2, down 1 (or right 1, down 2).", "L자 이동 1번: 오른쪽 2, 아래 1 (또는 오른쪽 1, 아래 2)."),
      answer: 1,
    },
  ];
}

export function makeMcc20KnightCh2(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "BFS from start with 8 knight moves. O(N^2) time.",
        "시작점에서 8가지 나이트 이동으로 BFS. O(N^2) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N^2)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Use deque for BFS. 8 possible moves per position. Track distances in a 2D array. Stop when reaching target.",
              "BFS에 deque 사용. 위치당 8가지 이동. 2D 배열로 거리 추적. 목표 도달 시 중단.")}
          </div>
        </div>),
    },
    {
      type: "code",
      narr: t(E, "Here's the BFS knight solution!", "BFS 나이트 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
