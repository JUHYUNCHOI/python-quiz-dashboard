import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getSimpleGameSections } from "./components";

/* ─── Deep-audit sim: explore who wins for small N (0..12) ─── */
function WinPatternSim({ E }) {
  const [n, setN] = useState(5);
  const isLosing = n % 4 === 0; // current player loses iff multiple of 4
  const winner = isLosing ? 2 : 1;
  const cells = [];
  for (let i = 0; i <= 12; i++) cells.push(i);
  return (
    <div style={{ background: "#fff", border: "1px dashed #fca5a5", borderRadius: 10, padding: 12, marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#7f1d1d", marginBottom: 8 }}>
        🔬 {t(E, "Try N (0..12): who wins?", "N (0..12) 눌러봐: 누가 이겨?")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {cells.map(i => {
          const lose = i % 4 === 0;
          const sel = i === n;
          return (
            <button key={i} onClick={() => setN(i)} style={{
              minWidth: 30, padding: "4px 6px", fontSize: 12, fontWeight: 700,
              background: sel ? (lose ? "#dc2626" : "#15803d") : "#fff",
              color: sel ? "#fff" : (lose ? "#dc2626" : "#15803d"),
              border: `1.5px solid ${lose ? "#dc2626" : "#15803d"}`,
              borderRadius: 6, cursor: "pointer",
            }}>{i}</button>
          );
        })}
      </div>
      <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>
        N = <b>{n}</b> → {t(E, "winner: ", "승자: ")}
        <b style={{ color: winner === 1 ? "#15803d" : "#dc2626" }}>
          {winner === 1 ? "FIRST (1)" : "SECOND (2)"}
        </b>
        {" · "}
        <span style={{ color: C.dim }}>
          {n} % 4 = {n % 4} {isLosing
            ? t(E, "(multiple of 4 → first player loses)", "(4 의 배수 → 선수 패)")
            : t(E, "(not 0 → first player wins)", "(0 아님 → 선수 승)")}
        </span>
      </div>
      <div style={{ fontSize: 11, color: C.dim, marginTop: 6 }}>
        {t(E,
          "Green = first wins · Red = first loses. Notice every 4th number is red.",
          "초록 = 선수 승 · 빨강 = 선수 패. 4 칸마다 빨강이 반복돼요.")}
      </div>
    </div>
  );
}

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
        "Two players take turns removing 1, 2, or 3 stones from a pile of N stones. The player who takes the LAST stone wins. Both play OPTIMALLY.\nPrint 1 if the first player wins, or 2 if the second player wins.",
        "두 플레이어가 N 개의 돌 더미에서 1, 2, 또는 3 개를 번갈아 가져가요. 마지막 돌을 가져가는 사람이 이겨요. 둘 다 최선을 다 해요.\n선수(먼저 두는 사람)가 이기면 1, 후수가 이기면 2 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udfae"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Simple Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P4</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Under optimal play, output 1 (first player wins) or 2 (second player wins).",
                "최적의 수일 때, 1 (선수 승) 또는 2 (후수 승) 를 출력.")}
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
                  <b style={{ color: "#15803d" }}>{t(E, "1 (first wins) or 2 (second wins) under optimal play", "최선의 수일 때 1 (선수 승) 또는 2 (후수 승)")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <WinPatternSim E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 (코드가 실제로 읽고 출력하는 것 기준)
    // 코드는 정수 N 하나를 읽고, 1(선수 승)/2(후수 승) 를 출력한다.
    // 문제 문장은 "FIRST/SECOND" 라고 하지만 실제 출력은 1/2 → 코드 기준으로 맞춤.
    {
      type: "reveal",
      narr: t(E,
        "How does the data come in — and what do we print out?",
        "데이터는 어떻게 들어오고, 무엇을 출력할까?"),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "(one line) — number of stones in the pile", "(한 줄) — 돌 더미의 돌 개수")}</span></div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "A single number: 1 = first player wins, 2 = second player wins (under optimal play).",
                  "숫자 하나: 1 = 선수(먼저 두는 사람) 승, 2 = 후수 승 (둘 다 최선일 때).")}
            </div>
          </div>
          {/* 샘플 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE INPUT", "샘플 입력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#f8fafc", textAlign: "center" }}>
                <div>8</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4, textAlign: "center" }}>{t(E, "SAMPLE OUTPUT", "샘플 출력")}</div>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.7, color: "#86efac", textAlign: "center" }}>
                <div>2</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.dim, marginTop: 8, wordBreak: "keep-all" }}>
            {t(E, "N = 8 is a multiple of 4, so the second player wins → we print 2.",
                "N = 8 은 4 의 배수라 후수가 이겨요 → 2 를 출력.")}
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
        "Try small N and see who wins — find the pattern.",
        "작은 N 값으로 누가 이기는지 보면서 패턴을 찾아 봐."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeSimpleGameCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "With moves {1, 2, 3}, losing positions are exactly multiples of 4. So FIRST wins iff N % 4 ≠ 0. Sections build it one piece at a time.",
        "이동 {1, 2, 3} 에서 지는 위치는 4 의 배수. 즉 N % 4 ≠ 0 이면 FIRST 승. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getSimpleGameSections(E),
    },
  ];
}
