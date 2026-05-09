import { C, t } from "@/components/quest/theme";
import { getStrangeFnSections } from "./components";

/* ================================================================
   SOLUTION CODE
   ================================================================ */
export const SOLUTION_CODE = [
  "import sys",
  "input = sys.stdin.readline",
  "",
  "MOD = 10**9 + 7",
  "INV2 = pow(2, MOD - 2, MOD)  # modular inverse of 2",
  "",
  "T = int(input())",
  "for _ in range(T):",
  "    s = input().strip()",
  "",
  "    # Step 1: if any digit is not 0/1, binarize (1 op),",
  "    # producing a string of 0/1 of the same length.",
  "    ops = 0",
  "    if any(c not in '01' for c in s):",
  "        s = ''.join('1' if int(c) % 2 else '0' for c in s)",
  "        ops = 1",
  "",
  "    # Step 2: treat s as a binary number n.",
  "    # Remaining ops to hit 0 = floor(3*n / 2).",
  "    # Closed form: g(2k)=3k, g(2k+1)=3k+1.",
  "    # Compute n mod MOD digit-by-digit.",
  "    n = 0",
  "    for c in s:",
  "        n = (n * 2 + int(c)) % MOD",
  "",
  "    last = int(s[-1]) if s else 0  # parity of n equals last bit",
  "    g = (3 * n - last) % MOD * INV2 % MOD",
  "",
  "    print((ops + g) % MOD)",
];


