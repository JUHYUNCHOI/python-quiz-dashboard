import { C, t } from "@/components/quest/theme";
import { getExplodingArrowSections } from "./components";

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
        "Arrows are placed on a 2D grid, each pointing N/S/E/W. When an arrow EXPLODES, it ignites the NEXT arrow in its direction (the closest arrow in the same row/column on that side) — and that arrow then explodes too, in a chain reaction.\nGiven a start arrow, print how many arrows in total explode.",
        "2D 격자 위에 N/S/E/W 한 방향을 가리키는 화살들이 놓여 있어요. 어떤 화살이 폭발하면, 그 방향의 다음 화살 (같은 행/열에서 그쪽 방향에 있는 가장 가까운 화살) 을 점화해요 — 그 화살도 폭발하며 연쇄가 이어져요.\n시작 화살이 주어졌을 때, 결국 폭발하는 화살의 총 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udca5"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Exploding Arrow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P5</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A 2D grid contains arrows, each pointing in one of ", "2D 격자 위에 화살들이 있고, 각자 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "4 directions: N, S, E, W", "4 방향 N, S, E, W")}</b>
                  {t(E, ".", " 중 하나를 가리켜요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "When an arrow explodes, it ignites the ", "어떤 화살이 폭발하면, 그 방향의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "next arrow in its direction", "다음 화살")}</b>
                  {t(E, " (closest arrow in same row/column on that side) — chain reaction.",
                        " (같은 행/열에서 그쪽 방향의 가장 가까운 화살) 을 점화 — 연쇄 반응.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Given a start arrow, print the ", "시작 화살이 주어지면 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "TOTAL number of arrows that explode", "폭발하는 화살의 총 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "3 arrows in a line, all pointing right: A -> B -> C. If A explodes first, how many total?", "3개의 화살이 일렬로 모두 오른쪽을 가리켜: A -> B -> C. A가 먼저 폭발하면 총 몇 개?"),
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
        "3 arrows in a chain, all triggering the next one. How many explode?", "3개의 화살이 연쇄적으로 다음을 발동해요. 몇 개가 폭발할까?"),
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
export function makeExplodingArrowCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "BFS from the start arrow. For each exploding arrow, scan its row/column in its direction to find the NEAREST other arrow — push that one onto the queue if not already exploded. Count exploded arrows.",
        "시작 화살에서 BFS. 폭발하는 각 화살에 대해, 그 방향의 같은 행/열에서 가장 가까운 다른 화살을 찾아 — 아직 폭발 안 했다면 큐에 추가. 폭발한 화살 수 카운트."),
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
      sections: getExplodingArrowSections(E),
    },
  ];
}
