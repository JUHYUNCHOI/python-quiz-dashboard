import { C, t } from "@/components/quest/theme";
import { getNonTransSections, NonTransDeepAuditSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeNonTransCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "We're given two 4-sided dice A and B (each side a value in 1..10), and A beats B (more (a, b) outcomes have a > b than a < b).\nFind a 4-sided die C (sides also in 1..10) such that B beats C AND C beats A — or report no such die exists.",
        "각 면이 1..10 사이 값인 4면 주사위 A, B 가 주어지고, A 가 B 를 이겨요 (a > b 인 (a, b) 결과가 a < b 인 결과보다 많음).\nB 가 C 를 이기고 C 가 A 를 이기는 4면 주사위 C (면도 1..10) 를 찾아요. 없으면 보고."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfb2"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Non-Transitive Dice</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2022 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Print the four faces of die C that beats A while losing to B, or 'no' if no such C exists.",
                "B 에게 지면서 A 를 이기는 주사위 C 의 네 면을 출력해요. 그런 C 가 없으면 'no'.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "two 4-sided dice A and B", "두 개의 4면 주사위 A 와 B")}</b>
                  {t(E, " — each face is an integer in [1, 10] (faces can repeat).",
                        " 가 주어져요 — 각 면은 [1, 10] 정수 (값이 중복 가능).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#7c3aed" }}>{t(E, "Die X beats die Y", "주사위 X 가 Y 를 이긴다")}</b>
                  {t(E, " if among the 16 (x, y) outcomes, more have x > y than y > x.",
                        "는 건, 16가지 (x, y) 결과 중 x > y 가 y > x 보다 많을 때.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're told ", "조건: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "A beats B", "A 가 B 를 이김")}</b>
                  {t(E, ". Find a 4-sided die C (faces in [1, 10]) such that ", ". 4면 주사위 C (면 ∈ [1, 10]) 를 찾되 ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "B beats C and C beats A", "B 가 C 를 이기고, C 가 A 를 이기도록")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the four faces of C, or ", "C 의 네 면을 출력해요. 그런 C 가 존재하지 않으면 ")}
                  <b style={{ color: "#15803d" }}>'no'</b>
                  {t(E, " if no such C exists.", " 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "'A beats B' means A is more likely to roll a higher value than B.\nWhat does this mean mathematically?", "'A가 B를 이긴다'는 A가 B보다 높은 값을 굴릴 확률이 높다는 뜻이에요. 수학적으로 어떤 의미일까요?"),
      question: t(E,
        "Die A 'beats' die B means:",
        "주사위 A가 B를 '이긴다'는 뜻은:"),
      options: [
        t(E, "More (a,b) pairs where a > b than a < b", "a > b인 (a,b) 쌍이 a < b인 쌍보다 많다"),
        t(E, "Sum of A's sides > sum of B's sides", "A의 면 합 > B의 면 합"),
        t(E, "Max of A > max of B", "A의 최댓값 > B의 최댓값"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! We compare all 16 pairs (4x4). If A wins more matchups than B, A beats B.",
        "맞아! 16개 쌍(4x4)을 모두 비교해서 A가 이기는 매치업이 더 많으면 A가 B를 이기는 거예요."),
    },
    // 1-3: Deep audit sim — step through every (x, y) pair, watch
    // beats(X, Y) build up one outcome at a time. Try the rock-paper-
    // scissors-style cycle (4444 ▶ 3336 ▶ 2255 ▶ 4444) yourself.
    {
      type: "reveal",
      narr: t(E,
        "Pick a dice pair, then tap 'Next pair' 16 times.\nEach (x, y) outcome is x > y, x < y, or x = y.\nWatch the win / lose tally build up — that's exactly what beats(X, Y) computes.\nTry the 4444 ▶ 3336 ▶ 2255 ▶ 4444 cycle: each beats the next, so the relation is non-transitive.",
        "주사위 쌍을 고르고 '다음 쌍' 을 16 번 눌러봐.\n각 (x, y) 결과는 x > y, x < y, x = y 중 하나.\nwin / lose 합계가 쌓이는 걸 봐 — beats(X, Y) 가 계산하는 그 값이야.\n4444 ▶ 3336 ▶ 2255 ▶ 4444 사이클을 돌려봐: 각자가 다음을 이겨서 비추이적 관계."),
      content: <NonTransDeepAuditSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "A=[1,2,3,4] vs B=[1,2,3,4].\nSame dice!\nDoes A beat B?\nCount pairs where a>b vs a<b.\nThey're equal, so no.\nEnter 0 for no.", "A=[1,2,3,4] vs B=[1,2,3,4]. 같은 주사위! A가 B를 이겨? a>b와 a<b 쌍 수가 같으니 아니에요. 아니면 0을 입력해요."),
      question: t(E,
        "A=[1,2,3,4], B=[1,2,3,4]. Does A beat B? (1=yes, 0=no)",
        "A=[1,2,3,4], B=[1,2,3,4]. A가 B를 이겨? (1=예, 0=아니오)"),
      hint: t(E,
        "Compare a > b vs a < b counts across all 16 pairs. Is one strictly greater?",
        "16 쌍에서 a > b 와 a < b 개수를 비교해봐요. 한쪽이 더 많아?"),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeNonTransCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Each die face is in 1..10, so we can brute-force C: 4 sorted faces give only C(10+3, 4) = 715 unique dice. For each candidate, count win pairs B vs C and C vs A — keep one where both directions exceed half. Sections build it one piece at a time.",
        "각 면이 1..10 이므로 C 를 완전탐색: 정렬된 4 면은 C(10+3, 4) = 715 가지. 각 후보마다 B vs C, C vs A 의 승 쌍을 세고, 양방향 모두 절반을 넘는 C 를 채택. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getNonTransSections(E),
    },
  ];
}
