import { C, t } from "@/components/quest/theme";
import { getSumKSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "# Compute sum of each element raised to power K",
  "result = 0",
  "for x in a:",
  "    result += x ** K",
  "",
  "print(result)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given an array of N numbers and an integer K, compute the sum of each element raised to the power K. That is, find a[0]^K + a[1]^K + ... + a[N-1]^K.",
        "N개의 숫자 배열과 정수 K가 주어지면, 각 원소를 K제곱하여 합을 구해. 즉, a[0]^K + a[1]^K + ... + a[N-1]^K를 구해."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2211"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>{"Sum^K"}</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P6</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each element x in the array, compute x^K and sum them all up. Simple loop with exponentiation.",
              "배열의 각 원소 x에 대해 x^K를 계산하고 모두 합산해. 거듭제곱과 반복문으로 해결.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Array = [1, 2, 3], K = 2. Sum of squares: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.",
        "배열 = [1, 2, 3], K = 2. 제곱의 합: 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14."),
      question: t(E,
        "Array=[1,2,3], K=2. What is the sum of squares?",
        "배열=[1,2,3], K=2. 제곱의 합은?"),
      options: [
        t(E, "6", "6"),
        t(E, "14", "14"),
        t(E, "36", "36"),
        t(E, "9", "9"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14.",
        "맞아! 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Calculate sum of squares for [1, 2, 3]!",
        "[1, 2, 3]의 제곱의 합을 계산해봐!"),
      question: t(E,
        "Array=[1,2,3], K=2. Enter the sum:",
        "배열=[1,2,3], K=2. 합을 입력해:"),
      hint: t(E,
        "1^2 + 2^2 + 3^2 = 1 + 4 + 9.",
        "1^2 + 2^2 + 3^2 = 1 + 4 + 9."),
      answer: 14,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSumKCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Loop through each element, compute x^K, and add to result. O(N * log K) with fast exponentiation, or O(N * K) with naive approach.",
        "각 원소를 순회하며 x^K를 계산하고 결과에 더해. 빠른 거듭제곱으로 O(N * log K), 단순 방법으로 O(N * K)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Python's ** operator handles exponentiation efficiently. Just iterate and accumulate.",
              "Python의 ** 연산자가 거듭제곱을 효율적으로 처리해. 순회하며 누적하면 돼.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSumKSections(E),
    },
  ];
}
