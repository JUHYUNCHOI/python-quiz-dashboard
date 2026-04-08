import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "breed = input().split()",
  "E = []",
  "for i in range(N):",
  "    E.append(int(input()))",
  "",
  "# For each breed, find first and last occurrence",
  "first = {'G': N, 'H': N}",
  "last  = {'G': -1, 'H': -1}",
  "for i in range(N):",
  "    b = breed[i]",
  "    first[b] = min(first[b], i)",
  "    last[b]  = max(last[b], i)",
  "",
  "# A cow i is a leader for breed b if E[i] >= last[b]",
  "# Valid pair: one from G, one from H",
  "# Constraint: one leader must contain the other",
  "ans = 0",
  "g_leaders = []",
  "h_leaders = []",
  "for i in range(N):",
  "    if breed[i] == 'G' and E[i] >= last['G']:",
  "        g_leaders.append(i)",
  "    if breed[i] == 'H' and E[i] >= last['H']:",
  "        h_leaders.append(i)",
  "",
  "for g in g_leaders:",
  "    for h in h_leaders:",
  "        # one must cover the other leader",
  "        if E[g] >= h or E[h] >= g:",
  "            ans += 1",
  "",
  "print(ans)",
];


/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeLeadersCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows of breed G or H stand in a line. Each cow i has a range covering positions i to E_i. A leader of a breed must cover ALL cows of that breed, or the other leader must be within the first leader's range. Count valid leader pairs!",
        "N마리의 소가 G 또는 H 품종으로 줄 서 있어. 각 소 i는 위치 i부터 E_i까지 커버해. 리더는 자기 품종의 모든 소를 커버하거나, 상대 리더가 자기 범위 안에 있어야 해. 유효한 리더 쌍의 수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc51"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Leaders</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each breed, find cows whose range covers all of that breed. Then check valid pairs where one leader covers the other.",
              "핵심: 각 품종에서 범위가 해당 품종 전체를 커버하는 소를 찾아. 그 다음 한 리더가 다른 리더를 커버하는 유효한 쌍을 확인해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If cow 1 is breed G and covers positions 1-4, and ALL G cows are within positions 1-4, is cow 1 a valid G leader?",
        "소 1이 G 품종이고 위치 1-4를 커버하는데, 모든 G 소가 위치 1-4 안에 있다면, 소 1은 유효한 G 리더일까?"),
      question: t(E,
        "Cow 1 (G) covers positions 1-4. All G cows are in positions 1-4. Is cow 1 a valid G leader?",
        "소 1 (G)이 위치 1-4 커버. 모든 G 소가 1-4에 있음. 소 1은 유효한 G 리더?"),
      options: [
        t(E, "Yes, it covers all G cows", "맞아, 모든 G 소를 커버해"),
        t(E, "No, it must also cover H cows", "아니, H 소도 커버해야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A leader only needs to cover all cows of its OWN breed. Cow 1 covers all G cows, so it's a valid G leader.",
        "맞아! 리더는 자기 품종의 모든 소만 커버하면 돼. 소 1이 모든 G 소를 커버하니 유효한 G 리더야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "breeds = \"GH\", ranges = [2, 2]. G is at position 0 (covers 0-1), H is at position 1 (covers 1-1). How many valid leader pairs?",
        "breeds = \"GH\", ranges = [2, 2]. G는 위치 0 (0-1 커버), H는 위치 1 (1-1 커버). 유효한 리더 쌍은 몇 개?"),
      question: t(E,
        "breeds=\"GH\", E=[2,2]. How many valid leader pairs?",
        "breeds=\"GH\", E=[2,2]. 유효한 리더 쌍은 몇 개?"),
      hint: t(E,
        "G leader (cow 0) covers up to position 1. H leader (cow 1) covers up to position 1. Cow 0's range includes cow 1. That's 1 valid pair.",
        "G 리더 (소 0)는 위치 1까지 커버. H 리더 (소 1)는 위치 1까지 커버. 소 0의 범위가 소 1을 포함해. 유효한 쌍 1개."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeLeadersCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Find leaders for each breed, then check all pairs. Overall O(N + G_leaders * H_leaders).",
        "각 품종의 리더를 찾고, 모든 쌍을 확인해. 전체 O(N + G리더 * H리더)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N + L_G * L_H)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Step 1: Find first/last occurrence of each breed. Step 2: Find all leaders (cows whose range covers their breed's last position). Step 3: Count valid pairs.",
              "1단계: 각 품종의 첫/마지막 위치 찾기. 2단계: 모든 리더 찾기 (범위가 품종의 마지막 위치를 커버하는 소). 3단계: 유효한 쌍 세기.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the full solution for Leaders!",
        "Leaders 전체 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
