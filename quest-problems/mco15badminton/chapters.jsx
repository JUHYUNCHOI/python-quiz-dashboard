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
        "Simulate a badminton match!\nBest of 3 games, first to 21 points wins each game.\nGiven a string of A/B indicating who scored each rally, output the score per game and the overall winner.", "배드민턴 경기를 시뮬레이션해! 3전 2선승제이고, 각 게임은 21점 먼저 따면 이겨. A/B로 구성된 문자열이 주어지면, 게임별 점수와 최종 승자를 출력해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udff8"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>Badminton</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCO 2015 P1</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Scan through the string, tracking scores.\nWhen someone reaches 21, record the game result and reset. The first player to win 2 games wins the match.",
              "핵심: 문자열을 순회하며 점수를 추적해.\n21점에 도달하면 게임 결과를 기록하고 초기화.\n2게임을 먼저 이기는 선수가 매치 승리.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "In best-of-3, one player needs to win 2 games to win the match.\nIf Player A wins the first two games, is a third game played?", "3전 2선승제에서 한 선수가 매치를 이기려면 2게임을 이겨야 해. A가 처음 두 게임을 이기면 세 번째 게임을 하나?"),
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
        "If 42 consecutive A's are scored ('AAA...A'), A wins 21-0 twice.\nHow many games are played?", "42개의 연속 A가 입력되면 ('AAA...A'), A가 21-0으로 두 번 이겨. 총 몇 게임이 진행될까?"),
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
        "Simple simulation: scan the string once, tracking scores and game results.\nO(N) time where N is the length of the string.", "간단한 시뮬레이션: 문자열을 한 번 순회하며 점수와 게임 결과를 추적해. 문자열 길이 N에 대해 O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#059669" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Simulation: iterate through each character.\nTrack game_a, game_b scores. When one hits 21, record result, reset, increment wins. Stop when someone has 2 wins.",
              "시뮬레이션: 각 문자를 순회.\ngame_a, game_b 점수 추적.\n21점 도달 시 결과 기록, 초기화, 승수 증가.\n2승 달성 시 종료.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getBadmintonSections(E),
    },
  ];
}
