import { C, t } from "@/components/quest/theme";
import { getPalindromeSections } from "./components";

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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Palindrome Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2024 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output 'B' if Bessie wins (going first, both playing optimally), else 'E'.",
                "Bessie 가 먼저 두고 둘 다 최선을 다할 때,\nBessie 가 이기면 'B', Elsie 가 이기면 'E' 를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There's a pile of ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "S stones", "S개 돌")}</b>
                  {t(E, ". Bessie and Elsie take turns; ", " 더미가 있어요. Bessie와 Elsie가 번갈아 두고, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "Bessie goes first", "Bessie가 먼저")}</b>
                  {t(E, ".", "예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On a turn, you must remove a ", "자기 차례에는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "palindrome number of stones", "회문 수만큼 돌")}</b>
                  {t(E, " (1, 2, ..., 9, 11, 22, 33, ..., 121, ...).",
                        "을 가져가요 (1, 2, ..., 9, 11, 22, 33, ..., 121, ...).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If the pile is ", "자기 차례에 더미가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "empty on your turn", "비어있으면")}</b>
                  {t(E, " — you lose.", " 져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fecaca" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "첫 줄에 테스트 케이스 수 T 가 오고, 다음 T 줄에 S 가 하나씩 와요.\n답은 줄마다 B 또는 E 로 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7f1d1d", whiteSpace: "pre" }}>
{`3
8
10
12`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`B
E
B`}
              </div>
            </div>
          </div>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              {t(E, "T = 3, then S = 8, 10, 12.", "T = 3, S 값은 8, 10, 12.")}
              <br/>
              {t(E, "S=8: 8 is a palindrome → Bessie takes all → B.",
                    "S=8 이면 8 자체가 회문이라 Bessie 가 다 가져가요 → B.")}
              <br/>
              {t(E, "S=10: every move leaves a winning state for Elsie → E.",
                    "S=10 이면 뺄 수 있는 회문이 1~9 뿐이라 남는 수가 1~9 예요. 모두 Elsie 가 이기는 자리라 → E.")}
              <br/>
              {t(E, "S=12: Bessie takes 2 → leaves S=10, and we just saw 10 loses → B.",
                    "S=12 면 Bessie 가 2 를 가져가 S=10 을 넘겨요. 10 은 지는 자리라 답은 B 예요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: What is a palindrome?
    {
      type: "reveal",
      narr: t(E,
        "First, what's a palindrome number?\nIt reads the same forwards and backwards!\nLike 121 or 7.", "회문 수가 뭘까요? 앞에서 읽어도 뒤에서 읽어도 같은 수예요. 121 이나 7 처럼요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 14, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#dc2626", marginBottom: 10 }}>
              {t(E, "Palindrome Numbers", "회문 수")}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
              {["1","2","3","7","9","11","22","33","121","131"].map((n, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #fca5a5", borderRadius: 8, padding: "4px 10px", fontSize: 14, fontWeight: 700, color: "#dc2626" }}>{n}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>
              {t(E,
                "All single digits (1-9) are palindromes. 10 is NOT (01 != 10).\nYou must remove at least 1 stone per turn.", "한 자리 수(1~9)는 모두 회문이에요.\n10 은 뒤집으면 01 이라 회문이 아니에요. 한 번에 최소 1개는 가져가야 해요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3b: Two-pointer check sim — visualize is_palindrome(n)
    {
      type: "twopointer",
      narr: t(E,
        "How does is_palindrome(n) actually work?  Compare the digits from both ends inward.  As long as every pair matches, it's a palindrome.",
        "is_palindrome(n) 은 어떻게 돌아갈까요?\n양 끝 자리부터 가운데로 견줘 보고, 모든 짝이 같으면 회문이에요."),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Quick check! Can you tell which numbers are palindromes?", "어떤 수가 회문인지 가려낼 수 있을까요?"),
      question: t(E,
        "Is 121 a palindrome?",
        "121은 회문일까요?"),
      options: [
        t(E, "Yes, 121 reversed is 121", "네, 121 을 뒤집어도 121 이에요"),
        t(E, "No, 121 reversed is different", "아니요, 뒤집으면 달라져요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 121 reads the same forwards (1-2-1) and backwards (1-2-1). It's a palindrome!",
        "맞아요! 121 은 앞으로 읽어도 1-2-1, 뒤로 읽어도 1-2-1 이라 회문이에요."),
    },
    // 1-4: Key insight + input
    {
      type: "input",
      narr: t(E,
        "Imagine you're Bessie facing S = 8 stones.  What's the best move you can make?",
        "Bessie 가 되어 봐요. 돌 8 개 앞에서 가장 좋은 한 수는 무엇일까요?"),
      question: t(E,
        "S=8. Bessie removes all 8 stones (8 is a palindrome!). Elsie faces 0 stones. Does Bessie win? (1=yes, 0=no)",
        "S=8 일 때 Bessie 가 8 개를 전부 가져가요 (8 은 회문이에요).\nElsie 는 빈 더미를 마주해요. Bessie 가 이길까요? (1=예, 0=아니오)"),
      hint: t(E,
        "Whoever faces an empty pile loses.  Where does Elsie stand here?",
        "빈 더미를 마주한 사람이 져요. 지금 Elsie 는 어느 쪽에 서 있나요?"),
      answer: 1,
    },
    {
      type: "sim",
      narr: t(E,
        "Build the answer bottom-up — start from S=0 and grow.  Green cells = the player to move wins; red = loses.",
        "S=0 부터 한 칸씩 답을 채워 올라가요.\n초록 칸은 둘 차례인 사람이 이기고, 빨강 칸은 져요."),
    },
  ];
}

/* ================================================================
   Chapter 2: Code (2 steps)
   ================================================================ */
export function makePalindromeCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Build can_win[n] from 0 upward — it answers 'does the player to move at n stones win?'.  Sections build the DP one piece at a time.",
        "can_win[n] 을 0 부터 차례로 채워요.\n'돌이 n 개 남았을 때 둘 차례인 사람이 이기나?' 에 답하는 표예요."),
      sections: getPalindromeSections(E),
    },
    {
      type: "runner",
      narr: t(E,
        "Try your own S. Watch the DP build to find the winner.",
        "S 를 직접 넣어 봐요. 표가 채워지면서 승자가 정해지는 걸 볼 수 있어요."),
    },
  ];
}
