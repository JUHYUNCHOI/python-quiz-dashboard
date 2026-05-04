import { C, t } from "@/components/quest/theme";
import { getSocDist1Sections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M = map(int, input().split())",
  "stalls = []",
  "for _ in range(N):",
  "    a, b = map(int, input().split())",
  "    stalls.append((a, b))",
  "stalls.sort()",
  "",
  "# Flatten all stall positions",
  "positions = []",
  "for a, b in stalls:",
  "    positions.extend(range(a, b + 1))",
  "",
  "occupied = [positions[i] for i in range(len(positions)) if i < M]",
  "# Actually: read occupied positions separately",
  "",
  "# Binary search on minimum distance D",
  "def can_place(D, positions, occupied, cows_to_place):",
  "    all_pos = sorted(set(positions))",
  "    occ = set(occupied)",
  "    placed = sorted(occupied)",
  "    need = cows_to_place",
  "    for p in all_pos:",
  "        if p in occ:",
  "            continue",
  "        # Check if p is at least D from all placed",
  "        ok = True",
  "        for q in placed:",
  "            if abs(p - q) < D:",
  "                ok = False",
  "                break",
  "        if ok:",
  "            placed.append(p)",
  "            placed.sort()",
  "            need -= 1",
  "            if need == 0:",
  "                return True",
  "    return need <= 0",
  "",
  "lo, hi = 1, positions[-1] - positions[0]",
  "ans = 0",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if can_place(mid, positions, occupied, M):",
  "        ans = mid",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "print(ans)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSocDist1Ch1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has a number line with M disjoint segments where cows can stand. He must place exactly N cows on integer positions inside those segments.\nMaximize the MINIMUM distance between any two cows.",
        "FJ 에게 수직선 위 M 개의 서로 떨어진 구간이 있고, 소들이 그 구간 안 정수 위치에 설 수 있어요. 정확히 N 마리 소를 배치해야 해요.\n임의의 두 소 사이 최소 거리를 최대화해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\ude37"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Social Distancing I</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2020 US Open Bronze #1</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ 에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "M disjoint segments on a number line", "수직선 위 M 개의 서로 떨어진 구간")}</b>
                  {t(E, " — cows can only stand on integer positions inside these segments.",
                        " 이 있고, 소는 그 구간 안 정수 위치에만 설 수 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Place EXACTLY ", "정확히 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "N cows", "N 마리 소")}</b>
                  {t(E, " in those positions.", " 를 그 위치에 배치해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MAXIMUM possible minimum distance between any two cows", "두 소 사이 최소 거리의 최댓값")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "Stalls: \"1001\" means occupied at positions 0 and 3.\nWe need to place 2 more cows.\nWhat's the minimum gap we can achieve?", "축사: \"1001\"은 위치 0과 3에 소가 있어요. 소 2마리를 더 넣어야 해요. 달성할 수 있는 최소 간격은?"),
      question: t(E,
        "Stalls \"10001\": occupied at 0 and 4. Place 2 cows in empty stalls 1,2,3. To maximize minimum distance, best placement?",
        "축사 \"10001\": 0과 4에 소. 빈 칸 1,2,3에 소 2마리 배치. 최소 거리 최대화하려면?"),
      options: [
        t(E, "Place at 1 and 3: min dist = 1", "1과 3에 배치: 최소 거리 = 1"),
        t(E, "Place at 2: only 1 cow, can't place 2 optimally. Min = 1", "2에 배치: 소 1마리만. 최적 배치 불가. 최소 = 1"),
        t(E, "Place at 1 and 2: min dist = 1", "1과 2에 배치: 최소 거리 = 1"),
      ],
      correct: 0,
      explain: t(E,
        "With 2 cows to place in {1,2,3}, the best is positions 1 and 3. Distances: 0-1=1, 1-3=2, 3-4=1. Min distance = 1.",
        "소 2마리를 {1,2,3}에 넣으면, 1과 3이 최적. 거리: 0-1=1, 1-3=2, 3-4=1. 최소 거리 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Stalls \"10001\": positions 0 and 4 occupied, place 2 more cows.\nWhat is the maximum possible minimum distance?", "축사 \"10001\": 0과 4에 소, 2마리 추가. 가능한 최대 최소 거리는?"),
      question: t(E,
        "\"10001\": occupied at 0,4. Place 2 cows. Max of min distance?",
        "\"10001\": 0,4에 소. 2마리 추가. 최소 거리의 최대값?"),
      hint: t(E,
        "Best placement: 1 and 3. Gaps: 1, 2, 1. Min = 1.",
        "최적 배치: 1과 3. 간격: 1, 2, 1. 최소 = 1."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSocDist1Ch2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Binary search the answer D. For each candidate, GREEDILY place cows: put one at the very first available position, then keep placing at the leftmost spot that's ≥ D away from the last. Check if all N fit.",
        "답 D 를 이분 탐색. 각 후보에서, 그리디로 소 배치: 가장 첫 가능 위치에 1 마리, 그 다음 마지막 위치 + D 이상인 가장 왼쪽 위치에 계속 배치. N 마리 모두 들어가는지 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Sort segments", "구간 정렬"), code: "segments.sort()", color: "#dc2626" },
              { n: 2, label: t(E, "Binary search D", "D 이분 탐색"), code: "lo, hi = 1, max_pos", color: "#7c3aed" },
              { n: 3, label: t(E, "Greedy can fit N at distance D?", "D 거리로 N 마리 가능?"), code: "place 1 at start; next at last + D, etc.", color: "#0891b2" },
              { n: 4, label: t(E, "Print max feasible D", "가능한 최대 D 출력"), code: "print(best_D)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N log N · log V)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "binary search × greedy check", "이분 탐색 × 그리디 검증")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSocDist1Sections(E),
    },
  ];
}
