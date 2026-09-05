import { useState } from "react";
import { C, t } from "@/components/quest/theme";
import { getMcc15EqSections } from "./components";

const A = "#d97706";
const NW = { whiteSpace: "nowrap" };
const KA = { wordBreak: "keep-all" };

/* ─────────────────────────────────────────────────────────────
   Concept sim: there are only 8 candidates.
   The two gaps hold exactly one "=" and one of + - * /.
   So "=" is either in the first gap or the second gap (2 ways),
   and the remaining gap holds one of 4 operators → 2 × 4 = 8.
   The student steps through the 8 candidates one by one and
   watches the left value vs the right value until ✅ appears.
   ───────────────────────────────────────────────────────────── */
const EXAMPLES = [
  [13, 2, 15],
  [3, 2, 1],
  [2, 3, 6],
];
const OPS = ["+", "-", "*", "/"];

// candidate list in exactly the order the solution code checks them:
//   for each operator, first "a op b = c", then "a = b op c"
const CANDS = [];
for (const op of OPS) {
  CANDS.push({ eqFirst: false, op });   // a op b = c
  CANDS.push({ eqFirst: true, op });    // a = b op c
}

function applyOp(x, op, y) {
  if (op === "+") return x + y;
  if (op === "-") return x - y;
  if (op === "*") return x * y;
  return x / y;                          // real number division
}

// exact check, done the same way the code does it (no float compare)
function isOk(x, op, y, z) {
  if (op === "+") return x + y === z;
  if (op === "-") return x - y === z;
  if (op === "*") return x * y === z;
  return x === y * z;                    // x / y === z  ⟺  x === y * z
}

function fmt(v) {
  if (Number.isInteger(v)) return String(v);
  return String(Math.round(v * 1e6) / 1e6);
}

