import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1",
  "    cards = []",
  "    for i in range(N):",
  "        cards.append(int(input_data[idx])); idx += 1",
  "",
  "    # Strategy: simulate the card game",
  "    # Player picks the highest available card each turn",
  "    cards_sorted = sorted(cards, reverse=True)",
  "",
  "    # Player 1 picks first (odd turns), Player 2 picks even",
  "    p1_score = 0",
  "    p2_score = 0",
  "    for i, c in enumerate(cards_sorted):",
  "        if i % 2 == 0:",
  "            p1_score += c",
  "        else:",
  "            p2_score += c",
  "",
  "    print(p1_score)",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A card game where players take turns picking the highest remaining card. Given N cards, find the optimal score for the first player!",
        "카드 게임에서 플레이어가 번갈아 가며 남은 카드 중 가장 높은 카드를 가져가. N장의 카드가 주어지면 첫 번째 플레이어의 최적 점수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udccf"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Card Shark</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P5</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Sort cards descending. Players alternate picking from the top. First player gets cards at indices 0, 2, 4, ... Greedy optimal strategy.",
              "핵심: 카드를 내림차순 정렬. 플레이어가 번갈아 위에서 가져가. 첫 번째 플레이어는 인덱스 0, 2, 4, ...의 카드를 가져가. 그리디 최적 전략.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Cards are [1, 2, 3]. Both players play optimally (pick highest). Player 1 picks first. What does Player 1 get?",
        "카드가 [1, 2, 3]이야. 두 플레이어 모두 최적으로 (가장 높은 것) 플레이해. 플레이어 1이 먼저 가져가. 플레이어 1은 무엇을 얻어?"),
      question: t(E,
        "Cards [1,2,3]. P1 picks 3, P2 picks 2, P1 picks 1. P1's total?",
        "카드 [1,2,3]. P1이 3, P2가 2, P1이 1 가져가. P1의 합계?"),
      options: [
        t(E, "4 (3 + 1)", "4 (3 + 1)"),
        t(E, "3", "3"),
        t(E, "5 (3 + 2)", "5 (3 + 2)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Sorted descending: [3,2,1]. P1 gets 3 and 1 = 4.",
        "맞아! 내림차순 정렬: [3,2,1]. P1이 3과 1을 가져가서 = 4."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With cards [1,2,3], what is Player 1's optimal score when picking highest first?",
        "카드 [1,2,3]에서 가장 높은 것을 먼저 가져갈 때 플레이어 1의 최적 점수는?"),
      question: t(E,
        "Cards [1,2,3], pick highest each turn. P1's score?",
        "카드 [1,2,3], 매 턴 가장 높은 것 선택. P1의 점수?"),
      hint: t(E,
        "P1 picks 3, P2 picks 2, P1 picks 1. Total = 3 + 1 = 4. Wait, but the problem says just pick highest -> 3. Answer is 3.",
        "P1이 3을 가져가. 첫 선택의 값만 물어보면 3."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort the cards O(N log N), then alternate picks in O(N). Total: O(N log N).",
        "카드 정렬 O(N log N), 번갈아 선택 O(N). 총: O(N log N)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sort cards in descending order. Player 1 takes odd-indexed cards (0, 2, 4, ...), Player 2 takes even-indexed. Sum Player 1's cards.",
              "카드를 내림차순으로 정렬. 플레이어 1이 홀수 인덱스(0, 2, 4, ...), 플레이어 2가 짝수 인덱스. 플레이어 1의 카드 합산.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full greedy card game solution!",
        "그리디 카드 게임 전체 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
