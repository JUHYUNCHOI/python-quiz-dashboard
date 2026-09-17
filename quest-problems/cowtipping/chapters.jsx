import { C, t } from "@/components/quest/theme";
import { getCowTipSections, CowTipSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowTipCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has an N×N grid of 0s and 1s — each cow is either tipped over (0) or still standing (1). One operation: pick any cell (i, j) and FLIP every cell in the rectangle from (0, 0) to (i, j).\nFind the MINIMUM number of operations to turn the whole grid into all 0s.",
        "소를 모두 엎드리게 만드는 가장 적은 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Cow Tipping</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2017 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of rectangle-flip operations to turn the grid into all 0s.",
                "격자를 모두 0 으로 만드는 데 필요한 직사각형 뒤집기 최소 횟수를 출력해요.")}
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
                  {t(E, "FJ has an ", "FJ에게 ")}
                  <b style={{ color: "#059669" }}>{t(E, "N×N grid of 0s and 1s", "0과 1로 채워진 N×N 격자")}</b>
                  {t(E, " — each cow is either tipped over (0) or still standing (1).",
                        " 가 있어요 — 각 소는 엎드려 있거나(0) 서 있어요(1).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: pick any cell ", "한 번에 칸 ")}
                  <b style={{ color: "#7c3aed" }}>(i, j)</b>
                  {t(E, " and ", " 를 골라 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "FLIP every cell in the rectangle (0, 0) to (i, j)", "(0, 0) ~ (i, j) 의 직사각형 안 모든 칸을 뒤집어요")}</b>
                  {t(E, " (0 ↔ 1).", " (0 ↔ 1).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "격자를 모두 0 으로 만드는 데 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "필요한 가장 적은 횟수")}</b>
                  {t(E, " to turn the whole grid into all 0s.",
                        " 를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sandbox sim — feel the operation before reasoning about it
    {
      type: "reveal",
      narr: t(E,
        "Time to feel the rule yourself. Click a cell — the rectangle from (0, 0) to that cell flips. Try each preset and find the fewest tips.",
        "칸을 눌러서 직사각형이 뒤집히는 걸 봐요."),
      content: <CowTipSim E={E} />,
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consider grid [[1,0],[0,1]].\nProcess (1,1): it's 1, toggle (0,0)-(1,1).\nThen (1,0) and (0,1) need fixing.\nHow many total operations?", "격자 [[1,0],[0,1]] 은 몇 번 만에 끝날까요?"),
      question: t(E,
        "Grid [[1,0],[0,1]]: how many toggle operations needed?",
        "격자 [[1,0],[0,1]] 은 뒤집기가 몇 번 필요할까요?"),
      options: [
        t(E, "2 operations", "2번"),
        t(E, "3 operations", "3번"),
        t(E, "4 operations", "4번"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Toggle (0,0)-(1,1), then (0,0)-(0,1), then (0,0)-(1,0). 3 operations total.",
        "맞아요! (0,0)-(1,1), (0,0)-(0,1), (0,0)-(1,0) 을 차례로 뒤집어요. 모두 3번이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "For grid [[1,0],[0,1]], we showed 3 operations are needed. Enter that number.", "격자 [[1,0],[0,1]] 의 가장 적은 횟수를 적어 봐요."),
      question: t(E,
        "Grid [[1,0],[0,1]]: minimum toggles?",
        "격자 [[1,0],[0,1]] 의 가장 적은 뒤집기 횟수는 몇 번일까요?"),
      hint: t(E,
        "Process bottom-right to top-left — flip whenever you find a 1.",
        "오른쪽 아래부터 왼쪽 위로 가면서 1 을 만나면 그때마다 뒤집어 봐요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCowTipCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Process cells bottom-right → top-left. If a cell is 1, the only flip that doesn't disturb fixed cells is toggle (0,0)–(i,j) — so we must do it. Count forced operations. Sections build it one piece at a time.",
        "1 인 칸은 (0,0)~(i,j) 뒤집기 말고는 방법이 없어요."),
      sections: getCowTipSections(E),
    },
  ];
}
