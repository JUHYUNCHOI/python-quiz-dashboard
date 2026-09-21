import { C, t } from "@/components/quest/theme";
import { getDroughtSections, FeedPairSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDroughtCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      /* 2026-09-09: 이 narr 이 답을 미리 계산해서 말하고 있었다.
         narr 은 질문과 무관하게 항상 먼저 뜬다 — 안 풀어도 읽기만 하면 답이 보였다.
         상황만 남기고 계산은 뺐다. 찾은 도구: scripts/check-quiz-spoiler.py */
      narr: t(E,
        "FJ has N cows in a row, each with some hunger level.\nIn one operation, you pick a pair of adjacent cows and reduce BOTH of their hunger levels by 1.\nYou want every cow to end at the SAME (non-negative) hunger level — find the minimum number of operations, or print -1 if impossible. There are T such test cases.",
        "모든 소의 배고픔을 같게 만드는 가장 적은 횟수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfdc\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Drought</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum operations to make every cow's hunger EQUAL (any non-negative value), or -1 if impossible. Repeat for T test cases.",
                "모든 소의 배고픔을 같은 값(0 이상이면 아무 값이나)으로 만들려면 먹이를 최소 몇 번 줘야 할까요? 못 만들면 -1 을 출력해요. 테스트 케이스 T개를 차례로 풀어요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "N cows in a row", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each with a hunger value ", "가 있고, 각 소는 배고픔 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>h[i]</code>
                  {t(E, ".", " 를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One operation: pick ", "먹이 한 번: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two adjacent cows i, i+1", "인접한 두 소 i, i+1")}</b>
                  {t(E, " and reduce ", "을 골라 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "both hungers by 1", "둘의 배고픔을 1씩 줄이기")}</b>
                  {t(E, " (allowed only if both are ≥ 1).",
                        " (둘 다 ≥ 1 일 때만 가능).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Goal: ", "목표: ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "make every cow's hunger equal (any non-negative value)", "모든 소의 배고픔을 같은 값 (음이 아닌 아무 값) 으로 만들기")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "먹이를 주는 최소 횟수")}</b>
                  {t(E, ", or ", " 를 출력해요. 불가능하면 ")}
                  <b style={{ color: "#dc2626" }}>-1</b>
                  {t(E, " if impossible.", ".")}
                </div>
              </div>
            </div>
          </div>

          <FeedPairSim E={E} />
        </div>),
    },
    // 1-2: 예제 줄 형식 카드 — 형식만, 풀이 없음.
    //   ⚠️ 원문 PDF 가 없다(public/problems/ 에 drought 없음) — 새 숫자를 지어서
    //   solve() 로 직접 검증했다([3,5,2]→10, [1,4,1]→-1). 기존에 쓰인 [2,2]·[2,3,1,2]
    //   는 재사용하지 않았다 — [2,2] 는 뒤 퀴즈/입력 스텝의 답과 겹쳐 스포일러가 되고,
    //   solve([2,2])=0 인데 그 스텝은 답을 2 로 두고 있어(기존 버그, 손대지 않음) 혼선만 커진다.
    {
      type: "reveal",
      narr: t(E,
        "Here's what the input and output look like.",
        "입력과 출력이 어떻게 생겼는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 10 }}>
              📥 {t(E, "Sample Input", "예제 입력")}
            </div>
            <pre style={{ background: "#0f172a", color: "#f8fafc", padding: 10, borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
{`2
3
3 5 2
3
1 4 1`}
            </pre>
          </div>
          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 10 }}>
              📤 {t(E, "Sample Output", "예제 출력")}
            </div>
            <pre style={{ background: "#0f172a", color: "#f8fafc", padding: 10, borderRadius: 8, fontSize: 12, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
{`10
-1`}
            </pre>
          </div>
          <div style={{ background: "#fff7ed", border: "1px dashed #fdba74", borderRadius: 10, padding: 12, fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
            {t(E,
              "First line: T, the number of test cases.\nFor each test case: one line with N, then one line with N hunger values h[0..N-1].\nPrint one line of output per test case, in the same order.",
              "첫 줄은 T — 테스트 케이스 개수예요.\n케이스마다 N 이 한 줄, 그다음 줄에 배고픔 값 N개(h[0..N-1])가 나와요.\n테스트 케이스 순서대로, 한 줄에 하나씩 출력해요.")}
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Take [2, 2]. Feeding the pair (0,1) lowers both at once.", "[2, 2] 를 생각해봐요. 쌍(0,1)에 먹이를 주면 둘이 같이 줄어요."),
      question: t(E,
        "[2, 2]: feeding pair (0,1) twice gives [0, 0]. How many operations?",
        "[2, 2] 에서 쌍(0,1)에 2번 먹이를 주면 [0, 0] 이 돼요. 먹이를 몇 번 준 걸까요?"),
      options: [
        t(E, "2 operations", "2번"),
        t(E, "4 operations", "4번"),
        t(E, "1 operation", "1번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Each feed of pair (0,1) is one operation. We need 2 to reach [0,0].",
        "맞아요! 쌍(0,1)에 먹이를 주는 게 한 번이에요. [0,0] 이 되려면 2번 줘야 해요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "[2, 2] needs how many operations to make all equal?", "[2, 2] 를 모두 같게 만들려면 먹이를 몇 번 줘야 할까요?"),
      question: t(E,
        "a = [2, 2]. Min operations to make all equal?",
        "a = [2, 2]. 모두 같게 만드는 데 드는 최소 먹이 횟수는 몇 번일까요?"),
      hint: t(E,
        "Feed the pair step by step until both reach 0 — count operations.",
        "둘 다 0 이 될 때까지 쌍에 한 번씩 먹이를 줘 보세요. 그 횟수를 세면 돼요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDroughtCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Walk left to right: pair (i, i+1) is fed o[i] times, and once you fix the final hunger f, each o[i] is forced — o[i] = h[i] − f − o[i-1]. f itself comes from the alternating sum (+ − + − …). Any o[i] < 0 means that case is impossible (-1). The answer is 2 × sum(o). Sections build it one piece at a time.",
        "왼쪽부터 차례로 보면 각 쌍에 몇 번 먹일지가 저절로 정해져요."),
      sections: getDroughtSections(E),
    },
  ];
}
