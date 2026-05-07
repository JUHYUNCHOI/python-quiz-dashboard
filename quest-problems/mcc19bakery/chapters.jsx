import { C, t } from "@/components/quest/theme";
import { getMcc19BakerySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "prices = list(map(int, input().split()))",
  "",
  "# Sort prices descending for greedy",
  "prices.sort(reverse=True)",
  "",
  "total = 0",
  "for i in range(N):",
  "    # Every 4th item (index 3,7,11,...) is free",
  "    # The 2nd cheapest in each group of 4",
  "    if (i + 1) % 4 == 0:",
  "        continue  # skip this item (free)",
  "    total += prices[i]",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19BakeryCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A bakery has a promotion: in every group of 4 items you check out together, the 2nd cheapest item in the group is FREE.\nYou want to buy all N items grouped however you like (groups of up to 4). Print the minimum total cost.",
        "빵집 프로모션: 한 번에 4 개씩 묶어 계산할 때마다 그 그룹에서 2 번째로 싼 아이템이 무료예요.\n총 N 개 아이템을 원하는 대로 묶어 (최대 4 개씩) 사요. 최소 총 비용을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🥖</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Bakery</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P2</div>
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
                  <b style={{ color: "#d97706" }}>{t(E, "N bakery items with given prices", "가격이 주어진 N 개의 빵집 아이템")}</b>
                  {t(E, ".", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "In every checkout group of 4 items, ", "한 번 계산할 때 4 개씩 묶으면 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "the 2nd cheapest in the group is FREE", "그룹에서 2 번째로 싼 아이템이 무료")}</b>
                  {t(E, ". Smaller groups don't trigger the discount.",
                        " — 4 개 미만 그룹은 할인 없음.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost to buy all N items", "모든 N 개 아이템을 사는 최소 총 비용")}</b>
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
        "If you buy 4 items costing [1, 2, 3, 4], which item is free under the promotion?", "가격이 [1, 2, 3, 4]인 아이템 4개를 사면, 프로모션으로 어떤 아이템이 무료일까요?"),
      question: t(E,
        "4 items: costs [1, 2, 3, 4]. Which one is free (2nd cheapest)?",
        "4개 아이템: 가격 [1, 2, 3, 4]. 어떤 게 무료 (2번째로 싼 것)?"),
      options: [
        t(E, "Item costing 1", "가격 1인 아이템"),
        t(E, "Item costing 2", "가격 2인 아이템"),
        t(E, "Item costing 3", "가격 3인 아이템"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! The 2nd cheapest is the item costing 2. So total = 1+3+4 = 8.",
        "맞아! 2번째로 싼 건 가격 2인 아이템이에요. 그래서 총 비용 = 1+3+4 = 8."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "4 items with costs [1, 2, 3, 4]. The 2nd cheapest (2) is free. What's the total cost?", "가격 [1, 2, 3, 4]인 4개 아이템. 2번째로 싼 것(2)이 무료. 총 비용은?"),
      question: t(E,
        "Costs [1, 2, 3, 4], 2nd cheapest free. Total cost = ?",
        "가격 [1, 2, 3, 4], 2번째로 싼 것 무료. 총 비용 = ?"),
      hint: t(E,
        "Free item costs 2. Total = 1 + 3 + 4 = 8.",
        "무료 아이템 가격은 2. 총 = 1 + 3 + 4 = 8."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19BakeryCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort items by price DESCENDING. Group into blocks of 4: positions 0,1,2,3 are the most expensive 4, then next 4, etc. In each block, position 2 (3rd from top = 2nd cheapest of 4) is FREE. Sum all positions except those.",
        "가격 내림차순 정렬. 4 개씩 묶음: 위치 0,1,2,3 가 가장 비싼 4 개, 다음 4 개, ... 각 묶음의 위치 2 (위에서 3 번째 = 묶음 4 개 중 2 번째로 싼 것) 가 무료. 그 외 모두 합산."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19BakerySections(E),
    },
  ];
}
