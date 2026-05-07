import { C, t } from "@/components/quest/theme";
import { getMcc19RectSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# List is already sorted (non-decreasing)",
  "min_diff = float('inf')",
  "for i in range(N - 1):",
  "    diff = a[i + 1] - a[i]",
  "    min_diff = min(min_diff, diff)",
  "",
  "print(min_diff)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19RectCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A non-decreasing list of N integers a[1..N] is given.\nPrint the MINIMUM absolute difference between any pair of CONSECUTIVE elements.",
        "오름차순으로 정렬된 N 개의 정수 a[1..N] 가 주어져요.\n인접한 두 원소의 절대 차이의 최솟값을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>📏</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Rectangle (Min Diff)</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A ", "")}
                  <b style={{ color: "#059669" }}>{t(E, "non-decreasing list of N integers a[1..N]", "오름차순으로 정렬된 N 개의 정수 a[1..N]")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "minimum |a[i+1] − a[i]| over all consecutive pairs", "인접한 두 원소의 |a[i+1] − a[i]| 의 최솟값")}</b>
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
        "For the sorted list [1, 3, 5, 6], which consecutive pair has the smallest difference?", "정렬된 리스트 [1, 3, 5, 6]에서 어떤 연속 쌍의 차이가 가장 작을까?"),
      question: t(E,
        "Sorted list [1, 3, 5, 6]. Which pair gives the minimum difference?",
        "정렬된 리스트 [1, 3, 5, 6]. 어떤 쌍이 최소 차이를 줘요?"),
      options: [
        t(E, "(1,3) → diff 2", "(1,3) → 차이 2"),
        t(E, "(3,5) → diff 2", "(3,5) → 차이 2"),
        t(E, "(5,6) → diff 1", "(5,6) → 차이 1"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! 6-5 = 1 is the smallest difference among consecutive pairs.",
        "맞아! 6-5 = 1이 연속 쌍 중 가장 작은 차이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now compute it yourself! List = [1, 3, 5, 6]. What is the minimum difference?", "이제 직접 계산해봐요! 리스트 = [1, 3, 5, 6]. 최소 차이는?"),
      question: t(E,
        "Sorted list [1, 3, 5, 6]. Min difference = ?",
        "정렬된 리스트 [1, 3, 5, 6]. 최소 차이 = ?"),
      hint: t(E,
        "Check all consecutive pairs: 3-1=2, 5-3=2, 6-5=1. Minimum is 1.",
        "모든 연속 쌍 확인: 3-1=2, 5-3=2, 6-5=1. 최솟값은 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19RectCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Since the list is non-decreasing, the smallest |a[i+1] − a[i]| is just the smallest CONSECUTIVE difference. One linear pass.",
        "리스트가 비내림차순이라 |a[i+1] − a[i]| 의 최솟값은 인접 차이의 최솟값. 한 번 선형 순회."),
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
      sections: getMcc19RectSections(E),
    },
  ];
}
