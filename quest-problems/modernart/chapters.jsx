import { C, t } from "@/components/quest/theme";
import { getModernArtSections } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeModernArtCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Find which colors could have been painted first.",
        "가장 먼저 칠해졌을 수 있는 색이 무엇인지 찾아봐요."),
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
                "가장 먼저 칠해졌을 수 있는 색이 몇 개인지 출력해요.")}
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
        "Paint rectangles one by one and see which colors get covered.",
        "직사각형을 하나씩 칠해 보며 어떤 색이 덮이는지 봐요."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If only 1 color is visible on the entire canvas, could it have been painted first?", "캔버스에 색이 하나만 보이면 그 색이 처음일 수 있을까요?"),
      question: t(E,
        "Only 1 color visible on canvas. Could it be the first painted?",
        "캔버스에 1가지 색만 보여요. 처음에 칠해졌을 수 있어요?"),
      options: [
        t(E, "Yes, nothing is on top of it", "네, 위에 덮인 색이 없으니까요"),
        t(E, "No, it must be last", "아니요, 마지막에 칠해야 해요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If only 1 color is visible, its bounding box isn't inside any other visible color's box. It can be first (and also last, since it's the only one).",
        "맞아요! 색이 하나뿐이면 그 색을 덮은 다른 색이 없어요.\n그러니 처음에 칠했다고 해도 아무 문제가 없어요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "If only 1 color is visible, answer 1 for 'yes it can be first'.", "보이는 색이 하나뿐일 때 답이 몇 개인지 적어 봐요."),
      question: t(E,
        "Can 1 visible color be first? (1=yes, 0=no)",
        "보이는 색 1개가 처음일 수 있어요? (1=예, 0=아니오)"),
      hint: t(E,
        "If nothing else is visible, what could be on top of it?",
        "다른 색이 하나도 안 보이면 그 위에 무엇이 덮여 있을까요?"),
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
        "Find each color's bounding box and check which sit inside another.",
        "색마다 바운딩 박스를 구해서 서로 안에 들어가는지 봐요."),
      sections: getModernArtSections(E),
    },
  ];
}
