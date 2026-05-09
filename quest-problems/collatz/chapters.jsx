import { C, t } from "@/components/quest/theme";
import { getCollatzSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "steps = 0",
  "while N != 1:",
  "    if N % 2 == 0:",
  "        N = N // 2",
  "    else:",
  "        N = 3 * N + 1",
  "    steps += 1",
  "",
  "print(steps)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "The Collatz conjecture: start with any positive integer N.\nIf even, divide by 2.\nIf odd, multiply by 3 and add 1.\nRepeat until you reach 1.\nCount the steps!", "콜라츠 추측: 양의 정수 N에서 시작해요. 짝수면 2로 나누고, 홀수면 3을 곱하고 1을 더해요. 1에 도달할 때까지 반복하고 단계 수를 세요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd22"}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>Collatz Conjecture</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P1</div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#ecfdf5", border: "1.5px solid #059669", borderRadius: 10, padding: "10px 14px", margin: "12px 0", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#065f46", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of Collatz steps to reach 1 from N.",
                "N 에서 1 까지 도달하는 데 걸리는 콜라츠 단계 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Rule: if N is even,\nN = N/2. If N is odd,\nN = 3N+1. Count how many steps until N becomes 1.",
              "규칙: N이 짝수면 N = N/2.\nN이 홀수면 N = 3N+1. N이 1이 될 때까지 몇 단계인지 세요.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's trace through N=6.\nThe sequence is 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1.\nHow many steps?", "N=6을 추적해보자. 수열은 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1이에요. 몇 단계일까요?"),
      question: t(E,
        "N=6: 6->3->10->5->16->8->4->2->1. How many steps?",
        "N=6: 6->3->10->5->16->8->4->2->1. 몇 단계?"),
      options: [
        t(E, "6 steps", "6단계"),
        t(E, "8 steps", "8단계"),
        t(E, "9 steps", "9단계"),
        t(E, "10 steps", "10단계"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 6->3->10->5->16->8->4->2->1 is 8 transitions, so 8 steps.",
        "맞아! 6->3->10->5->16->8->4->2->1은 8번의 전환이니까 8단계예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now try it yourself! How many steps does it take for N=6 to reach 1?", "이제 직접 해보자! N=6이 1에 도달하려면 몇 단계가 필요할까?"),
      question: t(E,
        "How many Collatz steps for N=6?",
        "N=6의 콜라츠 단계 수는?"),
      hint: t(E,
        "Apply the rule step by step and count transitions.",
        "규칙을 한 단계씩 적용하면서 전환 수를 세어 봐."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Pure simulation: while N ≠ 1, if even N = N/2, else N = 3N + 1. Count steps. Sections build it one piece at a time.",
        "순수 시뮬: N ≠ 1 인 동안 짝수면 N = N/2, 홀수면 N = 3N + 1. 단계 수 카운트. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getCollatzSections(E),
    },
  ];
}
