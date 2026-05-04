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
        "A lawnmower billboard is partially hidden by a cow feed billboard.\nWe need the minimum axis-aligned rectangular tarp to cover the exposed part of the lawnmower billboard.", "잔디 깎기 광고판이 소 사료 광고판에 의해 부분적으로 가려져 있어. 잔디 깎기 광고판의 노출된 부분을 덮을 최소 축 정렬 직사각형 타프를 구해야 해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udea7"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Blocked Billboard II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: The tarp must be a rectangle.\nIf the feed billboard covers a full side strip, the remaining exposed area is a rectangle (smaller tarp). If it covers an interior strip or corner, the exposed area is L-shaped, so the tarp must cover the entire billboard.",
              "핵심: 타프는 직사각형이어야 해.\n사료 광고판이 한 쪽 변 전체를 덮으면 남은 노출 부분이 직사각형(작은 타프). 내부 띠나 모서리를 덮으면 L자 모양이라 타프가 전체 광고판을 덮어야 해.")}
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
        "사료가 윗면 전체를 덮으니 노출된 아랫절반이 직사각형이야. 타프 = 10x5 = 50."),
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
        "겹침이 없으면 전체 광고판이 노출돼. 타프 = 전체 면적."),
      answer: 18,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeBillboard2Ch2(E, lang = "py") {
  return [
    // 2-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Check if the feed covers a full side of the billboard.\nIf so, tarp = remaining strip.\nOtherwise, tarp = entire billboard area.\nO(1) time!", "사료가 광고판의 한 변 전체를 덮는지 확인해. 그렇다면 타프 = 남은 띠. 아니면 타프 = 전체 광고판 면적. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Clamp the feed rectangle to billboard bounds.\nCheck 4 cases: feed covers left/right/top/bottom full strip. If none match, tarp = entire billboard.",
              "사료 직사각형을 광고판 범위로 클램프해.\n4가지 경우 확인: 사료가 왼/오/위/아래 전체 띠를 덮는지.\n해당 없으면 타프 = 전체 광고판.")}
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBillboard2Sections(E),
    },
  ];
}
