import { C, t } from "@/components/quest/theme";
import { getRevEngSections } from "./components";
import { PeelSim, StuckSim } from "./sims";

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
    /* 1-3: **중복이 없어도 LIE 일 수 있다** — 이 문제의 진짜 함정 (2026-09-21 추가).
       pedagogy 검토: *"1-2 퀴즈는 '같은 입력이면 같은 출력' 만 가르친다. 그런데
       입력이 **전부 달라도** LIE 일 수 있다는 걸 quest 어디에서도 안 보여준다.
       그러니 학생은 '이미 퀴즈에서 다 배운 거 아닌가?' 인 채로 다음 알고리즘을 받아 적는다."*
       원문 샘플 4번이 바로 그 반례다. */
    {
      type: "reveal",
      narr: t(E,
        "All four inputs are different — is that enough?",
        "입력이 네 개 다 달라요. 그러면 된 걸까요?"),
      content: <StuckSim E={E} />,
    },
    /* 1-4: 떼어내기를 **눈으로**.
       그전에는 같은 것을 정적인 글로 설명했다. 선생님: *"주절히 설명하기보다는
       눈에 보이게끔 시뮬로 쉽게 보여달라"*. 파일에 남아 있던
       `RevEngDeepAuditSim` 은 "문제와 안 맞는 모델" 이라 아무 데서도 안 쓰이는
       **죽은 코드**였다 — 그래서 이 quest 는 시뮬이 0개였다. */
    {
      type: "reveal",
      narr: t(E,
        "So how do we check? Peel the rows off, one if at a time.",
        "그럼 어떻게 가려낼까요? if 하나씩 만들며 줄을 떼어내 봐요."),
      content: <PeelSim E={E} />,
    },

    // 1-4: Input
    {
      type: "input",
      narr: t(E,
        "Input [0] answers 1, input [1] answers 0.\nCan one program do both?\nEnter 1 for OK, 0 for LIE.", "입력 [0] 은 1, 입력 [1] 은 0 이에요.\n이런 프로그램을 만들 수 있을까요?\nOK 면 1, LIE 면 0 을 넣어요."),
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
