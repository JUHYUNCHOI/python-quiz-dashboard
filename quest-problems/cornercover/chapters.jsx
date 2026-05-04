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
        "Given an N x M grid, find how many corner cells need to be covered.\nCorners are the cells at the four extremes of the grid.", "N x M 격자가 주어졌을 때, 덮어야 할 꼭짓점 셀의 수를 구해요. 꼭짓점은 격자의 네 끝에 있는 셀이예요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcd0"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Corner Cover</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: A rectangle has 4 corners.\nA line (1xM or Nx1) has 2 endpoints. A single cell has 1 corner. Count them!",
              "핵심: 직사각형은 꼭짓점이 4개.\n직선(1xM 또는 Nx1)은 끝점이 2개.\n한 셀은 꼭짓점이 1개.\n세어봐요!")}
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
