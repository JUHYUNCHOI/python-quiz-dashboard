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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Exploding Arrow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the total number of arrows that explode in the chain reaction from the start.",
                "시작 화살의 연쇄 반응으로 폭발하는 화살의 총 개수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A 2D grid contains arrows, each pointing in one of ", "2D 격자 위에 화살들이 있고, 각자 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "4 directions: N, S, E, W", "4 방향 N, S, E, W")}</b>
                  {t(E, ".", " 중 하나를 가리켜요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "When an arrow explodes, it ignites the ", "어떤 화살이 폭발하면, 그 방향의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "next arrow in its direction", "다음 화살")}</b>
                  {t(E, " (closest arrow in same row/column on that side) — chain reaction.",
                        " (같은 행/열에서 그쪽 방향의 가장 가까운 화살) 을 점화 — 연쇄 반응.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "Trace the chain — every arrow that gets ignited counts.",
        "연쇄를 따라가 봐 — 점화되는 화살을 모두 세어 봐."),
      answer: 3,
    },
    // 1-4: Deep-audit sim — trace the chain step by step
    {
      type: "reveal",
      narr: t(E,
        "Let's audit a tiny example carefully. 5 arrows on a grid. Start arrow A explodes — trace the chain row/column-by-direction, mark visited, count. Notice how a 'dead end' (no arrow ahead) just stops — it doesn't fail.",
        "작은 예제를 꼼꼼히 살펴봐요. 격자 위 화살 5개. 시작 화살 A가 폭발 — 방향대로 같은 행/열을 추적, 방문 표시, 카운트. '막다른 길' (앞에 화살 없음) 은 그냥 멈춰 — 실패가 아니에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f97316" }}>
              🔍 {t(E, "Deep Audit: Trace 5-Arrow Chain", "심층 추적: 화살 5개 연쇄")}
            </div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
              {t(E, "Grid view + step-by-step BFS log", "격자 + 단계별 BFS 로그")}
            </div>
          </div>

          {/* Grid sim — 5x5 layout */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", marginBottom: 8, textAlign: "center" }}>
              {t(E, "Initial Grid (5 arrows)", "초기 격자 (화살 5개)")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, maxWidth: 280, margin: "0 auto" }}>
              {[
                { r: 0, c: 0, label: "" }, { r: 0, c: 1, label: "" }, { r: 0, c: 2, label: "C", dir: "↓", color: "#dc2626" }, { r: 0, c: 3, label: "" }, { r: 0, c: 4, label: "E", dir: "←", color: "#7c3aed" },
                { r: 1, c: 0, label: "" }, { r: 1, c: 1, label: "" }, { r: 1, c: 2, label: "" }, { r: 1, c: 3, label: "" }, { r: 1, c: 4, label: "" },
                { r: 2, c: 0, label: "A", dir: "→", color: "#15803d" }, { r: 2, c: 1, label: "" }, { r: 2, c: 2, label: "B", dir: "↑", color: "#f97316" }, { r: 2, c: 3, label: "" }, { r: 2, c: 4, label: "D", dir: "→", color: "#0891b2" },
                { r: 3, c: 0, label: "" }, { r: 3, c: 1, label: "" }, { r: 3, c: 2, label: "" }, { r: 3, c: 3, label: "" }, { r: 3, c: 4, label: "" },
                { r: 4, c: 0, label: "" }, { r: 4, c: 1, label: "" }, { r: 4, c: 2, label: "" }, { r: 4, c: 3, label: "" }, { r: 4, c: 4, label: "" },
              ].map((cell, i) => (
                <div key={i} style={{
                  aspectRatio: "1",
                  background: cell.label ? "#fff" : "#fef3c7",
                  border: `1.5px solid ${cell.label ? cell.color : "#fde68a"}`,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontSize: 11,
                  fontWeight: 700,
                  color: cell.color || "#fbbf24",
                }}>
                  {cell.label && (
                    <>
                      <div style={{ fontSize: 13 }}>{cell.label}</div>
                      <div style={{ fontSize: 11 }}>{cell.dir}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#9a3412", marginTop: 8, textAlign: "center" }}>
              {t(E, "A→ at (2,0), B↑ at (2,2), C↓ at (0,2), D→ at (2,4), E← at (0,4)",
                  "A→ (2,0), B↑ (2,2), C↓ (0,2), D→ (2,4), E← (0,4)")}
            </div>
          </div>

          {/* BFS audit log */}
          <div style={{ background: "#0f172a", border: "1.5px solid #1e293b", borderRadius: 12, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fdba74", marginBottom: 8 }}>
              📋 {t(E, "BFS Audit Log", "BFS 추적 로그")}
            </div>
            <div style={{ fontSize: 11, color: "#e2e8f0", lineHeight: 1.7, fontFamily: "monospace" }}>
              <div><span style={{ color: "#94a3b8" }}>step 0:</span> queue=[A], visited={"{A}"}, count=1</div>
              <div><span style={{ color: "#94a3b8" }}>step 1:</span> pop A (→). {t(E, "Same row r=2: nearest right = B", "같은 행 r=2: 오른쪽 가장 가까운 = B")} → <span style={{ color: "#fbbf24" }}>visit B</span>, count=2</div>
              <div><span style={{ color: "#94a3b8" }}>step 2:</span> pop B (↑). {t(E, "Same col c=2: nearest up = C", "같은 열 c=2: 위쪽 가장 가까운 = C")} → <span style={{ color: "#fbbf24" }}>visit C</span>, count=3</div>
              <div><span style={{ color: "#94a3b8" }}>step 3:</span> pop C (↓). {t(E, "Same col c=2: nearest down = B (already visited)", "같은 열 c=2: 아래쪽 = B (이미 방문)")} → <span style={{ color: "#94a3b8" }}>skip</span></div>
              <div><span style={{ color: "#94a3b8" }}>step 4:</span> {t(E, "queue empty → done", "큐 비음 → 종료")}. count = <b style={{ color: "#15803d" }}>3</b></div>
            </div>
          </div>

          {/* Audit insight */}
          <div style={{ background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
              💡 {t(E, "Audit Insight", "심층 통찰")}
            </div>
            <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
              {t(E,
                "D and E never explode — A's chain never reaches them. The 'visited' set prevents re-counting B. A dead end (arrow has no neighbor in its direction) just stops that branch — the BFS keeps going.",
                "D와 E는 폭발하지 않아요 — A의 연쇄가 닿지 않아. 'visited' 집합이 B를 두 번 세는 것을 막아요. 막다른 길 (방향에 이웃 없음) 은 그 가지만 멈추고 BFS는 계속 진행.")}
            </div>
          </div>
        </div>),
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeExplodingArrowCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "BFS from the start arrow. For each exploding arrow, scan its row/column in its direction to find the nearest other arrow → push to queue if not yet exploded. Count exploded arrows. Sections build it one piece at a time.",
        "시작 화살에서 BFS. 폭발하는 각 화살의 방향으로 같은 행/열에서 가장 가까운 화살 → 미폭발이면 큐 추가. 폭발 수 카운트. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getExplodingArrowSections(E),
    },
  ];
}
