import { C, t } from "@/components/quest/theme";
import { getYearCowSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "# Zodiac animals in order (12-year cycle)",
  "animals = ['Ox','Tiger','Rabbit','Dragon','Snake',",
  "           'Horse','Goat','Monkey','Rooster','Dog',",
  "           'Pig','Rat']",
  "",
  "N = int(input())",
  "year = 0  # Bessie's birth year (relative)",
  "",
  "for _ in range(N):",
  "    line = input().split()",
  "    # 'born in <prev/next> <Animal> year from <name>'",
  "    direction = line[2]  # 'previous' or 'next'",
  "    animal = line[3]",
  "    idx = animals.index(animal)",
  "    # current animal at year",
  "    cur_idx = year % 12",
  "    if direction == 'previous':",
  "        diff = (cur_idx - idx) % 12",
  "        if diff == 0: diff = 12",
  "        year -= diff",
  "    else:",
  "        diff = (idx - cur_idx) % 12",
  "        if diff == 0: diff = 12",
  "        year += diff",
  "",
  "print(abs(year))",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeYearCowCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "The Chinese zodiac repeats every 12 years.\nBessie knows relationships like 'my friend was born in the previous Dragon year'.\nChain these to find the total age difference!", "십이지는 12년마다 반복돼요. Bessie는 '내 친구는 이전 용띠 해에 태어났어' 같은 관계를 알고 있어요. 이들을 연결해서 총 나이 차이를 구해요!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udc02"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Year of the Cow</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #1</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: The zodiac cycle is 12 years. 'Previous X year' means go back 1-12 years to find that animal.\nChain the relationships to compute total offset.",
              "핵심: 십이지 주기는 12년.\n'이전 X년'은 그 동물을 찾기 위해 1-12년 뒤로 가는 것.\n관계를 연결해서 총 오프셋을 계산.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The zodiac repeats every 12 years. 2021 is an Ox year. What is the previous Ox year?", "십이지는 12년마다 반복돼요. 2021년은 소띠 해예요. 이전 소띠 해는?"),
      question: t(E,
        "Zodiac repeats every 12 years. Previous Ox year from 2021?",
        "십이지는 12년 주기. 2021년에서 이전 소띠 해는?"),
      options: [
        t(E, "2009", "2009"),
        t(E, "2010", "2010"),
        t(E, "2015", "2015"),
      ],
      correct: 0,
      explain: t(E,
        "2021 - 12 = 2009. The previous Ox year is always exactly 12 years before.",
        "2021 - 12 = 2009. 이전 소띠 해는 항상 정확히 12년 전이예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many animals are in the zodiac cycle?", "십이지에는 동물이 몇 마리예요?"),
      question: t(E,
        "How many animals in the zodiac cycle?",
        "십이지 주기에 동물 몇 마리?"),
      hint: t(E,
        "The Chinese zodiac has exactly 12 animals in its cycle.",
        "십이지에는 정확히 12마리의 동물이 있어요."),
      answer: 12,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeYearCowCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "Process each relationship.\nFor 'previous Animal', compute how many years back (1-12).\nFor 'next Animal', compute how many forward.\nO(N) time.", "각 관계를 처리. '이전 동물'이면 몇 년 전인지 (1-12) 계산. '다음 동물'이면 앞으로 몇 년인지. O(N) 시간."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(N)</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Keep a running year offset.\nFor each 'previous/next Animal' clue, compute the modular distance in the 12-animal cycle (never 0, use 12 instead).",
              "연도 오프셋을 누적.\n각 '이전/다음 동물' 단서에 대해 12동물 주기에서 모듈러 거리 계산 (0이면 12 사용).")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getYearCowSections(E),
    },
  ];
}
