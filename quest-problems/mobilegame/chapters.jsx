import { C, t } from "@/components/quest/theme";
import { getMobileGameSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "scores = list(map(int, input().split()))",
  "",
  "# Play all levels, sum all scores",
  "total = sum(scores)",
  "",
  "print(total)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMobileGameCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "A mobile game has N levels, each with a score.\nYou play through all levels and collect all scores.\nFind the total score!", "모바일 게임에 N개의 레벨이 있고, 각각 점수가 있어요. 모든 레벨을 플레이하고 점수를 모두 모아요. 총 점수를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcf1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Mobile Game</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P2</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Given N levels with scores, play all levels and compute the total score.\nSimple summation!",
              "N개 레벨의 점수가 주어지면,\n모든 레벨을 플레이하고 총 점수를 계산해요. 단순 합산!")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If there are 3 levels with scores [10, 20, 30], what is the total score?", "3개 레벨의 점수가 [10, 20, 30]이면, 총 점수는 얼마일까요?"),
      question: t(E,
        "Scores = [10, 20, 30]. Total score?",
        "점수 = [10, 20, 30]. 총 점수는?"),
      options: [
        t(E, "30", "30"),
        t(E, "60", "60"),
        t(E, "20", "20"),
        t(E, "50", "50"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 10 + 20 + 30 = 60.",
        "맞아! 10 + 20 + 30 = 60이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Try it yourself! What is the total score for levels [10, 20, 30]?", "직접 해보자! 레벨 [10, 20, 30]의 총 점수는?"),
      question: t(E,
        "Scores = [10, 20, 30]. Enter the total:",
        "점수 = [10, 20, 30]. 총합을 입력해:"),
      hint: t(E,
        "Add all scores: 10 + 20 + 30.",
        "모든 점수를 더해: 10 + 20 + 30."),
      answer: 60,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMobileGameCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Simply read all scores and sum them up. O(N) time complexity.", "모든 점수를 읽고 합산하면 돼요. O(N) 시간 복잡도."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Read the list of scores and use sum() to get the total.\nOne pass through the array.",
              "점수 목록을 읽고 sum()으로 총합을 구해요. 배열을 한 번만 순회.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMobileGameSections(E),
    },
  ];
}
