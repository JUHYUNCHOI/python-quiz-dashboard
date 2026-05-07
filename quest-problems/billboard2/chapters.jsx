import { C, t } from "@/components/quest/theme";
import { getBillboard2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# Read billboard and feed billboard coordinates",
  "x1, y1, x2, y2 = map(int, input().split())",
  "x3, y3, x4, y4 = map(int, input().split())",
  "",
  "# Billboard dimensions",
  "bw = x2 - x1",
  "bh = y2 - y1",
  "area = bw * bh",
  "",
  "# Clamp feed billboard to billboard bounds",
  "cx1 = max(x1, x3)",
  "cy1 = max(y1, y3)",
  "cx2 = min(x2, x4)",
  "cy2 = min(y2, y4)",
  "",
  "# No overlap",
  "if cx1 >= cx2 or cy1 >= cy2:",
  "    print(area)",
  "# Feed covers entire billboard",
  "elif cx1 <= x1 and cx2 >= x2 and cy1 <= y1 and cy2 >= y2:",
  "    print(0)",
  "# Feed covers full left side",
  "elif cx1 <= x1 and cy1 <= y1 and cy2 >= y2:",
  "    print((x2 - cx2) * bh)",
  "# Feed covers full right side",
  "elif cx2 >= x2 and cy1 <= y1 and cy2 >= y2:",
  "    print((cx1 - x1) * bh)",
  "# Feed covers full top side",
  "elif cy2 >= y2 and cx1 <= x1 and cx2 >= x2:",
  "    print(bw * (cy1 - y1))",
  "# Feed covers full bottom side",
  "elif cy1 <= y1 and cx1 <= x1 and cx2 >= x2:",
  "    print(bw * (y2 - cy2))",
  "# Otherwise tarp = entire billboard",
  "else:",
  "    print(area)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeBillboard2Ch1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "There's a lawnmower billboard (an axis-aligned rectangle) and a cow-feed billboard (also axis-aligned) that may cover part of it.\nFind the area of the SMALLEST axis-aligned rectangle (a tarp) that covers every part of the lawnmower billboard NOT already hidden by the feed billboard.",
        "잔디깎이 광고판과 소 사료 광고판이 있어요. 둘 다 변이 축에 평행한 직사각형이에요. 사료 광고판이 잔디깎이 광고판의 일부를 가릴 수 있어요.\n잔디깎이 광고판에서 가려지지 않은 모든 부분을 덮을 수 있는 가장 작은 직사각형 타프의 면적을 출력해요. 타프도 변이 축에 평행해야 해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83e\udea7"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Blocked Billboard II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "lawnmower billboard", "잔디깎이 광고판")}</b>
                  {t(E, " (axis-aligned rectangle) and a ", " (축에 평행한 직사각형) 과 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "cow-feed billboard", "소 사료 광고판")}</b>
                  {t(E, " that may cover part of it.", " 이 있어요. 사료 광고판이 잔디깎이의 일부를 가릴 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We need a ", "잔디깎이 광고판 중 가려지지 않은 모든 부분을 덮는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "tarp — an axis-aligned rectangle", "타프 — 축에 평행한 직사각형")}</b>
                  {t(E, " — that covers every part of the lawnmower billboard NOT hidden by the feed billboard.",
                        " 가 필요해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "area of the SMALLEST such tarp", "가장 작은 타프의 면적")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "A 10x10 billboard (area 100).\nThe feed billboard covers the top half entirely.\nWhat is the tarp area?", "10x10 광고판(면적 100). 사료 광고판이 윗부분 절반을 완전히 덮어. 타프 면적은?"),
      question: t(E,
        "Billboard 10x10=100. Feed covers the entire top half. Tarp area?",
        "광고판 10x10=100. 사료가 윗절반 전체를 덮음. 타프 면적은?"),
      options: [
        t(E, "50 (bottom half rectangle)", "50 (아래 절반 직사각형)"),
        t(E, "100 (entire billboard)", "100 (전체 광고판)"),
        t(E, "0 (fully covered)", "0 (완전히 덮임)"),
      ],
      correct: 0,
      explain: t(E,
        "The feed covers the entire top side, so the exposed bottom half is a rectangle. Tarp = 10x5 = 50.",
        "사료가 윗면 전체를 덮으니 노출된 아랫절반이 직사각형이에요. 타프 = 10x5 = 50."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "Billboard is 6 wide, 3 tall (area 18).\nThe feed billboard does NOT overlap at all.\nWhat is the tarp area?", "광고판이 가로 6, 세로 3 (면적 18). 사료 광고판이 전혀 겹치지 않아. 타프 면적은?"),
      question: t(E,
        "Billboard 6x3=18, no overlap with feed. Tarp area?",
        "광고판 6x3=18, 사료와 겹침 없음. 타프 면적은?"),
      hint: t(E,
        "No overlap means the entire billboard is exposed. Tarp = full area.",
        "겹침이 없으면 전체 광고판이 노출돼요. 타프 = 전체 면적."),
      answer: 18,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeBillboard2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "The remaining (visible) part of the lawnmower billboard is rectangular ONLY if the feed billboard fully covers one of its full SIDES (left/right/top/bottom strip). Otherwise the visible part is L-shaped or has a hole — and the smallest rectangle that covers it is the whole lawnmower billboard.",
        "잔디깎이 광고판의 보이는 부분이 직사각형이 되는 건 사료 광고판이 한 쪽 변 전체 (왼/오/위/아래 띠) 를 덮을 때뿐이에요. 그 외에는 L 자 모양이나 구멍이 있어서 — 그걸 덮는 가장 작은 직사각형은 전체 광고판이에요."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBillboard2Sections(E),
    },
  ];
}
