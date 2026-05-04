import { C, t } from "@/components/quest/theme";
import { getMcc22CardSharkSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "",
  "def solve():",
  "    input_data = sys.stdin.read().split()",
  "    idx = 0",
  "    N = int(input_data[idx]); idx += 1",
  "    cards = []",
  "    for i in range(N):",
  "        cards.append(int(input_data[idx])); idx += 1",
  "",
  "    # Strategy: simulate the card game",
  "    # Player picks the highest available card each turn",
  "    cards_sorted = sorted(cards, reverse=True)",
  "",
  "    # Player 1 picks first (odd turns), Player 2 picks even",
  "    p1_score = 0",
  "    p2_score = 0",
  "    for i, c in enumerate(cards_sorted):",
  "        if i % 2 == 0:",
  "            p1_score += c",
  "        else:",
  "            p2_score += c",
  "",
  "    print(p1_score)",
  "",
  "solve()",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two players take turns picking ONE card from N face-up cards (each card has a value); the picker takes that card's value as score. Both play OPTIMALLY (each picks to maximize her own score).\nPrint the FIRST player's final total score.",
        "두 플레이어가 N 장의 펼쳐진 카드 (각자 값이 있음) 중 한 장씩 번갈아 골라요. 가져간 카드의 값이 그 사람의 점수예요. 둘 다 최선을 다 해요 (각자 자기 점수 극대화).\n첫 번째 플레이어의 최종 총점을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udccf"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Card Shark</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P5</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#d97706" }}>{t(E, "Two players, N face-up cards each with a value", "두 플레이어, N 장의 펼쳐진 카드 (각자 값)")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Players ", "두 플레이어가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "alternate picking ONE card", "한 장씩 번갈아 가져가요")}</b>
                  {t(E, "; the value goes to that player's score. Both play OPTIMALLY.",
                        ". 가져간 값이 그 플레이어의 점수. 둘 다 최선을 다 함.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "first player's final total score", "첫 번째 플레이어의 최종 총점")}</b>
                  {t(E, ".", "을 출력해요.")}
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
        "Cards are [1, 2, 3].\nBoth players play optimally (pick highest).\nPlayer 1 picks first.\nWhat does Player 1 get?", "카드가 [1, 2, 3]이예요. 두 플레이어 모두 최적으로 (가장 높은 것) 플레이해요. 플레이어 1이 먼저 가져가요. 플레이어 1은 무엇을 얻어?"),
      question: t(E,
        "Cards [1,2,3]. P1 picks 3, P2 picks 2, P1 picks 1. P1's total?",
        "카드 [1,2,3]. P1이 3, P2가 2, P1이 1 가져가요. P1의 합계?"),
      options: [
        t(E, "4 (3 + 1)", "4 (3 + 1)"),
        t(E, "3", "3"),
        t(E, "5 (3 + 2)", "5 (3 + 2)"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Sorted descending: [3,2,1]. P1 gets 3 and 1 = 4.",
        "맞아! 내림차순 정렬: [3,2,1]. P1이 3과 1을 가져가서 = 4."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "With cards [1,2,3], what is Player 1's optimal score when picking highest first?", "카드 [1,2,3]에서 가장 높은 것을 먼저 가져갈 때 플레이어 1의 최적 점수는?"),
      question: t(E,
        "Cards [1,2,3], pick highest each turn. P1's score?",
        "카드 [1,2,3], 매 턴 가장 높은 것 선택. P1의 점수?"),
      hint: t(E,
        "P1 picks 3, P2 picks 2, P1 picks 1. Total = 3 + 1 = 4. Wait, but the problem says just pick highest -> 3. Answer is 3.",
        "P1이 3을 가져가요. 첫 선택의 값만 물어보면 3."),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Both players play optimally → both pick the largest remaining card. Sort cards descending; Player 1 takes positions 0, 2, 4, ... (every other from the top).",
        "둘 다 최선 → 둘 다 남은 카드 중 가장 큰 것 선택. 카드 내림차순 정렬; 플레이어 1 은 위치 0, 2, 4, ... (위에서 한 칸씩 건너뜀)."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Sort cards descending", "내림차순 정렬"), code: "cards.sort(reverse=True)", color: "#d97706" },
              { n: 2, label: t(E, "Player 1 takes evens (0, 2, ...)", "플레이어 1: 짝수 (0, 2, ...)"), code: "p1 = sum(cards[i] for i in range(0, N, 2))", color: "#7c3aed" },
              { n: 3, label: t(E, "Player 2 takes the rest", "플레이어 2: 나머지"), code: "p2 = sum(cards[i] for i in range(1, N, 2))", color: "#0891b2" },
              { n: 4, label: t(E, "Print Player 1 score", "플레이어 1 점수 출력"), code: "print(p1)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N log N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "sort dominates", "정렬이 지배적")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc22CardSharkSections(E),
    },
  ];
}
