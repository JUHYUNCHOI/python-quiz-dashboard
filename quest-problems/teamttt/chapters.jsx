import { C, t } from "@/components/quest/theme";
import { getTeamTttSections, TeamLineChecker } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTttCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A 3×3 grid is filled with letters A..Z (each letter represents a cow). Eight 'lines' exist: 3 rows, 3 columns, 2 diagonals.\nA single cow WINS if her letter fills an entire line. A team of EXACTLY 2 cows wins if their two letters together fill a line.\nPrint (1) how many distinct cows win solo, (2) how many distinct 2-cow teams win.",
        "한 줄을 혼자 채운 소와 둘이서 채운 팀을 세어 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u274C"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Team Tic Tac Toe</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output two numbers: distinct solo winners, then distinct 2-cow team winners.",
                "혼자 우승한 소의 수와 2 명 팀으로 우승한 수, 두 개를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "3×3 grid filled with letters A..Z", "A..Z 글자로 채워진 3×3 격자")}</b>
                  {t(E, " — each letter is a cow.", " 가 있어요. 글자 하나가 소 한 마리예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Eight ", "모두 8 개의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "lines exist", "줄이 있어요")}</b>
                  {t(E, ": 3 rows, 3 columns, 2 diagonals.",
                        " — 3 행, 3 열, 그리고 대각선 2 개예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "solo win", "단독 우승")}</b>
                  {t(E, ": one cow's letter fills an entire line. A ", " 은 소 한 마리의 글자가 한 줄을 다 채운 거예요. ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "2-team win", "2명 팀 우승")}</b>
                  {t(E, ": exactly two distinct letters together fill a line.",
                        " 은 서로 다른 두 글자가 함께 한 줄을 채운 거예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print two numbers: ", "출력할 두 수는 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(1) distinct solo winners, (2) distinct 2-cow team winners", "(1) 단독 우승한 소의 수, (2) 우승한 2명 팀의 수")}</b>
                  {t(E, ".", " 예요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Interactive sim — feel the algorithm before code
    {
      type: "reveal",
      narr: t(E,
        "Before any code, play with the grid. Edit cells, edit team rosters, and watch the 8 lines get judged. The whole problem is just: take the SET of letters per line.",
        "칸을 직접 바꿔 보면 8 개 줄의 결과가 바로 나와요."),
      content: <TeamLineChecker E={E} />,
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consider grid AAA / BBB / CCC.\nEach row is filled by one letter.\nHow many individual winners are there?", "격자 AAA / BBB / CCC 는 행마다 글자가 하나예요."),
      question: t(E,
        "Grid: AAA / BBB / CCC. How many individual winners?",
        "격자 AAA / BBB / CCC 에서 개인 우승자는 몇 명일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "8", "8"),
      ],
      correct: 2,
      explain: t(E,
        "A wins row 1, B wins row 2, C wins row 3. That's 3 individual winners!",
        "A 는 1 행, B 는 2 행, C 는 3 행을 채웠어요. 개인 우승자는 3 명이에요!"),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Same grid AAA / BBB / CCC. How many individual winners?", "같은 격자예요. 개인 우승자는 몇 명일까요?"),
      question: t(E,
        "Grid AAA / BBB / CCC. Number of individual winners?",
        "이 격자에서 개인 우승자는 몇 명인가요?"),
      hint: t(E,
        "Scan each row, column, and diagonal — count solo wins.",
        "각 행, 열, 대각선을 하나씩 보면서 단독 우승을 세어 봐요."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTttCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Walk the 8 lines (3 rows + 3 cols + 2 diagonals). Take the SET of letters in its 3 cells: size 1 → solo win, size 2 → 2-cow team. Collect distinct winners. Sections build it one piece at a time.",
        "8 개 줄을 하나씩 보면서 우승을 가려낼게요."),
      sections: getTeamTttSections(E),
    },
  ];
}
