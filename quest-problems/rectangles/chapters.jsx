import { C, t } from "@/components/quest/theme";
import { getRectanglesSections } from "./components";

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
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u25ac"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Rectangles</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P5</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Formula: C(N+1, 2) * C(M+1, 2).\nAn N x M grid has (N+1) horizontal lines and (M+1) vertical lines. Pick 2 of each!",
              "공식: C(N+1, 2) * C(M+1, 2). N x M 격자에는 (N+1)개 수평선과 (M+1)개 수직선이 있어요.\n각각 2개씩 고르면 돼요!")}
          </div>
        </div>),
    },
    // 1-2: Quiz
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
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Calculate for a 2x2 grid yourself!", "직접 2x2 격자를 계산해봐요!"),
      question: t(E,
        "2x2 grid. Enter the number of rectangles:",
        "2x2 격자. 직사각형 수를 입력해:"),
      hint: t(E,
        "C(3,2) * C(3,2) = 3 * 3 = 9.",
        "C(3,2) * C(3,2) = 3 * 3 = 9."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeRectanglesCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Pick 2 horizontal lines from N+1 (the N+1 boundaries between N columns) and 2 vertical lines from M+1. Number of rectangles = C(N+1, 2) × C(M+1, 2).",
        "N+1 개의 수평선 (N 열의 경계 N+1 개) 중 2 개와 M+1 개의 수직선 중 2 개를 선택. 직사각형 수 = C(N+1, 2) × C(M+1, 2)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N, M", "N, M 읽기"), code: "N, M = map(int, input().split())", color: "#f97316" },
              { n: 2, label: t(E, "Choose 2 horizontal lines", "수평선 2 개 선택"), code: "h_choices = (N+1) * N // 2", color: "#7c3aed" },
              { n: 3, label: t(E, "Choose 2 vertical lines", "수직선 2 개 선택"), code: "v_choices = (M+1) * M // 2", color: "#0891b2" },
              { n: 4, label: t(E, "Multiply, print", "곱셈, 출력"), code: "print(h_choices * v_choices)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#9a3412", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#f97316" }}>O(1)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "constant arithmetic", "상수 산술")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getRectanglesSections(E),
    },
  ];
}
