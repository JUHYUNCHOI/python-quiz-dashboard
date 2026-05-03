import { C, t } from "@/components/quest/theme";
import { getAbcsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "nums = list(map(int, input().split()))",
  "nums.sort()",
  "",
  "# The largest number is A+B+C",
  "abc = nums[6]",
  "",
  "# The smallest number is A (since A <= B <= C)",
  "A = nums[0]",
  "",
  "# The second smallest is B",
  "B = nums[1]",
  "",
  "# C = (A+B+C) - A - B",
  "C_val = abc - A - B",
  "",
  "print(A, B, C_val)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeAbcsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given 7 numbers: A, B, C, A+B, B+C, A+C, A+B+C in some order. Find A, B, C where A <= B <= C!",
        "7개 숫자: A, B, C, A+B, B+C, A+C, A+B+C가 순서 없이 주어져. A <= B <= C인 A, B, C를 찾아!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd22"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Do You Know Your ABCs?</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Sort the 7 numbers. The largest is always A+B+C. The smallest is A. The second smallest is B. Then C = (A+B+C) - A - B.",
              "핵심: 7개 숫자를 정렬해. 가장 큰 수는 항상 A+B+C. 가장 작은 수는 A. 두 번째로 작은 수는 B. C = (A+B+C) - A - B.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Among the 7 numbers, which one is always A+B+C?",
        "7개 숫자 중 항상 A+B+C인 것은?"),
      question: t(E,
        "Which of the 7 numbers is always A+B+C?",
        "7개 숫자 중 항상 A+B+C인 것은?"),
      options: [
        t(E, "The largest number", "가장 큰 수"),
        t(E, "The median number", "중간 수"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! A+B+C is the sum of all three, so it's always the largest of the 7 values.",
        "맞아! A+B+C는 세 수의 합이므로 항상 7개 값 중 가장 커."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Numbers: [2, 2, 4, 7, 9, 9, 11]. A+B+C = 11. What is A (the smallest)?",
        "숫자: [2, 2, 4, 7, 9, 9, 11]. A+B+C = 11. A(가장 작은 수)는?"),
      question: t(E,
        "Numbers: [2,2,4,7,9,9,11]. A+B+C=11. A = ?",
        "숫자: [2,2,4,7,9,9,11]. A+B+C=11. A = ?"),
      hint: t(E,
        "Sort: [2,2,4,7,9,9,11]. Smallest = A = 2.",
        "정렬: [2,2,4,7,9,9,11]. 가장 작은 수 = A = 2."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeAbcsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Just sort the 7 numbers and read off the answer. O(1) time (constant input size)!",
        "7개 숫자를 정렬하고 답을 읽어. O(1) 시간 (입력 크기 고정)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sort 7 numbers. Largest = A+B+C. Smallest = A. Second smallest = B. C = A+B+C - A - B. Done!",
              "7개 정렬. 가장 큰 수 = A+B+C. 가장 작은 수 = A. 두 번째 = B. C = A+B+C - A - B. 끝!")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getAbcsSections(E),
    },
  ];
}
