import { C, t } from "@/components/quest/theme";
import { getHoofballSections, HoofballPassSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (4 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoofballCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows stand on a number line at distinct positions. When a cow has a ball, she immediately passes it to her closest neighbor (ties → pass right). Once a ball reaches a cow, she'll keep passing it forever.\nWe need to give out balls so EVERY cow eventually touches one. Print the MINIMUM number of starting balls needed.",
        "소는 공을 받으면 가장 가까운 이웃에게 넘겨요.\n모두가 공을 만지려면 공이 몇 개 필요할까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u26BD"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Hoofball</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #2</div>
          </div>

          {/* \uD83C\uDFAF Mission box */}
          <div style={{ background: "#fff7ed", border: "1.5px solid #f97316", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9a3412", letterSpacing: 0.5, marginBottom: 4 }}>
              \uD83C\uDFAF {t(E, "Mission", "\uBBF8\uC158")}
            </div>
            <div style={{ fontSize: 13, color: "#9a3412", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of starting balls so that every cow eventually touches a ball.",
                "\uBAA8\uB4E0 \uC18C\uAC00 \uACB0\uAD6D \uACF5\uC744 \uB9CC\uC9C0\uB3C4\uB85D \u2014 \uCC98\uC74C \uB098\uB220\uC918\uC57C \uD560 \uACF5\uC758 \uCD5C\uC18C \uAC1C\uC218\uB97C \uCD9C\uB825.")}
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
                  <b style={{ color: "#f97316" }}>{t(E, "N cows stand on a number line", "N마리 소가 수직선 위에 서있어요")}</b>
                  {t(E, " at distinct positions.", ". 서 있는 자리는 모두 달라요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If a cow holds a ball, she ", "공을 가진 소는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "passes it to her CLOSEST neighbor", "가장 가까운 이웃에게 즉시 패스")}</b>
                  {t(E, " (tie → right). Cows keep passing forever.",
                        " (거리 같으면 오른쪽). 한 번 받은 소도 계속 패스해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum number of starting balls", "필요한 시작 공의 최소 개수")}</b>
                  {t(E, " so every cow eventually touches one.",
                        " 를 출력해요. 모든 소가 언젠가는 공을 한 번씩 만져야 해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Interactive sim — passes on a number line
    {
      type: "reveal",
      narr: t(E,
        "Try it: pick a sample, watch each cow's arrow point to her nearest neighbor, then press ▶. Cows nobody points to are SOURCES — count them.",
        "▶ 를 눌러 공이 어떻게 넘어가는지 봐요.\n아무도 안 가리키는 소를 세어 봐요."),
      content: <HoofballPassSim E={E} />,
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "3 cows at positions [1, 5, 10].  Trace each cow's pass — who ends up never receiving one?",
        "소 세 마리가 [1, 5, 10] 에 있어요.\n각 소가 어디로 넘기는지 따라가 봐요."),
      question: t(E,
        "Positions [1,5,10]. How many balls needed?",
        "위치가 [1,5,10] 일 때 공은 몇 개 필요할까요?"),
      options: [
        t(E, "1", "1"),
        t(E, "2", "2"),
        t(E, "3", "3"),
      ],
      correct: 1,
      explain: t(E,
        "Cow at 1 and cow at 10 never receive passes (they are sources). Need 2 balls!",
        "위치 1과 10의 소는 패스를 안 받아 (소스). 공 2개 필요!"),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Same setup, your turn — count cows that don't receive any pass.  Each needs its own ball.",
        "같은 상황이에요. 공을 못 받는 소를 직접 세어 봐요.\n그런 소는 각자 공이 하나씩 필요해요."),
      question: t(E,
        "3 cows at [1, 5, 10]. Min balls needed?",
        "소 세 마리가 [1, 5, 10] 에 있어요. 공은 최소 몇 개 필요할까요?"),
      hint: t(E,
        "Find each cow's pass target.  Who is no one's target?",
        "각 소가 누구에게 넘기는지 찾아 봐요. 아무도 안 가리키는 소는 누구일까요?"),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoofballCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code — straight in.
    {
      type: "progressive",
      narr: t(E,
        "Sort positions, find each cow's pass target, count cows that no one targets ('sources'), plus +1 per mutual-passing pair.  Sections build it one piece at a time.",
        "위치를 정렬하고 각 소가 누구에게 넘기는지 찾아요.\n아무도 안 가리키는 소를 세고, 서로만 주고받는 쌍마다 하나를 더해요."),
      sections: getHoofballSections(E),
    },
  ];
}
