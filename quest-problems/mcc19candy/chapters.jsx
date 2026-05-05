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
        "N people stand in a line numbered 1..N. In each round, every person at an ODD position (1st, 3rd, 5th, ...) is eliminated; the rest renumber from 1. Repeat until ONE person remains.\nPrint that person's original number.",
        "N 명이 1..N 번호로 한 줄에 서 있어요. 매 라운드, 홀수 위치 (첫째, 셋째, 다섯째, ...) 의 사람들이 탈락하고, 나머지가 1 부터 다시 번호 매겨져요. 한 명만 남을 때까지 반복.\n남은 사람의 원래 번호를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🍬</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Candy</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P3</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "N people in a line, numbered 1..N", "1..N 번호로 한 줄에 선 N 명")}</b>
                  {t(E, ".", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each round, ", "매 라운드, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "everyone at an ODD position is eliminated", "홀수 위치의 모두가 탈락")}</b>
                  {t(E, " and the rest renumber from 1.",
                        "하고 나머지가 1 부터 다시 번호 매겨져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "original number of the last person remaining", "마지막에 남은 사람의 원래 번호")}</b>
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
        "Simulate the elimination: in each round, keep only people at EVEN positions (1, 3, 5, ... in 1-indexed → odd survivors are eliminated). Repeat until 1 person remains.",
        "탈락 시뮬레이션: 매 라운드, 짝수 위치 (1-indexed: 1, 3, 5, ... 가 홀수 위치라 탈락) 만 유지. 한 명 남을 때까지 반복."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init list 1..N", "1..N 리스트 초기화"), code: "cur = list(range(1, N+1))", color: "#dc2626" },
              { n: 2, label: t(E, "While > 1 person, filter", "1 명 초과면 필터"), code: "while len(cur) > 1:", color: "#7c3aed" },
              { n: 3, label: t(E, "Keep only even-position", "짝수 위치만 유지"), code: "cur = [cur[i] for i in range(len(cur)) if i % 2 == 1]", color: "#0891b2" },
              { n: 4, label: t(E, "Print survivor", "생존자 출력"), code: "print(cur[0])", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "N + N/2 + N/4 + ... = 2N", "N + N/2 + N/4 + ... = 2N")}</div>
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
