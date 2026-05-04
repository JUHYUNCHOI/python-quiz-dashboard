import { C, t } from "@/components/quest/theme";
import { getMcc19DitcoinSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "prices = list(map(int, input().split()))",
  "",
  "# Suffix maximum: best future price from day i onward",
  "suffix_max = [0] * N",
  "suffix_max[N - 1] = prices[N - 1]",
  "for i in range(N - 2, -1, -1):",
  "    suffix_max[i] = max(prices[i], suffix_max[i + 1])",
  "",
  "profit = 0",
  "coins = 0",
  "for i in range(N):",
  "    coins += 1  # earn 1 coin per day",
  "    # Sell all coins if today's price >= all future prices",
  "    if prices[i] == suffix_max[i]:",
  "        profit += coins * prices[i]",
  "        coins = 0",
  "",
  "print(profit)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19DitcoinCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "You earn 1 Ditcoin per day and know future prices.\nDecide when to sell to maximize profit.\nGreedy: sell when today's price is the best remaining!", "매일 Ditcoin 1개를 벌고 미래 가격을 알아. 언제 팔지 결정해서 수익을 최대화해. 그리디: 오늘 가격이 남은 중 최고일 때 팔아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>💰</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Ditcoin</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P4</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Compute suffix max of prices. Sell all coins when today's price equals suffix max (no better future price).",
              "핵심: 가격의 접미사 최댓값 계산. 오늘 가격이 접미사 최댓값과 같으면(더 좋은 미래 가격 없음) 모든 코인 판매.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Prices = [3, 1, 5]. You earn 1 coin/day. When should you sell?", "가격 = [3, 1, 5]. 하루에 코인 1개씩 벌어. 언제 팔아야 해?"),
      question: t(E,
        "Prices [3, 1, 5]. Best strategy?",
        "가격 [3, 1, 5]. 최적 전략은?"),
      options: [
        t(E, "Sell 1 coin at price 3 on day 1", "1일에 코인 1개를 가격 3에 판매"),
        t(E, "Hold all and sell 3 coins at price 5 on day 3", "전부 모아서 3일에 코인 3개를 가격 5에 판매"),
        t(E, "Sell each day", "매일 판매"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Day 3 price (5) is the highest. Hold all 3 coins and sell at 5 → profit = 15.",
        "맞아! 3일 가격(5)이 최고야. 코인 3개를 모아 5에 판매 → 수익 = 15."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Prices = [3, 1, 5]. Sell all 3 coins at price 5. Total profit?", "가격 = [3, 1, 5]. 코인 3개를 가격 5에 전부 판매. 총 수익은?"),
      question: t(E,
        "Prices [3, 1, 5]. Max profit = ?",
        "가격 [3, 1, 5]. 최대 수익 = ?"),
      hint: t(E,
        "Hold 3 coins, sell all at price 5. Profit = 3 × 5 = 15.",
        "코인 3개 보유, 전부 가격 5에 판매. 수익 = 3 × 5 = 15."),
      answer: 15,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19DitcoinCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Compute suffix max in one pass from right, then greedily sell. O(N) time!", "오른쪽부터 한 번에 접미사 최댓값 계산, 그리디하게 판매. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Two passes: 1) Build suffix max array. 2) Scan left to right, accumulate coins, sell when price = suffix max.",
              "두 번 순회: 1) 접미사 최댓값 배열 구축. 2) 왼쪽에서 오른쪽으로 코인 누적, 가격 = 접미사 최댓값일 때 판매.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19DitcoinSections(E),
    },
  ];
}
