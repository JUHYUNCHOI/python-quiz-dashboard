import { C, t } from "@/components/quest/theme";
import { getGiftsSections, GiftsSim } from "./components";

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
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Gifts</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef3c7", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Output the number of people who receive an extra gift after the most-even split.",
                "최대한 고른 분배 후 추가 선물을 받는 사람의 수를 출력.")}
            </div>
          </div>

          <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There are ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "N gifts and K people", "N개의 선물과 K명")}</b>
                  {t(E, ".", "이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Distribute the gifts ", "선물을 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "as evenly as possible", "최대한 고르게")}</b>
                  {t(E, " — every person gets the base count, and some get one extra to cover the leftover.",
                        " 나눠요 — 모두가 기본 개수를 받고, 일부가 남은 만큼 1개 더 받아요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
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
    // 1-3: Sim — play with N and K
    {
      type: "reveal",
      narr: t(E,
        "Drag N and K. Watch how the gifts split — most-even share for everyone, then the leftovers go out as ⭐ extras. Count the stars.",
        "N과 K를 움직여 봐. 모두에게 최대한 고르게 나눠 준 뒤, 남는 선물이 ⭐로 가는 게 보여. 별 개수를 세어 봐."),
      content: <GiftsSim E={E} />,
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "If you have 10 gifts and 3 people, how many people get an extra gift?", "선물 10개와 3명이 있으면, 추가 선물을 받는 사람은 몇 명?"),
      question: t(E,
        "N=10, K=3. How many people get an extra gift?",
        "N=10, K=3. 추가 선물을 받는 사람은 몇 명?"),
      hint: t(E,
        "After base-share goes out, how many gifts are left over to hand out as extras?",
        "기본 몫을 나눠 준 뒤 남은 선물은 추가 선물로 가니까 — 몇 개 남을까?"),
      answer: 1,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeGiftsCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Even split → each person gets at least N//K. The remaining N % K people get one extra each — that's the answer. Sections build it one piece at a time.",
        "고른 분배 → 모두 최소 N//K. 남은 N % K 명이 1 개씩 더 받음 — 그게 답. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getGiftsSections(E),
    },
  ];
}
