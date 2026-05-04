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
        "We have stalls in a row, some occupied by cows.\nWe need to place more cows to maximize the minimum distance between any two occupied stalls.\nBinary search on the answer!", "일렬로 놓인 축사에 소가 몇 마리 있어. 추가로 소를 넣어서 인접 소 사이 최소 거리를 최대화해야 해. 답에 대해 이분 탐색!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\ude37"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Social Distancing I</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO 2020 US Open Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Binary search on minimum distance D. For each D, greedily check if we can place all cows with at least D spacing.",
              "핵심: 최소 거리 D에 대해 이분 탐색. 각 D에 대해 그리디하게 소를 배치할 수 있는지 확인.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Stalls: \"1001\" means occupied at positions 0 and 3.\nWe need to place 2 more cows.\nWhat's the minimum gap we can achieve?", "축사: \"1001\"은 위치 0과 3에 소가 있어. 소 2마리를 더 넣어야 해. 달성할 수 있는 최소 간격은?"),
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
        "Binary search on distance D, then greedily place cows. O(N log N) total!", "거리 D에 대해 이분 탐색, 그리디로 소 배치. 총 O(N log N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Binary search on answer D. For each D, scan sorted stalls left-to-right, greedily placing cows whenever the gap is >= D.",
              "답 D에 대해 이분 탐색. 각 D에 대해 정렬된 축사를 왼쪽부터 스캔, 간격이 D 이상이면 그리디로 소 배치.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSocDist1Sections(E),
    },
  ];
}
