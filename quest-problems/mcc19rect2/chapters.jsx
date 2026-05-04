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
        "Given 3 corners of an axis-aligned rectangle, find the 4th corner.\nKey insight: XOR!\nEach x-coordinate appears exactly twice, so x4 = x1 XOR x2 XOR x3.", "축에 정렬된 직사각형의 3개 꼭짓점이 주어지면 4번째를 찾아. 핵심: XOR! 각 x좌표는 정확히 2번 나타나니까 x4 = x1 XOR x2 XOR x3."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>▭</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Rectangle 2</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P7</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: In a rectangle, the 4 x-coords form 2 pairs.\nXOR cancels pairs: a XOR a = 0. So x4 = x1 XOR x2 XOR x3. Same for y.",
              "핵심: 직사각형에서 4개의 x좌표는 2쌍을 형성.\nXOR은 쌍을 상쇄: a XOR a = 0. 그래서 x4 = x1 XOR x2 XOR x3. y도 마찬가지.")}
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
        "Just XOR the three x-coordinates and XOR the three y-coordinates. O(1) time!", "세 x좌표를 XOR하고 세 y좌표를 XOR하면 돼. O(1) 시간!"),
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
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19Rect2Sections(E),
    },
  ];
}
