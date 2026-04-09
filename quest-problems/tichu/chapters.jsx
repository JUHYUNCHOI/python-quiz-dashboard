import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "# C(N, 2) = N * (N-1) / 2",
  "# Number of ways to pick 2 cards from N",
  "result = N * (N - 1) // 2",
  "",
  "print(result)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTichuCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Tichu is a card game. Given N cards in hand, how many ways can you pick 2 cards to play as a pair? This is a combinations problem: C(N, 2).",
        "티추는 카드 게임이야. 손에 N장의 카드가 있을 때, 2장을 뽑아 페어로 낼 수 있는 방법은 몇 가지? 조합 문제: C(N, 2)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udccf"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Tichu</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P4</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key formula: C(N, 2) = N * (N-1) / 2. This counts the number of unique pairs from N items.",
              "핵심 공식: C(N, 2) = N * (N-1) / 2. N개 항목에서 고유한 쌍의 수를 세는 공식이야.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If you have 5 cards, how many ways can you pick 2? C(5,2) = 5*4/2 = 10.",
        "카드가 5장이면, 2장을 고르는 방법은? C(5,2) = 5*4/2 = 10."),
      question: t(E,
        "N=5 cards. How many ways to pick 2? C(5,2) = ?",
        "N=5장. 2장을 고르는 방법 수? C(5,2) = ?"),
      options: [
        t(E, "5", "5"),
        t(E, "10", "10"),
        t(E, "20", "20"),
        t(E, "15", "15"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! C(5,2) = 5*4/2 = 10 ways.",
        "맞아! C(5,2) = 5*4/2 = 10가지야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Calculate C(5,2) yourself!",
        "직접 C(5,2)를 계산해봐!"),
      question: t(E,
        "N=5. Enter C(5,2):",
        "N=5. C(5,2)를 입력해:"),
      hint: t(E,
        "C(5,2) = 5 * 4 / 2 = 10.",
        "C(5,2) = 5 * 4 / 2 = 10."),
      answer: 10,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTichuCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Just compute the formula N*(N-1)/2. O(1) time!",
        "공식 N*(N-1)/2를 계산하면 돼. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Direct formula: C(N,2) = N*(N-1)//2. No loops needed, just one calculation.",
              "직접 공식: C(N,2) = N*(N-1)//2. 반복문 필요 없이 계산 한 번이면 돼.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the complete combination formula solution!",
        "조합 공식 전체 풀이야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
