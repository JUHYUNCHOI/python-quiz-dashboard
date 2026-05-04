import { C, t } from "@/components/quest/theme";
import { getMcc19CandySections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "# Simulate: people in a queue numbered 1..N",
  "people = list(range(1, N + 1))",
  "",
  "while len(people) > 1:",
  "    # Remove people at odd positions (1-indexed)",
  "    people = [people[i] for i in range(len(people)) if (i + 1) % 2 == 0]",
  "",
  "print(people[0])",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19CandyCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "N people stand in a circle.\nEach round, people at odd positions are eliminated.\nFind who survives!\nThis is a Josephus-like problem.", "N명이 원형으로 서 있어요. 매 라운드마다 홀수 위치의 사람이 탈락해요. 누가 살아남는지 찾아요! 요세푸스 변형 문제예요."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🍬</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Candy</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P3</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Simulate the elimination process.\nEach round removes people at odd positions until one remains.",
              "핵심: 탈락 과정을 시뮬레이션.\n매 라운드 홀수 위치를 제거해서 한 명 남을 때까지.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "N=4, positions [1,2,3,4].\nEliminate odd positions [1,3] → [2,4] remain.\nThen eliminate odd of remaining → [2] eliminated → 4 survives!", "N=4, 위치 [1,2,3,4]. 홀수 위치 [1,3] 탈락 → [2,4] 남음. 남은 것 중 홀수 → [2] 탈락 → 4가 생존!"),
      question: t(E,
        "N=4: after eliminating odd positions twice, who survives?",
        "N=4: 홀수 위치를 두 번 제거하면 누가 생존해요?"),
      options: [
        t(E, "Person 2", "2번"),
        t(E, "Person 4", "4번"),
        t(E, "Person 3", "3번"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! [1,2,3,4] → remove odd → [2,4] → remove odd → [4]. Person 4 survives.",
        "맞아! [1,2,3,4] → 홀수 제거 → [2,4] → 홀수 제거 → [4]. 4번이 생존."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With N=4, what is the starting position of the survivor?", "N=4일 때, 생존자의 시작 위치는?"),
      question: t(E,
        "N=4. Survivor's original position = ?",
        "N=4. 생존자의 원래 위치 = ?"),
      hint: t(E,
        "[1,2,3,4] → [2,4] → [4]. Answer is 4.",
        "[1,2,3,4] → [2,4] → [4]. 답은 4."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19CandyCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Simulate each round: keep only even-indexed people.\nEach round halves the count.\nO(N) total work.", "각 라운드를 시뮬레이션: 짝수 인덱스만 유지. 매 라운드 절반으로 줄어. 총 O(N) 작업."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Simulation: repeatedly filter out odd-indexed positions.\nN + N/2 + N/4 + ... = O(N).",
              "시뮬레이션: 홀수 인덱스를 반복적으로 필터링.\nN + N/2 + N/4 + ... = O(N).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc19CandySections(E),
    },
  ];
}
