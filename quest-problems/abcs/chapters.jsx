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
        "Three positive integers A ≤ B ≤ C exist somewhere. You're handed all 7 of these sums in SOME order: A, B, C, A+B, B+C, A+C, A+B+C.\nFigure out the original A, B, C.",
        "세 양의 정수 A ≤ B ≤ C 가 있어요. 그리고 7가지 합이 순서가 섞인 채로 주어져요: A, B, C, A+B, B+C, A+C, A+B+C.\n원래 A, B, C를 찾아요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd22"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Do You Know Your ABCs?</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2020 Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are three positive integers ", "세 양의 정수 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "A ≤ B ≤ C", "A ≤ B ≤ C")}</b>
                  {t(E, " (hidden from you).", " 가 있어요 (숨겨져 있음).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You're given ", "그리고 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "all 7 of these values", "다음 7가지 값")}</b>
                  {t(E, " — but in some shuffled order:",
                        " — 가 섞인 순서로 주어져요:")}
                  <div style={{ marginTop: 4, padding: "4px 10px", background: "#fef3c7", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#7c3aed" }}>
                    A, B, C, A+B, B+C, A+C, A+B+C
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the original ", "원래 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "A B C", "A B C")}</b>
                  {t(E, " (in non-decreasing order).", " 를 오름차순으로 출력해요.")}
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
        "Among the 7 numbers, which one is always A+B+C?", "7개 숫자 중 항상 A+B+C인 것은?"),
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
        "Numbers: [2, 2, 4, 7, 9, 9, 11]. A+B+C = 11. What is A (the smallest)?", "숫자: [2, 2, 4, 7, 9, 9, 11]. A+B+C = 11. A(가장 작은 수)는?"),
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
        "Sort the 7 numbers, then read off A, B, C from known positions in the sorted list.",
        "7개 숫자를 정렬하면 A, B, C 가 정해진 위치에서 바로 읽혀요."),
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
      sections: getAbcsSections(E),
    },
  ];
}
