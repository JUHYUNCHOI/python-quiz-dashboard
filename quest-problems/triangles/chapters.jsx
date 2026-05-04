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
        "Treat each post as the right-angle CORNER. From it, find the FARTHEST post sharing the same x (gives the vertical leg = height) and the FARTHEST sharing the same y (horizontal leg = base). 2 × area = base × height.",
        "각 기둥을 직각 꼭짓점으로 봐요. 거기서 같은 x 의 가장 먼 기둥 (높이 = 수직 변), 같은 y 의 가장 먼 기둥 (밑변 = 수평 변) 을 찾아요. 2 × 넓이 = 밑변 × 높이."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Group posts by x and by y", "x, y 별로 그룹화"), code: "by_x = defaultdict(list);  by_y = defaultdict(list)", color: "#d97706" },
              { n: 2, label: t(E, "For each post (corner candidate)", "각 기둥 (꼭짓점 후보)"), code: "for x, y in posts:", color: "#7c3aed" },
              { n: 3, label: t(E, "Find farthest with same x and same y", "같은 x, 같은 y 에서 가장 먼 것"), code: "max_dy = max(|y' - y|);  max_dx = max(|x' - x|)", color: "#0891b2" },
              { n: 4, label: t(E, "Update best 2 × area", "최대 2 × 넓이 갱신"), code: "best = max(best, max_dy * max_dx);  print(best)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "for each post, scan its x/y groups", "기둥마다 x/y 그룹 스캔")}</div>
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
