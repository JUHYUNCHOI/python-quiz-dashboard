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
        "An N×N canvas was painted by stacking 9 axis-aligned rectangles of colors 1..9, one painting on top of another (later paintings cover earlier ones).\nWe see the FINAL canvas. Print which colors COULD have been the very first painting (i.e., are NOT forced to be painted over a different visible color).",
        "N × N 캔버스에 1..9 색의 9개 축에 평행한 직사각형 페인트가 한 번씩 차례로 칠해져요 (나중 페인트가 앞 페인트를 덮음).\n최종 캔버스가 주어졌을 때, 가장 먼저 칠해졌을 수 있는 색들 — 즉 다른 보이는 색 위에 칠해질 필요가 없는 색들 — 을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfa8"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Modern Art</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Open Bronze #3</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
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
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "final canvas after all 9 paintings", "9번의 페인트가 끝난 최종 캔버스")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
    // 1-2: Quiz
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
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If only 1 color is visible, answer 1 for 'yes it can be first'.", "1가지 색만 보이면 '처음일 수 있다'에 대해 1로 답해요."),
      question: t(E,
        "Can 1 visible color be first? (1=yes, 0=no)",
        "보이는 색 1개가 처음일 수 있어요? (1=예, 0=아니오)"),
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
        "For each color, find its bounding box. A color CANNOT be first if any other color's bounding box contains a cell that's currently this color (it must have been painted on top). Visible-only colors with no such contradiction can be first.",
        "각 색의 바운딩 박스 찾기. 색이 첫 번째일 수 없는 경우: 다른 색의 바운딩 박스가 이 색의 칸을 포함 (위에 칠해진 거여야 함). 그런 모순이 없는 보이는 색만 첫 번째 가능."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Find bounding box per color", "색별 바운딩 박스"), code: "for each color present: bbox[c] = (min_r, min_c, max_r, max_c)", color: "#059669" },
              { n: 2, label: t(E, "For each color c1", "각 색 c1"), code: "for c1 in present_colors:", color: "#7c3aed" },
              { n: 3, label: t(E, "Check if any c2 hides cells of c1", "c1 칸이 c2 박스 안에 있나"), code: "for c2 != c1: if c1 cells inside bbox[c2]: c1 cannot be first", color: "#0891b2" },
              { n: 4, label: t(E, "Add non-visible + valid visible", "안 보이는 + 유효한 보이는 색 추가"), code: "print non-visible count + valid visible count", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N²)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "scan canvas + check 9² color pairs", "캔버스 스캔 + 9² 색 쌍 검사")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getModernArtSections(E),
    },
  ];
}
