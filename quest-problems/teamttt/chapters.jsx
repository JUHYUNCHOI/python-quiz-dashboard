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
        "A 3x3 tic-tac-toe grid is filled with cow letters A-Z. A cow wins individually if one letter fills an entire line. A team of exactly 2 cows wins if their two letters together fill a line. Count individual winners and team winners across all 8 lines.",
        "3x3 틱택토 격자에 소 문자 A-Z가 채워져 있어. 한 문자가 한 줄을 모두 채우면 개인 우승, 정확히 2개 문자가 한 줄을 채우면 팀 우승이야. 8개 줄 모두에서 개인 우승자 수와 팀 우승자 수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u274C"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Team Tic Tac Toe</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2018 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Check all 8 lines (3 rows, 3 cols, 2 diagonals). If a line has 1 unique letter -> individual winner. If 2 unique letters -> team winner.",
              "핵심: 8개 줄 (3행, 3열, 2대각선) 모두 확인. 줄에 고유 문자 1개 -> 개인 우승. 고유 문자 2개 -> 팀 우승.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Consider grid AAA / BBB / CCC. Each row is filled by one letter. How many individual winners are there?",
        "격자 AAA / BBB / CCC를 생각해봐. 각 행이 한 문자로 채워져 있어. 개인 우승자는 몇 명이야?"),
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
        "A가 1행, B가 2행, C가 3행 우승. 개인 우승자 3명이야!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same grid AAA / BBB / CCC. How many individual winners?",
        "같은 격자 AAA / BBB / CCC. 개인 우승자는 몇 명?"),
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
        "Check all 8 lines. For each line, count unique letters. Use sets to track winners. O(1) since grid is always 3x3!",
        "8개 줄 모두 확인. 각 줄에서 고유 문자 수 세기. 집합으로 우승자 추적. 격자가 항상 3x3이니 O(1)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26A1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each of 8 lines, put the 3 cells in a set. Size 1 = individual winner, size 2 = team winner. Use sets to avoid duplicates.",
              "8개 줄 각각에서 3칸을 집합에 넣어. 크기 1 = 개인 우승, 크기 2 = 팀 우승. 집합으로 중복 방지.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getTeamTttSections(E),
    },
  ];
}
