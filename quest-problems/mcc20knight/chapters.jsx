import { C, t } from "@/components/quest/theme";
import { getMcc20KnightSections, KnightMovesSim } from "./components";

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
        "A chess knight stands on an N × N board at a starting cell. Each move, it goes in an L-shape: 2 in one axis and 1 in the perpendicular axis (8 possible moves).\nPrint the MINIMUM number of moves to reach a target cell (or −1 if unreachable).",
        "체스 나이트가 N × N 보드의 시작 칸에 있어요. 한 번의 이동은 L 자 — 한 축으로 2 칸, 다른 축으로 1 칸 (8 가지 이동) 이에요.\n목표 칸에 도달하기 위한 최소 이동 횟수를 출력해요 (도달 불가면 -1)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u265e"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Knight</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2020 P4</div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#2563eb" }}>{t(E, "A chess knight on an N × N board", "N × N 보드의 체스 나이트")}</b>
                  {t(E, " at a starting cell.", " 가 시작 칸에 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each move is an ", "한 번의 이동은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "L-shape: 2 in one axis, 1 in the perpendicular (8 possible moves)", "L 자 — 한 축으로 2 칸, 다른 축으로 1 칸 (8 가지 이동)")}</b>
                  {t(E, ".", " 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MINIMUM moves to reach the target (or −1)", "목표 칸까지 최소 이동 횟수 (또는 −1)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Feel the L-shape — click a ★ to see where the knight lands. Each move is ±2 in one axis and ±1 in the other.",
        "L 자를 직접 느껴봐 — ★ 을 누르면 나이트가 어디 가는지 보여요. 한 축 ±2, 다른 축 ±1."),
      content: (<KnightMovesSim E={E} />),
    },
    {
      type: "quiz",
      narr: t(E,
        "Knight at (0,0), target (1,2). This is one L-shaped move. How many moves?", "나이트 (0,0), 목표 (1,2). L자 이동 1번. 몇 번?"),
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
        "Knight at (0,0), target (1,2). Min moves?", "나이트 (0,0), 목표 (1,2). 최소 이동?"),
      question: t(E,
        "(0,0) -> (1,2) in how many knight moves?",
        "(0,0) -> (1,2) 나이트 이동 몇 번?"),
      hint: t(E, "One L-shaped move: right 2, down 1 (or right 1, down 2).", "L자 이동 1번: 오른쪽 2, 아래 1 (또는 오른쪽 1, 아래 2)."),
      answer: 1,
    },
  ];
}

export function makeMcc20KnightCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "BFS from the start with the 8 knight moves (±1, ±2). Track distance per cell; first time we reach the target is the minimum.",
        "시작점에서 8 나이트 이동 (±1, ±2) BFS. 칸마다 거리 추적; 목표에 처음 도달한 시점이 최솟값."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc20KnightSections(E),
    },
  ];
}
