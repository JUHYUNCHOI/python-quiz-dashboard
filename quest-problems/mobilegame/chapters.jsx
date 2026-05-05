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
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udcf1"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Mobile Game</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P2</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "A mobile game has ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N levels with scores s[1..N]", "점수 s[1..N] 의 N 개 레벨")}</b>
                  {t(E, ".", "이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "play every level once", "모든 레벨을 한 번씩 플레이")}</b>
                  {t(E, " and collect every score.",
                        "해서 모든 점수를 모아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
        "맞아! 10 + 20 + 30 = 60이에요."),
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
        "Read all N level scores; total score = sum of the scores. One-line in Python.",
        "N 개의 레벨 점수 읽기; 총 점수 = 점수의 합. Python 한 줄."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N", "N 읽기"), code: "N = int(input())", color: "#d97706" },
              { n: 2, label: t(E, "Read scores", "점수 읽기"), code: "scores = list(map(int, input().split()))", color: "#7c3aed" },
              { n: 3, label: t(E, "Sum them", "합산"), code: "total = sum(scores)", color: "#0891b2" },
              { n: 4, label: t(E, "Print total", "total 출력"), code: "print(total)", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(N)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single pass to sum", "선형 한 번 합산")}</div>
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
