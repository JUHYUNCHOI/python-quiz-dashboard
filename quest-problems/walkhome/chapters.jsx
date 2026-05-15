import { C, t } from "@/components/quest/theme";
import { getWalkHomeSections } from "./components";

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
        "Bessie가 N×N 격자에서 (1, 1) 좌상단부터 (N, N) 우하단까지 걸어요. 일부 칸은 H (건초더미) 라 못 들어가요. 이동은 오른쪽 또는 아래쪽만.\nBessie가 게을러서 — 걷는 도중 방향 (R 또는 D) 을 최대 K 번까지만 바꿔요.\n각 테스트 케이스마다 유효한 경로의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfe0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Walking Home</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2021 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of valid (1,1) → (N,N) paths with at most K direction changes.",
                "방향 전환을 최대 K 번까지만 쓰는 (1,1) → (N,N) 유효 경로 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N × N grid", "N × N 격자")}</b>
                  {t(E, " with some cells marked ", " 의 일부 칸이 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "H (haystacks, blocked)", "H (건초더미, 통과 불가)")}</b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie walks from (1, 1) to (N, N) using only ", "Bessie가 (1, 1) → (N, N) 까지 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "RIGHT or DOWN moves", "오른쪽 또는 아래쪽 이동만")}</b>
                  {t(E, ".", " 으로 가요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She changes direction (R ↔ D) ", "방향 (R 또는 D) 을 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "at most K times", "최대 K 번")}</b>
                  {t(E, " during the walk.", " 까지만 바꿀 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "List the possible paths and count those with at most K direction changes.",
        "가능한 경로를 다 적어 보고 방향 전환이 K 이하인 것만 세어 봐."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "DP: dp[r][c][last_dir][changes] = paths to (r, c) arriving via last_dir with that many changes. Move right/down; +1 changes when direction flips; prune when changes > K. Sections build it one piece at a time.",
        "DP: dp[r][c][last_dir][changes] = (r, c) 까지 last_dir 로 도착한 경로 수. 오른쪽/아래 이동, 방향 바뀌면 +1, > K 면 가지치기. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getWalkHomeSections(E),
    },
  ];
}
