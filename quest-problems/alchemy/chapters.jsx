import { C, t } from "@/components/quest/theme";
import { getAlchemySections, RecipeSimulator } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAlchemyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N metals (1..N), and you start with a[i] units of metal i. Each recipe takes one unit each of several lower-numbered metals and turns them into ONE unit of a higher-numbered metal.\nUsing the recipes any number of times, what is the MAXIMUM number of units of metal N you can end up with?",
        "레시피를 여러 번 써서 금속 N 을 최대 몇 개까지 만들 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"⚗️"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Alchemy</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the MAXIMUM number of units of metal N you can craft.",
                "만들 수 있는 금속 N 의 최대 개수를 출력해요.")}
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
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N metals numbered 1..N", "1..N 번호의 금속 N개")}</b>
                  {t(E, ". You start with ", "이 있어요. 시작할 때 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, " units of metal i.", " 단위의 금속 i를 가지고 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For each metal ", "각 금속 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "i ≥ 2, you're given a recipe", "i ≥ 2에 대해 레시피")}</b>
                  {t(E, " — a set of distinct lower-numbered metals — that combines into 1 unit of metal i.",
                        " — 서로 다른 더 낮은 번호의 금속들 — 가 주어져요. 이 재료를 모으면 금속 i 1단위가 만들어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You can ", "레시피는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "apply any recipe any number of times", "원하는 만큼 여러 번 사용")}</b>
                  {t(E, ", as long as you have the ingredients.",
                        "할 수 있어요. 재료만 있으면 돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "the maximum number of units of metal N you can make", "만들 수 있는 금속 N 의 최대 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <RecipeSimulator E={E} />
        </div>),
    },
    // 1-2: Official I/O format + verbatim sample + worked example
    {
      type: "reveal",
      narr: t(E,
        "Here is the exact input/output format and the official sample. Trace it once so the recipe-line format is clear.",
        "입출력 형식과 공식 예제를 한 번 따라가 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 6 }}>📥 {t(E, "Input", "입력")}</div>
            <div>{t(E, "Line 1: N (number of metals).", "1번째 줄: 금속 개수 N.")}</div>
            <div>{t(E, "Line 2: N integers a[1..N] — starting units (0 ≤ a[i] ≤ 10000).", "2번째 줄: 정수 N 개 a[1..N] — 처음에 가진 개수예요 (0 ≤ a[i] ≤ 10000).")}</div>
            <div>{t(E, "Line 3: K (number of recipes, 1 ≤ K < N).", "3번째 줄: 레시피 개수 K (1 ≤ K < N).")}</div>
            <div>{t(E, "Next K lines: L M ing₁ … ing_M — make 1 of metal L from M ingredients.", "다음 K줄: L M 재료₁ … 재료_M — 재료 M개로 금속 L 1개를 만들어요.")}</div>
            <div style={{ fontWeight: 700, color: "#92400e", margin: "8px 0 6px" }}>📤 {t(E, "Output", "출력")}</div>
            <div>{t(E, "The maximum number of units of metal N achievable.", "만들 수 있는 금속 N 의 최대 개수를 써요.")}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Sample Input", "예제 입력")}</div>
              <pre style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{`5
2 0 0 1 0
3
5 2 3 4
2 1 1
3 1 2`}</pre>
            </div>
            <div style={{ flex: 1, minWidth: 110 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Sample Output", "예제 출력")}</div>
              <pre style={{ background: "#0f172a", color: "#86efac", borderRadius: 8, padding: 10, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>{`1`}</pre>
            </div>
          </div>
          {/* TODO: sim redesign — a static worked example, can become an animated craft-trace later */}
          <div style={{ background: "#fff", border: "1px dashed #fcd34d", borderRadius: 10, padding: "10px 12px", marginTop: 10, fontSize: 11.5, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>🔍 {t(E, "Reading the recipe lines", "레시피 줄 읽기")}</div>
            <div>{t(E, "\"5 2 3 4\" → make metal 5 from M=2 ingredients: metals 3 and 4.", "\"5 2 3 4\" → 재료 M=2개(금속 3, 4)로 금속 5 를 만들어요.")}</div>
            <div>{t(E, "\"2 1 1\" → make metal 2 from M=1 ingredient: metal 1.", "\"2 1 1\" → 재료 M=1개(금속 1)로 금속 2 를 만들어요.")}</div>
            <div>{t(E, "\"3 1 2\" → make metal 3 from M=1 ingredient: metal 2.", "\"3 1 2\" → 재료 M=1개(금속 2)로 금속 3 을 만들어요.")}</div>
            <div style={{ marginTop: 6 }}>{t(E,
              "Start: metal 1 = 2, metal 4 = 1, rest 0. Turn 1→2→3, then 3 + 4 → 5. That makes one unit of metal 5. Only one metal-1 is left after, not enough for a second metal 5 → answer 1.",
              "처음에 금속 1 이 2개, 금속 4 가 1개 있고 나머지는 0 이에요. 1→2→3 으로 바꾸고 3 + 4 → 5 를 만들면 금속 5 가 1개 나와요. 그 뒤 금속 1 이 1개 남지만 금속 4 가 없어서 두 번째 금속 5 는 못 만들어요 → 답은 1 이에요.")}</div>
          </div>
        </div>
      ),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Recipe: metal 1 + metal 2 = metal 3. You have 2 of metal 1 and 1 of metal 2. Max metal 3?", "레시피가 금속1 + 금속2 = 금속3 일 때 금속3 을 몇 개 만들까요?"),
      question: t(E,
        "Recipe: 1+2->3. Have: 2x metal 1, 1x metal 2. Max metal 3?",
        "레시피는 1+2->3 이에요. 금속1 이 2개, 금속2 가 1개일 때 금속3 은 최대 몇 개일까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! You need 1 of each ingredient. With 1x metal 2, you can only make 1x metal 3.",
        "맞아요! 재료가 1개씩 필요해요. 금속2 가 1개뿐이라 금속3 은 1개만 만들 수 있어요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Same setup: recipe 1+2->3, have 2x metal 1 and 1x metal 2. How many metal 3 can you make?", "앞과 같아요. 금속3 을 몇 개 만들 수 있을까요?"),
      question: t(E,
        "Recipe: 1+2->3. Have 2x metal 1, 1x metal 2. Max metal 3?",
        "레시피는 1+2->3 이에요. 금속1 이 2개, 금속2 가 1개일 때 금속3 은 최대 몇 개일까요?"),
      hint: t(E,
        "You need both metal 1 and metal 2 for each metal 3. Limited by metal 2 count.",
        "금속3 하나를 만들려면 금속1 과 금속2 가 모두 있어야 해요. 그래서 금속2 개수에 막혀요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAlchemyCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Recursively try to build 1 unit of metal N — for each ingredient: use stock if any, else build it recursively. If anything is missing, fail. Sections build it one piece at a time.",
        "금속 N 을 한 개 만드는 방법을 한 단락씩 쌓아 가요."),
      sections: getAlchemySections(E),
    },
  ];
}
