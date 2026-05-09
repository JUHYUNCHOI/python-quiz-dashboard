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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Candy</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2019 P3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E, "Print the original number of the last person remaining after repeated odd-position eliminations.", "홀수 위치 탈락을 반복한 뒤 마지막에 남은 사람의 원래 번호를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "N people in a line, numbered 1..N", "1..N 번호로 한 줄에 선 N 명")}</b>
                  {t(E, ".", " 이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Each round, ", "매 라운드, ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "everyone at an ODD position is eliminated", "홀수 위치의 모두가 탈락")}</b>
                  {t(E, " and the rest renumber from 1.",
                        "하고 나머지가 1 부터 다시 번호 매겨져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "Walk through it: [1,2,3,4] → remove odd positions → ? → remove odd positions again → who's left?",
        "한 단계씩: [1,2,3,4] → 홀수 위치 제거 → ? → 다시 홀수 위치 제거 → 누가 남아요?"),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc19CandyCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Simulate the elimination: in each round, keep only people at EVEN positions (1, 3, 5, ... in 1-indexed → odd survivors are eliminated). Repeat until 1 person remains. Solution code — read part by part. Toggle Python ↔ C++ in header. Sections build it one piece at a time.",
        "탈락 시뮬레이션: 매 라운드, 짝수 위치 (1-indexed: 1, 3, 5, ... 가 홀수 위치라 탈락) 만 유지. 한 명 남을 때까지 반복. 풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc19CandySections(E),
    },
  ];
}
