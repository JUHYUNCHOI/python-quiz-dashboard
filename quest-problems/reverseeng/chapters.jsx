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
        "Elsie's program is a chain of if / else-if / else statements. Each statement looks at ONE variable and returns 0 or 1, like:\n  if (arr[1]==1) return 1;\n  else if (arr[0]==0) return 0;\n  else return 1;\nWe are given M inputs (each a length-N string of 0/1) with their claimed outputs. Decide whether SOME such program could produce all of them: print OK, otherwise LIE.",
        "Elsie 의 프로그램은 if / else-if / else 가 줄줄이 이어진 모습이에요.\n문장 하나가 변수 하나만 보고 0 이나 1 을 돌려줘요.\n  if (arr[1]==1) return 1;\n  else if (arr[0]==0) return 0;\n  else return 1;\n입력 M 개와 이렇게 나왔다는 출력이 주어져요.\n그런 프로그램으로 다 만들 수 있으면 OK, 아니면 LIE 를 출력해요."),
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
    /* 1-2: 입출력 형식 카드 — mcc19rect2 형태 그대로(INPUT / OUTPUT / Sample / CONSTRAINTS).
       2026-09-21 quest-auditor: 지금까지 이 quest 어디에도 입출력 형식이 없어서 학생이
       코드 쪽에 가서야 T, N, M 을 처음 봤다. 제약·형식은 usaco.org cpid=1253 원문 대조 확인.
       ⚠️ 원문은 케이스 사이에 빈 줄이 있다(Consecutive test cases are separated by
       newlines) — 샘플에도 그대로 보여준다. 샘플 값은 PeelSim(OK)·StuckSim(LIE) 과
       같은 행을 재사용했다 — 새 숫자를 만들지 않기 위해서다. */
    {
      type: "reveal",
      narr: t(E,
        "How does the data arrive? First T, then each case's rows.",
        "데이터가 어떻게 들어올까요? T 부터, 그다음 케이스마다 줄이 와요."),
      content: (
        <div style={{ padding: 16, wordBreak: "keep-all" }}>
          {/* INPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "INPUT", "입력")}</div>
            <div style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8 }}>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>T</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— number of test cases", "— 테스트 케이스 개수")}</span></div>
              <div style={{ marginTop: 4 }}>{t(E, "For each test case:", "각 테스트 케이스마다:")}</div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>N M</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— string length, row count", "— 문자열 길이, 줄 개수")}</span></div>
              <div><span style={{ color: "#92400e", fontWeight: 800 }}>{"s₁ o₁"}</span> <span style={{ color: C.dim, fontSize: 11 }}>{t(E, "— row 1: a length-N 0/1 string, then its output", "— 1번째 줄: 길이 N 인 0/1 문자열과 그 출력")}</span></div>
              <div>{t(E, "⋮ (M rows in total)", "⋮ (총 M 개 줄)")}</div>
            </div>
          </div>
          {/* OUTPUT */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "OUTPUT", "출력")}</div>
            <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 10, padding: "10px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {t(E, "One line per test case: OK or LIE.",
                    "테스트 케이스마다 한 줄에 OK 또는 LIE 를 출력해요.")}
            </div>
          </div>
          {/* Sample */}
          <div style={{ marginBottom: 12, background: "#f8fafc", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#5b21b6", marginBottom: 8 }}>🔍 {t(E, "Sample", "샘플")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8 }}>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>{t(E, "input", "입력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
2 4
00 0
01 1
10 1
11 1

2 4
00 0
01 1
10 1
11 0`}
                </div>
              </div>
              <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#5b21b6", marginBottom: 4 }}>{t(E, "output", "출력")}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, lineHeight: 1.6, color: "#5b21b6", whiteSpace: "pre" }}>{`OK
LIE`}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.dim, textAlign: "center", fontStyle: "italic" }}>
              {t(E, "The blank line between cases is part of the input. Why these two verdicts differ comes next.",
                    "케이스 사이의 빈 줄도 입력의 일부예요. 왜 둘의 답이 다른지는 다음 쪽부터 봐요.")}
            </div>
          </div>
          {/* CONSTRAINTS */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.dim, marginBottom: 4 }}>{t(E, "CONSTRAINTS", "제약")}</div>
            <div style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.9 }}>
              <div>1 ≤ T ≤ 10</div>
              <div>1 ≤ N ≤ 100</div>
              <div>1 ≤ M ≤ 100</div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Quiz
    {
      type: "quiz",
      narr: t(E,
        "The same input \"01\" gave 1 once and 0 once. What's the verdict?", "같은 입력 \"01\" 이 한 번은 1, 한 번은 0 을 냈어요. 답은 뭘까요?"),
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
    /* 1-4: **중복이 없어도 LIE 일 수 있다** — 이 문제의 진짜 함정 (2026-09-21 추가).
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
    /* 1-5: 떼어내기를 **눈으로**.
       그전에는 같은 것을 정적인 글로 설명했다. 선생님: *"주절히 설명하기보다는
       눈에 보이게끔 시뮬로 쉽게 보여달라"*. 파일에 남아 있던
       `RevEngDeepAuditSim` 은 "문제와 안 맞는 모델" 이라 아무 데서도 안 쓰이는
       **죽은 코드**였다 — 그래서 이 quest 는 시뮬이 0개였다.
       2026-09-21: 죽은 코드는 components.jsx 에서 완전히 지웠다. */
    {
      type: "reveal",
      narr: t(E,
        "So how do we check? Peel the rows off, one if at a time.",
        "그럼 어떻게 가려낼까요? if 하나씩 만들며 줄을 떼어내 봐요."),
      content: <PeelSim E={E} />,
    },

    // 1-6: Input
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
    /* 2-1: 이 narr 이 예전엔 전체 알고리즘을 통째로 다시 말했다 — 1-4/1-5 시뮬 narr,
       그리고 아래 섹션의 `why` 와 네 번째로 겹쳤다. 이제 알고리즘 설명은 2번째 섹션의
       `why` 한 곳에만 두고, 여기서는 두 섹션이 무엇을 하는지만 가리킨다. */
    {
      type: "progressive",
      narr: t(E,
        "Two parts: read the input, then peel rows off.",
        "두 부분으로 봐요 — 입력을 읽는 부분, 그다음 줄을 떼어내는 부분."),
      sections: getRevEngSections(E),
    },
  ];
}
