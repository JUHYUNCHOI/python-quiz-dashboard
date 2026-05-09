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
        "A mobile game has N levels with scores s[1..N]. You play every level once and collect every score.\nPrint the total score (the sum of all s[i]).",
        "모바일 게임에 N 개의 레벨이 있고, 각 레벨의 점수 s[1..N] 이 주어져요. 모든 레벨을 한 번씩 플레이해 모든 점수를 모아요.\n총 점수 (모든 s[i] 의 합) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udcf1"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Mobile Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the total score collected after playing all N levels.",
                "N 개 레벨을 플레이해 얻은 총 점수를 출력.")}
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
                  {t(E, "A mobile game has ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N levels with scores s[1..N]", "점수 s[1..N] 의 N 개 레벨")}</b>
                  {t(E, ".", "이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "play every level once", "모든 레벨을 한 번씩 플레이")}</b>
                  {t(E, " and collect every score.",
                        "해서 모든 점수를 모아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "total score (sum of all s[i])", "총 점수 (모든 s[i] 의 합)")}</b>
                  {t(E, ".", "을 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Sim — play levels one by one, watch total grow
    {
      type: "sim",
      narr: t(E,
        "Tap 'Play next level' to play levels one at a time.\nEach level's score is added to the running total.\nAfter all N levels, the total = sum of every score.",
        "'다음 레벨' 을 눌러 레벨을 한 개씩 플레이.\n매 레벨의 점수가 총합에 더해져요.\n모든 N 레벨 후, 총합 = 모든 점수의 합."),
    },
    // 1-3: Quiz
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
        "맞아! 10 + 20 + 30 = 60이에요."),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Try it yourself! What is the total score for levels [10, 20, 30]?", "직접 해보자! 레벨 [10, 20, 30]의 총 점수는?"),
      question: t(E,
        "Scores = [10, 20, 30]. Enter the total:",
        "점수 = [10, 20, 30]. 총합을 입력해:"),
      hint: t(E,
        "Add up the scores from every level.",
        "모든 레벨의 점수를 더해 봐."),
      answer: 60,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMobileGameCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Read the N scores; total = sum of scores. One-liner in Python. Sections build it one piece at a time.",
        "N 개의 점수를 읽고 합 계산. Python 한 줄. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMobileGameSections(E),
    },
  ];
}
