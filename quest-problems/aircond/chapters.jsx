import { C, t } from "@/components/quest/theme";
import { getAirCondSections } from "./components";

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
        "FJ has N cows, each in a stall range [s, t] needing at least some cooling power c.\nThere are M ≤ 10 AC units; each AC covers a stall range with some cooling power and a fixed cost. ACs stack — overlapping ACs add their power.\nPick a subset of ACs whose stacked power meets every cow's need, with minimum total cost.",
        "FJ에게 N마리 소가 있고, 각 소는 축사 범위 [s, t]에 살며 최소 c의 냉방력이 필요해요.\nM ≤ 10개의 에어컨이 있고, 각 에어컨은 정해진 축사 범위에 정해진 냉방력을 더해주며 정해진 비용을 가져요. 같은 위치를 덮는 에어컨은 냉방력이 더해져요.\n모든 소의 요구를 만족시키는 최소 비용의 에어컨 조합을 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2744\ufe0f"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Air Cownditioning II</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2023 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, ", each living in a stall range ", "가 있고, 각 소는 축사 범위 ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>[s, t]</code>
                  {t(E, " and needing cooling power ≥ ", "에 있으며 냉방력 ≥ ")}
                  <code style={{ background: "#dbeafe", padding: "1px 5px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>c</code>
                  {t(E, ".", " 가 필요해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "M ≤ 10 AC units", "M ≤ 10개의 에어컨")}</b>
                  {t(E, " — each covers a stall range with some cooling power and a fixed cost.",
                        "이 있어요. 각 에어컨은 축사 범위, 냉방력, 비용을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#0891b2" }}>{t(E, "ACs stack additively", "에어컨은 효과가 더해져요")}</b>
                  {t(E, " — at any stall, the cooling is the sum of powers of all chosen ACs covering that stall.",
                        " — 한 축사의 냉방력은 그 축사를 덮는 선택된 에어컨들의 파워 합이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum total cost", "최소 총 비용")}</b>
                  {t(E, " of an AC subset that satisfies every cow.",
                        "을 출력해요. 모든 소의 요구를 만족시키는 에어컨 조합 중 가장 싼 것.")}
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
        "If M = 10, how many subsets do we need to check in the worst case?", "M = 10이면, 최악의 경우 몇 개의 부분집합을 확인해야 할까?"),
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
        "맞아! 2^10 = 1024. 각 에어컨을 포함하거나 안 하거나, 2^M개의 부분집합이예요. 충분히 처리 가능해요!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "1 cow needs 3 cooling in stalls 1-5.\nAC1 covers 1-5 with power 3, cost 10.\nAC2 covers 1-3 with power 5, cost 20.\nWhat's the minimum cost?", "소 1마리가 축사 1-5에서 냉방 3이 필요해요. AC1은 1-5 커버, 파워 3, 비용 10. AC2는 1-3 커버, 파워 5, 비용 20. 최소 비용은?"),
      question: t(E,
        "1 cow needs cooling 3 in stalls 1-5. AC1: range 1-5, power 3, cost 10. AC2: range 1-3, power 5, cost 20. Min cost?",
        "소 1마리 냉방 3 필요 (축사 1-5). AC1: 범위 1-5, 파워 3, 비용 10. AC2: 범위 1-3, 파워 5, 비용 20. 최소 비용?"),
      hint: t(E,
        "AC1 alone covers stalls 1-5 with power 3 >= 3. Cost = 10. AC2 alone only covers 1-3, not 4-5. So AC1 alone works at cost 10.",
        "AC1만으로 축사 1-5를 파워 3 >= 3으로 커버. 비용 = 10. AC2만으로는 1-3만 커버, 4-5는 안 돼요. AC1 단독이 비용 10으로 작동."),
      answer: 10,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeAirCondCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Try all 2^M subsets.\nFor each, compute cooling at each stall and check cows.\nO(2^M * (M + N) * stalls).", "모든 2^M 부분집합을 시도해요. 각각에 대해 축사별 냉방을 계산하고 소를 확인. O(2^M * (M + N) * 축사수)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(2^M * N * S)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Bitmask enumeration: iterate over all subsets using a bitmask from 0 to 2^M - 1.\nFor each subset, sum up cooling contributions and verify all cows are satisfied.",
              "비트마스크 열거: 0부터 2^M - 1까지 비트마스크로 모든 부분집합을 순회해요.\n각 부분집합에서 냉방 기여를 합산하고 모든 소가 만족되는지 확인.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getAirCondSections(E),
    },
  ];
}
