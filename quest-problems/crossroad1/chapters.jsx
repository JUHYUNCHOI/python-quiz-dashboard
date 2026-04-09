import { C, t } from "@/components/quest/theme";

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
        "We observe 10 cows over time, each seen on side 0 or side 1 of the road. Count the total number of crossings (when a cow changes sides between observations).",
        "10마리 소를 시간에 따라 관찰해, 각각 도로의 0번 또는 1번 쪽에 있어. 관찰 사이에 소가 쪽을 바꾼 총 횟수 (횡단 횟수)를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc04"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Cross the Road I</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Feb Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Track each cow's last known side. When we see it on a different side, that's a crossing. Simple simulation!",
              "핵심: 각 소의 마지막으로 알려진 쪽을 추적해. 다른 쪽에서 보이면 그게 횡단이야. 단순 시뮬레이션!")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "A cow is seen at side 0, then later at side 1. How many crossings is that?",
        "소가 0번 쪽에서 보이고, 나중에 1번 쪽에서 보여. 횡단 몇 번이야?"),
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
        "맞아! 소가 0번 쪽에서 1번 쪽으로 바뀌었으니 정확히 1번 횡단이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "A cow goes 0 -> 1. How many crossings?",
        "소가 0 -> 1. 횡단 몇 번?"),
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
export function makeCrossRd1Ch2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "One pass through observations with a dictionary to track last side. O(N) time!",
        "관찰을 한 번 순회하면서 딕셔너리로 마지막 쪽을 추적해. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Use a dictionary mapping cow ID to its last known side. For each observation, if the cow was seen before on a different side, increment crossings.",
              "소 ID를 마지막으로 알려진 쪽에 매핑하는 딕셔너리를 사용해. 각 관찰에서 소가 이전에 다른 쪽에서 보였으면 횡단 횟수를 증가시켜.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full simulation solution!",
        "시뮬레이션 전체 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
