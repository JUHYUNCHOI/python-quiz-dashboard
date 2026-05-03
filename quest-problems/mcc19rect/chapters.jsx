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
        "Given a non-decreasing list of N integers, find the minimum absolute difference between consecutive elements. Since it's sorted, we just check adjacent pairs!",
        "비내림차순으로 정렬된 N개의 정수가 주어져. 연속된 원소 사이의 최소 절대 차이를 구해. 정렬되어 있으니 인접한 쌍만 확인하면 돼!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📏</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Rectangle (Min Diff)</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: The list is non-decreasing, so min |a[i]-a[i+1]| = min(a[i+1]-a[i]). One pass O(N).",
              "핵심: 리스트가 비내림차순이라 min |a[i]-a[i+1]| = min(a[i+1]-a[i]). 한 번 순회 O(N).")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "For the sorted list [1, 3, 5, 6], which consecutive pair has the smallest difference?",
        "정렬된 리스트 [1, 3, 5, 6]에서 어떤 연속 쌍의 차이가 가장 작을까?"),
      question: t(E,
        "Sorted list [1, 3, 5, 6]. Which pair gives the minimum difference?",
        "정렬된 리스트 [1, 3, 5, 6]. 어떤 쌍이 최소 차이를 줘?"),
      options: [
        t(E, "(1,3) → diff 2", "(1,3) → 차이 2"),
        t(E, "(3,5) → diff 2", "(3,5) → 차이 2"),
        t(E, "(5,6) → diff 1", "(5,6) → 차이 1"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! 6-5 = 1 is the smallest difference among consecutive pairs.",
        "맞아! 6-5 = 1이 연속 쌍 중 가장 작은 차이야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now compute it yourself! List = [1, 3, 5, 6]. What is the minimum difference?",
        "이제 직접 계산해봐! 리스트 = [1, 3, 5, 6]. 최소 차이는?"),
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
        "Since the list is already sorted, we just scan once through adjacent pairs. O(N) time!",
        "리스트가 이미 정렬되어 있으니 인접 쌍을 한 번만 훑으면 돼. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Simple linear scan: compare each pair a[i] and a[i+1], track the minimum difference.",
              "간단한 선형 탐색: 각 쌍 a[i]와 a[i+1]을 비교하고 최소 차이를 추적.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19RectSections(E),
    },
  ];
}
