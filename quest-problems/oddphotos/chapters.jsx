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
        "FJ has N cows in a line, each with an ID number. He wants to split the line into CONSECUTIVE groups such that the sum of IDs in group 1 is EVEN, group 2 is ODD, group 3 is EVEN, ... alternating.\nPrint the MAXIMUM number of groups possible.",
        "FJ에게 한 줄로 선 N마리 소가 있고, 각자 ID 번호를 가져요. 줄을 연속한 묶음으로 나누되, 1번 묶음의 ID 합은 짝수, 2번은 홀수, 3번은 짝수 ... 처럼 번갈아 가야 해요.\n만들 수 있는 묶음의 최대 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcf8"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Even More Odd Photos</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #2</div>
          </div>

          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1e3a8a", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "FJ has ", "FJ에게 ")}
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows in a line", "한 줄로 선 N마리 소")}</b>
                  {t(E, ", each with an ID number.", "가 있고, 각자 ID 번호를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Split the line into ", "줄을 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "consecutive non-empty groups", "연속한 비어있지 않은 묶음")}</b>
                  {t(E, " (group 1 from the left, then group 2, ...).",
                        "으로 나눠요 (왼쪽부터 1번, 2번, ...).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Sum of IDs must be ", "각 묶음의 ID 합은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "EVEN, ODD, EVEN, ODD, ... alternating", "짝수, 홀수, 짝수, 홀수 ... 로 번갈아")}</b>
                  {t(E, " (group 1 must be EVEN).", " (1번 묶음은 짝수).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #93c5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "maximum possible number of groups", "만들 수 있는 묶음의 최대 수")}</b>
                  {t(E, ".", "를 출력해요.")}
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
        "Group sums alternate EVEN, ODD, EVEN, ODD, ... An EVEN-sum group needs 1 even cow OR 2 odd cows. An ODD-sum group needs 1 odd cow. Greedily count groups using available odd/even counts.",
        "그룹 합이 EVEN, ODD, EVEN, ODD, ... 로 번갈아 가요. EVEN 그룹은 짝수 1마리 OR 홀수 2마리 필요. ODD 그룹은 홀수 1마리 필요. 보유한 홀/짝 개수로 그리디하게 그룹 수 세기."),
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
      sections: getOddPhotosSections(E),
    },
  ];
}
