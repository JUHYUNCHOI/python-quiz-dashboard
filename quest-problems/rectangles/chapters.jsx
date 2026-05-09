import { C, t } from "@/components/quest/theme";
import { getRectanglesSections, RectangleCountSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "",
  "# Count axis-aligned rectangles in an N x M grid",
  "# Choose 2 horizontal lines from (N+1) and",
  "# 2 vertical lines from (M+1)",
  "# C(N+1, 2) * C(M+1, 2)",
  "",
  "def comb2(x):",
  "    return x * (x - 1) // 2",
  "",
  "result = comb2(N + 1) * comb2(M + 1)",
  "print(result)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRectanglesCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given an N x M grid, count all axis-aligned rectangles.\nA rectangle is defined by choosing 2 horizontal and 2 vertical grid lines.", "N x M 격자가 주어지면, 모든 축 정렬 직사각형을 세. 직사각형은 수평선 2개와 수직선 2개를 선택해서 정의돼요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u25ac"}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Rectangles</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P5</div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", margin: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of axis-aligned rectangles in an N × M grid.",
                "N × M 격자 안의 축에 평행한 직사각형의 개수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Formula: C(N+1, 2) * C(M+1, 2).\nAn N x M grid has (N+1) horizontal lines and (M+1) vertical lines. Pick 2 of each!",
              "공식: C(N+1, 2) * C(M+1, 2). N x M 격자에는 (N+1)개 수평선과 (M+1)개 수직선이 있어요.\n각각 2개씩 고르면 돼요!")}
          </div>
        </div>),
    },
    // 1-2: Sim — pick 2 horizontal + 2 vertical lines
    {
      type: "reveal",
      narr: t(E,
        "Pick 2 of the (N+1) horizontal lines and 2 of the (M+1) vertical lines. Every such choice = exactly one rectangle. Step through them to count by hand.",
        "(N+1) 개 수평선 중 2 개 + (M+1) 개 수직선 중 2 개 선택 → 직사각형 1 개. 한 번씩 넘기면서 직접 세어 봐요."),
      content: (
        <div style={{ padding: 6 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 10, padding: "8px 12px", margin: "0 8px 8px", fontSize: 12, color: "#9a3412", lineHeight: 1.6 }}>
            <b>{t(E, "Why this works", "왜 이게 맞을까")}:</b>{" "}
            {t(E,
              "Every axis-aligned rectangle is uniquely defined by 2 horizontal grid lines (top + bottom) and 2 vertical grid lines (left + right). So counting rectangles = counting these line pairs.",
              "축에 평행한 모든 직사각형은 수평선 2 개(위·아래) + 수직선 2 개(왼·오)로 유일하게 정의돼요. 그래서 직사각형 수 = 선 짝 고르는 수.")}
          </div>
          <RectangleCountSim E={E} />
        </div>
      ),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "For a 2x2 grid: C(3,2) * C(3,2) = 3 * 3 = 9 rectangles. Right?", "2x2 격자: C(3,2) * C(3,2) = 3 * 3 = 9개 직사각형. 맞지?"),
      question: t(E,
        "2x2 grid. How many rectangles? C(3,2) * C(3,2) = ?",
        "2x2 격자. 직사각형 수? C(3,2) * C(3,2) = ?"),
      options: [
        t(E, "4", "4"),
        t(E, "6", "6"),
        t(E, "9", "9"),
        t(E, "12", "12"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! C(3,2) = 3, so 3 * 3 = 9 rectangles.",
        "맞아! C(3,2) = 3이니까, 3 * 3 = 9개 직사각형이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Calculate for a 2x2 grid yourself!", "직접 2x2 격자를 계산해봐요!"),
      question: t(E,
        "2x2 grid. Enter the number of rectangles:",
        "2x2 격자. 직사각형 수를 입력해:"),
      hint: t(E,
        "Apply the formula with N=2, M=2.",
        "공식에 N=2, M=2 를 대입해 봐."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRectanglesCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Pick 2 horizontal lines from N+1 and 2 vertical lines from M+1. Total = C(N+1, 2) × C(M+1, 2). Sections build it one piece at a time.",
        "N+1 개 수평선 중 2 개와 M+1 개 수직선 중 2 개 선택. 총 = C(N+1, 2) × C(M+1, 2). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getRectanglesSections(E),
    },
  ];
}
