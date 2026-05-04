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
        "N metals with recipes that combine lower metals into higher ones.\nMaximize the amount of metal N you can create!", "N개의 금속과 레시피로 낮은 금속을 합쳐 높은 금속을 만들어. 금속 N을 최대한 많이 만들어!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"⚗️"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Alchemy</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Open 2022 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Greedy from top down. To make metal N, recursively try to gather ingredients. Use each metal at most once.",
              "핵심: 위에서 아래로 그리디. 금속 N을 만들려면 재료를 재귀적으로 모아. 각 금속은 최대 한 번 사용.")}
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
        "맞아! 각 재료가 1개씩 필요해. 금속2가 1개뿐이니 금속3은 1개만 만들 수 있어."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Same setup: recipe 1+2->3, have 2x metal 1 and 1x metal 2. How many metal 3 can you make?", "같은 설정: 레시피 1+2->3, 금속1 2개, 금속2 1개. 금속3을 몇 개 만들 수 있어?"),
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
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Recursively try to make metal N. For each attempt, gather ingredients top-down. If any ingredient is missing, the attempt fails.",
              "재귀적으로 금속 N 만들기 시도. 각 시도에서 재료를 위에서 아래로 모아. 재료가 하나라도 없으면 실패.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getAlchemySections(E),
    },
  ];
}
