import { C, t } from "@/components/quest/theme";
import { getMeasTrafficSections, TrafficPropagateSim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrafficCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A highway has N consecutive segments. Each segment is one of: a SENSOR with min/max measured car flow, an ON-RAMP that adds k cars to the flow, or an OFF-RAMP that removes k cars.\nGiven the segments in order, print the tightest [min, max] flow range that's POSSIBLE at the highway's START and at its END.",
        "고속도로 시작과 끝의 유량 범위를 얼마나 좁힐 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\ude97"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Measuring Traffic</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2019 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E, "Find the tightest [min, max] car flow at the highway's start AND end.", "고속도로 시작과 끝의 가장 좁은 [min, max] 차량 유량을 찾아요.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N consecutive highway segments", "N 개의 연속된 고속도로 구간")}</b>
                  {t(E, "; each is one of three types.",
                        "이 있어요. 각 구간은 아래 세 가지 중 하나예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "SENSOR (low, high)", "센서 (low, high)")}</b>
                  {t(E, " — measured flow is in [low, high]. ", " — 그 자리 유량이 [low, high] 안에 있어요. ")}
                  <b style={{ color: "#16a34a" }}>{t(E, "ON-RAMP (low, high)", "진입로 (low, high)")}</b>
                  {t(E, " lets between low and high cars in. ", " — low 대에서 high 대 사이가 들어와요. ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "OFF-RAMP (low, high)", "출구로 (low, high)")}</b>
                  {t(E, " lets between low and high cars out (flow never drops below 0).",
                        " — low 대에서 high 대 사이가 빠져나가요 (0 아래로는 안 내려가요).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "tightest possible [min, max] flow at the START and END of the highway", "고속도로 시작과 끝의 가장 좁은 가능한 [min, max] 유량")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          {/* Range propagation sim — feel how a range tightens as it travels */}
          <TrafficPropagateSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If highway flow is [10,20] and an on-ramp adds [5,10] cars, what's the flow after?", "진입로를 지난 뒤 유량 범위는 어떻게 될까요?"),
      question: t(E,
        "Flow [10,20] + on-ramp [5,10] = ?",
        "유량 [10,20] + 진입로 [5,10] = ?"),
      options: [
        t(E, "[15, 30]", "[15, 30]"),
        t(E, "[5, 10]", "[5, 10]"),
        t(E, "[10, 20]", "[10, 20]"),
        t(E, "[15, 20]", "[15, 20]"),
      ],
      correct: 0,
      explain: t(E,
        "The smallest case is the smallest flow plus the fewest new cars, and the largest is the largest plus the most, so [10+5, 20+10] = [15, 30].",
        "가장 적을 때는 제일 적은 유량에 제일 적게 들어온 경우, 가장 많을 때는 그 반대예요. 그래서 [10+5, 20+10] = [15, 30] 이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the initial flow range is [10, 20], what is the maximum flow?", "유량 범위가 [10, 20] 이면 가장 많을 때는 몇 대일까요?"),
      question: t(E,
        "Flow range [10, 20]. Maximum?",
        "유량 범위가 [10, 20] 일 때 제일 큰 값은 얼마일까요?"),
      hint: t(E,
        "[low, high] — which side is the maximum?",
        "[low, high] 에서 제일 큰 값은 어느 쪽에 있나요?"),
      answer: 20,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTrafficCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Constraint propagation in two passes. Forward: start with [0, ∞), apply on-ramps (+k) and off-ramps (−k clamped), intersect with each sensor range to get end-flow range. Backward: reverse the whole thing. Sections build it one piece at a time.",
        "한 번은 앞에서 뒤로, 한 번은 뒤에서 앞으로 훑으며 범위를 좁혀요."),
      sections: getMeasTrafficSections(E),
    },
  ];
}
