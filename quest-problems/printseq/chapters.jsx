import { C, t } from "@/components/quest/theme";
import { getPrintseqSections, PrintseqExplorer } from "./components";
import { CodeSectionView } from "@/components/quest/CodeSectionView";

export function makePrintseqCh1(E) {
  return [
    /* 1-1 — Problem statement. */
    {
      type: "reveal",
      narr: t(E,
        "Bessie writes simple programs with two statements: PRINT c (output c) and REP o (repeat block o times). Given a target sequence and budget K, can the sequence be produced using AT MOST K PRINT statements? (REPs are unlimited.)",
        "Bessie 의 단순 언어: PRINT c (c 출력) + REP o (블록 o 번 반복). 목표 수열과 예산 K 가 주어졌을 때 PRINT 를 K 개 이하로 써서 수열을 만들 수 있을까? (REP 는 무제한.)"),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 32, marginBottom: 4 }}>🖨️</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#16a34a" }}>Printing Sequences</div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4 }}>USACO February 2025 Bronze #3</div>
          </div>

          <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#15803d", marginBottom: 8 }}>
              📖 {t(E, "The mini-language", "미니 언어")}
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #86efac", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: C.text, lineHeight: 1.65 }}>
              <div style={{ marginBottom: 6 }}>
                <code style={{ background: "#dcfce7", padding: "2px 6px", borderRadius: 4, fontWeight: 800 }}>PRINT c</code>
                {t(E, " — append integer c to the output.", " — 정수 c 를 출력에 추가.")}
              </div>
              <div>
                <code style={{ background: "#dcfce7", padding: "2px 6px", borderRadius: 4, fontWeight: 800 }}>REP o</code>
                <code style={{ marginLeft: 4, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>(...)</code>
                <code style={{ marginLeft: 4, background: "#dcfce7", padding: "2px 6px", borderRadius: 4, fontWeight: 800 }}>END</code>
                {t(E, " — execute the inner block o times.", " — 내부 블록을 o 번 실행.")}
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
              {t(E, "Given a target sequence of N positive integers (each ≤ K), decide if Bessie can write a program producing exactly that sequence using ", "양의 정수 N 개 수열 (각 ≤ K) 이 주어졌을 때, ")}
              <b style={{ color: "#15803d" }}>{t(E, "at most K", "K 개 이하")}</b>
              {t(E, " PRINT statements (REPs unlimited). Output \"YES\" or \"NO\".",
                    "의 PRINT 로 수열을 정확히 출력하는 프로그램을 짤 수 있는지 (REP 는 무제한). \"YES\" 또는 \"NO\" 출력.")}
            </div>

            <div style={{ marginTop: 10, padding: "8px 10px", background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 8, fontSize: 11.5, color: "#065f46", lineHeight: 1.6 }}>
              📐 <b>{t(E, "Constraints", "제약")}:</b>{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ N ≤ 100</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ K ≤ 3</code>,{" "}
              <code style={{ background: "#fff", padding: "1px 5px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>1 ≤ T ≤ 100</code>{" "}
              ({t(E, "test cases", "테스트 케이스")})
            </div>
          </div>
        </div>),
    },

    /* 1-2 — Sample I/O. */
    {
      type: "reveal",
      narr: t(E,
        "Sample: K=1 with sequence [1] → 1 PRINT does it. K=1 with [1,1,1,1] → REP 4 wrapping a single PRINT 1 still uses ONE PRINT.",
        "샘플: K=1 + [1] → PRINT 1 개로 끝. K=1 + [1,1,1,1] → REP 4 안에 PRINT 1 → PRINT 한 개로 충분."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#16a34a", textAlign: "center", marginBottom: 10 }}>
            📥 {t(E, "Sample 1 — official", "샘플 1 — 공식")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div style={{ background: "#fef3c7", border: "2px solid #fbbf24", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>{t(E, "INPUT", "입력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#7c2d12", whiteSpace: "pre" }}>
{`2
1 1
1
4 1
1 1 1 1`}
              </div>
            </div>
            <div style={{ background: "#dcfce7", border: "2px solid #16a34a", borderRadius: 10, padding: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", marginBottom: 6 }}>{t(E, "OUTPUT", "출력")}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.5, color: "#166534", whiteSpace: "pre" }}>
{`YES
YES`}
              </div>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 10, padding: 12, fontSize: 12, color: C.text, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 800, color: "#15803d", marginBottom: 6 }}>
              🔍 {t(E, "Walkthrough", "풀이")}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5 }}>
              <div><b>Case 1:</b> N=1, K=1, seq=[1]. {t(E, "Program: ", "프로그램: ")}<code>PRINT 1</code>. {t(E, "1 PRINT used. YES.", "PRINT 1 개. YES.")}</div>
              <div style={{ marginTop: 6 }}><b>Case 2:</b> N=4, K=1, seq=[1,1,1,1]. {t(E, "Program: ", "프로그램: ")}<code>REP 4 PRINT 1 END</code>. {t(E, "Still 1 PRINT (the REP just multiplies). YES.", "여전히 PRINT 1 개 (REP 는 그냥 반복). YES.")}</div>
            </div>
            <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #86efac", fontSize: 11.5, color: "#065f46" }}>
              {t(E, "Key idea: REPs do NOT cost any PRINT. Wrapping a 1-PRINT block in any tower of REPs is still 1 PRINT.",
                    "핵심: REP 는 PRINT 비용 0. PRINT 1 개 블록을 REP 로 아무리 감싸도 PRINT 는 그대로 1.")}
            </div>
          </div>
        </div>),
    },

    /* 1-3 — Explorer simulator. */
    {
      type: "reveal",
      narr: t(E,
        "Try a few sequences and budgets. The explorer runs the recursive checker and shows YES/NO. Use it to build intuition for what K=1, K=2, K=3 can express.",
        "수열과 예산을 바꿔보세요. 재귀 체커가 YES/NO 를 알려줘요. K=1, 2, 3 이 각각 어떤 수열을 만들 수 있는지 감 잡기."),
      content: (<PrintseqExplorer E={E} />),
    },

    /* 1-4 — Quiz. */
    {
      type: "quiz",
      narr: t(E,
        "K=1 means only one distinct value (in any quantity). K=2 lets you have at most two PRINTs.",
        "K=1 은 한 가지 값만 (개수 무관). K=2 는 PRINT 2 개까지."),
      question: t(E,
        "Can [1, 2, 1, 2, 1, 2] be produced with K=2?",
        "[1, 2, 1, 2, 1, 2] 를 K=2 로 만들 수 있을까?"),
      options: [
        t(E, "YES — REP 3 (PRINT 1; PRINT 2)", "YES — REP 3 (PRINT 1; PRINT 2)"),
        t(E, "NO — needs 3 PRINTs", "NO — PRINT 3 개 필요"),
      ],
      correct: 0,
      explain: t(E,
        "REP 3 wrapping PRINT 1 followed by PRINT 2 produces (1,2)(1,2)(1,2) using exactly 2 PRINTs. YES.",
        "PRINT 1; PRINT 2 를 REP 3 로 감싸면 (1,2)(1,2)(1,2) — PRINT 정확히 2 개. YES."),
    },

    /* 1-5 — Input quiz. */
    {
      type: "input",
      narr: t(E,
        "[1, 1, 2, 2] with K=2: split into two blocks. PRINT 1 wrapped in REP 2, then PRINT 2 wrapped in REP 2 → 2 PRINTs total. → 1 (YES) or 0 (NO)?",
        "[1, 1, 2, 2] + K=2: 두 블록으로 나누기. PRINT 1 을 REP 2 + PRINT 2 를 REP 2 → PRINT 총 2 개. → 1 (YES) 또는 0 (NO)?"),
      question: t(E,
        "Possible? (1 = YES, 0 = NO)",
        "가능? (1 = YES, 0 = NO)"),
      hint: t(E,
        "REP 2 (PRINT 1) END; REP 2 (PRINT 2) END uses 2 PRINTs. Answer = 1 (YES).",
        "REP 2 (PRINT 1) END; REP 2 (PRINT 2) END = PRINT 2 개. 답 = 1 (YES)."),
      answer: 1,
    },
  ];
}

export function makePrintseqCh2(E, lang = "py") {
  return [
    /* 2-1 — Plan: recursive checker. */
    {
      type: "reveal",
      narr: t(E,
        "Recursive: for sequence seq with budget k, can we make it? Three options: (A) all values equal — 1 PRINT covers it. (B) seq is m identical blocks — solve one block with k. (C) split seq into two parts, give each a slice of the budget.",
        "재귀: 수열 seq, 예산 k 일 때 가능? 세 옵션: (A) 모두 같은 값 — PRINT 1 개로 OK. (B) seq 가 같은 블록 m 번 — 블록 하나를 k 로. (C) 두 부분으로 쪼개기, 예산도 나눠 갖기."),
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { n: "A", label: t(E, "All same value", "모두 같은 값"), code: "all(x == seq[0] for x in seq)  →  k ≥ 1 → YES", color: "#16a34a" },
              { n: "B", label: t(E, "Repeating block", "반복 블록"), code: "for divisor m of len(seq): if seq is m·block, recurse on block", color: "#0891b2" },
              { n: "C", label: t(E, "Concat split", "이어붙이기 분할"), code: "for split in 1..n-1: for k1 in 1..k-1: solve(left, k1) ∧ solve(right, k-k1)", color: "#dc2626" },
            ].map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center",
                background: "#fff", border: `1.5px solid ${step.color}`, borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{step.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: "8px 10px", background: "#ecfdf5", border: "1px dashed #6ee7b7", borderRadius: 8, fontSize: 11.5, color: "#065f46", lineHeight: 1.6 }}>
            💡 {t(E, "With memoization on (seq, k), same subproblems aren't re-solved. N ≤ 100 and K ≤ 3 keeps the state space small.",
                     "(seq, k) 메모이제이션으로 같은 부분 문제 재계산 방지. N ≤ 100, K ≤ 3 라 상태 공간 작음.")}
          </div>
        </div>),
    },

    /* 2-2..2-N — sections */
    ...getPrintseqSections(E).map((sec, i) => ({
      type: "reveal",
      narr: i === 0
        ? t(E, "Build the recursive checker step by step.", "재귀 체커를 단계별로.")
        : "",
      content: (<CodeSectionView section={sec} lang={lang} E={E} />),
    })),
  ];
}
