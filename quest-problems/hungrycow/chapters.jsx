import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, T = map(int, input().split())",
  "deliveries = []",
  "for _ in range(N):",
  "    d, b = map(int, input().split())",
  "    deliveries.append((d, b))",
  "",
  "deliveries.sort()",
  "",
  "eaten = 0",
  "stock = 0",
  "prev_day = 0",
  "",
  "for day, bales in deliveries:",
  "    # days between prev and this delivery",
  "    gap = day - prev_day - 1",
  "    # eat from stock during gap",
  "    eat = min(stock, gap)",
  "    eaten += eat",
  "    stock -= eat",
  "    # add new bales",
  "    stock += bales",
  "    prev_day = day - 1 + 0  # adjust for eating on delivery day",
  "",
  "# eat remaining after last delivery until day T",
  "gap = T - prev_day",
  "eaten += min(stock, gap)",
  "",
  "print(eaten)",
];

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeHungryCowCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Bessie eats 1 haybale per day. Deliveries arrive on specific days. How many days does she eat in T days? \ud83d\udc04",
        "\ubca0\uc2dc\ub294 \ud558\ub8e8\uc5d0 \uac74\ucd08 1\uac1c\ub97c \uba39\uc5b4. \ubc30\ub2ec\uc774 \ud2b9\uc815 \ub0a0\uc5d0 \ub3c4\ucc29\ud574. T\uc77c \ub3d9\uc548 \uba87 \uc77c \uba39\uc744\uae4c? \ud83d\udc04"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Hungry Cow</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2023 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Bessie eats 1 haybale/day (if she has any). N deliveries on specific days with specific amounts. Count total days she eats in T days.",
              "\ubca0\uc2dc\ub294 \ud558\ub8e8\uc5d0 \uac74\ucd08 1\uac1c \uba39\uc74c (\uc788\uc73c\uba74). N\ubc88 \ubc30\ub2ec\uc774 \ud2b9\uc815 \ub0a0\uc5d0 \ud2b9\uc815 \uc591\uc73c\ub85c \ub3c4\ucc29. T\uc77c \ub3d9\uc548 \ucd1d \uba87 \uc77c \uba39\ub294\uc9c0 \uacc4\uc0b0.")}
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Example: 2 bales delivered on day 1, T=5. She eats day 1 and day 2, then runs out. Total = 2 days!",
        "\uc608\uc2dc: 1\uc77c\uc5d0 \uac74\ucd08 2\uac1c \ubc30\ub2ec, T=5. 1\uc77c\uacfc 2\uc77c\uc5d0 \uba39\uace0 \ub5a8\uc5b4\uc9c0. \ucd1d = 2\uc77c!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Timeline Example", "\ud0c0\uc784\ub77c\uc778 \uc608\uc2dc")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {[1,2,3,4,5].map(d => (
                <div key={d} style={{
                  width: 40, height: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontSize: 11, fontWeight: 700,
                  background: d <= 2 ? "#dcfce7" : "#fee2e2",
                  border: `2px solid ${d <= 2 ? "#86efac" : "#fca5a5"}`,
                  color: d <= 2 ? "#166534" : "#991b1b",
                }}>
                  <div>{t(E, `D${d}`, `${d}\uc77c`)}</div>
                  <div style={{ fontSize: 14 }}>{d <= 2 ? "\ud83c\udf3e" : "\u274c"}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#059669", marginTop: 8 }}>
              {t(E, "2 bales on day 1 \u2192 eats day 1, 2 \u2192 total = 2", "1\uc77c\uc5d0 2\uac1c \u2192 1\uc77c, 2\uc77c \uba39\uc74c \u2192 \ucd1d = 2")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "If 2 bales are delivered on day 1 and T=5, how many days does Bessie eat?",
        "1\uc77c\uc5d0 \uac74\ucd08 2\uac1c \ubc30\ub2ec, T=5\uc774\uba74 \ubca0\uc2dc\ub294 \uba87 \uc77c \uba39\uc744\uae4c?"),
      question: t(E, "2 bales on day 1, T=5 \u2192 days eaten?", "1\uc77c\uc5d0 2\uac1c, T=5 \u2192 \uba87 \uc77c \uba39\uc744\uae4c?"),
      options: ["1", "2", "5"],
      correct: 1,
      explain: t(E, "She eats 1 bale on day 1, 1 on day 2, then 0 stock left. Total = 2!", "1\uc77c\uc5d0 1\uac1c, 2\uc77c\uc5d0 1\uac1c \uba39\uace0, \uc7ac\uace0 0. \ucd1d = 2!"),
    },
    {
      type: "input",
      narr: t(E,
        "10 bales on day 1, 10 bales on day 5, T=5. Day 1-4: eat from first delivery (4 bales). Day 5: new delivery + remaining stock. She has food every day!",
        "1\uc77c\uc5d0 10\uac1c, 5\uc77c\uc5d0 10\uac1c, T=5. 1-4\uc77c: \uccab \ubc88\uc9f8 \ubc30\ub2ec\uc5d0\uc11c \uba39\uc74c (4\uac1c). 5\uc77c: \uc0c8 \ubc30\ub2ec + \ub0a8\uc740 \uc7ac\uace0. \ub9e4\uc77c \uba39\uc744 \uc218 \uc788\uc5b4!"),
      question: t(E, "10 bales day 1, 10 bales day 5, T=5 \u2192 days eaten?", "1\uc77c 10\uac1c, 5\uc77c 10\uac1c, T=5 \u2192 \uba87 \uc77c?"),
      hint: t(E, "She has enough stock every day from 1 to 5", "1\uc77c\ubd80\ud130 5\uc77c\uae4c\uc9c0 \ub9e4\uc77c \uc7ac\uace0 \ucda9\ubd84"),
      answer: 5,
    },
    {
      type: "reveal",
      narr: t(E,
        "Strategy: Sort deliveries by day. Process gaps between deliveries, eating from stock. Simple simulation!",
        "\uc804\ub7b5: \ubc30\ub2ec\uc744 \ub0a0\uc9dc\uc21c \uc815\ub82c. \ubc30\ub2ec \uc0ac\uc774 \uac04\uaca9\uc744 \ucc98\ub9ac\ud558\uba70 \uc7ac\uace0\uc5d0\uc11c \uba39\uc74c. \uac04\ub2e8\ud55c \uc2dc\ubbac\ub808\uc774\uc158!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Algorithm", "\uc54c\uace0\ub9ac\uc998")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
              {t(E,
                "1. Sort deliveries by day\n2. For each delivery, calculate gap from previous\n3. Eat min(stock, gap) during the gap\n4. Add new bales to stock\n5. After last delivery, eat until day T",
                "1. \ubc30\ub2ec\uc744 \ub0a0\uc9dc\uc21c \uc815\ub82c\n2. \uac01 \ubc30\ub2ec\ub9c8\ub2e4 \uc774\uc804\uacfc\uc758 \uac04\uaca9 \uacc4\uc0b0\n3. \uac04\uaca9 \ub3d9\uc548 min(\uc7ac\uace0, \uac04\uaca9) \uba39\uae30\n4. \uc0c8 \uac74\ucd08\ub97c \uc7ac\uace0\uc5d0 \ucd94\uac00\n5. \ub9c8\uc9c0\ub9c9 \ubc30\ub2ec \ud6c4 T\uc77c\uae4c\uc9c0 \uba39\uae30")}
            </div>
          </div>
        </div>),
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeHungryCowCh2(E) {
  return [
    {
      type: "code",
      narr: t(E,
        "Here's the solution. We process deliveries in order and track stock/eaten counts.",
        "\ud480\uc774\uc57c. \ubc30\ub2ec\uc744 \uc21c\uc11c\ub300\ub85c \ucc98\ub9ac\ud558\uba70 \uc7ac\uace0/\uba39\uc740 \uc218\ub97c \ucd94\uc801\ud574."),
      label: t(E, "\ud83d\udc0d Full Solution", "\ud83d\udc0d \uc804\uccb4 \ud480\uc774"),
      code: SOLUTION_CODE,
    },
    {
      type: "quiz",
      narr: t(E,
        "Why do we sort deliveries by day?",
        "\ubc30\ub2ec\uc744 \ub0a0\uc9dc\uc21c\uc73c\ub85c \uc815\ub82c\ud558\ub294 \uc774\uc720\ub294?"),
      question: t(E, "Why sort deliveries?", "\ubc30\ub2ec\uc744 \uc815\ub82c\ud558\ub294 \uc774\uc720?"),
      options: [
        t(E, "To process chronologically", "\uc2dc\uac04\uc21c\uc73c\ub85c \ucc98\ub9ac"),
        t(E, "To find maximum bales", "\ucd5c\ub300 \uac74\ucd08 \ucc3e\uae30"),
        t(E, "Not needed", "\ud544\uc694 \uc5c6\uc74c"),
      ],
      correct: 0,
      explain: t(E, "We need to process gaps between deliveries in chronological order!", "\ubc30\ub2ec \uc0ac\uc774 \uac04\uaca9\uc744 \uc2dc\uac04\uc21c\uc73c\ub85c \ucc98\ub9ac\ud574\uc57c \ud558\ub2c8\uae4c!"),
    },
    {
      type: "input",
      narr: t(E,
        "3 bales on day 1, 2 bales on day 10, T=10. Days 1-3: eat 3. Gap to day 10 = 6 days, only 0 stock. Day 10: get 2, eat 1. Total = 3+1 = 4!",
        "1\uc77c\uc5d0 3\uac1c, 10\uc77c\uc5d0 2\uac1c, T=10. 1-3\uc77c: 3\uac1c \uba39\uc74c. 10\uc77c\uae4c\uc9c0 \uac04\uaca9=6\uc77c, \uc7ac\uace0 0. 10\uc77c: 2\uac1c \ubc1b\uace0 1\uac1c \uba39\uc74c. \ucd1d = 3+1 = 4!"),
      question: t(E, "3 bales day 1, 2 bales day 10, T=10 \u2192 days eaten?", "1\uc77c 3\uac1c, 10\uc77c 2\uac1c, T=10 \u2192 \uba87 \uc77c?"),
      hint: t(E, "Stock runs out after day 3. Day 10 she gets more", "3\uc77c \ud6c4 \uc7ac\uace0 \uc18c\uc9c4. 10\uc77c\uc5d0 \ub354 \ubc1b\uc74c"),
      answer: 4,
    },
  ];
}
