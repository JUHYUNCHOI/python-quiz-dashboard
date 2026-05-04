import { C, t } from "@/components/quest/theme";
import { getAlchemySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "count = [0] * (N + 1)",
  "for _ in range(int(input())):",
  "    count[int(input())] += 1",
  "",
  "K = int(input())",
  "recipes = {}",
  "for _ in range(K):",
  "    line = list(map(int, input().split()))",
  "    target = line[0]",
  "    ingredients = line[1:]",
  "    recipes[target] = ingredients",
  "",
  "# Greedy: try to make metal N from top down",
  "def make(metal):",
  "    if count[metal] > 0:",
  "        count[metal] -= 1",
  "        return True",
  "    if metal not in recipes:",
  "        return False",
  "    for ing in recipes[metal]:",
  "        if not make(ing):",
  "            return False",
  "    return True",
  "",
  "ans = 0",
  "while make(N):",
  "    ans += 1",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAlchemyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N metals (1..N), and you start with some count of each. Each metal i (i ≥ 2) has a recipe — a set of lower-numbered metals — that turns into ONE unit of metal i.\nUsing the recipes any number of times, can you create at least one unit of metal N?",
        "1번부터 N번까지 N개의 금속이 있고, 각 금속의 시작 개수가 주어져요. 2번 이상의 금속 i는 각자 레시피를 가지고 있어요 — 더 낮은 번호의 금속들을 모아서 i 1개를 만들어요.\n레시피를 마음대로 사용해서 금속 N을 1개 이상 만들 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"⚗️"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Alchemy</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #3</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N metals numbered 1..N", "1..N 번호의 금속 N개")}</b>
                  {t(E, ". You start with ", "이 있어요. 시작할 때 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>a[i]</code>
                  {t(E, " units of metal i.", " 단위의 금속 i를 가지고 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "For each metal ", "각 금속 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "i ≥ 2, you're given a recipe", "i ≥ 2에 대해 레시피")}</b>
                  {t(E, " — a set of distinct lower-numbered metals — that combines into 1 unit of metal i.",
                        " — 서로 다른 더 낮은 번호의 금속들 — 가 주어져요. 이 재료를 모으면 금속 i 1단위가 만들어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You can ", "레시피는 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "apply any recipe any number of times", "원하는 만큼 여러 번 사용")}</b>
                  {t(E, ", as long as you have the ingredients.",
                        "할 수 있어요. 재료가 있다면.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "1 if you can make at least 1 unit of metal N, else 0", "금속 N을 1단위 이상 만들 수 있으면 1, 없으면 0")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "Recipe: metal 1 + metal 2 = metal 3. You have 2 of metal 1 and 1 of metal 2. Max metal 3?", "레시피: 금속1 + 금속2 = 금속3. 금속1이 2개, 금속2가 1개. 최대 금속3은?"),
      question: t(E,
        "Recipe: 1+2->3. Have: 2x metal 1, 1x metal 2. Max metal 3?",
        "레시피: 1+2->3. 보유: 금속1 2개, 금속2 1개. 최대 금속3?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "0", "0"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! You need 1 of each ingredient. With 1x metal 2, you can only make 1x metal 3.",
        "맞아! 각 재료가 1개씩 필요해요. 금속2가 1개뿐이니 금속3은 1개만 만들 수 있어요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same setup: recipe 1+2->3, have 2x metal 1 and 1x metal 2. How many metal 3 can you make?", "같은 설정: 레시피 1+2->3, 금속1 2개, 금속2 1개. 금속3을 몇 개 만들 수 있어요?"),
      question: t(E,
        "Recipe: 1+2->3. Have 2x metal 1, 1x metal 2. Max metal 3?",
        "레시피: 1+2->3. 금속1 2개, 금속2 1개. 최대 금속3?"),
      hint: t(E,
        "You need both metal 1 and metal 2 for each metal 3. Limited by metal 2 count.",
        "금속3 하나당 금속1과 금속2가 모두 필요. 금속2 개수에 제한됨."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeAlchemyCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Greedy recursive approach: try to make metal N, consuming ingredients.\nRepeat until impossible.", "그리디 재귀 접근: 금속 N을 만들고, 재료 소모. 불가능할 때까지 반복."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N * K)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Recursively try to make metal N.\nFor each attempt, gather ingredients top-down. If any ingredient is missing, the attempt fails.",
              "재귀적으로 금속 N 만들기 시도.\n각 시도에서 재료를 위에서 아래로 모아요. 재료가 하나라도 없으면 실패.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getAlchemySections(E),
    },
  ];
}
