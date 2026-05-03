import { C, t } from "@/components/quest/theme";
import { getSleepySortSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "a = list(map(int, input().split()))",
  "",
  "# Find longest sorted suffix",
  "# from the right, find where it stops being sorted",
  "k = N - 1",
  "while k > 0 and a[k - 1] < a[k]:",
  "    k -= 1",
  "",
  "# k is the first index of the sorted suffix",
  "# We need to move cows 0..k-1",
  "print(k)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepySortCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N cows in a line. Only the front cow can move backward to its correct position. Find the minimum number of moves to sort all cows.",
        "N마리 소가 줄 서 있어. 맨 앞 소만 올바른 위치로 뒤로 이동 가능. 모든 소를 정렬하는 최소 이동 횟수를 구해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"😴"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Sleepy Cow Sorting</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2019 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Find the longest already-sorted suffix from the right. The answer is N minus the length of that suffix. Those suffix cows never need to move!",
              "핵심: 오른쪽부터 이미 정렬된 가장 긴 접미사를 찾아. 답은 N에서 그 접미사 길이를 빼면 돼. 접미사 소들은 움직일 필요 없어!")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "For [1, 2, 4, 3]: looking from the right, [3] is fine, but 4 > 3 breaks the order. The sorted suffix has length 1. So we move N - 1 = 3 cows.",
        "[1, 2, 4, 3]에서: 오른쪽부터 보면 [3]은 괜찮지만 4 > 3에서 순서가 깨져. 정렬된 접미사 길이는 1. 그래서 N - 1 = 3마리를 옮겨야 해."),
      question: t(E,
        "For [2, 1, 3, 4]: what is the length of the longest sorted suffix from the right?",
        "[2, 1, 3, 4]에서: 오른쪽부터 가장 긴 정렬된 접미사 길이는?"),
      options: [
        t(E, "1 - only [4]", "1 - [4]만"),
        t(E, "2 - [3, 4]", "2 - [3, 4]"),
        t(E, "3 - [1, 3, 4]", "3 - [1, 3, 4]"),
      ],
      correct: 2,
      explain: t(E,
        "Correct! From the right: 4 ok, 3 < 4 ok, 1 < 3 ok, but 2 > 1 breaks. So suffix [1, 3, 4] has length 3. Answer = 4 - 3 = 1.",
        "맞아! 오른쪽부터: 4 ok, 3 < 4 ok, 1 < 3 ok, 하지만 2 > 1에서 깨져. 접미사 [1, 3, 4] 길이는 3. 답 = 4 - 3 = 1."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If the array is already sorted [1, 2, 3, 4], the entire array is a sorted suffix. How many moves?",
        "배열이 이미 정렬된 [1, 2, 3, 4]이면, 전체가 정렬된 접미사야. 이동 횟수는?"),
      question: t(E,
        "[1, 2, 3, 4] already sorted. How many moves needed?",
        "[1, 2, 3, 4] 이미 정렬됨. 필요한 이동 횟수는?"),
      hint: t(E,
        "All cows are in order. Sorted suffix length = N. Answer = N - N = 0.",
        "모든 소가 순서대로야. 정렬된 접미사 길이 = N. 답 = N - N = 0."),
      answer: 0,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSleepySortCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Scan from right to left to find where the sorted suffix breaks. O(N) time!",
        "오른쪽에서 왼쪽으로 스캔해서 정렬된 접미사가 끊기는 곳을 찾아. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"⚡"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Scan right to left: while a[k-1] < a[k], extend the sorted suffix. The break point k gives the answer directly.",
              "오른쪽에서 왼쪽으로 스캔: a[k-1] < a[k]인 동안 정렬된 접미사 확장. 끊기는 지점 k가 바로 답이야.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getSleepySortSections(E),
    },
  ];
}
