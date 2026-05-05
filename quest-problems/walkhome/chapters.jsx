import { C, t } from "@/components/quest/theme";
import { getWalkHomeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "grid = []",
  "for _ in range(N):",
  "    grid.append(input().strip())",
  "",
  "# DP: dp[r][c][dir][changes] = number of paths",
  "# dir: 0 = right, 1 = down, 2 = start (no direction yet)",
  "# changes: number of direction changes so far",
  "",
  "from functools import lru_cache",
  "",
  "@lru_cache(maxsize=None)",
  "def dp(r, c, direction, changes):",
  "    if r == N-1 and c == N-1:",
  "        return 1",
  "    if changes > K:",
  "        return 0",
  "    total = 0",
  "    # Move right",
  "    if c + 1 < N and grid[r][c+1] != 'H':",
  "        new_changes = changes",
  "        if direction == 1:  # was going down",
  "            new_changes += 1",
  "        if new_changes <= K:",
  "            total += dp(r, c+1, 0, new_changes)",
  "    # Move down",
  "    if r + 1 < N and grid[r+1][c] != 'H':",
  "        new_changes = changes",
  "        if direction == 0:  # was going right",
  "            new_changes += 1",
  "        if new_changes <= K:",
  "            total += dp(r+1, c, 1, new_changes)",
  "    return total",
  "",
  "if grid[0][0] == 'H':",
  "    print(0)",
  "else:",
  "    print(dp(0, 0, 2, 0))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie walks from (1, 1) (top-left) to (N, N) (bottom-right) on an N×N grid; some cells are HAYSTACKS ('H') she can't enter. She moves only RIGHT or DOWN.\nShe's also lazy — she changes direction (R↔D) at most K times during the walk.\nFor each test case, print the number of valid paths.",
        "베시가 N×N 격자에서 (1, 1) 좌상단부터 (N, N) 우하단까지 걸어요. 일부 칸은 H (건초더미) 라 못 들어가요. 이동은 오른쪽 또는 아래쪽만.\n베시가 게을러서 — 걷는 도중 방향 (R 또는 D) 을 최대 K 번까지만 바꿔요.\n각 테스트 케이스마다 유효한 경로의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfe0"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Walking Home</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N × N grid", "N × N 격자")}</b>
                  {t(E, " with some cells marked ", " 의 일부 칸이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "H (haystacks, blocked)", "H (건초더미, 통과 불가)")}</b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie walks from (1, 1) to (N, N) using only ", "베시가 (1, 1) → (N, N) 까지 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "RIGHT or DOWN moves", "오른쪽 또는 아래쪽 이동만")}</b>
                  {t(E, ".", " 으로 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She changes direction (R ↔ D) ", "방향 (R 또는 D) 을 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "at most K times", "최대 K 번")}</b>
                  {t(E, " during the walk.", " 까지만 바꿀 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of valid paths", "유효한 경로의 수")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "2x2 empty grid, K=1.\nPaths from (0,0) to (1,1): 'DR' (down then right) and 'RD' (right then down).\nBoth have exactly 1 direction change.", "2x2 빈 격자, K=1. (0,0)에서 (1,1)까지: 'DR'(아래 후 오른쪽)과 'RD'(오른쪽 후 아래). 둘 다 방향 전환 1번."),
      question: t(E,
        "2x2 empty grid, K=1. How many valid paths?",
        "2x2 빈 격자, K=1. 유효한 경로 수는?"),
      options: [
        t(E, "2 paths (DR and RD)", "2개 (DR과 RD)"),
        t(E, "1 path", "1개"),
        t(E, "4 paths", "4개"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! DR has 1 change (D->R), RD has 1 change (R->D). Both are <= K=1, so 2 paths.",
        "맞아! DR은 1번 전환(D->R), RD도 1번 전환(R->D). 둘 다 K=1 이하이므로 2개 경로."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2x2 empty grid, K=1. Count the paths!", "2x2 빈 격자, K=1. 경로 수를 세봐요!"),
      question: t(E,
        "2x2 grid, no obstacles, K=1. Number of paths?",
        "2x2 격자, 장애물 없음, K=1. 경로 수?"),
      hint: t(E,
        "Only 2 possible paths: right-down and down-right. Each has 1 direction change.",
        "가능한 경로 2개: 오른쪽-아래와 아래-오른쪽. 각각 방향 전환 1번."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "DP: dp[r][c][last_dir][changes] = number of paths to (r, c) arriving via last_dir with that many direction changes. Move right or down; bump changes if direction differs from last; prune when changes > K.",
        "DP: dp[r][c][last_dir][changes] = (r, c) 까지 last_dir 로 도착, 그만큼 전환한 경로 수. 오른쪽 또는 아래로 이동; 방향이 다르면 전환 +1; 전환 > K 면 가지치기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init dp[1][1][R][0] = dp[1][1][D][0] = 1", "dp[1][1][R][0] = dp[1][1][D][0] = 1"), code: "starting cell, no moves yet", color: "#8b5cf6" },
              { n: 2, label: t(E, "For each cell, try R and D", "각 칸에서 R 과 D 시도"), code: "for r, c, dir, changes: ...", color: "#7c3aed" },
              { n: 3, label: t(E, "Update changes if direction changes", "방향 바뀌면 전환 +1"), code: "new_changes = changes + (new_dir != dir);  prune if > K", color: "#0891b2" },
              { n: 4, label: t(E, "Sum dp[N][N][*][≤K]", "dp[N][N][*][≤K] 합산"), code: "print(answer)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#5b21b6", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#8b5cf6" }}>O(N² · K)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "small state space (K ≤ 3)", "작은 상태 공간 (K ≤ 3)")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getWalkHomeSections(E),
    },
  ];
}
