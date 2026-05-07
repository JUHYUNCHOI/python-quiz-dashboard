import { C, t } from "@/components/quest/theme";
import { getPalindromeSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def is_palindrome(n):",
  "    s = str(n)",
  "    return s == s[::-1]",
  "",
  "data = sys.stdin.read().split()",
  "T = int(data[0])         # number of test cases",
  "",
  "out = []",
  "for k in range(T):",
  "    S = int(data[1 + k])",
  "    # Precompute palindromes up to S",
  "    palindromes = [p for p in range(1, S + 1) if is_palindrome(p)]",
  "",
  "    # dp[s] = True if the player to move on a pile of size s WINS",
  "    dp = [False] * (S + 1)",
  "    for s in range(1, S + 1):",
  "        for p in palindromes:",
  "            if p > s:",
  "                break",
  "            if not dp[s - p]:   # leave opponent in a losing state",
  "                dp[s] = True",
  "                break",
  "",
  "    out.append('B' if dp[S] else 'E')",
  "",
  "print(chr(10).join(out))",
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
        "Bessie and Elsie share a pile of S stones. On her turn, a player removes a palindrome-number of stones (1, 2, 3, ..., 9, 11, 22, 121...).\nIf you can't move (the pile is empty on your turn), you LOSE.\nWho wins if Bessie goes first and both play perfectly?",
        "Bessie와 Elsie가 S개의 돌이 있는 더미를 나눠가져요. 자기 차례마다 회문 수만큼(1, 2, 3, ..., 9, 11, 22, 121...) 돌을 가져가요.\n자기 차례에 더미가 비어있으면 져요.\nBessie가 먼저 두고 둘 다 최선을 다하면 누가 이길까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🎲</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Palindrome Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Palindrome Stone Game</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a pile of ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "S stones", "S개 돌")}</b>
                  {t(E, ". Bessie and Elsie take turns; ", " 더미가 있어요. Bessie와 Elsie가 번갈아 두고, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "Bessie goes first", "Bessie가 먼저")}</b>
                  {t(E, ".", "예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On a turn, you must remove a ", "자기 차례에는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "palindrome number of stones", "회문 수만큼 돌")}</b>
                  {t(E, " (1, 2, ..., 9, 11, 22, 33, ..., 121, ...).",
                        "을 가져가요 (1, 2, ..., 9, 11, 22, 33, ..., 121, ...).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If the pile is ", "자기 차례에 더미가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "empty on your turn", "비어있으면")}</b>
                  {t(E, " — you lose.", " 져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fecaca" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "둘 다 최선을 다 할 때, ")}
                  <b style={{ color: "#15803d" }}>{t(E, "'B' if Bessie wins, 'E' if Elsie wins", "Bessie가 이기면 'B', Elsie가 이기면 'E'")}</b>
                  {t(E, " (both play optimally).", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Official sample I/O — multi-T format
    {
      type: "reveal",
      narr: t(E,
        "Input format: first a number T (test cases), then T values of S — one per line. Output one letter per line: B or E.",
        "입력: 첫 줄에 T (테스트 케이스 수), 그 다음 T 줄에 각각 S 하나씩. 출력: 각 줄에 B 또는 E."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fee2e2", border: "2px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#7f1d1d", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7f1d1d", whiteSpace: "pre" }}>
{`3
8
10
12`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`B
E
B`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#7f1d1d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "T = 3, then S = 8, 10, 12.", "T = 3, S 값은 8, 10, 12.")}
              <br/>
              {t(E, "S=8: 8 is a palindrome → Bessie takes all → B.",
                    "S=8: 8 은 회문 → Bessie 가 다 가져감 → B.")}
              <br/>
              {t(E, "S=10: every move leaves a winning state for Elsie → E.",
                    "S=10: 어떤 수를 빼도 Elsie 가 이길 수 있는 상태가 됨 → E.")}
              <br/>
              {t(E, "S=12: Bessie can take 11 (palindrome) → leaves S=1 (losing for Elsie) → B.",
                    "S=12: Bessie 가 11 (회문) 빼면 S=1 (Elsie 패) → B.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: What is a palindrome?
    {
      type: "reveal",
      narr: t(E,
        "First, what's a palindrome number?\nIt reads the same forwards and backwards!\nLike 121 or 7.", "먼저, 회문 수가 뭘까? 앞에서 읽어도 뒤에서 읽어도 같은 수예요! 121이나 7처럼."),
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
                "All single digits (1-9) are palindromes. 10 is NOT (01 != 10).\nYou must remove at least 1 stone per turn.", "모든 한 자리 수(1-9)는 회문이에요.\n10은 아니야 (01 != 10). 매 턴 최소 1개는 가져가야 해요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Quick check! Can you tell which numbers are palindromes?", "빠른 확인! 어떤 수가 회문인지 알 수 있어요?"),
      question: t(E,
        "Is 121 a palindrome?",
        "121은 회문일까요?"),
      options: [
        t(E, "Yes, 121 reversed is 121", "맞아, 121을 뒤집으면 121"),
        t(E, "No, 121 reversed is different", "아니, 121을 뒤집으면 달라"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 121 reads the same forwards (1-2-1) and backwards (1-2-1). It's a palindrome!",
        "정답! 121은 앞으로(1-2-1) 뒤로(1-2-1) 읽어도 같아요. 회문이에요!"),
    },
    // 1-4: Key insight + input
    {
      type: "input",
      narr: t(E,
        "If S is a palindrome, Bessie can take ALL stones on her first turn and win!\nWhat about S=8?", "S가 회문이면, Bessie가 첫 턴에 돌을 전부 가져가서 이겨! S=8이면?"),
      question: t(E,
        "S=8. Bessie removes all 8 stones (8 is a palindrome!). Elsie faces 0 stones. Does Bessie win? (1=yes, 0=no)",
        "S=8. Bessie가 8개 전부 가져가 (8은 회문!). Elsie는 0개를 마주해요. Bessie가 이겨? (1=예, 0=아니오)"),
      hint: t(E,
        "8 is a single digit, so it IS a palindrome. She can take all 8!",
        "8은 한 자리 수라 회문이에요. 8개 전부 가져갈 수 있어요!"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Watch the DP table fill bottom-up. Green = Bessie wins, red = Elsie wins.", "DP 테이블이 아래에서 위로 채워지는 걸 봐요. 초록 = Bessie 승, 빨강 = Elsie 승."),
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
        "The key insight: if S is a palindrome, Bessie wins immediately.\nOtherwise, we check game states recursively.", "핵심: S가 회문이면 Bessie가 바로 이겨. 아니면 게임 상태를 재귀적으로 확인해요."),
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(S \u00b7 abs(palis))</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "palindromes are sparse, so abs(palis) is small", "회문은 드물어 abs(palis)는 작음")}</div>
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
        "Try your own S. Watch the DP build to find the winner.", "직접 S 시도. DP가 만들어지면서 승자를 찾는 걸 봐요."),
    },
  ];
}
