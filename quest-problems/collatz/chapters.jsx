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
        "The Collatz conjecture: start with any positive integer N.\nIf even, divide by 2.\nIf odd, multiply by 3 and add 1.\nRepeat until you reach 1.\nCount the steps!", "콜라츠 추측: 양의 정수 N에서 시작해요. 짝수면 2로 나누고, 홀수면 3을 곱하고 1을 더해요. 1에 도달할 때까지 반복하고 단계 수를 세!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd22"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Collatz Conjecture</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Rule: if N is even,\nN = N/2. If N is odd,\nN = 3N+1. Count how many steps until N becomes 1.",
              "규칙: N이 짝수면 N = N/2.\nN이 홀수면 N = 3N+1. N이 1이 될 때까지 몇 단계인지 세.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "Let's trace through N=6.\nThe sequence is 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1.\nHow many steps?", "N=6을 추적해보자. 수열은 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1이예요. 몇 단계일까요?"),
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
        "6->3->10->5->16->8->4->2->1. Count each arrow.",
        "6->3->10->5->16->8->4->2->1. 각 화살표를 세봐요."),
      answer: 8,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeCollatzCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Pure simulation: while N ≠ 1, if N is even divide by 2, else multiply by 3 and add 1. Count the number of steps.",
        "순수 시뮬레이션: N ≠ 1 인 동안, N 이 짝수면 2 로 나누고, 홀수면 3 을 곱한 뒤 1 더하기. 단계 수를 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Initialize counter", "카운터 초기화"), code: "steps = 0", color: "#059669" },
              { n: 2, label: t(E, "While N != 1, branch on parity", "N != 1 동안 짝/홀로 분기"), code: "while N != 1: ...", color: "#0891b2" },
              { n: 3, label: t(E, "Apply Collatz rule", "Collatz 규칙 적용"), code: "N = N // 2 if N % 2 == 0 else 3*N + 1", color: "#7c3aed" },
              { n: 4, label: t(E, "Print step count", "단계 수 출력"), code: "steps += 1;  print(steps)", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#065f46", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(steps)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "varies per N (Collatz conjectured to always terminate)", "N 마다 다름 (Collatz 추측: 항상 종료)")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getCollatzSections(E),
    },
  ];
}
