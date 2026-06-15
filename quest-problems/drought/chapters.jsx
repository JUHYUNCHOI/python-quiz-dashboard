import { C, t } from "@/components/quest/theme";
import { getDroughtSections, FeedPairSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeDroughtCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows in a row, each with some hunger level.\nIn one operation, you pick a pair of adjacent cows and reduce BOTH of their hunger levels by 1.\nYou want every cow to end at the SAME (non-negative) hunger level — find the minimum number of operations, or print -1 if impossible. There are T such test cases.",
        "FJ에게 한 줄로 선 N마리 소가 있고, 각 소는 배고픔 수치를 가져요.\n한 번의 연산으로 인접한 두 소를 골라 둘의 배고픔을 동시에 1씩 줄여요.\n모든 소를 같은 (음이 아닌) 배고픔 값으로 만드는 최소 연산 횟수를 출력해요. 불가능하면 -1. 이런 테스트 케이스가 T개 주어져요."),
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
                "모든 소의 배고픔을 같은 값 (음이 아닌 아무 값) 으로 만드는 최소 연산 수 (불가능하면 -1) 를 출력. T개 테스트 케이스 반복.")}
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
                  {t(E, "One operation: pick ", "한 번의 연산: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "two adjacent cows i, i+1", "인접한 두 소 i, i+1")}</b>
                  {t(E, " and reduce ", "을 골라 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "both hungers by 1", "둘의 배고픔을 1씩 감소")}</b>
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
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of operations", "최소 연산 횟수")}</b>
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
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's think about [2, 2].\nWe can feed pair (0,1) to decrease both.\nTarget 0 needs 2 feeds.", "[2, 2]를 생각해보자. 쌍(0,1)에 먹이를 줘서 둘 다 줄일 수 있어요. 목표 0이면 2번 먹이를 줘야 해요."),
      question: t(E,
        "[2, 2]: feeding pair (0,1) twice gives [0, 0]. How many operations?",
        "[2, 2]: 쌍(0,1)에 2번 먹이 주면 [0, 0]. 몇 번의 연산?"),
      options: [
        t(E, "2 operations", "2번"),
        t(E, "4 operations", "4번"),
        t(E, "1 operation", "1번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Each feed of pair (0,1) is one operation. We need 2 to reach [0,0].",
        "맞아! 쌍(0,1)에 먹이 주는 것이 1번 연산. [0,0]에 도달하려면 2번 필요해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "[2, 2] needs how many operations to make all equal?", "[2, 2]를 모두 같게 만드는 최소 연산 횟수는?"),
      question: t(E,
        "a = [2, 2]. Min operations to make all equal?",
        "a = [2, 2]. 모두 같게 만드는 최소 연산 횟수?"),
      hint: t(E,
        "Feed the pair step by step until both reach 0 — count operations.",
        "쌍에 한 단계씩 먹이 줘 둘 다 0 이 될 때까지 — 연산 수를 세 봐."),
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
        "왼쪽부터 오른쪽으로: 쌍 (i, i+1) 은 o[i] 번 먹이고, 최종 배고픔 f 를 정하면 o[i] 는 자동으로 o[i] = h[i] − f − o[i-1] 로 정해져. f 는 교대합 (+ − + − …) 으로 구해. o[i] 가 음수면 그 케이스는 불가능 (-1). 답은 2 × sum(o). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getDroughtSections(E),
    },
  ];
}
