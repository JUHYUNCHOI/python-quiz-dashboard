import { C, t } from "@/components/quest/theme";
import { getSwapitySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "N, M, K = map(int, input().split())",
  "swaps = []",
  "for _ in range(M):",
  "    l, r = map(int, input().split())",
  "    swaps.append((l - 1, r - 1))  # 0-indexed",
  "",
  "# Build permutation for one round",
  "perm = list(range(N))",
  "for l, r in swaps:",
  "    # Reverse perm[l..r]",
  "    perm[l:r+1] = perm[l:r+1][::-1]",
  "",
  "# Find cycle length by repeated application",
  "# (apply perm until we get identity)",
  "cur = list(range(N))",
  "cycle = 0",
  "while True:",
  "    cur = [cur[perm[i]] for i in range(N)]",
  "    cycle += 1",
  "    if cur == list(range(N)):",
  "        break",
  "",
  "# K mod cycle gives effective rounds",
  "eff = K % cycle",
  "result = list(range(N))",
  "for _ in range(eff):",
  "    result = [result[perm[i]] for i in range(N)]",
  "",
  "# Output 1-indexed",
  "for i in range(N):",
  "    print(result[i] + 1)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps: reveal / quiz / input)
   --------------------------------------------------------------- */
export function makeSwapityCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows in a line. Each round, apply M reversal operations. After K rounds (K up to 10^9), output the final order. Key insight: detect the cycle length!",
        "N마리 소가 일렬로. 매 라운드 M개의 뒤집기 연산 적용. K라운드(K는 10^9까지) 후 최종 순서 출력. 핵심: 순환 길이 감지!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd00"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Swapity Swap</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Simulate one round to get the permutation. Find the cycle length. Then K mod cycle gives the effective number of rounds.",
              "핵심: 한 라운드를 시뮬레이션해서 순열을 구해. 순환 길이를 찾고, K mod 순환 = 실제 라운드 수.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "[1,2,3]: reverse pos 1-2 -> [2,1,3], then reverse pos 2-3 -> [2,3,1]. That's 1 round. After 3 rounds it returns to [1,2,3]. What's the cycle length?",
        "[1,2,3]: 위치 1-2 뒤집기 -> [2,1,3], 위치 2-3 뒤집기 -> [2,3,1]. 1라운드. 3라운드 후 [1,2,3]으로 복귀. 순환 길이는?"),
      question: t(E,
        "[1,2,3] with reversals at (1-2) then (2-3). Cycle length?",
        "[1,2,3]에서 (1-2), (2-3) 뒤집기. 순환 길이?"),
      options: [
        t(E, "3 rounds", "3 라운드"),
        t(E, "2 rounds", "2 라운드"),
        t(E, "6 rounds", "6 라운드"),
      ],
      correct: 0,
      explain: t(E,
        "Round 1: [2,3,1]. Round 2: [3,1,2]. Round 3: [1,2,3]. Cycle = 3.",
        "1라운드: [2,3,1]. 2라운드: [3,1,2]. 3라운드: [1,2,3]. 순환 = 3."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For the example [1,2,3] with reversals (1-2) then (2-3), what is the cycle length?",
        "예제 [1,2,3]에서 (1-2), (2-3) 뒤집기의 순환 길이는?"),
      question: t(E,
        "[1,2,3], reverse(1-2) then reverse(2-3) each round. Cycle length?",
        "[1,2,3], 매 라운드 reverse(1-2) 후 reverse(2-3). 순환 길이?"),
      hint: t(E,
        "R1: [2,3,1], R2: [3,1,2], R3: [1,2,3]. Returns after 3 rounds.",
        "R1: [2,3,1], R2: [3,1,2], R3: [1,2,3]. 3라운드 후 복귀."),
      answer: 3,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps: reveal / code)
   --------------------------------------------------------------- */
export function makeSwapityCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Build permutation in O(N*M), find cycle in O(N*cycle), apply in O(N*eff). Cycle length is at most N!, but in practice small.",
        "순열 구성 O(N*M), 순환 찾기 O(N*cycle), 적용 O(N*eff). 순환 길이는 최대 N!이지만 실제로 작아."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N * cycle)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "1) Simulate one round of reversals to get the permutation. 2) Repeatedly apply until identity to find cycle length. 3) K mod cycle = effective rounds. Apply that many times.",
              "1) 한 라운드 뒤집기를 시뮬레이션해서 순열 구함. 2) 항등까지 반복 적용해 순환 길이 찾기. 3) K mod 순환 = 실제 라운드. 그만큼 적용.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSwapitySections(E),
    },
  ];
}
