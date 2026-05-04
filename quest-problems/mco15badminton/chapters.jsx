import { C, t } from "@/components/quest/theme";
import { getBadmintonSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "scores = input()  # string of A/B",
  "",
  "game_a, game_b = 0, 0  # points in current game",
  "wins_a, wins_b = 0, 0  # games won",
  "results = []",
  "",
  "for ch in scores:",
  "    if ch == 'A':",
  "        game_a += 1",
  "    else:",
  "        game_b += 1",
  "",
  "    if game_a == 21 or game_b == 21:",
  "        results.append((game_a, game_b))",
  "        if game_a == 21:",
  "            wins_a += 1",
  "        else:",
  "            wins_b += 1",
  "        game_a, game_b = 0, 0",
  "        if wins_a == 2 or wins_b == 2:",
  "            break",
  "",
  "for ga, gb in results:",
  "    print(f'{ga}-{gb}')",
  "print('A' if wins_a > wins_b else 'B')",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBadmintonCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Two players A and B play badminton: best-of-3 games, each game won by the first to 21 points. You're given a string of A/B characters in order — each character is who won that rally.\nPrint each game's final score and the overall match winner.",
        "두 선수 A 와 B 가 배드민턴: 3 전 2 선승제, 각 게임은 21 점 먼저 따면 승. 랠리 순서대로 A/B 가 적힌 문자열이 주어져요 — 각 문자는 그 랠리의 승자.\n각 게임의 최종 점수와 매치의 최종 승자를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udff8"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Badminton</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P1</div>
          </div>

          <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#059669" }}>{t(E, "Two players A and B play badminton", "두 선수 A 와 B 가 배드민턴")}</b>
                  {t(E, " — best-of-3 games; each game won by the first to ", " — 3 전 2 선승제; 각 게임은 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "21 points", "21 점")}</b>
                  {t(E, " (no win-by-2).", " 먼저 (2 점 차 규칙 없음).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#059669", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "We're given the rally winners as a ", "랠리 승자가 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "string of A/B characters in order", "순서대로 A/B 문자열")}</b>
                  {t(E, ".", " 로 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #6ee7b7" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "each game's final score and the overall match winner", "각 게임의 최종 점수와 매치 최종 승자")}</b>
                  {t(E, ".", " 를 출력해요.")}
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
        "In best-of-3, one player needs to win 2 games to win the match.\nIf Player A wins the first two games, is a third game played?", "3전 2선승제에서 한 선수가 매치를 이기려면 2게임을 이겨야 해요. A가 처음 두 게임을 이기면 세 번째 게임을 하나?"),
      question: t(E,
        "A wins first 2 games. Is a 3rd game played?",
        "A가 처음 2게임을 이김. 3번째 게임을 하나?"),
      options: [
        t(E, "No, A already won the match", "아니, A가 이미 매치를 이겼어"),
        t(E, "Yes, all 3 must be played", "응, 3게임 모두 해야 해"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! Once a player reaches 2 wins, the match is over immediately.",
        "맞아! 한 선수가 2승에 도달하면 매치는 즉시 끝나."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If 42 consecutive A's are scored ('AAA...A'), A wins 21-0 twice.\nHow many games are played?", "42개의 연속 A가 입력되면 ('AAA...A'), A가 21-0으로 두 번 이겨. 총 몇 게임이 진행될까요?"),
      question: t(E,
        "Input: 42 A's in a row. How many games are played total?",
        "입력: A가 42개 연속. 총 몇 게임이 진행되나?"),
      hint: t(E,
        "First 21 A's = Game 1 (21-0). Next 21 A's = Game 2 (21-0). A wins 2-0, match over.",
        "처음 21개 A = 1게임 (21-0). 다음 21개 A = 2게임 (21-0). A가 2-0 승리, 매치 종료."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: ⚡ 코드 (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeBadmintonCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Walk through the rally string char by char, tracking each game's score. When one player hits 21, save the score, reset, and bump that player's game count. Stop at 2 game wins.",
        "랠리 문자열을 한 글자씩 순회하며 각 게임 점수 추적. 한 쪽이 21 점 도달 시 점수 저장, 초기화, 그 쪽 게임 승수 증가. 2 게임 승 달성 시 종료."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Init scores and game wins", "점수와 게임 승수 초기화"), code: "sa = sb = 0;  wa = wb = 0", color: "#059669" },
              { n: 2, label: t(E, "For each rally char", "각 랠리 글자"), code: "for c in rallies: if c == 'A': sa += 1 else: sb += 1", color: "#7c3aed" },
              { n: 3, label: t(E, "On 21, record + reset + bump", "21 점 도달 시 기록·초기화·승수+1"), code: "if sa == 21: scores.append((21, sb)); wa += 1; sa = sb = 0  (similar for B)", color: "#0891b2" },
              { n: 4, label: t(E, "Print scores + winner", "점수 + 승자 출력"), code: "print(each game score, then 'A' if wa > wb else 'B')", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#059669" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single linear scan", "선형 한 번 스캔")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getBadmintonSections(E),
    },
  ];
}
