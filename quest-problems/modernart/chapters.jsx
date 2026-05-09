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
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeModernArtCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "An N×N canvas was painted by stacking 9 axis-aligned rectangles of colors 1..9, one painting on top of another (later paintings cover earlier ones).\nWe see the FINAL canvas. Print which colors COULD have been the very first painting (i.e., are NOT forced to be painted over a different visible color).",
        "N × N 캔버스에 1..9 색의 9개 축에 평행한 직사각형 페인트가 한 번씩 차례로 칠해져요 (나중 페인트가 앞 페인트를 덮음).\n최종 캔버스가 주어졌을 때, 가장 먼저 칠해졌을 수 있는 색들 — 즉 다른 보이는 색 위에 칠해질 필요가 없는 색들 — 을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfa8"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Modern Art</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2017 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the count of colors that could have been painted first.",
                "가장 먼저 칠해졌을 수 있는 색의 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "An ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "N × N canvas", "N × N 캔버스")}</b>
                  {t(E, " was painted by stacking ", " 에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "9 axis-aligned rectangles of colors 1..9", "1..9 색의 9개 축에 평행한 직사각형")}</b>
                  {t(E, " — each later painting covers earlier ones beneath it.",
                        " 가 차례로 칠해졌고, 나중 페인트가 앞 페인트를 덮어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "final canvas after all 9 paintings", "9번의 페인트가 끝난 최종 캔버스")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print every color that ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "could possibly have been the FIRST painted", "가장 먼저 칠해졌을 수 있는 모든 색")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Paint-stack sim
    {
      type: "sim",
      narr: t(E,
        "Pick a 4×4 or 5×5 canvas, then paint rectangles one by one. Watch which colors stay visible and which get fully covered. The counter on the right is the answer for this preset.",
        "4×4 또는 5×5 캔버스를 골라 직사각형을 하나씩 칠해봐. 어떤 색이 보이고 어떤 색이 완전히 덮이는지 봐요. 오른쪽 숫자가 이 프리셋의 정답이에요."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If only 1 color is visible on the entire canvas, could it have been painted first?", "캔버스에 1가지 색만 보이면, 그 색이 처음에 칠해졌을 수 있을까?"),
      question: t(E,
        "Only 1 color visible on canvas. Could it be the first painted?",
        "캔버스에 1가지 색만 보여요. 처음에 칠해졌을 수 있어요?"),
      options: [
        t(E, "Yes, nothing is on top of it", "맞아, 위에 아무것도 없으니까"),
        t(E, "No, it must be last", "아니, 마지막이어야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If only 1 color is visible, its bounding box isn't inside any other visible color's box. It can be first (and also last, since it's the only one).",
        "맞아! 1가지 색만 보이면 그 바운딩 박스가 다른 보이는 색의 박스 안에 없어요. 처음일 수 있어 (유일하니까 마지막이기도 하고)."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "If only 1 color is visible, answer 1 for 'yes it can be first'.", "1가지 색만 보이면 '처음일 수 있다'에 대해 1로 답해요."),
      question: t(E,
        "Can 1 visible color be first? (1=yes, 0=no)",
        "보이는 색 1개가 처음일 수 있어요? (1=예, 0=아니오)"),
      hint: t(E,
        "If nothing else is visible, what could be on top of it?",
        "다른 색이 안 보이면 그 위에 뭐가 있을 수 있을까?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeModernArtCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "For each color, find its bounding box. A color cannot be first if its bounding box sits entirely inside another color's bounding box (it must have been painted on top). Otherwise it can be first. Sections build it one piece at a time.",
        "각 색의 바운딩 박스 찾기. 어떤 색의 박스가 다른 색의 박스 안에 완전히 들어가면 첫 번째 불가 (그 위에 칠해진 거). 아니면 첫 번째 가능. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getModernArtSections(E),
    },
  ];
}
