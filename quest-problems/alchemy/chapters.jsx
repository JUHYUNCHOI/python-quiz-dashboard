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
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"⚗️"}</div>
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
        "Recursively try to build 1 unit of metal N: for each ingredient, use stock if any, otherwise build it recursively. If anything is missing, fail.",
        "금속 N 1단위를 재귀적으로 만들어요: 재료마다 재고가 있으면 사용, 없으면 재귀적으로 제작. 하나라도 못 구하면 실패."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Recursive build(metal i)", "재귀 build(금속 i)"), code: "def build(i): if a[i]>0: a[i]-=1; return True", color: "#d97706" },
              { n: 2, label: t(E, "Try every ingredient", "각 재료 시도"), code: "for j in recipe[i]:  if not build(j): rollback; return False", color: "#7c3aed" },
              { n: 3, label: t(E, "Success → 1 unit of metal i", "성공 → 금속 i 1단위"), code: "return True", color: "#16a34a" },
              { n: 4, label: t(E, "Top-level: try build(N)", "최상위: build(N) 시도"), code: "print(1 if build(N) else 0)", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N · K)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N metals × K ingredients per recipe", "N개 금속 × 레시피당 K개 재료")}</div>
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
