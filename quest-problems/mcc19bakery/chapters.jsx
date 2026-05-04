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
        "A bakery has a promotion: every 4th purchase, you get the 2nd cheapest item free.\nGiven N items with prices, find the minimum cost to buy all items!", "빵집에서 프로모션 중이야: 4번째 구매마다 2번째로 싼 아이템이 무료야. N개의 아이템 가격이 주어지면 모든 아이템을 사는 최소 비용을 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🥖</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Bakery</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P2</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Sort items by price descending. Group into sets of 4. In each group, the 2nd cheapest (4th in sorted order) is free.",
              "핵심: 가격 내림차순 정렬. 4개씩 묶어. 각 그룹에서 2번째로 싼 것(정렬 순서로 4번째)이 무료.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If you buy 4 items costing [1, 2, 3, 4], which item is free under the promotion?", "가격이 [1, 2, 3, 4]인 아이템 4개를 사면, 프로모션으로 어떤 아이템이 무료일까?"),
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
        "맞아! 2번째로 싼 건 가격 2인 아이템이야. 그래서 총 비용 = 1+3+4 = 8."),
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
        "Sort descending, then skip every 4th item. O(N log N) for sorting!", "내림차순 정렬 후 4번째마다 건너뛰어. 정렬에 O(N log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Greedy: sort descending, group by 4. The 4th element in each group (2nd cheapest) is free. Sum everything except those.",
              "그리디: 내림차순 정렬, 4개씩 묶기. 각 그룹의 4번째(2번째로 싼 것)가 무료. 그것만 빼고 합산.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19BakerySections(E),
    },
  ];
}
