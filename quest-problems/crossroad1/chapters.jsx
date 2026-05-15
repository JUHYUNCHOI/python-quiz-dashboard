import { C, t } from "@/components/quest/theme";
import { getCrossRoad1Sections, CrossRoad1Sim } from "./components";

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has 10 cows, each labeled 1..10. Over N observations he records (cow_id, side) where side ∈ {0, 1}. Each observation says which side of the road that cow was on at that moment.\nA 'crossing' happens between two consecutive observations of the SAME cow when her side changes. Count the total number of crossings across all cows.",
        "FJ 에게 1..10 번호의 10마리 소가 있어요. N개의 관찰을 하는 동안 (소 번호, 쪽) 을 기록해요 — 쪽은 0 또는 1. 각 관찰은 그 시점에 그 소가 도로의 어느 쪽에 있었는지 알려줘요.\n같은 소를 연속으로 관찰했을 때 쪽이 바뀌면 '횡단' 1번. 모든 소를 합쳐 횡단 총 횟수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Cross the Road I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2017 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Print the total number of road crossings across all cows.",
                "모든 소를 합친 도로 횡단 총 횟수를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "10 cows", "10마리 소")}</b>
                  {t(E, " (1..10) along a road with two sides (0 and 1).",
                        " (1..10) 가 있고, 도로의 두 쪽 (0 과 1) 을 오갈 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He logs ", "시간 순서대로 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N observations in time order", "N개의 관찰")}</b>
                  {t(E, " — each is (cow_id, side).",
                        " — 각 관찰은 (소 번호, 쪽).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "crossing", "횡단")}</b>
                  {t(E, " happens when consecutive observations of the same cow show DIFFERENT sides.",
                        " 은 같은 소의 연속된 두 관찰에서 쪽이 바뀔 때 1번.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total number of crossings", "횡단 총 횟수")}</b>
                  {t(E, " across all cows.", "를 출력해요.")}
                </div>
              </div>
            </div>

            {/* 🔍 Deep-audit sim — step through observations */}
            <div style={{ background: "#fff", border: `1.5px solid #fcd34d`, borderRadius: 12, marginTop: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", padding: "10px 14px 0" }}>
                🔍 {t(E, "Watch crossings count up — one observation at a time",
                       "관찰을 한 개씩 처리하며 횡단 수가 어떻게 늘어나는지 봐요")}
              </div>
              <CrossRoad1Sim E={E} />
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A cow is seen at side 0, then later at side 1. How many crossings is that?", "소가 0번 쪽에서 보이고, 나중에 1번 쪽에서 보여요. 횡단 몇 번이에요?"),
      question: t(E,
        "Cow seen at side 0, then side 1. How many crossings?",
        "소가 0번 쪽, 그 다음 1번 쪽. 횡단 몇 번?"),
      options: [
        t(E, "1 crossing", "1번 횡단"),
        t(E, "2 crossings", "2번 횡단"),
        t(E, "0 crossings", "0번 횡단"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The cow changed from side 0 to side 1, that's exactly 1 crossing.",
        "맞아! 소가 0번 쪽에서 1번 쪽으로 바뀌었으니 정확히 1번 횡단이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A cow goes 0 -> 1. How many crossings?", "소가 0 -> 1. 횡단 몇 번?"),
      question: t(E,
        "Cow: side 0 then side 1. Total crossings?",
        "소: 0번 쪽 그 다음 1번 쪽. 총 횡단 횟수?"),
      hint: t(E,
        "Count how many times the side actually changes between consecutive observations.",
        "연속된 관찰 사이에서 쪽이 실제로 몇 번 바뀌는지 세어봐요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd1Ch2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Maintain a dict last[cow_id] = last seen side. For each observation, if the cow has been seen before on a DIFFERENT side, count one crossing. Then update last[cow_id]. Sections build it one piece at a time.",
        "딕셔너리 last[소 ID] = 마지막으로 본 쪽 을 유지. 각 관찰에서, 소가 이전에 다른 쪽에서 보였으면 횡단 1 카운트. 그 다음 last[소 ID] 갱신. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getCrossRoad1Sections(E),
    },
  ];
}
