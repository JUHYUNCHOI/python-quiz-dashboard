import { C, t } from "@/components/quest/theme";
import { getOddPhotosSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "ids = list(map(int, input().split()))",
  "",
  "even = sum(1 for x in ids if x % 2 == 0)",
  "odd = N - even",
  "",
  "# Groups alternate: even-sum, odd-sum, even-sum, ...",
  "# Even-sum group = 1 even cow OR 2 odd cows.",
  "# Odd-sum group  = 1 odd cow.",
  "# All cows must be used, so leftover cows pile onto the",
  "# last group (extra evens keep parity; extra odds in pairs).",
  "# Try every group count k, keep the largest that works.",
  "ans = 0",
  "for k in range(N + 1):",
  "    even_groups = (k + 1) // 2   # positions 1,3,5... need even sum",
  "    odd_groups = k // 2          # positions 2,4,6... need odd sum",
  "    if odd_groups > odd:",
  "        continue                 # not enough odds",
  "    odds_left = odd - odd_groups",
  "    if odds_left % 2 != 0:",
  "        continue                 # leftover odds must pair up",
  "    # each even group needs a filler: 1 even OR 2 leftover odds",
  "    if even + odds_left // 2 >= even_groups:",
  "        ans = k",
  "",
  "print(ans)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (4 steps: reveal / sim / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeOddPhotosCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "FJ has N cows, each with an ID number. He wants to put every cow into exactly one group, then line the groups up so the sum of IDs in group 1 is EVEN, group 2 is ODD, group 3 is EVEN, ... alternating.\nPrint the MAXIMUM number of groups possible.",
        "FJ에게 N마리 소가 있고, 각자 ID 번호를 가져요. 모든 소를 정확히 한 묶음에 넣은 뒤, 묶음들을 줄 세워 1번 묶음의 ID 합은 짝수, 2번은 홀수, 3번은 짝수 ... 처럼 번갈아 가게 해요.\n만들 수 있는 묶음의 최대 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcf8"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb" }}>Even More Odd Photos</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #2563eb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
              {t(E,
                "Output the maximum number of groups whose sums alternate EVEN, ODD, EVEN, ODD, ...",
                "합이 EVEN, ODD, EVEN, ODD ... 로 번갈아 가는 묶음의 최대 개수를 출력.")}
            </div>
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
                  <b style={{ color: "#2563eb" }}>{t(E, "N cows", "N마리 소")}</b>
                  {t(E, " (2 ≤ N ≤ 1000), each with an ID number (1..100).", "(2 ≤ N ≤ 1000) 가 있고, 각자 ID 번호(1..100)를 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Put every cow into ", "모든 소를 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "exactly one group", "정확히 한 묶음")}</b>
                  {t(E, " (any cow can go in any group), then line the groups up 1, 2, 3, ...",
                        "에 넣어요 (어느 소든 어느 묶음에나 가능), 그다음 묶음들을 1, 2, 3, ... 순으로 줄 세워요.")}
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
    // 1-2: Worked example of the official sample
    // TODO: sim redesign — the old OddPhotosSim taught a wrong-problem
    // "pair cows" model; replaced with a static worked example of the
    // real official SAMPLE 2 (answer = 5).
    {
      type: "reveal",
      narr: t(E,
        "Let's read the official sample. IDs = [11, 2, 17, 13, 1, 15, 3] → the answer is 5. Notice we only care about how many IDs are EVEN vs ODD.",
        "공식 예제를 읽어보자. IDs = [11, 2, 17, 13, 1, 15, 3] → 답은 5. 우리가 신경 쓸 건 ID 중 짝수가 몇 개, 홀수가 몇 개인지 뿐이야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a", marginBottom: 8 }}>
              📥 {t(E, "Input / Output", "입력 / 출력")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              <div style={{ color: C.dim }}>{t(E, "Line 1: N", "1번 줄: N")}</div>
              <div style={{ color: C.dim }}>{t(E, "Line 2: N space-separated IDs", "2번 줄: 공백으로 구분된 ID N개")}</div>
              <div style={{ marginTop: 6, color: C.dim }}>{t(E, "Output: max number of groups", "출력: 묶음의 최대 개수")}</div>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>
              🔎 {t(E, "Worked example (official SAMPLE 2)", "예제 풀이 (공식 SAMPLE 2)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              <div>IDs = [11, 2, 17, 13, 1, 15, 3]</div>
              <div style={{ color: "#2563eb" }}>{t(E, "even count = 1  (just 2)", "짝수 개수 = 1  (2 하나)")}</div>
              <div style={{ color: "#dc2626" }}>{t(E, "odd count  = 6  (11,17,13,1,15,3)", "홀수 개수 = 6  (11,17,13,1,15,3)")}</div>
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginTop: 8 }}>
              {t(E,
                "One way to make 5 groups: [2] (even), [11] (odd), [13,1] (even), [15] (odd), [17,3] (even). Sums alternate even, odd, even, odd, even ✓",
                "5묶음 만드는 한 방법: [2] (짝), [11] (홀), [13,1] (짝), [15] (홀), [17,3] (짝). 합이 짝, 홀, 짝, 홀, 짝 으로 번갈아 ✓")}
            </div>
            <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: "1px dashed #86efac" }}>
              {t(E,
                "Key rule: odd + odd = even, odd + even = odd, even + even = even. So an even-sum group can be 1 even cow or 2 odd cows; an odd-sum group needs an odd number of odd cows.",
                "핵심 규칙: 홀+홀=짝, 홀+짝=홀, 짝+짝=짝. 그래서 짝수합 묶음은 짝수 1마리 또는 홀수 2마리, 홀수합 묶음은 홀수 마리가 홀수 개 필요해.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
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
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "With IDs = [2,4,6,8], what is the maximum number of groups?", "IDs = [2,4,6,8]일 때, 최대 그룹 수는?"),
      question: t(E,
        "IDs = [2,4,6,8]. Maximum groups?",
        "IDs = [2,4,6,8]. 최대 그룹 수?"),
      hint: t(E,
        "Group 2 needs an odd sum — can you build that from only even numbers?",
        "2번 그룹은 홀수 합이 필요해 — 짝수만으로 만들 수 있을까?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeOddPhotosCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Only the even-count and odd-count matter. Try every possible number of groups k, and keep the largest k that we can actually build: enough odds for the odd-sum groups, leftover odds in pairs, and enough fillers for the even-sum groups. Sections build it one piece at a time.",
        "짝수 개수와 홀수 개수만 중요해. 가능한 묶음 수 k 를 다 시도해서, 실제로 만들 수 있는 가장 큰 k 를 답으로: 홀수합 묶음에 쓸 홀수가 충분하고, 남는 홀수는 짝으로 떨어지고, 짝수합 묶음을 채울 재료가 충분한지. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getOddPhotosSections(E),
    },
  ];
}
