import { C, t } from "@/components/quest/theme";
import { getHungryCowSections } from "./components";

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
        "Bessie eats 1 haybale per day if she has any in stock.\nThere are N hay deliveries — each on a specific day, each adding some bales to her stockpile.\nGiven the deliveries and a target day T, count how many of days 1..T Bessie actually eats on.",
        "Bessie는 재고가 있으면 하루에 건초 1단을 먹어요.\n특정 날짜에 특정 양이 도착하는 N번의 건초 배달이 있어요.\n배달 정보와 마감일 T가 주어지면, 1~T일 중 Bessie가 실제로 먹는 날의 수를 구해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Hungry Cow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2023 Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie ", "Bessie는 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "eats 1 haybale per day", "재고가 있으면 하루에 건초 1단을 먹어요")}</b>
                  {t(E, " if she has any in stock — otherwise she eats nothing that day.",
                        " — 재고가 없으면 그 날은 못 먹어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "N hay deliveries", "N번의 건초 배달")}</b>
                  {t(E, " — each gives a day ", " 이 있어요. 각 배달은 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>d</code>
                  {t(E, " and an amount ", " 일에 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>b</code>
                  {t(E, " bales added to her stockpile.", " 단의 건초가 재고에 추가돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given a target day ", "마감일 ")}
                  <b style={{ color: "#7c3aed" }}>T</b>
                  {t(E, " (which can be huge — up to 10¹⁴).",
                        " 가 주어져요 (10¹⁴까지 매우 큼).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of days from day 1 to day T on which Bessie actually eats", "1일~T일 중 Bessie가 실제로 먹는 날의 수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Example: 2 bales delivered on day 1, T=5.\nShe eats day 1 and day 2, then runs out.\nTotal = 2 days!", "\uc608\uc2dc: 1\uc77c\uc5d0 \uac74\ucd08 2\uac1c \ubc30\ub2ec, T=5.\n1\uc77c\uacfc 2\uc77c\uc5d0 \uba39\uace0 \ub5a8\uc5b4\uc9c0.\n\ucd1d = 2\uc77c!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Timeline Example", "\ud0c0\uc784\ub77c\uc778 \uc608\uc2dc")}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              {[1,2,3,4,5].map(d => (
                <div key={d} style={{
                  width: 40, height: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontSize: 11, fontWeight: 700,
                  background: d <= 2 ? "#dcfce7" : "#fee2e2",
                  border: `1px solid ${d <= 2 ? "#86efac" : "#fca5a5"}`,
                  color: d <= 2 ? "#166534" : "#991b1b",
                }}>
                  <div>{t(E, `D${d}`, `${d}\uc77c`)}</div>
                  <div style={{ fontSize: 14 }}>{d <= 2 ? "\ud83c\udf3e" : "\u274c"}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#059669", marginTop: 8 }}>
              {t(E, "2 bales on day 1 \u2192 eats day 1, 2 \u2192 total = 2", "1\uc77c\uc5d0 2\uac1c \u2192 1\uc77c,\n2\uc77c \uba39\uc74c \u2192 \ucd1d = 2")}
            </div>
          </div>
        </div>),
    },
    {
      type: "quiz",
      narr: t(E,
        "If 2 bales are delivered on day 1 and T=5, how many days does Bessie eat?", "1\uc77c\uc5d0 \uac74\ucd08 2\uac1c \ubc30\ub2ec, T=5\uc774\uba74 \ubca0\uc2dc\ub294 \uba87 \uc77c \uba39\uc744\uae4c?"),
      question: t(E, "2 bales on day 1, T=5 \u2192 days eaten?", "1\uc77c\uc5d0 2\uac1c, T=5 \u2192 \uba87 \uc77c \uba39\uc744\uae4c?"),
      options: ["1", "2", "5"],
      correct: 1,
      explain: t(E, "She eats 1 bale on day 1, 1 on day 2, then 0 stock left. Total = 2!", "1\uc77c\uc5d0 1\uac1c, 2\uc77c\uc5d0 1\uac1c \uba39\uace0, \uc7ac\uace0 0. \ucd1d = 2!"),
    },
    {
      type: "input",
      narr: t(E,
        "10 bales on day 1, 10 bales on day 5, T=5.\nDay 1-4: eat from first delivery (4 bales).\nDay 5: new delivery + remaining stock.\nShe has food every day!", "1\uc77c\uc5d0 10\uac1c, 5\uc77c\uc5d0 10\uac1c, T=5.\n1-4\uc77c: \uccab \ubc88\uc9f8 \ubc30\ub2ec\uc5d0\uc11c \uba39\uc74c (4\uac1c).\n5\uc77c: \uc0c8 \ubc30\ub2ec + \ub0a8\uc740 \uc7ac\uace0.\n\ub9e4\uc77c \uba39\uc744 \uc218 \uc788\uc5b4!"),
      question: t(E, "10 bales day 1, 10 bales day 5, T=5 \u2192 days eaten?", "1\uc77c 10\uac1c, 5\uc77c 10\uac1c, T=5 \u2192 \uba87 \uc77c?"),
      hint: t(E, "She has enough stock every day from 1 to 5", "1\uc77c\ubd80\ud130 5\uc77c\uae4c\uc9c0 \ub9e4\uc77c \uc7ac\uace0 \ucda9\ubd84"),
      answer: 5,
    },
    {
      type: "reveal",
      narr: t(E,
        "Strategy: Sort deliveries by day.\nProcess gaps between deliveries, eating from stock.\nSimple simulation!", "\uc804\ub7b5: \ubc30\ub2ec\uc744 \ub0a0\uc9dc\uc21c \uc815\ub82c.\n\ubc30\ub2ec \uc0ac\uc774 \uac04\uaca9\uc744 \ucc98\ub9ac\ud558\uba70 \uc7ac\uace0\uc5d0\uc11c \uba39\uc74c.\n\uac04\ub2e8\ud55c \uc2dc\ubbac\ub808\uc774\uc158!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#d97706", marginBottom: 10 }}>
              {t(E, "Algorithm", "\uc54c\uace0\ub9ac\uc998")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
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
export function makeHungryCowCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Don't simulate every day (T can be huge). Process delivery events in order — between deliveries, eat at most (stockpile) days; after T, stop. Sum eating days.",
        "매일을 시뮬레이션하면 안 돼요 (T 가 매우 큼). 배달 이벤트 순서대로 — 두 배달 사이에 (재고) 일까지 먹고, T 가 넘으면 멈춤. 먹는 날을 합산해요."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getHungryCowSections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "Why do we sort deliveries by day?", "\ubc30\ub2ec\uc744 \ub0a0\uc9dc\uc21c\uc73c\ub85c \uc815\ub82c\ud558\ub294 \uc774\uc720\ub294?"),
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
        "3 bales on day 1, 2 bales on day 10, T=10.\nDays 1-3: eat 3.\nGap to day 10 = 6 days, only 0 stock.\nDay 10: get 2, eat 1.\nTotal = 3+1 = 4!", "1\uc77c\uc5d0 3\uac1c, 10\uc77c\uc5d0 2\uac1c, T=10.\n1-3\uc77c: 3\uac1c \uba39\uc74c.\n10\uc77c\uae4c\uc9c0 \uac04\uaca9=6\uc77c, \uc7ac\uace0 0.\n10\uc77c: 2\uac1c \ubc1b\uace0 1\uac1c \uba39\uc74c.\n\ucd1d = 3+1 = 4!"),
      question: t(E, "3 bales day 1, 2 bales day 10, T=10 \u2192 days eaten?", "1\uc77c 3\uac1c, 10\uc77c 2\uac1c, T=10 \u2192 \uba87 \uc77c?"),
      hint: t(E, "Stock runs out after day 3. Day 10 she gets more", "3\uc77c \ud6c4 \uc7ac\uace0 \uc18c\uc9c4. 10\uc77c\uc5d0 \ub354 \ubc1b\uc74c"),
      answer: 4,
    },
  ];
}
