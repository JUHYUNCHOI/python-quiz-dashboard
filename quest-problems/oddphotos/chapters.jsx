import { C, t } from "@/components/quest/theme";
import { getOddPhotosSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (4 steps: reveal / sim / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeOddPhotosCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Group all N cows so the bucket sums alternate EVEN, ODD, EVEN…; print the MAX possible number of groups.",
        "묶음의 합이 짝수, 홀수, 짝수 … 로 번갈아 가게 만들어요."),
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
                "합이 짝수, 홀수, 짝수, 홀수 … 로 번갈아 가게 묶어요. 묶음을 최대 몇 개 만들 수 있는지 출력해요.")}
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
                        "에 넣어요. 어느 소든 어느 묶음에나 들어갈 수 있어요. 그다음 묶음을 1, 2, 3, … 순으로 줄 세워요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Sum of IDs must be ", "각 묶음의 ID 합은 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "EVEN, ODD, EVEN, ODD, ... alternating", "짝수, 홀수, 짝수, 홀수 ... 로 번갈아")}</b>
                  {t(E, " (group 1 must be EVEN).", " 가야 해요. 1 번 묶음은 짝수예요.")}
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
        "Let's read the official sample. Notice we only care about how many IDs are EVEN vs ODD.",
        "ID 가 짝수인지 홀수인지만 보면 돼요."),
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
                "5 묶음을 만드는 한 가지 방법이에요. [2](짝), [11](홀), [13,1](짝), [15](홀), [17,3](짝) — 합이 짝, 홀, 짝, 홀, 짝 으로 번갈아 가요 ✓")}
            </div>
            <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: "1px dashed #86efac" }}>
              {t(E,
                "Key rule: odd + odd = even, odd + even = odd, even + even = even. So an even-sum group can be 1 even cow or 2 odd cows; an odd-sum group needs an odd number of odd cows.",
                "홀+홀=짝, 홀+짝=홀, 짝+짝=짝 이에요. 그래서 합이 짝수인 묶음은 짝수 소 1 마리나 홀수 소 2 마리로 만들 수 있어요. 합이 홀수인 묶음에는 홀수 소가 홀수 마리 들어가야 해요.")}
            </div>
          </div>
        </div>),
    },
    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If all IDs are even like [2,4,6,8], the first group needs even sum.\nBut the second group needs odd sum.\nCan we make an odd sum from even numbers?", "ID 가 모두 짝수인 [2,4,6,8] 을 볼게요."),
      question: t(E,
        "IDs = [2,4,6,8]. Max groups with alternating even/odd sums?",
        "IDs = [2,4,6,8] 일 때 묶음을 최대 몇 개 만들 수 있을까요?"),
      options: [
        t(E, "1 (can't make odd sum from even numbers)", "1 개 (짝수만으로는 홀수 합을 못 만들어요)"),
        t(E, "4 (each cow is a group)", "4 개 (소마다 한 묶음씩)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Group 1 has even sum, but group 2 needs odd sum which is impossible with only even numbers. Max: 1 group.",
        "1 번 묶음은 짝수 합이라 괜찮아요. 그런데 2 번 묶음은 홀수 합이어야 하는데, 짝수만 더하면 늘 짝수예요. 그래서 최대 1 묶음이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "With IDs = [2,4,6,8], what is the maximum number of groups?", "같은 [2,4,6,8] 로 한 번 더 세어 봐요."),
      question: t(E,
        "IDs = [2,4,6,8]. Maximum groups?",
        "IDs = [2,4,6,8] 의 최대 묶음 수는 몇 개일까요?"),
      hint: t(E,
        "Group 2 needs an odd sum — can you build that from only even numbers?",
        "2 번 묶음은 홀수 합이어야 해요. 짝수만 더해서 홀수가 될까요?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeOddPhotosCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "oddphotos-walk",
      narr: t(E,
        "Only the even-count and odd-count of IDs matter — try every group count k and keep the largest one that works.",
        "묶음 수 k 를 하나씩 넣어 보고 되는 것 중 제일 큰 값을 골라요."),
    },
  ];
}
