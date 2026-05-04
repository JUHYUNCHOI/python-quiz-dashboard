import { C, t } from "@/components/quest/theme";
import { getCornerCoverSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "# An N x M grid always has 4 corners",
  "# unless N == 1 or M == 1 (then 2 corners)",
  "# unless N == 1 and M == 1 (then 1 corner)",
  "",
  "if N == 1 and M == 1:",
  "    print(1)",
  "elif N == 1 or M == 1:",
  "    print(2)",
  "else:",
  "    print(4)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCornerCoverCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N × M grid is given. Print how many DISTINCT corner cells the grid has — corners being the cells at the four 'extremes' of the rectangle.\n(A degenerate grid like 1×M or N×1 has only 2 distinct corners; a single cell 1×1 has only 1.)",
        "N × M 격자가 주어져요. 격자의 네 '끝' 에 위치한 칸들 — 즉 꼭짓점 칸 — 의 서로 다른 개수를 출력해요.\n(예외: 1×M 이나 N×1 같은 가늘어진 격자는 꼭짓점이 2개, 1×1 한 칸은 꼭짓점이 1개.)"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcd0"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Corner Cover</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N × M grid", "N × M 격자")}</b>
                  {t(E, " is given.", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "corner cell", "꼭짓점 칸")}</b>
                  {t(E, " is at one of the four 'extremes' of the rectangle (top-left, top-right, bottom-left, bottom-right).",
                        " 은 사각형의 네 끝 (좌상, 우상, 좌하, 우하) 중 하나의 위치에 있는 칸.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Degenerate grids: ", "예외: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "1 × M or N × 1 has 2 distinct corners; 1 × 1 has 1", "1 × M 이나 N × 1 은 꼭짓점이 2개, 1 × 1 은 1개")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of distinct corner cells", "서로 다른 꼭짓점 칸의 개수")}</b>
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
        "How many corners does a 3x5 grid have?", "3x5 격자의 꼭짓점은 몇 개예요?"),
      question: t(E,
        "A 3x5 rectangular grid has how many corner cells?",
        "3x5 직사각형 격자의 꼭짓점 셀은 몇 개?"),
      options: [
        t(E, "2", "2개"),
        t(E, "4", "4개"),
        t(E, "8", "8개"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Any rectangle with N>=2 and M>=2 has exactly 4 corner cells: top-left, top-right, bottom-left, bottom-right.",
        "맞아! N>=2, M>=2인 직사각형은 정확히 4개의 꼭짓점 셀이 있어: 좌상, 우상, 좌하, 우하."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For a 4x4 square grid, how many corners need covering?", "4x4 정사각형 격자에서 덮어야 할 꼭짓점은 몇 개?"),
      question: t(E,
        "N=4, M=4. How many corners?",
        "N=4, M=4. 꼭짓점은 몇 개?"),
      hint: t(E,
        "A square is a rectangle. It has 4 corners.",
        "정사각형은 직사각형이예요. 꼭짓점이 4개예요."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCornerCoverCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "This is a pure case-analysis problem. O(1) time!", "이건 순수 경우 분석 문제예요. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Three cases: single cell (1), line (2), rectangle (4).\nJust check the dimensions!",
              "세 가지 경우: 한 셀(1), 직선(2), 직사각형(4).\n차원만 확인하면 돼요!")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCornerCoverSections(E),
    },
  ];
}
