import { Fragment, useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc15EqSections } from "./components";

/* ================================================================
   Mini sim: try all 16 operator pairs on (a, b, c) vs target T
   — bilingual (E), theme-matched (orange #d97706)
   ================================================================ */
function OpsGridSim({ E }) {
  const A = "#d97706";
  const ops = ["+", "-", "*", "/"];
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(4);
  const [target, setTarget] = useState(10);
  const [pick, setPick] = useState({ op1: "+", op2: "*" });

  const compute = (op1, op2) => {
    try {
      // eslint-disable-next-line no-eval
      const v = eval(`${a}${op1}${b}${op2}${c}`);
      if (!isFinite(v)) return null;
      return v;
    } catch { return null; }
  };

  const matches = (op1, op2) => {
    const v = compute(op1, op2);
    return v !== null && Math.abs(v - target) < 1e-9 && Number.isInteger(v);
  };

  const cur = compute(pick.op1, pick.op2);
  const hit = cur !== null && Math.abs(cur - target) < 1e-9 && Number.isInteger(cur);
  const hitCount = ops.reduce((s, o1) => s + ops.filter(o2 => matches(o1, o2)).length, 0);

  const numStyle = {
    width: 48, padding: "4px 6px", fontSize: 13, fontWeight: 700,
    border: `1.5px solid ${A}`, borderRadius: 6, textAlign: "center", color: A,
    background: "#fff",
  };

  return (
    <div style={{
      background: "#fff7ed", border: `1.5px dashed ${A}`, borderRadius: 12,
      padding: 12, marginBottom: 10,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 8, textAlign: "center", letterSpacing: 0.3 }}>
        🔬 {t(E, "Sim — try all 16 operator pairs", "시뮬 — 16 가지 연산자 쌍 시도")}
      </div>

      {/* Inputs row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", alignItems: "center", marginBottom: 10, fontSize: 13, color: C.text }}>
        <input type="number" value={a} onChange={e => setA(Number(e.target.value) || 0)} style={numStyle} />
        <span style={{ color: A, fontWeight: 800 }}>op</span>
        <input type="number" value={b} onChange={e => setB(Number(e.target.value) || 0)} style={numStyle} />
        <span style={{ color: A, fontWeight: 800 }}>op</span>
        <input type="number" value={c} onChange={e => setC(Number(e.target.value) || 0)} style={numStyle} />
        <span style={{ color: C.dim, fontWeight: 700, margin: "0 2px" }}>=</span>
        <span style={{ fontSize: 11, color: "#92400e", fontWeight: 700 }}>{t(E, "target", "목표")} T</span>
        <input type="number" value={target} onChange={e => setTarget(Number(e.target.value) || 0)} style={numStyle} />
      </div>

      {/* 4x4 grid */}
      <div style={{ display: "grid", gridTemplateColumns: "auto repeat(4, 1fr)", gap: 3, fontSize: 11, marginBottom: 8 }}>
        <div />
        {ops.map(o => (
          <div key={`h-${o}`} style={{ textAlign: "center", fontWeight: 800, color: A, padding: "2px 0" }}>{o}</div>
        ))}
        {ops.map(op1 => (
          <Fragment key={`row-${op1}`}>
            <div style={{ textAlign: "center", fontWeight: 800, color: A, padding: "2px 0" }}>{op1}</div>
            {ops.map(op2 => {
              const v = compute(op1, op2);
              const ok = matches(op1, op2);
              const sel = pick.op1 === op1 && pick.op2 === op2;
              return (
                <button
                  key={`${op1}-${op2}`}
                  onClick={() => setPick({ op1, op2 })}
                  style={{
                    padding: "4px 2px",
                    border: sel ? `2px solid ${A}` : `1px solid ${ok ? "#15803d" : "#fcd34d"}`,
                    background: ok ? "#dcfce7" : "#fff",
                    color: ok ? "#15803d" : C.text,
                    borderRadius: 6,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 11,
                    lineHeight: 1.2,
                  }}
                  title={`${a}${op1}${b}${op2}${c}`}
                >
                  {v === null ? "·" : (Number.isInteger(v) ? v : v.toFixed(2))}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>

      {/* Selected expression */}
      <div style={{
        background: hit ? "#dcfce7" : "#fff",
        border: `1.5px solid ${hit ? "#15803d" : "#fcd34d"}`,
        borderRadius: 8, padding: "6px 10px", textAlign: "center",
        fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: hit ? "#15803d" : C.text,
        marginBottom: 6, fontWeight: 700,
      }}>
        {a}{pick.op1}{b}{pick.op2}{c} = {cur === null ? "?" : (Number.isInteger(cur) ? cur : cur.toFixed(3))}
        {hit && <span style={{ marginLeft: 6 }}>✅ = T</span>}
      </div>

      <div style={{ fontSize: 11, color: "#92400e", textAlign: "center", lineHeight: 1.5 }}>
        {t(E,
          `Green cells hit T=${target}. Total matches: ${hitCount} / 16. Click any cell to inspect it.`,
          `초록 칸이 T=${target}에 맞는 식. 정답 ${hitCount} / 16 개. 칸 눌러서 식 확인.`)}
      </div>
    </div>
  );
}

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
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"\u2795"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#d97706" }}>Complete the Equation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#fffbeb", border: "1.5px solid #d97706", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E, "Print one filled equation a OP b OP c = T, or report none.", "결과가 T 가 되는 식 a OP b OP c = T 하나를 출력해요. 없으면 없다고 알려요.")}
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
                  {t(E, "Given ", "숫자 ")}
                  <b style={{ color: "#d97706" }}>{t(E, "3 numbers a, b, c and a target T", "3 개의 숫자 a, b, c 와 목표값 T")}</b>
                  {t(E, ".", " 가 주어져요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#d97706", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Place an operator in each of ", "사이 두 자리에 ")}
                  <b style={{ color: "#7c3aed" }}>{t(E, "2 gaps using +, −, ×, or /", "+, −, ×, / 중 하나의 연산자")}</b>
                  {t(E, " (normal precedence — × and / before + and −).",
                        " 를 채워요 (일반 우선순위 — ×, / 가 +, − 보다 먼저).")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print any ", "")}
                  <b style={{ color: "#15803d" }}>{t(E, "filled equation that evaluates to T", "결과가 T 가 되는 식")}</b>
                  {t(E, ", or report none.", " 하나를 출력해요. 없으면 없다고 알려요.")}
                </div>
              </div>
            </div>
          </div>

          <OpsGridSim E={E} />
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
    // 2-1: Code
    {
      type: "progressive",
      narr: t(E,
        "Try all 16 operator-pair combinations between a, b, c. For each, evaluate the expression with proper precedence (use Python's eval) and check whether it equals the target T. Sections build it one piece at a time.",
        "a, b, c 사이 16 가지 연산자 쌍 모두 시도. 각각 우선순위 지키며 계산 (Python eval 사용) 후 목표 T 와 같은지 확인. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getMcc15EqSections(E),
    },
  ];
}
