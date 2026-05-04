import { C, t } from "@/components/quest/theme";
import { getMcc19ElimSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "s = input().strip()",
  "",
  "# Sliding window: find longest substring with at most K zeros",
  "left = 0",
  "zero_count = 0",
  "best = 0",
  "",
  "for right in range(N):",
  "    if s[right] == '0':",
  "        zero_count += 1",
  "    while zero_count > K:",
  "        if s[left] == '0':",
  "            zero_count -= 1",
  "        left += 1",
  "    best = max(best, right - left + 1)",
  "",
  "print(best)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given a binary string, you can remove at most K zeros.\nFind the longest consecutive streak of 1s after removal.\nClassic sliding window!", "이진 문자열에서 최대 K개의 0을 제거할 수 있어. 제거 후 가장 긴 연속 1의 길이를 구해. 전형적인 슬라이딩 윈도우!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔢</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Elimination</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P5</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Sliding window — maintain a window with at most K zeros. Track the maximum window length.",
              "핵심: 슬라이딩 윈도우 — 최대 K개의 0을 포함하는 윈도우 유지. 최대 윈도우 길이 추적.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "String = \"10110\", K=1.\nIf we remove the 0 at position 2, we get \"11_10\" → \"1110\" streak of 4.\nOr remove pos 4: \"1011_\" → streak 3.\nBest is 4!", "문자열 = \"10110\", K=1.\n위치 2의 0을 제거하면 \"11_10\" → \"1110\" 연속 4.\n위치 4 제거: \"1011_\" → 연속 3.\n최선은 4!"),
      question: t(E,
        "\"10110\", K=1. What's the longest 1-streak after removing one 0?",
        "\"10110\", K=1. 0 하나를 제거한 후 가장 긴 1-연속은?"),
      options: [
        t(E, "3", "3"),
        t(E, "4", "4"),
        t(E, "5", "5"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! Remove the 0 at index 2: window [0..3] = \"1_110\" has 4 ones with 1 zero removed.",
        "맞아! 인덱스 2의 0 제거: 윈도우 [0..3] = \"1_110\"에서 0 하나 제거로 1이 4개."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "\"10110\", K=1. Maximum consecutive 1s after removing at most 1 zero?", "\"10110\", K=1. 최대 1개의 0을 제거한 후 최대 연속 1의 수?"),
      question: t(E,
        "\"10110\", K=1. Longest streak = ?",
        "\"10110\", K=1. 가장 긴 연속 = ?"),
      hint: t(E,
        "Window [0,3] covers \"1011\" with 1 zero → length 4.",
        "윈도우 [0,3]이 \"1011\"을 포함하고 0이 1개 → 길이 4."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19ElimCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Two pointers: expand right, shrink left when zero count exceeds K. O(N) time!", "투 포인터: 오른쪽 확장, 0 개수가 K를 초과하면 왼쪽 축소. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Sliding window with two pointers. Each element is visited at most twice (once by right, once by left). Track zero count in window.",
              "투 포인터 슬라이딩 윈도우. 각 원소는 최대 두 번 방문(right 한 번, left 한 번). 윈도우 내 0 개수 추적.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19ElimSections(E),
    },
  ];
}
