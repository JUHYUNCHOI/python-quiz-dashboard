import { C, t } from "@/components/quest/theme";
import { getAirCondSections, ACSubsetSim } from "./components";

/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeAirCondCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows, each in a stall range [s, t] needing at least some cooling power c.\nThere are M ≤ 10 AC units; each AC covers a stall range with some cooling power and a fixed cost. ACs stack — overlapping ACs add their power.\nPick a subset of ACs whose stacked power meets every cow's need, with minimum total cost.",
        "모든 소가 시원해지게 하면서 에어컨을 가장 싸게 골라요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u2744\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Air Cownditioning II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum total cost of an AC subset that satisfies every cow.",
                "모든 소가 바라는 냉방력을 채우는 에어컨 조합 중에서 가장 싼 비용을 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, ", each living in a stall range ", "가 있고, 각 소는 축사 범위 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[s, t]</code>
                  {t(E, " and needing cooling power ≥ ", "에 있으며 냉방력 ≥ ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>c</code>
                  {t(E, ".", " 가 필요해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "M ≤ 10 AC units", "M ≤ 10개의 에어컨")}</b>
                  {t(E, " — each covers a stall range with some cooling power and a fixed cost.",
                        "이 있어요. 각 에어컨은 축사 범위, 냉방력, 비용을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "ACs stack additively", "에어컨은 효과가 더해져요")}</b>
                  {t(E, " — at any stall, the cooling is the sum of powers of all chosen ACs covering that stall.",
                        " — 한 축사의 냉방력은 그 축사를 덮는 에어컨들의 냉방력을 다 더한 값이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost", "최소 총 비용")}</b>
                  {t(E, " of an AC subset that satisfies every cow.",
                        "을 출력해요. 모든 소의 요구를 채우는 에어컨 조합 중 가장 싼 것이에요.")}
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
        "If M = 10, how many subsets do we need to check in the worst case?", "M = 10 이면 부분집합을 몇 개나 확인해야 할까요?"),
      question: t(E,
        "M = 10 air conditioners. How many subsets to check?",
        "M = 10개의 에어컨. 확인할 부분집합 수는?"),
      options: [
        t(E, "1024 (2^10)", "1024 (2^10)"),
        t(E, "100 (10^2)", "100 (10^2)"),
        t(E, "10! = 3628800", "10! = 3628800"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 2^10 = 1024. Each AC is either included or not, giving 2^M subsets. This is very manageable!",
        "맞아요! 에어컨마다 켜거나 끄거나 두 가지라서 2^10 = 1024 가지예요. 이 정도는 전부 확인해도 괜찮아요."),
    },
    // 1-3: Sim — toggle AC subsets, see stall coverage
    {
      type: "reveal",
      narr: t(E,
        "Same scenario as the next question — toggle AC1 / AC2 and watch the bars stack on each stall. The dashed red line is the cow's need (3). All cells must clear that line.",
        "AC1, AC2 를 켜고 끄면서 축사마다 막대가 얼마나 쌓이는지 봐요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{
            background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12,
            padding: 12, marginBottom: 8, fontSize: 13, color: "#1e3a8a", lineHeight: 1.6,
          }}>
            🔍 <b>{t(E, "Scenario", "상황")}:</b>{" "}
            {t(E,
              "1 cow in stalls 1-5 needs cooling ≥ 3. AC1 covers stalls 1-5 with power 3, cost 10. AC2 covers stalls 1-3 with power 5, cost 20.",
              "축사 1-5 에 소 1 마리가 있고 냉방력이 3 이상 필요해요. AC1 은 범위 1-5, 냉방력 3, 비용 10 이에요. AC2 는 범위 1-3, 냉방력 5, 비용 20 이에요.")}
          </div>
          <ACSubsetSim E={E} />
        </div>
      ),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Same numbers as the sim above. Click each subset and read the cost — what's the cheapest one where every stall ✓?",
        "모든 축사가 ✓ 인 것 중에서 가장 싼 비용은 얼마일까요?"),
      question: t(E,
        "1 cow needs cooling 3 in stalls 1-5. AC1: range 1-5, power 3, cost 10. AC2: range 1-3, power 5, cost 20. Min cost?",
        "소 1 마리가 축사 1-5 에서 냉방력 3 이 필요해요. AC1 은 범위 1-5, 냉방력 3, 비용 10. AC2 는 범위 1-3, 냉방력 5, 비용 20. 가장 싼 비용은?"),
      hint: t(E,
        "AC1 alone covers all stalls 1-5 with power 3 — exactly meets the need at cost 10. AC2 alone misses stalls 4-5.",
        "AC1 만 켜도 축사 1-5 에 냉방력 3 이 들어와 딱 필요한 만큼이고, 비용은 10 이에요. AC2 만 켜면 축사 4-5 가 비어서 안 돼요."),
      answer: 10,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeAirCondCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "M ≤ 10, so only 2^M ≤ 1024 AC subsets exist — try every subset, build cooling per stall, check every cow, track the cheapest valid one. Sections build it one piece at a time.",
        "M ≤ 10 이라 조합이 1024 가지뿐이니 전부 해 봐도 돼요."),
      sections: getAirCondSections(E),
    },
  ];
}
