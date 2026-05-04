import { C, t } from "@/components/quest/theme";
import { getSocDist2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N = int(input())",
  "cows = []",
  "for _ in range(N):",
  "    x, s = input().split()",
  "    cows.append((int(x), int(s)))",
  "cows.sort()",
  "",
  "# Find max R from healthy cows",
  "sick = [x for x, s in cows if s == 1]",
  "healthy = [x for x, s in cows if s == 0]",
  "",
  "if not healthy:",
  "    # All sick: could be 1 initially infected",
  "    print(1)",
  "else:",
  "    # R must be < min distance from any healthy to nearest sick",
  "    max_R = float('inf')",
  "    for h in healthy:",
  "        for s in sick:",
  "            max_R = min(max_R, abs(h - s) - 1)",
  "    if max_R < 0:",
  "        max_R = 0",
  "",
  "    # Count clusters of sick cows with gaps > max_R",
  "    if not sick:",
  "        print(0)",
  "    else:",
  "        clusters = 1",
  "        for i in range(1, len(sick)):",
  "            if sick[i] - sick[i-1] > 2 * max_R:",
  "                clusters += 1",
  "        print(clusters)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSocDist2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given cow positions and sick/healthy status, find the minimum number of initially infected cows.\nHealthy cows constrain the max spread radius R.", "소의 위치와 감염/건강 상태가 주어져. 최초 감염 소의 최소 수를 구해. 건강한 소가 최대 전파 반경 R을 제한해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83e\udda0"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Social Distancing II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2020 US Open Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Use healthy cows to bound max R.\nThen count clusters of sick cows separated by gaps > 2R.",
              "핵심: 건강한 소로 최대 R을 제한.\n간격 > 2R인 감염 소 클러스터 수를 세.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If all cows are sick and there are no healthy cows, what's the minimum number of initially infected cows?", "모든 소가 감염되고 건강한 소가 없으면, 최초 감염 소의 최소 수는?"),
      question: t(E,
        "All cows sick, no healthy cows. Min initially infected?",
        "모든 소 감염, 건강한 소 없음. 최초 감염 최소 수?"),
      options: [
        t(E, "1 (one cow could infect all)", "1 (한 마리가 전부 감염 가능)"),
        t(E, "N (each cow was independently infected)", "N (각 소가 독립적으로 감염)"),
        t(E, "N/2", "N/2"),
      ],
      correct: 0,
      explain: t(E,
        "With no healthy cows, R can be arbitrarily large. One initially infected cow with huge R could infect everyone.",
        "건강한 소가 없으면 R이 무한대 가능. 큰 R을 가진 한 마리가 모두 감염 가능."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "All cows are sick with no healthy cows.\nWhat is the minimum number of initially infected cows?", "모든 소가 감염, 건강한 소 없음. 최초 감염 소의 최소 수는?"),
      question: t(E,
        "5 cows, all sick, 0 healthy. Min initially infected?",
        "소 5마리, 전부 감염, 건강 0마리. 최초 감염 최소 수?"),
      hint: t(E,
        "With no healthy cows to bound R, one cow with large enough R infects all.",
        "R을 제한할 건강한 소가 없으니, R이 충분히 큰 한 마리로 전부 감염."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSocDist2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort cows, find max R from healthy cows, count sick clusters. O(N log N)!", "소 정렬, 건강한 소에서 최대 R 계산, 감염 클러스터 세기. O(N log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "1) Sort by position. 2) For each healthy cow,\ncompute distance to nearest sick cow to bound R. 3) Count clusters of sick cows with gaps > 2R.",
              "1) 위치로 정렬.\n2) 건강한 소마다 가장 가까운 감염 소까지 거리로 R 제한.\n3) 간격 > 2R인 감염 클러스터 세기.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSocDist2Sections(E),
    },
  ];
}
