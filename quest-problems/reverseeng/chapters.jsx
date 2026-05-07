import { C, t } from "@/components/quest/theme";
import { getRevEngSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "for _ in range(T):",
  "    N, M = map(int, input().split())",
  "    inputs = []",
  "    outputs = []",
  "    for _ in range(M):",
  "        line = input().split()",
  "        arr = [int(x) for x in line[:N]]",
  "        out = int(line[N])",
  "        inputs.append(tuple(arr))",
  "        outputs.append(out)",
  "",
  "    # Check: same input, different output => LIE",
  "    ok = True",
  "    for i in range(M):",
  "        for j in range(i+1, M):",
  "            if inputs[i] == inputs[j] and outputs[i] != outputs[j]:",
  "                ok = False",
  "                break",
  "        if not ok: break",
  "",
  "    if not ok:",
  "        print('LIE')",
  "        continue",
  "",
  "    # Check: for inputs with different outputs,",
  "    # there must exist a position where they differ",
  "    # Try each position as the decision variable",
  "    possible = False",
  "    for pos in range(N):",
  "        # Try: if arr[pos]==0 return A, else return B",
  "        for A in [0, 1]:",
  "            B = 1 - A",
  "            valid = True",
  "            for k in range(M):",
  "                expected = A if inputs[k][pos] == 0 else B",
  "                if expected != outputs[k]:",
  "                    valid = False",
  "                    break",
  "            if valid:",
  "                possible = True",
  "                break",
  "        if possible: break",
  "",
  "    # Also check: always return 0 or always return 1",
  "    if not possible:",
  "        if all(o == 0 for o in outputs):",
  "            possible = True",
  "        elif all(o == 1 for o in outputs):",
  "            possible = True",
  "",
  "    print('OK' if possible else 'LIE')",
];


/* ===============================================================
   Chapter 1: Problem (3 steps)
   =============================================================== */
export function makeRevEngCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "M test cases are given; each test case has a binary input array of length N and an expected boolean output. We need to know whether SOME simple if/else program of the form 'if arr[i] == constant: output X else output Y' (depending on a SINGLE input position) could produce all the expected outputs.\nPrint OK if such a program exists, else LIE.",
        "M 개의 테스트 케이스가 주어져요. 각 케이스는 길이 N 의 이진 입력 배열과 기대 출력 (0/1) 을 가져요. 어떤 'if arr[i] == 상수: X 출력 else Y 출력' 형태의 단순 if/else 프로그램 (단 하나의 입력 위치만 사용) 으로 모든 기대 출력을 만들 수 있는지 판단해요.\n그런 프로그램이 존재하면 OK, 아니면 LIE 를 출력해요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\ud83d\udd27"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Reverse Engineering</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #3</div>
          </div>

          <div style={{ background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#5b21b6", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  <b style={{ color: "#8b5cf6" }}>{t(E, "M test cases", "M 개의 테스트 케이스")}</b>
                  {t(E, "; each has a binary input array of length N and an expected boolean output.",
                        "; 각 케이스는 길이 N 의 이진 입력 배열과 기대 출력 (0/1) 을 가져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Could a ", "")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "simple if/else program on a SINGLE input position", "한 개의 입력 위치만 사용하는 단순 if/else 프로그램")}</b>
                  {t(E, " (\"if arr[i] == c: X else Y\") explain all the outputs?",
                        " (\"if arr[i] == c: X else Y\") 으로 모든 출력을 설명할 수 있을까요?")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
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
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Input [0]->1 and [1]->0.\nCan a program do this?\nCheck: if arr[0]==0 return 1 else return 0.\nWorks!\nEnter 1 for OK, 0 for LIE.", "입력 [0]->1 그리고 [1]->0.\n프로그램이 가능할까?\n확인: if arr[0]==0 return 1 else return 0.\n작동해요!\nOK이면 1, LIE이면 0 입력."),
      question: t(E,
        "[0]->1, [1]->0. Is it OK? (1=OK, 0=LIE)",
        "[0]->1, [1]->0. OK일까요? (1=OK, 0=LIE)"),
      hint: t(E,
        "if arr[0]==0 return 1, else return 0. This matches both test cases. Answer: 1 (OK).",
        "if arr[0]==0 return 1, else return 0. 두 테스트 케이스 모두 일치. 답: 1 (OK)."),
      answer: 1,
    },
  ];
}


/* ===============================================================
   Chapter 2: Code (2 steps)
   =============================================================== */
export function makeRevEngCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "First, if two identical inputs have DIFFERENT outputs → LIE. Otherwise try every (position, A, B) triple — does 'if arr[pos]==0 return A else B' produce every test's output? Print OK if any works.",
        "먼저, 동일한 입력에 다른 출력 있으면 → LIE. 그렇지 않으면 모든 (위치, A, B) 삼중조합 시도 — 'if arr[pos]==0 return A else B' 가 모든 테스트의 출력을 만드는지? 하나라도 되면 OK."),
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
      sections: getRevEngSections(E),
    },
  ];
}
