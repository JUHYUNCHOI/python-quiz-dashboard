import { C, t } from "@/components/quest/theme";
import { getMcc19DitcoinSections, Mcc19DitcoinDeepAuditSim } from "./components";

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
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>💰</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Ditcoin</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P4</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E, "Print the maximum total money you can earn over D days.", "D 일 동안 벌 수 있는 최대 총액을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each day for ", "")}
                  <b style={{ color: "#f97316" }}>{t(E, "D days, you earn 1 Ditcoin", "D 일 동안 매일 Ditcoin 1 개씩 벌어요")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You know each day's ", "각 날의 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "selling price p[i]", "판매 가격 p[i]")}</b>
                  {t(E, "; on day i you may sell any number of your accumulated coins at price p[i].",
                        " 를 알고, i 일에는 보유 코인을 원하는 만큼 p[i] 로 팔 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
    // 1-2: 입출력 형식 (photoshoot25 3-박스) — 선생님 2026-08-26 THIN 카드 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? First line D (days), second line D prices. Print one number — the max total.",
        "데이터는 어떻게 들어올까? 첫 줄 D (일 수), 둘째 줄 D 개 가격. 한 줄로 최대 총액 출력."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#9a3412", fontWeight: 800 }}>D</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of days", "— 일 수")}</span></div>
              <div><span style={{ color: "#9a3412", fontWeight: 800 }}>p₁ p₂ … p_D</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— selling price on each day", "— 각 날의 판매 가격")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line: the maximum total money earnable over the D days.",
                    "한 줄: D 일 동안 벌 수 있는 최대 총액.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#9a3412", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
              <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9a3412", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`3
3 1 5`}
                </div>
              </div>
              <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#166534", whiteSpace: "pre" }}>{`15`}</div>
              </div>
            </div>
            {/* 2026-09-08: 여기 있던 "왜 15?" 설명을 뺐다.
                학생: "내가 스스로 궁리해볼 틈도 없이 답부터 봤다."
                형식 쪽은 형식만 보여주고, 예제를 파헤치는 건 다음 쪽 몫이다. */}
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ D ≤ 10⁵</div>
              <div>1 ≤ p[i] ≤ 10⁹</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "You always earn exactly 1 coin per day (never more, never less).", "매일 정확히 코인 1 개씩 벌어요 (더 많지도 적지도 않음).")}</div>
            </div>
          </div>
        </div>),
    },
    /* 원문 공식 예제. 화면에 아예 없었다 (P1 과 같은 누락).
       [3,2,6,8,10,1,7,9] → 77 은 **파는 날이 두 번**인 대표 예제다 —
       "제일 비싼 날 하루에 다 팔면 끝" 이라는 첫 생각이 여기서 깨진다.
       검산: 1~5번째 코인을 10 에 팔아 50, 나머지 3개를 마지막 날 9 에 팔아 27. 합 77. */
    {
      type: "reveal",
      narr: t(E, "A bigger example — and one day is not enough.",
                 "조금 더 큰 예제 — 하루로는 안 돼요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, flex: 1, minWidth: 190 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "example input", "예제 입력")}</div>
              <div>8</div>
              <div>3 2 6 8 10 1 7 9</div>
            </div>
            <div style={{ background: "#0f172a", color: "#86efac", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, minWidth: 90 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "output", "출력")}</div>
              <div style={{ fontWeight: 800 }}>77</div>
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, whiteSpace: "pre-line", textWrap: "balance" }}>
            {t(E,
              "The most expensive day is day 5 (price 10). Sell the 5 coins you have by then: 5 × 10 = 50.\nBut 3 more days come after that, and 3 more coins.\nWhere do those go? Think before you turn the page.",
              "제일 비싼 날은 5 일째(가격 10)예요. 그때까지 모은 코인 5 개를 팔면 5 × 10 = 50.\n그런데 그 뒤로 날이 3 일 더 남고, 코인도 3 개 더 생겨요.\n그건 어떻게 할까요? 넘기기 전에 먼저 생각해봐요.")}
          </div>
        </div>),
    },

    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Prices = [3, 1, 5]. You earn 1 coin/day. When should you sell?", "가격 = [3, 1, 5]. 하루에 코인을 1 개씩 벌어요. 언제 팔아야 할까요?"),
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
    // 1-3: Deep-audit sim — toggle SELL days, watch coins/profit live
    {
      type: "reveal",
      narr: t(E,
        "Try it yourself. Toggle the sell days and watch the coins and profit change. Can you match the optimal profit?",
        "직접 해봐요. 파는 날을 켰다 껐다 하면 코인과 수익이 바로 바뀌어요. 최적 수익과 같게 만들 수 있나요?"),
      content: <Mcc19DitcoinDeepAuditSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Prices = [3, 1, 5]. Sell all 3 coins at price 5. Total profit?", "가격 = [3, 1, 5]. 코인 3개를 가격 5에 전부 판매. 총 수익은?"),
      question: t(E,
        "Prices [3, 1, 5]. Max profit = ?",
        "가격 [3, 1, 5]. 최대 수익 = ?"),
      hint: t(E,
        "Hold all 3 coins, then sell them together on the day with the highest price. Multiply count × that price.",
        "코인 3개를 모았다가, 가격이 가장 높은 날에 전부 함께 팔아요. 개수 × 그 날 가격."),
      answer: 15,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19DitcoinCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      /* 2026-09-08: 여기 narr 이 "i 일에 미래 최고 가격은 suffix_max[i]…" 로
         **결론부터** 시작했다. 앞 쪽에서 학생이 규칙을 찾았으니, 여기선 코드로 옮기는
         이야기만 한다. 그리고 suffix_max 라는 이름이 여기서 처음 나오므로 뜻을 붙인다
         (학생: "코드 쪽에서 갑자기 영어 변수 이름으로만 부르니 스스로 연결해야 했다"). */
      narr: t(E,
        "suffix_max[i] = the best price from day i to the end. Let us build it.",
        "suffix_max[i] 는 i 일부터 마지막 날까지 중 가장 비싼 가격이에요. 그걸 만들어 봐요."),
      sections: getMcc19DitcoinSections(E),
    },
  ];
}
