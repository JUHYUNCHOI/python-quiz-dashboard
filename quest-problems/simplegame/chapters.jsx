import { C, t } from "@/components/quest/theme";
import { getSimpleGameSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "# Nim-like game: take 1-3 stones per turn",
  "# Last player to take a stone wins",
  "# Losing positions: multiples of 4",
  "",
  "if N % 4 == 0:",
  "    print(2)  # Second player wins",
  "else:",
  "    print(1)  # First player wins",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two players take turns removing 1, 2, or 3 stones from a pile of N stones. The player who takes the LAST stone wins. Both play OPTIMALLY.\nPrint who wins (FIRST or SECOND).",
        "두 플레이어가 N 개의 돌 더미에서 1, 2, 또는 3 개를 번갈아 가져가요. 마지막 돌을 가져가는 사람이 이겨요. 둘 다 최선을 다 해요.\n승자 (FIRST 또는 SECOND) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfae"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Simple Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P4</div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#dc2626" }}>{t(E, "A pile of N stones; two players alternate", "N 개의 돌 더미; 두 플레이어가 번갈아")}</b>
                  {t(E, ".", "")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "On a turn, take ", "자기 차례에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "1, 2, or 3 stones", "1, 2, 또는 3 개의 돌")}</b>
                  {t(E, " from the pile. The player taking the LAST stone wins.",
                        " 을 가져가요. 마지막 돌을 가져가는 사람이 승.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "winner (FIRST or SECOND) under optimal play", "최선의 수일 때 승자 (FIRST 또는 SECOND)")}</b>
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
        "If N=5, the first player takes 1 stone, leaving 4.\nNow the opponent faces a multiple of 4 - a losing position!", "N=5이면, 선수가 돌 1개를 가져가서 4개를 남겨. 상대는 4의 배수를 마주해 - 지는 위치예요!"),
      question: t(E,
        "N=5. Who wins with optimal play?",
        "N=5. 최적 플레이에서 누가 이겨?"),
      options: [
        t(E, "First player (take 1, leave 4)", "선수 (1개 가져가서 4개 남김)"),
        t(E, "Second player", "후수"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 5 % 4 = 1, so the first player wins by taking 1 stone.",
        "맞아! 5 % 4 = 1이니까, 선수가 돌 1개를 가져가서 이겨."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "N=8. Since 8 is a multiple of 4, who wins? Enter 1 for first player, 2 for second player.", "N=8. 8은 4의 배수예요. 누가 이겨? 선수면 1, 후수면 2를 입력해요."),
      question: t(E,
        "N=8. Who wins? (1=first, 2=second)",
        "N=8. 누가 이겨? (1=선수, 2=후수)"),
      hint: t(E,
        "8 % 4 == 0. Multiples of 4 are losing for the player whose turn it is.",
        "8 % 4 == 0. 4의 배수는 차례인 사람이 지는 위치예요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Game theory: with moves {1, 2, 3}, the LOSING positions are exactly multiples of 4 (face N=0, 4, 8, ... and you lose). So FIRST player wins unless N % 4 == 0.",
        "게임 이론: 이동 {1, 2, 3} 일 때 지는 위치는 정확히 4 의 배수 (N=0, 4, 8, ... 에서 자기 차례면 짐). 즉 N % 4 == 0 이 아니면 FIRST 승."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
        </div>),

    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getSimpleGameSections(E),
    },
  ];
}