function EqTrySim({ E }) {
  const [exIdx, setExIdx] = useState(0);
  const [i, setI] = useState(0);
  const [a, b, c] = EXAMPLES[exIdx];

  const cur = CANDS[i];

  // left side value / right side value / verdict
  const leftVal = cur.eqFirst ? a : applyOp(a, cur.op, b);
  const rightVal = cur.eqFirst ? applyOp(b, cur.op, c) : c;
  const ok = cur.eqFirst ? isOk(b, cur.op, c, a) : isOk(a, cur.op, b, c);

  // first candidate that works, so we can say "here it stops"
  let firstHit = -1;
  for (let k = 0; k < CANDS.length; k++) {
    const d = CANDS[k];
    const good = d.eqFirst ? isOk(b, d.op, c, a) : isOk(a, d.op, b, c);
    if (good) { firstHit = k; break; }
  }

  const pickEx = (k) => { setExIdx(k); setI(0); };

  const slot = (text, kind) => (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 30, height: 32, padding: "0 6px", borderRadius: 8,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 800,
      border: kind === "eq" ? `2px solid ${A}` : "1.5px solid #fcd34d",
      background: kind === "eq" ? A : kind === "op" ? "#fde68a" : "#fff",
      color: kind === "eq" ? "#fff" : "#92400e",
    }}>{text}</span>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: "#fff7ed", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, ...KA }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
          🔎 {t(E, "Only 8 candidates — check them one by one", "후보는 8가지뿐 — 하나씩 확인하기")}
        </div>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
          {t(E,
            "Two gaps. One of them must hold '=', the other holds + − × ÷. So '=' goes in the first gap or the second gap, and the leftover gap has 4 choices — 2 × 4 = 8 candidates in total.",
            "빈칸은 2개예요. 그중 하나는 반드시 '=' 이고, 나머지 하나는 + − × ÷ 중 하나예요. 그래서 '=' 가 앞칸이냐 뒷칸이냐 2가지, 남은 칸은 4가지 — 모두 2 × 4 = 8가지예요.")}
        </div>

        {/* the shape with two empty gaps */}
        <div style={{ fontSize: 11, color: "#92400e", fontWeight: 700, marginBottom: 4 }}>
          {t(E, "the three numbers, with two gaps", "숫자 3개와 빈칸 2개")}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          {slot(a, "num")}
          {slot("▢", "gap")}
          {slot(b, "num")}
          {slot("▢", "gap")}
          {slot(c, "num")}
        </div>

        {/* example picker */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "#92400e", fontWeight: 600 }}>{t(E, "example:", "예제:")}</span>
          {EXAMPLES.map((ex, k) => (
            <button key={k} onClick={() => pickEx(k)} style={{
              ...NW, padding: "4px 10px", borderRadius: 6,
              fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
              border: exIdx === k ? `2px solid ${A}` : "1px solid #fcd34d",
              background: exIdx === k ? A : "#fff", color: exIdx === k ? "#fff" : "#92400e",
            }}>{ex.join(" ")}</button>
          ))}
        </div>

        {/* candidate stepper */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={navBtn(i === 0)}>◀</button>
          <span style={{ fontSize: 12.5, color: "#92400e", fontWeight: 700, ...NW }}>
            {t(E, "candidate ", "후보 ")}{i + 1} / 8
          </span>
          <button onClick={() => setI(Math.min(7, i + 1))} disabled={i === 7} style={navBtn(i === 7)}>▶</button>
        </div>

        {/* the filled-in equation */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
          {slot(a, "num")}
          {cur.eqFirst ? slot("=", "eq") : slot(cur.op, "op")}
          {slot(b, "num")}
          {cur.eqFirst ? slot(cur.op, "op") : slot("=", "eq")}
          {slot(c, "num")}
        </div>

        {/* verdict card */}
        <div style={{
          background: "#0f172a", color: "#f8fafc", padding: "12px 14px", borderRadius: 8,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.8, ...KA,
        }}>
          <div>
            <span style={{ color: "#8b949e" }}>{t(E, "left  = ", "왼쪽  = ")}</span>
            <b style={{ color: "#fbbf24" }}>{fmt(leftVal)}</b>
          </div>
          <div>
            <span style={{ color: "#8b949e" }}>{t(E, "right = ", "오른쪽 = ")}</span>
            <b style={{ color: "#fbbf24" }}>{fmt(rightVal)}</b>
          </div>
          <div style={{ marginTop: 4, fontWeight: 800, color: ok ? "#34d399" : "#f87171" }}>
            {ok
              ? `✅ ${t(E, "same — this is the answer", "같아요 — 이게 답이에요")}`
              : `❌ ${t(E, "different — next candidate", "달라요 — 다음 후보로")}`}
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
          {firstHit === i
            ? t(E,
                "The code stops right here and prints this equation. The problem guarantees the answer is unique, so there is nothing left to check.",
                "코드는 바로 여기서 멈추고 이 식을 출력해요. 답은 유일하다고 문제가 보장하니까 더 볼 필요가 없어요.")
            : t(E,
                "Not this one. Press ▶ to check the next candidate.",
                "이 후보는 아니에요. ▶ 를 눌러 다음 후보를 확인해봐요.")}
        </div>

        <div style={{ marginTop: 8, fontSize: 11.5, color: "#b45309", lineHeight: 1.55, ...KA }}>
          {t(E,
            "Watch the ÷ candidates: the left value can come out as a decimal like 6.5. Since ÷ here is real division, 13/2=6 would be wrong — 6.5 is not 6.",
            "÷ 후보를 잘 봐요: 왼쪽 값이 6.5 처럼 소수로 나올 수 있어요. 여기서 ÷ 는 실수 나눗셈이라 13/2=6 은 틀린 식이에요 — 6.5 는 6 이 아니니까요.")}
        </div>
      </div>
    </div>
  );
}

const navBtn = (disabled) => ({
  width: 34, height: 30, borderRadius: 7, border: "1px solid #fcd34d",
  background: disabled ? "#fef3c7" : "#fff", color: disabled ? "#d6bd8a" : "#92400e",
  fontSize: 14, fontWeight: 800, cursor: disabled ? "default" : "pointer", lineHeight: 1,
});

/* ================================================================
   SOLUTION CODE
   Try all 8 placements; division is checked as a == b * c so we
   never compare decimals.
   ================================================================ */
export const SOLUTION_CODE = [
  "a, b, c = map(int, input().split())",
  "",
  "def check(x, op, y, z):      # x op y == z 인가?",
  "    if op == \"+\": return x + y == z",
  "    if op == \"-\": return x - y == z",
  "    if op == \"\": return x  y == z",
  "    return x == y * z        # x / y == z  ⟺  x == y * z",
  "",
  "for op in \"+-*/\":",
  "    if check(a, op, b, c):",
  "        print(str(a) + op + str(b) + \"=\" + str(c))",
  "        break",
  "    if check(b, op, c, a):",
  "        print(str(a) + \"=\" + str(b) + op + str(c))",
  "        break",
];

