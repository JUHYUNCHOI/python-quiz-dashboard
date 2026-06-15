import { C, t } from "@/components/quest/theme";
import { getRevEngSections } from "./components";

/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeRevEngCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Elsie's program is a chain of if / else-if / else statements. Each statement looks at ONE variable and returns 0 or 1, like:\n  if (b[1]==1) return 1;\n  else if (b[0]==0) return 0;\n  else return 1;\nWe are given M inputs (each a length-N string of 0/1) with their claimed outputs. Decide whether SOME such program could produce all of them: print OK, otherwise LIE.",
        "Elsie의 프로그램은 if / else-if / else 가 줄줄이 이어진 형태예요. 각 문장은 변수 하나만 보고 0이나 1을 반환해요. 예:\n  if (b[1]==1) return 1;\n  else if (b[0]==0) return 0;\n  else return 1;\nM개의 입력(각각 길이 N의 0/1 문자열)과 주장된 출력이 주어져요. 그런 프로그램으로 모두 만들 수 있으면 OK, 아니면 LIE를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd27"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#8b5cf6" }}>Reverse Engineering</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #3</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output OK if a chain of if / else-if / else (each testing one variable) could produce all the outputs, else LIE.",
                "if / else-if / else 연쇄 (각 문장이 변수 하나 검사)로 모든 출력을 만들 수 있으면 OK, 아니면 LIE 출력.")}
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "M test cases", "M 개의 테스트 케이스")}</b>
                  {t(E, "; each has a binary input array of length N and an expected boolean output.",
                        "; 각 케이스는 길이 N 의 이진 입력 배열과 기대 출력 (0/1) 을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Could a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "chain of if / else-if / else statements (each testing ONE variable)", "if / else-if / else 문장들의 연쇄 (각 문장은 변수 하나만 검사)")}</b>
                  {t(E, " produce all the claimed outputs?",
                        " 으로 주장된 모든 출력을 만들 수 있을까요?")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "OK if such a program exists, else LIE", "그런 프로그램이 존재하면 OK, 아니면 LIE")}</b>
                  {t(E, ".", ".")}
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
        "Input \"01\" gives output 1.\nInput \"01\" gives output 0.\nSame input, different output.\nWhat's the verdict?", "입력 \"01\"이 출력 1. 입력 \"01\"이 출력 0. 같은 입력, 다른 출력. 판정은?"),
      question: t(E,
        "Input [0,1]->1 and [0,1]->0. Same input, different output. Result?",
        "입력 [0,1]->1 그리고 [0,1]->0. 같은 입력, 다른 출력. 결과?"),
      options: [
        t(E, "LIE - impossible to be consistent", "LIE - 일관될 수 없어"),
        t(E, "OK - a program can handle this", "OK - 프로그램이 처리 가능"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If the same input produces different outputs, no deterministic program can be consistent. It's a LIE.",
        "맞아! 같은 입력이 다른 출력을 만들면, 어떤 결정적 프로그램도 일관될 수 없어요. LIE야."),
    },
    // 1-3: Worked example of the greedy peel
    // TODO: sim redesign — RevEngDeepAuditSim models a SINGLE-variable if/else, which is
    // NOT the real problem (a chain of if/else-if/else). Replaced with a static worked
    // example of the correct greedy peel. A new interactive peel sim should be built later.
    {
      type: "reveal",
      narr: t(E,
        "The real idea: an if-statement keyed on one variable=value works only if EVERY remaining row with that variable=value shares the same output. Peel those rows off, then repeat on what's left. If everything peels away → OK. If you ever get stuck → LIE.",
        "핵심 아이디어: '어떤 변수=값' 으로 거는 if 문은, 그 조건에 맞는 남은 행들의 출력이 전부 같을 때만 만들 수 있어요. 그런 행들을 떼어내고, 남은 것으로 다시 반복해요. 전부 떼어내지면 → OK, 도중에 막히면 → LIE."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 12, padding: 14, fontSize: 13, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
              {t(E, "Worked example (sample case 2)", "예제 풀이 (샘플 2번)")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, marginBottom: 10 }}>
              00 → 0{"\n"}01 → 1{"\n"}10 → 1{"\n"}11 → 1
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>① {t(E, "Rows with variable[0]==1: \"10\"→1, \"11\"→1 — both output 1. Peel them off.", "변수[0]==1인 행: \"10\"→1, \"11\"→1 — 둘 다 출력 1. 떼어냄.")}</div>
              <div>② {t(E, "Left: \"00\"→0, \"01\"→1. Rows with variable[1]==1: just \"01\"→1. Peel it.", "남음: \"00\"→0, \"01\"→1. 변수[1]==1인 행: \"01\"→1뿐. 떼어냄.")}</div>
              <div>③ {t(E, "Left: \"00\"→0. One row, peel it (e.g. else return 0).", "남음: \"00\"→0. 한 행, 떼어냄 (else return 0).")}</div>
              <div style={{ color: "#15803d", fontWeight: 700, marginTop: 4 }}>
                ✓ {t(E, "Everything peeled away → OK", "전부 떼어짐 → OK")}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Input [0]->1 and [1]->0.\nCan a program do this?\nCheck: if arr[0]==0 return 1 else return 0.\nWorks!\nEnter 1 for OK, 0 for LIE.", "입력 [0]->1 그리고 [1]->0.\n프로그램이 가능할까?\n확인: if arr[0]==0 return 1 else return 0.\n작동해요!\nOK이면 1, LIE이면 0 입력."),
      question: t(E,
        "[0]->1, [1]->0. Is it OK? (1=OK, 0=LIE)",
        "[0]->1, [1]->0. OK일까요? (1=OK, 0=LIE)"),
      hint: t(E,
        "Try a tiny if/else on arr[0] and see if it matches both cases.",
        "arr[0] 에 대한 작은 if/else 를 시도해 두 케이스 모두 맞는지 봐."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeRevEngCh2(E, lang = "py") {
  return [
    // 2-1: Progressive code
    {
      type: "progressive",
      narr: t(E,
        "Repeatedly find a variable=value whose remaining rows ALL share one output, peel them off, and loop. If every row peels away → OK, otherwise LIE. Sections build it one piece at a time.",
        "남은 행들의 출력이 전부 같은 '변수=값' 을 찾아 떼어내기를 반복해요. 전부 떼어지면 → OK, 아니면 LIE. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getRevEngSections(E),
    },
  ];
}
