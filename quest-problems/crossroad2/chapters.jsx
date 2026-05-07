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
        "26 cows labeled A..Z walk around a circular road, each crossing it EXACTLY TWICE. We're given the cyclic sequence of letters at the 52 crossing points (each letter appears exactly twice).\nTwo cows' paths intersect if their two crossing points INTERLEAVE around the circle (like A..B..A..B). Count the number of intersecting cow-pairs.",
        "26마리 소 (A..Z) 가 원형 도로를 돌면서 각자 정확히 2번 횡단해요. 52개의 횡단 지점에 등장하는 글자의 원형 수열이 주어져요 (각 글자가 정확히 2번 등장).\n두 소의 경로가 '교차' 한다는 건, 두 횡단 지점이 원 위에서 서로 엇갈려 나타날 때 (예: A..B..A..B). 교차하는 소-쌍의 개수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#f97316" }}>Cross the Road II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2017 Feb Bronze #2</div>
          </div>

          <div style={{ background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#f97316" }}>{t(E, "26 cows (A..Z) walk around a circular road", "26마리 소 (A..Z) 가 원형 도로 위를 걸어요")}</b>
                  {t(E, " — each crosses it exactly twice (so 52 crossing points total).",
                        " — 각자 정확히 2번 횡단해서 총 52개의 횡단 지점.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the ", "")}
                  <b style={{ color: "#0891b2" }}>{t(E, "cyclic sequence of 52 letters at the crossing points", "횡단 지점 52개의 글자 원형 수열")}</b>
                  {t(E, " (each letter appears twice).",
                        " 이 주어져요 (각 글자 2번씩).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#f97316", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Two cow paths ", "두 소의 경로가 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "intersect", "교차")}</b>
                  {t(E, " if their crossing points interleave around the circle (e.g., A..B..A..B), like two chords that cross.",
                        " 한다는 건, 두 소의 횡단 지점이 원에서 엇갈리게 나타날 때 (A..B..A..B), 교차하는 두 현 같은 형태.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fdba74" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of intersecting cow-pairs", "교차하는 소-쌍의 개수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "Pattern 'ABBA': A's endpoints are at positions 0 and 3, B's at 1 and 2.\nDo they cross?\nPattern 'AABB': A at 0,1 and B at 2,3.\nDo they cross?", "패턴 'ABBA': A의 끝점은 위치 0과 3, B는 1과 2. 교차해요? 패턴 'AABB': A는 0,1이고 B는 2,3. 교차해요?"),
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
        "맞아! ABBA에서 A의 끝점 (0,3)이 B의 (1,2)를 감싸서 현이 교차해요. AABB에서는 A가 B 시작 전에 끝나서 교차 안 해요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For the pattern 'ABBA', how many crossing pairs are there?", "패턴 'ABBA'에서 교차하는 쌍은 몇 개예요?"),
      question: t(E,
        "Pattern 'ABBA': how many crossing pairs?",
        "패턴 'ABBA': 교차하는 쌍 몇 개?"),
      hint: t(E,
        "Only 2 cows (A and B), and they do cross. So 1 pair.",
        "소가 2마리 (A와 B)뿐이고, 교차해요. 그래서 1쌍."),
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
        "Record the TWO crossing positions of each of the 26 cows. For every pair (A, B), their paths intersect iff their positions INTERLEAVE: a1 < b1 < a2 < b2 (or rotated).",
        "26 마리 소 각각의 두 횡단 위치를 기록. 모든 쌍 (A, B) 에 대해, 위치가 엇갈리면 (a1 < b1 < a2 < b2 또는 회전한 형태) 경로가 교차."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCrossRoad2Sections(E),
    },
  ];
}
