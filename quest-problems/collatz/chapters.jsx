import { C, t } from "@/components/quest/theme";

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
        "The Collatz conjecture: start with any positive integer N. If even, divide by 2. If odd, multiply by 3 and add 1. Repeat until you reach 1. Count the steps!",
        "콜라츠 추측: 양의 정수 N에서 시작해. 짝수면 2로 나누고, 홀수면 3을 곱하고 1을 더해. 1에 도달할 때까지 반복하고 단계 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd22"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Collatz Conjecture</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Rule: if N is even, N = N/2. If N is odd, N = 3N+1. Count how many steps until N becomes 1.",
              "규칙: N이 짝수면 N = N/2. N이 홀수면 N = 3N+1. N이 1이 될 때까지 몇 단계인지 세.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's trace through N=6. The sequence is 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1. How many steps?",
        "N=6을 추적해보자. 수열은 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1이야. 몇 단계일까?"),
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
        "맞아! 6->3->10->5->16->8->4->2->1은 8번의 전환이니까 8단계야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Now try it yourself! How many steps does it take for N=6 to reach 1?",
        "이제 직접 해보자! N=6이 1에 도달하려면 몇 단계가 필요할까?"),
      question: t(E,
        "How many Collatz steps for N=6?",
        "N=6의 콜라츠 단계 수는?"),
      hint: t(E,
        "6->3->10->5->16->8->4->2->1. Count each arrow.",
        "6->3->10->5->16->8->4->2->1. 각 화살표를 세봐."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh2(E) {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Simple simulation: keep applying the rules until N becomes 1. The number of steps varies but is always finite (conjectured).",
        "단순 시뮬레이션: N이 1이 될 때까지 규칙을 계속 적용해. 단계 수는 달라지지만 항상 유한해 (추측)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(steps)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Just simulate: check even/odd, apply the rule, increment counter. Loop until N=1.",
              "시뮬레이션: 짝수/홀수 확인, 규칙 적용, 카운터 증가. N=1이 될 때까지 반복.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "code",
      narr: t(E,
        "Here's the complete Collatz simulation!",
        "콜라츠 시뮬레이션 전체 코드야!"),
      label: t(E, "Python Solution", "Python 풀이"),
      code: SOLUTION_CODE,
    },
  ];
}
