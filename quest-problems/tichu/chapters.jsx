import { C, t } from "@/components/quest/theme";
import { getTichuSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N = int(input())",
  "",
  "# C(N, 2) = N * (N-1) / 2",
  "# Number of ways to pick 2 cards from N",
  "result = N * (N - 1) // 2",
  "",
  "print(result)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTichuCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "In Tichu, a 'pair' is two cards of the same value chosen from your hand. You have N cards.\nPrint the number of distinct pairs you could possibly play (i.e., the number of ways to choose 2 of your N cards).",
        "티추 카드 게임에서 '페어' 는 손에서 같은 값의 카드 2장이에요. 손에 N 장의 카드가 있어요.\n낼 수 있는 페어의 가짓수 (즉, N 장 중 2 장을 뽑는 가짓수) 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udccf"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#dc2626" }}>Tichu</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2023 P4</div>
          </div>

          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "You have a ", "손에 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "hand of N cards", "N 장의 카드")}</b>
                  {t(E, ".", " 가 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "number of ways to pick 2 cards from N", "N 장 중 2 장을 뽑는 가짓수")}</b>
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
        "If you have 5 cards, how many ways can you pick 2? C(5,2) = 5*4/2 = 10.", "카드가 5장이면, 2장을 고르는 방법은? C(5,2) = 5*4/2 = 10."),
      question: t(E,
        "N=5 cards. How many ways to pick 2? C(5,2) = ?",
        "N=5장. 2장을 고르는 방법 수? C(5,2) = ?"),
      options: [
        t(E, "5", "5"),
        t(E, "10", "10"),
        t(E, "20", "20"),
        t(E, "15", "15"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! C(5,2) = 5*4/2 = 10 ways.",
        "맞아! C(5,2) = 5*4/2 = 10가지예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Calculate C(5,2) yourself!", "직접 C(5,2)를 계산해봐요!"),
      question: t(E,
        "N=5. Enter C(5,2):",
        "N=5. C(5,2)를 입력해:"),
      hint: t(E,
        "C(5,2) = 5 * 4 / 2 = 10.",
        "C(5,2) = 5 * 4 / 2 = 10."),
      answer: 10,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeTichuCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Direct formula: ways to pick 2 from N is C(N, 2) = N · (N − 1) / 2.",
        "직접 공식: N 장 중 2 장 뽑는 가짓수 = C(N, 2) = N · (N − 1) / 2."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N", "N 읽기"), code: "N = int(input())", color: "#dc2626" },
              { n: 2, label: t(E, "Apply formula", "공식 적용"), code: "ans = N * (N - 1) // 2", color: "#7c3aed" },
              { n: 3, label: t(E, "Print", "출력"), code: "print(ans)", color: "#16a34a" },
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
          <div style={{ marginTop: 12, background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#dc2626" }}>O(1)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "single arithmetic", "한 번 산술")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getTichuSections(E),
    },
  ];
}
