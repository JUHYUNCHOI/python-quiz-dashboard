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
        "Given 3 corners of an axis-aligned rectangle, find the 4th corner.\nThe sides are parallel to the x and y axes, so each x-coordinate and y-coordinate appears exactly twice!", "축에 정렬된 직사각형의 꼭짓점 3개가 주어지면 4번째 꼭짓점을 찾아. 변이 x축, y축에 평행하니까 각 x좌표와 y좌표가 정확히 2번씩 나타나!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u25ad"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Rectangle</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Use XOR trick! x4 = x1 ^ x2 ^ x3, y4 = y1 ^ y2 ^ y3. Since each coordinate appears twice except the missing one,\nXOR cancels pairs and leaves the answer.",
              "핵심: XOR 트릭!\nx4 = x1 ^ x2 ^ x3, y4 = y1 ^ y2 ^ y3. 각 좌표가 빠진 것 빼고 2번 나타나니까, XOR로 쌍이 소거되고 답만 남아.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Three corners of an axis-aligned rectangle are (0,0), (2,0), (0,3).\nWhat is the 4th corner?", "축 정렬 직사각형의 꼭짓점 3개가 (0,0), (2,0), (0,3)이야. 4번째 꼭짓점은?"),
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
              "축 정렬 직사각형에서 각 x, y 값은 정확히 2번 나타나.\n세 값의 XOR이 빠진 값을 주는 이유는 a ^ a = 0이고 a ^ 0 = a이기 때문이야.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15RectSections(E),
    },
  ];
}
