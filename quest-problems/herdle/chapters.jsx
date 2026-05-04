import { C, t } from "@/components/quest/theme";
import { getHerdleSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "for _ in range(int(input())):",
  "    answer = [[input().split() for _ in range(3)] for _ in range(2)]",
  "    guess  = [[input().split() for _ in range(3)] for _ in range(2)]",
  "    # Flatten to 3x3 grids",
  "    ans = [input().split() for _ in range(3)]",
  "    gue = [input().split() for _ in range(3)]",
  "",
  "    green = 0",
  "    yellow = 0",
  "    remaining_ans = {}",
  "    remaining_gue = {}",
  "",
  "    # Count greens first",
  "    for r in range(3):",
  "        for c in range(3):",
  "            if ans[r][c] == gue[r][c]:",
  "                green += 1",
  "            else:",
  "                remaining_ans[ans[r][c]] = remaining_ans.get(ans[r][c], 0) + 1",
  "                remaining_gue[gue[r][c]] = remaining_gue.get(gue[r][c], 0) + 1",
  "",
  "    # Count yellows from remaining",
  "    for breed in remaining_gue:",
  "        if breed in remaining_ans:",
  "            yellow += min(remaining_gue[breed], remaining_ans[breed])",
  "",
  "    print(green)",
  "    print(yellow)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHerdleCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A 3x3 grid Wordle for cow breeds!\nGiven an answer grid and a guess grid, count green tiles (exact position match) and yellow tiles (right breed, wrong position).", "3x3 소 품종 Wordle! 정답 그리드와 추측 그리드가 주어지면 초록 타일(정확한 위치 일치)과 노란 타일(맞는 품종, 틀린 위치)을 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udfe9"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Herdle</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Count greens first (exact matches).\nThen for remaining cells, match breeds up to available count to get yellows.",
              "핵심: 먼저 초록(정확한 일치)을 세고,\n남은 셀에서 품종별로 가능한 수만큼 매칭해서 노란색을 구해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If the answer grid is all 'A' and the guess grid is also all 'A', every cell matches exactly!", "정답 그리드가 전부 'A'이고 추측 그리드도 전부 'A'이면, 모든 셀이 정확히 일치해!"),
      question: t(E,
        "Answer grid: all 'A'. Guess grid: all 'A'. How many green and yellow tiles?",
        "정답 그리드: 전부 'A'. 추측 그리드: 전부 'A'. 초록과 노란 타일 수는?"),
      options: [
        t(E, "9 green, 0 yellow", "초록 9, 노랑 0"),
        t(E, "0 green, 9 yellow", "초록 0, 노랑 9"),
        t(E, "9 green, 9 yellow", "초록 9, 노랑 9"),
      ],
      correct: 0,
      explain: t(E,
        "All 9 positions match exactly, so 9 green, 0 yellow. Yellows only count non-green matches.",
        "9개 위치 모두 정확히 일치하므로 초록 9, 노랑 0. 노랑은 초록이 아닌 매칭만 세."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Both grids are all 'A'. How many green tiles?", "두 그리드가 모두 'A'야. 초록 타일은 몇 개?"),
      question: t(E,
        "Answer=all 'A', Guess=all 'A'. Green count?",
        "정답=전부 'A', 추측=전부 'A'. 초록 개수?"),
      hint: t(E,
        "Every cell matches, so all 9 are green.",
        "모든 셀이 일치하니까 9개 다 초록이야."),
      answer: 9,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHerdleCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "The grid is always 3x3, so we just iterate 9 cells twice. O(1) per test case!", "그리드는 항상 3x3이니까 9개 셀을 두 번 순회하면 돼. 테스트 케이스당 O(1)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(1) per test</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "First pass: count greens and collect remaining breeds.\nSecond pass: match remaining breeds for yellows using min of available counts.",
              "첫 번째 패스: 초록 세고 남은 품종 수집.\n두 번째 패스: 남은 품종의 최솟값으로 노랑 매칭.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getHerdleSections(E),
    },
  ];
}
