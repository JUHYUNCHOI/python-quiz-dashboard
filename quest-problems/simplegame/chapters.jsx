import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "# Nim-like game: take 1-3 stones per turn",
  "# Last player to take a stone wins",
  "# Losing positions: multiples of 4",
  "",
  "if N % 4 == 0:",
  "    print(2)  # Second player wins",
  "else:",
  "    print(1)  # First player wins",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two players take turns removing 1 to 3 stones from a pile of N stones. The player who takes the last stone wins. Who wins with optimal play?",
        "두 플레이어가 번갈아 N개의 돌 더미에서 1~3개를 가져가. 마지막 돌을 가져가는 사람이 이겨. 최적의 플레이에서 누가 이길까?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udfae"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Simple Game</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P4</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: This is a classic Nim game. Losing positions are multiples of 4. If N % 4 == 0, the second player wins; otherwise, the first player wins.",
              "핵심: 이것은 고전적인 님 게임이야. 지는 위치는 4의 배수야. N % 4 == 0이면 후수 승, 아니면 선수 승.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If N=5, the first player takes 1 stone, leaving 4. Now the opponent faces a multiple of 4 - a losing position!",
        "N=5이면, 선수가 돌 1개를 가져가서 4개를 남겨. 상대는 4의 배수를 마주해 - 지는 위치야!"),
      question: t(E,
        "N=5. Who wins with optimal play?",
        "N=5. 최적 플레이에서 누가 이겨?"),
      options: [
        t(E, "First player (take 1, leave 4)", "선수 (1개 가져가서 4개 남김)"),
        t(E, "Second player", "후수"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 5 % 4 = 1, so the first player wins by taking 1 stone.",
        "맞아! 5 % 4 = 1이니까, 선수가 돌 1개를 가져가서 이겨."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "N=8. Since 8 is a multiple of 4, who wins? Enter 1 for first player, 2 for second player.",
        "N=8. 8은 4의 배수야. 누가 이겨? 선수면 1, 후수면 2를 입력해."),
      question: t(E,
        "N=8. Who wins? (1=first, 2=second)",
        "N=8. 누가 이겨? (1=선수, 2=후수)"),
      hint: t(E,
        "8 % 4 == 0. Multiples of 4 are losing for the player whose turn it is.",
        "8 % 4 == 0. 4의 배수는 차례인 사람이 지는 위치야."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Just check N mod 4. O(1) time!",
        "N mod 4만 확인하면 돼. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Game theory insight: in a take-away game with moves {1,2,3}, losing positions are exactly multiples of 4.",
              "게임 이론: 이동이 {1,2,3}인 가져가기 게임에서 지는 위치는 정확히 4의 배수야.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the one-liner game theory solution!",
        "한 줄짜리 게임 이론 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
