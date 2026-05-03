import { C, t } from "@/components/quest/theme";
import { getMcc15IsthmusSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "a = list(map(int, input().split()))",
  "",
  "count = 0",
  "for i in range(K, N - K):",
  "    # Check if position i is a peak",
  "    is_peak = True",
  "    for j in range(1, K + 1):",
  "        if a[i - j] >= a[i - j + 1]:",
  "            is_peak = False",
  "            break",
  "    if is_peak:",
  "        for j in range(0, K):",
  "            if a[i + j] <= a[i + j + 1]:",
  "                is_peak = False",
  "                break",
  "    if is_peak:",
  "        count += 1",
  "        continue",
  "",
  "    # Check if position i is a valley",
  "    is_valley = True",
  "    for j in range(1, K + 1):",
  "        if a[i - j] <= a[i - j + 1]:",
  "            is_valley = False",
  "            break",
  "    if is_valley:",
  "        for j in range(0, K):",
  "            if a[i + j] >= a[i + j + 1]:",
  "                is_valley = False",
  "                break",
  "    if is_valley:",
  "        count += 1",
  "",
  "print(count)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given a sequence of heights, find peaks and valleys. A peak has K strictly increasing neighbors on the left and K strictly decreasing on the right. A valley is the opposite. Count total peaks + valleys!",
        "높이 수열이 주어지면 봉우리와 골짜기를 찾아. 봉우리는 왼쪽 K개가 순증가, 오른쪽 K개가 순감소. 골짜기는 반대. 봉우리 + 골짜기 총 개수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u26f0\ufe0f"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Isthmus</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P4</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: For each position i (from K to N-K-1), check if the K neighbors on each side form a strictly monotone sequence. If increasing then decreasing = peak. If decreasing then increasing = valley.",
              "핵심: 각 위치 i (K부터 N-K-1까지)에서 양쪽 K개 이웃이 순단조 수열인지 확인. 증가 후 감소 = 봉우리. 감소 후 증가 = 골짜기.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Sequence [1, 3, 5, 3, 1] with K=2. Position 2 (value 5) has 2 increasing on the left (1<3<5) and 2 decreasing on the right (5>3>1). Is it a peak?",
        "수열 [1, 3, 5, 3, 1]에서 K=2. 위치 2 (값 5)는 왼쪽 2개 증가 (1<3<5), 오른쪽 2개 감소 (5>3>1). 봉우리야?"),
      question: t(E,
        "[1,3,5,3,1], K=2. How many peaks + valleys?",
        "[1,3,5,3,1], K=2. 봉우리 + 골짜기 개수?"),
      options: [
        "0",
        "1",
        "2",
        "3",
      ],
      correct: 1,
      explain: t(E,
        "Position 2 (value 5) is a peak: left side 1<3<5 (increasing), right side 5>3>1 (decreasing). That's the only peak or valley. Count = 1!",
        "위치 2 (값 5)가 봉우리: 왼쪽 1<3<5 (증가), 오른쪽 5>3>1 (감소). 유일한 봉우리/골짜기야. 개수 = 1!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "For [1,3,5,3,1] with K=2, how many peaks + valleys are there?",
        "[1,3,5,3,1]에서 K=2일 때, 봉우리 + 골짜기는 몇 개?"),
      question: t(E,
        "[1,3,5,3,1], K=2. Total peaks + valleys = ?",
        "[1,3,5,3,1], K=2. 봉우리 + 골짜기 총 수 = ?"),
      hint: t(E,
        "Only position 2 (value 5) qualifies as a peak. No valleys exist. Answer: 1",
        "위치 2 (값 5)만 봉우리로 인정돼. 골짜기는 없어. 답: 1"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15IsthmusCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "For each of N positions, we check up to K neighbors on each side. Total: O(N*K).",
        "N개 위치 각각에서 양쪽 K개 이웃을 확인. 총: O(N*K)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N*K)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "For each candidate position, verify K neighbors on each side are strictly increasing (or decreasing). Break early if condition fails.",
              "각 후보 위치에서 양쪽 K개 이웃이 순증가(또는 순감소)인지 확인. 조건 실패 시 조기 종료.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15IsthmusSections(E),
    },
  ];
}
