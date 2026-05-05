import { C, t } from "@/components/quest/theme";
import { getCrossRoad1Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "observations = []",
  "for _ in range(N):",
  "    cow, side = map(int, input().split())",
  "    observations.append((cow, side))",
  "",
  "# Track last known side for each cow",
  "last_side = {}",
  "crossings = 0",
  "",
  "for cow, side in observations:",
  "    if cow in last_side:",
  "        if last_side[cow] != side:",
  "            crossings += 1",
  "    last_side[cow] = side",
  "",
  "print(crossings)",
];


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
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Cross the Road I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Feb Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "10 cows", "10마리 소")}</b>
                  {t(E, " (1..10) along a road with two sides (0 and 1).",
                        " (1..10) 가 있고, 도로의 두 쪽 (0 과 1) 을 오갈 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "He logs ", "시간 순서대로 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N observations in time order", "N개의 관찰")}</b>
                  {t(E, " — each is (cow_id, side).",
                        " — 각 관찰은 (소 번호, 쪽).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#dc2626" }}>{t(E, "crossing", "횡단")}</b>
                  {t(E, " happens when consecutive observations of the same cow show DIFFERENT sides.",
                        " 은 같은 소의 연속된 두 관찰에서 쪽이 바뀔 때 1번.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total number of crossings", "횡단 총 횟수")}</b>
                  {t(E, " across all cows.", "를 출력해요.")}
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
        "Side changed once: 0 to 1. Answer: 1.",
        "쪽이 한 번 바뀜: 0에서 1. 답: 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd1Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Maintain a dict last[cow_id] = last seen side. For each observation, if the cow has been seen before on a DIFFERENT side, count one crossing. Then update last[cow_id].",
        "딕셔너리 last[소 ID] = 마지막으로 본 쪽 을 유지. 각 관찰에서, 소가 이전에 다른 쪽에서 보였으면 횡단 1 카운트. 그 다음 last[소 ID] 갱신."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init last-seen dict", "마지막 쪽 딕셔너리 초기화"), code: "last = {}", color: "#d97706" },
              { n: 2, label: t(E, "Iterate observations", "관찰 순회"), code: "for cow_id, side in observations:", color: "#7c3aed" },
              { n: 3, label: t(E, "If different from last → crossing", "이전과 다르면 → 횡단"), code: "if cow_id in last and last[cow_id] != side: crossings += 1", color: "#0891b2" },
              { n: 4, label: t(E, "Update last side", "마지막 쪽 갱신"), code: "last[cow_id] = side;  print(crossings)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass with O(1) dict lookups", "O(1) 딕셔너리 조회로 한 번 순회")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCrossRoad1Sections(E),
    },
  ];
}
