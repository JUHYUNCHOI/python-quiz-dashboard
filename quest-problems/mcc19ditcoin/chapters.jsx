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
        "Each day for D days you earn 1 Ditcoin. You know each day's selling price p[i]. On any day you may sell ANY number of your accumulated Ditcoins at that day's price.\nPrint the MAXIMUM total money earnable over the D days.",
        "D 일 동안 매일 Ditcoin 1 개씩 벌어요. 각 날의 판매 가격 p[i] 를 알아요. 어떤 날에든 그 날 가격으로 보유한 Ditcoin 을 원하는 만큼 팔 수 있어요.\nD 일 동안 벌 수 있는 최대 총액을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>💰</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Ditcoin</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P4</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each day for ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "D days, you earn 1 Ditcoin", "D 일 동안 매일 Ditcoin 1 개씩 벌어요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You know each day's ", "각 날의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "selling price p[i]", "판매 가격 p[i]")}</b>
                  {t(E, "; on day i you may sell any number of your accumulated coins at price p[i].",
                        " 를 알고, i 일에는 보유 코인을 원하는 만큼 p[i] 로 팔 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAXIMUM total money earnable over the D days", "D 일 동안 벌 수 있는 최대 총액")}</b>
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
        "Prices = [3, 1, 5]. You earn 1 coin/day. When should you sell?", "가격 = [3, 1, 5]. 하루에 코인 1개씩 벌어. 언제 팔아야 해요?"),
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
        "맞아! 3일 가격(5)이 최고예요. 코인 3개를 모아 5에 판매 → 수익 = 15."),
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
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Two passes: 1) Build suffix max array. 2) Scan left to right,\naccumulate coins, sell when price = suffix max.",
              "두 번 순회: 1) 접미사 최댓값 배열 구축.\n2) 왼쪽에서 오른쪽으로 코인 누적, 가격 = 접미사 최댓값일 때 판매.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19DitcoinSections(E),
    },
  ];
}
