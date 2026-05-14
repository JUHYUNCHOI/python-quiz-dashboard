import { C, t } from "@/components/quest/theme";
import { getMoolooSections, MoolooMergeSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem understanding
   ═══════════════════════════════════════════════════════════════ */
export function makeMoolooCh1(E) {
  return [
    {
      type: "reveal",
      narr: t(E,
        "Bessie wants to watch Mooloo on N specific days. A subscription for d consecutive days costs d + K (a fixed activation fee K is paid no matter how short).\nFind the MINIMUM total cost to buy subscriptions covering EVERY day on her list.",
        "Bessie가 정해진 N개의 날짜에 Mooloo 를 보고 싶어요. d 일 연속 구독은 d + K 비용이에요 (한 번 켤 때마다 길이와 상관없이 K 만큼 추가돼요).\n그녀의 목록에 있는 모든 날짜를 덮는 구독들의 최소 총 비용을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcfa"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Watching Mooloo</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2023 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E, "Cover every viewing day with subscriptions at minimum total cost.", "모든 시청 날짜를 덮으면서 구독 총 비용을 최소로 만들어요.")}
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
                  {t(E, "Bessie wants to watch Mooloo on ", "Bessie가 정해진 ")}
                  <b style={{ color: "#f97316" }}>{t(E, "N specific days", "N개의 날짜")}</b>
                  {t(E, " (sorted in increasing order).",
                        " 에 보고 싶어요 (오름차순으로 주어짐).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "subscription for d consecutive days", "d 일 연속 구독")}</b>
                  {t(E, " costs ", " 의 비용은 ")}
                  <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>d + K</code>
                  {t(E, " (K is a fixed activation fee).",
                        " (K 는 한 번 켤 때마다 드는 고정 비용이에요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost to cover every day on her list", "그녀의 목록에 있는 모든 날짜를 덮는 최소 총 비용")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Key insight: if two days are close (gap \u2264 K), it's cheaper to extend one subscription than start a new one!", "\ud575\uc2ec: \ub450 \ub0a0\uc774 \uac00\uae4c\uc6b0\uba74 (\uac04\uaca9 \u2264 K), \uc0c8 \uad6c\ub3c5\ubcf4\ub2e4 \uae30\uc874 \uad6c\ub3c5\uc744 \uc5f0\uc7a5\ud558\ub294 \uac8c \ub354 \uc2f8!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f97316", marginBottom: 10 }}>
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
        "Days [1,3], K=5.\nOne subscription from day 1-3 costs 3+5=8.\nTwo separate subscriptions cost (1+5)+(1+5)=12.\nWhich is cheaper?", "\ub0a0\uc9dc [1,3], K=5.\n1-3\uc77c \ud558\ub098\uc758 \uad6c\ub3c5\uc740 3+5=8.\n\ub450 \uac1c \uad6c\ub3c5\uc740 (1+5)+(1+5)=12.\n\uc5b4\ub290 \uac8c \ub354 \uc2f8?"),
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
        "Days [1,10], K=3.\nGap = 10-1-1 = 8, which is > K=3.\nMust use two separate subscriptions.\nCost = (1+3) + (1+3) = 8.", "\ub0a0\uc9dc [1,10], K=3.\n\uac04\uaca9 = 10-1-1 = 8, K=3\ubcf4\ub2e4 \ud07c.\n\ub450 \uac1c \uad6c\ub3c5 \ud544\uc694.\n\ube44\uc6a9 = (1+3) + (1+3) = 8."),
      question: t(E, "Days [1,10], K=3 \u2192 total cost?", "\ub0a0\uc9dc [1,10], K=3 \u2192 \ucd1d \ube44\uc6a9?"),
      hint: t(E, "Compare the gap to K. If the gap is too big to extend, what's left to do?", "\uac04\uaca9\uc744 K\uc640 \ube44\uad50\ud574\ubd10\uc694. \uc5f0\uc7a5\ud558\uae30\uc5d4 \ub108\ubb34 \uba40\uba74 \uc5b4\ub5bb\uac8c \ud574\uc57c \ud560\uae4c\uc694?"),
      answer: 8,
    },
    {
      type: "reveal",
      narr: t(E,
        "Greedy algorithm: sort days, then scan left to right.\nExtend current subscription if gap \u2264 K, otherwise start a new one!", "\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998: \ub0a0\uc9dc \uc815\ub82c \ud6c4 \uc67c\ucabd\uc5d0\uc11c \uc624\ub978\ucabd\uc73c\ub85c \uc2a4\uce94.\n\uac04\uaca9 \u2264 K\uba74 \uc5f0\uc7a5, \uc544\ub2c8\uba74 \uc0c8 \uad6c\ub3c5!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fff7ed", border: "1px solid #fdba74", borderRadius: 14, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#f97316", marginBottom: 10 }}>
              {t(E, "Greedy Algorithm", "\uadf8\ub9ac\ub514 \uc54c\uace0\ub9ac\uc998")}
            </div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2, whiteSpace: "pre-line" }}>
              {t(E,
                "1. Sort all days\n2. Start subscription on first day\n3. If next day - current end \u2264 K: extend\n4. Otherwise: finalize current, start new\n5. Cost for each sub = duration + K",
                "1. \ubaa8\ub4e0 \ub0a0\uc9dc \uc815\ub82c\n2. \uccab \ub0a0\uc5d0 \uad6c\ub3c5 \uc2dc\uc791\n3. \ub2e4\uc74c \ub0a0 - \ud604\uc7ac \ub05d \u2264 K\uba74: \uc5f0\uc7a5\n4. \uc544\ub2c8\uba74: \ud604\uc7ac \ub9c8\ubb34\ub9ac, \uc0c8 \uad6c\ub3c5\n5. \uac01 \uad6c\ub3c5 \ube44\uc6a9 = \uae30\uac04 + K")}
            </div>
          </div>
        </div>),
    },
    {
      type: "reveal",
      narr: t(E,
        "Walk the greedy scan day by day. Watch each subscription grow as long as the next day fits within K, then a new bar starts when the gap is too big.",
        "\uadf8\ub9ac\ub514 \uc2a4\uce94\uc744 \ud558\ub8e8\uc529 \ub530\ub77c\uac00\uc694. \ub2e4\uc74c \ub0a0\uc774 K \uc548\uc5d0 \ub4e4\uc5b4\uc624\uba74 \uac19\uc740 \uad6c\ub3c5\uc774 \uc790\ub77c\uace0, \uac04\uaca9\uc774 \ub108\ubb34 \ud06c\uba74 \uc0c8 \ub9c9\ub300\uac00 \uc2dc\uc791\ub3fc\uc694."),
      content: <MoolooMergeSim E={E} />,
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code
   ═══════════════════════════════════════════════════════════════ */
export function makeMoolooCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMoolooSections(E),
    },
    {
      type: "quiz",
      narr: t(E,
        "When do we start a new subscription instead of extending?", "\uc5f0\uc7a5 \ub300\uc2e0 \uc0c8 \uad6c\ub3c5\uc744 \uc2dc\uc791\ud558\ub294 \uc870\uac74\uc740?"),
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
        "Days [1,2,3,10], K=2.\nDays 1-3 have gap \u2264 2, so one sub: 3+2=5.\nDay 10 is gap 7>2, new sub: 1+2=3.\nTotal = 5+3 = 8!", "\ub0a0\uc9dc [1,2,3,10], K=2.\n1-3\uc77c\uc740 \uac04\uaca9\u22642, \ud558\ub098 \uad6c\ub3c5: 3+2=5.\n10\uc77c\uc740 \uac04\uaca9 7>2, \uc0c8 \uad6c\ub3c5: 1+2=3.\n\ucd1d = 5+3 = 8!"),
      question: t(E, "Days [1,2,3,10], K=2 \u2192 total cost?", "\ub0a0\uc9dc [1,2,3,10], K=2 \u2192 \ucd1d \ube44\uc6a9?"),
      hint: t(E, "Two groups: {1,2,3} and {10}", "\ub450 \uadf8\ub8f9: {1,2,3}\uacfc {10}"),
      answer: 8,
    },
  ];
}
