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
        "Given M test cases of binary input arrays and their outputs (0 or 1), determine if a simple if/else program on one variable could produce all the outputs consistently.\nPrint OK or LIE!", "M개의 테스트 케이스 (이진 입력 배열과 출력 0 또는 1)가 주어져.\n하나의 변수에 대한 간단한 if/else 프로그램이 모든 출력을 일관되게 생성할 수 있는지 판단해.\nOK 또는 LIE를 출력해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\ud83d\udd27"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>Reverse Engineering</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Dec 2022 Bronze #3</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Key: If two identical inputs have different outputs, it's a LIE. Otherwise, check if some single variable position can separate all outputs using if arr[pos]==0 return A else return B.",
              "핵심: 동일한 입력이 다른 출력을 가지면 LIE. 아니면, if arr[pos]==0 return A else return B 형태로 모든 출력을 분리할 수 있는 변수 위치가 있는지 확인해.")}
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
        "맞아! 같은 입력이 다른 출력을 만들면, 어떤 결정적 프로그램도 일관될 수 없어. LIE야."),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "Input [0]->1 and [1]->0.\nCan a program do this?\nCheck: if arr[0]==0 return 1 else return 0.\nWorks!\nEnter 1 for OK, 0 for LIE.", "입력 [0]->1 그리고 [1]->0.\n프로그램이 가능할까?\n확인: if arr[0]==0 return 1 else return 0.\n작동해!\nOK이면 1, LIE이면 0 입력."),
      question: t(E,
        "[0]->1, [1]->0. Is it OK? (1=OK, 0=LIE)",
        "[0]->1, [1]->0. OK일까? (1=OK, 0=LIE)"),
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
        "Check for contradictions first.\nThen try each variable position with both polarities.\nO(N * M^2) per test case.", "먼저 모순을 확인. 그런 다음 각 변수 위치를 두 극성으로 시도. 테스트 케이스당 O(N * M^2)."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#8b5cf6" }}>O(N * M)</div>
          <div style={{ marginTop: 12, background: "#f5f3ff", border: "2px solid #c4b5fd", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 }}>
            {t(E,
              "Step 1: Check if any two identical inputs have different outputs (LIE). Step 2: For each position pos and each polarity, check if the program 'if arr[pos]==0 return A else return B' is consistent with all test cases.",
              "1단계: 동일한 입력이 다른 출력을 가지는지 확인 (LIE). 2단계: 각 위치 pos와 각 극성에 대해, 'if arr[pos]==0 return A else return B' 프로그램이 모든 테스트 케이스와 일관되는지 확인.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getRevEngSections(E),
    },
  ];
}
