import { C, t } from "@/components/quest/theme";
import { getGiftsSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "N, K = map(int, input().split())",
  "",
  "# Each person gets at least N // K gifts",
  "base = N // K",
  "# N % K people get one extra gift",
  "extra = N % K",
  "",
  "print(extra)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGiftsCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "There are N gifts to distribute among K people as evenly as possible — every person gets at least N/K (integer division), and some get one extra to use up the leftover.\nPrint how many people receive an EXTRA gift.",
        "N개의 선물을 K명에게 최대한 고르게 나눠줘요 — 모두가 최소 N/K (정수 나눗셈) 개를 받고, 일부는 남은 선물을 위해 1개 더 받아요.\n추가 선물을 받는 사람의 수를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83c\udf81"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Gifts</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P2</div>
          </div>

          <div style={{ background: "#fef3c7", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N gifts and K people", "N개의 선물과 K명")}</b>
                  {t(E, ".", "이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Distribute the gifts ", "선물을 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "as evenly as possible", "최대한 고르게")}</b>
                  {t(E, " — every person gets the base count, and some get one extra to cover the leftover.",
                        " 나눠요 — 모두가 기본 개수를 받고, 일부가 남은 만큼 1개 더 받아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "how many people receive an extra gift", "추가 선물을 받는 사람의 수")}</b>
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
        "10 gifts among 3 people: each gets 3, with 1 left over. Who gets the extra?", "선물 10개를 3명에게: 각각 3개씩, 1개 남아. 누가 추가 선물을 받을까?"),
      question: t(E,
        "10 gifts, 3 people. Each gets 3 (total 9). How many leftover?",
        "선물 10개, 3명. 각각 3개씩 (총 9개). 남는 선물은?"),
      options: [
        t(E, "0", "0개"),
        t(E, "1", "1개"),
        t(E, "3", "3개"),
      ],
      correct: 1,
      explain: t(E,
        "Correct! 10 mod 3 = 1. One person gets an extra gift.",
        "맞아! 10 mod 3 = 1. 한 명이 추가 선물을 받아요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If you have 10 gifts and 3 people, how many people get an extra gift?", "선물 10개와 3명이 있으면, 추가 선물을 받는 사람은 몇 명?"),
      question: t(E,
        "N=10, K=3. How many people get an extra gift?",
        "N=10, K=3. 추가 선물을 받는 사람은 몇 명?"),
      hint: t(E,
        "10 % 3 = 1. One person gets 4 gifts, the other two get 3.",
        "10 % 3 = 1. 한 명이 4개, 나머지 두 명이 3개를 받아요."),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGiftsCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "If N gifts are split as evenly as possible across K people, each person gets at least N//K gifts. The remainder N % K people get ONE EXTRA gift each — that's the answer.",
        "N 선물을 K 명에게 최대한 고르게 나누면, 모두 최소 N//K 개씩. 남은 N % K 명이 1 개씩 더 받음 — 그게 답."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read N, K", "N, K 읽기"), code: "N, K = map(int, input().split())", color: "#d97706" },
              { n: 2, label: t(E, "Each person base = N // K", "1 인당 기본 = N // K"), code: "base = N // K", color: "#7c3aed" },
              { n: 3, label: t(E, "Leftover = N % K", "나머지 = N % K"), code: "extra = N % K", color: "#0891b2" },
              { n: 4, label: t(E, "Print extra", "extra 출력"), code: "print(extra)", color: "#16a34a" },
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
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(1)</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "two arithmetic operations", "산술 연산 두 번")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getGiftsSections(E),
    },
  ];
}
