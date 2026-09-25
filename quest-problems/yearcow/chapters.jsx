import { C, t } from "@/components/quest/theme";
import { getYearCowWalk, ZodiacCircleSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeYearCowCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Chain the cows' statements to find how many years apart each one is from Bessie.",
        "소들이 한 말을 이어 붙여 Bessie 와 몇 살 차이인지 알아내요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udc02"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Year of the Cow</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2021 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "For each query cow, output how many years apart she is from Bessie.",
                "물어보는 소마다 Bessie 와 몇 년 차이인지를 출력해요.")}
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
                  {t(E, "The ", "")}
                  <b style={{ color: "#d97706" }}>{t(E, "Chinese zodiac cycles through 12 animals", "십이지는 동물 12 가지를 돌려가며 써요")}</b>
                  {t(E, " each year, in a fixed order (Ox, Tiger, Rabbit, Dragon, ...).",
                        " — 소, 호랑이, 토끼, 용, ... 순서는 늘 같아요.")}
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
                  {t(E, "For each query cow, print ", "물어보는 소마다 ")}
                  <b style={{ color: "#15803d" }}>{t(E, "how many years apart she is from Bessie", "Bessie와의 나이 차이 (연도 차이)")}</b>
                  {t(E, " (positive = older).", " 를 출력해요 (양수 = 더 나이 많음).")}
                </div>
              </div>
            </div>
          </div>

          <ZodiacCircleSim E={E} />
        </div>),
    },
    // 1-1b: 입출력 형식 + 제약 (USACO 원문) — 선생님 2026-07-27 시즌 표준화
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive?  N, then N eight-word statements.",
        "입력은 진술 개수 N 다음에, N 개의 진술 문장으로 들어와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of statements", "— 진술 개수")}</span></div>
              <div style={{ marginTop: 4, paddingLeft: 10, borderLeft: "2px solid #fde68a" }}>
                <div><span style={{ color: "#92400e", fontWeight: 800 }}>X born in previous/next ANIMAL year from Y</span></div>
                <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "↑ this line repeats N times", "↑ 이 줄이 N 번 반복")}</div>
              </div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#ecfdf5", border: "2px solid #6ee7b7", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One integer: how many years apart Bessie and Elsie's birth years are.",
                  "정수 하나: Bessie 와 Elsie 의 태어난 해가 몇 년 차이인지 출력해요.")}
            </div>
          </div>
          {/* 제약 */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ N ≤ 100</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 2 }}>{t(E, "cow names: up to 10 characters, a-z or A-Z", "소 이름은 최대 10글자, a-z 또는 A-Z")}</div>
            </div>
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The zodiac repeats every 12 years. 2021 is an Ox year. What is the previous Ox year?", "십이지는 12년마다 되풀이돼요. 2021년은 소띠 해예요."),
      question: t(E,
        "Zodiac repeats every 12 years. Previous Ox year from 2021?",
        "십이지는 12년마다 되풀이돼요. 2021년보다 앞선 소띠 해는 언제일까요?"),
      options: [
        t(E, "2009", "2009"),
        t(E, "2010", "2010"),
        t(E, "2015", "2015"),
      ],
      correct: 0,
      explain: t(E,
        "2021 - 12 = 2009. The previous Ox year is always exactly 12 years before.",
        "12년마다 같은 동물이 돌아오니 앞선 소띠 해는 늘 12년 전이에요. 2021 - 12 = 2009 예요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many animals are in the zodiac cycle?", "십이지에는 동물이 몇 마리 있을까요?"),
      question: t(E,
        "How many animals in the zodiac cycle?",
        "십이지 한 바퀴에는 동물이 몇 마리 있을까요?"),
      hint: t(E,
        "Re-read the problem statement — count the listed animals.",
        "문제를 다시 읽고 적힌 동물을 세어 봐요."),
      answer: 12,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeYearCowCh2(E, lang = "py") {
  return [
    // 2-1: CodeWalk
    {
      type: "yearcow-walk",
      narr: t(E,
        "Track each cow's year-offset from Bessie, building the code piece by piece.",
        "소마다 Bessie 를 0 으로 놓은 연도 차이를 적어 두며 코드를 쌓아요."),
    },
  ];
}
