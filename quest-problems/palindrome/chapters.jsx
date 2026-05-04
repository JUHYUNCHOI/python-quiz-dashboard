import { C, t } from "@/components/quest/theme";
import { getPalindromeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "def is_palindrome(n):",
  "    s = str(n)",
  "    return s == s[::-1]",
  "",
  "S = int(input())",
  "",
  "# If S itself is a palindrome, Bessie removes all S stones and wins",
  "if is_palindrome(S):",
  "    print('B')",
  "else:",
  "    # Try all palindrome removals for Bessie",
  "    bessie_wins = False",
  "    for p in range(1, S + 1):",
  "        if is_palindrome(p) and p <= S:",
  "            remain = S - p",
  "            if remain == 0:",
  "                bessie_wins = True",
  "                break",
  "            # Check if Elsie is in a losing position",
  "            if not can_win(remain):",
  "                bessie_wins = True",
  "                break",
  "    print('B' if bessie_wins else 'E')",
];

/* ================================================================
   Chapter 1: Problem Understanding (4 steps)
   ================================================================ */
export function makePalindromeCh1(E) {
  return [
    // 1-1: Intro
    {
      type: "reveal",
      narr: t(E,
        "Bessie and Elsie are playing a stone game!\nThey take turns removing palindrome-number stones from a pile.\nLet's learn the rules!\n🎲", "베시와 엘시가 돌 게임을 해! 번갈아가며 회문 수만큼 돌을 가져가. 규칙을 알아보자! 🎲"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎲</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Palindrome Game</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Palindrome Stone Game</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "S stones in a pile. Each turn: remove a palindrome number of stones (1, 2, 3, ..., 9, 11, 22, 121, ...). The player who faces an empty pile LOSES!",
              "S개의 돌이 있어. 매 턴: 회문 수만큼 돌을 가져가 (1, 2, 3, ..., 9, 11, 22, 121, ...). 빈 더미를 마주하는 플레이어가 져!")}
          </div>
        </div>),
    },
    // 1-2: What is a palindrome?
    {
      type: "reveal",
      narr: t(E,
        "First, what's a palindrome number?\nIt reads the same forwards and backwards!\nLike 121 or 7.", "먼저, 회문 수가 뭘까? 앞에서 읽어도 뒤에서 읽어도 같은 수야! 121이나 7처럼."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 14, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Palindrome Numbers", "회문 수")}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
              {["1","2","3","7","9","11","22","33","121","131"].map((n, i) => (
                <div key={i} style={{ background: "#fff", border: "2px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 14, fontWeight: 700, color: "#dc2626" }}>{n}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {t(E,
                "All single digits (1-9) are palindromes. 10 is NOT (01 != 10). You must remove at least 1 stone per turn.",
                "모든 한 자리 수(1-9)는 회문이야. 10은 아니야 (01 != 10). 매 턴 최소 1개는 가져가야 해.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Quick check! Can you tell which numbers are palindromes?", "빠른 확인! 어떤 수가 회문인지 알 수 있어?"),
      question: t(E,
        "Is 121 a palindrome?",
        "121은 회문일까?"),
      options: [
        t(E, "Yes, 121 reversed is 121", "맞아, 121을 뒤집으면 121"),
        t(E, "No, 121 reversed is different", "아니, 121을 뒤집으면 달라"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 121 reads the same forwards (1-2-1) and backwards (1-2-1). It's a palindrome!",
        "정답! 121은 앞으로(1-2-1) 뒤로(1-2-1) 읽어도 같아. 회문이야!"),
    },
    // 1-4: Key insight + input
    {
      type: "input",
      narr: t(E,
        "If S is a palindrome, Bessie can take ALL stones on her first turn and win!\nWhat about S=8?", "S가 회문이면, 베시가 첫 턴에 돌을 전부 가져가서 이겨! S=8이면?"),
      question: t(E,
        "S=8. Bessie removes all 8 stones (8 is a palindrome!). Elsie faces 0 stones. Does Bessie win? (1=yes, 0=no)",
        "S=8. 베시가 8개 전부 가져가 (8은 회문!). 엘시는 0개를 마주해. 베시가 이겨? (1=예, 0=아니오)"),
      hint: t(E,
        "8 is a single digit, so it IS a palindrome. She can take all 8!",
        "8은 한 자리 수라 회문이야. 8개 전부 가져갈 수 있어!"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Watch the DP table fill bottom-up. Green = Bessie wins, red = Elsie wins.", "DP 테이블이 아래에서 위로 채워지는 걸 봐. 초록 = 베시 승, 빨강 = 엘시 승."),
    },
  ];
}

/* ================================================================
   Chapter 2: Code (2 steps)
   ================================================================ */
export function makePalindromeCh2(E, lang = "py") {
  return [
    // 2-1: Strategy reveal
    {
      type: "reveal",
      narr: t(E,
        "The key insight: if S is a palindrome, Bessie wins immediately.\nOtherwise, we check game states recursively.", "핵심: S가 회문이면 베시가 바로 이겨. 아니면 게임 상태를 재귀적으로 확인해."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
              {t(E, "Game Theory Approach", "게임 이론 접근법")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>
              {t(E,
                "1. If S is a palindrome -> Bessie takes all, wins!\n2. Otherwise, try each palindrome p <= S.\n3. If any removal leaves Elsie in a losing state -> Bessie wins.\n4. Time complexity: depends on S, but memoization helps.",
                "1. S가 회문 -> 베시가 전부 가져가고 승리!\n2. 아니면, S 이하의 모든 회문 p를 시도.\n3. 어떤 제거가 엘시를 패배 상태로 만들면 -> 베시 승리.\n4. 시간 복잡도: S에 따라 다르지만 메모이제이션 도움됨.")}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center", fontWeight: 600 }}>
            {t(E, "O(S * num_palindromes) with memoization", "메모이제이션으로 O(S * 회문 수)")}
          </div>
        </div>),
    },
    // 2-2: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Now build the game-theory DP step by step.", "게임 이론 DP를 단계별로 만들자."),
      sections: getPalindromeSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own S. Watch the DP build to find the winner.", "직접 S 시도. DP가 만들어지면서 승자를 찾는 걸 봐."),
    },
  ];
}
