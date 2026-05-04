import { C, t } from "@/components/quest/theme";
import { getOutOfPlaceSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = []",
  "for _ in range(N):",
  "    a.append(int(input()))",
  "",
  "b = sorted(a)",
  "",
  "# Count positions where a and sorted differ",
  "diff = 0",
  "for i in range(N):",
  "    if a[i] != b[i]:",
  "        diff += 1",
  "",
  "# One misplaced cow: swapping fixes 2 positions",
  "# Answer = diff - 1 (number of adjacent swaps)",
  "# But since exactly one cow is out of place,",
  "# the answer is diff - 1",
  "print(max(0, diff - 1))",
];


/* ---------------------------------------------------------------
   Chapter 1: Problem (3 steps)
   --------------------------------------------------------------- */
export function makeOutOfPlaceCh1(E) {
  return [
    // 1-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "An array of cows where exactly one cow is out of place.\nFind the minimum number of adjacent swaps to sort the array.", "소 배열에서 정확히 한 마리가 잘못된 위치에 있어요. 배열을 정렬하기 위한 최소 인접 스왑 횟수를 구해요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd00"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Out of Place</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2018 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Compare the original array with its sorted version.\nCount positions that differ. The answer is (number of differing positions) - 1.",
              "핵심: 원래 배열과 정렬된 버전을 비교해요.\n다른 위치 수를 세. 답 = (다른 위치 수) - 1.")}
          </div>
        </div>),
    },
    // 1-2: quiz
    {
      type: "quiz",
      narr: t(E,
        "Array [1, 3, 2]. Sorted = [1, 2, 3]. Positions 1 and 2 differ. How many swaps?", "배열 [1, 3, 2]. 정렬 = [1, 2, 3]. 위치 1과 2가 달라요. 스왑 몇 번?"),
      question: t(E,
        "[1, 3, 2] -> sorted [1, 2, 3]. How many adjacent swaps needed?",
        "[1, 3, 2] -> 정렬 [1, 2, 3]. 인접 스왑 몇 번 필요?"),
      options: [
        t(E, "1 swap (swap 3 and 2)", "1번 스왑 (3과 2를 교환)"),
        t(E, "2 swaps", "2번 스왑"),
        t(E, "0 swaps", "0번 스왑"),
      ],
      correct: 0,
      explain: t(E,
        "2 positions differ, so answer = 2 - 1 = 1. Swap indices 1 and 2 to get [1, 2, 3].",
        "2개 위치가 다르니 답 = 2 - 1 = 1. 인덱스 1과 2를 교환하면 [1, 2, 3]."),
    },
    // 1-3: input
    {
      type: "input",
      narr: t(E,
        "[1, 3, 2] needs how many adjacent swaps to sort?", "[1, 3, 2]를 정렬하려면 인접 스왑이 몇 번 필요해요?"),
      question: t(E,
        "Min adjacent swaps to sort [1, 3, 2]?",
        "[1, 3, 2] 정렬에 필요한 최소 인접 스왑 수?"),
      hint: t(E,
        "Diff positions = 2. Answer = 2 - 1 = 1.",
        "다른 위치 = 2. 답 = 2 - 1 = 1."),
      answer: 1,
    },
  ];
}


/* ---------------------------------------------------------------
   Chapter 2: Code (2 steps)
   --------------------------------------------------------------- */
export function makeOutOfPlaceCh2(E, lang = "py") {
  return [
    // 2-1: reveal
    {
      type: "reveal",
      narr: t(E,
        "Sort the array, count differing positions. Answer = diff - 1. O(N log N) time!", "배열을 정렬하고 다른 위치 수를 세. 답 = diff - 1. O(N log N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N log N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Sort a copy, compare element by element.\nThe misplaced cow creates a contiguous block of differences. Swaps needed = block length - 1.",
              "사본을 정렬하고 요소별로 비교해요.\n잘못 놓인 소는 연속된 차이 블록을 만들어요.\n필요한 스왑 = 블록 길이 - 1.")}
          </div>
        </div>),
    },
    // 2-2: code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getOutOfPlaceSections(E),
    },
  ];
}
