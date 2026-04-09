import { C, t } from "@/components/quest/theme";

export const SOLUTION_CODE = [
  "import math",
  "",
  "N = int(input())",
  "",
  "# Circular permutations of N plates = (N-1)!",
  "# Fix one plate, arrange the rest",
  "if N == 0:",
  "    print(1)",
  "else:",
  "    print(math.factorial(N - 1))",
];

/* ─── helper: circle visualization ─── */
function CirclePlates({ labels, size = 120, accent = "#2563eb" }) {
  const n = labels.length;
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  return (
    <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" />
      {labels.map((label, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={14} fill={i === 0 ? accent : "#eff6ff"} stroke={i === 0 ? accent : "#93c5fd"} strokeWidth="2" />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 11, fontWeight: 900, fill: i === 0 ? "#fff" : accent, fontFamily: "'JetBrains Mono',monospace" }}>
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Chapter 1: 📋 문제 이해 (10 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc21GlassCh1(E) {
  return [
    // 1-1 타이틀
    {
      type: "reveal",
      narr: t(E,
        "We have N glass plates arranged in a circle. How many different ways can we arrange them? Let's figure it out! 🥛",
        "N개의 유리판이 원형으로 배열돼 있어. 몇 가지 다른 방법으로 배열할 수 있을까? 알아보자! 🥛"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🥛</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#2563eb" }}>Round Glass</div>
          <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>MCC 2021 P4</div>
        </div>),
    },

    // 1-2 일직선 vs 원형
    {
      type: "reveal",
      narr: t(E,
        "First, let's understand the difference between LINE arrangements and CIRCLE arrangements. In a line, [A,B,C] and [B,C,A] are different. But in a circle, they're the SAME — just rotated!",
        "먼저, 직선 배열과 원형 배열의 차이를 이해하자. 직선에서 [A,B,C]와 [B,C,A]는 다르지. 하지만 원형에서는 같아 — 회전한 것뿐!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {/* Line */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", marginBottom: 6 }}>{t(E, "Line: DIFFERENT", "직선: 다른 배열")}</div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 4 }}>
                {["A","B","C"].map(c => (
                  <div key={c} style={{ width: 30, height: 30, borderRadius: 6, background: "#dbeafe", border: "2px solid #93c5fd",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#2563eb" }}>{c}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                {["B","C","A"].map(c => (
                  <div key={c} style={{ width: 30, height: 30, borderRadius: 6, background: "#dbeafe", border: "2px solid #93c5fd",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#2563eb" }}>{c}</div>
                ))}
              </div>
            </div>
            {/* Circle */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", marginBottom: 6 }}>{t(E, "Circle: SAME!", "원형: 같은 배열!")}</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <CirclePlates labels={["A","B","C"]} size={70} />
                <div style={{ alignSelf: "center", fontSize: 16, fontWeight: 900, color: "#16a34a" }}>=</div>
                <CirclePlates labels={["B","C","A"]} size={70} />
              </div>
            </div>
          </div>
        </div>),
    },

    // 1-3 회전이 같은 이유
    {
      type: "reveal",
      narr: t(E,
        "In a circle, there's no 'start' or 'end'. Rotating the entire arrangement gives the same circle. A-B-C, B-C-A, and C-A-B are all the same circular arrangement!",
        "원형에는 '시작'이나 '끝'이 없어. 전체 배열을 회전해도 같은 원이야. A-B-C, B-C-A, C-A-B은 모두 같은 원형 배열!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
            <CirclePlates labels={["A","B","C"]} size={70} />
            <span style={{ fontSize: 14, fontWeight: 900, color: "#16a34a" }}>=</span>
            <CirclePlates labels={["B","C","A"]} size={70} />
            <span style={{ fontSize: 14, fontWeight: 900, color: "#16a34a" }}>=</span>
            <CirclePlates labels={["C","A","B"]} size={70} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
            {t(E, "3 rotations of the same circle = 1 arrangement", "같은 원의 3가지 회전 = 1가지 배열")}
          </div>
        </div>),
    },

    // 1-4 퀴즈: 회전 이해
    {
      type: "quiz",
      narr: t(E,
        "In a circle of 4 items [A,B,C,D], how many rotations give the same arrangement?",
        "4개 항목의 원형 [A,B,C,D]에서, 같은 배열을 주는 회전은 몇 개?"),
      question: t(E,
        "Circle of 4: A-B-C-D. How many rotations are 'the same'?",
        "4개의 원형: A-B-C-D. '같은' 회전은 몇 가지?"),
      options: ["4 (ABCD, BCDA, CDAB, DABC)", "3", "2", "1"],
      correct: 0,
      explain: t(E, "N items in a circle → N rotations are all the same! ✅", "원형의 N개 항목 → N가지 회전이 모두 같아! ✅"),
    },

    // 1-5 직선 순열: N!
    {
      type: "reveal",
      narr: t(E,
        "Line arrangements of N items = N! (N factorial). For 3 items: 3! = 3×2×1 = 6.",
        "N개 항목의 직선 배열 = N! (N 팩토리얼). 3개: 3! = 3×2×1 = 6."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              ["A","B","C"], ["A","C","B"], ["B","A","C"],
              ["B","C","A"], ["C","A","B"], ["C","B","A"],
            ].map((arr, i) => (
              <div key={i} style={{
                display: "flex", gap: 4, alignItems: "center",
                background: i % 2 === 0 ? "#eff6ff" : "#f8fafc", borderRadius: 6, padding: "4px 8px",
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.dim, width: 16 }}>{i + 1}.</span>
                {arr.map((c, j) => (
                  <div key={j} style={{ width: 26, height: 26, borderRadius: 5, background: "#dbeafe", border: "1.5px solid #93c5fd",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#2563eb" }}>{c}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, fontWeight: 800, color: "#2563eb" }}>
            3! = 6 {t(E, "line arrangements", "직선 배열")}
          </div>
        </div>),
    },

    // 1-6 원형 순열: N!/N = (N-1)!
    {
      type: "reveal",
      narr: t(E,
        "For circles: every arrangement has N rotations that look the same. So divide by N! Circle arrangements = N!/N = (N-1)!",
        "원형에서: 모든 배열에는 같아 보이는 N개 회전이 있어. N으로 나누면 돼! 원형 배열 = N!/N = (N-1)!"),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ background: "#dbeafe", borderRadius: 12, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>{t(E, "Line", "직선")}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#2563eb" }}>N!</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.dim }}>÷</div>
            <div style={{ background: "#fef2f2", borderRadius: 12, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626" }}>{t(E, "Rotations", "회전수")}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#dc2626" }}>N</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.dim }}>=</div>
            <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 10, border: "2px solid #86efac" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>{t(E, "Circle", "원형")}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#16a34a" }}>(N-1)!</div>
            </div>
          </div>
        </div>),
    },

    // 1-7 퀴즈: 3개의 원형 배열
    {
      type: "quiz",
      narr: t(E,
        "3 plates in a circle: (3-1)! = 2! = 2. Those 6 line arrangements become just 2 circle arrangements!",
        "원형에 유리판 3개: (3-1)! = 2! = 2. 6개의 직선 배열이 2개의 원형 배열이 돼!"),
      question: t(E, "Circle arrangements of 3 plates = (3-1)! = ?", "유리판 3개의 원형 배열 = (3-1)! = ?"),
      options: ["2", "3", "6", "1"],
      correct: 0,
      explain: t(E, "(3-1)! = 2! = 2×1 = 2 ✅", "(3-1)! = 2! = 2×1 = 2 ✅"),
    },

    // 1-8 고정 트릭 시각화
    {
      type: "reveal",
      narr: t(E,
        "Another way to think about it: FIX one plate's position (say A always at top). Then arrange the remaining N-1 plates. That's (N-1)!",
        "다른 생각법: 유리판 하나(예: A)를 고정. 나머지 N-1개를 배열. 그게 (N-1)!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Fix A at top", "A를 위에 고정")}</div>
              <CirclePlates labels={["A","B","C"]} size={80} accent="#dc2626" />
              <div style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", marginTop: 2 }}>A-B-C</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, marginBottom: 4 }}>{t(E, "Swap B,C", "B,C 교환")}</div>
              <CirclePlates labels={["A","C","B"]} size={80} accent="#dc2626" />
              <div style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", marginTop: 2 }}>A-C-B</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
            {t(E, "Fix 1, arrange rest: (3-1)! = 2! = 2 ✅", "1개 고정, 나머지 배열: (3-1)! = 2! = 2 ✅")}
          </div>
        </div>),
    },

    // 1-9 입력: 4개의 원형 배열
    {
      type: "input",
      narr: t(E,
        "4 plates in a circle: (4-1)! = 3! = 3 × 2 × 1 = ?",
        "원형에 유리판 4개: (4-1)! = 3! = 3 × 2 × 1 = ?"),
      question: t(E, "(4-1)! = 3! = ?", "(4-1)! = 3! = ?"),
      answer: 6,
    },

    // 1-10 입력: 5개의 원형 배열
    {
      type: "input",
      narr: t(E,
        "5 plates: (5-1)! = 4! = 4 × 3 × 2 × 1 = ?",
        "유리판 5개: (5-1)! = 4! = 4 × 3 × 2 × 1 = ?"),
      question: t(E, "4! = ?", "4! = ?"),
      answer: 24,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 2: 🔍 팩토리얼 이해 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc21GlassCh2(E) {
  return [
    // 2-1 팩토리얼이란?
    {
      type: "reveal",
      narr: t(E,
        "N factorial (N!) means multiplying all integers from 1 to N. 5! = 5×4×3×2×1 = 120.",
        "N 팩토리얼 (N!)은 1부터 N까지 모든 정수를 곱하는 것. 5! = 5×4×3×2×1 = 120."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { n: "1!", v: "1" },
              { n: "2!", v: "2 × 1 = 2" },
              { n: "3!", v: "3 × 2 × 1 = 6" },
              { n: "4!", v: "4 × 3 × 2 × 1 = 24" },
              { n: "5!", v: "5 × 4 × 3 × 2 × 1 = 120" },
              { n: "6!", v: "720" },
              { n: "7!", v: "5,040" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: i % 2 === 0 ? "#eff6ff" : "#f8fafc", borderRadius: 6, padding: "5px 10px",
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", width: 28 }}>{item.n}</span>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>),
    },

    // 2-2 퀴즈: 팩토리얼
    {
      type: "quiz",
      narr: t(E,
        "Quick check! 0! is defined as 1 (special rule). 1! = 1.",
        "확인! 0!은 1로 정의 (특별 규칙). 1! = 1."),
      question: t(E, "What is 0! ?", "0!은 뭐야?"),
      options: ["1", "0", "undefined"],
      correct: 0,
      explain: t(E, "By convention, 0! = 1. This makes many formulas work nicely ✅", "관례상 0! = 1. 이러면 많은 공식이 깔끔 ✅"),
    },

    // 2-3 왜 (N-1)!인가 직관
    {
      type: "reveal",
      narr: t(E,
        "Intuition: Fix plate 1 at position 'north'. Now arrange the remaining N-1 plates clockwise. First gap: N-1 choices. Next gap: N-2 choices. And so on...",
        "직관: 유리판 1을 '북쪽'에 고정. 나머지 N-1개를 시계방향으로 배열. 첫 자리: N-1가지. 다음: N-2가지. 계속..."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {[4, 3, 2, 1].map((n, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 900, color: "#fff",
                }}>{n}</div>
                {i < 3 && <span style={{ fontSize: 16, fontWeight: 900, color: C.dim }}>×</span>}
              </div>
            ))}
            <span style={{ fontSize: 16, fontWeight: 900, color: C.dim }}>=</span>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 900, color: "#fff",
            }}>24</div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: C.dim }}>
            N=5: (5-1)! = 4! = 4×3×2×1 = 24
          </div>
        </div>),
    },

    // 2-4 Python math.factorial
    {
      type: "reveal",
      narr: t(E,
        "Python has a built-in: math.factorial(n) computes n! instantly. No need to write our own loop!",
        "파이썬에 내장 함수: math.factorial(n)이 n!을 바로 계산. 루프 직접 짤 필요 없어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>import </span><span style={{ color: "#e2e8f0" }}>math</span></div>
            <div>&nbsp;</div>
            <div><span style={{ color: "#e2e8f0" }}>math.factorial(5)  </span><span style={{ color: "#6b7280" }}># → 120</span></div>
            <div><span style={{ color: "#e2e8f0" }}>math.factorial(0)  </span><span style={{ color: "#6b7280" }}># → 1</span></div>
            <div><span style={{ color: "#e2e8f0" }}>math.factorial(10) </span><span style={{ color: "#6b7280" }}># → 3628800</span></div>
          </div>
        </div>),
    },

    // 2-5 퀴즈: N=1일 때
    {
      type: "quiz",
      narr: t(E,
        "Edge case: what if there's only 1 plate? (1-1)! = 0! = 1. Just one way to arrange a single plate!",
        "엣지 케이스: 유리판이 1개면? (1-1)! = 0! = 1. 하나를 배열하는 방법은 하나뿐!"),
      question: t(E, "N=1. Circle arrangements = (1-1)! = 0! = ?", "N=1. 원형 배열 = (1-1)! = 0! = ?"),
      options: ["1", "0", "undefined"],
      correct: 0,
      explain: t(E, "0! = 1. One plate, one arrangement ✅", "0! = 1. 유리판 하나, 배열 하나 ✅"),
    },

    // 2-6 입력: N=6
    {
      type: "input",
      narr: t(E,
        "N=6 plates. Circle arrangements = (6-1)! = 5! = 5×4×3×2×1 = ?",
        "유리판 N=6. 원형 배열 = (6-1)! = 5! = 5×4×3×2×1 = ?"),
      question: t(E, "5! = ?", "5! = ?"),
      answer: 120,
    },

    // 2-7 빠르게 증가
    {
      type: "reveal",
      narr: t(E,
        "Factorial grows VERY fast! 10! = 3,628,800. 20! = ~2.4 × 10^18. Python handles big numbers natively!",
        "팩토리얼은 매우 빠르게 증가! 10! = 3,628,800. 20! ≈ 2.4 × 10^18. 파이썬은 큰 수를 자동 처리!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { n: 5, v: "120" },
              { n: 10, v: "3,628,800" },
              { n: 15, v: "1,307,674,368,000" },
              { n: 20, v: "2,432,902,008,176,640,000" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: i % 2 === 0 ? "#eff6ff" : "#f8fafc", borderRadius: 6, padding: "5px 10px",
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#2563eb", width: 50 }}>({item.n}-1)!</span>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{item.v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: C.ok, fontWeight: 700, textAlign: "center" }}>
            {t(E, "Python handles arbitrarily large integers!", "파이썬은 아무리 큰 정수도 처리!")}
          </div>
        </div>),
    },

    // 2-8 입력: N=7
    {
      type: "input",
      narr: t(E,
        "N=7. Answer = (7-1)! = 6! = 720. Verify: 6×5×4×3×2×1 = ?",
        "N=7. 답 = (7-1)! = 6! = 720. 확인: 6×5×4×3×2×1 = ?"),
      question: t(E, "6! = ?", "6! = ?"),
      answer: 720,
    },
  ];
}


/* ═══════════════════════════════════════════════════════════════
   Chapter 3: ⚡ 코드 빌드 (8 steps)
   ═══════════════════════════════════════════════════════════════ */
export function makeMcc21GlassCh3(E) {
  return [
    // 3-1 import math
    {
      type: "reveal",
      narr: t(E,
        "Step 1: Import the math module. It has our factorial function built-in!",
        "1단계: math 모듈 임포트. 팩토리얼 함수가 내장돼 있어!"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>import </span><span style={{ color: "#e2e8f0" }}>math</span></div>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: C.dim }}>
            {t(E, "This gives us math.factorial(), math.sqrt(), etc.", "math.factorial(), math.sqrt() 등 사용 가능.")}
          </div>
        </div>),
    },

    // 3-2 입력 읽기
    {
      type: "reveal",
      narr: t(E,
        "Step 2: Read N — the number of glass plates.",
        "2단계: N 읽기 — 유리판 개수."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#e2e8f0" }}>N = </span><span style={{ color: "#c084fc" }}>int</span><span style={{ color: "#e2e8f0" }}>(</span><span style={{ color: "#c084fc" }}>input</span><span style={{ color: "#e2e8f0" }}>())</span></div>
          </div>
        </div>),
    },

    // 3-3 메인 계산
    {
      type: "reveal",
      narr: t(E,
        "Step 3: Compute (N-1)! and print it. Handle edge case N=0 separately.",
        "3단계: (N-1)!을 계산하고 출력. 엣지 케이스 N=0은 따로 처리."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 2 }}>
            <div><span style={{ color: "#c084fc" }}>if </span><span style={{ color: "#e2e8f0" }}>N == 0:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    </span><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(1)</span></div>
            <div><span style={{ color: "#c084fc" }}>else</span><span style={{ color: "#e2e8f0" }}>:</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    </span><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(math.factorial(N - 1))</span></div>
          </div>
        </div>),
    },

    // 3-4 퀴즈: math.factorial 호출
    {
      type: "quiz",
      narr: t(E,
        "What does math.factorial(N-1) compute when N=4?",
        "N=4일 때 math.factorial(N-1)은 뭘 계산해?"),
      question: t(E, "math.factorial(4-1) = math.factorial(3) = ?", "math.factorial(4-1) = math.factorial(3) = ?"),
      options: ["6", "24", "3", "12"],
      correct: 0,
      explain: t(E, "3! = 3×2×1 = 6 ✅", "3! = 3×2×1 = 6 ✅"),
    },

    // 3-5 자체 구현도 가능
    {
      type: "reveal",
      narr: t(E,
        "We could also compute factorial ourselves with a loop! But math.factorial is simpler and likely faster.",
        "루프로 직접 팩토리얼을 구할 수도 있어! 하지만 math.factorial이 더 간단하고 빠를 거야."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ background: C.codeBg, borderRadius: 10, padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 2 }}>
            <div style={{ color: "#6b7280" }}># Alternative: manual loop</div>
            <div><span style={{ color: "#e2e8f0" }}>result = 1</span></div>
            <div><span style={{ color: "#c084fc" }}>for </span><span style={{ color: "#e2e8f0" }}>i </span><span style={{ color: "#c084fc" }}>in range</span><span style={{ color: "#e2e8f0" }}>(2, N):</span></div>
            <div><span style={{ color: "#e2e8f0" }}>    result *= i</span></div>
            <div><span style={{ color: "#c084fc" }}>print</span><span style={{ color: "#e2e8f0" }}>(result)</span></div>
          </div>
        </div>),
    },

    // 3-6 복잡도
    {
      type: "reveal",
      narr: t(E,
        "Time: O(N) — factorial computation multiplies N-1 numbers. Space: O(1) — just one result variable.",
        "시간: O(N) — 팩토리얼 계산이 N-1개 숫자를 곱함. 공간: O(1) — 결과 변수 하나뿐."),
      content: (
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <div style={{ background: "#dbeafe", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>{t(E, "Time", "시간")}</div>
              <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#2563eb" }}>O(N)</div>
            </div>
            <div style={{ background: "#dcfce7", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#16a34a" }}>{t(E, "Space", "공간")}</div>
              <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#16a34a" }}>O(1)</div>
            </div>
          </div>
        </div>),
    },

    // 3-7 입력: N=10
    {
      type: "input",
      narr: t(E,
        "N=10 plates. Answer = (10-1)! = 9! = 362880. Can you verify? 9×8×7×6×5×4×3×2×1.",
        "유리판 N=10. 답 = (10-1)! = 9! = 362880. 확인: 9×8×7×6×5×4×3×2×1."),
      question: t(E, "9! = ?", "9! = ?"),
      answer: 362880,
    },

    // 3-8 전체 코드
    {
      type: "code",
      narr: t(E,
        "The complete solution — just 5 lines! Import math, read N, print (N-1)!. Beautifully simple! 🎉",
        "완전한 솔루션 — 단 5줄! math 임포트, N 읽기, (N-1)! 출력. 아름답게 간단! 🎉"),
      label: t(E, "💻 Complete Solution", "💻 전체 솔루션"),
      code: SOLUTION_CODE,
    },
  ];
}
