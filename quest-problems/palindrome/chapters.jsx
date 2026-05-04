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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "S stones in a pile.\nEach turn: remove a palindrome number of stones (1, 2, 3, ..., 9, 11, 22, 121, ...). The player who faces an empty pile LOSES!",
              "S개의 돌이 있어.\n매 턴: 회문 수만큼 돌을 가져가 (1, 2, 3, ..., 9, 11, 22, 121, ...). 빈 더미를 마주하는 플레이어가 져!")}
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
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "All single digits (1-9) are palindromes. 10 is NOT (01 != 10).\nYou must remove at least 1 stone per turn.", "모든 한 자리 수(1-9)는 회문이야.\n10은 아니야 (01 != 10). 매 턴 최소 1개는 가져가야 해.")}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Pre-compute palindromes", "회문 미리 계산"), code: "palis = [p for p in 1..S if is_palindrome(p)]", color: "#dc2626" },
              { n: 2, label: t(E, "DP from n = 0 upward", "n = 0부터 위로 DP"), code: "can_win[0] = False  // empty pile \u2192 lose", color: "#0891b2" },
              { n: 3, label: t(E, "Try each palindrome \u2264 n", "n 이하 회문 시도"), code: "if !can_win[n \u2212 p]: can_win[n] = True; break", color: "#16a34a" },
              { n: 4, label: t(E, "Output", "출력"), code: "print('B' if can_win[S] else 'E')", color: "#7c3aed" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#7c2d12", lineHeight: 1.6 }}>
            <span style={{ fontWeight: 800 }}>{t(E, "💡 Key insight: ", "💡 핵심: ")}</span>
            {t(E, "you WIN at n if you can move to a state where the opponent LOSES.", "n에서 이긴다 = 상대를 지는 상태로 보낼 수 있다.")}
          </div>
          <div style={{ marginTop: 10, background: "#fee2e2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "\u23f1 Complexity", "\u23f1 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(S \u00b7 |palis|)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "palindromes are sparse, so |palis| is small", "회문은 드물어 |palis|는 작음")}</div>
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
