import { C, t } from "@/components/quest/theme";
import { getCrossRoad2Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "s = input().strip()",
  "",
  "# Find first and second occurrence of each letter",
  "pos = {}",
  "for i, ch in enumerate(s):",
  "    if ch not in pos:",
  "        pos[ch] = [i]",
  "    else:",
  "        pos[ch].append(i)",
  "",
  "# Count crossing pairs",
  "# Two chords cross iff their endpoints alternate: A..B..A..B",
  "cows = list(pos.keys())",
  "ans = 0",
  "for i in range(len(cows)):",
  "    for j in range(i + 1, len(cows)):",
  "        a1, a2 = pos[cows[i]]",
  "        b1, b2 = pos[cows[j]]",
  "        # Check if they interleave",
  "        if a1 < b1 < a2 < b2 or b1 < a1 < b2 < a2:",
  "            ans += 1",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd2Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "26 cows (A-Z) walk around a circular road, each crossing it exactly twice.\nTwo cows' paths cross if their crossing points alternate on the circle (like chords that intersect).\nCount crossing pairs!", "26마리 소 (A-Z)가 원형 도로를 돌아다니며 각각 정확히 2번 횡단해.\n두 소의 횡단 지점이 원 위에서 번갈아 나오면 (교차하는 현처럼) 경로가 교차해.\n교차하는 쌍을 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd00"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>Cross the Road II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Feb Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Find the two positions of each cow. Two cows cross iff their positions interleave: A..B..A..B. Check all pairs.",
              "핵심: 각 소의 두 위치를 찾아. 두 소가 교차하려면 위치가 번갈아 나와야 해: A..B..A..B. 모든 쌍을 확인해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Pattern 'ABBA': A's endpoints are at positions 0 and 3, B's at 1 and 2.\nDo they cross?\nPattern 'AABB': A at 0,1 and B at 2,3.\nDo they cross?", "패턴 'ABBA': A의 끝점은 위치 0과 3, B는 1과 2. 교차해? 패턴 'AABB': A는 0,1이고 B는 2,3. 교차해?"),
      question: t(E,
        "Which pattern has crossing paths: ABBA or AABB?",
        "어떤 패턴이 교차하는 경로야: ABBA 아니면 AABB?"),
      options: [
        t(E, "ABBA (A surrounds B, they cross)", "ABBA (A가 B를 감싸서 교차)"),
        t(E, "AABB (separate, they cross)", "AABB (분리돼서 교차)"),
        t(E, "Both cross", "둘 다 교차"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! In ABBA, A's endpoints (0,3) surround B's (1,2), so the chords cross. In AABB, A ends before B starts, so no crossing.",
        "맞아! ABBA에서 A의 끝점 (0,3)이 B의 (1,2)를 감싸서 현이 교차해. AABB에서는 A가 B 시작 전에 끝나서 교차 안 해."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For the pattern 'ABBA', how many crossing pairs are there?", "패턴 'ABBA'에서 교차하는 쌍은 몇 개야?"),
      question: t(E,
        "Pattern 'ABBA': how many crossing pairs?",
        "패턴 'ABBA': 교차하는 쌍 몇 개?"),
      hint: t(E,
        "Only 2 cows (A and B), and they do cross. So 1 pair.",
        "소가 2마리 (A와 B)뿐이고, 교차해. 그래서 1쌍."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCrossRd2Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Find positions in O(N), then check all pairs in O(26^2) = O(1). Total O(N)!", "위치 찾기 O(N), 모든 쌍 확인 O(26^2) = O(1). 총 O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Record the two positions of each cow letter. For every pair of cows, check if their positions interleave (a1 < b1 < a2 < b2 or b1 < a1 < b2 < a2).",
              "각 소 문자의 두 위치를 기록해. 모든 소 쌍에 대해 위치가 번갈아 나오는지 확인 (a1 < b1 < a2 < b2 또는 b1 < a1 < b2 < a2).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getCrossRoad2Sections(E),
    },
  ];
}
