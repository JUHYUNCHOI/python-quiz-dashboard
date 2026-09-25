import { C, t } from "@/components/quest/theme";
import { FeedPairSim } from "./components";

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
        "Make all the cows' hunger equal with the fewest bags.",
        "모든 소의 배고픔을 같게 만드는 데 드는 최소 봉지 수를 구해요."),
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
                "Output the minimum number of bags of corn to make every cow's hunger EQUAL (any non-negative value), or -1 if impossible. Repeat for T test cases.",
                "모든 소의 배고픔을 같은 값(0 이상이면 아무 값이나)으로 만들려면 옥수수 봉지가 최소 몇 개 필요할까요? 못 만들면 -1 을 출력해요. 테스트 케이스 T개를 차례로 풀어요.")}
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
                  {t(E, "One feeding: pick ", "먹이 한 번: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two adjacent cows i, i+1", "인접한 두 소 i, i+1")}</b>
                  {t(E, " and give each one bag of corn, so ", "을 골라 한 마리에 옥수수 한 봉지씩 줘요 — ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "both hungers drop by 1", "둘의 배고픔이 1씩 줄어요")}</b>
                  {t(E, " (allowed only if both are ≥ 1). One feeding uses 2 bags.",
                        " (둘 다 ≥ 1 일 때만 가능). 한 번 먹일 때 봉지 2개를 써요.")}
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
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of bags of corn", "필요한 최소 봉지 수")}</b>
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
    //   solve() 로 직접 검증했다([3,5,2]→10, [1,4,1]→-1).
    //   2026-09-21: 이 화면이 말하던 "먹이 횟수" 가 원문(usaco.org cpid=1181)과 달랐다 —
    //   원문의 답은 **옥수수 봉지 수**이고, 한 번 먹이면 소 두 마리에 한 봉지씩 = 2개다.
    //   코드는 처음부터 2*sum(o) 로 맞게 짜여 있었고(공식 샘플 재현) **글만 틀렸다.**
    //   같은 이유로 퀴즈·입력 스텝의 [2,2] 도 버렸다 — solve([2,2])=0 인데 답을 2 로
    //   두고 있었다. 지금은 [1,2,1]→봉지 4개 · [2,4,2]→봉지 8개 (둘 다 solve() 로 확인).
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
        "Take [1, 2, 1]. Feeding a pair lowers both of those cows at once.", "[1, 2, 1] 을 생각해봐요. 한 쌍에 먹이면 둘이 같이 줄어요."),
      question: t(E,
        "[1, 2, 1]: feed pair (0,1) once, then pair (1,2) once — now it is [0, 0, 0]. How many bags of corn did that use?",
        "[1, 2, 1] 에서 쌍(0,1)에 한 번, 쌍(1,2)에 한 번 먹이면 [0, 0, 0] 이 돼요. 옥수수 봉지를 몇 개 쓴 걸까요?"),
      options: [
        t(E, "2 bags", "봉지 2개"),
        t(E, "4 bags", "봉지 4개"),
        t(E, "8 bags", "봉지 8개"),
      ],
      correct: 1,
      explain: t(E,
        "Right — we fed 2 times, and each feeding uses 2 bags (one per cow), so 4 bags.",
        "맞아요! 먹인 건 2번이고, 한 번에 봉지 2개(소 한 마리씩)를 쓰니까 봉지 4개예요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "[2, 4, 2] — how many bags of corn does it take to make all equal?", "[2, 4, 2] 를 모두 같게 만들려면 봉지가 몇 개 필요할까요?"),
      question: t(E,
        "a = [2, 4, 2]. Minimum bags of corn to make all hungers equal?",
        "a = [2, 4, 2]. 모두 같게 만드는 데 필요한 최소 봉지 수는 몇 개일까요?"),
      hint: t(E,
        "Feed pair (0,1) twice, then pair (1,2) twice. Count the feedings, then double it — 2 bags per feeding.",
        "쌍(0,1)에 두 번, 쌍(1,2)에 두 번 먹여 보세요.\n먹인 횟수를 세고 2배 하면 봉지 수예요."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDroughtCh2(E, lang = "py") {
  return [
    // 2-1: Code walk — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14)
    {
      type: "drought-walk",
      narr: t(E,
        "Going left to right, how many times we feed each pair is decided for us.",
        "왼쪽부터 차례로 보면 각 쌍에 몇 번 먹일지가 저절로 정해져요."),
    },
  ];
}
