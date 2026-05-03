import { C, t } from "@/components/quest/theme";
import { getBovShuffleSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "shuffle = list(map(int, input().split()))",
  "# Convert to 0-indexed",
  "shuffle = [s - 1 for s in shuffle]",
  "",
  "cows = list(map(int, input().split()))",
  "",
  "# Build inverse permutation",
  "inv = [0] * N",
  "for i in range(N):",
  "    inv[shuffle[i]] = i",
  "",
  "# Apply inverse permutation 3 times",
  "result = cows[:]",
  "for _ in range(3):",
  "    temp = [0] * N",
  "    for i in range(N):",
  "        temp[i] = result[inv[i]]",
  "    result = temp",
  "",
  "for x in result:",
  "    print(x)",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "A permutation is applied 3 times to cows. Given the final ordering, find the original ordering by applying the inverse permutation 3 times.",
        "순열을 소들에게 3번 적용해. 최종 순서가 주어지면 역순열을 3번 적용해서 원래 순서를 구해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd00"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>The Bovine Shuffle</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2017 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: The shuffle maps position i to position shuffle[i]. To undo it, build the inverse permutation and apply it 3 times to the final result.",
              "핵심: 셔플은 위치 i를 shuffle[i]로 매핑해. 되돌리려면 역순열을 만들어 최종 결과에 3번 적용해.")}
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "Permutation [2,1] is self-inverse: applying it once swaps positions 1 and 2. How many times is the shuffle applied in this problem?",
        "순열 [2,1]은 자기역순열이야: 한 번 적용하면 위치 1과 2를 교환해. 이 문제에서 셔플을 몇 번 적용해?"),
      question: t(E,
        "How many times is the shuffle applied in the problem?",
        "문제에서 셔플을 몇 번 적용해?"),
      options: [
        t(E, "3 times", "3번"),
        t(E, "1 time", "1번"),
        t(E, "N times", "N번"),
      ],
      correct: 0,
      explain: t(E,
        "The problem states the shuffle is applied exactly 3 times. So we undo it by applying the inverse 3 times.",
        "문제에서 셔플을 정확히 3번 적용한다고 해. 그래서 역순열을 3번 적용해서 되돌려."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "The shuffle is applied exactly how many times? Enter the number.",
        "셔플은 정확히 몇 번 적용돼? 숫자를 입력해."),
      question: t(E,
        "How many times is the shuffle applied?",
        "셔플은 몇 번 적용돼?"),
      hint: t(E,
        "The problem says 3 times!",
        "문제에서 3번이라고 해!"),
      answer: 3,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeShuffleCh2(E, lang = "py") {
  return [
    // 2-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Build inverse permutation, then apply it 3 times. O(N) per application, O(N) total!",
        "역순열을 만들고 3번 적용해. 적용당 O(N), 총 O(N)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f97316" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fff7ed", border: "2px solid #fdba74", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Inverse permutation: inv[shuffle[i]] = i. Then apply: new[i] = old[inv[i]] for each of 3 rounds.",
              "역순열: inv[shuffle[i]] = i. 그런 다음 적용: new[i] = old[inv[i]]를 3라운드 반복.")}
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBovShuffleSections(E),
    },
  ];
}
