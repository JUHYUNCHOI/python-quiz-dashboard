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
        "You have N gifts to distribute among K people as evenly as possible. Some people may get one extra gift. How many people get an extra?",
        "N개의 선물을 K명에게 최대한 고르게 나눠야 해. 일부는 선물을 하나 더 받을 수 있어. 몇 명이 추가 선물을 받을까?"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83c\udf81"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Gifts</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2024 P2</div>
          <div style={{ marginTop: 12, background: "#fef3c7", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: Use division and modulo. N // K gives the base amount per person. N % K gives how many people receive one extra.",
              "핵심: 나눗셈과 나머지를 사용해. N // K는 1인당 기본 수량. N % K는 추가 선물을 받는 사람 수.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "10 gifts among 3 people: each gets 3, with 1 left over. Who gets the extra?",
        "선물 10개를 3명에게: 각각 3개씩, 1개 남아. 누가 추가 선물을 받을까?"),
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
        "맞아! 10 mod 3 = 1. 한 명이 추가 선물을 받아."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "If you have 10 gifts and 3 people, how many people get an extra gift?",
        "선물 10개와 3명이 있으면, 추가 선물을 받는 사람은 몇 명?"),
      question: t(E,
        "N=10, K=3. How many people get an extra gift?",
        "N=10, K=3. 추가 선물을 받는 사람은 몇 명?"),
      hint: t(E,
        "10 % 3 = 1. One person gets 4 gifts, the other two get 3.",
        "10 % 3 = 1. 한 명이 4개, 나머지 두 명이 3개를 받아."),
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
        "Just one division and one modulo operation. O(1) time!",
        "나눗셈 한 번, 나머지 한 번이면 돼. O(1) 시간!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(1)</div>
          <div style={{ marginTop: 12, background: "#fef3c7", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "The answer is simply N % K. No loops needed!",
              "답은 간단히 N % K야. 반복문이 필요 없어!")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.",
        "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getGiftsSections(E),
    },
  ];
}
