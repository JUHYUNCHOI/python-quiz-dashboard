import { C, t } from "@/components/quest/theme";
import { getModernArtSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "canvas = []",
  "for _ in range(N):",
  "    canvas.append(list(map(int, input().split())))",
  "",
  "# Find bounding box for each color",
  "bbox = {}  # color -> (minr, maxr, minc, maxc)",
  "for r in range(N):",
  "    for c in range(N):",
  "        col = canvas[r][c]",
  "        if col == 0:",
  "            continue",
  "        if col not in bbox:",
  "            bbox[col] = [r, r, c, c]",
  "        else:",
  "            bbox[col][0] = min(bbox[col][0], r)",
  "            bbox[col][1] = max(bbox[col][1], r)",
  "            bbox[col][2] = min(bbox[col][2], c)",
  "            bbox[col][3] = max(bbox[col][3], c)",
  "",
  "# A color can be first if no other color appears",
  "# inside its bounding box",
  "visible = set(bbox.keys())",
  "ans = 0",
  "for col in visible:",
  "    r1, r2, c1, c2 = bbox[col]",
  "    can_be_first = True",
  "    for r in range(r1, r2 + 1):",
  "        for c in range(c1, c2 + 1):",
  "            if canvas[r][c] != col and canvas[r][c] != 0:",
  "                # another color is on top inside our box",
  "                pass  # this is expected, doesn't disqualify",
  "    # Actually: color can be first if it's not inside",
  "    # any other color's bounding box",
  "    for other in visible:",
  "        if other == col:",
  "            continue",
  "        or1, or2, oc1, oc2 = bbox[other]",
  "        # if col's bbox is entirely inside other's bbox",
  "        if or1 <= r1 and r2 <= or2 and oc1 <= c1 and c2 <= oc2:",
  "            can_be_first = False",
  "            break",
  "    if can_be_first:",
  "        ans += 1",
  "",
  "# Colors not on canvas (1..9 minus visible) can also be first",
  "ans += (9 - len(visible))",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeModernArtCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N*N canvas has 9 colors painted as rectangles, one on top of another.\nWhich colors could have been painted first?\nA color not visible at all could have been first (painted over entirely).", "N*N 캔버스에 9가지 색이 직사각형으로 겹쳐 칠해져 있어. 어떤 색이 처음에 칠해졌을 수 있을까? 전혀 안 보이는 색도 처음일 수 있어 (완전히 덮여서)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfa8"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Modern Art</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Open Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Find each color's bounding box.\nA color can be first if its bounding box is not entirely contained inside another color's bounding box. Colors not on canvas can always be first.",
              "핵심: 각 색의 바운딩 박스를 구해.\n한 색의 바운딩 박스가 다른 색의 바운딩 박스 안에 완전히 포함되지 않으면 처음일 수 있어.\n캔버스에 없는 색은 항상 처음일 수 있어.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If only 1 color is visible on the entire canvas, could it have been painted first?", "캔버스에 1가지 색만 보이면, 그 색이 처음에 칠해졌을 수 있을까?"),
      question: t(E,
        "Only 1 color visible on canvas. Could it be the first painted?",
        "캔버스에 1가지 색만 보여. 처음에 칠해졌을 수 있어?"),
      options: [
        t(E, "Yes, nothing is on top of it", "맞아, 위에 아무것도 없으니까"),
        t(E, "No, it must be last", "아니, 마지막이어야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If only 1 color is visible, its bounding box isn't inside any other visible color's box. It can be first (and also last, since it's the only one).",
        "맞아! 1가지 색만 보이면 그 바운딩 박스가 다른 보이는 색의 박스 안에 없어. 처음일 수 있어 (유일하니까 마지막이기도 하고)."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If only 1 color is visible, answer 1 for 'yes it can be first'.", "1가지 색만 보이면 '처음일 수 있다'에 대해 1로 답해."),
      question: t(E,
        "Can 1 visible color be first? (1=yes, 0=no)",
        "보이는 색 1개가 처음일 수 있어? (1=예, 0=아니오)"),
      hint: t(E,
        "Yes! With only 1 visible color, no other color's box contains it. Answer: 1.",
        "맞아! 보이는 색이 1개뿐이면 다른 색의 박스에 포함되지 않아. 답: 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeModernArtCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Find bounding boxes in O(N^2), then compare all pairs of colors in O(9^2). Total O(N^2)!", "바운딩 박스 찾기 O(N^2), 색 쌍 비교 O(9^2). 총 O(N^2)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>{"O(N\u00b2)"}</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Scan the canvas to find bounding boxes.\nFor each visible color, check if its box is entirely inside another's. Also count non-visible colors (they can always be first).",
              "캔버스를 스캔해서 바운딩 박스를 찾아.\n각 보이는 색에 대해 박스가 다른 색 안에 완전히 포함되는지 확인.\n안 보이는 색도 세 (항상 처음일 수 있으니까).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getModernArtSections(E),
    },
  ];
}
