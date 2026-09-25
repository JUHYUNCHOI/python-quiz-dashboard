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
        "Count the total number of road crossings across all cows.",
        "소들이 도로를 건넌 횟수를 모두 합해서 세어요."),
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
                        " 을 해요 — 관찰 하나는 (소 번호, 쪽) 이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "crossing", "횡단")}</b>
                  {t(E, " happens when consecutive observations of the same cow show DIFFERENT sides.",
                        " 은 같은 소를 연달아 봤을 때 쪽이 바뀌면 1번으로 세요.")}
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
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 시즌 표준 (photoshoot25 참조)
    {
      type: "reveal",
      narr: t(E,
        "How does the input arrive? N, then N observations in time order.",
        "입력은 N 다음에 시간 순서대로 N개의 관찰이 이어져요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of observations", "— 관찰 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>cow side</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— cow ID (1..10), side (0 or 1)", "— 소 번호 (1..10), 쪽 (0 또는 1)")}</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times, in time order", "↑ 이 줄이 시간 순서대로 N번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "The total number of confirmed crossings across all cows — a single integer.",
                  "모든 소를 합친 확인된 횡단 총 횟수를 한 줄로 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              <div>1 ≤ {t(E, "cow ID", "소 번호")} ≤ 10</div>
              <div>{t(E, "side", "쪽")} ∈ {"{0, 1}"}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A cow is seen at side 0, then later at side 1. How many crossings is that?", "소가 0번 쪽에 있다가 1번 쪽에서 보여요. 몇 번 건넌 걸까요?"),
      question: t(E,
        "Cow seen at side 0, then side 1. How many crossings?",
        "소가 0번 쪽에 있다가 그 다음엔 1번 쪽에 있어요. 횡단은 몇 번일까요?"),
      options: [
        t(E, "1 crossing", "1번 횡단"),
        t(E, "2 crossings", "2번 횡단"),
        t(E, "0 crossings", "0번 횡단"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! The cow changed from side 0 to side 1, that's exactly 1 crossing.",
        "맞아요! 소가 0번 쪽에서 1번 쪽으로 바뀌었으니 딱 1번 건넌 거예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A cow goes 0 -> 1. How many crossings?", "소가 0번 쪽에서 1번 쪽으로 갔어요. 횡단은 몇 번일까요?"),
      question: t(E,
        "Cow: side 0 then side 1. Total crossings?",
        "소가 0번 쪽에 있다가 그 다음엔 1번 쪽에 있어요. 횡단은 모두 몇 번일까요?"),
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
        "Track each cow's last-seen side, and count only when it changes.",
        "소마다 마지막으로 본 쪽을 적어 두고, 달라질 때만 세요."),
      sections: getCrossRoad1Sections(E),
    },
  ];
}
