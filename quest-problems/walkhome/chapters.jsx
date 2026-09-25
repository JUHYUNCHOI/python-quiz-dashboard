import { C, t } from "@/components/quest/theme";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie walks (1,1)→(N,N) on an N×N grid avoiding haystacks, moving only RIGHT/DOWN and changing direction at most K times — print the number of valid paths.",
        "방향을 K 번까지만 바꿔 갈 수 있는 길이 몇 개일까요?"),
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
                "방향을 최대 K 번까지만 바꿔서 (1,1) 에서 (N,N) 까지 가는 길이 몇 개인지 출력해요.")}
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
    // 1-1b: 입출력 형식 + 제약 — photoshoot25 시즌 표준(2026-07-27) 그대로.
    // ⚠️ public/problems/ 에 walkhome PDF 가 없다 — USACO_VERIFICATION.md·docs/usaco-submit/
    //    를 다 뒤졌지만 원문 제약(N, K 상한)이 저장소 어디에도 없다. 숫자를 지어내지 않고
    //    "N, K 는 작다" 로만 말한다 (검증된 아래 CONSTRAINTS 자체는 코드로 직접 실행해 확인함).
    {
      type: "reveal",
      narr: t(E,
        "Each test case gives grid size, K, then the grid — print the path count.",
        "테스트 케이스마다 격자 크기와 K, 격자가 주어지고,\n길의 수를 출력해요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of test cases", "— 테스트 케이스 수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>N K</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— grid size, max direction changes", "— 격자 크기, 최대 방향 전환 횟수")}</span></div>
                <div style={{ marginTop: 2 }}><span style={{ color: "#92400e", fontWeight: 800 }}>grid</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— a row of N chars ('.' or 'H')", "— N 글자짜리 한 줄 ('.' 또는 'H')")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ grid line repeats N times", "↑ grid 줄이 N 번 반복")}</div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>{t(E, "↑ this whole block repeats T times", "↑ 이 블록 전체가 T 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "For each test case, the number of valid (1,1) to (N,N) paths (T lines).",
                  "테스트 케이스마다 (1,1) 에서 (N,N) 까지 가는 길의 수를 한 줄씩 출력해요 (T 줄).")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T</div>
              <div>{t(E, "grid cells: '.' or 'H' only", "grid 칸: '.' 또는 'H' 만 나와요")}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>
                {t(E, "N and K stay small enough that the DP table fills fast.",
                    "N 과 K 는 작게 주어져요. DP 표를 미리 다 채워도 충분히 빨라요.")}
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "2x2 empty grid, K=1.\nPaths from (0,0) to (1,1): 'DR' (down then right) and 'RD' (right then down).\nBoth have exactly 1 direction change.", "2x2 빈 격자에서 K=1 일 때 길이 몇 개일까요?"),
      question: t(E,
        "2x2 empty grid, K=1. How many valid paths?",
        "2x2 빈 격자에서 K=1 이에요. 갈 수 있는 길은 몇 개일까요?"),
      options: [
        t(E, "2 paths (DR and RD)", "2개 (DR과 RD)"),
        t(E, "1 path", "1개"),
        t(E, "4 paths", "4개"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! DR has 1 change (D->R), RD has 1 change (R->D). Both are <= K=1, so 2 paths.",
        "맞아요! DR 은 방향을 한 번 바꾸고(D→R), RD 도 한 번 바꿔요(R→D). 둘 다 K=1 을 넘지 않으니 길은 2개예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "2x2 empty grid, K=1. Count the paths!", "2x2 빈 격자에서 K=1 일 때 길을 세어 봐요."),
      question: t(E,
        "2x2 grid, no obstacles, K=1. Number of paths?",
        "2x2 격자에 장애물이 없고 K=1 이에요. 길은 몇 개일까요?"),
      hint: t(E,
        "List the possible paths and count those with at most K direction changes.",
        "갈 수 있는 길을 다 적어 보고, 방향을 K 번까지만 바꾼 것을 세어 봐요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeWalkHomeCh2(E, lang = "py") {
  return [
    // 2-1: CodeWalk — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14).
    {
      type: "opt-codewalk",
      narr: t(E,
        "The solution, start to finish — toggle Python ↔ C++ via the header.",
        "풀이를 처음부터 끝까지 봐요 — 위 헤더로 Python ↔ C++ 토글."),
    },
  ];
}
