import { C, t } from "@/components/quest/theme";
import { getTeamTttSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "grid = []",
  "for _ in range(3):",
  "    grid.append(input())",
  "",
  "lines = []",
  "for r in range(3):",
  "    lines.append((grid[r][0], grid[r][1], grid[r][2]))",
  "for c in range(3):",
  "    lines.append((grid[0][c], grid[1][c], grid[2][c]))",
  "lines.append((grid[0][0], grid[1][1], grid[2][2]))",
  "lines.append((grid[0][2], grid[1][1], grid[2][0]))",
  "",
  "individual = set()",
  "team = set()",
  "",
  "for a, b, c in lines:",
  "    s = {a, b, c}",
  "    if len(s) == 1:",
  "        individual.add(a)",
  "    elif len(s) == 2:",
  "        team.add(frozenset(s))",
  "",
  "print(len(individual))",
  "print(len(team))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTttCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A 3×3 grid is filled with letters A..Z (each letter represents a cow). Eight 'lines' exist: 3 rows, 3 columns, 2 diagonals.\nA single cow WINS if her letter fills an entire line. A team of EXACTLY 2 cows wins if their two letters together fill a line.\nPrint (1) how many distinct cows win solo, (2) how many distinct 2-cow teams win.",
        "3×3 격자에 A..Z 글자가 채워져 있어요 (각 글자가 소 1마리). 8개의 '줄' 이 있어요: 3행, 3열, 2대각선.\n한 소가 자기 글자로 한 줄 전체를 채우면 단독 우승. 정확히 2마리 소의 글자가 합쳐서 한 줄을 채우면 그 2명이 팀 우승.\n(1) 단독 우승하는 서로 다른 소의 수, (2) 우승한 서로 다른 2명 팀의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u274C"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Team Tic Tac Toe</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "3×3 grid filled with letters A..Z", "A..Z 글자로 채워진 3×3 격자")}</b>
                  {t(E, " — each letter is a cow.", " 가 있어요 — 각 글자가 소 1마리.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Eight ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "lines exist", "줄이 있어요")}</b>
                  {t(E, ": 3 rows, 3 columns, 2 diagonals.",
                        ": 3행, 3열, 2개의 대각선.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "solo win", "단독 우승")}</b>
                  {t(E, ": one cow's letter fills an entire line. A ", ": 한 소의 글자가 한 줄을 모두 채움. ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "2-team win", "2명 팀 우승")}</b>
                  {t(E, ": exactly two distinct letters together fill a line.",
                        ": 정확히 2개의 다른 글자가 합쳐 한 줄을 채움.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print two numbers: ", "두 수를 출력: ")}
                  <b style={{ color: "#15803d" }}>{t(E, "(1) distinct solo winners, (2) distinct 2-cow team winners", "(1) 단독 우승한 소의 수, (2) 우승한 2명 팀의 수")}</b>
                  {t(E, ".", ".")}
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
        "Consider grid AAA / BBB / CCC.\nEach row is filled by one letter.\nHow many individual winners are there?", "격자 AAA / BBB / CCC를 생각해봐요. 각 행이 한 문자로 채워져 있어요. 개인 우승자는 몇 명이예요?"),
      question: t(E,
        "Grid: AAA / BBB / CCC. How many individual winners?",
        "격자: AAA / BBB / CCC. 개인 우승자 수는?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "8", "8"),
      ],
      correct: 2,
      explain: t(E,
        "A wins row 1, B wins row 2, C wins row 3. That's 3 individual winners!",
        "A가 1행, B가 2행, C가 3행 우승. 개인 우승자 3명이예요!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same grid AAA / BBB / CCC. How many individual winners?", "같은 격자 AAA / BBB / CCC. 개인 우승자는 몇 명?"),
      question: t(E,
        "Grid AAA / BBB / CCC. Number of individual winners?",
        "격자 AAA / BBB / CCC. 개인 우승자 수는?"),
      hint: t(E,
        "Each row has one unique letter. A, B, C each win a row.",
        "각 행에 고유 문자 1개. A, B, C 각각 한 행 우승."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTttCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Walk through each of the 8 lines (3 rows + 3 cols + 2 diagonals). For each line, take the SET of letters in its 3 cells. Size 1 → solo winner; size 2 → 2-cow team. Collect distinct winners across all lines.",
        "8 개의 줄 (3 행 + 3 열 + 2 대각선) 을 순회. 각 줄의 3 칸의 글자 집합을 만들어요. 크기 1 → 단독 우승; 크기 2 → 2 마리 팀. 모든 줄에 걸쳐 중복 없는 우승자 수집."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Enumerate 8 lines", "8 줄 열거"), code: "lines = rows + cols + diagonals", color: "#dc2626" },
              { n: 2, label: t(E, "Take letter set per line", "줄마다 글자 집합"), code: "s = set(line)", color: "#7c3aed" },
              { n: 3, label: t(E, "Solo if |s| == 1, team if |s| == 2", "|s|=1 → 단독, |s|=2 → 팀"), code: "if len(s)==1: solo.add(...); elif len(s)==2: team.add(frozenset(s))", color: "#0891b2" },
              { n: 4, label: t(E, "Print counts", "개수 출력"), code: "print(len(solo)); print(len(team))", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(1)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "3 × 3 grid is fixed", "3 × 3 격자 고정")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getTeamTttSections(E),
    },
  ];
}
