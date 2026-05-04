import { C, t } from "@/components/quest/theme";
import { getOddPhotosSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "ids = list(map(int, input().split()))",
  "",
  "odd = sum(1 for x in ids if x % 2 == 1)",
  "even = N - odd",
  "",
  "# Group i: even sum if i is odd (1-indexed), odd sum if i is even",
  "# Actually: group 1 needs even sum, group 2 needs odd sum, ...",
  "# even groups need even sum, odd groups need odd sum",
  "# We can always split: pair odd+odd=even, single even=even, single odd=odd",
  "",
  "# Greedy: alternate even/odd sums",
  "# Need ceil((groups+1)/2) even-sum groups, floor((groups+1)/2) odd-sum groups",
  "# or vice versa depending on parity",
  "",
  "ans = 0",
  "e, o = even, odd",
  "",
  "# Try to maximize groups",
  "# Group 1: even sum. Use 1 even cow, or 2 odd cows.",
  "# Group 2: odd sum. Use 1 odd cow.",
  "# Alternate.",
  "",
  "while True:",
  "    # Next group needs even sum (if ans is even) or odd sum (if ans is odd)",
  "    if ans % 2 == 0:  # need even sum",
  "        if e > 0:",
  "            e -= 1",
  "            ans += 1",
  "        elif o >= 2:",
  "            o -= 2",
  "            ans += 1",
  "        else:",
  "            break",
  "    else:  # need odd sum",
  "        if o > 0:",
  "            o -= 1",
  "            ans += 1",
  "        else:",
  "            break",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeOddPhotosCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "We need to partition cows into consecutive groups where group sums alternate between even and odd.\nMaximize the number of groups!", "소들을 연속 그룹으로 나눠서 그룹 합이 짝수/홀수로 번갈아가게 해야 해요. 그룹 수를 최대화해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcf8"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Even More Odd Photos</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #2</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Count odd and even IDs.\nGroup 1 needs even sum (use 1 even or 2 odds). Group 2 needs odd sum (use 1 odd). Alternate greedily.",
              "핵심: 홀수/짝수 ID 개수를 세.\n그룹 1은 짝수 합 (짝수 1개 또는 홀수 2개). 그룹 2는 홀수 합 (홀수 1개). 그리디로 번갈아.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If all IDs are even like [2,4,6,8], the first group needs even sum.\nBut the second group needs odd sum.\nCan we make an odd sum from even numbers?", "모든 ID가 짝수인 [2,4,6,8]이면, 첫 그룹은 짝수 합이 필요해요. 하지만 두 번째 그룹은 홀수 합이 필요해요. 짝수만으로 홀수 합을 만들 수 있을까?"),
      question: t(E,
        "IDs = [2,4,6,8]. Max groups with alternating even/odd sums?",
        "IDs = [2,4,6,8]. 짝수/홀수 합 번갈아하는 최대 그룹 수?"),
      options: [
        t(E, "1 (can't make odd sum from even numbers)", "1 (짝수만으로 홀수 합 불가)"),
        t(E, "4 (each cow is a group)", "4 (각 소가 한 그룹)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Group 1 has even sum, but group 2 needs odd sum which is impossible with only even numbers. Max: 1 group.",
        "맞아! 그룹 1은 짝수 합이지만 그룹 2는 홀수 합이 필요한데 짝수만으로는 불가능해요. 최대: 1 그룹."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With IDs = [2,4,6,8], what is the maximum number of groups?", "IDs = [2,4,6,8]일 때, 최대 그룹 수는?"),
      question: t(E,
        "IDs = [2,4,6,8]. Maximum groups?",
        "IDs = [2,4,6,8]. 최대 그룹 수?"),
      hint: t(E,
        "All even, so group 1 = even sum works. Group 2 needs odd sum = impossible. Answer: 1.",
        "모두 짝수, 그룹 1 = 짝수 합 가능. 그룹 2 = 홀수 합 불가. 답: 1."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeOddPhotosCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Greedily assign cows: even group uses 1 even or 2 odds, odd group uses 1 odd. O(N) time!", "그리디로 소 배정: 짝수 그룹은 짝수 1개 또는 홀수 2개, 홀수 그룹은 홀수 1개. O(N) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Count odd and even IDs.\nGreedily form groups alternating even/odd sums until we can't continue.",
              "홀수/짝수 ID 개수를 세고 짝수/홀수 합을 번갈아 그리디로 그룹을 만들어요.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getOddPhotosSections(E),
    },
  ];
}
