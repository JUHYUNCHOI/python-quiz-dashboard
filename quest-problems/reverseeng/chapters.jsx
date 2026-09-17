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
        "Elsie 의 프로그램은 if / else-if / else 가 줄줄이 이어진 모습이에요.\n문장 하나가 변수 하나만 보고 0 이나 1 을 돌려줘요.\n  if (b[1]==1) return 1;\n  else if (b[0]==0) return 0;\n  else return 1;\n입력 M 개와 이렇게 나왔다는 출력이 주어져요.\n그런 프로그램으로 다 만들 수 있으면 OK, 아니면 LIE 를 출력해요."),
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
                "문장마다 변수 하나만 보는 if / else-if / else 를 이어 붙여서\n출력을 모두 만들 수 있으면 OK, 아니면 LIE 를 출력해요.")}
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
                        " 가 있어요. 케이스마다 0 과 1 로 된 길이 N 의 입력 배열과\n나와야 하는 출력 (0 또는 1) 이 짝지어져 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Could a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "chain of if / else-if / else statements (each testing ONE variable)", "변수 하나만 보는 if / else-if / else 를 이어 붙인 프로그램")}</b>
                  {t(E, " produce all the claimed outputs?",
                        " 으로 저 출력을 전부 만들어 낼 수 있을까요?")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "OK if such a program exists, else LIE", "그런 프로그램을 만들 수 있으면 OK, 없으면 LIE")}</b>
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
        "Input \"01\" gives output 1.\nInput \"01\" gives output 0.\nSame input, different output.\nWhat's the verdict?", "같은 입력 \"01\" 이 한 번은 1, 한 번은 0 을 냈어요. 답은 뭘까요?"),
      question: t(E,
        "Input [0,1]->1 and [0,1]->0. Same input, different output. Result?",
        "입력 [0,1] 이 1 도 되고 0 도 됐어요.\n같은 입력인데 출력이 달라요. 답은 무엇일까요?"),
      options: [
        t(E, "LIE - impossible to be consistent", "LIE — 앞뒤가 맞을 수 없어요"),
        t(E, "OK - a program can handle this", "OK — 프로그램이 해낼 수 있어요"),
      ],
      correct: 0,
      explain: t(E,
        "Correct! If the same input produces different outputs, no deterministic program can be consistent. It's a LIE.",
        "맞아요. 같은 입력을 넣으면 프로그램은 늘 같은 답을 내요.\n그런데 출력이 다르니까 이건 LIE 예요."),
    },
    // 1-3: Worked example of the greedy peel
    // TODO: sim redesign — RevEngDeepAuditSim models a SINGLE-variable if/else, which is
    // NOT the real problem (a chain of if/else-if/else). Replaced with a static worked
    // example of the correct greedy peel. A new interactive peel sim should be built later.
    {
      type: "reveal",
      narr: t(E,
        "The real idea: an if-statement keyed on one variable=value works only if EVERY remaining row with that variable=value shares the same output. Peel those rows off, then repeat on what's left. If everything peels away → OK. If you ever get stuck → LIE.",
        "'변수=값' 으로 거는 if 문은 그 조건에 맞는 남은 행의 출력이\n전부 같을 때만 쓸 수 있어요.\n그런 행을 떼어내고 남은 것으로 다시 해 봐요.\n전부 떼어지면 OK, 도중에 막히면 LIE 예요."),
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
              <div>① {t(E, "Rows with variable[0]==1: \"10\"→1, \"11\"→1 — both output 1. Peel them off.", "변수[0]==1 인 행은 \"10\"→1 과 \"11\"→1 이에요.\n둘 다 출력이 1 이라서 떼어낼 수 있어요.")}</div>
              <div>② {t(E, "Left: \"00\"→0, \"01\"→1. Rows with variable[1]==1: just \"01\"→1. Peel it.", "이제 \"00\"→0 과 \"01\"→1 이 남았어요.\n변수[1]==1 인 행은 \"01\"→1 하나뿐이라 떼어내요.")}</div>
              <div>③ {t(E, "Left: \"00\"→0. One row, peel it (e.g. else return 0).", "마지막으로 \"00\"→0 한 행이 남아요.\nelse return 0 으로 떼어내면 돼요.")}</div>
              <div style={{ color: "#15803d", fontWeight: 700, marginTop: 4 }}>
                ✓ {t(E, "Everything peeled away → OK", "전부 떼어냈으니 OK 예요")}
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
        "Input [0]->1 and [1]->0.\nCan a program do this?\nCheck: if arr[0]==0 return 1 else return 0.\nWorks!\nEnter 1 for OK, 0 for LIE.", "입력 [0] 은 1, 입력 [1] 은 0 이에요.\n이런 프로그램을 만들 수 있을까요?\nif arr[0]==0 return 1 else return 0 을 넣어 보면 잘 맞아요.\nOK 이면 1, LIE 이면 0 을 넣으세요."),
      question: t(E,
        "[0]->1, [1]->0. Is it OK? (1=OK, 0=LIE)",
        "[0] 은 1, [1] 은 0 이에요. OK 일까요? (1=OK, 0=LIE)"),
      hint: t(E,
        "Try a tiny if/else on arr[0] and see if it matches both cases.",
        "arr[0] 을 보는 짧은 if/else 를 만들어서\n두 경우가 다 맞는지 보세요."),
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
        "남은 행의 출력이 전부 같아지는 '변수=값' 을 찾아 떼어내기를 되풀이해요.\n전부 떼어지면 OK, 아니면 LIE 예요.\n아래에서 코드를 한 부분씩 쌓아 갈게요."),
      sections: getRevEngSections(E),
    },
  ];
}
