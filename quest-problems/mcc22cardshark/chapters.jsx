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
  "    N = int(input_data[idx])",
  "    idx += 1",
  "    cards = []",
  "    for i in range(N):",
  "        cards.append(int(input_data[idx]))",
  "        idx += 1",
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
        "두 플레이어가 N 장의 펼쳐진 카드 (각자 값이 있음) 중 한 장씩 번갈아 골라요. 가져간 카드의 값이 그 사람의 점수예요. 둘 다 최선을 다 해요 (자기 점수를 최대로 만들려고).\n첫 번째 플레이어의 최종 총점을 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udccf"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Card Shark</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2022 P5</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E, "Two players take turns picking cards optimally. Print Player 1's total.", "두 플레이어가 최선을 다해 카드를 번갈아 골라요. 플레이어 1의 합계를 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#d97706" }}>{t(E, "Two players, N face-up cards each with a value", "두 플레이어, N 장의 펼쳐진 카드 (각자 값)")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Players ", "두 플레이어가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "alternate picking ONE card", "한 장씩 번갈아 가져가요")}</b>
                  {t(E, "; the value goes to that player's score. Both play OPTIMALLY.",
                        ". 가져간 값이 그 플레이어의 점수예요. 둘 다 최선을 다 해요 (자기 점수를 최대로 만들려고).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
        "Cards are [1, 2, 3].\nBoth players play optimally (pick highest).\nPlayer 1 picks first.\nWhat does Player 1 get?", "카드가 [1, 2, 3]이에요. 두 플레이어 모두 최적으로 (가장 높은 것) 플레이해요. 플레이어 1이 먼저 가져가요. 플레이어 1은 무엇을 얻어?"),
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
    // 1-3: Deep-audit sim — turn-by-turn alternating pick on sorted cards
    {
      type: "reveal",
      narr: t(E,
        "Let's WATCH the game play out. Cards [5, 2, 8, 1, 6] sorted descending → [8, 6, 5, 2, 1]. Each turn, the current player grabs the TOP (largest remaining). P1 takes turns 0, 2, 4 — that's positions [0, 2, 4] of the sorted list.",
        "게임을 직접 봐. 카드 [5, 2, 8, 1, 6]을 내림차순 정렬 → [8, 6, 5, 2, 1]. 매 턴 현재 플레이어가 맨 위 (가장 큰 것)를 가져가. P1은 턴 0, 2, 4에 가져가 → 정렬된 리스트의 위치 [0, 2, 4]."),
      content: (() => {
        const cards = [5, 2, 8, 1, 6];
        const sorted = [...cards].sort((a, b) => b - a); // [8,6,5,2,1]
        const turns = sorted.map((v, i) => ({
          idx: i,
          val: v,
          player: i % 2 === 0 ? 1 : 2,
        }));
        const p1 = turns.filter(x => x.player === 1).reduce((s, x) => s + x.val, 0);
        const p2 = turns.filter(x => x.player === 2).reduce((s, x) => s + x.val, 0);
        return (
          <div style={{ padding: 16 }}>
            <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
                🃏 {t(E, "Turn-by-turn audit", "턴 별 시뮬레이션")}
              </div>
              <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
                {t(E, "Sample cards [5, 2, 8, 1, 6] → sort descending → both pick top each turn.",
                     "예시 카드 [5, 2, 8, 1, 6] → 내림차순 정렬 → 매 턴 둘 다 맨 위 선택.")}
              </div>
            </div>

            {/* Sorted card row */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.dim, marginBottom: 6 }}>
                {t(E, "Sorted (descending):", "정렬 (내림차순):")}
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                {sorted.map((v, i) => (
                  <div key={i} style={{
                    width: 48, height: 64,
                    border: `2px solid ${i % 2 === 0 ? "#d97706" : "#7c3aed"}`,
                    borderRadius: 8,
                    background: i % 2 === 0 ? "#fffbeb" : "#f5f3ff",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    fontWeight: 800, color: i % 2 === 0 ? "#92400e" : "#5b21b6",
                  }}>
                    <div style={{ fontSize: 10, color: C.dim, fontWeight: 600 }}>#{i}</div>
                    <div style={{ fontSize: 20 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Turn table */}
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: 10, marginBottom: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", fontSize: 12, gap: 4 }}>
                <div style={{ fontWeight: 700, color: C.dim, padding: "4px 6px" }}>{t(E, "Turn", "턴")}</div>
                <div style={{ fontWeight: 700, color: C.dim, padding: "4px 6px" }}>{t(E, "Picker", "차례")}</div>
                <div style={{ fontWeight: 700, color: C.dim, padding: "4px 6px" }}>{t(E, "Card", "카드")}</div>
                <div style={{ fontWeight: 700, color: C.dim, padding: "4px 6px" }}>i % 2</div>
                {turns.flatMap(tr => [
                  <div key={`t-${tr.idx}`} style={{ padding: "4px 6px", borderTop: `1px dashed ${C.border}` }}>{tr.idx}</div>,
                  <div key={`p-${tr.idx}`} style={{ padding: "4px 6px", borderTop: `1px dashed ${C.border}`, fontWeight: 700, color: tr.player === 1 ? "#d97706" : "#7c3aed" }}>
                    P{tr.player}
                  </div>,
                  <div key={`v-${tr.idx}`} style={{ padding: "4px 6px", borderTop: `1px dashed ${C.border}`, fontWeight: 700 }}>+{tr.val}</div>,
                  <div key={`m-${tr.idx}`} style={{ padding: "4px 6px", borderTop: `1px dashed ${C.border}`, color: C.dim }}>
                    {tr.idx % 2}{tr.idx % 2 === 0 ? " → P1" : " → P2"}
                  </div>,
                ])}
              </div>
            </div>

            {/* Score totals */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <div style={{ flex: 1, background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e" }}>P1 = 8 + 5 + 1</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#d97706" }}>{p1}</div>
              </div>
              <div style={{ flex: 1, background: "#f5f3ff", border: "1.5px solid #7c3aed", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6" }}>P2 = 6 + 2</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#7c3aed" }}>{p2}</div>
              </div>
            </div>

            <div style={{ marginTop: 10, padding: "8px 12px", background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 8, fontSize: 12, color: "#065f46" }}>
              👉 {t(E,
                  "Pattern locked in: sort descending, sum every EVEN index for P1.",
                  "패턴 확정: 내림차순 정렬, 짝수 인덱스를 모두 더하면 P1.")}
            </div>
          </div>
        );
      })(),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "With cards [1,2,3], what is Player 1's optimal score when picking highest first?", "카드 [1,2,3]에서 가장 높은 것을 먼저 가져갈 때 플레이어 1의 최적 점수는?"),
      question: t(E,
        "Cards [1,2,3], pick highest each turn. P1's score?",
        "카드 [1,2,3], 매 턴 가장 높은 것 선택. P1의 점수?"),
      hint: t(E,
        "Picking highest each turn: who picks first, and how many turns does P1 get?",
        "매 턴 가장 큰 것을 가져가요. 누가 먼저 가져가고, P1 은 몇 번 가져가?"),
      answer: 3,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc22CardSharkCh2(E, lang = "py") {
  return [
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Both players play optimally → both pick the largest remaining card. Sort cards descending; Player 1 takes positions 0, 2, 4, ... (every other from the top). Sections build it one piece at a time.",
        "둘 다 최선 → 둘 다 남은 카드 중 가장 큰 것 선택. 카드 내림차순 정렬; 플레이어 1 은 위치 0, 2, 4, ... (위에서 한 칸씩 건너뜀). 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc22CardSharkSections(E),
    },
  ];
}
