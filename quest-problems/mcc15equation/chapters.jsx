import { C, t } from "@/components/quest/theme";
import { getMcc15EqSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "T = int(input())",
  "ops = ['+', '-', '*', '/']",
  "",
  "def evaluate(a, b, c, op1, op2):",
  "    # Build expression and evaluate",
  "    expr = f'{a}{op1}{b}{op2}{c}'",
  "    try:",
  "        result = eval(expr)",
  "        return result == int(result)",
  "    except:",
  "        return False",
  "",
  "for _ in range(T):",
  "    a, b, c, target = map(int, input().split())",
  "    found = False",
  "    for op1 in ops:",
  "        for op2 in ops:",
  "            expr = f'{a}{op1}{b}{op2}{c}'",
  "            try:",
  "                if eval(expr) == target:",
  "                    print(f'{a}{op1}{b}{op2}{c}={target}')",
  "                    found = True",
  "                    break",
  "            except: pass",
  "        if found: break",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: Problem (3 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15EqCh1(E) {
  return [
    // 1-1: Title reveal
    {
      type: "reveal",
      narr: t(E,
        "Given 3 numbers, place +, -, *, / between them to form a valid equation equal to a target.\nTry all 4^2 = 16 operator combinations!", "숫자 3개가 주어지면 사이에 +, -, *, /를 넣어서 목표값과 같은 식을 만들어. 4^2 = 16가지 연산자 조합을 모두 시도해!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2795"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Complete the Equation</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P2</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "Key: Between 3 numbers there are 2 operator slots.\nEach can be +, -, *, /. Brute-force all 4*4 = 16 combinations and check which one equals the target.",
              "핵심: 숫자 3개 사이에 연산자 2개가 들어가.\n각각 +, -, *, / 가능.\n4*4 = 16가지 조합을 모두 시도해서 목표값과 같은 것을 찾아.")}
          </div>
        </div>),
    },
    // 1-2: Quiz
    {
      type: "quiz",
      narr: t(E,
        "How many operator slots are there between 3 numbers? For example: a _ b _ c", "숫자 3개 사이에 연산자 자리는 몇 개야? 예: a _ b _ c"),
      question: t(E,
        "How many operator slots between 3 numbers?",
        "숫자 3개 사이의 연산자 자리는 몇 개?"),
      options: [
        "1",
        "2",
        "3",
        "4",
      ],
      correct: 1,
      explain: t(E,
        "Between 3 numbers there are exactly 2 gaps: a OP b OP c. So 2 operator slots!",
        "숫자 3개 사이에는 정확히 2개의 빈칸이 있어: a OP b OP c. 연산자 자리 2개!"),
    },
    // 1-3: Input
    {
      type: "input",
      narr: t(E,
        "How many operator slots are there between 3 numbers?", "숫자 3개 사이에 연산자 자리는 몇 개야?"),
      question: t(E,
        "Number of operator slots between 3 numbers = ?",
        "숫자 3개 사이 연산자 자리 수 = ?"),
      hint: t(E,
        "a _ b _ c has 2 blanks.",
        "a _ b _ c에는 빈칸이 2개야."),
      answer: 2,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: Code (2 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc15EqCh2(E, lang = "py") {
  return [
    // 2-1: Complexity reveal
    {
      type: "reveal",
      narr: t(E,
        "With only 16 combinations to try per test case, brute force is O(1) per case!", "테스트 케이스당 16가지 조합만 시도하면 되니까 케이스당 O(1)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u26a1"}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>O(16) = O(1) per case</div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 12, fontSize: 13, color: C.text, lineHeight: 1.8 , whiteSpace: "pre-line" }}>
            {t(E,
              "4 operators for each of 2 slots = 16 combinations.\nFor each combo, evaluate the expression (watch for operator precedence!) and compare to the target.",
              "2개 자리에 각 4개 연산자 = 16가지 조합.\n각 조합마다 식을 계산하고 (연산자 우선순위 주의!) 목표값과 비교해.")}
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15EqSections(E),
    },
  ];
}
