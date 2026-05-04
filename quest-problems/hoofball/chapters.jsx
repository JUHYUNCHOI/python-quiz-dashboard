import { C, t } from "@/components/quest/theme";
import { getHoofballSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "pos = sorted(list(map(int, input().split())))",
  "",
  "# For each cow, determine who it passes to",
  "# (nearest neighbor; ties go left)",
  "target = [0] * N",
  "for i in range(N):",
  "    if i == 0:",
  "        target[i] = 1",
  "    elif i == N - 1:",
  "        target[i] = N - 2",
  "    else:",
  "        left_dist = pos[i] - pos[i-1]",
  "        right_dist = pos[i+1] - pos[i]",
  "        if left_dist <= right_dist:",
  "            target[i] = i - 1",
  "        else:",
  "            target[i] = i + 1",
  "",
  "# Count how many cows pass to each cow",
  "received = [0] * N",
  "for i in range(N):",
  "    received[target[i]] += 1",
  "",
  "# Sources = cows that nobody passes to",
  "# But also handle 'sinks' (mutual passing)",
  "ans = 0",
  "for i in range(N):",
  "    if received[i] == 0:",
  "        ans += 1",
  "",
  "# Edge case: two adjacent cows passing to each other",
  "# forms a sink; need at least 1 ball there",
  "for i in range(N - 1):",
  "    if target[i] == i + 1 and target[i+1] == i:",
  "        if received[i] == 1 and received[i+1] == 1:",
  "            ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoofballCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Cows stand on a number line and pass a ball to their nearest neighbor.\nFind the minimum number of balls needed so every cow gets at least one!", "소들이 수직선 위에 서서 가장 가까운 이웃에게 공을 패스해. 모든 소가 최소 1개 공을 받으려면 최소 몇 개 공이 필요한지 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u26BD"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Hoofball</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2018 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Each cow passes to nearest neighbor.\nCount 'sources' (cows no one passes to) - each needs its own ball. Handle mutual-pass sinks too.",
              "핵심: 각 소는 가장 가까운 이웃에게 패스.\n'소스'(아무도 패스하지 않는 소) 수 세기 - 각각 공 필요.\n상호 패스 싱크도 처리.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "3 cows at positions [1, 5, 10].\nCow at 5 passes to 1 (dist 4 < 5).\nCow at 10 passes to 5 (dist 5).\nCow at 1 passes to 5 (dist 4).\nWho never receives a pass?", "3마리 소 위치 [1, 5, 10].\n5의 소는 1로 패스 (거리 4 < 5).\n10의 소는 5로 패스 (거리 5).\n1의 소는 5로 패스 (거리 4).\n패스를 안 받는 소는?"),
      question: t(E,
        "Positions [1,5,10]. How many balls needed?",
        "위치 [1,5,10]. 필요한 공 수는?"),
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
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Positions [1, 5, 10]. How many balls are needed?", "위치 [1, 5, 10]. 필요한 공 수는?"),
      question: t(E,
        "3 cows at [1, 5, 10]. Min balls needed?",
        "3마리 소 [1, 5, 10]. 최소 공 수?"),
      hint: t(E,
        "Cow 1 and cow 10 are sources (no one passes to them). Each needs a ball.",
        "소 1과 소 10이 소스 (아무도 패스 안 함). 각각 공 필요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeHoofballCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort positions, compute pass targets, count sources. O(N log N) for sorting!", "위치 정렬, 패스 대상 계산, 소스 세기. 정렬에 O(N log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26A1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort positions.\nFor each cow, find nearest neighbor (left or right). Count cows that no one targets (sources). Handle mutual pass pairs as sinks.",
              "위치 정렬.\n각 소에서 가장 가까운 이웃 찾기 (왼쪽 또는 오른쪽). 아무도 타겟하지 않는 소 세기 (소스). 상호 패스 쌍은 싱크로 처리.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getHoofballSections(E),
    },
  ];
}
