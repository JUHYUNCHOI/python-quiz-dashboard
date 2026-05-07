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
        "The Chinese zodiac assigns one of 12 animals to each year, repeating in the fixed cycle Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig, Rat (then Ox again).\nBessie was born in the Year of the Cow (Ox). Cows make statements like \"X was born in the previous/next Dragon year relative to Y\". Chain the statements to compute, for each query cow, how many years APART she is from Bessie.",
        "십이지는 매년 12 동물 (소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지, 쥐) 을 정해진 순서로 돌려가며 써요.\nBessie는 소띠 해에 태어났어요. 소들이 \"X 는 Y 의 직전/직후 용띠 해에 태어났다\" 같은 진술을 해요. 진술을 연결해 각 쿼리 소가 Bessie와 몇 년 차이가 나는지 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc02"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Year of the Cow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #1</div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "Chinese zodiac cycles through 12 animals", "십이지가 12 가지 동물을 순환")}</b>
                  {t(E, " each year, in a fixed order (Ox, Tiger, Rabbit, Dragon, ...).",
                        " 해요 (소, 호랑이, 토끼, 용, ... 의 정해진 순서).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie was born in the ", "Bessie는 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "Year of the Cow (Ox)", "소띠 해")}</b>
                  {t(E, ".", " 에 태어났어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Cows make statements like ", "소들이 ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "\"X was born in the previous/next ANIMAL year relative to Y\"", "\"X 는 Y 의 직전/직후 ANIMAL 해에 태어났다\"")}</b>
                  {t(E, ".", " 같은 진술을 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "For each query cow, print ", "각 쿼리 소에 대해 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "how many years apart she is from Bessie", "Bessie와의 나이 차이 (연도 차이)")}</b>
                  {t(E, " (positive = older).", " 를 출력해요 (양수 = 더 나이 많음).")}
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
        "2021 - 12 = 2009. 이전 소띠 해는 항상 정확히 12년 전이에요."),
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
        "Maintain a year-offset per cow (Bessie = 0). For each statement 'X was born in the previous/next ANIMAL year relative to Y', compute modular distance to that animal in the 12-cycle (never 0 — use 12).",
        "소별 연도 오프셋 유지 (Bessie = 0). 각 진술 'X 가 Y 의 직전/직후 ANIMAL 해' 에 대해 12-주기에서 그 동물까지의 모듈러 거리 계산 (0 이면 12 사용)."),
      content: (
        <div style={{ padding: 16, fontSize: 12, color: C.dim, fontWeight: 400, textAlign: "center" }}>
          {t(E, "↓ code section by section below.", "↓ 코드 섹션이 아래에 한 단락씩 나와요.")}
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
