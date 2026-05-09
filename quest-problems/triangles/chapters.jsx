import { C, t } from "@/components/quest/theme";
import { getTrianglesSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "points = []",
  "for _ in range(N):",
  "    x, y = map(int, input().split())",
  "    points.append((x, y))",
  "",
  "# Group points by x-coordinate and y-coordinate",
  "from collections import defaultdict",
  "by_x = defaultdict(list)",
  "by_y = defaultdict(list)",
  "for x, y in points:",
  "    by_x[x].append(y)",
  "    by_y[y].append(x)",
  "",
  "ans = 0",
  "# For each point as the right-angle vertex",
  "for x, y in points:",
  "    # vertical neighbors (same x, different y)",
  "    heights = [abs(y2 - y) for y2 in by_x[x] if y2 != y]",
  "    # horizontal neighbors (same y, different x)",
  "    widths = [abs(x2 - x) for x2 in by_y[y] if x2 != x]",
  "    for h in heights:",
  "        for w in widths:",
  "            ans = max(ans, h * w)",
  "",
  "print(ans)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeTrianglesCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N fence posts at integer (x, y) positions. He wants to choose three posts to form a RIGHT triangle whose two legs are parallel to the x and y axes.\nPrint TWICE the maximum area of such a triangle (to keep the answer integer).",
        "FJ 한테 정수 좌표 (x, y) 의 N 개 울타리 기둥이 있어요. 그중 세 기둥으로 직각 삼각형 — 두 변이 각각 x 축과 y 축에 평행한 — 을 만들어요.\n그 삼각형의 최대 넓이의 2 배 (소수 없이 정수로) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcd0"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Triangles</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output TWICE the maximum area of an axis-aligned right triangle from the N posts.",
                "축에 평행한 직각 삼각형의 최대 넓이의 2 배를 출력.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 한테 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "N fence posts at integer (x, y)", "정수 (x, y) 의 N 개 울타리 기둥")}</b>
                  {t(E, " positions.", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Choose 3 posts forming a ", "그중 세 기둥으로 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "right triangle with legs parallel to the axes", "두 변이 x 축과 y 축에 평행한 직각 삼각형")}</b>
                  {t(E, ".", " 을 만들어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TWICE the maximum area of such a triangle", "그 삼각형 최대 넓이의 2 배")}</b>
                  {t(E, " (to keep the output an integer).", " 를 출력해요 (소수 없이 정수로).")}
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
        "Points: (0,0), (1,0), (0,2).\nThe right angle is at (0,0).\nBase = 1, Height = 2.\nArea = 1.\nOutput = 2 * area = ?", "점: (0,0), (1,0), (0,2). 직각이 (0,0). 밑변 = 1, 높이 = 2. 넓이 = 1. 출력 = 2 * 넓이 = ?"),
      question: t(E,
        "Points (0,0),(1,0),(0,2). Right angle at origin. 2 * area = ?",
        "점 (0,0),(1,0),(0,2). 원점에서 직각. 2 * 넓이 = ?"),
      options: [
        t(E, "2", "2"),
        t(E, "1", "1"),
        t(E, "4", "4"),
      ],
      correct: 0,
      explain: t(E,
        "Base = 1 (along x), Height = 2 (along y). Area = 1*2/2 = 1. Output = 2*1 = 2.",
        "밑변 = 1 (x축), 높이 = 2 (y축). 넓이 = 1*2/2 = 1. 출력 = 2*1 = 2."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For points (0,0), (1,0), (0,2): what is 2 * max area?", "점 (0,0), (1,0), (0,2)에 대해: 최대 넓이 * 2는?"),
      question: t(E,
        "Points (0,0),(1,0),(0,2). Output 2 * max triangle area?",
        "점 (0,0),(1,0),(0,2). 최대 삼각형 넓이 * 2 출력?"),
      hint: t(E,
        "Find the right-angle vertex, then 2 × area = base × height.",
        "직각 꼭짓점을 찾고 2 × 넓이 = 밑변 × 높이."),
      answer: 2,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeTrianglesCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Treat each post as the right-angle CORNER. Find the farthest post sharing same x (height) and farthest sharing same y (base). 2 × area = base × height. Sections build it one piece at a time.",
        "각 기둥을 직각 꼭짓점으로 — 같은 x 의 가장 먼 기둥 (높이), 같은 y 의 가장 먼 기둥 (밑변). 2 × 넓이 = 밑변 × 높이. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getTrianglesSections(E),
    },
  ];
}
