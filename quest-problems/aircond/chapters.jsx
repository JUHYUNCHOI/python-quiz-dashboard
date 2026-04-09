import { C, t } from "@/components/quest/theme";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, M = map(int, input().split())",
  "cows = []",
  "for _ in range(N):",
  "    s, e, c = map(int, input().split())",
  "    cows.append((s, e, c))  # stall range, cooling needed",
  "",
  "acs = []",
  "for _ in range(M):",
  "    s, e, p, cost = map(int, input().split())",
  "    acs.append((s, e, p, cost))",
  "",
  "best = float('inf')",
  "",
  "# Try all 2^M subsets of ACs",
  "for mask in range(1 << M):",
  "    total_cost = 0",
  "    cooling = [0] * 101  # cooling at each stall",
  "    for j in range(M):",
  "        if mask & (1 << j):",
  "            s, e, p, cost = acs[j]",
  "            total_cost += cost",
  "            for pos in range(s, e + 1):",
  "                cooling[pos] += p",
  "    # Check if all cows satisfied",
  "    ok = True",
  "    for s, e, c in cows:",
  "        for pos in range(s, e + 1):",
  "            if cooling[pos] < c:",
  "                ok = False",
  "                break",
  "        if not ok: break",
  "    if ok:",
  "        best = min(best, total_cost)",
  "",
  "print(best)",
];


/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeAirCondCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows need cooling in their stall ranges. M air conditioning units are available (M is at most 10). Each AC has a range, power, and cost. Find the minimum cost subset of ACs that satisfies all cows!",
        "N마리의 소가 각자의 축사 범위에서 냉방이 필요해. M개의 에어컨이 있어 (M은 최대 10). 각 에어컨은 범위, 파워, 비용이 있어. 모든 소를 만족시키는 최소 비용 에어컨 조합을 찾아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2744\ufe0f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Air Cownditioning II</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Since M <= 10, we can try all 2^M subsets (at most 1024). For each subset, check if all cows are satisfied and track the minimum cost.",
              "핵심: M <= 10이므로, 모든 2^M 부분집합을 시도할 수 있어 (최대 1024개). 각 부분집합에 대해 모든 소가 만족되는지 확인하고 최소 비용을 추적해.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If M = 10, how many subsets do we need to check in the worst case?",
        "M = 10이면, 최악의 경우 몇 개의 부분집합을 확인해야 할까?"),
      question: t(E,
        "M = 10 air conditioners. How many subsets to check?",
        "M = 10개의 에어컨. 확인할 부분집합 수는?"),
      options: [
        t(E, "1024 (2^10)", "1024 (2^10)"),
        t(E, "100 (10^2)", "100 (10^2)"),
        t(E, "10! = 3628800", "10! = 3628800"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 2^10 = 1024. Each AC is either included or not, giving 2^M subsets. This is very manageable!",
        "맞아! 2^10 = 1024. 각 에어컨을 포함하거나 안 하거나, 2^M개의 부분집합이야. 충분히 처리 가능해!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "1 cow needs 3 cooling in stalls 1-5. AC1 covers 1-5 with power 3, cost 10. AC2 covers 1-3 with power 5, cost 20. What's the minimum cost?",
        "소 1마리가 축사 1-5에서 냉방 3이 필요해. AC1은 1-5 커버, 파워 3, 비용 10. AC2는 1-3 커버, 파워 5, 비용 20. 최소 비용은?"),
      question: t(E,
        "1 cow needs cooling 3 in stalls 1-5. AC1: range 1-5, power 3, cost 10. AC2: range 1-3, power 5, cost 20. Min cost?",
        "소 1마리 냉방 3 필요 (축사 1-5). AC1: 범위 1-5, 파워 3, 비용 10. AC2: 범위 1-3, 파워 5, 비용 20. 최소 비용?"),
      hint: t(E,
        "AC1 alone covers stalls 1-5 with power 3 >= 3. Cost = 10. AC2 alone only covers 1-3, not 4-5. So AC1 alone works at cost 10.",
        "AC1만으로 축사 1-5를 파워 3 >= 3으로 커버. 비용 = 10. AC2만으로는 1-3만 커버, 4-5는 안 돼. AC1 단독이 비용 10으로 작동."),
      answer: 10,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeAirCondCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try all 2^M subsets. For each, compute cooling at each stall and check cows. O(2^M * (M + N) * stalls).",
        "모든 2^M 부분집합을 시도해. 각각에 대해 축사별 냉방을 계산하고 소를 확인. O(2^M * (M + N) * 축사수)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(2^M * N * S)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Bitmask enumeration: iterate over all subsets using a bitmask from 0 to 2^M - 1. For each subset, sum up cooling contributions and verify all cows are satisfied.",
              "비트마스크 열거: 0부터 2^M - 1까지 비트마스크로 모든 부분집합을 순회해. 각 부분집합에서 냉방 기여를 합산하고 모든 소가 만족되는지 확인.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the bitmask enumeration solution!",
        "비트마스크 열거 전체 풀이야!"),
      label: t(E, "Python Solution", "Python \ud480\uc774"),
      code: SOLUTION_CODE,
    },
  ];
}
