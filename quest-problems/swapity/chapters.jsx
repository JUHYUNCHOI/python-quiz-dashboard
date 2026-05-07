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
        "N cows are in a line. Each ROUND consists of two reversal operations: reverse positions [a1, b1] then reverse [a2, b2]. This entire round is repeated K times (K can be up to 10^9).\nPrint the FINAL order of cows.",
        "N 마리 소가 한 줄에 있어요. 한 라운드는 두 번의 뒤집기로 이루어져 있어요. 위치 [a1, b1] 을 뒤집고, 그 다음 [a2, b2] 를 뒤집어요. 이 라운드 전체를 K 번 반복해요 (K 는 최대 10^9).\n최종 줄을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd00"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Swapity Swap</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2020 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "N cows in a line", "한 줄에 N 마리 소")}</b>
                  {t(E, " (initially in order 1..N).", " (초기 순서 1..N).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "One ROUND: ", "한 라운드: ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "reverse positions [a1, b1], then reverse [a2, b2]", "위치 [a1, b1] 뒤집기, 그 후 [a2, b2] 뒤집기")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Repeat the round ", "이 라운드를 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "K times (up to 10^9)", "K 번 반복 (최대 10^9)")}</b>
                  {t(E, ".", ".")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "final order of cows", "최종 줄")}</b>
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
        "[1,2,3]: reverse pos 1-2 -> [2,1,3], then reverse pos 2-3 -> [2,3,1].\nThat's 1 round.\nAfter 3 rounds it returns to [1,2,3].\nWhat's the cycle length?", "[1,2,3]: 위치 1-2 뒤집기 -> [2,1,3], 위치 2-3 뒤집기 -> [2,3,1]. 1라운드. 3라운드 후 [1,2,3]으로 복귀. 순환 길이는?"),
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
        "For the example [1,2,3] with reversals (1-2) then (2-3), what is the cycle length?", "예제 [1,2,3]에서 (1-2), (2-3) 뒤집기의 순환 길이는?"),
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
        "Simulate one round of reversals on identity [1..N] to get the permutation P. Track each cow's cycle length in P; effective rounds = K mod cycle. Apply that many actual rounds.",
        "단위 순열 [1..N] 에 한 라운드 뒤집기를 적용해 순열 P 를 구함. P 에서 각 소의 순환 길이 추적; 실제 라운드 = K mod 순환. 그만큼 진짜 라운드 적용."),
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
      sections: getSwapitySections(E),
    },
  ];
}
