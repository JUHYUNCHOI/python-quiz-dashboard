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
        "매일 코인을 1 개씩 벌어요. 언제 팔아야 가장 많이 벌 수 있을까요?"),
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
        "첫 줄에 일 수 D 가 오고, 둘째 줄에 가격 D 개가 와요."),
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
                    "D 일 동안 벌 수 있는 최대 총액을 한 줄에 써요.")}
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
              <div>1 ≤ D ≤ 100,000</div>
              <div>1 ≤ p[i] ≤ 1,000,000,000</div>
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
              "제일 비싼 날은 5 일째(가격 10)예요. 그때까지 모은 코인 5 개를 팔면 5 × 10 = 50 이에요.\n그런데 그 뒤로 날이 3 일 더 남고, 코인도 3 개 더 생겨요.\n그건 어떻게 할까요? 넘기기 전에 먼저 생각해봐요.")}
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
        "가격이 [3, 1, 5] 예요. 어떻게 파는 게 제일 좋을까요?"),
      options: [
        t(E, "Sell 1 coin at price 3 on day 1", "1일에 코인 1개를 가격 3에 팔아요"),
        t(E, "Hold all and sell 3 coins at price 5 on day 3", "전부 모았다가 3일에 코인 3개를 가격 5에 팔아요"),
        t(E, "Sell each day", "매일 팔아요"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Day 3 price (5) is the highest. Hold all 3 coins and sell at 5 → profit = 15.",
        "맞아요! 3일 가격 5 가 제일 높아요. 코인 3개를 모아 5 에 팔면 수익이 15 예요."),
    },
    // 1-3: Deep-audit sim — toggle SELL days, watch coins/profit live
    {
      type: "reveal",
      narr: t(E,
        "Toggle the sell days. The last preset is the 8-day example from before.",
        "파는 날을 켰다 껐다 해봐요. 맨 끝 프리셋이 아까 그 8 일 예제예요."),
      content: <Mcc19DitcoinDeepAuditSim E={E} />,
    },

    /* 2026-09-17: 앞에서 "8 일 예제의 나머지 3 일은 어떻게 할까?" 라고 물어놓고
       그 질문을 어디에서도 닫지 않았다. 시뮬도 퀴즈도 전부 다른 값으로 돌아갔다.
       여기서 회수한다. 그리고 학생이 실제로 한 생각("코인마다 각각 최고가 날에
       판다")이 코드의 모양("구간을 묶어 한 번에 판다")과 왜 같은 답을 내는지도
       여기서 이어 붙인다 — 그게 화면에 한 번도 없었다. */
    {
      type: "reveal",
      narr: t(E,
        "Back to the 8-day example — let us close it.",
        "아까 8 일 예제로 돌아가 마무리해요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          <div style={{ background: "#fff7ed", border: "1.5px solid #fdba74", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#9a3412", marginBottom: 8 }}>
              ✅ {t(E, "The 8-day example: 77", "8 일 예제의 답은 77")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, color: "#7c2d12", lineHeight: 1.8 }}>
              <div>3 2 6 8 <b style={{ color: "#dc2626" }}>10</b> 1 7 <b style={{ color: "#dc2626" }}>9</b></div>
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, marginTop: 8, whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "Day 5 (price 10): sell the 5 coins you hold → 50.\nDay 8 (price 9): sell the 3 coins from the days after → 27.\n50 + 27 = 77.",
                "5 일째 (가격 10): 그때까지 모은 코인 5 개를 팔아 50.\n8 일째 (가격 9): 그 뒤에 생긴 코인 3 개를 팔아 27.\n50 + 27 = 77 이에요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: 12, padding: "12px 14px", wordBreak: "keep-all" }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "#1d4ed8", marginBottom: 8 }}>
              🤔 {t(E, "\"I was thinking coin by coin\" — that works too", "\"난 코인 하나씩 생각했는데?\" — 그것도 맞아요")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.75, whiteSpace: "pre-line", textWrap: "balance" }}>
              {t(E,
                "Take one coin at a time: the coin earned on day i should be sold on the priciest day from day i onward.\nCoins from days 1–5 all point at day 5 (price 10) — that is 5 coins × 10.\nCoins from days 6–8 all point at day 8 (price 9) — that is 3 coins × 9.\nCoins that point at the same day are sold on that day together. Counting them one by one and selling them in a bunch give the same number.",
                "코인을 하나씩 봐요. i 일에 번 코인은 i 일부터 끝까지 중 가장 비싼 날에 팔면 돼요.\n1~5 일에 번 코인은 모두 5 일째 (가격 10) 를 가리켜요 — 코인 5 개 × 10.\n6~8 일에 번 코인은 모두 8 일째 (가격 9) 를 가리켜요 — 코인 3 개 × 9.\n같은 날을 가리키는 코인들은 그날 함께 팔려요.\n그래서 하나씩 세든 한 번에 묶어 팔든 답은 똑같아요.")}
            </div>
          </div>
        </div>),
    },

    // 1-4: Input
    /* 2026-09-17: 여기가 [3,1,5] 였다 — 한 번만 팔면 끝나는 자명한 경우다.
       이 문제의 핵심은 "여러 번 팔아야 할 때도 있다" 인데 그걸 확인하는 자리가
       한 군데도 없었다. 두 번 파는 경우로 바꾼다.
       검산 [2,4,1,5,3]: 4 일째(5) 에 코인 4 개 = 20, 5 일째(3) 에 코인 1 개 = 3 → 23. */
    {
      type: "input",
      narr: t(E,
        "Prices = [2, 4, 1, 5, 3]. One sell day may not be enough.", "가격 = [2, 4, 1, 5, 3]. 파는 날이 하루로는 모자랄 수 있어요."),
      question: t(E,
        "Prices [2, 4, 1, 5, 3]. Max profit = ?",
        "가격이 [2, 4, 1, 5, 3] 예요. 가장 많이 벌면 얼마일까요?"),
      hint: t(E,
        "The priciest day is day 4 — sell the coins you hold by then. But one more day comes after it, and one more coin: day 5 still pays 3.",
        "제일 비싼 날은 4 일째예요. 그때까지 모은 코인을 팔아요.\n그런데 그 뒤로 하루가 더 남고 코인도 하나 더 생겨요.\n5 일째에도 가격 3 은 받을 수 있어요."),
      answer: 23,
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