/* ═══════════════════════════════════════════════════════════════
   Chapter 1: makeStrangeFnCh1
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh1(E) {
  return [
    // 1-1: Title + Mission + Problem
    {
      type: "reveal",
      narr: t(E,
        "A weird function f. If x has a digit other than 0/1, replace each digit with its parity (odd→1, even→0). Otherwise, do x-1. Count how many f's reach 0.",
        "이상한 함수 f. x 에 0/1 이 아닌 자릿수가 있으면 각 자리를 홀짝으로 바꿔(홀→1, 짝→0). 아니면 x-1. f 를 몇 번 써야 0 이 되는지 세요."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{"🔮"}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#5b21b6" }}>Strange Function</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO Feb 2026 Bronze #2</div>
          </div>

          {/* 🎯 Mission box */}
          <div style={{ background: "#f5f3ff", border: "1.5px solid #8b5cf6", borderRadius: 10, padding: "10px 14px", marginBottom: 10, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#5b21b6", letterSpacing: 0.5, marginBottom: 4 }}>
              🎯 {t(E, "Mission", "미션")}
            </div>
            <div style={{ fontSize: 13, color: "#5b21b6", lineHeight: 1.5 }}>
              {t(E,
                "Output how many applications of f are needed to reach 0, mod 10⁹+7.",
                "f 를 몇 번 적용해야 0 이 되는지 10⁹+7 로 나눈 나머지를 출력.")}
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
                  {t(E, "A function ", "함수 ")}
                  <b style={{ color: "#8b5cf6" }}>f(x)</b>
                  {t(E, " is defined on positive integers.", " 가 양의 정수에 정의돼요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "If x has any digit ≠ 0 and ≠ 1: replace ",
                        "x 에 0/1 이 아닌 자릿수가 하나라도 있으면: ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "each digit", "각 자릿수")}</b>
                  {t(E, " by 1 if odd, 0 if even.", " 를 홀수면 1, 짝수면 0 으로 바꿔요.")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 600, flexShrink: 0 }}>•</span>
                <div>
                  {t(E, "Otherwise (x contains only 0/1): ",
                        "그게 아니면 (x 가 0/1 만 가짐): ")}
                  <b style={{ color: "#0891b2" }}>{t(E, "x − 1", "x − 1")}</b>.
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 4, paddingTop: 8, borderTop: "1px dashed #c4b5fd" }}>
                <span style={{ color: "#15803d", fontWeight: 600, flexShrink: 0 }}>👉</span>
                <div>
                  {t(E, "Print how many ", "")}
                  <b style={{ color: "#15803d" }}>f</b>
                  {t(E, " applications make x become 0, mod ",
                        " 를 몇 번 적용하면 x 가 0 이 되는지를 ")}
                  <b style={{ color: "#15803d" }}>10⁹+7</b>
                  {t(E, ".", " 로 나눈 나머지로 출력.")}
                </div>
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-2: Sample I/O
    {
      type: "reveal",
      narr: t(E,
        "Two sample cases. 24680 has even digits everywhere, so one op kills it. 210 takes 4 ops — let's trace.",
        "샘플 두 개. 24680 은 짝수만 있어서 한 번이면 끝. 210 은 4 번 — 따라가 보기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            📥 {t(E, "Sample I/O", "샘플 입출력")}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Input", "입력")}</div>
              <div>2</div>
              <div>24680</div>
              <div>210</div>
            </div>
            <div style={{ flex: 1, background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 4 }}>{t(E, "Output", "출력")}</div>
              <div>1</div>
              <div>4</div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Trace x = 24680", "추적 x = 24680")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}>
              <div>24680 → {t(E, "has even/odd digits ≠ 0,1", "0/1 이 아닌 자릿수 있음")}</div>
              <div>{t(E, "each digit by parity:", "자리별 홀짝:")} 2→0, 4→0, 6→0, 8→0, 0→0</div>
              <div>= 00000 = 0 ✅ <b style={{ color: "#15803d" }}>1 op</b></div>
            </div>
          </div>

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "Trace x = 210", "추적 x = 210")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}>
              <div>210 → 2→0, 1→1, 0→0 → 010 = 10  <span style={{ color: "#94a3b8" }}>{t(E, "(op 1)", "(1 회)")}</span></div>
              <div>10  → {t(E, "only 0/1, so 10 − 1 =", "0/1 만, 10 − 1 =")} 9  <span style={{ color: "#94a3b8" }}>{t(E, "(op 2)", "(2 회)")}</span></div>
              <div>9   → 9→1 → 1  <span style={{ color: "#94a3b8" }}>{t(E, "(op 3)", "(3 회)")}</span></div>
              <div>1   → 1 − 1 = 0  <span style={{ color: "#94a3b8" }}>{t(E, "(op 4)", "(4 회)")}</span></div>
              <div style={{ marginTop: 4 }}><b style={{ color: "#15803d" }}>{t(E, "Total: 4 ops", "합계: 4 회")}</b></div>
            </div>
          </div>
        </div>),
    },

    // 1-3: Pattern reveal
    {
      type: "reveal",
      narr: t(E,
        "Once x is a 0/1 string, view it as a binary number n. Watch what happens for small n.",
        "x 가 0/1 만 남으면 이진수 n 으로 봐요. 작은 n 부터 어떻게 줄어드는지 보기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5b21b6", marginBottom: 8 }}>
            🧩 {t(E, "What's the pattern?", "패턴이 뭘까?")}
          </div>

          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7 }}>
              {t(E,
                "When x has only 0s and 1s, treat its decimal-string as a binary number n. f does x−1 each time, but 'subtract 1 in decimal-of-0/1' equals 'subtract 1 in binary' until the number breaks the 0/1 rule again.",
                "x 가 0/1 만 가지면 그 문자열을 이진수 n 으로 봐요. f 는 x−1 을 하지만 '10진수 0/1 에서 1 빼기' 와 '이진수에서 1 빼기' 가 같다가 0/1 규칙이 깨지는 순간 다시 자리별 변환이 들어가요.")}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #c4b5fd", borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#5b21b6", marginBottom: 6 }}>
              {t(E, "g(n) = ops to kill the binary number n", "g(n) = 이진수 n 을 0 으로 만드는 데 드는 횟수")}
            </div>
            <table style={{ width: "100%", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: C.text, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#ede9fe", color: "#5b21b6" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>n</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>g(n)</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>{t(E, "form", "형태")}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: "3px 8px" }}>0</td><td>0</td><td>—</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>1</td><td>1</td><td>2k+1, k=0 → 3k+1=1</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>2</td><td>3</td><td>2k, k=1 → 3k=3</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>3</td><td>4</td><td>2k+1, k=1 → 3k+1=4</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>4</td><td>6</td><td>2k, k=2 → 3k=6</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>5</td><td>7</td><td>2k+1, k=2 → 3k+1=7</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>6</td><td>9</td><td>2k, k=3 → 3k=9</td></tr>
                <tr><td style={{ padding: "3px 8px" }}>7</td><td>10</td><td>2k+1, k=3 → 3k+1=10</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#15803d", marginBottom: 4 }}>
              {t(E, "✅ Closed form", "✅ 닫힌 식")}
            </div>
            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace" }}>
              <div>g(2k)   = 3k</div>
              <div>g(2k+1) = 3k + 1</div>
              <div style={{ marginTop: 4, color: "#15803d" }}>{t(E, "= floor(3·n / 2)", "= floor(3·n / 2)")}</div>
            </div>
          </div>
        </div>),
    },

    // 1-4: Quiz - x = 10
    {
      type: "quiz",
      narr: t(E,
        "x = 10 has only 0/1 digits, so view it as binary. n = 2. Use the formula.",
        "x = 10 은 0/1 만 → 이진수로 보면 n = 2. 공식 써 보기."),
      question: t(E,
        "How many ops to take x = 10 down to 0?",
        "x = 10 을 0 으로 만드는 데 몇 번?"),
      options: [
        t(E, "2", "2"),
        t(E, "3", "3"),
        t(E, "4", "4"),
      ],
      correct: 1,
      explain: t(E,
        "10 in binary = 2. n = 2 = 2k with k = 1, so g = 3k = 3. (Trace: 10 → 9 → 1 → 0.)",
        "이진수로 10 = 2. n = 2 = 2k, k = 1 → g = 3k = 3. (추적: 10 → 9 → 1 → 0.)"),
    },

    // 1-5: Input - x = 11
    {
      type: "input",
      narr: t(E,
        "x = 11 already has only 0/1 digits. Read as binary, then apply the closed form.",
        "x = 11 은 이미 0/1 만. 이진수로 보고 공식 적용."),
      question: t(E,
        "How many ops for x = 11?",
        "x = 11 은 몇 번?"),
      hint: t(E,
        "Treat '11' as a binary number — what value is that? Then use g(2k+1) = 3k+1.",
        "'11' 을 이진수로 보면 값이 얼마? g(2k+1) = 3k+1 적용."),
      answer: 4,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: makeStrangeFnCh2
   ═══════════════════════════════════════════════════════════════ */
export function makeStrangeFnCh2(E, lang = "py") {
  return [
    {
      type: "progressive",
      narr: t(E,
        "Binarize if needed (1 op), then compute floor(3n/2) mod p with modular n. Sections build it one piece at a time.",
        "비-이진 디짓이 있으면 1 ops 로 이진화, 그 다음 모듈러로 floor(3n/2) 계산. 아래 섹션이 한 단락씩 쌓아요."),
      sections: getStrangeFnSections(E),
    },
  ];
}
