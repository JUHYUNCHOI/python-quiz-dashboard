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
        "You're given 3 numbers a, b, c and a target T. Place an operator (+, −, ×, /) in each of the 2 gaps between them so the resulting expression equals T (using normal precedence).\nPrint any such filled equation, or report none.",
        "숫자 a, b, c 와 목표값 T 가 주어져요. 그 사이 두 자리에 연산자 (+, −, ×, /) 를 채워서 일반 우선순위로 계산했을 때 결과가 T 가 되는 식을 만들어요.\n그런 식 하나를 출력해요. 없으면 없다고 알려요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{"\u2795"}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d97706" }}>Complete the Equation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P2</div>
          </div>

          <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Given ", "숫자 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "3 numbers a, b, c and a target T", "3 개의 숫자 a, b, c 와 목표값 T")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 800, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Place an operator in each of ", "사이 두 자리에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "2 gaps using +, −, ×, or /", "+, −, ×, / 중 하나의 연산자")}</b>
                  {t(E, " (normal precedence — × and / before + and −).",
                        " 를 채워요 (일반 우선순위 — ×, / 가 +, − 보다 먼저).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 800, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print any ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "filled equation that evaluates to T", "결과가 T 가 되는 식")}</b>
                  {t(E, ", or report none.", " 하나를 출력해요. 없으면 없다고 알려요.")}
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
        "How many operator slots are there between 3 numbers? For example: a _ b _ c", "숫자 3개 사이에 연산자 자리는 몇 개예요? 예: a _ b _ c"),
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
        "How many operator slots are there between 3 numbers?", "숫자 3개 사이에 연산자 자리는 몇 개예요?"),
      question: t(E,
        "Number of operator slots between 3 numbers = ?",
        "숫자 3개 사이 연산자 자리 수 = ?"),
      hint: t(E,
        "a _ b _ c has 2 blanks.",
        "a _ b _ c에는 빈칸이 2개예요."),
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
        "Try all 16 operator-pair combinations between a, b, c. For each, evaluate the expression with proper precedence (use Python's eval) and check whether it equals the target T.",
        "a, b, c 사이 16 가지 연산자 쌍 모두 시도. 각각 우선순위 지키며 계산 (Python eval 사용) 후 목표 T 와 같은지 확인."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: 1, label: t(E, "Read a, b, c, T", "a, b, c, T 읽기"), code: "a, b, c, T = map(int, input().split())", color: "#d97706" },
              { n: 2, label: t(E, "Try every 4 × 4 = 16 op combos", "4 × 4 = 16 연산자 조합"), code: "for op1 in '+-*/' for op2 in '+-*/'", color: "#7c3aed" },
              { n: 3, label: t(E, "Evaluate with precedence", "우선순위 지켜 계산"), code: "val = eval(f'{a}{op1}{b}{op2}{c}')", color: "#0891b2" },
              { n: 4, label: t(E, "Print if matches T", "T 와 같으면 출력"), code: "if val == T: print(equation); break", color: "#16a34a" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 2 }}>{t(E, "⏱ Complexity", "⏱ 복잡도")}</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#d97706" }}>O(1) per case</div>
            <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{t(E, "16 fixed combos per test case", "테스트당 16 가지 고정 조합")}</div>
          </div>
        </div>),
    },
    // 2-2: Code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part. Toggle Python ↔ C++ in header.", "풀이 코드 — 부분별로 읽어봐요. 헤더에서 Python ↔ C++ 토글."),
      sections: getMcc15EqSections(E),
    },
  ];
}
