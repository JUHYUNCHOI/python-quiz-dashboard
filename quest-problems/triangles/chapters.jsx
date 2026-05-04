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
        "FJ 에게 정수 좌표 (x, y) 의 N 개 울타리 기둥이 있어요. 그중 세 기둥으로 직각 삼각형 — 두 변이 각각 x 축과 y 축에 평행한 — 을 만들어요.\n그 삼각형의 최대 넓이의 2 배 (분수 안 나오게) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcd0"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Triangles</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "N fence posts at integer (x, y)", "정수 (x, y) 의 N 개 울타리 기둥")}</b>
                  {t(E, " positions.", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Choose 3 posts forming a ", "그중 세 기둥으로 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "right triangle with legs parallel to the axes", "두 변이 x 축과 y 축에 평행한 직각 삼각형")}</b>
                  {t(E, ".", " 을 만들어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "TWICE the maximum area of such a triangle", "그 삼각형 최대 넓이의 2 배")}</b>
                  {t(E, " (to keep the output an integer).", " 를 출력해요 (정수 유지).")}
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
        "Area = base * height / 2 = 1 * 2 / 2 = 1. Answer = 2 * 1 = 2.",
        "넓이 = 밑변 * 높이 / 2 = 1 * 2 / 2 = 1. 답 = 2 * 1 = 2."),
      answer: 2,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeTrianglesCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Group by x and y, then for each point check all vertical/horizontal neighbors.\nO(N^2) in worst case but fast enough.", "x와 y로 그룹화, 각 점에서 수직/수평 이웃 확인. 최악 O(N^2)이지만 충분히 빨라요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N^2)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "For each point, find max vertical distance (same x) and max horizontal distance (same y).\nThe product gives 2 * area. Take the maximum over all points.",
              "각 점에서 최대 수직 거리(같은 x)와 최대 수평 거리(같은 y)를 찾아요.\n곱이 2 * 넓이.\n모든 점 중 최대값.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getTrianglesSections(E),
    },
  ];
}
