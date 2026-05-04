import { C, t } from "@/components/quest/theme";
import { getSqPastureSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# Read two rectangles",
  "x1, y1, x2, y2 = map(int, input().split())",
  "x3, y3, x4, y4 = map(int, input().split())",
  "",
  "# Bounding box of both rectangles",
  "min_x = min(x1, x3)",
  "max_x = max(x2, x4)",
  "min_y = min(y1, y3)",
  "max_y = max(y2, y4)",
  "",
  "# Square side = max of width and height span",
  "side = max(max_x - min_x, max_y - min_y)",
  "",
  "print(side * side)",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (6 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSqPastureCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Two rectangular pastures on a field.\nFJ wants to build the smallest square fence that contains BOTH of them.\nWhat's the area?\n⬜", "들판에 직사각형 목초지 두 개가 있어요. FJ가 둘 다 포함하는 가장 작은 정사각형 울타리를 만들려 해요. 면적은? ⬜"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⬜</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Square Pasture</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2016 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8, textAlign: "left", whiteSpace: "pre-line" }}>
            {t(E,
              "Given: Two non-overlapping axis-aligned rectangles.\nFind: Minimum area of a square (sides parallel to axes) that encloses both.",
              "주어진 것: 겹치지 않는 축 평행 직사각형 2개.\n구할 것: 둘 다 포함하는 정사각형의 최소 면적 (축 평행).")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Find the bounding box — the smallest rectangle that contains both pastures.\nThis uses min/max of all coordinates!", "1단계: 바운딩 박스를 찾아 — 두 목초지를 모두 포함하는 가장 작은 직사각형. 모든 좌표의 min/max를 써요!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#d97706", marginBottom: 10, textAlign: "center" }}>
              {t(E, "Bounding Box", "바운딩 박스")}
            </div>
            {/* Visual: two rects inside a dashed bounding box */}
            <div style={{ position: "relative", width: 240, height: 140, margin: "0 auto" }}>
              {/* Bounding box */}
              <div style={{ position: "absolute", left: 0, top: 0, width: 240, height: 140, border: "2.5px dashed #d97706", borderRadius: 6 }} />
              {/* Rect A */}
              <div style={{ position: "absolute", left: 10, top: 50, width: 80, height: 80, background: "rgba(59,130,246,0.2)", border: "2px solid #3b82f6", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#3b82f6" }}>A</div>
              {/* Rect B */}
              <div style={{ position: "absolute", left: 150, top: 10, width: 80, height: 60, background: "rgba(34,197,94,0.2)", border: "2px solid #22c55e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#22c55e" }}>B</div>
            </div>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: "#d97706", fontWeight: 700 }}>
              {t(E, "Dashed = bounding box of A and B", "점선 = A와 B의 바운딩 박스")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "The bounding box uses: left = min(all x-lefts), right = max(all x-rights), bottom = min(all y-bottoms), top = max(all y-tops).", "바운딩 박스: 왼쪽 = min(모든 x-왼쪽), 오른쪽 = max(모든 x-오른쪽), 아래 = min(모든 y-아래), 위 = max(모든 y-위)."),
      question: t(E,
        "Rect A: (1,2)→(4,5). Rect B: (6,1)→(9,4). Bounding box width (x-span)?",
        "A: (1,2)→(4,5). B: (6,1)→(9,4). 바운딩 박스 가로?"),
      options: ["8 (= 9-1)", "5 (= 6-1)", "3 (= 4-1)"],
      correct: 0,
      explain: t(E,
        "Left = min(1,6) = 1. Right = max(4,9) = 9. Width = 9-1 = 8 ✅",
        "왼쪽 = min(1,6) = 1. 오른쪽 = max(4,9) = 9. 가로 = 9-1 = 8 ✅"),
    },
    {
      type: "reveal",
      narr: t(E,
        "Step 2: The bounding box might not be square!\nTo make it a square, take the LARGER of width and height as the side length.", "2단계: 바운딩 박스가 정사각형이 아닐 수 있어요! 정사각형으로 만들려면, 가로와 세로 중 큰 쪽을 변의 길이로!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ background: C.okBg, border: `2px solid ${C.okBd}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.ok, marginBottom: 8 }}>
              {t(E, "💡 Key Insight", "💡 핵심 관찰")}
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: C.text, lineHeight: 2 }}>
              side = max(width, height)
            </div>
            <div style={{ fontSize: 13, color: C.text, marginTop: 8, lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "If bounding box is 8 wide × 5 tall → square side = 8\nIf bounding box is 3 wide × 7 tall → square side = 7",
                "바운딩 박스가 가로 8 × 세로 5 → 정사각형 변 = 8\n바운딩 박스가 가로 3 × 세로 7 → 정사각형 변 = 7")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "The area of the square is side × side. Simple!", "정사각형의 면적 = 변 × 변. 간단해요!"),
      question: t(E,
        "Bounding box: width=5, height=3. Square side = max(5,3) = 5. Area?",
        "바운딩 박스: 가로=5, 세로=3. 정사각형 변 = max(5,3) = 5. 면적?"),
      options: ["25", "15", "8"],
      correct: 0,
      explain: t(E, "Side = 5. Area = 5² = 25 ✅", "변 = 5. 면적 = 5² = 25 ✅"),
    },
    {
      type: "input",
      narr: t(E,
        "A: (0,0)→(3,2).\nB: (5,1)→(8,6).\nBounding box: left=0, right=8, bottom=0, top=6.\nWidth=8, Height=6.\nSide = max(8,6) = 8.\nArea?", "A: (0,0)→(3,2).\nB: (5,1)→(8,6).\n바운딩 박스: 왼쪽=0, 오른쪽=8, 아래=0, 위=6.\n가로=8, 세로=6.\n변 = max(8,6) = 8.\n면적?"),
      question: t(E, "Side = 8. Area = 8² = ?", "변 = 8. 면적 = 8² = ?"),
      answer: 64,
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 빌드 (5 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSqPastureCh2(E, lang = "py") {
  return [
    {
      type: "reveal",
      narr: t(E,
        "The code is beautifully simple.\nRead 2 rectangles, find bounding box with min/max, compute square side, print area!", "코드가 아름답게 간단해요. 직사각형 2개 읽고, min/max로 바운딩 박스 찾고, 정사각형 변 계산, 면적 출력!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: "#6b7280" }}># Read two rectangles</div>
            <div style={{ color: "#e2e8f0" }}>x1,y1,x2,y2 = map(int, input().split())</div>
            <div style={{ color: "#e2e8f0" }}>x3,y3,x4,y4 = map(int, input().split())</div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Find the bounding box: min of all lefts/bottoms, max of all rights/tops.", "바운딩 박스 찾기: 모든 왼쪽/아래의 min, 모든 오른쪽/위의 max."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: "#e2e8f0" }}>min_x = <span style={{ color: "#fbbf24" }}>min</span>(x1, x3)</div>
            <div style={{ color: "#e2e8f0" }}>max_x = <span style={{ color: "#fbbf24" }}>max</span>(x2, x4)</div>
            <div style={{ color: "#e2e8f0" }}>min_y = <span style={{ color: "#fbbf24" }}>min</span>(y1, y3)</div>
            <div style={{ color: "#e2e8f0" }}>max_y = <span style={{ color: "#fbbf24" }}>max</span>(y2, y4)</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.accent, fontWeight: 700, textAlign: "center" }}>
            {t(E, "4 min/max calls = bounding box!", "min/max 4번 = 바운딩 박스!")}
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Why min for x1,x3 but max for x2,x4?", "왜 x1,x3에는 min이고 x2,x4에는 max일까요?"),
      question: t(E,
        "x1,x3 are left edges, x2,x4 are right edges. To enclose both:",
        "x1,x3은 왼쪽 끝, x2,x4는 오른쪽 끝. 둘 다 포함하려면:"),
      options: [
        t(E, "Start at the leftmost (min) and end at the rightmost (max)", "가장 왼쪽(min)에서 시작, 가장 오른쪽(max)에서 끝"),
        t(E, "Start at the rightmost and end at the leftmost", "가장 오른쪽에서 시작, 가장 왼쪽에서 끝"),
      ],
      correct: 0,
      explain: t(E, "We need to go from the leftmost left edge to the rightmost right edge to cover everything ✅", "모든 걸 포함하려면 가장 왼쪽부터 가장 오른쪽까지 ✅"),
    },
    {
      type: "reveal",
      narr: t(E,
        "Finally: square side = max of width and height. Area = side².", "마지막: 정사각형 변 = 가로와 세로 중 큰 값. 면적 = 변²."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: "#e2e8f0" }}>side = <span style={{ color: "#fbbf24" }}>max</span>(max_x - min_x, max_y - min_y)</div>
            <div style={{ color: "#e2e8f0" }}>print(side * side)</div>
          </div>
          <div style={{ marginTop: 8, textAlign: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: C.text, fontFamily: "'JetBrains Mono',monospace" }}>O(1)</span>
            <span style={{ fontSize: 12, color: C.dim, marginLeft: 8 }}>{t(E, "— just math!", "— 그냥 수학!")}</span>
          </div>
        </div>),
    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSqPastureSections(E),
    },
  ];
}
