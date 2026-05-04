import { C, t } from "@/components/quest/theme";
import { getMcc19Rect2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# Given 3 corners of a rectangle, find the 4th",
  "x1, y1 = map(int, input().split())",
  "x2, y2 = map(int, input().split())",
  "x3, y3 = map(int, input().split())",
  "",
  "# XOR trick: x4 = x1 ^ x2 ^ x3, y4 = y1 ^ y2 ^ y3",
  "# Works because in a rectangle, each coordinate",
  "# appears exactly twice among the 4 corners",
  "x4 = x1 ^ x2 ^ x3",
  "y4 = y1 ^ y2 ^ y3",
  "",
  "print(x4, y4)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19Rect2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An axis-aligned rectangle has 4 corners; 3 are given.\nPrint the COORDINATES of the 4th (missing) corner.",
        "축에 평행한 직사각형의 꼭짓점 4 개 중 3 개가 주어져요.\n누락된 4 번째 꼭짓점의 좌표를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>▭</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Rectangle 2</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P7</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "3 corners of an axis-aligned rectangle", "축에 평행한 직사각형의 꼭짓점 3 개")}</b>
                  {t(E, " (sides parallel to the x and y axes).",
                        " 가 주어져요 (변이 x, y 축에 평행).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "coordinates of the 4th (missing) corner", "누락된 4 번째 꼭짓점의 좌표")}</b>
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
        "Corners: (0,0), (2,0), (0,3).\nThe rectangle has x-values {0,2} and y-values {0,3}.\nWhat's the 4th corner?", "꼭짓점: (0,0), (2,0), (0,3). 직사각형의 x값은 {0,2}, y값은 {0,3}. 4번째 꼭짓점은?"),
      question: t(E,
        "3 corners: (0,0), (2,0), (0,3). 4th corner?",
        "3개 꼭짓점: (0,0), (2,0), (0,3). 4번째 꼭짓점은?"),
      options: [
        t(E, "(2, 3)", "(2, 3)"),
        t(E, "(0, 0)", "(0, 0)"),
        t(E, "(3, 2)", "(3, 2)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! x4 = 0 XOR 2 XOR 0 = 2, y4 = 0 XOR 0 XOR 3 = 3. The 4th corner is (2, 3).",
        "맞아! x4 = 0 XOR 2 XOR 0 = 2, y4 = 0 XOR 0 XOR 3 = 3. 4번째 꼭짓점은 (2, 3)."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Corners: (0,0), (2,0), (0,3). What is the x-coordinate of the 4th corner?", "꼭짓점: (0,0), (2,0), (0,3). 4번째 꼭짓점의 x좌표는?"),
      question: t(E,
        "4th corner x-coordinate = ?",
        "4번째 꼭짓점의 x좌표 = ?"),
      hint: t(E,
        "x4 = 0 XOR 2 XOR 0 = 2.",
        "x4 = 0 XOR 2 XOR 0 = 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19Rect2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Just XOR the three x-coordinates and XOR the three y-coordinates. O(1) time!", "세 x좌표를 XOR하고 세 y좌표를 XOR하면 돼요. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "XOR property: a ^ a = 0, a ^ 0 = a.\nIn a rectangle, each unique x/y appears twice. XOR of all 4 = 0, so missing = XOR of known 3.",
              "XOR 성질: a ^ a = 0, a ^ 0 = a. 직사각형에서 각 고유 x/y는 2번 등장.\n4개의 XOR = 0이므로 빠진 것 = 알려진 3개의 XOR.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19Rect2Sections(E),
    },
  ];
}
