import { C, t } from "@/components/quest/theme";
import { getMcc15RectSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    coords = []",
  "    for i in range(3):",
  "        x, y = map(int, input().split())",
  "        coords.append((x, y))",
  "    x1, y1 = coords[0]",
  "    x2, y2 = coords[1]",
  "    x3, y3 = coords[2]",
  "    # XOR trick: the missing coordinate",
  "    x4 = x1 ^ x2 ^ x3",
  "    y4 = y1 ^ y2 ^ y3",
  "    print(x4, y4)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15RectCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An axis-aligned rectangle has 4 corners; you're given 3 of them.\nPrint the COORDINATES of the missing 4th corner.",
        "축에 평행한 직사각형에는 꼭짓점이 4개 있고, 그중 3개가 주어져요.\n누락된 4번째 꼭짓점의 좌표를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u25ad"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Rectangle</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P1</div>
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
                  <b style={{ color: "#059669" }}>{t(E, "3 corners of an axis-aligned rectangle", "축에 평행한 직사각형의 꼭짓점 3개")}</b>
                  {t(E, " (sides parallel to the x and y axes).",
                        " 가 주어져요 (변이 x, y 축에 평행).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "coordinates of the 4th (missing) corner", "누락된 4번째 꼭짓점의 좌표")}</b>
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
        "Three corners of an axis-aligned rectangle are (0,0), (2,0), (0,3).\nWhat is the 4th corner?", "축 정렬 직사각형의 꼭짓점 3개가 (0,0), (2,0), (0,3)이예요. 4번째 꼭짓점은?"),
      question: t(E,
        "Corners: (0,0), (2,0), (0,3). 4th corner?",
        "꼭짓점: (0,0), (2,0), (0,3). 4번째 꼭짓점은?"),
      options: [
        "(2, 3)",
        "(3, 2)",
        "(1, 1)",
        "(2, 0)",
      ],
      correct: 0,
      explain: t(E,
        "x4 = 0^2^0 = 2, y4 = 0^0^3 = 3. The 4th corner is (2,3)!",
        "x4 = 0^2^0 = 2, y4 = 0^0^3 = 3. 4번째 꼭짓점은 (2,3)!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For corners (0,0), (2,0), (0,3), what is the x-coordinate of the 4th corner?", "꼭짓점 (0,0), (2,0), (0,3)일 때, 4번째 꼭짓점의 x좌표는?"),
      question: t(E,
        "Corners (0,0),(2,0),(0,3). x of 4th corner = ?",
        "꼭짓점 (0,0),(2,0),(0,3). 4번째 꼭짓점의 x좌표 = ?"),
      hint: t(E,
        "x appears in: 0, 2, 0. The unique one is 2. (Or XOR: 0^2^0 = 2)",
        "x가 나타나는 값: 0, 2, 0. 유일한 건 2. (또는 XOR: 0^2^0 = 2)"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15RectCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "The XOR trick gives us O(1) per test case. Super efficient!", "XOR 트릭으로 테스트 케이스당 O(1)! 초효율적!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(1) per case</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For an axis-aligned rectangle, each x and y value appears exactly twice.\nXOR of all three gives the missing one because a ^ a = 0 and a ^ 0 = a.",
              "축 정렬 직사각형에서 각 x, y 값은 정확히 2번 나타나.\n세 값의 XOR이 빠진 값을 주는 이유는 a ^ a = 0이고 a ^ 0 = a이기 때문이예요.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15RectSections(E),
    },
  ];
}
