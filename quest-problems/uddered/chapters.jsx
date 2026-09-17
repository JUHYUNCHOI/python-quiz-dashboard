import { C, t } from "@/components/quest/theme";
import { getUdderedSections, UdderedRecitalSim } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
/* 2026-09-17: 여기 있던 SOLUTION_CODE 를 지웠다 — export 만 되고 어디서도
   import 되지 않는 죽은 사본이었다. 학생이 보는 코드는 components.jsx 의
   FULL_PY / FULL_CPP 다. 표본 대조에서 이 사본이 이미 **내용이 갈라져** 있는
   quest 도 있었다 — 백업이 아니라 함정이었다. 판정: 감사·프론트 둘 다 '지운다'. */


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeCh1 (3 steps: reveal / quiz / input)
   ═══════════════════════════════════════════════════════════════ */
export function makeUdderedCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Bessie has a custom 26-letter alphabet order. She hears a string S; each character must be read in order, but she has to FULLY recite the alphabet at least once between any two characters that move backward in her order (or stay the same).\nPrint the MINIMUM number of full alphabet recitations she needs to read all of S.",
        "알파벳을 몇 번 외워야 S 를 다 읽을 수 있을까요?"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd24"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#dc2626" }}>Uddered but not Herd</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Jan 2021 Bronze #1</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fef2f2", border: "1.5px solid #dc2626", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.5 }}>
              {t(E,
                "Output the minimum number of full alphabet recitations needed to read all of S.",
                "S 를 다 읽으려면 알파벳을 최소 몇 번 외워야 하는지 출력해요.")}
            </div>
          </div>

          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#7f1d1d", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Bessie has a ", "Bessie에게 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "custom 26-letter alphabet order", "자기만의 26 글자 알파벳 순서")}</b>
                  {t(E, " (a permutation of a..z).",
                        " 가 있어요. a~z 를 뒤섞어 놓은 거예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "She hears string S; she reads each letter in order. To read the next letter when it ", "S 를 들으면 글자를 하나씩 순서대로 읽어요. 다음 글자가 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "comes before or equals the current letter in her order", "자기 순서에서 지금 글자보다 앞이거나 같으면")}</b>
                  {t(E, ", she must FULLY recite her alphabet first.",
                        " 먼저 알파벳을 전체 외워야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fca5a5" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "MINIMUM number of full alphabet recitations needed to read all of S", "S 를 모두 읽기 위한 최소 알파벳 외우기 횟수")}</b>
                  {t(E, ".", "를 출력해요.")}
                </div>
              </div>
            </div>
          </div>

          <UdderedRecitalSim E={E} />
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "If the alphabet order is \"abc\" and the heard string is \"ac\", how many cycles do we need?", "알파벳 순서가 \"abc\" 이고 들은 글자가 \"ac\" 예요."),
      question: t(E,
        "Alphabet: \"abc\", heard: \"ac\". How many cycles?",
        "\"abc\" 순서로 \"ac\" 를 읽으면 몇 번 외워야 할까요?"),
      options: [
        t(E, "1 cycle (a before c in order)", "1 번 (a 가 c 보다 앞이라서요)"),
        t(E, "2 cycles", "2 번"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! 'a' is at position 0, 'c' is at position 2. Since 2 > 0, no new cycle needed. Total: 1 cycle.",
        "'a' 는 0 번 자리, 'c' 는 2 번 자리예요. c 가 뒤쪽이라 다시 안 외워도 돼요. 그래서 1 번이에요."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Alphabet order is \"abc\", heard string is \"ca\". How many cycles?", "이번엔 \"abc\" 순서로 \"ca\" 를 읽어요."),
      question: t(E,
        "Alphabet: \"abc\", heard: \"ca\". How many cycles needed?",
        "\"abc\" 순서로 \"ca\" 를 읽으면 몇 번 외워야 할까요?"),
      hint: t(E,
        "Compare each letter's custom position with the previous one — when does she need to restart?",
        "옆에 붙은 두 글자의 자리를 비교해 봐요. 뒤 글자가 더 앞쪽이면 다시 외워야 해요."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeCh2 (2 steps: reveal / code)
   ═══════════════════════════════════════════════════════════════ */
export function makeUdderedCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Map each letter to its position in Bessie's custom alphabet. Scan S — when next letter's custom-position ≤ current's, recite again. Start cycle = 1. Sections build it one piece at a time.",
        "글자마다 자리 번호를 붙여 두고 S 를 하나씩 볼게요."),
      sections: getUdderedSections(E),
    },
  ];
}
