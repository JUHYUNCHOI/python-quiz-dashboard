import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "days = sorted([int(input()) for _ in range(N)])",
  "",
  "# Greedy: extend subscription if gap <= K",
  "total_cost = 0",
  "i = 0",
  "",
  "while i < N:",
  "    # start a new subscription on days[i]",
  "    start = days[i]",
  "    end = days[i]",
  "    i += 1",
  "",
  "    # extend if next day is within K of current end",
  "    while i < N and days[i] - end <= K:",
  "        end = days[i]",
  "        i += 1",
  "",
  "    # cost = duration + K",
  "    duration = end - start + 1",
  "    total_cost += duration + K",
  "",
  "print(total_cost)",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeMoolooCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to watch Mooloo on certain days. A subscription for d consecutive days costs d+K. Minimize total cost! \ud83d\udcfa",
        "\ubca0\uc2dc\ub294 \ud2b9\uc815 \ub0a0\uc5d0 Mooloo\ub97c \ubcf4\uace0 \uc2f6\uc5b4. d\uc77c \uc5f0\uc18d \uad6c\ub3c5\uc740 d+K \ube44\uc6a9. \ucd1d \ube44\uc6a9\uc744 \ucd5c\uc18c\ud654! \ud83d\udcfa"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcfa"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Watching Mooloo</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2023 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "N specific days Bessie wants to watch. Each subscription costs d+K for d consecutive days. Find minimum total cost to cover all N days.",
              "N\uac1c \ud2b9\uc815 \ub0a0\uc5d0 \ubcf4\uace0 \uc2f6\uc74c. \uac01 \uad6c\ub3c5\uc740 d\uc77c \uc5f0\uc18d\uc73c\ub85c d+K \ube44\uc6a9. \ubaa8\ub4e0 N\uc77c\uc744 \ucee4\ubc84\ud558\ub294 \ucd5c\uc18c \ube44\uc6a9.")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Key insight: if two days are close (gap \u2264 K), it's cheaper to extend one subscription than start a new one!",
        "\ud575\uc2ec: \ub450 \ub0a0\uc774 \uac00\uae4c\uc6b0\uba74 (\uac04\uaca9 \u2264 K), \uc0c8 \uad6c\ub3c5\ubcf4\ub2e4 \uae30\uc874 \uad6c\ub3c5\uc744 \uc5f0\uc7a5\ud558\ub294 \uac8c \ub354 \uc2f8!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Extend vs New Subscription", "\uc5f0\uc7a5 vs \uc0c8 \uad6c\ub3c5")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: "#dcfce7", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700, color: "#166534" }}>
                {t(E, "Gap \u2264 K: EXTEND (cheaper!)", "\uac04\uaca9 \u2264 K: \uc5f0\uc7a5 (\ub354 \uc2f8!)")}
              </div>
              <div style={{ background: "#fee2e2", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700, color: "#991b1b" }}>
                {t(E, "Gap > K: NEW subscription (must pay K again)", "\uac04\uaca9 > K: \uc0c8 \uad6c\ub3c5 (K\ub97c \ub2e4\uc2dc \ub0b4\uc57c)")}
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "Days [1,3], K=5. One subscription from day 1-3 costs 3+5=8. Two separate subscriptions cost (1+5)+(1+5)=12. Which is cheaper?",
        "\ub0a0\uc9dc [1,3], K=5. 1-3\uc77c \ud558\ub098\uc758 \uad6c\ub3c5\uc740 3+5=8. \ub450 \uac1c \uad6c\ub3c5\uc740 (1+5)+(1+5)=12. \uc5b4\ub290 \uac8c \ub354 \uc2f8?"),
      question: t(E, "Days [1,3], K=5. One sub (cost 8) vs two subs (cost 12)?", "\ub0a0\uc9dc [1,3], K=5. \ud558\ub098(8) vs \ub458(12)?"),
      options: [
        t(E, "One subscription: 8", "\ud558\ub098 \uad6c\ub3c5: 8"),
        t(E, "Two subscriptions: 12", "\ub450 \uad6c\ub3c5: 12"),
      ],
      correct: 0,
      explain: t(E, "One subscription is cheaper because the gap (2) \u2264 K (5)!", "\uac04\uaca9(2) \u2264 K(5)\uc774\ub77c \ud558\ub098\uac00 \ub354 \uc2f8!"),
    },
    {
      type: "input",
      narr: t(E,
        "Days [1,10], K=3. Gap = 10-1-1 = 8, which is > K=3. Must use two separate subscriptions. Cost = (1+3) + (1+3) = 8.",
        "\ub0a0\uc9dc [1,10], K=3. \uac04\uaca9 = 10-1-1 = 8, K=3\ubcf4\ub2e4 \ud07c. \ub450 \uac1c \uad6c\ub3c5 \ud544\uc694. \ube44\uc6a9 = (1+3) + (1+3) = 8."),
      question: t(E, "Days [1,10], K=3 \u2192 total cost?", "\ub0a0\uc9dc [1,10], K=3 \u2192 \ucd1d \ube44\uc6a9?"),
      hint: t(E, "Gap=8 > K=3, so two subscriptions. Each covers 1 day: (1+3)+(1+3)", "\uac04\uaca9=8 > K=3, \ub450 \uad6c\ub3c5. \uac01\uac01 1\uc77c: (1+3)+(1+3)"),
      answer: 8,
    },
    {
      type: "reveal",
      narr: t(E,
        "Greedy algorithm: sort days, then scan left to right. Extend current subscription if gap \u2264 K, otherwise start a new one!",
        "\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998: \ub0a0\uc9dc \uc815\ub82c \ud6c4 \uc67c\ucabd\uc5d0\uc11c \uc624\ub978\ucabd\uc73c\ub85c \uc2a4\uce94. \uac04\uaca9 \u2264 K\uba74 \uc5f0\uc7a5, \uc544\ub2c8\uba74 \uc0c8 \uad6c\ub3c5!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Greedy Algorithm", "\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
              {t(E,
                "1. Sort all days\n2. Start subscription on first day\n3. If next day - current end \u2264 K: extend\n4. Otherwise: finalize current, start new\n5. Cost for each sub = duration + K",
                "1. \ubaa8\ub4e0 \ub0a0\uc9dc \uc815\ub82c\n2. \uccab \ub0a0\uc5d0 \uad6c\ub3c5 \uc2dc\uc791\n3. \ub2e4\uc74c \ub0a0 - \ud604\uc7ac \ub05d \u2264 K\uba74: \uc5f0\uc7a5\n4. \uc544\ub2c8\uba74: \ud604\uc7ac \ub9c8\ubb34\ub9ac, \uc0c8 \uad6c\ub3c5\n5. \uac01 \uad6c\ub3c5 \ube44\uc6a9 = \uae30\uac04 + K")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeMoolooCh2(E) {
  return [
    {
      type: "code",
      narr: t(E,
        "Here's the greedy solution. We scan sorted days and group close ones into single subscriptions.",
        "\uadf8\ub9ac\ub514 \ud480\uc774\uc57c. \uc815\ub82c\ub41c \ub0a0\uc9dc\ub97c \uc2a4\uce94\ud558\uba70 \uac00\uae4c\uc6b4 \ub0a0\ub4e4\uc744 \ud558\ub098\uc758 \uad6c\ub3c5\uc73c\ub85c \ubb36\uc5b4."),
      label: t(E, "\ud83d\udc0d Full Solution", "\ud83d\udc0d \uc804\uccb4 \ud480\uc774"),
      code: SOLUTION_CODE,
    },
    {
      type: "quiz",
      narr: t(E,
        "When do we start a new subscription instead of extending?",
        "\uc5f0\uc7a5 \ub300\uc2e0 \uc0c8 \uad6c\ub3c5\uc744 \uc2dc\uc791\ud558\ub294 \uc870\uac74\uc740?"),
      question: t(E, "Start new subscription when gap is...?", "\uc0c8 \uad6c\ub3c5 \uc2dc\uc791 \uc870\uac74: \uac04\uaca9\uc774...?"),
      options: [
        t(E, "gap \u2264 K", "\uac04\uaca9 \u2264 K"),
        t(E, "gap > K", "\uac04\uaca9 > K"),
        t(E, "gap = 0", "\uac04\uaca9 = 0"),
      ],
      correct: 1,
      explain: t(E, "When gap > K, paying K again for a new sub is cheaper than extending!", "\uac04\uaca9 > K\uc774\uba74 \uc0c8 \uad6c\ub3c5\uc758 K\ub97c \ub0b4\ub294 \uac8c \uc5f0\uc7a5\ubcf4\ub2e4 \uc2f8!"),
    },
    {
      type: "input",
      narr: t(E,
        "Days [1,2,3,10], K=2. Days 1-3 have gap \u2264 2, so one sub: 3+2=5. Day 10 is gap 7>2, new sub: 1+2=3. Total = 5+3 = 8!",
        "\ub0a0\uc9dc [1,2,3,10], K=2. 1-3\uc77c\uc740 \uac04\uaca9\u22642, \ud558\ub098 \uad6c\ub3c5: 3+2=5. 10\uc77c\uc740 \uac04\uaca9 7>2, \uc0c8 \uad6c\ub3c5: 1+2=3. \ucd1d = 5+3 = 8!"),
      question: t(E, "Days [1,2,3,10], K=2 \u2192 total cost?", "\ub0a0\uc9dc [1,2,3,10], K=2 \u2192 \ucd1d \ube44\uc6a9?"),
      hint: t(E, "Two groups: {1,2,3} and {10}", "\ub450 \uadf8\ub8f9: {1,2,3}\uacfc {10}"),
      answer: 8,
    },
  ];
}