export function makeMcc15EqCh1(E) {
  return [
    // 1-1: Title + mission + problem
    {
      type: "reveal",
      narr: t(E,
        "Three positive integers are written on the ground with two spaces between them. Put symbols in those two spaces so the whole thing becomes a valid equation.",
        "땅에 양의 정수 3개가 적혀 있고 사이에 빈칸이 2개 있어요. 그 두 칸에 기호를 넣어서 전체가 올바른 등식이 되게 만들어요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🟰"}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: A }}>Complete the Equation</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2015 P2</div>
          </div>

          {/* 🎯 Mission */}
          <div style={{ background: "#fff7ed", border: `1.5px solid ${A}`, borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center", ...KA }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
              {t(E,
                "Fill the two gaps between the three numbers so the result is a valid equation, and print it.",
                "숫자 3개 사이의 빈칸 2개를 채워서 올바른 등식을 만들고, 그 식을 출력해요.")}
            </div>
          </div>

          {/* 📖 Problem */}
          <div style={{ background: "#fff7ed", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>
              📖 {t(E, "Problem", "문제")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Jimmy finds ", "지미가 땅에 적힌 ")}
                  <b style={{ color: A }}>{t(E, "3 positive integers", "양의 정수 3개")}</b>
                  {t(E, " written on the ground, with spaces between them.", " 를 발견했어요. 사이사이에 빈칸이 있어요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "There must be ", "빈칸에는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "exactly one =", "= 가 정확히 하나")}</b>
                  {t(E, ".", " 들어가야 해요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The other symbol must be one of ", "나머지 기호는 ")}
                  <b style={{ color: "#7c3aed", fontFamily: "'JetBrains Mono',monospace" }}>+ - * /</b>
                  {t(E, ".", " 중 하나예요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: A, fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "The division symbol / means ", "나눗셈 기호 / 는 ")}
                  <b style={{ color: "#dc2626" }}>{t(E, "real number division", "실수 나눗셈")}</b>
                  {t(E, ". So 3/2=1 is not valid, but 3-2=1 and 3=2+1 are.", " 을 뜻해요. 그래서 3/2=1 은 올바르지 않고, 3-2=1 과 3=2+1 은 올바른 등식이에요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #fcd34d" }}>
                <span style={{ color: "#b45309", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print the ", "")}
                  <b style={{ color: "#b45309" }}>{t(E, "valid equation as one string without spaces", "올바른 등식을 공백 없는 문자열 하나로")}</b>
                  {t(E, ".", " 출력해요.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: I/O format + official sample
    {
      type: "reveal",
      narr: t(E,
        "The input is just three integers on one line. The output is the finished equation, written with no spaces.",
        "입력은 한 줄에 정수 3개뿐이에요. 출력은 완성된 등식을 공백 없이 쓴 문자열이에요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📥 {t(E, "Input", "입력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              <div>• {t(E, "Three (space separated) positive integers ", "공백으로 구분된 양의 정수 3개 ")}<b>x</b>, <b>y</b>, <b>z</b></div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#92400e", marginTop: 4 }}>
                a, b, c = map(int, input().split())
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: C.dim, marginTop: 8, lineHeight: 1.6 }}>
              {t(E, "Limits: 1 ≤ x, y, z ≤ 1,000,000. The inputs provided will guarantee that a unique solution exists.",
                   "제약: 1 ≤ x, y, z ≤ 1,000,000. 주어지는 입력은 답이 유일하게 존재하도록 보장돼요.")}
            </div>
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: 14, marginBottom: 10, ...KA }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>
              📤 {t(E, "Output", "출력")}
            </div>
            <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
              {t(E, "A string (without spaces) containing the valid equation.", "올바른 등식을 담은 공백 없는 문자열 하나.")}
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#92400e", marginTop: 4, overflowX: "auto" }}>
                print(str(a) + op1 + str(b) + op2 + str(c))
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", ...KA }}>
            <div style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, flex: 1, minWidth: 150 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "sample input", "예제 입력")}</div>
              <div>13 2 15</div>
            </div>
            <div style={{ background: "#0f172a", color: "#fcd34d", borderRadius: 10, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, minWidth: 110 }}>
              <div style={{ color: "#8b949e", fontSize: 11, marginBottom: 2 }}>{t(E, "sample output", "예제 출력")}</div>
              <div style={{ fontWeight: 800 }}>13+2=15</div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: C.dim, lineHeight: 1.55, ...KA }}>
            {t(E,
              "13 + 2 is 15, so putting + in the first gap and = in the second gap makes a valid equation.",
              "13 + 2 는 15 예요. 그래서 앞칸에 + , 뒷칸에 = 를 넣으면 올바른 등식이 돼요.")}
          </div>
        </div>),
    },

    // 1-3: concept sim
    {
      type: "reveal",
      narr: t(E,
        "There are only 8 ways to fill the two gaps. Step through them and watch the two sides until they match.",
        "빈칸 2개를 채우는 방법은 8가지뿐이에요. 하나씩 넘기면서 양쪽 값이 같아지는 순간을 봐요."),
      content: <EqTrySim E={E} />,
    },

    // 1-4: understanding check
    {
      type: "quiz",
      narr: t(E,
        "Count it: the '=' can sit in the first gap or the second gap, and whichever gap is left over holds one of + - * /.",
        "세어봐요: '=' 는 앞칸이나 뒷칸에 놓일 수 있고, 남은 칸에는 + - * / 중 하나가 들어가요."),
      question: t(E,
        "There are two gaps and exactly one '='. How many candidates do we need to check?",
        "빈칸이 2개이고 '=' 는 정확히 1개일 때, 확인해야 하는 경우의 수는?"),
      options: [
        t(E, "4", "4가지"),
        t(E, "8", "8가지"),
        t(E, "16", "16가지"),
      ],
      correct: 1,
      explain: t(E,
        "If '=' is in the first gap the shape is a=b op c; if it is in the second gap the shape is a op b=c. Each has 4 operators → 2 × 4 = 8.",
        "'=' 가 앞칸이면 a=b op c, 뒷칸이면 a op b=c. 각각 연산자 4개 → 2×4 = 8."),
    },
  ];
}

export function makeMcc15EqCh2(E, lang = "py") {
  return [
    // 2-1: plan
    {
      type: "reveal",
      narr: t(E,
        "Two things to hold on to: there are only 8 candidates, so checking all of them is fine; and division has to be checked without decimals.",
        "기억할 건 두 가지예요. 후보가 8가지뿐이라 전부 확인해도 되고, 나눗셈은 소수 없이 확인해야 해요."),
      content: (
        <div style={{ padding: 16, ...KA }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#fff7ed", border: "1px solid #fcd34d", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                💡 {t(E, "Two gaps, exactly one '='", "빈칸 2개인데 '=' 는 딱 하나")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "That leaves only 8 candidates, so we can simply try them all — a full search. And the problem promises the answer is unique, so the first candidate that works is the answer.",
                  "그러면 후보가 8가지뿐이에요. 전부 해보면 돼요 — 완전탐색이에요. 그리고 답은 유일하다고 문제가 약속했으니, 처음 맞는 후보가 곧 답이에요.")}
              </div>
            </div>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#b91c1c", marginBottom: 4 }}>
                ⚠️ {t(E, "The division trap", "나눗셈 함정")}
              </div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>
                {t(E,
                  "'/' is real division, so a / b comes out as a decimal like 6.5 and comparing decimals can go wrong by a tiny amount. Flip it instead: a / b == c is the same as a == b * c, and that is a comparison between whole numbers.",
                  "'/' 는 실수 나눗셈이라 a / b 가 6.5 같은 소수로 나오고, 소수끼리 비교하면 아주 작은 오차가 생길 수 있어요. 대신 뒤집어요: a / b == c 는 a == b * c 와 같은 말이고, 이건 정수끼리의 비교예요.")}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: C.dim, textAlign: "center" }}>
            {t(E, "↓ the code, section by section.", "↓ 코드가 아래에 한 단락씩 나와요.")}
          </div>
        </div>),
    },
    // 2-2: progressive code
    {
      type: "progressive",
      narr: t(E,
        "Solution code — read part by part.", "풀이 코드 — 부분별로 읽어봐요."),
      sections: getMcc15EqSections(E),
    },
  ];
}
